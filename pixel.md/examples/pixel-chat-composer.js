const STYLES = `
  :host{display:block;width:100%;max-width:100%;container-type:inline-size;font-family:ui-sans-serif,system-ui,sans-serif;--composer-bg:#171d19;--composer-ink:#eef4eb;--composer-muted:#8f9c90;--composer-line:#465848;--composer-accent:#b9ec76}
  :host([theme="light"]){--composer-bg:#fbfcf8;--composer-ink:#233027;--composer-muted:#7f8e7e;--composer-line:#b8c7b3;--composer-accent:#689a3c}
  :host([variant="ledger"]){--composer-bg:#fcfdf8;--composer-ink:#223127;--composer-muted:#788a77;--composer-line:#bacbb5;--composer-accent:#648f3d}
  :host([variant="relay"]){--composer-bg:#111b1f;--composer-ink:#e7f1ed;--composer-muted:#8fa7a2;--composer-line:#3d5a5d;--composer-accent:#8edbc4}
  :host([variant="voxel"]){--composer-bg:#252923;--composer-ink:#f1f5e9;--composer-muted:#a3b2a0;--composer-line:#536153;--composer-accent:#d0f58c}
  :host([variant="plain"]){--composer-bg:#1c211f;--composer-ink:#f0f2ed;--composer-muted:#929d96;--composer-line:#464f49;--composer-accent:#a7c6ac}
  *{box-sizing:border-box}
  .frame{position:relative;isolation:isolate;overflow:hidden;min-height:150px;padding:14px 16px 12px;background:var(--composer-bg);border:1px solid var(--composer-line);color:var(--composer-ink);box-shadow:4px 4px 0 color-mix(in srgb,var(--composer-accent) 45%,transparent);transition:border-color .18s,box-shadow .18s}
  .frame:focus-within{border-color:var(--composer-accent);box-shadow:4px 4px 0 color-mix(in srgb,var(--composer-accent) 65%,transparent)}
  .spark{position:absolute;left:0;top:0;width:4px;height:4px;z-index:3;pointer-events:none;background:var(--composer-accent);transform:translate3d(14px,0,0)}
  .spark:nth-child(2){opacity:.48;width:3px;height:3px}.spark:nth-child(3){opacity:.2;width:2px;height:2px}
  .top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:12px;height:25px}
  button,select,textarea{font:inherit}.mention,.attach,.send{display:grid;place-items:center;cursor:pointer;border:1px solid var(--composer-line);color:var(--composer-ink);background:transparent}
  .mention{width:25px;height:25px;font:600 14px/1 ui-monospace,SFMono-Regular,Menlo,monospace}
  .mention:hover,.attach:hover{border-color:var(--composer-accent);color:var(--composer-accent)}
  .signal{display:flex;align-items:center;gap:7px;color:var(--composer-muted);font:9px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.09em}
  .signal i{display:block;width:4px;height:4px;background:var(--composer-accent);box-shadow:5px 0 0 color-mix(in srgb,var(--composer-accent) 48%,transparent)}
  textarea{position:relative;z-index:1;display:block;width:100%;min-height:44px;max-height:130px;resize:none;padding:12px 1px 4px;margin:0;border:0;outline:0;background:transparent;color:var(--composer-ink);font:400 14px/1.55 ui-sans-serif,system-ui,sans-serif;overflow:auto}
  textarea::placeholder{color:var(--composer-muted);opacity:1}
  .files{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 0}.files:empty{display:none}
  .file{display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:4px 5px 4px 7px;border:1px solid var(--composer-line);color:var(--composer-muted);font:9px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace}
  .file span{max-width:125px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file button{padding:0;border:0;background:none;color:var(--composer-muted);cursor:pointer;font:12px/1 ui-monospace,SFMono-Regular,Menlo,monospace}.file button:hover{color:var(--composer-accent)}
  .bottom{position:relative;z-index:1;display:flex;align-items:center;gap:6px;min-height:31px;margin-top:9px}
  .attach{width:29px;height:29px;flex:0 0 29px;font:20px/1 ui-monospace,SFMono-Regular,Menlo,monospace}
  .select{position:relative;display:inline-flex;align-items:center;min-width:0;border:1px solid var(--composer-line);height:29px}
  .select:after{content:"⌄";position:absolute;right:7px;top:3px;color:var(--composer-muted);pointer-events:none;font:14px ui-monospace,SFMono-Regular,Menlo,monospace}
  select{appearance:none;min-width:0;height:100%;padding:0 22px 0 9px;border:0;outline:0;background:transparent;color:var(--composer-ink);cursor:pointer;font:10px ui-monospace,SFMono-Regular,Menlo,monospace}
  select:focus-visible,.mention:focus-visible,.attach:focus-visible,.send:focus-visible{outline:1px solid var(--composer-accent);outline-offset:2px}
  .hint{margin-left:auto;margin-right:9px;color:var(--composer-muted);font:9px ui-monospace,SFMono-Regular,Menlo,monospace;white-space:nowrap}
  .send{width:31px;height:31px;flex:0 0 31px;border-color:var(--composer-accent);background:var(--composer-accent);color:#182219;font:18px/1 ui-monospace,SFMono-Regular,Menlo,monospace}
  .send:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px)}.send:disabled{cursor:default;border-color:var(--composer-line);background:color-mix(in srgb,var(--composer-line) 35%,transparent);color:var(--composer-muted)}
  :host([variant="ledger"]) .frame{box-shadow:0 3px 0 #dce7d5;background-image:linear-gradient(90deg,transparent 0 11px,#e5eddf 11px 12px,transparent 12px)}
  :host([variant="ledger"]) .frame:focus-within{box-shadow:0 3px 0 #aacb94}
  :host([variant="ledger"]) .top{height:29px;border-bottom:1px solid #dce5d5;padding-bottom:5px}
  :host([variant="ledger"]) .mention{border:0;border-right:1px solid var(--composer-line)}
  :host([variant="ledger"]) .select{border:0;border-bottom:1px solid var(--composer-line)}
  :host([variant="ledger"]) .send:not(:disabled){background:#2c4130;border-color:#2c4130;color:#eff8e8}
  :host([variant="relay"]) .frame{border-left:3px solid var(--composer-accent);box-shadow:inset 0 2px 0 #294346;background-image:linear-gradient(135deg,#18282c 0%,#111b1f 65%)}
  :host([variant="relay"]) .frame:focus-within{box-shadow:inset 0 2px 0 #3c6866}
  :host([variant="relay"]) .top{border-bottom:1px solid #2a4549;padding-bottom:4px;height:28px}
  :host([variant="relay"]) textarea{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}
  :host([variant="relay"]) .send:not(:disabled){background:transparent;color:var(--composer-accent);box-shadow:inset 2px 2px 0 #315657}
  :host([variant="voxel"]) .frame{box-shadow:5px 5px 0 #819469;background-image:linear-gradient(135deg,#2c332a 0%,#222821 70%)}
  :host([variant="voxel"]) .frame:focus-within{box-shadow:5px 5px 0 #a6c67d}
  :host([variant="voxel"]) .mention,:host([variant="voxel"]) .attach{box-shadow:2px 2px 0 #4b6447}
  :host([variant="voxel"]) .select{box-shadow:2px 2px 0 #3c4e3a}
  :host([variant="voxel"]) .send:not(:disabled){box-shadow:3px 3px 0 #739a51}
  :host([variant="plain"]) .frame,:host([variant="plain"]) .frame:focus-within{border-radius:9px;box-shadow:none}
  :host([variant="plain"]) .spark,:host([variant="plain"]) .signal{display:none}
  :host([variant="plain"]) .mention,:host([variant="plain"]) .attach,:host([variant="plain"]) .select,:host([variant="plain"]) .send{border-radius:5px}
  input[type="file"]{display:none}
  :host([compact]) .frame{min-height:112px;padding:9px 11px 9px}
  :host([compact]) .top{height:20px}:host([compact]) .mention{width:21px;height:21px;font-size:12px}:host([compact]) .signal{font-size:8px}
  :host([compact]) textarea{min-height:32px;max-height:90px;padding-top:9px;font-size:11px}
  :host([compact]) .bottom{margin-top:5px}:host([compact]) .hint{display:none}:host([compact]) .send{margin-left:auto}
  :host([disabled]) .frame{opacity:.55}:host([disabled]) .spark{display:none}
  @container(max-width:460px){.hint{display:none}.send{margin-left:auto}}
  @media(max-width:440px){.hint{display:none}.send{margin-left:auto}.frame{padding:11px}.select select{font-size:9px}}
  @media(prefers-reduced-motion:reduce){.frame,.send{transition:none}}
`;

class PixelChatComposer extends HTMLElement {
  static get observedAttributes(){return ["placeholder","value","mode","model","disabled","busy","compact","theme","variant"]}
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.files=[];
    this.frameId=null;
    this.motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    this.onMotionChange=()=>this.startTrace();
    this.size={width:0,height:0};
  }
  connectedCallback(){
    this.shadowRoot.innerHTML=`<style>${STYLES}</style>
      <div class="frame">
        <i class="spark" aria-hidden="true"></i><i class="spark" aria-hidden="true"></i><i class="spark" aria-hidden="true"></i>
        <div class="top"><button class="mention" type="button" aria-label="Insert mention" title="Insert @ mention">@</button><span class="signal"><i></i>PIXEL / COMPOSE</span></div>
        <textarea rows="2" aria-label="Message" placeholder="Ask your agent anything…"></textarea>
        <div class="files" aria-live="polite"></div>
        <div class="bottom">
          <button class="attach" type="button" aria-label="Attach files" title="Attach files">+</button>
          <span class="select"><select class="mode" aria-label="Conversation mode"><option value="agent">Agent</option><option value="chat">Chat</option></select></span>
          <span class="select"><select class="model" aria-label="Work mode"><option value="auto">Auto</option><option value="fast">Fast</option><option value="deep">Deep</option></select></span>
          <span class="hint">ENTER TO SEND · ⇧ ENTER NEW LINE</span>
          <button class="send" type="button" aria-label="Send message" disabled>↑</button>
        </div>
        <input class="file-input" type="file" multiple aria-label="Choose files" />
      </div>`;
    const root=this.shadowRoot;
    this.textarea=root.querySelector("textarea");
    this.frame=root.querySelector(".frame");
    this.sparks=[...root.querySelectorAll(".spark")];
    this.fileInput=root.querySelector(".file-input");
    if(this.hasAttribute("value"))this.textarea.value=this.getAttribute("value");
    this.textarea.addEventListener("input",()=>{this.resizeInput();this.updateSend();this.dispatchEvent(new CustomEvent("composer-input",{detail:{value:this.value},bubbles:true,composed:true}))});
    this.textarea.addEventListener("keydown",event=>{if(event.key==="Enter"&&!event.shiftKey&&!event.isComposing){event.preventDefault();this.submit()}});
    root.querySelector(".send").addEventListener("click",()=>this.submit());
    root.querySelector(".mention").addEventListener("click",()=>this.insertMention());
    root.querySelector(".attach").addEventListener("click",()=>this.fileInput.click());
    this.fileInput.addEventListener("change",()=>{this.files.push(...this.fileInput.files);this.fileInput.value="";this.renderFiles();this.updateSend()});
    for(const select of root.querySelectorAll("select"))select.addEventListener("change",()=>{this.setAttribute(select.className,select.value);this.dispatchEvent(new CustomEvent("composer-options",{detail:{mode:this.mode,model:this.model},bubbles:true,composed:true}))});
    this.observer=new ResizeObserver(()=>{const rect=this.frame.getBoundingClientRect();this.size={width:rect.width,height:rect.height};this.positionTrace(performance.now())});
    this.observer.observe(this.frame);
    this.motion.addEventListener("change",this.onMotionChange);
    this.sync();
    this.startTrace();
  }
  disconnectedCallback(){
    cancelAnimationFrame(this.frameId);
    this.observer?.disconnect();
    this.motion.removeEventListener("change",this.onMotionChange);
  }
  attributeChangedCallback(name){if(this.isConnected){if(name==="value")this.textarea.value=this.getAttribute("value")||"";this.sync();if(name==="disabled"||name==="variant")this.startTrace()}}
  get value(){return this.textarea?this.textarea.value:(this.getAttribute("value")||"")}
  set value(value){if(this.textarea){this.textarea.value=String(value);this.resizeInput();this.updateSend()}else this.setAttribute("value",String(value))}
  get mode(){return this.shadowRoot.querySelector(".mode")?.value||"agent"}
  get model(){return this.shadowRoot.querySelector(".model")?.value||"auto"}
  focus(){this.textarea?.focus()}
  clear(){this.value="";this.files=[];this.renderFiles();this.updateSend()}
  resizeInput(){if(!this.textarea)return;this.textarea.style.height="auto";this.textarea.style.height=Math.min(this.textarea.scrollHeight,this.hasAttribute("compact")?90:130)+"px"}
  updateSend(){
    const button=this.shadowRoot.querySelector(".send");
    if(!button)return;
    const busy=this.hasAttribute("busy"),disabled=this.hasAttribute("disabled");
    button.disabled=disabled||(!busy&&!this.value.trim()&&!this.files.length);
    button.textContent=busy?"■":"↑";
    button.setAttribute("aria-label",busy?"Stop generation":"Send message");
  }
  sync(){
    if(!this.textarea)return;
    this.textarea.placeholder=this.getAttribute("placeholder")||"Ask your agent anything…";
    const mode=this.shadowRoot.querySelector(".mode"),model=this.shadowRoot.querySelector(".model");
    mode.value=["agent","chat"].includes(this.getAttribute("mode"))?this.getAttribute("mode"):"agent";
    model.value=["auto","fast","deep"].includes(this.getAttribute("model"))?this.getAttribute("model"):"auto";
    const disabled=this.hasAttribute("disabled");
    this.textarea.disabled=disabled;
    this.fileInput.disabled=disabled;
    for(const control of this.shadowRoot.querySelectorAll(".mention,.attach,select"))control.disabled=disabled;
    this.updateSend();
    this.resizeInput();
  }
  insertMention(){
    const input=this.textarea,start=input.selectionStart,end=input.selectionEnd;
    input.setRangeText("@",start,end,"end");
    input.focus();this.resizeInput();this.updateSend();
    this.dispatchEvent(new CustomEvent("composer-input",{detail:{value:this.value},bubbles:true,composed:true}));
  }
  renderFiles(){
    const list=this.shadowRoot.querySelector(".files");
    list.replaceChildren();
    this.files.forEach((file,index)=>{
      const chip=document.createElement("span");chip.className="file";
      const name=document.createElement("span");name.textContent=file.name;
      const remove=document.createElement("button");remove.type="button";remove.textContent="×";remove.setAttribute("aria-label",`Remove ${file.name}`);
      remove.addEventListener("click",()=>{this.files.splice(index,1);this.renderFiles();this.updateSend()});
      chip.append(name,remove);list.append(chip);
    });
  }
  submit(){
    if(this.hasAttribute("disabled"))return;
    if(this.hasAttribute("busy")){this.dispatchEvent(new CustomEvent("composer-stop",{bubbles:true,composed:true}));return}
    const text=this.value.trim();
    if(!text&&!this.files.length)return;
    const event=new CustomEvent("composer-submit",{detail:{text,mode:this.mode,model:this.model,files:[...this.files]},bubbles:true,composed:true,cancelable:true});
    if(this.dispatchEvent(event))this.clear();
  }
  startTrace(){
    cancelAnimationFrame(this.frameId);
    if(!this.frame)return;
    this.traceStart=performance.now();
    if(this.getAttribute("variant")==="plain")return;
    if(this.motion.matches||this.hasAttribute("disabled")){this.positionTrace(this.traceStart);return}
    const tick=now=>{this.positionTrace(now);this.frameId=requestAnimationFrame(tick)};
    this.frameId=requestAnimationFrame(tick);
  }
  positionTrace(now){
    const {width,height}=this.size;
    if(width<8||height<8)return;
    const xMax=width-4,yMax=height-4,perimeter=2*(xMax+yMax);
    const variant=this.getAttribute("variant")||"trace";
    const elapsed=this.motion.matches?0:(now-this.traceStart);
    const head=this.motion.matches?Math.min(24,xMax):elapsed*.13%perimeter;
    this.sparks.forEach((spark,index)=>{
      let x,y;
      if(variant==="ledger"){
        x=(this.motion.matches?xMax*.22:elapsed*.09-index*9+xMax)%xMax;y=yMax;
      }else if(variant==="relay"){
        const travel=(this.motion.matches?xMax*.35:elapsed*.14-index*9+xMax*2)%(xMax*2);
        x=travel<xMax?travel:xMax*2-travel;y=0;
      }else if(variant==="voxel"){
        const travel=(this.motion.matches?yMax*.3:elapsed*.09-index*8+yMax*2)%(yMax*2);
        x=xMax;y=travel<yMax?travel:yMax*2-travel;
      }else{
        let distance=(head-index*8+perimeter)%perimeter;
        if(distance<xMax){x=distance;y=0}
        else if((distance-=xMax)<yMax){x=xMax;y=distance}
        else if((distance-=yMax)<xMax){x=xMax-distance;y=yMax}
        else{x=0;y=yMax-(distance-xMax)}
      }
      spark.style.transform=`translate3d(${Math.round(x/2)*2}px,${Math.round(y/2)*2}px,0)`;
    });
  }
}
if(!customElements.get("pixel-chat-composer"))customElements.define("pixel-chat-composer",PixelChatComposer);
export { PixelChatComposer };
