# Reusable objects: from reference to component

Use when the request requires adaptable technique, not just the appearance of a notebook, book, card or package. State the limit: a closed-book engine supports notebooks, albums and reports; it does not automatically become a page editor, arbitrary 3D mesh or native app.

When the request requires reusing the already approved mechanism and the object fits this contract, integrate the distributed BookObject. Adapt content, proportions and identity through the API while preserving approved meshes, UVs, normals, materials and lifecycle; do not rewrite them through speculative approximation. Preserve the consumer's brand and stack. A generic "profile" request does not determine a book or passport. CSS 2.5D is valid for an independent composition suited to the request or a requested/accepted fallback, but a tilted CSS cover alone does not fulfill explicit reuse of the 3D mechanism.

## Extraction by responsibility

1. Identify the proven mechanism: CSS, Canvas, mesh, shader, texture, camera and events. Separate reference evidence from original implementation.
2. Separate content (`title`, subtitle, brand), geometry (width/height/thickness), material (colors/pattern/asset), behavior (pose/gestures) and integration (persistence/actions).
3. Keep the contract small: `create -> update/setPose/reset/dispose`. Separate content/material changes from pose inspection. Inject a loader/dependency already used by the project. Do not embed storage, personal data, branding or global CSS from the original product.
4. Provide examples with different proportions and validate extreme names, loaded fonts, resize and unmounting. Changing only the color of a fixed copy does not demonstrate reuse.

When incorporating approved refinement, retain the chain **symptom -> measured cause -> patch -> regression -> rendered comparison** alongside the component. The [Pauta book case](book-polish-case-study.md) shows how to turn a visual adjustment into reusable knowledge. Normals, UVs, blending and lifecycle are transferable mechanisms; that book's radius, palette, pose and subdivision count need fresh justification in another object.

## Required reference-fidelity gate

When the request is "like the reference" or equivalent, a functional generic book does not meet acceptance criteria. Before implementing, pin the reference, its identity/version and relevant states. Record each claim as **observed at runtime**, **statically confirmed**, **inferred** or **proposed adaptation**. Hashes and callsites confirm the analyzed artifact, not the appearance of the open session. A shader found in a bundle does not prove it executed on the compared screen.

Build the matrix below and establish tolerances per dimension **before** judging the result. Use measurements consistent with evidence: proportions/angles or CSS pixels for shape and framing; extracted color values and roles; duration/curve and trajectory for motion. State viewport, DPR, theme, data and capture time. A chosen tolerance is a project decision, not a universal standard; do not widen it afterward to approve the implementation. A dimension without sufficient evidence remains unverified.

| Independent dimension | Compare and record |
|---|---|
| Geometry | Silhouette, proportion, thickness, spine, covers, pages, corners and relief; not merely a textured box |
| Projection and composition | Camera type, perspective, framing, initial pose, host occupancy and relationship with heading/actions |
| Palette | Base color, ink, pages, contrast and the distinction between theme/accent and object color; compare equivalent states |
| Shader and material | Origin of color/relief/reflection, weave scale and direction, lighting, roughness and masks; separate angular response from painted gloss |
| Gestures | Target and axes, range, gain, capture/cancellation, hover versus drag and result after release/exit |
| Transitions | Trigger, trajectory, speed, damping, rest and interruption; the same final pose does not prove the same motion |
| Adaptation | Shelf/detail, desktop/mobile, long names, touch, reduced motion and fallback; identify every intentional difference |

Execute comparison at **rest, hover, drag, release and pointer exit**, both on the **shelf** and in **detail** when those behaviors exist. "Does not exist in the reference" requires evidence, not automatic N/A. On mobile, record the equivalent gesture or adaptation preserving the task. A static capture validates only an instant; gestures/transitions require a sequence or direct observation. Keep reference and implementation side by side with the same data, dimensions and state, without replacing the result with a reference screenshot.

Acceptance requires a separate result for each dimension and state: approved within tolerance, divergent, explicitly adapted or unverified. No average may conceal a material discrepancy. Three/WebGL presence, disposal tests, accessibility or a correct fallback do not approve visual and behavioral fidelity. If the user rejects a difference as a "generic book," reopen the matrix and investigate the divergent dimension; do not add arbitrary effects or turn the rejected implementation into the skill's standard.

## Audited case: the desktop reference book

The [factual profile](../assets/reference-profiles/desktop-material-reference-v1.json) records the installed artifact, hashes and parameters. Inspection distinguished a custom mesh, atlas UVs, normals, two diffuse maps, two relief maps and a foil mask in ShaderMaterial with Phong lighting. This is not equivalent to choosing MeshPhongMaterial and applying the same light numbers.

Three concrete errors must fail reproduction:

1. **Correct color with a different pipeline.** sRGB textures, textures without conversion, linear output, light intensity and exposure compensation change the final color. Compare this pipeline before changing hex values to hide the error.
2. **Invented pages and relief.** Adding a striped texture to a page block changes the reference, as does using Bezier lines for the stem pattern or painted black instead of a recess. Inspect material, topology and map separately.
3. **Envelope in the wrong container.** The audited book expands the canvas and uses negative bleed around the nominal size. Fitting the entire rotation inside the same slot shrinks the object. Measure slot, canvas and rendered silhouette separately. On mobile, reserve envelope space or adapt scale; do not hide cuts with indiscriminate overflow.

The reference's shelf/detail transition includes position, scale, pose and cloth color. Position/scale-only FLIP is a partial implementation and must be identified as such. Motion comparison must include forward, reverse, interruption, drag/release/exit and reduced mode, as well as the resting image.

Front, spine and back are also separate contracts. The audited front uses a title in up to three lines, right-aligned metadata above the divider and a mark at the top; the spine has a title, actual counter padded to five digits and a lower mark; the back contains only the centered mark. Font width is relative to the front UV region, not the entire atlas. The [factual profile](../assets/reference-profiles/desktop-material-reference-v1.json) preserves proportions, rasterization and code anchors. Waiting for the font or invalidating the texture after loading is necessary: redrawing an old texture does not update metrics. Compare text with the same name, count and projected size before increasing resolution or relief.

Trace **configured -> consumed -> rendered**. In the audited artifact, the base texture receives `repeat`, but the custom shader samples raw UVs without the corresponding transformation. Configured values do not prove effective weave frequency. Record local versus atlas UVs, units and regions per face; reusing the entire front map on a narrow spine changes density. Static sampling inference must remain distinct from capture of the shader/texture actually executed.

## Knowledge case: articulated passport

The [passport case](passport-polish-case-study.md) covers a wrapping shell, straight end caps, binding during gestures, continuous texture and light revealing curvature. It is a CSS 3D/DOM implementation in the source product, distinct from BookObject. The skill includes the lessons and manifest without exporting a `PassportObject` or supplying the application. Preserve the suitable engine already approved in the consumer; do not attribute shaders, physics or APIs to this case that it does not have.

## Available implementation: BookObject

"Approved BookObject" identifies the original component revision accepted in Pauta and recorded in the refinement case below. It does not mean approval of the reference application or certification of equivalence between the two engines.

For remaining differences in spine details, depth, paper, foil or sharpness, apply [package-to-pixel 3D fidelity](3d-reference-fidelity.md). Audit 1.11.1 recorded a baseline of six differences: UV/weave, optical function, paper, spine height/layout, Retina resolution and normal continuity. The [approved polish cycle](book-polish-case-study.md) later corrected the channel/rim, blending and foil, plus degenerate UVs on paper cuts. The distributed synthesis records the revision, tests and remaining differences; paired captures stay in the external authoring archive and may not accompany the skill. User approval applies to that observed result; the contracts below allow reuse and do not certify pixel equality or every adaptation.

[Original engine](../assets/book-object.js), extracted from Pauta and tested with Three.js 0.186.0. It is an example of a reusable component; it is not the desktop reference book or proof of equivalence to it. It contains no code, textures or branding from that reference. Static Canvas2D works without dependencies; volume uses Three supplied by the consumer. Retain Three's MIT license when redistributing the dependency. For a fidelity request, apply the gate above before considering this example suitable.

### Minimum example: static cover

Without `loadThree`, the result is Canvas2D. `interactive:true` alone does not create volume or enable rotation. Copy the asset to the project's served path; this example needs neither Three nor a reset button.

```html
<script src="book-object.js"></script>
<h2>Field notebook</h2>
<div id="cover-static" style="width:100%;height:360px" aria-hidden="true"></div>
<script>
const staticBook = BookObject.create(document.querySelector('#cover-static'), {
  title: 'Field notebook', brand: 'STUDIO', color: '#315463'
}, {interactive: false});
// On unmount: staticBook.dispose().
</script>
```

### Volume integration: active loader

The import path below must resolve the Three ES module **already available in the consumer**, with its associated files. Adapt it to the existing loader/bundler; do not automatically install or load a second engine. The asset exposes the global `BookObject` API, not a named ES export.

```html
<script src="book-object.js"></script>
<h2 id="title">Field notebook</h2>
<div id="cover" style="width:100%;height:360px" aria-hidden="true"></div>
<button id="reset">Reset position</button>
<script type="module">
const book = globalThis.BookObject.create(document.querySelector('#cover'), {
  title: 'Field notebook', subtitle: '12 observations', brand: 'STUDIO',
  brandMark: 'monogram', spineLabel: '00012',
  color: '#315463', inkColor: '#fbfbfc', pagesColor: '#f6f1e5',
  pattern: 'grid', material: 'cloth', finish: 'foil',
  width: 1.84, height: 2.53, depth: .36,
  pose: {pitch: 9, yaw: -18, roll: -2}
}, {
  interactive: true,
  loadThree: () => import('./vendor/three/three.module.js')
});
document.querySelector('#reset').onclick = () => book.reset();
// book.update({title: 'Field research', depth: .2});
// Inspect the back, retaining the initial pose's lighting calibration:
// book.setPose({yaw: 180}, {preserveLighting: true});
// Also update the DOM heading. On unmount: book.dispose().
</script>
```

`create` returns the instance immediately with a fallback cover; the current API does not offer a `ready` promise. The loader and first render are asynchronous and wait for the host to be in the viewport, the tab to be visible and the absence of `data-materials="static"` on the root element. To verify volume, give the host actual dimensions, make it visible and wait for `book.renderMode === 'webgl'` with a test timeout; do not assert this immediately after `create`. Also confirm the visible canvas and rendered volume in the browser. A resolved loader or isolated `webgl` state does not certify fidelity.

With OS reduced motion or `data-motion="reduced"`, volume may render, but gestures and interpolation are disabled; do not force motion to pass the test. Verify rotation/reset under normal policy and a static pose under reduced policy. `canvas`, `canvas-unavailable` and `canvas-context-lost` are fallback states, never approval of 3D delivery; record the cause or limit found. Preserve this fallback for failures and static preference without silently replacing the requested mechanism.

| Contract | Limits |
|---|---|
| `create(host, config, {loadThree?, interactive?, renderScale?, resolution?})` | Dimensioned host; returns a synchronous instance, without a `ready` promise. `loadThree` supplies the Three namespace directly or through a promise. Without a loader: Canvas2D cover, no automatic import. `renderScale` 1-2, default 2; default `resolution:'reference'` multiplies DPR clamped to .25-2; `'economy'` uses only renderScale; buffer <= 2048px per side |
| `update(patch)` | Partial content/material update rebuilds texture/volume. A patch containing only `pose` uses pose updating without rebuilding maps or mesh |
| `setPose(patch, {preserveLighting?})` | Updates configured pose without recreating maps/mesh; ends the gesture. By default recalibrates lighting for the new pose; `preserveLighting:true` retains prior calibration during inspection |
| `reset()` / `dispose()` | Restore the current configured pose / unmount idempotently. A late loader creates no scene; disposal in the same tick does not even start the loader |
| `config` / `renderMode` | Normalized copy / state `canvas`, `webgl`, `canvas-unavailable`, `canvas-context-lost`, `disposed` |
| `normalize(patch, base?)` | DOM-free validation; colors only `#RRGGBB`, enumerations and finite values |
| Geometry | Width 0.6-4, height 0.6-5, thickness 0.08-0.9, relative units; camera recalculates framing |
| Text and brand | Title up to 240, subtitle 120, brand 40 and `spineLabel` 12 characters. `brandMark:'text'` draws the textual brand; `'monogram'` uses its first code point. Does not accept arbitrary logos/URLs |
| Pattern | `panels`, `grid`, `rules`, `dots`, `stems`, `checks` |
| Material/finish | `material:'cloth'|'paper'|'leather'`; `finish:'foil'|'ink'`. Defaults `cloth` and `foil`; foil is restricted to the mark, without metallizing the title or entire cover |
| Colors | `color`, `inkColor`, `pagesColor` in hex; defaults `#3d4934`, `#fbfbfc`, `#f6f1e5`. `palette:null` or `{deep,lit,edge}` in hex; `null` removes the previous palette |
| Pose | Degrees; pitch +/-60, yaw +/-180, roll +/-18. Internal mapping `(-pitch,yaw,-roll)`, Euler order `ZXY`; release retains transient rotation, exit returns to the configured pose |

Out-of-range values are clamped; invalid values retain the previous value. The cover abbreviates titles to at most three lines, so the full title and actions remain in the DOM. Contrast between arbitrary colors is the consumer interface's responsibility. Arbitrary URLs/SVG/styles are not color inputs.

`spineLabel` is explicit content, not an engine-derived count. The consumer calculates the correct total, formats it and keeps complete information accessible; `String(total).padStart(5,'0')` preserves numbers longer than five digits, but the component field has a 12-character limit. Do not confuse library total, filtered total and ID. An original mark, even with similar placement, is an identity adaptation.

`setPose` changes the resting pose: after `setPose({yaw:180})`, `reset()` returns to 180 degrees. To restore initial framing, the consumer stores that preset and calls `setPose` again. When inspecting front/side/back, preserve lighting calibration: recalibrating at every orientation changes apparent material and undermines angular comparison. Older consumers passing Euler signs directly must review `pitch`/`roll`, not silently invert coordinates.

## Portable automatic color

The original `PautaLibraryColors` helper, distributed in `assets/library-colors.js`, is independent from BookObject and the DOM. `resolve({id,color,dark})` returns `{base,deep,lit,edge}` in hex; `auto({id,dark})` ignores explicit color, and `palette` contains 20 named colors. Pass `base` to `BookObject.color` and the other variations to `BookObject.palette`. It accepts and normalizes explicit `#RGB`/`#RRGGBB`, including legacy values outside the palette; absence, `null` or invalid values use automatic color. It is not a general CSS parser.

Persisting `color:null` retains automatic intent. Resolve again when theme changes and apply the same result to shelf, detail and library indicator; do not store the calculated hex as a manual choice. The `dark` option changes only the automatic branch. The helper uses FNV-1a over ID, stable hue by ID and OKLCH variations converted/clamped to sRGB. The audited desktop reference's frontend allocator `Sv` receives the whole list and resolves hue collisions; our helper permits repeated hues so reordering/adding libraries does not change an existing one. The reference also preserves only recognized-palette colors as explicit material colors and retains CSS OKLCH. These adaptations prevent promises of exact color correspondence with any list in the audited desktop reference.

## Maps and material response

Printed color, relief and reflection have different responsibilities. Choose channels according to the lighting model: PBR may use metalness/roughness; Phong uses specular response and shininess. Generate separate maps for distinct functions: text in the color map must not automatically become relief, and a cover with metallic detail must not receive that finish everywhere. Height/bump or normal describes the surface; the mask confines reflection to the finish. A gradient painted in the fallback communicates finish but does not prove physical reflection.

In BookObject, cloth, paper and leather vary in microstructure and relief. The version applied to Pauta uses `MeshPhongMaterial` extended through `onBeforeCompile`: pigment, custom bump, weave and specular mask have separate functions; foil adds procedural golden angular response only to the mark. This is an original Phong implementation, not a PBR material controlled by metalness/roughness or the audited desktop reference's complete `ShaderMaterial`. Historical internal channel names do not establish the renderer's equation. The fallback paints the finish without physical optical response.

The procedural mesh and its UVs/normals are original; front, back and spine have separate maps, and the page block uses smooth pigment with base grain/bump and Phong response. The current implementation retains 15 textures per scene: 9 front/back/spine-specific maps, 3 shared weave/grain/reflection tiles, 2 neutral support maps and 1 paper map. Check this count after changes without treating it as a universal budget. The reference's embedded mesh, reflection atlas, textures and proprietary shader are not distributed. Matching some proportions and coefficients does not eliminate differences in silhouette, mapping, bump combination, lighting and antialiasing. Fidelity of those aspects remains subject to the matrix, without a "100% identical" claim.

Relief requires compatible physical units and normal equations: the reference's custom shader uses raw derivatives, while the public Three helper normalizes vectors. The current extension compensates height delta by spatial-derivative length; formula tests and normal debugging should precede increasing black or bump. The binding's gloss band also depends on geometric curvature: sampling concentrated in the channel, a rounded rim and a flat printed field produce responses different from a fully curved cover or more global light.

Cap and bevel must share boundaries before deformation. Check closure/orientation, first contact between pieces and normals separately: a closed mesh may have a bridge with an incorrect profile; rays in one direction do not certify the entire visible joint. Paper inset measured at the first outer surface is `.020204W`, not the previous `.0364W`; the procedural microbevel remains an adaptation. On paper, cut UV islands also vary along thickness. Using X/Y for all faces collapses top/bottom and side cuts into a texture line, creating artificial striations. The correction duplicates only seams and preserves positions/normals; it does not require drawing more pages.

For materials, preserve overlay order, antialiased mask coverage and foil transformation accounting for cropping/`flipY`. A 96x96 generated field does not imply 2D consumption: cloth tension in this case reads fixed X and varying Y. These contracts are detailed in the [3D protocol](3d-reference-fidelity.md), with diagnosis before any compensation through color, blur or bump intensity.

Pose/camera updates should reuse geometry and maps; recreating textures on every movement mixes responsibilities and increases cost without changing content.

| Adaptation | Change | Preserve |
|---|---|---|
| Notebook | Pattern, title and thickness | Editable data, fallback, focus and disposal |
| Album | Landscape proportion, color, metadata | Fit based on geometry/host and full text outside the texture |
| Report | Reduced thickness, rules, brand | Reading order and actions independent of the scene |
| Nonrectangular packaging | Replace geometry/use licensed GLB | Quality policy, variants and states; requires another implementation |

## Cost and lifecycle

Shelves use Canvas2D; only selected detail creates WebGL. One context per item does not scale to hundreds of objects. Importing Three and starting rendering are different decisions. This asset runs no continuous animation at rest, uses `renderScale` 1-2 with DPR in `resolution:'reference'` mode and without DPR in `'economy'` mode, a buffer limited to 2048px per side and ResizeObserver; this does not establish a universal budget or measured FPS.

The shelf fallback suggests thickness through Canvas2.5D; it does not reproduce a 3D scene's physical projection. The audited desktop reference uses a shared renderer and Canvas2D snapshots, while Pauta detail uses its own context. Compare acquisition, memory, smoothing and cost through separation of responsibilities. Mobile testing here means a responsive browser unless explicit evidence indicates a physical device or native app. None of these alternatives implements opening a book, turning sheets or editing pages.

OS reduced motion or `document.documentElement.dataset.motion='reduced'` disables gestures/interpolation. `pan-y` preserves mobile scrolling. Loader/render/context failure retains the cover; it does not promise automatic WebGL restoration. On unmount, release observers, events, RAF, textures, geometry, materials and context; check imports finishing before/after disposal.

A static preference must prevent acquisition, not merely hide the canvas: no engine import or WebGL context on a static start. When switching from interactive to static, release resources and retain the fallback representation and DOM data. An already loaded module may be reused on return, but the renderer must be recreated on demand. After `WEBGL_lose_context`/`forceContextLoss`, do not reinitialize the same lost canvas; create a new canvas/context. Unexpected loss should retain the fallback and avoid repeated attempts on every update.

Visibility is part of lifecycle: a hidden tab or offscreen object suspends RAF and defers expensive creation/rebuilding. Resume with the latest data without replaying a queue of old states. Limit DPR according to actual host size and separate pose updates from material updates. See [motion](motion.md) for combined OS/app policy and the distinction between fine-pointer hover and intentional touch gestures.

Separate network, texture-memory and maintenance costs. Compressed-image dimensions are not decoded GPU size. Dependency injection avoids duplicating existing engines; shared caches need explicit ownership. For 2.5D/GLB and product variants, read [immersive web](immersive-web-tech.md).

## Profile and text export

Stored name, displayed name and export are separate contracts. Preview may explicitly clamp/ellipsize while keeping full text accessible. Export must measure the actual font (`measureText` or equivalent), wrap long words/tokens, reserve name/role/metadata blocks and fail clearly if content does not fit. Do not silently truncate data. Validate the opened PNG, not only Blob size. Include long names without spaces, accents and CJK according to the supported audience.

## Verification

Run from the skill folder:

```bash
node --test tests/book-object.test.cjs tests/book-geometry.test.cjs tests/book-material-fidelity.test.cjs
```

`book-object` verifies normalization, framing, long lines, fallback, late import, render/context errors and disposal. `book-material-fidelity` verifies blending actually installed in the shader, deterministic fields, antialiased coverage, foil orientation and preservation of unaffected materials. `book-geometry` verifies closure/orientation, channel/plane/rim normals, bridge contacts, the previous oblique hole and two-dimensional UVs on paper cuts. Formulas and geometry without GPU execution do not prove the executed shader or browser appearance.

Test presets, desktop/mobile resize, interaction, reset and static mode; declare separately what was seen. Use screenshots of the final implementation, never reference screenshots as proof of delivery. Record the **observed** viewport, not only the width requested from the tool; wait for the final pose and hold light/calibration constant during angular comparison. Size the angle matrix by object risk - the audited case's 32 poses are a sample, not a universal requirement.

Include regressions for zero acquisition in static mode, static/interactive switching with a new canvas, visibility pausing, policy changes during a gesture and idempotent disposal. Counting contexts/imports/pending frames verifies lifecycle; comparing gloss, relief, colors, legibility and export requires separate visual inspection. Do not record that inspection as complete merely because renderer tests passed.

To also execute geometry using actual Three, supply a compatible Three 0.186 ES module already present in the project:

```bash
BOOK_THREE_MODULE=/absolute/path/three.module.js node --test tests/book-object.test.cjs tests/book-geometry.test.cjs tests/book-material-fidelity.test.cjs
```

Without `BOOK_THREE_MODULE`, cases requiring actual Three in `book-object` and `book-geometry` are explicitly skipped; the others require no dependency. Do not turn those skips into geometry approval. The variable injects the consumer's dependency; do not install another engine merely to run the example. Historical results described in the [approved case](book-polish-case-study.md) belong to the hash identified there; original captures stay in the external authoring archive. After adapting the component, rerun relevant tests and visual comparison; retain remaining differences and measured cost without inferring FPS from triangle count.
