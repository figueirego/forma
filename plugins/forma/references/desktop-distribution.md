# Desktop, installers, and distribution

An EXE may be an application or an installer; a DMG is a disk image that may contain an app and other files. Identify the artifact, system, architecture, and technology before deciding on UI or executing content. WPF, WinUI, Avalonia, Qt, AppKit, SwiftUI, Electron, and Tauri have different contracts.

## Desktop application

| Area | Decisions to make explicit |
|---|---|
| Windows | Minimum size, resizing, maximizing, fullscreen, multiple windows, position restoration |
| Input systems | Keyboard, menus, local shortcuts, focus, pointer, touch when supported |
| Displays | Per-monitor scaling/DPI, multiple monitors, screen changes, and usable area |
| Documents | Open/save, recent files, unsaved changes, autosave, recovery, printing |
| Integration | File associations, drag/drop, clipboard, tray/menu bar, notifications, and deep links |
| Accessibility | Native semantics, focus order, high contrast, zoom/text scaling, and screen readers |
| Processing | Background operations, progress, cancellation, pause, and safe shutdown |

Do not redraw window controls and file dialogs unnecessarily. Shortcuts must respect each OS's conventions and avoid global conflicts. Closing a window, quitting the app, and minimizing to the tray are not equivalent; make behavior predictable.

## Distribution journey

Design discovery -> download -> verification -> installation -> first use -> update -> recovery -> uninstallation. Each step identifies the product, publisher, version/compatibility when relevant, destination, and outcome.

- Download: distinguish OS/architecture and format; explain actual requirements, size, and compatible alternatives.
- Windows: distinguish per-user/per-machine installers, elevation when necessary, paths, associations, optional startup, and corporate policies. Do not claim SmartScreen/reputation is resolved merely by signing.
- macOS: distinguish an app in a DMG from a PKG installer; instruct dragging to Applications only when this matches the actual package. Do not advise disabling Gatekeeper to make the flow "smooth."
- Linux: respect the adopted format/channel and permissions model; AppImage, distribution packages, and sandboxes are not interchangeable.
- Installation: account for insufficient space, previous versions, a running process, cancellation, denied privileges, and partial failure. Determinate progress requires real measurement.
- Update: verify authenticity through the existing mechanism, explain restart, preserve work, and handle failure and compatible rollback. Avoid surprise restarts.
- Uninstallation: distinguish removing the program from deleting data; allow export/preservation when applicable without manipulative retention.

## Verification and limits

Install, update, and uninstall only in an authorized environment. Prefer a VM/sandbox or test account when the main computer could be affected. Static inspection does not prove successful installation. Record the tested OS architecture and version.

Code signing, notarization, distribution channels, and store requirements change. Consult Apple/Microsoft/the vendor at implementation time; do not include obsolete commands or credentials in the skill. Designing the flow does not authorize signing, publishing, or changing security settings.

## Interrupted update

| State | Information | Actions | Preservation |
|---|---|---|---|
| Available | Version, reason, restart | Update/postpone according to policy | Session |
| Downloading | Real progress and error | Pause/cancel only if supported | Current app remains usable |
| Ready | Unsaved work, shutdown | Save/restart or continue if supported | Documents/drafts |
| Applying | Operation in progress | No fictional cancellation when unsafe | Data separate from the app |
| Failed | Stage and recovery | Retry/support/previous version only if supported | Known state |
| Recovered | Active version and data state | Resume task | Do not announce the new version after rollback |

When the updater exposes no percentage, show indeterminate progress. Binary rollback may be incompatible with data migrations; do not promise it without a contract.

**Tests according to scope:** clean installation without admin, existing version, unsaved document, insufficient space, lost network, denied privileges, interruption/resumption, invalid signature in a safe fixture, removal that preserves data. Record OS/architecture, previous version, before/after data, and evidence. Do not test destructive failures on the personal host.
