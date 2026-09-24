const HTMLElementBase = globalThis.HTMLElement || class {};
const STATES = {
  thinking: "Thinking",
  searching: "Searching",
  browsing: "Browsing",
  reading: "Reading",
  planning: "Planning",
  acting: "Acting",
  building: "Building",
  tool: "Using tool",
  verifying: "Verifying",
  responding: "Responding",
};

const CSS = `
  :host{display:inline-block;max-width:100%;color:var(--pixel-ink,#26342d);font-family:ui-sans-serif,system-ui,sans-serif;--pixel-ink:#26342d;--pixel-muted:#849189;--pixel-accent:#79a852}
  *{box-sizing:border-box}
  .status{display:inline-flex;align-items:center;gap:8px;max-width:100%;min-height:34px;vertical-align:middle}
  canvas{display:block;width:32px;height:32px;flex:0 0 32px;image-rendering:pixelated}
  .copy{min-width:0;display:inline-flex;align-items:baseline;gap:7px;white-space:nowrap}
  .label{font-size:12px;font-weight:500;line-height:1.25;overflow:hidden;text-overflow:ellipsis}
  .detail{color:var(--pixel-muted);font-size:10px;line-height:1.25;overflow:hidden;text-overflow:ellipsis}
  .detail:before{content:"·";margin-right:7px}.detail[hidden]{display:none}
  :host([compact]) .status{min-height:28px;gap:6px}
  :host([compact]) canvas{width:26px;height:26px;flex-basis:26px}
  :host([compact]) .label{font-size:11px}:host([compact]) .detail{font-size:9px}
  :host([size="large"]) .status{min-height:46px;gap:12px}
  :host([size="large"]) canvas{width:40px;height:40px;flex-basis:40px}
  :host([size="large"]) .copy{display:flex;flex-direction:column;align-items:flex-start;gap:4px}
  :host([size="large"]) .label{font-size:16px}:host([size="large"]) .detail{font-size:11px}
  :host([size="large"]) .detail:before{content:none;margin:0}
  :host([theme="dark"]){--pixel-ink:#e6ede6;--pixel-muted:#94a69a;--pixel-accent:#c6f082}
`;

const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const p=clamp(value); return p*p*(3-2*p); };
const mix = (a,b,p) => a+(b-a)*p;

function pixel(ctx,x,y,size,color,opacity=1,lit=false) {
  x=Math.round(x);y=Math.round(y);
  if(lit){
    ctx.globalAlpha=opacity*.12;
    ctx.fillStyle=color;
    ctx.fillRect(x-2,y-2,size+4,size+4);
  }
  ctx.globalAlpha=opacity;
  ctx.fillStyle=color;
  ctx.fillRect(x,y,size,size);
  ctx.globalAlpha=1;
}
function face(ctx,points,color,opacity=1){
  ctx.globalAlpha=opacity;
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(Math.round(points[0][0]),Math.round(points[0][1]));
  for(let i=1;i<points.length;i++)ctx.lineTo(Math.round(points[i][0]),Math.round(points[i][1]));
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha=1;
}

function draw(ctx,state,seconds,palette) {
  ctx.clearRect(0,0,40,40);
  const t=Math.floor(seconds*24)/24;
  const {ink,muted,accent}=palette;
  if(state==="thinking"){
    const phase=t%2.8;
    const inward=ease(phase/1.05);
    const outward=ease((phase-1.4)/1.15);
    const fold=phase<1.4?inward:1-outward;
    const from=[[8,8],[28,8],[8,28],[28,28]];
    const into=[[16,15],[22,15],[16,23],[22,23]];
    const through=[[28,28],[8,28],[28,8],[8,8]];
    from.forEach(([x,y],i)=>{
      const px=phase<1.4?mix(x,into[i][0],inward):mix(into[i][0],through[i][0],outward);
      const py=phase<1.4?mix(y,into[i][1],inward):mix(into[i][1],through[i][1],outward);
      pixel(ctx,px,py,3,ink,.65+fold*.35);
      if(fold>.45){
        const anchor=phase<1.4?[x,y]:into[i];
        pixel(ctx,mix(px,anchor[0],.18),mix(py,anchor[1],.18),2,muted,.27);
      }
    });
    pixel(ctx,18,18,4,accent,.44+fold*.56,fold>.55);
    pixel(ctx,5,19,2,muted,.28);pixel(ctx,33,19,2,muted,.28);
  } else if(state==="searching"){
    for(let i=0;i<9;i++){
      const angle=i*Math.PI*2/9+t*1.55-Math.PI/2;
      const radius=10.5+(i%3===0?1:0);
      const x=19+Math.cos(angle)*radius;
      const y=19+Math.sin(angle)*radius;
      pixel(ctx,x,y,i===0?3:2,i===0?accent:i<4?ink:muted,i===0?1:1-i*.055,i===0);
    }
    pixel(ctx,19,19,2,muted,.55);
  } else if(state==="browsing"){
    const phase=(t%3.3)/3.3, travel=ease(phase);
    for(let i=0;i<3;i++){
      const x=7+i*10, y=13+(i%2)*3;
      pixel(ctx,x,y,3,ink,.72);
      pixel(ctx,x+3,y+6,2,muted,.55);
      pixel(ctx,x,y+12,2,muted,.55);
    }
    const x=8+travel*21, y=10-Math.sin(travel*Math.PI)*3;
    pixel(ctx,x,y,3,accent,1,true);
    pixel(ctx,x-4,y+1,2,accent,.34);
  } else if(state==="reading"){
    const phase=(t%2.4)/2.4;
    const scan=13+Math.round(ease(phase)*13);
    for(let row=0;row<3;row++)for(let col=0;col<3;col++){
      const y=13+row*6;
      const distance=Math.abs(y-scan);
      pixel(ctx,12+col*6,y,distance<3&&col===1?3:2,distance<3?accent:y<scan?ink:muted,distance<3?1:(y<scan?0.85:0.56),distance<3&&col===1);
    }
  } else if(state==="planning"){
    const period=3.6, phase=t%period, choice=[0,2,1][Math.floor(t/period)%3];
    const fan=ease(phase/.72);
    for(let branch=0;branch<3;branch++){
      pixel(ctx,18,10+branch*9,2,muted,.48);
      pixel(ctx,12,14+branch*5,2,muted,.36);
      pixel(ctx,25,14+branch*5,2,muted,.36);
    }
    pixel(ctx,6,18,3,ink);
    pixel(ctx,32,18,3,phase>2.5?accent:muted,phase>2.5?1:.7,phase>2.5);
    for(let branch=0;branch<3;branch++){
      const bx=mix(10,18,fan), by=mix(19,10+branch*9,fan);
      const selected=branch===choice;
      let alpha=phase>1.65&&!selected ? 0.28 : 0.72;
      if(phase>.72&&phase<1.65){
        const focus=Math.floor((phase-.72)/.31)%3;
        if(branch===focus)alpha=1;
      }
      pixel(ctx,bx,by,3,selected&&phase>1.65?accent:ink,alpha,selected&&phase>1.65);
      if(selected&&phase>1.65){
        pixel(ctx,12,14+branch*5,2,accent,.7);
        pixel(ctx,25,14+branch*5,2,accent,.7);
      }
    }
    if(phase>1.65){
      const q=ease((phase-1.65)/1.05);
      const cy=10+choice*9;
      pixel(ctx,mix(18,31,q),mix(cy,19,q),3,accent,1,true);
      if(q>.2)pixel(ctx,mix(18,31,Math.max(0,q-.18)),mix(cy,19,Math.max(0,q-.18)),2,accent,.38);
    }
  } else if(state==="acting"){
    const phase=(t%3.2)/3.2, progress=Math.min(3,phase*3.8);
    const steps=[[7,27],[14,22],[21,17],[28,12]];
    steps.forEach(([x,y],i)=>{
      const completed=progress>=i;
      pixel(ctx,x,y,3,completed?ink:muted,completed?1:.52);
      if(i<3)pixel(ctx,x+4,y-2,2,muted,.32);
    });
    const step=Math.min(2,Math.floor(progress)), local=ease(progress-step);
    const [sx,sy]=steps[step], [ex,ey]=steps[step+1];
    pixel(ctx,mix(sx,ex,local),mix(sy,ey,local)-Math.sin(local*Math.PI)*4,3,accent,1,true);
  } else if(state==="building"){
    const phase=t%3.1;
    const blocks=[[11,27],[17,27],[23,27],[29,27],[14,21],[20,21],[26,21],[17,15],[23,15]];
    blocks.forEach(([x,y],i)=>{
      pixel(ctx,x,y,2,muted,.32);
      const arrival=ease((phase-i*.13)/.65);
      const leave=ease((phase-2.5-i*.035)/.45);
      const yy=y-(1-arrival)*9+leave*5;
      pixel(ctx,x,yy,3,i===8&&arrival>.8?accent:ink,(.35+arrival*.65)*(1-leave),i===8&&arrival>.8);
    });
  } else if(state==="tool"){
    const phase=t%3.2;
    for(let i=0;i<4;i++){
      pixel(ctx,7+i*8,12,i===0||i===3?3:2,i===0||i===3?ink:muted,i===0||i===3?0.75:0.55);
      pixel(ctx,7+i*8,26,i===0||i===3?3:2,i===0||i===3?ink:muted,i===0||i===3?0.75:0.55);
    }
    const outbound=phase<1.6;
    const progress=outbound?ease(phase/1.25):ease((phase-1.6)/1.25);
    const x=outbound?mix(7,31,progress):mix(31,7,progress);
    const y=outbound?12:26;
    pixel(ctx,x,y,4,accent,1,true);
    pixel(ctx,x+(outbound?-5:5),y,2,accent,.28);
    if(phase>1.25&&phase<1.85)pixel(ctx,31,18,3,ink,.9,true);
    if(phase>2.85)pixel(ctx,7,19,2,ink,.75);
  } else if(state==="verifying"){
    const phase=t%3.2, inspect=ease(phase/1.2);
    const confirmed=ease((phase-1.15)/.45)*(1-ease((phase-2.7)/.5));
    const lift=Math.round(Math.sin(clamp((phase-1.15)/1.9)*Math.PI)*3);
    const y=16-lift;
    face(ctx,[[12,y-3],[20,y+1],[20,y+11],[12,y+7]],ink,.94);
    face(ctx,[[20,y+1],[28,y-3],[28,y+7],[20,y+11]],muted,.88);
    face(ctx,[[20,y-7],[28,y-3],[20,y+1],[12,y-3]],confirmed>.5?accent:muted,.75+confirmed*.25);
    pixel(ctx,14,y+1,2,accent,confirmed*.9);
    pixel(ctx,24,y+1,2,ink,.45);
    pixel(ctx,mix(4,11,inspect),17,2,accent,1-inspect*.65);
    pixel(ctx,mix(34,27,inspect),17,2,ink,1-inspect*.65);
    if(confirmed>.5)pixel(ctx,19,y-5,2,accent,confirmed,true);
  } else {
    const phase=t%3;
    for(let row=0;row<3;row++)for(let col=0;col<4;col++){
      const order=row*4+col;
      const x=8+col*6,y=12+row*7;
      pixel(ctx,x,y,2,muted,.28);
      const appear=ease((phase-order*.12)/.28);
      const disappear=ease((phase-2.4-order*.025)/.42);
      const fresh=phase-order*.12<.28&&appear>.15;
      pixel(ctx,x,y,fresh?3:2,fresh?accent:ink,appear*(1-disappear),fresh);
    }
  }
}

class PixelAgentStatus extends HTMLElementBase {
  static get observedAttributes(){return ["state","label","detail","compact","size","theme","announce","paused"]}
  constructor(){
    super();this.attachShadow({mode:"open"});this.timer=null;this.activeState=null;this.epoch=0;
    this.media=window.matchMedia("(prefers-reduced-motion: reduce)");
    this.onMotionChange=()=>this.start();
  }
  connectedCallback(){
    this.shadowRoot.innerHTML=`<style>${CSS}</style><span class="status" role="status" aria-live="off"><canvas width="40" height="40" aria-hidden="true"></canvas><span class="copy"><span class="label"></span><span class="detail"></span></span></span>`;
    this.ctx=this.shadowRoot.querySelector("canvas").getContext("2d");
    this.media.addEventListener("change",this.onMotionChange);
    this.update();
  }
  disconnectedCallback(){clearInterval(this.timer);this.media.removeEventListener("change",this.onMotionChange)}
  attributeChangedCallback(){if(this.isConnected&&this.shadowRoot.querySelector(".label"))this.update()}
  update(){
    const state=Object.hasOwn(STATES,this.getAttribute("state"))?this.getAttribute("state"):"searching";
    this.shadowRoot.querySelector(".label").textContent=this.getAttribute("label")||STATES[state];
    const detail=this.shadowRoot.querySelector(".detail");
    detail.textContent=this.getAttribute("detail")||"";detail.hidden=!detail.textContent;
    this.shadowRoot.querySelector(".status").setAttribute("aria-live",this.hasAttribute("announce")?"polite":"off");
    this.start();
  }
  start(){
    clearInterval(this.timer);if(!this.ctx)return;
    const state=Object.hasOwn(STATES,this.getAttribute("state"))?this.getAttribute("state"):"searching";
    const style=getComputedStyle(this);
    const palette={ink:style.getPropertyValue("--pixel-ink").trim()||"#26342d",muted:style.getPropertyValue("--pixel-muted").trim()||"#849189",accent:style.getPropertyValue("--pixel-accent").trim()||"#79a852"};
    if(state!==this.activeState){this.activeState=state;this.epoch=performance.now()}
    if(this.media.matches||this.hasAttribute("paused")){
      const staticFrame={thinking:1.2,searching:.4,browsing:1.4,reading:1.2,planning:2.1,acting:1.5,building:1.9,tool:1.4,verifying:1.9,responding:2.1};
      draw(this.ctx,state,staticFrame[state],palette);
      return;
    }
    const frame=()=>draw(this.ctx,state,(performance.now()-this.epoch)/1000,palette);
    frame();
    this.timer=setInterval(frame,42);
  }
}
if(typeof customElements!=="undefined"&&!customElements.get("pixel-agent-status"))customElements.define("pixel-agent-status",PixelAgentStatus);
export { PixelAgentStatus };
