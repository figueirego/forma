# Calm glass navigation with an accent marker

Use for a quiet sidebar with persistent glass selection, a shared accent icon/leading marker and integrated team/account context. Discover by `glass navigation` or `navegacao glass`; a project name is not required. Apply [capability reuse](capability-reuse.md) and the destination's own surface, text, accent, font and focus roles. Dark navigation is one available variant, not a global identity.

## Generic mechanism and destination roles

- Keep the selected control visible at rest, with readable text and `aria-current="page"`. The marker and icon share the destination's selection accent; shape and semantics keep selection understandable without color alone.
- Give the material a restrained edge and shallow depth. Keep reflections away from text. Blur is optional, with an opaque readable fallback. Large containers and small controls do not need the same material.
- Team/profile rows communicate context without a raised glass box. Only actionable rows behave as buttons; all actual controls retain focus and accessible names.
- Derive spacing, radii and touch targets from the destination's density and typography. Test long labels and zoom instead of copying source measurements blindly.
- Bind foreground, selected fill, edge, accent and fallback separately in both themes. Recalculate contrast on the composited background; an orange source measurement does not validate a blue or green destination.
- Preserve content scroll ownership through [compact workspace](compact-workspace.md) when that layout is relevant. It is independent from this optional material.

The following record preserves one approved source instance, including its specific colors and rejected alternatives. It is evidence for that consumer, not a template that overrides a new brand. The public profile remains frozen for explicit fidelity; generic reuse follows the roles above.

## Recorded source instance

Recorded 2026-11-10. The current choice is **dark glass selection with an orange icon and leading marker**, on a black sidebar in both themes. Team and account context are integrated rows without raised glass cards. This replaces the earlier `black-orange-1` filled-orange selection and glass context cards. The [material profile](../assets/soft-glass/calm-navigation.json) records the current values and superseded revision; the [complete experience](helloura-experience.md) locates the intact private source.

This is an optional adaptation of [Soft Glass](soft-glass.md), not a global palette or native Apple Liquid Glass implementation. Preserve the consumer's approved brand, routes, typography and selected mechanism. The separate [diagonal control study](diagonal-glass-controls.md) remains valid for its own consumer; do not mix its highlight film into this variation.

## Materials have different owners

| Surface | Current treatment |
|---|---|
| Sidebar | Solid `#1c1c1c` in both themes; no backdrop filter, ambient glow or bright inset rim |
| Selected destination | `rgb(255 255 255 / .055)`, 8px blur, fine edge, shallow inset/outer shadow |
| Selection label | Light `#f4f4f2`; selection is visible at rest, not only on hover |
| Selection icon and leading marker | `#ff8540`; marker 3px wide and 20px high, vertically centered |
| Team and account | Transparent integrated rows, no resting border, blur, bevel or shadow; restrained hover and visible focus |
| Team/avatar context | Team avatar `#423027` with `#ffb78f` initials; account avatar neutral `#303030` |
| Main working surface | Theme-specific translucent fill, 28px blur, subtle border and lower shadow |
| Toolbar | Opaque theme surface in its own row, outside scrolling content; no blur |
| Inner cards | Quiet translucent fill without another backdrop filter |
| Secondary controls | Subtle edge lighting confined to the rim; no diagonal film through the label |

The primary action retains the consumer's yellow. Orange selection does not recolor every action. These colors are sample values, not Forma defaults.

## Current geometry and state contract

- Separate sidebar and working surface, 25px desktop corners, 12px outside spacing and gap. At 760px and below, use 8px outer spacing and 21px corners.
- Keep 8px between navigation items. The dark selected row has 12px corners; its marker and icon share the accent.
- The selected edge is `rgb(255 255 255 / .12)`. Its shadow is the following restrained stack; do not replace it with a large halo:

```css
box-shadow:
  inset 0 1px 0 rgb(255 255 255 / .13),
  inset 1px 0 0 rgb(255 255 255 / .035),
  inset 0 -1px 0 rgb(0 0 0 / .22),
  0 5px 9px -6px rgb(0 0 0 / .40);
```

- Team and account context use transparent borders only for stable box sizing. Interactive context rows may use `#272727` on hover. Static team information is not a disguised button.
- Keep semantic selection with `aria-current="page"`, visible keyboard focus independent of hover, and accessible names in collapsed navigation. Decorative markers never intercept input.
- Use the [SVG sprite](../assets/operational-icons.svg) or the destination's coherent family. SVGs use a 24px view box, 1.6px rounded strokes and `currentColor`; they must not be stretched non-uniformly.

## Scrolling belongs to the working content

Use a `100dvh` frame with a non-scrolling document. The toolbar occupies a separate row; `.content-scroll` has `min-height: 0`, `overflow-y: auto`, contained overscroll and a stable scrollbar gutter. Main content and its footer share this region. Do not let headings or action buttons slide under a translucent toolbar.

The navigation list does not own an independent scrollbar. At ordinary heights, adapt density and group captions so destinations, settings and profile remain visible. The approved short-desktop variant uses 34px rows separated by 8px and hides group captions/status below 900px. Mobile targets remain at least 44px.

Do not solve overflow by clipping destinations: below 700px desktop height or 800px mobile height, the complete sidebar may scroll as one surface. These are consumer breakpoints; test them with the destination's labels, zoom and font metrics. The main panel still owns its separate content scroll.

Navigate by updating the selected destination and resetting that content region. Opening the mobile drawer preserves content scroll, makes the underlying work area inert and returns focus on close. Preserve draft ownership when switching theme; see [Ink Theme Transition](ink-theme-transition.md).

## Adaptation and accessibility

Adapt accent, icon/marker, edge, focus and opaque fallback together. Keep label contrast separate from icon contrast; do not reuse the previous dark-on-orange contrast result for this revision. Calculated over the stated black sidebar, the current label is 13.3:1 and the orange icon/marker is 6.06:1. This excludes edge/shadow pixels and is not full accessibility certification.

Blur is optional. Unsupported blur and reduced transparency retain solid readable surfaces; the selected fallback is `#292929`. Forced colors use system colors while preserving selection and focus. Reduced motion removes displacement, not feedback. These code paths require destination inspection; CSS declarations alone are not operating-system runtime proof.

## Rejected and superseded choices

- Full orange sidebar: rejected as too bright.
- Green-tinted black foundation, strong large-container rims, decorative illumination and split/diagonal reflections: rejected for this consumer.
- Entirely orange selected row: earlier approved stage, superseded by dark glass with orange marker/icon.
- Raised glass team/profile cards: superseded by the integrated context rows.
- Tonal matte context: retained as a comparison alternative, not selected; do not claim explicit rejection.
- Independent scrolling menu and translucent sticky header over titles: superseded by the fixed compact frame.

Historical screenshots and research retain their dates and source hashes. They must not override the later user decision or the current combined CSS cascade.

## Evidence and reuse

The current consumer records cover 1280x720, 1440x960 and a 480x844 mobile drawer: full navigation reachability, 8px spacing, collapsed 72px rail, no horizontal overflow, keyboard focus, Escape/focus return and a stable header/sidebar while content scrolls. These are recorded local-preview checks. Production, physical devices, multi-browser behavior and OS accessibility preferences are not established by them.

The public package contains authored contracts, tokens and generic icons. The complete implementation, local fonts, branding, sample content and private captures remain in the separately installed `helloura-approved` kit. A contract is not an automatically mounted component; verify the kit and adapt to the destination before claiming faithful reproduction.

Request example: "Use Forma's current Calm Glass Navigation: black sidebar in both themes, dark selected glass with our accent on the icon and leading marker, integrated team/profile, and one compact content scroller. Preserve our brand, routes and authorization."
