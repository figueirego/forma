/* Same-origin adapter for the byte-preserved Neuron passport. No Three renderer. */
(function (root, factory) {
  'use strict';
  const scriptUrl = typeof document === 'undefined' ? '' : document.currentScript?.src || '';
  const api = factory(scriptUrl);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.NeuronPassport = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (scriptUrl) {
  'use strict';
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  const object = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const member = (patch, base, key) => own(patch, key) ? patch[key] : base[key];
  const text = (value, fallback, max) => typeof value === 'string' ? value.trim().slice(0, max) : fallback;
  const choice = (value, choices, fallback) => choices.includes(value) ? value : fallback;
  const LEVELS = ['zero', 'beginner', 'intermediate', 'advanced'];
  const copy = value => JSON.parse(JSON.stringify(value));
  // State is the host's JSON document. Preserve fields the passport does not own.
  function cloneStateData(value, seen = new Set(), depth = 0) {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (!value || typeof value !== 'object' || depth > 32 || seen.has(value)) throw new TypeError('Passport state must be finite, acyclic JSON data.');
    if (!Array.isArray(value) && Object.prototype.toString.call(value) !== '[object Object]') throw new TypeError('Passport state must contain only JSON objects and arrays.');
    seen.add(value);
    const result = Array.isArray(value) ? [] : {};
    for (const key of Object.keys(value)) Object.defineProperty(result, key, { value: cloneStateData(value[key], seen, depth + 1), enumerable: true, configurable: true, writable: true });
    seen.delete(value);
    return result;
  }

  function normalizeState(input = {}, previous = {}) {
    const patch = cloneStateData(object(input)), base = cloneStateData(object(previous));
    const profilePatch = object(patch.profile), profileBase = object(base.profile);
    const passportPatch = object(patch.passport), passportBase = object(base.passport);
    const englishPatch = object(object(patch.profiles).en), englishBase = object(object(base.profiles).en);
    const profile = {
      ...profileBase, ...profilePatch,
      name: text(member(profilePatch, profileBase, 'name'), '', 100),
      goal: text(member(profilePatch, profileBase, 'goal'), '', 280),
      level: choice(member(profilePatch, profileBase, 'level'), LEVELS, 'zero'),
    };
    const photo = member(passportPatch, passportBase, 'photo');
    const country = member(passportPatch, passportBase, 'country');
    return {
      ...base, ...patch,
      language: choice(member(patch, base, 'language'), ['en', 'fr', 'ja'], 'en'),
      profile,
      passport: {
        ...passportBase, ...passportPatch,
        country: typeof country === 'string' && /^[A-Z]{2}$/.test(country) ? country : '',
        nativeLanguage: text(member(passportPatch, passportBase, 'nativeLanguage'), 'Portugu\u00eas', 60),
        bio: text(member(passportPatch, passportBase, 'bio'), '', 180),
        photo: typeof photo === 'string' && photo.length <= 700000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(photo) ? photo : '',
      },
      profiles: { ...object(base.profiles), ...object(patch.profiles), en: {
        ...englishBase, ...englishPatch,
        goal: text(member(englishPatch, englishBase, 'goal'), profile.goal, 280),
        level: choice(member(englishPatch, englishBase, 'level'), LEVELS, profile.level),
      } },
      savedWords: own(patch, 'savedWords') ? patch.savedWords : base.savedWords || [],
      practiceLog: own(patch, 'practiceLog') ? patch.practiceLog : base.practiceLog || [],
    };
  }

  function normalize(input = {}, previous = {}) {
    const patch = object(input), base = object(previous);
    const page = member(patch, base, 'page');
    return {
      state: normalizeState(patch.state, base.state),
      theme: choice(member(patch, base, 'theme'), ['light', 'dark', 'system'], 'light'),
      material: choice(member(patch, base, 'material'), ['dimensional', 'flat'], 'dimensional'),
      motion: choice(member(patch, base, 'motion'), ['system', 'reduced'], 'system'),
      contrast: choice(member(patch, base, 'contrast'), ['normal', 'high'], 'normal'),
      accent: choice(member(patch, base, 'accent'), ['sage', 'blue', 'amber'], 'sage'),
      density: choice(member(patch, base, 'density'), ['comfortable', 'compact'], 'comfortable'),
      interaction: choice(member(patch, base, 'interaction'), ['direct', 'modes'], 'direct'),
      layout: choice(member(patch, base, 'layout'), ['object', 'reference', 'settings'], 'object'),
      controls: choice(member(patch, base, 'controls'), ['native', 'host'], 'native'),
      page: Number.isInteger(page) ? Math.max(0, Math.min(2, page)) : 0,
    };
  }

  function frameURL(document, assetBaseUrl) {
    const location = new URL(document.baseURI);
    const base = assetBaseUrl ? new URL(assetBaseUrl, location) : scriptUrl ? new URL('.', scriptUrl) : null;
    if (!base) throw new TypeError('Supply assetBaseUrl when NeuronPassport is bundled.');
    const url = new URL('neuron-passport/frame.html', base);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== location.origin) {
      throw new TypeError('NeuronPassport assets must be served from the same HTTP(S) origin as the host.');
    }
    return url.href;
  }

  /** onSave is synchronous. onSaveAsync awaits a durable true acknowledgement. Use one. */
  function create(host, input = {}, options = {}) {
    if (!host?.ownerDocument?.defaultView) throw new TypeError('NeuronPassport requires a DOM host.');
    if (typeof options.onSave === 'function' && typeof options.onSaveAsync === 'function') throw new TypeError('Choose onSave or onSaveAsync, not both.');
    const document = host.ownerDocument, view = document.defaultView;
    const url = frameURL(document, options.assetBaseUrl);
    const element = document.createElement('iframe');
    element.className = 'forma-neuron-passport';
    element.title = 'Passaporte interativo do Neuron';
    element.setAttribute('aria-label', 'Passaporte interativo do Neuron');
    element.style.cssText = 'display:block;width:100%;height:100%;min-width:0;border:0;background:transparent;';
    let config = normalize(input), disposed = false, mounted = false, failure = null, frame = null, loads = 0;
    let revision = 0, sequence = 0, pending = null;
    let persistence = { status: 'idle', requestId: null, error: null };
    let viewport = null;
    const setColorScheme = theme => { element.style.colorScheme = theme === 'dark' ? 'dark' : 'light'; };
    setColorScheme(config.theme === 'system' ? view.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : config.theme);
    const resizeObserver = typeof view.ResizeObserver === 'function' ? new view.ResizeObserver(entries => {
      const box = entries.find(entry => entry.target === host)?.contentRect;
      if (!box || !Number.isFinite(box.width) || !Number.isFinite(box.height)) return;
      viewport = { width: Math.max(0, box.width), height: Math.max(0, box.height) };
      if (mounted && !disposed) frame.resize?.(viewport);
    }) : null;
    let resolveReady, rejectReady;
    const ready = new Promise((resolve, reject) => { resolveReady = resolve; rejectReady = reject; });
    // Consumers still receive rejection when awaiting ready; early disposal must not leak one.
    ready.catch(() => {});
    const timeout = view.setTimeout(() => fail(new Error('Neuron passport frame did not become ready.')), 15000);
    function fail(error) {
      if (disposed || failure) return;
      failure = error.message;
      view.clearTimeout(timeout);
      element.dataset.renderer = 'unavailable';
      rejectReady(error);
    }
    function notify(callback, ...args) {
      if (disposed || typeof callback !== 'function') return;
      try { return callback(...args); }
      catch { failure = 'A host callback failed.'; return false; }
    }
    const bridge = {
      save(nextState, patch) {
        if (disposed || pending || typeof options.onSaveAsync === 'function') return false;
        const candidate = normalizeState(nextState);
        let result = true;
        try {
          if (typeof options.onSave === 'function') result = options.onSave(copy(candidate), copy(patch));
        } catch { failure = 'The host could not save this profile.'; return false; }
        if (result && typeof result.then === 'function') {
          // The original controller consumes a synchronous boolean, not Promise truthiness.
          Promise.resolve(result).catch(() => {});
          failure = 'onSave must return a synchronous boolean; no data was committed.';
          return false;
        }
        if (result !== true) return false;
        config.state = candidate;
        revision++;
        return true;
      },
      saveAsync: typeof options.onSaveAsync === 'function' ? async (nextState, patch) => {
        if (disposed || pending) return false;
        const candidate = normalizeState(nextState);
        const operation = { id: ++sequence, revision, candidate, acknowledged: false, controller: new AbortController() };
        pending = operation;
        persistence = { status: 'pending', requestId: operation.id, error: null };
        let acknowledged = false, error = null;
        try {
          const result = options.onSaveAsync(copy(candidate), copy(patch), { signal: operation.controller.signal, requestId: operation.id });
          if (!result || typeof result.then !== 'function') error = 'onSaveAsync must return a Promise<boolean>.';
          else if (await result === true) acknowledged = true;
          else error = 'The host did not acknowledge this save. Your draft is retained.';
        } catch { error = 'The host could not save this profile. Your draft is retained.'; }
        if (disposed || pending !== operation) return false;
        if (operation.revision !== revision) {
          acknowledged = false;
          error = 'Host state changed while saving. Review the retained draft and retry.';
        }
        if (acknowledged) {
          // The frame consumes this acknowledgement through the original save path.
          // Keep the operation pending until that path rechecks the host revision.
          operation.acknowledged = true;
          return true;
        }
        pending = null;
        persistence = { status: 'error', requestId: operation.id, error };
        return false;
      } : undefined,
      acceptAsync(nextState) {
        const operation = pending;
        if (disposed || !operation?.acknowledged) return false;
        pending = null;
        if (operation.revision !== revision || JSON.stringify(normalizeState(nextState)) !== JSON.stringify(operation.candidate)) {
          persistence = { status: 'error', requestId: operation.id, error: 'Host state changed while saving. Review the retained draft and retry.' };
          return false;
        }
        config.state = operation.candidate;
        revision++;
        persistence = { status: 'committed', requestId: operation.id, error: null };
        return true;
      },
      cancelAsync() {
        if (disposed || !pending) return;
        const requestId = pending.id;
        pending.controller.abort();
        pending = null;
        persistence = { status: 'error', requestId, error: 'The saved draft changed before it could be applied. Review and retry.' };
      },
      saveStatus: () => ({ ...persistence }),
      navigate: destination => notify(options.onNavigate, destination),
      toast: message => notify(options.onToast, message),
      requestClose: () => notify(options.onRequestClose),
      policyChanged: policy => { if (!disposed) setColorScheme(policy.theme); },
      icon: typeof options.icon === 'function' ? options.icon : undefined,
    };
    function loaded() {
      if (disposed) return;
      loads++;
      try {
        const nextFrame = element.contentWindow?.NeuronPassportFrame;
        if (!nextFrame?.initialize) throw new Error('Neuron passport assets could not be loaded.');
        frame = nextFrame;
        config = frame.initialize(config, bridge);
        mounted = true;
        if (viewport) frame.resize?.(viewport);
        element.dataset.renderer = 'css-articulated';
        view.clearTimeout(timeout);
        resolveReady(instance);
      } catch (error) { fail(error); }
    }
    function update(patch = {}) {
      if (disposed) return false;
      const next = normalize(patch, config);
      // A structural remount would discard the open editor and its pending draft.
      if (pending && (next.interaction !== config.interaction || next.layout !== config.layout)) return false;
      if (own(object(patch), 'state')) {
        revision++;
        pending?.controller.abort();
      }
      config = next;
      if (mounted) config = frame.update(config, { pageExplicit: own(object(patch), 'page'), stateExplicit: own(object(patch), 'state') });
      return true;
    }
    function setPage(page) {
      if (!Number.isInteger(page) || page < 0 || page > 2) throw new RangeError('Page must be 0, 1 or 2.');
      return update({ page });
    }
    function dispose() {
      if (disposed) return;
      disposed = true;
      pending?.controller.abort();
      pending = null;
      persistence = { ...persistence, status: 'disposed' };
      view.clearTimeout(timeout);
      resizeObserver?.disconnect();
      element.removeEventListener('load', loaded);
      element.removeEventListener('error', loadError);
      frame?.dispose();
      frame = null;
      element.remove();
      if (!mounted) rejectReady(new Error('Neuron passport was disposed before it became ready.'));
    }
    function loadError() { fail(new Error('Neuron passport frame could not be loaded.')); }
    const instance = {
      ready, update, setPage,
      next() { return setPage(Math.min(2, Number(frame?.diagnostics().page ?? config.page) + 1)); },
      previous() { return setPage(Math.max(0, Number(frame?.diagnostics().page ?? config.page) - 1)); },
      openSkins() { if (!disposed && mounted && !pending) frame.controller.openSkins(); },
      openEditor() { if (!disposed && mounted && !pending) frame.openEditor(); },
      focus() { if (!disposed && mounted) frame.focus(); },
      dispose,
      get element() { return element; },
      get frameWindow() { return disposed ? null : element.contentWindow; },
      get controller() { return disposed ? null : frame?.controller || null; },
      get renderMode() { return disposed ? 'disposed' : mounted ? 'css-articulated' : failure ? 'unavailable' : 'loading'; },
      get state() { return copy(frame?.state || config.state); },
      get config() { return copy(frame?.config || config); },
      get diagnostics() { return { ...frame?.diagnostics(), renderer: instance.renderMode, mounted, disposed, loads, failure, persistence: typeof options.onSaveAsync === 'function' ? 'async-host-callback' : typeof options.onSave === 'function' ? 'host-callback' : 'memory-only', save: { ...persistence } }; },
    };
    element.addEventListener('load', loaded);
    element.addEventListener('error', loadError);
    element.src = url;
    host.append(element);
    resizeObserver?.observe(host);
    return instance;
  }
  return Object.freeze({ create, normalize, normalizeState, frameURL, renderMode: 'css-articulated' });
});
