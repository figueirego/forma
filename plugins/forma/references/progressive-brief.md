# Progressive brief and prompt refinement

Forma turns an underspecified design request into shared decisions, a self-contained execution prompt, and the requested deliverable. Product owns this alignment; the coordinator retains the record and passes it to the relevant specialists. This is an agent-executed protocol, not a background service or a promise that a host will automatically activate Forma for every message.

## Activate only when useful

Start when a material ambiguity remains after inspecting the available context, or when the user explicitly asks to refine a prompt. Examples include an undefined audience, uncertainty between a marketing page and a working product, or conflicting visual references. Inspect the project, supplied files and existing decisions before asking discoverable technical questions.

For a complete broad brief, apply the material-scope check below using the supplied answers, then proceed without an interview. A local correction or an already approved local direction goes directly to the appropriate specialist. Do not manufacture a questionnaire, require knowledge of Forma's modules, or reopen settled choices. A request for a prompt, audit, explanation or plan retains that scope. Refining it does not authorize implementation.

## Material scope

Read this section before routing broad creation to an execution specialist, including a request believed to be complete. Establish the primary task the person must accomplish and the delivery boundary: a visual study, working local interactions, or integration with a real product. For each, record the specific explicit user instruction or approved brief/decision that supplies the answer. A description of the audience, package metadata, stack, placeholder CTA or lack of backend is context, not approval of a workflow or delivery boundary. Do not convert "a team workspace" into navigation, priorities, activity or another product task without that source.

Use this order by impact:

- **Primary task unknown:** ask one open question, such as "What should people mainly do in this workspace?" Wait for that answer before suggesting a workflow, delivery options or dependent implementation; independent inspection can continue.
- **Task known, delivery uncertain:** present meaningful delivery options, each with its consequence, a recommendation grounded in the known task, and a visible free-response path. Do not recommend a workflow for an activity that has not been established.
- **Both known:** preserve and record the supplied answers in the existing brief and design specification, then build without another interview. Use the [project-record rules](#persist-in-the-consumer-project) if no equivalent exists.

A small local correction goes directly to work without new documents. Routine visual defaults may be delegated; a missing core task is not a routine aesthetic choice.

## One shared decision record

Capture the goal, audience, surface, scope, constraints, source references and success criteria. Preserve the brand, stack, content, approved mechanisms and explicit user choices. Distinguish:

- **Observed or confirmed in code:** evidence with a source and its inspected scope.
- **User decision:** what the user actually requested or selected.
- **Proposed or derived:** an agent recommendation, assumption or adaptation, not an approved fact.
- **Pending:** an unresolved question or missing evidence that matters to delivery.

Use stable decision labels such as D01 within the record, with a short rationale and any dependent decisions. These labels identify decisions, not question numbers that force a fixed interview length. Read [design specification](design-specification.md) before turning imported tokens or source descriptions into the destination's visual contract.

## Ask the next useful question

Introduce the purpose of this alignment in one short sentence before the first question: "I will clarify the delivery type so the prompt asks for the result you need." Follow the [visible journey](workflow.md#visible-journey) when moving to creation or verification. Do not turn an internal specialist change into another interview.

1. Choose the unresolved decision with the greatest effect on the result. Usually resolve task and scope before choosing visual detail, but skip any topic already answered. Ask about the user or business goal only when no authoritative context supplies it; code alone does not establish intended product policy.
2. Present **one question at a time**, in the user's language. For a meaningful choice, offer two or three distinct options with a short consequence for each and a recommended option with a reason. Make free response visible in the question, for example: "You can also describe a different option in your own words." An internal instruction to accept free text is not enough; text-only choices need that sentence too. Use a free-text question when choices would invent constraints.
3. Use the host's native question capability when available in its current mode. Discover its actual interface and restrictions first. Otherwise present the same question as numbered text options and accept the user's own wording. See [tool capabilities](integrations.md). Do not require any one host's tool name, plugin, global settings or instruction file.
4. Wait for the actual answer before doing work that depends on it. With asynchronous tools, keep only one question pending; independent inspection may continue. Do not emit the next question while the previous one is unresolved.
5. Incorporate the answer into the shared record and briefly acknowledge its consequence when useful. Then ask the next necessary question, or continue the authorized task when ready.

Example when density is an unresolved choice and the user says the team reads long tables throughout the day:

> Which density should the table use?
> 1. Balanced (recommended because prolonged reading benefits from clearer row separation): more space per row, fewer rows visible at once.
> 2. Compact: more rows visible at once, with tighter spacing.
> You can also describe a different option in your own words.

"Recommended" alone is not a reason. Tie the reason to known context and state the consequence; do not invent a goal to justify it. A free-text question remains preferable when alternatives would invent the task.

The question bank is conditional, not a checklist to ask verbatim: goal and audience; destination and platform; design-only versus functional scope; references and fidelity; identity and palette; light/dark modes; composition and density; typography and icons; spacing and radii; content and assets; motion and reduced-motion behavior; optional 3D; deliverables and acceptance. Existing Forma defaults can resolve routine details when the user delegates them. Record those as chosen implementation assumptions rather than falsely attributing them to the user.

### Answer and cancellation semantics

A preselected recommendation, opened card, elapsed time, timeout, tool failure or dismissed question is **not an answer or approval**. Keep an unanswered material decision pending. Explain its effect and continue only independent work; do not repeatedly ask the same question without new context. If the user explicitly says to choose, make a reasoned choice within scope and record that delegation. If the question is no longer material, record why it was removed rather than inventing an answer.

Map native selections and textual responses to the same meaning. An ambiguous reply needs one focused clarification only if competing interpretations would change the result. Never force a free-text answer into the nearest offered option when it says something different.

## Correct and resume without restarting

When the user changes a preference, append a revision note with the stable decision ID, previous value, replacement, reason/source and affected dependents before updating the current decision. Preserve earlier notes; incrementing the revision or overwriting the current table alone loses the history. For example: `r2 | D02 | light-only -> light and dark | user correction | recheck contrast; preserve typography`. Switching from a visual study to a functional prototype affects state behavior and verification, but does not automatically discard the approved palette.

After editing, reread the saved revision note and current decision: the prior value, replacement and affected dependents must remain identifiable and agree with the current revision. A successful edit command or an intention to update history is not evidence that the note was preserved. If the brief is conversation-only, perform this check against the delivered record instead of claiming a file was saved.

Whenever an existing brief is edited, compare its current decisions, `DESIGN.md` or an existing equivalent, and its consolidated execution prompt, even when the current change is narrow. Update the affected instructions together; if that brief lacks an execution summary, add a compact one there with the current task, scope, preserved choices and acceptance. Reread the saved prompt and revision history before declaring completion; the next assistant must not reconstruct the current request from revision notes alone. Reuse the same records. The local-correction exception avoids creating a new brief when none needs to change; it does not exempt an edited brief from this consistency check.

On resumption or specialist handoff, read the existing record before asking. Preserve the original request's scope, current decisions, pending question and evidence limits. Reconcile the latest explicit instruction with older records; ask only about a remaining material conflict. Do not treat a previous assistant's proposal as user approval.

For a long task, use the optional [delivery checkpoint](templates.md#delivery-checkpoint) in that same record: current stage and state, last valid artifact/revision, existing evidence and next authorized action. A ready alignment is distinct from an available preview, a verified result or a completed delivery. Reconcile the checkpoint with current files and confirmed effects before continuing; do not repeat an already completed action merely because the conversation resumed.

## Persist in the consumer project

For substantial authorized project work, reuse an existing brief or equivalent project document. If none exists, use `docs/forma/brief.md` and the [progressive brief template](templates.md#progressive-brief). Update it incrementally after meaningful answers; keep one current record instead of copying the entire conversation or creating a file for every question. If that default file belongs to another task, preserve it and use a clearly task-named sibling rather than overwriting unrelated work.

For a new visual system or broad redesign, reuse the project's design documentation or create `DESIGN.md` when useful through the [design specification contract](design-specification.md). Cross-link the two documents: the brief owns intent, decisions and pending work; the design specification owns the current visual rules. Do not maintain conflicting copies of the same tokens.

Keep project answers in the project, not in the installed plugin, global memory or assistant configuration. Store only information needed to continue, without secrets or unnecessary personal data. Do not send private source material to an external service as a side effect of refinement. In read-only/plan mode or without project write access, keep the record in the conversation and provide a portable summary; do not claim that files were saved. A small edit does not require new documentation.

## Consolidate and continue

Alignment is ready when the goal, requested deliverable, boundaries and relevant design direction are sufficiently clear, no material dependent decision remains unanswered, and the acceptance conditions are observable. This is readiness to work, not proof that the design has been implemented, approved or verified. Do not require every field to be filled when it is irrelevant.

Produce a compact, self-contained execution prompt from the record using the template. It must name the actual task and include the context, goal, in/out of scope, constraints and preserved decisions, usable references with evidence limits, relevant visual decisions, deliverables and verification. Do not depend on phrases such as "the previous version" or a source in another chat that the next assistant cannot access. Proposals and pending evidence remain labeled.

Summarize the resolved decisions and continue the work already requested without an additional mandatory approval step. Keep any actual host or task authorization boundary: alignment does not authorize publication, external messages, paid calls, destructive actions or a change from planning to execution. If the request is prompt-only, deliver the prompt; if it is design-only, do not add backend, integrations or business rules. A requirement for final approval explicitly set by the user still applies.

## Example: the same flow in two hosts

Request: "Create a calm workspace where my team tracks tasks from planned to complete; we have not chosen a visual direction." The primary task, brand and stack are known, but delivery scope remains open.

Question: "Should this delivery demonstrate the visual design or support working task interactions?"

1. Visual study (recommended because the visual direction is still open): compare representative screens and visual states with sample content before adding working interactions.
2. Interactive prototype: working local task interactions with sample data, without a backend.
3. Integrated product: connect the existing application behavior and verify its contracts.

"You can also describe a different option in your own words."

A native host displays these choices with a visible free-response path; a text-only host displays the numbered list and the sentence above. In both, "Visual study, light and dark" records D01 as design-only and D02 as both themes. It does not ask about themes again or infer a backend. If the remaining context is sufficient, Forma summarizes and begins the visual work. If the card is dismissed, neither D01 nor D02 becomes selected.

## Evidence of operation

Verify the protocol with complete prompts, ambiguous requests, local corrections, corrections to earlier answers, pending/dismissed questions, imported contradictions, prompt-only scope and cross-host resumption. Separate package/link checks, simulated conversations and trials in actual host sessions. A valid Markdown contract does not prove that every assistant displayed native cards or followed the protocol. Report the environments and paths actually exercised.
