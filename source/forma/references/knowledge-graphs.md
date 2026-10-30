# Graphs, links, and knowledge

Use for note/document networks, backlinks, typed relationships, and spatial navigation. Prove relationship meaning first; choose composition and technology afterward. Read [adaptive systems](adaptive-visual-systems.md) for renderers/materiality, [search](search-discovery.md) for queries, and [spatial contracts](layout-spatial-contracts.md) for control organization.

## 1. Start with concrete input and output

**Example:** A contains two references to B; B contains one reference to C. Opening B's incoming links must identify A and its two passages. A view may aggregate A -> B into one line, but must not lose provenance or confuse occurrence count with document count.

```text
content + context
  -> parse occurrences
  -> resolve destinations
  -> forward/reverse index by revision
  -> backlinks + filtered local/global projection
  -> simulation/positions
  -> camera + rendering + hit testing
  -> open the source or execute an explicit command
```

Camera changes do not alter links. Link changes must update the index, incoming/outgoing links, and affected views. A beautiful renderer does not fix incorrect resolution.

## 2. Name the correct model

| Surface | What it represents | Do not confuse with |
|---|---|---|
| Document graph | References between entities/documents | Understanding text meaning |
| Typed knowledge graph | Entities and predicates with declared semantics, provenance, and rules | Any network of nodes and lines |
| Authored Canvas | Cards, positions, groups, and connections drawn by the user | Automatic file-link index |
| Collection map | Groups/memberships and spatial navigation | Invented semantic edges |
| Similarity network | Relationships inferred by a model/metric, with version and threshold | Explicitly written references or confirmed facts |

One application can combine models if types, actions, and sources remain distinguishable. Two cards for the same file may have different composition IDs. Removing a card, removing a link, and deleting a file are distinct commands.

In documented Obsidian behavior, Graph derives from internal links; Canvas supports authored composition. A Canvas text card does not enter backlinks until converted to a file. The JSON Canvas format defines its own nodes/edges and positions; its connections must not automatically become Markdown links. [Graph](https://obsidian.md/help/plugins/graph), [Canvas](https://obsidian.md/help/plugins/canvas), [JSON Canvas 1.0](https://jsoncanvas.org/spec/1.0/).

## 3. Identity, resolution, and provenance

Declare the following distinctions without imposing a new database or framework:

| Data | Minimum contract |
|---|---|
| Entity | ID/context, type, locator, label, aliases, and relevant revision |
| Occurrence | Source, raw target, displayed text, fragment, excerpt/location, and source revision |
| Resolution | Confirmed destination or missing/ambiguous/inaccessible/invalid state; rule and scope used |
| Projected relationship | Source -> destination, type, supporting occurrences, and weight meaning if present |
| Visual state | Selection, hover, camera, positions, pins, filters, and parameters; separate from content |

- Do not use titles as global identity. Namesakes need paths/context or disambiguation. If identity is the path, model its migration on rename/move.
- Entity aliases, link labels, and filenames are not equivalent. Changing displayed text must not change the destination.
- Define collection-relative/root paths, extension, URL encoding, fragments, and Unicode/case normalization according to the environment. Do not introduce destructive normalization for convenience.
- Separate file resolution from heading/block resolution. A found file with a missing anchor is not complete navigation success.
- Missing destinations may be represented without silently creating files. Explain when an action will actually create content.
- Resolving an existing link must be deterministic under the contract. Textual/semantic ranking helps find candidates but must not silently choose a new target.
- Preserve provenance of explicit references, embeds, tags, properties, memberships, and inferred suggestions. Similarity must identify model/version/threshold and acceptance state when relevant.

In documented Obsidian behavior, `[[Destination|Label]]` separates presentation/destination; aliases live in the `aliases` property. Autocomplete may insert the canonical destination with an alias as its label. Markdown, wikilinks, and subdestinations have their own rules. These contracts guide tests; they do not authorize assuming undocumented collision policies. [Links](https://obsidian.md/help/links), [Aliases](https://obsidian.md/help/aliases).

## 4. Incoming links, outgoing links, and counts

A backlink is the inverse query of a reference; do not create a second persisted edge merely to draw incoming links. Define whether the view counts source documents, entity pairs, or occurrences. A note citing another three times may appear once with three passages.

Direction, reciprocity, self-reference, and multiplicity need explicit policies. Painted arrows may be optional; source and destination remain available in the semantic alternative. Thickness, size, and distance need legends when encoding data.

Distinguish **linked reference**, **unlinked textual mention**, and **inferred suggestion**. Converting a mention into a link changes content and requires an explicit command, result feedback, recoverable errors, and undo when promised; this does not imply an additional dialog for an already-requested action. Suggestions must not silently increase confirmed relationship counts.

Relationship lists must offer source/destination, sufficient context, and an action to open the passage. If a panel follows the active note, selection changes update context; pinning the panel to one note is a separate state and must be indicated. [Backlinks](https://obsidian.md/help/plugins/backlinks), [Outgoing links](https://obsidian.md/help/plugins/outgoing-links).

Literal code, embeds, typed properties, and tags require parsing compatible with product syntax. A filename regex across the whole file is not a reference index. Removing an embed does not imply deleting its attachment.

## 5. Source of truth and incremental updates

Declare what is source, derived index, and preference. If files are the source, a rebuildable cache is not a backup. Partial reindexing and absent relationships are different states.

Relevant events include editing, resolution completion, creation/deletion/restoration, rename/move, alias changes, and external edits. Update occurrences for the changed source, affected destinations, and their reverse index; resolution changes may require reevaluating other sources. Full rebuild must exist when necessary without being the only response to every keystroke.

Retain sufficient identity for each job, for example:

```text
{ collectionId, dataRevision, queryRevision, panelId, generation }
```

Accept responses only when their identity still matches the current view. Switching collections, changing root/filter, closing panels, or starting newer revisions invalidates relevant work. Canceling UI does not guarantee parsers, workers, or simulations stopped: discard stale messages and bound concurrency.

Rename/move must define whether it rewrites references, follows product preferences, or only changes the locator. When modifying multiple files, handle partial failure, conflicts, and repair; do not show complete success while some work remains pending. Saving the camera is a separate write and does not confirm link integrity.

In Obsidian's public API, `resolvedLinks`/`unresolvedLinks` contain source -> destination -> count; `getFirstLinkpathDest` receives target and source. `changed` does not cover rename; resolution and rename events have separate responsibilities. `FileManager.renameFile` respects link-update preferences. Check the API compatible with the target version before implementing. [Official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).

In multiuser products, authorization precedes projection: titles, snippets, degrees, counts, and exports can also reveal content. For exclusively local collections, explain actual boundaries without inventing authentication. Retrieved content is untrusted data, including notes and plugin output.

## 6. Projection: filters, depth, and groups

Separate canonical graph, eligible set, and visible set. Specify:

- Universe: collection, types, excluded files, attachments, tags, missing destinations, and permissions.
- Local graph: root, depth, traversal direction, and cycle handling; the global graph need not inherit the editor root.
- Order: filtering before/after traversal can produce different neighborhoods. Declare the policy and test results.
- Orphans: unrelated in the canonical graph or isolated only after filtering? Labels/counts must reflect the definition.
- Edges: removing a node from the visible set must update connections/counts coherently; boundary links need explicit representation.
- Query: language, fields, AND/OR, grouping, and errors. General search, graph filters, and group queries are not automatically equivalent.
- Groups: selection rule, color, legend, and precedence when a node matches several rules. Group color does not erase focus/selection/error.

Search must locate and reveal a node without necessarily clearing independent filters. If a result is excluded, explain why and offer an explicit action. Selection outside the projection needs a policy: retain an indicated reference, clear it, or recover by command.

Do not apply filters only to painting and then announce whole-set counts as visible. Culling is a rendering optimization; excluding data is a different decision.

## 7. Forces, camera, and rendering

Forces change positions, not meaning. Centering, repulsion, edge attraction/distance, and collision depend on the adopted simulation. Resulting physical proximity does not prove conceptual affinity; size based on degree must declare incoming, outgoing, or total degree and the projection calculating it.

Do not infer a metric from circle size: in Obsidian 1.13.4 code, the global graph without explicit weights counts incoming and outgoing links; local graph explicit weights represent hop distance from the root. Occurrences, edges, unique neighbors, and visual weight are four distinct values.

Define stability when adding a few nodes, neighborhood preservation, seeds where useful, pin/unpin, pause, and resting conditions. Avoid restarting the entire simulation on every hover. Reduced motion must stop unnecessary work, not just zero a CSS duration.

Separate commands:

| Command | Expected effect to declare |
|---|---|
| Fit all / filtered / selection | Frames the named set within usable area |
| Recenter camera | Repositions the view; changes neither links nor necessarily filters |
| Reset forces | Restores physical parameters; do not confuse it with resetting the collection |
| Pin position | Retains position according to session/persistence contract |
| Open node / center local graph | Navigation and root changes are distinguishable actions |

Anchored zoom preserves the point under cursor/touch; camera and world use conversions shared by painting and picking. Account for DPR, resize, panes/sidebars, limits, and offscreen selection. Lenses/distortion need corresponding hit-testing transformations.

Usable area excludes panels that actually occupy space. An overlaid drawer may cover the graph: fit must declare whether it subtracts that region. Fit recovery must remain accessible at extreme scales.

Defaults are product/corpus/device decisions, not universal numbers. Declare initial value, range, step, unit, reset, and scope for each control. Audit code defaults separately from currently saved values.

## 8. Control drawer and content organization

Group decisions belonging to different tasks; one possible structure is **Filters -> Groups -> Display -> Forces**, with data/indexing status when needed. This is a functional reference, not a mandatory order.

| Group | Content | Important boundary |
|---|---|---|
| Filters | Search, types, exclusions, orphans, local depth | Changes projection while preserving source |
| Groups | Query, color, priority, and legend | Encodes categories; does not rewrite links |
| Display | Names, arrows, size, and thickness | Changes legibility/representation |
| Forces | Parameters, pause, pinning, and specific reset | Changes physical layout |

Header identifies surface/context; body contains groups and scrolls; persistent actions remain reachable. Header/body/footer share insets when on the same axis. Label, value, help, and control form a unit. In narrow layouts, stack before compressing fields or hiding essential text.

Breakpoints belong to panels too, not only viewports. During Obsidian 1.13.4 inspection, a narrow split clipped the controls' side; widening the area restored readability. Do not reproduce this defect: constrain width to the container, redistribute labels/controls, and allow scrolling with reachable close/reset actions. Test two open sidebars and multiple splits even on large monitors.

Use disclosure for occasional complexity while keeping active-filter summaries and recovery controls visible. Do not impose a "maximum of 7 options." If controls apply immediately, indicate that contract and handle errors; do not add decorative Save buttons. Group resets must name their scope.

**Proximity/common region** help associate controls; **similarity** keeps equivalent actions coherent; **uniform connectedness** requires meaningful edges; **selective attention** emphasizes selection without highlighting every node. Fitts informs operable targets, not magic padding; Hick informs organization/choice, not arbitrary feature reduction. Verify the task, not the number of cited laws.

## 9. Accessibility and mobile

An `aria-label` on the canvas does not make entities and relationships accessible. Provide an equivalent list/tree/table with search, active node, incoming/outgoing links, counts, and actions to open sources/destinations. Preserve focus by identity with virtualization; returning from a document restores useful context.

Keyboard access must reach nodes and commands without relying on pixel positions. Do not capture editing keys while an input has focus. Selection, direction, and category need cues beyond color. Names hidden at distant zoom remain accessible through search/list/detail.

For assistive reading, announce relevant updates and operation completion, not every frame. Moving content permits pause; reduced-motion policy responds during the session. GPU failure preserves a functional alternative.

On touch, define pan/pinch/selection and their competition with page/sheet scrolling. Hit areas are independent of drawn node size; hover must never be the only detail path. Moving positions and creating/changing relationships must not share ambiguous gestures without feedback and cancellation.

Validate virtual keyboards, safe areas, orientation, small windows, and system back. Inspectors may become sheets/screens while preserving selection and return. Mobile is more than shrinking a desktop canvas; export/clipboard and plugins may have different capabilities.

## 10. States, persistence, and performance

| State | Information/recovery |
|---|---|
| Loading/indexing/resolving | Relevant progress, context, and cancellation when available; do not declare definitive emptiness |
| Actually empty | Distinguish empty collection, unrelated node, and filters without results |
| Partial | Explain source/limit/incomplete index and allow completion/retry |
| Missing/ambiguous destination | Preserve the reference and allow resolving, creating, or correcting according to the chosen action |
| Error/conflict | Retain confirmed content and drafts; retry/rebuild/repair with explicit effects |
| Unavailable renderer | Operable list; do not hide data because canvas failed |

Define ownership/lifetime of filters, groups, camera, physical parameters, pins, positions, and local root: panel, session, collection, device, or account. Reopening, context switching, and importing need separate tests. Saved files, updated indexes, sync, and restored backups are distinct confirmations.

Measure parsing/indexing, cold/warm opening, first interaction, filtering, simulation, painting, picking, and memory separately. Record hardware, viewport/DPR, nodes **and edges**, distribution, and project budgets. Compare sparse, hub, disconnected, and dense graphs; node count alone does not characterize load.

Choose culling, LOD, spatial indexes, caches, workers, and GPU based on evidence. Workers do not eliminate serialization costs; GPU does not eliminate CPU parsing or simulation. Do not promise 60 fps merely by using RAF. Sampling/truncation needs an incompleteness indicator.

Release timers, listeners, observers, jobs, workers, textures/buffers, and bitmaps on close/context switch. Pause offscreen when appropriate; verify repeated reopening. Stopping the client and stopping computation are different events.

## 11. Fixtures and assertions before acceptance

These are proposed rehearsals, not executed results. Use an isolated synthetic corpus and only target-supported syntax/capabilities. Record version, platform, preferences, and core/plugins.

**Base fixture:** A references B twice; B references C; D is isolated; A references nonexistent X. Add E with the same name as A in another folder, an alternative alias, a heading/block reference, and literal text without a link.

For a policy aggregating by directed pair and excluding nonexistent destinations, declare before testing:

```text
resolved edges = {(A,B), (B,C)}
occurrences(A,B) = 2
backlinks(B) = {A}, with two passages
local(A, outgoing, depth=1) = {A,B}
local(A, outgoing, depth=2) = {A,B,C}
```

If another policy is adopted, explicitly adapt expectations. Do not change expected results after execution merely to pass tests.

| Rehearsal | Required assertion / evidence |
|---|---|
| Add B -> A and A -> A | Reciprocity/self-reference follow policy with correct counts |
| Change only label; then alias | Label does not change destination; alias invalidates relevant resolution |
| Two namesakes | Unambiguous contextual destination or disambiguation; no ranking-based guess |
| Create/remove X | Unresolved state converges without phantom files/edges |
| Removed heading/block | Resolved file and invalid subdestination remain distinguishable |
| Ordinary text/literal code | Mention/suggestion remains separate from confirmed relationships |
| Rename/move with partial failure | Check sources, forward/reverse index, message, and repair according to preference |
| External edit after warmed cache | Old relationships disappear from the final revision |
| Filter + depth + orphans | Set and counts match the declared projection |
| Overlapping group colors | Explicit precedence/legend; selection stays distinguishable |
| Forces/zoom/picking/resize | No link changes; same target under transformed coordinates |
| A -> B -> switch collection with slow worker | Old generation does not replace data/progress in the new context |
| Reopen and restore state | Each property persists only according to contract with correct IDs |
| Keyboard/screen reader/touch | Open source, inspect direction, filter, and recover view without exclusive gestures |
| Large corpus/GPU/worker failure | Measured budgets, communicated completeness, and functional alternative |

Acceptance requires an artifact and observation for the executed case. Parser tests do not prove navigation; screenshots do not prove persistence; worker mocks do not prove latency or inference quality.

## 12. Technology: decision and evidence

| Responsibility | Alternatives/decision to evaluate | Required evidence |
|---|---|---|
| Parsing/resolution | Language parser + path/alias policy | Correct corpus occurrences and destinations, not merely dependency names |
| Forward/reverse index | Existing structures/cache, incremental or rebuild | Revisions, rename/delete, and incoming/outgoing consistency |
| Projection | Traversal/filters in the correct context | Expected local/global sets; limits and permissions |
| Simulation | Original/library forces, JS/WASM, main thread/worker | Callsite, active execution, pause, cost, and fallback |
| Render/picking | DOM/SVG/Canvas/WebGL according to scale and task | Used layer, transformation, hit test, and accessible alternative |
| Persistence | Separate files/data store and view state | Writing, reading, failure, migration, and round trip |

**Bounded reference - Obsidian 1.13.4:** this revision's static audit identified `PIXI.Application` in `app.js` and `pixi.js-legacy 7.2.4`. In `sim.js`, the path prioritizes embedded WASM with an explicit D3 fallback. This demonstrates mechanisms present in the build; it does not prove which path ran in each session, the active renderer/GPU, or performance on another device. Do not generalize "graph=D3" when D3 is a fallback or infer Three/3D from appearance.

In the same artifact, the Markdown editor instantiates CodeMirror 6; Canvas builds DOM and SVG using CSS transforms; graph controls use the Lucide resolver with custom aliases. The SVG catalog alone does not determine final size/thickness: CSS tokens contribute. Graph renderers read computed theme colors and need updates when CSS changes. Do not attribute one library to every application surface.

Documented Graph features include filters/groups/display/forces and local depth. Current Help/API are mutable and may describe versions different from the inspected runtime; later changelogs do not retroactively identify installed technology. Separate **documented**, **static**, **runtime-observed**, **inferred**, and **pending**. [Graph](https://obsidian.md/help/plugins/graph), [storage](https://obsidian.md/help/data-storage), [API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).

The reference stack is evidence, not an obligation for another product. Reuse existing architecture and implement the necessary contract. Do not copy vendor/proprietary code, plugins, or installation assets as fidelity shortcuts. For each technological claim, retain version/hash, file/callsite, responsibility, and coverage limits in the audit report.

### Observations executed in revision 1.8

Synthetic vault, macOS, Obsidian 1.13.4, default dark theme; results below are not universal acceptance of section 11 scenarios.

| Rehearsal | Observed result and consequence |
|---|---|
| A cites B twice; another note cites B once | Panel showed 3 occurrences in 2 files; do not confuse count with number of sources |
| Name and alias mentions without markup | Appeared as 2 unlinked mentions; did not become confirmed relationships |
| `tag:#ux` with tags/attachments enabled | Filtered matching notes and retained related tags/attachment, including another tag; record type expansion after filtering |
| Local graph depth 1 -> 2 | Changed from 4 to 7 fixture nodes; depth selection changes traversal, not content |
| Rename target and choose one-time update | Updated 3 links in 2 files; alias label remained; files and 3 backlinks checked after the action |
| Canvas with a connected note and free card | Composition showed the authored connection; the Canvas file's local graph remained one node without turning cards into Markdown relationships |

Names/defaults correspond to the audited build. Actual graphics backend, active WASM path, screen reader, touch, large corpus, and failure recovery were not validated in this pass. Use the observations above with their recorded scope; the [resource map](sources.md) connects current Forma contracts.

**Final acceptance question:** why are these entities linked, in which direction, which passage or data supports the relationship, what changes when one is renamed, and how can all of this be accessed outside the canvas? If the answer depends only on color, forces, or screenshots, the work is still incomplete.
