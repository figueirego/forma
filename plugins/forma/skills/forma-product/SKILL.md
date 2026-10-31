---
name: forma-product
description: "Refine ambiguous design requests into shared briefs and executable prompts, investigate user tasks, and design product flows with proportionate research. Use for unresolved intent, sequence, or understanding; not for isolated color adjustments or fabricated user evidence."
metadata:
  version: 1.34.0
---

# Product, research, and flows

## When to use

- Use for progressive briefs, prompt refinement, journeys, information architecture, onboarding, hypotheses, and task testing.
- Do not start a full discovery process for incorrect padding or a direction that has already been decided.

This module provides instructions for the agent to read; it does not schedule research, send invitations, or call other modules.
Preserve existing context, brand, stack, and commitments; distinguish discovery from authorized implementation.

## Inputs

- Known audience/context, primary task, problem, channel, constraints, and the decision that needs evidence.
- Current flow, accessible data/contracts, and observation sources; identify hypotheses explicitly.

## Procedure

For an underspecified design request or explicit prompt-refinement request, first read [progressive brief and prompt refinement](../../references/progressive-brief.md). Inspect context, ask one material question at a time through the host's available native choice UI or numbered text, and incorporate actual answers into one shared record. Preserve prior decisions across specialists and resumption. For substantial authorized project work, reuse existing documentation or maintain `docs/forma/brief.md`; connect useful visual specifications through [design specification](../../references/design-specification.md). A complete prompt or local fix takes the direct route below without an interview.

1. Define a concrete input and outcome, with an observable success condition.
   Read [product and research](../../references/product-research.md); distinguish the operator, buyer, and affected person when that changes the decision.
   If approved history and a new plan coexist, read [approved product evolution](../../references/approved-product-evolution.md). Reconcile sources before changing the journey, platform, or stack; visual approval does not prove backend capabilities.
2. Choose the smallest method that can resolve the question.
   For testing, read [practical research](../../references/research-protocol.md); for an evidence-informed diagnosis, read [heuristics](../../references/ux-heuristics.md). Heuristics are not research results.
3. Model the primary flow, decisions, waiting, errors, cancellation, and return paths.
   Use [interaction and content](../../references/interaction-content.md) and, for permissions/offline/AI, [contracts and trust](../../references/contracts-trust.md).
4. Produce the authorized artifact that enables the hypothesis to be evaluated: a sequence, prototype, or implemented slice.
   Adapt the new-screen or redesign playbook in [playbooks](../../references/playbooks.md); use [templates](../../references/templates.md) only when they reduce ambiguity.
5. Compare the result against the established task and context; record assistance, errors, and recovery when running a test.
   Consult [verification](../../references/verification.md). Without participants, describe the work as an internal assessment; do not present it as user validation.

## Output and stopping condition

When alignment is sufficient, summarize the decisions and continue the authorized work without a new mandatory approval step. The consolidated prompt must stand alone. A prompt-only request delivers the prompt, a plan remains a plan, and design-only work does not expand into product functionality. Readiness does not imply that implementation or validation has occurred; skipped questions, preselected choices and timeouts are not answers.

Deliver the decision, flow and states, available evidence, and a next test only for the remaining uncertainty.
If implementation was requested, deliver the flow in the product and confirm its outcome; a journey map does not complete that request.
Stop when the decision is supported by available data and the authorized deliverable is complete.
If success depends on research that has not happened, mark the hypothesis as pending and do not invent personas, interviews, or metrics.

## Coordination and execution boundaries

Use Forma Reference for bounded evidence gathering, Forma Interface for flow implementation, and Forma Validation for task checks. Research, hypotheses and flow analysis remain part of this module.
The coordinator selects additional modules; do not recursively dispatch between specialists. Use the available tools according to [capabilities](../../references/integrations.md); a tool name does not prove connection or execution.
Do not install methods or services for convenience; use synthetic data when sufficient and do not send personal data without a need and authorization.
