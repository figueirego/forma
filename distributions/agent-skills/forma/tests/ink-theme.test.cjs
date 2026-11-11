const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../assets/ink-theme/ink-theme.js'), 'utf8')
  .replace('export function mountInkTheme', 'function mountInkTheme');
const tick = () => new Promise(setImmediate);
function defer() {
  let resolve, reject;
  const promise = new Promise((a, b) => { resolve = a; reject = b; });
  return { promise, resolve, reject };
}
function harness({ reduced = false, supported = true, noAnimate = false, throws = false, animateThrows = false, onApply = () => {} } = {}) {
  const captures = [], animations = [], applied = [], handlers = new Map();
  const events = scope => ({
    addEventListener(type, fn) { handlers.set(`${scope}:${type}`, fn); },
    removeEventListener(type, fn) { if (handlers.get(`${scope}:${type}`) === fn) handlers.delete(`${scope}:${type}`); },
  });
  const root = { dataset: { theme: 'light' }, animate(frames, options) {
    if (animateThrows) throw new TypeError('unsupported pseudo-element');
    const done = defer();
    const animation = { frames, options, finished: done.promise, complete: done.resolve, cancelled: false,
      cancel() { this.cancelled = true; done.reject(Object.assign(new Error('cancelled'), { name: 'AbortError' })); } };
    animations.push(animation);
    return animation;
  } };
  if (noAnimate) delete root.animate;
  const media = { matches: reduced, ...events('media') };
  const document = { documentElement: root, hidden: false, ...events('document'), elementFromPoint: () => null };
  if (supported) document.startViewTransition = update => {
    if (throws) throw new TypeError('unsupported');
    const ready = defer(), done = defer();
    const capture = { ready: ready.promise, finished: done.promise,
      skipTransition() { this.skipped = true; }, run() { update(); ready.resolve(); },
      rejectReady() { ready.reject(Object.assign(new Error('skipped'), { name: 'InvalidStateError' })); }, complete: done.resolve };
    captures.push(capture);
    return capture;
  };
  const window = { matchMedia: () => media, ...events('window') };
  const context = vm.createContext({ document, window, innerWidth: 1280, innerHeight: 800, console: { warn() {} } });
  vm.runInContext(source, context);
  const api = context.mountInkTheme({ initialTheme: 'light', applyTheme(theme) { root.dataset.theme = theme; applied.push(theme); onApply(theme, root); } });
  return { root, api, captures, animations, applied, handlers, document, media, context };
}

// Adapter-level identity checks: these do not claim rendered contrast or browser fidelity.
for (const brand of [
  { id: 'finance', font: 'system-ui', light: { accent: '#2158a8', surface: '#f8fafc' }, dark: { accent: '#8eb7f8', surface: '#111820' } },
  { id: 'learning', font: 'sans-serif', light: { accent: '#276049', surface: '#f5f8f1' }, dark: { accent: '#94cbae', surface: '#141d18' } },
  { id: 'editorial', font: 'serif', light: { accent: '#954a2b', surface: '#fbf4e8' }, dark: { accent: '#e9b18c', surface: '#211a15' } },
]) {
  test(`theme controller preserves the ${brand.id} host identity during rapid switching`, async () => {
    const state = { font: brand.font, palette: brand.light, draft: 'Keep this text', scroll: 240 };
    const h = harness({ onApply(theme) { state.palette = brand[theme]; } });
    const first = h.api.toggle();
    await h.api.toggle(); await h.api.toggle();
    h.captures[0].run(); h.captures[0].complete(); await first;
    assert.equal(state.palette, brand.dark);
    assert.equal(state.font, brand.font);
    assert.equal(state.draft, 'Keep this text');
    assert.equal(state.scroll, 240);
    const next = h.api.toggle(); h.captures[1].run(); await tick();
    h.animations[0].complete(); await tick(); h.captures[1].complete(); await next;
    assert.equal(state.palette, brand.light);
    assert.equal(h.root.dataset.theme, 'light');
    h.api.destroy();
  });
}

for (const options of [{ supported: false }, { noAnimate: true }, { reduced: true }, { throws: true }]) {
  test(`immediate palette fallback: ${JSON.stringify(options)}`, async () => {
    const h = harness(options);
    await h.api.toggle();
    assert.equal(h.root.dataset.theme, 'dark');
    assert.equal(h.root.dataset.themeMotion, undefined);
    assert.equal(h.api.active, false);
  });
}

test('rapid input before capture uses latest intent and never creates another capture', async () => {
  const h = harness();
  const first = h.api.toggle();
  for (let n = 0; n < 9; n++) await h.api.toggle();
  assert.equal(h.captures.length, 1);
  assert.equal(h.root.dataset.theme, 'light');
  assert.equal(h.api.active, true);
  h.captures[0].run(); h.captures[0].complete(); await first;
  assert.equal(h.animations.length, 0);
  assert.equal(h.api.active, false);
  assert.equal(h.root.dataset.theme, 'light');
});

test('rapid reversal cancels the running animation and retains capture ownership until finished', async () => {
  const h = harness(); const first = h.api.toggle(); h.captures[0].run(); await tick();
  await h.api.toggle(); await h.api.toggle();
  assert.equal(h.animations[0].cancelled, true);
  assert.equal(h.captures.length, 1);
  assert.equal(h.root.dataset.theme, 'dark');
  assert.equal(h.api.active, true);
  h.captures[0].complete(); await first;
  assert.equal(h.api.active, false);
  assert.equal(h.root.dataset.themeMotion, undefined);
});

for (const event of ['window:resize', 'document:visibilitychange', 'media:change']) {
  test(`${event} settles an active reveal`, async () => {
    const h = harness(); const task = h.api.toggle(); h.captures[0].run(); await tick();
    h.document.hidden = true; h.media.matches = true;
    h.handlers.get(event)({ matches: true });
    assert.equal(h.animations[0].cancelled, true);
    h.captures[0].complete(); await task;
    assert.equal(h.root.dataset.theme, 'dark');
    assert.equal(h.api.active, false);
    assert.equal(h.root.dataset.themeMotion, undefined);
  });
}

test('normal completion releases the filled animation and keeps theme changes repeatable', async () => {
  const h = harness(); const task = h.api.toggle(); h.captures[0].run(); await tick();
  const animation = h.animations[0];
  assert.equal(animation.options.duration, 720);
  assert.equal(animation.frames.length, 21);
  assert.equal(animation.frames[0].clipPath.split(',').length, 64);
  assert.equal(animation.frames[0].offset, 0);
  assert.equal(animation.frames.at(-1).offset, 1);
  assert.doesNotMatch(JSON.stringify(animation.frames), /NaN|Infinity/);
  animation.complete(); await tick();
  assert.equal(animation.cancelled, true);
  h.captures[0].complete(); await task;
  assert.equal(h.api.active, false);
  const second = h.api.toggle();
  assert.equal(h.captures.length, 2);
  h.api.settle(); h.captures[1].run(); h.captures[1].complete(); await second;
  assert.equal(h.root.dataset.theme, 'light');
});

test('a skipped capture still applies the requested palette and cleans up', async () => {
  const h = harness(); const task = h.api.toggle();
  h.captures[0].rejectReady(); h.captures[0].complete(); await task;
  assert.equal(h.root.dataset.theme, 'dark'); assert.equal(h.api.active, false);
});

test('unsupported pseudo-element animation settles without retaining a snapshot', async () => {
  const h = harness({ animateThrows: true }); const task = h.api.toggle(); h.captures[0].run(); await tick();
  assert.equal(h.captures[0].skipped, true);
  h.captures[0].complete(); await task;
  assert.equal(h.root.dataset.theme, 'dark'); assert.equal(h.api.active, false);
});

test('pointer interruption resolves one host action without a synthetic click', async () => {
  const h = harness(); const task = h.api.toggle(); h.captures[0].run(); await tick();
  let focused = 0, clicked = 0;
  const button = { closest: () => button, focus() { focused++; }, click() { clicked++; } };
  h.document.elementFromPoint = () => button;
  const event = { target: h.root, detail: 1, clientX: 10, clientY: 10 };
  assert.equal(h.api.resolveClick(event), button);
  assert.equal(focused, 1); assert.equal(clicked, 0);
  h.captures[0].complete(); await task;
});

test('keyboard activation keeps its actual target and does not use pointer coordinates', async () => {
  const h = harness(); const task = h.api.toggle();
  const target = {}; h.document.elementFromPoint = () => { throw new Error('keyboard must not hit-test'); };
  assert.equal(h.api.resolveClick({ target, detail: 0 }), target);
  h.captures[0].run(); h.captures[0].complete(); await task;
});

test('destroy before ready removes listeners and prevents late palette updates', async () => {
  const h = harness(); const task = h.api.toggle(); h.api.destroy();
  const updates = h.applied.length;
  assert.equal(h.handlers.size, 0); assert.equal(h.root.dataset.theme, 'dark');
  h.captures[0].run(); h.captures[0].complete(); await task;
  await h.api.toggle(); h.api.destroy();
  assert.equal(h.applied.length, updates); assert.equal(h.api.active, false);
});

test('destroy during a reveal cancels the animation and removes listeners', async () => {
  const h = harness(); const task = h.api.toggle(); h.captures[0].run(); await tick();
  h.api.destroy(); assert.equal(h.animations[0].cancelled, true); assert.equal(h.handlers.size, 0);
  h.captures[0].complete(); await task;
  assert.equal(h.root.dataset.themeMotion, undefined);
});

test('invalid integration contract is rejected before installing another controller', () => {
  const h = harness();
  assert.throws(() => h.context.mountInkTheme({ initialTheme: 'auto', applyTheme() {} }), /light\/dark/);
  assert.throws(() => h.context.mountInkTheme({ initialTheme: 'light' }), /callback/);
});
