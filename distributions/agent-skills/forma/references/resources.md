# Executable resources and contracts

In this distribution, `<forma-root>` is the `forma/` directory installed beside the specialists; it contains `references/`, `assets/`, `scripts/` and `tests/`. Resolve it relative to this file.

Consult this guide when reusing an asset or running a checker. Paths are relative to the installed skill's root, not a previous project's directory.

## Availability

**Executable lookup:** the [reference library](reference-library.md) includes a catalog with provenance, `scripts/references.mjs` for local selection and a [lookup page](../assets/reference-browser.html). `scripts/media.mjs` searches open collections and downloads only an explicitly selected result, with a receipt/credits and network/file limits. Local lookup requires Node 18+; media requires Node 22+ and network access. Implementation records and investigation guides are authored by Forma; the indexes of 202 websites and 2,079 portfolios preserve external names/URLs and provenance. Select the portfolio collection with `--portfolios`; malformed URLs are quarantined, and coverage has its own receipt. Guide associations are not current verification of the sites. Retrieved media retains external authorship and licensing. The guide describes commands, options, collection through the host browser and limits.

**Available portable code:** `BookObject`, the `assets/library-colors.js` color helper and the [clean interface foundation](clean-shell.md), with scoped CSS and a functional HTML/JS example. The foundation provides demonstrable composition and controls; routes, data and lifecycle must be integrated into the selected stack. **Contracts to implement:** the complete appearance and lighting editor and material profile. Do not confuse the example's theme with the pool editor. Reuse the project's existing components and implement only what is missing.

**Documented knowledge:** the [articulated passport](passport-polish-case-study.md), with a revision manifest and geometry/material/performance lessons. Passport code remains in the consumer and is not a new component exported by the skill.

Run commands using the absolute path of the folder where this skill is installed. The `check_*` scripts require only Python 3.9+, do not use the network and do not modify the project. Component regressions use Node; actual geometry uses the Three module supplied by the consumer:

- `python3 <forma-root>/scripts/check_evidence.py <report.json>` checks the integrity and coverage of an evidence record. Format and limits are in [verification](verification.md).
- `python3 <forma-root>/scripts/check_fidelity.py <contract.json> <observation.json>` compares every required measurement against independent expected values; missing data and mismatches fail. [Format, collection and limits](fidelity-contracts.md); [frozen compact-editor sample](../assets/reference-profiles/compact-appearance-v1.fidelity.json). It does not collect browser data, compare pixels or certify the product.
- `python3 <forma-root>/scripts/check_contrast.py '#111827' '#ffffff' --threshold 4.5` calculates WCAG contrast for two opaque sRGB colors. It does not validate gradients, transparency or interface conformance.
- `python3 <forma-root>/scripts/check_layout.py <layout.json>` verifies declared geometry contracts against measured boxes: alignment, center, inset, gap, containment and overflow. It does not assess perceptual quality by itself; format and limits are in [spatial contracts](layout-spatial-contracts.md).
- `python3 <forma-root>/scripts/check_package.py --root <forma-root>` checks structure, local links and inventory; for plugins it also checks the manifest, namespace and provenance. Optional installation and ZIP comparison is described in [plugin operation](plugin-operation.md). It does not run an agent, test UI or install resources.
- [Example tokens](../assets/tokens.example.json) and [example evidence](../assets/evidence.example.json) are starting points, not evidence from a real project. Never copy an approved status without executing the test.
- The [clean interface foundation](../assets/clean-shell.html) demonstrates a sidebar, surfaces, buttons, text search, fields and themes; [scoped CSS](../assets/clean-shell.css) and [demo JS](../assets/clean-shell.js) have no external dependencies. Item creation is in memory; it is not a backend, semantic search or automatic consumer integration.
- [BookObject](../assets/book-object.js) is an original implementation of a Canvas2D cover and optional Three volume, with configurable material, branding, spine label and pose; its contract, differences from the reference and example are in [reusable objects](reusable-objects.md). Static mode requires neither network access nor installation. Contract, geometry and material regressions: `node --test <forma-root>/tests/book-*.test.cjs`. Use `BOOK_THREE_MODULE=/absolute/path/three.module.js` to include real meshes; without it, dependent tests record skips, not passes. The [approved case](book-polish-case-study.md) contains hashes, the audit synthesis and the location and limits of external history.
- `assets/library-colors.js` resolves automatic colors by ID and material variations without the DOM or dependencies; it is not the reference's list-based color allocator. The contract is in [reusable objects](reusable-objects.md#portable-automatic-color); regressions: `node --test <forma-root>/tests/library-colors.test.cjs`.

## Reference experiences

- [Protocol](experience-library.md): turn research into decisions, mechanisms and test criteria, with authorship boundaries.
- [Bounded studies](site-experiences.md): three current sources observed on desktop, including static reading of licensed public code; these are neither components nor an audit of the 202 sites.
