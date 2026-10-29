---
name: forma-motion
description: "Create or audit feedback, gestures, animations and films with continuity, accessibility and execution cost in mind. Use for interactive motion or rendered sequences; not to animate every surface by default."
metadata:
  version: 1.21.0
---

# Motion and feedback

## When to use

- Use for transitions, gestures, control responses, visual narrative or continuity/performance defects.
- Do not use to hide latency, replace actual progress or add effects to a request that does not need motion.

This module guides the agent reading it; it does not execute animations or call other modules.
Preserve the brand, stack, interaction and platform expectations.

## Inputs

- Element, action/event, initial/final state, context/frequency and problem or desired effect.
- Runtime, existing mechanism, devices/targets and expected behavior without motion.

## Procedure

For a film, teaser or animated deck, follow [films and rendered sequences](../forma/references/motion.md#films-and-rendered-sequences): composition, timing, audio when requested and final file. The gesture/interruption steps below apply to interactive interfaces; do not confuse them with editing a timeline. A local correction in an approved film does not require rebuilding its storyboard.

When relevant, use [captions and speech](../forma/references/motion.md#captions-and-speech), [GIFs and loops](../forma/references/motion.md#gifs-and-loops) and [interactive players](../forma/references/specialized-surfaces.md#interactive-decks-and-players). A different format or player changes the evidence required; it does not impose another engine.

1. Declare what changes, why it needs to be perceived and how the task works without animation.
   Read [motion and feedback](../forma/references/motion.md); use refinement in [playbooks](../forma/references/playbooks.md) for local defects.
2. Map state, trigger, continuity, reversal, interruption and observable completion.
   For focus and cancellation, consult [interaction and content](../forma/references/interaction-content.md); do not assign a visual duration to an unknown asynchronous operation.
3. Choose the smallest mechanism compatible with the stack and authorized effect.
   For scenes/3D, read [immersive web](../forma/references/immersive-web-tech.md); for faithful pose/material, read [3D fidelity](../forma/references/3d-reference-fidelity.md). Positional FLIP does not prove material interpolation.
4. Implement in the consumer with coherent state, callback cleanup and a reduced/static alternative.
   Consult [accessibility](../forma/references/accessibility.md). Do not leave essential content invisible when the animated path fails.
5. Run the normal sequence and interruptions: repeat, reverse, exit, resize and unmount when applicable.
   Use [rendered validation](../forma/references/rendered-validation.md) and [verification](../forma/references/verification.md); report only measured cost/performance.

## Output and stopping condition

For an interface, deliver integrated motion or the requested specification, triggers/states and reduced-motion behavior. Include continuity evidence and runtime/device limits, without confusing a demonstration video with implemented interaction. Acceptance includes correct interruption and an available task.

For a film, deliver the agreed sequence and format, with content, timing, transition and final-file review. Check audio/silence and requested variants; do not impose interface input tests on an MP4. Stop when the applicable criteria have been verified. Storyboard, snippet, preview and final render must be labeled according to the stage actually delivered.

## Optional support and limits

`design-motion-principles`, `ecc:motion-foundations`, `ecc:motion-patterns` and `ecc:motion-advanced` can answer specific questions.
Select only relevant support and read its current `SKILL.md`, if available, as described in [integrations](../forma/references/integrations.md); there is no automatic invocation.
Do not install an animation library for an effect the stack already handles, or replace an explicitly required 3D mechanism with CSS transforms.
