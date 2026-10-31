# Soft Glass: landing and workspace visual kit

Use **Soft Glass** when the user asks for the approved warm workspace: colored sidebar, continuous inset rounded panel, quiet content, diagonal glass buttons, dotted texture and account footer. The same system includes a landing page with a floating capsule navigation, strong typography and rounded sections. This is an optional visual preset, not Forma's default brand or a required replacement for the [clean interface foundation](clean-shell.md).

**Integral reproduction takes precedence:** for the same approved fonts, artwork, textures and motion, follow the [integral local kit](soft-glass-integral.md). Verify that separate artifact; the adaptation below is not an automatic fidelity substitute.

For a portable authored adaptation of the complete marketing page, start with the [full landing](../assets/soft-glass/landing.html) and [landing integration notes](../assets/soft-glass/landing-README.md). The [measured landing profile](../assets/soft-glass/landing-profile.json) freezes its section coverage and source geometry; the short landing in the control specimen is not its replacement. For the application, start with the [renderable specimen](../assets/soft-glass/preview.html), [scoped CSS](../assets/soft-glass/soft-glass.css), [token manifest](../assets/soft-glass/tokens.json) and [integration notes](../assets/soft-glass/README.md). Interface owns the application shell; Brand owns the landing composition. Both use the same surface, accent, spacing and interaction language. Do not load unrelated object, lighting-editor or graph implementations to apply this preset.

## Scope: a visual design can be a complete deliverable

If the user requests design only, deliver static content and visual default, hover, focus, pressed, selected and disabled states. Theme and specimen switches may operate to inspect the design. Do not add authentication, chat generation, save simulations, fake success messages, local persistence or a backend. Native buttons can demonstrate press/focus without pretending to execute a product action. A design-only delivery is complete when the requested surfaces and states render correctly; it does not need a business journey.

Later integration is a separate task: map the styling to the consumer's actual components, navigation, theme provider, data and actions. Use the existing framework; no additional runtime is required for these materials. Keep the specimen's preview JavaScript out of the production application.

## Preserve the composition before adjusting details

| Layer | Approved visual relationship | Portable baseline |
|---|---|---|
| Ground | Warm neutral framing visible between separate surfaces | Light `#f8f6f2`; dark `#1b1c1a` |
| Sidebar | Colored vertical slab with rounded corners, stable navigation and bottom account area | Width 226px; outer radius 28px; inset 24px/17px |
| Workspace panel | One continuous working surface beside the sidebar, not a collection of disconnected cards | Radius 26px; outer inset 16px; sidebar-to-panel gap 15px; `min-width: 0` |
| Light colors | Saturated orange is concentrated in navigation/actions; the reading surface stays warm and quiet | Sidebar `#f6440f`; panel `#fff9f2`; text `#42382e`; accent `#f64a06` |
| Dark colors | Separate warm charcoal roles with a lighter peach action color | Sidebar `#25231f`; panel `#292a24`; text `#eeeee5`; accent `#fc945a` |
| Controls | Rounded glass navigation, secondary capsules and one concentrated primary action | A control radius is smaller than its enclosing panel; repeated icon/text gaps stay aligned |
| Account footer | Compact avatar, two-line identity and trailing chevron, with the same glass language as selection | In layout flow with an automatic top margin; no absolute overlay over navigation |
| Small screens | The sidebar becomes a compact icon rail; the panel and typography reflow | At 760px and below: 56px rail, 8px ground inset/gap and 16px surface radius |

The CSS and JSON are the implementation authority; the table explains the relationships. Use actual viewport CSS pixels, not screenshot bitmap pixels, when comparing. Do not infer native-mobile behavior from the desktop screenshot. The narrow layout is an explicit authored adaptation.

## Glass is a small stack of layers

Build the effect from a translucent base, a 118-degree diagonal highlight film, a delicate border, a light top/left inset edge and a shallow lower shadow. Where supported, use 6px backdrop blur with an opaque-enough fallback. Place the highlight below the label/icon and keep decorative layers `pointer-events: none`. Do not apply blur to the complete sidebar, wash out the text, or replace the diagonal film with a generic large glow.

Selection, hover, focus and press are separate states. Selection can remain visible while another control receives keyboard focus. Pointer hover modestly brightens the existing material; press moves the control down by 1px; focus adds a visible ring. Touch cannot depend on hover. Reduced motion removes displacement while preserving color and focus feedback. Blur is decorative: navigation and text must remain legible without backdrop-filter.

## Dots, selection indicator and lower texture are different mechanisms

- **Regular sidebar dots:** a radial CSS tile with 7px pitch, 0.75px solid radius fading by 1px, a top-to-bottom fade, and opacity 0.12 in light / 0.045 in dark. This is the deliberately strengthened version of the approved subtle texture. Adjust its token without increasing every shadow or texture on the page.
- **Selected-item dot:** a separate 6px circular indicator at the trailing edge of the active row. It accompanies the selected background and accessible selection state; it is not the texture tile. The compact rail can omit this decorative dot while retaining a clearly selected row.
- **Lower sidebar texture:** a denser decorative texture with independent color/opacity and mask. It must not reduce account/navigation legibility or intercept events. The portable kit uses authored CSS texture; a destination illustration remains a replaceable asset slot.

Never implement these as many DOM dots or a continuously running canvas. They require no animation loop, random positions, network asset or library. Record which of the three mechanisms a refinement changes.

## Full landing: preserve the sequence, not only the hero

A request for the approved landing refers to the complete marketing composition. The workspace and the short control specimen do not satisfy that scope. Route to Brand and resolve reproduction versus adaptation with the [integral kit contract](soft-glass-integral.md) first. For an authored adaptation, open `assets/soft-glass/landing.html` and retain the nine content sections plus footer below unless the user explicitly requests a smaller page.

| Order | Section | Distinguishing composition |
|---|---|---|
| 1 | Hero | Floating capsule navigation, centered compact headline, paired CTAs, framed product preview and front/back halftone landscape |
| 2 | Trust | Quiet horizontal evidence strip; use verified customer marks or explicitly labeled asset slots |
| 3 | Problem | Eight-column illustrative activity chart, four compact issue cards and a closing statement |
| 4 | How it works | Four numbered narrative steps beside a sticky product stage; narrow screens put each preview next to its step |
| 5 | Two production modes | Always-dark island with mode choice, central phone preview and supporting benefit columns |
| 6 | Audience | Six audience tabs, moving category labels and an audience-specific example panel |
| 7 | Features | Eight separated-tool cards converge into a six-feature product panel; stacked composition on narrow screens |
| 8 | FAQ | Intro/help column beside four topic tabs with native expandable answers |
| 9 | Contact | Orange closing surface, three process steps and a rounded static form card |
| 10 | Footer | Brand/message column, grouped links, decorative terrain and final metadata row |

The [full landing implementation](../assets/soft-glass/landing.html) is an original portable composition with neutral English examples and replaceable media. It is not an extraction of third-party marketing copy, logos, mascot sprites, video, screenshot assets or public JavaScript. The original local visual study remains separate. Record typography, content and artwork substitutions; do not claim screenshot identity after changing them. In a reproduction request, use the actual approved reference and authorized assets to validate those layers.

### Geometry and typography relationships

The observed landing uses 20px outer insets and gaps, 28px section corners, a hero at least 640px tall, and a product preview up to 1040px wide. Narrow layouts reduce insets/gaps to 10px and section corners to 22px. The main headline uses `clamp(38px, min(5.2vw, 8vh), 76px)`, line-height 1 and tracking -0.055em; regular section headings use `clamp(34px, 4.4vw, 60px)`, line-height 1.02 and tracking -0.05em. Keep display, body and control fonts as separate roles. The measured source uses Bricolage Grotesque, Plus Jakarta Sans and Inter respectively; the portable page exposes font slots and ships system fallbacks.

The how-it-works area uses a 0.82/1.18 column ratio, 56px gap, 1240px maximum width and approximately 62vh per narrative step. At 960px and below, switch to inline previews rather than keeping a clipped sticky stage. Floating navigation stays within the viewport and does not cover anchor targets. Do not use the final document height as a fixed layout dimension: copy length, font metrics and expanded answers change it.

### Theme, media and motion contract

Landing colors are distinct from the workspace palette; see the profile. The two-mode section remains dark in both global modes. Hero, media, form and footer must receive coherent theme roles. The original local study retains a peach outer frame in dark mode because an ancestor selector is ineffective; that observation is recorded, not silently treated as a required dark-theme token. The portable page uses an intentional paired dark outer ground.

Preserve visual feedback and scroll context without inventing product actions. Theme changes, anchor navigation, section selection, tabs, native FAQ expansion and visual scene changes may operate. Contact fields are visual samples and do not send or store input. No login, generation, CRM, analytics or pretend confirmation is part of this recipe. External CTA destinations must come from the consumer, not the studied brand.

The original study has timed demos, mascot progress, narrated/video media and a canvas landscape. Those are distinct from the reusable section skeleton: the portable implementation supplies original decorative media and explicit preview states. Use approved consumer assets for those slots rather than disguising placeholders as the original product. Decorative motion must stop under reduced motion; content and navigation remain available.

**Full-landing request:** "Use Forma to reuse the complete Soft Glass landing, including the hero landscape, floating navigation, trust strip, problem section, four-step product narrative, two-mode section, audience tabs, feature consolidation, FAQ, contact and footer. Keep the approved composition and adapt only the authorized brand/content. Deliver design only in light/dark and desktop/mobile. Do not replace it with the compact workspace specimen."

## Landing and mobile are part of the preset

The landing uses the same accent and warm light/dark surfaces, a floating rounded navigation bar, compact secondary controls, a diagonal-film primary CTA, generously separated rounded sections and clear headline hierarchy. A workspace excerpt should inherit the application styling. Fake browser address bars and operating-system traffic lights are excluded from the application shell. A presentation frame may be added only when explicitly requested for marketing.

Keep readable content in flow on mobile. Allow the landing navigation to wrap or simplify without horizontal overflow. Give the inset panel its own continuous surface at narrow widths; do not delete it or scale the full desktop composition down as an image. Keep icon-only controls named, meaningful touch targets reachable and any decorative mascot/scene separate from layout.

## Reuse and identity

Copy the relevant markup and its matching scoped stylesheet into the consumer. These are two separate entry points:

| Composition | Stylesheet | Theme root | Palette and font variables |
| --- | --- | --- | --- |
| Workspace and control specimen | `soft-glass.css` | `.forma-soft-glass` | `--sg-*` |
| Complete landing | `landing.css` | `.forma-soft-glass-landing` | `--sgl-*` |

Give the matching root an explicit `data-theme="light"` or `data-theme="dark"` and map the existing theme state to it. For the workspace, adapt `--sg-account-bg`, `--sg-indicator`, `--sg-lower-wash` and `--sg-lower-dots` together. For the full landing, adapt its surface/accent roles and `--sgl-font-display`, `--sgl-font-body` and `--sgl-font-control`; see the [integration notes](../assets/soft-glass/landing-README.md#integration-slots). A green accent requires checking its selected fill, on-accent text, focus ring, glass edge and dark counterpart, not only replacing one orange hex value.

The shared catalog record is `forma-soft-glass`, classified as `interface` because it contains the whole family. Locate the full landing with `references.mjs --query "soft glass landing" --origin forma --json` without a `--kind brand` filter, then select `assets/soft-glass/landing.html` from its resources. Brand owns the landing composition even though the shared record uses the interface category.

Retain the destination's brand, labels and approved font. The portable specimen uses a system font stack; the approved local study used separately loaded fonts and illustrated assets. Those substitutions change the image and must not be called pixel-identical. The distributed kit includes original CSS, SVG interface icons, neutral English content and no copied mascot, scenic shader, remote font or branded product screenshot. Technical study values describe the approved visual recipe; they are not a universal accessibility certificate.

**Reusable request:** "Use Forma's Soft Glass preset for a landing page and workspace. Preserve the inset rounded panel, dotted sidebar, glass buttons and account footer. Deliver design only, in light and dark on desktop and mobile. Use my brand and content; demonstrate hover, focus and pressed states without product functionality."

## Acceptance and evidence

Freeze the requested palette, font, content, viewport, device pixel ratio, theme and motion preference before comparison. Check the landing and workspace separately at 1440px, 768px and 390px, plus the rail boundary. Inspect the screenshots and computed layout: no viewport overflow, no clipped labels/focus, continuous inset panel, account area reachable, selected row distinguishable and coherent dark layers. Capture an actual hover, keyboard focus and pressed button; a transition declaration alone does not prove them.

For design-only requests, prove that controls remain previews and no network request/storage write claims a product operation. Theme switches in the specimen change only its theme. Record unavailable physical-device, browser or assistive-technology checks as unverified. The [dated validation record](../assets/soft-glass/validation.json) identifies the tested files, viewport/state coverage and limits. Package checks prove inclusion/routing, not visual fidelity or automatic integration into future projects.

The [full-landing validation record](../assets/soft-glass/landing-validation.json) is separate from the workspace/control record. It lists rendered coverage, asset adaptations and limits; neither record proves visual identity for an unobserved consumer.
