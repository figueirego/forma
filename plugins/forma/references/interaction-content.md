# Interaction, data, and content

## State contract

For every relevant action, specify trigger, precondition, feedback, persisted outcome, error, cancellation, and repetition. Cover applicable states, not a mechanical list on every screen:

| State | What the user needs to know | Behavior |
|---|---|---|
| Initial/empty | What belongs here and how to start | Relevant action; distinguish empty content from filters with no results |
| Loading | What is pending | Preserve context; skeleton only when the shape is predictable |
| Success | What completed | Proportionate confirmation, next step, or return |
| Partial error | What worked and what failed | Retry only what is necessary; retain valid data |
| Offline/stale | Freshness and limits | Distinguish cached from current data; indicate synchronization |
| No permission | Limit and alternative | Do not reveal restricted information; route access requests when permitted |
| Conflict | Which version differs | Resolve or preserve both without silent overwriting |

## Navigation, dialogs, and commands

Keep back navigation, history, and filter state predictable. Use links for navigation and commands for actions. Context menus and shortcuts complement discoverable paths. Do not place exclusive actions behind hover or long press.

Use a modal for a necessary interruption. Define an accessible name, initial focus, focus boundary, risk-appropriate Escape behavior, and return to the trigger. If the trigger disappears, choose a logical destination. Nonmodal popover content has a different contract. Destructive actions need clear consequences, confirmation, or undo according to reversibility and risk.

## Forms and onboarding

Use persistent labels, instructions before likely errors, and messages beside fields. Validate when helpful without penalizing incomplete typing. Preserve data on error; summarize errors in long forms with links to their fields. Distinguish required, optional, and unavailable.

Offer autofill, paste, password managers, and appropriate keyboards. Explain units and formats; avoid ambiguous dates. Show real progress in multistep flows, permit review and back navigation without lost content. Onboarding should lead to first value, be skippable when possible, and reappear as contextual help.

## Tables, search, and charts

Tables suit comparisons across attributes; cards are not automatically better. Define alignment, units, headers, sorting, and selection state. Pagination, virtualization, and incremental loading depend on volume and task. Preserve keyboard access and position during updates.

Search must show the active query, filters, results, and recovery. Distinguish no results, network errors, and insufficient permission. Do not imply that a partial search covered the entire collection.

For search with suggestions, color, tags, history, or AI, use [search and discovery](search-discovery.md). An anchored field, color picker, and command palette may be three different surfaces: do not automatically transfer modality, blur, keyboard, or dismissal rules between them.

For charts, choose the type based on the question: comparison, change, distribution, or relationships. Identify scale, period, unit, source, missing data, and uncertainty. Avoid misleading axes, decorative 3D, and reliance on color. Offer a text/table alternative and access to tooltip information without a mouse.

For monitoring, indicator maps, or temporal comparison, read [temporal and geographic dashboards](data-dashboards.md). Define the scope, denominators, and snapshot identity before connecting panels; current values must not appear as historical data, and old responses must not replace the latest selection.

## Content and localization

Write specific actions, clear consequences, and recoverable errors: what happened, what was preserved, and the next step. Use consistent domain terminology. Do not truncate quotations in ways that alter meaning. Do not invent attributions.

Prepare pluralization, RTL, dates, time zones, currencies, and local numbers; do not concatenate translatable sentences. Test expansion and long strings. Do not use a flag as a synonym for language. Alt text describes purpose/context; decoration need not be narrated.

## Collaboration and AI

In collaborative editing, distinguish presence, editing, saving, and confirmed version. Handle disconnection, conflicts, and permission changes during the session. For AI, distinguish suggestion from execution, streaming from completion, and confidence from certainty. Include editing, interruption, retry, source review, and reversal when appropriate.

When closing an autosaved document, wait for the current version to flush. Failure must preserve the draft and offer retry or explicit discard; do not swallow the exception and close anyway. "Saved" must identify the destination: local storage does not prove remote synchronization. Exporting/copying a draft is also not equivalent to persisting the source form.
