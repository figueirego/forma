# HelloUra approved experience - operational workspace and landing

For ordinary adaptation without a source-project name, use [capability reuse](capability-reuse.md). This record preserves the source and exact-reproduction boundary; it does not impose its identity on other projects.

Use this optional experience when asked to preserve or reuse the approved HelloUra design and UX. It combines the compact fixed window, integrated sidebar context, quiet glass selection, operational states, interruptible theme reveal, and split product landing. It is not a complete product, a replacement backend, or the default identity for every Forma project.

The [experience profile](../assets/reference-profiles/helloura-experience.json) records the final decisions and evidence boundaries. The final workspace combines `fixed-window-4`, `sidebar-context-3`, and `theme-ink-2`; the landing is revision 03. Keep these revisions separate from older studies. Brand colors, typography, logos, copy, and business terminology are consumer-specific and optional in adaptations.

## Locate and preserve the complete approved source

The complete artifact belongs to the separate PRIVATE local kit `helloura-approved`. Check the supplied project/archive first, then this conventional location:

```text
~/.local/share/forma/reference-kits/helloura-approved/manifest.json
```

Expand `~` for the current user. Read the manifest, resolve its relative file records within the kit, and verify every recorded SHA-256 before reuse. Its `workspace/` and `landing/` roots preserve actual HTML, CSS, JavaScript, local fonts, logos, and evidence. Historical studies are archived separately; they are not alternative defaults. The manifest identifies the captured version, not a live production installation.

1. Locate and verify the kit before promising an exact copy. If missing or hashes differ, obtain the approved artifact or resolve the mismatch. A plugin installation does not establish kit availability or reload an existing session.
2. Copy the complete requested surface into a new consumer destination; leave the reference kit unchanged. Preserve relative asset paths and the original stylesheet/script order. Do not copy only a screenshot or the first viewport's assets.
3. Read unfamiliar source before serving it. Serve the copied surface over local HTTP; the landing uses JavaScript modules. Keep its demonstration boundary and review outbound links before any public use.
4. Compare source and copy with equal CSS viewport, browser, DPR, zoom, theme, loaded fonts, scroll position, and motion checkpoint. Preserve working interactions and below-fold content before customization.
5. Adapt only the authorized brand, content, data, or stack. Record changed files and visual consequences. Framework conversion and integration with an existing router/theme provider require new validation.

Do not silently replace this source with the neutral Soft Glass landing, compact workspace specimen, or a new generic remake. Global styles and scripts expect the captured document structure; isolate a copied page before integrating it into an existing application. The [integral preservation approach](soft-glass-integral.md) explains this distinction for another kit, not an interchangeable source.

Public Forma includes only reusable profiles, authored generic mechanisms/icons, contracts, and tests. Consumer application source, screenshots, fonts, logos, record-level data, personal file paths, backend services, and credentials do not belong in this public profile. Preserve the private kit's own provenance and licensing boundaries.

## Final decisions and superseded choices

| Area | Preserve as the final decision | Do not restore from history |
|---|---|---|
| Frame | Fixed application window; toolbar outside the scrolling body | Document scrolling from the earlier scroll-flow study |
| Navigation | Black in both themes; dark glass active row with orange icon and 3px marker | Full orange sidebar or the older fully orange selected row |
| Context | Integrated team/profile rows without raised cards | Glass team/profile boxes; the matte option is comparison-only |
| Density | 8px navigation gaps; height-aware spacing; all destinations reachable | An independently scrolling navigation list inside the sidebar |
| Material | Component-specific transparency and restrained depth | Ambient illumination or diagonal reflection across navigation labels |
| Landing | Split hero, dominant call card, supporting contact/record cards, plain yellow field | Decorative background circles, explicitly rejected by the consumer |

The integrated context was approved on 2026-11-10. The matte option was not selected; do not describe it as explicitly rejected. [Calm Glass Navigation](calm-glass-navigation.md) now describes the final selection and records `black-orange-1` as superseded. Its former orange selected fill and glass team/account controls belong to the historical decision record; the final profile and verified private source take precedence.

## Frame, density, and navigation ownership

Use shell -> sidebar + content panel -> toolbar + scrolling content/footer, following the structural principles in [Clean Shell](clean-shell.md). The document stays at scroll zero. The toolbar occupies its own opaque row; text must never pass behind it. Only the main content region scrolls during ordinary work. Footer content remains inside that region.

- Use shrinkable flex/grid regions with `min-width: 0` and `min-height: 0`, stable scrollbar space, and contained overscroll. Preserve rounded container geometry instead of simulating it with a screenshot.
- Navigation returns the content region to the top and focuses the main region without a second scroll jump. Opening or closing the mobile drawer preserves the existing content position.
- Keep 8px gaps between navigation items. Short desktop windows reduce spacing and suppress group captions; do not hide destinations to make the layout fit.
- At normal target heights, the full menu, settings, and profile fit without a separate navigation scrollbar. Below 700px on desktop or 800px on mobile, the entire sidebar may scroll as one surface so all controls remain reachable.
- Preserve expanded navigation, the 72px collapsed rail, and the mobile drawer as distinct states. Mobile navigation targets remain at least 44px; compact desktop dimensions are not universal touch-target guidance.
- Keep selected, hover, keyboard focus, and pressed states distinct. Use `aria-current` for the destination, accessible names for icon-only controls, and tooltips as supplementary labels.

The private evidence covers 1440x960, 1280x720, and 480x844 CSS pixels for the frame/sidebar. These are observed checkpoints, not a complete responsive-device matrix.

## Role, team, and profile context

Operator navigation contains the attendance workspace and personal audio/profile settings. Manager navigation covers overview, campaigns, attendance, contacts/lists, results, campaign messaging, wallet, team/permissions, and settings. Administration can switch the selected team and inspect team-scoped controls. The role selector is a preview mechanism, not production authorization.

Keep the current team visible when viewing permissions, integrations, financial settings, and action reviews. Managers see static team context; administrators receive an explicit team-switch action. Integrated identity rows have no blur or shadow: the team avatar carries a restrained accent, while the profile remains neutral. Retain complete accessible names when visual labels truncate or collapse.

Use real links for navigation and buttons for actions. Modal drawers make the background inert, contain focus, close on Escape, and return focus to the opener. Dialogs also return focus to their trigger, with an appropriate main-content fallback if it disappeared. Route changes close the drawer without displacing content.

Apply [trust contracts](contracts-trust.md): hiding a route or disabling a switch does not enforce permission. Server-side role, ownership, and tenant checks remain requirements for any real integration; they were not validated by this visual preview.

## Component-specific glass, icons, and themes

Preserve material roles rather than applying one blur value everywhere:

| Component | Final consumer material |
|---|---|
| Sidebar | Opaque `#1c1c1c` in both themes; restrained border/shadow; no backdrop blur |
| Active navigation | Dark translucent fill, light text, 8px blur, shallow depth, 3px marker and matching `#ff8540` icon |
| Team and profile | Integrated transparent rows; no glass, raised border, or shadow |
| Main content shell | Theme-specific translucent fill, 28px blur, restrained border and outer shadow |
| Reading panels | Diffused fill without another nested backdrop filter |
| Toolbar | Opaque theme surface, separate from scrolling content; no backdrop blur |
| Buttons and dialogs | Their own restrained material; retained edge light is masked to the contour |

Keep the ground uniform and neutral; do not add a spotlight to exaggerate blur. Do not blur text/icons or place diagonal film across labels. The old research notes and generic README wording are not a substitute for the final component cascade. Unsupported blur, reduced transparency, high contrast, and forced colors require readable fallbacks and destination testing.

The [original operational icons](../assets/operational-icons.svg) provide a reusable family: 24x24 viewBox, 1.6 stroke, rounded ends/joins, consistent geometry. The corrected history symbol aligns its arrow and clock arc; the consumer checked it at 16px and 20px. Decorative SVGs use `aria-hidden`; icon-only actions need an accessible name and a target larger than the drawing. Preserve the kit's actual family for exact reproduction; do not add an unrelated icon dependency.

For the portable sprite, use an outer `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">` and a `<use href="/your-assets/operational-icons.svg#op-history">`. Set the outer SVG width/height equally and inherit `color` from the control. Serve the sprite from the same origin; the example asset path is an integration slot, not a globally installed URL. The complete private preview keeps its original inline icon implementation.

Theme changes preserve the black sidebar while the content changes between light and dark. The optional [Ink Theme Transition](ink-theme-transition.md) expands an organic reveal from the viewport center over 720ms. It does not rerender the attendance content or discard drafts/scroll. Rapid input settles to the latest choice without a queue; navigation, resize, hidden document, and reduced-motion changes settle the effect. Missing support or reduced motion applies the palette immediately. Reuse that contract rather than building a second competing theme controller.

These brand values describe the approved consumer, not mandatory Forma tokens. Adapting them requires rechecking composited text, selection, focus, and fallback contrast in both themes. This is an authored web material, not equivalence to Apple's native Liquid Glass renderer.

## Honest operational states and recovery

Use states to explain what happened and the next permitted action. Follow [trust contracts](contracts-trust.md) and [UX heuristics](ux-heuristics.md); keep demonstration feedback explicitly local.

| Situation | Reusable behavior |
|---|---|
| Campaign list | Distinguish running, paused, completed, and draft; show progress with context |
| Empty filter/search | State that no matches were found and provide a useful clear/change path |
| Invalid input | Preserve values, explain the correction, and focus the relevant field |
| Attendance | Distinguish active call, wrap-up, waiting, paused, and disconnected audio |
| Wrap-up | Require a selected outcome before returning to availability; retain notes |
| Pause/resume | Explain whether connected work continues; preserve progress and remaining items |
| Completed campaign | Treat a new round as a separate deliberate action, not a silent restart |
| Unknown call outcome | Mark it for verification; reconcile before retrying to avoid a duplicate call |
| Unavailable integration | Explain the team permission limit and a permitted path to resolve it |
| Payment review | Show selected team, entered amount, and method before any real submission |
| Preview completion | Say what changed locally; never claim a sent invitation, connection, charge, or saved remote record |

The prototype's free-entry top-up validates a positive amount and ends at review. It does not establish provider minimums, fees, settlement, payment success, or financial authorization. An unknown outcome is not failure, and accepted work is not confirmed completion. Do not copy a local toast into a connected product as proof of persistence.

Loading was not applicable to the synchronous local preview. A real asynchronous integration needs its own pending, error, cancellation, reconciliation, and retry contracts. Backend permissions, telephony, Asaas payments, WhatsApp providers, and Consignado consultations are requirements/background, not capabilities verified by this capture.

## Split landing and conversion

The final landing combines a 37.25% graphite message/action rail with a 62.75% plain yellow product field. The dark attendance card leads; ivory contact and conversation-record cards provide context. Nunito and the consumer palette remain local assets in the private kit. Preserve the hierarchy and responsive reflow instead of shrinking three panels until they become unreadable.

- Resources use an ivory section with roughly 35/65 text/operational-preview proportions. Four tabs remain discoverable in a 2x2 grid at 600px and below.
- Follow with three concrete operation steps, a restrained FAQ using native `details`, and a commercial form with persistent labels and a status region.
- The demonstration advances through ready, audio connected, conversation, and recorded states only on visitor action. The waveform response lasts at most 1.89 seconds, runs once on pointer activation, and is suppressed for keyboard use and reduced motion.
- Tabs preserve selection, roving focus, related panels, horizontal arrows, Home, and End. The mobile menu closes on Escape and returns focus.
- Do not invent customer counts, testimonials, performance results, or capabilities from illustrative data. Green denotes a demonstration state rather than a second brand color.
- The captured commercial destination is blank. The form validates and retains input, reporting that nothing was sent. A configured HTTPS URL without embedded credentials enables only navigation; it does not send the entered fields or implement lead handling.

The final revision 03 design notes and styles supersede older root notes describing horizontally scrolling mobile tabs, a longer looping wave, or hidden supporting cards. Figma references are historical: editable text/vectors and three native desktop cards were recorded, but not full Auto Layout, an interactive prototype, or pixel-identical typography/shadows.

## Evidence and acceptance boundaries

The private kit preserves source, manifests, contracts, checks, and captures. Historical results include targeted frame/sidebar checks, nine isolated theme-controller cases, rapid theme input, keyboard navigation, draft/scroll continuity, and resize. Landing records cover four demonstration states, tabs, mobile menu/focus, and inspected widths from 320px to 1920px. Read each record's revision and limits; intermediate measurements are not one uniform final run.

Source hashes establish transfer identity. Static/REA inspection establishes only inspected relationships; package tests establish their tested contracts. Neither proves fresh rendered fidelity, production integration, authorization, or complete product delivery. Reduced motion was simulated in the original theme controller; system-level transparency/contrast fallbacks, physical devices, screen readers, cross-browser parity, FPS, real lead handling, and provider integrations require separate evidence. Historical publication records do not verify the current deployment, and the workspace changes remain a local preview in the captured evidence.

Before accepting a consumer, use [rendered validation](rendered-validation.md): compare both themes, expanded/collapsed navigation, short windows, drawer, selection/focus, profile/team context, dialogs, empty/error/recovery states, draft/scroll continuity, and both theme-transition directions with rapid input/fallbacks. For the landing, inspect every section, the four states, tab keyboard behavior, form validation/no-send boundary, and motion preferences. Report copied, adapted, locally tested, and unverified work separately.

**Reuse request:** "Use Forma's approved HelloUra experience. Locate and verify the private `helloura-approved` kit, copy the requested complete workspace and/or landing into this project, preserve the approved interactions and both workspace themes, and compare before adapting. Keep the final integrated sidebar and dark active selection; do not substitute the neutral Soft Glass demo or claim connected product actions."
