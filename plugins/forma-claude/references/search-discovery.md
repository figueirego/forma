# Search and discovery

Use this reference for search fields, suggestions, filters, catalogs, command palettes and semantic search. Appearance, relevance, scope, concurrency and recovery are part of the same contract. Preserve the product domain: study tasks do not gain visual search merely by receiving a colorful button.

## Start with a concrete query

Specification example: "blue" in the current collection + the "reference" tag should return items from that library matching the selected filter. Define whether blue means a word in the title, a user-assigned color or a color extracted from an image. These are different results. Show the active filter and let users remove it without erasing independent filters.

Before implementation, record:

| Dimension | Required decision |
|---|---|
| Universe | Library/workspace, collection and descendants, favorites, trash, permissions and item types |
| Query | Searched fields, prefix/phrase, Unicode normalization, accents, language, minimum length |
| Filters | AND/OR between tags, color, type, date and text; chips, values and removal |
| Engine | Substring, text index, vectors or a combination; installation/indexing state |
| Ranking | Relevance, date, type groups, deduplication and stable tie-breaking |
| Completeness | Pagination, limits, items not yet indexed, partial results |
| State | Typed text, applied query, in-flight request, accepted result and history |
| Persistence | Session versus library versus profile; history, recents and privacy |

Do not present list concatenation as score fusion. If ranking is relevance-based, a button labeled "Most recent" must reflect actual ordering or explain the exception.

## Surfaces and geometry

A toolbar field can open suggestions anchored below, at the same width and with consistent spacing. The color icon may open another popover; Cmd/Ctrl+K may open a modal palette. Observe each separately: rectangle, anchor, elevation, scrim, blur, focus, scrolling, outside click and Escape.

- Distinguish `focused-empty`, `typing`, `loading`, `results`, `no-results`, `error`, `partial` and `unavailable`. Whitespace must not produce arbitrary behavior.
- Do not use a scrim or blur as an aesthetic convention: reproduce the observed contract. A popover may dim context without creating a focus-trapped modal.
- Bound the panel to the visible area, flip/shift when needed and test edges, zoom and the virtual keyboard. Desktop measurements do not prove mobile behavior.
- In horizontal strips, indicate offscreen content with a fade or control. Do not confuse six visible chips with six total options.
- Support long names, RTL, selected colors, hover, focus, touch and dragging without firing a click when the gesture ends.

## Colors with independent meanings

Keep separate: interface accent; environment/pools; color assigned to an item/collection; palette extracted from pixels; profile/book material. A note with green paper is not automatically an image containing green.

Color search requires a defined color space, distance/tolerance, minimum pixel percentage, handling of black/white/gray and transparency. A chip's color represents the filter, not proof of an exact RGB match. Show accessible names and selected state beyond color alone.

Choosing a named chip, dragging a selector and entering a custom value may produce different filters. Define commit, preview, removal and reset for each action. Do not change the theme when applying a content filter.

## Keyboard and focus

Use the semantic pattern appropriate to actual behavior. Navigable suggestions need an identified input, panel/list relationship, expansion and active item; filter groups may use buttons/toggles with their own names. Do not apply `combobox` merely to decorate an input.

Specify Tab, Shift+Tab, arrows, Enter, Escape, Backspace with an empty field and the global shortcut. Distinguish:

- **Close:** hides suggestions or removes focus; does not imply clearing the query.
- **Clear text:** removes only text, if that is the label.
- **Clear search:** may remove text and all filters, but must be explicit.
- **Cancel query:** interrupts or invalidates pending work; blur alone does not.

Do not improperly intercept editing shortcuts. IME/composition must finish before submitting Enter or triggering a definitive request. Preserve focus when removing a chip and return it to the trigger when closing a modal. Results need a concise announcement without reading the entire collection on every keystroke.

## Concurrency and context

Debouncing reduces work; it does not prevent out-of-order responses. Maintain an identity per query with library, filters, text, type, sort and page. On resolution, accept the result only if that identity and generation remain current. Also invalidate when clearing text, changing collection, library or mode, or closing the surface when its contract requires cancellation.

Client cancellation and engine cancellation are different. If the engine cannot abort, discard old responses and limit concurrency. In the backend, pin the library connection/identity before any `await`; do not resume an old operation against a newly switched global database.

If the frontend waits 220ms and the grid another 90ms, waits may accumulate. Record the end-to-end budget; do not copy two timers without need. Enter should flush pending work without duplicate calls. Loading follows the query that can paint the screen, not any old Promise.

Cache must include library identity, scope, index versions and relevant filters. Invalidate/version on changes to memberships, tags, content, extracted color, trash, restoration, import and indexing. Use the same descendants contract in text and semantic engines. If they differ by product decision, expose the difference.

## Semantics and data states

Separate model installation, collection indexing and querying. An installed model does not mean the collection is complete or relevant. Document local/remote execution, download cost, disk space, cancellation, failure and fallback. Do not simulate "AI" with static results or promise semantic search from an attractive field.

Empty results may mean: no items; overly restrictive filters; collection not indexed; missing model; permissions; error. Show the correct state and recovery. On partial failure, preserve valid results, identify the unavailable source and allow retry. If there is a limit without pagination, do not present a total as complete.

Query history and viewed items are different entities. Define deduplication, limits, scope and expiration. "Clear history" must say whether it clears queries, recently viewed items or both; do not mix libraries. Do not include private titles in shared evidence unnecessarily.

## Desktop reference evidence - artifact 0.19.0

Static extraction from renderer SHA256 `038a8f7cbd96a203799799468673ce7bdb1e3f2c6ef32dcae36672876925a184`, compared with user captures. Native observation confirmed the toolbar at rest; the window-control tool did not permit typing tests in this revision. These details describe the analyzed build, not universal rules:

- `R3` field: 40px pill, min240/max560px; panel 8px below, same width, 20px radius. Focus + empty trimmed query + closed picker opens suggestions. Typing hides that panel; the grid remains the search destination.
- The anchored panel uses a scrim without blur; the Cmd/Ctrl+K `S3` palette is a separate modal surface. The `M3` picker is also separate. Do not reuse the Settings backdrop for all of them.
- 17 named colors in a horizontal strip; the screenshot shows only the first portion. They filter image-extracted palettes, not the 11 accents or pool hues.
- Header querying has a 220ms debounce; Enter applies and records history, then blurs. Escape only blurs; it neither clears the query nor proves pending work was canceled. General clear removes text, tags and color.
- Text search uses SQLite FTS5 with AND between terms and a prefix only on the last: `glass ring` becomes `"glass" AND "ring"*`. Typed quotes do not create phrase searches in this parser. Semantics uses local CLIP when available; heterogeneous results are concatenated/deduplicated, not fused into comparable rankings across types.
- The semantic route activates automatically with an installed model, trimmed text longer than 1 character and outside Trash/Favorites. Color/tags without text use the SQL path. Tags are exact, case-insensitive AND filters. Only the `S3` palette interprets a leading `#` and Space/Tab as tag addition; do not attribute that syntax to the inline `R3` field.
- The picker uses SV + hue, presets, hex and an eyedropper when available. Provisional color applies only through preset/Search/Enter. The build does not constrain its position to the viewport and may apply the last valid color when Enter receives invalid hex; these are adaptation fixes, not patterns to copy.
- History stores up to 20 queries and 24 viewed items per library, in files separate from collections; the panel shows up to 8 queries. Clear history and Clear recently viewed are separate actions. The semantic placeholder depends on an installed model without proving complete indexing.
- Static risks not to inherit: recursive text scope versus exact collection in vectors; vector cache without invalidation in some membership paths; incomplete failure/cancellation handling. These were not reproduced by injecting failures into the user's collection.

Faithful reproduction requires identity/versioning and a deviation record, as in [fidelity](reference-fidelity.md). A proven reference defect should be corrected deliberately while retaining the original behavior record.

## Minimum acceptance matrix

1. Focus empty, close, reopen, type, confirm, clear and remove only one filter; check final state and focus.
2. Apply text + two tags + color within a defined scope; demonstrate AND/OR and returned content.
3. Queries A -> B with A resolving last; only B may replace results.
4. Switch libraries during a request; no old item, history or result may appear in the new context.
5. Warm a query, move an item between collections and repeat; results must reflect new membership.
6. Compare parent/child collections in the engines; test trash, type and permissions.
7. Simulate a missing model, partial indexing and one source failing; distinguish these from a legitimate empty result.
8. Verify keyboard, screen reader, narrow window, zoom, touch, IME and popover positioning near edges.

Choose cases appropriate to the product and record those actually executed. Static analysis confirms mechanisms; a screenshot confirms one state's appearance; only execution confirms the observed transition.

## Implementation lessons - local search in Pauta

Acceptance example: a task "Plan database indexes" may appear for "speed up queries" without sharing those words. Execute that case with the actual model, record rank/score and include an irrelevant item as a control. A test returning simulated vectors verifies integration, not semantic relevance.

- **Modality is part of the contract.** Pauta implements multilingual text embeddings (`paraphrase-multilingual-MiniLM-L12-v2`, 384 dimensions, normalized mean pooling, q8), in Worker/WASM. The analyzed desktop reference uses CLIP for text-image relationships. The former does not independently recognize an image's visual contents. Pixel palettes and tags do not make a text encoder multimodal.
- **Local has a cost and a boundary.** This implementation's manifest totals approximately 158MB of model, tokenizer and runtime, served from the application origin with remote models disabled. Queries and content need not leave for an inference service. Document version, revision, hashes/licenses, first load and cache; measure time/memory on the target device. Assets present in the project do not prove the browser loaded them or that offline operation will work after a new session.
- **Ranking needs evaluation.** The implementation presents semantic hits and appends missing text matches. This is concatenation/deduplication, not calibrated score fusion. The threshold depends on the model and collection; do not turn a prototype value into a universal constant. Evaluate paraphrases, Portuguese, long notes, exact terms, irrelevant items and combined filters.
- **Pending is not empty.** During download/initialization/inference, retain provisional text hits and indicate an ongoing search. Show definitive emptiness only after planned sources complete. Errors should offer retry and identify textual fallback; clearing/switching libraries must end the previous query's pending state.
- **A query has an identity.** Library + data revision + filters + text + mode form the context. Cancel timers/client work, invalidate generation and validate identity after every `await`. Cooperative Worker cancellation may allow current inference to finish; discarding obsolete responses and limiting work remain necessary. Timeout with Worker termination is a different recovery with reinitialization cost.
- **History is neither content nor authentication.** Queries (20) and viewed items (24) have separate limits and clearing actions per library; deduplicate tags as a set. Validate schema, version, color and mode on read; storage errors/corruption are not equivalent to empty history and do not authorize automatic overwrite. ID-based scope prevents accidental mixing, but `localStorage` does not isolate users sharing an origin/browser profile.
- **Color requires provenance.** Using assigned color for a task without an image is an explicit domain adaptation. With an image, the palette derives from pixels; an explicitly empty palette must not silently fall back to task color. Neutrality, circular hue, lightness, chromaticity and minimum pixel proportion need their own tests. Sampling/quantization different from the reference prevents promises of identical results.
- **The picker has its own draft and focus.** Invalid hex + Enter retains the error and does not apply the last valid color. Escape/outside click discards; Search/preset commits. Constrain/flip the popover at edges, offer accessible S/V sliders, return focus to the trigger and close when switching libraries. An old picker must not intercept Escape from a new modal above it.

These are decisions and requirements derived from implementation and code reading. Visual validation, actual latency and browser embedding quality must appear separately in the execution record.
