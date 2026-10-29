> Archived release evidence. Version 1.26 replaces the imported catalog with Forma-authored patterns; see [current authorship boundaries](ORIGINALITY.md). Counts and checks below describe the earlier releases only.

# Reference research history — Forma 1.24–1.25

The first sections below record the 1.24 methods-only release. Version 1.25 adds the executable reference and media library described at the end; the earlier runtime exclusions are historical.

This change adapts design methods from Taste Skill 2.1.5, pinned to commit `12af471f627f866411b4bd785b19646d3672784c`. The [source-to-decision map](history/frontend-reference-study-2026-10-28.md) records coverage, licensing, adopted principles, rejected defaults, and runtime limitations.

## What changed

Existing specialists now distinguish a marketing page, an operational app, and an app fragment inside a marketing page. Direction starts with project-specific facts and available material. Sections connect a question, a claim, evidence, content, and an action. The review loop checks substance as well as styling, consistent data, served build output, and intermediate scroll states.

No new dependency, browser driver, chart library, image downloader, style catalog, or runtime is bundled. Approved appearance controls, clean-shell code, and BookObject assets are unchanged. Existing brand, domain calculations, accessibility, and the requested scope take precedence over the source's stylistic preferences.

## Verification performed

On 2026-10-28:

- `npm ci --ignore-scripts`, `python3 tools/build.py`, and `npm run check` completed successfully.
- 72 source Python tests, 34 builder/installer tests, and 50 Node tests passed; Node reported no skips.
- Source, Codex, Claude Code, and portable Agent Skills package checks passed. All 388 generated files matched their canonical source.
- An independent source review found no material defect. Its wording correction about the upstream video's conditional requirement was applied.

## Decision exercises

Two fresh evaluator contexts read the generated Codex and portable Agent Skills packages. Each received four hypothetical requests, with no consumer project and without reading the expected-answer rubrics or the study map. The maintainer agent assessed their responses against R32–R39 after collection.

| Case | Observed decision | Assessment |
|---|---|---|
| Restoration-workshop landing | Used authorized before/process/after material and a real quote-request destination; did not invent testimonials | Consistent with R32 |
| Approved financial dashboard | Preserved violet, borders, tables, and accounting rules; proposed local legibility checks | Consistent with R33 |
| Software landing with product fragments | Reused real components and one labeled demonstration dataset across calendar and metrics | Consistent with R34 |
| Approved type-only editorial page | Kept the direction without adding image or video quotas | Consistent with R35 |
| Local Vue spacing defect | Inspected the responsible layout rule and kept the change local | Consistent with R36 |
| Failed scroll observer | Proposed visible static content, recovery after initialization failure, reverse-scroll and reduced-motion checks | Consistent with R37 |
| Displayed financial rounding mismatch | Preserved authoritative calculation; proposed a verified rounding explanation instead of changing values | Consistent with R38 |
| Scanner passed, page became thin | Restored necessary content and reviewed the whole composition rather than accepting zero alerts | Consistent with R39 |

These are eight decision simulations, not eight implemented or browser-tested products. The evaluators knew the task conditions; this was not a statistically controlled, blinded comparison against the previous Forma version. No user study, conversion gain, screenshot quality improvement, or universal reliability claim follows from these results. Actual consumer implementation and rendered verification remain necessary.

The independent upstream checks and their omissions are recorded separately in the source map. They are not included in the 156 Forma tests above.

## Reference library — 1.25.0

The package now includes all 202 reference records from the pinned Taste snapshot, preserving the original fields and MIT attribution, plus eight Forma records linking existing components, examples and implementation contracts. External records are historical study notes, not newly visited sites or rights to their assets. Every record declares its evidence and limitations; none invents a live screenshot.

An original dependency-free CLI selects references by explicit context and lexical PT/EN aliases. The browser catalog shares the same ranking module. Both preserve relevant results rather than ranking by the source's subjective aesthetic scores. Boards are written to new files only. Existing approved identity, appearance mechanisms and product rules take precedence over inspiration.

The media CLI searches Openverse, Wikimedia Commons, Art Institute of Chicago and Met, with video search through Commons. Downloads require a selected manifest ID, validate public HTTPS destinations and file types, enforce size/time limits, and save an individual credit receipt with a SHA-256 hash. Contradictory or unsupported licenses are rejected. Provider metadata still requires review for the intended use; local receipts do not replace visible attribution.

Verification performed on 2026-10-29 UTC:

- Required install, build and checks passed: 72 Python source tests, 34 builder/installer tests and 81 Node tests, with no Node skips. The 31 new runtime tests cover retrieval and media behavior, including the review regressions.
- All 421 generated files matched source. Catalog lookup and media help ran from an unrelated working directory in source, Codex, Claude Code and portable Agent Skills packages; catalog hashes matched.
- Live image queries succeeded for all four providers after the strict-license fix. A selected AIC image downloaded with its credit receipt; Commons video search returned a licensed video. These are smoke checks, not exhaustive provider or video-download validation.
- Browser checks covered context/origin filters, Portuguese retrieval, an empty result, pagination, detail dialogs, Escape and focus return. Actual measured CSS viewports were 1440×900 and 480×844, with no horizontal overflow in the checked list/dialog states. This is a responsive browser check, not a physical-phone test.
- Independent review found and resolved two defects: browser/CLI retrieval divergence and permissive handling of contradictory license metadata. Valid Commons, AIC and Met responses were checked again after the fix.

No additional model, embedding service, autonomous crawler or browser driver is installed. Current-site observation uses the host's available browser and the [documented evidence workflow](../source/forma/references/reference-library.md). This release does not claim that all 202 live sites were re-audited, that every contract is a ready component, or that reference retrieval guarantees design quality.
