const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const BookObject = require('../assets/book-object.js');
const BookPreset = require('../assets/book-preset.js');

function fixture(overrides = {}, options = {}) {
  const calls = [];
  const host = {};
  let current, lightingPose, renderedPose, mode = 'canvas';
  const engine = {
    normalize: BookObject.normalize,
    create(receivedHost, config, rendererOptions) {
      assert.equal(receivedHost, host);
      current = config;
      lightingPose = { ...config.pose };
      renderedPose = { ...config.pose };
      calls.push(['create', config, rendererOptions]);
      return {
        update(patch) {
          calls.push(['update', patch]);
          current = BookObject.normalize(patch, current);
          if (patch.pose) {
            lightingPose = { ...current.pose };
            renderedPose = { ...current.pose };
          }
        },
        setPose(patch, settings) {
          calls.push(['setPose', patch, settings]);
          current = BookObject.normalize({ pose: patch }, current);
          renderedPose = { ...current.pose };
          if (!settings.preserveLighting) lightingPose = { ...current.pose };
        },
        dispose() { calls.push(['dispose']); mode = 'disposed'; },
        get config() { return current; },
        get renderMode() { return mode; }
      };
    }
  };
  const book = BookPreset.create(host, overrides, { ...options, bookObject: engine });
  return {
    book, calls,
    drag(pose) { renderedPose = { ...pose }; },
    get renderedPose() { return renderedPose; },
    get lightingPose() { return lightingPose; },
    setMode(value) { mode = value; }
  };
}

test('approved mechanical and material values replace generic defaults without changing BookObject', () => {
  const config = BookPreset.config();
  assert.deepEqual(
    [config.width, config.height, config.depth, config.pose],
    [1.84, 2.428360056, 0.254947088, { pitch: 28.65, yaw: 20.05, roll: -8.59 }]
  );
  assert.deepEqual(
    [config.color, config.inkColor, config.pagesColor, config.pattern, config.material, config.finish, config.brandMark],
    ['#4f5b3f', '#fbfbfc', '#f6f1e5', 'panels', 'cloth', 'foil', 'monogram']
  );
  assert.equal(config.title, 'Untitled');
  assert.equal(config.brand, 'FORMA');
  assert.equal(BookObject.normalize().depth, 0.36);
  assert.deepEqual(BookObject.normalize().pose, { pitch: 9, yaw: -18, roll: -2 });
});

test('explicit content and geometry adaptations remain bounded and independent', () => {
  const input = { title: 'Research', width: 2, pose: { yaw: 30 }, color: 'url(https://invalid.example)' };
  const config = BookPreset.config(input);
  assert.equal(config.title, 'Research');
  assert.equal(config.width, 2);
  assert.equal(config.color, '#4f5b3f');
  assert.deepEqual(config.pose, { pitch: 28.65, yaw: 30, roll: -8.59 });
  config.pose.pitch = 0;
  assert.equal(BookPreset.config().pose.pitch, 28.65);
  assert.deepEqual(input.pose, { yaw: 30 });
});

test('loader, interaction and raster options are host-owned and forwarded unchanged', () => {
  const loadThree = () => Promise.reject(new Error('Host decides when to load'));
  const { calls } = fixture({}, { loadThree, interactive: false, resolution: 'reference', renderScale: 2 });
  assert.deepEqual(calls[0][2], { loadThree, interactive: false, resolution: 'reference', renderScale: 2 });
  assert.deepEqual(fixture().calls[0][2], {});
});

test('inspection angles keep the creation-time lighting calibration', () => {
  const f = fixture();
  for (const yaw of [0, 90, 180, -90, -135]) {
    f.book.setPose({ yaw });
    assert.equal(f.book.config.pose.yaw, yaw);
    assert.equal(f.renderedPose.yaw, yaw);
    assert.deepEqual(f.lightingPose, { pitch: 28.65, yaw: 20.05, roll: -8.59 });
    assert.deepEqual(f.calls.at(-1)[2], { preserveLighting: true });
  }
});

test('replayed cover configuration cannot move the dragged book or change its lighting', () => {
  const f = fixture();
  f.drag({ pitch: 22, yaw: 117, roll: -8.59 });
  const replay = BookPreset.config({ title: 'Updated cover', color: '#315463', pattern: 'grid' });
  f.book.update(replay);
  assert.equal(f.book.config.title, 'Updated cover');
  assert.equal(f.book.config.color, '#315463');
  assert.equal(f.book.config.pattern, 'grid');
  assert.equal(Object.hasOwn(f.calls.at(-1)[1], 'pose'), false);
  assert.deepEqual(f.renderedPose, { pitch: 22, yaw: 117, roll: -8.59 });
  assert.deepEqual(f.lightingPose, { pitch: 28.65, yaw: 20.05, roll: -8.59 });
  const count = f.calls.length;
  f.book.update({ pose: { yaw: 0 } });
  f.book.update(null);
  assert.equal(f.calls.length, count);
});

test('reset restores original pose and calibration after inspection and preserves content', () => {
  const f = fixture({ pose: { yaw: 32 }, title: 'Original' });
  f.book.setPose({ pitch: -30, yaw: 180 });
  f.book.update({ title: 'Edited' });
  f.book.reset();
  assert.deepEqual(f.book.config.pose, { pitch: 28.65, yaw: 32, roll: -8.59 });
  assert.deepEqual(f.lightingPose, f.book.config.pose);
  assert.deepEqual(f.calls.at(-1)[2], { preserveLighting: false });
  assert.equal(f.book.config.title, 'Edited');
  const copy = f.book.config;
  copy.pose.yaw = -90;
  f.book.reset();
  assert.equal(f.book.config.pose.yaw, 32);
});

test('renderer state remains observable and disposal prevents late adapter calls', () => {
  const f = fixture();
  assert.equal(f.book.renderMode, 'canvas');
  f.setMode('webgl');
  assert.equal(f.book.renderMode, 'webgl');
  f.setMode('canvas-context-lost');
  assert.equal(f.book.renderMode, 'canvas-context-lost');
  f.book.dispose();
  f.book.dispose();
  const count = f.calls.length;
  f.book.update({ title: 'Too late' });
  f.book.setPose({ yaw: 90 });
  f.book.reset();
  assert.equal(f.calls.length, count);
  assert.equal(f.calls.filter(call => call[0] === 'dispose').length, 1);
  assert.equal(f.book.renderMode, 'disposed');
  assert.equal(f.book.config.title, 'Untitled');
});

test('browser distribution resolves BookObject explicitly and reports a missing engine', () => {
  const browser = {};
  vm.runInNewContext(fs.readFileSync(require.resolve('../assets/book-preset.js'), 'utf8'), browser);
  assert.throws(() => browser.BookPreset.config(), /requires BookObject/);
  browser.BookObject = BookObject;
  assert.equal(browser.BookPreset.config().depth, 0.254947088);
});
