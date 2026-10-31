# Clean interface: reusable application foundation

Use when the request is to reuse the combined clean background, sidebar, buttons, search, and inputs. The activation name is **clean interface foundation**; it does not depend on naming another product. It is an optional recipe for operational surfaces, not a mandatory identity or a theme for every landing page. For a more expressive warm colored sidebar, diagonal glass buttons, dotted texture and matching landing, use the separate [Soft Glass preset](soft-glass.md); preserve the chosen recipe instead of combining their defaults accidentally.

The resource includes [portable CSS](../assets/clean-shell.css), an [HTML example](../assets/clean-shell.html), and [demonstration behavior](../assets/clean-shell.js). The CSS uses `.dc-shell` and `--dc-*` tokens; the example allows composition and states to be inspected before adaptation. It is an original implementation with synthetic content, not code or branding extracted from third parties. Do not confuse this foundation with the complete lighting editor, material profile, semantic search, or BookObject: these are independent capabilities.

## What to preserve in the composition

| Part | Visual and functional relationship |
|---|---|
| Background | Lower-contrast neutral surface; optional peripheral lighting kept away from readable content. A clean background does not require pure white in every layer. |
| Sidebar | Belongs to the background; navigation organized into groups, with icon/text/counter in stable columns. Selection uses a subtle neutral fill, distinct from focus and hover. |
| Main panel | Elevated neutral surface, delicate border/shadow, larger radius than controls. Content and toolbar share an inset. Do not replace it with floating cards without the continuous surface. |
| Buttons | Primary/secondary/ghost/icon hierarchy. Primary concentrates the accent; secondary uses a neutral surface and border; ghost serves the toolbar. Focus, pressed, and unavailable states remain perceptible. |
| Search and fields | Search is a horizontal capsule with icon, text, and trailing actions; a regular input is a labeled field, not another decorative capsule. Do not shrink the typing area to fit every shortcut in a narrow layout. |
| Content | Typography and spacing establish hierarchy. Do not invent giant titles, heroes, gradients on every card, or heavy borders to "polish" it. |

The reference screenshot shows images of other systems **inside the cards**. Those forms, brands, and buttons belong to stored content, not the shell. Also exclude the OS bar, window controls, and background windows when extracting components.

## Tokens by function, not a list of hex values

Separate `ground`, `surface`, `surface-hover`, `surface-selected`, `line`, `text`, `text-muted`, `accent`, `on-accent`, and `focus`. Map these roles to the project's existing tokens. Ambient color and action color are independent: changing the wash does not recolor buttons, error states, or the reading surface.

The [factual profile](../assets/reference-profiles/desktop-material-reference-v1.json) retains statically observed values and the relevant cascade. Audited light example: background `#f0f4f6`, white elevated surface, black hover at 4%, black active at 8%; dark: background `#0e0e10`, surface `#131315`, white hover at 6%, white active at 10%. Transparency requires evaluating the effective composition. Do not automatically promote these numbers into accessibility or brand standards.

In the distributed preset, larger targets, the dark palette, narrow-layout adaptation, and action contrast are original decisions. Preserve roles when replacing them with destination branding; validate `on-accent`/accent again. Do not replace the existing font or add an icon library based on visual association.

## Structure and ownership of space

Build shell -> sidebar + panel -> toolbar + content. Define what scrolls and what stays visible. `min-width:0` and `min-height:0` let text and flex/grid regions shrink without pushing the screen outward. Panel inset, toolbar padding, and content padding are distinct roles; do not add parent/child margins to fix a local misalignment.

In the sidebar, keep text flexible and counters independent, with tabular numbers. Long names may wrap/truncate according to the task while retaining accessible names; counts must not overlap labels. The footer profile must remain reachable in short windows, with scrolling assigned to the correct region and no `position:absolute` that covers navigation. Smaller within-group spacing than between-group spacing preserves proximity without multiplying dividers.

A compact sidebar, rail, and mobile layout are different states. Compact mode increases density; a rail hides visual labels while retaining names and recovery; mobile may reorganize navigation with an appropriate disclosure or drawer. Do not hide features merely because width decreases. For modal drawers, implement focus/Escape/return; inline disclosure must not block the page. Do not copy native window controls into a web page as nonfunctional buttons.

## States are part of the design

- Links navigate; buttons execute. `aria-current` identifies the current destination, `aria-pressed` a toggleable option, and `aria-expanded` a disclosure, according to actual behavior.
- Decorative icons have `aria-hidden`; icon-only buttons have accessible names. Interaction area is independent of the drawing. Use already-available icons or consistent original SVGs.
- Hover is not the only way to discover actions. Focus must survive truncation/overflow; keyboard and touch have equivalent paths.
- Disabled controls do not act; busy states announce progress and prevent duplicate submissions without losing width/focus. Errors preserve input and appear near the task. Missing backends must not simulate persisted confirmation.
- Text search, command palettes, and semantic search are different contracts. The example implements only text search; Cmd+K/Ctrl+K focuses this field without creating another capability.
- Selected theme (system/light/dark) and resolved theme are distinct. Test OS changes while "system" is active; storage failure must not become success. The optional wash is not the pool editor.

## How to transfer it to another project

1. Read the existing stack, tokens, components, routes, and global styles. Confirm that the request covers the composition and choose the authorized scope; do not turn a "padding adjustment" into shell replacement.
2. Open the example to understand the relationships. Reuse/adapt the CSS or translate the same roles into the existing library. Do not paste full-page HTML inside another application or mount a competing second sidebar.
3. Map classes/tokens to real components: shell, nav item, counter, toolbar, button, search, and field. Brand, domain, routes, labels, and data come from the consumer; synthetic data and the demonstration's in-memory state do not enter production.
4. Integrate existing events, routes, theme provider, and persistence. Do not automatically import demonstration JS into an SPA: it boots a standalone page; components with mount/unmount lifecycles need to connect and clean up listeners accordingly.
5. Compare the rendered composition and states. Record changes in controls/thickness/density as adaptations when departing from the reference, without claiming matching tokens prove fidelity.

**Reusable request:** "Use /forma:forma and the clean interface foundation to apply a neutral background, grouped sidebar, continuous panel, subtle buttons, and consistent search/inputs. Preserve my brand, stack, data, and routes; adapt and test desktop/mobile, light/dark, and keyboard."

## Acceptance in the consumer

Verify at least light/dark, expanded/collapsed sidebar when implemented, narrow viewport, long names/large counts, search with no results, keyboard focus, and affected control states. Confirm no unintended viewport overflow, reachable content, shared alignment, and distinguishable selection without relying solely on color. Captures + style/layout measurements + interaction are complementary evidence. The example may pass while destination integration fails because of global CSS or disconnected state.

Profile measurements are a static extraction from one build; the supplied image does not establish DPR, zoom, breakpoints, focus/busy states, or mobile behavior. The distributed foundation is a verifiable adaptation, not a claim of complete equivalence with that application.

### Lessons from validating the recipe

A contextual button class may lose its `display: none` to a later generic button rule with equal specificity. Check computed styles on both sides of the breakpoint and keep contextual overrides after the base. A mobile navigation button visible on desktop may be clickable without doing anything there; the button's isolated appearance does not reveal this error. Singular search results also require their own grammatical agreement instead of reusing the plural message.
