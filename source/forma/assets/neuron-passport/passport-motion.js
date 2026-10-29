const PASSPORT_MOTION = Object.freeze({ stiffness: 155, damping: 25, rest: .002, turnSegments: 18, dragThreshold: 5, zoomMin: .75, zoomMax: 1.5 });
// Pauta BookObject view response; the articulated pages retain their existing spring.
const PASSPORT_DIRECT_MOTION = Object.freeze({ responseMs: 120, yawPerPixel: .42, hoverYaw: 11, hoverPitch: 7, dragPitch: 11.2, pitchLimit: 24, pitchRest: .014, angleRest: .05 });
export const clampPassport = (value, min, max) => Math.min(max, Math.max(min, value));
export const PASSPORT_GEOMETRY = Object.freeze({ backZ: -1.825, coverClosedZ: 2.465, leafClosedZ: 2.02, leafOpenZ: -1.45, leafHalfThickness: .12, coverHalfThickness: .225, blockBottom: -1.5, blockTop: 1.5, baseZ: 1.72, spineInset: 4, coverRootRadius: 0, coverCornerRadius: 13, paperInset: 1.5, foreedgeInset: 1.5, gutterWidth: 28, jointOverlap: 1.15, spineSegments: 12, cornerSegments: 6, triangleSize: 32 });

// Both ends of the flexible spine share the actual cover hinges, even while opening.
export function passportHingeGeometry(cover, leaf) {
  const g = PASSPORT_GEOMETRY, open = clampPassport(cover, 0, 1);
  const coverRadius = (g.coverClosedZ - g.backZ) / 2;
  const coverX = -coverRadius * Math.sin(Math.PI * open);
  const coverZ = (g.coverClosedZ + g.backZ) / 2 + coverRadius * Math.cos(Math.PI * open);
  const leafZ = g.leafClosedZ + (g.leafOpenZ - g.leafClosedZ) * clampPassport(leaf, 0, 1);
  const centerZ = (g.coverClosedZ + g.backZ) / 2, sweep = Math.PI * (1 - open);
  // Concentric skins follow the same hinge arc as the covers. Their radial
  // separation is the cover thickness, with no offset cusp as the book opens.
  const surface = radius => {
    const point = t => ({ x: -radius * Math.sin(t * sweep), z: centerZ - radius * Math.cos(t * sweep) });
    const pieces = Array.from({ length: g.spineSegments }, (_, i) => {
      const a = point(i / g.spineSegments), b = point((i + 1) / g.spineSegments);
      return { ...a, width: Math.hypot(b.x - a.x, b.z - a.z), angle: -Math.atan2(b.z - a.z, b.x - a.x) * 180 / Math.PI };
    });
    return { pieces, start: point(0), end: point(1) };
  };
  // Twelve chords deviate less than .025 CSS px, including the closed half-circle.
  const outer = surface(coverRadius + g.coverHalfThickness), inner = surface(coverRadius - g.coverHalfThickness);
  return { coverX, coverZ, leafZ, spine: outer.pieces, spineStart: outer.start, spineEnd: outer.end,
    spineInner: inner.pieces, spineInnerStart: inner.start, spineInnerEnd: inner.end };
}

// The same fold section continues to the cut plane; neither root bends down.
export function passportSpineTerminal(cover, side, steps = PASSPORT_GEOMETRY.cornerSegments, inner = false) {
  const geometry = passportHingeGeometry(cover, 0), radius = PASSPORT_GEOMETRY.spineInset;
  const outline = inner ? [...geometry.spineInner, geometry.spineInnerEnd] : [...geometry.spine, geometry.spineEnd];
  const rings = Array.from({ length: steps + 1 }, (_, row) => {
    const y = side * radius * Math.sin(row / steps * Math.PI / 2);
    return outline.map(p => ({ x: p.x, y, z: p.z }));
  });
  const triangles = [];
  for (let row = 0; row < steps; row++) {
    for (let col = 0; col < outline.length - 1; col++) {
      const a = rings[row][col], b = rings[row][col + 1], c = rings[row + 1][col + 1], d = rings[row + 1][col];
      triangles.push({ a, b, c }, { a, b: c, c: d });
    }
  }
  return { triangles, cap: rings.at(-1) };
}

// A sewn root stays on the block; only the flexible gutter and the sheet beyond it move.
function passportBindingCurve(anchor, end, controlA, controlB, arch = null, count = 12) {
  const point = t => {
    const u = 1 - t;
    // Peak at one quarter of the margin; the outer join keeps its flat tangent.
    const crest = t * u**3 * (256 / 27);
    return { x: u**3*anchor.x + 3*u*u*t*controlA.x + 3*u*t*t*controlB.x + t**3*end.x + (arch?.x ?? 0) * crest,
      z: u**3*anchor.z + 3*u*u*t*controlA.z + 3*u*t*t*controlB.z + t**3*end.z + (arch?.z ?? 0) * crest };
  };
  return Array.from({ length: count }, (_, i) => {
    // Concentrate the same faces at both joins, where a long chord exposes a kink.
    const sourceStart = (1 - Math.cos(Math.PI * i / count)) / 2;
    const sourceEnd = (1 - Math.cos(Math.PI * (i + 1) / count)) / 2;
    const a = point(sourceStart), b = point(sourceEnd);
    return { ...a, width: Math.hypot(b.x - a.x, b.z - a.z), angle: -Math.atan2(b.z - a.z, b.x - a.x) * 180 / Math.PI, sourceStart, sourceEnd };
  });
}

export function passportLeafBinding(progress, width = PASSPORT_GEOMETRY.gutterWidth, coverProgress = 1) {
  const p = clampPassport(progress, 0, 1), angle = -Math.PI * p;
  const anchor = { x: 0, z: PASSPORT_GEOMETRY.leafClosedZ };
  const end = { x: width * Math.cos(angle), z: passportHingeGeometry(1, p).leafZ - width * Math.sin(angle) };
  const reach = width / 3;
  // At the seam the paper lifts before bending toward the resting left-hand cover.
  const controlA = { x: reach * Math.cos(angle), z: anchor.z - reach * Math.sin(angle) };
  const sheetTangent = passportPageCurve(p, 1)[0].angle * Math.PI / 180;
  const controlB = { x: end.x - reach * Math.cos(sheetTangent), z: end.z + reach * Math.sin(sheetTangent) };
  // The closed cover has no spare height for an arch. During the turn, taper the
  // resting shoulder so the existing sheet endpoint and drag projection stay put.
  const reveal = Math.sin(Math.PI * clampPassport(coverProgress, 0, 1) / 2) ** 4;
  const lift = (6 + Math.max(0, anchor.z - end.z) * 5 / 32) * reveal * Math.cos(Math.PI * p) ** 2;
  return { anchor, end, width, segments: passportBindingCurve(anchor, end, controlA, controlB, { x: 0, z: lift }) };
}

export function passportBaseBinding(coverProgress = 1, width = PASSPORT_GEOMETRY.gutterWidth) {
  const g = PASSPORT_GEOMETRY, anchor = { x: 0, z: g.leafClosedZ }, end = { x: width, z: g.baseZ };
  const controlA = { x: width / 3, z: anchor.z }, controlB = { x: width * 2 / 3, z: end.z };
  const reveal = Math.sin(Math.PI * clampPassport(coverProgress, 0, 1) / 2) ** 4;
  // This underlying page must stay below the data leaf, including near the seam.
  const lift = 6 * reveal;
  return { anchor, end, width, segments: passportBindingCurve(anchor, end, controlA, controlB, { x: 0, z: lift }) };
}

export function passportCoverBinding(progress) {
  const p = clampPassport(progress, 0, 1), angle = -Math.PI * p, g = PASSPORT_GEOMETRY;
  const anchor = { x: 0, z: g.leafClosedZ };
  const cover = passportHingeGeometry(p, 0);
  // The endpaper bends over its inner margin, not into a vertical wall at the hinge.
  // This margin collapses under the closed cover without changing the outer shell.
  const margin = g.gutterWidth * (1 - Math.cos(Math.PI * p)) / 2;
  const end = { x: cover.coverX - g.coverHalfThickness * Math.sin(angle) + margin * Math.cos(angle),
    z: cover.coverZ - g.coverHalfThickness * Math.cos(angle) - margin * Math.sin(angle) };
  const reach = Math.max(margin / 3, Math.abs(end.z - anchor.z) / 3);
  const normal = { x: -Math.sin(angle), z: -Math.cos(angle) };
  const clearance = (anchor.x - end.x) * normal.x + (anchor.z - end.z) * normal.z;
  // A wide margin must not pull its first control through the moving cover plane.
  const seamReach = Math.min(reach, Math.max(0, clearance) / Math.max(1e-9, Math.cos(Math.PI * p / 2)));
  const controlA = { x: -seamReach * Math.sin(Math.PI * p / 2), z: anchor.z + seamReach * Math.cos(Math.PI * p / 2) };
  const controlB = { x: end.x - margin / 3 * Math.cos(angle), z: end.z + margin / 3 * Math.sin(angle) };
  // Keep the lining's shoulder below the turned leaf rather than compensating
  // its lower endpoint with a taller arch that would cross the sheet.
  const lift = 6 * Math.sin(Math.PI * p / 2) ** 4;
  return { anchor, end, margin, segments: passportBindingCurve(anchor, end, controlA, controlB, { x: normal.x * lift, z: normal.z * lift }) };
}

// Extrude the same rounded outline used by the two faces: every corner has a wall.
export function passportRoundedRim(width, height, leftRadius, rightRadius, steps = PASSPORT_GEOMETRY.cornerSegments) {
  const limit = Math.min(width, height) / 2;
  const left = clampPassport(leftRadius, 0, limit), right = clampPassport(rightRadius, 0, limit);
  const points = [{ x: left, y: 0 }, { x: width - right, y: 0 }];
  const arc = (cx, cy, radius, start) => {
    for (let i = 1; i <= steps; i++) {
      const angle = start + Math.PI / 2 * i / steps;
      points.push({ x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) });
    }
  };
  arc(width - right, right, right, -Math.PI / 2);
  points.push({ x: width, y: height - right });
  arc(width - right, height - right, right, 0);
  points.push({ x: left, y: height });
  arc(left, height - left, left, Math.PI / 2);
  points.push({ x: 0, y: left });
  arc(left, left, left, Math.PI);
  return points.slice(0, -1).map((a, i) => {
    const b = points[i + 1];
    return { ...a, width: Math.hypot(b.x - a.x, b.y - a.y), angle: Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI };
  });
}

// Project the dragged edge onto a hinge arc instead of converting pixels to a timed swipe.
export function passportTurnProgress(start, dx, width) {
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(dx)) return start;
  return Math.acos(clampPassport(Math.cos(Math.PI * start) + dx / width, -1, 1)) / Math.PI;
}

export function passportTurnDestination(progress, velocity) {
  if (progress <= .12) return 0;
  if (progress >= .88) return 1;
  return clampPassport(progress + velocity * 160, 0, 1) >= .5 ? 1 : 0;
}

// Each strip preserves its width. Integrating its tangent bends the sheet without stretching its print.
export function passportPageCurve(progress, width, segments = PASSPORT_MOTION.turnSegments) {
  const p = clampPassport(progress, 0, 1), span = width / segments;
  const bend = Math.sin(Math.PI * p) * .82;
  let x = 0, z = 0;
  return Array.from({ length: segments }, (_, i) => {
    const u = (i + .5) / segments;
    const angle = -Math.PI * p + bend * Math.cos(Math.PI * u);
    const piece = { x, z, angle: angle * 180 / Math.PI, width: span };
    x += Math.cos(angle) * span; z -= Math.sin(angle) * span;
    return piece;
  });
}

const PAGE_TANGENTS = Array.from({ length: PASSPORT_MOTION.turnSegments }, (_, i) => Math.cos(Math.PI * (i + .5) / PASSPORT_MOTION.turnSegments));
function passportLeafTipX(progress, width, gutterWidth) {
  const p = clampPassport(progress, 0, 1), angle = -Math.PI * p;
  const bend = Math.sin(Math.PI * p) * .82, span = width / PAGE_TANGENTS.length;
  let x = gutterWidth * Math.cos(angle);
  // Same integrated strip tangents as the renderer, without allocating full meshes
  // and binding curves for every step of the inverse-position search.
  for (const tangent of PAGE_TANGENTS) x += Math.cos(angle + bend * tangent) * span;
  return x;
}

// Invert the rendered curved tip, rather than the cosine projection of a rigid board.
export function passportLeafTurnProgress(start, dx, width, gutterWidth = PASSPORT_GEOMETRY.gutterWidth) {
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(dx)) return start;
  if (dx === 0) return start;
  const targetX = passportLeafTipX(start, width, gutterWidth) + dx;
  if (targetX >= width + gutterWidth) return 0;
  if (targetX <= -width - gutterWidth) return 1;
  let low = 0, high = 1;
  for (let i = 0; i < 28; i++) {
    const middle = (low + high) / 2;
    if (passportLeafTipX(middle, width, gutterWidth) > targetX) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

export function constrainPassportView(view, width, height) {
  const finite = (v, fallback) => Number.isFinite(v) ? v : fallback;
  return {
    yaw: clampPassport(finite(view.yaw, 0), -180, 180),
    pitch: clampPassport(finite(view.pitch, 0), -65, 65),
    roll: clampPassport(finite(view.roll, 0), -12, 12),
    x: clampPassport(finite(view.x, 0), -width * .23, width * .23),
    y: clampPassport(finite(view.y, 0), -height * .19, height * .19),
    zoom: clampPassport(finite(view.zoom, 1), PASSPORT_MOTION.zoomMin, PASSPORT_MOTION.zoomMax),
  };
}

/** Fit the articulated envelope inside the actual CSS perspective viewport. */
export function fitPassportView({ stageWidth, stageHeight, pageWidth, pageHeight, cover = 0, leaf = 0, yaw = 0, pitch = 0, roll = 0, zoom = 1, x = 0, y = 0, perspective = 1800, padding = 12 }) {
  const finite = (value, fallback) => Number.isFinite(value) ? value : fallback;
  const width = Math.max(0, finite(stageWidth, 0)), height = Math.max(0, finite(stageHeight, 0));
  const w = Math.max(1, finite(pageWidth, 1)), h = Math.max(1, finite(pageHeight, 1));
  const turns = [cover, leaf].map(value => clampPassport(finite(value, 0), 0, 1) * Math.PI);
  // The gutter allowance also contains the curved sheet and articulated joints.
  const allowance = PASSPORT_GEOMETRY.gutterWidth + Math.abs(PASSPORT_GEOMETRY.backZ) + PASSPORT_GEOMETRY.coverHalfThickness;
  const minX = Math.min(0, ...turns.map(angle => w * Math.cos(angle))) - allowance;
  const maxX = w + allowance, pivot = (minX + maxX) / 2;
  const minZ = -allowance, maxZ = Math.max(0, ...turns.map(angle => w * Math.sin(angle))) + allowance;
  const rad = value => finite(value, 0) * Math.PI / 180;
  const [ax, ay, az] = [pitch, yaw, roll].map(rad), p = Math.max(1, finite(perspective, 1800));
  const corners = [];
  for (const px of [minX, maxX]) for (const py of [-h / 2 - 4, h / 2 + 4]) for (const pz of [minZ, maxZ]) {
    let vx = px - pivot, vy = py, vz = pz;
    // CSS rotateX(...) rotateY(...) rotateZ(...) applies the rightmost rotation first.
    [vx, vy] = [vx * Math.cos(az) - vy * Math.sin(az), vx * Math.sin(az) + vy * Math.cos(az)];
    [vx, vz] = [vx * Math.cos(ay) + vz * Math.sin(ay), -vx * Math.sin(ay) + vz * Math.cos(ay)];
    [vy, vz] = [vy * Math.cos(ax) - vz * Math.sin(ax), vy * Math.sin(ax) + vz * Math.cos(ax)];
    corners.push([vx, vy, vz]);
  }
  const inset = Math.max(0, finite(padding, 12));
  const limitX = Math.max(0, width / 2 - inset), limitY = Math.max(0, height / 2 - inset);
  const offsetX = clampPassport(finite(x, 0), -limitX, limitX), offsetY = clampPassport(finite(y, 0), -limitY, limitY);
  const project = scale => corners.map(([vx, vy, vz]) => {
    const divisor = p - vz * scale;
    return divisor <= .01 ? [Infinity, Infinity] : [(vx * scale + offsetX) * p / divisor, (vy * scale + offsetY) * p / divisor];
  });
  let low = 0, high = Math.max(0, finite(zoom, 1));
  for (let i = 0; i < 24; i++) {
    const scale = (low + high) / 2;
    if (project(scale).every(([px, py]) => Math.abs(px) <= limitX && Math.abs(py) <= limitY)) low = scale;
    else high = scale;
  }
  const projected = project(low), xs = projected.map(point => point[0]), ys = projected.map(point => point[1]);
  return { scale: low, center: -pivot / w, origin: 50 + pivot / (2 * w) * 100, x: offsetX, y: offsetY,
    bounds: { left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys) } };
}

export function createPassportMotion({ host, root, stage, book, onPage, interaction = 'modes' }) {
  const direct = interaction === 'direct';
  const abort = new AbortController();
  const listen = (node, event, fn, options = {}) => node.addEventListener(event, fn, { ...options, signal: abort.signal });
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const forcedColors = matchMedia('(forced-colors: active)');
  let stageWidth = 0, stageHeight = 0, stagePerspective = 1800, coverHeight = 0, directSpin = 0;
  const narrow = () => stageWidth < 736;
  const reduced = () => media.matches || document.documentElement.dataset.motion === 'reduced';
  const flat = () => document.documentElement.dataset.material === 'flat' || document.documentElement.dataset.contrast === 'high' || forcedColors.matches;
  const current = { yaw: -18, pitch: 9, roll: -3, x: 0, y: 0, zoom: 1, cover: 0, leaf: 0, center: -.5, origin: 75 };
  let target = { ...current }, velocity = Object.fromEntries(Object.keys(current).map(k => [k, 0]));
  let page = 0, mode = 'read', frame = 0, last = 0, disposed = false, visible = true, drag = null, ignoreClickUntil = 0, directOverview = false;
  let strips = null, cachedStrips = null, stripNodes = [], pageWidth = 0, pageHeight = 0, sheetWidth = 0;
  const painted = { cover: NaN, leaf: NaN, yaw: NaN, x: NaN, scale: NaN, zoom: NaN, transform: '', pose: '', turn: '' };
  const dataLeaf = book.querySelector('.np-data-leaf');
  const coverLeaf = book.querySelector('.np-cover-leaf');
  const endpaper = coverLeaf.querySelector('.np-endpaper');
  const binding = book.querySelector('.np-binding');
  const spineFaces = [...binding.querySelectorAll('.np-spine-face')];
  const spineInnerFaces = [...binding.querySelectorAll('.np-spine-inner-face')];
  let foldLightPose = '';
  const foldPaint = [];
  const spineEnds = [...binding.querySelectorAll('[data-np-spine-end]')].map(container => {
    const layerCount = PASSPORT_GEOMETRY.spineSegments * PASSPORT_GEOMETRY.cornerSegments * 2;
    const nodes = Array.from({ length: layerCount * 2 + PASSPORT_GEOMETRY.spineSegments * 2 }, (_, i) => {
      const node = document.createElement('i');
      // The cut exposes the pale cover core; it is not another exterior skin.
      const surface = i >= layerCount * 2 ? 'edge' : i >= layerCount ? 'inner' : 'outer';
      node.className = `np-spine-triangle np-spine-${surface}-triangle`;
      container.append(node); return node;
    });
    return { side: container.dataset.npSpineEnd === 'top' ? -1 : 1, nodes };
  });
  const leafJoint = [...book.querySelectorAll('.np-leaf-joint .np-joint-strip')];
  const coverJointSurface = book.querySelector('.np-cover-joint');
  const coverJoint = [...book.querySelectorAll('.np-cover-joint .np-joint-strip')];
  const baseJoint = [...book.querySelectorAll('.np-base-joint .np-joint-strip')];
  const coverRims = [...book.querySelectorAll('.np-cover-rim')];
  const paperRims = [...book.querySelectorAll('.np-paper-rim')];
  const g = PASSPORT_GEOMETRY;
  for (const [name, value] of Object.entries({ 'back-z': g.backZ, 'cover-half': g.coverHalfThickness, 'leaf-half': g.leafHalfThickness, 'block-bottom': g.blockBottom, 'sheet-step': (g.blockTop - g.blockBottom) / 15, 'base-z': g.baseZ, 'spine-inset': g.spineInset, 'cover-root-radius': g.coverRootRadius, 'cover-corner': g.coverCornerRadius, 'paper-root-radius': Math.max(0, g.coverRootRadius - g.paperInset), 'paper-corner': g.coverCornerRadius - g.foreedgeInset, 'gutter-width': g.gutterWidth, 'joint-overlap': g.jointOverlap, 'triangle-size': g.triangleSize, 'paper-inset': g.paperInset, 'foreedge-inset': g.foreedgeInset })) {
    book.style.setProperty(`--pp-${name}`, `${value}px`);
  }
  const instructions = host.querySelector('[data-np-gesture-help]');
  const controls = host.querySelector('.np-object-controls');
  const zoomOutput = host.querySelector('[data-np-zoom-output]');
  const viewStatus = host.querySelector('[data-np-view-status]');
  const zoomOut = host.querySelector('[data-np-zoom="out"]'), zoomIn = host.querySelector('[data-np-zoom="in"]');
  const ground = host.querySelector('.np-ground'), coverLights = [...book.querySelectorAll('.np-cover-light')];
  const baseView = () => ({ yaw: flat() || reduced() ? 0 : page ? 0 : -18, pitch: flat() || reduced() ? 0 : page ? 3 : 9, roll: flat() || reduced() || page ? 0 : -3, x: 0, y: 0, zoom: 1 });
  const readingView = () => mode === 'read' && !directOverview;
  const fittedView = () => fitPassportView({ stageWidth, stageHeight, pageWidth, pageHeight: coverHeight, perspective: stagePerspective, ...current });
  const viewFit = () => direct ? fittedView().scale / current.zoom : narrow() && !readingView() ? Math.min(1, stageWidth * .89 / (pageWidth * (1 + current.cover))) : 1;
  const canRun = () => !disposed && visible && !document.hidden;
  const announce = () => { viewStatus.textContent = `${Math.round(target.zoom * 100)}%. Rotação ${Math.round(target.yaw)} graus. ${mode === 'read' ? 'Leitura' : mode === 'rotate' ? 'Girar' : 'Mover'}.`; };
  function schedule() { if (!frame && canRun()) frame = requestAnimationFrame(draw); }
  function discardStrips(invalidate = false) {
    strips?.remove(); strips = null; dataLeaf.classList.remove('np-leaf-bending');
    if (invalidate) { cachedStrips = null; stripNodes = []; }
  }
  function buildStrips() {
    if (cachedStrips) { strips = cachedStrips; book.append(strips); dataLeaf.classList.add('np-leaf-bending'); return; }
    strips = document.createElement('div'); strips.className = 'np-curled-sheet'; strips.ariaHidden = 'true'; strips.inert = true;
    const originalFront = dataLeaf.querySelector('.np-front'), originalBack = dataLeaf.querySelector('.np-back');
    for (let i = 0; i < PASSPORT_MOTION.turnSegments; i++) {
      const strip = document.createElement('div'); strip.className = 'np-curve-strip';
      for (const [side, original] of [['front', originalFront], ['back', originalBack]]) {
        const face = document.createElement('div'); face.className = `np-strip-face np-strip-${side}`;
        const content = original.cloneNode(true); content.classList.add('np-strip-content'); content.removeAttribute('data-np-panel'); content.removeAttribute('aria-hidden');
        content.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
        content.querySelectorAll('[data-np-photo]').forEach(n => n.removeAttribute('data-np-photo'));
        content.querySelectorAll('[data-np-corner]').forEach(n => n.remove());
        content.style.width = `${sheetWidth}px`; content.style.height = `${pageHeight}px`;
        content.style.left = `${-(side === 'front' ? i : PASSPORT_MOTION.turnSegments - 1 - i) * sheetWidth / PASSPORT_MOTION.turnSegments}px`;
        face.append(content); strip.append(face);
      }
      strips.append(strip); stripNodes.push(strip);
    }
    cachedStrips = strips; book.append(strips); dataLeaf.classList.add('np-leaf-bending');
  }
  const paperShade = angle => Math.min(.19, Math.abs(Math.sin(angle * Math.PI / 180)) * .17);
  function paintPaperMargin(nodes, segments, turnShade = 0, coverPlane = null) {
    let distance = 0;
    const edgeOcclusion = Math.exp(-g.gutterWidth / 3.8);
    const shade = t => {
      const crease = .18 * (Math.exp(-t * g.gutterWidth / 3.8) - edgeOcclusion) / (1 - edgeOcclusion);
      const turning = turnShade * t * t * (3 - 2 * t);
      return 1 - (1 - crease) * (1 - turning);
    };
    segments.forEach((part, i) => {
      // CSS 3D rasterizes each narrow facet separately. Cover a full CSS pixel
      // at the normal reading scale; subpixel overlap leaves hairline seams.
      let overlap = g.jointOverlap;
      if (coverPlane) {
        const angle = part.angle * Math.PI / 180, { point, normal } = coverPlane;
        const approach = Math.cos(angle) * normal.x - Math.sin(angle) * normal.z;
        if (approach < -1e-9) {
          const clearance = (part.x - point.x) * normal.x + (part.z - point.z) * normal.z;
          // The anti-seam extension must stay behind the moving inner cover.
          // A constant extension leaks through its root when the margin folds shut.
          overlap = Math.min(overlap, Math.max(0, clearance / -approach - part.width));
        }
        nodes[i].style.setProperty('--pp-joint-overlap', `${overlap}px`);
      }
      // Cover raster seams without stretching the grain or the shadow interval.
      nodes[i].style.width = `${part.width + overlap}px`;
      // The lining runs seam-to-cover, opposite to a page's front-facing path.
      // Turn its painted face inward without moving the shared X/Z endpoints.
      nodes[i].style.transform = `translate3d(${part.x}px,0,${part.z}px) rotateY(${part.angle}deg)${coverPlane ? ' rotateX(180deg)' : ''}`;
      nodes[i].style.setProperty('--paper-u', `${-distance}px`);
      nodes[i].style.setProperty('--joint-shade-start', String(shade(part.sourceStart)));
      nodes[i].style.setProperty('--joint-shade-end', String(shade(part.sourceEnd)));
      distance += part.width;
    });
  }
  function paint() {
    const opened = current.cover;
    const coverChanged = opened !== painted.cover;
    const fitted = direct ? fittedView() : null;
    const scale = fitted ? fitted.scale : current.zoom * viewFit();
    const origin = fitted ? fitted.origin : current.origin;
    const transform = `translate3d(${(fitted ? fitted.center : current.center) * pageWidth + (fitted ? fitted.x : current.x)}px,${fitted ? fitted.y : current.y}px,0) rotateX(${current.pitch}deg) rotateY(${current.yaw}deg) rotateZ(${current.roll}deg) scale3d(${scale},${scale},${scale})`;
    if (transform !== painted.transform || origin !== painted.origin) {
      book.style.transformOrigin = `${origin}% 50%`;
      book.style.transform = transform;
      painted.transform = transform; painted.origin = origin;
    }
    // Rotating/moving the whole object does not deform its binding or pages.
    if (coverChanged) {
      const geometry = passportHingeGeometry(opened, current.leaf);
      coverLeaf.style.transform = `translate3d(${geometry.coverX}px,0,${geometry.coverZ}px) rotateY(${-180 * opened}deg)`;
      const coverBinding = passportCoverBinding(opened);
      // At zero aperture this lining is fully enclosed and collapses into twelve
      // subpixel faces. Cull that internal surface rather than compositing its
      // antialias through the leather from either viewing direction.
      coverJointSurface.hidden = opened === 0;
      endpaper.style.setProperty('--pp-endpaper-margin', `${coverBinding.margin}px`);
      paintPaperMargin(coverJoint, coverBinding.segments, 0, {
        point: coverBinding.end,
        normal: { x: Math.sin(Math.PI * opened), z: -Math.cos(Math.PI * opened) },
      });
      paintPaperMargin(baseJoint, passportBaseBinding(opened).segments);
      let foldU = 0;
      geometry.spine.forEach((part, i) => {
        spineFaces[i].style.width = `${part.width + .03}px`;
        spineFaces[i].style.transform = `translate3d(${part.x}px,0,${part.z}px) rotateY(${part.angle}deg)`;
        // Unwrap along the fold, instead of repeating the same column per facet.
        spineFaces[i].style.setProperty('--fold-u', `${-foldU}px`);
        foldU += part.width;
      });
      geometry.spineInner.forEach((part, i) => {
        spineInnerFaces[i].style.width = `${part.width + .03}px`;
        spineInnerFaces[i].style.transform = `translate3d(${part.x}px,0,${part.z}px) rotateY(${part.angle}deg)`;
      });
      const terminal = passportSpineTerminal(opened, 1), innerTerminal = passportSpineTerminal(opened, 1, g.cornerSegments, true), size = g.triangleSize;
      // Join only the skin's two contours. Filling the outer contour with a
      // chord made this fold read as a solid bar laid over the paper.
      const edges = terminal.cap.slice(0, -1).flatMap((a, i) => {
        const b = terminal.cap[i + 1], c = innerTerminal.cap[i + 1], d = innerTerminal.cap[i];
        return [{ a, b, c }, { a, b: c, c: d }];
      });
      const triangles = [...terminal.triangles, ...innerTerminal.triangles, ...edges];
      for (const end of spineEnds) {
        triangles.forEach(({ a, b, c }, i) => {
          const ux = b.x - a.x, uy = (b.y - a.y) * end.side, uz = b.z - a.z;
          const vx = c.x - a.x, vy = (c.y - a.y) * end.side, vz = c.z - a.z;
          const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
          const length = Math.hypot(nx, ny, nz) || 1;
          // A 32px source triangle avoids magnifying a one-pixel antialiased mask.
          end.nodes[i].style.transform = `matrix3d(${ux / size},${uy / size},${uz / size},0,${vx / size},${vy / size},${vz / size},0,${nx / length},${ny / length},${nz / length},0,${a.x},${a.y * end.side},${a.z},1)`;
        });
      }
      painted.cover = opened;
    }
    const lightPose = [opened, current.pitch, current.yaw, current.roll].join(' ');
    if (lightPose !== foldLightPose) {
      const radians = Math.PI / 180;
      const pitch = current.pitch * radians, yaw = current.yaw * radians, roll = current.roll * radians;
      // Shade the existing curved skin with a fixed studio light. Shared vertex
      // samples keep adjacent faces continuous instead of painting twelve bands.
      const colors = Array.from({ length: g.spineSegments + 1 }, (_, i) => {
        const angle = Math.PI * (1 - opened) * i / g.spineSegments;
        const nx = -Math.sin(angle), nz = -Math.cos(angle);
        const rx = nx * Math.cos(roll), ry = nx * Math.sin(roll);
        const x = rx * Math.cos(yaw) + nz * Math.sin(yaw);
        const rz = -rx * Math.sin(yaw) + nz * Math.cos(yaw);
        const y = ry * Math.cos(pitch) - rz * Math.sin(pitch);
        const z = ry * Math.sin(pitch) + rz * Math.cos(pitch);
        const diffuse = Math.max(0, -.42 * x - .45 * y + .7881 * z);
        const sheen = Math.max(0, -.2221 * x - .238 * y + .9455 * z) ** 12;
        const light = -.18 + .26 * diffuse + .10 * sheen;
        return `color-mix(in srgb,var(--cover-color) ${(100 - Math.abs(light) * 100).toFixed(2)}%,${light >= 0 ? '#fff' : '#080d14'})`;
      });
      spineFaces.forEach((face, i) => {
        const paint = `linear-gradient(90deg,${colors[i]},${colors[i + 1]})`;
        if (paint !== foldPaint[i]) {
          face.style.setProperty('--fold-shading', paint);
          foldPaint[i] = paint;
        }
      });
      foldLightPose = lightPose;
    }
    const bending = current.leaf > .001 && current.leaf < .999 && !reduced() && !flat();
    if (coverChanged || current.leaf !== painted.leaf) {
      paintPaperMargin(leafJoint, passportLeafBinding(current.leaf, g.gutterWidth, opened).segments, bending ? paperShade(passportPageCurve(current.leaf, 1)[0].angle) : 0);
    }
    if (current.leaf !== painted.leaf || bending && !strips) {
      const leafBinding = passportLeafBinding(current.leaf, flat() ? 0 : g.gutterWidth, opened);
      dataLeaf.style.transform = `translate3d(${leafBinding.end.x}px,0,${leafBinding.end.z}px) rotateY(${-180 * current.leaf}deg)`;
      dataLeaf.style.zIndex = current.leaf > .001 ? '50' : '20';
      if (bending) {
        if (!strips) buildStrips();
        passportPageCurve(current.leaf, sheetWidth).forEach((part, i) => {
          const strip = stripNodes[i];
          strip.style.width = `${part.width + .45}px`;
          strip.style.transform = `translate3d(${leafBinding.end.x + part.x}px,0,${leafBinding.end.z + part.z}px) rotateY(${part.angle}deg)`;
          strip.style.setProperty('--strip-shade', String(paperShade(part.angle)));
        });
      }
      painted.leaf = current.leaf;
    }
    if (!bending && strips) discardStrips();
    // Apply lighting only to its consumer, never inherit per-frame variables
    // through the hundreds of binding/content nodes.
    if (current.yaw !== painted.yaw) {
      for (const light of coverLights) {
        light.style.setProperty('--cover-glint', `${48 + current.yaw * .3}%`);
        light.style.setProperty('--cover-light-angle', `${118 - current.yaw * .5}deg`);
      }
      painted.yaw = current.yaw;
    }
    if (current.x !== painted.x) { ground.style.setProperty('--ground-x', `${current.x * .7}px`); painted.x = current.x; }
    if (scale !== painted.scale) { ground.style.setProperty('--ground-scale', String(scale)); painted.scale = scale; }
    const pose = [current.pitch, current.yaw, current.x, current.y, current.zoom].map(v => v.toFixed(2)).join(' ');
    const turn = [current.cover, current.leaf].map(v => v.toFixed(3)).join(' ');
    if (pose !== painted.pose) { stage.dataset.pose = pose; painted.pose = pose; }
    if (turn !== painted.turn) { stage.dataset.turn = turn; painted.turn = turn; }
    if (target.zoom !== painted.zoom) {
      zoomOutput.textContent = `${Math.round(target.zoom * 100)}%`;
      zoomOut.disabled = target.zoom <= PASSPORT_MOTION.zoomMin;
      zoomIn.disabled = target.zoom >= PASSPORT_MOTION.zoomMax;
      painted.zoom = target.zoom;
    }
  }
  function draw(now) {
    frame = 0; if (!canRun()) return;
    const elapsedMs = Math.min(64, last ? now - last : direct ? 16 : 1000 / 60);
    const dt = Math.min(.032, elapsedMs / 1000); last = now;
    // A direct jump across two spreads still moves one physical leaf at a time.
    if (drag?.kind !== 'turn') {
      target.cover = page > 0 || current.leaf > .001 ? 1 : 0;
      target.leaf = page === 2 && current.cover > .975 ? 1 : 0;
      if (reduced() || flat()) { target.cover = page ? 1 : 0; target.leaf = page === 2 ? 1 : 0; }
      target.center = !direct && narrow() && readingView() ? -.5 : -.5 * (1 - current.cover);
      target.origin = !direct && narrow() && readingView() ? 75 : 75 - current.cover * 25;
    }
    let moving = false;
    const staticMotion = reduced() || flat();
    for (const key of Object.keys(current)) {
      if (drag?.kind === 'turn' && key === drag.channel && staticMotion) continue;
      if (direct && ['pitch', 'yaw', 'roll'].includes(key) && !staticMotion) {
        const difference = target[key] - current[key], rest = key === 'pitch' ? PASSPORT_DIRECT_MOTION.pitchRest : PASSPORT_DIRECT_MOTION.angleRest;
        current[key] = Math.abs(difference) <= rest ? target[key] : current[key] + difference * (1 - Math.exp(-elapsedMs / PASSPORT_DIRECT_MOTION.responseMs));
        velocity[key] = 0; moving ||= current[key] !== target[key];
        continue;
      }
      const manual = drag && (drag.kind === 'turn' ? key === drag.channel || ['center', 'origin'].includes(key) : (!direct || drag.moved) && !['cover', 'leaf'].includes(key));
      if (staticMotion || manual) { current[key] = target[key]; velocity[key] = 0; continue; }
      const difference = target[key] - current[key];
      velocity[key] += (PASSPORT_MOTION.stiffness * difference - PASSPORT_MOTION.damping * velocity[key]) * dt;
      current[key] += velocity[key] * dt;
      if (Math.abs(difference) < PASSPORT_MOTION.rest && Math.abs(velocity[key]) < PASSPORT_MOTION.rest * 8) { current[key] = target[key]; velocity[key] = 0; }
      else moving = true;
    }
    current.cover = clampPassport(current.cover, 0, 1); current.leaf = clampPassport(current.leaf, 0, 1);
    paint();
    // Continue if the second hinge has yet to be released by the first.
    if (drag?.kind !== 'turn') moving ||= page === 2 && current.leaf < 1 || page === 0 && current.cover > 0;
    stage.dataset.motionState = drag ? 'dragging' : moving ? 'moving' : reduced() || flat() ? 'static' : 'idle';
    if (moving) schedule(); else last = 0;
  }
  function release(cancel = false) {
    if (!drag) return;
    const active = drag; drag = null; stage.classList.remove('np-dragging'); delete root.dataset.npTurning;
    if (stage.hasPointerCapture?.(active.id)) stage.releasePointerCapture(active.id);
    if (cancel) { target = { ...target, ...active.view }; if (direct) { directOverview = active.overview; directSpin = active.spin; } }
    if (active.moved) ignoreClickUntil = Date.now() + 450;
    if (active.kind === 'turn') {
      const progress = target[active.channel];
      const speed = performance.now() - active.sampleTime < 100 ? active.speed : 0;
      const destination = passportTurnDestination(progress, speed);
      stage.dataset.gestureResult = cancel ? 'cancelled' : active.moved ? (destination === active.start ? 'returned' : 'completed') : 'tap';
      if (!cancel) {
        // Pointer capture retargets the subsequent click to the stage, so taps commit here.
        ignoreClickUntil = Date.now() + 450;
        onPage(active.moved ? (active.channel === 'leaf' ? 1 : 0) + destination : active.destination);
      }
    }
    announce(); schedule();
  }
  function updateMode(next, reset = false) {
    release(true); mode = direct || flat() && next === 'rotate' ? 'read' : next;
    directOverview = false;
    directSpin = 0;
    ignoreClickUntil = 0;
    root.dataset.npMode = mode;
    stage.setAttribute('aria-describedby', mode === 'read' ? `${instructions.id || 'np-gesture-help'} ${host.querySelector('[data-np-instructions]')?.id || 'np-instructions'}` : instructions.id || 'np-gesture-help');
    book.querySelector('.np-cover-open').tabIndex = mode === 'read' ? 0 : -1;
    host.querySelectorAll('[data-np-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.npMode === mode)));
    host.querySelector('[data-np-mode="rotate"]').disabled = flat();
    host.querySelector('.np-view-presets').hidden = mode !== 'rotate';
    instructions.textContent = direct ? flat() ? 'Visual plano ativo. Use os cantos ou as setas para mudar de página. Home centraliza o passaporte.' : 'Mova o mouse para explorar a capa ou arraste para girar. Shift ou Alt ao arrastar move. Use os cantos ou as setas para virar páginas. No teclado, esquerda e direita mudam de página; Alt e setas giram; Shift e setas movem. Home ou Escape centraliza.' : mode === 'read' ? flat() ? 'Visual plano ativo. Use os cantos ou as setas para mudar de página.' : 'Puxe um canto para virar. Volte com a mão para desfazer · Girar e Mover exploram o objeto.' : mode === 'rotate' ? 'Arraste para girar · use a roda para aproximar · setas também giram · Esc volta à leitura.' : 'Arraste para reposicionar · setas também movem · Esc volta à leitura.';
    if (reset) target = { ...target, ...baseView() };
    schedule();
  }
  function setView(patch) { const next = { ...target, ...patch }; target = { ...target, ...constrainPassportView(next, stageWidth, stageHeight) }; if (direct && Number.isFinite(next.yaw)) target.yaw = next.yaw; schedule(); }
  function resetView() { release(true); directOverview = false; directSpin = 0; target = { ...target, ...baseView() }; announce(); schedule(); }
  function hoverView(event) {
    if (!direct || reduced() || flat() || !canRun() || event.pointerType === 'touch') return;
    const bounds = stage.getBoundingClientRect(), base = baseView();
    if (!bounds.width || !bounds.height) return;
    const px = clampPassport((event.clientX - bounds.left) / bounds.width - .5, -.5, .5);
    const py = clampPassport((event.clientY - bounds.top) / bounds.height - .5, -.5, .5);
    setView({ yaw: base.yaw + directSpin + px * PASSPORT_DIRECT_MOTION.hoverYaw, pitch: base.pitch - py * PASSPORT_DIRECT_MOTION.hoverPitch });
  }
  listen(stage, 'pointerdown', event => {
    if (event.button !== 0 || event.target.closest('a,input,textarea,select') || drag) return;
    const corner = event.target.closest('[data-np-corner]');
    if (mode === 'read' && !corner && !direct) return;
    if (direct && !corner && (reduced() || flat() && !event.shiftKey && !event.altKey)) return;
    const view = Object.fromEntries(['yaw', 'pitch', 'roll', 'x', 'y', 'zoom'].map(k => [k, current[k]]));
    drag = { kind: mode === 'read' && corner ? 'turn' : 'view', action: direct ? event.shiftKey || event.altKey ? 'move' : 'rotate' : mode, id: event.pointerId, x: event.clientX, y: event.clientY, view, overview: directOverview, spin: directSpin, touch: event.pointerType === 'touch', moved: false };
    if (drag.kind === 'turn') {
      const channel = corner.dataset.npTurn;
      Object.assign(drag, { channel, destination: Number(corner.dataset.npDestination), start: current[channel], width: channel === 'cover' ? pageWidth : sheetWidth, projection: current.zoom * viewFit() * Math.max(.5, Math.cos(current.yaw * Math.PI / 180)), speed: 0, sampleTime: performance.now(), sampleProgress: current[channel] });
      target.center = current.center; target.origin = current.origin;
      target[channel] = current[channel]; velocity[channel] = 0;
      root.dataset.npTurning = channel;
    }
    // Delay body capture so a cover tap still clicks and touch can choose vertical scrolling.
    if (direct && drag.kind === 'view') return;
    event.preventDefault(); stage.classList.add('np-pointer-focus'); stage.focus({ preventScroll: true }); stage.setPointerCapture(event.pointerId);
  });
  listen(stage, 'pointermove', event => {
    if (!drag) { hoverView(event); return; }
    if (drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (Math.hypot(dx, dy) < PASSPORT_MOTION.dragThreshold && !drag.moved) return;
    if (direct && drag.kind === 'view' && !drag.moved) {
      if (drag.touch && Math.abs(dy) > Math.abs(dx)) { release(true); return; }
      directOverview = true;
      stage.classList.add('np-pointer-focus'); stage.focus({ preventScroll: true }); stage.setPointerCapture(event.pointerId);
    }
    if (direct && drag.kind === 'view') event.preventDefault();
    drag.moved = true;
    stage.classList.add('np-dragging');
    if (drag.kind === 'turn') {
      const solve = drag.channel === 'leaf' ? passportLeafTurnProgress : passportTurnProgress;
      const progress = solve(drag.start, dx / drag.projection, drag.width), now = performance.now();
      const elapsed = now - drag.sampleTime;
      if (elapsed > 0) drag.speed = (progress - drag.sampleProgress) / elapsed;
      drag.sampleProgress = progress; drag.sampleTime = now;
      target[drag.channel] = progress;
      stage.dataset.dragProgress = progress.toFixed(3);
      // Static/reduced modes retain the gesture but reveal the destination only on release.
      if (!flat() && !reduced()) current[drag.channel] = progress;
      schedule();
    }
    else if (drag.action === 'rotate') {
      if (direct) {
        const base = baseView();
        directSpin = drag.view.yaw - base.yaw + dx * PASSPORT_DIRECT_MOTION.yawPerPixel;
        setView({ yaw: base.yaw + directSpin, pitch: base.pitch + clampPassport(drag.view.pitch - base.pitch - dy / Math.max(1, stageHeight) * PASSPORT_DIRECT_MOTION.dragPitch, -PASSPORT_DIRECT_MOTION.pitchLimit, PASSPORT_DIRECT_MOTION.pitchLimit) });
      } else setView({ yaw: drag.view.yaw + dx * .43, pitch: drag.view.pitch - dy * .28 });
    }
    else setView({ x: drag.view.x + dx, y: drag.view.y + dy });
  });
  listen(stage, 'pointerup', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const followPointer = direct && drag.kind === 'view' && drag.action === 'rotate' && drag.moved;
    release();
    if (followPointer) hoverView(event);
  });
  listen(stage, 'pointerleave', () => { if (direct && !drag) resetView(); });
  listen(stage, 'pointercancel', () => release(true));
  listen(stage, 'lostpointercapture', () => release(true));
  listen(window, 'pointerup', () => release(true));
  listen(window, 'blur', () => release(true));
  listen(stage, 'click', event => { if (event.detail > 0 && Date.now() < ignoreClickUntil || mode !== 'read' && !event.target.closest('a')) { event.preventDefault(); event.stopImmediatePropagation(); } }, { capture: true });
  listen(stage, 'click', event => { const corner = event.target.closest('[data-np-corner]'); if (corner) onPage(Number(corner.dataset.npDestination)); });
  listen(stage, 'wheel', event => { if (mode === 'read' || event.ctrlKey) return; event.preventDefault(); setView({ zoom: target.zoom - event.deltaY * .0012 }); }, { passive: false });
  listen(document, 'keydown', event => { if (event.key === 'Tab') stage.classList.remove('np-pointer-focus'); });
  listen(stage, 'keydown', event => {
    stage.classList.remove('np-pointer-focus');
    if (event.target.matches('a,input,textarea,select')) return;
    if (event.key === 'Escape') {
      // Let the containing settings dialog close through its native Escape contract.
      if (!direct || !stage.closest('dialog[open]')) event.preventDefault();
      updateMode('read', true); announce(); return;
    }
    if (event.key === 'Home') { event.preventDefault(); resetView(); return; }
    if (['+', '=', '-'].includes(event.key)) { event.preventDefault(); setView({ zoom: target.zoom + (event.key === '-' ? -.1 : .1) }); announce(); return; }
    if (!event.key.startsWith('Arrow')) return;
    event.preventDefault();
    const dx = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    const dy = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    if (direct && (event.shiftKey || event.altKey)) {
      if (flat() && !event.shiftKey) { announce(); return; }
      directOverview = true;
      if (event.shiftKey) setView({ x: target.x + dx * 20, y: target.y + dy * 20 });
      else if (!flat()) setView({ yaw: target.yaw + dx * 12, pitch: target.pitch - dy * 8 });
      announce(); return;
    }
    if (mode === 'read') { if (dx) onPage(page + dx); }
    if (mode === 'rotate') setView({ yaw: target.yaw + dx * 12, pitch: target.pitch - dy * 8 });
    if (mode === 'move') setView({ x: target.x + dx * 20, y: target.y + dy * 20 });
    announce();
  });
  listen(controls, 'click', event => {
    const modeButton = event.target.closest('[data-np-mode]'), zoom = event.target.closest('[data-np-zoom]'), preset = event.target.closest('[data-np-pose]');
    if (modeButton) updateMode(modeButton.dataset.npMode, modeButton.dataset.npMode === 'read');
    if (zoom) setView({ zoom: target.zoom + (zoom.dataset.npZoom === 'in' ? .1 : -.1) });
    if (event.target.closest('[data-np-reset-view]')) resetView();
    if (preset) setView({ yaw: { front: 0, spine: 78, edge: -64, back: 180 }[preset.dataset.npPose], pitch: preset.dataset.npPose === 'spine' ? 18 : 0, roll: 0 });
    announce();
  });
  function buildRim(node, width, height, leftRadius, rightRadius, topZ, thickness, openHinge = false) {
    let rimU = 0;
    node.replaceChildren(...passportRoundedRim(width, height, leftRadius, rightRadius).filter(part => {
      // The wrapped spine continues here; an end wall would close the cover
      // as an independent board and leave a visible seam through the fold.
      return part.width > 1e-6 && (!openHinge || Math.abs(part.x) > 1e-6 || Math.abs(part.angle + 90) > 1e-6);
    }).map(part => {
      const face = document.createElement('i'); face.className = 'np-rim-face';
      if (openHinge) face.style.setProperty('--rim-u', `${-rimU}px`);
      rimU += part.width;
      face.style.width = `${part.width + .02}px`; face.style.height = `${thickness}px`;
      face.style.transform = `translate3d(${part.x}px,${part.y}px,${topZ}px) rotateZ(${part.angle}deg) rotateX(-90deg)`;
      return face;
    }));
  }
  function resize() {
    release(true); painted.cover = NaN; painted.leaf = NaN;
    // These faces use border-box sizing. clientWidth/Height round their layout
    // pixels, while bounding rects contain the current 3D projection instead.
    const localSize = node => {
      const style = getComputedStyle(node), width = parseFloat(style.width), height = parseFloat(style.height);
      return { width: Number.isFinite(width) ? width : node.clientWidth, height: Number.isFinite(height) ? height : node.clientHeight, perspective: parseFloat(style.perspective) };
    };
    const stageSize = localSize(stage), coverSize = localSize(coverLeaf), leafSize = localSize(dataLeaf);
    stageWidth = stageSize.width; stageHeight = stageSize.height; stagePerspective = Number.isFinite(stageSize.perspective) ? stageSize.perspective : 1800; pageWidth = coverSize.width; coverHeight = coverSize.height; sheetWidth = leafSize.width; pageHeight = leafSize.height;
    coverRims.forEach(node => {
      const size = node.parentElement === coverLeaf ? coverSize : localSize(node.parentElement);
      buildRim(node, size.width, size.height, g.coverRootRadius, g.coverCornerRadius, g.coverHalfThickness, g.coverHalfThickness * 2, true);
    });
    // Reducing the overhang also moves the paper arcs; old radii would poke
    // through the cover at the corners even if the straight edges fit.
    paperRims.forEach(node => {
      const size = localSize(node.parentElement);
      buildRim(node, size.width, size.height, Math.max(0, g.coverRootRadius - g.paperInset), g.coverCornerRadius - g.foreedgeInset, g.blockTop, g.blockTop - g.blockBottom);
    });
    discardStrips(true); setView({});
  }
  function policyChanged() { release(true); updateMode('read', true); resize(); }
  const policy = new MutationObserver(policyChanged); policy.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion', 'data-material', 'data-contrast'] });
  listen(media, 'change', policyChanged);
  listen(forcedColors, 'change', policyChanged);
  listen(document, 'visibilitychange', () => { release(true); if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; stage.dataset.motionState = 'paused'; } else schedule(); });
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(stage);
  const intersection = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); if (visible) schedule(); else { cancelAnimationFrame(frame); frame = 0; last = 0; release(true); stage.dataset.motionState = 'paused'; } }); intersection.observe(stage);
  root.dataset.npRenderer = 'css-articulated';
  root.dataset.npInteraction = direct ? 'direct' : 'modes';
  if (direct) { stage.style.touchAction = 'pan-y'; stage.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowRight Alt+ArrowLeft Alt+ArrowRight Alt+ArrowUp Alt+ArrowDown Shift+ArrowLeft Shift+ArrowRight Shift+ArrowUp Shift+ArrowDown Home Escape'); }
  resize(); updateMode('read', true);
  return {
    goPage(next) { release(true); if (direct) { directOverview = false; directSpin = 0; } page = clampPassport(next, 0, 2); if (mode === 'read') target = { ...target, ...baseView() }; schedule(); },
    refresh() { discardStrips(true); painted.leaf = NaN; schedule(); },
    dispose() { disposed = true; cancelAnimationFrame(frame); frame = 0; release(true); abort.abort(); policy.disconnect(); resizeObserver.disconnect(); intersection.disconnect(); discardStrips(true); stage.dataset.motionState = 'disposed'; },
  };
}
