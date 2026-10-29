// Original source text is a fixed multilingual comparison fixture, not UI copy.
const fixture = {title: 'Meu espa\u00e7o', subtitle: '5 tarefas', brand: 'PAUTA', spineLabel: '00005'};
const q = selector => document.querySelector(selector);
const host = q('#book-stage');
const controls = [...document.querySelectorAll('button,input,select')];
controls.forEach(control => {control.disabled = true;});
// The lab is served from the repository root in each generated distribution.
const threeModule = new URL(import.meta.url.includes('/distributions/agent-skills/')
  ? '../../../../node_modules/three/build/three.module.js'
  : '../../../node_modules/three/build/three.module.js', import.meta.url);
const fields = ['title','subtitle','brand','spineLabel','color','inkColor','pattern','material','finish','width','height','depth'];
let object, staticMode = false, threePromise, config = BookPreset.config(fixture);
const errors = [];

function recordError(error) {
  errors.push(error.message);
  q('#lab-error').hidden = false;
  q('#lab-error').textContent = error.message;
}
function snapshot() {
  const canvas = host.querySelector('.book-object-webgl');
  const gl = canvas?.getContext('webgl2');
  const ext = gl?.getExtension('WEBGL_debug_renderer_info');
  const box = host.getBoundingClientRect();
  return {config: object?.config, renderer: object?.renderMode, pose: host.dataset.bookPose,
    font: document.fonts.check('500 14px "Inter Variable"'),
    host: {width: box.width, height: box.height}, buffer: canvas ? [canvas.width,canvas.height] : null,
    backend: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null,
    viewport: {width: innerWidth, height: innerHeight, dpr: devicePixelRatio}, errors: [...errors]};
}
function status() {
  const mode = object?.renderMode;
  q('#renderer-status').textContent = mode === 'webgl' ? '3D volume - Three.js / WebGL'
    : mode === 'canvas-context-lost' ? 'Static cover - graphics context lost'
    : mode === 'canvas-unavailable' ? 'Static cover - Three.js or WebGL unavailable'
    : staticMode ? 'Static cover - Canvas2D' : 'Cover ready - preparing 3D volume';
  q('#config-output').textContent = JSON.stringify(snapshot(), null, 2);
  document.body.dataset.ready = String(mode === 'webgl');
}
function sync() {
  host.style.aspectRatio = config.width + '/' + config.height;
  q('#book-title').textContent = config.title || 'Untitled';
  q('#book-subtitle').textContent = config.subtitle;
  status();
}
function mount() {
  object?.dispose();
  object = BookPreset.create(host, config, {interactive: true, loadThree: staticMode ? undefined : () =>
    threePromise ||= import(threeModule.href).catch(error => {
      recordError(new Error('Three.js could not load. Serve the repository root after npm ci --ignore-scripts, or adapt the loader to your project.'));
      throw error;
    })});
  sync();
}
function restore() {
  config = BookPreset.config(fixture);
  for (const key of fields) q('#' + key).value = config[key];
  mount();
}
const observer = new MutationObserver(status);
observer.observe(host, {attributes:true, attributeFilter:['data-book-renderer','data-book-pose']});
for (const key of fields) q('#' + key).addEventListener('input', event => {
  const value = ['width','height','depth'].includes(key) ? event.target.valueAsNumber : event.target.value;
  config = BookObject.normalize({[key]:value}, config);
  object.update({[key]:value});
  sync();
});
q('#reset-pose').onclick = () => object.reset();
q('#spine-pose').onclick = () => object.setPose({yaw:90});
q('#back-pose').onclick = () => object.setPose({yaw:180});
q('#pages-pose').onclick = () => object.setPose({yaw:-90});
q('#restore-preset').onclick = restore;
q('#toggle-renderer').onclick = event => {
  staticMode = !staticMode;
  event.currentTarget.setAttribute('aria-pressed', String(staticMode));
  event.currentTarget.textContent = staticMode ? 'Use 3D volume' : 'Use static cover';
  mount();
};
q('#reduce-motion').onchange = event => {
  document.documentElement.dataset.motion = event.target.checked ? 'reduced' : 'system';
};
// Trigger font loading explicitly before any Canvas texture is painted.
try {
  const fonts = await document.fonts.load('500 14px "Inter Variable"');
  if (!fonts.length) throw new Error('The approved Inter font did not load; text fidelity is not verified.');
  restore();
  controls.forEach(control => {control.disabled = false;});
} catch (error) { recordError(error); }
window.__FORMA_BOOK_LAB__ = {snapshot, get book() {return object;}};
window.addEventListener('pagehide', event => {if (!event.persisted) {observer.disconnect();object?.dispose();}});
window.addEventListener('resize', status);
