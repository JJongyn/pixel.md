const HTMLElementBase = globalThis.HTMLElement || class {};
const EFFECT_CSS = `
  :host{display:block;position:relative;isolation:isolate;--fx-bleed:16px;--fx-wash-a:rgba(159,230,133,.22);--fx-wash-b:rgba(107,206,160,.12)}
  *{box-sizing:border-box}
  .wash{position:absolute;inset:-12px;z-index:0;pointer-events:none;opacity:.8;filter:blur(15px);background:radial-gradient(ellipse 38% 48% at 12% 16%,var(--fx-wash-a),transparent 82%),radial-gradient(ellipse 35% 48% at 88% 86%,var(--fx-wash-b),transparent 82%)}
  .content{position:relative;z-index:1}
  canvas{position:absolute;left:calc(-1 * var(--fx-bleed));top:calc(-1 * var(--fx-bleed));z-index:2;display:block;pointer-events:none;transform-origin:center center;backface-visibility:visible;will-change:transform}
  :host([variant="hop"]) .wash,:host([variant="bevel"]) .wash,:host([variant="tilt"]) .wash,:host([variant="prism"]) .wash,:host([variant="anchor"]) .wash{display:none}
  :host([variant="car"]) .wash,:host([variant="car-working"]) .wash,:host([variant="cat"]) .wash,:host([variant="cat-working"]) .wash{display:none}
  :host([paused]) .wash{opacity:.38}
`;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const SCENE_VARIANTS = new Set(["car", "car-working", "cat", "cat-working"]);
const sceneBleed = variant => variant === "cat" || variant === "cat-working" ? 28 : 24;

class PixelChatEffect extends HTMLElementBase {
  static get observedAttributes() { return ["variant", "speed", "intensity", "paused"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.motion = matchMedia("(prefers-reduced-motion: reduce)");
    this.isInView = true;
    this.frameId = 0;
    this.width = 0;
    this.height = 0;
    this.bleed = 16;
    this.onMotionChange = () => this.updateAnimation();
    this.onVisibilityChange = () => this.updateAnimation();
  }

  connectedCallback() {
    this.rotationStart = performance.now();
    this.sceneStart = this.rotationStart;
    this.bleed = SCENE_VARIANTS.has(this.getAttribute("variant")) ? sceneBleed(this.getAttribute("variant")) : 16;
    this.shadowRoot.innerHTML = `<style>${EFFECT_CSS}</style><div class="wash" aria-hidden="true"></div><div class="content"><slot></slot></div><canvas aria-hidden="true"></canvas>`;
    this.canvas = this.shadowRoot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this);
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.isInView = entries[0]?.isIntersecting ?? true;
      if (this.isInView && SCENE_VARIANTS.has(this.getAttribute("variant"))) this.sceneStart = performance.now();
      this.updateAnimation();
    }, { rootMargin: "100px" });
    this.intersectionObserver.observe(this);
    this.motion.addEventListener("change", this.onMotionChange);
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.resize();
    this.updateAnimation();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.motion.removeEventListener("change", this.onMotionChange);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }

  attributeChangedCallback(name) {
    if (!this.isConnected) return;
    if (name === "variant") {
      const nextBleed = SCENE_VARIANTS.has(this.getAttribute("variant")) ? sceneBleed(this.getAttribute("variant")) : 16;
      if (nextBleed !== this.bleed) { this.bleed = nextBleed; this.resize(); }
      if (SCENE_VARIANTS.has(this.getAttribute("variant"))) this.sceneStart = performance.now();
    }
    if (name === "variant" && ["bevel", "tilt", "prism"].includes(this.getAttribute("variant"))) this.rotationStart = performance.now();
    this.updateAnimation();
    this.draw(performance.now());
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.getBoundingClientRect();
    const width = Math.max(0, Math.round(rect.width));
    const height = Math.max(0, Math.round(rect.height));
    if (!width || !height) return;
    this.width = width;
    this.height = height;
    const cssWidth = width + this.bleed * 2;
    const cssHeight = height + this.bleed * 2;
    this.canvas.style.left = -this.bleed + "px";
    this.canvas.style.top = -this.bleed + "px";
    const dpr = Math.min(2, devicePixelRatio || 1);
    this.canvas.style.width = cssWidth + "px";
    this.canvas.style.height = cssHeight + "px";
    this.canvas.width = Math.round(cssWidth * dpr);
    this.canvas.height = Math.round(cssHeight * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw(performance.now());
  }

  updateAnimation() {
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
    if (!this.canvas || !this.width) return;
    if (this.motion.matches || this.hasAttribute("paused") || !this.isInView || document.hidden) {
      this.draw(this.motion.matches ? 900 : performance.now());
      return;
    }
    const tick = now => {
      this.draw(now);
      this.frameId = requestAnimationFrame(tick);
    };
    this.frameId = requestAnimationFrame(tick);
  }

  square(x, y, size, color, opacity = 1) {
    const ctx = this.ctx;
    ctx.globalAlpha = clamp(opacity, 0, 1);
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), size, size);
    ctx.globalAlpha = 1;
  }

  glow(x, y, radius, color, alpha) {
    const ctx = this.ctx;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color.replace("ALPHA", String(alpha)));
    gradient.addColorStop(1, color.replace("ALPHA", "0"));
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  point(distance, offset = 0) {
    const left = this.bleed - offset;
    const top = this.bleed - offset;
    const right = this.bleed + this.width + offset;
    const bottom = this.bleed + this.height + offset;
    const w = right - left;
    const h = bottom - top;
    const perimeter = (w + h) * 2;
    let d = ((distance % perimeter) + perimeter) % perimeter;
    if (d < w) return [left + d, top];
    d -= w;
    if (d < h) return [right, top + d];
    d -= h;
    if (d < w) return [right - d, bottom];
    return [left, bottom - (d - w)];
  }

  get perimeter() { return 2 * (this.width + this.height); }
  get speed() { return clamp(Number(this.getAttribute("speed")) || 1, .2, 3); }
  get intensity() { return clamp(Number(this.getAttribute("intensity")) || 1, .2, 1.5); }

  draw(now) {
    if (!this.ctx || !this.width || !this.height) return;
    this.ctx.clearRect(0, 0, this.width + this.bleed * 2, this.height + this.bleed * 2);
    const t = this.motion.matches ? 900 : now * this.speed;
    const strength = this.intensity;
    const variant = this.getAttribute("variant") || "orbit";
    if (SCENE_VARIANTS.has(variant)) {
      this.canvas.style.transform = "";
      this.canvas.style.zIndex = "2";
      this.canvas.style.opacity = "";
      this.drawScene(now, strength, variant);
    } else if (variant === "bevel" || variant === "tilt" || variant === "prism") {
      // Restart the full-turn variants at a readable angle. Prism uses a
      // smaller centered rock so its diagonal corners stay near the input.
      const elapsed = Math.max(0, now - (this.rotationStart || now));
      const radians = this.motion.matches ? 0 : (Math.PI * 1.68 + elapsed * .00055) % (Math.PI * 2);
      const degrees = radians * 180 / Math.PI;
      const prismDegrees = this.motion.matches ? 0 : Math.sin(elapsed * .00078) * 20;
      const faceDepth = variant === "prism" ? Math.cos(prismDegrees * Math.PI / 180) : Math.cos(radians);
      const axis = variant === "bevel" ? "Y" : "X";
      // Keep the complete frame on one layer; depth is expressed by the
      // perspective transform and a uniform fade, never by hiding half of it.
      if (this.canvas.style.zIndex !== "3") this.canvas.style.zIndex = "3";
      const translateZ = Math.round(8 + Math.max(0, faceDepth) * 42);
      const perspective = `perspective(${Math.max(440, this.width * 1.5)}px)`;
      this.canvas.style.transform = this.motion.matches ? "" : variant === "tilt"
        ? `${perspective} rotateX(${degrees}deg)`
        : variant === "prism"
          ? `${perspective} rotate3d(1, .52, 0, ${prismDegrees}deg)`
          : `${perspective} rotateY(${degrees}deg) translateZ(${translateZ}px)`;
      const edgeFade = clamp(Math.abs(faceDepth) / Math.cos(Math.PI / 6), 0, 1);
      const opacity = edgeFade * edgeFade * (3 - 2 * edgeFade);
      this.canvas.style.opacity = String(opacity);
      this.drawBevel(t, strength, faceDepth, variant === "prism");
    } else {
      this.canvas.style.transform = "";
      this.canvas.style.zIndex = "2";
      this.canvas.style.opacity = "";
      if (variant === "hop") this.drawHop(t, strength);
      else if (variant === "anchor") this.drawAnchor(t, strength);
      else this.drawOrbit(t, strength);
    }
  }

  // The original Orbit is preserved: two soft signals circle the whole edge.
  drawOrbit(t, strength) {
    const p = this.perimeter;
    const heads = [t * .075, t * .075 + p * .53];
    heads.forEach((head, lane) => {
      const [gx, gy] = this.point(head, 1);
      this.glow(gx, gy, 28, lane ? "rgba(229,255,189,ALPHA)" : "rgba(135,231,148,ALPHA)", .18 * strength);
      for (let i = 11; i >= 0; i--) {
        const [x, y] = this.point(head - i * 6.3, 1);
        const falloff = 1 - i / 12;
        this.square(x - 2, y - 2, i < 2 ? 4 : 3, lane ? "#e4fbbf" : "#8ee5a4", (.1 + .83 * falloff * falloff) * strength);
      }
    });
  }

  // A three-pixel packet makes a shallow hop along the bottom edge.
  drawHop(t, strength) {
    const innerWidth = Math.max(20, this.width - 36);
    const travel = .5 - .5 * Math.cos(t * .0001);
    const leadX = this.bleed + 18 + innerWidth * travel;
    const baseY = this.bleed + this.height + 1;
    for (let i = 2; i >= 0; i--) {
      const x = leadX - i * 7;
      const lift = Math.max(0, Math.sin(t * .0055 - i * .48)) * 6;
      this.square(x, baseY - lift, 3, i === 0 ? "#c6dbc2" : "#a8c4a7", (.83 - i * .2) * strength);
      if (lift > 2.5) this.square(x + 1, baseY + 3, 2, "#789681", (.12 + lift * .019) * strength);
    }
  }

  roundedPoint(distance, inset = 0) {
    const left = this.bleed + inset, top = this.bleed + inset;
    const right = this.bleed + this.width - inset, bottom = this.bleed + this.height - inset;
    const radius = Math.max(3, Math.min(9, this.height * .22) - inset);
    const straightX = Math.max(0, right - left - radius * 2);
    const straightY = Math.max(0, bottom - top - radius * 2);
    const arc = radius * Math.PI / 2;
    const segments = [straightX, arc, straightY, arc, straightX, arc, straightY, arc];
    const total = segments.reduce((a, b) => a + b, 0);
    let d = ((distance % total) + total) % total;
    for (let i = 0; i < segments.length; i++) {
      const length = segments[i];
      if (d <= length) {
        const u = length ? d / length : 0;
        if (i === 0) return [left + radius + straightX * u, top];
        if (i === 1) { const a = -Math.PI/2 + u*Math.PI/2; return [right-radius+radius*Math.cos(a), top+radius+radius*Math.sin(a)]; }
        if (i === 2) return [right, top + radius + straightY * u];
        if (i === 3) { const a = u*Math.PI/2; return [right-radius+radius*Math.cos(a), bottom-radius+radius*Math.sin(a)]; }
        if (i === 4) return [right-radius-straightX*u, bottom];
        if (i === 5) { const a = Math.PI/2 + u*Math.PI/2; return [left+radius+radius*Math.cos(a), bottom-radius+radius*Math.sin(a)]; }
        if (i === 6) return [left, bottom-radius-straightY*u];
        const a = Math.PI + u*Math.PI/2;
        return [left+radius+radius*Math.cos(a), top+radius+radius*Math.sin(a)];
      }
      d -= length;
    }
    return [left + radius, top];
  }

  // A fine, beveled pixel rail follows the rounded composer outline. Its
  // offset shadow and shifting face values give the frame a restrained depth.
  drawBevel(t, strength, faceDepth, prism = false) {
    const radius = Math.max(3, Math.min(9, this.height * .22));
    const perimeter = 2 * (this.width + this.height) - 8 * radius + 2 * Math.PI * radius;
    const topLen = this.width - 2 * radius;
    const leftStart = 2 * topLen + 3 * (radius * Math.PI / 2) + 2 * (this.height - 2 * radius);
    const planeLight = .38 + .62 * ((faceDepth + 1) / 2);
    const glintHead = (t * .035) % perimeter;
    for (let d = 0; d < perimeter; d += 3.4) {
      const [x, y] = this.roundedPoint(d, 1);
      const [sx, sy] = this.roundedPoint(d + .8, 2.7);
      const side = d / perimeter;
      const face = .5 + .5 * Math.sin(t * .00045 - side * Math.PI * 2);
      const topLeft = d < topLen || d >= leftStart;
      this.square(sx - 1, sy - 1, 2, "#506250", (.18 + face * .15) * strength * planeLight);
      this.square(x - 1, y - 1, 2, topLeft ? "#bacbb7" : "#718674", (.28 + face * .28) * strength * planeLight);
      if (prism) {
        const delta = Math.abs(((d - glintHead + perimeter / 2) % perimeter) - perimeter / 2);
        const glint = Math.max(0, 1 - delta / 24);
        if (glint > .04) this.square(x - 1, y - 1, 2, "#e4f0cf", glint * .72 * strength * planeLight);
      }
    }
    // Four continuous hairlines read as the side planes of a shallow voxel frame.
    const ctx = this.ctx;
    ctx.lineWidth = 1;
    ctx.globalAlpha = .3 * strength * planeLight;
    ctx.strokeStyle = "#d0dacb";
    ctx.beginPath();
    ctx.roundRect(this.bleed + 1.5, this.bleed + 1.5, this.width - 3, this.height - 3, radius);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Four pixel brackets stay anchored to the rounded corners and gently
  // extend inward, so the composer feels held by the frame instead of orbited.
  drawAnchor(t, strength) {
    const radius = Math.max(3, Math.min(9, this.height * .22));
    const perimeter = 2 * (this.width + this.height) - 8 * radius + 2 * Math.PI * radius;
    const straightX = this.width - radius * 2;
    const straightY = this.height - radius * 2;
    const arc = radius * Math.PI / 2;
    const corners = [straightX, straightX + arc + straightY, 2*straightX + 2*arc + straightY, 2*straightX + 3*arc + 2*straightY];
    const colors = ["#b5daa8", "#9fd2c5", "#d5c58e", "#a9c5dc"];
    corners.forEach((corner, index) => {
      const phase = t * .00075 + index * Math.PI / 2;
      const pulse = .5 + .5 * Math.sin(phase);
      const length = 12 + Math.round(pulse * 2) * 2;
      for (let along = 0; along < length; along += 3.4) {
        for (const side of [-1, 1]) {
          const [x, y] = this.roundedPoint(corner + side * along, 1);
          const shimmer = .5 + .5 * Math.sin(t * .0011 - along * .24 + index * .8);
          const alpha = (.38 + shimmer * .42) * (along < 4 ? 1 : .84) * strength;
          const color = shimmer > .82 ? "#eef3dc" : colors[index];
          this.square(x - 1.5, y - 1.5, 3, color, alpha);
        }
      }
    });
    // A sparse low-contrast rail connects the anchors into one quiet enclosure.
    for (let d = 0; d < perimeter; d += 11) {
      const [x, y] = this.roundedPoint(d, 1);
      this.square(x - .5, y - .5, 1, "#9aad9b", .2 * strength);
    }
  }

  drawScene(now, strength, variant) {
    const scenes = {
      car: { scale: 3, speed: .018, colors: { "1": "#e8bd79", "2": "#b9d7ef", "3": "#d99c52", "4": "#c7d8c5" }, frames: [["...111...", "..12221..", ".3333333.", "333333333", ".4.....4."], ["...111...", "..12221..", ".3333333.", "333333333", "..4...4.."]] },
      "car-working": { scale: 3, speed: .037, colors: { "1": "#e8bd79", "2": "#b9d7ef", "3": "#d99c52", "4": "#ffc66e", "5": "#ef7959" }, frames: [["...111...", "..12221..", ".3333333.", "333333333", ".4.....4."], ["...111...", "..12221..", ".3333333.", "333333333", "..4...4.."]] },
      cat: { scale: 2, colors: { "1": "#d8cbb9", "2": "#9f9181", "3": "#756158", "4": "#d98b86", "5": "#f5e6d4" }, frames: [["...1...1...", "..111.111..", ".111111111.", "11111111111", "11133.33.11", "11111111111", "11111411111", "11111111111", "...22222...", ".22.....22.", "..22...22.."], ["...1...1...", "..111.111..", ".111111111.", "11111111111", "11133.33.11", "11111111111", "11111411111", "11111111111", "...22222...", ".22.....22.", "..22...22.."]] },
      "cat-working": { scale: 2, colors: { "1": "#d8cbb9", "2": "#9f9181", "3": "#756158", "4": "#d98b86", "5": "#f5e6d4", "6": "#dc9145", "7": "#f2c77e" }, frames: [["...1...1...", "..111.111..", ".111111111.", "11111111111", "11331113311", "11531113511", "11111411111", "1111.4.1111", "...22222...", ".22.666.22.", "..22.77722."], ["...1...1...", "..111.111..", ".111111111.", "11111111111", "11331113311", "11531113511", "11111411111", "11114411111", "...22222...", ".22.666.22.", "..22.77722."], ["...1...1...", "..111.111..", ".111111111.", "11111111111", "11331113311", "11531113511", "11111411111", "1111.4.1111", "...22222...", ".22.666.22.", "..22.77722."]] }
    };
    const scene = scenes[variant];
    if (!scene) return;
    const elapsed = Math.max(0, now - this.sceneStart);
    const frame = scene.frames[Math.floor(elapsed / (variant === "cat-working" ? 145 : 220)) % scene.frames.length];
    const scale = scene.scale;
    const spriteWidth = Math.max(...frame.map(row => row.length)) * scale;
    const spriteHeight = frame.length * scale;
    const isCar = variant.startsWith("car");
    const path = this.width + this.bleed * 2 + spriteWidth;
    const progress = (elapsed * (scene.speed || .037)) % path;
    const travelX = -spriteWidth + progress;
    const x = this.motion.matches || !isCar ? this.bleed + (this.width - spriteWidth) / 2 : travelX;
    // Cats perch on the input's top rim; car sprites travel through the space above it.
    const y = isCar ? Math.max(0, this.bleed - spriteHeight - 1) : Math.max(0, this.bleed - spriteHeight + 2);
    frame.forEach((row, rowIndex) => [...row].forEach((pixel, columnIndex) => {
      if (pixel === ".") return;
      this.square(x + columnIndex * scale, y + rowIndex * scale, scale, scene.colors[pixel], strength);
    }));
    if (variant === "cat") {
      // A sleepy pixel bubble grows from the nose, pops into four tiny glints,
      // then rests briefly before the next gentle cycle.
      const cycle = elapsed % 3600;
      const noseX = x + spriteWidth / 2;
      const noseY = y + scale * 6.5;
      if (cycle < 2000) {
        const grow = cycle / 2000;
        const radius = 4 + grow * 7;
        const bubbleY = noseY - radius - 2;
        for (let point = 0; point < 8; point++) {
          const angle = point * Math.PI / 4;
          this.square(noseX + Math.cos(angle) * radius - 1, bubbleY + Math.sin(angle) * radius - 1, 2, "#c6ddd5", (.68 + grow * .24) * strength);
        }
        this.square(noseX - radius * .45 - 1, bubbleY - radius * .45 - 1, 2, "#fff4df", (.72 + grow * .24) * strength);
      } else if (cycle < 2450) {
        const pop = (cycle - 2000) / 450;
        for (let point = 0; point < 4; point++) {
          const angle = point * Math.PI / 2 + Math.PI / 4;
          const distance = 2 + pop * 5;
          this.square(noseX + Math.cos(angle) * distance - 1, noseY - 2 + Math.sin(angle) * distance - 1, 2, "#c6ddd5", (1 - pop) * .9 * strength);
        }
      }
    }
    if (variant === "car-working") {
      // A compact two-color exhaust flickers behind the moving car.
      const flicker = Math.floor(elapsed / 95) % 2;
      const flameX = x - 4;
      const flameY = y + Math.round(spriteHeight * .68);
      this.square(flameX, flameY, 3, scene.colors[flicker ? "4" : "5"], .92 * strength);
      this.square(flameX - 4, flameY + (flicker ? 0 : 3), 3, scene.colors[flicker ? "5" : "4"], .75 * strength);
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("pixel-chat-effect")) customElements.define("pixel-chat-effect", PixelChatEffect);
export { PixelChatEffect };
