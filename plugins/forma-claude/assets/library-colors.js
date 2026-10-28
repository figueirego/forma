/* Original Pauta implementation of the audited library color contract.
 * Evidence and deliberate adaptations: references/reusable-objects.md; source attribution remains in the external audit.
 */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.PautaLibraryColors=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';

 const palette=Object.freeze([
  ['#322d32','Aubergine'],['#3b3e4a','Slate'],['#808080','Pewter'],['#94816d','Sand'],
  ['#445354','Teal grey'],['#51423a','Umber'],['#566759','Sage'],['#9ca6ad','Mist'],
  ['#2b2b2d','Charcoal'],['#5e3a38','Oxblood'],['#8a5a44','Terracotta'],['#9a7475','Rose clay'],
  ['#9a7b4f','Ochre'],['#6b6a4a','Olive'],['#4f5b3f','Moss'],['#34443c','Pine'],
  ['#2f4152','Prussian'],['#5a6b80','Dusk'],['#77708a','Heather'],['#5a4459','Plum']
 ].map(([hex,name])=>Object.freeze({hex,name})));
 const hueSeeds=['#e5484d','#e08a00','#d4a20b','#0f9d76','#0e98ae','#3b6fe0','#8b5cf6','#d6409f','#9a6b46','#7c7c84'];
 const clamp=value=>Math.min(1,Math.max(0,value));
 const rounded=value=>Math.round(value*1000)/1000;

 function options(value){return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}
 function identifier(value){
  if(typeof value==='string')return value;
  if(typeof value==='number'&&Number.isFinite(value))return String(value);
  return '';
 }
 function normalizedHex(value){
  if(typeof value!=='string')return null;
  const hex=value.trim().toLowerCase();
  if(/^#[0-9a-f]{6}$/.test(hex))return hex;
  if(/^#[0-9a-f]{3}$/.test(hex))return '#'+[...hex.slice(1)].map(char=>char+char).join('');
  return null;
 }
 function hashId(value){
  const text=identifier(value);let hash=0x811c9dc5;
  for(let index=0;index<text.length;index++)hash=Math.imul(hash^text.charCodeAt(index),0x01000193);
  return hash>>>0;
 }
 function toOklch(hex){
  const rgb=[1,3,5].map(offset=>parseInt(hex.slice(offset,offset+2),16)/255)
   .map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);
  const [r,g,b]=rgb;
  const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b);
  const m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b);
  const s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
  const a=1.9779984951*l-2.428592205*m+.4505937099*s;
  const axisB=.0259040371*l+.7827717662*m-.808675766*s;
  return {lightness:.2104542553*l+.793617785*m-.0040720468*s,
   chroma:Math.hypot(a,axisB),hue:(Math.atan2(axisB,a)*180/Math.PI+360)%360};
 }
 function toHex(lightness,chroma,hue){
  // Match the reference's three-decimal OKLCH parameters, then bound sRGB output.
  const L=rounded(lightness),C=rounded(chroma),angle=rounded((hue%360+360)%360)*Math.PI/180;
  const a=C*Math.cos(angle),b=C*Math.sin(angle);
  const l=(L+.3963377774*a+.2158037573*b)**3;
  const m=(L-.1055613458*a-.0638541728*b)**3;
  const s=(L-.0894841775*a-1.291485548*b)**3;
  const linear=[4.0767416621*l-3.3077115913*m+.2309699292*s,
   -1.2684380046*l+2.6097574011*m-.3413193965*s,
   -.0041960863*l-.7034186147*m+1.707614701*s];
  return '#'+linear.map(value=>{
   const encoded=value<=.0031308?12.92*value:1.055*value**(1/2.4)-.055;
   return Math.round(clamp(encoded)*255).toString(16).padStart(2,'0');
  }).join('');
 }
 function variants({lightness:L,chroma:C,hue:H},base){
  return {base:base||toHex(L,C,H),deep:toHex(L-.083,C*.78,H),
   lit:toHex(L+.06,C*1.2,H+5),edge:toHex(L+.09,C*.9,H)};
 }
 function auto(input={}){
  const {id,dark}=options(input),hash=hashId(id);
  // Unlike the reference's list-level collision allocation, hue is stable per ID.
  const hue=toOklch(hueSeeds[hash%hueSeeds.length]).hue;
  return variants({lightness:.46+(dark===true?.02:0)+((hash>>>16)&0xffff)/0xffff*.045,
   chroma:.076+(dark===true?.006:0)+(hash&0xffff)/0xffff*.02,hue});
 }
 function resolve(input={}){
  const config=options(input),base=normalizedHex(config.color);
  return base?variants(toOklch(base),base):auto(config);
 }
 return Object.freeze({resolve,auto,palette});
});
