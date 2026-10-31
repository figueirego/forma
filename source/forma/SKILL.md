---
name: forma
description: "Coordinate design specialists to create, refine, adapt, or audit interfaces, visual systems, and brand assets. Refine unclear design prompts through progressive questions and a shared brief. Select the internal interface, color/layout, product, 3D, graphs, motion, platform, brand, reference, handoff, or validation skill for each case. Also use to reuse approved components in another project; not for isolated backend work."
metadata:
  version: 1.34.0
---

# Forma

One entry point to the system: understand the request, select a specialty, read its instructions and relevant references, complete the authorized work, and verify the result. Respond in the user's language; preserve the brand, stack, data, components, and approved decisions. Do not promise perfection or universal coverage.

To install, update, inspect the distribution, or distinguish the standalone skill from the plugin, consult [plugin operation](references/plugin-operation.md). Forma's visual identity belongs to the tool; it never replaces the identity of the project being served.

To turn references into reusable technical knowledge, route the work to the `reference` module and the [experience protocol](references/experience-library.md): source -> evidence -> mechanism -> adaptation -> test, preserving licenses and limits.

Coordination also covers websites: finding references, investigating their techniques, and creating or refining the destination site. In research involving several sources, `reference` gathers evidence; the coordinator selects a coherent direction and routes decisions to the relevant specialists. Follow [site coordination](references/experience-library.md#coordinate-reference-sites-and-the-destination-site). Do not end a creation request with a list of links.

External candidate lookup matches names and URLs; topic queries suggest research guides separately. For specific recorded features, use the separate `--observed` collection and read the returned claim, date, conditions, and caveats. Its six sources and ten observed claims do not establish that all 202 sites or 2,079 portfolios were studied. A guide assignment is an investigation lens, not proof that a site has that feature. State the question and unknowns before selecting candidates. Evaluate retrieval, routing, implemented output and repeatability separately; a valid plan or a large catalog does not prove design quality.

For the approved closed book, route to [the complete book integration](references/book-integration.md): BookPreset, font, stage, loader, lighting and reset travel together. Do not substitute bare engine defaults or the passport demo.

## How to coordinate

1. **Identify the real task:** explain, refine a prompt, plan, create, refine, redesign, reproduce, audit, or extract a system; identify the destination and platform. Inspect the available project/source and previous decisions before substantial choices. If a material gap remains, read Product and the [progressive brief](references/progressive-brief.md): ask one question at a time, incorporate actual answers, and share the same brief with every specialist. Complete requests and small clear adjustments go directly to work. A request for explanation remains an explanation; an audit does not authorize editing.
2. **Select the primary internal skill from the table below and read its `SKILL.md`.** Start with the predominant task, not every word mentioned. Read the references selected by that specialist; a link alone is not consultation. For a small adjustment, one specialist and the reference addressing the defect may be enough.
3. **Add support only for a distinct need.** For example: interface integrates the editor; foundations resolves its color; objects-3d handles explicitly requested volume. For composition, precedence, ambiguous tasks, and fallback, use [routing and coordination](references/routing.md). Avoid opening the entire library or chaining specialists without a new question.
   For a new surface or broad visual refinement, establish the [shared visual foundation](references/visual-system.md#coordinate-the-foundation) before splitting work. Interface or Brand can apply it directly; add Foundations for unresolved system decisions. For new interactive designs, also read [Motion](skills/motion/SKILL.md) and implement the [default motion layer](references/motion.md#default-motion-for-new-interactive-designs), with intensity adapted to the brief. Carry the same roles and rules into each specialist. Additional expressive detail and 3D remain conditional; a local fix does not activate a redesign.
4. **Execute; do not stop at a referral.** If the user requested implementation, specialist selection is an internal step. If they only asked which one to use, deliver the recommendation. For broad work, follow the [shared workflow](references/workflow.md) and [relevant playbook](references/playbooks.md); for a local adjustment, keep the scope local.
5. **Close the loop in the destination:** verify the files actually loaded, the affected interactions, and acceptance. A repeated revision marker does not prove that CSS/JS is current; check the identity of affected resources and preserve unsaved changes before any reload. The validation specialist supports broad audits; all work requires proportionate verification even without loading another skill. Report the change, evidence, and actual limitations.

Briefly state the specialty and reason: "I will use interface for the sidebar and foundations to align the insets." Do not require a fixed questionnaire or knowledge of module names. Clarify only unresolved choices that change the result, using native question controls when available or the equivalent numbered text. Once aligned, summarize and execute the requested work without an extra mandatory confirmation. A prompt-only request ends with the improved prompt. The coordinator retains context and resolves conflicts; specialists do not recursively call the coordinator. Reading a skill does not automatically create a subagent or execute a plugin.

Read the chosen specialist in full; in canonical references, locate the relevant section and read enough context to apply the contract correctly. Do not recursively follow their links by default. For a local gap, this may limit reading to the spatial relationship and affected verification section; for a complete editor, include state and persistence contracts.

## Internal skills by use case

| Predominant case | Skill to read | Expected outcome |
|---|---|---|
| Color, contrast, spacing, centering, grids, typography, or tokens | [Forma Foundations](skills/foundations/SKILL.md) | Visual relationships and values connected to real consumers |
| Clean backgrounds, sidebars, buttons, inputs, search, themes, settings, and profiles | [Forma Interface](skills/interface/SKILL.md) | Composition and functional controls in the existing stack |
| Prompt refinement, incomplete briefs, research, journeys, onboarding, flows, or product direction | [Forma Product](skills/product/SKILL.md) | Progressive alignment, shared decisions, consolidated prompt and appropriate delivery |
| Books, covers, passports, mascots, volume, materials, gloss, or relief | [Forma Objects 3D](skills/objects-3d/SKILL.md) | The requested mechanism, verifiable material, and interaction |
| Graphs, backlinks, Canvas, maps, dashboards, or time-series data | [Forma Graphs & Data](skills/graphs-data/SKILL.md) | Relationships and visualizations with sources, meaning, and controls |
| Gestures, transitions, animation, video, film, or reduced motion | [Forma Motion](skills/motion/SKILL.md) | Interactive motion or a rendered sequence with continuity and its own acceptance criteria |
| Behavior specific to web, mobile, desktop, installers, or devices | [Forma Platforms](skills/platforms/SKILL.md) | Task and operational adaptation to the target environment |
| Identity, campaigns, marketing landing pages, assets, presentations, or print | [Forma Brand](skills/brand/SKILL.md) | Message, composition, and deliverables for the requested channels |
| Finding examples, selecting references, reverse engineering, technologies, or fidelity differences | [Forma Reference](skills/reference/SKILL.md) | Contextual research, evidence separated from hypotheses, and transferable specifications |
| Quality audits, accessibility, regression, or rendered acceptance | [Forma Validation](skills/validation/SKILL.md) | Bounded findings/evidence and fixes when authorized |
| Editable design sources, exports, libraries, design-to-code, or technical delivery | [Forma Handoff](skills/handoff/SKILL.md) | Source, components, and output delivered and verified |

Identifiers follow `forma-<specialty>`, for example `$forma-motion`, `$forma-interface`, and `$forma-objects-3d`. They can be called directly when the environment catalog offers them. The `$forma` entry point still selects and reads modules through the paths above, without relying on discovery in every host. Do not invent an `invoke_skill` tool command: use the reading/invocation mechanism actually available in the environment.

## Forma owns the workflow

All design decisions route through the internal specialists and canonical contracts above. Do not forward a design responsibility to a named external skill or make another plugin a prerequisite. For a missing method, use Reference to investigate, the relevant domain specialist to adapt it, and Validation to check the result. Preserve technical dependencies actually required by the implementation.

Tools provide execution capabilities, not a replacement coordinator. Select an available file reader, browser, design canvas, renderer or artifact inspector through the [tool capability contract](references/integrations.md). Verify the real API, connection and result; the package does not contain or install those runtimes. Do not start paid generation merely to complete a checklist.

For production jobs, resumption or an explicitly requested separate runtime, use [coordinated production](references/agent-production.md). A described workflow does not prove execution. When authorized delegation is useful, assign the question, files and acceptance criteria and avoid concurrent edits; it is not required for every task.

## Preserve approved mechanisms

When examples are needed, use the [searchable library](references/reference-library.md): original cards covering Forma resources and patterns, a site index associated with original investigation cases, context-based selection, visual browsing, and optional credited media research. Read only relevant candidates; a pattern card does not prove its execution in the consumer. A local correction does not require inspiration research. The library does not replace the consumer's approved mechanism.

Distinguishing **applying principles** from **reusing a mechanism** is mandatory for transfer requests. Adapting brand/content does not authorize replacing volume with tilted CSS or a manipulable editor with three fixed colors. If the request is **identical to the approved implementation**, also preserve its composition, palette, and responsive behavior: the explicit instruction takes precedence over generic brand adaptation. Use the final cascade and rendered state of that revision, not just an earlier specification. Preserve the destination's data, routes, and content. Follow [consumer reuse](references/playbooks.md#h-reuse-capabilities-in-another-project): contract -> available implementation -> consumer -> observed distinguishing operation.

For an approved reproduction, freeze criteria before changing the destination and use [fidelity contracts](references/fidelity-contracts.md). The portable verifier compares measurements against the frozen reference; differences, missing data, or an unconfirmed revision prevent declaring fidelity complete. Do not generate expected values from the destination itself or widen tolerances to make a test pass.

| Resource | Package status | Route |
|---|---|---|
| Clean interface foundation | Scoped CSS + HTML/JS example with in-memory data | Interface -> [recipe](references/clean-shell.md) |
| Integral Soft Glass reproduction | Separate local approved source, media, fonts and motion; verify its manifest before reuse | Reference + Brand -> [integral kit](references/soft-glass-integral.md) |
| Soft Glass visual kit | Scoped CSS, paired themes, complete nine-section landing plus footer, and workspace/control specimen; no product handlers | Interface + Brand -> [visual preset](references/soft-glass.md) |
| BookObject and color helper | Original reusable code; volume requires a valid Three loader, and static mode is separate | Objects 3D -> [contract](references/reusable-objects.md) and [approved case](references/book-polish-case-study.md) |
| Articulated passport | Executable NeuronPassport preserves the approved CSS engine and visual layers; Three PassportObject is a separate legacy alternative | Objects 3D -> [extracted component](references/reusable-components.md#neuronpassport-integration) and [approved CSS case](references/passport-polish-case-study.md) |
| Appearance/lighting editor | Executable vanilla `AppearanceEditor`, scoped styles and save/cancel adapters; compact profile guides consumer fidelity | Interface -> [component](references/reusable-components.md#appearanceeditor-integration), [editor contract](references/lighting-editors-icons.md) and [material profile](references/adaptive-visual-systems.md) |
| Component lab | Runnable appearance/passport consumer with real renderer diagnostics and explicit dependency loader; not automatic framework integration | [Setup and evidence limits](references/reusable-components.md#run-the-lab) |
| Contrast, layout, and evidence verifiers | Local scripts with bounded scope | Validation -> [executable resources](references/resources.md) |

Do not depend on the authoring project's folder or presumed files from another chat. Check the resource in the installed version. Package tests do not prove consumer integration. Preserve hashes and audit limits when transferring an approved result.

## Shared criteria

Correctness, security, access, and data come before polish. Preserve the existing system and identity; do not impose styles, 3D, tools, or frameworks by association. Standards, heuristics, and preferences are different categories; resolve conflicts through [precedence](references/conflicts.md).

Test the task, focus, extreme content, and affected states. Static/bundle analysis, observed UI, physical devices, exported files, and publication provide distinct evidence. For a skill release, comparative trial, or reuse audit, use [release validation](references/release-validation.md): freeze inputs, preserve independent submissions, and report browser, input, motion, WebGL, persistence, retrieval, and cost gates separately. A reference does not grant authorship, asset licenses, or authorization to publish. [Verification](references/verification.md) and the [rendered cycle](references/rendered-validation.md) define how to complete acceptance; [templates](references/templates.md) are optional, not bureaucracy for small adjustments.

## Simple usage examples

- "Use $forma to refine my design request. Resolve missing choices one at a time, preserve what I already decided, then build the agreed design."
- "Use $forma to improve this prompt only. Use my references as evidence and return a standalone brief I can use with another assistant."
- "Use $forma to apply the clean interface foundation to my app while preserving its brand, stack, and routes."
- "Use $forma and the integral Soft Glass local kit to preserve the complete approved landing, its fonts, media and motion; verify the manifest and copy before adapting."
- "Use $forma to reuse the complete Soft Glass landing, including its narrative sections, halftone hero, FAQ, contact and footer; design only in light/dark and mobile."
- "Use $forma and Soft Glass for a design-only landing and workspace: dotted sidebar, inset rounded panel, glass buttons and account footer, in light/dark and desktop/mobile."
- "Use $forma to fix the alignment and colors in this form."
- "Use $forma to reuse the approved closed book through BookPreset, preserving its framing, light, materials, and gestures."
- "Use $forma to integrate the approved interactive passport through NeuronPassport, preserving its opening, page turns, editing, and save behavior."
- "Use $forma to implement the complete lighting editor with pools, save/reopen behavior, and colors by context."
- "Use $forma to audit this flow; do not edit it yet."
- "Use $forma to create a campaign and deliver editable files."
- "Use $forma to create a clean PDF guide with cards and comparison tables. Preserve our branding and facts, deliver the PDF, and inspect every exported page."
- "Use $forma-motion to refine this interface's animations."
- "Use $forma-interface to apply the sidebar, clean background, and controls to my app."

## Maintenance

Keep all Forma-authored package content in US English with ASCII editorial punctuation, following the [editorial and encoding standard](references/reference-library.md#editorial-and-encoding-standard). Preserve original identities, licenses, URLs and intentional multilingual behavior. This package policy does not change the user's language or the destination product's locale.

For new content, follow [authorship and integration](references/authorship.md): write a solution to a real problem, connect it to the resource, and verify it; renaming external content does not make it original. When replacing imported content, preserve the capabilities learned and verify where they belong in Forma's own contracts, including coordination, research, direction, and refinement. References, standards, dependencies, and media retain their origins.

When improving this skill, keep the entry point small, give each specialist a distinct responsibility, and keep theory in its canonical reference. Keep each capability linked to its implementation, contract and evidence in the [resource map](references/sources.md). Validate the structure and [decision scenarios](evals/scenarios.md), including [routing](evals/routing-scenarios.md) and [progressive briefing](evals/progressive-brief-scenarios.md). Reading, documentary evaluation, and product execution are not interchangeable proof.

To incorporate findings from a conversation or reconcile a new plan with approved design, use [approved product evolution](references/approved-product-evolution.md): distinguish local decisions, transferable mechanisms, and evidence. Do not copy entire conversations, personal data, or one product's requirements into universal defaults.
