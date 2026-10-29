# Modes, themes and settings: an executable design contract

Use whenever the request includes settings, preferences, themes, display modes, customization or an administrative panel. Complements adaptive-visual-systems and contracts-trust. Apply the ECC Click-path Audit method: map owners and resets before following controls; ECC Design System: audit consistency and states without inventing scores.

## Required deliverable for broad changes

Produce a record for each setting: **id, label, purpose, type, values, default, default origin, owner/scope, precedence, persistence, handler, preview, commit, cancellation, error/retry, reset, side effect, dependencies, accessibility, test and evidence**. Unknown fields remain unknown. Do not invent defaults because a control is selected in a screenshot.

Separate:
- color mode (preferred and resolved);
- work/navigation mode;
- presentation/density mode;
- accessibility preferences;
- data and maintenance operations;
- identity, account and security.

A tab does not determine data ownership. Sidebar may be global, theme workspace-specific and accent synchronized with the profile. Document actual precedence and its effects when switching context.

## State model

For a form with Save: confirmed -> draft -> preview -> saving -> confirmed, or error with the draft preserved. Cancel restores the confirmed state without writing into another context. Closing and navigation must deliberately handle dirty state.

Dirty state compares meaning, not property insertion order. Normalize defaults, new entries, reset values and persisted data to the same representation before comparing them. After an acknowledged save, verify that the preview is unchanged, dirty is false, and immediate reopen works without a reload. A successful write and a Saved message do not prove that the edit session has committed correctly. A rejected write must retain the draft and remain dirty.

Retain the draft while navigating between tabs in the same session. Saving a section should commit only the fields it owns, even if profile/appearance share a persisted object. Use an explicit field list over the current confirmed state; do not spread another section's entire draft. Test both directions: pending name -> save theme, and pending theme/sidebar -> save profile. Closing and reopening follows the declared discard/resume policy, not the tab-switching policy.

For immediate adjustments: confirmed -> pending -> confirmed/error; state that changes apply automatically and provide appropriate recovery. If debounced, define closing flush, timer cancellation, version ordering and write destination. Do not call closing Save when it does not confirm persistence.

Define the event that commits text: each keystroke, debounce, Enter or blur. "Automatic" is insufficient. Do not recreate the form after every change; update the preview and preserve field identity, selection, focus and the first click on the next control. If change and blur commit the same edit, deduplicate the write. Test actual browser events; directly calling onchange in a test does not cover input -> Tab.

Actions such as creating a library, importing, updating or signing out have their own contracts. Do not hide them behind a general Save. Specify side effects: context switching, closing viewers, cache disposal, remote effects and data retention. A canceled picker is neither failure nor success.

## Theme pipeline

Persisted source -> validation/fallback -> resolved mode -> semantic tokens -> computed DOM/native/canvas styles. Define the first frame, onboarding, multiple windows, OS listener, context override, return to system and reset. Do not turn a reference product's exception (for example, first use always light) into a universal rule.

Tokens include accent fill/on-fill/text; background/surface/overlay; text/border/focus/status. Check JS overrides, alpha and actual backgrounds. App reduce-motion and the OS preference need declared precedence; stop CSS, JS, shaders and smooth scrolling when appropriate. High contrast is a mode, not a certificate.

Also separate category, customizable-object and action colors. Saving theme/accent must not change a category's color identity or an object's stored color value. Check those values and the composited appearance after saving and reloading across relevant surfaces.

## Anatomy and interaction area

A native label associated through `for`/`id` or equivalent can expand field access without turning an entire row with multiple controls into an ambiguous action. An `aria-label` name does not make the visual heading clickable. Test clicking the label, drawing and target, as well as keyboard use.

Swatches, switches and icons may have drawings smaller than their interactive areas. When enlarging the area, confirm final `box-sizing`, padding, border and `background-clip`; an old media query can shrink the box and further reduce the painted area. Choose dimensions by platform and context without universalizing Pauta's values. Preserve selection and focus indications around the functional target.

## Click-path audit

For each control: event -> calls in order -> state read/written -> resets -> actual await -> return -> final rendering. Ask: does a later effect undo an earlier one? Does the optimistic parent restore a value not yet persisted? Does the response belong to the current context? Does the cache depend on this value? Does feedback confirm the same operation that just completed?

In REA, record the hash/version and exact source. Distinguish UI observation, static recovery and reproduction. If the AST is partial, supplement with targeted reading and label the origin; never claim REA executed the control.

## Minimum acceptance criteria

- Save confirms storage; failure preserves the draft and allows retry.
- Cancel/Escape/outside click have a coherent policy and restore focus.
- Reset states its scope and resulting value; it does not accidentally remove identity/data.
- Switching context with a pending write does not write to the wrong destination.
- Asynchronous import/export captures session, section and revision; closing/switching tabs invalidates the response when the operation belongs to that section. Discarding an old response does not automatically cancel reading/computation: declare what was interrupted.
- Global and local preferences have predictable precedence, shown when relevant.
- Restarted/reopened state matches persisted state.
- Invalid values/migration receive explicit fallback without silently overwriting data.
- Toolbar, list, grid and reading density are independent when necessary.
- Labels, help, disabled reasons, keyboard support and accessible status accompany each option.
- External/destructive operations retain their own permissions and confirmations.

## Representative tests

Theme-only Save with an error; draft -> Escape -> reopen; live preview -> discard before/after debounce; OS changes in system mode; global profile overrides a local option; workspace switch during a write; compact without changing the grid; reduced motion changes during a shader; an unknown preference from an earlier version; canceled export; partial reset. Record the result, screenshot/state and limitations for each case.

## Regressions observed in Pauta (implementation 1.3)

- **Tokens do not automatically win the cascade.** A textarea retained a white background because of an older, more specific rule while text became light. Inspect computed foreground/background for fields, badges, help and states; correct precedence and repeat combinations. Do not use a token calculation as proof of actual application.
- **One preference, one owner.** Remove legacy toggles that retain density only in local classes when a persistent controller owns the value. Toolbar and Settings must read the same state.
- **Reachable mobile settings.** Do not hide the gear with secondary actions when narrowing the header. Preserve the target, search and keyboard access; long dialogs need scrolling and reachable actions.
- **Validate the focus loop in the target browser.** A native dialog provides a semantic foundation, but test Tab/Shift+Tab at the boundaries, Escape, return focus and interaction with other overlays. Correct the observed path without declaring full compliance solely from the dialog element.
- **Persistence testable without the browser.** Isolate normalization/read/save with a storage adapter. Cover write errors, corruption, future versions and defaults without overwriting data during reads. Separate adapter testing from failure injection in the form: the former does not prove the latter.
- **Matrix and limits together.** Report pairs, themes, accents and states actually measured, the minimum obtained and untested areas. A good contrast ratio in eight elements does not certify the whole screen.
- **Conflicts between windows.** If another window saves while a draft is open, communicate the policy: retain the draft and overwrite on confirmation, or resolve the conflict. Cancel should return to the latest confirmed state, not an obsolete snapshot.

## Settings with different contracts in one window

Verified case in the audited desktop reference, artifact 0.19: Profile, Libraries, Data, Appearance and Account tabs. Do not invent General/Shortcuts/About tabs out of habit. Full modal: width `min(980px,100vw-56px)`, height `min(728px,100vh-72px)`, scrollable content and a separate footer. Tabs have icons above text and horizontal overflow. These values are a desktop reference, not a universal mobile specification. The quick lighting editor is another component, nonmodal in the panel corner.

- Profile and Appearance edit a draft until Save. Card color belongs to the profile, accent to the UI, cloth to the library and wash to the environment.
- Libraries cover name, pattern and color persist immediately. A global Save button does not imply rollback of those operations. Selecting a book opens details; opening the library is another action.
- Data executes independent operations: backup, export, import and trash. Progress, cancellation, scope selection and destination belong to each operation. Confirm backup recovery with a restore test; creating a file does not prove recovery.
- Account groups identity/license/session, version/update, help and legal links. Do not propagate email, license or identifiers into examples/documentation without need.

Classic/Rail changes global navigation architecture, not editor content. Ownership of sidebar, counts, compactness, contrast and motion must be explicit. Test reading with a narrow sidebar, truncated names, icons without text and an equivalent keyboard command. A saved local profile, remote profile synchronization and library state are separate confirmations.

Menu criterion: document each action's effect before automating it. 'Check for updates' may start a download; New library may have different contracts in the menu and shelf; deleting a library is not equivalent to emptying trash. During an audit, inspect these paths without confusing a click with authorization to execute the final operation.

## Libraries, files and platform limits

- **Create, select, open and archive are separate actions.** Define which changes the active library, where focus goes and what happens to searches/drafts/jobs. Archiving the active library requires a valid destination; task trash must not remove the library. Switching context clears/closes filters and popovers that do not belong to the new destination.
- **Import is an input boundary.** Validate version, size/count limits, fields, duplicate IDs, enumerations and colors before persisting. Never insert an arbitrary color into `style.background`: a `url(...)` value can trigger external access. Local image content should accept only explicitly supported raster formats, dataURL/base64 and bounded size; reject remote URLs and SVG when not supported. Validate again before rendering. An imported file does not become trusted because the user selected it.
- **An asynchronous image belongs to a draft.** Pin library + item + generation before decoding/processing. If A starts, B starts later and A finishes last, only B may update the draft. Removing the image also invalidates previous jobs; an old completion must not clear a new upload's input. Close bitmaps/release temporary URLs on success, error and cancellation.
- **Importing is not restoring.** In Pauta, import creates new libraries/IDs and preserves existing ones. Backup includes the profile and libraries. The explicit "Also restore profile from backup" option, unchecked by default, validates and writes the profile along with the new libraries; importing without it preserves the current profile. Active-library identity, theme and lighting are not restored by backup. Declare those limits and test recovery of each entity before offering "complete restoration."
- **Download started is not a confirmed file.** A Blob link can generate JSON/ZIP/PNG, but does not confirm destination, browser writing or a safe external copy. Distinguish "file generated" from "backup verified"; open the artifact and execute a controlled round trip. Folder export must generate actual interoperable content, safe names and collision handling.
- **Port capabilities, not native promises.** A browser may offer a local profile, origin-scoped libraries, downloads and a clipboard subject to support/permission. That is not equivalent to an authenticated account, synchronization, native folder, Eagle importer or installed-app updating. Do not display fictitious login/license/update actions to fill the reference composition; explain local state and provide only implemented paths.
- **Persistence is a product transaction.** Validate a candidate copy, write and only then replace confirmed state/emit success. On quota exhaustion or incompatible format, retain the last state and a recoverable draft. Additive import, backup, deletion and restoration need visible failures independent of appearance Save.

Checking storage functions proves serialization/contracts, not the entire form, download, import and return-focus cycle. Record those levels separately.

## Settings composition

Forms can sit beside the object in wide panels and precede the preview in narrow panels. Choose according to the task, retaining the same semantic DOM order when stacked. Use container width, not only viewport: a 700px dialog on a wide monitor is still a narrow panel. Reserve dedicated space for closing, scrollable tabs and the footer; error text must not push the save action outside reach. Long names, two-line statuses, a single item and the last archivable library are part of the test.

When the object is the approved focus, reserve space for its closed **and open** envelope, including perspective and controls. The form can have bounded width and independent scrolling (`min-height:0` in flex/grid layouts when needed). Do not shrink the entire object to accommodate an excessive secondary column or accept content clipping to make it fit. Check short desktop windows and resizing with the object open; a wide viewport does not guarantee usable modal space.

When consolidating a previously separate profile into Settings, reuse its component, state and editing entry. Legacy links can open the same panel; avoid two diverging versions of the form. After saving, update affected consumers without remounting the current session or destroying the element that should regain focus. Test opening from each actual entry -> edit -> save/fail -> close -> reopen, and focus return after commit, not only Cancel. Also verify global and contextual data with another context active.
