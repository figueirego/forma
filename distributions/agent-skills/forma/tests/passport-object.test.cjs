const test=require('node:test');
const assert=require('node:assert/strict');
const P=require('../assets/passport-object.js');
const TPromise=import(process.env.BOOK_THREE_MODULE||'three');

test('articulated hinges remain attached and page cannot turn beyond the cover',()=>{
 for(const opening of [0,.1,.5,1])for(const turn of [0,.5,1]){
  const c=P.normalize({open:opening,pageTurn:turn}),s=P.geometrySpec(c),positions=P.leafPositions(c);
  assert.deepEqual(s.frontHinge,[0,0,c.depth/2]);assert.deepEqual(s.leafHinge,[0,0,s.paperDepth/2+.001]);assert.ok(Math.abs(s.leafAngle)<=Math.abs(s.frontAngle));
  assert.equal(positions[0],0);assert.ok(Math.abs(positions[2])===0);assert.equal(positions[3],0);assert.ok(Math.abs(positions[5])===0);
  assert.ok(positions.every(Number.isFinite));assert.equal(positions[1],-s.paperHeight/2);assert.equal(positions[4],s.paperHeight/2);
 }
});
test('real Three geometry has finite normals, straight binding and three-dimensional cover thickness',async()=>{
 const T=await TPromise;
 for(const open of [0,.5,1]){
  const c=P.normalize({open,pageTurn:.5}),g=P.createGeometry(T,c);
  for(const geometry of Object.values(g)){geometry.computeBoundingBox();assert.ok([...geometry.attributes.position.array].every(Number.isFinite));assert.ok([...geometry.attributes.normal.array].every(Number.isFinite));}
  assert.ok(Math.abs(g.cover.boundingBox.min.x)<1e-7);assert.ok(Math.abs(g.cover.boundingBox.max.z-g.cover.boundingBox.min.z-c.coverThickness)<1e-7);assert.ok(g.paper.boundingBox.max.x-g.paper.boundingBox.min.x<c.width);assert.ok(g.paper.boundingBox.max.y-g.paper.boundingBox.min.y<c.height);
  assert.equal(g.leaf.attributes.position.count,50);assert.equal(g.leaf.index.count,144);Object.values(g).forEach(geometry=>geometry.dispose());
 }
});
test('camera fits the full articulation bounding sphere at narrow/wide aspects',()=>{
 const c=P.normalize(),radius=P.geometrySpec(c).radius;
 for(const aspect of [.25,.6,1,2,4]){const distance=P.fitDistance(c,aspect),half=Math.min(34*Math.PI/360,Math.atan(Math.tan(34*Math.PI/360)*aspect));assert.ok(distance*Math.sin(half)>=radius);}
 assert.ok(P.fitDistance({...c,fit:.65},1)>P.fitDistance(c,1));
});
test('normalization validates material, size, text and pose without altering input',()=>{
 const input={open:2,pageTurn:-1,color:'url(https://example.invalid)',name:'a'.repeat(300),depth:.001,pose:{yaw:Infinity,pitch:90}};const c=P.normalize(input);assert.equal(c.open,1);assert.equal(c.pageTurn,0);assert.equal(c.color,'#284f50');assert.equal(c.name.length,120);assert.equal(c.depth,.08);assert.equal(c.pose.yaw,-18);assert.equal(c.pose.pitch,60);assert.equal(input.open,2);assert.ok(c.coverThickness<=c.depth/4);
});

function lifecycleHost(){
 const noop=()=>{},events=new Map(),mediaEvents=new Map(),doc={hidden:false,documentElement:{dataset:{}},addEventListener:(k,v)=>events.set(k,v),removeEventListener:k=>events.delete(k)};
 doc.defaultView={requestAnimationFrame:()=>1,cancelAnimationFrame:noop,matchMedia:()=>({matches:false,addEventListener:(k,v)=>mediaEvents.set(k,v),removeEventListener:k=>mediaEvents.delete(k)})};
 doc.defaultView.MutationObserver=class{constructor(fn){doc.policy=fn;}observe(){}disconnect(){doc.policy=null;}};
 function node(){const children=[],subnodes=new Map();return {ownerDocument:doc,children,dataset:{},style:{setProperty:noop},events:new Map(),append(child){children.push(child);child.parent=this;},setAttribute:noop,addEventListener(k,v){this.events.set(k,v);},removeEventListener(k){this.events.delete(k);},querySelector(selector){if(!subnodes.has(selector))subnodes.set(selector,node());return subnodes.get(selector);},remove(){if(this.parent)this.parent.children.splice(this.parent.children.indexOf(this),1);},getBoundingClientRect:()=>({width:300,height:400})};}
 doc.createElement=node;return {host:node(),doc,events,mediaEvents};
}
const tick=()=>new Promise(resolve=>setImmediate(resolve));
test('static fallback is truthful, mutable, and removes its listeners and DOM once',()=>{
 const {host,doc,events,mediaEvents}=lifecycleHost();let imports=0;const p=P.create(host,{title:'Before'},{static:true,loadThree:()=>{imports++;}});
 assert.equal(p.renderMode,'static');assert.equal(imports,0);assert.equal(host.children.length,1);p.update({title:'After'});assert.equal(p.config.title,'After');assert.equal(p.diagnostics.renderCount,0);p.dispose();p.dispose();assert.equal(host.children.length,0);assert.equal(events.size,0);assert.equal(mediaEvents.size,0);assert.equal(doc.policy,null);assert.equal(p.renderMode,'disposed');
});
test('immediate disposal skips loader; a late import cannot construct a renderer',async()=>{
 const a=lifecycleHost();let imports=0;const options={bookObject:{paintCover(){},linesFor(){}},loadThree:()=>{imports++;return {};}};const p=P.create(a.host,{},options);p.dispose();await tick();assert.equal(imports,0);
 const b=lifecycleHost();let resolve,constructs=0;const late=new Promise(done=>{resolve=done;}),q=P.create(b.host,{}, {...options,loadThree:()=>late});await tick();q.dispose();resolve({WebGLRenderer:class{constructor(){constructs++;}}});await tick();assert.equal(constructs,0);assert.equal(b.host.children.length,0);assert.equal(q.diagnostics.renderCount,0);
});
test('failed dependency remains a labeled static fallback without claiming rendering',async()=>{
 const {host}=lifecycleHost();const p=P.create(host,{}, {bookObject:{paintCover(){},linesFor(){}},loadThree:()=>Promise.reject(Error('offline'))});await tick();assert.equal(p.renderMode,'static-unavailable');assert.equal(p.diagnostics.renderCount,0);assert.match(p.diagnostics.failure,/initialization failed/);p.dispose();
});

test('framing bounds contain the centered intermediate cover and bent leaf, not only the closed box',()=>{
 for(const dimensions of [{},{width:3,height:1,depth:.5},{width:.8,height:4,depth:.08}]){
  const c=P.normalize(dimensions),radius=P.geometrySpec(c).radius;
  for(let o=0;o<=20;o++){const open=o/20,shift=-c.width/2*(1-open),angle=-Math.PI*open;
   for(const x of [0,c.width])for(const y of [-c.height/2,c.height/2])for(const z of [-c.coverThickness/2,c.coverThickness/2]){const px=x*Math.cos(angle)+z*Math.sin(angle)+shift,pz=-x*Math.sin(angle)+z*Math.cos(angle)+c.depth/2;assert.ok(Math.hypot(px,y,pz)<=radius);}
   for(let t=0;t<=o;t++){const turn=t/20,positions=P.leafPositions({...c,open,pageTurn:turn}),a=-Math.PI*turn,s=P.geometrySpec(c);for(let i=0;i<positions.length;i+=3){const [x,y,z]=positions.slice(i,i+3),px=x*Math.cos(a)+z*Math.sin(a)+shift,pz=-x*Math.sin(a)+z*Math.cos(a)+s.leafHinge[2];assert.ok(Math.hypot(px,y,pz)<=radius);}}
  }
 }
});

test('real Three camera projection contains global rotations around the centered model',async()=>{
 const T=await TPromise;
 for(const dimensions of [{width:3,height:1},{width:.8,height:4},{width:1.8,height:2.5}])for(const aspect of [.3,1,2.5])for(const open of [0,.25,.5,.75,1])for(const yaw of [-180,-90,0,90,180])for(const pitch of [-60,0,60]){
  const c=P.normalize({...dimensions,open,pose:{yaw,pitch,roll:30}}),s=P.geometrySpec(c),camera=new T.PerspectiveCamera(34,aspect,.01,100),assembly=new T.Group(),model=new T.Group(),cover=new T.Group();
  camera.position.z=P.fitDistance(c,aspect);camera.lookAt(0,0,0);camera.updateMatrixWorld();assembly.rotation.set(-pitch*Math.PI/180,yaw*Math.PI/180,-30*Math.PI/180,'ZXY');assembly.add(model);model.position.x=-c.width/2*(1-open);cover.position.set(...s.frontHinge);cover.rotation.y=s.frontAngle;model.add(cover);assembly.updateMatrixWorld(true);
  for(const parent of [model,cover])for(const x of [0,c.width])for(const y of [-c.height/2,c.height/2])for(const z of [-c.coverThickness/2,c.coverThickness/2]){const point=new T.Vector3(x,y,z).applyMatrix4(parent.matrixWorld).project(camera);assert.ok(Math.abs(point.x)<=1&&Math.abs(point.y)<=1&&point.z>=-1&&point.z<=1,JSON.stringify({dimensions,aspect,open,yaw,pitch,point}));}
 }
});

// Exercise the installed pointer listeners with real geometry and a renderer stub.
// This boundary proves event ownership and target pose, not native browser scrolling.
async function pointerPassport(){
 const T=await TPromise,{host,doc}=lifecycleHost(),createNode=doc.createElement;
 doc.defaultView.performance={now:()=>0};
 doc.createElement=tag=>{
  const node=createNode(tag);node.captures=new Set();node.captureCalls=[];node.releaseCalls=[];
  node.prepend=child=>{node.children.unshift(child);child.parent=node;};node.focus=()=>{doc.activeElement=node;};
  node.setPointerCapture=id=>{node.captures.add(id);node.captureCalls.push(id);};node.hasPointerCapture=id=>node.captures.has(id);node.releasePointerCapture=id=>{node.captures.delete(id);node.releaseCalls.push(id);};
  if(tag==='canvas')node.getContext=()=>({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(){},fillRect(){},fillText(){},measureText:t=>({width:t.length*10}),beginPath(){},moveTo(){},lineTo(){},stroke(){}});
  return node;
 };
 class Renderer {
  constructor(){this.domElement=doc.createElement('canvas');this.capabilities={getMaxAnisotropy:()=>1};this.info={render:{calls:0,triangles:0},memory:{geometries:0,textures:0}};}
  getContext(){return {getParameter:()=>'',getExtension:()=>null};}setClearColor(){}setPixelRatio(){}setSize(){}dispose(){}forceContextLoss(){}
 }
 const passport=P.create(host,{}, {bookObject:{paintCover(){},linesFor:t=>[t],normalize:v=>v},loadThree:()=>({...T,WebGLRenderer:Renderer})});
 await tick();assert.equal(passport.diagnostics.failure,null);assert.equal(passport.diagnostics.builds,1);
 function pointer(type,{pointerId=1,pointerType='touch',clientX=100,clientY=100,...extra}={}){
  const event={button:0,pointerId,pointerType,clientX,clientY,prevented:false,preventDefault(){this.prevented=true;},...extra};passport.element.events.get(type)(event);return event;
 }
 return {passport,doc,pointer};
}

test('vertical touch keeps its scroll gesture without pose, capture or default cancellation',async()=>{
 const {passport,pointer}=await pointerPassport(),original=passport.config.pose,element=passport.element;
 assert.equal(pointer('pointerdown').prevented,false);assert.deepEqual(element.captureCalls,[]);
 assert.equal(pointer('pointermove',{clientX:103,clientY:104}).prevented,false);assert.deepEqual(passport.config.pose,original);
 assert.equal(pointer('pointermove',{clientX:104,clientY:80}).prevented,false);assert.deepEqual(passport.config.pose,original);assert.deepEqual(element.captureCalls,[]);
 assert.equal(pointer('pointermove',{clientX:160,clientY:40}).prevented,false);assert.deepEqual(passport.config.pose,original);
 pointer('pointercancel');assert.deepEqual(element.releaseCalls,[]);passport.dispose();
});

test('horizontal touch waits for direction, changes yaw only and stops on pointercancel',async()=>{
 const {passport,pointer}=await pointerPassport(),original=passport.config.pose,element=passport.element;
 pointer('pointerdown');assert.equal(pointer('pointermove',{clientX:106,clientY:102}).prevented,false);assert.deepEqual(element.captureCalls,[]);assert.deepEqual(passport.config.pose,original);
 assert.equal(pointer('pointermove',{clientX:120,clientY:103}).prevented,true);assert.deepEqual(element.captureCalls,[1]);assert.deepEqual(passport.config.pose,{...original,yaw:original.yaw+10});
 assert.equal(pointer('pointermove',{clientX:140,clientY:140}).prevented,true);assert.deepEqual(passport.config.pose,{...original,yaw:original.yaw+20});
 pointer('pointercancel');assert.deepEqual(element.releaseCalls,[1]);const cancelled=passport.config.pose;
 assert.equal(pointer('pointermove',{clientX:200,clientY:100}).prevented,false);assert.deepEqual(passport.config.pose,cancelled);
 pointer('pointerdown',{pointerId:2});pointer('pointermove',{pointerId:2,clientX:80});assert.equal(passport.config.pose.yaw,cancelled.yaw-10);pointer('pointerup',{pointerId:2});assert.deepEqual(element.releaseCalls,[1,2]);passport.dispose();
});

test('mouse keeps two-axis dragging while reduced motion leaves keyboard rotation available',async()=>{
 const {passport,doc,pointer}=await pointerPassport(),original=passport.config.pose,element=passport.element;
 assert.equal(pointer('pointerdown',{pointerType:'mouse'}).prevented,true);assert.deepEqual(element.captureCalls,[1]);
 pointer('pointermove',{pointerType:'mouse',clientX:120,clientY:130});assert.deepEqual(passport.config.pose,{...original,yaw:original.yaw+10,pitch:original.pitch+10.5});pointer('pointerup',{pointerType:'mouse'});
 doc.documentElement.dataset.motion='reduced';doc.policy();const beforeReduced=passport.config.pose;
 assert.equal(pointer('pointerdown',{pointerId:2}).prevented,false);assert.equal(pointer('pointermove',{pointerId:2,clientX:150}).prevented,false);assert.deepEqual(passport.config.pose,beforeReduced);assert.deepEqual(element.captureCalls,[1]);
 const key={key:'ArrowRight',preventDefault(){this.prevented=true;}};element.events.get('keydown')(key);assert.equal(key.prevented,true);assert.equal(passport.config.pose.yaw,beforeReduced.yaw+5);passport.dispose();
});
