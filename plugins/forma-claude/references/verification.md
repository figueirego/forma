# Verification, auditing and acceptance

In this distribution, `<forma-root>` is this plugin root, containing `.claude-plugin/`; it contains `references/`, `assets/`, `scripts/` and `tests/`. Resolve it relative to this file.

Define criteria before judging. Separate **verified**, **inferred**, **untested** and **not applicable with a reason**. Do not score an area that was not accessed.

## Proportionate matrix

| Dimension | Relevant minimum evidence |
|---|---|
| Primary task | Actual walkthrough or behavioral test; not just a screenshot |
| States | Applicable empty, loading, failure, success and extreme states |
| Layout | Declared container/axes and spatial contracts; alignment/inset/gap/overflow measurements + captures at supported sizes and states |
| Accessibility | Available automation + keyboard, focus, semantics and relevant assistive tests |
| Content | Reviewed actual text, links, translations and sources for claims |
| Visual | Hierarchy, spacing, typography, colors, assets, clipping and consistency |
| Color, when changed | Role/mode/state, pairs and composition; legibility, semantics, contextual balance and fidelity judged separately according to [color refinement](color-refinement.md) |
| Motion | Interruption, reduced motion, response and continuity |
| Performance | Measurement in the declared context; distinguish lab from field |
| Engineering | Relevant build/lint/types/tests when code changed |
| API/data | Failures, permissions, retry, staleness and persistence according to the contract |
| Graphs/links | Fixture with expected relationships; resolution, occurrences, backlinks, filters/depth and rename; navigation and an alternative outside the canvas |
| Native/installer | Explicitly tested OS/architecture/installation state |
| Export | Open the final file and check format, dimensions, assets and editability |
| Editor/generation | Preserved target and revision, isolated preview, concurrent editing, undo and partial failure according to the contract |
| Capability reuse | Requested contract connected to the actual consumer; state/renderer and discriminating operation observed in the destination, according to [integration](playbooks.md#h-reuse-capabilities-in-another-project) |
| Clean interface foundation | Background/sidebar/panel hierarchy, selection/focus, buttons/fields, scrolling and alignment observed together; extreme content and width-based adaptation, according to the [recipe](clean-shell.md) |

Choose samples by risk: a shared component needs representative consumers; a text adjustment does not require installing every platform. Images with the correct appearance do not replace behavioral checks.

To review the skill itself, inventory the entrypoint, references, examples, helpers and scenarios. Record per area: keep/change, problem or criterion reviewed, evidence and validation method. Document reading, helper testing, independent decision evaluation and rendered execution are distinct levels. Do not turn file coverage into a claim that every flow/device was tested. New rules need a scenario that reveals an incorrect decision, not a test that merely searches documentation for words.

Also check the verifier's contract: expected/examined count, discarded failures, missing dependencies and skipped tests. Exit code 0 may represent a skip or partial artifact. `skipped`/`partial` from external tools remain unverified/incomplete in the report; they are not `pass` or `not-applicable` for convenience. Automatic similarity/diversity metrics support evaluation; they are not independent visual judgment.

Connect every successful gate to the target and input/output revision it examined. Counting inspection calls or finding a gate preceding the latest render does not prove every requirement was checked or that the gate passed. A contract with `satisfied: true` and an evidence description is a statement to verify: locate the cited file/measurement and authorization; do not treat the report itself as independent proof. Static verification, text in the DOM and legible text in the delivered file are also different evidence.

In a transfer, distinguish package tests from consumer tests: hashes, resolved imports and component regressions do not show that the route instantiated it. A three-color editor that saves may still be unable to represent pools/position/grain; a CSS passport may pass layout and contrast checks without the requested mesh/material. Do not use those checks as substitute approval. When scope is documentation only, validate decisions through independent scenarios and state that no product correction has been executed.

## Visual comparison

For agent and tool results, also consult [verifier coverage](#verifier-coverage-and-receipts). Approval must correspond to the question actually measured.

Use [spatial contracts](layout-spatial-contracts.md) to turn "it is misaligned" into a verifiable target and relationship. A geometric script confirms only the included contracts; it does not detect omitted requirements or replace optical inspection, legibility or task testing.

For reproduction, source and implementation must have the same viewport, theme, state, content and scale. Examine them together, not from memory. Check geometry and assets, but record legitimate rendering differences. For a new design, compare against the defined criteria and direction without inventing an "original source."

For a seam, halo or edge a few pixels wide, a reduced overview capture may hide the defect. Compare equivalent before/after crops, including the reference edge, at native scale or enlarged without misleading smoothing; then inspect the whole composition. Preserve original captures. The visual question should be concrete, such as "is the joint closed at this angle?", without drawing conclusions from a thumbnail's size. For films, also sample around cuts according to [temporal review](motion.md#films-and-rendered-sequences).

## Coordinated foundation review

For a new surface or broad visual refinement, compare representative consumers against the [shared foundation](visual-system.md#coordinate-the-foundation). Use the same content and applicable states at narrow and wide sizes, in light and dark when both are supported or requested. Inspect the composition and computed values together: color roles and surface hierarchy; type and spacing relationships; equivalent radius roles and nested shapes; icon meaning, family, optical weight, and accessible names. Trigger focus, selection, and error where applicable so their coexistence is visible. Include the consumer of a changed shared token, not only an isolated swatch or component. Sample supporting text, placeholders, count badges, and the boundaries that identify enabled controls, including composited opacity; checking only body text and primary buttons can miss these failures.

For new interactive designs, exercise the [default motion layer](motion.md#default-motion-for-new-interactive-designs), especially supported theme changes, hover/focus/press, and the chosen scroll treatment. Check expressive details against their purpose and brief; motion and any requested 3D need their own interaction, fallback, and relevant cost evidence. An omitted inapplicable effect needs a reason; absent unrequested 3D is not a defect. A consistent but empty generic page may still fail the direction, and a distinctive page may still fail basic relationships. Record discrepancies against the responsible rule without treating either quality as a substitute for the other. For a local fix, verify the affected relationship and likely regressions instead of reopening the complete foundation.

## Rounds and completion

Run a grouped inspection, fix relevant findings in a batch and confirm the changes. Repeat only when changes/failures justify it. Do not prolong cosmetic refinement without benefit. If a blocker remains, record it and do not declare approval. Specific requirements of a plugin being used remain valid.

## Severity

- **Critical:** data loss, sensitive exposure, misleading irreversible action or an impossible essential task.
- **High:** the main flow fails for a relevant group, inaccessible navigation, incorrect persistence.
- **Medium:** reproducible friction with recovery, inconsistency that causes mistakes, a relevant adaptation failure.
- **Low:** visual/local refinement without material impact on use.

Each finding contains target/location, state, steps, evidence, impact, smallest correction and how to verify. Separate observation from hypothesis. When there are no findings, state the scope and limits, not "perfect."

## Delivery

State the artifact and location, change and reason, executed checks and pending work. Do not declare "production ready" when functions are mocked, the screen has not been rendered or installation has not been tested. Documentation can be complete even when a future implementation does not yet exist: name the nature of the deliverable.

## Verifiable local record

For broad tasks involving multiple states/devices, use the [example record](../assets/evidence.example.json). For a simple adjustment, evidence in the response or an existing test may suffice. The JSON has:

- `schema_version: 1`, `scope` and a `targets` list with stable identifiers for the tested context.
- `checks`: each item declares `id`, `target` and `status` (`pass`, `fail`, `untested`, `not-applicable`).
- `pass` requires `observation` and `artifact`, a relative path to a nonempty local file inside the report folder, without symlinks or `..`.
- Other states require `reason`; failure or a pending test prevents structural approval. Each target needs at least one passing piece of evidence.

Example of a check completed after an actual test: `{"id":"save-error","target":"web-390x844","status":"pass","observation":"The failure preserved the fields; retry persisted the change.","artifact":"captures/save-error.png"}`. The file must exist and the observation must be true. A screenshot is appearance evidence; a log/test/walkthrough is needed to claim persistence.

Run `python3 <forma-root>/scripts/check_evidence.py <report.json>`. Exit 0 means declared coverage and present files; exit 1 indicates an incomplete/invalid record; exit 2 indicates a read/JSON error. The checker does not discover omitted requirements, inspect pixels or prove an observation true. Criteria and human inspection remain essential.

The distributed example starts as `untested` and must fail: it is not a ready-made report. Do not rename an inaccessible test "not applicable." Preserve pending work in the record even when it prevents exit 0.

## Contrast verification

`python3 <forma-root>/scripts/check_contrast.py '#111827' '#ffffff' --threshold 4.5` calculates the WCAG ratio of opaque sRGB colors without rounding to decide approval. Use the threshold relevant to the element. For alpha, gradients, images and blur, evaluate the final composited background and all relevant regions; the utility does not composite. A passing result does not validate focus, semantics or complete accessibility.

## Verifier coverage and receipts

Before consuming a `pass`, check **what was examined, what was excluded and which revision it belongs to**. `measured:false`, zero judged items, an unresolved source or collection failure do not become visual acceptance because zero defects were recorded. If no content exists to verify for that criterion, justify nonapplicability through the contract; do not turn analyzer failure into an exemption.

In the existing record for a composite task, connect criterion -> method/version -> target/revision -> coverage -> result -> artifact. For temporal samples, declare the interval, cadence and moments examined; for typography, actual families/weights/glyphs; for export, source and file identity. Use a hash when confirming bytes is useful; it does not prove quality or content correctness. Do not require a new schema for every adjustment.

Separate collection from judgment. A collector may finish with exit0 and record asset errors; a heuristic may measure only resolvable CSS or a sample of frames. Read those limitations before concluding. Do not modify thresholds, omit regions or reconstruct expected values from the candidate to obtain approval. An exemption written by the generator itself does not change the user's acceptance criteria.

The [local evidence checker](resources.md) continues to verify only declared structure and present files; it does not authenticate observations, measure omitted coverage or semantically validate these receipts. Use [independent scenarios](../evals/scenarios.md#media-and-agent-coverage---1210), in addition to product evidence when implementation exists. For runtime, [coordinated production](agent-production.md) distinguishes execution, resumption and delivery.
