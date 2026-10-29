# Validation in a rendered product

Use when creating an interface or testing this skill in practice. Documenting criteria is not equivalent to meeting them. Follow composition -> execution -> observation -> correction -> confirmation.

## Minimum execution contract

1. Declare the primary task and artifact type: browser prototype, web implementation, native app or installer. A mobile viewport and desktop layout do not prove native behavior.
2. When creating an interface, implement a usable vertical slice with representative content: entry, validation, observable success, recovery and persistence matching the promise. When refining an existing interface, exercise the affected flow and states while preserving existing contracts. Avoid decorative controls that appear actionable.
3. Render each composition at its target width and height. Inspect viewport and full-page captures; a long capture may show a fixed bar over content that scrolling can reach. Verify actual reachability before classifying it as blocked.
4. Execute the task with keyboard and pointer, including return focus and errors. Test a width change with an open draft. Test extreme content.
5. Record findings with reproduction, effect and correction. Reconfirm only affected states and critical paths. Save initial and final captures under different names; do not overwrite the baseline.

If comparison does not show the expected improvement, return to the hypothesis in the [refinement playbook](playbooks.md#a-local-correction-or-refinement). Check the loaded revision and actual capture conditions before concluding the correction failed. Choose new evidence for the next attempt; do not replace diagnosis with successive cosmetic adjustments.

## Failures observed in the Pauta lab and transferable rules

| Observed failure or risk | Required decision | How to confirm |
|---|---|---|
| Secondary text below the contrast threshold | Measure the actually rendered combination; isolated tokens are insufficient | Scanner when available, plus inspection of affected supported surfaces and states; the Pauta experiment used three compositions |
| Visually fragile 9-11px metadata | Choose size by function, distance and density; enlarge useful text before hiding content | Read at normal scale and enlarged; do not invent a universal WCAG minimum |
| `aria-label` omitted the subject visible in the button | Prefer a content-derived name or associate relevant text | Compare accessible name and visible text; test voice commands when available |
| Navigation regions without distinct names | Provide names expressing function | Inspect landmarks as well as automated results |
| An overlaid detail allowed background focus | Decide whether it is a modal or navigation; a modal requires inert background, Escape, focus containment and return | Tab/Shift+Tab at boundaries and closing with an active filter |
| Recreating the list after completion destroyed the focused control | Define the focus destination by identity/position, with an alternative when the list becomes empty | Complete through the keyboard and continue to the next task |
| A position-based checkbox test repeated the action after the row disappeared | Locate by identity and assert the final domain state; do not repeat a mutation until the control looks checked | Item leaves pending, appears completed and persists; avoid a false UI diagnosis |

Typography values and touch targets must respect the platform and project. Do not apply compact desktop density at every size. Long headings must wrap without pushing actions away or invading other controls.

## Minimum editing and storage cases

- Edit A -> open B -> return to A: preserve the draft within the session.
- Save -> reload: confirm persisted content, not just a toast.
- Simulate actual storage-layer failure -> retain text and show recovery -> retry.
- Change viewport while editing: preserve the field, selection where applicable and access to saving.
- If reload loses an unsaved draft, state that limit; do not call temporary memory persistence.
- For a timer, use elapsed time/deadline, test pause and resume and state whether it survives reload. Do not promise native background-task precision with a web timer.

## Evidence and limits

Axe reporting no detected violations does not prove full compliance. Separate scanner results, visual inspection and keyboard walkthroughs; screen reader, actual zoom, physical devices, field performance and native installation remain pending until executed. Without a preserved baseline, historical visual comparison is inconclusive. A prototype approved for demonstration is not approved for production.

When correcting the skill, turn the finding into a verifiable rule and evaluation scenario without imposing the test product's colors, components or choices on every project.

## Critique of composition and substance

Beyond looking for defects, confirm what the artifact delivers. An undecorated page can remain empty; a neutral dashboard can hide necessary information. In creation/redesign, inspect:

- **Orientation:** what is it, whose is it, what is its scope and what can the person do? In an app, which question does the screen answer and which task action is reachable?
- **Substance:** does each promised section/area contain useful information, honest evidence and coherent states? Do not approve an empty wireframe because the scanner was silent.
- **Hierarchy and frame:** is there clear focus, proximity-based grouping and consistent axes/insets? Distinguish intentional breathing room from a hole left by removed content. Measure within the actual container; the sidebar must not count as page margin.
- **Identity and continuity:** does the concept appear beyond the hero? Are the brand and approved mechanisms still recognizable? Familiar operational controls are not a failure of originality.
- **Type, color and images:** do loaded fonts, line breaks, crops and color roles remain legible at usage scale? Do not compensate for a missing font with a CSS declaration or insufficient contrast with an aesthetic note.
- **Adaptation and interaction:** read the entire composition at relevant sizes, not just the first viewport. Confirm keyboard, zoom, extreme content and reduced motion; verify gestures and scrolling, which an isolated capture cannot prove.

Record the highest-impact problems with capture/state, effect and concrete correction. Fix a small batch and reobserve affected states; three findings may form a useful batch, never a quota. Access barriers, incorrect data and broken tasks precede visual taste. If material defects remain, keep them open; a round limit controls effort, not whether failure becomes approval. A model's scores or a gallery's criteria do not measure conversion or equal user testing.

When a build exists, check output from the existing pipeline as well as the dev server on affected paths: fonts, assets, cascade, animations and interactions may change during compilation. A locally served build does not prove public deployment. If an external scanner applies style prohibitions, declare its profile and legitimate exceptions separately; do not edit it to hide defects or treat its `0 FAIL` as complete visual acceptance. Record the evidence required for each criterion; source linting and visual judgment remain different checks.

## Overlapping controls and CSS regressions

Inspect both the painted element and the interaction target. A ring can look correct while its invisible button is displaced by a generic rule such as `.stage button`. Check `getBoundingClientRect`, transform, computed background and border; do not certify it only through the formula test. Scope rules by role (`.pool-handle`, `.pool-distance-hit`), separate ring/handle/grip and verify clicking without jumps, dragging both ways and reversal at limits. Capture the result with the panel open and the rest of the application usable.

If the user is testing simultaneously, use a separate QA tab so two people's gestures do not invalidate evidence. Tests must distinguish initial state, executed action and resulting state; concurrent changes are not proven test effects.

## Regressions observed in Pauta 1.7

- Header `backdrop-filter` created a stacking context: suggestions with high z-index remained behind content. Inspect ancestors and the rendered layer; raising only the child is insufficient. When opening search, release the header context or use an anchored surface in the top layer.
- An old `.search span` selector enlarged dropdown headings. Audit the cascade of new descendants, not only the component class.
- Closing a palette and restoring input focus reopened suggestions after confirmation. Distinguish confirmation/navigation from Escape and restore focus only when consistent with the destination.
- A sidebar-only button disappears with the sidebar on mobile. Verify function reachability, including maps, libraries and settings, in each adapted navigation.
- Measure `document.documentElement.clientWidth` and overflow in addition to setting the viewport. Existing zoom can make CSS width differ from the dimension requested from the tool.
- A test image with red pixels and green card metadata distinguishes pixel-based search from decorative filtering. Test persistence after reload and absence of results when combined with an incompatible tag.
- Export the actual file, open it and check type/dimensions/content. An "exported" toast does not validate PNG, ZIP, UTF-8 or included data.

These cases guide reusable criteria; they do not certify other products or every device.

## Layout regressions - spatial contracts

- `Graph` acquired a 20px label and shadow because a text span inherited the icon rule and the button inherited action styling. Correct anatomy/class; confirm typography and elevation match other options, including rail/mobile.
- Metadata and properties had neighboring borders for the same separation. Assign one owner to the boundary and measure the resulting space.
- Palette-list height subtracted a fixed 125px even though filters could wrap into several lines. Use flex/grid with a scrollable region and stable footer; test multiline chips and a short window.
- An inline name and explanation in a narrow profile compressed the field. Stack according to content pressure; the panel may scroll while the action remains reachable.
- Tags without spaces need an explicit wrapping rule; `min-width:0` on the parent button alone does not resolve the child's `white-space:nowrap`.

Use [spatial contracts](layout-spatial-contracts.md) and record measurements for each state. Do not universalize Pauta's values: the lesson is the relationship between elements, the rule's origin and the confirmation method.

## Applying 1.10 to Pauta - scope, adaptation and execution identity

Findings from this application become verification contracts, not a new mandatory style:

| Failure or risk found | Transferable correction | Confirmation |
|---|---|---|
| Global summary disappeared at intermediate and mobile widths | Reorganize necessary content into a compact composition and name its scope | Compare total/denominator and reachability before/after filtering and narrowing the panel |
| Accent recolored subject badges while the card had an independent color | Separate category, object and action | Change theme/accent, save, reload and check identity in the corresponding places |
| Updating the same library reused the library-switch reset | Pass identity and an explicit preservation policy to the callback | Moving an item preserves scope; switching libraries performs only resets owned by the switch |
| The last task left the filter, but the UI could broaden scope or announce completion | Retain the empty scope, explain why and offer recovery | Move the last member, retain filter selection and recover "all" through an explicit action |
| Segmented/subject controls did not update navigation selection | Derive all visual/accessible states from the final scope | Traverse controls in sequence and compare announced selection with displayed items |
| A swatch gained padding, but an old mobile rule kept its box small | Measure the drawing and target after the full cascade | Check painting, target, selection and focus at the affected width; do not inspect only the new rule |
| A map was treated as a relationship graph | Explain grouping and independent color; offer an equivalent List | Open the full title through the List and verify detail focus without inventing edges |
| Toolbar/legend occupied space over the projection | Reserve layout space and fit within the actual map viewport | Fit contains useful content; controls and the last action remain reachable in a short window |

Before attributing failure to implementation, confirm the identity of files actually served and loaded. In this round, cached old JavaScript masked a local correction. Distinguish four kinds of evidence: local source, server response, resources in a new test context and resources in the user's already open tab. An isolated test neither updates nor proves the fourth.

Compare the individual identity of affected CSS and JavaScript against the tested artifact, using a version/content hash or versioned resource whose response was verified. Include imported modules and relevant style overrides. A repeated `data-revision`, title, case parameter or global version number does not prove executed bytes; a stable URL alone is also insufficient. If the tool does not expose loaded content/cache, record that limit and do not claim the tab updated. Check behavior and computed styles after confirming resources. Use the project's caching strategy; do not permanently disable caching or add arbitrary query strings on every interaction.

Before reloading, closing or replacing a tab, check for unsaved changes. Do not save, discard, reset preferences or clear storage merely to test. Preserve the draft through an existing mechanism or leave the save/discard choice to the user; meanwhile, validate in an isolated context and report separately. A saved state with three lights or 5% intensity remains valid and must not be confused with defective defaults.

Record actual CSS width/height, dimensions requested from the tool, zoom and DPR when relevant. A configured viewport does not prove the page received those values. If they differ, explain the measurement used; do not round the result to match the plan. Desktop/mobile browser views remain distinct from native applications, physical devices or virtual-keyboard validation.
