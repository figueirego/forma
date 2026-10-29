# 3D object fidelity: from package to pixel

Use when the same library, colors, or similar proportions still produce a different object. This protocol complements [reusable objects](reusable-objects.md) and [reference fidelity](reference-fidelity.md). Desktop reference values below belong to artifact 0.19.0 audited on 2026-10-26; they are not universal defaults. The [book polishing case](book-polish-case-study.md) summarizes diagnosis, corrections, tests, and limits, with capture traceability in the external history of the user-approved result; reuse the method, not the parameters as a recipe for every object.

## 1. Fix identity before seeking another technology

Identify installer -> application/payload -> ASAR -> module -> asset -> runtime separately. Preserve originals, size, SHA-256, analyzed selection, and offset base. Identical versions do not prove identical bytes; different bytes do not prove different algorithms.

In the supplied desktop artifact, the DMG ASAR is byte-for-byte identical to the installed Mac ASAR. Windows modules `LibraryBook`, `clothweave`, `bookforge`, and CSS have identical text after normalizing only hashed asset references and CR escapes before LF in GLSL strings. The 33 compared renderer WOFF2 files are identical. Semantic equivalence of the complete main renderer was not proven. Hashes, rules, and limits are in the [factual profile](../assets/reference-profiles/desktop-material-reference-v1.json).

Identified technology: Electron 42.11.12, Three 0.186.0, embedded mesh with UVs/normals, custom Phong `ShaderMaterial`, procedural textures/atlases, WebGL scene, and copy to Canvas2D. Windows ANGLE/Direct3D/Vulkan DLLs are bundled components; they do not demonstrate which backend ran. Static extraction does not validate Windows installation, drivers, FPS, or rendering.

## 2. Minimum contract for each parameter

Trace **declared/configured -> consumed -> used in shader/layout -> observed at runtime**. A present uniform or configured `Texture.repeat` does not prove its effect. For each field, record:

| Field | Example of a useful specification |
|---|---|
| Origin and certainty | Module + hash + zero-based UTF-8 byte; statically confirmed, inferred, observed, or proposed |
| Consumer | Expression reading the value and branch using it |
| Domain/unit | Local or atlas UV, centimeters or normalized mesh, CSS px or buffer pixels |
| Region/channel | Front, spine, back, paper; diffuse, height, normal, mask, or reflection |
| Transformation | UV matrix, scale, color space, composition, and operation order |
| State | Rest, hover, drag, leave; fixed or recalculated calibration |
| Verification | Measurement, fixture, agreed tolerance, and evidence; pending if not executed |

Example: "bump .006" is incomplete. Specify the map, mesh physical unit, actually sampled UV, combination with custom relief, and normal perturbation. In the audited desktop reference, base/custom are combined through overlay before one perturbation; two successive perturbations produce a different result.

## 3. Weave and registration per face

**Confirmed in code:** base texture 256x256, 32 cycles per axis, weights .58/.42; diffuse with noise interpolated on a 4x4 grid and amplitude .055. `repeat` receives approximately 4.338446x3.298071, but the audited shader passes and samples raw UVs without the corresponding matrix.

**Static inference, without an executed-shader capture yet:**

| Face | UV extent | Inferred cycles in the region |
|---|---|---|
| Front | .4346x.7545 | 13.9072x24.1440 |
| Back | .4346x.7544 | 13.9072x24.1408 |
| Spine | .0834x.7364 | 2.6688x23.5648 |

Sample a 512-point line in each region outside the pattern/foil and record orientation/period. Confirm the path at runtime or retain the inference classification. An initial tolerance of +/-1 cycle can accommodate partial ends but needs project acceptance. Reusing 60 full cycles on every face makes the spine much denser than the cover. Increasing bump does not fix frequency or registration.

**Generator and consumer are different contracts.** In the audited cloth-tension field, the periodic field is generated at 96x96, but the consumed expression samples `s(0,f)`: fixed X, only Y varies. The effective result is smooth 1D tension. Replacing it with independent X/Y noise changes the material despite identical resolution, seed, and amplitude. Pigment grain, by contrast, uses a two-dimensional 4x4 periodic field. Verify deterministic samples, continuity, and coordinates actually read; do not infer dimensionality from generator size.

### Edges and cuts: UVs must represent the surface

A smooth texture can become streaked when UVs lose a dimension. In Pauta, projection `(x/W+.5, y/H+.5)` worked for the front but was reused on page cuts: top/bottom vary in X/Z with constant Y; the side varies in Y/Z. Z thickness did not change UVs, producing rank-1 mapping and repetition of one weave row. Blur, less bump, or another color would merely hide the cause.

For a two-dimensional textured surface, inspect each nondegenerate triangle's UV area and variation across thickness. Use coherent per-face islands: width/thickness on top/bottom, height/thickness on the side cut. Split seam vertices when necessary without letting a triangle span two islands; preserve positions and normals when only unwrapping needs correction. Verify **effective UVs after** shader region transformation: local UVs with transformation or atlas UVs with identity are alternatives, not cumulative steps. Compare frequency in both directions and visually confirm grazing views. In the approved case, this adjustment eliminated zero UV areas and strong streaks without altering paper geometry.

## 4. Depth, normals, and patterns

Valid meshes and plausible silhouettes do not guarantee the lighting of spine channels, shoulders, or corners. The reference supplies its own normals. In the audited front region, including transitions, 85 of 396 vertices have `abs(normal.y)>.001`. This count is not a target: continuity of surface orientation is the relevant property.

Compare horizontal and vertical sections in flat regions, channels, and extremes; 2%, 5%, 50%, 95%, and 98% are an initial sample to adapt to the object. Record silhouette, channel position/depth, normal angles, cover/bevel continuity, and contact with pages/spine. The highlight band describes surface orientation: a channel with similar height and different normals produces a different highlight. Compare curvature and normals under fixed lighting before changing light intensity.

Y curvature must exist **where the profile requires it**, not across the entire printed field. The approved correction removed broad cover deformation and retained a plane until the localized rim transition. It increased sampling density in the channel and replaced a linear bevel with segmented rounding; it did not uniformly densify the whole mesh. Duplicated vertices without a normal rule can create a bright seam. Counting nonzero normals does not replace checking their location, direction, and continuity.

### Normal derivatives: verify the consumed equation

The desktop reference book's custom shader uses **raw** spatial derivatives for tangent vectors (byte 756887 of Mac `bookforge`). The same bundle also contains Three's stock helper with **normalized** derivatives (byte 171104). The first occurrence of a function name does not identify the component's actual path.

In the normalized helper, passing only `deltaHeight * bumpScale` loses physical length per pixel. To preserve the raw helper's result, divide each delta by the corresponding spatial derivative's length before perturbation, or use an original mathematically equivalent implementation. Test orthogonal/oblique tangents, object scale, and resolution; make numerical policy explicit for degenerate derivatives. Amplitude `.07 * W/15.8778` alone does not prove equivalence.

Ideal fixture: Pauta physical width 1.84, projected front 248 px, one full transition per pixel, weave disabled. Height 128 -> 95 corresponds to 8.053 degrees with the physical formula but only 0.06015 degrees in the uncompensated normalized helper; 128 -> 54 gives 17.604 degrees versus 0.13488 degrees. These are ideal sampling-dependent calculations, not universal screenshot measurements. The algebraic check executed across 1,000 tangent/scale cases found a maximum angular error of 3.2e-15 degrees between the two compensated formulas outside the clamp. This does not prove GPU compilation or appearance. A proposed initial limit of 1e-4 degrees permits numerical regression without requiring byte identity.

### Closure: visible surfaces and shared boundaries

Measure the first external intersection, not only vertex extremes. The audited paper has source external cut `z=-7.5973`, external cover `z=-7.9181`: setback `.0202043104W`. Previously used `z=-7.3398` was interior and overestimated setback. Head/tail at `|y|=10.1677` give inset `.0195115192W`. Sampled sections do not support concavity at the cut's center.

The spine foot has a bridge: inset from the cover edge approximately `.014681W` at nominal left, `.000932W` at 1.2%W, and `.019512W` at 2.5%W. This is a lower-section measurement, not a universal symmetry rule. An original bridge may use these limits; identify its bevel radius as proposed when unmeasured.

Test each closed mesh **and** the visible union between meshes. Cap and bevel boundaries must share the same discretization before deformation: many cap vertices with one long straight bevel segment open a gap at a curved channel. Welding normals alone or using DoubleSide does not reconstruct volume. Separate three checks: edge closure/orientation and nondegenerate triangles; first external contact and overlap between pieces; normal direction/continuity. A closed mesh can still have an incorrect profile or reflection.

Check oblique rays from front/back and above/below, concentrated at the suspect junction. Historically, 400 lower vertical rays passed in Pauta, but an oblique ray exposed a white sliver. The repair retained shared discretization; later polishing replaced the bridge's central fan with strips following the side wall. The former region passed 841 rays, and all four meshes passed closure checks. Sides, back, and cuts received their own visual evidence in the [approved case](book-polish-case-study.md). Ray count alone does not prove coverage of every direction or proportion.

For each of the six patterns, separate shape, spacing, mask, relief sign, border, and physical scale. Capture diffuse and height channels separately, then grazing light at front/side/back. A painted dark line and a cavity are not equivalent. Define tolerances over profiles and shadows; equal vertex counts are not a criterion. Reconstruct original geometry from measurable profiles without incorporating proprietary arrays.

### Articulated objects: locate the surface and preserve the fit

When "the spine" looks like a strip or the cover swallows the pages, first identify the visible part: page-block cut, outer fold skin, lining, rim, and free corner can overlap in projection. An annotated view or temporary color isolation reduces ambiguity. Check front and back; fixing one view does not establish a correct shared boundary.

A wrapping cover is a shell: exterior and interior joined through thickness, not a fill of the outer chord over the page block. Faces, rims, and end caps must share contours, local space, and precision. Fractional local dimensions are not interchangeable with integer measurements or an already transform-projected box. In articulated objects, also check attachment and tangency during motion, not only at rest.

With approved geometry, insufficient perceived thickness can come from weak grain or uniform lighting. Separate grain amplitude/scale from angular response. On segmented surfaces, record U by length and calculate light at shared vertices; restarting the texture or assigning a different constant color to each strip creates seams. A flat texture extension replaces end caps only when occupied surfaces are equivalent. Zero radius, dimensions, and lighting in the [passport case](passport-polish-case-study.md) are local parameters, not defaults for another object.

Measure rigid transformation, deformation, and painting separately while retaining all writes in the total count. Update direct consumers only when their data changes; confirm no work at rest. A costly mask across hundreds of surfaces does not justify banning masks in all UI. Node replay and RAF intervals do not measure GPU/FPS; confirm perception separately in the renderer.

## 5. Metal, paper, and color have their own paths

**Composition:** record which operand chooses each blend branch. Overlay is not commutative: `overlay(grain, pigment)` can differ from `overlay(pigment, grain)`. In the audited material, grain decides multiply/screen; swapping operands changes light distribution without changing hex values. Test the installed shader expression using dark/light channels and intermediate samples before compensating exposure.

**Reference foil:** mask only on the mark; a 2D field with six gold stops and radial lighting. Sine/cosine use perturbed normals and unnormalized view position, detail 2.2 and UV size (.14,-.19). Blend .6; base specular .04 + coverage x 1.72. Copying numbers into a two-color ramp or normalizing view position changes the shine path. Scaling the mesh requires compensating coordinates in physical units.

In a linear coverage mask, nonmetal regions must be true zero and antialiasing must preserve values between 0 and 1. Distinguish coverage, encoded value, and consumer result: `10/255 ~= 0.0392` becomes zero through `step(.1,mask)`, so a nonzero background alone does not prove a halo on that path; the same threshold destroys intermediate coverage. Removing the threshold also requires fixing the background or decoding a proven offset. Base specular and masked contribution are separate terms.

When extracting a reflection field from the atlas, derive scale and orientation from the crop and actual texture `flipY`. In the Pauta correction, both `CanvasTexture` instances use `flipY=true`: separate V became `1-(.19/.197)*(.5+.5*cos)`, avoiding a double inversion. That formula belongs to that crop; for another atlas, test source/destination corners and derive its transformation. Counting code inversions without composing upload, crop, and sampling does not determine final orientation.

Compare poses `yaw=-60,-30,0,30,60`, `pitch=0,28.65`, under constant lighting and calibration. Record mean color, highlight centroid, and maxima order for the same mask. An original brand mark's shape is an identity adaptation; evaluate optical function with an authorized test mask. Do not invent pixel tolerances after viewing the result.

**Reference paper:** pigment #f6f1e5 in a smooth atlas region, using the same material as the rest of the mesh. Base diffuse/bump, shininess 8, and reflectiveness .04 remain active where custom bump is neutral and foil is zero. This does not call for page stripes. Compare front/top/bottom cuts at yaw 0/45/90; grainless paper with shininess 1 and zero specular is another material. If streaking persists after grain correction, check edge UV dimensionality described above, holding material/light constant to isolate the cause.

**Color:** record pigment, texture spaces, conversions, and output. The reference uses `NoColorSpace` maps, linear sRGB output, and light compensation based on the resting frontal normal, limited to .62-1.5. "Exposure .7" here is not `toneMappingExposure`. While rotating for inspection, retaining initial calibration avoids relighting each face and losing front/back differences. A hex name alone does not determine appearance.

## 6. Cover and spine typography

Confirm the actual font file selected by `@font-face`, axes, weight, loading state, and metrics before rasterizing. The renderer uses Inter Variable, `inter-latin-opsz-normal` variant at 72,920 bytes; the extension's `inter-latin-wght-normal` at 48,256 bytes is a different asset. "Inter" does not identify the variant. The profile records the renderer variant's hash.

Front: title .078 of front width, Inter 500, up to three lines; metadata .34 of title size; inset .105 of width. Spine and back have their own compositions. On the audited spine:

- Title/counter appear only in diffuse; they do not create custom relief. The lower mark has mask/relief/foil.
- Centering uses `actualBoundingBoxAscent/Descent`, UV compensation, and rotation.
- Title start approximately 5.2241% of strip height; font approximately 3.2444% of that height.
- Measure and reserve counter + mark before ellipsizing. Do not compress glyphs with `fillText(..., maxWidth)` instead of laying them out.

Fixture: `Teste / 01288`, then a long name with 5- and 8-digit counters. Compare the flat atlas and tilted object. In the spine custom-height channel, text must remain neutral #808080 outside the mark if that is the selected mechanism; base weave is another channel. Baseline/centering may use a proposed initial tolerance of +/-1 texture pixel, explicitly distinct from CSS px.

## 7. Resolution in three stages

Record **atlas -> scene buffer -> final output** separately. "2x" without a denominator is ambiguous.

In the audited desktop reference, `LibraryBook` passes `min(DPR,2)` and the engine applies an additional supersampling factor of 2 before copying. At DPR 2, the WebGL buffer reaches 4 pixels per CSS px on each axis and the Canvas2D output reaches 2. Revised BookObject defaults to `resolution:'reference'`: multiplier `renderScale * clamp(DPR,.25,2)`, with `renderScale` 1-2 (default 2) and a 2048 limit per axis. `resolution:'economy'` uses only `renderScale`. The detail view delivers WebGL directly without the reference's Canvas2D copy/downsample: this is a presentation/budget adaptation, not pipeline equality. The previous revision used 2 per CSS px independently of DPR; that difference is historical baseline, not a description of the current candidate.

Measure CSS rect, canvas size, drawingBuffer, DPR, atlas resolution, and capped scale at DPR 1 and DPR 2. Compare tilted fonts, diagonals, and patterns at the same projected size. Increasing 2x -> 4x quadruples buffer pixels; evaluate cost before adoption. Do not promise FPS, exact memory, or resolution of every defect merely by increasing the buffer.

## 8. Gestures and transitions are part of the object

The profile records hover 11/7 degrees, drag .42 degrees per px, 120 ms smoothing, dt capped at 64 ms, and poses. These values require matching axis/Euler conventions, gesture origin, viewport, capture state, and release/leave handling. Compare trajectories with identical coordinates/times; a screenshot does not demonstrate motion.

The desktop reference interpolates position/scale, 3D pose, and cloth color over 460 ms. Isolated 2D FLIP does not reproduce that transition. Verify interruption, scroll/resize, color changes during motion, touch, keyboard, and reduced motion. On mobile, separate scrolling from dragging and provide pose controls; declare adaptation when gestures change.

## 9. Implementation and acceptance order

1. Fix build/hash, loaded font, content, palette, pose, resting light, and DPR; disable random variation in fixtures. Save a baseline before editing.
2. For each discrepancy, record symptom -> suspected mechanism -> discriminating measurement -> smallest patch. Correct silhouette/channel/normals before compensating lighting; check UVs and physical scale before changing texture or bump.
3. Create a regression that fails on the defect and passes on the patch. Separate algebra/material, actual GPU-free geometry, lifecycle, and rendered image; one category does not replace another. UV changes must preserve position/normal, and material changes must preserve uninvolved channels. To protect an arc, measure profile positions: a linear bevel can also have intermediate smoothed normals. Confirm that reverting only the corrected mechanism makes the regression fail.
4. Compare again in stabilized poses and equal conditions; wait for final state, not an arbitrary timeout during interpolation. Inspect every relevant face, cut, and junction, adding grazing views where defects appeared. Pauta's 32-pose matrix is sampled coverage, not a universal count or proof of infinite angles.
5. Measure **observed** CSS viewport, host rect, DPR, and buffers. If an override does not apply, adjust the harness or declare the limit; an iframe with measured CSS viewport can validate responsiveness, not touch, mobile hardware, or native applications. Correct harness errors without attributing them to the product.
6. Check resolution/cost and preserve gestures, fallback, reduced motion, and disposal. After the last patch, link code, tests, and captures by hash; if they differ only in a comment, record and verify that difference. Revalidate affected dimensions instead of reusing an earlier version's approval.

For every dimension, publish reference, implementation, measurement, agreed tolerance, outcome, and pending items. Do not widen tolerance to approve a failing patch; revisit the cause and correct it. Keep intentional branding/adaptation differences explicit. User aesthetic approval accepts that result; it is not pixel identity, proof of all variants, or a performance benchmark.

### Evidence from the approved cycle

The [polishing case](book-polish-case-study.md) gathers baseline `0d34c0b4726e`, final revision `17bf1f572d0e`, 32 poses, tests, and independent review. The final version passed 176 Pauta tests and responsive inspection at observed CSS viewports of 390x844 and 1280x900. Gaps and strong streaks did not recur in recorded poses; small differences remain in the rim, paper/spine junction, and brand mark. The increase from 25,132 to 33,436 triangles was accounted for without a GPU benchmark. These numbers document that cycle; new adaptations must produce their own evidence.
