/* The Neuron adapter resolves its bundled frame relative to its own script. */
const q=selector=>document.querySelector(selector);
const errors=[];
const recordError=error=>{errors.push({name:error.name,message:error.message});q('#lab-error').textContent=error.message;q('#lab-error').hidden=false;};
let editor,passport,adapter,activeTheme='light',disposed=false,passportReady=false;
const sampleState={profile:{name:'Alex Morgan',goal:'Entender v\u00eddeos do dia a dia',level:'zero'},passport:{country:'BR',nativeLanguage:'Portugu\u00eas',photo:null},profiles:{en:{goal:'Entender v\u00eddeos do dia a dia',level:'zero'}},language:'en'};
try{adapter=AppearanceEditor.createLocalStorageAdapter(localStorage,'forma.components-lab.appearance.v1');}catch(error){recordError(error);}
function readSaved(){try{return adapter?.load();}catch(error){recordError(new Error('Stored appearance could not be read. The original is retained; saving is disabled until the data is repaired.'));adapter=null;return undefined;}}
function syncPassportPreferences(){if(passport&&!disposed)passport.update({theme:activeTheme,motion:document.documentElement.dataset.motion==='reduced'?'reduced':'system'});}
function preview(value,{theme}){activeTheme=theme;queueMicrotask(()=>{if(passport&&editor&&!disposed){syncPassportPreferences();refresh();}});document.documentElement.dataset.theme=theme;q('.lab-wash').style.backgroundImage=AppearanceEditor.wash(theme,value.hue,value.chroma,value.pools,value.grain);}
function mountEditor(value){editor?.dispose();editor=AppearanceEditor.create(q('#editor'),{value,onPreview:preview,onSave:adapter?value=>adapter.save(value):undefined,onCommit:()=>{q('#save-status').textContent='Saved to this browser. Reopen saved or reload to verify persistence.';refresh();},onCancel:()=>{q('#save-status').textContent='Preview discarded. The saved appearance is restored.';refresh();},onError:recordError});}
mountEditor(readSaved());
try{
 passport=NeuronPassport.create(q('#passport'),{state:sampleState,interaction:'direct',material:'dimensional',theme:activeTheme,motion:document.documentElement.dataset.motion==='reduced'?'reduced':'system',page:0},{
  onSave:()=>{if(disposed)return false;q('#passport-status').textContent='Sample passport updated for this session. No profile data was written to storage.';queueMicrotask(refresh);return true;},
  onNavigate:destination=>{q('#passport-status').textContent='The passport requested navigation to '+String(destination)+'. This component lab does not contain the Neuron study screens.';},
  onToast:message=>{q('#passport-status').textContent=String(message);}
 });
 passport.ready.then(()=>{if(disposed)return;passportReady=true;syncPassportPreferences();q('#passport').setAttribute('aria-busy','false');q('#passport-skins').disabled=false;q('#passport-status').textContent='Ready. Use the original page arrows or drag a corner; sample changes stay in this session.';refresh();}).catch(error=>{if(disposed)return;q('#passport').setAttribute('aria-busy','false');q('#passport-status').textContent='The passport could not load. See the error below.';recordError(error);refresh();});
}catch(error){q('#passport').setAttribute('aria-busy','false');q('#passport-status').textContent='The passport could not load. See the error below.';recordError(error);}
q('#reopen').addEventListener('click',()=>{if(disposed)return;if(editor.diagnostics.dirty){q('#save-status').textContent='Save or discard the current preview before reopening.';return;}mountEditor(readSaved());refresh();});
q('#profile-name').addEventListener('input',event=>{if(!passport||disposed)return;passport.update({state:{profile:{name:event.target.value}}});refresh();});
q('#passport-skins').addEventListener('click',()=>{if(passportReady&&!disposed)passport.openSkins();});
q('#motion').addEventListener('click',()=>{if(disposed)return;const reduced=document.documentElement.dataset.motion!=='reduced';if(reduced)document.documentElement.dataset.motion='reduced';else delete document.documentElement.dataset.motion;q('#motion').setAttribute('aria-pressed',String(reduced));syncPassportPreferences();refresh();});
function snapshot(){return {schemaVersion:2,location:location.pathname,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},appearance:editor?.diagnostics,appearanceValue:editor?.value,passport:passport?.diagnostics||{status:'unavailable'},passportReady,disposed,errors:[...errors],limits:['Sample profile data; profile changes are held in memory only','Original Neuron CSS 3D/DOM component, separate from the legacy simplified Three passport','Runtime state does not establish GPU timing, FPS or physical-device coverage']};}
function refresh(){q('#diagnostics').textContent=JSON.stringify(snapshot(),null,2);}
function dispose(){if(disposed)return;disposed=true;passportReady=false;editor?.dispose();passport?.dispose();for(const selector of ['#dispose-components','#reopen','#motion','#profile-name','#passport-skins'])q(selector).disabled=true;q('#passport').setAttribute('aria-busy','false');q('#passport-status').textContent='Components disposed. Reload this page to mount them again.';refresh();}
q('#refresh-diagnostics').addEventListener('click',refresh);
q('#dispose-components').addEventListener('click',dispose);
window.__FORMA_LAB__={snapshot,get editor(){return editor;},get passport(){return passport;},dispose};
// A persisted page resumes the same DOM and listeners from the back-forward cache.
window.addEventListener('pagehide',event=>{if(!event.persisted)dispose();});
refresh();
