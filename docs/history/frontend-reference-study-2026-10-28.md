> Historical research record for releases 1.24-1.25. The imported catalog was removed in 1.26. This file is outside the installed skill and is not its operating guide.

# Taste: map of principles, mechanisms and limits

Read this to maintain the integration, choose external support or trace a rule. To execute design work, use the canonical references indicated below; do not load the entire audit by default.

## Identity and method

- Source: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), plugin **2.1.5**, snapshot [12af471f627f866411b4bd785b19646d3672784c](https://github.com/Leonxlnx/taste-skill/tree/12af471f627f866411b4bd785b19646d3672784c), consulted on 2026-10-28.
- Skill published in the snapshot: `design-taste-frontend`, at `skills/taste-skill/SKILL.md`. Do not confuse it with older versions of the same name installed locally; the classic sets moved to other repositories, not audited in this round.
- Method: ECC `research-ops` for sources/limits, `design-system` for overlap and `skill-stocktake` for utility/scope; REA v49 directs normal source analysis for a complete repository. No binary engine execution or app instrumentation was necessary.
- Coverage: entry, design references, library inventory, script/helper/asset implementation and test/distribution configuration. Mapping by family and mechanism; this is not visual inspection of cataloged sites or complete reproduction of the author's experiments.
- Code/documentation license: MIT, Copyright (c) 2026 Leonxlnx. Forma 1.24 incorporated a contextualized synthesis. Version 1.25 adds the 202 site-catalog records with provenance and original lookup/media utilities; it does not include the Taste runtime, photographs, branding or screenshots. Notice preserved in [attributions](../../source/forma/THIRD_PARTY_NOTICES.md).

## Source -> decision -> use in Forma

Paths in the Source column are relative to the snapshot above. "Applied" describes incorporated instructions; it does not mean the capability was executed in every product.

| Source | Knowledge or mechanism | Decision and destination |
|---|---|---|
| `skills/taste-skill/SKILL.md`, sections Page or app / The run | Editorial pages, operational screens and app fragments have their own routes | **Applied:** [Brand](../../source/forma/skills/brand/SKILL.md) and [Interface](../../source/forma/skills/interface/SKILL.md); shared direction without applying a hero to a form |
| Entry, steps 1-4; `references/copy.md` | Specific inventory, evidence-based argument, concept and competitor-substitution test | **Adapted:** [directions](../../source/forma/references/design-directions.md#a-direction-rooted-in-the-project), [marketing](../../source/forma/references/brand-marketing.md#argument-content-and-demonstrated-interface), [record](../../source/forma/references/templates.md#direction-and-content-record); proportionate quantity, facts separate from proposals |
| `references/type.md`, `library/type.json` | Typographic roles, pairings, measurements, loaded fonts, wrapping and language | **Already covered/connected:** [visual system](../../source/forma/references/visual-system.md), [spatial contracts](../../source/forma/references/layout-spatial-contracts.md); two lines is a preference, not a normative limit |
| `references/colour.md`, `library/palettes.json` | Ground/ink/accent, field proportions and contrast | **Already covered:** [color](../../source/forma/references/color-refinement.md); preserve semantics, environment, object and approved themes without banning color families |
| `references/layout.md`, `library/heroes.json`, `library/sections.json` | Frame, margins, rhythm, completeness and composition adaptation | **Adapted:** [directions](../../source/forma/references/design-directions.md) and [rendered critique](../../source/forma/references/rendered-validation.md#critique-of-composition-and-substance); repeating layouts may be correct, emptiness may be intentional |
| `references/imagery.md`, `library/photos.json`, `scripts/assets.mjs` | Select, research, crop, credit and distinguish actual from contextual content | **Adapted:** [assets and argument](../../source/forma/references/brand-marketing.md); no quotas, automatic generation or acquisition; rights per asset |
| `references/app-screens.md`, `library/app.json`, `assets/app.css` | Inventory work/data, primary question, product/scope, shell, tables, states and mobile | **Adapted:** [Interface](../../source/forma/skills/interface/SKILL.md), [data](../../source/forma/references/data-dashboards.md), [clean foundation](../../source/forma/references/clean-shell.md); without imposing another product's tokens |
| `assets/charts.js` | SVG charts, series, nullability, units, legends and consistent marks | **Adapted as a contract:** [data](../../source/forma/references/data-dashboards.md); single source, domain rounding policy, delta meaning; library not embedded |
| `references/motion.md`, `library/motions.json` | Distinctive motion, feedback, continuity and reduced alternative | **Already covered:** [motion](../../source/forma/references/motion.md); no mandatory minimum of animated elements |
| `references/scenes.md`, `assets/scenes/stage.*`, `scripts/scenes.mjs` | Progress-driven scenes, fallback, inspection throughout scrolling | **Adapted:** [motion](../../source/forma/references/motion.md#scroll-linked-scenes); do not import dependencies, a promised catalog or a scene absent from the snapshot |
| `references/critique.md`, `references/tells.md` | Examine composition, substance and identity; prioritize corrections | **Adapted:** [rendered critique](../../source/forma/references/rendered-validation.md#critique-of-composition-and-substance); highest impact first without certification through aesthetic scores |
| `scripts/draw.mjs`, `scripts/lib/app-draw.mjs` and `library/directions.json` | Directions with seeds, asset constraints, history and re-presenting a choice | **Optional external support:** explore only if direction is open; record the choice and reason. Forma does not include Taste's style randomizer; version 1.25 offers contextual reference selection with optional seeds only for tie-breaking |
| `scripts/lint.mjs`, `scripts/inspect.mjs`, `scripts/lib/probe.mjs`, `scripts/lib/rules.mjs` | Source linting, DOM/CSS observations and viewport/scroll captures | **Adapted as a method:** [rendered validation](../../source/forma/references/rendered-validation.md); separate heuristics from defects and confirm the final served version |
| `scripts/lib/cdp.mjs`, `scripts/lib/inspection-files.mjs` | Isolated browser, temporary profile, collision-free filenames | **Not ported:** use host-supported tools; do not create a second driver unnecessarily |
| `references/research.md`, `library/sites.json`, `evals/evals.json` | Editorial study and baseline comparison by judges | **Site catalog incorporated in 1.25 with provenance, without inheriting results:** scenarios [R32-R39](../../source/forma/evals/routing-scenarios.md) and the existing protocol; model scores are not user testing |
| `assets/base.css`, `assets/base.js` | Initial reset/tokens/motion helpers | **Not copied:** Forma already has a foundation and contracts; preserve consumer styles/stack |
| `README.md`, `install.sh`, manifests, `.github/workflows/*`, `tests/*`, `examples/v2/*` | Installation, packages, checks and credited examples | **Mapped:** [operation](../../source/forma/references/plugin-operation.md) already separates discovery, package, agent and consumer; external installer and examples not executed/imported |

## What the code proves and does not prove

The snapshot inventory contains 20 directions, 56 palettes, 44 type entries, 58 heroes, 185 section compositions, 18 motions and 202 site records. `app.json` includes 7 styles, 5 shells and 25 patterns. These totals describe the upstream snapshot. Forma 1.25 distributes the 202 site records plus its original records, not the other direction/palette/type catalogs; no total guarantees quality.

The README describes a study of 247 sites; do not confuse that claimed sample with the distributed library's 202 records. The research explicitly states gallery selection, model evaluations and screenshot/WebGL limitations. The app study declares 23 desktop screens from 17 products, without mobile/loading/error screens and with limited settings coverage; private screenshots prevent full reproduction from the clone. Extrapolated rules are source heuristics.

`draw` filters options and uses seed/history; it does not verify final suitability for the client. `lint` uses text patterns; it does not interpret all CSS or decide quality. The inspector uses Node 22+ and a Chromium browser through CDP, inspects 1440/768/390 and produces measurements/captures; these widths are the source profile, not all devices supported by the product. It does not integrate a complete audit of keyboard, screen reader, composited contrast or reduced motion across all routes.

Rules include bans on gradients/shadows/monospace/purple and quotas for images/motion. The app chapter itself reports frequent violet use in the sample and identifies the ban as a preference. Forma does not inherit those gates: [conflicts](../../source/forma/references/conflicts.md) preserves branding, access, content and approved mechanisms. The inspector documents failure below 2.6:1, unlike the 4.5:1/3:1 goals in its prose, and does not calculate contrast over photographs. That threshold does not replace appropriate normative validation against actual backgrounds.

Scene documentation declares a study of 261 scenes/30 types but states that `library/scenes.json` has not yet been distributed; the file is absent from this snapshot. Those numbers are not available components. There is also a discrepancy between requiring entrances in every section in the entry and recommending only two or three in `references/motion.md`: Forma preserves task-based choice.

The stage uses GSAP/ScrollTrigger, with optional SplitText and Lenis. `charts.js` draws dependency-free SVG, but tooltips and operation require their own accessibility validation; an image role does not prove a sufficient alternative. Citing this study does not justify installing those libraries.

`assets.mjs` queries open collections and records credits. A returned license does not automatically verify all asset rights. Video downloads limit bytes during streaming; image downloads use `arrayBuffer()` without the same limit. If this mechanism is ported, define timeouts, cancellation and maximum size for images too; do not adopt unlimited downloads.

## Verification of this research

In the snapshot with Node 24.12.0: six tests for profile cleanup/ownership and screenshot names passed; encoding validation passed; thirteen JS/MJS files passed `node --check`. The frontmatter test was **not fully executed** because `yaml@2.6.1` was missing; that dependency was not installed. Browser execution, media search/download, scenes, installation and the ten agent cases in `evals/evals.json` were not executed.

Source CI exercises metadata, encoding, syntax and those six tests; it does not execute the ten design evals. Forma distribution tests and decision evaluations for the resulting version have their own receipts. None of the counts above proves that a new interface will be correct without execution and inspection in the consumer.

## Executable library - 1.25.0

The [current operational guide](../../source/forma/references/reference-library.md) already describes the original library in version 1.26. Historical 1.25 behavior is in the [delivery record](../REFERENCE-HISTORY.md#reference-library---1250). In that revision, external records were historical, with no included capture or presumed current visit; the original scripts did not inherit style bans, mandatory randomization, quotas or scores as approval.
