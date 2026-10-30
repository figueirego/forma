# Accessibility and inclusion

Use WCAG 2.2 AA as a web reference where applicable; legal and contractual requirements depend on the product and jurisdiction. For native applications, add platform documentation and tests with its assistive technologies. Do not claim full conformance based on a screenshot, Lighthouse or contrast alone.

## Measurements and their meanings

- Regular text: minimum contrast of 4.5:1; large text: 3:1. "Large" means at least 18 pt (24 CSS px) regular or 14 pt (approximately 18.67 CSS px) bold. Do not confuse 18 px with 18 pt.
- Components and graphical information needed for understanding: check non-text contrast and relevant states; do not rely on an invisible border to identify controls.
- WCAG 2.2 AA, SC 2.5.8: a pointer target of at least 24 x 24 CSS px or an applicable exception, including the spacing rule. 44 x 44 CSS px is a useful enhanced target, not the universal AA minimum.
- iOS/iPadOS: the HIG reviewed distinguishes a standard 44 x 44 pt control from a 28 x 28 pt minimum; start with the comfortable standard and assess spacing and context. Do not present 44 pt as a universal normative minimum. Android/Material: a 48 x 48 dp touch target. These are different units and ecosystems.

Confirm exact requirements in the official source when auditing. Consult [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and the [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/); do not shrink destructive controls below usable target sizes.

## Functional checks

1. Complete the flow using only the keyboard: logical order, visible focus, no inappropriate trap and no focus hidden by overlays. In WCAG 2.2, [2.4.11, AA](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) assesses whether the **component receiving focus** is not entirely hidden by author-created content; also apply its notes on repositionable or user-opened content. [2.4.12, AAA](https://www.w3.org/TR/WCAG22/#focus-not-obscured-enhanced) requires that no part of the component be hidden. Do not confuse the component with focus-ring pixels; the indicator's visibility and appearance have their own criteria.
2. Test name, role, value and state with a screen reader; prefer native semantics. Announce relevant changes without rereading the entire page.
3. Check text zoom and reflow, including at an equivalent width of 320 CSS px where relevant. Tables and two-dimensional content have specific conditions; do not hide information to "pass."
4. Test enlarged text, Dynamic Type/font scale, high contrast, supported themes, reduced motion and reduced transparency where available.
5. Provide alternatives to dragging, multipoint gestures, hover and precision-dependent actions. Ensure voice/switch operation when it is part of the target.
6. Provide captions, transcripts and audio descriptions according to the media and requirements. Check [speech and timed reading](motion.md#captions-and-speech); typographic effects do not replace complete captions. Do not surprise users with autoplaying audio; allow relevant motion to be paused.
7. Avoid unnecessary memory barriers in authentication: allow pasting, password managers and suitable alternatives to cognitive challenges.
8. Associate error messages with their controls, make correction clear, and do not convey information solely through color, position, sound or animation.

## Evidence

Record device/browser, assistive technology, state, criterion, steps and result. Automated tools find some problems; manual tests and real users cover other dimensions. Do not classify a preferred style as an accessibility failure.
