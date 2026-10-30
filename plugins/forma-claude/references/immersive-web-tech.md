# Immersive web: portable effects, variants, and cost

Use this reference for campaigns, configurable products, editorial objects, and decorative scenes.
Do not use it to justify adding WebGL to settings, tables, or forms.
Prioritize the smallest mechanism that delivers the required behavior.

For characters with expression, volume, physical support, and finish variants, read [mascot refinement](mascot-refinement.md). A procedural mesh can support this kind of object; do not assume GLB, a rig, post-processing, or custom shaders merely because the object is three-dimensional.

## Choose before implementing

| Actual need | Start with | Escalate only when |
|---|---|---|
| Notebook, cover, card, or panel in perspective | HTML + CSS transform + SVG | Occlusion, geometry, or lighting cannot be represented adequately |
| Frontal portrait/product with apparent depth | Image/poster; optional 2.5D using depth/alpha/normal | The view needs volumes and angles absent from the image |
| GLB with orbit and material switching | `<model-viewer>` | The scene requires shaders, render passes, or composition the component does not offer |
| 2.5D portrait + 3D object + interactive reveal | Direct Three.js | The combination justifies code, asset, and maintenance costs |
| Simple interactive path/map | SVG + DOM | Measured density justifies Canvas/WebGL; retain a text alternative |
| Decorative background/isoline/particle | Static CSS/SVG | Motion adds value; allow disabling it and stop offscreen work |

Do not confuse 2.5D, 3D meshes, video, and prerendered images. Declare which mechanism was demonstrated.
A library dependency does not prove the application was written directly with that technology.

## Kimi case: editorial design with a hybrid scene

[Source](https://kimi-landing-page-two.vercel.app/), captured on 2026-10-26.
[Profile with hashes and limits](../assets/reference-profiles/kimi-2026-10-26.json).
Confirmed: Lenis 1.3.26, Three.js r185, GLTFLoader/DRACOLoader, HDR/PMREM, Canvas 2D, and SVG.
Vite is inferred from the bootstrap; build version and authoring process are unknown.
The portrait uses diffuse/depth/alpha/normal maps on a plane; the helmet is a separate GLB.
The code combines slight UV displacement, relighting, a damped pivot, and a reveal mask.
Contours and the circuit trail use Canvas 2D without requiring a 3D mesh.

Original recipe, not a bundle transcription:

```text
show(htmlContent, licensedPoster, controls)
if policy.allowsScene and componentVisible:
  loadEngineAndLimits()
  validateMapsAndModel()
  compose(depthPlane, optionalObject, ambientLight)
  onPointer: updateBoundedTarget()
  whenDirtyAndVisible: interpolateTarget(); render()
onErrorOrWebGLUnavailable: retainPosterAndControls()
onUnmount: releaseSceneAndResources()
```

Separate text/CTAs from the decorative scene. Bound displacement to avoid revealing empty edges.
Maps are artistic inputs: do not promise automatic generation or equivalence to real volume.
The raw -> semantic token pattern is useful; the ice/black/cyan palette belongs to this campaign.
Condensed display type, clipped SVGs, and large scale must not automatically migrate into operational UI.

## Soda case: configurable product

[Source](https://soda-landingpage.vercel.app/), captured on 2026-10-26.
[Profile with hashes and limits](../assets/reference-profiles/soda-2026-10-26.json).
Confirmed: `<model-viewer>`, GSAP 3.15.0, embedded Three.js r183, and Lit dependencies.
GLBs declare glTF-Transform 4.5.1, meshopt, quantization, and WebP; this does not identify the original modeling tool.
The product and fruit are GLBs; bubbles are CSS-animated images.
Switching variants combines material texture, background colors, and decoration.
A product color variant is not the application's light/dark theme.

Original recipe with transaction and concurrency:

```text
select(variant):
  request = nextId(); state = loading(variant)
  try:
    resource = loadValidateOrGetFromCache(variant.asset)
    if request != currentRequest: releaseIfUnshared(resource); return
    applyTogether(material, contextualTokens, permittedDecoration)
    confirmAccessibleSelection(variant); announceResult()
  catch:
    if request == currentRequest: retainLastVariant(); showRetry()
```

The same configuration can describe a notebook cover, furniture finish, or packaging.
Minimum fields: `id`, label, contextual tokens, authorized asset, and poster.
Keep focus/text/surface in global tokens and validate contrast in every variant.
Do not mark a selection complete before the visual switch is ready; support keyboard and touch.
Adopt GSAP only when a coordinated timeline justifies the library; simple transitions fit CSS/WAAPI.

## Portable contract

Content, variant data, assets, and quality policy do not belong to the renderer's state.
For complex scenes, expose `mount`, `resize`, `setTheme`, `setQuality`, `pause`, `destroy`, and error/ready events.
Add `setPointer`/`setProgress` only when used. A CSS hover does not need this layer.
Content slots/props must accept long text, languages, covers without images, and missing metadata.
The engine is replaceable: poster -> CSS/2.5D -> GLB. Product capability remains in every version.

```text
policy = combine(preference, budget, visibility, support)
if static: doNotImportEngine; doNotLoadDecoration; showPoster
if reduced: switchVariantsWithoutSpinBlurParallax; renderOnDemand
if full: capDPR; createOnlyPresetAssets; pauseOffscreen
```

Reevaluate preferences during the session. Test returning to the tab and viewport.
`display:none`, freezing transforms, or reducing duration do not guarantee network/CPU/GPU savings.
Release RAF, timers, listeners, observers, geometry, materials, uniform textures, environment, and workers.
Do not destroy shared textures without ownership/cache management; test repeated mounting/unmounting.

## Budget and cost

The budget comes from audience, device, and objective. Measure before claiming performance or savings.

| Layer | Measure | Do not confuse with |
|---|---|---|
| Network | Compressed/cached transfer, requests, waterfall, inventoried raw weight | Sum of all possible page assets |
| JS | Parsing/execution, initial/lazy chunks, main-thread work | Bundle size as proof of smoothness |
| GPU/CPU | Frame time, draw calls, decoded textures, geometries, DPR, active loops | DOM element or triangle counts alone |
| Maintenance | Loader/decoder, context loss, teardown, per-device tests | An effect working on the first visit |
| Financial | Hosting, CDN, authorship/licenses, tools, and maintenance work | A Vercel domain or lack of APIs meaning zero cost |

Kimi: entry 56,574 B; 3D chunk 618,987 B; HTML+CSS+JS+two fonts total 775,239 raw/inventoried B.
HDR/GLB/textures had no verified weight. The configured decoder adds conditional cost.
Soda: model-viewer 1,024,001 B; GSAP 69,641 B; four GLBs total 850,584 B.
Can: 3,934 declared triangles; the 15 observed model-viewer elements do not imply 15 GPU contexts.
None of these captures measures FPS, LCP, INP, financial cost, or memory use.

## Failures not to import

| Observed in code | Required adaptation correction |
|---|---|
| Kimi: `freeze` still loads assets and calls the renderer | Poster with an engine-free path; on-demand rendering |
| Kimi: root scale jumps at 1279 -> 1280 and 1440 -> 1441 | Continuous `clamp()` tokens; test breakpoint -1/0/+1 px |
| Both: incomplete reduced-motion behavior | One policy covering CSS, library, camera, and RAF |
| Soda: hidden decoration is still created | Decide the budget before creation and download |
| Soda: variant failure appears only in the console | Atomic commit, rollback, retry, and accessible announcement |
| Soda: `#` navigation and CTAs without proven flows | Verifiable destination and outcome; do not call the demo a checkout |
| No explicit poster | Authorized alternative image, always-useful text and CTA |
| Decoder with CSP-sensitive `data:` details | Integration supported by the adopted version; do not relax CSP by copying |

## Validation and provenance

Observed QA: Kimi 1280x720/390x844; Soda 1440x900/390x844; visible heroes and working mobile menus.
Soda also switched variants with material/background/`aria-pressed` updates.
No horizontal overflow occurred in those states. This does not cover physical devices or every preference.
Test separately: 200% zoom, keyboard, touch, long text, short viewport, reduced motion, save-data,
unavailable/lost WebGL, texture failure, rapid switching, resize, hidden tab, and remounting.
Verify mobile reading/CTA order; reserve product height in flow without covering controls.
Record visual, technological, and functional parity in separate fields with explicit unknowns.

Static analysis parsed entries and a HeroScene slice as inert text, producing partial semantic graphs.
Profiles preserve URLs, hashes, scope, and unknown counts. Large libraries were not fully decomposed.
A 403 on Kimi asset HEAD requests was not a browser-rendering failure; Soda's sourcemap remained unavailable.
Do not distribute images, fonts, models, logos, or original code from these sites without appropriate licenses.
These recipes are newly authored; hashes identify evidence, not usage rights.
Confirm the selected version's license and API before incorporating any dependency into the project.
