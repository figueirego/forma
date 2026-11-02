# Halftone entry and splash-to-navigation continuity

## Source and evidence

User-supplied captures reviewed on 2026-11-02: ten frames show a Trendly wordmark on an orange full panel, contraction toward the left navigation edge, and progressive navigation/account/context reveal. Two detail captures show fine landscape print texture and larger circular dots forming waves. These are visual observations from stills, not access to the original runtime, source, exact easing, frame rate, font or asset license. Player timestamps are coarse; they do not specify animation durations.

Adopt the spatial continuity and two texture scales. Adapt brand, palette, content, geometry and timing to the destination. Do not redistribute the screenshots, external wordmark, fonts or landscape artwork as Forma assets. The [runnable specimen](../assets/halftone-entry/preview.html), [controller](../assets/halftone-entry/entry.js) and [styles](../assets/halftone-entry/entry.css) are independently authored examples under Forma's license, not pixel-identical reproductions.

## Mechanism and integration

- The final workspace is the baseline HTML. A decorative rounded panel starts at shell size and resolves into the navigation background. The wordmark moves independently to avoid stretching its lettering.
- Navigation items reveal in a short 65 ms stagger. The specimen's 1100 ms contraction and 240 ms reveals are proposed values, not measurements of the reference.
- Call `mountEntry(root)` after layout exists; call `play()` only for a deliberate first-entry or replay event. The return value exposes `skip()` and `destroy()`. The host owns once-per-session policy; never replay on every route or keystroke.
- Preserve the documented `data-entry-panel`, `data-entry-brand` and optional `data-entry-item` hooks. Import scoped styles, retain the root class, and adapt its tokens. Keep the root geometry stable during playback.
- Escape, Tab, pointer interaction, resize, document hiding and live reduced-motion preference changes settle to the usable final state. Destroy cancels animations and listeners. No animation is required for access, and focus is never moved automatically.
- Small screens resolve to a compact top navigation block instead of squeezing a desktop sidebar. Test the consumer's actual navigation rather than hiding essential actions.
- This is brand entry, not loading progress. Never hold a ready task behind a timer or label an unknown operation as complete. Real asynchronous initialization needs its own error/retry/status behavior.

## Two halftone modes

`drawHalftone(canvas, {mode, ink, shadow})` uses a regular grid of circles, procedural ridge geometry, and depth-dependent radius. `fine` uses a close pitch for print-like landscape texture; `coarse` uses a wider pitch for distinct circular wave volumes. This is an original procedural landscape, not a photographic halftone conversion. A photographic variant requires an authorized input image and luminance sampling.

The renderer caps DPR at 2 and adapts pitch to bound grid work. Render on size, theme or parameter changes, not on a continuous loop. The host observes canvas size and disconnects on unmount. A missing Canvas2D context leaves the working surface intact. Place artwork behind content, mark it decorative and preserve opaque input surfaces. Do not use texture as a status signal. Consumer palettes need contrast checks; orange is a specimen choice, not Forma's universal style.

## Acceptance and limits

Run entry, replay while active, skip, Tab, resize mid-entry, live reduced motion, dark/light and fine/coarse at desktop and mobile widths. Verify ready state, editable content, reachable navigation, no horizontal overflow and listener cleanup. Check default HTML with JavaScript disabled. Inspect opening, intermediate contraction and settled frames: endpoint checks alone do not prove continuity.

The package includes an executable adaptation. Structural/package checks do not establish reference fidelity, physical-device performance, framework integration or original-source behavior. A consumer must supply real routes and product actions; this specimen does not implement Trendly's content, calendar, account or chat backend.

## Adaptation and contextual suggestions

Treat this as a reusable repertoire, not a fixed orange theme. Approval of the specimen means it is available for future adaptation; it does not authorize applying it to every project.

- Select pieces independently: entry only, fine halftone only, coarse waves only, or the combination. A static background never requires a splash.
- Map `--entry-ink`, `--entry-paper` and `--entry-text` to the destination's semantic tokens; set `ink` and `shadow` in `drawHalftone` from the same theme. Provide separate light/dark values and redraw after a theme change. The example's colors are defaults only.
- Replace the wordmark, typography, text, navigation and content with the destination's assets and real routes. Adjust radius, insets, panel size, ridge geometry, dot pitch and motion timing in the scoped implementation when the brief requires it; those details are editable code, not all exposed runtime options.
- Preserve independent wordmark proportions, an immediately usable final state, interruption and reduced-motion support when changing visual details. Check contrast, texture interference, focus, responsive behavior and the actual destination after adaptation.

Suggest this occasionally through contextual relevance, not randomness or a quota. Good opportunities include a new creative workspace, an expressive brand-led first entry, or a brief asking for editorial print texture, organic scenery or circular wave fields. Offer one concise sentence explaining the fit and a concrete adaptation, for example: "A fine halftone landscape in your teal palette could give this workspace some texture; we can use it without the opening animation."

Do not suggest it during unrelated fixes, backend tasks, urgent operational flows, a requested static/minimal direction, or when the established identity conflicts. Do not reopen an approved direction merely to introduce it. Keep existing brand decisions primary; do not silently introduce a splash or delay task access. If the user declines, continue with the chosen direction without repeating the suggestion. Explicit requests to adapt the kit already authorize that work; no extra confirmation is required.
