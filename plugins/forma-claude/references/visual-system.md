# Visual system, typography and spacing

## Extract before replacing

Inspect tokens, computed styles, components and assets. Identify the source of truth and discrepancies. Preserve consistent decisions; distinguish a local bug from structural debt. Do not introduce a second token system without mapping the first.

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

Font Pairing can help compare alternatives, but a trio does not require three families in production. Compare the same phrase at the same width and multiple sizes. Suggested commercial fonts do not imply an available license.

## Color, shape and material qualities

To choose or refine a palette, use [color: from theory to decision](color-refinement.md). Separate legibility, meaning, perceived hierarchy and fidelity problems before changing values. A combination may pass contrast checks yet distribute attention poorly; a harmonious palette may fail for text. The procedure connects role/context, candidate variable, change and comparison without imposing a new language on the project.

Map surfaces, text, actions, selection, focus, borders and states. Brand colors do not replace error or chart semantics. Also use text/icons/patterns to distinguish states. Measure contrast against the actual composited background, including photos, blur and hover.

For maps and indicators, read [data dashboards](data-dashboards.md) to distinguish category, magnitude, divergence, progress and selection. Changing the theme does not change a series' meaning; changing the metric requires consistent legends/units.

Define radius and elevation roles, not one mandatory radius for everything. Containers group; shadows convey overlap or hierarchy. Transparency has a solid fallback and must remain legible without blur. Keep icons, optical weight and alignment consistent; use the installed library.

## Components and governance

Every component should have anatomy, purpose, variants, states, content, behavior, accessibility and limits. Document platform differences by intent. Reuse before generalizing; extract an abstraction when there is actual recurring variation.

For system changes, identify consumers, migration, compatibility and owner. In Figma, prefer variables, auto layout and instances; in code, existing tokens and components. Do not claim Figma/code synchronization without checking both.

For a worked example of direction, spacing, CSS and migration, read [tokens and handoff](tokens-handoff.md). For anatomy and states, read [patterns](component-patterns.md). A numerical scale alone does not create hierarchy.
