import { renderPassportProfile, normalizePassport } from './passport.js';
import { icons } from './icons.js';

const adapter = window.NeuronPassport;
const host = document.getElementById('passport-host');
const root = document.documentElement;
const media = matchMedia('(prefers-color-scheme: dark)');
const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
// The exact SVG sizing function used by Neuron's original application host.
const icon = (name, size = 20) => (icons[name] || icons.book)
  .replace('<svg ', '<svg aria-hidden="true" focusable="false" ')
  .replace('width="24"', `width="${size}"`)
  .replace('height="24"', `height="${size}"`)
  .replace('stroke-width="2"', 'stroke-width="1.65"');
let config, callbacks, controller, release, context, disposed = false, mounts = 0;
const abort = new AbortController();
let escapeWasInternal = false;
let action = null, pendingSave = null, replay = null;

function saveMessage(operation, message) {
  let target = host.querySelector(operation.action.error);
  if (!target && operation.action.kind === 'study') {
    target = document.createElement('p');
    target.dataset.neuronSaveStatus = '';
    operation.action.element.after(target);
  }
  if (target) { target.setAttribute('role', 'status'); target.setAttribute('aria-live', 'polite'); target.textContent = message; }
}
function lockSave(operation) {
  operation.controls = [...host.querySelectorAll('button,input,select,textarea')].map(control => [control, control.disabled]);
  for (const [control] of operation.controls) control.disabled = true;
  host.setAttribute('aria-busy', 'true');
}
function unlockSave(operation) {
  for (const [control, disabled] of operation.controls) if (control.isConnected) control.disabled = disabled;
  host.removeAttribute('aria-busy');
}
function saveDraft(next, patch) {
  if (replay) {
    replay = null;
    return callbacks.acceptAsync(next);
  }
  if (!callbacks.saveAsync) return callbacks.save(next, patch);
  if (pendingSave || !action) return false;
  const operation = { action };
  pendingSave = operation;
  lockSave(operation);
  // The preserved synchronous controller writes its failure text after false.
  // Replace it before paint, without changing its source or committing early.
  queueMicrotask(() => { if (!disposed && pendingSave === operation) saveMessage(operation, 'Salvando\u2026 Aguarde a confirma\u00e7\u00e3o.'); });
  callbacks.saveAsync(next, patch).then(acknowledged => {
    if (disposed || pendingSave !== operation) return;
    pendingSave = null;
    unlockSave(operation);
    if (acknowledged) {
      // Run the original validation/commit/close/toast exactly once after ack.
      replay = operation;
      operation.action.run();
      if (replay) { replay = null; callbacks.cancelAsync(); }
    }
    if (!acknowledged || callbacks.saveStatus().status !== 'committed') {
      const changed = callbacks.saveStatus().error?.startsWith('Host state changed');
      saveMessage(operation, changed ? 'Os dados mudaram durante o envio. Revise seus campos e tente novamente.' : 'N\u00e3o foi poss\u00edvel salvar. Seus campos continuam aqui para tentar novamente.');
    }
  });
  return false;
}

// Capture the entry point, then leave validation and rendering to the preserved
// controller. Replaying this entry point avoids a second implementation of it.
document.addEventListener('submit', event => {
  if (!host.contains(event.target) || !event.target.matches('[data-np-edit-form]')) return;
  if (pendingSave) { event.preventDefault(); event.stopImmediatePropagation(); return; }
  const form = event.target;
  action = { kind: 'profile', element: form, error: '[data-np-form-error]', run: () => form.requestSubmit() };
}, { capture: true, signal: abort.signal });
document.addEventListener('click', event => {
  if (!host.contains(event.target)) return;
  if (pendingSave) { event.preventDefault(); event.stopImmediatePropagation(); return; }
  const button = event.target.closest('[data-np-apply-skin],.np-study-link');
  action = button ? { kind: button.matches('[data-np-apply-skin]') ? 'skin' : 'study', element: button, error: button.matches('[data-np-apply-skin]') ? '[data-np-skin-error]' : '[data-neuron-save-status]', run: () => button.click() } : null;
}, { capture: true, signal: abort.signal });
document.addEventListener('cancel', event => {
  if (pendingSave && host.contains(event.target)) event.preventDefault();
}, { capture: true, signal: abort.signal });

function canonicalState(state) {
  const next = adapter.normalizeState(state);
  next.passport = { ...next.passport, ...normalizePassport(next.passport) };
  return next;
}
function policy() {
  const attributes = { theme: config.theme === 'system' ? media.matches ? 'dark' : 'light' : config.theme, material: config.material, motion: config.motion, contrast: config.contrast, accent: config.accent, density: config.density, neuronLayout: config.layout, neuronControls: config.controls };
  for (const [name, value] of Object.entries(attributes)) if (root.dataset[name] !== value) root.dataset[name] = value;
  callbacks?.policyChanged({ theme: root.dataset.theme });
}
function mount(page) {
  release?.();
  host.replaceChildren();
  context = {
    state: config.state, interaction: config.interaction, embedded: config.layout === 'settings', escape,
    icon: callbacks.icon || icon,
    save(patch) {
      const next = canonicalState(adapter.normalizeState(patch, context.state));
      if (!saveDraft(next, patch)) return false;
      config.state = next;
      context.state = next;
      return true;
    },
    navigate: destination => callbacks.navigate(destination),
    toast: message => callbacks.toast(message),
    onReady: value => { controller = value; },
  };
  release = renderPassportProfile(host, context);
  if (callbacks.saveAsync) {
    const helper = host.querySelector('[data-np-edit-form] footer p');
    if (helper) helper.textContent = 'Confirme para salvar. Aguarde a confirma\u00e7\u00e3o do servidor.';
  }
  mounts++;
  if (page !== 0) controller.goPage(page);
}
function initialize(input, bridge) {
  if (disposed) throw new Error('Disposed Neuron passport frame.');
  if ([...document.querySelectorAll('link[rel="stylesheet"]')].some(link => !link.sheet)) throw new Error('Neuron passport styles could not be loaded.');
  callbacks = bridge;
  config = adapter.normalize(input);
  config.state = canonicalState(config.state);
  policy();
  mount(config.page);
  return config;
}
function update(input, { pageExplicit = false, stateExplicit = false } = {}) {
  if (disposed) return config;
  const page = Number(host.querySelector('.np-experience')?.dataset.npPage || 0);
  const previousInteraction = config.interaction;
  const wasEmbedded = config.layout === 'settings';
  config = adapter.normalize(input, config);
  config.state = canonicalState(config.state);
  policy();
  if (previousInteraction !== config.interaction || wasEmbedded !== (config.layout === 'settings')) mount(pageExplicit ? config.page : page);
  else {
    context.state = config.state;
    if (stateExplicit) { controller.updateIdentity(); controller.updateCover(); }
    if (pageExplicit) controller.goPage(config.page);
  }
  config.page = Number(host.querySelector('.np-experience')?.dataset.npPage || 0);
  return config;
}
function resize({ width, height }) {
  if (disposed || !Number.isFinite(width) || !Number.isFinite(height)) return;
  // An iframe rounds innerWidth/innerHeight. Keep the host's fractional CSS box
  // so the original projection/fit receives the same dimensions as Neuron.
  root.style.setProperty('--neuron-host-width', `${Math.max(0, width)}px`);
  root.style.setProperty('--neuron-host-height', `${Math.max(0, height)}px`);
}
function diagnostics() {
  const stage = host.querySelector('.np-stage');
  const experience = host.querySelector('.np-experience');
  return {
    source: 'Neuron v03.23 JS + current CSS explicitly authorized 2026-10-29',
    historicalCssByteIdentity: false,
    renderer: disposed ? 'disposed' : experience?.dataset.npRenderer || 'css-articulated',
    page: Number(experience?.dataset.npPage || 0),
    interaction: experience?.dataset.npInteraction,
    pose: stage?.dataset.pose || null,
    turn: stage?.dataset.turn || null,
    motionState: stage?.dataset.motionState || null,
    gestureResult: stage?.dataset.gestureResult || null,
    theme: root.dataset.theme, material: root.dataset.material, motion: root.dataset.motion,
    contrast: root.dataset.contrast, accent: root.dataset.accent, density: root.dataset.density, layout: root.dataset.neuronLayout, controls: root.dataset.neuronControls,
    mounts, disposed,
    savePending: !!pendingSave,
    remoteCover: [...host.querySelectorAll('[data-np-cover-image]')].map(image => ({ loaded: !!image.naturalWidth, hidden: image.hidden, source: image.getAttribute('src') || '' })),
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
  };
}
function dispose() {
  if (disposed) return;
  disposed = true;
  pendingSave = null;
  replay = null;
  release?.();
  release = null;
  controller = null;
  abort.abort();
  host.replaceChildren();
}
media.addEventListener('change', () => { if (config?.theme === 'system') policy(); }, { signal: abort.signal });
// An iframe does not bubble Escape into the host modal. Preserve internal dialog /
// drag cancellation first, then let the host decide whether its outer dialog closes.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') escapeWasInternal = !!host.querySelector('dialog[open]') || host.querySelector('.np-stage')?.dataset.motionState === 'dragging';
}, { capture: true, signal: abort.signal });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !escapeWasInternal && !disposed) callbacks?.requestClose();
}, { signal: abort.signal });
window.addEventListener('pagehide', event => { if (!event.persisted) dispose(); }, { signal: abort.signal });
window.NeuronPassportFrame = {
  initialize, update, resize, diagnostics, dispose,
  focus() { host.querySelector('.np-stage')?.focus({ preventScroll: true }); },
  openEditor() { if (!pendingSave) host.querySelector('[data-np-edit]')?.click(); },
  get controller() { return controller; },
  get state() { return config?.state; },
  get config() { return config ? { ...config, page: Number(host.querySelector('.np-experience')?.dataset.npPage || 0) } : config; },
};
