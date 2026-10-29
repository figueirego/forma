# Approved book integration

Use this path when transferring the approved closed book. The renderer alone is not the complete visual: the preset, font, actual stage size, light calibration and consumer lifecycle are part of the result. For an independently designed book, explicit adaptations remain available.

## Files and ownership

- [BookObject](../assets/book-object.js): unchanged geometry, shaders, procedural textures, camera and pointer behavior.
- [BookPreset](../assets/book-preset.js): approved mechanical/material defaults and inspection/reset semantics.
- [Book lab](../assets/book-lab.html), [controller](../assets/book-lab.js) and [styles](../assets/book-lab.css): runnable integration. Serve the repository root after `npm ci --ignore-scripts`; its loader resolves the pinned Three 0.186.0 dependency. Adapt that import in another host. No CDN or implicit dependency installation.
- [Inter Variable font](../assets/fonts/inter-latin-opsz-normal.woff2) and [SIL OFL license](../assets/fonts/Inter-OFL.txt): preserve both when copying. The font is a necessary third-party dependency, not a Forma-authored font.
- [Adapter regressions](../tests/book-preset.test.cjs): configuration, lighting ownership, updates and disposal. These are not GPU evidence.
- [Startup regressions](../tests/book-lab.test.cjs): pending, failed and empty font loads prevent early painting; generated formats resolve the existing Three dependency.
- [Transfer verification record](../assets/audits/book-transfer-2026-10-29/manifest.json): pinned source hashes, capture conditions, measured coverage and explicit limits.

The lab intentionally retains the original Pauta text as a comparison fixture. `BookPreset` itself uses neutral Forma content; callers own the title, subtitle, mark and counter. Content or identity changes must be labeled adaptations when making a pixel comparison.

## Integration contract

Load `book-object.js` before `book-preset.js`. Register the supplied font under `Inter Variable`, load it before painting, and give the stage real dimensions. Keep the accessible title and subtitle in the DOM; the canvas is decorative.

```html
<style>
@font-face {
  font-family: "Inter Variable";
  src: url("./fonts/inter-latin-opsz-normal.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
}
.book-stage {
  width: min(72%, 340px);
  aspect-ratio: 1 / 1.3197609;
  margin: 84px auto;
  background: transparent;
  touch-action: pan-y;
}
@media (max-width: 720px) { .book-stage { margin-block: 64px; } }
</style>
<script src="book-object.js"></script>
<script src="book-preset.js"></script>
<h2>Field notes</h2><p>5 notes</p>
<div id="book" class="book-stage" aria-hidden="true"></div>
<button id="reset">Reset position</button>
<script type="module">
const fonts = await document.fonts.load('500 14px "Inter Variable"');
if (!fonts.length) throw new Error('Required book font unavailable');
const book = BookPreset.create(document.querySelector('#book'), {
  title: 'Field notes', subtitle: '5 notes', brand: 'FORMA', spineLabel: '00005'
}, {interactive: true, loadThree: () => import('./vendor/three/three.module.js')});
document.querySelector('#reset').onclick = () => book.reset();
// book.setPose({yaw: 180}); // inspection preserves initial lighting
// book.update({title: 'Research notes'}); // leaves the live pose unchanged
// On component unmount: book.dispose().
</script>
```

The sample changes content, not the approved physical profile. Import the existing project dependency instead of adding a second Three instance. Rendering starts asynchronously; check `book.renderMode` and inspect the actual canvas. `canvas-unavailable` and `canvas-context-lost` are fallback states, not successful 3D integration.

`BookPreset.config(overrides)` supplies width `1.84`, height `2.428360056`, depth `0.254947088`, pose `{pitch:28.65,yaw:20.05,roll:-8.59}`, cover `#4f5b3f`, ink `#fbfbfc`, pages `#f6f1e5`, `panels`, `cloth`, `foil`, and a monogram. Overrides explicitly adapt this profile. Bare `BookObject` retains its older generic defaults for compatibility; those defaults are not the approved book.

`update(patch)` deliberately ignores `pose`. Use `setPose(patch)` for inspection; it preserves lighting. `reset()` restores the creation-time rest pose and recalibrates its initial light. Do not send the saved pose with every content/theme update. Retain the wrapper's reset rather than replacing it with the engine's reset to its latest inspection pose.

## Render conditions that must travel together

| Layer | Preserved mechanism / condition |
|---|---|
| Color | `NoToneMapping`, `LinearSRGBColorSpace` output, `NoColorSpace` canvas textures; explicit linear interpretation of rim/spot colors. Do not substitute ACES or sRGB output during transfer |
| Light | Ambient white .54, key white .9 at (7,0,4.5), rim #6e665b at (-32,12,-16) with strength 1; spot #cceecc .05 with scaled position/target. Strengths are multiplied by pi and initial-pose compensation |
| Surface | Phong, shininess 8, procedural weave/grain/foil, derivative-aware bump and specular stamp mask. A mask named metalness does not make this a PBR material |
| Shadows | The approved WebGL book has no floor, cast-shadow map, AO pass or CSS drop-shadow. Surface shading comes from geometry, normals, relief and the preserved lights. Do not add a shadow effect to imitate a perceived one |
| Camera | Preserve `frameFor()` and `size()`. The final FOV is calculated; the camera constructor's 12 degrees is not the final framing |
| Typography | Exact Inter Variable file, ready before rasterization; font SHA-256 `2c295d99e26dcf357d4d01bcf270fd6924b600c9a13dd8c363ef114f4c6976fa` |
| Raster | Same real host width/height, DPR and `resolution:'reference'` / renderScale 2. Atlases depend on host width; scaling screenshots afterwards is not equivalent |
| Container | Transparent canvas, visible overflow, no added filter, transform, opacity or shadow; compare on the same background |
| Motion | Preserve original hover/drag equations, pan-y touch policy, settle behavior, reduced motion and visibility suspension |

The approved lab uses width `min(72%,340px)`, aspect `1/1.3197609`, and margins 84px desktop / 64px narrow. The app's library detail uses width 248px, max-width `calc(100% / 1.23)` and 52px vertical margins. Select the consumer first: these are different sizes, not a single universal pixel baseline. Application palette resolution is caller-owned; do not tint an explicitly selected color again because the surrounding theme changed.

## Acceptance before promotion

1. Pin an independently approved source, content, actual consumer, dimensions and dependencies; never use the new adapter as its own reference.
2. Compare front, back, spine, page edges, top/base obliques and reverse obliques at matched viewport/DPR, host size, font and initial light calibration.
3. Inspect color, foil, cloth, relief and binding closure in rendered pixels. Exercise the six patterns and relevant material/finish/color changes; record the combinations actually observed.
4. Exercise real hover/drag before, during and after input, content update while rotated, reset, narrow layout, reduced motion and fallback. Direct pose setters alone do not prove gestures.
5. Re-run the destination consumer, then generated and installed artifacts. Record backend and limitations; package equality or geometry tests do not prove GPU fidelity.

The approved color editor, workspace and separate passport implementation are outside this book transfer. Do not replace or restyle them to obtain a passing book comparison.

The 2026-10-29 transfer compared 32 state pairs against an independent frozen source on Chrome / ANGLE Metal / Apple M4: 29 were pixel-identical; three narrow pairs differed at three pixels each, at most 1/255 per channel. The residual cause is unverified. This bounded result does not establish identity on other GPUs, browsers, physical touch devices or synchronized intermediate gesture frames. Revalidate the real destination before promoting a new integration.
