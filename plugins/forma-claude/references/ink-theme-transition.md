# Ink theme transition - central liquid reveal

Recorded 2026-11-10 from the approved local HelloUra preview, revision `theme-ink-2`. This optional motion pattern reveals the destination light/dark palette from the viewport center with a gently irregular edge. Use the [portable controller](../assets/ink-theme/ink-theme.js), [snapshot styles](../assets/ink-theme/ink-theme.css) and [neutral specimen](../assets/ink-theme/preview.html). The [validation record](../assets/ink-theme/validation.json) separates source evidence, regressions and rendered review.

## Decision and scope

The approved effect is a drop expanding into the new theme. The rapid-click defect involved overlapping transition work and snapshot hit testing. The adopted contract uses one capture at a time, releases the filled animation, and gives the latest input priority. Repeated input settles immediately; it does not queue another flourish or continuously reverse a fluid simulation.

This is an authored web reveal using native View Transitions and Web Animations, not Apple's Liquid Glass renderer, a shader, a physics engine or a universal theme provider. It requires no React, canvas, new dependency or palette. Preserve the consumer's sidebar, glass controls, icons, layout, scroll ownership and brand. Saving this motion does not replace separate material decisions.

## Motion contract

| Property | Approved behavior |
|---|---|
| Trigger | Deliberate light/dark toggle; never every navigation or render |
| Origin | Viewport center, independent of pointer position |
| Duration | 720 ms for an uninterrupted reveal |
| Geometry | 64 polygon vertices; 21 sampled keyframes; native interpolation |
| Growth | `p * p * (3 - 2 * p)` with a small three/five-lobe ripple |
| Coverage | Final radius is 1.08 times the center-to-corner distance |
| Layering | Opaque old palette below opaque new palette; clip only the new snapshot |
| Repetition | Latest requested palette wins; cancel and settle without a queue |
| Interruption | Resize, hidden document, reduced-motion change, routing and disposal settle |
| Fallback | Immediate palette update for reduced motion or unavailable effect APIs |
| State | Retain draft, focus and scroll; no cloned interactive DOM or storage writes |

These are implementation choices, not frame-rate measurements. Do not cross-fade the entire interface, add reflected bands or animate every foreground/background color underneath the reveal: those treatments can reduce legibility or conflict with the captured palette.

## Integration

Import the CSS once and mount one controller per document after the consumer resolves its theme. Keep it alive across route changes. `applyTheme` synchronously updates the existing theme state, semantic tokens and accessible control name. It must commit before capture; asynchronous framework rendering needs separate synchronization and validation. Coordinate other root View Transitions through the same owner; settle this effect before routing.

```js
import { mountInkTheme } from './ink-theme.js';

const ink = mountInkTheme({
  initialTheme: document.documentElement.dataset.theme,
  applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Use light theme' : 'Use dark theme');
    // Update the existing icon/theme store here; do not remount the content.
  },
});

// Adapt the existing dispatcher, not a second global click listener.
function onAction(event) {
  const target = ink.resolveClick(event)?.closest?.('button,a');
  if (target === toggle) void ink.toggle();
  else dispatchExistingAction(target, event);
}
// Before routing: ink.settle(). On application unmount: ink.destroy().
```

`active` remains true until the browser releases the capture. `settle()` cancels decorative work and applies the latest palette. `destroy()` also removes resize, visibility and media-query listeners and guards late callbacks. Mount once at the app boundary; do not create another controller before the previous capture is released. External theme-store updates need coordinated ownership instead of changing the palette behind this controller.

### Rapid input and snapshot hit testing

Skipping ends the visual sequence but does not cancel the state-update callback. That callback reads the latest requested palette. Retain ownership until `finished` settles; a stale `ready` continuation must not start another animation. Release the `fill: both` animation on completion and cancel it on interruption. The sequence token prevents a cancelled continuation from winning later. See [MDN's skipTransition contract](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/skipTransition).

Root snapshots are not live interactive DOM. Pointer-event CSS alone does not prove all underlying controls remain usable; [Chrome's guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/group-element-transitions) explains the distinction. In the delegated button flow, `resolveClick(event)` settles, hit-tests the real control for pointer input and restores focus without scrolling. The host dispatches the action once. Keyboard input retains its actual target. Never replay synthetic `.click()` events or add a second handler for the same action.

This helper does not recreate native defaults for selects, drag, file pickers or arbitrary links intercepted by a snapshot. Test those paths in the consumer. It is not universal input passthrough. Task-critical controls that cannot tolerate a root snapshot should use an immediate theme switch or an independently validated scoped transition.

## Accessibility and failure behavior

- Honor `prefers-reduced-motion` initially and live: apply the theme immediately and remove decorative state.
- Preserve the focus target, accessible toggle name and keyboard action. Never disable the toggle for 720 ms or trap input behind a timer.
- Keep HTML usable without animation. The specimen has readable no-JavaScript content; its toggle stays disabled until initialized.
- If effect APIs or capture setup fail, the palette still changes. Unexpected effect failures produce a bounded warning, without user content.
- Resize and backgrounding settle the effect. Do not replay stale requests on return. Preserve form values and scroll.
- Keep the consumer's accessible palette and surfaces; this component changes no material transparency or contrast values.

## Provenance, verification and limits

REA inspected the delivered preview's `app.js` as inert source: parsing succeeded, with partial application/semantic coverage and explicit unknowns. Static inspection establishes syntax relationships, not frame performance or execution. Fingerprints are in the validation record; the full private artifact and REA bundle remain in the consumer workspace. The [View Transition guide](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using) documents the platform mechanism. The reusable control flow is Forma-authored code, not copied third-party implementation.

The original preview had nine passing controller scenarios plus observed desktop/mobile switches, rapid input, keyboard activation, navigation, draft preservation and resize. The Forma adapter adds mount/dispose boundaries and a neutral specimen; its own checks are recorded separately. API stubs establish controller behavior only; screenshots establish captured frames only. FPS, low-end hardware, Safari/Firefox parity, all native input defaults, assistive-technology certification and production deployment are unverified.

Only authored mechanism code, notes, fingerprints and neutral content are bundled. Consumer screenshots, logo, contact records, personal paths and conversation excerpts are not redistributed. On adaptation, test both directions, rapid input before/during capture, navigation, keyboard, resize, live reduced motion, disposal, fallback and draft/scroll continuity.

## Retrieval and contextual use

Search for `ink theme` or `liquid reveal`; the local library links here through `forma-purposeful-motion`. Request example: "Use Forma's Ink Theme Transition for a centered liquid reveal. Preserve our themes and layout; rapid clicks must settle to the latest choice, with reduced-motion and unsupported-browser fallbacks."

Offer this when an expressive theme change fits the brief or the user requests it. Do not introduce it during an unrelated fix, replace an approved subtle fade or impose it on all Forma applications. Approval makes this available for reuse; it does not automatically apply it to every project.
