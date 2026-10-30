# Routing and coordination

The `forma` entry chooses and reads an internal specialist, which selects canonical references and executes its part. This document organizes decisions; it is not a plugin runtime. Paths in the main table are relative to the folder containing the coordinator's `SKILL.md`, never the project's current directory.

## Selection by intent

1. Preserve the request: explain, plan, audit or modify. Identify the concrete target, current state, platform, constraints and acceptance criteria. A document library, component library and code dependency are different targets.
2. Choose the specialist that resolves the primary question. Read its `SKILL.md` through the available access mechanism. Do not consider a skill executed because its name appears in the response.
3. Within it, open only the references matching the case. A spacing problem does not require complete color theory; an approved cover does not require restarting product research.
4. If a second independent question arises, add the appropriate specialist and provide the context already resolved. Do not restart the brief, stack, identity or tokens at every handoff. A broad request may involve several specialists; a local adjustment usually needs only one.
5. Keep design responsibilities in Forma. Select an available execution capability only for a concrete gap and check its operating requirements. A missing tool does not authorize claiming its use, replacing the approved mechanism or stopping independent work.
6. Execute what is authorized, verify it in the target and deliver. Stop when the defined acceptance criteria are satisfied; for a relevant gap, investigate or state the specific blocker. Selecting the module does not complete an implementation request.

## Proportionate routes

| Request | Primary | Conditional support and acceptance |
|---|---|---|
| Fix a gap, padding or alignment in an existing component | Foundations | Inspect styles/boxes and change locally; interface only if composition/state problems extend beyond geometry |
| Reapply a clean background, sidebar, buttons and fields | Interface | Foundations if tokens/relationships need adaptation; connect actual components and routes, without imposing 3D or a pool editor |
| Theme editor with pools, grain, context and save/reopen | Interface | Foundations for the color pipeline; motion only for gesture/transition; test drafts, persistence and discard. The contract requires implementation; the theme demo is insufficient |
| Reuse an approved book or passport in another project | 3D objects | Select the approved implementation for that object; preserve its mechanism, framing, materials, loader and lifecycle. Use Forma Reference only for an unresolved question; test the primary renderer and fallback separately |
| Apply the refinement method to a mascot, package or another object | 3D objects | Transfer the investigation, layer map, frozen criteria and comparison cycle. Build or adapt the geometry/materials/behavior for the new object; BookObject and NeuronPassport are specialized implementations, not generic 3D models |
| Profile with fields, privacy and a 3D card | Interface | 3D objects handles explicitly requested volume; product only if the flow/rule is undefined; a card does not replace a form or semantic identity |
| Graph with backlinks, colors and zoom | Graphs and data | Foundations for visual encoding; motion for a gesture with a concrete problem. Edges need provenance and identity; provide an equivalent list and accessible commands |
| New product with an undefined journey | Product | Then interface; foundations for the visual system; platforms for specific behavior. Resolve the task before detailing screens |
| Web sidebar that needs to work with touch | Interface | Platforms for gesture, navigation or native-behavior decisions. Do not open an entire multiplatform research process merely because of the word mobile |
| Audit without editing | Validation | Consult the corresponding domain to interpret evidence; deliver findings and the smallest proposed correction without editing the target |
| Discover technology or explain a reference discrepancy | Forma Reference | Domain specialist according to the cause. Record source/version and observed versus inferred; a screenshot does not prove a library or shader |
| Select and study sites to create/refine a destination site | References during research; interface or brand during implementation, according to the task | [Website coordination](experience-library.md#coordinate-reference-sites-and-the-destination-site): bounded questions, coherent synthesis, transfer to specialists and validation in the destination. Research does not complete creation; a catalog does not execute visits |
| Design source to code or a component library | Handoff and artifacts | Interface/foundations according to integration; available canvas/source inspection, actual IDs and rendering. If the connection is missing, define what can progress locally |
| Campaign, identity or marketing landing page | Brand and communication | Handoff for format/editing; default purposeful motion for new interactive pages; additional expressive effects and 3D only when requested or justified by the message; a provider suited to the artifact |
| Clean PDF guide with cards, comparisons and short copy | Brand | [Clear PDF guide](clear-pdf-guides.md); Foundations for hierarchy/spacing and Handoff for export. Preserve consumer branding and required content; inspect the actual PDF, not only HTML |
| Film, teaser or animated deck delivered as a file | Motion | [Time-based production](motion.md#films-and-rendered-sequences); brand for message/identity and handoff when export needs support. Distinguish seek-based rendering from interface interaction; a local correction does not restart an approved storyboard |
| Study a design agent or integrate its methods | References | Map the source, methods, checkers and runtime; [coordinated production](agent-production.md). Executable integration is a separate scope, with its own capability and tests |
| "How do I use this system?" | No product execution | Explain with a concrete example and a single invocation; references may be consulted, but do not infer permission to create or edit an app |

The names above correspond to the coordinator's table. The identifiers are `forma-foundations`, `forma-interface`, `forma-product`, `forma-objects-3d`, `forma-graphs-data`, `forma-motion`, `forma-platforms`, `forma-brand`, `forma-reference`, `forma-validation` and `forma-handoff`. Use a specialist directly when announced in the catalog; `$forma:forma` is the coordinating entry and also works when the host does not discover nested modules. Inside the package, module references use `../../references/`. Do not add absolute versioned plugin paths to the portable contract.

## One shared contract

For a useful specialist handoff or delegation, pass only:

- the objective and authorized type of intervention;
- target, stack, platform and observed source/revision;
- approved decisions, mechanism to preserve and limits;
- the unresolved question and owned files when editing;
- expected output, acceptance criterion and available or pending proof.

The coordinator integrates the responses. Specialists do not reload the coordinator or call each other in a cycle. They may identify a gap; the coordinator decides whether another module is needed. Reuse evidence that remains valid and revalidate what changed. If two modules disagree, apply [precedence](conflicts.md) and target evidence without combining incompatible rules.

Before declaring completion, collect and check every necessary subtask against the acceptance criteria and current revision. An accepted dispatch or running process is not an integrated result. If a subtask fails, recover the work possible or record the gap; do not hide pending work in a global completion claim. Cancel work that is no longer useful only through an actually available mechanism, and do not confuse a cancellation request with confirmed termination.

## Internal ownership and execution cost

The coordinator keeps each design responsibility inside Forma: token inconsistency -> Foundations; reproducible UI defect -> Interface and Validation; interrupted gesture -> Motion; editable design source -> Handoff; unknown artifact mechanism -> Reference. Use the [tool capability contract](integrations.md) only to execute the chosen method. Do not delegate the design method to another plugin or require an external skill to finish a Forma route.

Local reading, an authorized helper, a connected tool and paid generation are different actions. Discover available capabilities rather than copying another plugin's resolvers. Load references progressively and report what was actually consulted or executed. If a needed capability is unavailable, state the affected criterion and continue independent work. A substitution that changes a central requirement needs resolution before the dependent work.

## Validating coordination itself

Use the [routing scenarios](../evals/routing-scenarios.md) when changing the coordinator or modules. First give the evaluator only the request and skill entry; then judge the observed decisions. Valid links prove navigability, not correct selection, UI execution or visual quality.
