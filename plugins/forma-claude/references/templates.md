# Adaptable templates

Use only fields that improve delivery. Do not create a set of documents by default.

## Experience brief

```markdown
Audience and context:
Task and expected outcome:
Surface/platform/stack:
Intervention and boundary:
Brand and content source:
Primary flow and recovery:
States and extremes:
Acceptance criteria:
Assumptions and open questions:
```

## Progressive brief

Use with [progressive alignment](progressive-brief.md) for substantial work with unresolved decisions. Reuse existing project documentation first; otherwise the default is `docs/forma/brief.md`. Omit irrelevant fields and keep the user's language for consumer-facing work. This template is a portable record, not an executable state machine.

Keep explicit user choices, delegated routine choices and observed evidence identifiable per decision or scoped group. Do not relabel the user's approved palette, stack or themes as agent proposals merely because other values are newly selected.

```markdown
# Design brief: <task>

Revision: <number; increment after a meaningful decision change>
Alignment: <pending / ready; ready does not mean implemented or verified>
Requested delivery: <prompt / plan / audit / visual implementation / functional implementation>
Design specification: <existing project document or DESIGN.md, when relevant>

## Intent and boundaries
Goal and observable outcome:
Audience and context (source or explicitly unknown):
Surface/platform/stack:
In scope:
Out of scope:
Brand, content, data and approved mechanisms to preserve:

## Decisions
| ID | Decision | Basis | Status | Dependencies |
|---|---|---|---|---|
| D01 | <actual choice> | <user answer / delegated choice / existing approved source> | <current / superseded / needs reconsideration> | <IDs or none> |

## Evidence and assumptions
| Source and inspected scope | Finding | Classification | Consequence or limitation |
|---|---|---|---|
| <file/URL, revision/date, state/viewport where relevant> | <finding> | <observed / code-confirmed / derived / proposed / unknown> | <what it supports and what it does not> |

## Pending decision
Question ID and text: <one unanswered question, or none>
Options and recommendation: <when meaningful>
Why the answer matters:
State: <awaiting answer / dismissed / unavailable / resolved>
Actual response: <only if supplied; a preselection or timeout is not a response>
Independent work that can continue:

## Acceptance
| Criterion | Observable outcome | Verification method | Evidence/status |
|---|---|---|---|
| <requirement> | <expected result> | <test or inspection> | <pending until actually checked> |

## Consolidated execution prompt
Context and goal:
Requested deliverable and in/out of scope:
Constraints and decisions to preserve:
References available to the next assistant and their evidence limits:
Visual direction: <relevant palette/themes/type/layout/spacing/radii/icons/motion/3D decisions>
Content, assets and representative states:
Implementation boundaries and destination:
Acceptance checks and expected deliverables:
Unverified assumptions or remaining evidence:

## Revision notes
- <revision: changed decision IDs, reason, dependent decisions reconsidered>
```

## Direction and content record

For a new direction or broad redesign, also use the record below. A local padding adjustment does not need it; the procedure is in [directions](design-directions.md) and [editorial argument](brand-marketing.md#argument-content-and-demonstrated-interface).

```markdown
Type: communication page / operational screen / mixed composition
Task, audience and scope:
Brand, mechanisms and stack to preserve:
Owned facts and materials (source; confirmed/proposed/missing):
Concept and composition decision:
Relevant alternatives, choice and rationale:
Sections/areas: question -> claim -> evidence/source -> content/asset -> action
Demonstrated apps: data source, units, states and demonstration label
Type, color roles and layout for the direction:
Assets: source, author, license, changes, credit, availability and crop
Useful interaction, if needed, and accessible alternative:
Content/crop adaptation; normal/reduced motion when applicable:
Verification: served revision, states/sizes, findings, fixes and open items
```

## Component specification

```markdown
Name and purpose:
Use when / avoid when:
Anatomy and content:
Tokens and variants:
States:
Inputs, events and persistence:
Keyboard/touch/gestures:
Semantics, focus and announcements:
Adaptive behavior and localization:
Motion and reduced-motion alternative:
Errors, cancellation and retry:
Acceptance evidence/test:
```

## Decision record

```markdown
Problem and constraints:
Observed evidence:
Relevant alternatives:
Choice and rationale:
Impact/risk:
Criterion that would trigger reconsideration:
Verification performed:
```

## Reusable experience

Use with [design experiences](experience-library.md). Fill in the existing research record; do not create documentation without a useful decision.

```markdown
ID and task/use case:
Related site/pattern and investigated question:
Source: initial/final URL, repository, commit/version, file and available lines:
UTC date, tool, CSS viewport/DPR, state and content:
Observed: action -> result; measurements; local evidence and hashes:
Confirmed in code: entry path -> state -> output; scope of reading:
Inferred or still unknown:
Mechanism that explains the result:
Forma decision: adopt/adapt/reject/wait; rationale and contraindications:
Code/media: author, confirmed or unknown license, reuse and notices:
Independent adaptation or dependency: file/component and consumer:
Verification: steps, expected, actual, command/capture and scope:
Status per claim: candidate/observed/code/implemented/validated/rejected:
Failures, required regression and conditions for reopening the decision:
```

## Audit finding

```markdown
Severity and title:
Target, version, state and device:
Reproduction steps:
Evidence and boundary:
Task impact:
Smallest fix:
Confirmation test:
```

## Delivery coverage

| Requirement | Applicable? | Evidence/artifact | Result | Open item |
|---|---|---|---|---|
| Primary task | | | | |
| Adverse states | | | | |
| Platform and access | | | | |
| Content and brand | | | | |

Fill in real results, not just checkmarks. Evidence links must point to existing artifacts without exposing sensitive data.
