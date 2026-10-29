---
name: forma
description: "Coordinate design specialists to create, refine, adapt, or audit interfaces, visual systems, and brand assets. Select the internal interface, color/layout, product, 3D, graphs, motion, platform, brand, reference, handoff, or validation skill for each case. Also use to reuse approved components in another project; not for isolated backend work."
metadata:
  version: 1.28.0
---

# Forma

One entry point to the system: understand the request, select a specialty, read its instructions and relevant references, complete the authorized work, and verify the result. Respond in the user's language; preserve the brand, stack, data, components, and approved decisions. Do not promise perfection or universal coverage.

To install, update, inspect the distribution, or distinguish the standalone skill from the plugin, consult [plugin operation](references/plugin-operation.md). Forma's visual identity belongs to the tool; it never replaces the identity of the project being served.

To turn references into reusable technical knowledge, route the work to the `reference` module and the [experience protocol](references/experience-library.md): source -> evidence -> mechanism -> adaptation -> test, preserving licenses and limits.

Coordination also covers websites: finding references, investigating their techniques, and creating or refining the destination site. In research involving several sources, `reference` gathers evidence; the coordinator selects a coherent direction and routes decisions to the relevant specialists. Follow [site coordination](references/experience-library.md#coordinate-reference-sites-and-the-destination-site). Do not end a creation request with a list of links.

## How to coordinate

1. **Identify the real task:** plan, create, refine, redesign, reproduce, audit, or extract a system; identify the destination and platform. Inspect the available project/source before substantial decisions. A request for explanation remains an explanation; an audit does not authorize editing. Clarify only an ambiguity that materially changes the result.
2. **Select the primary internal skill from the table below and read its `SKILL.md`.** Start with the predominant task, not every word mentioned. Read the references selected by that specialist; a link alone is not consultation. For a small adjustment, one specialist and the reference addressing the defect may be enough.
3. **Add support only for a distinct need.** For example: interface integrates the editor; foundations resolves its color; objects-3d handles explicitly requested volume. For composition, precedence, ambiguous tasks, and fallback, use [routing and coordination](references/routing.md). Avoid opening the entire library or chaining specialists without a new question.
4. **Execute; do not stop at a referral.** If the user requested implementation, specialist selection is an internal step. If they only asked which one to use, deliver the recommendation. For broad work, follow the [shared workflow](references/workflow.md) and [relevant playbook](references/playbooks.md); for a local adjustment, keep the scope local.
5. **Close the loop in the destination:** verify the files actually loaded, the affected interactions, and acceptance. A repeated revision marker does not prove that CSS/JS is current; check the identity of affected resources and preserve unsaved changes before any reload. The validation specialist supports broad audits; all work requires proportionate verification even without loading another skill. Report the change, evidence, and actual limitations.

Briefly state the specialty and reason: "I will use interface for the sidebar and foundations to align the insets." Do not turn this into a questionnaire or require the user to know module names. The coordinator retains context and resolves conflicts; specialists do not recursively call the coordinator. Reading a skill does not automatically create a subagent or execute a plugin.

Read the chosen specialist in full; in canonical references, locate the relevant section and read enough context to apply the contract correctly. Do not recursively follow their links by default. For a local gap, this may limit reading to the spatial relationship and affected verification section; for a complete editor, include state and persistence contracts. Operational instructions for an explicitly activated external skill remain mandatory.

## Internal skills by use case

| Predominant case | Skill to read | Expected outcome |
|---|---|---|
| Color, contrast, spacing, centering, grids, typography, or tokens | [Forma Foundations](skills/foundations/SKILL.md) | Visual relationships and values connected to real consumers |
| Clean backgrounds, sidebars, buttons, inputs, search, themes, settings, and profiles | [Forma Interface](skills/interface/SKILL.md) | Composition and functional controls in the existing stack |
| Briefs, research, journeys, onboarding, flows, or product direction | [Forma Product](skills/product/SKILL.md) | Task, state sequence, and product decisions |
| Books, covers, passports, mascots, volume, materials, gloss, or relief | [Forma Objects 3D](skills/objects-3d/SKILL.md) | The requested mechanism, verifiable material, and interaction |
| Graphs, backlinks, Canvas, maps, dashboards, or time-series data | [Forma Graphs & Data](skills/graphs-data/SKILL.md) | Relationships and visualizations with sources, meaning, and controls |
| Gestures, transitions, animation, video, film, or reduced motion | [Forma Motion](skills/motion/SKILL.md) | Interactive motion or a rendered sequence with continuity and its own acceptance criteria |
| Behavior specific to web, mobile, desktop, installers, or devices | [Forma Platforms](skills/platforms/SKILL.md) | Task and operational adaptation to the target environment |
| Identity, campaigns, marketing landing pages, assets, presentations, or print | [Forma Brand](skills/brand/SKILL.md) | Message, composition, and deliverables for the requested channels |
| Finding examples, selecting references, reverse engineering, technologies, or fidelity differences | [Forma Reference](skills/reference/SKILL.md) | Contextual research, evidence separated from hypotheses, and transferable specifications |
| Quality audits, accessibility, regression, or rendered acceptance | [Forma Validation](skills/validation/SKILL.md) | Bounded findings/evidence and fixes when authorized |
| Figma, editable artifacts, exports, libraries, design-to-code, or technical delivery | [Forma Handoff](skills/handoff/SKILL.md) | Source, components, and output delivered and verified |

Identifiers follow `forma-<specialty>`, for example `$forma-motion`, `$forma-interface`, and `$forma-objects-3d`. They can be called directly when the environment catalog offers them. The `$forma` entry point still selects and reads modules through the paths above, without relying on discovery in every host. Do not invent an `invoke_skill` tool command: use the reading/invocation mechanism actually available in the environment.

## External integrations on demand

ECC, REA, Impeccable, Figma, graphic tools, and other skills provide optional support. Identify the gap, check the capability available in the session, and read the current operational skill before using it. Consult [integrations](references/integrations.md) to select support and understand its boundaries. Catalog names do not prove installation, connection, or execution; record unavailability and continue independent work without pretending to have called the service.

Do not install plugins or start paid generation to complete a checklist. The system works with local references and tools. When delegating available, useful work, assign the question/files/acceptance criteria and avoid concurrent edits; delegation is not required for every task.

Incorporating an agent's methods does not install its runtime. For production agents, jobs, resumption, or an explicitly requested LangChain/Deep Agents integration, read [coordinated production](references/agent-production.md). Check capabilities, revision, and result coverage; a described workflow does not prove execution. Local UI adjustments remain with the relevant specialist.

## Preserve approved mechanisms

When examples are needed, use the [searchable library](references/reference-library.md): original cards covering Forma resources and patterns, a site index associated with original investigation cases, context-based selection, visual browsing, and optional credited media research. Read only relevant candidates; a pattern card does not prove its execution in the consumer. A local correction does not require inspiration research. The library does not replace the consumer's approved mechanism.

Distinguishing **applying principles** from **reusing a mechanism** is mandatory for transfer requests. Adapting brand/content does not authorize replacing volume with tilted CSS or a manipulable editor with three fixed colors. If the request is **identical to the approved implementation**, also preserve its composition, palette, and responsive behavior: the explicit instruction takes precedence over generic brand adaptation. Use the final cascade and rendered state of that revision, not just an earlier specification. Preserve the destination's data, routes, and content. Follow [consumer reuse](references/playbooks.md#h-reuse-capabilities-in-another-project): contract -> available implementation -> consumer -> observed distinguishing operation.

For an approved reproduction, freeze criteria before changing the destination and use [fidelity contracts](references/fidelity-contracts.md). The portable verifier compares measurements against the frozen reference; differences, missing data, or an unconfirmed revision prevent declaring fidelity complete. Do not generate expected values from the destination itself or widen tolerances to make a test pass.

| Resource | Package status | Route |
|---|---|---|
| Clean interface foundation | Scoped CSS + HTML/JS example with in-memory data | Interface -> [recipe](references/clean-shell.md) |
| BookObject and color helper | Original reusable code; volume requires a valid Three loader, and static mode is separate | Objects 3D -> [contract](references/reusable-objects.md) and [approved case](references/book-polish-case-study.md) |
| Articulated passport: fit, leather, and light | Approved case study and manifest; does not include a passport component | Objects 3D -> [case and limits](references/passport-polish-case-study.md) |
| Complete appearance/lighting editor and material profile | Contracts and a [portable profile](assets/reference-profiles/compact-appearance-v1.json) for implementation in the stack; does not include an executable editor component | Interface -> [editor](references/lighting-editors-icons.md) and [profile](references/adaptive-visual-systems.md) |
| Contrast, layout, and evidence verifiers | Local scripts with bounded scope | Validation -> [executable resources](references/resources.md) |

Do not depend on the authoring project's folder or presumed files from another chat. Check the resource in the installed version. Package tests do not prove consumer integration. Preserve hashes and audit limits when transferring an approved result.

## Shared criteria

Correctness, security, access, and data come before polish. Preserve the existing system and identity; do not impose styles, 3D, tools, or frameworks by association. Standards, heuristics, and preferences are different categories; resolve conflicts through [precedence](references/conflicts.md).

Test the task, focus, extreme content, and affected states. Static/bundle analysis, observed UI, physical devices, exported files, and publication provide distinct evidence. A reference does not grant authorship, asset licenses, or authorization to publish. [Verification](references/verification.md) and the [rendered cycle](references/rendered-validation.md) define how to complete acceptance; [templates](references/templates.md) are optional, not bureaucracy for small adjustments.

## Simple usage examples

- "Use $forma to apply the clean interface foundation to my app while preserving its brand, stack, and routes."
- "Use $forma to fix the alignment and colors in this form."
- "Use $forma to adapt the approved BookObject into a 3D passport with materials and interaction."
- "Use $forma to implement the complete lighting editor with pools, save/reopen behavior, and colors by context."
- "Use $forma to audit this flow; do not edit it yet."
- "Use $forma to create a campaign and deliver editable files."
- "Use $forma-motion to refine this interface's animations."
- "Use $forma-interface to apply the sidebar, clean background, and controls to my app."

## Maintenance

Keep all Forma-authored package content in US English with ASCII editorial punctuation, following the [editorial and encoding standard](references/reference-library.md#editorial-and-encoding-standard). Preserve original identities, licenses, URLs and intentional multilingual behavior. This package policy does not change the user's language or the destination product's locale.

For new content, follow [authorship and integration](references/authorship.md): write a solution to a real problem, connect it to the resource, and verify it; renaming external content does not make it original. When replacing imported content, preserve the capabilities learned and verify where they belong in Forma's own contracts, including coordination, research, direction, and refinement. References, standards, dependencies, and media retain their origins.

When improving this skill, keep the entry point small, give each specialist a distinct responsibility, and keep theory in its canonical reference. Preserve links, approved resources, and history in [sources](references/sources.md). Validate the structure and [decision scenarios](evals/scenarios.md), including [routing](evals/routing-scenarios.md). Reading, documentary evaluation, and product execution are not interchangeable proof.

To incorporate findings from a conversation or reconcile a new plan with approved design, use [approved product evolution](references/approved-product-evolution.md): distinguish local decisions, transferable mechanisms, and evidence. Do not copy entire conversations, personal data, or one product's requirements into universal defaults.
