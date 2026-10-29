---
name: forma-objects-3d
description: "Integrate or refine reusable material objects, BookObject, books, covers and 2D/3D mascots, including geometry, materials, gestures and lifecycle. Use for object mechanisms and fidelity; not to add decorative 3D to every interface."
metadata:
  version: 1.19.0
---

# Objects, material and 3D

## When to use

- Use to reuse BookObject, correct material/volume, preserve a mascot or adapt an authorized scene/object.
- Do not use to assume WebGL for every card, profile, mascot or campaign image.

This module guides execution after it is read; it does not start a renderer, generation or other modules by itself.
Preserve the brand and stack. When the request includes actual 3D, tilted CSS does not meet that acceptance criterion.

## Inputs

- Object and destination consumer, requested mechanism, reference/version, relevant states and views.
- Available code/assets, loader/dependencies, authorized identity, execution limits and fallback.

## Procedure

1. Establish content, geometry, materials, behavior and integration; separate static and runtime evidence.
   Read [reusable objects](../forma/references/reusable-objects.md) and reuse in [playbooks](../forma/references/playbooks.md); confirm whether the object fits the BookObject contract.
2. For an approved BookObject, inspect the distributed asset and its consumer; adapt parameters without guessing mesh/material rewrites.
   Read the [refinement case study](../forma/references/book-polish-case-study.md). For existing articulated covers/pages, strip-like edges or leather lacking body, consult the [passport case](../forma/references/passport-polish-case-study.md): diagnose surface, fit, UVs and light before changing thickness. This is knowledge from a CSS 3D consumer, not a new BookObject asset. For mascots, use [mascot refinement](../forma/references/mascot-refinement.md) and preserve silhouette, negative spaces and expression.
3. If a discrepancy exists, trace configuration through geometry, UVs, normals, shader, font, buffer and output.
   Use [package-to-pixel fidelity](../forma/references/3d-reference-fidelity.md); for scene mechanism/cost choices, read [immersive web](../forma/references/immersive-web-tech.md).
   For articulated pages, also consult the passport case's pages/divider section: distinguish the paper's starting edge, content inset and gesture pivot; check both sides' connection and overlap that may pass through the cover when closing.
4. Integrate code and assets into the destination project with a valid loader, events, resize, disposal and error/fallback handling.
   Connect the requested state and persistence. A snippet, contract or copied file without a consumer is not a mechanism available at runtime.
5. Observe the main path and test relevant views/gestures, materials, extreme content and unmounting.
   Use [rendered validation](../forma/references/rendered-validation.md) and [verification](../forma/references/verification.md); validate fallback and reduced motion separately.

## Output and stopping condition

Deliver the integrated object or requested specification, the API actually used and renderer evidence in the destination.
Record what was integrated, adapted, replaced or not tested; a library comparison does not prove visual equivalence.
Stop when the consumer exercises the requested mechanism and views, gestures and material meet the established acceptance criteria.
If only the fallback works, do not conclude that the primary volume/renderer was validated. State the concrete remaining dependency.

## Optional support and limits

REA can clarify an unknown mechanism; `design-motion-principles` can support gestures; `ecc:blender-motion-state-inspection` applies only when a Blender context exists.
Check availability and read the current operational `SKILL.md`, when present, as described in [integrations](../forma/references/integrations.md); do not assume tools from a name.
Do not install engines or change the stack by visual association. Materiality, image generation and executable geometry are distinct deliverables.
