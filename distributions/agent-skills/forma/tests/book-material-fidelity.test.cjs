const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const crypto=require('node:crypto');

// Probe the same functions used by create(), without adding a production debug API.
const source=fs.readFileSync(path.join(__dirname,'../assets/book-object.js'),'utf8');
const exportsAt='return {create,normalize,fitDistance,frameFor,lightCompensation,linesFor,paintCover,';
assert.ok(source.includes(exportsAt),'book module export boundary is available');
const context={module:{exports:{}}};
vm.runInNewContext(source.replace(exportsAt,'return {__materialTest:{stampShader,paintBaseTile},create,normalize,fitDistance,frameFor,lightCompensation,linesFor,paintCover,'),context);
const {stampShader,paintBaseTile}=context.module.exports.__materialTest;
function pixels(material,kind){
 const canvas={getContext:()=>({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData:image=>{canvas.pixels=image.data}})};
 paintBaseTile(canvas,material,kind);return canvas;
}
function compiledShader(){
 const material={},shader={uniforms:{},fragmentShader:'#include <specularmap_fragment>\n#include <normal_fragment_maps>'};
 stampShader(material,{},1);material.onBeforeCompile(shader);return shader.fragmentShader;
}
const fragment=compiledShader();
const mix=(a,b,t)=>a*(1-t)+b*t,step=(edge,value)=>value<edge?0:1,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

test('pigment overlay keeps the grain as the base across dark and light channels',()=>{
 const expression=fragment.match(/diffuseColor\.rgb = ([^\n]+);/)[1].replaceAll('diffuseColor.rgb','color');
 const actual=new Function('color','bookNoise','mix','step','vec3',`return ${expression}`);
 // Numeric examples are independent of expression spelling and cover both branches.
 for(const [color,grain,expected] of [[.22,.52,.2512],[.22,.48,.2112],[.8,.48,.768],[.8,.52,.808],[.3,.5,.3]])
  assert.ok(Math.abs(actual(color,grain,mix,step,x=>x)-expected)<1e-12,`color=${color}, grain=${grain}`);
});

test('cloth tension is smooth and deterministic at measured reference sample points',()=>{
 const a=pixels('cloth','height'),b=pixels('cloth','height');
 assert.deepEqual(a.pixels,b.pixels);assert.equal(a.width,256);assert.equal(a.height,256);
 // Read-only reference measurements, not a second copy of its noise implementation.
 for(const [x,y,value] of [[0,0,28],[0,4,90],[0,12,88],[4,4,189],[37,89,144],[127,41,90],[64,64,28],[255,255,89]])
  assert.equal(a.pixels[(y*256+x)*4],value,`thread height at ${x},${y}`);
 assert.notEqual(a.pixels[(4*256)*4],a.pixels[(12*256)*4],'tension must not be constant in a 16px row block');
});

test('pigment noise remains low-amplitude, smooth and registered on paper as well as cloth',()=>{
 const cloth=pixels('cloth','grain'),paper=pixels('paper','grain');
 assert.deepEqual(cloth.pixels,paper.pixels);
 for(const [x,y,value] of [[0,0,127],[37,89,130],[127,41,126],[64,64,132],[128,192,128],[200,200,133],[255,255,127]])
  assert.equal(cloth.pixels[(y*256+x)*4],value,`pigment at ${x},${y}`);
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){
  const here=cloth.pixels[(y*256+x)*4],next=cloth.pixels[(y*256+(x+1)%256)*4];
  assert.ok(here>=120&&here<=135,'grain cannot become high-contrast paper stripes');
  assert.ok(Math.abs(here-next)<=1,'pigment remains smooth including the tile seam');
 }
});

test('foil coordinates preserve original canvas corners with CanvasTexture flipY',()=>{
 const expression=fragment.match(/vec2 bookReflectionUV = ([^\n]+);/)[1];
 const evaluate=new Function('bookPhase','vec2','sin','cos',`return ${expression}`);
 for(const [sin,cos] of [[-1,-1],[-1,1],[1,-1],[1,1],[0,0]]){
  const phase={x:0,y:0},u=evaluate(phase,(a,b)=>a,()=>sin,()=>cos),v=evaluate(phase,(a,b)=>b,()=>sin,()=>cos);
  // Atlas UV -> canvas pixel -> standalone field UV; both textures use flipY=true.
  const atlasU=.07+.07*sin,atlasV=.905-.095*cos;
  assert.ok(Math.abs(u-atlasU/.144)<1e-12,'horizontal crop');
  assert.ok(Math.abs(v-(1-(1-atlasV)/.197))<1e-12,'vertical canvas orientation and crop');
 }
});

test('foil coverage preserves antialiased intermediate values and an unstamped black mask',()=>{
 const expression=fragment.match(/float bookStamp = ([^\n]+);/)[1];
 const actual=new Function('specularStrength','clamp',`return ${expression}`);
 for(const coverage of [0,.1,.25,.5,.75,1])assert.ok(Math.abs(actual(coverage,clamp)-coverage)<1e-12);
 const fills=[],noop=()=>{},g=new Proxy({measureText:()=>({width:4}),fillRect(){fills.push(this.fillStyle)}},{get:(o,k)=>k in o?o[k]:noop,set:(o,k,v)=>(o[k]=v,true)});
 context.module.exports.paintCover({getContext:()=>g},{brand:'P',finish:'ink'},'metalness');
 assert.equal(fills[0],'#000000','no foil mask coverage on the unstamped cover');
});

test('paper and leather retain their distinct deterministic height treatments',()=>{
 const digest=material=>crypto.createHash('sha256').update(pixels(material,'height').pixels).digest('hex');
 // Original bytes before the cloth fix; this catches accidental replacement of those materials.
 assert.equal(digest('paper'),'715c86d5315ec920e55d27e15c4ed9fee448d84489a964e8aa008bb6d8775791');
 assert.equal(digest('leather'),'5a3dc507dcd73d76b61e733677d81ea92a4f81e2df31bb0c2425b7d5e3e90de7');
});
