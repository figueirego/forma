# Visual system, typography and spacing

## Extract before replacing

Inspect tokens, computed styles, components and assets. Identify the source of truth and discrepancies. Preserve consistent decisions; distinguish a local bug from structural debt. Do not introduce a second token system without mapping the first.

## Coordinate the foundation

For a new surface or broad visual refinement, establish one compact foundation in the existing brief, tokens, or component definitions. Reuse approved choices; resolve missing relationships before specialists invent incompatible values. This is a shared implementation contract, not a requirement for a new document or for loading every specialist. A local correction inspects only affected roles and consumers.

| Decision | Shared rule and canonical detail |
|---|---|
| Palette and attention | Assign surface, text, action, selection, focus, state, and relevant data roles. Connect hue relationships, lightness, chroma, and occupied area to hierarchy; harmony generates candidates, while actual content determines suitability. Use [color composition](color-refinement.md#composition-brand-and-meaning), not an arbitrary color count or universal ratio. |
| Light and dark | Identify the modes required by the brief and existing product. When both apply, map the same semantic roles in both before propagating components; include surfaces, borders, icons, focus, and state pairs. Preserve meaning and hierarchy, not identical hex values or automatic inversion. A single-mode task does not authorize a theme feature. |
| Type and spacing | Connect reading hierarchy and density to one spacing system. Declare page margins, section gaps, component padding, and label/icon gaps, with one owner for each distance. Use [spatial contracts](layout-spatial-contracts.md) for grouping and narrow-layout adaptation. |
| Shape and depth | Give controls, containers, overlays, and pill/circular exceptions deliberate radius roles; equivalent components reuse the same role. Relate nested curves to their inset and inspect the result. Border and elevation must support grouping and overlap. See [shape and material](#color-shape-and-material-qualities). |
| Icons | Use the project's coherent family and assign each icon a recognizable action, object, or state. Define optical size, stroke/fill, alignment, and labels; omit icons that merely repeat nearby text without aiding recognition. Apply the general [icon asset contract](lighting-editors-icons.md#icons-are-interface-assets-not-typographic-characters), without inheriting its editor-specific silhouettes. |
| Motion | New interactive designs include a purposeful [default motion layer](motion.md#default-motion-for-new-interactive-designs), with shared timing/behavior and reduced-motion alternatives. Coordinate theme, hover/press, scroll, and state feedback with the same roles; explicitly static deliverables and local fixes retain their scope. |

Apply these decisions to a representative slice with real content before propagation. Inspect the related surfaces, text, controls, and states together in each supported mode and at relevant widths, using [coordinated foundation review](verification.md#coordinated-foundation-review). Additional expressive details belong to the [chosen direction](design-directions.md); they share this foundation rather than introducing competing palettes, scales, or icon styles.

## Visual direction

Choose a compositional idea consistent with the audience and content: editorial, instrumental, playful, industrial, institutional or another justified direction. Specify hierarchy, rhythm, material qualities and image treatment; do not use adjectives as substitutes for decisions.

A distinct direction can emerge from proportions, typography, cropping, density, color or motion. It does not need to make navigation unfamiliar. Gradients, symmetry, cards, serifs, black and Inter are valid choices when they do real work.

When direction remains open, use [direction comparison](design-directions.md). Fix content, state and dimensions before varying structure; cataloging styles does not replace deciding which relationships help the task.

## Tokens

Separate primitives, semantic tokens and components. Conceptual example:

```text
primitive.space.2 = 8
semantic.space.controlGap -> primitive.space.2
semantic.color.textPrimary -> theme.primaryText
component.button.primary.background -> semantic.color.actionPrimary
```

Define units, scale, aliases, theme and origin. Do not mix px, dp and pt without adaptation. Include color, typography, spacing, radius, border, elevation, layers and motion only as needed. Dark theme is a semantic mapping, not automatic inversion.

## Spacing and composition

To implement or correct layout, use the [spatial contracts](layout-spatial-contracts.md) procedure: container/axes -> grouping -> width/insets -> owner of each distance -> adaptation -> rendered measurement. This section summarizes decisions; it does not replace that execution.

Without an existing scale, try 4, 8, 12, 16, 24, 32, 48 and 64 as a starting point, not a requirement. Within-group distances should look smaller than separations between groups. Space should convey association, priority and rhythm.

- Align text by baseline and elements by function; the geometric center may need optical compensation.
- Define reading and working widths separately. Long text often works at around 45-75 characters per line, adjusted to the writing system and content type.
- Use grid for two-dimensional relationships and flex/native layout for one-dimensional flow. Do not turn a mockup's absolute positioning into responsive architecture.
- Test minimum and maximum content: long titles, zero, negative values, large numbers, translation, names without spaces, empty lists and hundreds of items.
- Choose breakpoints based on content pressure. Do not use commercial device names alone as evidence of responsiveness.
- Record comfortable/compact density rules when useful. Compactness does not remove legibility or interaction area.

## Typography

Define roles: display, heading, body, label, supporting text and number. Start with one sufficient family; add another when it brings functional contrast. Check actual weights, use/redistribution licensing, language characters, symbols, numbers and fallback.

Test with actual content: accents, descenders, italics, uppercase, tabular numbers and currencies. Adjust line height to font and size; no single value prevents all clipping. Avoid tiny essential text to fit a layout. On the web, prefer relative units and preserve zoom; in native apps, use system typographic scales.

Compare font candidates by their assigned roles; three roles do not require three families in production. Compare the same phrase at the same width and multiple sizes. Suggested commercial fonts do not imply an available license.

## Color, shape and material qualities

To choose or refine a palette, use [color: from theory to decision](color-refinement.md). Separate legibility, meaning, perceived hierarchy and fidelity problems before changing values. A combination may pass contrast checks yet distribute attention poorly; a harmonious palette may fail for text. The procedure connects role/context, candidate variable, change and comparison without imposing a new language on the project.

Map surfaces, text, actions, selection, focus, borders and states. Brand colors do not replace error or chart semantics. Also use text/icons/patterns to distinguish states. Measure contrast against the actual composited background, including photos, blur and hover.

For maps and indicators, read [data dashboards](data-dashboards.md) to distinguish category, magnitude, divergence, progress and selection. Changing the theme does not change a series' meaning; changing the metric requires consistent legends/units.

Define radius and elevation roles, not one mandatory radius for everything. Containers group; shadows convey overlap or hierarchy. Transparency has a solid fallback and must remain legible without blur. Keep icons, optical weight and alignment consistent; use the installed library.

## Components and governance

Every component should have anatomy, purpose, variants, states, content, behavior, accessibility and limits. Document platform differences by intent. Reuse before generalizing; extract an abstraction when there is actual recurring variation.

For system changes, identify consumers, migration, compatibility and owner. In the design editor, prefer variables, auto layout and instances; in code, existing tokens and components. Do not claim design-source/code synchronization without checking both.

For a worked example of direction, spacing, CSS and migration, read [tokens and handoff](tokens-handoff.md). For anatomy and states, read [patterns](component-patterns.md). A numerical scale alone does not create hierarchy.
