# Visual and technological fidelity

Use when the user asks to reproduce a system, extract a reference or points out that the result does not follow the reference. Do not automatically apply the reference material profile to other projects.

## Contract before implementation

Distinguish inspiration, adaptation and reproduction. If the user corrects fidelity, do not keep using an authored palette as though it were equivalent. Declare which surfaces, states and mechanisms will be reproduced and which belong to another product. Record source, version, hash, location, static/runtime evidence and limits.

When the user selects an already approved implementation, it takes precedence over a historical study of another application. For the approved compact editor, consult [its profile](../assets/reference-profiles/compact-appearance-v1.json) and [contract comparison](fidelity-contracts.md). Branding, proportions or gestures change only within authorized adaptations; project names are not universal presets.

## Five-layer extraction

1. **Primitives:** exact values, units, color space, fonts/weights/subsets/license, radii and dimensions.
2. **Semantics:** action fill, on-fill, accent-text, surface, ambient color, secondary text, selection, focus and states. The same family may have three distinct colors in one mode.
3. **Composition:** layer order, transparency over the effective background, blur, gradient stops, role-based elevation and geometry. A correct color in the wrong role is not fidelity.
4. **State:** CSS default, JS override, persisted preference, content context, resolved theme, high contrast and reduced motion. Do not confuse a static default with the final result.
5. **Technology:** declared manifest, actually packaged version, resource callsite and observed execution. Three's presence does not prove all WebGL uses Three; an installed framework version is not measured runtime evidence.

Extract the required tables and formulas, not an entire bundle dump. Identify character versus byte offsets. Partial REA, timeouts or truncated graphs must remain partial in the report. Use retained evidence and narrow the files; do not repeat broad analysis without changing scope. Direct token reading is independent static evidence, not retroactive AST success.

## Traceable implementation

Create a table: property -> source -> original value/role -> implementation -> adaptation -> verification. Preserve original values in the reference profile; do not overwrite evidence with product adaptations.

Keep action and ambient color independent when the reference does. Migrate old preference IDs and validate finite numbers according to each field's domain: pointer/stage limits are not universal model limits; valid external coordinates must survive rendering and persistence. Keep cancellation reversible and confirm persistence only after success. A fixed ambient control is not equivalent to a free editor of fields/noise/context.

Choose technology according to the required mechanism. CSS OKLCH/color-mix and the correct font can reproduce colors in vanilla JS; this does not authorize claiming the same React/Electron stack. A browser shell does not prove a native app, installer, IPC or automatic updating.

## Three independent gates

- **Functional:** preview, save/reload, cancel/Escape, reset, system mode, migration, unavailable storage and synchronization.
- **Accessibility:** text over a composite background, keyboard, focus, targets, reduced motion/transparency. Do not infer gradient contrast from a single token.
- **Fidelity:** mode-matched pairs, actually loaded font, geometry, opacity, composition and states compared with equivalent viewport/content.

Passing contrast does not approve fidelity. If the original fails contrast, preserve the fill where possible and record role-specific on-fill/text adaptations. Do not call the adaptation an exact copy. Do not conclude from a global score or the number of extracted tokens.

## Audited desktop reference - artifact 0.19.0

Consult `../assets/reference-profiles/desktop-material-reference-v1.json` on demand (static inspection of the local artifact). Eleven families; blue dark fill #3d6fe6, white ink and accent-text #7ea6ff. Dark surface #131315 over ground #0e0e10. Inter Variable is the UI font; Geist Mono and Source Serif 4 have specific roles.

Ambient color: hue 181, chroma .038, grain 0; two pools with mode-specific geometry and luminance, nine smoothstep stops and separate base/highlight. `hold` blocks contextual influence; it does not turn lighting off. Contextual color with chroma > .02 can change hue and increase configured chroma by 1.45 (maximum .09). Read the profile for the complete formula/precedence. The statically observed context was not exercised at runtime in this study.

React/ReactDOM 18.3.1 are present in the renderer; Electron in the shell; Three 0.186.0 in books; the profile uses direct WebGL2; the graph uses canvas/worker; a custom spring does not prove Framer Motion. PDF, local AI or SQLite dependencies are not prerequisites for reproducing appearance.

## Delivery

Show the current visual result, intentional differences and gaps. State when runtime comparison with the reference was not possible. Do not claim perfection, pixel-perfect output or complete parity based only on static extraction. User visual approval remains separate from technical checks.
