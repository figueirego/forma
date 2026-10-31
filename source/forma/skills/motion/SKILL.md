---
name: forma-motion
description: "Create or audit feedback, gestures, animations and films with continuity, accessibility and execution cost in mind. Use for interactive motion or rendered sequences; not to animate every surface by default."
metadata:
  version: 1.34.0
---

# Motion and feedback

## When to use

- Use for the default motion layer of new interactive designs, transitions, gestures, control responses, visual narrative or continuity/performance defects.
- Do not use to hide latency, replace actual progress or expand a local correction into a motion redesign.

This module guides the agent reading it; it does not execute animations or call other modules.
Preserve the brand, stack, interaction and platform expectations.

## Inputs

- Element, action/event, initial/final state, context/frequency and problem or desired effect.
- Runtime, existing mechanism, devices/targets and expected behavior without motion.

## Procedure

For a new interactive design, apply [default motion](../../references/motion.md#default-motion-for-new-interactive-designs): coordinated hover/press, supported theme transitions, context-appropriate scroll treatment, and state/panel feedback. Respect explicit static requests and reduced motion. The default is purposeful implementation, not a requirement to animate every element or add 3D.

For a film, teaser or animated deck, follow [films and rendered sequences](../../references/motion.md#films-and-rendered-sequences): composition, timing, audio when requested and final file. The gesture/interruption steps below apply to interactive interfaces; do not confuse them with editing a timeline. A local correction in an approved film does not require rebuilding its storyboard.

When relevant, use [captions and speech](../../references/motion.md#captions-and-speech), [GIFs and loops](../../references/motion.md#gifs-and-loops) and [interactive players](../../references/specialized-surfaces.md#interactive-decks-and-players). A different format or player changes the evidence required; it does not impose another engine.

1. Declare what changes, why it needs to be perceived and how the task works without animation.
   Read [motion and feedback](../../references/motion.md); use refinement in [playbooks](../../references/playbooks.md) for local defects.
2. Map state, trigger, continuity, reversal, interruption and observable completion.
   For focus and cancellation, consult [interaction and content](../../references/interaction-content.md); do not assign a visual duration to an unknown asynchronous operation.
3. Choose the smallest mechanism compatible with the stack and authorized effect.
   For scenes/3D, read [immersive web](../../references/immersive-web-tech.md); for faithful pose/material, read [3D fidelity](../../references/3d-reference-fidelity.md). Positional FLIP does not prove material interpolation.
4. Implement in the consumer with coherent state, callback cleanup and a reduced/static alternative.
   Consult [accessibility](../../references/accessibility.md). Do not leave essential content invisible when the animated path fails.
5. Run the normal sequence and interruptions: repeat, reverse, exit, resize and unmount when applicable.
   Use [rendered validation](../../references/rendered-validation.md) and [verification](../../references/verification.md); report only measured cost/performance.

## Output and stopping condition

For an interface, deliver integrated motion or the requested specification, triggers/states and reduced-motion behavior. Include continuity evidence and runtime/device limits, without confusing a demonstration video with implemented interaction. Acceptance includes correct interruption and an available task.

For a film, deliver the agreed sequence and format, with content, timing, transition and final-file review. Check audio/silence and requested variants; do not impose interface input tests on an MP4. Stop when the applicable criteria have been verified. Storyboard, snippet, preview and final render must be labeled according to the stage actually delivered.

## Coordination and execution boundaries

Use Forma Foundations for shared visual roles, Forma Interface for control integration, and Forma Validation for input, reduced-motion and frame evidence. Timing, continuity, interruption and sequences remain in this module.
The coordinator selects additional modules; do not recursively dispatch between specialists. Use the available tools according to [capabilities](../../references/integrations.md); a tool name does not prove connection or execution.
Do not install an animation library for an effect the stack already handles, or replace an explicitly required 3D mechanism with CSS transforms.
