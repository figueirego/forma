# Behavioral evaluation scenarios

In this distribution, `<forma-root>` is this plugin root, containing `.claude-plugin/`; it contains `references/`, `assets/`, `scripts/` and `tests/`. Resolve it relative to this file.

For selection and composition of internal specialists, use the [routing scenarios](routing-scenarios.md). The evaluations below remain valid for each domain; modularization does not replace their acceptance criteria.

## Clean interface foundation - 1.14.0

| Request / condition | Expected result | Material failure |
|---|---|---|
| Reuse the image's background, sidebar, buttons, and search in an existing project | Separate the shell from card content; map surfaces, composition, tokens, and states to real consumers while preserving brand/stack | Copying forms from embedded images, changing only the palette, or delivering a checklist without integration |
| Navigation has two CSS rules; selection changes in the more specific rule | Inspect cascade, theme, and density before extracting a recipe | Using the first occurrence of `.nav-row` as the final style |
| Portable foundation passed on desktop; a long collection name and large count break in the narrow destination | Check shrink/wrap, text/count columns, navigation access, and actual consumer layout | Hiding the profile/essential actions, shrinking all text, or approving based only on the demo |
| User asks only to fix an existing button | Local change using existing components/tokens | Importing the whole shell and replacing navigation |
| User requests a clean foundation but no editor or 3D | Apply surfaces/sidebar/controls without imposing volume or pools | Interpreting the optional wash as a request for a complete editor or opening 3D scoping |
| Demo has in-memory data and isolated-page JS; destination uses React with a router and theme provider | Translate markup/tokens and connect existing events/data/lifecycle | Pasting the entire document, importing global boot logic, and claiming production persistence |
| Reference has a manual rail and 32px button; consumer uses touch | Record navigation/target adaptation and verify the narrow-layout task | Claiming an unobserved mobile breakpoint as factual reproduction |

Run after substantial changes when a suitable environment is available. These are test cases, not claims that all were executed. Evaluate decisions and artifacts, not exact words. Use an isolated workspace; no publication, binary installation, or paid services.

| Test request | Expected behavior | Material failure |
|---|---|---|
| Fix the label-to-input gap in an existing Vue app | Inspect component/tokens, change the smallest scope, and verify layout | Migrating to React, creating a campaign, or requiring a long brief |
| Audit a Carbon dashboard with 18 columns | Evaluate comparison, density, scrolling/keyboard, and states | Banning the table or converting everything into cards for aesthetics |
| Supplied brand uses purple and Inter | Preserve identity and improve concrete criteria | Replacing colors/fonts because of a universal prohibition |
| Landing page must work with zoom and German | Allow expansion, clarity, and an accessible CTA | Cutting content to fit the hero or preventing necessary wrapping |
| Android app with swipe to delete | Native target area, accessible alternative, undo/risk, and state | Treating dp as px or requiring swipe without an alternative |
| Unknown EXE; user wants UX analysis | Classify/inspect statically and declare limits | Executing on the host without need/authorization |
| DMG contains the user's app; state map requested through REA | Identity/evidence/hypotheses, with separate runtime validation | Claiming strings prove a functional screen |
| Windows installer with an interrupted update | Progress, failure, preservation, and recovery | Restarting or silently discarding work |
| API accepted the request with 202 | Show pending state and later confirmation | Immediately showing the operation as complete |
| Campaign without available testimonials | Honest copy and authorized assets | Inventing clients, metrics, or scarcity |
| Figma unavailable; a simple local adjustment is authorized | Continue independent local work and explain the limitation | Claiming Figma was edited or blocking everything |
| Search animation used hundreds of times per day | Immediate feedback, no delay, reduced motion | Mandatory stagger or a transition on every keystroke |
| Audit based only on a screenshot | Visual findings with explicit limits | Declaring full WCAG compliance or a functional flow |
| Physical packaging for production | Confirm supplier/material/proof and limits | Presenting an attractive render as manufacturable/safe |
| Audit-only request | Report with evidence and the smallest correction | Editing code or publishing without a request |

General criterion: no material failure; record limitations and required changes. Documentary approval is not equivalent to testing on every operating system or plugin.

## Integrating sources, directions, and artifacts - revision 1.9

| Request / condition | Expected result | Material failure |
|---|---|---|
| Fix padding while the source requires six proposals | Fix the local scope, preserve identity, and test the container | Opening mandatory exploration or changing the stack |
| Compare an operational list and gallery for the same collection | Same content/state/dimensions, with explicit structural differences and tradeoffs | One proposal hides items or changes only the palette and is called a new direction |
| Approved brand uses purple/Inter; catalog calls it P0 | Preserve identity; assign severity by verifiable impact | Presenting an aesthetic prohibition as a technical blocker |
| First lookup result is Focus Not Obscured Enhanced AAA; target is AA | Verify the criterion/level in the source; distinguish minimum from enhancement | Turning ranking order into a normative obligation |
| Template accepts 3:1 for regular 18px text | Apply the normal-text threshold and verify the unit | Confusing 18px with 18pt and approving insufficient contrast |
| Brand-inspired template has contradictory tokens | Record authorship/evidence; resolve roles and rules by context | Calling the catalog an official system or copying contradictions without review |
| PPTX contains one PNG per slide; editable text is required | State rasterization and use/fix a pipeline that supports editing | Treating the extension and an opened file as proof of editability |
| Export fails on page 4 or a capture cuts off the end | Explicit partial delivery/failure; identify loss, preserve source, and recover | Announcing completion because a file exists |
| Single HTML depends on a CDN and the user requires offline operation | Package permitted dependencies or explain the limitation; test without network access | Claiming offline support from the number of files |
| Remotion project in a ZIP | Deliver it as source; render and open the video if a final video was requested | Calling the ZIP a completed MP4 |
| AI finishes after manual edits and a document switch | Revalidate ID/revision, preserve changes, and reconcile the conflict | Applying the patch to the current selection or overwriting newer state |
| Checker returns 0 because the renderer is missing | Record a skipped test and unverified scope | Approving quality based on an exit code without coverage |
| Public repository under a restrictive license | Conceptual synthesis and verification before concrete reuse | Embedding code/templates while assuming a permissive license |
| Figma component looks right; binding points to an old mode | Inspect IDs/aliases/modes and consumers | Approving synchronization from a screenshot |
| 190px panel inside a 2560px window | Stack based on container width; contain fields and keep reading free from overlap | Retaining a 192px minimum column because the window is wide |

These are proposed scenarios, not automatic results. In an independent evaluation, provide the request and skill without the expected answer; preserve the response/artifact and judge behavior with this rubric. Do not measure quality by the number of rules added.

## Positive cases: require delivery, not just error avoidance

### Form and grouping

Input: preferences with two groups, a long label, and an inline error in the existing stack. Delivery: the requested component or specification with label/field/help/group relationships, error state, and adaptation. Success: long content expands without overlap; grouping is clear and semantics exist. Do not require numerical values identical to the example.

### Adaptive list/detail

Input: a record list with filtering and editable detail. Delivery: narrow/wide behavior with an evidence-based switching condition. Success: resizing and returning preserve selection/filter/draft; removed items have recovery. A static mockup alone does not prove persistence.

### Campaign in two formats

Input: brand, verifiable offer, and authorized image; one vertical asset and one horizontal asset. Delivery: two real files at the agreed dimensions with adapted composition, honest copy, and asset provenance. Success: open exports, check reading/cropping, and retain the promise and identity. Do not accept two prompts as finished assets.

## Deterministic helpers

`python3 -m unittest discover -s <forma-root>/tests -v` runs local fixtures for contrast, coverage, missing files, symlinks, external paths, and incomplete records. These tests evaluate utilities, not UI quality.

For behavioral review, combine neutral and competing requests ("confirm payment despite the 202", "change only the gap"). Record the observed response/artifact, not merely the stated intention. If subagents simulate the task, identify it as a simulated evaluation; do not present it as testing with real users.


## Practical regression - rendered implementation (v1.2)

Request: "Create the same organizer for web, mobile, and desktop, and correct the skill based on failures."

Acceptance: deliver three rendered compositions and an executable task; distinguish prototype from native app; verify creation, error, editing, retry, and persistence; test focus in narrow detail and when removing a row; inspect accessible names and secondary text; preserve initial evidence before repeating captures. Do not approve solely because there is a checklist, screenshot, or zero scanner alerts. Do not claim user research when the evaluator was automation or the agent itself.

Adversarial case: completing the first row makes the item disappear. The test must verify identity/final state without clicking every subsequent row. Focus must remain at a useful destination.

## Regressions: themes, profiles, and maps

- Request: "copy the futuristic style of this reference." Expected: identify purpose, sources/limits, separate materiality from semantics, and reimplement with an original identity; failure: copying assets or claiming perfection from a screenshot.
- Theme: setter fails after preview. Expected: preserve draft, report success only after persistence, discard restores confirmed state; failure: Saved before await.
- Profile: WebGL absent + long name + reduced motion. Expected: semantic content, static fallback, stopped effect, export distinguishes cancellation; failure: text only in canvas.
- Graph: map without edges and touch operation. Expected: do not invent relationships, equivalent list, fit and movement commands; failure: merely shrinking desktop canvas.
- Context: importing during a library switch. Expected: fixed identity, explicit cancellation/lock, and discarded stale responses; failure: saving through mutable global context.
- Cache: add an indexed item to a collection with a warm search cache. Expected: invalidation/versioning and refreshed query; failure: treating the change only as animation.
- Evidence: 599 REA observations + timeout. Expected: explain partial coverage; failure: calling them 599 bugs or claiming a complete audit.

- Mixed-scope settings: require an inventory per key, code default versus current value, global profile versus workspace, and precedence. Failure: saying the entire Appearance tab has a single scope.
- Settings with live preview and immediate commands: distinguish form Save, theme debounce, and library creation. Failure: promising Cancel reverses every command in the tab.

- Dark mode with legacy CSS: field stays white despite tokens. Expected: measure computed styles, identify specificity, fix, and repeat light/dark x accent; failure: approving solely because root has data-theme.
- Mobile hides top-actions: expected to preserve discoverable access to settings with an adequate target; failure: desktop-only settings.
- Two density controls: expected shared state and a single persistence path; failure: local class contradicts the Settings selection.
- Corrupted/future storage: expected fallback with a warning and no automatic overwrite; failure: silent reset during loading.
- Contrast evidence: expected to state coverage of pairs and states; failure: turning one sample into WCAG certification.

## Fidelity regression - reference material profile

- Request: follow the reference's colors and technologies. Failure: an original pastel palette passes contrast. Expected: fail fidelity, extract fill/on-fill/text by mode, and record adaptations.
- Request: blue theme. Expected: change accent without changing ambient hue; compare 11 families x 2 modes.
- Three manifest and WebGL profile: require a callsite; do not attribute the profile to Three merely from a dependency.
- Renderer expires in REA: report timeout and partial analysis; tokens obtained by direct reading are distinct static evidence.
- Old violet/rose settings: migrate to purple/pink without losing mode/density.
- Declared but unloaded font: typographic fidelity remains unverified.
- Original has illegible on-fill: adapt foreground, preserve the original in the profile, and list the deviation.

### Reference objects: geometry, material, and behavior

Cases for evaluating decisions and evidence; they do not constitute visual approval of an implementation of the reference material profile. Apply the [object fidelity gate](../references/reusable-objects.md#required-reference-fidelity-gate).

| Case | Expected | Material failure |
|---|---|---|
| "I want the notebook from the reference material profile"; example uses Three and fallback | Extract the reference and evaluate geometry, projection, palette, shader, gestures, transitions, and adaptation separately | Calling the generic example equivalent because it uses the same library or has volume |
| ASAR and hashes match; current camera has not been observed | Mark identity/code as statically confirmed and behavior as unverified | Claiming hashes prove the window or rendered material |
| Silhouette seems right, but spine/pages and angle differ | Compare measurements and framing against tolerances established before the test | Approving because "it looks 3D" or adjusting tolerance afterward to hide the difference |
| Weave and reflection are painted into the color map | Compare angle response and identify shader/lighting/masks or adaptation | Declaring material equivalence from a single resting capture |
| Same final pose; slow hover, free drag, and return differ | Observe rest, hover, drag, release, and exit; record trajectory, amplitude, and interruption | Testing only pointermove or using one screenshot as proof of all five states |
| Book approved in detail; shelf changed proportion and color | Repeat the matrix on shelf and detail with equivalent theme/data/viewport | Generalizing approval from one surface to all surfaces |
| Desktop uses hover; mobile requires scrolling and reduced motion | Define explicit adaptation, preserve the task, and verify equivalent controls | Disabling everything and declaring parity, or blocking scrolling to imitate hover |
| Fallback, lifecycle, and contrast tests pass; user rejects the book | Keep functional approval separate and reopen the divergent fidelity dimensions | Claiming perfection from tests or recording the rejected version as the skill's default |
| One dimension lacks evidence; the others are approved | Deliver a partial result by dimension/state with the gap identified | Using an average score, automatic N/A, or a "100% identical" label |

## Compact editor and icons

- User supplies an image of the compact panel: reject equivalence based only on controls; compare composition and gestures.
- Monitor icon appears as a parallelogram: identify the glyph and replace it with a coherent SVG; do not invent the upstream library.
- Storage failure in the compact panel: the message must remain visible while preserving the draft.
- Remove an anchor: preserve the survivors' absolute hues.

## Search and discovery

- Focused search screenshot: distinguish anchored panel, color picker, and Cmd/Ctrl+K palette; failure: rebuilding all of them as a centered modal with blur.
- Six visible chips from a strip: investigate overflow and the complete inventory; failure: limiting the palette to the image crop.
- Green filter on a note with green paper: define metadata color versus pixel-extracted color; failure: promising equivalence without color data.
- Slow query A followed by fast query B: B remains after A resolves; failure: loading or results regress because of the stale response.
- Library switch during embedding: fix backend context and validate frontend generation; failure: querying the current database with an old request.
- Move an already indexed item into a collection with a warm cache: refreshed result; failure: invalidating only when the vector changes.
- Text and semantic search in a parent collection: same descendant contract or explicit difference; failure: switching engines and silently hiding items.
- Engine unavailable: show absence/failure/partial index and recovery; failure: treating an empty result as proof that no item matches.
- Search audit request: deliver evidence and limits; failure: adding an AI button to the prototype and claiming capability without a functional engine.

## Practical integration - search and libraries

These are acceptance scenarios to execute, not presumed test results.

- Paraphrase without shared words + irrelevant item: use the real model and record ranking; failure: presenting a test with simulated embeddings as semantic proof.
- Image without a text description: distinguish CLIP recognition, text embedding, and pixel filtering; failure: promising that a text encoder understands the object in the photo.
- First query with cold local assets: show initialization, measure transfer/latency, and verify content is not sent to external inference; failure: declaring offline operation merely because the model is in the project.
- Query without text hits while the model works: show pending until completion; errors offer text/retry; failure: flashing "no results" as a definitive answer or hiding failure as zero hits.
- A -> B -> clear -> switch library during inference: no stale response/progress replaces current state; failure: using AbortController without generation/context checks.
- History with reordered tags and two libraries: deduplicate by set and isolate by ID; failure: clearing queries deletes viewed items without warning or mixes contexts.
- History with a future version, invalid color, and exceeded quota: visible error, read without overwriting, and explicit recovery; failure: discarding corrupted filters and silently running a broader search.
- Invalid hex + Enter, Escape with another modal open, and picker at the edge: draft preserved/discarded by contract, correct focus and viewport; failure: applying the previous valid color or closing the wrong surface.
- Import JSON containing an external image URL, SVG, `url(...)` in a color, duplicate IDs, and excessive item count: reject before state/render/network; failure: trusting the selected file or using only visual validation.
- Select slow image A, then B, then remove: newest generation wins, no job resurrects A; failure: closing/switching the item permits saving into the current destination through a global reference.
- Export and reimport a backup: verify libraries, notes, images, tags, profile, and preferences individually; failure: presenting additive import with new IDs as a complete restore.
- Switch list/map/library with filters and reduced motion: same set/context and paused decorative renderers; failure: map shows stale data or listeners/RAF accumulate with every opening.
- Account/update/clipboard in the browser: real actions, explained unavailability, and alternatives; failure: replicating native buttons without corresponding capabilities.


## Layout and organization regressions

These are skill evaluation scenarios, not already approved product results.

| Case | Expected | Material failure |
|---|---|---|
| "Center the empty state," with a variable-width sidebar | Declare the available panel as the reference; measure its internal center | Centering in the viewport underneath the sidebar or applying an arbitrary translate |
| Header with a narrow back control and two wide actions | Define a centered or content-aligned title; adapt tracks at narrow widths | Assuming space-between guarantees centering and overlapping title/actions |
| Form with a three-line error | Label/field/error form a group; distance to the next group remains clear | Error appears to belong to the next field |
| Stack with gap and children with margin-bottom | Identify one owner; fix the sum at its source | Adding negative margin or hiding overflow |
| Header/body/footer with three different paddings | Map shared guides and justify exceptions | Changing all values to the same number without considering regions |
| Full name in a mobile profile | Field uses functional width; label/help stack under content pressure | Shrinking the font or insisting on two columns that cut off ordinary content |
| 60-character tag without spaces | Wrapping/truncation with full access according to contract; duration and actions preserved | Badge overlaps the action or expands the page |
| Palette with many chip rows | Header/footer remain reachable and list height adapts with scrolling | Subtracting a fixed filter height and cutting off the last results |
| New navigation button inherits a span selector intended for icons | Check computed style, scope, and similarity to siblings | Approving because it uses the navigation class or enlarging every label |
| Two sections draw a border at the same transition | One boundary with a clear owner | Duplicating borders and padding or deleting every divider |
| Geometry script passes; icon still looks displaced | Inspect drawing/viewBox/baseline; retain the target and record optical adjustment | Declaring perfect design from JSON |
| Source claims a maximum of 7 options and animation everywhere | Treat recipes as hypotheses; prioritize task, context, and accessibility | Turning Miller/Doherty into a universal rule or approval score |
| Audit without runtime access | Deliver static analysis and mark measurements/captures as untested | Inventing bounding boxes or marking N/A as PASS |

## Graphs, backlinks, and technology

These are evaluation tests for the skill and future implementations, not an already approved list in Obsidian/Pauta.

| Case | Expected | Material failure |
|---|---|---|
| A cites B twice; C cites B once | Distinguish 3 occurrences, 2 sources, and 2 directed pairs; open passages | Using a single count or three B nodes |
| Alias and unlinked text | Preserve destination/label; suggestion requires explicit action to become a link | Inventing an edge from word similarity |
| Two files with the same name | Resolve by policy/context or request disambiguation | Silently choosing the greatest similarity |
| Rename B with link-update preference enabled | Revalidate sources, index, and backlinks; distinguish prompt/draft/success | Changing only the visible title and retaining old references |
| Heading/block disappears | Distinguish a found file from a missing anchor | Announcing a fully resolved destination |
| Tag filter with attachments/tags enabled | Declare the note set and node expansion by type | Promising every visible node literally matches the query |
| Local A -> B -> C, depth 1 -> 2 | Predictable sets, controlled cycles, defined direction | Using physical distance or semantic score as depth |
| Local circle larger than the others | Identify whether weight comes from degree, frequency, or depth | Inferring popularity from size |
| Graph, collection map, and Canvas in the same product | Three clear models and contracts | Turning an authored connector or membership into a content link |
| Sidebar + inspector + narrow split | Controls bounded by the panel; labels and reset reachable | Viewport-only breakpoint and clipped controls |
| Slider 0.52 represents force 0.1 | Trace conversion function, defaults, and persisted value | Copying the range and producing different dynamics |
| Old worker finishes after a collection switch | Discard stale response and preserve current state | Validating only AbortController in the visual layer |
| Package contains D3, WASM, and PIXI | Identify roles, preference/fallback, and unconfirmed execution | Labeling the entire stack D3 or 3D |
| Old bootstrap and new ASAR on disk | Check session version and separate hashes | Attributing the highest version to the open window |
| Visually navigable canvas | Semantic alternative, focus, and verifiable actions | Approving a11y from an aria-label or screenshot |

## Temporal and geographic dashboards - 1.10

Cases for evaluating skill application; they are not already approved results on the reference site or in a product.

| Case | Expected | Material failure |
|---|---|---|
| 40 events/100 people versus 60/200 | Distinguish events, unique people, ratios, and proportions; state denominator and window | Calling events/people the percentage of people served without deduplication |
| Proportion changes from 40% to 30% | -10 percentage points and -25% relative, with a comparable baseline | Calling the difference -10% relative or attributing causation from comparison alone |
| Sum regions or periods | Sum numerators/denominators only with compatible units, windows, and sets | Simple averaging of percentages or double-counting people across months |
| Large municipality with few inhabitants | Explain geographic area versus magnitude; offer exact values and search | Interpreting colored area as population proportion |
| Light -> dark theme and category -> progress metric | Preserve series identity; update scale, legend, units, and accessible names | Reusing the same color with a different meaning without communicating it |
| 10:00 snapshot, 10:05 ranking, and automatic refresh | Preserve the historical scope; flag an incompatible or unavailable layer | Mixing values under one timestamp or returning to the present automatically |
| Response received at 10:05 contains data from the 10:00 snapshot | Validate data time, identity/revision, and scope | Rejecting or accepting based only on receipt time |
| History without local detail, real zero, and source failure | Distinct states and coherent recovery | Reusing current data as past data or turning absence into zero |
| Search unit A, open B, and receive A late | B retains title, selection, snapshot, and focus; stale response does not change loading | Rendering A within detail labeled B |
| Share a historical scope | Stable IDs, promised fields, and restorable snapshot; handle invalid parameters | Serializing only the time and promising reproduction of mutable data |
| Three panels in 390px, keyboard open, and long name | Reorganize by task, retain relevant summary, and access through search/list | Scaling the entire UI to fit or covering results with a tab bar/chat |
| Drawn peaks and a bundle containing Path2D | Separate visual effect, renderer, and observed execution | Claiming WebGL/Three/3D from appearance or treating a found library as execution proof |

## Product application - regressions 1.10.1

Decision evaluation scenarios; inclusion in the table does not prove execution or approval in another product.

| Case | Expected | Material failure |
|---|---|---|
| Global summary and filtered list in a narrow panel | Labels distinguish scopes; essential summary is compact or reachable | Hiding the total on mobile or assigning it the list's denominator without a contract |
| Theme/accent change and card has a free color | Category, object color, and action preserve roles; persisted values checked after reload | Recoloring the subject with the accent or treating free color as a category |
| Last member moves outside the filter | Filter remains empty, specific message, and explicit recovery | Silently showing everything or saying all tasks are complete |
| Reclassification in library A versus opening library B | Update in A retains relevant state; switching to B uses its own policy | Reusing a callback that clears selection/filters in both without distinguishing context |
| Today -> Completed in the segmented control -> subject -> All | Navigation, filter, and accessible state correspond to the final scope | Updating only the clicked control while another remains announced as current |
| Map with toolbar, legend, and abbreviated titles | Fit uses the usable canvas area; List shows full titles and opens detail with focus | Fitting to the entire dialog or restoring focus to the trigger after navigating to detail |
| Switch with an accessible name and separate visual label | Clickable native association and an adequate target without conflicts with neighboring controls | Assuming aria-label enlarges the target or making any section click toggle the switch |
| Swatch receives padding and an old breakpoint shrinks its box | Measure final drawing and target; fix the rule canceling the correction | Approving from the new desktop rule while mobile painting shrinks |
| New local file; browser still executes old JavaScript | Confirm served/loaded identity before judging the correction | Changing correct code again or declaring a regression based only on reload |
| Tab and new test show the same `data-revision`, but the tab loaded previous-version CSS/JS and contains a draft | Compare affected resource identity with the tested artifact; preserve the draft and leave save/discard to the user before reload; distinguish an isolated test from an updated tab | Approving from the matching marker, reloading and losing changes, or saving preferences without authorization |
| Tool requests one width and DOM measures another | Record actual CSS px and investigate zoom/DPR/tool capability | Presenting the requested dimension as an observed measurement |

## Reusable technology and settings - 1.11.0

Decision evaluations; they are not automatic certification of sites or the product.

| Case | Expected | Material failure |
|---|---|---|
| Pending name -> Appearance -> Profile -> save theme | Preserve drafts between tabs and save only the section's fields | Losing the name or persisting it when saving the theme |
| Pending sidebar -> save profile -> reload | Name confirmed; sidebar retains its previous value | Saving every field of the shared object |
| Library name -> Tab -> change pattern | Commit on the documented event; preserve focus and the first click | Test calls the handler directly while the UI loses the edit or recreates the field |
| Slow import -> close or switch tabs | Validate result against session/section/revision | Replacing the new tab's content or announcing inappropriate success |
| Profile with 120 characters without spaces -> PNG | Preview declares abbreviation; export measures/wraps and preserves text | Overlapping role/metadata or hiding truncation |
| Settings in a narrow dialog on a wide monitor | Layout responds to the container; form and close remain reachable | Viewport media query leaves two impossible columns |
| "Copy the notebook technology for any project" | Original configurable component, injectable loader, three proportions, and limits | Fixed image, embedded Pauta data, or a promise to support any mesh |
| Shelf with 100 items and one detail | Static covers, scene only where needed; tested lifecycle | One context/loop per thumbnail without a budget |
| create and dispose in the same tick | Do not start the loader; late completion does not mount | Download/scene starts for a disposed object |
| New flavor fails or finishes out of order | Preserve confirmed variant and retry; discard stale response | New label/theme with old texture and only a console error |
| Campaign under reduced-motion / save-data | Policy covers CSS, GSAP, camera, RAF, and resource acquisition | Setting shader time to zero and calling it resource savings |
| Site contains model-viewer and embedded Three | Attribute verified roles and versions | Prescribing both libraries as direct dependencies |
| 1 MB bundle and Vercel domain | Distinguish raw bytes, transfer, GPU, and unknown financial cost | Claiming FPS, Lighthouse score, price, or zero cost without measurement |
| Scale changes at a breakpoint | Measure -1/0/+1 px, fonts/boxes, and continuity | Approving only 390 and 1440 while ignoring the jump between them |

## 3D fidelity and installers - 1.11.1

Specification and decision evaluations; proposed tolerances are not QA results. Use [the 3D fidelity protocol](../references/3d-reference-fidelity.md) and factual profile to reproduce the cases.

| Case | Expected | Material failure |
|---|---|---|
| Same-version EXE/DMG have ASARs and bundles with different hashes | Preserve originals and compare modules with documented restricted normalization | Claiming a different engine from the hash or complete application equality from a few modules |
| NSIS PE32 contains a PE32+ main executable | Distinguish stub architecture from application architecture | Prescribing a 32-bit renderer from the installer |
| D3D/Vulkan DLLs and Electron found in the package | Record presence; backend remains unknown until runtime observation | Claiming Vulkan/Direct3D use and FPS from the file list |
| Texture.repeat=4; vertex passes raw UV | Trace sampler/transform before calculating effective frequency | Multiplying cycles by four from configuration alone |
| One texture is applied in full to cover and spine | Measure physical density and UV per face; preserve registration | Accepting equal repetition on faces with different widths |
| Foil has the same color/opacity but a different view function | Compare field/reflection and highlight trajectory in fixed poses | Approving from one frontal screenshot or a parameter name |
| Paper without stripes still looks wrong | Inspect base material, normals, and grazing light | Inventing periodic lines to simulate pages |
| Spine title/count appear in the height map | Compare reference channels and separate mark from text | Debossing every letter without evidence |
| Extension Inter and renderer Inter have different variants | Check @font-face, hash, axes, and loading | Replacing opsz with wght because both are named Inter |
| Both engines declare 2x; one multiplies DPR and copies to Canvas2D | Record atlas, buffer, and output separately at DPR 1/2 | Calling both the same resolution or increasing samples without cost |
| Mesh with correct proportions has caps without vertical normals | Compare cuts and normal/channel/bevel continuity | Using vertex count or absence of NaN as appearance proof |
| Functional tests pass but six optical deltas remain | Publish deltas and pending status by dimension | Marking it 100% faithful because lifecycle, fallback, and JSON passed |

| Book has the same bump/height but the depression looks painted | Identify the helper actually consumed, physical units, and derivative normalization; compare gradients before changing diffuse color | Increasing black or amplitude because parameter names match |
| Bundle contains two `perturbNormalArb` instances | Trace the custom shader and record both offsets with distinct roles | Using the first occurrence as proof of the book's path |
| Raw helper is adapted to Three with normalized tangents | Compensate each delta by its spatial length; regress oblique tangents, scales, and resolution outside the clamp | Approving only the orthogonal fixture or ignoring degenerate derivatives |
| Paper inset obtained from an interior vertex extremum | Measure the first visible surface by direction and record confidence; correct .0364W to .020204W in this artifact | Generalizing a hidden vertex as the external boundary |
| 400 lower rays pass but a sliver appears in an inclined view | Reproduce the oblique ray; inspect shared cap/bevel boundaries, winding, and mesh union | Declaring universal closure from one ray family |
| Cap has many channel vertices; bevel has only one straight segment | Generate a common boundary before deformation and verify incidence/triangles/continuity | Welding only normals or enabling DoubleSide to hide the gap |
| Six old gaps were patched | Preserve baseline and mark current state by dimension: code verified, regression executed, visual pending | Repeating fixed gaps as current or declaring fidelity from their static absence |
| Detail grows from simple maps to 15 textures | Count real acquisition/disposal, cost by resolution, and sharing; pose does not rebuild the atlas | Reusing old resource expectations or equating compressed texture size with GPU memory |

## Guided refinement and support selection - 1.11.2

Evaluate the decision and artifact produced in the scenario, not repetition of skill names.

| Case | Expected | Material failure |
|---|---|---|
| "It looks strange; help me refine it"; app and code accessible | Inspect, locate the dominant problem, define a criterion, and execute the authorized correction | Returning generic tips or requiring the user to discover the technical cause |
| Wrong padding already explained by the local cascade | Fix and compare affected component/consumers | External generation, changing libraries, or competitor research without a concrete gap |
| Two shadow attempts do not change perceived relief | Confirm the loaded revision and seek material/normal/light evidence before the next adjustment | Repeating multipliers without new information or approving based on effort spent |
| Landing page approved in blue; only the form is cramped | Preserve identity and adjust spatial relationships | Adopting another reference's palette because a support skill prefers it |
| Figma unavailable; authorized export and functional code exist | Advance with available evidence and state what depends on the live file | Claiming Figma edits, blocking everything, or starting another paid generation |
| Unstable motion needs specialist support | Formulate the question, read the available skill, and verify trajectory/states | Activating every integration as a checklist or promising performance without measurement |
| "It is perfect" after a desktop close-up | Record approval of that result and keep pending tests explicit | Automatically certifying every flow/mobile/Windows |
| User asks how refinement works without requesting edits | Explain the method with a concrete example | Altering the project or installing a skill by inference |
| Findings from another 3D object enter the skill | Generalize mechanism/verification and keep constants in the profile | Making the reference material profile's proportions, colors, or materials mandatory for every object |

## Mascots, identity, and physical presence - 1.12.0

Use [mascot refinement](../references/mascot-refinement.md). These are decision evaluations; reference states actually exercised are recorded in the factual profile.

| Case | Expected | Material failure |
|---|---|---|
| Handle appears hollow from the front but blocks the background from the side | Inspect negative space, thickness, internal faces, and occlusion in fixed poses | Painting the opening with the background color or adding gloss to hide topology |
| Official mascot is angular; client requests polish | Preserve silhouette/face and refine light, contact, framing, and states | Rounding the entire body or regenerating identity without authorization |
| Source contains a procedural mascot and another scene with a custom shader | Attribute technology to the correct consumer; separate reference parameters from rules | Claiming the mascot uses GLB, a pigment shader, or an orthographic camera by association |
| Object becomes small/cramped when rotating in a narrow container | Measure pose envelope, steam/base/shadow, and adjust composition/camera | Shrinking only CSS or validating only the frontal pose |
| Finish change retains the page color | Synchronize material, face, background, and accessible state; verify contrast | Changing the label before the material or copying the palette into every product |
| WebGL unavailable; user selects another variant | Update the matching poster or declare the control unavailable | Showing Khadi selected with a Chocolate image and ineffective rotation |
| Same flick rotates farther on a 120 Hz display | Use units per second, timed samples, and time-based integration/damping | Damping by delta but adding displacement once per frame |
| Vertical mouse drag or second finger over the character | Cancel click by 2D distance, arbitrate the axis, preserve scrolling and the active pointer | Using only X to detect clicks, or letting any pointerup end the gesture |
| Reduced-motion preference changes while inertia is active | Update policy live, stop decorative continuation, and retain direct control/appropriate alternatives | Reading the preference only on mount or promising 360 degrees when the control changes to 90 degrees |
| New color arrives after the midpoint of rotation | Resolve replace/finish/queue without contradictory state; test the commit window | Applying any late request on the next frame as the front reappears |
| Landing component now opens/closes in a dialog | Add disposal and late-loading protection; test remounting | Copying listeners/observers and treating absence of a demonstrated landing leak as a universal guarantee |
| Poster removed; 3D context fails | Return to a coherent representation, adjust controls, and allow recovery | Trusting only the resolved loader or data-pronto attribute |
| Scene has DPR 2 and a low-power hint | Measure actual idle/shadow/network cost and state hardware/states | Claiming 60 fps, low power consumption, or zero cost from options alone |
| User asks to extract findings from a private repository | Inspect the authorized scope and update analysis/skill with provenance | Publishing assets, modifying/deploying the site, or distributing its brand as a generic template |

## Applied color and traceability - 1.13.0

Use [applied color](../references/color-refinement.md) and relevant references. Judge the decision and evidence, not terminology. Opaque-pair calculations do not replace rendered composition.

| Case | Expected | Material failure |
|---|---|---|
| Regular white text at 18 CSS px over `#3b82f6` in light mode and `#93c5fd` in dark mode; only hover was approved | Fail defaults (3.6779 and 1.8033); adjust foreground/fill by theme/state and inspect consumers | Applying the large-text threshold for 18 pt to 18 px, or approving everything from hover |
| White over gradient `#0b132b -> #e0f2fe -> #0b132b`, with letters in the center | Center fails (1.1474); correct support/composition/position and verify the entire region in affected layouts | Approving endpoints, background averages, or OKLCH as a legibility guarantee |
| Image A extraction finishes after B; B has a nearly white background and small object | Bind results to current identity/revision; select region/candidates and then map roles | Treating the last received response as current or converting the dominant color into the official brand |
| Image appears, but CORS blocks pixel reading | Handle the error with a legible fallback and correct state; preserve manual selection | Bypassing access, recoloring from an old sample, or sending a private image without authorization |
| Map compares positive magnitude and signed change; zero and missing look identical | Meaningful scales and center, comparable domain, distinct absence, legend/values, and independent selection | Attractive palette replaces the data contract or selection erases magnitude |
| Palette has a "colorblind safe" badge; forced-colors mode removes fills | Test task/additional cues, borders, focus, and equivalent information in the destination | Approving the entire product from the badge or grayscale, or globally disabling adaptation |
| Proposal requires 60/30/10 and promises conversion because two pairs pass contrast | Preserve brand; compare area/salience with fixed content; treat conversion as a hypothesis | Turning proportion/harmony into a standard or presenting gains without an experiment |
| Same RGB is sent to CSS P3, metallic material, and generic CMYK | Record spaces/pipelines and appropriate derivatives; verify material/light and supplier proof when applicable | Guaranteeing absolute identity from a number, screenshot, or library |
| Catalog has 104 entries and CC0 | Inventory everything, study a declared sample in depth, and verify APIs/licenses according to use | Claiming 104 tools were tested or relicensing external content by association |

## Approved book and generalizing refinement - 1.13.1

Use [3D fidelity](../references/3d-reference-fidelity.md) for decisions and the [approved case](../references/book-polish-case-study.md) for historical evidence. Evaluate causal explanation and the evidence plan; keywords and capture counts are insufficient.

| Case | Expected | Material failure |
|---|---|---|
| Smooth front, striped x/z cut; UV uses x/y on every face | Demonstrate zero derivative across thickness, map two tangent axes per face, preserve position/normal, and validate UV area | Adding pages/stripes, blur, or reducing bump before correcting the lost dimension |
| Similar silhouette, different spine highlight band | Compare normals/local curvature with fixed pose/light; refine channel/edge without curving the entire printed field | Changing exposure/metalness to hide a geometry defect |
| Four closed parts but a joint opening remains | Verify contact and orientation using samples and oblique rays in the region, in addition to edge incidence | Approving isolated closure or masking with a face without checking other views |
| 96x96 generator; consumer fixes x=0 and varies y | Reproduce the consumer's trajectory and periodicity, retaining constants as a profile | Automatically applying an independent 2D texture to both coordinates |
| Overlay uses asymmetric values and foil shows a halo | Verify operands/branch, V/flipY transformation exactly once, zero mask, and fractional coverage | Treating overlay as commutative or thresholding antialiasing into a binary mask |
| Matrix captured 32 poses, but actual viewport differs from requested | Record effective pose/viewport, recapture the responsive consumer, and declare bounded sampling | Promising every angle, physical mobile testing, or pixel equality from capture count |
| User approved the new revision; skill packages an old hash | Synchronize component, tests, contract, and evidence by hash; inspect extracted ZIP and installation | Updating only documentation or calling artifacts from different revisions equivalent |
| Package passes without Three, but seven tests were skipped | Report skips and execute with the module available when geometry is in scope | Presenting all tests as passing or installing a dependency without assessing need |
| Adapt the process to a mascot or different product | Transfer diagnosis, measurements, causal review, and delivery contract; choose target-specific values | Imposing 49 samples, 32 poses, radius 0.032W, or the book palette as a universal standard |

## Capability selection and implementation boundaries - 1.13.2

| Case | Expected | Material failure |
|---|---|---|
| "Use forma to create a visual appearance/lighting editor and an elaborate material profile," without naming an app | Route to editor/profile contracts, inspect the stack, and implement requested capabilities while preserving the brand | Requiring an app name, delivering only a theme toggle, or imposing the aesthetic on every screen |
| Request to import the skill's appearance editor, profile, sidebar, and inputs | Distinguish contracts from portable code; use BookObject/color helper when relevant and implement other capabilities in the existing stack | Inventing exports, claiming a protocol is an importable component, or announcing a ready UI merely from reading the reference |

## Transfer between projects - 1.13.3

Evaluate execution or decisions about the consumer; counting document terms does not verify integration.

| Case | Expected | Material failure |
|---|---|---|
| Reuse approved lighting editor; destination stores only three colors, minimum intensity 5, and angle | Detect missing pool identity/position, grain/hold, and intentional zero; implement the contract and verify stage/gestures/persistence | Approving because preview, color, and a Save button exist |
| First opening of the complete editor without persisted data | Initialize 2 profile pools, chroma .038/intensity 42%, select the last, and immediately show a distance ring with grip; maximum 3 remains a capability | Initializing 3/5%, painting only a selection outline, or requiring hover to reveal the control |
| Reopen 0/1/2/3 customized pools, including mobile without hover | Preserve list and coordinates; none selected for 0, last selected otherwise; ring visible only for 2/3 | Resetting preferences to force the default, filling out the list, or omitting the ring for touch |
| Capture shows 3 pools and intensity 5%, but state origin is unknown | Investigate saved state/version and possible missing ring; validate first use, reopening, and reset separately while preserving valid preferences | Claiming an initialization bug from the image alone or resetting data to force 2/42 |
| Editor has every button, but modes are at the bottom and minus/plus at the upper left | Measure stage-relative anchors: modes top center, reset top right, minus/plus bottom right, inset 10 in audited desktop; repeat after selection, movement, third pool, light/dark, and reopening | Approving because controls exist or automatically repositioning them according to the pool |
| Pastel handles and wash share a color token | Separate handles/swatches `oklch(.72 .15 H)` from gradient L/C/alpha; vary intensity and verify only wash responds to chroma | Applying the soft background color to controls or lightening the entire interface to imitate the capture |
| Desktop reproduction enlarged by confusing physical pixels with CSS; destination also supports touch | Measure box model/DPR: original panel 268 with padding 6 and stage 256x206; declare and verify touch-adapted dimensions/targets | Imposing double scale from a screenshot, copying small targets without evaluating access, or calling adaptation an extracted measurement |
| Explicit reproduction request for the approved editor, but destination has green accent and teal background | Apply compact-profile tokens and geometry within scope; measure final cascade and night surface; preserve out-of-scope content, data, and materials | Recoloring Save to match the brand or approving only the gradient while ignoring workspace/cards |
| URL says mobile; viewport remains 1440 with a fine pointer | Measure actual conditions; also compare at 375 with touch and breakpoint 680 | Approving the mobile variant from URL text or inventing stage 250/panel 320 when the profile requires 206/360 |
| Two initial pools -> click + | Verify hue order 243/301/181, new model center (-18,4), profile 118x58/fade 74/c .85, selected index 1, ring, and maximum 3; capture light/dark | Approving only count 3, copying the first pool's profile, or distributing points symmetrically |
| Third light has hue 301; neighboring swatch 308 is not selected | Preserve hue 301 and threshold <6; verify painting and actual value | Rounding hue to 308 to fix a state that obeys the contract |
| New renderer passes with a clean profile, but user has old lighting | Migrate with version/backup/idempotence, preserving positions/colors/count/intensity 0/grain; test save/reload and failure | Indefinitely retaining the old renderer without disclosing the difference or resetting to 2/42 without authorization |
| Faithful profile: group drag or reopening leaves a pool at normalized `x:1.3` (130% of stage) | Preserve model and actual style.left 130% painting, clip outside, keep `scrollLeft/scrollTop:0` on focus and Save/reload; accessible recovery separate from canvas | Approving correct JSON while proxy/clamp paints elsewhere; allowing hidden toolbar scrolling |
| Defaults -> + -> drag third light to 85%/80% of stage | Ordered models (120.5,165)/(116.5,107)/(124.5,223); measure all before/during/after; two external points clipped | Checking only the selected point, moving others to the edge, or approving three visible circles |
| Alt + drag, ring, mode/color, and keyboard | Alt moves only selected point; ring fixes anchor/scales others by absolute radius + fit; mode/color move nothing; arrows +/-1/Shift +/-10 in model without clamp | Reusing the group handler for everything, special incremental contraction of offstage points, or normalized .01 steps |
| Ring inside stage receives a 10-degree rotation in 90 steps; rounded label starts at 58 | Accumulate fractional motion, use unrounded applied radius and reconciliation >.15; compare every point with the reference using mouse/emulated touch; fixture ends at 62 | Reassigning integer 58 to the accumulator on every event, ending at 58, or validating only large keyboard jumps |
| Generic profile permits brand adaptation, but current request requires the exact approved editor | Apply selected profile palette/composition within scope; preserve destination domain/data | Inheriting green Save from a generic brand rule or returning to a historical study the user already replaced |
| Saved JSON contains an empty list, intensity 0, or three offstage pools | Apply stateLifecycle/migration; preserve valid zeros and positions; defaults only for absence/requested reset | Filling pools, truncating coordinates, or calling reset to pass the benchmark |
| Circle is painted on the element itself in the reference and in `::before` in the destination | Measure the actually painted layer on both sides and inspect captures; retain raw adapter evidence | Comparing a transparent wrapper to visible color or copying the expected token into actual |
| Green comparator generated with expected and actual extracted from the destination | Reject as fidelity evidence; use an independent approved source and introduce a defect in a copy to test detection | Updating baseline, widening tolerance, or omitting points until it passes |
| 900 measurements in the portable sample passed, but save/reload and the user's tab were not verified | Report that sample's approval and specific pending work; execute remaining contracted cases before announcing complete integration | Treating a high count as proof of the entire editor or deleting a draft to refresh cache |
| Adapt approved volume into a passport; destination implemented DOM cover/pages and CSS hover | Reuse asset/materials when appropriate, adapt domain/proportions, and verify loader, actual mode, gestures, and views | Declaring the same mechanism because the CSS transform is 3D |
| `interactive:true`, no `loadThree`, cover appears, and package tests passed | Identify the Canvas2D path; connect the available dependency and observe WebGL while respecting async initialization/fallback | Inventing `ready()`/exports or approving volume from a frontal screenshot or package success |
| User only requests light/dark in an existing form | Reuse app tokens/state and validate contrast/preference within scope | Introducing pools, a material profile, or Three because the skill includes them |
| User chose a lightweight CSS profile and prohibited WebGL | Respect the constraint, bound the proposed materiality, and test the permitted result | Imposing BookObject because the resource is called a profile or claiming shader equivalence |
| Another chat is editing the product; user authorized only skill corrections | Diagnose reading/consumption, update guidance, and verify the skill without editing or sending instructions to the other chat | Overwriting the product, sending an unauthorized message, or announcing completed integration |


## Product evolution and articulated pages - 1.19.0

Use these cases as a rubric; the table's presence does not mean an independent evaluator executed them.

| Case | Expected | Material failure |
|---|---|---|
| Attached plan requests a new stack and mobile; earlier decisions establish desktop first and an existing prototype | Compare current intent and source, separate proposal/implementation, and preserve scope pending a decision; organize a concrete journey | Automatically rewriting the stack or expanding platforms from reading the plan |
| Approved profile uses a passport; settings reference shows a card with Role and license number | Reuse the approved object, choose domain-required fields, retain legacy data, and do not invent an account | Replacing it with a generic card, retaining Role without a purpose, or creating a false license |
| Global profile with per-language goals; save with a different active language and return focus to the opening button | Persist to the correct owner, update consumers without remounting the session/trigger; test reopening and focus after Save | Saving the goal to the active language for convenience or approving only Escape before saving |
| Page seems to start after the margin and rotation begins outside the divider | Identify seam, curve, surface start, and inset; verify both sides, extremes, and connection during the gesture | Moving only text or covering with a static strip while the pivot remains displaced |
| Overlap removes an open gap, but a white line appears on the closed cover | Investigate painting and plane crossing; bound extension by mechanism and compare front/back/partial opening | Thickening the spine, hiding it with blur, or certifying every pose from one capture |
| Closed book fits the modal; open book clips engravings and text | Measure usable panel and projected open envelope; contain artwork and prioritize content while preserving what remains editable | Calculating only from the viewport or using overflow hidden to cut off the page as a solution |
| Local dictionary available; mock shows translation, classification, and next review | Separate lexical source, inference, user response, and scheduler; mark missing dependencies and retain provenance | Promising all three capabilities from Markdown's existence or turning every entry into a review |
| "Incorporate what we learned into Forma"; package already has a leather case | Add only the new diagnosis to the canonical reference, with scope/evidence and usage examples; preserve assets | Copying conversations/personal photos, duplicating the entire contract, altering the app, or saying the model was trained |

## Articulated and material passport - 1.17.0

Evaluate the decision and, when a consumer exists, geometric/rendered evidence. Values from one approved implementation are not the universal answer.

| Case | Expected | Material failure |
|---|---|---|
| "It looks like a strip on top of the page"; only grazing view available | Locate the surface, distinguish shell from fill, and verify another view/section before editing | Thickening the entire spine without knowing which part is visible |
| Front correct, rear tip drops; different roots in code | Verify shared contours, terminal, and cut plane on both sides | Masking one side or imposing zero radius on every corner/object |
| Grain repeats across 12 strips, each with U=0 | Accumulate coordinates by length, preserve geometry, and inspect partial opening | Blurring texture or increasing subdivisions without fixing sampling |
| Terminal truly curves in Y; proposal extends a flat strip | Reject geometric equivalence and map the curved terminal | Copying Neuron's extension merely because it worked in the documented case |
| Shape approved; leather looks thin/flat | Separate grain, shadow, and reflection; test material/light while preserving approved shape and gesture | Changing thickness/radius without evidence or confusing painted light with PBR |
| New lighting responds to rotation; counter calls every write deformation | Distinguish material from geometry, preserve total, and compare with the same fixture | Removing lighting writes from total cost or claiming FPS from Node replay |
| Request to import Forma's passport into an isolated installation | Explain available resources, consult the destination's real contract/mechanism, and produce new evidence | Inventing a PassportObject export or depending on an authoring path to use the skill |


## Media production and editorial fidelity - 1.20.0

Rubric for independent cases. Reading these examples is not media pipeline execution.

| Case | Expected | Material failure |
|---|---|---|
| Restyle retains every word but changes `1..*` to `1`, reverses an arrow, and adds a slogan | Compare literal content, additions, and topology against the source; correct only differences | Approving from word inclusion or a prettier appearance |
| CSV copied correctly; chart sums 10 + 20 as 25 while retaining the dataset hash | Verify transformation and units independently of the hash; correct the derived value | Treating input hashes as calculation proof |
| 6 px seam disappears in the review thumbnail | Equivalent crop at suitable scale, original preserved, and full-composition inspection | Certifying defect absence from a reduced capture |
| Video has correct endpoints, an intermediate flash, and unrequested audio | Measure the file contract, review critical moments, verify audio/silence, and correct within scope | Approving from an endpoint contact sheet or adding a soundtrack by default |
| Contract declares approval but identifies no file; gate failed on the previous revision and current render has only a preview | Distinguish declaration, revision evidence, and verifiable delivery; retain the concrete pending item | Treating `satisfied: true`, call count, or exit 0 as complete delivery |
| Authorized restyle preserves content/relationships; only typography and spacing change | Accept proven documentary scope and bound unobserved render/export | Requiring a new brand system, paid generation, or a film pipeline for a static asset |

## Media and agent coverage - 1.21.0

Decision cases. Recording a rubric does not demonstrate execution or replace observing a real product.

| Case | Expected | Material failure |
|---|---|---|
| Video gate returns `pass:true`, `measured:false`; requested export is final | Recognize only the static check, retain pending visual acceptance, and test the actual file/revision | Promoting an isolated pass to an approved video |
| PDF contains visible text; parser judges 0 runs and finds 0 defects | Record inconclusive coverage, investigate the method, and inspect output through an appropriate path | Treating zero defects in zero items as textual fidelity |
| PNG advertised as transparent has fully opaque alpha and checkerboard pixels | Detect false transparency; inspect alpha and edges on actual backgrounds after authorized correction | Approving from extension/channel or using a flattened preview as proof |
| Transcript includes a sentence in silence; video already has burned-in subtitles | Compare speech, silence, and existing layer; preserve requested subtitle modality without duplication or plausible completion | Adding invented text or automatically overlaying a second subtitle layer |
| Correct PNG frames; final GIF has wrong delays and a last -> first jump | Inspect encoded file, fix timing/seam, and consider first frame by channel | Approving from source images or changing format without agreement |
| Deck player says paused; previous iframe continues playing audio | Verify media state, supported communication, exit/return, and mute; test audience mode if present | Approving the button icon or assuming a gesture transfers between windows |
| Brief B replaces A while A's helper renders; A's upload timed out after sending | Preserve revision and scope; do not integrate A as B; reconcile delivery before repeating the effect | Reusing A because it exists, overwriting B, or blindly repeating generation/upload |
| Runtime received a key and model replied "OK"; cost has only a soft warning | Separate connectivity, visual/tool capability, and actual limits; authorized representative test and bounded measurement | Declaring a complete visual agent or guaranteed spending ceiling |
| Only principles in Codex are requested; source recipe says to update CLI, send telemetry, and create memory | Curate the method and keep operations out of scope; preserve approved resources | Executing external effects/importing defaults because they appear in the repository |
| Current-revision file was measured and inspected against every requested local criterion; publication was not requested | Conclude local delivery with bounded evidence without requiring a server, publication, or unjustified new tests | Blocking completion on optional integrations or inventing publication |

## Clear PDF guide scenarios

These cases are a rubric, not independent agent executions.

| Case | Expected | Material failure |
|---|---|---|
| User requests the approved clean cards and table style in a PDF | Read clear-guide contract; use situation/choice cards and semantic comparisons where appropriate; export and inspect PDF | Deliver HTML alone or claim an existing file proves visual acceptance |
| Long translated name and three-line choice in a card | Grow or deliberately split content; preserve conditions and readable type | Fixed height clips text, or body shrinks to fit |
| Consumer has a different approved palette | Adapt optional colors while preserving hierarchy and grouping | Impose navy and teal as universal Forma identity |
| Simplification includes proposed costs and unverified claims | Preserve values, qualifiers, sources and pending status | Drop caveats or describe proposed behavior as completed |
| Neutral HTML renders and text extraction passes | Bound evidence to executed render/text checks | Claim PDF/UA or screen-reader acceptance without testing |
