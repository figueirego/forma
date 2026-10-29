/* Original Forma component; model/gradient operations extracted from our Pauta implementation.
 * Dependency-free UMD. Load appearance-editor.css for the compact profile. */
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AppearanceEditor=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const data={"wash":{"schema":{"stops":[{"d":62,"c":0.75,"x":-14,"y":62,"w":130,"h":46,"fade":72,"light":{"l":0.9,"a":0.85},"dark":{"l":0.42,"a":0.7}},{"d":0,"c":1,"x":-10,"y":120,"w":124,"h":62,"fade":76,"light":{"l":0.85,"a":1},"dark":{"l":0.48,"a":0.9}}]},"layers":{"light":{"highlight":"radial-gradient(74% 46% at 10% -16%, rgba(255,255,255,.96), transparent 68%)","base":"linear-gradient(180deg, #fdfeff 0%, #eef3f6 100%)","grainMultiplier":0.42},"dark":{"highlight":"radial-gradient(74% 38% at 10% -14%, rgba(255,255,255,.07), transparent 62%)","base":"linear-gradient(180deg, #141417 0%, #08080a 100%)","grainMultiplier":0.36}}}};
const clone=value=>JSON.parse(JSON.stringify(value));
const round=(value,places=3)=>{const factor=10**places,scaled=value*factor;return Number.isFinite(scaled)?Math.round(scaled)/factor:value;};
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const finite=(value,fallback)=>typeof value==='number'&&Number.isFinite(value)?value:fallback;
const bounded=(value,min,max,fallback)=>clamp(finite(value,fallback),min,max);
const wrapHue=value=>((value%360)+360)%360;
const signedHue=value=>{const hue=wrapHue(value);return hue>180?hue-360:hue;};
const stagePosition=value=>round(-45+clamp(value,0,1)*190,1);

function normalizePools(value){
 if(!Array.isArray(value))return clone(data.wash.schema.stops);
 return value.slice(0,3).map((item,index)=>{
  const pool=item&&typeof item==='object'?item:{};
  const fallback=data.wash.schema.stops[Math.min(index,data.wash.schema.stops.length-1)];
  const result={};
  // Group dragging deliberately moves other pools outside the preview. Preserve
  // those finite coordinates on save; only the selected pointer is constrained.
  for(const key of ['d','x','y'])result[key]=finite(pool[key],fallback[key]);
  for(const [key,min,max] of [['c',0,2],['w',1,200],['h',1,200],['fade',0,100]])result[key]=bounded(pool[key],min,max,fallback[key]);
  for(const mode of ['light','dark'])result[mode]={l:bounded(pool[mode]?.l,0,1,fallback[mode].l),a:bounded(pool[mode]?.a,0,1,fallback[mode].a)};
  return result;
 });
}
function anchor(config){
 const shift=config.pools.at(-1)?.d||0;
 config.hue=wrapHue(config.hue+shift);
 for(const pool of config.pools)pool.d=round(pool.d-shift,1);
 return config;
}
function setPoolHue(config,index,hue){
 const selected=config.pools[index];
 if(!selected||!Number.isFinite(hue))return;
 if(index===config.pools.length-1){
  const delta=signedHue(hue-config.hue);
  for(const pool of config.pools)if(pool!==selected)pool.d=round(pool.d-delta,1);
  config.hue=wrapHue(hue);
  selected.d=0;
 }else selected.d=round(signedHue(hue-config.hue),1);
}
function addPool(config){
 if(config.pools.length>=3)return;
 if(!config.pools.length){config.pools.push(clone(data.wash.schema.stops.at(-1)));return;}
 const [first,second]=config.pools;
 const direction=second?{x:first.x-second.x,y:first.y-second.y}:{x:-4,y:-58};
 const highest=config.pools.reduce((a,b)=>b.y<a.y?b:a);
 const offset=[120,-120,62,-62,180].find(angle=>config.pools.every(pool=>Math.abs(pool.d-angle)>=24))??120;
 const pool={d:offset,c:.85,x:round(highest.x+direction.x,1),y:round(highest.y+direction.y,1),w:118,h:58,fade:74,light:{l:.88,a:.8},dark:{l:.45,a:.75}};
 config.pools.splice(config.pools.length-1,0,pool);
}
function maximumDistance(pools,selected){return Math.max(0,...pools.map(pool=>Math.hypot(pool.x-selected.x,pool.y-selected.y)));}
function distance(pools,index){const selected=pools[index]||pools.at(-1);return selected?maximumDistance(pools,selected):0;}
function setDistance(pools,index,value){
 if(pools.length<2||!Number.isFinite(value))return;
 const selected=pools[index]||pools.at(-1),requested=clamp(value,0,150);
 const current=maximumDistance(pools,selected),others=pools.filter(pool=>pool!==selected);
 const anchorInStage=selected.x>=-45&&selected.x<=145&&selected.y>=-45&&selected.y<=145;
 if(current<.5){
  others.forEach((pool,i)=>{const y=selected.y-requested*(i+1)/others.length;pool.x=round(selected.x,1);pool.y=round(anchorInStage?clamp(y,-45,145):y,1);});
  return;
 }
 const fittingScale=(delta,position)=>Math.abs(delta)<.001?Infinity:delta>0?(145-position)/delta:(position+45)/-delta;
 // Offstage anchors are valid saved/keyboard state. No positive edge fit can
 // contain every radial vector there; keep their direction and clip only paint.
 const fit=anchorInStage?Math.min(...others.map(pool=>Math.min(fittingScale(pool.x-selected.x,selected.x),fittingScale(pool.y-selected.y,selected.y)))):Infinity;
 const scale=Math.min(requested/current,fit);
 for(const pool of others){pool.x=round(selected.x+(pool.x-selected.x)*scale,1);pool.y=round(selected.y+(pool.y-selected.y)*scale,1);}
}
function movePools(pools,index,x,y,selectedOnly=false){
 const selected=pools[index];
 if(!selected||!Number.isFinite(x)||!Number.isFinite(y))return;
 const nextX=stagePosition(x),nextY=stagePosition(y),dx=nextX-selected.x,dy=nextY-selected.y;
 for(const pool of selectedOnly?[selected]:pools){pool.x=round(pool.x+dx,1);pool.y=round(pool.y+dy,1);}
}
function contextColor(hex){if(!/^#[0-9a-f]{6}$/i.test(hex||''))return null;const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);const [r,g,b]=rgb;const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);const a=1.9779984951*l-2.428592205*m+.4505937099*s,bb=.0259040371*l+.7827717662*m-.808675766*s;return {chroma:Math.hypot(a,bb),hue:wrapHue(Math.atan2(bb,a)*180/Math.PI)};}
function resolve(config,color,previousHue){
 const context=contextColor(color),active=!config.hold&&context?.chroma>.02;
 let hue=active?context.hue:wrapHue(config.hue);
 if(Number.isFinite(previousHue)){
  let delta=(hue-previousHue)%360;
  if(delta>180)delta-=360;
  if(delta< -180)delta+=360;
  hue=previousHue+delta;
 }
 return {hue:round(hue,1),chroma:round(active?Math.min(config.chroma*1.45,.09):config.chroma),contextual:!!active};
}
function wash(mode,hue,chroma,pools=data.wash.schema.stops,grain=0){
 const model=data.wash;
 mode=mode==='dark'?'dark':'light';
 const palette=model.layers[mode];
 const layers=[palette.highlight,...pools.map(pool=>{
  const poolHue=hue+round(pool.d,1),poolChroma=chroma*round(pool.c);
  const stops=Array.from({length:9},(_,i)=>{
   const t=i/8,alpha=round(pool[mode].a*(1-t*t*(3-2*t)));
   return `oklch(${pool[mode].l} ${poolChroma} ${poolHue} / ${alpha}) ${round(t*Math.min(100,pool.fade*1.25),1)}%`;
  });
  return `radial-gradient(${pool.w}% ${pool.h}% at ${pool.x}% ${pool.y}%, ${stops.join(', ')})`;
 }),palette.base];
 if(grain>.005){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)" opacity="${round(grain*palette.grainMultiplier)}"/></svg>`;
  layers.unshift(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
 }
 return layers.join(', ');
}
const MODES=Object.freeze(['system','light','dark']);
const HUES=Object.freeze([95,72,52,36,22,6,348,330,308,285,264,243,222,200,181,158,132]);
function initial(){return {schemaVersion:1,theme:'system',hue:181,chroma:.038,grain:0,hold:false,pools:clone(data.wash.schema.stops).map((p,i)=>({...p,id:'light-'+i}))};}
function normalize(value){
 if(value==null)return initial();
 if(typeof value!=='object'||Array.isArray(value)||value.schemaVersion!==1)throw new TypeError('Unsupported appearance data. Keep the original before migration.');
 for(const [k,min,max] of [['hue',-1e6,1e6],['chroma',0,.09],['grain',0,1]])if(!Number.isFinite(value[k])||value[k]<min||value[k]>max)throw new TypeError('Invalid appearance '+k+'.');
 if(!['light','dark','system'].includes(value.theme)||typeof value.hold!=='boolean'||!Array.isArray(value.pools)||value.pools.length>3)throw new TypeError('Invalid appearance configuration.');
 const ids=new Set();
 for(const p of value.pools){
  if(!p||typeof p.id!=='string'||!p.id||p.id.length>80||ids.has(p.id))throw new TypeError('Each light needs a unique ID.');ids.add(p.id);
  for(const k of ['d','c','x','y','w','h','fade'])if(!Number.isFinite(p[k]))throw new TypeError('Invalid light '+k+'.');
  if(p.c<0||p.c>2||p.w<1||p.w>200||p.h<1||p.h>200||p.fade<0||p.fade>100)throw new TypeError('Invalid light profile.');
  for(const m of ['light','dark'])for(const k of ['l','a'])if(!Number.isFinite(p[m]?.[k])||p[m][k]<0||p[m][k]>1)throw new TypeError('Invalid light material.');
 }
 return {schemaVersion:1,theme:value.theme,hue:wrapHue(value.hue),chroma:value.chroma,grain:value.grain,hold:value.hold,pools:value.pools.map(p=>({...normalizePools([p])[0],id:p.id}))};
}
function migrateLegacy(raw){
 if(!raw||typeof raw!=='object')throw new TypeError('Invalid legacy appearance data.');
 if(raw.schemaVersion===1)return normalize(raw);
 if(raw.schemaVersion!=null)throw new TypeError('Unknown appearance schema.');
 if(raw.strength!=null&&!Number.isFinite(raw.strength))throw new TypeError('Invalid legacy intensity.');
 const base=initial(),pools=raw.pools??(Array.isArray(raw.stops)&&raw.stops.length===0&&!raw.plain?undefined:raw.stops);
 const value={...base,...raw,schemaVersion:1,chroma:raw.chroma??(raw.strength==null?base.chroma:raw.strength/100*.09)};
 value.pools=pools===undefined?base.pools:pools.map((p,i)=>({...p,id:p.id??'legacy-'+i}));
 return normalize(value);
}
function createLocalStorageAdapter(storage,key='forma.appearance.v1'){
 if(!storage||typeof storage.getItem!=='function'||typeof storage.setItem!=='function')throw new TypeError('A Storage-compatible adapter is required.');
 let original=null,migrated=false;
 return {load(){original=storage.getItem(key);if(original===null)return undefined;const parsed=JSON.parse(original);migrated=parsed.schemaVersion!==1;return migrated?migrateLegacy(parsed):normalize(parsed);},
  async save(value){const encoded=JSON.stringify(normalize(value));if(migrated&&original!==null){const backup=key+'.before-v1';if(storage.getItem(backup)===null)storage.setItem(backup,original);}storage.setItem(key,encoded);original=encoded;migrated=false;}};
}
function createState(value){
 let committed=normalize(value??initial()),draft=clone(committed),selected=draft.pools.length-1,pending=false,disposed=false;
 let serial=0;
 function lightID(){let id;do{id='light-added-'+(++serial);}while(draft.pools.some(p=>p.id===id));return id;}
 function dispatch(action){
  if(disposed||pending||!action||typeof action!=='object')return false;
  const previous=draft,previousSelected=selected;let accepted=false;
  draft=clone(draft);
  try{switch(action.type){
   case 'select':if(Number.isInteger(action.index)&&draft.pools[action.index])selected=action.index;break;
   case 'add':if(draft.pools.length<3){const n=draft.pools.length;addPool(draft);selected=Math.max(0,n-1);draft.pools[selected].id=lightID();}break;
   case 'remove':if(draft.pools[selected]){draft.pools.splice(selected,1);anchor(draft);selected=draft.pools.length?0:-1;}break;
   case 'color':if(Number.isFinite(action.hue)){if(!draft.pools.length){addPool(draft);selected=0;draft.pools[0].id=lightID();}setPoolHue(draft,selected,action.hue);}break;
   case 'position':if(action.snapshot)draft.pools=clone(action.snapshot);movePools(draft.pools,selected,action.x,action.y,!!action.individual);break;
   case 'translate':if(Number.isFinite(action.dx)&&Number.isFinite(action.dy))for(const p of action.individual?[draft.pools[selected]].filter(Boolean):draft.pools){p.x=round(p.x+action.dx,1);p.y=round(p.y+action.dy,1);}break;
   case 'distance':setDistance(draft.pools,selected,action.value);break;
   case 'intensity':if(Number.isFinite(action.value))draft.chroma=clamp(action.value,0,.09);break;
   case 'grain':if(Number.isFinite(action.value))draft.grain=clamp(action.value,0,1);break;
   case 'theme':if(['light','dark','system'].includes(action.value))draft.theme=action.value;break;
   case 'hold':if(typeof action.value==='boolean')draft.hold=action.value;break;
   case 'reset':{const {hold,theme}=draft;draft={...initial(),hold,theme};selected=1;break;}
   default:return false;
  }
  // Arithmetic on valid finite offstage coordinates can still overflow. Commit
  // all light changes together only after validation, retaining the old draft.
  // Keep defaults, added lights and saved data in the same canonical shape so
  // property insertion order cannot masquerade as an unsaved user change.
  try{draft=normalize(draft);}catch(error){if(error instanceof TypeError)return false;throw error;}
  accepted=true;return true;
  }finally{if(!accepted){draft=previous;selected=previousSelected;}}
 }
 return {dispatch,get draft(){return clone(draft);},get committed(){return clone(committed);},get selected(){return selected;},get pending(){return pending;},get dirty(){return JSON.stringify(draft)!==JSON.stringify(committed);},
  async save(write){if(disposed||pending)return false;pending=true;try{const snapshot=normalize(draft);if(typeof write!=='function')throw new TypeError('A save adapter is required.');await write(clone(snapshot));if(disposed)return false;committed=snapshot;return true;}finally{pending=false;}},
  cancel(){if(pending||disposed)return false;draft=clone(committed);selected=draft.pools.length-1;return true;},
  dispose(){disposed=true;},get disposed(){return disposed;}};
}
function distanceDelta(value,previousAngle,angle){let delta=angle-previousAngle;if(delta>180)delta-=360;if(delta< -180)delta+=360;return clamp(value+delta*150/360,0,150);}
function reconcileDistance(requested,applied){return Math.abs(requested-applied)>.15?applied:requested;}
function wavePath(value){return Array.from({length:47},(_,i)=>`${i?'L':'M'}${i*2} ${round(15+Math.sin(i*2/92*Math.PI*7.5)*(1.5+clamp(value,0,1)*11),2)}`).join(' ');}
const ICONS={light:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',dark:'<path d="M20 15A9 9 0 0 1 9 4a8 8 0 1 0 11 11Z"/>',system:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',reset:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',minus:'<path d="M5 12h14"/>',plus:'<path d="M5 12h14M12 5v14"/>',back:'<path d="m14 5-7 7 7 7"/>',next:'<path d="m10 5 7 7-7 7"/>'};
const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
function create(host,options={}){
 if(!host?.ownerDocument)throw new TypeError('AppearanceEditor requires a DOM host.');
 const doc=host.ownerDocument,view=doc.defaultView,state=createState(options.value),listeners=[],cleanup=[];
 let disposed=false,drag=null,status='',frame=0,renderCount=0,lastPointerType=null,lastAction=null,lastPaletteHue=null;
 const darkMedia=view.matchMedia?.('(prefers-color-scheme: dark)'),motionMedia=view.matchMedia?.('(prefers-reduced-motion: reduce)');
 const root=doc.createElement('section');root.className='forma-appearance'+(options.placement==='corner'?' fa-corner':'');root.setAttribute('role','dialog');root.setAttribute('aria-label',options.label||'Appearance');
 root.innerHTML=`<div class="fa-stage"><div class="fa-points"></div><div class="fa-ring" hidden><svg viewBox="0 0 60 60" aria-hidden="true"><circle class="fa-track" cx="30" cy="30" r="24"/><circle class="fa-arc" cx="30" cy="30" r="24"/></svg><i></i><button type="button" class="fa-ring-hit" role="slider" aria-label="Distance between lights" aria-valuemin="0" aria-valuemax="150"></button></div><div class="fa-modes" aria-label="Color mode">${MODES.map(m=>`<button type="button" data-mode="${m}" aria-label="${m[0].toUpperCase()+m.slice(1)} mode">${icon(m)}</button>`).join('')}</div><button type="button" class="fa-reset" aria-label="Reset lighting">${icon('reset')}</button><div class="fa-count"><button type="button" data-count="remove" aria-label="Remove selected light">${icon('minus')}</button><button type="button" data-count="add" aria-label="Add light">${icon('plus')}</button></div></div><div class="fa-palette"><button type="button" class="fa-prev" aria-label="Previous colors">${icon('back')}</button><div class="fa-rail">${HUES.map(h=>`<button type="button" data-hue="${h}" style="--fa-dot:oklch(.72 .15 ${h})" aria-label="Hue ${h} degrees"></button>`).join('')}</div><button type="button" class="fa-next" aria-label="Next colors">${icon('next')}</button></div><div class="fa-knobs"><div class="fa-wave" tabindex="0" role="slider" aria-label="Light intensity" aria-valuemin="0" aria-valuemax="100"><svg viewBox="0 0 92 30" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1"/></svg><i></i></div><div class="fa-grain" tabindex="0" role="slider" aria-label="Grain" aria-valuemin="0" aria-valuemax="100"><svg viewBox="0 0 36 36" aria-hidden="true"><circle class="fa-dial-track" cx="18" cy="18" r="15"/><path class="fa-dial-arc" fill="none"/><line class="fa-dial-tick"/></svg></div></div><footer class="fa-footer"><div><button type="button" class="fa-cancel" aria-label="Discard changes">${icon('back')}</button><button type="button" class="fa-save">Save</button></div><button type="button" class="fa-more" aria-expanded="false">More settings</button></footer><div class="fa-details" hidden><label>Selected light <select class="fa-select"></select></label><label>Hue <input class="fa-hue" type="number" min="0" max="359" step="1"></label><label><input class="fa-hold" type="checkbox"> Keep manual colors in the workspace</label><p>Drag a center to move all lights. Hold Alt to move one. Arrow keys move by 1; Shift moves by 10. The outer ring changes distance. Offstage lights are clipped.</p></div><p class="fa-error" role="alert" hidden></p><p class="fa-status fa-sr" role="status" aria-live="polite"></p>`;
 host.append(root);
 const q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)],stage=q('.fa-stage'),points=q('.fa-points'),ring=q('.fa-ring'),ringHit=q('.fa-ring-hit'),rail=q('.fa-rail'),wave=q('.fa-wave'),grain=q('.fa-grain');
 const on=(node,event,fn,opts)=>{node.addEventListener(event,fn,opts);listeners.push(()=>node.removeEventListener(event,fn,opts));};
 const resolved=()=>state.draft.theme==='system'?(darkMedia?.matches?'dark':'light'):state.draft.theme;
 const reduced=()=>!!motionMedia?.matches||doc.documentElement.dataset.motion==='reduced';
 function emit(){options.onPreview?.(state.draft,{theme:resolved(),dirty:state.dirty});}
 function mutate(action){lastAction=action.type;if(state.dispatch(action)){status='Unsaved preview';render();emit();}}
 function updateRail(){const max=rail.scrollWidth-rail.clientWidth;q('.fa-prev').disabled=rail.scrollLeft<=1;q('.fa-next').disabled=rail.scrollLeft>=max-1;rail.style.maskImage=rail.scrollLeft>1?(rail.scrollLeft<max-1?'linear-gradient(90deg,transparent,#000 22px,#000 calc(100% - 22px),transparent)':'linear-gradient(90deg,transparent,#000 22px)'):(rail.scrollLeft<max-1?'linear-gradient(90deg,#000 calc(100% - 22px),transparent)':'none');}
 function sliderValue(node,value,label){node.setAttribute('aria-valuenow',String(value));node.setAttribute('aria-valuetext',label);node.setAttribute('aria-disabled',String(state.pending));}
 function positionPanel(){if(options.placement!=='corner')return;const workspace=options.workspace||host,box=workspace.getBoundingClientRect(),bottom=options.bottomNavigation?.getBoundingClientRect().height||0,width=root.getBoundingClientRect().width;root.style.left=Math.max(12,Math.min(box.left+16,view.innerWidth-width-12))+'px';root.style.bottom=bottom+16+'px';root.style.maxHeight=Math.max(80,view.innerHeight-bottom-32)+'px';}
 function render(){
  if(disposed)return;renderCount++;const d=state.draft,sel=state.selected,p=d.pools[sel],mode=resolved();root.dataset.theme=mode;root.dataset.reducedMotion=String(reduced());root.setAttribute('aria-busy',String(state.pending));stage.style.backgroundImage=wash(mode,d.hue,d.chroma,d.pools,d.grain);
  const active=doc.activeElement?.dataset?.lightId;for(const node of [...points.children])if(!d.pools.some(p=>p.id===node.dataset.lightId))node.remove();
  d.pools.forEach((p,i)=>{let node=[...points.children].find(n=>n.dataset.lightId===p.id);if(!node){node=doc.createElement('button');node.type='button';node.className='fa-point';node.dataset.lightId=p.id;points.append(node);}node.dataset.index=String(i);node.setAttribute('aria-label',`Light ${i+1}, x ${p.x}, y ${p.y}. Arrow keys move; Alt moves this light only.`);node.setAttribute('aria-pressed',String(i===sel));node.disabled=state.pending;node.style.left=(p.x+45)/190*100+'%';node.style.top=(p.y+45)/190*100+'%';node.style.setProperty('--fa-dot',`oklch(.72 .15 ${wrapHue(d.hue+p.d)})`);});
  if(active&&!doc.activeElement?.isConnected)[...points.children].find(n=>n.dataset.lightId===active)?.focus({preventScroll:true});
  ring.hidden=d.pools.length<2||!p;if(p){ring.style.left=(p.x+45)/190*100+'%';ring.style.top=(p.y+45)/190*100+'%';const dist=distance(d.pools,sel);sliderValue(ringHit,Math.round(dist),Math.round(dist)+' model units');ring.style.setProperty('--fa-angle',dist/150*360+'deg');q('.fa-arc').setAttribute('stroke-dasharray',`${dist/150*150.8} 150.8`);}
  qa('[data-mode]').forEach(n=>{n.setAttribute('aria-pressed',String(n.dataset.mode===d.theme));n.disabled=state.pending;});
  const baseline=normalize(initial());q('.fa-reset').hidden=['hue','chroma','grain'].every(k=>baseline[k]===d[k])&&JSON.stringify(d.pools.map(({id,...p})=>p))===JSON.stringify(baseline.pools.map(({id,...p})=>p));
  q('[data-count="add"]').disabled=state.pending||d.pools.length===3;q('[data-count="remove"]').disabled=state.pending||!d.pools.length;
  qa('[data-hue]').forEach(n=>{n.setAttribute('aria-pressed',String(!!p&&Math.abs(signedHue(Number(n.dataset.hue)-d.hue-p.d))<6));n.disabled=state.pending;});
  const paletteHue=p?wrapHue(d.hue+p.d):null;if(paletteHue!==lastPaletteHue){lastPaletteHue=paletteHue;const selected=rail.querySelector('[aria-pressed="true"]');if(selected){const a=selected.getBoundingClientRect(),b=rail.getBoundingClientRect();if(a.left<b.left||a.right>b.right)rail.scrollLeft+=(a.left+a.width/2)-(b.left+b.width/2);}}
  sliderValue(wave,Math.round(d.chroma/.09*100),Math.round(d.chroma/.09*100)+' percent');wave.style.setProperty('--fa-intensity',d.chroma/.09);wave.querySelector('path').setAttribute('d',wavePath(d.chroma/.09));
  sliderValue(grain,Math.round(d.grain*100),Math.round(d.grain*100)+' percent');const a=(-135+d.grain*270-90)*Math.PI/180,x=18+Math.cos(a)*15,y=18+Math.sin(a)*15;q('.fa-dial-arc').setAttribute('d',`M7.393 28.607 A15 15 0 ${d.grain*270>180?1:0} 1 ${x} ${y}`);q('.fa-dial-arc').style.opacity=d.grain>.005?'1':'0';for(const [k,v] of Object.entries({x1:18+Math.cos(a)*9,y1:18+Math.sin(a)*9,x2:x,y2:y}))q('.fa-dial-tick').setAttribute(k,String(v));
  const select=q('.fa-select');if(select.options.length!==d.pools.length||[...select.options].some((o,i)=>o.value!==d.pools[i]?.id)){select.replaceChildren(...d.pools.map((p,i)=>{const o=doc.createElement('option');o.value=p.id;o.textContent='Light '+(i+1);return o;}));}select.value=p?.id||'';select.disabled=state.pending||!p;q('.fa-hue').value=p?String(round(wrapHue(d.hue+p.d),1)):'';q('.fa-hue').disabled=state.pending||!p;q('.fa-hold').checked=d.hold;q('.fa-hold').disabled=state.pending;
  q('.fa-save').disabled=state.pending||typeof options.onSave!=='function';q('.fa-save').textContent=state.pending?'Saving...':'Save';q('.fa-cancel').disabled=state.pending;q('.fa-status').textContent=status;updateRail();positionPanel();
 }
 function start(event,kind,node){lastPointerType=event.pointerType||'unknown';if(state.pending||event.button!==0)return;const index=Number(node.dataset.index);if(kind==='position')mutate({type:'select',index});const bounds=stage.getBoundingClientRect(),d=state.draft,p=d.pools[state.selected];drag={kind,id:event.pointerId,node,individual:event.altKey,snapshot:d.pools,bounds,center:p?{x:bounds.left+(p.x+45)/190*bounds.width,y:bounds.top+(p.y+45)/190*bounds.height}:null};if(kind==='distance'){drag.angle=Math.atan2(event.clientY-drag.center.y,event.clientX-drag.center.x)*180/Math.PI;drag.value=distance(d.pools,state.selected);}node.setPointerCapture?.(event.pointerId);event.preventDefault();node.focus({preventScroll:true});if(kind==='intensity'||kind==='grain')move(event);}
 function move(event){if(!drag||event.pointerId!==drag.id)return;event.preventDefault();if(drag.kind==='position'){const b=drag.bounds;mutate({type:'position',x:(event.clientX-b.left)/b.width,y:(event.clientY-b.top)/b.height,individual:drag.individual,snapshot:drag.snapshot});}else if(drag.kind==='distance'){const angle=Math.atan2(event.clientY-drag.center.y,event.clientX-drag.center.x)*180/Math.PI;drag.value=distanceDelta(drag.value,drag.angle,angle);drag.angle=angle;mutate({type:'distance',value:drag.value});drag.value=reconcileDistance(drag.value,distance(state.draft.pools,state.selected));}else{const b=drag.node.getBoundingClientRect();if(drag.kind==='intensity')mutate({type:'intensity',value:clamp((event.clientX-b.left)/b.width,0,1)*.09});else{const angle=Math.atan2(event.clientX-b.left-b.width/2,-(event.clientY-b.top-b.height/2))*180/Math.PI;mutate({type:'grain',value:Math.abs(angle)>135?(state.draft.grain<.5?0:1):(angle+135)/270});}}}
 function end(event){if(drag&&event.pointerId===drag.id){const node=drag.node;drag=null;if(node.hasPointerCapture?.(event.pointerId))node.releasePointerCapture(event.pointerId);}}
 on(root,'pointerdown',e=>{const node=e.target.closest('.fa-point,.fa-ring-hit,.fa-wave,.fa-grain');if(!node)return;start(e,node.matches('.fa-point')?'position':node===ringHit?'distance':node===wave?'intensity':'grain',node);});on(root,'pointermove',move);on(root,'pointerup',end);on(root,'pointercancel',end);on(root,'lostpointercapture',end);
 on(points,'click',e=>{const node=e.target.closest('.fa-point');if(node)mutate({type:'select',index:Number(node.dataset.index)});});
 on(root,'keydown',e=>{const node=e.target.closest('.fa-point,.fa-ring-hit,.fa-wave,.fa-grain');if(e.key==='Escape'&&!state.pending){e.preventDefault();cancel();return;}if(!node||state.pending)return;const arrows=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];if(!arrows.includes(e.key)&&!['Home','End'].includes(e.key))return;e.preventDefault();const sign=['ArrowRight','ArrowUp'].includes(e.key)?1:-1;if(node.matches('.fa-point')){mutate({type:'select',index:Number(node.dataset.index)});if(arrows.includes(e.key))mutate({type:'translate',dx:e.key==='ArrowLeft'?-(e.shiftKey?10:1):e.key==='ArrowRight'?(e.shiftKey?10:1):0,dy:e.key==='ArrowUp'?-(e.shiftKey?10:1):e.key==='ArrowDown'?(e.shiftKey?10:1):0,individual:e.altKey});}else{const type=node===ringHit?'distance':node===wave?'intensity':'grain',d=state.draft,current=type==='distance'?distance(d.pools,state.selected):type==='intensity'?d.chroma:d.grain,max=type==='distance'?150:type==='intensity'?.09:1,step=type==='distance'?(e.shiftKey?10:2):max*(e.shiftKey?.1:.01);mutate({type,value:e.key==='Home'?0:e.key==='End'?max:current+sign*step});}});
 qa('[data-mode]').forEach(n=>on(n,'click',()=>mutate({type:'theme',value:n.dataset.mode})));qa('[data-count]').forEach(n=>on(n,'click',()=>mutate({type:n.dataset.count})));on(q('.fa-reset'),'click',()=>mutate({type:'reset'}));qa('[data-hue]').forEach(n=>on(n,'click',()=>mutate({type:'color',hue:Number(n.dataset.hue)})));
 on(q('.fa-prev'),'click',()=>rail.scrollBy({left:-96,behavior:reduced()?'instant':'smooth'}));on(q('.fa-next'),'click',()=>rail.scrollBy({left:96,behavior:reduced()?'instant':'smooth'}));on(rail,'scroll',updateRail);
 on(q('.fa-more'),'click',()=>{const panel=q('.fa-details');panel.hidden=!panel.hidden;q('.fa-more').setAttribute('aria-expanded',String(!panel.hidden));});on(q('.fa-select'),'change',e=>mutate({type:'select',index:state.draft.pools.findIndex(p=>p.id===e.target.value)}));on(q('.fa-hue'),'input',e=>{if(e.target.value!=='')mutate({type:'color',hue:e.target.valueAsNumber});});on(q('.fa-hold'),'change',e=>mutate({type:'hold',value:e.target.checked}));
 function cancel(){if(state.cancel()){status='Changes discarded';q('.fa-error').hidden=true;render();emit();options.onCancel?.(state.committed);}}
 async function save(){const task=state.save(options.onSave);render();try{if(await task){status='Saved';q('.fa-error').hidden=true;options.onCommit?.(state.committed);}}catch(error){if(!disposed){q('.fa-error').textContent='Could not save. Your preview is preserved; try again.';q('.fa-error').hidden=false;options.onError?.(error);}}finally{render();}}
 on(q('.fa-cancel'),'click',cancel);on(q('.fa-save'),'click',()=>{void save();});
 const policyChanged=()=>{drag=null;render();emit();};if(darkMedia?.addEventListener){darkMedia.addEventListener('change',policyChanged);cleanup.push(()=>darkMedia.removeEventListener('change',policyChanged));}if(motionMedia?.addEventListener){motionMedia.addEventListener('change',policyChanged);cleanup.push(()=>motionMedia.removeEventListener('change',policyChanged));}
 const observer=view.MutationObserver?new view.MutationObserver(policyChanged):null;observer?.observe(doc.documentElement,{attributes:true,attributeFilter:['data-motion']});cleanup.push(()=>observer?.disconnect());
 on(view,'resize',()=>{updateRail();positionPanel();});
 const resize=view.ResizeObserver?new view.ResizeObserver(()=>{updateRail();positionPanel();}):null;resize?.observe(root);cleanup.push(()=>resize?.disconnect());
 render();emit();frame=view.requestAnimationFrame(()=>{frame=0;updateRail();});
 return {element:root,dispatch:mutate,save,cancel,get value(){return state.draft;},get committed(){return state.committed;},get diagnostics(){return {renderer:'css-gradients',renderCount,lastPointerType,lastAction,pending:state.pending,dirty:state.dirty,selected:state.selected,reducedMotion:reduced(),theme:resolved(),disposed};},dispose(){if(disposed)return;disposed=true;state.dispose();drag=null;view.cancelAnimationFrame(frame);listeners.forEach(f=>f());cleanup.forEach(f=>f());root.remove();}};
}
return {create,createState,createLocalStorageAdapter,migrateLegacy,normalize,initial,MODES,HUES,wash,resolve,contextColor,stagePosition,distance,distanceDelta,reconcileDistance,wavePath};
});
