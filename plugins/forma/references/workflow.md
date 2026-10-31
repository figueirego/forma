# Shared design process

The coordinator selects the specialty; this process connects diagnosis, construction, verification and delivery when work requires multiple steps. For a small correction, read only the relevant section.

## A process proportionate to the work

For broad work, choose a playbook in [playbooks](playbooks.md) and use its minimum deliverables. For a small adjustment, work directly on the target. The goal is to reduce repeated decisions, not require a complete process for every edit.

When the user asks for help refining an existing artifact, conduct diagnosis, the authorized correction and comparison. Use the relevant Forma specialist and contract for the unresolved question; choose execution tools through the [capability map](integrations.md#choose-by-the-unresolved-question). An explanation-only request remains an explanation; it does not turn a conceptual conversation into a project edit.

### 1. Understand and establish the reference

Read local instructions and inspect relevant files, flows, tokens, assets, dependencies, tests and constraints. For existing interfaces, observe the experience when accessible; screenshots are visual evidence, code is structural evidence. Record what was not observed.

For new products, define the task, audience, context, content, channels, constraints and success. For a misaligned button, do not start an entire product discovery process.

Use Product and the [progressive brief](progressive-brief.md) when a missing choice materially changes the result. Read existing answers first, ask one unresolved question, and update the shared record after an actual answer. Native controls and numbered text use the same decisions; no question widget is required. Skip the interview for clear requests. When alignment is complete, summarize and execute within the original scope without a new mandatory approval step.

For substantial authorized project work, reuse equivalent documentation or create `docs/forma/brief.md` and `DESIGN.md`. The brief records scope, approved choices, pending questions, dependencies and the consolidated prompt; the [design specification](design-specification.md) records visual decisions and their evidence. All specialists and subsequent assistants read the same project records. A correction reopens only dependent decisions. Do not create project files during a read-only audit or explanation merely to satisfy this protocol.

When several sources are supplied, classify capability, evidence and license before combining their recommendations. A catalog, prompt, component and application do not have the same authority. Separate adopt, adapt, already covered, reject and pending; read [use cases](source-use-cases.md). If the direction is open, compare alternatives under equivalent conditions in [directions](design-directions.md); do not require variants for a choice already made.

### 2. Design flows and states before polish

Trace the primary path, decisions, entry/exit, recoverable errors, cancellation and destructive actions. Identify minimum, typical and extreme content. Map actual data and authorization. Only then choose composition, typography, color and motion.

For a new composition or layout defect, read [spatial contracts](layout-spatial-contracts.md). Before styling, define the reference container, alignment axes, width limits, shared insets, within/between-group distances and wrap/stack/scroll rules. A token scale does not replace these relationships. Centering a panel does not mean centering all its content.

For graphs and links, read [graphs and knowledge](knowledge-graphs.md) before choosing the renderer. Define identity, provenance, direction, resolution, counts and updates after rename/delete. Separate actual relationships, semantic suggestions, groups and visual position. The interface must let users explain and open the source of each relationship.

For new systems or broad changes, record the direction in existing documentation; create DESIGN.md only if useful and no equivalent exists. Use semantic tokens and components with states. Optional expression, motion and density dials support communication; they do not mandate effects.

For design-only work, describe visual states and presentation behavior without expanding into authentication, backend actions or business workflows. Follow the [design specification](design-specification.md) to distinguish observed evidence from proposed tokens and to resolve contradictions in imported specifications. Document purposeful motion and reduced-motion behavior for interactive designs; 3D remains optional.

### 3. Build on the right platform

Reuse what exists. An EXE is an executable artifact, not an aesthetic; DMG is a distribution format, not a framework. Identify the technology before recommending implementation. Do not install UI systems simply because the reference resembles their brand.

When the request is to "copy the technology for adaptation," deliver a reusable mechanism with data, materials, dimensions, interaction, fallback and lifecycle separated from the product. A fixed visual copy does not satisfy that request. To reproduce a reference, also measure geometry, UVs/normals, the color pipeline, nominal framing versus expanded canvas and gesture response: using the same 3D library does not establish equivalence. Read [reusable objects](reusable-objects.md); for campaign scenes, compare mechanisms and costs in [immersive web](immersive-web-tech.md), without importing the entire stack by association.

For a fidelity request, establish tolerances and compare geometry, projection, palette, shader, gestures, transitions and adaptation separately. Include front/side/back and rest/hover/drag/release/exit states when relevant. Record observed, statically confirmed, inferred and proposed findings. Position/scale FLIP does not prove pose/material interpolation; approved fallback and functional tests do not make a generic example equivalent to the reference.

When differences persist in 3D objects, use the [package-to-pixel protocol](3d-reference-fidelity.md): trace configuration to the consumer, preserve units/UVs per face, normal authorship, masks, exact font and atlas/buffer/output resolution. Comparing EXE and DMG may confirm equivalent modules without validating their runtimes. Correct the specification before changing numbers without a diagnosis.

Connect symptom -> mechanism -> correction -> regression -> rendered comparison. Gloss may differ because of normals; striations because UVs lose a dimension; closing one piece does not prove contact with another. The [approved book case](book-polish-case-study.md) demonstrates this chain with evidence. Transfer the method while keeping specific constants in the reference profile.

Use authorized content and assets. Identify mocks as demonstrations. Never invent customers, testimonials, scarcity, metrics, prices or capabilities. Generate images when useful and authorized by the task; readable text and interactions must not become a rasterized image.

### 4. Verify and correct with evidence

Use [verification](verification.md) and, for implemented interfaces, the [rendered loop](rendered-validation.md). Run a grouped round across relevant states and devices, fix the issues found and confirm the changes. Stop polishing when criteria are satisfied. If relevant defects remain, continue the necessary functional correction or report the blocker; never turn a round limit into fictitious approval.

Declare the surface actually tested: a mobile browser viewport is not a physical-device test, and a desktop layout is not native-application validation. Bundle inspection confirms mechanisms present, not their execution or pixel parity. When reusing a skill component, check the contract and revision actually distributed along with its tests. Also verify integration in the destination: route -> component -> state/renderer -> observed interaction. Asset, layout or contrast tests do not approve a replaced mechanism or one that never loaded.

When incorporating an approved result, preserve its revision by hash, before/after comparison and known limits; confirm that source, installation and package carry the same asset. Human approval, an executed test, a skipped test and measured visual equivalence are different evidence.

### 5. Deliver something usable

Deliver the requested artifact, not just suggestions. State what changed, why, executed checks and material limitations. In audits, prioritize reproducible findings with target, impact and smallest correction. In plans, deliver implementable specifications without claiming implementation.

## Invariants

- The primary task works without depending on hover, animation, color alone or a gesture without an alternative.
- Content remains reachable with enlarged text, translation and small windows.
- Each distance and divider has an identifiable owner; alignment and centering are checked in the correct container using computed styles, measurements and visual reading. Optical correction does not conceal a structural defect.
- Persisted state, drafts, pending work and failure are not presented as equivalent success. Operations that write to more than one store require a transaction, verifiable compensation or explicit partial-success feedback.
- Do not silently discard data or replace native flows with decorative simulations.
- A graph, collection map and authored Canvas have different contracts. Proximity, color and animation do not prove a semantic relationship; rendering, simulation, index and storage require their own evidence.
- Reference inspection does not grant permission to copy branding, restricted assets or publish.
- A design request does not authorize purchases, publication, deployment, credential changes or installation of unknown binaries.
- A missing tool does not block independent specifications and local work. Explain the concrete limitation; do not invent an executed integration.
- A preview, editable source, exported file and publication are separate deliverables. Declare conversion losses and validate the final file; the extension does not prove editability or functionality.

