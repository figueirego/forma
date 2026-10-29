# Website studies: techniques and limits

Sample investigated on 2026-10-29 in the IAB browser, CSS viewport **1280 x 720**, DPR **2**. The three studies below are bounded; they do not represent an audit of the 202 sites. Index lookup remains marked as a historical candidate. No code, media or fonts were copied into the package, and no dependencies from these sites were installed. Raw third-party captures remain outside the distribution. To repeat or expand the work, use the [experience protocol](experience-library.md).

## Controls connected to the preview

**Source:** [DialKit](https://www.dialkit.dev/). **Observed:** the typography weight control changed from 450 to 800 using the End key; the heading's computed `font-weight` followed the change. This confirms that desktop interaction, not every control.

**Code read:** [store](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/store/DialStore.ts#L516), [normalization](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/numeric.ts#L9) and [React adapter](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/hooks/useDialStorePanel.ts#L47). Snapshot `1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c`, package 2.1.0, [MIT copyright 2026 Josh Puckett](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/LICENSE). There is a shared store and adapters; this study did not prove that the site deploys that commit. Upstream tests were not run.

**Forma decision:** preserve one state source for the control and preview, normalize every input and release subscriptions on unmount. The programmatic path examined does not normalize every slider; preset autosave is also not equivalent to Save/Cancel. Therefore, do not transfer those policies to our editors.

**Documented application:** [control contract](component-patterns.md#numeric-controls-and-preview). Consumer implementation remains pending. Test keyboard, pointer, setter, extremes, fractional steps, reset, cancellation and neighboring controls.

## Typography demonstrated in content

**Source:** [PP Neue Montreal](https://neuemontreal.com/). **Observed:** section navigation and comparison of weights in headings/body text. Clicking Weights moved to the demonstration region. The DOM declared `Framer b354274`; the initial heading used the PP Neue Montreal Text Regular family at 24px. This does not identify every animation mechanism.

**Forma decision:** compare headings and reading text using real content, accents and numbers; preserve size, weight, line height and line length as distinct roles. The visual sample with very thin text over video requires legibility testing, not automatic adoption. Use the [visual system](visual-system.md) and [spatial contracts](layout-spatial-contracts.md).

**Rights and limits:** the commercial typeface and assets were not incorporated; a reuse license was not established in this study. Independent reconstruction uses the project's authorized fonts. Mobile, screen readers, all scroll states and reduced motion were not tested. Consumer validation must cover those conditions and font fallback.

## Data with a text representation

**Source:** [thoughtbot's healthcare software report](https://thoughtbot.com/healthcare-software-delivery-report). **Observed:** editorial regions, statistics, comparison lists and a methodology section. The DOM exposed values through accessible labels, such as percentages, and eight canvas elements. The excerpt captured during entry showed an intermediate count; do not use that frame as the final value.

**Forma decision:** separate final data from presentation animation and retain an equivalent text representation. Canvas elements do not prove WebGL or any specific library. When a counter animates, keyboard/screen-reader behavior and comparison captures must distinguish transitions from stable results. Use [data and dashboards](data-dashboards.md).

**Rights and limits:** research figures were not reused as product data, and site code/assets were not reused. Scientific validity, real screen-reader use, performance and mobile behavior were not audited. For the consumer, compare values/legend/text, interrupt animation, and test reduced motion, loading and missing data.

## What enters the knowledge base

Include questions, decisions, contraindications, sources and verification paths. Public code may be studied or adopted according to its license; renaming it does not make it Forma-authored. An experience becomes validated at the destination only when it has its own consumer and evidence. The other sites remain investigation candidates according to the use case.
