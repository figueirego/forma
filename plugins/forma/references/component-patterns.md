# Component decision catalog

Choose based on required behavior, then appearance. Recipes are stack-agnostic contracts; use native components or the existing library. Check current APIs before implementing.

When the request is to reuse the combined appearance of background, sidebar, buttons, and fields, use the [clean interface foundation](clean-shell.md): it includes portable CSS and a working example. These tables still define semantics and states; the recipe adds composition and hierarchy relationships without replacing the stack.

## Actions, feedback, and confirmation

| Pattern | When to use | Contract | Adverse test |
|---|---|---|---|
| Button | Local command or submission | Explicit name, focus, pressed/busy when applicable; content does not unexpectedly change width | Double-click, keyboard, slow request, and error |
| Link | Change location/resource | Real destination, semantics, and browser behavior | New tab, back, unavailable URL |
| Toast | Nonessential transient confirmation | Does not steal focus; important actions remain accessible elsewhere | Screen reader and timeout |
| Inline banner | Persistent failure or condition | Context, consequence, and recovery near the affected area | Long content, retry, and partial error |
| Dialog | Necessary decision/interruption | Title, focus, safe cancellation, specific confirmation, and return | Escape, outside click according to contract, removed trigger |
| Undo | Reversible operation | Real window/deadline and scope; confirmed restoration | Undo failure, expiration, and navigation |

Do not make a div clickable for aesthetics. A tooltip supplements a named control; it is neither the sole source of essential instructions nor a container for interactive actions.

## Forms

| Need | Initial pattern | Avoid |
|---|---|---|
| One of a few mutually exclusive options | Radio group | Independent toggles that allow an invalid combination |
| Immediately applied preference | Switch with explicit state | A switch that takes effect only after a hidden button |
| Select multiple items | Checkboxes or list selection | Unexplained indeterminate state |
| One option from a large set | Select/combobox with search according to volume | Custom dropdown without keyboard or screen reader support |
| Precise value with a unit | Numeric field and unit indicator | Slider as the only precision input |
| Domain-specific date | Appropriate control and explicit format | Calendar that makes distant dates difficult |

**Example: save profile.** Idle -> editing -> submission -> confirmation or errors. Server validation associates codes with fields. Preserve the draft during submission; do not clear fields on a 422. If the session expires, reauthentication must preserve intent without storing secrets. Name and email are examples, not mandatory form fields.

**Acceptance:** the user can identify the error, correct it without repeating valid fields, submit by keyboard, and perceive confirmation. Long translations do not overlap messages. Focus changes for a reason, not on every validation.

**Spatial anatomy:** label, field, help, and error form a group. The next group has perceptible separation without duplicated margins from the child and stack. Messages grow without becoming closer to the next field. In preference rows, align multiline text to the top when this improves association; the control retains its functional width and stacks under content pressure. See [spatial contracts](layout-spatial-contracts.md).

## Numeric controls and preview

The control, accessible value, and preview derive from the same state. Do not maintain three competing values in the slider, drawing, and form. Normalize at the update boundary, including programmatic setters, typed text, and imports: finite number, unit, minimum, maximum, step relative to the minimum, and decimal precision. An operation does not alter neighboring controls without an explicit grouping contract.

Define keyboard behavior, reset, and cancellation alongside pointer behavior. An adjustment library with autosave must not silently replace draft -> Save/Cancel. Framework adapters must reuse the update rule and release listeners/subscriptions on unmount. Do not copy a store architecture for a simple field when the existing local state suffices.

**Acceptance:** keyboard, pointer, and setter produce the same final value; extremes and fractional steps do not oscillate; preview and announced value agree; reset restores the expected revision; cancel does not alter saved data; reopening/unmounting does not duplicate handlers. The [control study](site-experiences.md#controls-connected-to-the-preview) motivated these criteria but does not prove their implementation in a consumer.

## Navigation and disclosure

Tabs switch sibling panels, accordions reveal content, and menus contain commands/options. Do not treat them all as visual versions of the same component. Define selection, focus, history, and URL separately. Actual navigation tabs need coherent routing; local tabs need not invent pages.

A sidebar may collapse under content pressure; preserve accessible labels and selection indication. Breadcrumbs express hierarchy, not history. A command palette complements discovery and must not be the only route to an essential function.

## Operational tables and lists

**Example: orders with filters.** Define a stable key, columns, initial sorting, active filters, count, and pagination. Distinguish "select page" from "select all results." Batch actions report how many items and which ones failed. Changing a filter requires an explicit rule for the existing selection.

**States:** no records, no filtered results, initial loading, refresh with old data, partial error, removed record, and missing authorization. Do not replace financial data with skeletons on every refresh.

**Mobile:** choose an identifiable scrolling table, prioritized columns, or row details according to the task. Hiding a column requires alternative access. Virtualization needs focus/semantics tests; if it breaks access, use pagination or an appropriate alternative.

**Acceptance:** sorting is deterministic, filters can be cleared, state persists on return according to the contract, selection does not change identity after refresh, and partial actions do not announce total success.

**Spatial anatomy:** header and rows share column guides/insets; comparable numbers retain their alignment edge; title/metadata belong to the same group; actions do not invade long text. In flex/grid, allow text to shrink and wrap before reducing font size. Define when to truncate and how to access the full text.

## Upload and asynchronous processing

Show actual formats/sizes before uploading. Validating -> uploading -> processing -> completed are different states. Offer a picker alongside drag/drop, readable filenames, measurable progress, and per-file retry. Canceling transport does not guarantee canceling remote processing.

**Acceptance:** an invalid file does not remove valid ones; connection loss distinguishes confirmed failure from an unknown outcome; confirmation represents the final result.

## Search, filters, and recommendations

Querying, selecting, and submitting are different actions. Debouncing must not delay local keyboard interaction or let obsolete requests overwrite current results. Make requests cancelable when supported and discard out-of-order responses. Display the query that produced the result.

Recommendations must distinguish algorithmic ranking from selected sorting, advertising from results, and suggestions from truth. History and suggestions must not leak data across users/tenants.

## Empty states and onboarding

Identify the cause before composing: newly created, filter, permission, synchronization, or failure. Usually only the first case calls for "get started." An illustration does not replace explanation. Provide a useful first step and an identified example when it aids understanding.

## Shared quality control

For dialogs/panels, align relevant header/body/footer insets and assign scrolling to an explicit region. A centered title needs a defined reference: asymmetric tracks can shift it even with `space-between`. Chips and error messages may increase height; the body must adapt without a fixed calculation that clips the footer or results.

For each pattern used, document only differences from the existing component: initial state, event, result, error, focus, and extreme content. Do not copy all these contracts into the project when the library already implements them and they have been verified.
