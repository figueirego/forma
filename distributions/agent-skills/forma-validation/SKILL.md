---
name: forma-validation
description: "Validate tasks, accessibility, rendering, states, and fidelity with proportionate evidence and reproducible findings. Use for QA and confirmation after changes; not to certify inaccessible areas or treat isolated builds/tests as visual proof."
metadata:
  version: 1.34.0
---

# Validation and quality

## When to use

- Use for audits, acceptance, regression, accessibility, rendered comparison, and confirmation of integrated capabilities.
- Do not invent scores, declare full compliance from automation, or expand an audit into unauthorized edits.

This module must be read by the agent; it does not trigger tests, fixes, or other modules by itself.
Preserve scope, brand, and stack. Distinguish verified, inferred, untested, and not applicable, with a reason.

## Inputs

- Artifact/route, revision actually loaded, task, acceptance criteria, and supported states/devices.
- A baseline for comparisons, data/fixtures, and tools/environments that are actually available.

## Procedure

1. Build a matrix proportionate to the risk and request before judging the result.
   Read [verification](../forma/references/verification.md); select dimensions and minimum proof without requiring every dimension for a small fix.
   When consuming agent/renderer gates, check [coverage and receipts](../forma/references/verification.md#verifier-coverage-and-receipts): a pass without measurements, zero assessed items, or an old revision does not approve the current delivery.
2. Confirm execution identity and follow the task through input, action, success, and recovery.
   Use [rendered validation](../forma/references/rendered-validation.md); verify persistence after reopening if promised, and distinguish an in-memory prototype from real operation.
3. For access, read [accessibility](../forma/references/accessibility.md) and exercise the relevant keyboard, focus, semantics, zoom, and alternative paths.
   Inspect computed accessible names for inputs presented with icons or placeholders; descriptions explain a field but do not replace its label.
   If layout/color is affected, use [spatial contracts](../forma/references/layout-spatial-contracts.md) and [color refinement](../forma/references/color-refinement.md).
   For a new surface or broad visual refinement, inspect the [coordinated foundation](../forma/references/verification.md#coordinated-foundation-review) in representative consumers and supported modes. Isolated token or contrast checks do not establish a coherent composition.
4. For reference work or reuse, test the operation that distinguishes the requested mechanism from an approximation.
   Consult reuse in [playbooks](../forma/references/playbooks.md) and [fidelity](../forma/references/reference-fidelity.md); observe the primary path, fallback, and relevant states separately. The [component lab](../forma/references/reusable-components.md#run-the-lab) exposes actual renderer and state diagnostics; counters and geometry tests still need rendered inspection, Save/reload, error recovery, unmount/remount and BFCache checks in the consumer.
   When frozen reference values exist, run the [fidelity verifier](../forma/references/fidelity-contracts.md) against consumer measurements. Missing fields, NaN, omitted points, or different revisions cannot pass through averaging. A passing numerical fixture does not prove that the browser loaded the revision or that the contract covers everything; confirm those facts separately.
5. Record failures with reproduction steps, effects, severity, and the smallest correction; fix only within existing authorization.
   Recheck affected states and critical paths, preserving before/after captures. Additional tests must address a remaining concern.
6. When changing Forma itself, use [plugin operation](../forma/references/plugin-operation.md) and the [evaluation protocol](../forma/evals/routing-scenarios.md#compare-versions-without-confusing-evidence).
   Package integrity, host discovery, agent decisions, and consumer operation have separate acceptance criteria. Apply [release validation](../forma/references/release-validation.md) when the request concerns a revision, independent trials, reusable components, or observed retrieval: freeze inputs/submissions, keep post-review corrections separate, and record each browser/input/motion/WebGL/cost gate as passed, failed, unverified, or inapplicable with a reason. Two Chromium shells are not two engines; narrow width is not touch, and CPU render time is not GPU cost.

## Output and stopping condition

Deliver results by criterion, evidence/environment, actionable findings, and coverage limits.
Helper scripts verify their input contracts; passing them does not replace observation in the product.
Stop when relevant criteria have evidence and no material blocker remains, or conclude the audit with clearly open failures.
Without runtime access, state what static analysis confirms and what remains untested; do not treat a limitation as approval.

## Coordination and execution boundaries

Consult the relevant Forma domain specialist to interpret evidence. Browser, accessibility and end-to-end checks remain this module's responsibility, using the available runner and existing project tests.
The coordinator selects additional modules; do not recursively dispatch between specialists. Use the available tools according to [capabilities](../forma/references/integrations.md); a tool name does not prove connection or execution.
Do not create suites that merely mirror the implementation. Test evidence, visual inspection, and task validation answer different questions.
