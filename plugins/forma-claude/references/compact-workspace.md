# Compact workspace with one content scroller

Use for dense desktop work that benefits from stable navigation and a fixed toolbar. Discover by `compact window`, `fixed workspace` or `janela compacta`; no product name is needed. Apply the [identity binding procedure](capability-reuse.md). Avoid imposing this frame on long editorial pages or ordinary mobile reading.

## Invariants

- The host owns viewport sizing. Use a `100dvh` frame when the app owns the page; embedded consumers use their allocated height instead of changing the document globally.
- Sidebar and work area are separate surfaces. The toolbar is an opaque row outside the content scroller, so scrolling text cannot show through it.
- The work area uses `grid-template-rows: auto minmax(0, 1fr)`. Its content region has `min-height: 0`, `overflow-y: auto` and contained overscroll. Its footer belongs to the same scroll region.
- Keep navigation, identity and account reachable at ordinary sizes. Reduce nonessential headings before shrinking controls. When labels, zoom or short height cannot fit, allow the whole sidebar to scroll; never clip destinations or hide the scrollbar while retaining an undiscoverable overflow trap.
- Selected navigation remains visible at rest with `aria-current`, icon/marker and visible keyboard focus. Team/account context is integrated information, not a raised button unless it performs an action.
- A mobile drawer preserves content scroll, restores focus, closes with Escape and makes the underlying work area inert while open. Collapse has accessible names and does not change permissions.
- Scope/role previews are demonstrations, not backend authorization. Bind actual routes, team selection and data to the destination's existing owners.

## Adaptation

Bind navigation and pane surfaces, accent, text, font, density, corner roles and spacing to the destination. A dark sidebar in both themes is an available variant, not a requirement for every brand. Derive breakpoints from the actual labels and font metrics. Compact desktop rows do not justify undersized touch targets. Separate selection contrast from primary-action contrast.

The [clean shell](clean-shell.md) supplies scoped CSS and an executable generic specimen; it is a starting implementation with its own navigation behavior, not the complete compact variation. Inspect and implement the invariants above in the destination. [Calm glass](calm-glass-navigation.md) is an optional material treatment, and [ink theme](ink-theme-transition.md) is an independent motion capability. Neither requires the other.

## Evidence and acceptance

This contract generalizes the [recorded workspace](helloura-experience.md) and its [profile](../assets/reference-profiles/helloura-experience.json). Source measurements and private exact-source instructions remain there. They are provenance, not required branding or an automatic source-directory dependency.

Verify wheel/touch/keyboard scrolling inside the content, stable toolbar/sidebar bounds, no text bleeding through the toolbar, normal and short heights, zoom, long labels, collapse/drawer access, focus return and draft continuity. Confirm the destination's colors and font after the complete cascade. The recorded source's checks do not certify another implementation or its production behavior.
