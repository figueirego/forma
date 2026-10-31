# Complete Soft Glass landing composition

For an integral source-matched copy, follow the [separate local kit](../../references/soft-glass-integral.md). This page is the portable authored adaptation; do not silently substitute it for an exact reproduction.

Open `landing.html` with its adjacent `landing.css` and `landing.js`. No package,
framework, network asset, font download or build step is required. This is the
complete marketing composition; `preview.html` remains the smaller token and
workspace specimen. It is not a substitute for this full landing.

## Source and adaptation boundary

The composition follows the user-approved local study served at
`http://127.0.0.1:4200/` (the Trendly landing study). That address documents the
reference, not a runtime dependency. The study itself is unchanged. Its original
HTML, 5,672-line CSS, 1,034-line script, brand, customer logos, photography, product
screenshots, mascot and scenic implementation are not redistributed here.

These files are an original implementation: scoped CSS, semantic HTML,
dependency-free preview interactions, original SVG interface icons, deterministic
Canvas halftone landscapes and CSS poster artwork. The copy, wordmarks, weekly
plans and product views are neutral fictional examples. They are not customer
claims, evidence of performance or connected product functionality.

This is a portable adaptation of the complete composition, not a pixel-identical
copy. Differences that affect the image:

- Original product screenshots and videos become labeled, readable HTML/CSS
  concepts. Mobile media reflows instead of shrinking a desktop screenshot.
- Typography tokens name the approved families first, but no font files are
  bundled. The offline specimen uses the system fallback unless the consumer
  already supplies Bricolage Grotesque, Plus Jakarta Sans and Inter under an
  appropriate license. Line wrapping, texture and total page height therefore
  differ. Supply approved fonts before a fidelity comparison.
- The landscape has newly authored ridge geometry and halftone distribution.
  It preserves the layered silhouette and dots without copying the study's
  renderer, importing a scene or running a continuous animation loop.
- The navigation is a sticky capsule (1180px maximum, 12px sticky offset) in
  the normal page structure. It is boxed from the first screen; the reference
  initially boxes only its central links. Mobile retains wrapped navigation
  links instead of hiding them. It does not reproduce the reference's
  scroll-driven reparenting or secondary fixed CTA.
- Four narrative steps and their sticky desktop stage remain. The stage
  highlights one of four visible concept cards as a step crosses the viewport.
  Mobile uses four inline concepts. There is no typing simulation or carousel.
- The mode comparison keeps its dark setting and central portrait format, using
  original poster artwork instead of a person, recording controls or AI avatar.
- Audience chips are stationary. Six audience tabs are user-operated, with no
  timed switching. The feature comparison preserves eight scattered tools and
  six connected capabilities; three additional visual detail tabs are included.
- Contact is a read-only layout with a disabled action. The package does not
  inherit the reference's form handler, success state, legal claims or company
  details. Replace those only during an explicitly scoped integration.
- The portable dark theme also darkens the outer ground. The approved local
  study leaves the peach outer ground visible due to its ineffective dark-ground
  selector. That implementation defect is intentionally not repeated.

## Anatomy and measured design values

| Section marker | Preserved composition |
| --- | --- |
| `hero` | Floating capsule navigation; two-line display emphasis; supporting copy; paired CTAs; back/front halftone landscape; framed product media |
| `trust` | Quiet centered heading, four replaceable fictional wordmarks, proof note and lower dotted wash |
| `problem` | Centered argument, eight-week illustrative chart, four pain cards and closing turn |
| `how` | Four numbered narrative steps, dotted vertical guide, sticky desktop concept stage, four mobile inline previews and closing CTA |
| `modes` | Always-dark panel, two mode tabs, four supporting cards around portrait media |
| `audience` | Heading, two-dimensional chip cloud, six audience tabs and contextual weekly-plan cards |
| `features` | Warm tinted section, eight-to-six comparison, connected product frame, visual detail tabs and closing CTA |
| `faq` | Introductory column and contact card; four question categories; native `details` disclosures |
| `contact` | Saturated warm field, three expectations, inset light/dark field card and explicit static status |
| `footer` | Brand and description, navigation columns, halftone landscape and floating lower capsule |

The implementation keeps a 20px page inset and section gap with 28px section
radii, becoming 10px and 22px at 860px. Desktop content sections use approximately
88px top spacing, becoming 56px on mobile. The hero is
`max(640px, 100svh - 40px)`, or `max(640px, 100svh - 20px)` below 860px. The
marketing frame is at most 1040px wide, with 14px radius (10px narrow).

Display size is `clamp(38px, min(5.2vw, 8vh), 76px)` with 1.0 line height and
-0.055em tracking; section headings use `clamp(34px, 4.4vw, 60px)`, 1.02 and
-0.05em. Mobile display wrapping is explicitly adapted. Primary CTAs are 52px
high with 15px control type on desktop. The 960px, 860px and 640px breakpoints
adapt columns, narrative, navigation and detail density; 1100px relieves the
navigation and three-column mode comparison.

Light roles are ground `#f3e3d3`, surface `#f9f6f2`, alternate `#f1ece4`, text
`#141414`, secondary `#3f3a35`, muted `#665c54`, line `#e9e4dd`, accent `#ff5000`,
accent text `#d63f00` and pale accent `#ffe9dc`. Dark counterparts are surface
`#1b1c1a`, alternate `#2c2d29`, text `#eeeae1`, secondary `#d6d0c6`, muted
`#b0aaa0`, line `#373932`, accent `#ff6a2b`, accent text `#ff8a55` and pale
accent `#422e23`. Workspace concepts keep the separately approved workspace
surface roles; marketing and app surfaces are related, not interchangeable.

## Integration slots

1. Copy the relevant HTML inside a `.forma-soft-glass-landing` root. The standalone
   document uses that class on `body`; an embedded consumer can use a wrapper.
   All CSS selectors are scoped and use `--sgl-*` variables. Reuse existing app
   components when integrating the illustrated workspace.
2. Map the root's `data-theme="light"` / `"dark"` to your existing theme state.
   The specimen buttons only change that attribute. Do not copy its theme preview
   controls into a production design that already has a theme provider.
3. Set `--sgl-font-display`, `--sgl-font-body` and `--sgl-font-control` to the
   destination's approved fonts. No font licensing is conveyed by this kit.
4. Replace the brand and proof slots, hero and narrative media, mode posters,
   weekly examples, capabilities, FAQ and contact expectations. Keep enough real
   content to validate wrapping and the long-page rhythm.
5. Supply actual destinations and legal information. The preview has internal
   anchors plus links to the adjacent specimen and integration notes. There are
   no account, payment, publication or generation actions.
6. Connect contact handling only as separate application work, including real
   consent and error states. The current card is deliberately not a `form` and
   has no name attributes, submission handler or success message.

IDs use the `sgl-` prefix. If multiple copies are placed in one document, namespace
IDs, fragment links, SVG references and ARIA relationships per instance.

## Interaction and motion contract

- Theme selection is immediate and keeps focus. It has no storage or system-theme
  subscription. Immediate palette changes avoid interpolating unreadable colors.
- Tabs use one selected item and one visible panel per group. Arrow keys follow
  the declared orientation; Home/End reach the first/last tab. Selection moves
  neither the page nor focus unless keyboard navigation requests it.
- FAQ items use native `details`/`summary`; multiple answers may remain open.
- Anchors retain native scrolling. The sticky story changes visual emphasis only;
  it never pins the page, modifies the scroll position or hides narrative text.
- Hover/pressed feedback uses short material changes and a 1px press. Reduced
  motion removes displacement and all transitions. There are no perpetual loops,
  autoplay, scroll reveals that hide content or external animation libraries.
- Canvas redraws only on initial layout, resize or theme change. A missing Canvas
  context removes decoration without removing content. JavaScript is needed to
  switch visual tabs/themes; all primary narrative text and default panels remain
  readable without it.

## Verification and limits

The authored files were opened in installed headless Chrome with Playwright at
1440x1000, 768x1000 and 390x844, in both themes and reduced motion. All nine main
sections plus the footer were present, the hero measured 960px at 1440x1000 and
824px at 390x844, and document horizontal overflow measured 0px in all six cases.
Chrome 156.0.8078.74 also passed 90 tab selections across those six cases,
vertical and horizontal arrow navigation, Home/End, native FAQ open/close, all
internal anchor targets, four read-only contact fields, the disabled contact
button and zero form elements. Instrumented fetch/XHR/storage hooks recorded
no calls, and no page errors occurred. Reduced motion computed 0s control
transitions. The first desktop and mobile hero screenshots were visually
inspected. These checks establish the portable artifact's layout, not pixel equality with the
reference. See the package's dated validation record for the coordinator's full
section captures and interaction evidence.

Not established by this specimen: production integration, user testing, physical
device behavior, cross-browser parity, a complete accessibility audit, rights to
replacement assets, business outcomes or the operation of any illustrated product
feature. Package inclusion and build checks do not prove visual equivalence.
