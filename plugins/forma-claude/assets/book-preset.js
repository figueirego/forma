/* Approved book proportions and consumer behavior; rendering stays in BookObject. */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(() => require('./book-object.js'));
  } else {
    root.BookPreset = factory(() => root.BookObject);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (getEngine) {
  'use strict';

  const DEFAULTS = Object.freeze({
    title: 'Untitled',
    subtitle: '',
    brand: 'FORMA',
    brandMark: 'monogram',
    spineLabel: '',
    color: '#4f5b3f',
    inkColor: '#fbfbfc',
    pagesColor: '#f6f1e5',
    pattern: 'panels',
    material: 'cloth',
    finish: 'foil',
    width: 1.84,
    height: 2.428360056,
    depth: 0.254947088,
    pose: Object.freeze({ pitch: 28.65, yaw: 20.05, roll: -8.59 })
  });

  function engineFor(injected) {
    const engine = injected || getEngine();
    if (!engine || typeof engine.normalize !== 'function' || typeof engine.create !== 'function') {
      throw new TypeError('BookPreset requires BookObject. Load book-object.js first.');
    }
    return engine;
  }

  function normalized(engine, overrides) {
    return engine.normalize(overrides, engine.normalize(DEFAULTS));
  }

  function config(overrides = {}) {
    return normalized(engineFor(), overrides);
  }

  function create(host, overrides = {}, options = {}) {
    const { bookObject, ...rendererOptions } = options;
    const engine = engineFor(bookObject);
    const initial = normalized(engine, overrides);
    const rest = { ...initial.pose };
    const object = engine.create(host, initial, rendererOptions);
    let disposed = false;

    return {
      update(patch = {}) {
        if (disposed || !patch || typeof patch !== 'object') return;
        // Replaying a saved cover config must not reset the user's inspection angle.
        // Pose is controlled explicitly by setPose/reset, as in the approved consumer.
        const { pose, ...content } = patch;
        if (Object.keys(content).length) object.update(content);
      },
      setPose(patch = {}) {
        if (!disposed) object.setPose(patch, { preserveLighting: true });
      },
      reset() {
        // BookObject.reset() returns to the last inspected pose, not the initial one.
        if (!disposed) object.setPose({ ...rest }, { preserveLighting: false });
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        object.dispose();
      },
      get config() { return engine.normalize(object.config); },
      get renderMode() { return disposed ? 'disposed' : object.renderMode; }
    };
  }

  return Object.freeze({ config, create });
});
