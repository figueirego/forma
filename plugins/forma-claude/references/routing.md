# Routing and coordination

The `forma` entry chooses and reads an internal specialist, which selects canonical references and executes its part. This document organizes decisions; it is not a plugin runtime. Paths in the main table are relative to the folder containing the coordinator's `SKILL.md`, never the project's current directory.

## Selection by intent

1. Preserve the request: explain, plan, audit or modify. Identify the concrete target, current state, platform, constraints and acceptance criteria. A document library, Figma library and code dependency are different targets.
2. Choose the specialist that resolves the primary question. Read its `SKILL.md` through the available access mechanism. Do not consider a skill executed because its name appears in the response.
3. Within it, open only the references matching the case. A spacing problem does not require complete color theory; an approved cover does not require restarting product research.
4. If a second independent question arises, add the appropriate specialist and provide the context already resolved. Do not restart the brief, stack, identity or tokens at every handoff. A broad request may involve several specialists; a local adjustment usually needs only one.
5. Use external support when the user requests it or when it resolves a concrete gap. Check the current catalog/file/capability and read the operating instructions. A missing tool does not authorize claiming its use, silently replacing the requested mechanism or stopping independent work.
6. Execute what is authorized, verify it in the target and deliver. Stop when the defined acceptance criteria are satisfied; for a relevant gap, investigate or state the specific blocker. Selecting the module does not complete an implementation request.

## Proportionate routes

| Request | Primary | Conditional support and acceptance |
|---|---|---|
| Fix a gap, padding or alignment in an existing component | Foundations | Inspect styles/boxes and change locally; interface only if composition/state problems extend beyond geometry |
| Reapply a clean background, sidebar, buttons and fields | Interface | Foundations if tokens/relationships need adaptation; connect actual components and routes, without imposing 3D or a pool editor |
| Theme editor with pools, grain, context and save/reopen | Interface | Foundations for the color pipeline; motion only for gesture/transition; test drafts, persistence and discard. The contract requires implementation; the theme demo is insufficient |
| Adapt an approved book into a 3D passport | 3D objects | Read the contract and available asset; adapt data/materials while keeping the mechanism, loader and lifecycle. Reference/REA only for an unknown to investigate; test loaded volume and fallback separately |
| Profile with fields, privacy and a 3D card | Interface | 3D objects handles explicitly requested volume; product only if the flow/rule is undefined; a card does not replace a form or semantic identity |
| Graph with backlinks, colors and zoom | Graphs and data | Foundations for visual encoding; motion for a gesture with a concrete problem. Edges need provenance and identity; provide an equivalent list and accessible commands |
| New product with an undefined journey | Product | Then interface; foundations for the visual system; platforms for specific behavior. Resolve the task before detailing screens |
| Web sidebar that needs to work with touch | Interface | Platforms for gesture, navigation or native-behavior decisions. Do not open an entire multiplatform research process merely because of the word mobile |
| Audit without editing | Validation | Consult the corresponding domain to interpret evidence; deliver findings and the smallest proposed correction without editing the target |
| Discover technology or explain a reference discrepancy | References and REA | Domain specialist according to the cause. Record source/version and observed versus inferred; a screenshot does not prove a library or shader |
| Select and study sites to create/refine a destination site | References during research; interface or brand during implementation, according to the task | [Website coordination](experience-library.md#coordinate-reference-sites-and-the-destination-site): bounded questions, coherent synthesis, transfer to specialists and validation in the destination. Research does not complete creation; a catalog does not execute visits |
| Figma to code or a component library | Handoff and artifacts | Interface/foundations according to integration; appropriate Figma tool/skill, actual IDs and rendering. If the connection is missing, define what can progress locally |
| Campaign, identity or marketing landing page | Brand and communication | Handoff for format/editing; motion or 3D only when requested or justified by the message; a provider suited to the artifact |
| Film, teaser or animated deck delivered as a file | Motion | [Time-based production](motion.md#films-and-rendered-sequences); brand for message/identity and handoff when export needs support. Distinguish seek-based rendering from interface interaction; a local correction does not restart an approved storyboard |
| Study a design agent or integrate its methods | References | Map the source, methods, checkers and runtime; [coordinated production](agent-production.md). Executable integration is a separate scope, with its own capability and tests |
| "How do I use this system?" | No product execution | Explain with a concrete example and a single invocation; references may be consulted, but do not infer permission to create or edit an app |

The names above correspond to the coordinator's table. The identifiers are `forma-foundations`, `forma-interface`, `forma-product`, `forma-objects-3d`, `forma-graphs-data`, `forma-motion`, `forma-platforms`, `forma-brand`, `forma-reference`, `forma-validation` and `forma-handoff`. Use a specialist directly when announced in the catalog; `/forma:forma` is the coordinating entry and also works when the host does not discover nested modules. Inside the package, module references use `../../references/`. Do not add absolute versioned plugin paths to the portable contract.

## One shared contract

For a useful specialist handoff or delegation, pass only:

- the objective and authorized type of intervention;
- target, stack, platform and observed source/revision;
- approved decisions, mechanism to preserve and limits;
- the unresolved question and owned files when editing;
- expected output, acceptance criterion and available or pending proof.

The coordinator integrates the responses. Specialists do not reload the coordinator or call each other in a cycle. They may identify a gap; the coordinator decides whether another module is needed. Reuse evidence that remains valid and revalidate what changed. If two modules disagree, apply [precedence](conflicts.md) and target evidence without combining incompatible rules.

Before declaring completion, collect and check every necessary subtask against the acceptance criteria and current revision. An accepted dispatch or running process is not an integrated result. If a subtask fails, recover the work possible or record the gap; do not hide pending work in a global completion claim. Cancel work that is no longer useful only through an actually available mechanism, and do not confuse a cancellation request with confirmed termination.

## External support and cost

Consult [integrations](integrations.md) according to the question, not the tool's prestige. Example: inconsistency between tokens and components -> ECC `design-system`; reproducible browser bug -> ECC `browser-qa`; interrupted gesture -> motion skill; implementation based on a Figma file -> appropriate Figma skill.

If the user names ECC or another skill, include that support in the work, read the relevant operational source and follow its boundaries. Do not turn a preference for few skills into a reason to ignore an explicit instruction. If unavailable, report the limitation and proceed only with independent work; a substitution that changes a central requirement requires clarifying the decision.

Local reading, a subagent, a connected tool and paid generation are different actions. Do not install or spend by default. Do not copy another plugin's cache resolvers: the current installation and session catalog take precedence. Load references progressively and briefly record what was actually consulted or executed.

## Validating coordination itself

Use the [routing scenarios](../evals/routing-scenarios.md) when changing the coordinator or modules. First give the evaluator only the request and skill entry; then judge the observed decisions. Valid links prove navigability, not correct selection, UI execution or visual quality.
