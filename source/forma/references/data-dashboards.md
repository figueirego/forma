# Temporal and geographic dashboards

Use for operational monitoring, indicator maps, observatories, and time series. A geographic map, relationship graph, and authored Canvas answer different questions. Reuse [search](search-discovery.md), [contracts](contracts-trust.md), [accessibility](accessibility.md), and [layout](layout-spatial-contracts.md); do not impose maps on tasks better served by a list.

## Data and topology in exported assets

For static charts, slides, or report figures, keep received data separate from declared transformations and presentation. Record units, precision, and relevant filtering, aggregation, sorting, normalization, and percentage-change rules. Check derived values against the source; do not rewrite numbers to fit the composition. A hash identifies a snapshot, but proves neither its truth nor that a formula was applied. Values estimated from an image must be identified as such in the deliverable.

When restyling a diagram, compare node IDs/labels, edge source/destination, direction, type, label, and cardinality, plus groups. Layout can change without changing meaning; count and check relationships in the exported SVG/document and examine where arrowheads end. A text-presence check does not prove topology. These contracts do not require D2, ECharts, or a new engine; use the project's appropriate stack and [export contract](artifact-workflows.md).

## Scope contract before the chart

Record only applicable fields: `entity/territory + metric + population + period/snapshot + granularity + filters + comparison + temporal mode`. Every panel must declare its own scope when it differs from the main selection; a fixed national total must not look like the selected city's total.

The same applies to products without geography: "completed across the entire library" and "tasks found in this subject" can coexist if labels distinguish their sets. Do not change the denominator merely to visually follow the list, or retain a global total under a label suggesting filtering. When reorganizing into a narrow area, compact or reposition the necessary summary; hiding it without equivalent access removes task information.

| Field | Verifiable decision |
|---|---|
| Metric | Numerator, denominator, unit, aggregation, and rounding; counts, rates, proportions, and deltas are not interchangeable |
| Coverage | Received observations versus eligible population; missing, zero, partial, and out-of-scope have distinct states |
| Time | Data timestamp, receipt, and screen update; time zone and expected cadence when relevant |
| Comparison | Declare the compared dimension; align definition, units, windows, and coverage. Fixed cohorts and variable populations are different contracts; explain eligibility or territorial-boundary changes |
| Identity | Stable IDs and boundary version; identical names are not join keys |
| Origin | Source, update, and method; capturing a page does not authenticate the data it claims to display |
| Estimate | Relevant label, horizon, reference time, method, and uncertainty, separated from observations and confirmed conclusions |

**Synthetic** example: in the same window, region A serves 40 eligible people, counted once each, out of 100 eligible people; B serves 60 out of 200. B serves more people but has a smaller proportion: 30% versus 40%. For regions with disjoint populations and the same definition, the total is 100/300, not the simple average of the two percentages. Do not sum people from overlapping periods as though they were distinct.

If a proportion changes from 40% to 30% across comparable periods, that is -10 percentage points and -25% relative change. Service events per eligible person, however, form a ratio: one person may have several events, so this is not automatically the percentage of people served. A zero or unknown denominator must not conveniently produce 0%.

## Composition and visual language

Before choosing a style, formulate **screen question -> observation supported by data -> available action**. Show the product and scope; do not replace orientation with a generic greeting or force an insight unsupported by the data. The initial area should prioritize frequent tasks without compressing the entire application above the fold. Density depends on task, usage frequency, and actual dimensions.

Values repeated in KPIs, charts, tables, tooltips, and promotional fragments must derive from the same source and declared transformations. Preserve domain precision policy: do not alter financial calculations to make visually rounded values sum. Explain rounding differences when necessary. An increase is not automatically good: change color represents meaning (for example, higher latency may be worse), with redundant sign/text; category and identity do not become success semantics.

Derive marks and legends from the same series/state mapping. If absence uses hatching, the legend must show hatching, not merely an approximate color. Legends distinguish displayed types and make omissions explicit when relevant. In tables, align numbers for comparison and retain units and precision; at narrow widths, provide access to required fields instead of hiding them simply to fit. Zebra stripes, borders, cards, and colors are contextual choices: preserve approved conventions and test comparisons across rows and series.

Organize by task: scope and freshness -> summary -> exploration -> detail. On wide monitors, a central map can coexist with a stable summary and contextual panel; each area needs defined width, insets, scrolling, and priority. Calculate usable center after panels without centering all text. Compare minimal content, long names, and open details.

One family for UI and another for headlines can distinguish operation from interpretation. This choice is optional: verify weights, tabular numbers, loading, licenses, and actual readability. Density comes from alignment, grouping, and reduced repetition; shrinking the entire interface does not replace reflow.

Separate color roles:

- **Categorical identity:** recognizable entity/series across map, list, and chart; name, symbol, or label also identifies it.
- **Sequential magnitude:** higher/lower values with an ordered scale and legend. Do not use a category color to mean progress without explaining the changed interpretation.
- **Divergence:** only with a meaningful center, such as a difference from a declared baseline.
- **Operational state:** updates, warnings, errors, focus, and selection independent of data colors.
- **Surface:** neutrals, borders, and elevation change across themes; data values and meaning remain.

If the object also has a freely chosen user color, name that role separately from its category and the interface accent. Changing a task color must not look like changing its subject; changing the accent must not recode categories. A decorative strip and textual label can coexist without requiring colored fills on every surface.

When changing metrics/filters, update legend, units, tooltips, accessible names, and selected state together. Make scale-limit changes perceptible; the same color must not silently suggest the same value. Measure composite contrast and series readability in supported themes.

To choose and evaluate the scale, use [color refinement](color-refinement.md). A categorical palette does not become a quantitative scale through hex order; classes and domain depend on data. Do not extend a small palette to many categories without checking distinction at actual size, labels, and states. Perceptual proximity, tonal ordering, and text contrast answer different questions.

## Maps and quantitative encoding

A large region occupies more area without necessarily having more people or occurrences. Justify territorial fills, proportional circles, peaks, or tables by the question. Rates and counts require different interpretations; make the value-to-area/height transformation explicit, including square root, log, or clamp where used.

Legends explain what varies, units, range boundaries, and missing data. Do not confuse zero with missing data. Identify approximate boundaries as approximate; do not assign cadastral precision to an estimated area.

Provide search/list access to small territories and a textual alternative for exact values. External labels with leader lines can prevent overlap but must preserve unambiguous association. Hit testing, selection, and zoom must follow the geometry actually drawn. A depth effect does not prove a 3D engine; choose SVG, Canvas, or WebGL according to need while measuring performance and access.

On object maps, visual grouping does not imply semantic edges. Declare the meaning of groups, bands, size, and position. Reserve a real region for filters, legends, and controls; calculate fit/zoom using the canvas's remaining area, not the entire dialog. If painted titles are abbreviated, an equivalent List must offer complete text and the same actions. Opening an object from that list moves focus to its detail; closing without navigation restores focus to the trigger.

## Live, historical, and failure states

Define **reading mode** (latest, historical snapshot, or playback) separately from **health/freshness** (connected, reconnecting, delayed, no data, closed). An advancing clock does not prove new data arrived. Show the latest relevant information and actual state; do not invent a universal cadence for declaring delays.

On entering history, fix the snapshot or compatible set; refreshing must not silently pull the user back to the present. Timelines need a name, readable temporal value, relevant time zone, keyboard operation, and explicit return to latest. Do not fabricate intermediate snapshots to fill gaps. Pixel tweening is a visual transition, not a data record.

If a layer exists only for the present, historical details must communicate its unavailability or show the current layer with its own temporal label. Do not reuse current values as past values. For nonexistent times, preserve the previous selection or offer clearly identified recovery; the notice and final state must agree.

Map, totals, ranking, and detail use compatible revisions/scopes. When one fails, retain useful data with explicit staleness without presenting incompatible totals as simultaneous. Cancellation and request keys must prevent late response A from replacing selection B. Follow existing architecture; do not add complex storage merely to satisfy this contract.

## Exploration, focus, and URL

Typed search disambiguates results by type and context, for example "municipality / state" or "equipment / unit." On opening, synchronize selection, map, detail, and trail; move focus to a useful destination. Escape and back restore relevant position/context. Test shortcuts inside editable fields too, to prevent conflicts.

Reclassifying the last object in a filter may empty the selection. Preserve the filter and communicate the absence with an explicit exit; do not silently widen to "all" or present filtered emptiness as completed work. If the focused control disappears, choose a useful destination by identity, such as the scope selector. Updating data in the same library may preserve selection/filters; switching libraries has a different contract. Generic callbacks must not apply context-switch resets to every update.

Main navigation, segmented controls, and specific filters must reflect the same final scope regardless of trigger. Synchronize appearance and accessible state from that state; clicking "Completed" must not leave "Today" announced as the current view. Use `aria-current`, `aria-selected`, or `aria-pressed` according to control semantics, not interchangeably.

Use stable URL identifiers for scope that must be shared/restored. Declare included fields: territory, metric, filters, comparison, and, when promised, timestamp. Latest-state links and snapshot links have different contracts. Reloading, opening another session, back/forward, and invalid parameters need recovery. Camera, hover, and transient tabs need not always be included; do not promise exact reproduction when they are omitted.

## Adapt width and update frequency

In narrow spaces, distributing Map/Explore/Results across sections may preserve work better than compressing three columns. Define which summary persists and the reading order; keep content, selection, and filters reachable. If a view mode is unsupported, communicate the alternative and preserve intent where possible. Hiding a feature does not prove platform equivalence.

Test available height, virtual keyboards, orientation, enlarged text, and safe areas. Timelines, tab bars, legends, announcements, and chat must not cover targets or trap scrolling. Search/list must also work without panning, hovering, or precision gestures.

Updates must not reorder rows under the pointer or steal focus. Use concise accessible announcements, a useful frequency, and pause when necessary. Animation must be interruptible and respect reduced motion; invalidating only changed layers is an optimization hypothesis to measure. Record chat provenance and context; its presence does not prove snapshot access or the ability to explain data. Treat external content according to [contracts and trust](contracts-trust.md).

## Minimum contextual rehearsal

1. Manually check one metric, including zero, absence, partial coverage, and rounding.
2. Switch metric and theme: series, legend, units, focus, and absence remain understandable.
3. Open details through search and return; verify URL, focus, and out-of-order responses.
4. Enter history during refresh; test an available snapshot, a gap, and a layer without history; return to latest.
5. Compare periods with differing cohorts/boundaries; do not display misleading deltas.
6. Open the link directly/reload; verify only the state the contract promises to restore.
7. Navigate by keyboard and at small widths/heights; confirm map alternatives and content access.

Observational basis: [Seu Imposto](https://seuimposto.com/), "Apuração 2026" interface inspected on 2026-10-25. The [factual profile](../assets/reference-profiles/seuimposto-2026-10-25.json) stores light/dark tokens, declared fonts, dimensions, and hashes; it is not a mandatory preset. An original adaptable synthesis, not a copy of the site or validation of its results. Technological identity, observations, and limits are in the factual profile; the criteria above include recommendations beyond tested flows.
