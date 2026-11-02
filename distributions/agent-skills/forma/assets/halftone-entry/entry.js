/* Original Forma adaptation. No reference artwork or product requests. */
export function mountEntry(root) {
  const panel = root.querySelector('[data-entry-panel]');
  const brand = root.querySelector('[data-entry-brand]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let animations = [], disposed = false;
  const settle = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
    root.dataset.entryState = 'ready';
  };
  function play() {
    settle();
    if (disposed || reduce.matches || !panel.animate) return;
    const shell = root.getBoundingClientRect();
    const target = panel.getBoundingClientRect();
    const label = brand.getBoundingClientRect();
    root.dataset.entryState = 'entering';
    const options = {duration: 1100, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards'};
    // Animate the decorative panel independently so the wordmark is never stretched.
    animations.push(panel.animate([
      {width: `${shell.width}px`, height: `${shell.height}px`},
      {width: `${target.width}px`, height: `${target.height}px`}
    ], options));
    animations.push(brand.animate([
      {transform: `translate(${shell.width / 2 - (label.left - shell.left) - label.width / 2}px, ${shell.height / 2 - (label.top - shell.top) - label.height / 2}px) scale(1.8)`},
      {transform: 'none'}
    ], options));
    root.querySelectorAll('[data-entry-item]').forEach((item, index) => {
      animations.push(item.animate([{opacity: 0, transform: 'translateY(8px)'}, {opacity: 1, transform: 'none'}],
        {duration: 240, delay: 700 + index * 65, fill: 'backwards'}));
    });
    const current = animations;
    Promise.all(current.map(animation => animation.finished)).then(() => {
      if (animations === current) settle();
    }).catch(() => {}); // Cancellation is expected on replay, resize and disposal.
  }
  const onKey = event => { if (event.key === 'Escape' || event.key === 'Tab') settle(); };
  const onVisibility = () => { if (document.hidden) settle(); };
  root.addEventListener('pointerdown', settle);
  document.addEventListener('keydown', onKey);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('resize', settle);
  reduce.addEventListener('change', settle);
  return {play, skip: settle, destroy() {
    disposed = true; settle();
    root.removeEventListener('pointerdown', settle);
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('resize', settle);
    reduce.removeEventListener('change', settle);
  }};
}

export function drawHalftone(canvas, {mode = 'fine', ink = '#dd521e', shadow = '#93705b'} = {}) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const {width, height} = canvas.getBoundingClientRect();
  if (!width || !height) return;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  const pitch = Math.max(mode === 'fine' ? 3 : 10, Math.sqrt(width * height / 70000));
  for (let layer = 0; layer < 2; layer++) {
    context.fillStyle = layer ? ink : shadow;
    for (let y = pitch / 2; y < height; y += pitch) {
      for (let x = pitch / 2; x < width; x += pitch) {
        const ridge = height * (.25 + layer * .35 + .11 * Math.sin(x / width * 9 + layer) + .07 * Math.cos(x / width * 19));
        const depth = Math.max(0, Math.min(1, (y - ridge) / (height * .3)));
        if (!depth) continue;
        const radius = pitch * .45 * depth * (.85 + .15 * Math.sin(x * .023 + y * .03));
        context.beginPath(); context.arc(x, y, radius, 0, 2 * Math.PI); context.fill();
      }
    }
  }
}
