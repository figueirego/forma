# Color diagnosis and refinement

Use when a palette feels unbalanced, a theme loses readability, an extraction becomes tokens, or a gradient/material diverges from the reference. Supplement [visual system](visual-system.md), [adaptation](adaptive-visual-systems.md), and [accessibility](accessibility.md); do not rebuild the entire system to correct one color pair.

A useful result is **observed problem -> responsible variable -> local adjustment -> comparison -> evidence and limit**. A small correction may fit in the diff and existing capture. The [Colorful](https://github.com/Siddharth11/Colorful) catalog offers investigation paths, not a compliance standard or mandatory stack.

## Diagnose before replacing the palette

| Observed symptom | Hypothesis to check | Intervention and criterion |
|---|---|---|
| Two colors with the same HSL L seem to carry different weights | HSL L measures neither luminance nor perceptual uniformity | Compare at actual size/context; adjust each color's role without forcing equal numbers |
| Everything competes for attention | Too many high-contrast/high-chroma areas, outlines, or elements | Reduce secondary presence; priority actions/content must remain identifiable |
| Text disappears only in certain positions | Composite background, transparency, image, or gradient varies | Check the region behind the text; change surface/scrim, text color, or position as appropriate |
| Brand and error look like the same action | Semantics depend on the same color cue | Separate roles and add text/icons; repeat the test with both states together |
| Dark theme looks washed out/inverted | Inadequate surface, state, or contrast mapping | Adjust theme semantic tokens while preserving recognition and hierarchy |
| Extracted color changes with each image or crop | Sampling selects background/skin/shadow instead of the intended element | Fix the region and selection rule; accept or reject candidates by their final role |
| Gradient middle becomes gray, overly vivid, or banded | Interpolation, hue path, precision, or export | Compare paths/stops at the destination; do not hide every defect with grain |
| Render color differs from the CSS swatch | Lighting, material, exposure, or color management | Inspect the 3D pipeline before compensating the UI token |

Start with one problematic sample and one correct sample. Fix content, viewport, theme, state, and scale; document profile/gamut when relevant. Identify tokens and the consuming layer. Changing the global accent to fix a legend can introduce errors across all controls.

Separate four questions: **does the color communicate its role? is content legible? is hierarchy appropriate? is reproduction faithful?** A contrast ratio answers only part of the second. Aesthetic approval does not replace the others.

## Measurements that change decisions

| Term | Practical use and error to avoid |
|---|---|
| Hue | Color family; angle depends on the model. Do not treat HSL and OKLCH degrees as equivalent coordinates |
| Chroma | Distance from neutral in the chosen space; not a universal percentage of "strength." The reproducible maximum varies with hue, lightness, and gamut |
| Saturation | A relative measure whose definition depends on the model; HSL S, HSLuv, and OKLCH C are not interchangeable |
| Lightness | Estimate/model of perceived lightness. HSL L is not Oklab L or a guarantee of equal visual weight |
| Relative luminance | Quantity used in WCAG contrast calculations; do not directly use HSL/OKLCH L as luminance |

HSL is convenient for editing but is not uniform. When tonal steps or hue changes produce inconsistent results, trying Oklab/OKLCH can make adjustments more predictable. Do not migrate existing tokens merely to use modern syntax; check conversion and final appearance. [CSS Color 4](https://www.w3.org/TR/css-color-4/#the-hsl-notation), [Oklab, by its author](https://bottosson.github.io/posts/oklab/).

OKLCH is still a model: equalizing L/C does not guarantee WCAG contrast, salience, category distinction, or brand approval. Delta E can assist sample comparison under defined conditions; do not adopt one threshold for text, thumbnails, series, and large surfaces.

**Gamut:** preserve source and destination colors. A candidate outside sRGB may need mapping; simple channel clipping can change its appearance. P3 is an output possibility, not a guarantee of better design. Compare sRGB fallback and wide-gamut output on supported targets; do not certify P3 from a capture converted to sRGB. [CSS Color 4 - gamut](https://www.w3.org/TR/css-color-4/#gamut-mapping).

## Composition, brand, and meaning

- Analogous, complementary, or triadic harmonies generate candidates. Choose by role and context, not a universal beauty rule.
- Observe **area, frequency, position, local contrast, and chroma together**. A vivid dot and an entire panel in the same color have different effects. Do not impose a 60/30/10 distribution.
- Compare neutrals with real content: a slightly warm/cool gray can bring images, skin, wood, or metal forward or push them back. Temperature is relative to neighboring colors, not a guaranteed emotion.
- Check the same color on different backgrounds. Do not "correct" brand hex values merely because a background changes their appearance; evaluate composition and context first.
- Claims such as "blue creates trust" are contextual hypotheses. Audience, culture, task, and existing conventions matter more than universal psychological associations.
- Start with hierarchy and grouping. Color must not conceal disorganized content, inconsistent margins, or missing priorities.

For each important color, name its role: brand, action, focus, selection, state, category, decoration, or material. The same primitive can feed different roles, but those roles must be able to evolve separately. A red brand and red error do not automatically constitute failure: test the actual combination and additional cues.

A ramp serves a product when it offers usable pairs: text/surface, border/neighbor, icon/surface, and focus/neighbor. Equal numerical levels in two ramps do not promise equal luminance or contrast. Preserve an authorized brand variant for contexts where the primary color fails.

Default, hover, pressed, selected, focus, and disabled states have different contracts. Do not reduce them all to opacity changes. Selected state must be recognizable; focus remains independent of selection; errors explain recovery. Check adjacencies required by the standard without inventing a 3:1 obligation between every state pair.

For themes and contextual colors, use the precedence and persistence in [adaptive systems](adaptive-visual-systems.md). A freely chosen library color must not reclassify data, turn errors into success, or change the accent unintentionally. If the product promises customization, test light, dark, and saturated extremes, not just the favorite preset.

## Gradients, alpha, and composite surfaces

Before adjusting stops, distinguish the function: ambience, simulated lighting, brand fill, or data encoding. Record only relevant variables: stops/positions, interpolation space, hue path, alpha, composition, and destination.

Comparing sRGB, Oklab, and OKLCH interpolation can explain a dull or saturated midpoint. In polar models, short/long hue paths change intermediate colors. Define intent and test support; do not assume CSS, canvas, libraries, and exporters share defaults. [CSS Color 4 - interpolation](https://www.w3.org/TR/css-color-4/#interpolation).

Transparency requires evaluating the background. Check premultiplied alpha in custom pipelines and do not reproduce a blend merely by interpolating hex values. `color-mix()` and relative syntax help derive candidates; they do not automatically choose safe contrast or semantics. [CSS Color 4 - alpha](https://www.w3.org/TR/css-color-4/#interpolating-with-alpha), [CSS Color 5](https://www.w3.org/TR/css-color-5/).

For gradients behind text, inspect actually occupied regions, including content, position, and state changes. An average background or only its two extremes does not demonstrate minimum contrast. A scrim, solid surface, or repositioning may be more robust than changing every color.

If banding appears, compare the original render and exported file at usage scale: precision, compression, and stop distribution may contribute. Dithering/grain is a contextual aesthetic/technical option, not a guaranteed fix. Avoid noise that reduces legibility or changes the approved material appearance.

For blur/translucency, test light, dark, and moving content behind it. The nontransparent fallback must retain readability, grouping, and interaction. Do not attribute the final composition's result to tokens alone.

## Extract from images and choose tools

Extraction produces **observed candidates**, not official brand colors, accessible pairs, or semantic meaning. When supplied identity exists, compare it with the official source before replacement.

Proportionate procedure: delimit image/region -> check profile, resolution, and background -> extract candidates -> discard irrelevant pixels -> assign roles -> test pairs and composition. Record cropping/sampling when reproducibility matters. Preserve the previous version for comparison.

In the product, distinguish loading, read failure, and absence of candidates. CORS, invalid files, or late responses must not leave another image displaying the previous palette as though current. Failures must preserve a readable surface; local extraction does not authorize sending private images to another service.

| Need | Possible path in Colorful | Limit to verify before adoption |
|---|---|---|
| Convert, interpolate, and explore ramps | [Chroma.js](https://gka.github.io/chroma.js/) | Space/mode, clipping, and version; tonal distribution does not certify contrast or semantics |
| Extract image candidates | [Color Thief](https://lokeshdhakar.com/projects/color-thief/) | Region, sampling, format, version, and permitted reading; do not confuse asynchronous mode with worker execution |
| Choose data color families | [ColorBrewer](https://colorbrewer2.org/) | Variable type, classes, domain, legend, and size; safety filters do not validate the whole chart |
| Continuous magnitude ramp | [Cubehelix](https://people.phy.cam.ac.uk/dag9/CUBEHELIX/) | Parameters and final output; the family does not make every configuration suitable |
| Obtain UI primitives | [Open Color](https://yeun.github.io/open-color/) | Adapt to actual roles/themes; levels are not automatically approved pairs |
| Explore harmonies or directions | Adobe Color, Paletton, and catalog generators | Candidates need composition judgment, rights checks, and product testing |
| Create runtime gradients | Existing CSS or project library; catalog libraries only when needed | Capability, support, cost, and maintenance; do not install a dependency for already-solved interpolation |

Choose the needed capability first; preserve existing tooling. Catalogs, documentation, installed libraries, and executed behavior are different evidence. Confirm current documentation/versioning before using an API. The catalog's CC0 license does not relicense external tools, images, or palettes.

## Data, color vision, and forced colors

For data, apply [the dashboard contract](data-dashboards.md): qualitative palettes distinguish categories; sequential scales represent order/magnitude; diverging scales require a meaningful center. Do not turn a list of attractive colors into a quantitative scale without domain and legend.

Check the ramp **after** interpolation, conversion, and export. Tonal order, abrupt changes, clipping, and neutral regions can suggest nonexistent boundaries. If comparisons require a fixed domain, do not silently normalize each panel separately. Missing, zero, and selected need distinct cues.

With many categories, stop adding colors when readability fails. Grouping, direct labels, symbols, line styles, or selection-based exploration may solve the problem better. No universal color distance guarantees distinction at every size and vision profile.

Use color-vision-deficiency simulations as complementary diagnostics, not proof of an individual's experience. Grayscale helps reveal tonal dependence but does not replace CVD or contrast checks. Test the task: locate a series, recognize an error, identify selection, and follow a link. [WCAG - use of color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

Add suitable cues: state labels/icons, context-appropriate link underlines, selection checks, data patterns/shapes. Necessary graphical information and components have contrast requirements against adjacent colors; decoration and inactive states are treated differently. [WCAG - non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

In `forced-colors`, test focus, borders, selection, and icons using system colors. Shadows and certain backgrounds may disappear; a real border can preserve identification. Do not globally disable adaptation using `forced-color-adjust: none` to retain branding. Exceptions, such as color samples, need names/selection readable outside the color itself. [CSS Color Adjustment](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-mode).

## UI, 3D materials, and physical output

A UI hex value and a material base color pass through different pipelines. For 3D, separate albedo/base color from lighting, roughness, metalness, reflection, exposure, and tone mapping. Check texture color spaces and renderer output; data maps are not automatically color textures. Use [3D fidelity](3d-reference-fidelity.md) to compare material, geometry, and lighting under fixed conditions.

Do not lighten the global brand to compensate for an underexposed scene. Adjust the responsible mechanism and verify other supported poses/lights. Gold metal is not approved by a yellow rectangle: readability depends on reflection, geometry, framing, and movement. Test the 2D fallback separately.

On screens, record destination and relevant conditions; screenshots prove the capture, not every monitor. For printing, follow [brand production](brand-marketing.md): profile, paper, ink, finish, and supplier proof. Generic RGB -> CMYK conversion or browser preview does not prove printed color. Do not require physical proofs for exclusively web tasks.

## Two decision examples

### A. Same HSL L, different readability

**Synthetic case:** yellow `#ffff00` and blue `#0000ff` buttons, both HSL S=100% and L=50%, with regular white text at 16 CSS px. The opaque-sRGB helper calculates **1.0738:1** on yellow and **8.5925:1** on blue. Equal L did not support the premise of equivalent contrast.

If yellow is the approved identity, a local correction can be a dark-text token on that fill: black/yellow gives **19.5560:1**. There is no automatic reason to desaturate the entire brand or change the color family. Also inspect border, focus, and states; these three calculations do not certify the whole button.

If the remaining problem is "yellow attracts too much attention," text contrast is already resolved. Compare fill area/frequency or an authorized secondary variant. This decision needs the rendered composition; it does not follow from the numerical result.

### B. Library gradient leaking into states

**Synthetic case:** someone chooses a red image for a library; extraction changes the accent, background, and form error together. The main hypothesis is coupled roles, not "bad red."

Separate contextual ambient color, action, and error; preserve error text and selection indication. Generate candidates only for the area promised by the control. If text covers the gradient, test the composition and add a readable surface when necessary.

Validation: switch to light/dark images, fail extraction, change theme, and save/reopen. Accept when the correct preference persists, no old response colors a new context, and action/error/selection remain understandable. P3 or OKLCH may be irrelevant to this defect's cause.

## Minimum confirmation matrix

Run only applicable rows, covering the defect and shared consumers first. Do not create every Cartesian combination without a risk justifying it.

| Scope | Check | Useful evidence |
|---|---|---|
| Changed role | Color pair, meaning, and priority | Token/diff and comparison with real content |
| Component states | Text, icon, border, focus, error/selection | Triggered state and calculation when applicable |
| Supported themes/contexts | Readability, precedence, and persistence | Same flow in affected scopes |
| Gradient/image/alpha | Relevant worst-case composite background | Capture/region and method, without misleading averaging |
| Data | Order, categories, absence, legend, and selection | Known value and identification task |
| Color accessibility | Additional cues, CVD when useful, forced colors | Operation and reading beyond the swatch |
| Render/export | Destination, profile/gamut, and fidelity | Reopened file or actual renderer |

Use [verification](verification.md) to record passed, failed, inferred, untested, or not applicable with a reason. `check_contrast.py` accepts only opaque sRGB; do not silently convert unknown inputs or claim gradient/P3 assessment. APCA or experimental tools can complement research; do not substitute them for contractually required WCAG 2.2 acceptance.

The exit criterion is resolution of the defect with relevant scopes verified and limits declared. Do not promise a "perfect palette," universal screen equivalence, or full compliance based on this module.

## Provenance and scope

Original synthesis: Colorful catalog at commit `3af5997a081170eae9f745c2203a41f9fef316d1`, inspected on 2026-10-26, combined with this skill's existing contracts. Colorful gathers heterogeneous material; inclusion in the list does not confirm maintenance, accuracy, or accessibility of every resource.

Technical sources linked above: CSS Color 4 was a Candidate Recommendation Draft and CSS Color 5 a Working Draft when consulted; check changes and target support before depending on syntax. WCAG "Understanding" texts explain criteria; [WCAG 2.2](https://www.w3.org/TR/WCAG22/) is the normative reference. Tool documentation supports routing, not proof that all tools executed or every catalog link was inspected.
