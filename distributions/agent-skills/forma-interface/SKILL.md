---
name: forma-interface
description: "Build or refine operational interfaces, clean shells, forms, navigation, search, settings, appearance editors and material profiles. Use for usable components and states; not for broad research, campaigns or 3D geometry implementation."
metadata:
  version: 1.32.1
---

# Interface and states

## When to use

- Use for sidebars, backgrounds/panels/controls, forms, search, preferences, profiles and their states.
- Do not use to turn a UI improvement into a complete redesign or present a mockup as a data integration.

This module requires the agent to read it; it does not trigger tools or other modules automatically.
Preserve the existing brand, stack, domain, components and contracts.

An operational screen organizes work: objects, scope, data and the next action. A page communicating an offer follows [Brand](../forma-brand/SKILL.md). If the page contains app fragments, treat their interiors as an interface: reuse the existing system, coherent data and actual states or labeled demonstrations. The surrounding promotional composition does not justify changing the product's tables, units, precision or flows.

## Inputs

- Concrete task, route/component, expected action, actual data or labeled fixtures, and access to the consumer.
- Current states, API/storage contracts, permission limits and an approved reference when available.

## Procedure

1. Walk through entry, action, success and recovery; identify the owners of state and persistence.
   Read [interaction and content](../forma/references/interaction-content.md) and, when data/permissions are involved, [contracts and trust](../forma/references/contracts-trust.md). Identify objects, units, usage frequency and the decision the screen supports. Repeated values use the same source and scope; totals and deltas follow the domain's calculation and rounding, without adjustments to improve the image. If the direction is open, use [directions and comparison](../forma/references/design-directions.md); do not import a hero recipe into an approved dashboard.
2. For the background/sidebar/panel/control system, read [clean shell](../forma/references/clean-shell.md).
   For a new screen or broad visual refinement, first apply the [shared visual foundation](../forma/references/visual-system.md#coordinate-the-foundation) to these components together. Resolve supported themes, spacing, radius roles, and icon language. For new interactive designs, include [Motion](../forma-motion/SKILL.md) with the shared context and implement its [default layer](../forma/references/motion.md#default-motion-for-new-interactive-designs); a local fix uses only its affected contract.
   Inspect the indicated assets and adapt consumers/events to the stack. For fields, navigation and tables, use [component patterns](../forma/references/component-patterns.md).
3. Read only the contracts for the requested capability: [search](../forma/references/search-discovery.md), [settings](../forma/references/settings-modes.md), [appearance editor](../forma/references/lighting-editors-icons.md) or [material profile](../forma/references/adaptive-visual-systems.md).
   Specify query semantics, preview/commit/cancel/reset, layers and export only when they are in scope.
   For the complete editor, also read [first use and selected control](../forma/references/lighting-editors-icons.md#first-use-reopening-and-selected-control): defaults, the maximum limit, saved state and initial ring visibility are distinct contracts. Include them in transfer prompts too; "draggable points" alone does not specify this mechanism.
   Fix the stage-relative anchors: modes at the top center, reset at the top right, minus/plus at the bottom right; do not reposition them according to the pool. Separate vivid handle/swatch color from wash chroma, and the default intensity of 42% from a saved value of 5%. To reproduce the approved editor, read the [portable compact profile](../forma/assets/reference-profiles/compact-appearance-v1.json): it already defines desktop and touch, nighttime surfaces and the transition from 2 to 3 lights. Do not invent new breakpoints/sizes or inherit a differently colored button. Outside that request, declare platform adaptations.
4. Implement the slice that proves the capability and connect handlers, data and storage to the correct owner.
   The profile uses the domain's fields and the approved object in the destination; do not impose the reference's card/role on an existing passport. Check global/contextual scope, framing of the open object and consumer updates without destroying the session or focus return.
   Follow reuse in another project in [playbooks](../forma/references/playbooks.md). The [portable AppearanceEditor](../forma/references/reusable-components.md#appearanceeditor-integration) supplies scoped vanilla controls, draft/commit state and explicit save/cancel adapters. Reuse it when compatible, or adapt the mechanism to existing components. Connect its persistence and context to the destination owner; the [component lab](../forma/assets/components-lab.html) uses browser-local sample data. The clean-shell demo does not provide a backend.
   Its mode order is System, Light, Dark. Valid offstage anchors keep positive radial scaling instead of an impossible stage edge fit; this explicit bug fix does not imply every historical pixel/gesture is identical. For faithful reproduction, freeze the approved source's criteria before editing the consumer. Use [fidelity contracts](../forma/references/fidelity-contracts.md) to compare measurements; the compact profile has a portable sample of layout, colors and trajectories. It does not replace save/reload, cache, access or screenshot inspection.
5. Exercise keyboard input, focus, errors, extremes and reopening when persistence is promised.
   Use [rendered validation](../forma/references/rendered-validation.md) and [verification](../forma/references/verification.md); validate each agreed search capability against expected results.
   Distinguish local code, served response, isolated test context and an already-open tab. Compare the individual identity of affected CSS and JS with the tested artifact; a matching `data-revision` does not resolve an old cache. If a draft exists, preserve it and leave saving/discarding to the user before reloading. Exercise the gesture in small steps too: updating an accumulator from the rounded label can conceal continuous movement.
   In the editor, compare the reference and destination at the same scale, font, mode and configuration. Measure computed boxes and colors after the entire cascade; also inspect the page background, sidebar and workspace. When clicking +, check the third pool's position, gradient profile, hue, order, selection and ring, not only a count of 3. Measure relative positions before/after selection, movement, the third pool, light/dark mode and reopening. Compare all pools before/during/after ordinary dragging, Alt and ring gestures; color/mode changes must not move positions. In the faithful profile, outside points retain their actual visual coordinates and are clipped, without edge proxies. Test focus without scrolling that shifts controls; existing buttons and model tests do not prove composition or access.

## Output and stopping condition

Deliver a working interface or an explicitly requested specification, states and the observable task result.
Identify simulated data, in-memory-only changes and integrations that are still missing.
Stop when the distinguishing operation works in the consumer and affected states have no relevant regressions.
A toast does not prove saving; changing colors does not prove composition reuse; focusing an input does not prove a command palette.

## Optional support and limits

`ecc:click-path-audit`, `ecc:design-system`, Impeccable and `accessibility` can support handler diagnosis, consistency and access.
Read each available supporting skill's current `SKILL.md` before use, as described in [integrations](../forma/references/integrations.md); do not assume tools from a name.
Do not replace requested volume/interaction with an image or merely tilted plane. Previously approved articulated CSS 3D remains a valid mechanism; do not replace it with WebGL by association. Keep each capability's implementation boundary visible in the delivery.
