# Forma authorship and dependencies

Version 1.26 replaces the imported reference catalog with patterns written for Forma's own components, examples and implementation contracts. This is a content replacement, not a renamed copy. The local selector, shared browser matcher, media tools and validators remain Forma implementations.

## What belongs to Forma

The coordinator, specialists, project-specific synthesis, procedural BookObject implementation, clean-shell example, validation scripts and library tools are maintained in `source/forma`. Pattern entries describe an actual local resource, an applicable task, adaptation limits and checks. They do not pretend to be fresh audits of external websites or ready-made components when only a contract is available.

The contributor procedure is [authorship and incorporation](../source/forma/references/authorship.md). The operating catalog contains only Forma-authored entries; current external websites can still be researched with the assistant's browser. Project research does not automatically become a public catalog entry.

The replacement preserves coordination, contextual reference research, project-specific direction, color and spatial reasoning, the separation of marketing and operational screens, motion and material refinement, and rendered critique. Their [continuity map](../source/forma/references/authorship.md#preservar-capacidades-ao-tornar-o-conteúdo-próprio) points to the Forma contracts that own each capability. Independent content does not mean discarding what was learned or claiming to have invented established methods.

## What remains external

| Item | Boundary |
|---|---|
| General design principles, standards and recorded observations | Sources remain identified. Independent code does not imply that Forma invented every visual parameter or mathematical method. |
| Three.js | Development dependency for checks; optional compatible loader supplied by a consumer using BookObject volume. Not embedded in the plugin. |
| Manrope | Licensed font used by the repository cover, including its SVG font data. Its OFL remains in `docs/assets/fonts/`. It is not a Forma-designed typeface. |
| Media services and assets | Optional network sources with their own author/license. The helper is Forma code; downloaded media is not. |
| Optional plugins and host tools | Available capabilities, not imported runtimes or requirements for ordinary local work. |

The scoped file audit found the imported catalog and licensed cover font; it did not identify another bundled third-party skill runtime. This is not an exhaustive similarity comparison against every published source. The approved visual mechanisms were preserved rather than redesigned to claim novelty.

## Migration from 1.25

Imported website IDs and their origin filter are no longer part of the current library. Use `references.mjs --list` to discover the Forma IDs and filters. The eight existing Forma resource IDs are preserved. New boards use `schemaVersion: 2` and `catalogSchemaVersion: 2` for the pattern record contract. Recreate a board when its result needs to reflect this version; an old board remains a historical file and is not silently rewritten.

The prior research and test records remain in [release history](REFERENCE-HISTORY.md), outside the installed skill. Applicable notices remain in [third-party notices](../source/forma/THIRD_PARTY_NOTICES.md). Names in attribution/history do not imply endorsement or an operational dependency.

## Validation

See the release PR for executed package and browser checks. The test suite checks resource paths, declared evidence boundaries, retrieval, filters, CLI output and distribution consistency. It cannot certify artistic originality, authorship of all outside knowledge or the quality of every future design.
