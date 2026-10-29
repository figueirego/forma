# Lighting editors and verifiable iconography

This reference brings together the full contract of an audited editor and transferable principles. The measurements, formulas, and limits below belong to that implementation; preserve them when the request is to reuse that mechanism or reproduce its composition. For other requests, select the contracted capabilities and justify platform/domain adaptations without imposing the entire editor on a simple theme picker. "Subject" is an example of a Pauta context: in the destination, use the actual entity that determines the color.

## Approved compact profile: faithful reproduction

When the request is **to match the approved editor**, use the [portable profile `compact-appearance-v1`](../assets/reference-profiles/compact-appearance-v1.json). It brings together tokens, dimensions, defaults, and the + button transition; it does not require access to the authoring project and is not an executable component. The source actually chosen by the user, its final cascade, and its rendered state take precedence over older descriptions of the mechanism. Preserving the destination brand does not justify recoloring a control whose exact reproduction was requested.

| Measured condition | Panel | Stage | Controls |
|---|---|---|---|
| Desktop with a fine pointer, viewport 1440 x 900 / DPR 1 | 268 x 374, padding 6, radius 16, no outer border | 256 x 206, radius 10 | Mode 30 x 28; reset 22; minus/plus 26 x 22; wave 92 x 30; dial 36; save height 32 |
| Touch or viewport <= 680 | Width 360 capped at `100vw - 24px`; at 375 x 900 / DPR 1: 351 x 442 | 339 x 206 at this viewport; height remains 206 | Targets 44; wave 92 x 44; dial 44; save 44; color dot 20 inside a 44 target |

The total heights above are boxes observed in the normal state, not a fixed `height` to impose when there is an error or a short viewport. `surface=mobile` in a URL does not change the viewport or simulate a coarse pointer. Fix these conditions in the test. The panel anchors to the workspace: `left=clamp(workspace.left+16,12,viewport.width-panel.width-12)`, `bottom=visibleBottomNavigation+16`; nonmodal role, no scrim. Mode/reset/minus-plus controls retain the anchors in the table below throughout every gesture.

In this profile, the Save button is blue: `#3b6fe0` in light mode / `#3d6fe6` in dark mode, with white text; it does not automatically inherit the brand accent. The outer ring uses track `#ffffff57`, arc `#ffffffeb`, and a white grip in both modes. The desktop palette paints 16 px with gap 6; on touch, it paints 20 px with target 44 / gap 4. Intensity/grain labels and routine status may remain accessible-only without adding visual rows; "More settings" remains a real footer action. Failure messages must not be hidden. Check computed styles after global button rules, not just the added class. Profile typography: `font-optical-sizing:none` and smoothing `auto`; buttons use `letter-spacing:normal`, without inheriting the base tracking of -.02em; Save uses line-height 1.4. Compare the font, SVG icon, and baseline at actual size.

Dark mode requires neutral surfaces in addition to the wash: base `#0e0e10`, surface `#131315`, raised `#19191c`, field `#18181b`, white text at .93, and white border at .10. The gradient base is `#141417` to `#08080a`; a transparent sidebar reveals the wash, while the workspace remains opaque. A black canvas with teal cards does not reproduce this set. In light mode, use the corresponding JSON values. Brand inks for content/3D materials, data, and routes do not need to change to apply these surfaces.

Capture the reference and the consumer at the same scale, with the font loaded, mode, intensity, grain, coordinates, selection, and context/hold. Compare the manual editor with the manual editor; the page background may resolve context and have another hue. The JSON provides criteria and numbers, not a declaration that any integration has already passed.

Also confirm the resources loaded in the consumer according to [execution identity](rendered-validation.md#applying-110-to-pauta---scope-adaptation-and-execution-identity): an identical editor marker can coexist with old CSS/JS in the tab. A clean context that passed does not prove that this tab was updated. Preserve any unsaved preview before reloading; an old cache does not authorize resetting pools or preferences. Tie the result to the behavior exercised, not just the version number.

## Composition is also a contract

Reproducing an editor requires preserving grouping, order, scale, and gesture type. Data equivalence is not enough: do not turn a compact direct-manipulation panel into a slider form when the reference requires reproduction. Use an image and CSS/structure from the same version to distinguish the main surface from advanced controls. Accessible alternatives must complement the pattern without arbitrarily replacing its composition.

Audited desktop reference case, artifact 0.19: dotted stage, modes at the top center, reset at the top right, minus/plus at the bottom right, selectable pools, distance ring, horizontal color strip, **intensity wave and grain dial**, discard/save. The minified `wash-grain` class on the wave does not describe its function: the callsite passes `chroma/.09`. The dial receives `grain`. Connecting a control to its behavior requires tracing its value and callback, not interpreting its drawing or class name.

The editor is a **nonmodal** panel in the bottom-left corner (`wash-corner`: left 16 px / bottom 16 px), with `role=dialog` and no `aria-modal`. When reproducing this desktop mechanism, `wash-panel` is 268 px wide with `border-box`, padding 6, and radius 16; the resulting stage measures 256 x 206 CSS px with radius 10. A screenshot at DPR 2 may show approximately twice as many physical pixels. Do not infer a width of 540 px or enlarge it to 360 px from the image alone: measure CSS, DPR, zoom, and any capture scaling. If there is deliberate enlargement, record the uniform factor and its effect on targets/viewport. When reproducing the approved compact profile above, the touch variant is already part of the contract: 360 px capped at the viewport and stage height 206. For other products without this reproduction requirement, adaptations may change targets/dimensions; declare and validate the values without presenting them as extracted measurements. Do not introduce a scrim, `showModal`, inert, or a focus trap in the nonmodal panel; full Settings may have a different contract.

| Control | Anchor relative to the stage | Audited desktop CSS measurements |
|---|---|---|
| Modes | `top:10px; left:50%; transform:translateX(-50%)` | Capsule 94 x 30; chips 30 x 28, gap 1, and padding 1 |
| Reset | `top:10px; right:10px` | Button 22 x 22 |
| Minus/plus | `bottom:10px; right:10px` | Capsule 58 x 26; buttons 26 x 22, gap 2, and padding 2 |

**Do not automatically reposition these controls based on the selected pool or its position.** Selecting, moving, or adding a pool does not move modes down or minus/plus up or left. This repositioning caused the divergent composition in Neuron. Handle any overlap and touch/keyboard access while preserving the contracted anchors; platform adaptation requires an explicit decision, not an implicit change during the gesture.

Light/dark modes differ in more than page color. Grid: 1 px dots, 16 px tile, 8 px position, ink .16 with opacity .55. The light capsule uses white .34, an inner white .44 border, blur 12 px / saturate 1.2; selection is white .90 with a shadow. The dark capsule uses white .07 / border .08, with white .16 selection and no such shadow. Check the stage, capsule, reset, ring, handles, and footer under the same mode preference.

Handles and swatches use vivid color `oklch(.72 .15 H)`, with `H=normalize(hue+pool.d)`. Do not reuse the gradient's lightness, chroma, or alpha in them: intensity changes the wash while retaining L .72 / C .15 for controls. In the defaults, handles have H 243 and H 181; the first light-mode pool uses L .9 / C .0285 and the second L .85 / C .038. The painted dot measures 18 px, or 28 px when selected; the touch area may be larger without arbitrarily enlarging that painting.

## Composite state

### First use, reopening, and selected control

To reuse **this complete editor**, declare initialization before implementing the controls. The numeric source is `groundWash.schema` in the [factual profile](../assets/reference-profiles/desktop-material-reference-v1.json); `stops` is the pool list. **The default has 2 pools; `maxPools: 3` is capacity, not the initial count.** Do not create three decorative points spread across the stage. Mode preference is independent of this count.

| Input | Result on opening |
|---|---|
| First use without configuration or legacy migration without a pool list | Clone the profile's 2 pools: first `x:-14, y:62, d:62, c:.75`; last `x:-10, y:120, d:0, c:1`. Also preserve the profile's width, height, fade, and per-mode parameters. Select the last (`index:1`). |
| Valid configuration already saved with 0, 1, 2, or 3 pools | Preserve the list, positions, and colors; select the last when one exists. Do not fill the list to three or silently restore two. An empty list is intentional. |
| Requested lighting reset | Restore the 2 pools and select the last; preserve `hold` according to the reset contract. Do not use reset as an implicit migration. |

The `x/y` numbers above are in model space `-45..145`, not direct CSS percentages. Use the model-to-stage transformation described below; do not clamp defaults to `0..100` or treat negative values as invalid data. On first use, the other values are `hue:181`, `chroma:.038`, `grain:0`, `hold:false`. The displayed intensity is `round(chroma/.09*100)`: `.038` corresponds to **42%, not 5%**, and the minimum is 0. Preserve exact chroma when merely displaying/reopening; rounding the label must not rewrite the model. A three-color pastel palette or pre-enabled grain is not this default; a requested adaptation must be declared.

When importing raw reference data, distinguish its legacy `plain:true` marker for intentionally empty state: in that format, `stops:[]` without the marker receives defaults. The consumer may represent empty state explicitly with `pools:[]`, without copying that marker, provided it documents migration and preserves this intention on save/reopen. A capture with three points or 5% intensity does not prove incorrect initialization: check the state's origin and version. Do not reset valid preferences to force 2/42; separate first-use, reopening, and requested-reset tests.

**With 2 or 3 pools, immediately render the distance ring and its grip on the selected pool**, including first opening and touch/keyboard use. Do not depend on hover, a prior drag, opening advanced settings, or an extra click. The dot's white outline only indicates selection: it does not replace the outer ring with arc and handle. With 0 or 1 pool, this ring does not appear because there is no other point to separate; do not invent a pool to display it.

These are different operations: **dragging the center positions** the group (Alt moves only one); **rotating the ring grip adjusts distance** between pools; **minus/plus removes/adds** pools, not zoom. The lower dotted dial controls grain. Do not merge these operations into a single slider or swap their labels. Verify the ring's visibility, clipping, contrast, hit target, and focus in the real stage.

### Editing and persistence

Separate global configuration, pools, mode preference, context, and draft. Deep-clone arrays/objects before editing; a shallow copy allows changes to leak through cancellation. Legacy configuration without pools receives defaults; an intentionally empty list preserves absence. Define limits and behavior for corrupted data without executing strings from storage.

Use the last pool as the anchor: add its offset to the global hue and subtract it from the others, preserving absolute colors. When removing the anchor, normalize again. Hue 0 is valid; do not use `value || default` for numbers. Add/remove must handle 0, 1, 2, 3, and the maximum of 3.

Group dragging preserves offsets; Alt captured at the start moves only one pool. Normalized coordinates 0..1 map to -45..145, rounded to one decimal place. The selected center follows the absolute pointer position clamped to the stage, and the delta moves the others: these **may move outside the area**. Do not constrain the group by its outermost pool. Save normalization must preserve valid finite coordinates produced by the editor, including those outside the stage; an interaction limit is not a universal data limit.

In the **faithful profile**, paint each center at its actual coordinate `(model+45)/190*100%`, including results outside 0..100%. The stage clips external points. **Do not clamp their visual position, create a dashed proxy, or stick lights to the edge:** this preserves correct data but changes apparent distances and makes the group move differently. `overflow:clip` prevents focus-induced internal scrolling without changing coordinates. An accessible recovery mechanism may exist outside the canvas; any proxy inside the stage is an alternative for another contract, not 100% reproduction of this profile. The proxy solution recorded in 1.17.1 was revised for this reason.

| Action | Selected pool | Other pools | Invariant to measure |
|---|---|---|---|
| Drag center, without Alt | Follows the pointer clamped to the stage | Receive the same delta; may move out and be clipped | All relative vectors remain unchanged within quantization |
| Alt + drag center | Follows the pointer; Alt fixed at the start | Stationary | Only the selected pool's x/y change |
| Arrow keys on center | +/-1 model unit; Shift +/-10 | Same delta, except with Alt | Do not use .01 normalized or clamp to the stage with the keyboard |
| Rotate ring | Anchor remains stationary | Radial scaling by the requested absolute radius and edge fit | Radius/vectors of all pools checked, without translating the anchor |
| + | New pool receives selection | Existing positions remain | Only the new pool is inserted; order/profile also checked |
| Change mode or color | Coordinates remain | Coordinates remain | Hue/light does not cause repositioning |

Discriminating fixture: defaults -> + -> drag the selected third pool to `(85%,80%)` of the stage. Resulting model order: `(120.5,165)`, `(116.5,107)` selected, `(124.5,223)`. The other points are approximately at `(87.1053%,110.5263%)` and `(89.2105%,141.0526%)` of the stage and must be clipped. Showing them around 84% at the edge is a divergence, even if the JSON preserves the coordinates. Capture **all points before, during, and after**, not just the selected center.

Distance is another operation: the request is an absolute radius 0..150; the selected anchor stays fixed and the other vectors receive `scale=min(requested/current,edgeFit)`. Do not apply special incremental contraction for external points, as this changes the approved operation. The ring exists only with at least 2 pools; it stores the previous angle and accumulates deltas while unwrapping +/-180 degrees, without changing the value on pointerdown. Do not convert the first click directly into absolute distance. Range 0..150; keyboard +/-2, Shift +/-10. If the current radius is below .5, distribute the others vertically: `x=selected.x`, `y=clamp(selected.y-requested*(i+1)/others.length,-45,145)`, with one decimal place; do not use an angular fan. The ring uses SVG 60 x 60, center 30, radius 24, stroke 2.5; grip 9 px. Circular controls need a name, value, limits, keyboard support, and visible focus; Home/End may be a declared accessibility improvement.

The ring's target is separate from its painting: wrapper pointer-events:none, button 60 x 60 with a hit region in the outer ring, radius 30 / hole radius 17. Sensitivity is `deltaDegrees*150/360`. The original has edge hysteresis: the accumulated request keeps growing even after geometry has limited the radius, requiring that excess to be reversed before movement appears. In the current approved implementation, this hysteresis has already been corrected: on each movement, clamp the accumulator to 0..150; calculate the applied radius with `Math.hypot` without rounding; reconcile only if `abs(requested-applied)>.15`. Do not replace the accumulator with the integer shown in the label: small movements disappear. This rule is part of the approved profile, although it improves on the original audited source. Avoid generic button/handle rules inherited by the invisible hit target.

Adding inserts before the last anchor and selects the new index (`oldLength-1`, or 0 when starting from empty). **The third light has its own profile, not a copy of the first.** Direction = `first-second`, or `(-4,-58)` when only one exists; origin = pool with the lowest y; position = origin + direction, x/y rounded to 1 decimal place. Choose the first offset from `[120,-120,62,-62,180]` with an absolute difference >= 24 from each `pool.d`, fallback 120. New profile: `c:.85,w:118,h:58,fade:74,light:{l:.88,a:.8},dark:{l:.45,a:.75}`. From the initial state, + produces hue order `[243,301,181]`, new point `x:-18,y:4,d:120`, index 1 selected, ring visible, and + disabled at the maximum of 3. In the normalized stage, the new center is `(27/190,49/190)`. Hue 301 does not activate swatch 308 when selection uses a difference < 6; do not change the color merely to activate a swatch.

Test the full transition: screenshot and model with 2 -> + -> 3 -> change the new light's color -> distance -> remove -> save/reopen. Merely displaying a third dot does not prove position, blend, profile, layer order, selection, or ring. Do not impose a symmetrical distribution. Removing selects 0 in the compact editor; opening/reset selects the last anchor. Choosing a color with zero pools recreates 1 pool. Reset appears only when state differs from the default, ignoring hold, and preserves hold. The rail scrolls 96 px, disables arrows at its ends, and applies conditional 22 px fades. DOM updates must not erase the pool's logical focus.

Grain is a background layer, never a filter over text. Zero pools may still have base/highlight/grain. Hold blocks context, not the background. **The stage shows manual configuration; the page background may resolve contextual color.** If both pass through the contextual resolver, the chosen swatch and handle change while the gradient continues with another color. Show the context source and keep the accent independent. In Pauta, collection color becomes the subject color of the selected task: a domain adaptation, not automatic image extraction.

Composition from top to bottom: grain when > .005, mode highlight, pools in order, mode base. A pool uses 9 samples `t=i/8`, alpha = `modeAlpha*(1-t*t*(3-2*t))`, stop% = `t*min(100,fade*1.25)`, and per-mode OKLCH color. Grain is an SVG 160 x 160 with fractalNoise, frequency .85, 3 octaves, stitchTiles, and saturation 0; alpha = `grain*.42` in light mode or `grain*.36` in dark mode, rounded to 3 decimal places. Two colors in sRGB or noise applied to the entire tree are not equivalent.

Quantization is part of the comparison: hue offset/stop% to 1 decimal place, alpha/chroma multiplier to 3 decimal places. Rounding the multiplier before multiplication is not equivalent to rounding the final chroma. Independent light-mode fixture: first pool L .9 / C .0285 / H 243; alphas `[.85,.813,.717,.581,.425,.269,.133,.037,0]`; stops `[0,11.3,22.5,33.8,45,56.3,67.5,78.8,90]`. Use expected numbers recovered from the contract in tests, not a snapshot generated by the helper itself.

Wave: viewBox 92 x 30; `y=15+sin(x/92*PI*7.5)*(1.5+v*11)`, `v=chroma/.09`; 10 px thumb between 5 px and width - 5 px. The pointer clamps `(clientX-left-5)/(width-10)`; keyboard +/- .05 normalized. Dial: viewBox 36 x 36, center 18, radius 15, arc 270 degrees, angle -135 degrees + grain * 270 degrees; dotted track 1/3, active arc after .005, tick radius 9 to 15. Outside the arc, retain the endpoint according to the previous value's side. Labels announce intensity/grain 0..100 while storage retains their actual units.

Renderer migration is distinct from reset. If old preferences use an sRGB renderer that prevents the requested fidelity, change the renderer with versioning and idempotent conversion, preserving IDs, coordinates, colors/hues, count 0..3, intensity 0, and grain. In this profile's percentage conversion, `chroma=strength/100*.09`: 5 remains 5%, not 42%. Back up the original configuration before the first migrated write; if backup or save fails, do not overwrite the original. Check the browser that already has data as well as isolated first use. The historical 1.17.1 decision to retain the old renderer is not a universal fidelity rule.

Transactions: the statically observed desktop reference writes with debounce and reverts on discard. Pauta retains explicit writing on save. Do not copy incidental persistence when the product contract requires something else. A lighting-only reset preserves hold; a general reset has another scope. Save failure must also be perceptible in the compact version; never hide the error message with simplification CSS.

## Icons are interface assets, not typographic characters

REA of the desktop reference renderer identified **two paths**, not a single universal family:

- `Je` (`R@147501`): inline SVG, viewBox 24 x 24, currentColor, stroke 2, round linecap/linejoin, mask with an ID per instance, aria-hidden, and focusable false.
- `Fs` (`R@280107`): `span.fig` with declared width/height and an asset in `--fig`; CSS paints `background:currentColor` through centered/contain/no-repeat mask/`-webkit-mask`. The editor mode selector uses Fs with size 14. Assets measuring 24 x 24 combine rounded stroke 2 with filled parts; converting them entirely to outlines changes the silhouette.

Verified silhouettes in the three assets: system is a laptop with screen x 4.5..19.5 / y 4..14.5 / radius 2.5 and a separate filled base x 2.5..21.5 / y 18..20.75; light mode has a filled disk of radius 3.6 and 8 rays from radius 7.5 to 9.5; dark mode has a filled crescent with outer radius 8.75. Reset has a circular arc and a filled triangular tip. A monitor with a stand, an outlined sun, an outline-only moon, or an orthogonal arrow are drawing differences, not simple size adjustments.

This proves technique/callsite, not the upstream library or authorship. Identifying origin/license requires separate evidence. Absence of the Lucide string does not prove it never existed in the original source. Reproducing conventional geometry with original assets is distinct from copying a proprietary brand/package.

In the product: define a consistent SVG family, optical dimensions, stroke, fill variant, alignment, and states. Do not use Unicode/emoji as substitutes for monitor, sun, moon, back, reset, search, or navigation icons. They can vary by font/OS and produce incorrect symbols. Typographic shortcuts such as the Command key symbol remain text when that is their function.

Decorative SVG is aria-hidden; the button contains an accessible name and a hit area independent of the drawing's size. Check all callsites, including JS-created nodes, modals, and mobile navigation. Do not insert untrusted SVG through innerHTML; restrict templates to a static local registry. Copying a proprietary brand or package is not necessary to apply geometric conventions.

## Full-contract regressions

Run these for the contracted full editor; for a partial capability, select the affected cases and declare what is out of scope. An unrequested capability's absence is not a defect; a requested capability's absence cannot become N/A.

- Cancel after changing a nested property, removing a pool, changing context, and editing a subject's color.
- Measure rendered boxes relative to the stage before/after selecting, moving, adding a third pool, changing light/dark mode, and reopening. Check top/center/right/bottom and contracted insets in CSS px, with declared tolerance; the presence of buttons or class names does not prove position.
- First use/migration without a list: 2 pools at the profile's positions, last selected, and ring with grip visible **before any gesture**; never 3 from confusing the limit with the default.
- Reopen saved states with 0/1/2/3 pools and 5% intensity: retain data; ring absent for 0/1 and present on the selected pool for 2/3. Also test touch without hover; do not use implicit reset to approve the default.
- Explicit reset returns to the 2 defaults with a ring; adding the third also proves hue 301 / position (-18,4) / its own profile / order and selection; removing down to 1 hides only the ring while retaining position dragging.
- Save/reopen/reload 0 and 3 pools; prior migration; NaN/Infinity; hue 0; anchor removed.
- Chromatic context changes lighting; neutral/absent context uses fallback; hold prevents change.
- Grain 0 and above the threshold; light/dark theme; system mode and reduced motion.
- Ring without a jump on pointerdown, wrapping +/-180 degrees, coincident pools, and its own limits.
- Group/individual dragging and keyboard: measure ALL points before/during/after, with group offsets preserved, other pools stationary under Alt, model steps 1/10, and actual clipping; geometry outside the stage survives Save/reload without visual or data clamping.
- Tab/Shift+Tab and programmatic focus after producing/reopening a point outside the stage: preserve the actual coordinate and clipping without a proxy, `scrollLeft/scrollTop:0`, stable anchors, and operable recovery. Fixture `x:1.3` normalized (equivalent to 202 in the model): style.left stays 130% before/after Save/reload, not 84% from an artificial inset.
- Wave changes chroma and dial changes grain; the manual stage remains consistent with the swatch under active context.
- First use/reset announces 42% while retaining chroma .038; varying intensity preserves the vivid handle/swatch color and changes the wash. Zero and save/reopen preserve their units and intention.
- Add/remove retains the correct selection; zero -> choose a color recreates a pool; reset is visible only when needed.
- Keyboard on ring/dial/wave, targets/focus, rail/fades/endpoints, a narrow panel, and absence of inappropriate modal blocking.
- SVGs actually rendered on all surfaces; no remaining decorative glyphs.
- Failure messages, cancellation, and pending changes remain accessible in the compact panel.

Record results and evidence by destination-product version and exercised context. Previous model/persistence tests do not prove new corrections, all browsers, or full parity. Do not immortalize a test count or an old screenshot as skill certification.

Verifiable baseline: audited desktop reference, artifact 0.19.0, renderer `index-BmRclq7u.js` SHA256 `038a8f7cbd96a203799799468673ce7bdb1e3f2c6ef32dcae36672876925a184`; CSS `index-BqoLgPgv.css` SHA256 `fce4673ea10a877cc77ee8eefbf91a1ee6e72d2323d8c4f9c59030a9bf01ac5a`. Offsets are zero-based characters in the decoded text. Static auditing determines the build contract; it does not prove visual execution in every state.

Ring-precision regression: a 10-degree rotation divided into 90 movements, with the ring entirely inside the stage, must respond like the same continuous rotation within model quantization. In the measured fixture, 58 becomes 62; 58 remaining 58 indicates discarded subinteger deltas. Also compare mouse and emulated touch, reversal near the edge, and all pools during the gesture.
