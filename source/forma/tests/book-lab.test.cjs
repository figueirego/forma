const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const BookObject = require('../assets/book-object.js');
const BookPreset = require('../assets/book-preset.js');
const script = fs.readFileSync(require.resolve('../assets/book-lab.js'), 'utf8');
const html = fs.readFileSync(require.resolve('../assets/book-lab.html'), 'utf8');

// Execute the actual controller, replacing only module-host primitives so this
// fixture needs no browser or experimental VM modules. This is not GPU proof.
function labFixture(moduleUrl = 'http://127.0.0.1:4192/source/forma/assets/book-lab.js') {
  const elements = new Map(), imports = [], creates = [], events = new Map();
  let fontReady = false, resolveFont, rejectFont;
  const pendingFont = new Promise((resolve, reject) => { resolveFont = resolve; rejectFont = reject; });
  function node(selector) {
    if (!elements.has(selector)) elements.set(selector, {
      disabled: false, hidden: true, value: '', textContent: '', dataset: {}, style: {},
      events: new Map(), attributes: {},
      querySelector() { return null; },
      getBoundingClientRect() { return { width: 320, height: 422.323488 }; },
      addEventListener(name, callback) { this.events.set(name, callback); },
      setAttribute(name, value) { this.attributes[name] = value; }
    });
    return elements.get(selector);
  }
  const controls = [...html.matchAll(/<(?:button|input|select)\b[^>]*\bid="([^"]+)"/g)]
    .map(match => node('#' + match[1]));
  assert.ok(controls.length > 10, 'The fixture must include the actual lab controls');
  const document = {
    querySelector: node,
    querySelectorAll(selector) { assert.equal(selector, 'button,input,select'); return controls; },
    documentElement: { dataset: {} }, body: { dataset: {} },
    fonts: {
      load(spec) { assert.equal(spec, '500 14px "Inter Variable"'); return pendingFont; },
      check() { return fontReady; }
    }
  };
  const window = { addEventListener(name, callback) { events.set(name, callback); } };
  const preset = {
    config: BookPreset.config,
    create(host, config, options) {
      assert.equal(host, node('#book-stage'));
      assert.equal(fontReady, true, 'Texture creation must wait for the approved font');
      let current = BookObject.normalize(config);
      const object = {
        update(patch) { current = BookObject.normalize(patch, current); },
        reset() {}, setPose() {}, dispose() {},
        get config() { return current; },
        get renderMode() { return 'canvas'; }
      };
      creates.push({ config, options, object });
      return object;
    }
  };
  const context = {
    document, window, BookObject, BookPreset: preset, URL,
    MutationObserver: class { observe() {} disconnect() {} },
    innerWidth: 1280, innerHeight: 950, devicePixelRatio: 1,
    __moduleUrl: moduleUrl,
    __import: async url => { imports.push(url); return { REVISION: '186' }; }
  };
  const executable = script.replaceAll('import.meta.url', '__moduleUrl').replace(/\bimport\(/g, '__import(');
  const completion = vm.runInNewContext('(async () => {\n' + executable + '\n})()', context, { filename: 'book-lab.js' });
  return {
    controls, creates, imports, document, node,
    get api() { return window.__FORMA_BOOK_LAB__; },
    async ready(fonts = [{}]) { fontReady = fonts.length > 0; resolveFont(fonts); await completion; },
    async fail(error) { rejectFont(error); await completion; }
  };
}

test('book lab keeps every control disabled and avoids painting until the font is ready', async () => {
  const f = labFixture();
  await Promise.resolve();
  assert.ok(f.controls.every(control => control.disabled));
  assert.equal(f.creates.length, 0);
  assert.equal(f.imports.length, 0);
  assert.equal(f.api, undefined);
  await f.ready();
  assert.equal(f.creates.length, 1);
  assert.ok(f.controls.every(control => !control.disabled));
  assert.equal(f.node('#title').value, 'Meu espa\u00e7o');
  assert.equal(f.creates[0].config.depth, 0.254947088);
  assert.equal(f.api.snapshot().font, true);
  assert.equal(f.document.body.dataset.ready, 'false', 'A Canvas cover does not prove WebGL readiness');
});

test('a failed font leaves controls disabled and reports the failure without mounting a fallback font', async () => {
  const f = labFixture();
  await f.fail(new Error('Font network failure'));
  assert.equal(f.creates.length, 0);
  assert.equal(f.imports.length, 0);
  assert.ok(f.controls.every(control => control.disabled));
  assert.equal(f.node('#lab-error').hidden, false);
  assert.equal(f.node('#lab-error').textContent, 'Font network failure');
  assert.equal(f.api.book, undefined);
  assert.equal(f.api.snapshot().font, false);
  assert.equal(f.api.snapshot().errors[0], 'Font network failure');
});

test('an empty FontFaceSet result is also a failure, not successful text fidelity', async () => {
  const f = labFixture();
  await f.ready([]);
  assert.equal(f.creates.length, 0);
  assert.ok(f.controls.every(control => control.disabled));
  assert.match(f.node('#lab-error').textContent, /approved Inter font did not load/);
});

test('source, plugin and agent-skills consumers resolve the same repository Three dependency', async () => {
  for (const path of [
    'source/forma/assets/book-lab.js',
    'plugins/forma/assets/book-lab.js',
    'plugins/forma-claude/assets/book-lab.js',
    'distributions/agent-skills/forma/assets/book-lab.js'
  ]) {
    const f = labFixture('http://127.0.0.1:4192/project/' + path);
    await f.ready();
    const load = f.creates[0].options.loadThree;
    assert.equal(f.imports.length, 0, 'The adapter retains lazy dependency loading');
    assert.equal((await load()).REVISION, '186');
    await load();
    assert.deepEqual(f.imports, ['http://127.0.0.1:4192/project/node_modules/three/build/three.module.js'], path);
  }
});
