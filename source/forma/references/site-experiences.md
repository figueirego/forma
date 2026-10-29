# Website studies: techniques and limits

The first three studies were investigated on 2026-10-29 in the IAB browser, CSS viewport **1280 x 720**, DPR **2**. Two portfolio observations below have their own recorded conditions. These bounded studies do not audit the complete inventories. Identity lookup remains marked as historical candidates; [observed-experience retrieval](reference-library.md#search-observed-experiences) searches specific dated findings separately. No code, media or fonts were copied into the package, and no dependencies from these sites were installed. Raw third-party captures remain outside the distribution. To repeat or expand the work, use the [experience protocol](experience-library.md).

## Controls connected to the preview

**Observation date:** 2026-10-29.

**Source:** [DialKit](https://www.dialkit.dev/). **Observed:** the typography weight control changed from 450 to 800 using the End key; the heading's computed `font-weight` followed the change. This confirms that desktop interaction, not every control.

**Code read:** [store](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/store/DialStore.ts#L516), [normalization](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/numeric.ts#L9) and [React adapter](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/hooks/useDialStorePanel.ts#L47). Snapshot `1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c`, package 2.1.0, [MIT copyright 2026 Josh Puckett](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/LICENSE). There is a shared store and adapters; this study did not prove that the site deploys that commit. Upstream tests were not run.

**Forma decision:** preserve one state source for the control and preview, normalize every input and release subscriptions on unmount. The programmatic path examined does not normalize every slider; preset autosave is also not equivalent to Save/Cancel. Therefore, do not transfer those policies to our editors.

**Documented application:** [control contract](component-patterns.md#numeric-controls-and-preview). Consumer implementation remains pending. Test keyboard, pointer, setter, extremes, fractional steps, reset, cancellation and neighboring controls.

## Typography demonstrated in content

**Observation date:** 2026-10-29.

**Source:** [PP Neue Montreal](https://neuemontreal.com/). **Observed:** section navigation and comparison of weights in headings/body text. Clicking Weights moved to the demonstration region. The DOM declared `Framer b354274`; the initial heading used the PP Neue Montreal Text Regular family at 24px. This does not identify every animation mechanism.

**Forma decision:** compare headings and reading text using real content, accents and numbers; preserve size, weight, line height and line length as distinct roles. The visual sample with very thin text over video requires legibility testing, not automatic adoption. Use the [visual system](visual-system.md) and [spatial contracts](layout-spatial-contracts.md).

**Rights and limits:** the commercial typeface and assets were not incorporated; a reuse license was not established in this study. Independent reconstruction uses the project's authorized fonts. Mobile, screen readers, all scroll states and reduced motion were not tested. Consumer validation must cover those conditions and font fallback.

## Data with a text representation

**Observation date:** 2026-10-29.

**Source:** [thoughtbot's healthcare software report](https://thoughtbot.com/healthcare-software-delivery-report). **Observed:** editorial regions, statistics, comparison lists and a methodology section. The DOM exposed values through accessible labels, such as percentages, and eight canvas elements. The excerpt captured during entry showed an intermediate count; do not use that frame as the final value.

**Forma decision:** separate final data from presentation animation and retain an equivalent text representation. Canvas elements do not prove WebGL or any specific library. When a counter animates, keyboard/screen-reader behavior and comparison captures must distinguish transitions from stable results. Use [data and dashboards](data-dashboards.md).

**Rights and limits:** research figures were not reused as product data, and site code/assets were not reused. Scientific validity, real screen-reader use, performance and mobile behavior were not audited. For the consumer, compare values/legend/text, interrupt animation, and test reduced motion, loading and missing data.

## What enters the knowledge base

Include questions, decisions, contraindications, sources and verification paths. Public code may be studied or adopted according to its license; renaming it does not make it Forma-authored. An experience becomes validated at the destination only when it has its own consumer and evidence. The other sites remain investigation candidates according to the use case.

## Responsive portfolio navigation

**Observation date:** 2026-10-29.

**Source:** [Brittany Chiang](https://brittanychiang.com/), portfolio ID `portfolio-d7c345f188eb7b53047d`. Requested `https://brittanychiang.com`; resolved to the trailing-slash URL. Observed on 2026-10-29 through CUA browser interaction and read-only DOM measurements. Desktop CSS viewport: 1280 x 800; narrow viewport: 390 x 844. DPR was not recorded.

**Observed:** Header computed sticky at 1280x800 with top 0; static at 390x844. Section nav hidden on narrow layout.

**Observed:** Projects navigation click updated URL to #projects and moved document while header remained visible. Screenshot taken during scrolling, not proof of animation final position.

**Observed:** Measured body background rgb(15,23,42), h1 rgb(226,232,240), h1 48px desktop and 36px mobile. Body font differed from inherited content font: content uses Inter family.

At 390 x 844, document scrollWidth was 390. Use these findings to investigate responsive section navigation and typographic hierarchy in a portfolio. Hiding the section links is an observed behavior, not a recommendation to remove access in another project. The color measurements are not a complete contrast audit.

**Unverified:** No screen reader or touch event observation. Technology names in footer are author claims, not bundle verification. No full contrast or motion audit.

## Progressive portfolio biography

**Observation date:** 2026-10-29.

**Source:** [Lee Robinson](https://leerob.com/), portfolio ID `portfolio-22dc6f16f0921028c678`. Requested `https://leerob.io`; resolved to `https://leerob.com/`. Observed on 2026-10-29 through CUA browser interaction and read-only DOM measurements. Narrow CSS viewport: 390 x 844. Desktop dimensions and DPR were not recorded in the receipt.

**Observed:** Clicking Long changed bio content length from 443 to 4908 characters and aria-pressed from false to true; Default returned to 443.

**Observed:** Compact biography, notes list and dated article links remain separate semantic regions.

**Observed:** At 390x844 document scrollWidth equaled 390 after returning to Default.

Use these findings to investigate a compact introduction with an explicit expanded biography, separate reading regions, and narrow-layout reflow. Content length and pressed state verify that recorded toggle sequence; they do not prove keyboard-only access, persistence, or the behavior of other controls.

**Unverified:** No code/framework verification. No keyboard-only or screen reader audit. No performance measurements.

## Portfolio observation provenance

The original local receipt is `outputs/forma-validation-2026-10-29/evidence/reference-observations.json`, SHA256 `81a4553397e151312c9da13864ce3036e78d2ffe3594516ff50490fc60c954bf`. Its capture names are `brittany-mobile.png`, `lee-desktop-expanded.png`, and `lee-mobile.png`. This receipt and those captures are not distributed; the authored summaries above are included. Retrieval checks can validate schema, dates, source assertions and claim-specific matching, but cannot authenticate pixels or prove that these sites remain unchanged. Site identities and assets retain their owners' rights; no asset reuse license was established by observation.

## Keyboard project selection

**Observation date:** 2026-10-29.

**Source:** [Francisco Salido](https://paco.fyi/?utm_source=gh), portfolio ID `portfolio-37001f2ad0b391a1c963`. Requested `https://paco.fyi?utm_source=gh`; resolved URL adds a trailing slash. CUA IAB, 1280x720 CSS viewport, DPR 2.

**Observed:** Clicking slide 1 exposed ParkHub in the accessibility tree; pressing Enter on slide 2 exposed Frameless and changed the highlighted dot.

Automatic cycling occurred between calls and one opacity measurement was intermediate. Selected dots exposed no `aria-current` or `aria-pressed` attribute. Do not infer final timing, pause behavior, accessibility conformance, or the rendering framework. Touch, reduced motion and mobile were not tested.

**Forma adaptation:** use direct, named controls to select a project; preserve project details and links. In the destination, expose selected state semantically, offer pause if auto-rotation is retained, stop unsolicited changes during interaction, and verify keyboard/reduced-motion behavior. This is a decision to validate, not copied site code or a proven consumer implementation.

**Evidence receipt:** `outputs/forma-readiness-2026-10-29/evidence/reference-paco.json`; SHA256 `a6c6344ce88c85b639fa5e3a1959bf899a67f0cfc7fd3c20036eda16632e968f`. Raw third-party screenshots and code are not distributed. No asset license was established.
