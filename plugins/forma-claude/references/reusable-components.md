# Executable appearance editor and articulated passport

These are original, portable JavaScript components with scoped CSS and a runnable [component lab](../assets/components-lab.html). They close the gap between a documented mechanism and reusable code. They do not certify a new consumer or replace its routes, domain data, framework, persistence, or approved renderer.

- [AppearanceEditor](../assets/appearance-editor.js) with [styles](../assets/appearance-editor.css): dependency-free vanilla DOM, versioned state, compact controls, manual preview and explicit persistence.
- [NeuronPassport](../assets/neuron-passport.js): primary passport, an isolated executable extraction of the approved Neuron CSS 3D mechanism. Use it for Neuron fidelity; do not reconstruct its lights, paper, skin or articulation with another engine.
- Legacy [PassportObject](../assets/passport-object.js) with [styles](../assets/passport-object.css): a new articulated Three.js object, using the existing original [BookObject](../assets/book-object.js) cover painter. This is **not an extraction of the approved Neuron CSS passport** and has no claim of equivalent geometry, leather, motion, content, or visual acceptance.
- [Lab controller](../assets/components-lab.js) and [lab styles](../assets/components-lab.css): local-storage demonstration, controls and real runtime diagnostics. The lab's sample name/content is fictional. No personal photographs, national cover art, external code or external fonts are bundled here.

## Run the lab

Serve the Forma repository with `python3 -m http.server 4192 --bind 127.0.0.1` and open `http://127.0.0.1:4192/source/forma/assets/components-lab.html`. A distributed package can serve its own `assets/components-lab.html` directly. The primary passport and appearance editor need no Three import or external font. The retained legacy Three module still requires the destination's existing Three loader when deliberately selected.

`window.__FORMA_LAB__.snapshot()` reports appearance state and the actual CSS-articulated passport state. CSS composition is not a WebGL draw-call benchmark, GPU timer or FPS measurement. Inspect rendered output and actual gestures, including partial turns, before claiming a faithful integration.

The lab embeds the appearance panel in a card to keep both components visible. The component also supports the original nonmodal corner placement. Use the approved [compact profile](../assets/reference-profiles/compact-appearance-v1.json) and [fidelity contract](fidelity-contracts.md) for a reproduction request; the lab is a new consumer, not an independently approved reference. The host must provide Inter Variable for that profile's typography. System-font fallback is explicit and does not establish font parity.

## AppearanceEditor integration

Load `appearance-editor.css` and `appearance-editor.js`; the UMD export is `globalThis.AppearanceEditor` in the browser and `module.exports` in Node. It has no framework or Three dependency.

```javascript
const storage = AppearanceEditor.createLocalStorageAdapter(
  window.localStorage, 'my-product.appearance.v1'
);
const editor = AppearanceEditor.create(host, {
  value: storage.load(),
  placement: 'corner',
  workspace: document.querySelector('main'),
  bottomNavigation: document.querySelector('[data-bottom-navigation]'),
  onPreview(value, {theme, dirty}) {
    // This target is a separate background layer, never a filter over text.
    background.style.backgroundImage = AppearanceEditor.wash(
      theme, value.hue, value.chroma, value.pools, value.grain
    );
  },
  onSave: value => storage.save(value),
  onCommit: value => updateAppearanceConsumers(value),
  onError: error => reportStorageFailure(error)
});
// On route disposal or framework unmount:
editor.dispose();
```

`host`, `background`, `updateAppearanceConsumers` and `reportStorageFailure` belong to the consumer. Handle `storage.load()` errors before mounting: retain the original string and offer recovery; do not silently save defaults over unreadable data. The lab visibly disables saving in this case. Use the domain's existing configuration service instead of local storage when persistence has a server owner. An async `onSave` must resolve only when that owner acknowledges the write; a queued/offline operation must not masquerade as a confirmed save.

`placement:'inline'` (default) leaves positioning to the host. `placement:'corner'` uses the approved workspace-relative left clamp, visible bottom navigation height, 16 px bottom gap and a viewport-constrained scrolling panel. It remains a nonmodal dialog: no backdrop, inert tree, modal trap or automatic save. Callers that close it should restore focus to their opener in `onCancel`/`onCommit`; the component itself stays mounted. `More settings` expands real hue, selection and hold controls, including recovery selection for clipped lights.

| API | Contract |
|---|---|
| `create(host, options)` | Append one scoped component; synchronous instance. `value` missing initializes the 2-light profile. An absent `onSave` disables Save. |
| `value` / `committed` | Defensive copies of draft / last acknowledged configuration. Preview never mutates committed data. |
| `save()` / `cancel()` | Await the adapter / restore committed state. Pending writes block editing and cancel; failed writes retain the draft and show an error. Disposal prevents late completion callbacks. |
| `dispatch(action)` | The same model operations used by the controls. These are state operations, not proof of browser gestures. |
| `diagnostics` | Actual component state and render count; CSS gradients are identified separately from WebGL. |
| `dispose()` | Idempotent listener, observer, scheduled callback and DOM removal. It does not cancel a write already handed to the host. |
| `createState(value)` | DOM-free draft/commit state machine for adapters and regression tests. |
| `normalize(value)` | Strict v1 validation; invalid/nonfinite/unknown data throws instead of silently recreating defaults. |
| `migrateLegacy(value)` | Explicit conversion of legacy `strength` percentages or `stops`; unknown versions reject. `pools:[]` stays empty. Legacy `stops:[]` requires `plain:true` for intentional emptiness. |
| `createLocalStorageAdapter(storage, key)` | Synchronous load and async save. Before the first migrated write it stores the exact original at `key + '.before-v1'`; backup failure leaves the original untouched. No write occurs during load. |
| `wash(mode,hue,chroma,pools,grain)` / `resolve(value,contextColor,previousHue)` | Manual gradient / optional contextual hue resolution. The stage always uses manual configuration. The host resolves only its own actual context; hold blocks contextual color, not the background. |

The v1 configuration contains `schemaVersion`, `theme`, `hue`, `chroma`, `grain`, `hold` and `pools`. Each pool has a stable `id`, `d`, `c`, `x`, `y`, `w`, `h`, `fade` and light/dark `{l,a}`. Positions may be outside the stage. IDs are kept through edit/save; explicit reset replaces the profile. Zero chroma, zero grain, hue zero, empty pools and 5% legacy intensity are valid.

Mechanisms preserved from the original Pauta implementation: 2 initial lights, 3 capacity, insertion before the anchor, color normalization, original 9-stop OKLCH wash and grain layer, group dragging, Alt captured on pointerdown, one-unit keyboard position, ring radial scaling and fractional accumulator. The editor renders every point at `(model+45)/190` and clips offstage points. The ring is present immediately with 2/3 lights and absent with 0/1. The center, ring, count, intensity wave and grain dial have separate operations. IDs and model snapshots keep cancellation and multi-step drag isolated. Touch uses Pointer Events and the compact profile's 44 px controls; a real physical-device check remains separate.

The portable component adds Home/End range shortcuts, an outside-stage recovery selector, strict version validation and async adapters. It does not copy Pauta's routes, context entities, preference service, backend or user data. The scoped CSS implements the compact measurements and tokens, but current source tests alone do not prove every frozen visual criterion. Compare actual rendered measurements before claiming fidelity.

## NeuronPassport integration

Use the extracted mechanism whenever the reference is the Neuron passport. Copy `assets/neuron-passport.js` together with the complete adjacent `assets/neuron-passport/` directory and serve them over the same origin. The frame isolates original CSS, not a new visual renderer. Source colors, gradients, grain, glint and ground shadow remain in the original cascade and motion engine. There is no implicit Three, shader, font service, or image generator.

```javascript
const passport = NeuronPassport.create(host, {
  state: {
    language: 'en',
    passport: {country: '', nativeLanguage: 'Portuguese', photo: ''},
    profile: {name: profile.name, level: 'zero', goal: profile.goal},
    profiles: {en: {level: 'zero', goal: profile.goal}},
    savedWords: [], practiceLog: []
  },
  theme: 'light', interaction: 'direct'
}, {
  async onSaveAsync(nextState, patch, {signal}) {
    // The host owns auth, revisions, conflict handling, and durable storage.
    const response = await saveProfilePatch(patch, {signal});
    return response.acknowledged === true;
  },
  onNavigate: route => navigate(route),
  onToast: message => announce(message)
});
await passport.ready;
passport.setPage(1);
passport.update({theme: 'dark'});
// On route disposal or framework unmount:
passport.dispose();
```

Provide a host with explicit nonzero dimensions. `ready` waits for the child runtime. `update` accepts state and policy changes; `setPage`, `next` and `previous` use the original page controller. `openSkins` opens the original selection UI. `focus` enters the stage. `element`, `frameWindow`, `controller` and `diagnostics` make ownership and inspection explicit. Pass `onRequestClose` to the containing modal so Escape outside an internal dialog closes that host and restores its focus.

### NeuronPassport persistence

Choose **one** persistence callback. `onSave(nextState, patch)` retains its existing synchronous boolean contract. `onSaveAsync(nextState, patch, {signal, requestId})` must return a `Promise<boolean>`; only `true` acknowledges a completed write. A Promise passed to `onSave`, a truthy string, `false`, or a rejected/throwing callback never commits. Omitting both callbacks retains the legacy memory-only mode; it does not provide reload persistence. Supplying both callbacks throws at creation instead of silently choosing an owner.

Both callbacks receive defensive copies of the complete normalized host JSON state and the original patch. Apply the patch through the existing state owner. The async example's `saveProfilePatch` belongs to that owner; it is not a built-in service. Authentication, authorization, server revision checks, idempotency, network timeout/retry policy, offline queue semantics, and reloading persisted data remain host responsibilities. `requestId` is a per-instance sequence for correlation, not a globally unique idempotency key. Do not acknowledge an offline queue as a confirmed durable write.

| Async state | Behavior |
|---|---|
| Pending | Keep the original dialog/draft open, disable controls and cancellation, announce saving, and block duplicate writes. The last committed state and success notifications remain unchanged. |
| Acknowledged | Re-enter the preserved controller's original save path exactly once. Update committed state, then use its original close, page change and success message. No second remote write is made. |
| Rejected or `false` | Keep draft fields and cover selection, restore controls, show an error and allow retry. Do not close the dialog or announce success. |
| New host state during save | `update({state})` invalidates the older write and aborts its advisory signal. Even an acknowledgement arriving just before the original UI commit cannot overwrite newer host state. Keep the draft for review/retry; reconcile any server conflict in the host. |
| Disposal | Abort the advisory signal, remove the frame/listeners once and ignore late completion. Disposal cannot guarantee rollback of a write already accepted by a server. |

During a pending write, `update` returns `false` for changes to `layout` or `interaction`, because those require a remount that would destroy the draft. State and nonstructural policy changes still apply. The host can retry a structural update after settlement. `openEditor` and `openSkins` do not open additional editors while a save is pending. `diagnostics.persistence` reports `async-host-callback`, `host-callback`, or `memory-only`; `diagnostics.save` exposes `status` (`idle`, `pending`, `error`, `committed`, `disposed`), `requestId`, and a safe error message. Observe this result or await the host callback; do not infer completion from the Save click.

The async barrier lives only in the authored adapter/frame. The approved `passport.js`, `passport-motion.js`, original CSS and their source receipt remain byte-preserved. Frame-level pending text is added only for the explicit async mode. Source-byte checks and simulated bridge tests do not replace browser checks of delayed/rejected saves, retained drafts, retry, host conflicts and disposal with the actual controller.

The `layout:'object'` default adapts only the containing surface and available space. The explicit `layout:'settings'` profile carries the measured Neuron Settings typography, page width and controls spacing; `controls:'host'` leaves the original control row to the consumer. `layout:'reference'` retains original profile framing for controlled replay. A consumer with its own settings font, page sizing, theme, motion, contrast or background must reproduce those host conditions before a pixel comparison is meaningful. Frame isolation prevents host CSS from silently replacing source colors or typography. It does not remove responsibility for parent focus, close handling and data ownership.

Original Neuron UI strings are preserved as an intentional source locale. Country-cover URLs retain their source and attribution; no country artwork or user photographs are bundled. A loaded country image and its network fallback are different visual states. Use the same country resource bytes for comparisons. The source receipt inside `neuron-passport/` identifies every preserved file. The reference is v03.23 JavaScript plus the current CSS explicitly authorized for this extraction; full historical v03.23 CSS is unavailable.

The [passport case](passport-polish-case-study.md) explains the material and articulation invariants. For acceptance, compare matching views, light/dark themes, closed/open/partial turns and actual pointer input in the destination. Zero pixel differences in recorded states do not certify unseen environments or replace a Windows execution.

## PassportObject integration

**Legacy alternative:** this simplified Three mechanism is retained for existing consumers. It is not selected by the component lab and must not be substituted for NeuronPassport when the requested result is the approved Neuron passport.

Load `book-object.js`, `passport-object.js`, and `passport-object.css`. Supply the destination's existing Three namespace through `loadThree`; there is no implicit network import or engine installation.

```javascript
const passport = PassportObject.create(host, {
  title: 'Field passport', name: profile.displayName,
  detail: profile.description, color: '#284f50', material: 'leather',
  open: 0, pageTurn: 0, fit: 1
}, {
  bookObject: BookObject,
  loadThree: () => import('three') // Resolve through the destination bundler.
});
passport.setOpen(1);
passport.setPageTurn(.5);
passport.setPose({yaw: 35});
// Keep the full profile text/actions accessible in the host DOM.
// On route disposal or framework unmount:
passport.dispose();
```

The host needs nonzero width/height; the lab uses 340 px height. Acquisition and frames pause while the document/host is hidden. Geometry/material updates rebuild when needed; pose/open/page updates preserve GPU materials and textures. An already pending import cannot construct a renderer after disposal. Context loss, loader failure, missing dependency and selected static mode leave a labeled DOM cover; these paths are not articulated 3D. Recreate after an unrecovered context failure when the host wants a retry.

| API | Contract |
|---|---|
| `create(host, config, options)` | Returns immediately. Options include `loadThree`, `bookObject`, `interactive:false`, `static:true`, `onRender` and `onDiagnostics`. |
| `update(patch)` | Partial validated content/material/geometry/opening/fit/pose update. |
| `setOpen(0..1)` | Hinged front cover from closed to 180 degrees. |
| `setPageTurn(0..1)` | Segmented paper turn, constrained by current cover opening; requested value is retained for later opening. |
| `setPose({pitch,yaw,roll})` | Explicit orientation in degrees. Drag and keyboard are additional consumers of this state. |
| `config` / `renderMode` / `diagnostics` | Defensive normalized values / truthful current renderer / actual runtime counters and policy. |
| `dispose()` | Releases geometry, unique shared materials, textures, renderer, callbacks, observers and DOM once. |
| `normalize`, `geometrySpec`, `leafPositions`, `createGeometry`, `fitDistance` | Public DOM-free model/real Three geometry helpers used in meaningful tests. They do not certify visual parity. |

Live OS reduced motion and root `data-motion="reduced"` stop interpolation and drag rotation; explicit opening, page and keyboard controls apply immediately. Root `data-materials="static"` releases the renderer and prevents acquisition; removing it resumes using the already loaded dependency when available. There is no idle animation loop. The object only requests frames while an explicit state change is settling.

This implementation has actual extruded front/back covers, a page block, a binding volume, a hinged cover with lining, and a 24-segment turning leaf whose root stays fixed. Free cover corners are rounded; the binding root is straight. It uses original BookObject cover artwork with a new standard material and procedural bump tile. The fit calculation includes the open envelope, not just closed width. Width, height, thickness, inset, opening, fit and material are configurable with bounded defaults.

**Limits:** this is a new simplified material/geometry mechanism. It has no continuous wrapping leather arc, exact Neuron end caps, full page stack simulation, physical paper/leather simulation, national-cover catalog, selectable page text, profile backend or approved visual match. The page back currently mirrors the same sample texture. Its standard material is not BookObject's audited stamping shader. The static cover does not depict an articulated opening. Use the [approved passport case](passport-polish-case-study.md) to decide which additional invariants the destination needs, and preserve an existing approved CSS mechanism when that is the request.

## Verification boundaries

`appearance-editor.test.cjs` exercises initial/reopened 0/1/2/3 states, exact third-light values, all-point group and isolated movement, offstage preservation, keyboard deltas, ring accumulation, anchor/color invariants, reset, preview/cancel, failed and pending persistence, migration backup and independent gradient stops. `passport-object.test.cjs` constructs real Three geometry and checks root attachment, finite positions/normals, paper insets, cover thickness, opening constraints and the camera envelope across intermediate poses. Separate lifecycle tests check static fallback, failed and late loaders, and disposal cleanup. These are model/geometry checks, not screenshot or GPU evidence.

For each destination, exercise desktop and touch, keyboard, Save/reopen/reload, failure, system theme, live reduced motion, resize, hidden/offscreen state, context loss/fallback and disposal. Capture served resource identity and actual controls/renderer. The component lab supplies an observable consumer; completion of one test layer must not be presented as all fidelity checks passing.
