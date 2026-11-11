# Diagonal glass controls - Camalingo adaptation

Recorded 2026-11-02. Local reference study, not a universal brand default.

## Source and evidence

Two user-supplied screenshots show warm glass buttons, diagonal highlights, illuminated rims and rounded corners. Original author, URL and redistribution license are unknown. Screenshots are retained for private reference only; exclude them from public distribution. No original CSS or runtime behavior was inspected. Hover behavior below is an authored adaptation, not an observed source behavior.

## Mechanism and destination

Independent CSS implementation in Camalingo desktop prototype, revision glass-hover-26. Use two low-opacity diagonal highlight bands over existing brand surface colors, an inset top rim and a small bottom shadow. Preserve typography, radii and spacing. Apply to shell controls, selected sidebar navigation and primary actions outside the exercise sheet. Keep exercise options and confirmation buttons matte.

On hover-capable pointers, move the background from 0% to 100% once over 650ms with cubic-bezier(.22,1,.36,1). Keyboard focus receives the same cue while retaining its focus outline. No infinite sweep, no layout shift, no new dependency. Reduced-motion preference disables animation. Disabled controls do not animate. Avoid changing all pressed controls to a light surface without updating their foreground: scope selected-material colors to their own control group.

## Reuse and contraindications

Use destination tokens instead of the screenshot orange. Keep reflections subtle enough to preserve text contrast. Avoid on paper-like learning content, dense tables or every navigation row. A polished disabled control must not be represented as working functionality. Do not copy source imagery into shipped UI.

## Verification scope

Consumer CSS and selectors inspected. Browser visual review required for light/dark, hover, focus and unchanged paper. No claim of pixel fidelity, FPS measurement, mobile or Windows coverage. Keep this study separate from a validated public package release.
