# REA: design-oriented reverse engineering

Use when a question depends on an existing application or artifact and cannot be answered adequately through available code, UI, documentation or captures. Do not analyze binaries merely because an EXE/DMG appears in the request.

## Complete repository or skill collection

Read sources directly, without starting binary engines or REA diagnostics as a ritual. Pin the repository/ref/commit, license and examined files. Reconstruct the `input -> normalization -> state -> effect -> persistence -> render/export` path only for relevant capabilities. A README describes intent; callsites demonstrate a static mechanism; existing tests count as executed only when they have been run. Record sparse-checkout limits, missing dependencies and partial coverage.

Classify the source as a catalog, instruction set, library, app or service before extracting principles. A link in a list does not verify the linked project. Do not execute installers, scripts or generated content merely to read the source. Separate conceptual adoption from code/asset reuse, which requires a compatible license. For syntheses from several references, use [source use cases](source-use-cases.md).

## Scope and operational safety

Define the authorized target and a concrete question: recover assets from an owned app, map menu states, understand a legacy flow, identify strings or verify technology. Use a working copy and record the path, hash, version, OS and architecture. Do not run an unknown installer to inspect its appearance.

Discover the appropriate REA tool and read its current schema. Examples observed in this session, whose availability must be checked when used:

- `inspect_artifact`: package graph and integrity; a compatible host may mount a DMG read-only. This is not equivalent to extraction or execution.
- `analyze_javascript_application`: inert ASAR/JavaScript analysis; `source_paths` selects exact inventoried files without implicitly including dependencies. `detail: summary` reduces the response, not the work.
- `inspect_analysis_view`: queries retained Evidence and its limitations; a complete view of partial results is not a complete target analysis.
- `inspect_managed_artifact`: PE/CLI metadata without loading the code.
- `inspect_electron_page`: passive inspection of a local Electron page with an explicitly resolved endpoint/target.
- `trace_native_ui_action`: relationships for a specific native action; it does not prove actual execution.

Do not invent target IDs, addresses, commands, functions or capabilities. Static analysis may have partial coverage; preserving that limit is part of the result.

## Evidence workflow

1. Classify the artifact and identity; check integrity and reported limits.
2. Make the smallest query that answers the question: resources, strings, a UI connection, class or specific bundle.
3. Record origin/location, version/hash, evidence ID when returned, authority and limitation.
4. Separate what is **observed** in the artifact, **derived** through analysis and **inferred** by the analyst.
5. If runtime behavior is required, use an authorized test environment, fictional data and observable interaction. For an unknown binary, require explicit authorization for dynamic execution and appropriate isolation, without access to host credentials or personal data. Instrumentation or execution is a separate step from reading.
6. Translate the result into a design requirement: state, label, navigation, resource, dependency or gap. Extract/reuse assets only within applicable rights and scope.

## Conclusion boundaries

A string may be dead code; a button may never appear; a static handler may depend on a feature flag. A screenshot does not confirm accessibility, latency or authorization. An intact package does not prove a trustworthy signature or the absence of malware.

Do not bypass licensing, DRM, authentication or security measures as a design step. Do not expose secrets found in resources. Record sensitive data as a redacted finding and restrict its circulation.

Deliver the target, question, evidence, bounded flow reconstruction, remaining hypotheses and the method needed to validate them. Do not claim complete equivalence between a reproduction and the original without sufficient behavioral coverage.

## Evidence-to-requirement example

**Observed:** a "Try again" string in a bundle resource, with location/hash recorded. **Not observed:** the screen, condition or click effect. **Hypothesis:** some state is recoverable. **Next query:** the resource reference and relationship to an action within provider coverage. **Validation:** trigger the failure in an authorized test. **Provisional requirement:** investigate recovery; do not invent a retry button on the login screen.

Record `evidence -> demonstrated relationship -> hypothesis -> test -> decision` to avoid turning plausibility into fact.

## Updatable packages and responsibility tracing

Record the installer/bootstrap version, available updated package and session-displayed version separately. In the audited Obsidian, bootstrap 1.12.7, session 1.13.4 and package 1.14.5 on disk coexisted. A newer file does not prove execution. Avoid restarting/updating the target during measurement merely to simplify identity.

For graphs, trace parser -> resolution/index -> projection -> simulation -> position transport -> drawing/picking. Associate each stage with its callsite and responsibility; available package, preferred path, fallback and actually active backend are distinct evidence. Consult [graphs and knowledge](knowledge-graphs.md).

For minified files, retain the file hash and UTF-8 byte offset (or declare another unit), not a megabyte-long line. Inspect bounded excerpts. Do not run extracted vendor code to find symbols.

A provider timeout must preserve partial Evidence; a retry must follow remediation and change the relevant parameter. Do not interpret zero findings from interrupted analysis as absence of the capability. An integrity mismatch requires recording the contradiction; continuing static reading of untrusted bytes, where supported, does not mean accepting integrity or executing the package. Export the required evidence before closing the target.
