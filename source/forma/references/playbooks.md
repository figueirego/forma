# Executable playbooks

Use the smallest workflow that meets the request. Keep the existing product, files and decisions as the starting point. No playbook authorizes publication, charges, installation or external messaging.

## A. Local correction or refinement

**Input:** component/route and behavior or aspect to correct.

1. Reproduce the reported state; locate styles, tokens and consumers. Preserve a baseline with the actual revision, content, state and size. For "it does not look good" without a stated cause, examine the artifact and identify the main observable problem; do not require the user to perform the technical diagnosis.
2. Define what should improve and how to check it: for example, "the heading and field share the inset, and a long name does not push Save away." Separate defects, reference discrepancies and aesthetic preferences. Prioritize task completion, access and data, then structure, consistency and polish; keep the user's specific complaint as the round's focus.
3. Form a causal hypothesis and choose evidence that distinguishes it from other causes. Measure the container/cascade before replacing tokens; confirm the rendering path before adjusting a shader. If relevant capability or knowledge is missing, use [tool capability selection](integrations.md#choose-by-the-unresolved-question). Do not start external research for an error already explained by local code.
4. Make the smallest coherent change, isolating the hypothesis or a causal group of changes. Before changing a global token, check consumers; keep local exceptions local. Preserve the approved direction and user data. Keep the previous version recoverable while experimenting.
5. Compare in the same context using the [rendered loop](rendered-validation.md), confirming the reported state, affected states, extreme content and relevant checks. Verify that the modified revision loaded. Accept the change when it meets the criterion without a relevant regression; revert an attempt that worsened the result and retain evidence of why.

**When an attempt does not resolve the issue:** record what it ruled out and obtain new evidence before another change. Reconsider measurement, the hypothesis or support when the current method cannot distinguish causes. Repeating values or adding plugins without new information is not progress. If an undefined preference or unavailable access is involved, ask a specific question and continue independent work. Finish when acceptance criteria are satisfied, or state the concrete dependency preventing completion; the number of rounds is not an approval criterion.

**Working with the user:** briefly explain "what I observed -> probable/confirmed cause -> next test." Ask when a choice changes identity, scope or direction; execute already authorized reversible corrections without confirmation at every step. Aesthetic approval applies to the artifact and state shown, not other devices or functionality.

**Delivery:** a functional change, reason and evidence. Do not create a new design system, moodboard or campaign to adjust one field.

When the request also includes improving this skill, record **symptom -> mechanism -> transferable correction -> verification** and add a relevant scenario to [evaluations](../evals/scenarios.md). Reference-specific constants stay in their respective profiles. Preserve decisions in the project's existing record; updating the installed skill requires that request or authorization already present in the session.

## B. New product screen or flow

**Input:** task, audience, platform, data and known limits.

1. Draw a short sequence of states, including entry, exit, waiting and recovery. Example: select file -> validate -> upload -> process -> confirm; failures connect to the recoverable point.
2. Choose components by their job: tabular comparison, form, list, editor or visualization. Wireframe with actual content before polishing when structure is uncertain.
3. Specify what already exists in the backend and what will be a demonstration. Define observable acceptance criteria: "reopening preserves the filter," "an error does not erase entered values."
4. Apply the existing system; if none exists, choose a direction with typography, color roles, density and a distinctive detail.
5. Implement the happy path and relevant failures. Test the task, access, content size and adaptation.

**Minimum delivery:** the executable flow or requested specification, states, material decisions and evidence. A button that only shows a toast is not equivalent to saving.

## C. Redesign an existing product

1. Capture routes, content, conversions, shortcuts, branding and migration constraints. Distinguish preserving identity from replacing visual language.
2. Choose a representative flow and identify its friction. Do not redesign every screen before validating the main pattern.
3. Compare the proposal with the baseline using the same task and content. Record behavior retained, changed and requiring migration.
4. Propagate the approved or clearly authorized system, checking consumers and regressions.

**Delivery:** before/after under equivalent conditions, migration and pending work. Preserve slugs, events and data by default; explicitly state any necessary change.

## D. Extract or create a design system

1. Inventory components and values actually used; group by role and state, not just matching hex values.
2. Classify values as retain, consolidate or exception. Show concrete conflicts.
3. Define tokens and contracts for the most recurring components. Use [tokens and handoff](tokens-handoff.md).
4. Build a sample with a form, content and an adverse state. Migrate other consumers only after verifying the effects.

**Delivery:** machine-readable tokens when useful, usage in the actual stack, a short component/state catalog and decisions. The visual preview may be local HTML or the existing catalog; do not create Storybook merely to satisfy a format.

## E. Desktop app and distribution

1. Separate app UI from installation/updating. Identify the actual technology and formats.
2. Design windows/menus/documents with [adaptation](platform-adapters.md).
3. Model distribution states with [desktop](desktop-distribution.md).
4. In an authorized environment, test the new version and the upgrade path from the previous supported version.

**Delivery:** requested UI and/or specification, tested OS/architecture matrix and failure recovery. Without access to the target OS, produce the implementation and mark runtime untested.

## F. Campaign and graphic material

1. Record the offer, audience, verifiable argument, voice and action.
2. Build an asset -> channel -> dimensions -> message -> resource -> destination -> export criterion matrix.
3. Produce only the requested channels, adapting composition and copy; do not multiply deliverables automatically.
4. Check continuity between advertisement and destination and review the exported file at its intended size.

**Delivery:** authorized pieces/editable sources, an asset and claims map, and verification. Planning a calendar does not schedule publication.

## G. Reproduce or reconstruct from a reference

1. Capture the source and identify what must be faithful: visuals, behavior or both.
2. If design-source/code source is available, use it before inferring from pixels. For artifacts without source, apply [artifact investigation](artifact-investigation.md).
3. Record gaps: images, inaccessible states, permissions, data, gestures and scales.
4. Build and compare in the same context. Do not confuse a style reference with a clone request.

**Delivery:** reconstruction bounded by scope, evidence and known differences; do not claim complete identity based on one screenshot.

## H. Reuse capabilities in another project

**Input:** requested resource, destination project and intent to adapt principles or preserve a mechanism. Infer this intent from the request and approved context; clarify only a material ambiguity. A simple light/dark request does not require a light editor, material profile or 3D.

1. Check the skill version actually read, accessible files and code served in the destination. Correct installation does not prove integration. If another edit is active in the same files, analyze without overwriting it and coordinate integration within existing authorization.
2. For requested resources, connect **contract -> available implementation -> destination consumer -> acceptance evidence**. Record this connection in existing documentation/tests; another manifest is not mandatory. BookObject and the color helper are distributed code. The [clean interface foundation](clean-shell.md) has CSS and an HTML/JS demonstration; adapt it to the actual stack and data. The full editor and material profile are contracts: implement them or extract authorized authored components, without inventing exports or depending on the authoring project's directory.
3. Separate what changes (text, domain and authorized adaptations) from what must remain (composition, state, gestures and requested material). For an explicit request to reproduce an approved reference, do not automatically adapt branding, palette or proportions; record precedence in a [fidelity contract](fidelity-contracts.md), keeping the reference independent from the destination. If a constraint requires substitution, declare the lost capability and what remains missing instead of treating the approximation as completion.
4. Make the smallest integration that exercises the actual resource. Import/copy the correct asset, supply existing dependencies, connect events and persistence to the correct owner and preserve disposal/error/fallback. A fallback appearing after failure does not prove the main path.
5. Test an operation that distinguishes the mechanism from its approximation and examine the rendered result. Conditional examples follow; do not impose every capability on every project.

| Agreed resource | Discriminating proof in the destination | Approximation that does not demonstrate the request |
|---|---|---|
| Clean interface foundation | Background/sidebar/panel preserve hierarchy; navigation and controls are connected, focus and states are consistent, narrow layouts preserve the task | Only changing the palette, importing CSS without consumers or styling screenshots inside cards |
| Complete visual lighting editor | Nonmodal panel with a stage; moving/adding/removing pools, distance, wave and grain respond to data; save/reopen preserves state and zero pools; context and hold match scope | Light/dark/accent panel, three fixed colors or a preview without manipulation |
| Approved BookObject volume/material | Consumer uses the valid asset and loader; observed WebGL mode, views/gestures and material checked; fallback and reduced motion tested separately | Tilted CSS, an unused copied file, `interactive:true` without a loader or Canvas2D presented as volume |
| Requested material profile | Layers, actual data, visual response, editing/persistence and export when requested; fallback and lifecycle | A decorative card with arbitrary animation; invented member number or capability |
| Search with specified capabilities | Exercise every requested capability with a small corpus and expected result; check shortcut, surface and query semantics | Substring field or focus shortcut presented as a command palette or semantic search |

**Delivery:** state which resources were integrated, adapted, substituted or remain pending, with evidence for each. Do not announce "the entire skill was applied" because utility tests passed. If the user only requested improving the skill, use the destination as a diagnostic case and do not change the product.
