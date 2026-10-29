# Approved book: from symptom to verifiable correction

Application case from 2026-10-26, incorporated in version 1.13.1 and distributed as a neutral synthesis in 1.13.2. Use when an object works but its finish still falls short of the reference, or when turning an approved correction into a reusable component. The general protocol is in [3D fidelity](3d-reference-fidelity.md); API and integration are in [reusable objects](reusable-objects.md).

## Result and identity

The user approved the corrected visual result with "it turned out perfect!!" (translated from Portuguese). The [distributed BookObject](../assets/book-object.js) has the same bytes as the component approved in Pauta: SHA-256 `17bf1f572d0eaabc8486866fcf4b8b0cb9524bf191151d20580cb881b54e7cd4`. Approval applies to that presented result, not universal certification of all materials, devices, or poses.

The [evidence manifest](../assets/audits/book-polish-2026-10-26/manifest.json) preserves hashes, scopes, limits, and the case's neutral identifier. The [material reference profile](../assets/reference-profiles/desktop-material-reference-v1.json) retains observed measurements and mechanisms. Original comparative captures and reports, attributed to the source, remain in the external authorship history. They are not required to run the component, but this synthesis does not replace inspecting that evidence when a historical claim needs revalidation.

## What refinement taught

| Symptom | Demonstrated cause | Adopted correction | Useful regression |
|---|---|---|---|
| Spine highlight band looked rigid | Channel curvature and normals diverged despite similar material | More transition samples; localized curvature; printed field kept flat | Compare normals/contour and image under fixed light; do not compensate by increasing shine |
| Cover rim and junction had a step/gap | Linear rounding and edges of different surfaces did not coincide | Segmented arc and bridge sharing the wall boundary | Closure, orientation, contact, and oblique rays; a closed mesh alone does not prove contact between pieces |
| Weave, grain, and highlight blend looked different | Overlay selected its branch from the wrong operand; the procedural field was consumed differently | Respect operand order and the consumer's sampling path | Asymmetric values distinguish both orders; a 2D texture does not prove variation in both coordinates |
| Metal had an incorrect trajectory/halo | Vertical field transformation and nonzero mask background | Correct V relative to `flipY`; zero background and continuous antialiased coverage | Verify trajectory, mask 0/1, and intermediate coverage without converting the mask into a binary test |
| Pages developed strong streaks after correcting the material | UVs projected in x/y even on x/z and y/z faces; thickness did not vary the sample | Per-face islands varying both tangent axes; duplicate only seams | Nonzero UV area, frequency per face, and preserved positions/normals; do not blur the texture |
| One closeup looked good while other angles revealed problems | Approval used insufficient coverage and different conditions | Fixed pose matrix, per-dimension review, same calibration, and capture of the actual pose | Record remaining failures and test real consumers, not only the isolated lab |

This book's numbers form an implementation profile, not a recipe for every object. For example, 49 channel samples, four rim segments, corner radius 0.032W, a 96x96 field, and a 32-pose matrix serve this comparison. For a mascot or another product, choose geometry, sampling, and budget according to its reference and critical views.

## Sequence to reuse

1. **Fix the target:** version, content, color, material, pose, light, nominal size, actual viewport, DPR, and atlas/buffer resolution. Also confirm served code and revision hash.
2. **Separate mechanisms:** silhouette, normals, contact, UVs, diffuse color, relief, mask/reflection, typography, and presentation. Follow configuration -> consumer -> output; a library or option name does not demonstrate behavior.
3. **Reproduce the defect:** select the view exposing it and take a discriminating measurement or sample. Do not accumulate speculative changes to light, roughness, and color.
4. **Correct the smallest cause:** preserve API, identity, fallback, lifecycle, and already-approved components. When geometry is correct and only UVs fail, retain positions and normals.
5. **Prove the mechanism and inspect the result:** mathematical/structural regression plus rendered comparison in affected poses; then inspect other sides and relevant consumers.
6. **Distribute what was approved:** asset, contract, tests, evidence, and limitations must point to the same revision. Verify the installed copy and extracted package; do not retain an obsolete example in the skill.

For another refinement process, transfer this decision-and-evidence chain. Do not automatically transfer book dimensions, palette, brand, shader, or capture count.

## Audit preserved outside the package

The original history retains diagnosis, geometry and material comparisons, flat and tilted reviews, corrections, before/after captures of the 32 poses, renderer-isolation manifest, and test records. Its location in the authoring project and original manifest hash appear in the distributed manifest. That external directory is not an installation dependency and may not accompany a skill copy.

The distribution retains the original component, tests, numerical profile, and lessons. It does not include captures identifying another product, bundles, meshes, shaders, fonts, or proprietary symbols. The neutral identifier names a documented observation; it does not attribute reference creation to the skill author. If external history is unavailable, declare that limit and produce new evidence to validate adaptations.

The 176 product tests recorded in history belong to the previous visual audit; they were not rerun in this naming update. The portable regressions below verify the code actually distributed.

## What was demonstrated and what remains limited

- Normal angular error in the three channel samples: 6.88/9.09/6.93 degrees -> 0.22/1.35/0.50 degrees. This is not a global error measurement for the entire mesh.
- Closure of the four pieces, sampled contact, and 841 oblique rays at the former gap; no visible opening in the 32 reviewed poses. Pages gained 492 UV-seam vertices while retaining 11,536 triangles. Complete model: 25,132 -> 33,436 triangles; no GPU benchmark was performed.
- Poses: eight yaws x four pitches, with fixed light and equivalent content/color. The 32 captures use revision `9a0553fc...`; final revision `17bf1f57...` changes only a provenance comment. Final resting and responsive states were captured with the final revision.
- Executed reference: isolated renderer from the desktop reference, build 0.19.0. These were not 32 captures of the native application. Comparison viewport: 828x1143; responsive tests in iframes with actual 390x844 and 1280x900 viewports. A requested override that did not apply was discarded as responsiveness evidence.
- Pages, back cover, reset, reduced motion, and static/WebGL were exercised; grid/leather/ink were also exercised on desktop. This does not prove all color/material combinations, physical touch, Windows, or performance.
- Still-observable differences: slightly darker/thicker upper rim at -60 degrees, slightly greater concavity at the paper/spine junction, and a different original brand mark. User approval does not erase these records or establish a fidelity percentage.

## Repeat package regression

Use the [BookObject](../tests/book-object.test.cjs), [geometry](../tests/book-geometry.test.cjs), [material](../tests/book-material-fidelity.test.cjs), and [color](../tests/library-colors.test.cjs) tests. All resolve the asset inside the skill itself. To also run actual geometric checks, point `BOOK_THREE_MODULE` to the Three ES module already available in the project; do not install a dependency merely because this reference mentions it.

```bash
BOOK_THREE_MODULE=/absolute/path/three.module.js node --test /path/to/skill/tests/*.test.cjs
```

Without this variable, Three-dependent geometry tests are explicitly skipped. Record this limitation; a skipped test is not a passed test. Version 1.13.1 was verified with Three r186: 50 JS tests passed; without the module, 43 passed and seven were skipped. This verifies distributed implementation contracts, not the visual matrix in a new consumer.

During package review, a mutation restoring only the linear bevel still passed the test counting intermediate normals. The regression was strengthened with six intersections through upper/lower rim sections: it now measures the curved shape and rejects that reversal. This reinforces the rule of checking whether the test actually distinguishes the defect without altering the approved visual asset.
