// Original Forma adaptation of the approved theme-ink-2 preview. No dependencies.
const motion = Object.freeze({ duration: 720, points: 64, frames: 20 });

function inkFrames(width, height) {
  const x = width / 2, y = height / 2;
  const reach = Math.hypot(x, y) * 1.08;
  return Array.from({ length: motion.frames + 1 }, (_, frame) => {
    const progress = frame / motion.frames;
    const spread = progress * progress * (3 - 2 * progress);
    const radius = reach * spread;
    const ripple = Math.sin(Math.PI * progress) * .075;
    const points = Array.from({ length: motion.points }, (_, point) => {
      const angle = point / motion.points * Math.PI * 2;
      const wave = Math.sin(angle * 3 + progress * 5) + .45 * Math.sin(angle * 5 - progress * 6);
      const distance = radius * (1 + ripple * wave);
      return `${(x + Math.cos(angle) * distance).toFixed(2)}px ${(y + Math.sin(angle) * distance).toFixed(2)}px`;
    });
    return { clipPath: `polygon(${points.join(',')})`, offset: progress };
  });
}

/** Mount once per document. The host owns palette tokens, control labels and persistence. */
export function mountInkTheme({ initialTheme, applyTheme }) {
  if (!['light', 'dark'].includes(initialTheme) || typeof applyTheme !== 'function') {
    throw new TypeError('Supply a light/dark initialTheme and a synchronous applyTheme callback.');
  }
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let requestedTheme = initialTheme;
  let transition = null;
  let animation = null;
  let sequence = 0;
  let destroyed = false;

  function apply() {
    if (!destroyed) applyTheme(requestedTheme);
  }

  function settle() {
    if (destroyed) return;
    sequence++;
    animation?.cancel();
    transition?.skipTransition();
    // Retain ownership until finished resolves: rapid input must not overlap captures.
    apply();
    delete root.dataset.themeMotion;
  }

  async function toggle() {
    if (destroyed) return;
    requestedTheme = requestedTheme === 'dark' ? 'light' : 'dark';
    if (transition || reduced.matches || !document.startViewTransition || !root.animate) {
      settle();
      return;
    }
    const request = ++sequence;
    let capture;
    try {
      root.dataset.themeMotion = 'ink';
      capture = document.startViewTransition(apply);
      transition = capture;
      await capture.ready;
      if (destroyed || request !== sequence || reduced.matches) {
        capture.skipTransition();
        return;
      }
      const reveal = root.animate(inkFrames(innerWidth, innerHeight), {
        duration: motion.duration,
        easing: 'linear',
        fill: 'both',
        pseudoElement: '::view-transition-new(root)',
      });
      animation = reveal;
      await reveal.finished;
      reveal.cancel();
    } catch (error) {
      capture?.skipTransition();
      if (request === sequence) apply();
      if (error.name !== 'AbortError' && error.name !== 'InvalidStateError') {
        console.warn('Theme effect unavailable; the requested palette was applied.', error.name);
      }
    } finally {
      if (capture) await capture.finished.catch(() => {});
      if (!capture || transition === capture) {
        transition = null;
        animation = null;
        delete root.dataset.themeMotion;
      }
    }
  }

  function resolveClick(event) {
    let target = event.target;
    if (transition) {
      settle();
      // Root snapshots can receive the click. Dispatch the real action once in the host.
      if (event.detail > 0) {
        target = document.elementFromPoint(event.clientX, event.clientY) || target;
        target?.closest?.('button,a,input,select,textarea')?.focus({ preventScroll: true });
      }
    }
    return target;
  }

  const onReduced = event => { if (event.matches) settle(); };
  const onResize = () => { if (transition) settle(); };
  const onVisibility = () => { if (document.hidden && transition) settle(); };
  reduced.addEventListener('change', onReduced);
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);

  return {
    toggle,
    settle,
    resolveClick,
    get active() { return transition !== null; },
    destroy() {
      if (destroyed) return;
      settle();
      destroyed = true;
      reduced.removeEventListener('change', onReduced);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}
