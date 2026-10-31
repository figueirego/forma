---
name: forma-objects-3d
description: "Integrate or refine reusable material objects, BookObject, books, covers and 2D/3D mascots, including geometry, materials, gestures and lifecycle. Use for object mechanisms and fidelity; not to add decorative 3D to every interface."
metadata:
  version: 1.34.0
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
2. For an approved BookObject, use the [complete book integration](../forma/references/book-integration.md) and [book lab](../forma/assets/book-lab.html). Reuse BookPreset, the supplied Inter font and a real Three loader; preserve color management, lighting, shadows, stage size and reset semantics. Bare BookObject defaults are generic. Inspect the distributed asset and its consumer; adapt parameters without guessing mesh/material rewrites.
   Read the [refinement case study](../forma/references/book-polish-case-study.md). For existing articulated covers/pages, strip-like edges or leather lacking body, consult the [passport case](../forma/references/passport-polish-case-study.md): diagnose surface, fit, UVs and light before changing thickness. This is knowledge from an approved CSS 3D consumer, not BookObject geometry. The extracted [NeuronPassport component](../forma/references/reusable-components.md#neuronpassport-integration) preserves that CSS engine and its visual layers. Use it as the primary passport when reproducing Neuron; keep the complete companion assets and match host conditions. The older Three PassportObject is a legacy alternative, not a faithful substitute. For mascots, use [mascot refinement](../forma/references/mascot-refinement.md) and preserve silhouette, negative spaces and expression.
3. If a discrepancy exists, trace configuration through geometry, UVs, normals, shader, font, buffer and output.
   Use [package-to-pixel fidelity](../forma/references/3d-reference-fidelity.md); for scene mechanism/cost choices, read [immersive web](../forma/references/immersive-web-tech.md).
   For articulated pages, also consult the passport case's pages/divider section: distinguish the paper's starting edge, content inset and gesture pivot; check both sides' connection and overlap that may pass through the cover when closing.
4. Integrate code and assets into the destination project with a valid loader, events, resize, disposal and error/fallback handling.
   Connect the requested state and persistence. The [component lab](../forma/assets/components-lab.html) supplies a runnable example and real renderer counters; use its documented loader and adapt ownership/lifecycle in the destination. A snippet, contract or copied file without a consumer is not a mechanism available at runtime.
5. Observe the main path and test relevant views/gestures, materials, extreme content and unmounting.
   Use [rendered validation](../forma/references/rendered-validation.md) and [verification](../forma/references/verification.md); validate fallback and reduced motion separately. For release/reuse audits, follow the [browser proof matrix](../forma/references/release-validation.md#browser-proof-matrix): distinguish hardware/software WebGL, CPU render submission, GPU cost, live media changes, emulated touch and physical devices.

## Output and stopping condition

Deliver the integrated object or requested specification, the API actually used and renderer evidence in the destination.
Record what was integrated, adapted, replaced or not tested; a library comparison does not prove visual equivalence.
Stop when the consumer exercises the requested mechanism and views, gestures and material meet the established acceptance criteria.
If only the fallback works, do not conclude that the primary volume/renderer was validated. State the concrete remaining dependency.

## Coordination and execution boundaries

Use Forma Reference to investigate an unknown mechanism, Forma Motion for gestures, and Forma Validation for controlled rendered comparisons. Geometry, materials and renderer decisions remain in this module.
The coordinator selects additional modules; do not recursively dispatch between specialists. Use the available tools according to [capabilities](../forma/references/integrations.md); a tool name does not prove connection or execution.
Do not install engines or change the stack by visual association. Materiality, image generation and executable geometry are distinct deliverables.
