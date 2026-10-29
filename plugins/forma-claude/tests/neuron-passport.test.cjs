const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Passport = require('../assets/neuron-passport.js');

const directory = path.join(__dirname, '../assets/neuron-passport');
test('the complete preserved Neuron source closure matches the recorded bytes', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'source-manifest.json'), 'utf8'));
  assert.equal(manifest.historicalCssByteIdentity, false);
  for (const item of manifest.files) {
    const bytes = fs.readFileSync(path.join(directory, item.file));
    assert.equal(bytes.length, item.bytes, item.file);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), item.sha256, item.file);
    assert.equal(item.transformation, 'none');
  }
  for (const name of ['passport.js', 'passport-motion.js', 'passport.css', 'profile.css', 'styles.css', 'data.js', 'lighting.js', 'passport-catalog.js', 'icons.js']) {
    assert.ok(manifest.files.some(item => item.file === name), name);
  }
});

test('state updates preserve unrelated application data and normalize only owned fields', () => {
  const original = {
    language: 'fr', preferences: { palette: ['#123456'], editor: { selected: 2 } },
    profile: { name: 'Reader', role: 'existing-role', goal: 'Original', level: 'beginner', streak: 4 },
    passport: { country: 'FR', nativeLanguage: 'French', photo: '', collectionId: 'owned-metadata' },
    profiles: { en: { goal: 'Understand a video', level: 'zero', extra: 1 }, fr: { level: 'advanced', goal: 'Lire' } },
    savedWords: [{ id: 1, word: 'hello' }], practiceLog: [{ completed: true }],
  };
  const before = structuredClone(original);
  const changed = Passport.normalizeState({ profile: { name: '  New name  ' }, passport: { country: 'BR' }, profiles: { en: { level: 'intermediate' } } }, original);
  assert.equal(changed.profile.name, 'New name');
  assert.equal(changed.profile.streak, 4);
  assert.equal(changed.profile.role, 'existing-role');
  assert.equal(changed.passport.collectionId, 'owned-metadata');
  assert.equal(changed.passport.nativeLanguage, 'French');
  assert.deepEqual(changed.profiles.fr, original.profiles.fr);
  assert.deepEqual(changed.preferences, original.preferences);
  assert.deepEqual(changed.savedWords, original.savedWords);
  assert.deepEqual(changed.practiceLog, original.practiceLog);
  assert.equal(changed.profiles.en.goal, 'Understand a video');
  assert.equal(changed.profiles.en.extra, 1);
  changed.preferences.editor.selected = 0;
  assert.deepEqual(original, before);
});

test('unsupported image formats, invalid finite state and cycles cannot enter the renderer', () => {
  const normalized = Passport.normalizeState({ profile: { name: 'x'.repeat(200), level: '<script>' }, passport: { photo: 'data:image/svg+xml;base64,PHN2Zz4=', country: '<img>' } });
  assert.equal(normalized.profile.name.length, 100);
  assert.equal(normalized.profile.level, 'zero');
  assert.equal(normalized.passport.photo, '');
  assert.equal(normalized.passport.country, '');
  const cycle = {}; cycle.self = cycle;
  assert.throws(() => Passport.normalizeState(cycle), /JSON/);
  assert.throws(() => Passport.normalizeState({ value: Infinity }), /JSON/);
  assert.throws(() => Passport.normalizeState({ value: () => {} }), /JSON/);
  const hostile = JSON.parse('{"__proto__":{"polluted":true}}');
  assert.equal(Passport.normalizeState(hostile).__proto__.polluted, true);
  assert.equal({}.polluted, undefined);
});

test('policies accept only original Neuron choices and retain defaults', () => {
  const config = Passport.normalize({ theme: 'unknown', material: 'glass', motion: 'infinite', page: Infinity, accent: 'injected', density: 'small' });
  assert.equal(config.theme, 'light');
  assert.equal(config.material, 'dimensional');
  assert.equal(config.motion, 'system');
  assert.equal(config.page, 0);
  assert.equal(config.accent, 'sage');
  assert.equal(config.density, 'comfortable');
  const next = Passport.normalize({ theme: 'system', motion: 'reduced' }, config);
  assert.equal(next.interaction, 'direct');
  assert.equal(next.theme, 'system');
  assert.equal(next.motion, 'reduced');
  const settings = Passport.normalize({ layout: 'settings', controls: 'host', accent: 'blue', density: 'compact' }, next);
  assert.equal(settings.layout, 'settings');
  assert.equal(settings.controls, 'host');
  assert.equal(settings.accent, 'blue');
  assert.equal(settings.density, 'compact');
  const rejected = Passport.normalize({ layout: 'untrusted', controls: 'external-html' }, settings);
  assert.equal(rejected.layout, 'object');
  assert.equal(rejected.controls, 'native');
});

function setup(input = {}, options = {}) {
  let element, bridge, current, disposed = 0, mounts = 0, timeout;
  const updates = [], resizes = [], events = new Map();
  let resizeHandler, resizeDisconnections = 0;
  const frame = {
    initialize(config, callbacks) { current = structuredClone(config); bridge = callbacks; mounts++; return current; },
    update(config, flags) { current = structuredClone(config); updates.push(flags); return current; },
    diagnostics() { return { page: current.page, mounts, disposed: !!disposed }; },
    dispose() { disposed++; },
    resize(box) { resizes.push({ ...box }); },
    controller: { openSkins() {} }, focus() {}, openEditor() {},
    get state() { return current.state; }, get config() { return current; },
  };
  const document = {
    baseURI: 'http://localhost:8000/components-lab.html',
    defaultView: {
      setTimeout(fn) { timeout = fn; return 1; }, clearTimeout() { timeout = null; },
      ResizeObserver: class { constructor(handler) { resizeHandler = handler; } observe() {} disconnect() { resizeDisconnections++; } },
    },
    createElement(name) {
      assert.equal(name, 'iframe');
      element = {
        style: {}, dataset: {}, contentWindow: { NeuronPassportFrame: frame }, removed: false,
        setAttribute() {}, addEventListener(type, handler) { events.set(type, handler); },
        removeEventListener(type) { events.delete(type); }, remove() { this.removed = true; },
      };
      return element;
    },
  };
  const host = { ownerDocument: document, append(node) { assert.equal(node, element); } };
  const instance = Passport.create(host, input, { assetBaseUrl: '/assets/', ...options });
  return { instance, element, updates, resizes, events, resize(width, height) { resizeHandler([{ target: host, contentRect: { width, height } }]); }, policy(theme) { bridge.policyChanged({ theme }); }, get resizeDisconnections() { return resizeDisconnections; }, load() { events.get('load')(); }, timeout() { timeout?.(); }, save(state, patch) { return bridge.save(state, patch); }, saveAsync(state, patch) { return bridge.saveAsync(state, patch); }, acceptAsync(state) { const accepted = bridge.acceptAsync(state); if (accepted) current.state = Passport.normalizeState(state); return accepted; }, cancelAsync() { bridge.cancelAsync(); }, get disposals() { return disposed; } };
}

test('mount, incremental update and dispose do not replace the frame or lose data', async () => {
  const run = setup({ state: { profile: { name: 'Initial' }, savedWords: ['keep'] } });
  run.instance.update({ state: { profile: { name: 'Before load' } } });
  run.load();
  assert.equal(await run.instance.ready, run.instance);
  const element = run.instance.element;
  run.instance.setPage(2);
  run.instance.update({ theme: 'dark' });
  assert.equal(run.instance.element, element);
  assert.equal(run.instance.diagnostics.mounts, 1);
  assert.deepEqual(run.instance.state.savedWords, ['keep']);
  assert.equal(run.instance.state.profile.name, 'Before load');
  assert.deepEqual(run.updates.at(-1), { pageExplicit: false, stateExplicit: false });
  run.instance.previous();
  assert.equal(run.instance.config.page, 1);
  assert.throws(() => run.instance.setPage(3), /0, 1 or 2/);
  run.instance.dispose(); run.instance.dispose();
  assert.equal(run.disposals, 1);
  assert.equal(run.element.removed, true);
  assert.equal(run.events.size, 0);
  assert.equal(run.instance.renderMode, 'disposed');
  assert.equal(run.instance.frameWindow, null);
  assert.equal(run.instance.update({ page: 0 }), false);
});

test('save callback receives complete isolated state; async or rejected saves are never committed', async () => {
  let received, decision = true;
  const run = setup({}, { onSave(next, patch) { received = { next, patch }; return decision; } });
  run.load(); await run.instance.ready;
  const next = Passport.normalizeState({ profile: { name: 'Saved', extra: 4 }, profiles: { fr: { level: 'advanced' } }, savedWords: ['word'] });
  assert.equal(run.save(next, { profile: { name: 'Saved' } }), true);
  assert.equal(received.next.profiles.fr.level, 'advanced');
  assert.deepEqual(received.next.savedWords, ['word']);
  received.next.profile.name = 'Host changed its copy';
  assert.equal(next.profile.name, 'Saved');
  decision = Promise.reject(new Error('storage failed'));
  assert.equal(run.save({ profile: { name: 'Must not commit' } }, {}), false);
  assert.match(run.instance.diagnostics.failure, /synchronous boolean/);
  decision = false;
  assert.equal(run.save({ profile: { name: 'No' } }, {}), false);
  run.instance.dispose();
});

test('early disposal and missing assets reject readiness cleanly', async () => {
  const disposed = setup(); disposed.instance.dispose();
  await assert.rejects(disposed.instance.ready, /disposed/);
  assert.equal(disposed.events.size, 0);
  const failed = setup(); failed.element.contentWindow = {}; failed.load();
  await assert.rejects(failed.instance.ready, /assets/);
  assert.equal(failed.instance.renderMode, 'unavailable');
  failed.instance.dispose();
});

test('same-origin assets prevent a remote document from receiving host callbacks', () => {
  const document = { baseURI: 'https://app.example/project/' };
  assert.throws(() => Passport.frameURL(document, 'https://other.example/assets/'), /same HTTP/);
  assert.throws(() => Passport.frameURL(document, 'data:text/html,foo'), /URL|same HTTP/);
  assert.equal(Passport.frameURL(document, '/assets/'), 'https://app.example/assets/neuron-passport/frame.html');
});


test('fractional host sizing and resolved color scheme survive the iframe boundary', async () => {
  const run = setup({ theme: 'dark', layout: 'settings', controls: 'host' });
  assert.equal(run.element.style.colorScheme, 'dark');
  run.resize(774, 324.90625);
  assert.deepEqual(run.resizes, []);
  run.load(); await run.instance.ready;
  assert.deepEqual(run.resizes, [{ width: 774, height: 324.90625 }]);
  run.resize(800.375, 378.90625);
  assert.deepEqual(run.resizes.at(-1), { width: 800.375, height: 378.90625 });
  run.policy('light');
  assert.equal(run.element.style.colorScheme, 'light');
  run.instance.dispose();
  assert.equal(run.resizeDisconnections, 1);
  run.resize(900, 450); run.policy('dark');
  assert.equal(run.resizes.length, 2);
  assert.equal(run.element.style.colorScheme, 'light');
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

test('async persistence waits for a true acknowledgement and blocks duplicate writes', async () => {
  const write = deferred(); let calls = 0, metadata, callbackState;
  const run = setup({ state: { profile: { name: 'Before' }, savedWords: ['retained'] } }, {
    onSaveAsync(next, patch, operation) { calls++; callbackState = next; metadata = operation; assert.equal(patch.profile.name, 'After'); return write.promise; },
  });
  run.load(); await run.instance.ready;
  const next = Passport.normalizeState({ profile: { name: 'After' } }, run.instance.state);
  const saving = run.saveAsync(next, { profile: { name: 'After' } });
  assert.equal(run.instance.diagnostics.persistence, 'async-host-callback');
  assert.equal(run.instance.diagnostics.save.status, 'pending');
  assert.equal(run.instance.state.profile.name, 'Before');
  assert.equal(await run.saveAsync(next, {}), false);
  assert.equal(run.save(next, {}), false);
  assert.equal(calls, 1);
  assert.equal(metadata.signal.aborted, false);
  assert.equal(metadata.requestId, 1);
  callbackState.profile.name = 'Host modified copy';
  write.resolve(true);
  assert.equal(await saving, true);
  assert.equal(run.instance.diagnostics.save.status, 'pending', 'acknowledgement still needs the original UI commit');
  assert.equal(run.instance.state.profile.name, 'Before');
  assert.equal(run.acceptAsync(next), true);
  assert.equal(run.instance.diagnostics.save.status, 'committed');
  assert.equal(run.instance.state.profile.name, 'After');
  assert.deepEqual(run.instance.state.savedWords, ['retained']);
  assert.equal(run.acceptAsync(next), false, 'acknowledgement can only be consumed once');
  run.instance.dispose();
});

test('async false, thrown, rejected, and nonboolean writes retain committed state and allow retry', async () => {
  let write = () => Promise.resolve(false);
  const run = setup({ state: { profile: { name: 'Before' } } }, { onSaveAsync: (...args) => write(...args) });
  run.load(); await run.instance.ready;
  const next = Passport.normalizeState({ profile: { name: 'Draft' } }, run.instance.state);
  for (const fail of [() => Promise.resolve(false), () => Promise.reject(new Error('Database details must not leak')), () => { throw new Error('Secret'); }, () => Promise.resolve('true'), () => true]) {
    write = fail;
    assert.equal(await run.saveAsync(next, {}), false);
    assert.equal(run.instance.diagnostics.save.status, 'error');
    assert.equal(run.instance.state.profile.name, 'Before');
    assert.doesNotMatch(run.instance.diagnostics.save.error, /Database|Secret/);
  }
  write = () => Promise.resolve(true);
  assert.equal(await run.saveAsync(next, {}), true);
  assert.equal(run.acceptAsync(next), true);
  assert.equal(run.instance.state.profile.name, 'Draft');
  assert.equal(run.instance.diagnostics.save.requestId, 6);
  run.instance.dispose();
});

test('host state changes invalidate a write before and after acknowledgement without remounting the draft', async () => {
  let write = deferred(), signal;
  const run = setup({ state: { profile: { name: 'Before' } } }, { onSaveAsync(next, patch, metadata) { signal = metadata.signal; return write.promise; } });
  run.load(); await run.instance.ready;
  const next = Passport.normalizeState({ profile: { name: 'Draft' } }, run.instance.state);
  const first = run.saveAsync(next, {});
  assert.equal(run.instance.update({ interaction: 'modes' }), false, 'pending draft cannot be destroyed by a structural remount');
  assert.equal(run.instance.update({ theme: 'dark' }), true);
  assert.equal(run.instance.update({ state: { profile: { name: 'Newer host' } } }), true);
  assert.equal(signal.aborted, true);
  write.resolve(true);
  assert.equal(await first, false);
  assert.match(run.instance.diagnostics.save.error, /Host state changed/);
  assert.equal(run.instance.state.profile.name, 'Newer host');
  write = deferred();
  const second = run.saveAsync(next, {});
  write.resolve(true); assert.equal(await second, true);
  run.instance.update({ state: { profile: { name: 'Arrived between ack and UI' } } });
  assert.equal(run.acceptAsync(next), false);
  assert.equal(run.instance.state.profile.name, 'Arrived between ack and UI');
  assert.equal(run.instance.diagnostics.mounts, 1);
  run.instance.dispose();
});

test('changed replay data and abandoned replay cannot consume a successful acknowledgement', async () => {
  const run = setup({}, { onSaveAsync: async () => true }); run.load(); await run.instance.ready;
  const next = Passport.normalizeState({ profile: { name: 'Submitted' } });
  assert.equal(await run.saveAsync(next, {}), true);
  assert.equal(run.acceptAsync({ profile: { name: 'Not submitted' } }), false);
  assert.equal(run.instance.diagnostics.save.status, 'error');
  assert.equal(await run.saveAsync(next, {}), true);
  run.cancelAsync();
  assert.equal(run.acceptAsync(next), false);
  assert.equal(run.instance.diagnostics.save.status, 'error');
  run.instance.dispose();
});

test('disposal aborts the host signal and ignores late asynchronous completion', async () => {
  const write = deferred(); let signal;
  const run = setup({ state: { profile: { name: 'Before' } } }, { onSaveAsync(next, patch, metadata) { signal = metadata.signal; return write.promise; } });
  run.load(); await run.instance.ready;
  const next = Passport.normalizeState({ profile: { name: 'Too late' } });
  const saving = run.saveAsync(next, {});
  run.instance.dispose(); run.instance.dispose();
  assert.equal(signal.aborted, true);
  write.resolve(true);
  assert.equal(await saving, false);
  assert.equal(run.acceptAsync(next), false);
  assert.equal(run.instance.state.profile.name, 'Before');
  assert.equal(run.instance.diagnostics.save.status, 'disposed');
  assert.equal(run.disposals, 1);
  assert.throws(() => setup({}, { onSave() { return true; }, async onSaveAsync() { return true; } }), /not both/);
});

// Exercise the authored frame bridge separately from the byte-preserved renderer.
// This fake renderer has the same synchronous save/close/toast boundary; real
// rendering and original field validation remain a browser integration check.
function frameHarness(kind = 'profile') {
  const vm = require('node:vm');
  const listeners = new Map(), nodes = [], notices = [], writes = [];
  let context, closed = false, identityUpdates = 0, page = 0, cleanup = 0;
  let draft = kind === 'skin' ? { passport: { country: 'BR' } } : kind === 'study' ? { language: 'en' } : { profile: { name: 'Draft name' } };
  let nextWrite = deferred(), accepted = false;
  function node(selectors = []) {
    const attributes = new Map();
    const value = { disabled: false, isConnected: true, dataset: {}, textContent: '',
      matches(selector) { return selectors.some(item => selector.split(',').includes(item)); },
      closest(selector) { return this.matches(selector) ? this : null; },
      setAttribute(name, data) { attributes.set(name, data); }, removeAttribute(name) { attributes.delete(name); },
      getAttribute(name) { return attributes.get(name); }, focus() {}, after(value) { nodes.push(value); },
    };
    nodes.push(value); return value;
  }
  const form = node(['[data-np-edit-form]']), save = node(['[data-np-save-profile]']), skin = node(['[data-np-apply-skin]']);
  const study = node(['.np-study-link']), cancel = node(['[data-np-editor-cancel]']), field = node(['input']);
  const originalDisabled = node(['button']); originalDisabled.disabled = true;
  const error = node(), skinError = node(), helper = node(), experience = node(), stage = node(), dialog = node();
  const selectors = new Map([
    ['[data-np-edit-form]', form], ['[data-np-form-error]', error], ['[data-np-skin-error]', skinError],
    ['[data-np-edit-form] footer p', helper], ['.np-experience', experience], ['.np-stage', stage], ['dialog[open]', dialog],
  ]);
  const controls = [save, skin, cancel, field, originalDisabled];
  const host = node();
  host.contains = target => nodes.includes(target);
  host.querySelector = selector => selectors.get(selector) || null;
  host.querySelectorAll = selector => selector === 'button,input,select,textarea' ? controls : [];
  host.replaceChildren = () => {};
  function dispatch(type, target, original) {
    const event = { target, prevented: false, stopped: false, preventDefault() { this.prevented = true; }, stopImmediatePropagation() { this.stopped = true; } };
    for (const listener of listeners.get(type) || []) { listener(event); if (event.stopped) break; }
    if (!event.stopped && original) original();
    return event;
  }
  function originalSave() {
    if (!context.save(draft)) { (kind === 'skin' ? skinError : error).textContent = 'Original synchronous failure'; return; }
    if (kind === 'study') { notices.push('navigate'); return; }
    closed = true; page = kind === 'skin' ? 0 : 1; context.toast('Original success');
  }
  form.requestSubmit = () => dispatch('submit', form, originalSave);
  skin.click = () => { if (!skin.disabled) dispatch('click', skin, originalSave); };
  study.click = () => dispatch('click', study, originalSave);
  const root = { dataset: {}, style: { setProperty() {} } };
  const window = { NeuronPassport: Passport, addEventListener() {} };
  const document = { documentElement: root, getElementById: () => host, querySelectorAll: () => [], createElement: () => node(), addEventListener(type, handler) { if (!listeners.has(type)) listeners.set(type, []); listeners.get(type).push(handler); } };
  const source = fs.readFileSync(path.join(directory, 'frame.js'), 'utf8').replace(/^import .*;\n/gm, '');
  vm.runInNewContext(source, {
    window, document, AbortController, queueMicrotask, matchMedia: () => ({ matches: false, addEventListener() {} }), innerWidth: 800, innerHeight: 700, devicePixelRatio: 1,
    normalizePassport: value => value, icons: { book: '<svg width="24" height="24"></svg>' },
    renderPassportProfile(host, ctx) { context = ctx; ctx.onReady({ updateIdentity() { identityUpdates++; }, updateCover() {}, goPage(value) { page = value; experience.dataset.npPage = String(value); }, openSkins() {} }); return () => { cleanup++; }; },
  });
  const frame = window.NeuronPassportFrame;
  frame.initialize({ state: { language: kind === 'study' ? 'fr' : 'en', profile: { name: 'Before' } } }, {
    policyChanged() {}, save() { throw new Error('Async mode must not call synchronous save'); },
    async saveAsync(next, patch) { writes.push({ next, patch }); accepted = await nextWrite.promise; return accepted; },
    acceptAsync(next) { if (!accepted) return false; return true; }, cancelAsync() { accepted = false; },
    saveStatus: () => ({ status: accepted ? 'committed' : 'error' }), toast: message => notices.push(message), navigate: () => notices.push('navigate'), requestClose() {},
  });
  return { frame, host, field, controls, error, skinError, helper, notices, writes,
    submit: () => kind === 'skin' ? skin.click() : kind === 'study' ? study.click() : form.requestSubmit(),
    cancel: () => dispatch('cancel', dialog), resolve(value) { nextWrite.resolve(value); }, retry() { nextWrite = deferred(); accepted = false; },
    get closed() { return closed; }, get page() { return page; }, get cleanup() { return cleanup; }, get draft() { return draft; },
  };
}
const flush = () => new Promise(resolve => setImmediate(resolve));

test('frame keeps the dialog draft pending, blocks duplicate submission and replays original success only after ack', async () => {
  const run = frameHarness();
  run.submit(); await flush();
  assert.equal(run.writes.length, 1);
  assert.equal(run.frame.state.profile.name, 'Before');
  assert.equal(run.closed, false);
  assert.deepEqual(run.notices, []);
  assert.equal(run.controls.every(control => control.disabled), true);
  assert.match(run.error.textContent, /Salvando/);
  assert.match(run.helper.textContent, /servidor/);
  assert.equal(run.host.getAttribute('aria-busy'), 'true');
  assert.equal(run.cancel().prevented, true);
  run.submit(); assert.equal(run.writes.length, 1);
  run.resolve(true); await flush();
  assert.equal(run.frame.state.profile.name, 'Draft name');
  assert.equal(run.closed, true);
  assert.equal(run.page, 1);
  assert.deepEqual(run.notices, ['Original success']);
  assert.equal(run.writes.length, 1, 'replay must not repeat the remote write');
  assert.equal(run.field.disabled, false);
  assert.equal(run.controls.at(-1).disabled, true, 'pre-existing disabled controls stay disabled');
  assert.equal(run.host.getAttribute('aria-busy'), undefined);
  run.frame.dispose();
});

test('frame false acknowledgement retains editable fields and retry uses the original commit path', async () => {
  const run = frameHarness();
  run.submit(); run.resolve(false); await flush();
  assert.equal(run.frame.state.profile.name, 'Before');
  assert.equal(run.closed, false);
  assert.equal(run.field.disabled, false);
  assert.equal(run.draft.profile.name, 'Draft name');
  assert.match(run.error.textContent, /continuam aqui/);
  assert.deepEqual(run.notices, []);
  run.retry(); run.submit(); run.resolve(true); await flush();
  assert.equal(run.writes.length, 2);
  assert.equal(run.frame.state.profile.name, 'Draft name');
  assert.deepEqual(run.notices, ['Original success']);
  run.frame.dispose();
});

test('skin and study actions use the same acknowledgement barrier as profile saves', async () => {
  for (const kind of ['skin', 'study']) {
    const run = frameHarness(kind);
    run.submit(); await flush();
    assert.deepEqual(run.notices, []);
    run.resolve(true); await flush();
    assert.equal(run.writes.length, 1);
    assert.deepEqual(run.notices, [kind === 'skin' ? 'Original success' : 'navigate']);
    if (kind === 'skin') assert.equal(run.frame.state.passport.country, 'BR');
    else assert.equal(run.frame.state.language, 'en');
    run.frame.dispose();
  }
});

test('frame disposal prevents late success from reopening, committing, or notifying', async () => {
  const run = frameHarness();
  run.submit(); run.frame.dispose(); run.frame.dispose();
  run.resolve(true); await flush();
  assert.equal(run.frame.state.profile.name, 'Before');
  assert.equal(run.closed, false);
  assert.deepEqual(run.notices, []);
  assert.equal(run.cleanup, 1);
});
