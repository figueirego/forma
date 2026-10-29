const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const A=require('../assets/appearance-editor.js');
const script=fs.readFileSync(require.resolve('../assets/components-lab.js'),'utf8');

// Controller fixture only. The real iframe, CSS 3D rendering and gestures require browser proof.
function labFixture({theme='light',rejectReady=false}={}){
 const elements=new Map(),events=new Map(),disposed={editor:0,passport:0},updates=[],writes=[];
 let object,createConfig,createOptions,editorOptions,readyResolve,readyReject,skins=0;
 const ready=new Promise((resolve,reject)=>{readyResolve=resolve;readyReject=reject;});
 const node=selector=>{if(!elements.has(selector))elements.set(selector,{value:selector==='#profile-name'?'Alex Morgan':'',disabled:selector==='#passport-skins',hidden:true,style:{},attributes:{},events:new Map(),addEventListener(name,fn){this.events.set(name,fn);},setAttribute(name,value){this.attributes[name]=value;}});return elements.get(selector);};
 const document={querySelector:node,documentElement:{dataset:{}}};
 const window={addEventListener:(name,fn)=>events.set(name,fn)};
 const appearance={...A,create(_host,options){editorOptions=options;options.onPreview(A.initial(),{theme});return {value:A.initial(),diagnostics:{dirty:false},dispose(){disposed.editor++;}};}};
 const passport={create(_host,value,options){createConfig=value;createOptions=options;let config=structuredClone(value);object={ready,get state(){return config.state;},get diagnostics(){return {renderer:'css-3d-dom',status:disposed.passport?'disposed':'ready',theme:config.theme,motion:config.motion};},update(patch){updates.push(structuredClone(patch));if(patch.state)for(const key of Object.keys(patch.state))config.state[key]={...config.state[key],...patch.state[key]};for(const key of Object.keys(patch))if(key!=='state')config[key]=patch[key];},openSkins(){skins++;},dispose(){disposed.passport++;}};return object;}};
 const context={window,document,AppearanceEditor:appearance,NeuronPassport:passport,localStorage:{getItem:()=>null,setItem(...args){writes.push(args);}},location:{pathname:'/components-lab.html'},innerWidth:1000,innerHeight:800,devicePixelRatio:1,queueMicrotask,console};
 vm.runInNewContext(script,context,{filename:'components-lab.js'});
 if(rejectReady)readyReject(new Error('Missing bundled frame'));
 return {node,events,disposed,updates,writes,document,context,get passport(){return object;},get api(){return window.__FORMA_LAB__;},get createConfig(){return createConfig;},get createOptions(){return createOptions;},get editorOptions(){return editorOptions;},get skins(){return skins;},async settle(){await Promise.resolve();await Promise.resolve();},async ready(){readyResolve();await Promise.resolve();await Promise.resolve();}};
}

test('primary lab loads the Neuron adapter without Three, BookObject or generic Three controls',()=>{
 const html=fs.readFileSync(require.resolve('../assets/components-lab.html'),'utf8');
 assert.match(html,/src="neuron-passport\.js"/);
 assert.doesNotMatch(html,/src="(?:passport-object|book-object)\.js"|id="(?:opening|page-turn|fit|material|cover-color)"/);
 assert.doesNotMatch(script,/node_modules|loadThree|PassportObject\.create|BookObject/);
 const f=labFixture({theme:'dark'});
 assert.equal(f.createConfig.interaction,'direct');assert.equal(f.createConfig.material,'dimensional');assert.equal(f.createConfig.theme,'dark');assert.equal(f.createConfig.state.passport.country,'BR');assert.equal(f.createConfig.state.language,'en');
 assert.equal(f.node('#passport-skins').disabled,true);
});

test('ready enables native cover selector; sample profile edits go to the original state contract',async()=>{
 const f=labFixture();await f.ready();assert.equal(f.node('#passport-skins').disabled,false);assert.equal(f.node('#passport').attributes['aria-busy'],'false');
 const field=f.node('#profile-name');field.value='Sam';field.events.get('input')({target:field});assert.equal(f.passport.state.profile.name,'Sam');
 f.node('#passport-skins').events.get('click')();assert.equal(f.skins,1);
 assert.equal(f.createOptions.onSave(f.passport.state,{passport:{country:'FR'}}),true);await f.settle();assert.equal(f.writes.length,0);assert.match(f.node('#passport-status').textContent,/No profile data was written/);
});

test('appearance previews and motion choice mirror the Neuron frame without overriding its colors',async()=>{
 const f=labFixture();await f.ready();f.editorOptions.onPreview(A.initial(),{theme:'dark'});await f.settle();assert.equal(f.passport.diagnostics.theme,'dark');assert.equal(f.document.documentElement.dataset.theme,'dark');
 f.node('#motion').events.get('click')();assert.equal(f.passport.diagnostics.motion,'reduced');f.node('#motion').events.get('click')();assert.equal(f.passport.diagnostics.motion,'system');
 assert.equal(f.updates.some(patch=>['color','material','fit','light','brightness'].some(key=>Object.hasOwn(patch,key))),false);
});

test('BFCache pagehide preserves components; final navigation disposes exactly once',async()=>{
 const f=labFixture();await f.ready();f.events.get('pagehide')({persisted:true});assert.deepEqual(f.disposed,{editor:0,passport:0});
 f.events.get('pagehide')({persisted:false});f.api.dispose();assert.deepEqual(f.disposed,{editor:1,passport:1});assert.equal(f.node('#profile-name').disabled,true);assert.equal(f.api.snapshot().disposed,true);
});

test('late ready after disposal cannot update or enable a removed passport',async()=>{
 const f=labFixture();f.api.dispose();const count=f.updates.length;await f.ready();assert.equal(f.updates.length,count);assert.equal(f.node('#passport-skins').disabled,true);assert.equal(f.api.snapshot().passportReady,false);
});

test('frame load failure remains explicit and does not claim a successful renderer',async()=>{
 const f=labFixture({rejectReady:true});await f.settle();assert.equal(f.api.snapshot().passportReady,false);assert.equal(f.node('#passport-skins').disabled,true);assert.equal(f.node('#lab-error').hidden,false);assert.match(f.node('#lab-error').textContent,/Missing bundled frame/);
 assert.equal(f.api.snapshot().errors.length,1);assert.equal(Object.hasOwn(f.api.snapshot().passport,'renderCount'),false);assert.equal(Object.hasOwn(f.api.snapshot().passport,'fps'),false);
});
