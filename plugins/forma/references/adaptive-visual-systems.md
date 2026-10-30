# Adaptive visual systems, profiles, and spatial maps

Use for customization, collection products, expressive interfaces, profiles, and spatial data views. Independent synthesis informed by the audited desktop reference, artifact 0.19.0 (2026-10-25); principles are transferable, particular values are not universal standards. Also read [visual system](visual-system.md), [motion](motion.md), [contracts](contracts-trust.md), [artifact investigation](artifact-investigation.md) and [rendered validation](rendered-validation.md) as relevant.

## 1. Theme contract before the palette

When the problem concerns color balance, tonal scales, or color appearance, follow [color diagnosis](color-refinement.md); this section defines state scope and precedence. Evaluate the resolved mode and pairs/consumers that actually change, without confusing a theme selector with evidence that every layer updated.

Model separately: preference (system/light/dark), resolved mode, accent, ambience, contextual color, contrast, transparency, motion, and density. Declare each value's owner: OS, app, account, library, document, or session. Do not mix persistent preferences with derived state.

Deliver a precedence table. Adaptable example: explicit preferences override the OS; elevated contrast overrides decoration; collection color changes only ambience when "keep theme" is off; action accents remain semantic. Observe theme before the first frame and after context switching to prevent flashes and preference leakage.

Minimum tokens: surface/base/raised/overlay, text/primary/secondary/disabled, border/default/strong, accent/fill/on-fill/text, focus/ring, status/success/warning/error, selection/bg/text. Selected, hover, pressed, disabled, and focus states are independent. Category colors do not replace state colors.

CSS hex values do not prove final colors: record mode, preference, JS override, and computed style. For alpha/blur/gradients/images, evaluate actual composition at extremes; do not calculate text contrast without accounting for the background. Dark mode requires new luminances, borders, and shadows, not automatic inversion.

In the audited desktop reference, action accents, ambient wash, profile-material palette, and book-cloth colors are separate systems. Do not apply the same hex to all four. Canvas needs repainting when tokens change; shaders need uniform/texture updates; CSS automatically updates only the DOM layer. The wash editor uses manual stage values while the main surface may resolve context. Per-surface precedence is part of the color contract.

## 2. Functional materiality

Specify which surfaces are opaque, translucent, and decorative. Essential content must remain legible without blur, shaders, or images. One initial recipe is a neutral background with a few low-saturation fields at the edges, a more solid workspace panel, and shadows by elevation role. This is an aesthetic hypothesis to test, not an obligation.

Document each field's color, position, extent, intensity, and limits. Provide simple controls and reset; expose noise and position only when helpful. Limit intensity to preserve hierarchy. Include a solid fallback, economical mode, and transparency/contrast preferences. Measure cost on target devices before imposing continuous animation.

Separate chrome, list, inspector, and reading-area density. Do not shrink hit areas just to make icons smaller. Translate desktop sidebar/inspector into mobile navigation and screens/sheets while preserving task and context.

## 3. Preview, save, and undo

Choose and communicate a contract: (a) draft with explicit commit or (b) immediate application with undo. Do not combine "Save" with hidden, unconfirmed persistence.

For drafts: confirmed snapshot -> local preview -> validation -> await commit -> success. Preserve drafts and permit retry on failure. Escape/outside click/closing need one consistent policy. For immediate application, each change must indicate pending/error status, and undo must restore the correct state.

Inventory by section; do not assume one transaction for the whole window. In the audited desktop reference, Profile/Appearance use drafts; Libraries renames/restyles immediately; the compact lighting editor persists with a 250 ms debounce and discarding writes a reversal. Pauta may retain explicit Save but must declare the adaptation. Overlays also differ: Settings is modal; lighting is a nonmodal panel at corner 16 px/16 px, width 268 px. Do not transfer focus traps/inert between them.

Debouncing limits frequency, not write ordering. Use per-entity revisions/queues, discard stale responses, and define flush/cancel on unmount. Do not close an editor after a failed flush. Undo must not consume an entry before success without restoration or partial-result handling.

When switching library/tenant/project: consciously save or discard drafts, close overlays, invalidate dependent caches, retain context identity in jobs, and reject old responses. Membership changes require relevant search/cache invalidation. Locally saved and remotely synchronized are distinct states.

## 4. Usable expressive profiles

Define the purpose: identification, authorship, reputation, or sharing. Necessary data remains semantic DOM/native text; canvas is decoration. Do not invent member numbers, badges, or credentials to convey authority.

A card may have base, material, highlights, borders, and content, with deterministic color identity. Limit tilt, retain contrast at maximum shine, and avoid moving actions with the pointer. Without a fine pointer, with reduced motion, in economical mode, or without WebGL: provide an equivalent static version. Stop RAF/timelines/shaders offscreen and on unmount; short CSS durations do not cancel JS work.

Recovered contract in the audited desktop reference: semantic DOM over a custom WebGL2 background, not Three. Card 320x440, content inset 24, perspective 1000, layers deep -> canvas -> tint -> text/emboss -> bevel. Name 28/32 px and role 12/14 px; monospaced metadata. 120 deterministic palettes (12 families x 10 variants), with shade/base/accent/glow and seed. Shuffle advances 37 modulo 120. Maximum tilt 7 degrees per axis; springs 90/17/1, holo 190/31/1, return after 80 ms. These are reference measurements, not universal defaults.

In the reference, the profile is global to the application; libraries do not have different people. Name/role/variant are fields in that reference, not mandatory destination fields. A number may come from a license and must not be invented. Saving a local profile and synchronizing remotely have distinct confirmations. Map ownership before connecting the object to storage.

If the destination already approved a passport or another identity object, reuse it in the profile; the material card is an alternative, not an automatic replacement. Select fields by domain (for example, global photo/name and per-language goals), with a preview connected to the form's draft. Removing a purposeless field from the screen does not authorize deleting its legacy value. A visual country/category object does not certify citizenship, licensing, or competence.

Test empty/long names, CJK/RTL, missing images, long roles, text scaling, and themes. Export distinguishes cancellation, failure, and completed files. Reuse the same component, fix fonts/pose/framing, wait for readiness, and validate dimensions: the desktop reference uses 480x640 CSS px @3x for a 1440x1920 PNG, independently of window zoom. Web/mobile need platform-compatible download/clipboard behavior without pretending an Electron bridge exists. Do not confuse public customization with private account data.

Statically observed failure not to inherit: the profile shader receives time 0 in reduced motion, but RAF keeps rendering. Stopping only the clock or CSS transform does not eliminate GPU work. Acceptance requires preference changes during the session, pausing when hidden, predictable return, resource release/context-loss handling. A static capture does not prove these requirements.

## 5. Graph, spatial map, and canvas

First identify the model: a relationship graph has meaningful nodes/edges; a collection map may only have groups. Do not invent relationships for decoration. Explain what proximity, size, color, and connections represent.

For identity, link resolution, aliases, backlinks, local/global traversal, and index updates, read [graphs and knowledge](knowledge-graphs.md). These contracts precede camera and painting. The audited desktop reference's membership map, Obsidian's derived graph, and an authored Canvas are not interchangeable capabilities.

For territories and indicators, use [temporal and geographic dashboards](data-dashboards.md): geographic area, population, and magnitude are different measurements. Scale, legend, coverage, and temporal reference must accompany every mode; depth painted in Canvas does not imply WebGL or a 3D engine.

Separate content coordinates from the camera. Anchored zoom must preserve the point of interest; fit/recenter must be visible. Declare limits, margins, resize behavior, and recovery for offscreen selection. Distinguish moving position from reclassifying an item. Destination previews, cancellation, and undo must cover actual effects, including automatic tags.

Offer an equivalent semantic list/tree, search, keyboard selection, and a "move to" command. A canvas aria-label does not replace object access. Preserve focus with virtualization; limit count announcements; selecting all must explicitly state whether it includes unrendered items.

For large collections: measure time to interaction, search/drag latency, frames, and memory; use culling, invalidated caches, workers where justified, and bitmap disposal. Render from dirty state where possible. Do not promise 60 fps merely because RAF/workers exist. Mobile needs pinch/pan/scroll validation and an alternative without complex gestures.

Audited desktop reference case: offscreen Canvas2D with a thumbnail worker, final composition through an optional WebGL1 lens, a lens-free Canvas2D fallback, and aggregate payload `{collections,items,links,unfiled}`. Links are collection/item memberships; the screen groups previews without inventing semantic lines. Tile height 40, gaps 18, aspect limited to .45..2.4. Camera zoom .02..10, buttons multiply/divide by 1.5, fit up to 1.5. When changing scale by factor `r`, `x'=anchorX-(anchorX-x)*r`, likewise Y, preserves the point under the pointer. A 3 px drag threshold separates clicking from dragging; background/Space/middle button pan; modifiers support area selection.

Persisting membership does not prove camera/position persistence. Dragging between collections writes add/remove and may add automatic tags that survive removal of the association. Rollback/undo must cover these effects or declare the limitation. Theme resolves computed tokens into canvas colors and requires invalidation. Cleanup terminates workers, cancels animation/timers, removes listeners/observers, and closes bitmaps. Test worker failure, write errors, item duplication across groups, and large datasets, plus keyboard/equivalent-list access.

## 6. Product-connected 3D objects

To make the technique copyable/adaptable, use the contract and original asset in [reusable objects](reusable-objects.md). For GLB products, depth portraits, and material switching, use [immersive web](immersive-web-tech.md). The decision depends on task and budget; an operational library need not inherit a campaign scene.

Before the scene, identify the persisted object: library, collection, or real product. Color, name, pattern, and metadata must update the entity and its representation. Presentation pose is separate state; do not persist it as identity without a reason. A CSS-tilted cover can be a fallback but does not prove mesh, material, or lighting equivalence.

In the audited desktop reference, books use Three revision 186, meshes with position/normal/UV/index, and cloth/foil/bump shaders. This is neither the profile renderer nor demonstrated OrbitControls. The renderer uses alpha, antialiasing, and intermediate 2x resolution; the component caps DPR at 2 and copies to an output canvas. Perceptual color combines entity hue with deterministic ID-based variation, producing deep/cloth/lit/edge. Diffuse/bump/foil maps have their own lifetimes and caches.

Document lighting/material/camera, not just screenshots: reference ambient .54, key .9 at position (7,0,4.5), back 1, spot .05, exposure .7; shininess 8, reflectiveness .04, bumpBase .006, bumpCustom .07, foilOpacity .6. Detail pose 20.05/28.65/-8.59 degrees; hover amplitudes 11/7 degrees. Horizontal drag adds .42 degrees/px, vertical drag is bounded; smoothing `alpha=1-exp(-min(64,dt)/120)` ends at rest. These numbers serve this build's comparison, not indiscriminate tuning of every model.

Delivery checklist:

- Accessible DOM name, visible focus, and keyboard object activation; decorative canvas does not erase semantic content.
- Mouse/touch support capture/cancellation/limits; alternative controls perform the same task. Essential actions remain visible without hover.
- Reduced motion freezes decorative hover/drag/sway and responds to session preference changes. Static poses remain legible.
- Unavailable/lost GPU shows a static cover and text with the same actions. Lazy-import failure must not leave a silently empty region.
- Culling/idle/visibility and texture/geometry/material disposal are explicit. A shared renderer needs an owner and shutdown policy.
- Saved name/color/pattern survive reload; errors preserve confirmed data. Removing records and removing files are distinct actions.
- Mesh, shader, texture, and brand provenance/licenses are verified; observing artifacts does not authorize automatic redistribution of proprietary content.

## 7. Practical acceptance matrix

| System | Rehearsal | Required outcome |
|---|---|---|
| Theme | Light/dark/system; change OS | Coherent mode, no flash, preserved preference |
| Customization | Extreme accent + extreme background + high contrast | Distinguishable text/focus/selection; decoration does not override state |
| Persistence | Change -> discard -> reopen; save -> restart; storage fails | Contract fulfilled; no false Saved |
| Context | Switch collection/library with a draft and job | No data in the wrong context; user understands destination |
| Motion | Reduced initially and changed during session | Nonessential effects and graphics work stop |
| Profile | Extreme text, no GPU, export cancel/error/success | Content and actions remain available |
| Export | Different zoom, slow fonts, resolution/DPR, opened file | Contracted content, framing, and dimensions |
| Map | 0/1/many groups, zoom limits, resize, fit | Recoverable orientation and reachable objects |
| Organization | Canceled drag, invalid destination, failed undo | No silent change; retry the correct operation |
| Search | Out-of-order response; membership after warmed cache | Results respect current query and scope |
| 3D | Extreme pose, DPR, GPU off/context lost, enter/exit 20 times | No clipping/lost actions/unbounded resource growth |
| Library state | Immediate restyle, failed rename, context switch | Explicit persistence per action; no fictional visual rollback |
| Portability | Keyboard, touch, enlarged text, narrow viewport | Same task achievable without depending on hover/gestures |

Use pairwise combinations plus critical extremes to reduce test explosion; this does not prove every combination. Record "observed," "static," "tested," and "pending" separately. An excellent visual reference may contain functional defects: transfer principles, not defects.

Parity has three axes: appearance, interaction, and data/persistence. Inventory every capability before declaring completion. In the Pauta snapshot audited on 2026-10-25, tasks/preferences/lighting existed; editable profiles, spatial maps, and 3D books were not implemented. This document defines practical requirements; it does not claim those features already exist in Pauta or that the whole product equals the audited desktop reference. Later changes require new code and runtime evidence.

To inventory every option and distinguish modes, defaults, owners, and persistence contracts, use [Modes and settings](settings-modes.md).

The graph lens uses radial distortion `p*(1+.07*r*r)` and corresponding hit-testing conversions, including iterative inversion. Never distort painting alone while leaving click/drag in untransformed coordinates. Validate the object under the cursor at corners, center, and zoom extremes. WebGL presence does not turn the view into a 3D graph.

## 8. Integrate search, profile, map, and library

A later Pauta implementation added local-search, workspace, material-profile, book, and map modules. Their presence updates the static inventory; it does not close visual/interactive comparison with the audited desktop reference. Retain the dated earlier record as history and require fresh runtime evidence for each capability.

| Data | Representation | Contract to preserve |
|---|---|---|
| Active library | Name/cover, list, map, and history | Same ID/context; switching invalidates search and old jobs |
| Confirmed profile versus draft | Name/role/card, sidebar, and PNG | Preview does not confirm Save; export declares draft versus saved source |
| Library color | Cloth/cover | Local identity independent of accent and search filter |
| Task color or image palette | Search chip and result | Explicit provenance; filtering does not alter lighting |
| Accessibility preferences | CSS, shader, 3D, map | One contrast/motion contract applied across all renderers |
| Map item | Thumbnail, position, selection, and action | Same real content as the list; no invented relationships |

Do not confuse technologies: a local text encoder provides textual semantic search; a palette matcher provides color search; a shader provides material; a map with a lens provides spatial navigation. None of these mechanisms alone proves multimodal vision, a knowledge graph, or a navigable 3D scene.

Renderers, listeners, and asynchronous work need lifecycles. On reopening/rerendering, remove global listeners and cancel old RAF/jobs; prefer pointer-capture events with `pointercancel`/`lostpointercapture` when the gesture belongs to the component. Test repeated open/close and context switching with uploads, inference, and animation active. PNG export is another rendering path: compare content, dimensions, fonts, texture, and transparency in the opened file, not just the preview.

For web/mobile/desktop distribution, record actual environment capabilities. Image clipboard, EyeDropper, GPU, storage, and downloads have their own availability and failure modes; retain an operable alternative. An interface in a desktop frame does not prove native packaging, file integration, updates, or synchronization. Use [search](search-discovery.md) and [settings](settings-modes.md) for data and recovery contracts.
