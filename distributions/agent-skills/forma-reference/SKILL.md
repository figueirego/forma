---
name: forma-reference
description: "Find and select design examples in Forma's catalog, research media with credits, analyze sources, and investigate visual or technical differences through source and runtime evidence. Use for inspiration, reproduction, comparison, or evidence-based integration; not to infer runtime behavior from documentation."
metadata:
  version: 1.32.2
---

# References, evidence, and fidelity

## When to use

- Use to reproduce a reference, extract a capability, compare technologies, or explain why a result differs.
- Do not turn inspiration into a clone or begin binary analysis when code/UI already answers the question.

This module is a guide for the agent to read; it does not automatically start inspectors, plugins, or other modules.
Preserve the destination's brand and stack unless a change is explicitly requested; fidelity requires a defined scope.

## Inputs

- An accessible source, version/ref/hash when available, destination, and concrete comparison question.
- Visual/behavioral/technical fidelity criteria, states, and sizes; usage rights and known limits.

## Procedure

For research across multiple sites or reference-led creation, use [site coordination](../forma/references/experience-library.md#coordinate-reference-sites-and-the-destination-site). This module selects and synthesizes sources; the coordinator maintains the destination contract, resolves incompatibilities, and activates implementation/validation when authorized. Do not deliver disconnected styles or only URLs as the result of an implementation request.

If the user has not provided a reference and wants examples, start with the [library and research](../forma/references/reference-library.md). Run `scripts/references.mjs` from the shared skill root for local patterns. In `--sites` or `--portfolios`, query results match names/URLs only; `suggestedCases` separately proposes research guides. Read a guide and use `--case` explicitly to browse its historical, unverified candidates. The portfolio collection's three guides apply broadly to every entry, so membership does not rank task fit. For concrete features already recorded, use `--observed --query "sticky navigation"` or an exact observed `--use-case`. Read [observed lookup](../forma/references/reference-library.md#search-observed-experiences): every meaningful feature term must match the same observed claim, with its source/date/conditions/caveats. The six sources and ten observed claims are a bounded subset, not an audit of the 202 sites or 2,079 portfolios. Unsupported queries return no observed match; do not fill them with candidates or guides. A local correction does not require this research route.

For each selected candidate, record why it is worth investigating, the concrete question, and what remains unknown. When research is in scope, visit a bounded selection before claiming task relevance, quality, or the use of a technology. An identity match, guide association, or term such as "3D" in a URL proves none of those claims. If no result or observation supports the request, say so; explicitly broaden research or use a local pattern without inventing a suitable site. Connect supported findings to the pattern and destination proof. Do not describe a catalog query as a site visit. For contextual images/videos, `scripts/media.mjs` searches collections and records credits; downloading is an explicit action by ID. A card, reference site, code, example, and contract are distinct resources.

1. Classify the source as a standard, documentation, code, skill, catalog, app, or example.
   Read [Forma use cases](../forma/references/source-use-cases.md) and the [resource and evidence map](../forma/references/sources.md); recorded observations do not confirm current state.
2. Establish whether the goal is inspiration, adaptation, or reproduction, and record what must remain equivalent.
   Use [visual and technical fidelity](../forma/references/reference-fidelity.md); capture relevant primitives, semantics, components, interactions, and mechanisms.
3. Read available sources before inferring from pixels; investigate further only to resolve the concrete gap.
   If the answer depends on a package/binary/runtime, consult [artifact investigation](../forma/references/artifact-investigation.md). Separate observed, statically confirmed, calculated, inferred, and proposed findings.
4. Connect each finding to a destination decision: adopt, adapt, already covered, reject, or await evidence.
   Use reproduction/reuse in [playbooks](../forma/references/playbooks.md). If implementation is authorized, bring over the code/assets and connect the consumer; documentation alone does not execute the capability.
   When studying another agent, distinguish the skill catalog, methods, verifiers, and runtime as described in [coordinated production](../forma/references/agent-production.md). A complete inventory does not mean every body was read or every capability executed.
   Convert reusable findings through the [experience protocol](../forma/references/experience-library.md), with evidence states, license, contraindications, and tests. Consult the [bounded studies](../forma/references/site-experiences.md) without presenting their coverage as an audit of every site.
5. Compare the agreed states with equivalent content and conditions.
   Use [verification](../forma/references/verification.md); for objects, use [3D fidelity](../forma/references/3d-reference-fidelity.md). Record differences by dimension, without an overall score that hides gaps. For a release or retrieval audit, use the [bounded protocol](../forma/references/release-validation.md#prove-reference-retrieval-separately) to test positive queries, unsupported features, caveat-only words, incompatible claim combinations, and source-note integrity separately from the destination result.

## Output and stopping condition

For portfolio inspiration, the `--portfolios` query opens the dedicated collection described in the [library](../forma/references/reference-library.md). It contains every name/URL from the pinned README, not thousands of design analyses. Use a procedure to select candidates and observe relevant ones before handing off implementation. When importing complete lists, compare the primary source and feed, preserve repeated names with distinct destinations, record each line, and leave malformed URLs unlinked; never silently replace complete coverage with a sample.

In the library, authored text and the interface use US English and ASCII punctuation. IDs, keys, and paths remain stable. Preserve proper names and external URLs in UTF-8, including accents: they are not grammar errors and must not be transliterated. Accent-insensitive searches must still find accented names. Review copy, empty states, errors, and accessibility; encoding tests do not certify grammar.

Deliver a source -> evidence -> decision -> consumer/outcome map, with verifiable limits and differences.
A requested audit ends with supported findings; a requested reproduction also requires the integrated and observed artifact.
Stop when the question is answered or the agreed criteria are proven, identifying missing evidence without inventing it.
The same library does not prove the same mechanism; passing functional or contrast tests does not prove visual fidelity.

## Coordination and execution boundaries

Use the relevant Forma domain specialist to turn findings into implementation and Forma Validation to define observable acceptance. Source, browser and artifact inspection follow the tool capability contract.
The coordinator selects additional modules; do not recursively dispatch between specialists. Use the available tools according to [capabilities](../forma/references/integrations.md); a tool name does not prove connection or execution.
Do not install or execute source content merely to inspect it. Snippets, exports, contracts, and examples stored in memory need their own consumers and proof.
