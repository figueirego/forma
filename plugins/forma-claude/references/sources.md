# Forma resources and evidence

Use this map to locate Forma's implementation, contracts, reference collections and validation records. Start with the user's task and inspect the relevant resource in the installed version. A resource entry establishes where to investigate; it does not establish that a consumer already implements or passes it.

## Skills and coordination

[Forma](../skills/forma/SKILL.md) coordinates eleven specialists. The [routing contract](routing.md) assigns ownership, resolves conflicts and keeps the destination's approved decisions consistent. The [workflow](workflow.md) connects the brief, implementation, observation and refinement. The [tool contract](integrations.md) describes execution capabilities available in the host.

| Task | Forma owner | Working reference |
|---|---|---|
| Design prompt refinement and cross-assistant continuation | Product | [Progressive brief](progressive-brief.md), [decision template](templates.md#progressive-brief), [decision scenarios](../evals/progressive-brief-scenarios.md) |
| Import references into a coherent visual contract | Reference, Foundations and Handoff | [Design specification](design-specification.md); reconcile evidence, decisions and consumers |
| Color, type, spacing, radius and icons | Foundations | [Visual system](visual-system.md), [color refinement](color-refinement.md), [layout](layout-spatial-contracts.md) |
| Navigation, controls, profiles and settings | Interface | [Clean shell](clean-shell.md), [settings](settings-modes.md), [components](reusable-components.md) |
| Journeys, scope and product decisions | Product | [Product research](product-research.md), [playbooks](playbooks.md) |
| Books, passports and other physical objects | Objects 3D | [Object integration](reusable-objects.md), [fidelity](3d-reference-fidelity.md) |
| Graphs, maps and data views | Graphs & Data | [Data and dashboards](data-dashboards.md) |
| Transitions, gestures and animation | Motion | [Motion](motion.md) |
| Web, mobile and desktop behavior | Platforms | [Platform guidance](platform-adapters.md) |
| Identity, campaigns and editorial pages | Brand | [Brand and marketing](brand-marketing.md), [directions](design-directions.md) |
| Sites, portfolios and fidelity investigation | Reference | [Library](reference-library.md), [experience protocol](experience-library.md) |
| Regression, accessibility and rendered acceptance | Validation | [Verification](verification.md), [rendered validation](rendered-validation.md) |
| Clean PDF guides, cards and comparison tables | Brand, with Foundations and Handoff | [Clear PDF guide](clear-pdf-guides.md), [print specimen](../assets/clear-pdf-guide.html) |
| Editable sources, exports and delivery | Handoff | [Artifact workflows](artifact-workflows.md), [tokens and handoff](tokens-handoff.md) |

## Approved component mechanisms

| Resource | Implementation and integration | Evidence to inspect |
|---|---|---|
| Closed book | [BookPreset integration](book-integration.md) preserves BookObject, font, stage, camera, lights, materials and reset behavior together | [Book refinement](book-polish-case-study.md) and [transfer receipt](../assets/audits/book-transfer-2026-10-29/manifest.json) |
| Articulated passport | [NeuronPassport](reusable-components.md#neuronpassport-integration) preserves the approved CSS mechanism and host adapters | [Passport refinement](passport-polish-case-study.md) and [source manifest](../assets/neuron-passport/source-manifest.json) |
| Appearance editor | [AppearanceEditor](reusable-components.md#appearanceeditor-integration) provides scoped UI, editable lights and save/cancel adapters | [Lighting contract](lighting-editors-icons.md) and [compact profile](../assets/reference-profiles/compact-appearance-v1.json) |
| Clean workspace | [Clean shell](clean-shell.md) provides the reusable sidebar, content surface and control foundation | Its runnable example and the [layout contract](layout-spatial-contracts.md) |
| Soft Glass visual kit | [Visual preset](soft-glass.md) links portable CSS, tokens, the complete landing and a design-only workspace | [Full landing](../assets/soft-glass/landing.html), [landing checks](../assets/soft-glass/landing-validation.json), [workspace specimen](../assets/soft-glass/preview.html) and [workspace checks](../assets/soft-glass/validation.json); presentation-only behavior |

For another object, transfer the investigation and refinement method. Choose geometry, materials and behavior appropriate to that object. Do not assume that a book engine is a general model of every physical product.

## Sites and portfolios

The [reference library](reference-library.md) keeps three kinds of knowledge separate:

- **Forma patterns:** authored implementation cases linked to resources, adaptation rules and checks.
- **Candidate sites and portfolios:** names and URLs to investigate. The website index contains 202 candidates; the portfolio index contains 2,079 entries. Their identities and source metadata remain in the indexes.
- **Observed experiences:** six sources with ten bounded claims. [Dated observations](site-experiences.md) record conditions, findings and unverified states. They do not establish current coverage of every destination.

Select by the concrete question, investigate a bounded set, resolve a design direction and connect the findings to the relevant Forma specialist. The [experience protocol](experience-library.md) defines that handoff. Selecting a reference is not the same as observing or implementing it.

## Evidence and maintenance

Keep these states distinct: documented contract, static code finding, runtime observation, inference, proposal and unverified behavior. Record the source identity, revision, conditions and limitations with each observation. Preserve genuine reference metadata and applicable asset notices.

For a correction, use the [refinement loop](rendered-validation.md): identify the mismatch, isolate its cause, change the relevant layer, compare under controlled conditions and verify the affected consumer. [Fidelity contracts](fidelity-contracts.md) freeze acceptance before reproduction work. A passing package test does not establish GPU, browser, device or interaction parity.

Use [release validation](release-validation.md) for distribution checks and [approved product evolution](approved-product-evolution.md) when adding reusable findings. Keep implementation, verification and publication status separate.
