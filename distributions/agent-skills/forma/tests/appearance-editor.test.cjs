const test=require('node:test');
const assert=require('node:assert/strict');
const A=require('../assets/appearance-editor.js');
const xy=value=>value.pools.map(p=>[p.x,p.y]);
const hues=value=>value.pools.map(p=>((value.hue+p.d)%360+360)%360);

test('first use, plus profile and 0/1/2/3 reopening preserve explicit state',()=>{
 const s=A.createState();assert.equal(s.selected,1);assert.equal(s.draft.pools.length,2);assert.equal(s.draft.chroma,.038);
 s.dispatch({type:'add'});assert.deepEqual(xy(s.draft),[[-14,62],[-18,4],[-10,120]]);assert.deepEqual(hues(s.draft),[243,301,181]);assert.equal(s.selected,1);assert.deepEqual(s.draft.pools[1].light,{l:.88,a:.8});assert.equal(s.draft.pools[1].w,118);
 s.dispatch({type:'add'});assert.equal(s.draft.pools.length,3);
 for(let count=0;count<=3;count++){const value={...s.draft,chroma:0,grain:0,pools:s.draft.pools.slice(0,count)};const reopened=A.createState(value);assert.deepEqual(reopened.draft,value);assert.equal(reopened.selected,count-1);}
});
test('plain drag preserves every vector and clips only visually; Alt isolates selection',()=>{
 const s=A.createState();s.dispatch({type:'add'});const snapshot=s.draft.pools;
 for(const [x,y] of [[.3,.4],[.5,.6],[.85,.8]])s.dispatch({type:'position',x,y,snapshot});
 assert.deepEqual(xy(s.draft),[[120.5,165],[116.5,107],[124.5,223]]);
 const reloaded=A.createState(s.draft);assert.deepEqual(xy(reloaded.draft),xy(s.draft));
 s.dispatch({type:'position',x:.2,y:.3,individual:true});assert.deepEqual(xy(s.draft),[[120.5,165],[-7,12],[124.5,223]]);
 s.dispatch({type:'translate',dx:-10,dy:1,individual:true});assert.deepEqual(xy(s.draft),[[120.5,165],[-17,13],[124.5,223]]);
 s.dispatch({type:'theme',value:'dark'});s.dispatch({type:'color',hue:0});assert.deepEqual(xy(s.draft),[[120.5,165],[-17,13],[124.5,223]]);
});
test('distance anchor stays fixed; accumulator keeps fractional motion and reverses at boundaries',()=>{
 const s=A.createState();s.dispatch({type:'add'});const anchor=xy(s.draft)[1];s.dispatch({type:'distance',value:60});assert.deepEqual(xy(s.draft)[1],anchor);assert.ok(Math.abs(A.distance(s.draft.pools,1)-60)<.1);
 let requested=A.distance(s.draft.pools,1),angle=0;for(let i=1;i<=90;i++){const next=i/9;requested=A.distanceDelta(requested,angle,next);angle=next;s.dispatch({type:'distance',value:requested});requested=A.reconcileDistance(requested,A.distance(s.draft.pools,1));}
 assert.ok(A.distance(s.draft.pools,1)>64);assert.equal(A.distanceDelta(149,179,-179),149+2*150/360);
 assert.equal(A.reconcileDistance(150,90),90);assert.ok(A.reconcileDistance(50.1,50)>50);
 s.dispatch({type:'distance',value:0});assert.deepEqual(xy(s.draft),[anchor,anchor,anchor]);s.dispatch({type:'distance',value:20});assert.deepEqual(xy(s.draft),[[-18,-6],[-18,4],[-18,-16]]);
});
test('color/removal preserve other absolute hues and reset alone recreates defaults',()=>{
 const s=A.createState();s.dispatch({type:'color',hue:10});assert.deepEqual(hues(s.draft),[243,10]);s.dispatch({type:'remove'});assert.deepEqual(hues(s.draft),[243]);assert.equal(s.selected,0);s.dispatch({type:'remove'});assert.equal(s.selected,-1);s.dispatch({type:'color',hue:0});assert.deepEqual(hues(s.draft),[0]);s.dispatch({type:'hold',value:true});s.dispatch({type:'reset'});assert.equal(s.draft.hold,true);assert.deepEqual(xy(s.draft),[[-14,62],[-10,120]]);assert.equal(s.selected,1);
});
test('preview, cancellation and async failed save never leak into committed state',async()=>{
 const original=A.initial(),s=A.createState(original);s.dispatch({type:'position',x:.9,y:.8});assert.notDeepEqual(s.draft,original);assert.deepEqual(s.committed,original);assert.deepEqual(original,A.initial());s.cancel();assert.deepEqual(s.draft,original);
 s.dispatch({type:'grain',value:.25});await assert.rejects(s.save(async()=>{throw Error('quota');}),/quota/);assert.equal(s.draft.grain,.25);assert.equal(s.committed.grain,0);
 let finish;const task=s.save(()=>new Promise(resolve=>{finish=resolve;}));assert.equal(s.pending,true);assert.equal(s.dispatch({type:'grain',value:.8}),false);assert.equal(s.cancel(),false);finish();await task;assert.equal(s.committed.grain,.25);s.dispose();assert.equal(s.dispatch({type:'reset'}),false);assert.equal(await s.save(async()=>{}),false);
});
test('legacy storage backs up before write and preserves zeros and invalid originals',async()=>{
 const raw={...A.initial(),strength:5,pools:[]};delete raw.schemaVersion;delete raw.chroma;
 const map=new Map([['test',JSON.stringify(raw)]]),writes=[];const storage={getItem:k=>map.get(k)??null,setItem(k,v){writes.push(k);map.set(k,v);}};
 const adapter=A.createLocalStorageAdapter(storage,'test'),value=adapter.load();assert.equal(value.chroma,.0045);assert.deepEqual(value.pools,[]);await adapter.save(value);assert.deepEqual(writes,['test.before-v1','test']);assert.equal(map.get('test.before-v1'),JSON.stringify(raw));await adapter.save(value);assert.equal(writes.filter(k=>k==='test.before-v1').length,1);
 const original=JSON.stringify(raw);const fail=A.createLocalStorageAdapter({getItem:k=>k==='test'?original:null,setItem(){throw Error('backup blocked');}},'test');const draft=fail.load();await assert.rejects(fail.save(draft),/backup blocked/);
 assert.throws(()=>A.normalize({...A.initial(),chroma:NaN}),/Invalid/);assert.throws(()=>A.normalize({...A.initial(),pools:[{...A.initial().pools[0],x:Infinity}]}),/Invalid/);assert.throws(()=>A.migrateLegacy({schemaVersion:90}),/Unknown/);
});
test('wash uses independent approved stop numbers and no text-level grain filter',()=>{
 const d=A.initial(),css=A.wash('light',d.hue,d.chroma,d.pools,0);
 assert.ok(css.includes('oklch(0.9 0.028499999999999998 243 / 0.85) 0%'));
 for(const fragment of ['/ 0.813) 11.3%','/ 0.425) 45%','/ 0) 90%'])assert.ok(css.includes(fragment),fragment);
 assert.equal(A.wash('dark',d.hue,0,[],0),'radial-gradient(74% 38% at 10% -14%, rgba(255,255,255,.07), transparent 62%), linear-gradient(180deg, #141417 0%, #08080a 100%)');
 assert.ok(A.wash('light',d.hue,d.chroma,d.pools,.5).startsWith('url("data:image/svg+xml,'));
});

test('distance uses positive radial scaling for allowed offstage anchors without amplification',()=>{
 for(const offset of [[-200,0],[200,0],[0,-200],[0,200],[-1e6,1e6]])for(const requested of [0,20,150]){
  const s=A.createState();s.dispatch({type:'translate',dx:offset[0],dy:offset[1]});const before=xy(s.draft),anchor=before[1],vector=[before[0][0]-anchor[0],before[0][1]-anchor[1]];
  s.dispatch({type:'distance',value:requested});const after=xy(s.draft),radius=A.distance(s.draft.pools,1);assert.deepEqual(after[1],anchor);assert.ok(Number.isFinite(radius));assert.ok(radius>=0&&radius<=150.1);assert.ok(Math.abs(radius-requested)<.1);
  assert.ok((after[0][0]-anchor[0])*vector[0]+(after[0][1]-anchor[1])*vector[1]>=0,'radial direction must not reverse');
  s.dispatch({type:'distance',value:0});assert.deepEqual(xy(s.draft),[anchor,anchor]);s.dispatch({type:'distance',value:20});assert.ok(Math.abs(A.distance(s.draft.pools,1)-20)<.1,'coincident offstage pools must not jump to the stage boundary');
 }
});

test('compact mode controls are emitted in System, Light, Dark order',()=>{
 const stop=new Error('stop after markup'),root={setAttribute(){},querySelector(){throw stop;}},host={ownerDocument:{defaultView:{},createElement:()=>root},append(){}};
 assert.throws(()=>A.create(host),error=>error===stop);
 assert.deepEqual([...root.innerHTML.matchAll(/data-mode="([a-z]+)"/g)].map(match=>match[1]),['system','light','dark']);
 assert.equal(A.initial().theme,'system');
});

test('finite extreme offstage coordinates survive rounding and overflowing edits roll back atomically',async()=>{
 const input=A.initial();input.pools[0].x=1e308;const s=A.createState(input);
 assert.equal(s.dispatch({type:'translate',dx:1,dy:1}),true);
 assert.equal(s.draft.pools[0].x,1e308);assert.ok(s.draft.pools.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
 let written;await s.save(async value=>{written=value;});assert.equal(written.pools[0].x,1e308);assert.equal(s.pending,false);
 const before=s.draft,selected=s.selected;
 assert.equal(s.dispatch({type:'translate',dx:1e308,dy:10}),false);assert.deepEqual(s.draft,before);assert.equal(s.selected,selected);
 assert.equal(s.cancel(),true);assert.equal(s.dispatch({type:'reset'}),true);assert.deepEqual(xy(s.draft),[[-14,62],[-10,120]]);
});

test('every rejected save releases pending and retains a finite editable draft',async()=>{
 const s=A.createState();s.dispatch({type:'grain',value:.3});const draft=s.draft;
 for(const writer of [undefined,()=>{throw new TypeError('invalid adapter data');},async()=>{throw new Error('quota');}]){
  await assert.rejects(s.save(writer));assert.equal(s.pending,false);assert.deepEqual(s.draft,draft);assert.ok(s.draft.pools.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
  assert.equal(s.dispatch({type:'select',index:0}),true);
 }
 assert.equal(s.cancel(),true);assert.equal(s.dispatch({type:'reset'}),true);
});

test('saving untouched first-use defaults remains clean without any dispatch',async()=>{
 const s=A.createState();const preview=s.draft;let stored;
 assert.equal(s.dirty,false);
 assert.equal(await s.save(async value=>{stored=value;}),true);
 assert.equal(s.dirty,false);assert.deepEqual(s.draft,preview);assert.deepEqual(s.committed,stored);
 assert.equal(A.createState(stored).dirty,false);
});

test('saving first-use, added and reset lights clears dirty without changing their values',async()=>{
 for(const setup of [()=>{},s=>s.dispatch({type:'add'}),s=>{s.dispatch({type:'grain',value:.3});s.dispatch({type:'reset'});}]){
  const s=A.createState();setup(s);s.dispatch({type:'theme',value:'dark'});
  const preview=s.draft;let stored;
  assert.equal(s.dirty,true);assert.equal(await s.save(async value=>{stored=value;}),true);
  assert.equal(s.dirty,false,'a successful save must allow immediate reopening');
  assert.deepEqual(s.draft,preview);assert.deepEqual(s.committed,stored);
  const reopened=A.createState(stored);assert.equal(reopened.dirty,false);assert.deepEqual(reopened.draft,preview);
 }
});

test('equivalent reset data is clean; rejected save preserves a dirty editable preview',async()=>{
 const s=A.createState(A.normalize(A.initial()));
 s.dispatch({type:'reset'});assert.equal(s.dirty,false,'property insertion order is not a user edit');
 s.dispatch({type:'grain',value:.3});const preview=s.draft;
 await assert.rejects(s.save(async()=>{throw Error('storage unavailable');}),/storage unavailable/);
 assert.equal(s.dirty,true);assert.deepEqual(s.draft,preview);
 s.cancel();assert.equal(s.dirty,false);
});
