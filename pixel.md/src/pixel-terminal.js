const HTMLElementBase = globalThis.HTMLElement || class {};

const VARIANTS = ["prompt", "output", "tasks", "confirm", "diff", "session", "box", "choices", "steps", "meter", "spinner", "wave", "agents", "stream"];
const STYLE = `
  :host{display:block;color:#e6ecdf;font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;--term-accent:var(--pixel-terminal-accent,#b9df8a)}
  *{box-sizing:border-box}button,input{font:inherit;color:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible{outline:1px solid var(--term-accent);outline-offset:2px}.input-row input:focus-visible{outline:1px solid var(--term-accent);outline-offset:2px}
  .terminal{width:min(100%,430px);overflow:hidden;border:1px solid #465c43;background:#101712;box-shadow:3px 3px 0 #263323,6px 6px 0 #111811}
  .bar{height:29px;display:flex;align-items:center;gap:8px;padding:0 10px;border-bottom:1px solid #354531;background:#182119;color:#a1b199;font-size:9px;letter-spacing:.04em}
  .pixels{display:grid;grid-template-columns:repeat(2,4px);grid-template-rows:repeat(2,4px);gap:2px;transform:rotate(45deg);margin-right:3px}.pixels i{width:4px;height:4px;background:#c3e99c}.pixels i:nth-child(2){background:#78996a}.pixels i:nth-child(3){background:#78996a}.pixels i:nth-child(4){display:none}
  .path{margin-left:auto;color:#7e9279}.body{padding:13px 14px 14px;min-height:94px;background-image:radial-gradient(#50644a 0.6px,transparent 0.6px);background-size:12px 12px;background-position:5px 6px;background-repeat:repeat-y}.line{display:flex;align-items:baseline;gap:8px;min-width:0}.prompt{color:var(--term-accent)}.muted{color:#879488}.command{color:#e3eadf;overflow-wrap:anywhere}.input-row{display:flex;align-items:center;gap:8px;margin-top:5px}.input-row input{min-width:0;flex:1;padding:2px 0;border:0;outline:0;background:transparent;color:#e5ecdf;caret-color:var(--term-accent)}.input-row input::placeholder{color:#738074}.run,.action{padding:5px 9px;border:1px solid #617a56;background:#263522;color:#d9ecc5;font-size:9px;box-shadow:2px 2px 0 #172018}.run:hover,.action:hover{border-color:#b9df8a;background:#344331}.output{margin:10px 0 0 19px;color:#9baa9b;font-size:10px;white-space:pre-wrap}.output[data-kind=error]{color:#d6a39a}.output[data-kind=success],.output-success{color:#b9d99f}.cursor{display:inline-block;width:6px;height:10px;margin-left:3px;vertical-align:-1px;background:var(--term-accent);animation:blink 1s steps(2,end) infinite}
  .steps{display:grid;gap:7px;margin-top:8px}.step{display:flex;align-items:center;gap:8px;color:#8b988b}.step[data-state=done]{color:#b7d49c}.step[data-state=active]{color:#e4ebdf}.mark{width:10px;height:10px;display:grid;place-items:center;color:#b9df8a}.step[data-state=active] .mark{animation:tick .8s steps(2,end) infinite}.step[data-state=done] .mark{color:#a8d583}
  .confirm{margin-top:9px;padding:9px 10px;border-left:2px solid #d7b184;background:#222821;color:#d7ded1}.confirm b{display:block;margin-bottom:3px;color:#ebd3b7;font-weight:500}.actions{display:flex;gap:6px;margin-top:10px}.danger{border-color:#74564e;background:#302320;color:#e2b1a3}.danger:hover{border-color:#d29480;background:#422d27}.diff-head{display:flex;justify-content:space-between;color:#91a08f}.diff-lines{display:grid;gap:3px;margin-top:9px;color:#c1cbbd;font-size:9px}.diff-line{padding:2px 6px;background:#202720;white-space:pre-wrap;overflow-wrap:anywhere}.diff-line.add{color:#badb9f;background:#202a21}.diff-line.remove{color:#d6a29a;background:#2a2220}.session{display:flex;align-items:center;gap:9px;margin-top:7px}.led{width:6px;height:6px;background:#b9df8a;box-shadow:0 0 8px #9fc87d;animation:blink 1.6s steps(2,end) infinite}.url{color:#bfdb9e}.stop{margin-left:auto;padding:4px 8px;border:1px solid #4a574b;background:#252d26;color:#bbc7b7;font-size:9px}.stopped .led{background:#7f8b7e;box-shadow:none;animation:none}.stopped .url{color:#879387}.session-detail{margin:8px 0 0 15px;color:#829082;font-size:9px}
  .pixel-box{position:relative;margin:2px 3px;padding:10px 12px;border:0;background:#172119;clip-path:polygon(0 5px,5px 5px,5px 0,calc(100% - 5px) 0,calc(100% - 5px) 5px,100% 5px,100% calc(100% - 5px),calc(100% - 5px) calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,5px calc(100% - 5px),0 calc(100% - 5px));box-shadow:inset 0 0 0 1px #617b54}.pixel-box:before{content:"";position:absolute;inset:0;border:1px solid #617b54;pointer-events:none}.box-title{color:#c7e9aa}.box-line{margin-top:4px;color:#dce8d3}.choices{display:grid;gap:3px}.choice-title{display:flex;gap:7px;align-items:center;margin-bottom:5px;color:#a9c794;letter-spacing:.12em;font-size:9px}.choice{display:flex;gap:9px;align-items:center;padding:4px 6px;color:#99a892}.choice[data-selected=true]{background:#253322;color:#e4f2d9;box-shadow:inset 2px 0 #b9df8a}.choice-cursor{width:8px;color:#c8e9a9}.choice[data-selected=true] .choice-cursor{animation:tick .8s steps(2,end) infinite}.meter-wrap{display:grid;grid-template-columns:1fr auto;gap:8px 12px;align-items:center}.meter-label{color:#dce8d3}.meter-value{color:#b9df8a}.meter-grid{grid-column:1/-1;display:grid;grid-template-columns:repeat(16,1fr);gap:3px}.meter-grid i{aspect-ratio:1;background:#273326;box-shadow:inset 0 -1px #1b251b}.meter-grid i[data-filled=true]{background:#8db873;box-shadow:inset 0 -1px #59764d}.meter-grid i:nth-child(4n+1){clip-path:polygon(0 0,100% 0,100% 75%,75% 75%,75% 100%,0 100%)}.spinner-demo{display:flex;align-items:center;gap:10px;color:#dce8d3}.spinner-grid{display:grid;grid-template-columns:repeat(3,6px);grid-template-rows:repeat(3,6px);gap:3px}.spinner-grid i{width:6px;height:6px;background:#354333;animation:pixel-hop 1.2s steps(1,end) infinite}.spinner-grid i:nth-child(1){animation-delay:0s}.spinner-grid i:nth-child(2){animation-delay:.1s}.spinner-grid i:nth-child(3){animation-delay:.2s}.spinner-grid i:nth-child(4){animation-delay:.7s}.spinner-grid i:nth-child(5){background:#b9df8a;animation-delay:.3s}.spinner-grid i:nth-child(6){animation-delay:.6s}.spinner-grid i:nth-child(7){animation-delay:.5s}.spinner-grid i:nth-child(8){animation-delay:.4s}.spinner-grid i:nth-child(9){animation-delay:.8s}.spinner-label small{display:block;margin-top:3px;color:#8b9c84}.step-rail{display:flex;align-items:center;gap:5px}.step-chip{display:flex;align-items:center;gap:5px;color:#8b988b}.step-chip[data-state=done]{color:#b7d49c}.step-chip[data-state=active]{color:#e4ebdf}.step-chip b{font-weight:400}.step-connector{height:3px;flex:1;max-width:28px;background:repeating-linear-gradient(90deg,#52684b 0 3px,transparent 3px 5px)}.wave-demo{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:10px;color:#dce8d3}.wave-grid{display:grid;grid-template-columns:repeat(18,5px);grid-template-rows:repeat(4,5px);gap:2px}.wave-pixel{width:5px;height:5px;background:#253224}.wave-pixel[data-on=true]{background:#9bc67d;animation:wave-glint 1.8s steps(2,end) infinite;animation-delay:calc(var(--x)*-75ms)}.wave-label small{display:block;margin-top:4px;color:#8b9c84}.agent-list{display:grid;grid-template-columns:1fr 1fr;gap:7px 14px}.agent-row{display:grid;grid-template-columns:7px auto;gap:2px 7px;align-items:center;color:#dce8d3}.agent-row i{width:6px;height:6px;background:#9bc67d;box-shadow:1px 1px #364c2c}.agent-row[data-state=thinking] i{background:#c3a8e8}.agent-row[data-state=waiting] i{background:#dbb980}.agent-row[data-state=done] i{background:#78996a}.agent-row[data-state=failed] i{background:#d18c82}.agent-row small{grid-column:2;color:#879488;font-size:9px}.stream-demo{color:#dce8d3;line-height:1.8}.stream-cursor{display:inline-block;width:7px;height:7px;margin-left:3px;background:#9bc67d;box-shadow:2px 2px #40583a;animation:blink .7s steps(2,end) infinite}
  @keyframes pixel-hop{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-2px)}}@keyframes wave-glint{50%{opacity:.25;transform:translateY(-2px)}}@keyframes blink{50%{opacity:.25}}@keyframes tick{50%{opacity:.3;transform:translateY(-1px)}}
  @media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;

const esc = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]);

class PixelTerminal extends HTMLElementBase {
  static get observedAttributes() { return ["variant", "command", "label"]; }
  constructor() { super(); this.attachShadow({ mode: "open" }); this.stepIndex = 1; this.running = false; this.sessionActive = true; this.confirmed = false; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  get variant() { const value = this.getAttribute("variant"); return VARIANTS.includes(value) ? value : "prompt"; }
  emit(state) { this.dispatchEvent(new CustomEvent("pixel-terminal-change", { detail: { variant: this.variant, state }, bubbles: true, composed: true })); }
  shell(content) {
    const title = esc(this.getAttribute("label") || "pixel terminal");
    return `<section class="terminal" aria-label="${title}"><header class="bar"><span class="pixels" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>${title}</span><span class="path">PIXEL / CLI</span></header><div class="body">${content}</div></section>`;
  }
  render() {
    const command = esc(this.getAttribute("command") || "pnpm build");
    const views = {
      prompt: `<form class="prompt-form"><div class="line"><span class="prompt">pixel<span class="muted">/app</span> $</span><span class="command">&nbsp;</span></div><div class="input-row"><span class="prompt" aria-hidden="true">›</span><input aria-label="Terminal command" value="${command}" spellcheck="false" autocomplete="off"><button class="run" type="submit">RUN <span aria-hidden="true">↵</span></button></div><div class="output" role="status" aria-live="polite" hidden></div></form>`,
      output: `<div class="line"><span class="prompt">$</span><span class="command">${command}</span></div><div class="output result" role="status" aria-live="polite">Building for production…<br><span class="muted">✓ 24 modules bundled</span><br><span class="output-success">Done in 1.8s · exit 0</span></div><span class="cursor" aria-hidden="true"></span>`,
      tasks: `<div class="line"><span class="prompt">$</span><span class="command">agent run build --watch</span></div><div class="steps" role="list"><div class="step" role="listitem" data-step="0" data-state="done"><span class="mark">✓</span>resolve dependencies</div><div class="step" role="listitem" data-step="1" data-state="active"><span class="mark">›</span>compile 12 files</div><div class="step" role="listitem" data-step="2" data-state="pending"><span class="mark">·</span>verify output</div></div><button class="action next-step" type="button" style="margin-top:10px">Advance step</button>`,
      confirm: `<div class="line"><span class="prompt">$</span><span class="command">deploy --environment production</span></div><div class="confirm" role="group" aria-label="Deployment confirmation"><b>Confirm before running</b>Deploy 3 changed files to production?</div><div class="actions"><button class="action danger approve" type="button">Run deploy</button><button class="action cancel" type="button">Cancel</button></div><div class="output confirm-result" role="status" aria-live="polite"></div>`,
      diff: `<div class="diff-head"><span>git diff --stat</span><span><span style="color:#b9d99f">+8</span> <span style="color:#d6a29a">−2</span></span></div><div class="diff-lines" aria-label="Code changes"><div class="muted">src/agent.ts</div><div class="diff-line remove">− const mode = "idle";</div><div class="diff-line add">+ const mode = "thinking";</div><div class="diff-line add">+ await agent.run(task);</div></div>`,
      session: `<div class="line"><span class="prompt">$</span><span class="command">${command}</span></div><div class="session ${this.sessionActive ? "" : "stopped"}"><i class="led" aria-hidden="true"></i><span class="session-state">${this.sessionActive ? "RUNNING" : "STOPPED"}</span><span class="url">localhost:5173</span><button type="button" class="stop">${this.sessionActive ? "Stop" : "Restart"}</button></div><div class="session-detail">${this.sessionActive ? "pid 2481 · ready in 320 ms" : "process exited · code 0"}</div>`,
      box: `<div class="pixel-box"><div class="box-title">▣ BUILD COMPLETE</div><div class="box-line">12 files compiled</div><div class="box-line">0 errors · 1.42s</div></div>`,
      choices: `<div class="choices"><div class="choice-title"><span>▛</span> SELECT TARGET</div><div class="choice" data-selected="false"><span class="choice-cursor">·</span>Development</div><div class="choice" data-selected="true"><span class="choice-cursor">▶</span>Production</div><div class="choice" data-selected="false"><span class="choice-cursor">·</span>Preview</div></div>`,
      steps: `<div class="step-rail" role="list"><span class="step-chip" data-state="done"><b>▣</b>Plan</span><i class="step-connector"></i><span class="step-chip" data-state="active"><b>■</b>Build</span><i class="step-connector"></i><span class="step-chip" data-state="pending"><b>□</b>Ship</span></div>`,
      meter: `<div class="meter-wrap"><span class="meter-label">CONTEXT WINDOW</span><span class="meter-value">68%</span><div class="meter-grid" aria-label="68 percent used">${Array.from({length:32}, (_, index) => `<i${index < 22 ? ' data-filled="true"' : ''}></i>`).join('')}</div></div>`,
      spinner: `<div class="spinner-demo"><span class="spinner-grid" aria-hidden="true">${Array.from({length:9}, () => '<i></i>').join('')}</span><span class="spinner-label">INDEXING FILES<small>12 / 48 modules</small></span></div>`,
      wave: `<div class="wave-demo"><span class="wave-grid" aria-hidden="true">${Array.from({length:72}, (_, index) => { const x = index % 18; const row = Math.floor(index / 18); const height = Math.round((Math.sin(x * .72) + 1) * 2); return `<i class="wave-pixel" data-on="${row >= 4 - height}" style="--x:${x}"></i>`; }).join('')}</span><span class="wave-label">TOKEN FLOW<small>streaming response</small></span></div>`,
      agents: `<div class="agent-list"><div class="agent-row" data-state="done"><i></i><span>planner</span><small>complete · 1.2s</small></div><div class="agent-row" data-state="thinking"><i></i><span>researcher</span><small>thinking · 8s</small></div><div class="agent-row" data-state="waiting"><i></i><span>reviewer</span><small>waiting for input</small></div><div class="agent-row" data-state="running"><i></i><span>builder</span><small>writing files · 3/5</small></div></div>`,
      stream: `<div class="stream-demo">The agent found a safer approach and is now preparing the patch<span class="stream-cursor" aria-hidden="true"></span></div>`
    };
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>${this.shell(views[this.variant])}`;
    this.bind();
  }
  bind() {
    const form = this.shadowRoot.querySelector(".prompt-form");
    if (form) form.addEventListener("submit", event => {
      event.preventDefault();
      const input = form.querySelector("input");
      const output = form.querySelector(".output");
      const value = input.value.trim();
      if (!value) { input.focus(); return; }
      output.hidden = false;
      output.dataset.kind = "success";
      output.textContent = `Running ${value}…\n✓ Process finished · exit 0`;
      this.emit(`command:${value};exit:0`);
    });
    this.shadowRoot.querySelector(".next-step")?.addEventListener("click", event => {
      this.stepIndex = (this.stepIndex + 1) % 4;
      this.shadowRoot.querySelectorAll(".step").forEach((row, index) => {
        const state = index < this.stepIndex ? "done" : index === this.stepIndex ? "active" : "pending";
        row.dataset.state = state;
        row.querySelector(".mark").textContent = state === "done" ? "✓" : state === "active" ? "›" : "·";
      });
      this.emit(`active-step:${this.stepIndex}`);
    });
    this.shadowRoot.querySelector(".approve")?.addEventListener("click", () => {
      this.confirmed = true;
      const result = this.shadowRoot.querySelector(".confirm-result");
      result.dataset.kind = "success";
      result.textContent = "✓ Deployment started";
      this.emit("confirmed");
    });
    this.shadowRoot.querySelector(".cancel")?.addEventListener("click", () => {
      const result = this.shadowRoot.querySelector(".confirm-result");
      result.dataset.kind = "error";
      result.textContent = "Command cancelled";
      this.emit("cancelled");
    });
    this.shadowRoot.querySelector(".stop")?.addEventListener("click", () => {
      this.sessionActive = !this.sessionActive;
      this.render();
      this.emit(this.sessionActive ? "running" : "stopped");
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("pixel-terminal")) customElements.define("pixel-terminal", PixelTerminal);

export { PixelTerminal, VARIANTS as PIXEL_TERMINAL_VARIANTS };
