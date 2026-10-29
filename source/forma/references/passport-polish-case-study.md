# Articulated passport: fit, leather and light

Case approved on 2026-10-27, incorporated into Forma 1.17.0. Consult it to correct a cover that looks like a strip, a drooping corner, pages that separate during a gesture or leather without a readable sense of volume. The general method remains in [3D fidelity](3d-reference-fidelity.md); this case adds diagnosis of an existing articulated object.

## What was approved and what is available

The user approved Neuron v03.17.1 after successive geometry, texture and lighting corrections, and requested incorporating the knowledge into the skill. The mechanism is **articulated CSS 3D/DOM**, with thickness surfaces, covers, a page block and a segmented sheet during turning. It is not the distributed BookObject/Three, does not use a PBR shader and does not physically simulate leather or paper.

This reference and the [manifest](../assets/audits/passport-polish-2026-10-27/manifest.json) distribute knowledge, contextualized parameters and hashes. **They do not distribute the approved CSS passport component**, its application, user profiles, document photographs or national covers. Running that original passport requires its project; this synthesis is self-contained for applying the lessons. Since 1.30.0, a separate [PassportObject](reusable-components.md#passportobject-integration) supplies a simplified executable Three adaptation. It is not this historical implementation and does not inherit its approval or geometry/material fidelity. [BookObject](reusable-objects.md) retains its own unchanged contract and code.

## Symptom -> cause -> correction -> proof

| Observed symptom | Cause identified in the project | Correction and discriminating verification |
|---|---|---|
| "A strip glued over the pages" | A cap filled the fold outline with a chord; the root wall closed the cover as an independent slab | Represent the outer skin, lining and thickness between the two outlines. Avoid filling the page-block space. Check the oblique section and visible surface identity, not just the front |
| Corner/gap where pieces meet | Faces used fractional CSS dimensions; rims used rounded `clientWidth/clientHeight` | Use the same local measurement for faces and rims, obtained on resize. Test endpoints and clearances at fractional dimensions; do not read layout every frame |
| The back-cover tip drooped while the front looked correct | The end cap interpolated one straight root and one rounded root | Align the root contracts of front, back, lining, rim and paper. In this case, both roots became straight and the end cap preserved X/Z to the cut plane; free corners remained rounded |
| Cover/sheet moved away from the binding during drag | Gesture/projection and connecting surfaces did not share the drawn trajectory | Keep the sheet seam in the page block and connect the moving panel through a flexible groove. Make the cover, fold and joints use the same pivots; dragging follows the actual tip projection. Test forward, reverse, interruption and partial opening |
| Repeated texture in narrow bands | Each face restarted at U=0; outer end caps had no grain | Accumulate U by effective length, excluding overlap used against seams. Paint leather continuously to the cut where surfaces are geometrically equivalent. Test registration when closed, intermediate and canceled |
| After smoothing, leather looked like thin tape without body | Reduced relief/opacity and almost constant pigment hid the already correct curvature | Moderately reinforce grain and calculate lighting at arc vertices, sharing colors between faces. Compare rotation with geometry frozen; do not automatically thicken the object |
| Dragging stalled | Masks across hundreds of triangles and updates to unchanged surfaces increased work | Equivalent triangle painting without masks, geometry/sheet caching and property-based invalidation. Measure nodes, geometry, material, layout, RAF and actual browser painting separately |

The user called different regions the "spine." First identify the surface using an annotated view or temporary isolation: curved strip, page-block cut, rim, cover root and free corner have different causes. Nearly collinear projections can mislead. Do not turn the user's terminology into a premature choice of which piece to edit.

## Approved geometry is a local contract

In the final result: 0.45 CSS px cover, 4.74 px closed envelope, paper inset by 1.5 px, straight root, 13 px free corners, an arc in 12 strips and 624 triangles in the end caps. These are units/model details of this prototype, not actual passport measurements or defaults for another book.

Useful invariants: meeting boundaries, corresponding thickness, no cover intersecting paper and the same section at the straight end cap. The "zero radius" rule applies to this approved root; it does not require straight corners on every object. After geometry approval, revisions v03.16/v03.17 preserved constants, positions and gesture functions.

Continuous outer painting works here because all end-cap lines keep exactly the same X/Z as the central faces. Extending the 12 faces to the cut planes and leaving the outer triangles unpainted is equivalent **in this geometry**. If the end cap has actual longitudinal curvature, that substitution is no longer valid: map the texture onto the curved surface. The light core and lining remain separate materials.

## Perceived volume without another layer

In v03.16, the edge texture had SVG relief 0.85, opacity 0.22 and pigment between 96-100%; the user perceived a lack of body. v03.17 uses periodic `feTurbulence`, frequency 0.28/0.32, three octaves, seed 8, `surfaceScale=1.65` and opacity 0.38. Grain is a shared SVG image combined through soft-light, not a live filter applied to every element. The 122 px scale and these values need recalibration according to projected size, material and renderer.

For this arc, at vertex j: `theta = PI*(1-abertura)*j/N`, local normal `(-sin(theta), 0, -cos(theta))`. Transform the normal through the same object orientation; in the CSS used, application order is roll -> yaw -> pitch. A fixed light calculates broad shading and a broad, low-intensity reflection. Generate N+1 colors and use the same value at the end of one face/start of the next to avoid pigment bands. The formula and manifest coefficients are a visual approximation for this consumer, not equivalence to another product's shader.

Update only when opening/orientation changes, directly on the 12 faces. Cache the final painting to avoid identical writes. Do not propagate material variables through an ancestor with hundreds of descendants. Translation and rest do not require recalculating directional light; a point light's position would have a different contract.

## Recorded verification and cost

- **Geometry and gesture:** regressions for uniform section, outlines, thickness, attachment during opening, cancellation and removal of pending work. These do not prove physical simulation.
- **Material:** continuity test between faces and response to rotation without changing transform/width/U. The baseline had no lighting response to rotation; after correction, it does. The Neuron suite recorded 89 passing tests.
- **Final rendering:** front, back, closed spine, cover held at 50% and keyboard rotation, in a local browser. The lab uses synthetic gestures and demonstration data; this is not equivalent to physical touch. The main profile loaded CSS and modules 3.17.1 without observed errors.
- **Node replay, 59 frames:** rotation increased from 354 to 617 style writes (263 for material), without new geometry/layout/node writes; opening added 304 material writes. Moving and turning the sheet retained their previous cost; RAF was empty after rest. Painting cost cannot be excluded from the total simply because it is not geometry.
- **Limits:** no GPU/FPS benchmark of the final revision, no universal country/theme/device matrix, no physical mobile test in this revision. Mask timings from intermediate geometry do not represent final-geometry performance.

The manifest pins hashes of code and external evidence. The 89 tests belong to the approved product, not the skill's structural validation. A skill copy remains usable without the authoring folder, but cannot claim to have rerun the passport without its consumer. For a new integration, produce new evidence and obtain its own visual acceptance.

## Pages, divider and content - subsequent learning through v03.23.0

This extension records corrections after the v03.17.1 manifest; it does not change its hashes or transfer its approval to new poses. Source: Neuron conversation, code and integration documentation. This historical extension does not distribute its CSS component; the later [simplified Three component](reusable-components.md#passportobject-integration) is a separate implementation.

**The page starts at the hinge; text starts at its inset.** Do not confuse editorial margins with the beginning of the physical surface. Paper must continuously cover seam -> curved section -> sheet on both sides. A flat central strip with a shadow does not replace two surfaces reaching the same binding. Define shared position and tangent where the curve joins the sheet; keep the root attached, compatible upper/lower height and smooth volume without arbitrarily moving the turning pivot to the content margin. Evaluate geometric mirroring separately from legitimate text asymmetry.

In the consumer, connecting curves between seam and sheet use sampling concentrated at the ends to avoid a corner at the transition without indiscriminately increasing face count. Texture and shading use continuous coordinates over effective length. Restarting the background on every strip or including antialiasing overlap in accumulated length causes lines, stretching and tone changes. The text inset must not create another edge, shadow or texture on the flat sheet.

**A light line is a symptom, not a single cause.** Inspect the cover image, CSS outline, rasterization between faces, painted-face direction and lining intersecting the cover. In the inspected mechanism, overlap that removes paper gaps can also leak when closed: limit its extent by distance to the moving inner plane. Do not eliminate a front line by creating the same line on the back, or use scale/blur to hide intersections. Check front, back, grazing views and opening stages with fixed light/theme; record the poses actually sampled without promising every continuous angle.

**Attractive content must fit the usable page.** Size engravings/SVGs according to the page rectangle after insets and the fold strip, with a viewBox containing the complete artwork. Crop only when intentional and approved. For extensive data, establish hierarchy: identity, essential information, action and decoration. Reduce secondary text or remove its presentation when authorized while retaining editable data; do not squeeze everything until unreadable. Art can enrich free areas without competing with the photo/name or representing fictitious progress. Test long names/goals, missing photos, every sheet and intermediate turning states; an animation clone must retain the same content and framing as the stable sheet.

**Framing and gestures belong to the consumer.** Use available panel dimensions and the projected opening envelope, not just the book's closed width. Separate presentation orientation/position from persisted profile data. When direct gestures replace explicit modes, arbitrate between page corner, surface and clickable control; retain arrow/keyboard alternatives and reduced motion. Canceling, resizing or changing data during movement must not detach the root or leave old sheet copies.

Transferable verification: boundaries/tangents and nonintersection in geometric tests; painting continuity in fixed poses; gesture with forward/reverse/interruption; resize with both pages open; extreme content in every spread; inspection of the served file. v03.23.0 records report 148 product tests and desktop windows from 800x600 to 1440x900. These are historical evidence for that revision, not current skill execution, an FPS guarantee or native-installer validation.


## Executable extraction and exact comparison

The [NeuronPassport adapter](reusable-components.md#neuronpassport-integration) packages the approved v03.23 JavaScript and the current CSS explicitly authorized for the 2026-10-29 comparison. These are preserved source files, not a Three translation. The full historical CSS revision was unavailable; do not erase that distinction. A same-origin frame protects host styles and keeps the original system/Georgia typography, leather layers, page grain, glint and ground shadow. National artwork remains an external, attributed resource rather than bundled Forma artwork.

Match actual yaw, pitch, scale and pan: the engine derives glint position/angle from yaw and ground placement from pan/scale. Match viewport, container query context, DPR, browser/GPU, theme, material policy, content and loaded asset bytes. The Neuron Settings host also supplies page-width and font rules; an isolated object comparison alone cannot prove that consumer. Compare closed, open, turned, oblique and held corner states before, during and after input. Record pixel differences and inspect the images; do not infer fidelity from a shared source hash alone.

Keep BookObject, LibraryColors, AppearanceEditor and the approved workspace intact during passport extraction. The earlier simplified Three module is retained only for existing consumers and must not be selected to fulfill a Neuron-fidelity request.
