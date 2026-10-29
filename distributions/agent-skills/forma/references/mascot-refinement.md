# Mascot refinement: identity, presence, and behavior

Use to refine an existing 2D, 2.5D, or 3D character, or translate an authorized identity across media.
The objective is to preserve recognition and improve presentation, response, and integration.
Do not impose voxels, matte finishes, rigs, GLB, WebGL, or a specific library.
Choose the smallest mechanism according to [immersive web](immersive-web-tech.md); a static SVG can be the complete solution.

## 1. Fix identity and evidence

Before changing anything, record the authorized reference, version, states, viewport, DPR, and desired behavior.
Separate what was observed, confirmed in code, calculated, inferred, and proposed.
Describe invariants: silhouette, proportions, negative space, face, palette, and recognizable character cues.
Also identify what may vary: expression, pose, finish, lighting, setting, and motion.
A frontal image does not automatically specify the back, sides, depth, or joints.
Treat these regions as design decisions when the source does not show them; do not claim unknown fidelity.

| Layer | Question before refining |
|---|---|
| Identity | Is the character still recognizable at small sizes, in silhouette, and without animation? |
| Form | Do openings, thicknesses, and joints exist in the chosen medium? |
| Presentation | Do camera, light, background, and shadow make the form legible? |
| Behavior | Does the reaction communicate the action and retain control over interruptions? |
| Integration | Does the same state remain true in the poster, text, and controls? |

## 2. Silhouette, negative space, and thickness

Compare contour, landmarks, and openings in relevant poses before adding texture or effects.
In 2D, examine paths, masks, and alpha; in 3D, examine surfaces and occlusion while rotating.
A region painted in the background color is not equivalent to an opening: test another background and an oblique view.
A real opening can disappear through projection or natural occlusion in profile. Define which poses should allow a line of sight through it; do not deform identity to keep the opening visible from every angle.
Define thickness by region and relative position; uniformly thickening everything may erase the reference's character.
Thickness is one dimension; topology determines connections, openings, and continuity. Correct each separately.
Remove coincident internal faces when they do not serve the effect; preserve internal surfaces that may become visible.
Check normals, seams, exposed edges, and z-fighting; `DoubleSide` does not reconstruct missing volume.
Do not impose closed meshes on planar illustrations: validate geometry according to the product's allowed angles.
For cuts, mesh joins, UVs, and geometric tolerances, follow [3D fidelity](3d-reference-fidelity.md).

## 3. Support, shadow, and pivot

Define whether the character rests, floats, hangs, or occupies a graphic plane; shadows must support that decision.
Choose shadow-casting objects, shadow receivers, and objects independent of the setting separately.
A transparent receiver can integrate shadows into the background; a drawn shadow may suffice in 2D.
Locate the pivot according to the action: foot support, joint, rotation center, or suspension point.
A foot pivot does not prove absence of interpenetration: tilting, jumping, and deformation alter contact.
Test the allowed pose range and return to rest; look for sinking, sliding, and position jumps.
Separate the fixed base and moving character when that is the visual contract.
Calibrate shadow softness, bias, range, and resolution at actual scale; do not import another object's values.

## 4. Material, lighting, and color output

Specify pigment, surface response, key/fill light, background, and color conversions together.
The same HEX under different lighting, exposure, tone mapping, or alpha composition does not necessarily produce the same pixel.
Record input/output color spaces, renderer, tone mapping, and subsequent filters/composition.
In 2D, also record profile/export, alpha, and CSS effects that change presentation.
Start with a simple light or composition that reveals form; add mechanisms only for visual need.
Use metal, translucency, gloss, roughness, or texture when they belong to the identity, without a universal preference.
Compare front, profile, and back on planned backgrounds and variants; do not compensate for every contrast failure with stronger light.
Choose an explicit theme policy: change the setting, finish, lighting, or a controlled combination.
If custom shaders exist, confirm which material consumes them; a shader present in the project does not describe every object.
Sampling, normal, and pipeline details belong in [3D fidelity](3d-reference-fidelity.md).

## 5. Face and expression without mandatory complexity

Define a small expression language consistent with existing features.
Paths, sprites, planes, texture swaps, blend shapes, or rigs are alternatives; use the smallest option covering the poses.
Keep eyes and mouth aligned with the surface and perspective; check occlusion and distance in oblique views.
When placing plates over the mesh, avoid both coincident surfaces and floating-part appearance.
Model expression, duration, and return as state; repeated clicks must not create timers that restore old expressions.
Random variation can enrich a reaction, but fixtures must use a reproducible sequence or seed.
Do not rely on facial expressions for essential information: preserve equivalent text and accessible state.

## 6. Responsive composition and framing

Frame the character, accessories, base, shadow, and reserved control area as one composition.
Define yaw/pitch/zoom limits or permitted trajectories; validate the entire envelope, not only the initial pose.
Include jumps, vapor, ears, hands, and other extensions in animated bounds when present.
Project bounds into camera space to decide scale and margins; do not rely only on raw mesh dimensions.
Compare perspective and orthographic cameras according to purpose without making either a default.
On resize, preserve pose and state without clipping the figure or causing unnecessary scale jumps.
Test narrow and short viewports, breakpoint -1/0/+1, zoom, and relevant orientation changes.
`overflow:hidden` may be part of the composition, but does not prove correct framing.
Keep text and actions legible and reachable before loading and while exploring the mascot.

## 7. States, time, and interruption

Describe rest, hover, reaction, drag, return, variant switch, pause, and error as the feature requires.
For each transition, specify priority, cancellation, reversal, and final state; avoid delayed effect queues.
A switch may occur at an expressive moment in the animation, but its success must not depend on animation completion.
Maintain one authority per property; mouse, timeline, and loop must not compete over the same rotation.
Use elapsed time for duration, smoothing, and inertia; do not mix radians per event, frame, and second.
Estimate angular velocity in rad/s from valid displacement and time; integrate the angle using `delta` in seconds.
For exponential damping, use `omega *= exp(-lambda * delta)`, with `lambda` in inverse seconds.
For numerical frame independence, integrated displacement is `previousOmega * (1-exp(-lambda*delta))/lambda`.
When `lambda=0`, use `previousOmega*delta`; handle repeated timestamps and pauses without producing infinite velocities.
On resuming from pause, reset the time reference or apply the resumption policy; do not accumulate an invisible jump.
Compare the same temporal trajectory at different frame and event cadences with a predefined tolerance.
Triggers, easing, repetition frequency, and discrete alternatives follow [motion and feedback](motion.md).

## 8. Pointers and motion preferences

Track one active `pointerId`; a second touch must not silently replace the ongoing gesture.
Record horizontal and vertical displacement from the origin, plus time and path when necessary.
Distinguish click, drag, and scroll through an explicit rule; measuring only horizontal distance can turn scrolling into clicking.
Use capture when appropriate; handle `pointerup`, `pointercancel`, lost capture, and unmounting.
Cancellation clears velocity, capture, cursor, and state without triggering the click reaction.
Decorative hover requires an appropriate pointer; direct touch must not inherit mouse parallax.
Preserve vertical scrolling when the page requires it and offer accessible controls for relevant actions.
Observe OS preference and app settings live; do not read reduced motion only on mount.
When reducing motion, stop hover, bobbing, decorative spin, and active inertia; finalize the variant in a coherent state.
Deliberate dragging may remain direct without post-release momentum if that is the product's accessible contract.
Test preference changes during dragging, deceleration, and switching; follow the lifecycle sequence in [motion.md](motion.md).

## 9. Poster, variant, and lifecycle

Separate the requested variant from the actually presented variant; every available variant needs a valid representation.
On the static path, use the corresponding poster/SVG or retain the last available variant with clear feedback.
Material, poster, background, label, and `aria-pressed` must confirm the same state together, including without WebGL.
Do not change only the finish name while the image still shows another.
Preserve the poster until a useful first frame renders at a valid size with state applied; mounting a canvas is insufficient.
Rendering without errors is a technical milestone; visual inspection remains necessary to prove content and framing.
Handle import, asset, and context creation/loss failures; restore a coherent alternative and allow recovery when useful.
Ignore stale asynchronous results after another selection or unmount; do not let late imports recreate removed scenes.
Stop work outside the viewport and in hidden tabs; on return, present the latest state without replaying the entire queue.
If the component is reused or remounted, define disposal for RAF, listeners, observers, timers, and graphics resources.
Respect shared-resource ownership; do not destroy an asset used by another scene.
Do not add a complex lifecycle layer to a static illustration: apply only necessary contracts.
Loading strategies, budgets, and degradation are in [immersive web](immersive-web-tech.md).

## 10. Verify and measure the result

Fix content, seed, state, camera, background, viewport, and DPR before comparing captures.
Define acceptance criteria before adjusting: landmarks, opening area, margins, contact, and temporal trajectory.
Normalize measurements by character dimensions or projected size when useful for screen comparison.
Separate visual, functional, and technological results; builds, static contracts, and isolated screenshots do not replace each other.

| Group | Minimum cases according to implemented capability |
|---|---|
| Form/composition | Front, oblique, allowed profile/back; smallest viewport; motion extremes |
| Color/state | Every theme x variant; rapid/interrupted switching; verified name and accessible state |
| Input/time | Click, dx/dy, scrolling, second pointer, cancellation; comparable temporal cadences |
| Preferences | Live reduced motion; interrupted inertia; keyboard; static alternative |
| Resilience | No WebGL, import/asset failure, context loss, tab return, and remounting where applicable |
| Cost | Initial/lazy network, time to useful image, frame time, active loops, and retained resources |

Record CSS px, drawing buffer, and DPR separately. Measure cost in the target environment before claiming smoothness or savings.
A mobile viewport in a desktop browser is layout evidence, not a physical-device test.
Publish the executed state, outcome, and limits; do not extend frontal approval to every angle or device.

## Application to authorized references

This protocol generalizes an audit of a private reference. The factual profile, identity, and private evidence are not distributed. The community edition retains only the original transferable method above.

When applying the protocol, produce original geometry, branding, and assets or use compatible licenses. Silhouette, real openings, distinct thicknesses, support, and coordinated states must be verified in the new implementation; an observed technology does not guarantee result quality.
