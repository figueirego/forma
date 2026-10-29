# Release-validation evaluation scenarios

Use these cases to evaluate the decisions in the [release-validation protocol](../references/release-validation.md). They are proposed fixtures and expected judgments, not executed results. Keep the expected-answer columns from the producing agent; let an independent reviewer inspect the submitted artifact, trace, and evidence. Existing [routing comparisons](routing-scenarios.md#compare-versions-without-confusing-evidence), [rendered implementation cases](scenarios.md#practical-regression---rendered-implementation-v12), and [consumer transfer cases](scenarios.md#transfer-between-projects---1133) retain their detailed criteria.

## Trial integrity

| ID | Input / fixture | Expected judgment and evidence | Material failure |
| --- | --- | --- | --- |
| RV01 | Two runs use the same version label, but one skill file and one line of the brief differ | Compare actual skill/brief/fixture hashes; classify the inputs as different and either restart an equivalent trial or report the difference | Calling the runs repetitions because their version strings match |
| RV02 | Trial B receives Trial A's output or a reviewer's correction before submitting | Disclose contamination; retain the work as assisted/corrected output, not an independent fresh trial | Counting feedback-guided work as an independent result |
| RV03 | A frozen original fails undo; a later patch passes the same sequence | Preserve the original manifest and failure; hash the correction separately and attach the retest to that revision | Editing the original in place, replacing its capture, or counting the repair as a new independent success |
| RV04 | Two original outputs satisfy the inspected criteria; no broader sample or baseline was run | Report both bounded outcomes, conditions, and untested areas; make no population or comparative-improvement claim | Declaring universal reliability, superiority, or user preference from two outputs |

## Browser and runtime evidence

| ID | Input / fixture | Expected judgment and evidence | Material failure |
| --- | --- | --- | --- |
| RV05 | A tool requests 390px; the document reports 412 CSS px at DPR 2; two tested shells share Chromium | Record actual dimensions, zoom/DPR, and the shared engine; test the intended CSS width separately if required | Reporting the requested width as measured or calling the shells engine diversity |
| RV06 | A narrow desktop view passes mouse clicks; no touch event or physical device is available | Preserve the desktop/narrow result; record pointer/hover capabilities and leave touch/device-specific behavior unverified | Calling resize a touch, mobile-keyboard, or real-device test |
| RV07 | Reduced motion is enabled while the page is open; CSS stops but a JS loop continues and a revealed heading remains hidden | Observe live preference change, active/new effects, visible content, and interruption; record both defects | Approving from the media-query rule or an initially static screenshot |
| RV08 | Geometry tests pass; WebGL is unavailable or the visible canvas is blank | Report geometry separately; inspect actual renderer mode and visible output, then verify fallback behavior | Claiming working volume, hardware rendering, or fidelity from geometry, a dependency, or context creation alone |
| RV09 | WebGL renders visibly through a software renderer; a RAF sample is near display refresh, CPU is measured, GPU instrumentation is absent | Record exposed unmasked vendor/renderer or its absence, the visible interaction, RAF/CPU methods, and unverified GPU cost | Calling the renderer hardware-accelerated, using FPS as GPU utilization, or inferring low GPU cost from low CPU |

## Consumer and retrieval boundaries

| ID | Input / fixture | Expected judgment and evidence | Material failure |
| --- | --- | --- | --- |
| RV10 | A portable component passes in isolation; the destination adapter duplicates a listener after remount | Execute repeated mount/update/unmount in the consumer; identify state ownership and cleanup; retain the standalone result separately | Declaring integration complete from the package tests or copied source file |
| RV11 | Profile draft is open, theme saves immediately, then profile storage fails or Cancel is used | Follow the declared setting scopes: preserve failed draft, retain confirmed theme, avoid false Saved feedback, verify retry/reload and cancel/reopen | Committing the whole draft when saving theme, discarding failed input, or promising Cancel reverses an independent save |
| RV12 | Navigation back restores from BFCache after `pagehide` permanently disposed the renderer | Confirm restoration through `pageshow.persisted`; inspect resumed rendering, controls, state and duplicate work; distinguish reload if restoration did not occur | Calling a reload a BFCache pass or accepting a dead/reduplicated restored component |
| RV13 | Default input fits; a long unbroken name, short viewport, or open object clips controls; a numeric setter accepts nonfinite values | Test actual container/framing and input boundaries; inspect visible content, focus and recovery at supported extremes | Approving from default dimensions, shrinking all content, or using geometry-only evidence to dismiss clipping |
| RV14 | A source's observed preview control is indexed; WebGL appears only in an unverified caveat | Retrieve the preview's dated supporting claim; require zero WebGL feature matches and preserve candidate identity status | Promoting the whole source, searching caveats as verified features, or substituting unrelated candidates |
| RV15 | A query combines features from separate claims; a receipt assertion or source section is missing | Require a claim supporting all meaningful terms; reject unsupported evidence or report the observed collection unavailable while preserving valid collections | Pooling unrelated claims, accepting an invented source assertion, or silently falling back to broad guides |
| RV16 | Save writes equivalent values but normalization reorders object keys; dirty remains true and reopen is blocked | Compare canonical values, assert unchanged preview and clean state after acknowledgement, then reopen without reload; retain failed-write drafts | Accepting a Saved message or successful storage write while the edit session remains falsely dirty |

## Execution and reporting

Run the relevant cases against an identified package and output revision. Use deterministic checks for hashes, schema, query behavior and state invariants; execute browser/runtime cases in an actual consumer when available. A simulated DOM can check event wiring, but does not measure layout, paint, assistive technology, touch, hardware, or browser-engine behavior.

Record case ID, frozen inputs/output, environment, performed action, actual observation, judgment, evidence, and limits. Mark inaccessible cases unverified; do not populate this document with invented passes. A statement that the agent plans to test is insufficient for an execution case. Corrections receive separate revision IDs and results. Report original-trial counts and correction counts separately, with the sample limitations required by the protocol.
