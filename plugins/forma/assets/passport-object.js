/* Original articulated Three.js component. This is not the approved Neuron CSS passport.
 * The host supplies Three and BookObject; BookObject paints the original cover atlas. */
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PassportObject=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const finite=(n,f,a,b)=>typeof n==='number'&&Number.isFinite(n)?clamp(n,a,b):f;
const hex=(v,f)=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v)?v:f;
const text=(v,f,n)=>typeof v==='string'?v.slice(0,n):f;
const DEFAULTS=Object.freeze({title:'Field passport',subtitle:'A personal collection',name:'Sample reader',detail:'Notes, places and ideas',color:'#284f50',inkColor:'#e5d4a1',pagesColor:'#f6f1e5',material:'leather',width:1.8,height:2.5,depth:.13,coverThickness:.025,inset:.035,open:0,pageTurn:0,fit:1,pose:Object.freeze({pitch:10,yaw:-18,roll:-2})});
function normalize(input={},base=DEFAULTS){
 if(!input||typeof input!=='object')input={};const width=finite(input.width,base.width,.8,3),height=finite(input.height,base.height,1,4),depth=finite(input.depth,base.depth,.08,.5),pose=input.pose||{};
 return {title:text(input.title,base.title,120),subtitle:text(input.subtitle,base.subtitle,120),name:text(input.name,base.name,120),detail:text(input.detail,base.detail,180),color:hex(input.color,base.color),inkColor:hex(input.inkColor,base.inkColor),pagesColor:hex(input.pagesColor,base.pagesColor),material:['leather','cloth','paper'].includes(input.material)?input.material:base.material,width,height,depth,coverThickness:finite(input.coverThickness,Math.min(base.coverThickness,depth/4),.005,depth/4),inset:finite(input.inset,base.inset,.01,Math.min(width,height)*.15),open:finite(input.open,base.open,0,1),pageTurn:finite(input.pageTurn,base.pageTurn,0,1),fit:finite(input.fit,base.fit,.65,1),pose:{pitch:finite(pose.pitch,base.pose.pitch,-60,60),yaw:finite(pose.yaw,base.pose.yaw,-180,180),roll:finite(pose.roll,base.pose.roll,-30,30)}};
}
function geometrySpec(input){const c=normalize(input),paperDepth=c.depth-c.coverThickness*2;return {width:c.width,height:c.height,coverThickness:c.coverThickness,paperDepth,paperWidth:c.width-c.inset,paperHeight:c.height-c.inset*2,frontHinge:[0,0,c.depth/2],backRoot:[0,0,-c.depth/2],leafHinge:[0,0,paperDepth/2+.001],frontAngle:-Math.PI*c.open,leafAngle:-Math.PI*Math.min(c.open,c.pageTurn),radius:Math.hypot(c.width*1.2,c.height/2,c.depth+c.width*.16)};}
function fitDistance(input,aspect=1,fov=34){const c=normalize(input),s=geometrySpec(c),vertical=finite(fov,34,15,60)*Math.PI/180,horizontal=2*Math.atan(Math.tan(vertical/2)*finite(aspect,1,.05,30));return s.radius/Math.sin(Math.min(vertical,horizontal)/2)/c.fit*1.06;}
function leafPositions(input,segments=24){
 const c=normalize(input),s=geometrySpec(c),bend=-Math.sin(Math.min(c.open,c.pageTurn)*Math.PI)*.42,positions=[];
 for(let i=0;i<=segments;i++){const t=i/segments,angle=t*bend,x=Math.abs(bend)<.0001?s.paperWidth*t:s.paperWidth*Math.sin(angle)/bend,z=Math.abs(bend)<.0001?0:s.paperWidth*(1-Math.cos(angle))/bend;for(const y of [-s.paperHeight/2,s.paperHeight/2])positions.push(x,y,z);}
 return positions;
}
function createGeometry(T,input){
 const c=normalize(input),s=geometrySpec(c),shape=new T.Shape(),r=Math.min(.09,c.width*.06),w=c.width,h=c.height;
 shape.moveTo(0,-h/2);shape.lineTo(w-r,-h/2);shape.quadraticCurveTo(w,-h/2,w,-h/2+r);shape.lineTo(w,h/2-r);shape.quadraticCurveTo(w,h/2,w-r,h/2);shape.lineTo(0,h/2);shape.closePath();
 const cover=new T.ExtrudeGeometry(shape,{depth:c.coverThickness,bevelEnabled:false,curveSegments:8});cover.translate(0,0,-c.coverThickness/2);
 const paper=new T.BoxGeometry(s.paperWidth,s.paperHeight,s.paperDepth),leaf=new T.BufferGeometry(),positions=new Float32Array(leafPositions(c)),uv=[],indices=[];
 for(let i=0;i<=24;i++){uv.push(i/24,0,i/24,1);if(i<24){const k=i*2;indices.push(k,k+2,k+1,k+1,k+2,k+3);}}
 leaf.setAttribute('position',new T.BufferAttribute(positions,3));leaf.setAttribute('uv',new T.Float32BufferAttribute(uv,2));leaf.setIndex(indices);leaf.computeVertexNormals();leaf.computeBoundingSphere();return {cover,paper,leaf};
}
function create(host,input={},options={}){
 if(!host?.ownerDocument)throw new TypeError('PassportObject requires a DOM host.');
 const doc=host.ownerDocument,view=doc.defaultView,Book=options.bookObject||view.BookObject;
 let config=normalize(input),disposed=false,generation=0,three=null,renderer=null,scene=null,camera=null,assembly=null,model=null,front=null,leaf=null,leafMesh=null,geometry=null,frame=0,lastTime=0,renderCount=0,renderMs=0,maxRenderMs=0,firstRenderMs=null,firstAfterBuildMs=null,freshBuild=false,warmCount=0,warmTotal=0,warmMax=0,poseWrites=0,builds=0,leafBend=null,lastPointerType=null,lastAction=null,webglInfo=null,loading=false,drag=null,failedReason=null;
 const callbacks=[],textures=new Set(),materials=new Set(),geometries=new Set(),motion=view.matchMedia?.('(prefers-reduced-motion: reduce)');
 let intersecting=typeof view.IntersectionObserver!=='function',opening=config.open,turn=config.pageTurn,currentPose={...config.pose};
 const root=doc.createElement('div');root.className='forma-passport';root.tabIndex=0;root.setAttribute('role','group');root.setAttribute('aria-label','Articulated passport. Drag to rotate. Arrow keys rotate, O opens, C closes.');
 root.innerHTML='<div class="fp-fallback"><strong></strong><span></span><small>Static preview while waiting for the 3D viewport.</small></div><p class="fp-description"></p>';
 host.append(root);const fallback=root.querySelector('.fp-fallback'),description=root.querySelector('.fp-description');
 const reduced=()=>!!motion?.matches||doc.documentElement.dataset.motion==='reduced';
 const staticMode=()=>options.static===true||doc.documentElement.dataset.materials==='static';
 const visible=()=>intersecting&&!doc.hidden;
 const canDraw=()=>!disposed&&!!renderer&&visible()&&!staticMode();
 const listen=(node,event,fn,opts)=>{node.addEventListener(event,fn,opts);callbacks.push(()=>node.removeEventListener(event,fn,opts));};
 function paintFallback(){fallback.style.setProperty('--fp-cover',config.color);fallback.style.setProperty('--fp-ink',config.inkColor);fallback.querySelector('strong').textContent=config.title;fallback.querySelector('span').textContent=config.subtitle;description.textContent=`${config.title}. ${config.subtitle}. ${config.name}. ${config.detail}. Cover ${Math.round(config.open*100)} percent open.`;}
 function releaseScene(){if(assembly)scene?.remove(assembly);assembly=model=front=leaf=leafMesh=null;for(const item of geometries)item.dispose();for(const item of materials)item.dispose();for(const item of textures)item.dispose();geometries.clear();materials.clear();textures.clear();}
 function releaseRenderer(){view.cancelAnimationFrame(frame);frame=0;lastTime=0;releaseScene();if(renderer){renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.dispose();renderer.forceContextLoss?.();renderer.domElement.remove();renderer=null;}scene=camera=null;}
 function fallbackMode(reason){failedReason=reason;releaseRenderer();fallback.hidden=false;root.dataset.renderer=reason==='static'?'static':'static-unavailable';loading=false;fallback.querySelector('small').textContent=reason==='static'?'Static preview selected.':'Static preview. '+reason;}
 function lost(event){event.preventDefault();fallbackMode('WebGL context lost. Recreate the component to retry.');}
 function canvasTexture(paint){const canvas=doc.createElement('canvas');canvas.width=512;canvas.height=704;paint(canvas);const texture=new three.CanvasTexture(canvas);texture.colorSpace=three.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());textures.add(texture);return texture;}
 function grainTexture(){return canvasTexture(canvas=>{canvas.width=canvas.height=128;const g=canvas.getContext('2d');if(!g)throw new Error('Canvas2D is required for material maps.');const image=g.createImageData(128,128);let seed=8;for(let i=0;i<image.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const n=112+seed%32;image.data[i]=image.data[i+1]=image.data[i+2]=n;image.data[i+3]=255;}g.putImageData(image,0,0);});}
 function pageTexture(){return canvasTexture(canvas=>{const g=canvas.getContext('2d');if(!g)throw new Error('Canvas2D is required for page content.');g.fillStyle=config.pagesColor;g.fillRect(0,0,512,704);g.fillStyle='#244345';g.font='500 22px system-ui';g.fillText('FIELD NOTES',48,70);g.fillRect(48,92,416,2);g.font='600 32px system-ui';const lines=Book.linesFor(config.name,t=>g.measureText(t).width,416,3);lines.forEach((line,i)=>g.fillText(line,48,155+i*42));g.font='400 23px system-ui';Book.linesFor(config.detail,t=>g.measureText(t).width,416,6).forEach((line,i)=>g.fillText(line,48,330+i*34));g.strokeStyle='#24434525';for(let y=570;y<660;y+=28){g.beginPath();g.moveTo(48,y);g.lineTo(464,y);g.stroke();}});}
 function mat(props){const material=new three.MeshStandardMaterial(props);materials.add(material);return material;}
 function mesh(g,m,parent=model){geometries.add(g);const object=new three.Mesh(g,m);parent.add(object);return object;}
 function build(){
  releaseScene();leafBend=null;freshBuild=true;builds++;const T=three,c=config,s=geometrySpec(c);geometry=createGeometry(T,c);Object.values(geometry).forEach(g=>geometries.add(g));assembly=new T.Group();model=new T.Group();assembly.add(model);scene.add(assembly);
  const grain=grainTexture();grain.colorSpace=T.NoColorSpace;grain.wrapS=grain.wrapT=T.RepeatWrapping;grain.repeat.set(5,7);
  const coverMaterial=mat({color:c.color,roughness:c.material==='leather'?.6:c.material==='cloth'?.88:.95,metalness:0,bumpMap:grain,bumpScale:c.material==='leather'?.012:c.material==='cloth'?.007:.002});
  const paperMaterial=mat({color:c.pagesColor,roughness:1,metalness:0}),liningMaterial=mat({color:c.pagesColor,roughness:1,side:T.DoubleSide});
  const back=mesh(geometry.cover,coverMaterial);back.position.z=-c.depth/2;
  front=new T.Group();front.position.set(...s.frontHinge);model.add(front);mesh(geometry.cover,coverMaterial,front);
  const coverMap=canvasTexture(canvas=>Book.paintCover(canvas,Book.normalize({...c,brand:'FORMA',brandMark:'monogram',pattern:'rules',finish:'ink'}),'color','front',256));
  const coverFace=mesh(new T.PlaneGeometry(c.width-.01,c.height-.01),mat({map:coverMap,roughness:.68,bumpMap:grain,bumpScale:.006}),front);coverFace.position.set(c.width/2,0,c.coverThickness/2+.001);
  const lining=mesh(new T.PlaneGeometry(c.width-c.inset,c.height-c.inset*2),liningMaterial,front);lining.position.set((c.width-c.inset)/2,0,-c.coverThickness/2-.001);lining.rotation.y=Math.PI;
  const pages=mesh(geometry.paper,paperMaterial);pages.position.x=s.paperWidth/2;
  const spine=mesh(new T.BoxGeometry(c.coverThickness,c.height,c.depth+c.coverThickness),coverMaterial);spine.position.x=-c.coverThickness/2;
  const pageMap=pageTexture();const flat=mesh(new T.PlaneGeometry(s.paperWidth,s.paperHeight),mat({map:pageMap,roughness:1}));flat.position.set(s.paperWidth/2,0,s.paperDepth/2+.0002);
  leaf=new T.Group();leaf.position.set(...s.leafHinge);model.add(leaf);leafMesh=mesh(geometry.leaf,mat({map:pageMap,roughness:1,side:T.DoubleSide}),leaf);
  size();schedule();
 }
 function size(){if(!renderer||disposed)return;const box=host.getBoundingClientRect(),width=Math.max(1,box.width),height=Math.max(1,box.height);renderer.setPixelRatio(Math.min(view.devicePixelRatio||1,2,2048/Math.max(width,height)));renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.set(0,0,fitDistance(config,camera.aspect));camera.near=.01;camera.far=camera.position.z+geometrySpec(config).radius*3;camera.lookAt(0,0,0);camera.updateProjectionMatrix();schedule();}
 function draw(now){frame=0;if(!canDraw())return;const dt=Math.min(64,lastTime?now-lastTime:16);lastTime=now;const amount=reduced()?1:1-Math.exp(-dt/100);opening+=(config.open-opening)*amount;turn+=(config.pageTurn-turn)*amount;for(const axis of ['pitch','yaw','roll'])currentPose[axis]+=(config.pose[axis]-currentPose[axis])*amount;
  const unsettled=Math.abs(opening-config.open)>.0005||Math.abs(turn-config.pageTurn)>.0005||Object.keys(currentPose).some(k=>Math.abs(currentPose[k]-config.pose[k])>.02);if(!unsettled){opening=config.open;turn=config.pageTurn;currentPose={...config.pose};}
  front.rotation.y=-Math.PI*opening;leaf.rotation.y=-Math.PI*Math.min(opening,turn);assembly.rotation.set(-currentPose.pitch*Math.PI/180,currentPose.yaw*Math.PI/180,-currentPose.roll*Math.PI/180,'ZXY');
  // Center the closed cover and interpolate toward the full spread's hinge center.
  model.position.x=-config.width/2*(1-opening);const nextBend=Math.min(opening,turn);if(leafBend!==nextBend){leafBend=nextBend;const vertices=leafPositions({...config,open:opening,pageTurn:turn});geometry.leaf.attributes.position.array.set(vertices);geometry.leaf.attributes.position.needsUpdate=true;geometry.leaf.computeVertexNormals();geometry.leaf.computeBoundingSphere();}poseWrites++;
  const start=view.performance.now();try{renderer.render(scene,camera);}catch(error){fallbackMode('Renderer failed: '+error.name);return;}renderMs=view.performance.now()-start;maxRenderMs=Math.max(maxRenderMs,renderMs);if(firstRenderMs===null)firstRenderMs=renderMs;if(freshBuild){firstAfterBuildMs=renderMs;freshBuild=false;}else{warmCount++;warmTotal+=renderMs;warmMax=Math.max(warmMax,renderMs);}renderCount++;fallback.hidden=true;root.dataset.renderer='webgl';if(unsettled&&!reduced())schedule();else lastTime=0;options.onRender?.(diagnostics());
 }
 function schedule(){if(!frame&&canDraw())frame=view.requestAnimationFrame(draw);}
 function diagnostics(){return {renderer:root.dataset.renderer||'static',webgl:webglInfo,loading,dependencyLoaded:!!three,lastPointerType,lastAction,renderCount,lastRenderMs:renderMs,maxRenderMs,firstRenderMs,firstAfterBuildMs,warmRenderSamples:warmCount,warmMeanRenderMs:warmCount?warmTotal/warmCount:null,warmMaxRenderMs:warmCount?warmMax:null,renderTiming:'CPU time around renderer.render; not GPU time or FPS',drawCalls:renderer?.info.render.calls??0,triangles:renderer?.info.render.triangles??0,geometries:renderer?.info.memory.geometries??0,textures:renderer?.info.memory.textures??0,builds,poseWrites,pendingFrame:!!frame,reducedMotion:reduced(),staticMode:staticMode(),visible:visible(),disposed,failure:failedReason,open:opening,pageTurn:Math.min(opening,turn),pose:{...currentPose}};}
 function update(patch={}){if(disposed)return;lastAction=Object.keys(patch).join(',');const previous=config;config=normalize(patch,config);paintFallback();const geometryKeys=['width','height','depth','coverThickness','inset','title','subtitle','name','detail','color','inkColor','pagesColor','material'];if(renderer&&geometryKeys.some(k=>previous[k]!==config[k]))build();else{if(renderer&&previous.fit!==config.fit)size();schedule();}}
 async function initialize(){if(disposed||renderer||staticMode()||!visible())return;if(typeof options.loadThree!=='function'){fallbackMode('No Three.js loader supplied.');return;}if(!Book?.paintCover||!Book?.linesFor){fallbackMode('BookObject dependency is missing.');return;}const ticket=++generation;loading=true;try{const T=three||await Promise.resolve().then(()=>{if(disposed||ticket!==generation)return null;return options.loadThree();});if(ticket===generation)loading=false;if(disposed||ticket!==generation||!T)return;three=T;if(staticMode()||!visible())return;renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});const gl=renderer.getContext();webglInfo={version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER),vendor:gl.getParameter(gl.VENDOR),shadingLanguageVersion:gl.getParameter(gl.SHADING_LANGUAGE_VERSION)};const debug=gl.getExtension('WEBGL_debug_renderer_info');if(debug){webglInfo.unmaskedRenderer=gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);webglInfo.unmaskedVendor=gl.getParameter(debug.UNMASKED_VENDOR_WEBGL);}renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;scene=new T.Scene();camera=new T.PerspectiveCamera(34,1,.01,100);scene.add(new T.HemisphereLight(0xffffff,0x534b41,2));const key=new T.DirectionalLight(0xffffff,3),fill=new T.DirectionalLight(0xb9d9e4,1.5);key.position.set(-3,5,7);fill.position.set(5,1,-3);scene.add(key,fill);renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.addEventListener('webglcontextlost',lost);root.prepend(renderer.domElement);failedReason=null;build();}catch(error){if(!disposed&&ticket===generation)fallbackMode('3D initialization failed: '+error.name);}}
 function policy(){if(disposed)return;drag=null;if(staticMode()){generation++;fallbackMode('static');}else if(!visible()){view.cancelAnimationFrame(frame);frame=0;lastTime=0;}else if(renderer)schedule();else void initialize();options.onDiagnostics?.(diagnostics());}
 listen(root,'pointerdown',e=>{lastPointerType=e.pointerType||'unknown';if(e.button!==0||reduced()||!renderer||options.interactive===false||drag)return;const touch=e.pointerType==='touch';drag={id:e.pointerId,x:e.clientX,y:e.clientY,pose:{...config.pose},touch,claimed:!touch};if(!touch){root.setPointerCapture?.(e.pointerId);root.focus({preventScroll:true});e.preventDefault();}});
 listen(root,'pointermove',e=>{
  if(!drag||e.pointerId!==drag.id||reduced())return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(drag.touch&&!drag.claimed){
   // Leave touch scrolling to the browser until a deliberate horizontal gesture wins.
   if(Math.max(Math.abs(dx),Math.abs(dy))<8)return;
   if(Math.abs(dy)>=Math.abs(dx)){drag=null;return;}
   drag.claimed=true;root.setPointerCapture?.(e.pointerId);root.focus({preventScroll:true});
  }
  if(drag.touch)e.preventDefault();
  update({pose:{yaw:drag.pose.yaw+dx*.5,pitch:drag.pose.pitch+(drag.touch?0:dy*.35)}});
 });
 const end=e=>{if(drag?.id===e.pointerId){drag=null;if(root.hasPointerCapture?.(e.pointerId))root.releasePointerCapture(e.pointerId);}};listen(root,'pointerup',end);listen(root,'pointercancel',end);listen(root,'lostpointercapture',end);
 listen(root,'keydown',e=>{if(options.interactive===false||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','o','O','c','C','Home'].includes(e.key))return;e.preventDefault();const step=e.shiftKey?15:5;if(e.key==='Home')update({pose:DEFAULTS.pose,fit:1});else if(e.key.toLowerCase()==='o')update({open:1});else if(e.key.toLowerCase()==='c')update({open:0});else update({pose:{yaw:config.pose.yaw+(e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0),pitch:config.pose.pitch+(e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0)}});});
 listen(doc,'visibilitychange',policy);if(motion?.addEventListener){motion.addEventListener('change',policy);callbacks.push(()=>motion.removeEventListener('change',policy));}
 const observer=view.MutationObserver?new view.MutationObserver(policy):null;observer?.observe(doc.documentElement,{attributes:true,attributeFilter:['data-motion','data-materials']});const resize=view.ResizeObserver?new view.ResizeObserver(size):null;resize?.observe(host);const intersection=view.IntersectionObserver?new view.IntersectionObserver(entries=>{intersecting=entries.some(e=>e.target===host&&e.isIntersecting);policy();}):null;intersection?.observe(host);
 paintFallback();root.dataset.renderer='static-waiting';if(staticMode())fallbackMode('static');else void initialize();
 return {element:root,update,setOpen:value=>update({open:value}),setPageTurn:value=>update({pageTurn:value}),setPose:pose=>update({pose}),get config(){return normalize(config);},get renderMode(){return disposed?'disposed':root.dataset.renderer;},get diagnostics(){return diagnostics();},dispose(){if(disposed)return;disposed=true;generation++;callbacks.forEach(fn=>fn());observer?.disconnect();resize?.disconnect();intersection?.disconnect();releaseRenderer();root.remove();}};
}
return {create,normalize,geometrySpec,leafPositions,createGeometry,fitDistance};
});
