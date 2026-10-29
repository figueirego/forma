# Forma - identity and presentation

**From intent to refinement.**

Local visual identity for the Forma plugin: a modular brand, functional palette and responsive editorial presentation in English. Open [identidade.html](identidade.html) in a browser. There are no remote fonts, CDN dependencies, analytics, server or application JavaScript.

## Files

| File | Use |
|---|---|
| `icon.svg` / `icon-dark.svg` | Blue / light vector symbol, transparent background, 120 x 120 canvas |
| `wordmark.svg` / `wordmark-dark.svg` | Signature with symbol and editable name, 440 x 128 canvas |
| `logo.png` | Blue symbol exported at 512 x 512 with transparency |
| `hero.png` | 1536 x 1024 presentation image, supplied by the coordinator and copied unchanged |
| `tokens.json` / `tokens.css` | Colors, light/dark roles, typography, spacing and geometry |
| `identidade.html` / `identity.css` | Local page with the introduction, eleven specialists and brand guide |
| `preview-desktop-top.png` | Opening preview at a 1440 x 900 viewport |
| `preview-mobile-top.png` | Opening preview at a 390 x 844 viewport |
| `preview-symbols.png` / `preview-usage.png` | Evidence of variants and clear space, outside the marketplace selection |
| `provenance.json` | Tool, exact prompt, origin and limits of the hero |
| `verify.cjs` / `qa.json` | Reproducible local verification and measured results |

Use the two opening previews for the marketplace presentation. Long screenshots are unnecessary.

## Geometry and clear space

The symbol uses a module of `u = 6` on a `120 x 120` canvas:

- Stem: `x12 y12 w24 h96`.
- Top bar: `x42 y12 w66 h24`.
- Middle bar: `x42 y48 w48 h24`.
- Horizontal gap between the stem and bars: `1u = 6`.
- Total visible area: `96 x 96`.
- External clear space: at least `4u = 24` around the visible bounds, equal to the stem width.

The 12-unit padding inside the SVG **does not provide the entire clear space**. Add the remaining space in the consuming project. The page diagram shows a 160 px visible area inside a 240 px box: 40 px free on each side, equivalent to 4u at that scale.

Recommended minimum symbol canvas: **24 px**. The page includes actual 24 and 32 px samples. Preserve proportions, all three pieces and their gaps; do not rotate, stretch or add outlines. For a small signature, verify legibility at the destination size. Each new application requires its own acceptance check.

## Palette and typography

| Role | Light | Dark |
|---|---|---|
| Surface | Paper `#F5F4F0` | Ink `#172238` |
| Primary text | Ink `#172238` | Paper `#F5F4F0` |
| Supporting text | `#596274` | `#B9C1D1` |
| Text accent | Forma blue `#315BE8` | `#A8BCFF` |
| Brand | Forma blue | Paper |

The lighter dark-mode accent supports reading; it does not replace the original blue in brand files. Brand colors are not automatically error, success or chart colors.

The wordmark uses Arial/Helvetica/sans-serif and remains an editable `<text>` element. Editorial headings use Georgia/Times New Roman; body text uses the system font. No font file is distributed in this identity package. Metrics may vary between systems; check the export if you change fonts. A signature with identical outlines in every editor would require an additional outlined export; that export is not promised in this package.

`tokens.json` is a simple local format with documentary aliases, not a claim of DTCG conformance. The CSS contains the resolved values consumed by the page.

## Content and scope

The family presented contains exactly eleven specialists: foundations, interface, product, objects-3d, graphs-data, motion, platforms, brand, reference, validation and handoff. The presentation describes responsibilities; it does not claim that all specialists run on every task or that external tools are connected.

**The identity belongs to the Forma plugin. It must never be imposed on consuming projects.** Projects retain their own brand, typography, technology, data and approved decisions.

The hero is an AI-generated image. Its material-object appearance is not a 3D model, interactive mechanism, proof of manufacturability or dimensional specification. The canonical symbol source is the SVG, not the hero's perspective or bevels. The original file was copied without modifying pixels; CSS adapts the framing to the available width.

No trademark search or legal certification of exclusivity was performed. The vectors were constructed for this deliverable; no third-party logos or fonts were imported into this identity package.

## Image provenance

Tool reported by the coordinator: `image_gen__imagegen`. Parameter: `transparent_background: false`. Received dimensions: 1536 x 1024. Executed prompt, supplied by the coordinator and also preserved in `provenance.json`:

> Create an original premium brand hero illustration for FORMA, a modular design assistant plugin. Landscape 3:2 composition, absolutely no text or lettering. Warm white studio background #F5F4F0, lots of negative space at left for future editorial typography. At right, a single sculptural uppercase F made from three precisely aligned geometric slabs: one vertical stem, a long horizontal top bar, and a shorter middle bar with clean rectangular negative space. Front surfaces deep cobalt #315BE8, beveled side surfaces dark ink #172238. This is a physical satin ceramic/aluminum object, NOT inflated bubble typography. Very restrained fine microtexture, softly rounded tiny chamfers, coherent realistic softbox reflections and ambient contact shadows, crisp edges, subtle paper-like warm-white pedestal. A single small flat blue color-sample tile near its base may reinforce a system of modular pieces. Camera front three-quarter, slight elevation, orthographic product photography. Elegant, precise, quiet and clean. No glow, no purple gradients, no glass, no extra symbols, no UI or logos of other companies. Original new mark, not based on any existing brand. High craftsmanship, professional design system editorial visual.

The copied file's SHA-256 was compared with the original during authoring. The expected hash is in `provenance.json` and is checked by `verify.cjs` without depending on the external original. To repeat that comparison too, optionally set `FORMA_HERO_SOURCE`. Identical bytes do not prove the conceptual origin of each shape.

## Reproducible verification

The original verification used Playwright already provided by the environment, without installing packages, with headless Google Chrome in a fresh context. Using that environment's paths:

```sh
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
node work/forma-brand/verify.cjs
```

The script uses existing `require('playwright')` and `require('sharp')` packages. `sharp` only reads metadata/alpha from the exported PNG; rasterization uses a browser screenshot of the SVG. Without `CHROME_BIN`, it uses Playwright-managed Chromium; with that variable, it uses the specified executable. The command above is only an example from the authoring environment. In another environment with the packages and browser already available, run `node verify.cjs` inside this directory. It opens `identidade.html` through `file://`, measures layouts, exports the logo and updates previews/`qa.json` in this directory.

Checks: horizontal overflow at 320, 360, 390, 768, 1024 and 1440 px; loaded images; eleven IDs in the expected order; 24/32 px samples; files/anchors; keyboard skip link; navigation; three-rectangle geometry; editable SVG text; wordmark within the canvas; contrast of declared opaque pairs; no external requests or browser errors; 512 px PNG with alpha; hero hash.

Actual executed results are recorded in `qa.json`. They do not prove physical-device behavior, print quality, screen-reader support, full accessibility, trademark rights or installed plugin integration. Screenshots require visual inspection; the photographic area has a variable background and these calculations do not make a universal contrast claim for it.

## Composition decisions

An editorial grid and separators organize the content without a dashboard appearance. The specialty index shifts from two columns to one as space narrows. On mobile, text precedes the image so the message does not cover the symbol. Motion is limited to anchor navigation, disabled with `prefers-reduced-motion`.

The original identity deliverable was limited to `work/forma-brand/`. The presentation itself does not modify, install, publish or activate Forma, plugins, providers or services.
