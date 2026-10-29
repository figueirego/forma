const LEGACY_LIGHTING_COLORS = Object.freeze(["#6E9D90", "#5B84A8", "#77709D"]);
const LIGHTING_RENDERER = "oklch-v1";
const LIGHTING_COLORS = Object.freeze(["#3CADFA", "#00C2AA", "#BB8AEF"]);
const LIGHTING_HUES = Object.freeze([243, 181, 305]);
// The editor persists 0..1 coordinates; the OKLCH wash spans -45..145 percent.
const LIGHTING_MODEL_SPAN = 190;
const LIGHTING_POSITIONS = Object.freeze([
  Object.freeze({ x: 0.1632, y: 0.5632 }),
  Object.freeze({ x: 0.1842, y: 0.8684 }),
]);
const LIGHTING_PROFILES = Object.freeze({
  upper: Object.freeze({ width: 130, height: 46, fade: 72, chroma: 0.75, lightness: 0.9, alpha: 0.85, darkLightness: 0.42, darkAlpha: 0.7 }),
  lower: Object.freeze({ width: 124, height: 62, fade: 76, chroma: 1, lightness: 0.85, alpha: 1, darkLightness: 0.48, darkAlpha: 0.9 }),
  added: Object.freeze({ width: 118, height: 58, fade: 74, chroma: 0.85, lightness: 0.88, alpha: 0.8, darkLightness: 0.45, darkAlpha: 0.75 }),
});

export const DEFAULT_LIGHTING = Object.freeze({
  renderer: LIGHTING_RENDERER,
  hue: 181,
  colors: LIGHTING_COLORS,
  // Keep the exact chroma: the percentage control rounds .038/.09 to 42%.
  chroma: 0.038,
  strength: 42,
  angle: 48,
  grain: 0,
  pools: Object.freeze(LIGHTING_POSITIONS.map((position, index) => Object.freeze({
    id: `light-${index + 1}`,
    ...position,
    color: LIGHTING_COLORS[index],
    hue: LIGHTING_HUES[index],
    profile: index === 0 ? "upper" : "lower",
  }))),
});

const lightingClamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lightingColor = (value, fallback) =>
  typeof value === "string" && /^#[\da-f]{6}$/i.test(value)
    ? value.toUpperCase()
    : fallback;
const lightingCoordinate = (value, fallback) =>
  Number.isFinite(value) ? Number(value.toFixed(4)) : fallback;

function lightingPoolId(used, requested) {
  if (typeof requested === "string" && /^[a-z\d_-]{1,40}$/i.test(requested) && !used.has(requested))
    return requested;
  let index = 1;
  while (used.has(`light-${index}`)) index++;
  return `light-${index}`;
}

const lightingHue = (value) => Number((((value % 360) + 360) % 360).toFixed(3)) % 360;

/** Hex input counterpart of the fixed OKLCH handle color, bounded to sRGB. */
export function lightHueColor(hue) {
  if (!Number.isFinite(hue)) return null;
  const angle = lightingHue(hue) * Math.PI / 180;
  const a = 0.15 * Math.cos(angle), b = 0.15 * Math.sin(angle);
  const l = (0.72 + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (0.72 - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (0.72 - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return "#" + linear.map(value => {
    const encoded = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
    return Math.round(lightingClamp(encoded, 0, 1) * 255).toString(16).padStart(2, "0");
  }).join("").toUpperCase();
}

// Standard sRGB -> OKLab matrices. Palette inputs stay hex; the wash uses hue.
function lightingHexHue(hex, fallback) {
  const [r, g, b] = [1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const axisB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  // An achromatic hex has no stable hue; keep the selected hue in that case.
  return Math.hypot(a, axisB) < 0.0001 ? fallback : lightingHue(Math.atan2(axisB, a) * 180 / Math.PI);
}

/** Upgrade saved palettes to the shared wash without resetting their content. */
export function normalizeLighting(value) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const modern = source.renderer === LIGHTING_RENDERER ||
    !["renderer", "colors", "strength", "angle", "grain", "pools"].some(key => Object.hasOwn(source, key));
  const defaults = modern ? LIGHTING_COLORS : LEGACY_LIGHTING_COLORS;
  const sourceColors = Array.isArray(source.colors) ? source.colors : [];
  const colors = defaults.map((fallback, index) => lightingColor(sourceColors[index], fallback));
  const angle = Number.isFinite(source.angle)
    ? ((Math.round(source.angle) % 360) + 360) % 360
    : DEFAULT_LIGHTING.angle;
  const defaultPools = LIGHTING_POSITIONS.map((position, index) => ({
    id: `light-${index + 1}`, ...position, color: colors[index],
  }));
  const ids = new Set();
  // An explicit empty array is a chosen neutral background, not missing data.
  const candidates = Array.isArray(source.pools) ? source.pools.slice(0, 3) : defaultPools;
  const pools = candidates.map((candidate, index) => {
    const pool = candidate && typeof candidate === "object" ? candidate : {};
    const fallback = defaultPools[index % defaultPools.length];
    const id = lightingPoolId(ids, pool.id);
    ids.add(id);
    const color = lightingColor(pool.color, colors[index]);
    colors[index] = color;
    return {
      id,
      // Stored off-stage points are retained. Only a direct drag is stage-clamped.
      x: lightingCoordinate(pool.x, fallback.x),
      y: lightingCoordinate(pool.y, fallback.y),
      color,
      hue: Number.isFinite(pool.hue) ? lightingHue(pool.hue)
        : modern && color === defaults[index] ? LIGHTING_HUES[index] : lightingHexHue(color, LIGHTING_HUES[index]),
      profile: Object.hasOwn(LIGHTING_PROFILES, pool.profile) ? pool.profile
        : index === 1 ? "lower" : "upper",
    };
  });
  const chroma = Number(lightingClamp(Number.isFinite(source.chroma) ? source.chroma
    : Number.isFinite(source.strength) ? source.strength / 100 * 0.09
    : modern ? DEFAULT_LIGHTING.chroma : 0.0252, 0, 0.09).toFixed(6));
  return {
    renderer: LIGHTING_RENDERER,
    // Keep the anchor hue even when the last visible light is removed.
    hue: pools.at(-1)?.hue ?? (Number.isFinite(source.hue) ? lightingHue(source.hue)
      : modern ? LIGHTING_HUES[1] : lightingHexHue(colors[1], LIGHTING_HUES[1])),
    chroma,
    colors,
    strength: Math.round(chroma / 0.09 * 100),
    angle,
    grain: Number.isFinite(source.grain)
      ? Number(lightingClamp(source.grain, 0, 1).toFixed(3))
      : DEFAULT_LIGHTING.grain,
    pools,
  };
}

/** Independent clone for a preview transaction; no nested object is shared. */
export function cloneLighting(value) {
  return normalizeLighting(value);
}

// Saved coordinates stay normalized; interaction uses the reference model's
// one-decimal units so grouped points do not accumulate different rounding drift.
const lightingModelPosition = value => Number((value * LIGHTING_MODEL_SPAN - 45).toFixed(1));
const lightingStagePosition = value => lightingCoordinate((value + 45) / LIGHTING_MODEL_SPAN, 0);

export function moveLight(value, id, x, y, { individual = false, clampToStage = true } = {}) {
  const lighting = normalizeLighting(value);
  const pool = lighting.pools.find((item) => item.id === id);
  if (!pool || (!Number.isFinite(x) && !Number.isFinite(y))) return lighting;
  const previousX = lightingModelPosition(pool.x), previousY = lightingModelPosition(pool.y);
  const next = (coordinate, fallback) => Number.isFinite(coordinate)
    ? (clampToStage ? lightingClamp(coordinate, 0, 1) : coordinate) * LIGHTING_MODEL_SPAN - 45
    : fallback;
  const deltaX = next(x, previousX) - previousX, deltaY = next(y, previousY) - previousY;
  for (const point of lighting.pools) {
    if (individual && point.id !== id) continue;
    point.x = lightingStagePosition(Number((lightingModelPosition(point.x) + deltaX).toFixed(1)));
    point.y = lightingStagePosition(Number((lightingModelPosition(point.y) + deltaY).toFixed(1)));
  }
  return lighting;
}

/** Displayed radius is rounded in model units; remote points may exceed 150. */
export function lightDistance(value, id) {
  const { pools } = normalizeLighting(value);
  const anchor = pools.find(pool => pool.id === id);
  if (!anchor || pools.length < 2) return 0;
  const x = lightingModelPosition(anchor.x), y = lightingModelPosition(anchor.y);
  return Math.round(Math.max(...pools.map(pool => Math.hypot(lightingModelPosition(pool.x) - x, lightingModelPosition(pool.y) - y))));
}

/** Apply an absolute radius and fit every other vector to the preview bounds. */
export function setLightDistance(value, id, distance) {
  const lighting = normalizeLighting(value);
  const anchor = lighting.pools.find(pool => pool.id === id);
  if (!anchor || lighting.pools.length < 2 || !Number.isFinite(distance)) return lighting;
  const x = lightingModelPosition(anchor.x), y = lightingModelPosition(anchor.y);
  const others = lighting.pools.filter(pool => pool !== anchor);
  const vectors = others.map(pool => ({ x: lightingModelPosition(pool.x) - x, y: lightingModelPosition(pool.y) - y }));
  const current = Math.max(...vectors.map(vector => Math.hypot(vector.x, vector.y)));
  if (!Number.isFinite(current)) return lighting;
  const requested = lightingClamp(distance, 0, 150);
  const round = value => Math.round(value * 10) / 10;
  if (current < 0.5) {
    others.forEach((pool, index) => {
      pool.x = lightingStagePosition(round(x));
      pool.y = lightingStagePosition(round(lightingClamp(y - requested * (index + 1) / others.length, -45, 145)));
    });
    return lighting;
  }
  const fittingScale = (delta, position) => Math.abs(delta) < 0.001 ? Infinity
    : delta > 0 ? (145 - position) / delta : (position + 45) / -delta;
  const fit = Math.min(...vectors.map(vector => Math.min(fittingScale(vector.x, x), fittingScale(vector.y, y))));
  const scale = Math.min(requested / current, fit);
  others.forEach((pool, index) => {
    pool.x = lightingStagePosition(round(x + vectors[index].x * scale));
    pool.y = lightingStagePosition(round(y + vectors[index].y * scale));
  });
  return lighting;
}

/** Incremental ring motion crosses +/-180 without jumping to an absolute value. */
export function lightAngleDelta(previousDegrees, nextDegrees) {
  if (!Number.isFinite(previousDegrees) || !Number.isFinite(nextDegrees)) return 0;
  return ((nextDegrees - previousDegrees + 540) % 360 + 360) % 360 - 180;
}

export function addLight(value) {
  const lighting = normalizeLighting(value);
  if (lighting.pools.length === 3) return lighting;
  const id = lightingPoolId(new Set(lighting.pools.map((pool) => pool.id)));
  if (!lighting.pools.length) {
    const hue = lighting.hue;
    lighting.pools.push({ id, ...LIGHTING_POSITIONS[1], color: lightHueColor(hue), hue, profile: "lower" });
    return normalizeLighting(lighting);
  }
  const [first, second] = lighting.pools;
  const direction = second
    ? { x: first.x - second.x, y: first.y - second.y }
    : { x: -4 / LIGHTING_MODEL_SPAN, y: -58 / LIGHTING_MODEL_SPAN };
  const highest = lighting.pools.reduce((a, b) => b.y < a.y ? b : a);
  const anchorHue = lighting.pools.at(-1).hue;
  const signedHue = hue => ((hue + 540) % 360) - 180;
  const offset = [120, -120, 62, -62, 180].find(angle => lighting.pools.every(pool =>
    Math.abs(signedHue(pool.hue - anchorHue) - angle) >= 24)) ?? 120;
  const hue = lightingHue(anchorHue + offset);
  const position = coordinate => (Math.round((coordinate * LIGHTING_MODEL_SPAN - 45) * 10) / 10 + 45) / LIGHTING_MODEL_SPAN;
  // Insert before the retained anchor; this also preserves the original layer order.
  lighting.pools.splice(lighting.pools.length - 1, 0, {
    id,
    x: position(highest.x + direction.x),
    y: position(highest.y + direction.y),
    color: lightHueColor(hue),
    hue,
    profile: "added",
  });
  return normalizeLighting(lighting);
}

export function removeLight(value, id) {
  const lighting = normalizeLighting(value);
  return normalizeLighting({ ...lighting, pools: lighting.pools.filter((pool) => pool.id !== id) });
}

export function setLightColor(value, id, color, hue) {
  let lighting = normalizeLighting(value);
  const valid = lightingColor(color, null);
  if (!valid) return lighting;
  if (!lighting.pools.length) {
    lighting = addLight(lighting);
    id = lighting.pools[0].id;
  }
  const index = lighting.pools.findIndex((pool) => pool.id === id);
  if (index !== -1) {
    lighting.pools[index].color = valid;
    lighting.colors[index] = valid;
    if (lighting.renderer === LIGHTING_RENDERER) {
      const canonical = LIGHTING_COLORS.indexOf(valid);
      // A supplied palette hue is trusted only when it produces this hex.
      lighting.pools[index].hue = Number.isFinite(hue) && lightHueColor(hue) === valid ? lightingHue(hue)
        : canonical !== -1 ? LIGHTING_HUES[canonical] : lightingHexHue(valid, lighting.pools[index].hue);
      if (index === lighting.pools.length - 1) lighting.hue = lighting.pools[index].hue;
    }
  }
  return lighting;
}

/** Update the displayed percentage without quantizing untouched default chroma. */
export function setLightStrength(value, strength) {
  const lighting = normalizeLighting(value);
  if (!Number.isFinite(strength)) return lighting;
  const next = lightingClamp(Math.round(strength), 0, 100);
  if (next === lighting.strength && next > 0 && next < 100) return lighting;
  lighting.strength = next;
  lighting.chroma = Number((lighting.strength / 100 * 0.09).toFixed(6));
  return lighting;
}

export function lightHandleColor(value, id) {
  const lighting = normalizeLighting(value);
  const pool = lighting.pools.find(item => item.id === id);
  if (!pool) return "transparent";
  return `oklch(0.72 0.15 ${pool.hue})`;
}

/** Grain remains a separate layer above the shared mode highlight and wash. */
export function lightingBackground(value, dark = false) {
  const lighting = normalizeLighting(value);
  const highlight = dark
    ? "radial-gradient(74% 38% at 10% -14%, rgba(255, 255, 255, 0.07), transparent 62%)"
    : "radial-gradient(74% 46% at 10% -16%, rgba(255, 255, 255, 0.96), transparent 68%)";
  const base = dark
    ? "linear-gradient(180deg, #141417 0%, #08080a 100%)"
    : "linear-gradient(180deg, #fdfeff 0%, #eef3f6 100%)";
  const pools = lighting.pools.map(pool => {
    const profile = LIGHTING_PROFILES[pool.profile];
    const lightness = dark ? profile.darkLightness : profile.lightness;
    const opacity = dark ? profile.darkAlpha : profile.alpha;
    const chroma = lighting.chroma * profile.chroma;
    const fade = Math.min(100, profile.fade * 1.25);
    const stops = Array.from({ length: 9 }, (_, index) => {
      const t = index / 8;
      const alpha = Math.round(opacity * (1 - t * t * (3 - 2 * t)) * 1000) / 1000;
      return `oklch(${lightness} ${chroma} ${pool.hue} / ${alpha}) ${Math.round(t * fade * 10) / 10}%`;
    });
    const center = position => Number((lightingClamp(position, -100, 100) * LIGHTING_MODEL_SPAN - 45).toFixed(1));
    return `radial-gradient(${profile.width}% ${profile.height}% at ${center(pool.x)}% ${center(pool.y)}%, ${stops.join(", ")})`;
  });
  return [highlight, ...pools, base].join(", ");
}

export function lightingGrain(value, dark = false) {
  const grain = normalizeLighting(value).grain;
  return grain > 0.005 ? Math.round(grain * (dark ? 0.36 : 0.42) * 1000) / 1000 : 0;
}
