---
name: forma-validation
description: "Validate tasks, accessibility, rendering, states, and fidelity with proportionate evidence and reproducible findings. Use for QA and confirmation after changes; not to certify inaccessible areas or treat isolated builds/tests as visual proof."
metadata:
  version: 1.22.0
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
   If layout/color is affected, use [spatial contracts](../forma/references/layout-spatial-contracts.md) and [color refinement](../forma/references/color-refinement.md).
   For a new surface or broad visual refinement, inspect the [coordinated foundation](../forma/references/verification.md#coordinated-foundation-review) in representative consumers and supported modes. Isolated token or contrast checks do not establish a coherent composition.
4. For reference work or reuse, test the operation that distinguishes the requested mechanism from an approximation.
   Consult reuse in [playbooks](../forma/references/playbooks.md) and [fidelity](../forma/references/reference-fidelity.md); observe the primary path, fallback, and relevant states separately.
   When frozen reference values exist, run the [fidelity verifier](../forma/references/fidelity-contracts.md) against consumer measurements. Missing fields, NaN, omitted points, or different revisions cannot pass through averaging. A passing numerical fixture does not prove that the browser loaded the revision or that the contract covers everything; confirm those facts separately.
5. Record failures with reproduction steps, effects, severity, and the smallest correction; fix only within existing authorization.
   Recheck affected states and critical paths, preserving before/after captures. Additional tests must address a remaining concern.
6. When changing Forma itself, use [plugin operation](../forma/references/plugin-operation.md) and the [evaluation protocol](../forma/evals/routing-scenarios.md#compare-versions-without-confusing-evidence).
   Package integrity, host discovery, agent decisions, and consumer operation have separate acceptance criteria.

## Output and stopping condition

Deliver results by criterion, evidence/environment, actionable findings, and coverage limits.
Helper scripts verify their input contracts; passing them does not replace observation in the product.
Stop when relevant criteria have evidence and no material blocker remains, or conclude the audit with clearly open failures.
Without runtime access, state what static analysis confirms and what remains untested; do not treat a limitation as approval.

## Optional support and boundaries

`accessibility`, `ecc:browser-qa`, `e2e-testing`, and `ecc:click-path-audit` can support a concrete gap.
Read the available support skill's current `SKILL.md` and [integrations](../forma/references/integrations.md) before use; a skill name does not prove that a runner is connected.
Do not create suites that merely mirror the implementation. Test evidence, visual inspection, and task validation answer different questions.
