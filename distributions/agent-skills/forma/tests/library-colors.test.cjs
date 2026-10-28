const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {resolve,auto,palette}=require('../assets/library-colors.js');

const luminance=hex=>{
 const channels=[1,3,5].map(offset=>parseInt(hex.slice(offset,offset+2),16)/255)
  .map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
};

test('automatic color is stable per ID across calls and independent of collection order',()=>{
 const ids=['research','atelier','arquivo','😀','',42];
 const first=new Map(ids.map(id=>[id,auto({id})]));
 for(const id of [...ids].reverse())assert.deepEqual(auto({id}),first.get(id));
 assert.deepEqual(auto({id:42}),auto({id:'42'}));
 assert.notEqual(auto({id:'research'}).base,auto({id:'atelier'}).base);
});

test('dark lifts automatic cloth while explicit colors remain unchanged',()=>{
 for(const id of ['research','atelier','arquivo','😀',42]){
  const light=auto({id}),dark=auto({id,dark:true});
  assert.ok(luminance(dark.base)>luminance(light.base));
  assert.notEqual(dark.base,light.base);
 }
 assert.deepEqual(auto({id:'research',dark:'false'}),auto({id:'research'}));
 for(const {hex} of palette){
  assert.equal(resolve({id:'research',color:hex}).base,hex);
  assert.deepEqual(resolve({color:hex,dark:true}),resolve({color:hex,dark:false}));
 }
});

test('explicit palette and legacy custom colors preserve their normalized base',()=>{
 assert.equal(palette.length,20);
 for(const {hex} of palette)assert.equal(resolve({color:hex.toUpperCase()}).base,hex);
 for(const [color,expected] of [['#12ABEF','#12abef'],['  #ABC  ','#aabbcc'],['#000000','#000000'],['#FFFFFF','#ffffff']]){
  assert.equal(resolve({id:'anything',color,dark:true}).base,expected);
 }
 assert.equal(Object.isFrozen(palette),true);
 assert.equal(Object.isFrozen(palette[0]),true);
});

test('missing or invalid colors fall back deterministically without interpreting CSS',()=>{
 const expected=auto({id:'safe'});
 for(const color of [null,undefined,'','#12345','#12345678','rgb(0,0,0)','red','url(https://example.com/a)',42,{},[]]){
  assert.deepEqual(resolve({id:'safe',color}),expected);
 }
 for(const input of [null,undefined,42,'blue',[]])assert.deepEqual(resolve(input),auto());
 for(const id of [{toString(){throw Error('not an ID')}},Infinity,NaN,true,null])assert.deepEqual(auto({id}),auto({id:''}));
});

test('all generated channels are finite bounded sRGB and variants retain light ordering',()=>{
 const hexPattern=/^#[0-9a-f]{6}$/;
 for(let index=0;index<512;index++){
  const color='#'+Math.imul(index,7919).toString(16).padStart(6,'0');
  for(const result of [auto({id:index}),auto({id:index,dark:true}),resolve({color})]){
   assert.deepEqual(Object.keys(result),['base','deep','lit','edge']);
   for(const value of Object.values(result)){
    assert.match(value,hexPattern);
    for(const offset of [1,3,5])assert.ok(Number.isFinite(parseInt(value.slice(offset,offset+2),16)));
   }
  }
  const result=auto({id:index});
  assert.ok(luminance(result.deep)<luminance(result.base));
  assert.ok(luminance(result.lit)>luminance(result.base));
  assert.ok(luminance(result.edge)>luminance(result.base));
 }
});

test('browser build exposes only the pure API and needs no DOM or dependency',()=>{
 const context=vm.createContext({});
 vm.runInContext(fs.readFileSync(require.resolve('../assets/library-colors.js'),'utf8'),context);
 assert.deepEqual(JSON.parse(JSON.stringify(context.PautaLibraryColors.resolve({id:'research'}))),auto({id:'research'}));
 assert.deepEqual(Object.keys(context),['PautaLibraryColors']);
});
