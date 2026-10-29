/* Original reusable book object. Three.js is optional and supplied by the host. */
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BookObject=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const PATTERNS=Object.freeze(['panels','grid','rules','dots','stems','checks']);
const MATERIALS=Object.freeze(['cloth','paper','leather']),FINISHES=Object.freeze(['ink','foil']);
const DEFAULTS=Object.freeze({title:'Untitled',subtitle:'',brand:'',brandMark:'text',spineLabel:'',color:'#3d4934',inkColor:'#fbfbfc',pagesColor:'#f6f1e5',pattern:'panels',material:'cloth',finish:'foil',width:1.84,height:2.53,depth:.36,pose:Object.freeze({pitch:9,yaw:-18,roll:-2})});
const FONT='"Inter Variable",Inter,system-ui,sans-serif';
function finite(value,fallback,min,max){return typeof value==='number'&&Number.isFinite(value)?Math.max(min,Math.min(max,value)):fallback;}
function color(value,fallback){return typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value)?value.toLowerCase():fallback;}
function text(value,fallback,max){return typeof value==='string'?value.slice(0,max):fallback;}
function normalize(input={},base=DEFAULTS){
 if(!input||typeof input!=='object')input={};const pose=input.pose&&typeof input.pose==='object'?input.pose:{};
 const palette=input.palette===null?null:input.palette||base.palette,baseColor=color(input.color,base.color);
 return {title:text(input.title,base.title,240),subtitle:text(input.subtitle,base.subtitle,120),brand:text(input.brand,base.brand,40),brandMark:['text','monogram'].includes(input.brandMark)?input.brandMark:(base.brandMark||'text'),spineLabel:text(input.spineLabel,base.spineLabel||'',12),color:baseColor,palette:palette?{deep:color(palette.deep,baseColor),lit:color(palette.lit,baseColor),edge:color(palette.edge,baseColor)}:null,inkColor:color(input.inkColor,base.inkColor),pagesColor:color(input.pagesColor,base.pagesColor),pattern:PATTERNS.includes(input.pattern)?input.pattern:base.pattern,material:MATERIALS.includes(input.material)?input.material:(base.material||DEFAULTS.material),finish:FINISHES.includes(input.finish)?input.finish:(base.finish||DEFAULTS.finish),width:finite(input.width,base.width,.6,4),height:finite(input.height,base.height,.6,5),depth:finite(input.depth,base.depth,.08,.9),pose:{pitch:finite(pose.pitch,base.pose.pitch,-60,60),yaw:finite(pose.yaw,base.pose.yaw,-180,180),roll:finite(pose.roll,base.pose.roll,-18,18)}};
}
// A bounding sphere fits every supported rotation; horizontal FOV matters in narrow hosts.
function fitDistance(config,aspect,fov=34){const c=normalize(config),a=finite(aspect,1,.01,100),v=finite(fov,34,10,90)*Math.PI/180,h=2*Math.atan(Math.tan(v/2)*a),radius=Math.hypot(c.width,c.height,c.depth)/2;return radius/Math.sin(Math.min(v,h)/2)*1.08;}
// Camera bounds come from projected corners over the drag envelope, not a sphere.
function frameFor(config){const c=normalize(config),distance=c.width*17.1;let width=0,height=0;const rad=n=>n*Math.PI/180;
 for(let yaw=0;yaw<360;yaw+=15)for(const pitch of [c.pose.pitch-24,c.pose.pitch,c.pose.pitch+24])for(const sx of [-1,1])for(const sy of [-1,1])for(const sz of [-1,1]){
  let x=sx*c.width/2,y=sy*c.height/2,z=sz*c.depth/2;const ay=rad(yaw),ax=rad(-pitch),az=rad(-c.pose.roll);
  [x,z]=[x*Math.cos(ay)+z*Math.sin(ay),-x*Math.sin(ay)+z*Math.cos(ay)];[y,z]=[y*Math.cos(ax)-z*Math.sin(ax),y*Math.sin(ax)+z*Math.cos(ax)];[x,y]=[x*Math.cos(az)-y*Math.sin(az),x*Math.sin(az)+y*Math.cos(az)];
  const perspective=distance/(distance-z);width=Math.max(width,Math.abs(x*perspective)*2);height=Math.max(height,Math.abs(y*perspective)*2);
 }return {width:Math.max(c.width,width*1.03),height:Math.max(c.height,height*1.03),distance};}
function lightCompensation(pose){const pitch=pose.pitch*Math.PI/180,yaw=pose.yaw*Math.PI/180,n=[Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)],dot=direction=>Math.max(0,n.reduce((sum,v,i)=>sum+v*direction[i],0)/Math.hypot(...direction));return Math.max(.62,Math.min(1.5,.7/Math.max(.2,.54+.9*dot([7,0,4.5])+.4*dot([-32,12,-16]))));}
// Original shader extension on public Phong chunks. The shared tiles are sampled
// in a face's atlas region; Texture.repeat alone is not consumed by custom GLSL.
const FACE_UV=Object.freeze({front:[.5468,.0213,.4346,.7545],back:[.0186,.0218,.4346,.7544],spine:[.4578,.0306,.0834,.7364],paper:[0,.7815,1,.2185]});
function stampShader(material,maps,scale,region=FACE_UV.front){material.onBeforeCompile=shader=>{
 Object.assign(shader.uniforms,{bookWeave:{value:maps.weave},bookGrain:{value:maps.grain},bookReflection:{value:maps.foil},bookRegion:{value:region},bookThreadDepth:{value:.006*scale},bookUnitScale:{value:scale}});
 shader.fragmentShader='uniform sampler2D bookWeave;\nuniform sampler2D bookGrain;\nuniform sampler2D bookReflection;\nuniform vec4 bookRegion;\nuniform float bookThreadDepth;\nuniform float bookUnitScale;\n'+shader.fragmentShader;
 shader.fragmentShader=shader.fragmentShader.replace('#include <specularmap_fragment>','#include <specularmap_fragment>\nfloat bookStamp = clamp(specularStrength, 0.0, 1.0);\nspecularStrength = 0.04 + bookStamp * 1.72;');
 shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`vec2 bookUV = vBumpMapUv;
vec2 bookBaseUV = bookRegion.xy + bookUV * bookRegion.zw;
vec2 bookDX = dFdx(bookUV), bookDY = dFdy(bookUV);
vec2 bookBaseDX = dFdx(bookBaseUV), bookBaseDY = dFdy(bookBaseUV);
vec3 bookThread = vec3(texture2D(bookWeave, bookBaseUV).r, texture2D(bookWeave, bookBaseUV + bookBaseDX).r, texture2D(bookWeave, bookBaseUV + bookBaseDY).r);
vec3 bookPress = vec3(texture2D(bumpMap, bookUV).r, texture2D(bumpMap, bookUV + bookDX).r, texture2D(bumpMap, bookUV + bookDY).r);
bookThread = vec3(0.5) + (bookThread - vec3(0.5)) * (bookThreadDepth / max(bumpScale, 0.00001)) * (1.0 - bookStamp * 0.6);
vec3 bookHeight = mix(2.0 * bookThread * bookPress, vec3(1.0) - 2.0 * (vec3(1.0) - bookThread) * (vec3(1.0) - bookPress), step(vec3(0.5), bookThread));
// Stock Phong normalizes both position derivatives. Restore their physical
// pixel lengths in the height gradient so object scale/DPR do not erase relief.
vec2 bookPixelSpan = vec2(length(dFdx(vViewPosition)), length(dFdy(vViewPosition)));
vec2 bookSlope = (bookHeight.yz - bookHeight.xx) * bumpScale / max(bookPixelSpan, vec2(0.000001));
normal = perturbNormalArb(-vViewPosition, normal, bookSlope, faceDirection);
float bookNoise = texture2D(bookGrain, bookBaseUV).r;
diffuseColor.rgb = mix(2.0 * diffuseColor.rgb * bookNoise, vec3(1.0) - 2.0 * (vec3(1.0) - diffuseColor.rgb) * (1.0 - bookNoise), step(vec3(0.5), vec3(bookNoise)));
vec2 bookPhysicalSight = vViewPosition.yx / max(bookUnitScale, 0.00001);
vec2 bookPhase = bookPhysicalSight * 0.22 - normal.yx * 2.2;
// The atlas field occupies 0.144 by 0.197, sampled top-to-bottom over 0.14 by 0.19.
// CanvasTexture flips Y, so the standalone texture retains that negative V direction.
vec2 bookReflectionUV = vec2((0.5 + 0.5 * sin(bookPhase.x)) * (0.14 / 0.144), 1.0 - (0.5 + 0.5 * cos(bookPhase.y)) * (0.19 / 0.197));
vec3 bookGold = texture2D(bookReflection, bookReflectionUV).rgb;
diffuseColor.rgb = mix(diffuseColor.rgb, bookGold, bookStamp * 0.6);`);
 };material.customProgramCacheKey=()=> 'book-original-cloth-stamp-5';}
// Average only coincident vertices: the cap and bevel retain independent UVs,
// while their shared physical seam has one lighting normal.
function seamNormals(geometry){geometry.computeVertexNormals();const p=geometry.attributes.position.array,n=geometry.attributes.normal?.array;if(!n)return;const shared=new Map();for(let i=0;i<p.length;i+=3){const key=[p[i],p[i+1],p[i+2]].map(v=>Math.round(v*1e6)).join(','),entry=shared.get(key)||{sum:[0,0,0],indices:[]};entry.indices.push(i);for(let j=0;j<3;j++)entry.sum[j]+=n[i+j];shared.set(key,entry);}for(const {sum,indices} of shared.values()){const length=Math.hypot(...sum)||1;for(const i of indices)for(let j=0;j<3;j++)n[i+j]=sum[j]/length;}}
function roundedProfile(width,height,radius,segments=8,leftRadius=radius){const points=[];for(let corner=0;corner<4;corner++){const r=Math.min(corner===1||corner===2?leftRadius:radius,width/2,height/2),cx=(corner===0||corner===3?1:-1)*(width/2-r),cy=(corner<2?1:-1)*(height/2-r);for(let step=0;step<=segments;step++){const a=(corner*90+step/segments*90)*Math.PI/180;points.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);}}return points;}
// Original procedural mesh. No reference vertex or index arrays are used.
function panelGeometry(T,width,height,depth,radius,{deform,depthSegments=1,flipX=false,leftRadius=radius}={}){const outline=roundedProfile(width,height,radius,16,leftRadius),positions=[],uv=[],indices=[],bevel=Math.min(depth*.22,radius*.18);
 const add=(x,y,z)=>{positions.push(...(deform?deform(x,y,z):[x,y,z]));uv.push((flipX?-x:x)/width+.5,y/height+.5);};
 // Vertical strips supply real vertices across the binding channel. A single
 // triangle fan cannot bend a narrow channel inside an otherwise flat cover.
 const scaleX=1-bevel/width*2,scaleY=1-bevel/height*2,rows=[-1,-.995,-.985,-.96,-.9,-.75,-.5,0,.5,.75,.9,.96,.985,.995,1];
 const regular=deform?32:64,channel=deform?Array.from({length:49},(_,i)=>-width/2+width*.1*i/48):[];
 const xs=[...new Set([...outline.map(p=>p[0]),...Array.from({length:regular+1},(_,i)=>-width/2+width*i/regular),...channel].map(x=>Math.round(x/width*1e12)*width/1e12))].sort((a,b)=>a-b);
 const limitAt=x=>{const r=x<0?leftRadius:radius,dx=Math.max(0,Math.abs(x)-(width/2-r));return height/2-r+Math.sqrt(Math.max(0,r*r-dx*dx));};
 // Use exactly the cap's boundary, including the binding-channel samples.
 // A coarse bevel ring spans the depressed channel with a straight chord,
 // opening a visible window even when the neighboring binding is closed.
 const right=xs.at(-1),left=xs[0],ring=[...xs.map(x=>[x,-limitAt(x)]),...rows.slice(1,-1).map(t=>[right,t*limitAt(right)]),...xs.slice().reverse().map(x=>[x,limitAt(x)]),...rows.slice(1,-1).reverse().map(t=>[left,t*limitAt(left)])],n=ring.length;
 for(const sign of [-1,1]){const start=positions.length/3;for(const x of xs){const limit=limitAt(x);for(const row of rows)add(x*scaleX,row*limit*scaleY,sign*depth/2);}for(let j=0;j<xs.length-1;j++)for(let row=0;row<rows.length-1;row++){const a=start+j*rows.length+row,b=a+rows.length,c=b+1,d=a+1;if(sign===1)indices.push(a,b,d,b,c,d);else indices.push(a,d,b,b,d,c);}}const capCount=indices.length;
 const start=positions.length/3,rounds=deform?4:1,layers=[];
 // A short roundover supplies changing normals at the rim, without bending
 // the entire cap or spreading a highlight into the flat printed surface.
 for(let i=0;i<=rounds;i++){const a=i/rounds*Math.PI/2;layers.push([-depth/2+bevel*(1-Math.cos(a)),bevel*(1-Math.sin(a))]);}
 for(let i=1;i<=depthSegments;i++)layers.push([-depth/2+bevel+(depth-2*bevel)*i/depthSegments,0]);
 for(let i=rounds-1;i>=0;i--){const a=i/rounds*Math.PI/2;layers.push([depth/2-bevel*(1-Math.cos(a)),bevel*(1-Math.sin(a))]);}
 for(const [z,inset] of layers)ring.forEach(([x,y])=>add(x*(1-inset/width*2),y*(1-inset/height*2),z));
 for(let layer=0;layer<layers.length-1;layer++)for(let j=0;j<n;j++){const k=(j+1)%n,a=start+layer*n+j,b=start+layer*n+k,c=start+(layer+1)*n+k,d=start+(layer+1)*n+j;indices.push(a,b,d,b,c,d);}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.addGroup(0,capCount,0);geometry.addGroup(capCount,indices.length-capCount,1);seamNormals(geometry);return geometry;
}
// The paper cuts extend through thickness. A single XY projection collapses
// their UVs to a line and turns the cloth bump into exaggerated repeated stripes.
// Split only island seams; retain the procedural positions and smooth normals.
function paperUV(T,geometry,width,height,depth){
 const p=geometry.attributes.position.array,n=geometry.attributes.normal?.array,index=geometry.index.array||geometry.index,positions=[],normals=[],uv=[],indices=[],vertices=new Map(),region=FACE_UV.paper;
 for(let i=0;i<index.length;i+=3){
  const ids=[index[i],index[i+1],index[i+2]],a=ids[0]*3,b=ids[1]*3,c=ids[2]*3,ab=[p[b]-p[a],p[b+1]-p[a+1],p[b+2]-p[a+2]],ac=[p[c]-p[a],p[c+1]-p[a+1],p[c+2]-p[a+2]],cross=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
  const axis=Math.abs(cross[0])>Math.abs(cross[1])?(Math.abs(cross[0])>Math.abs(cross[2])?0:2):(Math.abs(cross[1])>Math.abs(cross[2])?1:2),positive=cross[axis]>=0,island=axis*2+Number(positive);
  for(const source of ids){const key=source+':'+island;let target=vertices.get(key);
   if(target===undefined){
    const offset=source*3,x=p[offset],y=p[offset+1],z=p[offset+2],tx=x/width+.5,ty=y/height+.5,tz=z/depth+.5;let u,v;
    if(axis===1){u=positive?.57282+.42396*tx:.14605+.42395*tx;v=positive?.99794-.09775*tz:.90030+.09775*tz;}
    else if(axis===0){u=.36488+.63317*(positive?ty:1-ty);v=.79973+.09775*tz;}
    else{u=positive?tx:1-tx;v=region[1]+region[3]*ty;}
    target=positions.length/3;vertices.set(key,target);positions.push(x,y,z);if(n)normals.push(n[offset],n[offset+1],n[offset+2]);uv.push((u-region[0])/region[2],(v-region[1])/region[3]);
   }indices.push(target);
  }
 }
 geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));if(n)geometry.setAttribute('normal',new T.Float32BufferAttribute(normals,3));geometry.setIndex(indices);return geometry;
}
function spineGeometry(T,width,height,depth,cover){
 // One sampled boundary closes the sweep and both bridges. A centre fan
 // interpolates across the crown and flattens its rise beside the shoulder.
 const positions=[],uv=[],indices=[],rx=width*.012,rz=Math.min(width*.01,depth*.16),outer=depth/2-Math.min(width*.0026,depth*.04),flat=outer-rz,left=-width/2,inner=left+width*.026,pageHalf=Math.max(.001,depth/2-cover);
 const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
 const halfHeight=x=>{const t=(x-left)/width,drop=t<=.012?.001+.0137*Math.pow(1-t/.012,2):.001+.0185*smooth((t-.015)/.010);return height/2-width*drop;};
 const limitAt=x=>{const t=x-left;return t<=rx?flat+rz*Math.sqrt(Math.max(0,1-Math.pow((t-rx)/rx,2))):outer+(pageHalf-outer)*(t-rx)/(inner-left-rx);};
 const xs=[...new Set([...Array.from({length:27},(_,i)=>left+width*i/1000),...Array.from({length:17},(_,i)=>left+rx*(1-Math.cos(i/16*Math.PI/2)))].map(x=>Math.round(x/width*1e12)*width/1e12))].sort((a,b)=>a-b),rows=Array.from({length:5},(_,i)=>-1+i/2);
 const ring=[...xs.map(x=>[x,-limitAt(x)]),...rows.slice(1,-1).map(t=>[inner,t*pageHalf]),...xs.slice().reverse().map(x=>[x,limitAt(x)]),...rows.slice(1,-1).reverse().map(t=>[left,t*flat])];
 const arc=[];let arcLength=0;for(let i=0;i<=32;i++){const a=i/32*Math.PI/2,x=rx*(1-Math.cos(a)),z=rz*Math.sin(a);if(i)arcLength+=Math.hypot(x-arc[i-1].x,z-arc[i-1].z);arc.push({x,z,length:arcLength});}
 const arcAt=x=>{const t=Math.max(0,Math.min(rx,x-left));for(let i=1;i<arc.length;i++)if(t<=arc[i].x){const a=arc[i-1],b=arc[i];return a.length+(b.length-a.length)*(t-a.x)/(b.x-a.x);}return arcLength;},visible=2*arcLength+2*flat;
 const uAt=(x,z)=>x>left+rx?z>0?1:0:x>left+width*1e-9?z>0?(arcLength+2*flat+arcAt(x))/visible:(arcLength-arcAt(x))/visible:(arcLength+z+flat)/visible;
 const add=(x,y,z,v)=>{positions.push(x,y,z);uv.push(uAt(x,z),v);};
 for(const sign of [-1,1]){const start=positions.length/3;for(const x of xs)for(const row of rows)add(x,sign*halfHeight(x),row*limitAt(x),(sign+1)/2);for(let j=0;j<xs.length-1;j++)for(let r=0;r<rows.length-1;r++){const a=start+j*rows.length+r,b=a+rows.length,c=b+1,d=a+1;if(sign===1)indices.push(a,d,b,b,d,c);else indices.push(a,b,d,b,c,d);}}
 const start=positions.length/3;for(const [x,z] of ring){add(x,-halfHeight(x),z,0);add(x,halfHeight(x),z,1);}for(let j=0;j<ring.length;j++){const a=start+j*2,b=start+(j+1)%ring.length*2;indices.push(a,a+1,b,a+1,b+1,b);}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setIndex(indices);seamNormals(geometry);return geometry;
}
function linesFor(value,measure,maxWidth,maxLines){
 const chars=Array.from(value);const lines=[];let line='';
 for(let i=0;i<chars.length;i++){
  const next=line+chars[i];
  if(line&&measure(next)>maxWidth){lines.push(line.trim());line=chars[i];if(lines.length===maxLines){let last=lines[maxLines-1];while(last&&measure(last+'\u2026')>maxWidth)last=last.slice(0,-1);lines[maxLines-1]=last+'\u2026';return lines;}}
  else line=next;
 }
 if(line||!lines.length)lines.push(line.trim());return lines.slice(0,maxLines);
}
function paintMark(g,c,x,y,width,channel='color'){
 const mask=channel==='metalness',height=channel==='height';
 let ink=mask?(c.finish==='foil'?'#ffffff':'#000000'):height?'#5f5f5f':c.inkColor;
 if(channel==='color'&&c.finish==='foil'){ink='#e8cf92';}
 g.save();g.fillStyle=ink;g.textAlign='center';g.textBaseline='middle';
 if(c.brandMark==='monogram'){g.font=`650 ${width}px ${FONT}`;g.fillText(Array.from(c.brand)[0]||'',x+width/2,y+width*.47,width);}
 else{g.font=`600 ${width*.45}px ${FONT}`;g.fillText(c.brand,x+width/2,y+width*.3,width*1.8);}
 g.restore();
}
function paintCover(canvas,config,channel='color',side='front',nominalWidth=248){
 const c=normalize(config);if(channel==='weave'){paintBaseTile(canvas,c.material,'height');return;}const g=canvas.getContext('2d');if(!g)return;
 const channelScale=channel==='height'?.5:channel==='metalness'?.25:1,frontPixels=Math.min(1400,Math.round(nominalWidth*4.5))*.4346,scale=frontPixels/c.width*channelScale,w=Math.max(1,Math.round(c.width*scale)),h=Math.max(1,Math.round(c.height*scale));canvas.width=w;canvas.height=h;
 const unit=w,inset=w*.105,top=w*.105+w*.075*(c.brandMark==='monogram'?1:.6)+h*.085,height=channel==='height',metal=channel==='metalness',rough=channel==='roughness',surface=channel==='color';
 const titleSize=w*.078;g.font=`500 ${titleSize}px ${FONT}`;const lines=linesFor(c.title,s=>g.measureText(s).width,w-inset*2,3),titleY=h-w*.105-(lines.length-1)*titleSize*1.22,ruleY=titleY-titleSize*1.75,bottom=ruleY-h*.095;
 g.fillStyle=metal?'#000000':height?'#808080':rough?({cloth:'#e8e8e8',paper:'#f5f5f5',leather:'#b0b0b0'}[c.material]):c.color;g.fillRect(0,0,w,h);
 if(side==='back'){paintMark(g,c,w*.435,h/2-w*.065,w*.13,channel);return;}
 g.strokeStyle=height?'#363636':surface?'#0000000c':metal?'#000000':g.fillStyle;g.fillStyle=g.strokeStyle;g.lineWidth=Math.max(2,w*.008);const patternWidth=w-inset*2,patternHeight=Math.max(0,bottom-top),drawPattern=patternHeight>h*.1;
 if(drawPattern&&c.pattern==='grid'){const columns=Math.max(2,Math.round(patternWidth/(w*.082))),rows=Math.max(2,Math.round(patternHeight/(w*.082*.82)));g.beginPath();for(let i=0;i<=columns;i++){const x=inset+patternWidth*i/columns;g.moveTo(x,top);g.lineTo(x,bottom);}for(let i=0;i<=rows;i++){const y=top+patternHeight*i/rows;g.moveTo(inset,y);g.lineTo(w-inset,y);}g.stroke();}
 if(drawPattern&&c.pattern==='panels'){const inner=w-inset*2;g.fillStyle=height?'#5f5f5f':surface?'#0000000c':g.strokeStyle;for(const [x,span] of [[0,.11435],[.20428,.08994],[.38395,.61605]]){g.beginPath();g.roundRect(inset+x*inner,top,span*inner,Math.max(10,bottom-top),unit*.01525);g.fill();}}
 if(drawPattern&&c.pattern==='rules'){const rows=Math.max(3,Math.round(patternHeight/(w*.062)));g.beginPath();for(let i=0;i<=rows;i++){const y=top+patternHeight*i/rows;g.moveTo(inset,y);g.lineTo(w-inset,y);}g.stroke();}
 if(drawPattern&&c.pattern==='dots'){const columns=Math.max(2,Math.round(patternWidth/(w*.052))),rows=Math.max(2,Math.round(patternHeight/(w*.052))),radius=Math.max(.75,w*.0075);for(let i=0;i<=columns;i++)for(let j=0;j<=rows;j++){g.beginPath();g.arc(inset+patternWidth*i/columns,top+patternHeight*j/rows,radius,0,Math.PI*2);g.fill();}}
 if(drawPattern&&c.pattern==='stems'){const columns=Math.max(4,Math.round(patternWidth/(w*.068))),wide=Math.max(3,Math.round(w*.024)),thin=Math.max(2,Math.round(w*.008));for(let i=0;i<columns;i++){const progress=i/(columns-1),x=inset+(patternWidth-wide)*progress;g.fillRect(x+(wide-thin)/2,top,thin,patternHeight);g.fillRect(x,top,wide,patternHeight*.42*progress);const foot=patternHeight*(.5-.46*progress);g.fillRect(x,bottom-foot,wide,foot);}}
 if(drawPattern&&c.pattern==='checks'){const columns=Math.max(2,Math.round(patternWidth/(w*.055))),rows=Math.max(2,Math.round(patternHeight/(w*.055)));for(let i=0;i<columns;i++)for(let j=0;j<rows;j++){if((i+j)%2===0)g.fillRect(inset+patternWidth*i/columns,top+patternHeight*j/rows,Math.ceil(patternWidth/columns),Math.ceil(patternHeight/rows));}}
 paintMark(g,c,w-inset-w*.075,w*.105,w*.075,channel);
 const ink=height?'#5f5f5f':metal?'#000000':rough?'#d0d0d0':c.inkColor;g.strokeStyle=surface?'#ffffff73':ink;g.lineWidth=Math.max(1,w*.0032);g.beginPath();g.moveTo(inset,ruleY);g.lineTo(w-inset,ruleY);g.stroke();
 g.fillStyle=ink;g.textAlign='right';g.globalAlpha=surface?.62:1;g.font=`500 ${titleSize*.34}px ${FONT}`;g.fillText(c.subtitle,w-inset,ruleY-titleSize*.34*.55,w-inset*2);g.globalAlpha=1;g.textAlign='left';g.font=`500 ${titleSize}px ${FONT}`;lines.forEach((line,i)=>g.fillText(line,inset,titleY+i*titleSize*1.22));
}
// Small original procedural tiles keep pigment noise separate from thread height.
// Deterministic periodic value noise; normalized coordinates keep seams continuous.
function periodicNoise(cells,initialSeed){
 const values=new Float32Array(cells*cells);let state=initialSeed>>>0;
 for(let i=0;i<values.length;i++){state^=state<<13;state^=state>>>17;state^=state<<5;state>>>=0;values[i]=state/4294967296;}
 const smooth=t=>t*t*(3-2*t),sample=(x,y)=>values[((y%cells+cells)%cells)*cells+(x%cells+cells)%cells];
 return (u,v)=>{const x=u*cells,y=v*cells,ix=Math.floor(x),iy=Math.floor(y),tx=smooth(x-ix),ty=smooth(y-iy),top=sample(ix,iy)*(1-tx)+sample(ix+1,iy)*tx,bottom=sample(ix,iy+1)*(1-tx)+sample(ix+1,iy+1)*tx;return top*(1-ty)+bottom*ty;};
}
function paintBaseTile(canvas,material,kind){canvas.width=canvas.height=256;const g=canvas.getContext('2d');if(!g)return;const image=g.createImageData?.(256,256);if(!image?.data)return;
 const field=kind==='grain'?periodicNoise(4,3266489909):material==='cloth'?periodicNoise(96,2654435769):null;
 let seed=19391;const random=()=>{seed=seed*16807%2147483647;return seed/2147483647;};
 // Preserve the established paper/leather height sequences when changing cloth.
 if(!field)for(let i=0;i<16;i++)random();
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){let value;
  if(kind==='grain')value=.5+(field(x/256,y/256)-.5)*.055;
  // The source tension samples one column of the smooth field, not independent X/Y tension.
  else if(material==='cloth'){const warp=Math.abs(Math.sin(x/8*Math.PI)),weft=Math.abs(Math.sin(y/8*Math.PI)),tension=.93+.14*field(0,y/256);value=(warp*.58*tension+weft*.42*(1.86-tension))*.9*190/255+28/255;}
  else value=.5+(random()-.5)*(material==='paper'?.12:.32);
  const offset=(y*256+x)*4,byte=Math.round(Math.max(0,Math.min(1,value))*255);image.data[offset]=image.data[offset+1]=image.data[offset+2]=byte;image.data[offset+3]=255;
 }g.putImageData(image,0,0);}
function paintReflection(canvas){canvas.width=192;canvas.height=200;const g=canvas.getContext('2d');if(!g)return;const gradient=g.createLinearGradient(0,200,192,0);for(const [stop,hex] of [[0,'#5b4118'],[.34,'#b08b45'],[.5,'#eedcab'],[.62,'#c29c52'],[.82,'#6b4f20'],[1,'#d4bb82']])gradient.addColorStop(stop,hex);g.fillStyle=gradient;g.fillRect(0,0,192,200);const light=g.createRadialGradient(192*.72,200*.3,0,192*.72,200*.3,192*.55);light.addColorStop(0,'rgba(250,238,205,.62)');light.addColorStop(1,'rgba(250,238,205,0)');g.fillStyle=light;g.fillRect(0,0,192,200);}
function paintPages(canvas,ink){canvas.width=2;canvas.height=2;const g=canvas.getContext('2d');if(!g)return;g.fillStyle=ink;g.fillRect(0,0,2,2);}
function paintSpine(canvas,c,channel='color',nominalWidth=248){
 const atlas=Math.min(1400,Math.round(nominalWidth*4.5)),factor=channel==='height'?.5:channel==='metalness'?.25:1;canvas.width=Math.max(1,Math.round(atlas*.0834*factor));canvas.height=Math.max(1,Math.round(atlas*(.0276/.0362)*.7364*factor));const g=canvas.getContext('2d');if(!g)return;
 const w=canvas.width,h=canvas.height,mask=channel==='metalness',height=channel==='height';g.fillStyle=mask?'#000000':height?'#808080':c.color;g.fillRect(0,0,w,h);
 const font=h*.032444,start=h*.052241,markWidth=w*.48,markHeight=markWidth*(c.brandMark==='monogram'?1:.6),markY=h-start-markHeight;
 if(channel==='color'){
  g.save();g.font=`500 ${font*.78}px ${FONT}`;const counterWidth=g.measureText(c.spineLabel).width;g.font=`500 ${font}px ${FONT}`;
  const reserved=c.spineLabel?counterWidth+font*1.8:0,available=Math.max(0,markY-start-font*1.5-reserved),title=available>0?linesFor(c.title,v=>g.measureText(v).width,available,1)[0]:'';
  const metrics=g.measureText(title),ascent=Number.isFinite(metrics.actualBoundingBoxAscent)?metrics.actualBoundingBoxAscent:font*.72,descent=Number.isFinite(metrics.actualBoundingBoxDescent)?metrics.actualBoundingBoxDescent:font*.21;
  const shoulderArc=Math.PI/2*(c.width*.012+Math.min(c.width*.01,c.depth*.16)),flatLength=c.depth-2*Math.min(c.width*.0026,c.depth*.04)-2*Math.min(c.width*.01,c.depth*.16),transverse=c.height*w/(h*(flatLength+shoulderArc));g.translate(w/2-(ascent-descent)*transverse/2,start);g.scale(transverse,1);g.rotate(Math.PI/2);g.textBaseline='alphabetic';g.textAlign='left';g.fillStyle=c.inkColor;g.fillText(title,0,0);
  const advance=g.measureText(title).width+font*1.8;g.font=`500 ${font*.78}px ${FONT}`;g.globalAlpha=.62;g.fillText(c.spineLabel,advance,0);g.restore();
 }
 paintMark(g,c,(w-markWidth)/2,markY,markWidth,channel);
}
function paintStatic(canvas,config,cover){const c=normalize(config),g=canvas.getContext('2d');if(!g)return;const w=cover.width,h=cover.height,edge=Math.max(5,w*c.depth/c.width*.22),radius=w*.025;canvas.width=Math.ceil(w+edge*1.5);canvas.height=Math.ceil(h+edge);
 g.fillStyle=c.pagesColor;g.beginPath();g.roundRect(edge*1.5,edge*.9,w-edge*.4,h-edge*.8,radius);g.fill();
 g.save();g.beginPath();g.roundRect(0,0,w,h,radius);g.clip();g.drawImage(cover,0,0);const spine=g.createLinearGradient(0,0,w*.11,0);spine.addColorStop(0,c.palette?.deep||'#00000045');spine.addColorStop(.2,c.palette?.lit||'#ffffff12');spine.addColorStop(.7,c.palette?.deep||'#00000032');spine.addColorStop(1,c.palette?.edge||'#00000000');g.fillStyle=spine;g.fillRect(0,0,w*.11,h);g.strokeStyle=c.palette?.deep||'#00000035';g.lineWidth=w*.006;g.beginPath();g.moveTo(w*.085,0);g.lineTo(w*.085,h);g.stroke();g.restore();g.strokeStyle='#ffffff24';g.lineWidth=1;g.beginPath();g.roundRect(.5,.5,w-1,h-1,radius);g.stroke();
}
function create(host,input={},options={}){
 if(!host?.ownerDocument)throw TypeError('BookObject requires a DOM host.');
 const doc=host.ownerDocument,view=doc.defaultView||globalThis;let config=normalize(input),disposed=false,generation=0,renderer=null,scene=null,group=null,camera=null,three=null,loadPromise=null,failed=false,pendingBuild=false,rasterWidth=0,frame=0,last=0,drag=null;
 const textures=new Set();let lights=[],inViewport=typeof view.IntersectionObserver!=='function';
 const interactive=options.interactive!==false,renderScale=finite(options.renderScale,2,1,2),resolution=options.resolution==='economy'?'economy':'reference',wrapper=doc.createElement('div'),fallback=doc.createElement('canvas'),coverCanvas=doc.createElement('canvas');
 wrapper.className='book-object';wrapper.style.cssText='position:relative;width:100%;height:100%;min-height:1px;';fallback.className='book-object-fallback';fallback.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;box-sizing:border-box;';fallback.setAttribute('aria-hidden','true');wrapper.append(fallback);host.append(wrapper);host.dataset.bookRenderer='canvas';
 const media=view.matchMedia?.('(prefers-reduced-motion: reduce)');const reduced=()=>doc.documentElement.dataset.motion==='reduced'||!!media?.matches;
 const staticMode=()=>doc.documentElement.dataset.materials==='static',visible=()=>inViewport&&!doc.hidden&&doc.visibilityState!=='hidden',canDraw=()=>!disposed&&!staticMode()&&visible()&&!!renderer;
 // Semantic pose: pitch is bow, yaw is turn, roll follows the visual card axes.
 const radians=p=>({x:-p.pitch*Math.PI/180,y:p.yaw*Math.PI/180,z:-p.roll*Math.PI/180});let target=radians(config.pose),rotation={...target},spin=0,lightingPose={...config.pose};
 function releaseScene(){if(group){const geometries=new Set(),materials=new Set();group.traverse(n=>{if(n.geometry)geometries.add(n.geometry);if(Array.isArray(n.material))n.material.forEach(m=>materials.add(m));else if(n.material)materials.add(n.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());scene?.remove(group);group=null;}textures.forEach(t=>t.dispose());textures.clear();}
 function releaseRenderer(){view.cancelAnimationFrame(frame);frame=0;releaseScene();if(renderer){const cv=renderer.domElement;cv.removeEventListener('webglcontextlost',lost);renderer.dispose();renderer.forceContextLoss?.();cv.remove();renderer=null;}scene=null;camera=null;lights=[];}
 function unavailable(){failed=true;releaseRenderer();fallback.style.visibility='visible';host.dataset.bookRenderer='canvas-unavailable';}
 function lost(ev){ev.preventDefault();failed=true;releaseRenderer();fallback.style.visibility='visible';host.dataset.bookRenderer='canvas-context-lost';}
 function draw(now=0){frame=0;if(!canDraw())return;const dt=Math.min(64,last?now-last:16);last=now;const a=reduced()?1:1-Math.exp(-dt/120);for(const axis of ['x','y','z'])rotation[axis]+=(target[axis]-rotation[axis])*a;const unsettled=Math.abs(target.x-rotation.x)>.014*Math.PI/180||Math.abs(target.y-rotation.y)>.05*Math.PI/180||Math.abs(target.z-rotation.z)>.05*Math.PI/180;if(!unsettled)rotation={...target};group.rotation.set(rotation.x,rotation.y,rotation.z,'ZXY');host.dataset.bookPose=[rotation.y,-rotation.x,-rotation.z].map(v=>(v*180/Math.PI).toFixed(2)).join(' ');try{renderer.render(scene,camera);}catch{unavailable();return;}fallback.style.visibility='hidden';host.dataset.bookRenderer='webgl';if(!reduced()&&unsettled)schedule();else last=0;}
 function schedule(){if(!frame&&canDraw())frame=view.requestAnimationFrame(draw);}
 function setPose(patch={},options={}){if(disposed)return;config=normalize({pose:patch},config);if(!options.preserveLighting)lightingPose={...config.pose};reset();size();}
 function syncLight(){const multiplier=lightCompensation(lightingPose);for(const [light,strength] of lights)light.intensity=strength*Math.PI*multiplier;}
 function reset(){drag=null;spin=0;host.classList.remove('is-dragging');target=radians(config.pose);if(reduced())rotation={...target};syncLight();schedule();}
 function down(ev){if(!interactive||reduced()||!canDraw()||ev.button!==0)return;const base=radians(config.pose);drag={x:ev.clientX,y:ev.clientY,spin:rotation.y-base.y,bow:rotation.x-base.x};wrapper.setPointerCapture?.(ev.pointerId);host.classList.add('is-dragging');}
 function move(ev){if(!interactive||reduced()||!canDraw())return;const b=wrapper.getBoundingClientRect(),p=radians(config.pose);if(!b.width||!b.height)return;if(drag){spin=drag.spin+(ev.clientX-drag.x)*.42*Math.PI/180;target.y=p.y+spin;target.x=p.x+Math.max(-24,Math.min(24,drag.bow*180/Math.PI+(ev.clientY-drag.y)/b.height*1.6*7))*Math.PI/180;}else if(ev.pointerType!=='touch'){target.y=p.y+((ev.clientX-b.left)/b.width-.5)*11*Math.PI/180+spin;target.x=p.x+((ev.clientY-b.top)/b.height-.5)*7*Math.PI/180;}schedule();}
 function leave(){if(!drag)reset();}
 function up(ev){if(!drag)return;drag=null;host.classList.remove('is-dragging');wrapper.releasePointerCapture?.(ev.pointerId);move(ev);}
 function size(){if(!canDraw())return;if(Math.abs(nominalWidth()-rasterWidth)>1){paintFallback();build();return;}const b=host.getBoundingClientRect(),bounds=frameFor(config),scale=Math.min(Math.max(1,b.width)/config.width,Math.max(1,b.height)/config.height),width=Math.max(1,bounds.width*scale),height=Math.max(1,bounds.height*scale);renderer.setPixelRatio(Math.min(renderScale*(resolution==='reference'?finite(view.devicePixelRatio,1,.25,2):1),2048/Math.max(width,height)));renderer.setSize(width,height,false);Object.assign(renderer.domElement.style,{inset:'auto',width:width+'px',height:height+'px',left:(b.width-width)/2+'px',top:(b.height-height)/2+'px'});camera.aspect=width/height;camera.position.z=bounds.distance;camera.fov=2*Math.atan(bounds.height/2/bounds.distance)*180/Math.PI;const radius=Math.hypot(config.width,config.height,config.depth);camera.near=Math.max(.01,bounds.distance-radius);camera.far=bounds.distance+radius;camera.updateProjectionMatrix();schedule();}
 function nominalWidth(){const b=host.getBoundingClientRect();return Math.max(1,Math.min(b.width,b.height*config.width/config.height));}
 function textureFor(channel,side='front'){
  const canvas=side==='front'&&channel==='color'?coverCanvas:doc.createElement('canvas');
  if(side==='spine')paintSpine(canvas,config,channel,nominalWidth());else if(canvas!==coverCanvas)paintCover(canvas,config,channel,side,nominalWidth());
  const t=new three.CanvasTexture(canvas);t.colorSpace=three.NoColorSpace;t.anisotropy=8;textures.add(t);return t;
 }
 function build(){pendingBuild=false;releaseScene();const T=three,c=config;group=new T.Group();scene.add(group);
  const unitScale=c.width/15.8778,tile=paint=>{const canvas=doc.createElement('canvas');paint(canvas);const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.NoColorSpace;texture.anisotropy=8;textures.add(texture);return texture;};
  const maps={weave:tile(canvas=>paintBaseTile(canvas,c.material,'height')),grain:tile(canvas=>paintBaseTile(canvas,c.material,'grain')),foil:tile(paintReflection)},neutral=tile(canvas=>paintPages(canvas,'#808080')),unstamped=tile(canvas=>paintPages(canvas,'#000000'));
  const stampedMaterial=side=>{const material=new T.MeshPhongMaterial({map:textureFor('color',side),shininess:8,specular:0xffffff,specularMap:textureFor('metalness',side),bumpMap:textureFor('height',side),bumpScale:.07*unitScale});stampShader(material,maps,unitScale,FACE_UV[side]);return material;};
  const face=stampedMaterial('front'),backFace=stampedMaterial('back'),spineMaterial=stampedMaterial('spine');
  const edge=new T.MeshPhongMaterial({color:c.color,shininess:8,specular:0xffffff,specularMap:unstamped,bumpMap:neutral,bumpScale:.07*unitScale});edge.color?.setStyle?.(c.color,T.LinearSRGBColorSpace);stampShader(edge,maps,unitScale);
  const pageMap=tile(canvas=>paintPages(canvas,c.pagesColor));
  const paper=new T.MeshPhongMaterial({map:pageMap,shininess:8,specular:0xffffff,specularMap:unstamped,bumpMap:neutral,bumpScale:.07*unitScale});stampShader(paper,maps,unitScale,FACE_UV.paper);
  const cover=Math.min(c.width*.01575,c.depth*.14),spineInset=c.width*.01,corner=c.width*.032;
  // The shoulder overlaps the board; the channel is an actual depression in
  // both cover surfaces. Separate dark bars left a visible gap at oblique angles.
  const boardWidth=c.width-spineInset,centerX=spineInset/2;
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  const hermite=(a,b,da,db,t,span)=>{const t2=t*t,t3=t2*t;return (2*t3-3*t2+1)*a+(t3-2*t2+t)*span*da+(-2*t3+3*t2)*b+(t3-t2)*span*db;};
  const deformCover=sign=>(x,y,z)=>{const offset=(x+centerX+c.width/2)/c.width;let dip;
   if(offset<=.016)dip=.002576;else if(offset<.047)dip=.002576+(.009091-.002576)*smooth((offset-.016)/.031);
   else if(offset<.062)dip=hermite(.009091,.005202,0,-.48,(offset-.047)/.015,.015);
   else if(offset<.078)dip=hermite(.005202,0,-.48,0,(offset-.062)/.016,.016);else dip=0;
   return [x,y,z-sign*Math.min(c.width*dip,c.depth*.12)];
  };
  const front=new T.Mesh(panelGeometry(T,boardWidth,c.height,cover,corner,{deform:deformCover(1),leftRadius:c.width*.0032}),[face,edge]);front.position.x=centerX;front.position.z=(c.depth-cover)/2;group.add(front);
  const back=new T.Mesh(panelGeometry(T,boardWidth,c.height,cover,corner,{deform:deformCover(-1),flipX:true,leftRadius:c.width*.0032}),[backFace,edge]);back.position.x=centerX;back.position.z=-(c.depth-cover)/2;group.add(back);
  const pageLeft=-c.width/2+c.width*.025,pageRight=c.width/2-c.width*.020204,pageWidth=pageRight-pageLeft,pageHeight=c.height-c.width*.039,pageDepth=c.depth-cover*2;
  const pages=new T.Mesh(paperUV(T,panelGeometry(T,pageWidth,pageHeight,pageDepth,c.width*.0015,{depthSegments:12}),pageWidth,pageHeight,pageDepth),paper);pages.position.x=(pageLeft+pageRight)/2;group.add(pages);
  group.add(new T.Mesh(spineGeometry(T,c.width,c.height,c.depth,cover),spineMaterial));size();
 }
 function paintFallback(){rasterWidth=nominalWidth();paintCover(coverCanvas,config,'color','front',rasterWidth);paintStatic(fallback,config,coverCanvas);}
 function update(patch={}){if(disposed)return;if(patch&&Object.keys(patch).length===1&&patch.pose){setPose(patch.pose);return;}config=normalize(patch,config);if(patch?.pose){lightingPose={...config.pose};reset();}paintFallback();if(renderer){if(canDraw())build();else pendingBuild=true;}}
 function initialize(){if(disposed||staticMode()||!visible()||failed||renderer||!three)return;const T=three;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setClearColor(0,0);renderer.toneMapping=T.NoToneMapping;renderer.outputColorSpace=T.LinearSRGBColorSpace;scene=new T.Scene();camera=new T.PerspectiveCamera(12,1,.01,100);const ambient=new T.AmbientLight(0xffffff,1),key=new T.DirectionalLight(0xffffff,1),rim=new T.DirectionalLight(0x6e665b,1);key.position.set(7,0,4.5);rim.color?.setHex?.(0x6e665b,T.LinearSRGBColorSpace);rim.position.set(-32,12,-16);scene.add(ambient,key,rim);lights=[[ambient,.54],[key,.9],[rim,1]];if(T.SpotLight){const scale=config.width/15.8778,spot=new T.SpotLight(0xcceecc,1);spot.color?.setHex?.(0xcceecc,T.LinearSRGBColorSpace);spot.position.set(24*scale,6.5*scale,scale);spot.target.position.set(-14.3*scale,0,-61*scale);spot.angle=.36;spot.penumbra=1;spot.decay=0;scene.add(spot,spot.target);lights.push([spot,.05]);}syncLight();const cv=renderer.domElement;cv.className='book-object-webgl';cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;';cv.setAttribute('aria-hidden','true');cv.addEventListener('webglcontextlost',lost);wrapper.append(cv);build();}catch{unavailable();}}
 function load(){if(disposed||staticMode()||!visible()||failed||renderer||typeof options.loadThree!=='function')return;if(three){initialize();return;}if(loadPromise)return;const token=++generation;loadPromise=Promise.resolve().then(()=>{if(disposed||token!==generation||staticMode()||!visible())return;return options.loadThree();}).then(T=>{loadPromise=null;if(disposed||token!==generation||!T)return;three=T;initialize();}).catch(()=>{loadPromise=null;if(!disposed&&!staticMode())unavailable();});}
 function visibilityChanged(){if(disposed)return;if(staticMode()){failed=false;releaseRenderer();fallback.style.visibility='visible';host.dataset.bookRenderer='canvas';}else if(visible()){load();if(renderer){if(pendingBuild)build();else size();}}else{view.cancelAnimationFrame(frame);frame=0;last=0;drag=null;host.classList.remove('is-dragging');}}
 const resize=typeof view.ResizeObserver==='function'?new view.ResizeObserver(size):null;resize?.observe(host);
 const motionChanged=()=>{reset();visibilityChanged();};const observer=typeof view.MutationObserver==='function'?new view.MutationObserver(motionChanged):null;observer?.observe(doc.documentElement,{attributes:true,attributeFilter:['data-motion','data-materials']});media?.addEventListener?.('change',motionChanged);
 const intersection=typeof view.IntersectionObserver==='function'?new view.IntersectionObserver(entries=>{inViewport=entries.some(entry=>entry.target===host&&entry.isIntersecting);visibilityChanged();}):null;intersection?.observe(host);doc.addEventListener?.('visibilitychange',visibilityChanged);
 wrapper.addEventListener('pointerdown',down);wrapper.addEventListener('pointermove',move);wrapper.addEventListener('pointerleave',leave);wrapper.addEventListener('pointerup',up);wrapper.addEventListener('pointercancel',up);
 wrapper.style.touchAction=interactive?'pan-y':'auto';paintFallback();
 // A ready font changes both glyphs and wrapping, so rebuild the atlas itself.
 if(doc.fonts?.status==='loading')doc.fonts.ready.then(()=>{if(!disposed)update({});}).catch(()=>{});
 load();
 return {update,setPose,reset,dispose(){if(disposed)return;disposed=true;generation++;resize?.disconnect();observer?.disconnect();intersection?.disconnect();doc.removeEventListener?.('visibilitychange',visibilityChanged);media?.removeEventListener?.('change',motionChanged);releaseRenderer();wrapper.removeEventListener('pointerdown',down);wrapper.removeEventListener('pointermove',move);wrapper.removeEventListener('pointerleave',leave);wrapper.removeEventListener('pointerup',up);wrapper.removeEventListener('pointercancel',up);wrapper.remove();host.classList.remove('is-dragging');delete host.dataset.bookRenderer;},get config(){return normalize(config);},get renderMode(){return host.dataset.bookRenderer||'disposed';}};
}
return {create,normalize,fitDistance,frameFor,lightCompensation,linesFor,paintCover,patterns:PATTERNS,materials:MATERIALS,finishes:FINISHES};
});
