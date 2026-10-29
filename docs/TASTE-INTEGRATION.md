# Taste integration — Forma 1.24.0

This change adapts design methods from Taste Skill 2.1.5, pinned to commit `12af471f627f866411b4bd785b19646d3672784c`. The [source-to-decision map](../source/forma/references/taste-study.md) records coverage, licensing, adopted principles, rejected defaults, and runtime limitations.

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
