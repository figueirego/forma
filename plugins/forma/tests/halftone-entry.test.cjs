const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../assets/halftone-entry/entry.js'),'utf8').replaceAll('export function','function');
function load(extra={}){const context={devicePixelRatio:3,...extra};vm.createContext(context);vm.runInContext(source,context);return context;}
test('fine/coarse halftone retains finite circles and bounded work at large sizes',()=>{
 const {drawHalftone}=load();
 const counts=[];
 for(const mode of ['fine','coarse']){let circles=0;const ctx={setTransform(){},beginPath(){},fill(){},arc(x,y,r){assert.ok(Number.isFinite(r)&&r>0);circles++}};
 const canvas={getContext:()=>ctx,getBoundingClientRect:()=>({width:1400,height:600})};
 drawHalftone(canvas,{mode});assert.equal(canvas.width,2800);assert.equal(canvas.height,1200);assert.ok(circles<140000);counts.push(circles);}
 assert.ok(counts[0]>counts[1]*2);
 assert.doesNotThrow(()=>drawHalftone({getContext:()=>null}));
});
test('reduced motion does not animate and disposal removes all listeners',()=>{
 const listeners=new Set();const target=()=>({addEventListener(type,fn){listeners.add(fn)},removeEventListener(type,fn){listeners.delete(fn)}});
 const reduce={...target(),matches:true};let calls=0;
 const root={...target(),dataset:{},querySelector:()=>({animate(){calls++}})};
 const {mountEntry}=load({matchMedia:()=>reduce,window:target(),document:target()});
 const controller=mountEntry(root);controller.play();assert.equal(calls,0);assert.equal(root.dataset.entryState,'ready');assert.ok(listeners.size>0);controller.destroy();assert.equal(listeners.size,0);controller.play();assert.equal(calls,0);
});
