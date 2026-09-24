const HTMLElementBase = globalThis.HTMLElement || class {};

const BOT_VARIANTS = {
  mote: {
    label: "San",
    rows: ["...#####....", ".#########..", "###########.", "############", "############", ".###########", ".###########", "..#########.", "...#######..", "....#####..."],
    eyes: [[10, 13, 2, 3], [20, 12, 2, 4]], mouth: [17, 21],
    colors: ["#84bdd5", "#cce8ef", "#598fae", "#294456", "#203746"]
  },
  sprout: {
    label: "Woni",
    rows: ["..###...##..", ".#####.####.", "..########..", ".##########.", "############", "############", ".##########.", "..########..", "...######...", "....##.##..."],
    eyes: [[11, 14, 2, 3], [20, 15, 2, 2]], mouth: [16, 20],
    colors: ["#9fcda8", "#d7ead1", "#66a47b", "#335348", "#29463a"]
  },
  spark: {
    label: "Duri",
    rows: [".....##.....", "....####....", "..########..", "############", ".##########.", ".##########.", "..########..", "...######...", "..###..###..", ".##......##."],
    eyes: [[11, 13, 2, 2], [20, 14, 3, 3]], mouth: [16, 20],
    colors: ["#e2c676", "#fae9ab", "#b79553", "#574936", "#40392e"]
  },
  wisp: {
    label: "Bomi",
    rows: ["....####....", "..########..", ".##########.", "############", "############", "############", "############", ".##########.", "..##.##.##..", "..##.##.##.."],
    eyes: [[11, 14, 2, 3], [20, 14, 2, 3]], mouth: [16, 20],
    colors: ["#b9b5cb", "#e6e2ed", "#898499", "#494654", "#363445"]
  },
  gear: {
    label: "Taeo",
    rows: [".....##.....", ".....##.....", "..########..", ".##########.", ".##########.", ".##########.", ".##########.", "..########..", "...######...", "...##..##..."],
    eyes: [[10, 14, 3, 3], [21, 13, 2, 2]], mouth: [16, 21],
    colors: ["#91accd", "#d1dceb", "#657f9e", "#36485f", "#253648"]
  },
  comet: {
    label: "Nari",
    rows: ["......##....", ".....####...", "....######..", "..#########.", ".###########", "############", ".###########", "..#########.", "....######..", "......##...."],
    eyes: [[12, 14, 2, 3], [21, 13, 2, 3]], mouth: [18, 20],
    colors: ["#d9a29b", "#f2cfc4", "#ab777d", "#60464c", "#4a353c"]
  },
  prism: {
    label: "Haru",
    rows: [".....##.....", "....####....", "...######...", "..########..", ".##########.", "############", "############", ".##########.", "..########..", "...##..##..."],
    eyes: [[12, 15, 2, 2], [19, 14, 2, 3]], mouth: [16, 21],
    colors: ["#b3a0d0", "#dfd2eb", "#8671ad", "#4d425f", "#3b344c"]
  },
  kernel: {
    label: "Mino",
    rows: ["..########..", ".##########.", "############", "############", "############", "############", "############", "############", ".##########.", "...##..##..."],
    eyes: [[10, 14, 2, 2], [21, 13, 3, 3]], mouth: [16, 20],
    colors: ["#a9c9bd", "#e1e9dc", "#789b90", "#3d5955", "#2c4845"]
  }
};

const STATE_LABELS = {
  idle: "idle",
  thinking: "thinking",
  working: "working",
  speaking: "speaking",
  success: "complete",
  sleeping: "sleeping"
};

const STYLE = `
  :host{display:inline-grid;place-items:center;vertical-align:middle;width:var(--bot-size,40px);height:var(--bot-size,40px);color:var(--pixel-bot-ink,#182b34)}
  canvas{display:block;width:100%;height:100%;image-rendering:pixelated}
  :host([size="small"]){--bot-size:24px}
  :host([size="medium"]){--bot-size:40px}
  :host([size="large"]){--bot-size:64px}
  @media(prefers-reduced-motion:reduce){canvas{image-rendering:pixelated}}
`;

class PixelBotAvatar extends HTMLElementBase {
  static get observedAttributes() { return ["variant", "state", "size", "label", "paused"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.frame = 0;
    this.startedAt = 0;
    this.visible = true;
    this.motionQuery = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
    this.onMotionChange = () => this.schedule();
  }

  connectedCallback() {
    this.render();
    if (this.motionQuery?.addEventListener) this.motionQuery.addEventListener("change", this.onMotionChange);
    else this.motionQuery?.addListener?.(this.onMotionChange);
    if (typeof IntersectionObserver !== "undefined") {
      this.observer = new IntersectionObserver(entries => {
        this.visible = Boolean(entries[0]?.isIntersecting);
        this.schedule();
      });
      this.observer.observe(this);
    }
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.schedule();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.frame);
    this.observer?.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    if (this.motionQuery?.removeEventListener) this.motionQuery.removeEventListener("change", this.onMotionChange);
    else this.motionQuery?.removeListener?.(this.onMotionChange);
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
      this.schedule();
    }
  }

  onVisibilityChange = () => this.schedule();

  get variant() { return BOT_VARIANTS[this.getAttribute("variant")] ? this.getAttribute("variant") : "mote"; }
  get state() { return STATE_LABELS[this.getAttribute("state")] ? this.getAttribute("state") : "idle"; }
  get displayName() { return this.getAttribute("label") || BOT_VARIANTS[this.variant].label; }

  render() {
    const stateLabel = STATE_LABELS[this.state];
    this.setAttribute("role", "img");
    this.setAttribute("aria-label", `${this.displayName}, ${stateLabel}`);
    this.shadowRoot.innerHTML = `<style>${STYLE}</style><canvas width="32" height="32" aria-hidden="true"></canvas>`;
    this.canvas = this.shadowRoot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.paint(0);
  }

  schedule() {
    cancelAnimationFrame(this.frame);
    if (!this.isConnected) return;
    if (!this.visible || document.hidden || this.hasAttribute("paused") || this.motionQuery?.matches) {
      this.paint(0);
      return;
    }
    this.startedAt ||= performance.now();
    this.frame = requestAnimationFrame(now => {
      this.paint((now - this.startedAt) / 1000);
      this.schedule();
    });
  }

  paint(seconds) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const bot = BOT_VARIANTS[this.variant];
    const [base, light, shade, deep, eye] = bot.colors;
    const customBase = getComputedStyle(this).getPropertyValue("--pixel-bot-color").trim() || base;
    const customAccent = getComputedStyle(this).getPropertyValue("--pixel-bot-accent").trim() || light;
    const state = this.state;
    const t = seconds;
    const step = (speed, count) => Math.floor(t * speed) % count;
    let dx = 0;
    let dy = 0;
    let lean = 0;
    let eyeShift = 0;
    let squish = false;

    // Whole-body movement uses integer steps so the sprites stay crisp.
    if (state === "idle") {
      dy = Math.round(Math.sin(t * 2.2));
    } else if (state === "thinking") {
      dx = Math.round(Math.sin(t * 3.1) * 2);
      dy = Math.round(Math.cos(t * 4.4));
      lean = Math.round(Math.sin(t * 3.1));
      eyeShift = step(2.8, 4) - 1;
    } else if (state === "working") {
      dy = -Math.max(0, Math.round(Math.sin(t * 7) * 3));
      dx = step(3.5, 2) ? 1 : -1;
      squish = dy === 0 && step(7, 4) === 0;
    } else if (state === "speaking") {
      dy = -Math.max(0, Math.round(Math.sin(t * 8)));
      lean = step(6, 2) ? 1 : -1;
      squish = step(6, 3) === 0;
    } else if (state === "success") {
      dy = -Math.max(0, Math.round(Math.sin(t * 6) * 4));
      dx = step(3, 2) ? 1 : -1;
      squish = dy === 0;
    } else if (state === "sleeping") {
      dx = Math.round(Math.sin(t * 1.8));
      dy = Math.round(Math.cos(t * 1.8));
      lean = dx;
    }
    ctx.clearRect(0, 0, 32, 32);

    const x0 = 4 + dx;
    const y0 = 6 + dy;
    bot.rows.forEach((row, y) => [...row].forEach((bit, x) => {
      if (bit !== "#") return;
      const px = x0 + x * 2 + (y < 5 ? lean : -lean);
      const py = y0 + y * 2 + (squish && y > 5 ? -1 : 0);
      ctx.fillStyle = y < 2 || x < 2 ? customAccent : y > bot.rows.length - 3 || x > row.length - 3 ? shade : customBase;
      ctx.fillRect(px, py, 2, 2);
    }));

    // A small identifying mark and uneven face are part of each silhouette.
    ctx.fillStyle = light;
    if (this.variant === "mote") ctx.fillRect(x0 + 5, y0 + 5, 2, 2);
    if (this.variant === "sprout") { ctx.fillRect(x0 + 6 + lean, y0, 2, 2); ctx.fillRect(x0 + 18 - lean, y0, 2, 2); }
    if (this.variant === "spark") ctx.fillRect(x0 + 11, y0 + 2, 2, 2);
    if (this.variant === "wisp") { ctx.fillRect(x0 + 5, y0 + 5, 3, 2); ctx.fillRect(x0 + 9, y0 + 4, 2, 2); }
    if (this.variant === "gear") { ctx.fillRect(x0 + 11 + lean, y0 - 1, 2, 2); ctx.fillStyle = deep; ctx.fillRect(x0 + 11 + lean, y0 - 2, 2, 2); }
    if (this.variant === "comet") { ctx.fillRect(x0 + 3, y0 + 9, 2, 2); ctx.fillRect(x0 + 1, y0 + 12, 2, 2); }
    if (this.variant === "prism") { ctx.fillRect(x0 + 10, y0 + 4, 2, 2); ctx.fillRect(x0 + 8, y0 + 7, 2, 2); }
    if (this.variant === "kernel") { ctx.fillRect(x0 + 3, y0 + 3, 3, 2); ctx.fillStyle = shade; ctx.fillRect(x0 + 19, y0 + 15, 2, 2); }

    const blink = state === "idle" && step(3, 12) === 11;
    const faceY = dy + (squish ? -1 : 0);
    ctx.fillStyle = eye;
    for (const [x, y, w, h] of bot.eyes) {
      if (state === "sleeping" || blink) ctx.fillRect(x + dx, y + faceY + 2, w + 1, 1);
      else ctx.fillRect(x + dx + eyeShift, y + faceY, w, h);
    }
    ctx.fillStyle = deep;
    const [mx, my] = bot.mouth;
    if (state === "speaking") ctx.fillRect(mx + dx, my + faceY, 2, step(7, 3) + 1);
    else if (state === "success") { ctx.fillRect(mx - 1 + dx, my + faceY, 4, 1); ctx.fillRect(mx + dx, my + faceY + 1, 2, 1); }
    else ctx.fillRect(mx + dx, my + faceY, 2, state === "sleeping" ? 1 : 2);

    if (state === "thinking") {
      const orbit = step(5, 6);
      ctx.fillStyle = customAccent;
      ctx.fillRect(27, 6 + orbit * 2, 2, 2);
      ctx.globalAlpha = .45;
      ctx.fillRect(28, 6 + ((orbit + 4) % 6) * 2, 1, 1);
      ctx.globalAlpha = 1;
    }
    if (state === "working") {
      ctx.fillStyle = shade;
      ctx.fillRect(x0 - 2, y0 + 10 + step(7, 2) * 2, 2, 3);
      ctx.fillRect(x0 + 24, y0 + 10 + (1 - step(7, 2)) * 2, 2, 3);
    }
    if (state === "success") {
      ctx.fillStyle = customAccent;
      ctx.fillRect(3, 4 + step(3, 3) * 2, 2, 2);
      ctx.fillRect(28, 8 - step(3, 3) * 2, 2, 2);
    }
    if (state === "sleeping") {
      const z = step(2, 5);
      ctx.fillStyle = shade;
      ctx.fillRect(25, 6 - z, 3, 1);
      ctx.fillRect(27, 5 - z, 1, 1);
      ctx.fillRect(25, 4 - z, 3, 1);
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("pixel-bot-avatar")) {
  customElements.define("pixel-bot-avatar", PixelBotAvatar);
}

export { PixelBotAvatar, BOT_VARIANTS, STATE_LABELS };
