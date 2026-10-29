# Web and browser interfaces

Detect the existing framework, rendering strategy, router, components and CSS. Without code, choose a stack only when delivery requires it. Do not force React/Next/Tailwind onto a static page or migrate versions as a side effect of design work.

## Web behavior

- Use semantic HTML, real links, correct buttons, landmarks and coherent headings. Preserve history, deep links, opening in a new tab and sharing.
- Prefer intrinsic layout before breakpoints. Test narrow, intermediate and wide widths, plus zoom, orientation, extensive content and the virtual keyboard.
- Choose svh, dvh or content-based height according to the desired stability; 100dvh does not solve every viewport problem. Do not clip content with a fixed height.
- Use progressive enhancement where feasible. Essential content must not remain invisible if animation or JavaScript fails.
- Use responsive assets with reserved dimensions; load critical media early and defer secondary media. Do not blindly lazy-load the LCP element.
- Web typefaces need compatible fallbacks, licenses and a loading strategy. Self-hosting versus a provider depends on privacy, caching and the project, not a universal prohibition.
- Isolate code that requires the client without turning the entire application into a client-only app for convenience.

## Performance and SEO

Set a proportionate budget: payload, JavaScript, fonts, images, requests and interaction time on the target device. CWV are experience metrics; check current values and methodology in official documentation before using them as a contractual gate. Distinguish lab measurements from field data and percentiles.

For indexable sites, preserve URLs, redirects, titles, canonical URLs, metadata, factual structured data, sitemaps and required events. Audit links and metadata after a redesign. A good screenshot does not prove indexing or ranking.

Test the keyboard, screen reader, real form or explicitly labeled simulation, back/forward navigation, network errors, links and menus. Do not claim that the backend works because the prototype displays a success toast.

For adaptive product layouts, use the list/detail recipe in [mobile](mobile.md) in the browser too: breakpoints come from content, and state persists through resizing. For code and practical control reviews, use [patterns](component-patterns.md).
