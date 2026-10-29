# Adapt intent to the platform

Do not choose a framework from an artifact's extension. Detect manifests and structure: package.json/Electron/Tauri, pubspec, Xcode/Swift packages, Gradle/Compose/XML, .NET/XAML or Qt projects. A library name in the lockfile does not prove its use on every screen.

## Intent map

| Intent | Web | Native Apple | Android | Windows/.NET |
|---|---|---|---|---|
| Adaptive layout | Grid/flex, intrinsic limits | Layouts and size classes appropriate to the platform | Window size/insets and adaptive layouts | XAML/layout containers and per-window DPI |
| Scalable text | rem, zoom and reflow | System styles/Dynamic Type where available | sp/font scaling | Native scaling and styles; test high DPI |
| Semantics | HTML, ARIA where needed | Accessibility labels/traits/actions | Semantics/content descriptions | Automation peers/properties |
| Navigation | Router + history/deep link | Native navigation and presentation | Back stack and system back | Navigation, menus and app history |
| Focus | DOM order and managed focus | First responder/focus appropriate to the platform | Separate input and accessibility focus | Tab order, keyboard focus and automation |
| File selection | Appropriate input/picker | System picker/document APIs | System picker/contract | System file dialog |
| Theme | Tokens and supported preference | Semantic colors and appearance | Theme/semantic colors | Resource dictionaries/theme/contrast |

These names describe responsibilities, not API signatures. Consult documentation for the project's version when writing code. React Native, Flutter, Avalonia and other frameworks require tests in each target's runtime, not only a preview.

## Adaptation example: editing an item

- Phone: details on a separate screen or sheet according to complexity; the keyboard and safe areas keep the action accessible.
- Tablet: list/detail when it preserves context; do not open an enormous sheet just to copy the phone layout.
- Desktop: inline editing, a panel or a window according to the task; shortcuts and document behavior matter.
- Web: deep links, return navigation and filters must keep working; reloading must not produce an impossible state.

Data and outcomes are shared; density, navigation and controls may change. Functional parity does not require identical pixels.

## Verification recipes by stack

**Web:** locate the component and styles -> render the route -> test keyboard/resize/zoom -> error and recovery -> existing checks.

**SwiftUI/AppKit/UIKit:** check the target and minimum version -> use the project's styles/layout/accessibility -> use previews as an aid -> run the app or a supported test -> enlarged text, focus, appearance, lifecycle. A preview does not prove integration.

**Compose/Android Views:** check min/target SDK and navigation -> insets/font scaling/semantics -> emulator or device -> back, rotation/resizing, resume and denied permissions.

**WPF/WinUI/Avalonia:** check the framework and themes -> layout without unnecessary fixed dimensions -> automation and keyboard -> resize, DPI, monitors and high contrast on the target OS. Building on macOS does not confirm Windows UI.

**Electron/Tauri:** identify the renderer/host boundary -> do not expose privileged APIs to fix a visual flow -> test native windows, focus, menus and dialogs -> assess resource consumption/processes and updates in the authorized environment.

**Flutter/React Native:** reuse the theme/components and configure semantics and scaling -> verify back, keyboard, picker and permission differences on each target -> do not treat a web screenshot as a test of both systems.

## Cross-platform handoff

Record shared intent, platform-specific behavior and exceptions. Connect a semantic token to its equivalent on each platform; do not turn every CSS size into a native literal. Share content and business rules where possible while keeping access and interaction adaptations verifiable.
