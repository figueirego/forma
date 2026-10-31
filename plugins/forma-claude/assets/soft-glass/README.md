# Soft glass visual kit

A portable, design-only recipe for a warm workspace, inset content panel, floating landing navigation, glass controls, account footer, and a compact mobile rail.

## Use

1. Copy `soft-glass.css` into the consumer project.
2. Put `class="forma-soft-glass" data-theme="light"` on a container. Change the explicit theme to `dark` for the paired palette.
3. Use the semantic markup in `preview.html` as a composition example. Keep only the primitives needed for the destination.
4. Add real product behavior in the consumer. `preview.js` only changes the sample screen and theme; it is not a product controller.
5. Open `preview.html?screen=workspace&theme=light`, `?screen=landing&theme=dark`, or `?screen=controls&theme=light` to inspect the visual states.

The kit has no package dependencies, external fonts, images, remote calls, persistence, or backend. The simple inline SVG icons are part of the example. Copy their sprite or replace them with a coherent project icon family. Never use emoji as a substitute.

## Stable primitives

| Selector | Responsibility |
| --- | --- |
| `.forma-soft-glass[data-theme]` | Scoped palette, rhythm, type, and state tokens |
| `.sg-workspace` | Inset application composition |
| `.sg-sidebar` | Orange / warm charcoal rail, regular dot field and diffuse lower texture |
| `.sg-nav-item[aria-current="page"]` | Selected glass row and active indicator |
| `.sg-panel` | Separate rounded main surface |
| `.sg-glass` | Diagonal highlight film, border, blur, inset highlight and shadow |
| `.sg-button` | Pill control; optional `.sg-primary`, `.sg-square`, `.sg-round`, `.sg-quiet` |
| `.sg-account` | Anchored glass account footer |
| `.sg-search` | Rounded input surface; compact variant inside the sidebar |
| `.sg-landing`, `.sg-floating-nav` | Warm outer field and floating pill navigation |
| `.sg-artboard`, `.sg-composer` | Rounded presentation surface and layered input specimen |

## Visual contract

- Light roles: warm off-white page and content, orange sidebar, brown text. Dark roles: warm charcoal page/sidebar, olive-charcoal content, cream text, peach action color. Do not invert the light palette mechanically.
- Desktop shell: 16px outer padding, 15px gap, 226px sidebar, 28px sidebar corners, 26px main panel corners.
- Mobile at 760px and below: 8px outer padding/gap, 56px rail, 16px panel corners. Labels collapse while accessible names remain. Main content wraps; it is not a scaled desktop screenshot.
- Sidebar regular dots: 7px pitch, 0.75px solid radius fading to transparent at 1px. Layer opacity is 0.12 light and 0.045 dark. This is separate from the selected-row indicator.
- Selected-row indicator: 6px, warm cream, aligned at the trailing edge. Dot texture must never cover labels or controls.
- Glass: restrained diagonal film, 1px translucent edge, top/left inset highlights, soft lower shadow, optional 6px blur; account footer blur is 9px. No dependency on blur for contrast or legibility.
- Hover/pressed effects: 1px movement, 180ms. Reduced-motion removes movement and transitions. Touch does not depend on hover.
- The preview deliberately uses system fonts and neutral English sample copy. Typography metrics, logos, bespoke illustrations, and original marketing content are not claimed as exact reference parity.
- The lower sidebar texture and landing decorative field are original CSS adaptations. They are not recovered proprietary illustrations, particles, or shaders.

## Boundaries and checks

This is a visual recipe, not production authentication, search, routing, generation, menus, or data management. The sidebar search is read-only in the preview. Product controls intentionally have no click handlers.

Before shipping a consumer, verify both themes and the actual content at desktop and mobile widths. Check focus, overflow, long labels, icon visibility, selected-state distinction, reduced motion, touch targets, and text contrast. The compact sidebar field preserves the approved visual density; enlarge its interaction target when turning it into a functional control. Source colors alone do not certify accessibility for every font size or background. The preserved light sidebar text pair (`#fff8ed` over `#f6440f`) is approximately 3.46:1 before texture and glass compositing, below 4.5:1 for normal text. This specimen preserves the approved palette; a production consumer must resolve that tradeoff through an approved darker sidebar, darker text, or another measured adaptation and recheck the composited states.

The preview toolbar is documentation chrome and should not be copied into the product. The workspace itself contains no fake browser title bar or operating-system traffic lights.
