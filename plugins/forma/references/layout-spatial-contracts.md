# Layout: centering, spacing, and organization

In this plugin, `<forma-root>` is the directory containing `.codex-plugin/`, `references/`, `assets/`, `scripts/` and `tests/`; it is not a specialist directory. Resolve it relative to this file.

Read when creating or correcting composition, alignment, padding, margins, grouping, or responsiveness. Perceptual laws explain relationships; they do not prescribe a magic pixel count. This reference translates those relationships into implementable, verifiable decisions.

## 1. Define structure before values

Make a short map: **navigation area -> available area -> content -> groups -> controls**. Name the main task, reading order, and action belonging to each group. Do not start by distributing cards or adding margins until the screen looks filled.

For each affected region, record only what is necessary:

| Contract | Concrete question |
|---|---|
| Reference | Does the element align with the viewport, available panel, content column, or a card's inner content? |
| Axes | Is it centered horizontally, vertically, both, or aligned to the start/baseline? |
| Width | Does it fill the workspace, have a reading-width limit, or use intrinsic dimensions? Which column can shrink? |
| Insets | Who determines the distance from the edge to the content? Which guides do header, body, and footer share? |
| Relationships | Which elements belong to the same group? What distance separates groups for different tasks? |
| Adaptation | Under what content pressure should it wrap, stack, scroll, or truncate? Does hidden content remain accessible? |
| Evidence | Which boxes, styles, captures, and states confirm the contract? What is the project's tolerance? |

Example: settings centered in the viewport; content start-aligned; body/footer sharing horizontal insets; each preference groups title+help; controls in a stable column; body scrolls and footer stays reachable. A color editor anchored to the workspace has a **different** contract: it does not inherit dialog centering.

## 2. Center the right object in the right place

- `text-align:center` centers inline content, not the block. `margin-inline:auto` distributes free space around a width-constrained block; it does not choose the width.
- Flex aligns along the main and cross axes defined by `flex-direction`. Grid allows track control and alignment within tracks. Identify the axis before choosing `justify-*` or `align-*`.
- Sidebars and inspectors reduce available space. A panel's empty state should reference that panel; centering it in the viewport may put it under navigation.
- Header with a back button on the left and actions on the right: `space-between` does not guarantee a centered title. Explicitly choose geometric centering or content alignment. For geometric centering, equal side tracks work while space permits; in narrow layouts, adapt title/actions without overlap.
- Operational content and long text generally need a stable starting edge. Centering the container does not require centered paragraphs, labels, or values.
- An empty state may use available height. A page with growing content must not have a fixed height merely to stay centered. Short dialogs, virtual keyboards, and zoom must keep the top, bottom, and actions reachable.

For boxes in the same coordinate system, the horizontal center is `x + width/2`; compare it with the center of the **declared container**. Correct geometry does not prove optical balance. Before compensating by 1-2 px, check line-height, ascenders/descenders, SVG/viewBox whitespace, and internal asset margins. If necessary, record a small compensation in the component while preserving the interactive target; do not patch the entire layout with `translateX`, text spaces, or negative margins.

## 3. One owner for each distance

| Resource | Responsibility | Failure to look for |
|---|---|---|
| `padding` / inset | Content to its own container edge | Unintentionally differing header/body/footer insets; padding duplicated by wrappers |
| `gap` / stack spacing | Repeated sibling distance managed by the parent | `gap` plus each child's margin adding the distance twice |
| `margin` | External relationship between independent blocks or a deliberate exception | Margin collapse, first/last child creating invisible space |
| `line-height` | Distance between lines within text | Using it to center a line that later wraps or grows |
| `min-height` / hit area | Functional minimum and interaction area | Confusing drawing size with clickable size or fixing height so content gets clipped |

Reuse the existing scale. If none exists, choose an initial scale and roles such as `label-control`, `field-help`, `field-field`, `group-group`, `panel-inset`, and `page-gutter`. One value may serve different roles, but the name must explain the relationship. Do not create a token for every isolated number.

**Proximity is relative:** label, field, and error must appear grouped; the next field/group must not look closer to the previous error. Smaller within-group than between-group spacing is a useful hypothesis, not a mandatory fixed ratio. Borders, typography, alignment, and context also affect perception. Test the relationship in rendered content, including multiline messages.

## 4. Task-oriented organization and UX laws

| Principle | Spatial decision | Practical verification |
|---|---|---|
| Proximity | Keep actions/help/metadata near the correct object; separate changes of subject | Identify which field an error belongs to without reading the whole screen |
| Common region | A boundary or background can gather related controls | The border contains a real task unit; avoid meaningless nested cards |
| Similarity | Identical roles retain typography, insets, and behavior | A new navigation item does not inherit CTA appearance through a generic selector |
| Uniform connectedness | Lines/connectors express real relationships | A graph does not invent links to look connected; dividers do not duplicate boundaries |
| Pragnanz | Reduce competing treatments and axes | Titles, rows, controls, and actions follow a few recognizable guides |
| Chunking / cognitive load | Group by decision and work sequence | The group title explains its content; do not split by arbitrary counts |
| Selective attention / Von Restorff | Differentiate priorities sparingly | Selected items and the primary action are distinct without emphasizing every block |

Hick and Miller do not establish a maximum of 5 or 7 options. Fitts does not specify universal padding. None of these laws requires centering everything, using cards, animating every control, or filling every empty area. A code checklist does not prove usability or visual fidelity.

## 5. Minimal recipe adaptable to the existing stack

Web example with **illustrative** values, not mandatory tokens or a new library:

```css
.settings-host {
  container: settings / inline-size;
  min-inline-size: 0;
}
.settings-panel {
  --panel-inset: clamp(1rem, 3vw, 1.75rem);
  --group-gap: 1.5rem;
  box-sizing: border-box;
  inline-size: min(100%, 60rem);
  margin-inline: auto;
}
.settings-header, .settings-body, .settings-footer {
  padding-inline: var(--panel-inset);
}
.settings-body { display: grid; gap: var(--group-gap); }
.field { display: grid; gap: .5rem; min-inline-size: 0; }
.field > :is(label, p) { margin: 0; }
.field-help { font-size: .875rem; line-height: 1.5; }
.settings-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: .5rem;
  align-items: start;
}
.settings-row > * { min-inline-size: 0; }
.settings-row input, .settings-row select {
  box-sizing: border-box;
  inline-size: 100%;
}
/* Measure the panel host, including split views in wide windows. */
@container settings (min-width: 42rem) {
  .settings-row {
    grid-template-columns: minmax(0, 1fr) minmax(12rem, 18rem);
    gap: 1.5rem;
  }
}
```

The `.settings-host` wraps the panel; the query examines the ancestor, not the element itself. The 42rem threshold is a content-adjustable hypothesis, not a universal breakpoint. The stacked baseline remains usable without container-query support. Use equivalent adaptation in the existing stack; do not measure only the window when the component can occupy a smaller region.

In existing code, edit responsible selectors instead of accumulating contradictory overrides. In Figma, apply equivalent relationships through Auto Layout, Fill/Hug, and min/max. In SwiftUI/Compose/Flutter, use the project's stacks/constraints/alignment guides and native measurements; do not translate px into pt/dp without context.

## 6. Diagnosis in order

1. **Reproduce:** viewport in CSS px, zoom, theme, sidebar, state, and real content. Preserve an initial capture.
2. **Inspect the parent:** display, tracks, axis, available width, min/max, padding, scrolling, transform, and positioning. In flex/grid, `min-width:auto` may prevent shrinking; investigate `min-width:0` and `minmax(0,1fr)` before hiding overflow.
3. **Inspect children:** default heading/paragraph margins, line-height, box-sizing, borders, intrinsic size, images, and DOM order. Computed styles show which rule won the cascade.
4. **Measure the relationship:** shared edges, box gaps, insets, and center. Borders and scrollbars enter the measurement; declare border-box or content-box. `getBoundingClientRect()` values include transforms.
5. **Correct the source:** the layout/ancestor rule or responsible selector. Do not use `overflow:hidden`, smaller fonts, or absolute positioning to conceal structural defects.
6. **Confirm:** same capture + narrow state + extreme content. Compare measurements alongside visual reading and action access. Correct only affected axes/states and dependent paths.

Do not place every title at the same coordinate when they belong to distinct regions. Do not force equal card heights with different content unless comparison benefits. Document intentional exceptions; do not classify deliberate asymmetry as a bug.

## 7. Acceptance criteria

- Explicit reference axis and container; intended alignments match within project tolerance.
- Shared insets use the same value source. A deliberate difference serves a recognizable function.
- No spacing arises accidentally from `gap` + margin + wrapper; separation between groups is perceptible.
- Field, help, and error remain associated. Multiline rows retain visible controls and actions.
- Long text, translation, empty lists, missing actions, open/closed sidebars, and enlarged text cause no clipping, overlap, or incoherent reading order.
- Narrow widths follow the declared wrap/stack/scroll rule; two-dimensional table/map scrolling is an intentional exception, not silent page overflow.
- Fixed/sticky elements do not hide the final action. Short height and virtual keyboards have a recovery path.
- Selection, error, and loading states do not shift the structure without a reason.

For each finding, record: **target -> measurement/observation -> relevant principle -> change -> confirmation -> limits**. Do not grant automatic acceptance by counting applied laws.

## 8. Reusable geometric verification

`python3 <forma-root>/scripts/check_layout.py <layout.json>` verifies explicit contracts over boxes collected from the interface. Use the [layout.example.json](../assets/layout.example.json) format, labeled synthetic. It does not open a browser, inspect pixels, or choose which elements should align.

Coordinates must share the same CSS-pixel space. `viewport` is reserved for `(0,0,width,height)`. Check types: `align`, `center`, `inset`, `gap`, `containment`, and `no-horizontal-overflow`. Each check declares the elements and, where applicable, expected value and tolerance; do not derive expectations from the measurement itself to manufacture acceptance.

Collect only relevant nodes through authorized browser tools (`getBoundingClientRect`, computed styles, and scroll dimensions). For `no-horizontal-overflow`, supply `scrollWidth` and `clientWidth`; for centering, compare against the intended panel. The default tolerance of 1 CSS px is technical and adjustable, not a UX law. Optical compensation and intentional scrolling need their own criteria.

Confirm measured nodes are rendered in the desired state; hidden-element boxes do not prove visible alignment. Also check loaded CSS identity: editing a local file without invalidating an old browser copy does not prove the correction reached the interface.

Exit 0: declared contracts satisfied; 1: divergence; 2: invalid input. Report contract count and scope, never "design approved" based solely on the script. Supplement it with visual inspection, keyboard, and extreme states. Do not use invented rectangles as product evidence.

## Sources and adaptation

Consulted basis: [Laws of UX Skills](https://github.com/keysjoao/laws-of-ux-skills/tree/66f5e5602c8444b123e8b0d287ef9947ef295edc), by keysjoao, especially the perception reference and component mapping; principles compiled from [Laws of UX, Jon Yablonski](https://lawsofux.com/). The layout rules and examples above are an original practical adaptation. Source menu counts, timings, sizes, and automated scores were not treated as universal requirements.
