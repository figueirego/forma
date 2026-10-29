# Generated artifacts, editing and export

Use this for visual editors, generated HTML, presentations, reports, posters, prototypes and canvases. It does not impose a new editor or format on the project. Read [contracts and trust](contracts-trust.md) for asynchronous operations and [brand/marketing](brand-marketing.md) for channel adaptation.

## 1. Define the deliverable

State the authoring format, source of truth, preview format, delivery file, destination editor and expected editability. HTML, component trees, scene graphs, Markdown and bitmaps have different capabilities.

Map required content units to pages, sections or states before choosing layouts. Template count does not determine page count. An authorized summary may reduce content; accidental omission must not. Distinguish a fixed-size canvas, paginated document and responsive interface: all can use HTML, but they need different criteria.

| Promise | Acceptance evidence |
|---|---|
| Visual preview | An opened render with the correct fonts/assets, content and states |
| Functional HTML | Actions, links, semantics and layout tested in the delivered environment |
| Editable PPTX | Promised text/objects selectable and editable in the target editor |
| Faithful PNG/PDF | Final file opened; dimensions, pages, fonts and crop checked |
| Round-trip | Reopen/import and compare the data and relationships the contract preserves |
| Local artifact | Destination and network dependencies known; local does not imply offline |

One image per slide in a PPTX preserves appearance but does not make its text and charts editable objects. Identify rasterized SVG/canvas content as such. List losses by layer: text, vectors, charts, links, notes, animation, fonts and effects. If the format cannot support a property, preserve the source and expose the limitation; do not present a silently incomplete download as full success.

### Editorial contract for restyling

Before changing the appearance of a supplied piece, inventory the content that must remain: literal text, values, units, annotations, marks, groupings and relationships. Rewrapping lines or recomposing for another aspect ratio does not authorize rewriting, omitting or adding a title, slogan, URL or footer. Preserve identifier spelling such as `after_model` and cardinalities such as `1..*`; case and escaping transformations can change rendered text even when the source contains the correct string.

Compare **rendered** content with the independent source. A test that only searches for expected phrases does not detect extra text, repetition or reversed relationships. Verify these dimensions separately. For charts/diagrams, preserve [data and topology](data-dashboards.md#data-and-topology-in-exported-assets). If reading a raster cannot resolve an arrow or word, record the uncertainty and clarify it rather than filling it in by appearance.

## 2. One source of truth, explicit revisions

For selection-based editing, connect the visible object to a stable ID, document and revision. Screen coordinates support selection/feedback; they do not replace identity. A position-based DOM selector can point to another node after generation. Before applying an asynchronous patch, revalidate the target and revision.

Describe the scope: selected object, region, page or document. Changes outside it require a concrete dependency or a new instruction. In a multiple selection, mixed values must not be overwritten merely by opening the inspector.

Capture confirmed state -> apply a validated change -> confirm persistence -> record undo/version according to the existing architecture. On error, preserve the draft and show recovery. Do not create a snapshot for every drag frame; group by editing intent where appropriate. Define how autosave, undo and generation compete; restoring a snapshot must not silently erase later changes.

A generation snapshot, edit undo and backup have different scopes; one does not prove the others. Writing through a temporary file plus rename may prevent partial content, but does not prove protection against another writer's overwrite. Define revisions/preconditions and coordination compatible with existing storage; a timeout must end in a recoverable state, not merely stop retries without feedback.

Persistence and preview refresh are separate confirmations. If writing completed but refreshing failed, indicate that the file was saved and allow the preview to refresh; do not revert confirmed content solely because of a visual failure.

**Exercise:** select title A, start a rewrite, switch to document B, then receive A's result. The result may change only A at the expected revision or remain pending reconciliation; never the currently selected title in B.

## 3. Preview is a trust boundary

Treat generated/imported HTML, SVG, URLs, files and messages as untrusted input. Use isolation compatible with the product: a separate origin or minimally capable sandbox, network/asset policy and message validation. Do not expand renderer privileges just to make a preview work.

For a selection/editing bridge, validate the channel, sending frame, session/revision and schema before accepting messages. Do not trust only the event name or `origin: null` from a sandboxed iframe. Content sanitization, execution isolation and effect authorization are separate responsibilities.

The preview must not inherit credentials, unrestricted filesystem/IPC access or publishing capability from the editor. Private asset uploads, external access and generation costs follow existing authorization. A generated component must not turn source text into a privileged instruction.

The asset importer also needs its own boundary: validate paths and symlinks against allowed roots before reading/incorporating files. Browser CSP does not restrict the local process that builds the preview.

## 4. Jobs and generation context

A generation belongs to a project/document, input revision, request and mode/provider. Preserve that identity in progress, preview, result and error. A retry must check known results or reuse an idempotency key where supported; polling must not duplicate paid generation. Do not switch providers after a failure without authorization.

Distinguish planned, running, partial preview, completed, canceled, failed and unknown result. Interrupting the stream does not prove that work stopped. Real progress, supported cancellation and work preservation are UX criteria; invented percentages do not help.

## 5. Export and verify

For multiple outputs, keep a simple mapping in the existing brief/contract: format, dimensions/unit, required content, editability, source revision and final file. Add duration/FPS/audio only for time-based media. Revalidate every variant after recomposition; approving a square does not automatically approve a vertical crop. An animatable layer needs identity, bounds, anchor and relationships where relevant; a flattened image does not prove editable parts or independent motion.

Pin the exported revision and options: pages, dimensions/unit, scale/DPR, fonts, assets, transparency, animation and format. Wait for fonts/media to be ready; do not capture a placeholder or arbitrary frame. Page/asset errors must prevent full-success claims or produce an explicitly identified partial delivery.

Open the result with the appropriate parser/editor and compare count, content, order, dimensions and promised capabilities. For a deck, also check notes and editable objects; for a report, units, sources and data; for a poster, crop and final size. An existing file or download toast does not prove correctness.

Content beyond capture limits requires pagination, tiles, another format or a partial-delivery warning; never silently cut off the last section. Use an independent source to compare quantity and content, not just data from the same extractor. A single HTML file loading fonts/scripts from a CDN is not self-contained offline; test without a network when required. An exported video project is not a rendered MP4.

Test accented/RTL content, missing fonts, blocked assets, long pages, transparency and intermediate failures according to the promise. Round-trip checks compare preserved properties; do not claim lossless conversion when the converter supports only a subset. Export does not publish, and creating a backup does not prove restoration.

### Transparency and composition

For a transparent cutout or logo, check the final file's actual alpha. A PNG extension, an alpha channel and a visible checkerboard do not prove transparency: every pixel may be opaque or the checkerboard may be painted into the image. Examine the area that should be transparent and preserve legitimate semitransparent edge pixels.

Composite the output over the destination's relevant backgrounds and inspect halos, fringes and details at a useful scale, as well as the whole composition. A cutout that works on white may have an unsuitable light edge in a dark theme. Investigate matte, premultiplication, color conversion or compression according to the cause; do not hide the defect with blur or impose out-of-scope themes. Recoloring a logo or deleting details must be part of the request. A flattened preview does not prove alpha survived the download.

Conceptual basis: Huashu and HTML Anything (multiple formats), DeepSeek Design (editable document/selection/export), Open CoDesign and Kun (working context and versions). These are static evidence with distinct capabilities and licenses; consult [use cases](source-use-cases.md).
