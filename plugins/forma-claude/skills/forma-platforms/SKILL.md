---
name: forma-platforms
description: "Adapt experiences to web, mobile, desktop, distribution and specialized surfaces, respecting actual input, navigation and runtime behavior. Use for platform differences and installers; not to choose a framework only by appearance or file extension."
metadata:
  version: 1.34.0
---

# Platforms and distribution

## When to use

- Use for web responsiveness, iOS/Android, desktop windows, installation/updates or specialized surfaces.
- Do not use to migrate the stack unnecessarily or claim native behavior from a browser mockup.

This module requires explicit reading; it does not install, distribute or call other modules automatically.
Preserve the existing brand, stack and contracts. Identify the runtime before recommending an implementation.

## Inputs

- Platform, OS/version and target devices; task, input methods, distribution and known constraints.
- Manifests/code, current navigation, promised support and environments actually available for testing.

## Procedure

1. Detect the technology and separate application, packaging and distribution.
   Read [platform adaptation](../../references/platform-adapters.md); EXE/DMG do not define a framework or visual language.
2. For browsers, read [web](../../references/web.md); for phones/tablets/foldables, read [mobile](../../references/mobile.md).
   Adapt navigation, insets, text, keyboard, gestures and available space; do not impose web controls on a native experience.
3. For desktop/installers, read [desktop and distribution](../../references/desktop-distribution.md).
   For TV, wearables, kiosks, voice or spatial experiences, read [specialized surfaces](../../references/specialized-surfaces.md) and check relevant current documentation.
4. Implement the smallest adaptation in the authorized target, preserving data and task continuity.
   Use the relevant [playbooks](../../references/playbooks.md). Model installation/update interruption and recovery when they are part of the request.
5. Run the flow in the available runtime and input methods; verify affected sizes, scale and states.
   Use [accessibility](../../references/accessibility.md) and [verification](../../references/verification.md); maintain an explicit matrix of tested and untested environments.

## Output and stopping condition

Deliver a working adaptation or the requested specification, platform decisions and evidence from the environment used.
For distribution, distinguish generated, signed, installed, updated and published packages: each stage requires its own proof.
Stop when the relevant task and recovery work within the agreed support scope.
Without the target OS/device, deliver the work possible and declare the untested runtime; visual simulation does not complete that requirement.

## Coordination and execution boundaries

Use Forma Interface for composition, Forma Motion for gestures, and Forma Validation for actual device and browser evidence. Read the existing stack and platform documentation for implementation details.
The coordinator selects additional modules; do not recursively dispatch between specialists. Use the available tools according to [capabilities](../../references/integrations.md); a tool name does not prove connection or execution.
Do not install frameworks or publish packages through this module's routing. Design criteria do not replace specialist certification.
