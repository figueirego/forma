# Progressive brief and prompt refinement

Forma turns an underspecified design request into shared decisions, a self-contained execution prompt, and the requested deliverable. Product owns this alignment; the coordinator retains the record and passes it to the relevant specialists. This is an agent-executed protocol, not a background service or a promise that a host will automatically activate Forma for every message.

## Activate only when useful

Start when a material ambiguity remains after inspecting the available context, or when the user explicitly asks to refine a prompt. Examples include an undefined audience, uncertainty between a marketing page and a working product, or conflicting visual references. Inspect the project, supplied files and existing decisions before asking discoverable technical questions.

For a complete brief, a local correction, or an already approved direction, go directly to the appropriate specialist. Do not manufacture a questionnaire, require knowledge of Forma's modules, or reopen settled choices. A request for a prompt, audit, explanation or plan retains that scope. Refining it does not authorize implementation.

## One shared decision record

Capture the goal, audience, surface, scope, constraints, source references and success criteria. Preserve the brand, stack, content, approved mechanisms and explicit user choices. Distinguish:

- **Observed or confirmed in code:** evidence with a source and its inspected scope.
- **User decision:** what the user actually requested or selected.
- **Proposed or derived:** an agent recommendation, assumption or adaptation, not an approved fact.
- **Pending:** an unresolved question or missing evidence that matters to delivery.

Use stable decision labels such as D01 within the record, with a short rationale and any dependent decisions. These labels identify decisions, not question numbers that force a fixed interview length. Read [design specification](design-specification.md) before turning imported tokens or source descriptions into the destination's visual contract.

## Ask the next useful question

1. Choose the unresolved decision with the greatest effect on the result. Usually resolve task and scope before choosing visual detail, but skip any topic already answered. Ask about the user or business goal only when no authoritative context supplies it; code alone does not establish intended product policy.
2. Present **one question at a time**, in the user's language. For a meaningful choice, offer two or three distinct options with a short consequence for each, a recommended option with a reason, and a way to answer freely. Use a free-text question when choices would invent constraints.
3. Use the host's native question capability when available in its current mode. Discover its actual interface and restrictions first. Otherwise present the same question as numbered text options and accept the user's own wording. See [tool capabilities](integrations.md). Do not require any one host's tool name, plugin, global settings or instruction file.
4. Wait for the actual answer before doing work that depends on it. With asynchronous tools, keep only one question pending; independent inspection may continue. Do not emit the next question while the previous one is unresolved.
5. Incorporate the answer into the shared record and briefly acknowledge its consequence when useful. Then ask the next necessary question, or continue the authorized task when ready.

The question bank is conditional, not a checklist to ask verbatim: goal and audience; destination and platform; design-only versus functional scope; references and fidelity; identity and palette; light/dark modes; composition and density; typography and icons; spacing and radii; content and assets; motion and reduced-motion behavior; optional 3D; deliverables and acceptance. Existing Forma defaults can resolve routine details when the user delegates them. Record those as chosen implementation assumptions rather than falsely attributing them to the user.

### Answer and cancellation semantics

A preselected recommendation, opened card, elapsed time, timeout, tool failure or dismissed question is **not an answer or approval**. Keep an unanswered material decision pending. Explain its effect and continue only independent work; do not repeatedly ask the same question without new context. If the user explicitly says to choose, make a reasoned choice within scope and record that delegation. If the question is no longer material, record why it was removed rather than inventing an answer.

Map native selections and textual responses to the same meaning. An ambiguous reply needs one focused clarification only if competing interpretations would change the result. Never force a free-text answer into the nearest offered option when it says something different.

## Correct and resume without restarting

When the user changes a preference, update that decision, increment the record's revision, and reconsider only its dependents. For example, switching from a static visual study to a functional prototype affects state behavior and verification, but does not automatically discard the approved palette. Keep superseded decisions identifiable so another assistant does not accidentally restore them.

On resumption or specialist handoff, read the existing record before asking. Preserve the original request's scope, current decisions, pending question and evidence limits. Reconcile the latest explicit instruction with older records; ask only about a remaining material conflict. Do not treat a previous assistant's proposal as user approval.

## Persist in the consumer project

For substantial authorized project work, reuse an existing brief or equivalent project document. If none exists, use `docs/forma/brief.md` and the [progressive brief template](templates.md#progressive-brief). Update it incrementally after meaningful answers; keep one current record instead of copying the entire conversation or creating a file for every question. If that default file belongs to another task, preserve it and use a clearly task-named sibling rather than overwriting unrelated work.

For a new visual system or broad redesign, reuse the project's design documentation or create `DESIGN.md` when useful through the [design specification contract](design-specification.md). Cross-link the two documents: the brief owns intent, decisions and pending work; the design specification owns the current visual rules. Do not maintain conflicting copies of the same tokens.

Keep project answers in the project, not in the installed plugin, global memory or assistant configuration. Store only information needed to continue, without secrets or unnecessary personal data. Do not send private source material to an external service as a side effect of refinement. In read-only/plan mode or without project write access, keep the record in the conversation and provide a portable summary; do not claim that files were saved. A small edit does not require new documentation.

## Consolidate and continue

Alignment is ready when the goal, requested deliverable, boundaries and relevant design direction are sufficiently clear, no material dependent decision remains unanswered, and the acceptance conditions are observable. This is readiness to work, not proof that the design has been implemented, approved or verified. Do not require every field to be filled when it is irrelevant.

Produce a compact, self-contained execution prompt from the record using the template. It must name the actual task and include the context, goal, in/out of scope, constraints and preserved decisions, usable references with evidence limits, relevant visual decisions, deliverables and verification. Do not depend on phrases such as "the previous version" or a source in another chat that the next assistant cannot access. Proposals and pending evidence remain labeled.

Summarize the resolved decisions and continue the work already requested without an additional mandatory approval step. Keep any actual host or task authorization boundary: alignment does not authorize publication, external messages, paid calls, destructive actions or a change from planning to execution. If the request is prompt-only, deliver the prompt; if it is design-only, do not add backend, integrations or business rules. A requirement for final approval explicitly set by the user still applies.

## Example: the same flow in two hosts

Request: "Create a calm workspace for my team." Project context supplies the brand and stack but not whether this is a visual study or an operational tool.

Question: "Should this delivery demonstrate the visual design or support working task interactions?"

1. Visual study (recommended for exploring the direction): representative screens and visual states with sample content.
2. Interactive prototype: working local task interactions with sample data, without a backend.
3. Integrated product: connect the existing application behavior and verify its contracts.

Allow a different answer in the user's own words. A native host displays these as choices; a text-only host displays this numbered list. In both, "Visual study, light and dark" records D01 as design-only and D02 as both themes. It does not ask about themes again or infer a backend. If the remaining context is sufficient, Forma summarizes and begins the visual work. If the card is dismissed, neither D01 nor D02 becomes selected.

## Evidence of operation

Verify the protocol with complete prompts, ambiguous requests, local corrections, corrections to earlier answers, pending/dismissed questions, imported contradictions, prompt-only scope and cross-host resumption. Separate package/link checks, simulated conversations and trials in actual host sessions. A valid Markdown contract does not prove that every assistant displayed native cards or followed the protocol. Report the environments and paths actually exercised.
