const test=require('node:test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
// Optional for portable use; CI/full geometry validation must provide the host Three module.
async function geometryThree(t){if(!process.env.BOOK_THREE_MODULE){t.skip('Set BOOK_THREE_MODULE to an absolute Three.js ES module path for real-mesh validation');return null;}return import(pathToFileURL(process.env.BOOK_THREE_MODULE).href);}
const {normalize,fitDistance,frameFor,lightCompensation,linesFor,paintCover,create}=require('../assets/book-object.js');
function hostFixture({withIntersection=false}={}){
 const noop=()=>{},ctx=new Proxy({measureText:s=>({width:s.length*7}),createLinearGradient:()=>({addColorStop:noop}),createRadialGradient:()=>({addColorStop:noop}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>k in o?o[k]:noop,set:(o,k,v)=>(o[k]=v,true)});
 const doc={documentElement:{dataset:{}},events:new Map(),addEventListener(k,fn){this.events.set(k,fn)},removeEventListener(k){this.events.delete(k)},defaultView:{requestAnimationFrame:()=>1,cancelAnimationFrame:noop,matchMedia:()=>({matches:false,addEventListener:noop,removeEventListener:noop})}};
 doc.defaultView.MutationObserver=class{constructor(fn){doc.policyChanged=fn}observe(){}disconnect(){doc.policyChanged=null}};
 if(withIntersection)doc.defaultView.IntersectionObserver=class{constructor(fn){doc.intersectionChanged=fn}observe(){}disconnect(){doc.intersectionChanged=null}};
 function node(tag){const textCalls=[],context=new Proxy(ctx,{get:(o,k)=>k==='fillText'?(...args)=>textCalls.push(args):o[k]});return {tagName:tag,ownerDocument:doc,style:{},dataset:{},children:[],events:new Map(),textCalls,classList:{add:noop,remove:noop},append(n){n.parent=this;this.children.push(n)},remove(){if(this.parent)this.parent.children=this.parent.children.filter(n=>n!==this)},setAttribute:noop,addEventListener(k,v){this.events.set(k,v)},removeEventListener(k){this.events.delete(k)},getContext:()=>context,getBoundingClientRect:()=>({width:300,height:400,left:0,top:0})};}
 doc.createElement=node;return node('div');
}
test('invalid colors cannot become remote URL fetches and numeric geometry is bounded',()=>{
 const c=normalize({color:'url(https://invalid.example/track)',inkColor:'red',pagesColor:'#FFFFFF',width:Infinity,height:-4,depth:NaN,pattern:'custom',pose:{pitch:900,yaw:NaN}});
 assert.equal(c.color,'#3d4934');assert.equal(c.inkColor,'#fbfbfc');assert.equal(c.pagesColor,'#ffffff');assert.equal(c.width,1.84);assert.equal(c.height,.6);assert.equal(c.depth,.36);assert.equal(c.pattern,'panels');assert.equal(c.pose.pitch,60);assert.equal(c.pose.yaw,-18);
});
test('partial update preserves unrelated configuration without sharing pose objects',()=>{
 const a=normalize({title:'A',width:2.8,pose:{pitch:12}}),b=normalize({color:'#315463',pose:{yaw:35}},a);
 assert.equal(b.title,'A');assert.equal(b.width,2.8);assert.equal(b.pose.pitch,12);assert.equal(b.pose.yaw,35);b.pose.pitch=20;assert.equal(a.pose.pitch,12);
});
test('camera fit contains the volume at all rotations and narrow host aspects',()=>{
 for(const c of [normalize(),normalize({width:4,height:.6,depth:.9}),normalize({width:.6,height:5,depth:.08})])for(const a of [.2,.75,1,3]){
  const distance=fitDistance(c,a),radius=Math.hypot(c.width,c.height,c.depth)/2,v=34*Math.PI/180,h=2*Math.atan(Math.tan(v/2)*a);
  assert.ok(Number.isFinite(distance));assert.ok(distance*Math.sin(Math.min(v,h)/2)>radius);
 }
});
test('painted titles wrap even without spaces and signal truncation, leaving DOM full title to host',()=>{
 const full='W'.repeat(120),measure=s=>s.length*10,lines=linesFor(full,measure,100,3);
 assert.equal(lines.length,3);assert.ok(lines.every(l=>measure(l)<=100));assert.ok(lines[2].endsWith('…'));assert.deepEqual(linesFor('Curto',measure,100,3),['Curto']);
});
test('static shelves do not request Three and release their DOM on disposal',()=>{
 const host=hostFixture(),book=create(host,{title:'Caderno'}, {interactive:false});assert.equal(book.renderMode,'canvas');assert.equal(host.children.length,1);
 book.update({title:'Álbum',width:2.8});assert.equal(book.config.title,'Álbum');assert.equal(book.config.width,2.8);
 const copy=book.config;copy.title='mutação';assert.equal(book.config.title,'Álbum');book.dispose();book.dispose();assert.equal(host.children.length,0);assert.equal(book.renderMode,'disposed');book.update({title:'ignorado'});assert.equal(book.config.title,'Álbum');
});
test('immediate disposal does not start the deferred Three loader',async()=>{
 const host=hostFixture();let loaderCalls=0;const book=create(host,{}, {loadThree:()=>{loaderCalls++;return {};}});
 book.dispose();await new Promise(r=>setImmediate(r));assert.equal(loaderCalls,0);assert.equal(host.children.length,0);assert.equal(book.renderMode,'disposed');
});
test('late Three import after disposal cannot construct a renderer',async()=>{
 const host=hostFixture();let resolve,constructed=0;const loaded=new Promise(r=>resolve=r),book=create(host,{}, {loadThree:()=>loaded});await Promise.resolve();book.dispose();resolve({WebGLRenderer:class{constructor(){constructed++}}});await new Promise(r=>setImmediate(r));assert.equal(constructed,0);assert.equal(host.children.length,0);
});
test('unavailable renderer leaves a static cover and preserves future content updates',async()=>{
 const host=hostFixture(),book=create(host,{title:'Antes'},{loadThree:()=>Promise.reject(Error('offline'))});await new Promise(r=>setImmediate(r));assert.equal(book.renderMode,'canvas-unavailable');book.update({title:'Depois'});assert.equal(book.config.title,'Depois');assert.equal(host.children.length,1);book.dispose();
});
function threeFixture(host,{renderError=false}={}){
 const noop=()=>{},counts={geometry:0,material:0,texture:0,renderer:0,context:0},frames=new Map(),materials=[],geometries=[],meshes=[],lights=[];let serial=0,instance,renders=0,constructed=0,clock=0;
 host.ownerDocument.defaultView.requestAnimationFrame=fn=>{frames.set(++serial,fn);return serial};host.ownerDocument.defaultView.cancelAnimationFrame=id=>frames.delete(id);
 class Object3D{constructor(){this.children=[];this.position={set:noop};this.rotation={set:noop}}add(child){this.children.push(child)}remove(child){this.children=this.children.filter(n=>n!==child)}traverse(fn){fn(this);for(const child of this.children)child.traverse(fn)}}
 const T={Group:Object3D,Scene:Object3D,AmbientLight:class extends Object3D{constructor(){super();lights.push(this)}},DirectionalLight:class extends Object3D{constructor(){super();lights.push(this)}},PerspectiveCamera:class extends Object3D{updateProjectionMatrix(){}},Mesh:class extends Object3D{constructor(geometry,material){super();this.geometry=geometry;this.material=material;meshes.push(this)}},Float32BufferAttribute:class{constructor(array,itemSize){this.array=array;this.itemSize=itemSize}},BufferGeometry:class{constructor(){this.attributes={};this.groups=[];geometries.push(this)}setAttribute(key,value){this.attributes[key]=value}setIndex(value){this.index=value}addGroup(start,count,materialIndex){this.groups.push({start,count,materialIndex})}computeVertexNormals(){}dispose(){counts.geometry++}},MeshPhongMaterial:class{constructor(options){Object.assign(this,options);materials.push(this)}dispose(){counts.material++}},CanvasTexture:class{constructor(canvas){this.image=canvas}dispose(){counts.texture++}},WebGLRenderer:class{constructor(){this.domElement=host.ownerDocument.createElement('canvas');instance=this;constructed++}setClearColor(){}setPixelRatio(value){this.pixelRatio=value}setSize(width,height){this.width=width;this.height=height}render(){renders++;if(renderError)throw Error('GPU failure')}dispose(){counts.renderer++}forceContextLoss(){counts.context++}}};
 return {T,counts,frames,materials,geometries,meshes,lights,get renders(){return renders},get constructed(){return constructed},get renderer(){return instance},draw(){const callbacks=[...frames.values()];frames.clear();clock+=16;callbacks.forEach(fn=>fn(clock))}};
}
test('lost context restores the visible cover and releases shared GPU resources only once',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{}, {loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));gpu.draw();assert.equal(book.renderMode,'webgl');assert.equal(host.children[0].children[0].style.visibility,'hidden');
 let prevented=false;gpu.renderer.domElement.events.get('webglcontextlost')({preventDefault(){prevented=true}});assert.equal(prevented,true);assert.equal(book.renderMode,'canvas-context-lost');assert.equal(host.children[0].children[0].style.visibility,'visible');assert.equal(host.children[0].children.length,1);assert.deepEqual(gpu.counts,{geometry:4,material:5,texture:15,renderer:1,context:1});assert.equal(gpu.frames.size,0);
 book.update({title:'Capa ainda utilizável'});book.dispose();assert.deepEqual(gpu.counts,{geometry:4,material:5,texture:15,renderer:1,context:1});
});
test('a render failure restores the cover instead of leaving a blank WebGL canvas',async()=>{
 const host=hostFixture(),gpu=threeFixture(host,{renderError:true}),book=create(host,{}, {loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));gpu.draw();assert.equal(book.renderMode,'canvas-unavailable');assert.equal(host.children[0].children[0].style.visibility,'visible');assert.equal(gpu.counts.renderer,1);book.dispose();
});
test('material inputs are bounded enums and pose changes do not rebuild GPU resources',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{material:'leather',finish:'ink'},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));gpu.draw();
 assert.equal(book.config.material,'leather');assert.equal(gpu.materials[0].shininess,8);assert.notEqual(gpu.materials[0].bumpMap,gpu.materials[0].map);assert.notEqual(gpu.materials[0].specularMap,gpu.materials[0].map);
 book.setPose({yaw:60});assert.equal(book.config.pose.yaw,60);assert.equal(book.config.pose.pitch,9);assert.equal(gpu.counts.texture,0);assert.equal(gpu.materials.length,5);
 book.update({material:'url(https://invalid.example)',finish:'invalid'});assert.equal(book.config.material,'leather');assert.equal(book.config.finish,'ink');book.dispose();
});
test('static material preference avoids import and can release and resume the same module',async()=>{
 const host=hostFixture(),doc=host.ownerDocument,gpu=threeFixture(host);doc.documentElement.dataset.materials='static';let imports=0;const book=create(host,{}, {loadThree:()=>{imports++;return gpu.T}});
 await new Promise(r=>setImmediate(r));assert.equal(imports,0);assert.equal(book.renderMode,'canvas');
 doc.documentElement.dataset.materials='interactive';doc.policyChanged();await new Promise(r=>setImmediate(r));gpu.draw();assert.equal(imports,1);assert.equal(book.renderMode,'webgl');
 doc.documentElement.dataset.materials='static';doc.policyChanged();assert.equal(book.renderMode,'canvas');assert.equal(gpu.counts.texture,15);assert.equal(gpu.counts.context,1);assert.equal(gpu.frames.size,0);
 doc.documentElement.dataset.materials='interactive';doc.policyChanged();gpu.draw();assert.equal(imports,1);assert.equal(gpu.constructed,2);assert.equal(book.renderMode,'webgl');book.dispose();
});
test('hidden document defers acquisition, stops queued frames and defers material rebuilds',async()=>{
 const host=hostFixture(),doc=host.ownerDocument,gpu=threeFixture(host);doc.hidden=true;let imports=0;const book=create(host,{}, {loadThree:()=>{imports++;return gpu.T}});
 await new Promise(r=>setImmediate(r));assert.equal(imports,0);doc.hidden=false;doc.events.get('visibilitychange')();await new Promise(r=>setImmediate(r));gpu.draw();
 book.setPose({yaw:80});assert.equal(gpu.frames.size,1);doc.hidden=true;doc.events.get('visibilitychange')();assert.equal(gpu.frames.size,0);book.update({color:'#315463'});assert.equal(gpu.counts.texture,0);
 doc.hidden=false;doc.events.get('visibilitychange')();assert.equal(gpu.counts.texture,15);gpu.draw();assert.equal(book.config.color,'#315463');book.dispose();assert.equal(doc.events.has('visibilitychange'),false);
});
test('offscreen host defers import and motion reduction stops interpolation after one frame',async()=>{
 const host=hostFixture({withIntersection:true}),doc=host.ownerDocument,gpu=threeFixture(host);let imports=0;const book=create(host,{}, {loadThree:()=>{imports++;return gpu.T}});
 await new Promise(r=>setImmediate(r));assert.equal(imports,0);doc.intersectionChanged([{target:host,isIntersecting:true}]);await new Promise(r=>setImmediate(r));gpu.draw();assert.equal(imports,1);
 book.setPose({yaw:80});gpu.draw();assert.equal(gpu.frames.size,1);doc.documentElement.dataset.motion='reduced';doc.policyChanged();gpu.draw();assert.equal(gpu.frames.size,0);
 doc.intersectionChanged([{target:host,isIntersecting:false}]);book.setPose({yaw:20});assert.equal(gpu.frames.size,0);book.dispose();assert.equal(doc.intersectionChanged,null);
});

test('rounded covers, recessed pages and curved spine produce valid bounded meshes',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),config={width:1.84,height:2.42836,depth:.254947,pose:{pitch:28.65,yaw:20.05,roll:-8.59}},book=create(host,config,{loadThree:()=>gpu.T});
 await new Promise(r=>setImmediate(r));gpu.draw();assert.equal(book.renderMode,'webgl');assert.equal(book.config.pose.pitch,28.65);
 for(const geometry of gpu.geometries){
  const positions=geometry.attributes.position.array,count=positions.length/3;
  assert.ok(positions.every(Number.isFinite));assert.equal(geometry.attributes.uv.array.length,count*2);
  assert.ok(geometry.index.every(i=>Number.isInteger(i)&&i>=0&&i<count));
 }
 const cover=gpu.geometries[0].attributes.position.array,pages=gpu.geometries[2].attributes.position.array;
 const span=(array,axis)=>{const values=array.filter((_,i)=>i%3===axis);return Math.max(...values)-Math.min(...values);};
 assert.ok(span(pages,1)<span(cover,1));assert.ok(span(pages,2)<config.depth);
 const spine=gpu.geometries[3].attributes.position.array,curveX=new Set(spine.filter((_,i)=>i%3===0).map(n=>n.toFixed(4)));
 assert.ok(curveX.size>12,'spine has a continuous curve, not a flat box');
 const halfW=span(cover,0)/2,halfH=span(cover,1)/2;
 assert.equal(cover.some((x,i)=>i%3===0&&Math.abs(x)>halfW-.00001&&Math.abs(cover[i+1])>halfH-.00001),false,'outer corners are rounded');book.dispose();
});

test('projected camera envelope stays finite across editable aspect ratios and uses distant perspective',()=>{
 for(const config of [{width:1.84,height:2.42836,depth:.254947,pose:{pitch:28.65,yaw:20.05,roll:-8.59}},{width:.6,height:5,depth:.9},{width:4,height:.6,depth:.08}]){
  const result=frameFor(config);assert.ok(Number.isFinite(result.width)&&result.width>0);assert.ok(Number.isFinite(result.height)&&result.height>0);assert.equal(result.distance,config.width*17.1);
 }
 assert.ok(frameFor({width:1.84,height:2.42836,depth:.254947}).height>2.42836);
});

test('release keeps drag rotation, leaving returns to rest, and reduced motion prevents gestures',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{pose:{pitch:28.65,yaw:20.05,roll:-8.59}},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));gpu.draw();
 const node=host.children[0],event=(x,y)=>({clientX:x,clientY:y,pointerId:1,pointerType:'mouse',button:0}),settle=()=>{for(let i=0;gpu.frames.size&&i<180;i++)gpu.draw();assert.equal(gpu.frames.size,0);};
 node.events.get('pointerdown')(event(150,200));node.events.get('pointermove')(event(250,200));settle();assert.equal(Number(host.dataset.bookPose.split(' ')[0]),62.05);
 node.events.get('pointerup')(event(250,200));settle();const released=Number(host.dataset.bookPose.split(' ')[0]);assert.ok(released>60,'pointerup preserves spin instead of snapping to rest');
 book.update({material:'paper'});settle();assert.equal(Number(host.dataset.bookPose.split(' ')[0]),released,'material edits preserve the inspection angle');
 node.events.get('pointerleave')();settle();assert.equal(host.dataset.bookPose,'20.05 28.65 -8.59');
 host.ownerDocument.documentElement.dataset.motion='reduced';host.ownerDocument.policyChanged();settle();node.events.get('pointerdown')(event(150,200));node.events.get('pointermove')(event(290,200));assert.equal(gpu.frames.size,0);assert.equal(host.dataset.bookPose,'20.05 28.65 -8.59');book.dispose();
});

test('material palette is validated and copied without changing the explicit cover color',()=>{
 const input={color:'#4F5B3F',palette:{deep:'#303323',lit:'#809060',edge:'#65734a'}},a=normalize(input),b=normalize({},a);
 assert.equal(a.color,'#4f5b3f');b.palette.deep='#000000';assert.equal(a.palette.deep,'#303323');assert.equal(normalize({palette:{deep:'url(invalid)'}}).palette.deep,'#3d4934');assert.equal(normalize({palette:null},a).palette,null);
});

test('binding shoulder joins the board and the cover contains a physical channel',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{width:1.84,height:2.42836,depth:.254947},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 const front=gpu.meshes[0],spine=gpu.meshes[3],frontX=front.geometry.attributes.position.array.filter((_,i)=>i%3===0).map(x=>x+front.position.x),spineX=spine.geometry.attributes.position.array.filter((_,i)=>i%3===0);
 assert.ok(Math.min(...frontX)<Math.max(...spineX),'board and spine shoulder overlap rather than leaving an empty gap');
 const cap=front.geometry.attributes.position.array,coverHalf=1.84*.01575/2,channel=[];
 for(let i=0;i<cap.length;i+=3)if(Math.abs(cap[i]+front.position.x-(-1.84/2+1.84*.047))<.025)channel.push(cap[i+2]);
 assert.ok(Math.max(...channel)<coverHalf-.008,'channel has lower z coordinates, not just a painted dark strip');
 const pages=gpu.meshes[2].geometry.attributes.position.array,right=pages.filter((_,i)=>i%3===0&&i>0),curve=new Set(right.map(n=>n.toFixed(5)));assert.ok(curve.size>65,'page depth layers have curved cut coordinates');book.dispose();
});

test('front, back and spine have independent content with a portable foil mark',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{title:'Pesquisa',subtitle:'1288 itens',brand:'Pesquisa',brandMark:'monogram',spineLabel:'01288'},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 const front=gpu.materials[0].map.image.textCalls.map(c=>c[0]),back=gpu.materials[1].map.image.textCalls.map(c=>c[0]),spine=gpu.materials[2].map.image.textCalls.map(c=>c[0]);
 assert.deepEqual(front,['P','1288 itens','Pesquisa']);assert.deepEqual(back,['P']);assert.deepEqual(spine,['Pesquisa','01288','P']);
 const uvFront=gpu.meshes[0].geometry.attributes.uv.array,uvBack=gpu.meshes[1].geometry.attributes.uv.array;assert.ok(Math.abs(uvFront[0]+uvBack[0]-1)<1e-10,'back artwork reads correctly when viewed from behind');
 assert.equal(normalize({brandMark:'invalid',spineLabel:'x'.repeat(50)}).brandMark,'text');assert.equal(normalize({spineLabel:'x'.repeat(50)}).spineLabel.length,12);book.dispose();
});

test('font completion rebuilds atlas content, while completion after disposal is harmless',async()=>{
 const host=hostFixture(),gpu=threeFixture(host);let ready;host.ownerDocument.fonts={status:'loading',ready:new Promise(resolve=>ready=resolve)};
 const book=create(host,{title:'Fonte pronta'},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));const firstMap=gpu.materials[0].map;ready();await new Promise(r=>setImmediate(r));assert.equal(gpu.counts.texture,15);assert.notEqual(gpu.materials[5].map,firstMap);book.dispose();
 const host2=hostFixture();let late;host2.ownerDocument.fonts={status:'loading',ready:new Promise(resolve=>late=resolve)};const book2=create(host2,{});book2.dispose();late();await new Promise(r=>setImmediate(r));assert.equal(host2.children.length,0);
});

test('camera canvas expands outside nominal host rather than shrinking the book',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),config={width:1.84,height:2.42836,depth:.254947,pose:{pitch:28.65,yaw:20.05,roll:-8.59}},book=create(host,config,{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 const style=gpu.renderer.domElement.style;assert.ok(parseFloat(style.width)>300);assert.ok(parseFloat(style.height)>400);assert.ok(parseFloat(style.left)<0&&parseFloat(style.top)<0);
 assert.ok(lightCompensation(config.pose)>=.62&&lightCompensation(config.pose)<=1.5);assert.notEqual(lightCompensation(config.pose),lightCompensation({...config.pose,yaw:180}));book.dispose();
});

test('checks and stems retain distinct filled relief while grid remains ruled',()=>{
 function draw(pattern){const rects=[],lines=[],noop=()=>{},context=new Proxy({fillRect:(...args)=>rects.push(args),lineTo:(...args)=>lines.push(args),measureText:s=>({width:s.length*7}),createLinearGradient:()=>({addColorStop:noop}),createRadialGradient:()=>({addColorStop:noop}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>k in o?o[k]:noop,set:(o,k,v)=>(o[k]=v,true)});paintCover({getContext:()=>context},{pattern},'height');return {rects,lines};}
 const checks=draw('checks'),stems=draw('stems'),grid=draw('grid');
 assert.ok(checks.rects.length>30,'checkerboard must contain filled cells');assert.ok(stems.rects.length>12,'stems must contain variable thick and thin solid shafts');assert.equal(grid.rects.length,1,'grid uses rules, not filled checker cells');assert.ok(grid.lines.length>checks.lines.length);
});

test('inspection buttons can keep front calibration when showing the reverse side',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{pose:{pitch:28.65,yaw:20.05,roll:-8.59}},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 const front=gpu.lights.map(light=>light.intensity);book.setPose({yaw:180},{preserveLighting:true});assert.deepEqual(gpu.lights.map(light=>light.intensity),front);
 book.update({material:'paper'});assert.deepEqual(gpu.lights.map(light=>light.intensity),front);book.setPose({yaw:180});assert.notDeepEqual(gpu.lights.map(light=>light.intensity),front);book.dispose();
});

test('detail supersampling is sharp at DPR1 and bounded for large preview hosts',async()=>{
 const host=hostFixture(),gpu=threeFixture(host);host.ownerDocument.defaultView.devicePixelRatio=1;const book=create(host,{}, {loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));assert.equal(gpu.renderer.pixelRatio,2);assert.ok(gpu.renderer.width*gpu.renderer.pixelRatio<=2048);book.dispose();
 const large=hostFixture(),gpu2=threeFixture(large);large.getBoundingClientRect=()=>({width:4000,height:6000});const book2=create(large,{}, {loadThree:()=>gpu2.T});await new Promise(r=>setImmediate(r));assert.ok(Math.max(gpu2.renderer.width,gpu2.renderer.height)*gpu2.renderer.pixelRatio<=2048.001);book2.dispose();
 const light=hostFixture(),gpu3=threeFixture(light),book3=create(light,{}, {renderScale:1,loadThree:()=>gpu3.T});await new Promise(r=>setImmediate(r));assert.equal(gpu3.renderer.pixelRatio,1);book3.dispose();
});

test('binding is watertight and overlaps the page block at the head and tail',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),c=normalize({width:1.84,height:2.42836,depth:.254947}),book=create(host,c,{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 const binding=gpu.meshes[3].geometry,vertices=binding.attributes.position.array,edges=new Map(),key=i=>vertices.slice(i*3,i*3+3).map(v=>Math.round(v*1e7)).join(',');
 for(let i=0;i<binding.index.length;i+=3){const triangle=binding.index.slice(i,i+3);for(let j=0;j<3;j++){const edge=[key(triangle[j]),key(triangle[(j+1)%3])].sort().join('|');edges.set(edge,(edges.get(edge)||0)+1);}}
 assert.ok([...edges.values()].every(count=>count===2),'all binding edges have two incident faces, including the inner wall');
 const page=gpu.meshes[2],pagePositions=page.geometry.attributes.position.array,pageMin=Math.min(...pagePositions.filter((_,i)=>i%3===0))+page.position.x,spineMax=Math.max(...vertices.filter((_,i)=>i%3===0));
 assert.ok(spineMax>pageMin,'bridge meets the paper instead of exposing the background');
 const right=Math.max(...pagePositions.filter((_,i)=>i%3===0))+page.position.x;
 assert.ok(Math.abs((c.width/2-right)/c.width-.020204)<1e-6,'visible fore-edge uses the outer paper boundary');book.dispose();
});

test('cover caps curve in the vertical direction and share smooth normals with bevel seams',async(t)=>{
 const T=await geometryThree(t);if(!T)return;const host=hostFixture(),gpu=threeFixture(host);gpu.T.BufferGeometry=T.BufferGeometry;gpu.T.Float32BufferAttribute=T.Float32BufferAttribute;
 const book=create(host,{width:1.84,height:2.42836,depth:.254947},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));const geometry=gpu.meshes[0].geometry,p=geometry.attributes.position.array,n=geometry.attributes.normal.array,indices=geometry.index.array;
 const capVertices=new Set(indices.slice(0,geometry.groups[0].count));assert.ok([...capVertices].some(i=>Math.abs(n[i*3+1])>.005),'vertical turning must affect the lighting normal');
 const positions=new Map();for(let i=0;i<p.length;i+=3){const key=[p[i],p[i+1],p[i+2]].map(v=>Math.round(v*1e6)).join(','),prior=positions.get(key);if(prior)assert.ok(Math.hypot(n[i]-prior[0],n[i+1]-prior[1],n[i+2]-prior[2])<1e-6);else positions.set(key,[n[i],n[i+1],n[i+2]]);}book.dispose();
});

test('cloth, paper and foil use registered face regions and physical material scale',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{width:1.84,height:2.42836,depth:.254947},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 const compile=material=>{const shader={uniforms:{},fragmentShader:'#include <specularmap_fragment>\n#include <normal_fragment_maps>'};material.onBeforeCompile(shader);return shader;},front=compile(gpu.materials[0]),spine=compile(gpu.materials[2]),paper=compile(gpu.materials[4]);
 const frontCycles=front.uniforms.bookRegion.value.slice(2).map(n=>n*32),spineCycles=spine.uniforms.bookRegion.value.slice(2).map(n=>n*32);
 assert.ok(Math.abs(frontCycles[0]-13.9072)<1e-6&&Math.abs(frontCycles[1]-24.144)<1e-6);assert.ok(Math.abs(spineCycles[0]-2.6688)<1e-6&&Math.abs(spineCycles[1]-23.5648)<1e-6);
 assert.equal(front.uniforms.bookWeave.value,spine.uniforms.bookWeave.value);assert.equal(paper.uniforms.bookWeave.value,front.uniforms.bookWeave.value,'paper retains the base height material');
 assert.equal(gpu.materials[4].shininess,8);assert.equal(gpu.materials[4].bumpMap.image.width,2);assert.equal(front.uniforms.bookGrain.value.image.width,256);assert.equal(front.uniforms.bookReflection.value.image.width,192);assert.equal(front.uniforms.bookUnitScale.value,1.84/15.8778);assert.equal((front.fragmentShader.match(/perturbNormalArb\(/g)||[]).length,1);book.dispose();
});

test('spine lettering only paints diffuse and never compresses glyphs to a maxWidth',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{title:'Título muito longo '.repeat(10),spineLabel:'12345678',brand:'Pauta',brandMark:'monogram'},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 const material=gpu.materials[2],diffuse=material.map.image.textCalls,height=material.bumpMap.image.textCalls,foil=material.specularMap.image.textCalls;
 assert.ok(diffuse[0][0].endsWith('…'));assert.equal(diffuse[0].length,3);assert.equal(diffuse[1].length,3);assert.equal(diffuse[1][0],'12345678');assert.deepEqual(height.map(call=>call[0]),['P']);assert.deepEqual(foil.map(call=>call[0]),['P']);
 const cover=gpu.materials[0];assert.ok(Math.abs(cover.bumpMap.image.width*2-cover.map.image.width)<=1);assert.ok(Math.abs(cover.specularMap.image.width*4-cover.map.image.width)<=2);book.dispose();
});

test('retina reference sampling is explicit, bounded, and economy preserves fixed sampling',async()=>{
 const host=hostFixture(),gpu=threeFixture(host);host.getBoundingClientRect=()=>({width:248,height:328});host.ownerDocument.defaultView.devicePixelRatio=2;const book=create(host,{}, {loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));assert.equal(gpu.renderer.pixelRatio,4);assert.ok(Math.max(gpu.renderer.width,gpu.renderer.height)*gpu.renderer.pixelRatio<=2048.001);book.dispose();
 const economy=hostFixture(),gpu2=threeFixture(economy);economy.ownerDocument.defaultView.devicePixelRatio=2;const book2=create(economy,{}, {resolution:'economy',loadThree:()=>gpu2.T});await new Promise(r=>setImmediate(r));assert.equal(gpu2.renderer.pixelRatio,2);book2.dispose();
 const zoomed=hostFixture(),gpu3=threeFixture(zoomed);zoomed.ownerDocument.defaultView.devicePixelRatio=.67;const book3=create(zoomed,{}, {loadThree:()=>gpu3.T});await new Promise(r=>setImmediate(r));assert.equal(gpu3.renderer.pixelRatio,1.34);book3.dispose();
});


test('changing preview width regenerates the raster atlas without losing the inspection pose',async()=>{
 const host=hostFixture(),gpu=threeFixture(host);let resized,width=248;host.getBoundingClientRect=()=>({width,height:width*1.32});host.ownerDocument.defaultView.ResizeObserver=class{constructor(fn){resized=fn}observe(){}disconnect(){}};
 const book=create(host,{title:'Responsivo',pose:{yaw:40}},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));const map=gpu.materials[0].map,previousWidth=map.image.width;gpu.draw();width=168;resized();assert.notEqual(gpu.materials[5].map,map);assert.ok(gpu.materials[5].map.image.width<previousWidth);assert.equal(gpu.counts.texture,15);assert.equal(book.config.pose.yaw,40);book.dispose();
});


test('physical bump survives stock Phong derivative normalization across scale and pixel density',async()=>{
 const host=hostFixture(),gpu=threeFixture(host),book=create(host,{}, {loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));const shader={uniforms:{},fragmentShader:'#include <normal_fragment_maps>'};gpu.materials[0].onBeforeCompile(shader);
 assert.match(shader.fragmentShader,/length\(dFdx\(vViewPosition\)\)/);assert.match(shader.fragmentShader,/length\(dFdy\(vViewPosition\)\)/);assert.match(shader.fragmentShader,/bumpScale \/ max\(bookPixelSpan/);
 const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],unit=a=>a.map(v=>v/Math.hypot(...a));
 const perturb=(dx,dy,gradient)=>{const n=unit([.2,.1,1]),r1=cross(dy,n),r2=cross(n,dx),det=dot(dx,r1);return unit(n.map((v,i)=>Math.abs(det)*v-Math.sign(det)*(gradient[0]*r1[i]+gradient[1]*r2[i])));};
 for(const scale of [.116,1,2])for(const density of [1,2,4]){const dx=[.06*scale/density,0,.01*scale/density],dy=[.01*scale/density,.065*scale/density,.005*scale/density],gradient=[.009*scale/density,-.003*scale/density],expected=perturb(dx,dy,gradient),compensated=perturb(unit(dx),unit(dy),[gradient[0]/Math.hypot(...dx),gradient[1]/Math.hypot(...dy)]);assert.ok(Math.hypot(...expected.map((v,i)=>v-compensated[i]))<1e-10);}
 book.dispose();
});

test('deformed cover boundaries stay watertight at the channel and intercept the reported oblique gap ray',async(t)=>{
 const T=await geometryThree(t);if(!T)return;const host=hostFixture(),gpu=threeFixture(host);gpu.T.BufferGeometry=T.BufferGeometry;gpu.T.Float32BufferAttribute=T.Float32BufferAttribute;
 const book=create(host,{width:1.84,height:2.42836,depth:.254947,pose:{pitch:28.65,yaw:0,roll:0}},{loadThree:()=>gpu.T});await new Promise(r=>setImmediate(r));
 for(const model of gpu.meshes){const geometry=model.geometry,p=geometry.attributes.position.array,index=geometry.index.array,edges=new Map(),key=i=>[p[i*3],p[i*3+1],p[i*3+2]].map(v=>Math.round(v*1e6)).join(',');for(let i=0;i<index.length;i+=3){const ids=[key(index[i]),key(index[i+1]),key(index[i+2])];assert.equal(new Set(ids).size,3);for(let j=0;j<3;j++){const edge=[ids[j],ids[(j+1)%3]].sort().join('|');edges.set(edge,(edges.get(edge)||0)+1);}}assert.ok([...edges.values()].every(count=>count===2),'cap and bevel must share the same deformed boundary');}
 const group=new T.Group(),material=new T.MeshBasicMaterial({side:T.FrontSide});for(const model of gpu.meshes){const mesh=new T.Mesh(model.geometry,material);mesh.position.set(model.position.x||0,model.position.y||0,model.position.z||0);group.add(mesh);}group.rotation.set(-28.65*Math.PI/180,0,0,'ZXY');group.updateMatrixWorld(true);
 const ray=new T.Raycaster(),direction=new T.Vector3(0,0,-1);for(const x of [-.86,-.85,-.84,-.83,-.82,-.81,-.80])for(const y of [-1.103,-1.102,-1.1017,-1.101,-1.100,-1.099]){ray.set(new T.Vector3(x,y,10),direction);assert.ok(ray.intersectObject(group,true).length>0,`empty oblique channel ray at ${x},${y}`);}material.dispose();book.dispose();
});
