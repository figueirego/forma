# Motion and feedback

Before animating, answer: what changes, why, who needs to notice, how often, and what happens without motion? The restraint, polish and expression axes of Design Motion Principles are contextual lenses, not author endorsements or a single recipe.

## Default motion for new interactive designs

Treat purposeful animation as part of creating an interface or interactive page, even when the brief does not list individual effects. Reuse the project's timing and mechanisms; otherwise define a small shared set. Implement applicable moments below, with intensity suited to the content and frequency of use. Record a concrete reason for an omitted moment, such as no theme switching, no scrolling, reduced motion, or an explicitly static request. This does not require 3D, a new library, or adding motion outside a local correction.

| Moment | Implementation and acceptance |
|---|---|
| Light/dark change | When both modes exist, transition related surfaces, text, borders, and icons coherently. Choose properties/timing that retain readable intermediate states; avoid a bright flash or fading all content away. Simultaneous foreground/background interpolation can cross an unreadable midpoint even when both endpoints pass. When appropriate, reveal an opaque snapshot of the new palette instead of blending palettes; feature-detect that mechanism and provide an immediate safe fallback. Do not delay applying the requested theme while waiting for an effect. Preserve focus, scroll position, and saved/system preference semantics. Initialize the correct theme without an entrance animation; observe manual changes, rapid reversal, and OS changes while following system mode. |
| Hover, press, and focus | Provide brief, consistent feedback for actionable controls. Gate hover effects to hover-capable input, provide equivalent information and visible focus for keyboard use, and keep touch/press feedback available. Do not shift layout or move the hit target away from the pointer; focus indication and action remain immediate. |
| Scroll | Consider a subtle progressive reveal or progress cue for narrative pages. Reveal once, keep important content immediately available, and preserve normal wheel/touch scrolling. Prefer stable visible content for repetitive workspaces where reveals slow scanning. Without JS or with reduced motion, content stays readable and reachable; do not require scrolling through long pins or hijack scroll to demonstrate polish. |
| State, panels, and feedback | Connect opening/closing, selection, loading, success, and errors to clear state changes with brief continuity. Preserve focus management and interruption; never delay a real action or manufacture progress to finish an animation. |

Respect reduced motion across all moments, including when the OS preference changes during interaction. Remove decorative travel, parallax, zoom, and loops; use an immediate update or subtle fade when appropriate. No perpetual motion is required. The default layer and its alternatives must be exercised in the actual browser: normal/rapid input, keyboard/touch, theme change, scroll/reverse scroll, reduced motion, and JS-free content where applicable. Static captures and presence of transition declarations alone do not prove behavior, continuity, or acceptable cost.

ECC `motion-foundations` and `motion-patterns` can support shared timing, interruption, and component sequences when their stack fits. Read the current skills before applying them through [integrations](integrations.md). Their React-specific implementations are not a reason to change a CSS/native stack; use the existing engine and inspect the result.

## Selection

| Situation | Direction |
|---|---|
| Text entry, keyboard, actions performed hundreds of times/day | Immediate response; avoid displacement and delay |
| State change or panel opening | Brief continuity, correct focus, without blocking action |
| First use or expressive campaign | Narrative is possible while preserving control and reading |
| Long operation | Actual progress, cancellation and recovery |
| Static informational content | No animation unless it improves understanding |

As a starting point, visual feedback may be instantaneous, small transitions may take 100-250 ms and larger movements 200-400 ms. Adjust to distance and platform; do not present these ranges as a universal standard. Do not insert artificial waits to "show" success.

## Specification

For each important motion, specify trigger, initial/final state, property, duration or spring parameters, easing, interruption, reversal, repetition and reduced alternative. Gestures should track the finger and allow cancellation. Rapid inputs must not queue animations or trigger duplicate actions.

Reduced motion applies regardless of the chosen intensity. Replace parallax, broad zoom and rotation with a subtle transition or instantaneous change while retaining information. Do not depend on animationend to complete a business rule. Do not globally apply near-zero durations without checking initially hidden content.

## Engineering

Prefer transform and opacity when they express the effect; animate geometry only with a reason and measurement. Do not use transition: all. Do not prohibit APIs by name: well-managed passive listeners may be appropriate; rerendering the entire tree for every scroll pixel usually is not.

Choose CSS, a native API or an existing library. Avoid two engines controlling the same property. In React, keep continuous values outside state when needed and clean up observers, listeners and timelines. Use will-change selectively; blur and giant layers may consume memory/GPU resources.

Validate interruption, navigation during animation, resizing, background tabs, modest hardware, reduced motion and content reachability before JS. Motion does not replace accessible state, good latency or textual feedback.

## Materials and interactive objects

Static rendering and reduced motion are independent choices. The **static** preference must retain the CSS/Canvas2D representation without importing the engine or acquiring a WebGL context. **Reduced** motion may retain a material rendered once, but must remove decorative tilt, parallax and interpolation. Combine the OS and app preferences: if either requests reduction, reduce. Observe both live and neutralize an already active hover pose when the policy changes.

Hover tilt requires a fine pointer with hover available; ignore touch events for this behavior. Deliberately dragging an object is a separate contract: it needs a target, cancellation and an alternative through controls. Preserve mobile vertical scrolling and handle `pointercancel`; do not turn every page touch into a 3D gesture.

Use on-demand RAF: start when the target changes, continue while the pose converges and stop at rest. Cancel the pending frame when the tab or object becomes invisible, defer expensive rebuilds and redraw the latest state on return. Do not add continuous "breathing" to demonstrate that the material works. If JS controls `transform` every frame, do not also apply a CSS transition to that property.

Test the sequence **interact -> reduce motion -> hide -> change data -> show -> static -> interactive -> unmount**, including OS changes and disposal before an import finishes. DOM states such as `moving`, `idle`, `paused` and `static` help observe the contract, but do not demonstrate FPS, GPU cost or visual quality. Verify the browser image and absence of pending work separately.

## Films and rendered sequences

Use for video, teasers, animated decks or time-based narratives delivered as files. Do not impose this flow on a hover, gesture or interface adjustment. Choose the tool according to available capability and the agreed format; a reference made with HyperFrames does not require migrating Remotion, CSS, SVG or the existing engine.

1. **Fix the deliverable.** Message, literal content, aspect ratios, duration/FPS, sound or silence, captions and editability come from the request and channel. Do not add music, narration or formats by default. Project identity and the [editorial contract](artifact-workflows.md#editorial-contract-for-restyling) remain valid.
2. **Plan observable changes.** For each segment, record content/pose, what changes, reading time and the transition to the next segment. For a complex new film, storyboards and animatics reduce rework: composition first, then timing, then production. Reuse approved composition, assets and poses in the final render, avoiding a second implementation that only looks equivalent. A correction to an approved film preserves the other scenes. Respect authorization already given to produce; this step does not create another mandatory approval or presume approval from silence.
3. **Use one temporal reference.** Derive scene boundaries, entrances, pauses, voice and sound cues from the same timeline or time map. Text can only be read after entering; usable reading time does not include the entire fade. State when seeking to a moment must derive from time without depending on the sequence of callbacks already traversed. Verify out-of-order seek/scrub when offered. Do not prescribe universal BPM, easing, loudness or reading intervals.
4. **Split production when useful.** Each delegated scene receives the revision, entry/exit contract, framing, assets and file owner. Integrate only the result from the expected revision. Resume proven steps; if rendering or uploading ended with an unknown outcome, inspect it before repeating the effect. Reusing old output requires confirming that its inputs have not changed. This is execution discipline, not a promise of an installed scheduler.
5. **Review transitions and the final file.** Sample the opening, ending and before/during/after important transitions; distant frames can hide a flash or abrupt cut. In a reference study, record timestamp/frame and FPS or timebase, distinguishing measurement from interpretation. Use a contact sheet to locate problems, then play the segment; a frame sheet does not prove audio or every frame.

In the exported file, check dimensions/aspect ratio, duration and agreed tolerance, frame rate/timebase, first/last frames, text/assets and the audio track or silence. For variable-frame-rate media, do not use a tolerance of "one frame" without defining the timebase. A black screen may be intentional; fail it only if it contradicts the sequence. Listen for synchronization, cuts and intelligibility when sound is present. A saved project, preview and final MP4 are different evidence.

An unavailable gate remains unverified; a process with exit0 may still produce an incomplete file. Show separately what was measured, inspected and delivered. Do not call `upload_files`, `look`, `start_task` or commands from another platform unless they exist in the environment. Do not initiate hosting, paid generation, publication or automatic memory as a consequence of producing media.

### Captions and speech

When captions are present, compare the transcript with the actual audio, including silence, negation, names and uncertain passages. ASR may invent speech during silence; do not fill gaps based on plausibility. Detect text already burned into the video before adding another layer. Preserve the requested content and distinguish a literal transcript from authorized editorial adaptation. Without access to audio, speech fidelity remains unverified.

Check order, synchronization, usable reading time, line breaks and legibility across cuts, motion and background changes. Decorative highlights behind a person do not replace complete, readable captions when required. Preserve the original video when the task is only captioning; style, position, language and tolerances come from the contract. Validate the final track/file, not just cue JSON or a static frame. Do not automatically add narration, paid transcription or model downloads.

### GIFs and loops

Inspect the encoded file: dimensions, frame delays, duration, repetition and the transition from last to first. Correct intermediate PNGs do not prove GIF rhythm or loop continuity. Also check entrance, development and rest to avoid a crop that only works on the final frame. Reframing does not authorize stretching text or changing content outside the request.

If the channel displays only the first frame when animation is unavailable, that frame must communicate the agreed information. Evaluate palette, transparency or compression limits in the delivery format; do not silently replace GIF with video or impose a universal frame rate. Adjusting timing requires checking the result and continuity, not only the encoder parameter.

## Scroll-linked scenes

When scope includes a scroll-driven scene, define the information it communicates, start/end region, initial/final state and relationship between progress and pose. Use existing infrastructure; GSAP, Lenis and an external catalog are options, not requirements. A cited catalog or demo must exist in the available version before planning reuse.

Inspect before/during/after pinning, intermediate points and reverse traversal. A contact sheet helps locate cuts and overlap, but does not prove continuity between samples: actually traverse the scene. Confirm resize, return to the route and disposal of listeners/observers/timelines when applicable; repositioning the page must not leave content stuck or invisible.

At narrow widths, with touch or reduced motion, prioritize access to content and actions. Choose a static sequence or simple transition when spatial travel does not help; without JavaScript, keep essential content readable when that fallback is part of the deliverable. Do not use autoplay, long pins or a minimum number of animated elements to prove polish. Use a payload, duration and rendering-cost budget suited to the target and measure where risk exists. The review records continuity, interruption, a reduced alternative and content access as separate criteria.
