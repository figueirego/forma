# Mobile and adaptive experiences

Choose native iOS/Android, Flutter, React Native, mobile web or another stack according to the existing product. A phone mockup in a browser does not prove native behavior.

## Structure and input

Respect system navigation, back behavior, sheet presentation, menus and controls. Use safe areas/window insets for cutouts, bars, gestures and the keyboard; do not hardcode margins for one device. Consider thumb reach without hiding important actions.

Define when bottom navigation becomes a rail/sidebar on tablets. Foldables and split-screen require adaptation to the available area, not just orientation. Do not stretch a phone screen across every tablet. Rotation must preserve state when supported; locking orientation requires a functional reason.

Touch, hardware keyboards, screen readers, switches, styluses and voice may coexist. Provide alternatives to swipes and dragging. Haptics reinforce meaning, not every tap; the function must remain understandable without vibration or sound.

## Lifecycle

- Preserve drafts after interruptions, backgrounding, reconnection and process recreation according to requirements.
- Request permission when needed, with an understandable purpose. Handle denial, permanent denial and revocation; offer alternatives when feasible.
- Notifications need a useful purpose, controls, a valid deep link and behavior for unavailable content.
- Uploads/downloads show state, relevant resource consumption, retry and cancellation. Define offline behavior, caching, queues and conflicts.
- Authentication and biometrics need an appropriate fallback; returning to the application does not imply a valid session.
- Prefer system selectors and pickers when they reduce friction and data exposure.

## Delivery

Test font scaling/Dynamic Type, screen readers, keyboards covering fields, poor connectivity, back navigation during submission, state after resuming and the minimum supported device. Store screenshots must represent real functionality, with reviewed assets and copy. Check store, privacy and SDK requirements against official sources at publication time.

## List/detail recipe

At the smallest supported size, list and detail are alternating regions; going back preserves the filter, selection and position. Increase the width until a readable list, separation and detail with real minimum content fit. This observed point determines when to use two regions; record the condition in terms of space, not device model.

Resizing with a detail open keeps the selected item. Returning to a narrow width preserves the active region and return path; it does not restart the journey. Test enlarged text, the keyboard, a removed item and deep links. Navigation becomes a rail/sidebar when space and access benefits justify it. See [adaptation](platform-adapters.md) for stacks and tests.
