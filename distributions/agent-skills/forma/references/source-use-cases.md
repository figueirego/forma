# Forma use cases and coordination

Use this map to connect a design request, the responsible Forma skill, a concrete resource and an observable result. The [resource and evidence map](sources.md) identifies the implementation and validation records. Read only the contracts relevant to the task.

## Choose the owner

| Request | Primary Forma skill | Supporting contract | Completion evidence |
|---|---|---|---|
| Create a workspace with a sidebar and inset content surface | Interface | [Clean shell](clean-shell.md), [layout](layout-spatial-contracts.md) | Navigation, scrolling, focus and narrow-layout behavior observed in the destination |
| Make color, type, spacing and rounding coherent | Foundations | [Visual system](visual-system.md), [color refinement](color-refinement.md) | Shared tokens applied to actual components, with readable themes and relevant contrast checks |
| Add profile, theme and appearance controls | Interface | [Settings](settings-modes.md), [components](reusable-components.md) | Open, edit, cancel/save and reopen; saved state survives the host's persistence boundary |
| Refine a book, passport, mascot or product object | Objects 3D | [Reusable objects](reusable-objects.md), [3D fidelity](3d-reference-fidelity.md) | Comparable rendered views, gestures, material response and responsive behavior |
| Build graphs, maps or dashboards | Graphs & Data | [Data dashboards](data-dashboards.md) | Correct data meaning, useful exploration, readable controls and relevant empty/error states |
| Add theme transitions, hover and scroll effects | Motion | [Motion](motion.md) | Before, intermediate and settled states; interruption, keyboard/touch and reduced-motion alternatives |
| Define journeys, onboarding and product scope | Product | [Playbooks](playbooks.md) | A concrete task, state sequence, assumptions and the agreed result |
| Adapt an interface to web, mobile or desktop | Platforms | [Platform guidance](platform-adapters.md) | Destination-specific input, layout and lifecycle behavior tested within available access |
| Create a landing page, portfolio or campaign | Brand | [Directions](design-directions.md), [brand and marketing](brand-marketing.md) | A coherent message, truthful content, clear action and appropriate visual treatment |
| Create a clean PDF guide with cards and comparison tables | Brand | [Clear PDF guide](clear-pdf-guides.md), [artifact workflows](artifact-workflows.md) | Exported PDF inspected page by page, with text, breaks and content fidelity checked; Foundations supports layout and Handoff supports export |
| Find useful examples among sites and portfolios | Reference | [Library](reference-library.md), [experience protocol](experience-library.md) | Relevant observed findings connected to a Forma decision and destination task |
| Audit or repair a visual regression | Validation | [Rendered validation](rendered-validation.md), [verification](verification.md) | Reproduced finding, bounded cause, relevant correction and observed result |
| Deliver editable assets or synchronize design and code | Handoff | [Artifact workflows](artifact-workflows.md), [tokens and handoff](tokens-handoff.md) | Saved source, verified export and consumer integration, with editability limits stated |

## Coordinate related work

1. The coordinator identifies the destination, requested result and approved decisions.
2. The primary skill owns the implementation question. Add a supporting specialist only for a distinct unresolved need.
3. Share one visual foundation: palette roles, themes, spacing, type, radius and icons. Motion is standard for new interactive surfaces; 3D is conditional on the brief.
4. Keep findings connected to the consumer. Resolve conflicting recommendations before implementation.
5. Verify the actual resource revision, interaction and rendered result. Report what changed and what remains unobserved.

A local defect stays local. An implementation request continues through integration and verification; a research-only request ends with its supported findings. Follow [routing](routing.md) and the [workflow](workflow.md).

## Use sites and portfolios

Start with an original Forma pattern when the package already covers the mechanism. Use candidate sites or portfolios when the task needs contextual examples. Use the observed collection for recorded features, reading the date, conditions and caveats.

For each investigated site, connect:

`question -> source identity -> observation -> decision -> Forma owner -> consumer check`

Record adopt, adapt, already covered, reject or pending evidence. Candidate membership and guide assignment do not prove that a feature exists on a live site. A captured example does not authorize copying its assets or branding.

| Case | Research question | Forma application |
|---|---|---|
| Portfolio introduction | How do biography, work and contact remain clear at different widths? | Brand defines content hierarchy; Interface implements navigation; Validation checks access and reflow |
| Project presentation | What evidence supports the work, and how can the visitor explore it? | Brand structures the case; Motion supports selection; Reference records what was observed |
| Marketing page | How do sections connect an audience need, claim, evidence and action? | Brand selects a direction; Foundations keeps the visual system consistent; Interface connects the action |
| Operational workspace | How are navigation, content and contextual controls separated without losing task context? | Interface applies the clean shell and real task states; Foundations checks spatial relationships |
| Expressive product or object | Which geometry, material or gesture produces the intended effect? | Objects 3D investigates layers; Motion verifies transitions; Validation compares controlled states |

## Refinement and reuse

Preserve an approved mechanism when reproduction is requested. For the closed book, use the complete [book integration](book-integration.md). For the articulated passport and lighting editor, use the [executable components](reusable-components.md). A new brand or data adapter does not justify replacing their distinguishing behavior.

For a different object or interface, transfer the method rather than assuming identical implementation: inspect layers, freeze criteria, reproduce the mismatch, change its cause and compare the result. Maintain the destination's brand, data, stack and approved decisions.
