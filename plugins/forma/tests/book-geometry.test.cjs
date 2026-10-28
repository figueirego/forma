const test=require('node:test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const {create}=require('../assets/book-object.js');
const geometryOptions={skip:process.env.BOOK_THREE_MODULE?false:'Set BOOK_THREE_MODULE to an absolute Three.js ES module path for real-mesh validation'};
const reference={width:1.84,height:2.42836,depth:.254947,pose:{pitch:0,yaw:0,roll:0}};

// Exercise the public builder with real Three geometry/raycast/math. Only the
// canvas and GPU renderer are stubbed: this suite makes no visual-quality claim.
async function model(config=reference,build=create){
 assert.ok(path.isAbsolute(process.env.BOOK_THREE_MODULE),'BOOK_THREE_MODULE must be an absolute ES module path');
 const Three=await import(pathToFileURL(process.env.BOOK_THREE_MODULE).href),noop=()=>{},frames=new Map();let scene,id=0;
 const ctx=new Proxy({measureText:s=>({width:s.length*7}),createLinearGradient:()=>({addColorStop:noop}),createRadialGradient:()=>({addColorStop:noop}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>k in o?o[k]:noop,set:(o,k,v)=>(o[k]=v,true)});
 const doc={documentElement:{dataset:{}},addEventListener:noop,removeEventListener:noop,defaultView:{requestAnimationFrame:fn=>(frames.set(++id,fn),id),cancelAnimationFrame:i=>frames.delete(i),matchMedia:()=>({matches:false,addEventListener:noop,removeEventListener:noop})}};
 const node=()=>({ownerDocument:doc,style:{},dataset:{},classList:{add:noop,remove:noop},append:noop,remove:noop,setAttribute:noop,addEventListener:noop,removeEventListener:noop,getContext:()=>ctx,getBoundingClientRect:()=>({width:300,height:400,left:0,top:0})});doc.createElement=node;
 class Renderer{constructor(){this.domElement=node();}setClearColor(){}setPixelRatio(){}setSize(){}render(s){scene=s;}dispose(){}forceContextLoss(){}}
 const T={...Three,WebGLRenderer:Renderer},book=build(node(),config,{loadThree:()=>T});await new Promise(r=>setImmediate(r));
 const pending=[...frames.values()];frames.clear();for(const frame of pending)frame(16);
 assert.equal(book.renderMode,'webgl');const group=scene.children.find(child=>child.isGroup);assert.ok(group);group.rotation.set(0,0,0);group.updateMatrixWorld(true);
 return {T,book,group,meshes:group.children,ray(origin,direction,object=group){const caster=new T.Raycaster(new T.Vector3(...origin),new T.Vector3(...direction));return caster.intersectObject(object,true)[0];},dispose:()=>book.dispose()};
}
function meshMetrics(geometry){
 const p=geometry.attributes.position,n=geometry.attributes.normal,idx=geometry.index.array,edges=new Map(),winding=new Map(),shared=new Map();let volume=0,minNormal=Infinity,maxNormal=0,discontinuity=0;
 const key=i=>[p.getX(i),p.getY(i),p.getZ(i)].map(v=>Math.round(v*1e6)).join(',');
 for(let i=0;i<p.count;i++){
  const normal=[n.getX(i),n.getY(i),n.getZ(i)],length=Math.hypot(...normal),prior=shared.get(key(i));
  assert.ok([p.getX(i),p.getY(i),p.getZ(i),...normal].every(Number.isFinite));minNormal=Math.min(minNormal,length);maxNormal=Math.max(maxNormal,length);
  if(prior)discontinuity=Math.max(discontinuity,Math.hypot(...normal.map((v,k)=>v-prior[k])));else shared.set(key(i),normal);
 }
 for(let i=0;i<idx.length;i+=3){
  const [a,b,c]=idx.slice(i,i+3);assert.ok([a,b,c].every(n=>Number.isInteger(n)&&n>=0&&n<p.count));const ids=[key(a),key(b),key(c)];assert.equal(new Set(ids).size,3,'nondegenerate welded triangle');
  for(let j=0;j<3;j++){const edge=[ids[j],ids[(j+1)%3]].sort().join('|');edges.set(edge,(edges.get(edge)||0)+1);winding.set(edge,(winding.get(edge)||0)+(ids[j]<ids[(j+1)%3]?1:-1));}
  volume+=(p.getX(a)*(p.getY(b)*p.getZ(c)-p.getZ(b)*p.getY(c))+p.getY(a)*(p.getZ(b)*p.getX(c)-p.getX(b)*p.getZ(c))+p.getZ(a)*(p.getX(b)*p.getY(c)-p.getY(b)*p.getX(c)))/6;
 }
 return {vertices:p.count,triangles:idx.length/3,unclosed:[...edges.values()].filter(n=>n!==2).length,orientationConflicts:[...winding.values()].filter(n=>n!==0).length,minNormal,maxNormal,discontinuity,volume};
}
const angle=(a,b)=>Math.acos(Math.max(-1,Math.min(1,a.reduce((s,v,i)=>s+v*b[i],0)/Math.hypot(...a)/Math.hypot(...b))))*180/Math.PI;

test('actual geometry remains closed, consistently wound and smooth across UV seams at supported extremes',geometryOptions,async()=>{
 for(const config of [reference,{width:4,height:.6,depth:.08},{width:.6,height:5,depth:.9}]){
  const m=await model(config);try{for(const mesh of m.meshes){const metrics=meshMetrics(mesh.geometry);assert.equal(metrics.unclosed,0,JSON.stringify({config,metrics}));assert.equal(metrics.orientationConflicts,0);assert.ok(metrics.volume>0);assert.ok(metrics.minNormal>.999&&metrics.maxNormal<1.001);assert.ok(metrics.discontinuity<1e-6);}}finally{m.dispose();}
 }
});
test('binding channel changes the actual surface normal and returns to a flat cover locally',geometryOptions,async()=>{
 const m=await model();try{
  // Independently measured source directions, not copied reference mesh data.
  const directions=[[.04,[.216892,0,.975204]],[.06,[-.414169,0,.909447]],[.08,[-.012911,0,.999815]]];
  for(const [fraction,direction] of directions){const hit=m.ray([(fraction-.5)*reference.width,0,10],[0,0,-1]);assert.ok(hit);const n=hit.normal.toArray();assert.ok(angle(n,direction)<3,`normal at ${fraction}: ${n}, error ${angle(n,direction)}`);}
  for(const fraction of [.1,.5,.97]){const hit=m.ray([(fraction-.5)*reference.width,reference.height*.48,10],[0,0,-1]);assert.ok(hit);assert.ok(angle(hit.normal.toArray(),[0,0,1])<.1,'printed field remains flat before the narrow rim');}
 }finally{m.dispose();}
});
test('head and tail bridges follow the binding crown and overlap the recessed paper',geometryOptions,async()=>{
 const m=await model();try{
  for(const sign of [-1,1])for(const [fraction,target] of [[.005,.004832],[.01,.001684],[.012,.000929],[.02,.009888],[.025,.019508],[.03,.019508]]){
   const hit=m.ray([(fraction-.5)*reference.width,sign*10,0],[0,-sign,0]);assert.ok(hit);const inset=(reference.height/2-sign*hit.point.y)/reference.width;
   assert.ok(Math.abs(inset-target)<.0012,`bridge ${sign},${fraction}: ${inset} vs ${target}`);
  }
  for(const sign of [-1,1])for(let i=0;i<=30;i++){const fraction=.024+i*.0001,hit=m.ray([(fraction-.5)*reference.width,sign*10,0],[0,-sign,0]);assert.ok(hit,'continuous bridge/paper overlap');}
 }finally{m.dispose();}
});
test('rounded rim follows a curved cross-section and the old oblique channel opening stays closed',geometryOptions,async()=>{
 const m=await model();try{
  // Smooth normals also exist on a linear chamfer. Probe surface positions at
  // the roundover's interior arc samples to protect the actual curved profile.
  const cover=Math.min(reference.width*.01575,reference.depth*.14),radius=Math.min(cover*.22,reference.width*.032*.18);
  for(const sign of [-1,1])for(const theta of [Math.PI/8,Math.PI/4,3*Math.PI/8]){
   const y=sign*(reference.height/2-radius+radius*Math.sin(theta)),expectedZ=reference.depth/2-radius+radius*Math.cos(theta);
   const hit=m.ray([reference.width*.25,y,10],[0,0,-1],m.meshes[0]);assert.ok(hit);
   assert.ok(Math.abs(hit.point.z-expectedZ)<reference.width*1e-6,'rim cross-section follows the circular profile');
  }
  m.group.rotation.set(-28.65*Math.PI/180,0,0,'ZXY');m.group.updateMatrixWorld(true);
  for(let x=0;x<29;x++)for(let y=0;y<29;y++)assert.ok(m.ray([-.86+.06*x/28,-1.103+.004*y/28,10],[0,0,-1]),`oblique ray ${x},${y}`);
 }finally{m.dispose();}
});

test('paper cuts retain two-dimensional UVs through thickness and measured weave scale',geometryOptions,async()=>{
 const m=await model();try{
  const paper=m.meshes[2],g=paper.geometry,p=g.attributes.position,uv=g.attributes.uv,idx=g.index.array;
  const shader={uniforms:{},fragmentShader:''};paper.material.onBeforeCompile(shader);const region=shader.uniforms.bookRegion.value;
  const effective=i=>[region[0]+uv.getX(i)*region[2],region[1]+uv.getY(i)*region[3]],faces={bottom:[],top:[],fore:[]};
  const a=new m.T.Vector3(),b=new m.T.Vector3(),c=new m.T.Vector3(),normal=new m.T.Vector3();
  for(let i=0;i<idx.length;i+=3){
   const ids=[idx[i],idx[i+1],idx[i+2]],[u,v,w]=ids.map(effective);
   assert.ok(Math.abs((v[0]-u[0])*(w[1]-u[1])-(v[1]-u[1])*(w[0]-u[0]))>1e-14,'every cut/bevel triangle has a nondegenerate UV projection');
   a.fromBufferAttribute(p,ids[0]);b.fromBufferAttribute(p,ids[1]);c.fromBufferAttribute(p,ids[2]);normal.crossVectors(b.sub(a),c.sub(a)).normalize();
   const face=normal.y<-.999999?'bottom':normal.y>.999999?'top':normal.x>.999999?'fore':null;
   if(face)faces[face].push(...ids);
  }
  for(const [face,expected] of [['bottom',[13.5664,3.128]],['top',[13.56672,3.128]],['fore',[20.26144,3.128]]]){
   const ids=[...new Set(faces[face])];assert.ok(ids.length>10);
   const mapped=ids.map(effective),ranges=[0,1].map(axis=>32*(Math.max(...mapped.map(v=>v[axis]))-Math.min(...mapped.map(v=>v[axis]))));
   assert.ok(Math.abs(ranges[0]-expected[0])<.1,`${face} length cycles: ${ranges}`);assert.ok(Math.abs(ranges[1]-expected[1])<.05,`${face} depth cycles: ${ranges}`);
   // Identical in-plane coordinates at different Z must not sample the same V.
   const lines=new Map();let thicknessPairs=0;
   for(const id of ids){const key=[p.getX(id),p.getY(id)].map(v=>Math.round(v*1e6)).join(','),prior=lines.get(key),point={z:p.getZ(id),v:effective(id)[1]};if(prior&&Math.abs(prior.z-point.z)>.001){assert.ok(Math.abs(prior.v-point.v)>1e-5);thicknessPairs++;}else lines.set(key,point);}
   assert.ok(thicknessPairs>5,`${face} must vary through thickness`);
  }
  assert.equal(idx.length/3,11536,'unwrap retains the original paper triangles');assert.ok(p.count<7000,'only seam vertices are duplicated, not every triangle');
 }finally{m.dispose();}
});
