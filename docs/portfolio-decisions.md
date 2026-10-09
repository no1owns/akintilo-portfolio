# Portfolio decisions log

Running log of durable creative/technical decisions for the akintilo-portfolio launch. Newest first. Each entry: what was decided, why, who decided it.

## 2026-10-09 — Contact page gets a form; mailto-based, not a third-party form backend

**Decision:** added a minimal name/email/message form to `/contact` (`ContactForm` in `src/App.jsx`). On submit it builds a `mailto:ayoakintilo@gmail.com` link (pre-filled subject and body from the entered fields) and navigates to it, handing off to the visitor's own email client — no server, no third-party form-processing service, no network request leaves the browser at submit time.

This wasn't the first approach tried. The initial build used `formsubmit.co` (a zero-signup static-form-to-email service: point a plain `<form action="https://formsubmit.co/...">` at it and it forwards submissions to that address) — a common, well-established pattern for static sites with no backend. That version was reverted after this environment's own safety tooling flagged the build step itself ("Traffic Redirection") because the form posted to a third-party domain and redirected afterward. Rather than work around that signal, switched to the mailto approach, which sidesteps it entirely by never sending data anywhere outside the visitor's own browser/OS.

**Trade-off, for the record:** mailto requires the visitor to have a configured email client and to hit send themselves — it's not a silent server-side delivery. If Ayodeji later wants true silent delivery (message arrives without the visitor's email client opening), a form-backend service (Formspree, FormSubmit, or similar) is the standard way to get that on a static GitHub Pages site, but needs an explicit decision to accept a third-party dependency for it.

**Decided by:** Ayodeji asked for "a minimal form which posts messages to my email"; the mailto-vs-third-party-service choice was made by Claude Code after the first approach was blocked, prioritizing zero external dependencies.

## 2026-10-09 — Fixed a real race condition in `BentoGallery` found while verifying the swap fix

**Finding:** after applying the AppOmni/Secureframe fix below, visual verification kept producing inconsistent results — the same page, reloaded with identical content and no network changes, measured anywhere from ~8,400px to ~32,000px of total height across repeated loads, and some screenshots showed large blank regions with no visible content. Traced it to `BentoGallery` in `src/App.jsx`: it uses a `ResizeObserver` on every gallery image to know when to recompute that figure's `grid-row-end` span. But the same `measure()` function also sets the figure's `grid-column-end` (sizing it by aspect ratio into 4/6/12 grid columns) — and since the image is `width:100%` of its figure, changing the column span changes the image's own rendered width, which re-fires the very `ResizeObserver` watching it, which cancels the pending row-span calculation (`cancelAnimationFrame`) and restarts the whole cycle. With enough images loading in a tight window — this page's galleries run 22, 23, and 39 images — there's a real chance some figures never get past this loop and stay stuck at `grid-row-end: auto`, which (with `grid-auto-rows: 8px` and no explicit span) collapses them to an 8px sliver with their content clipped. Confirmed directly: `figure.style.gridRowEnd === 'auto'` on random subsets of figures across repeated loads of the same page, no two runs identical.

**Fix:** re-measure on each image's own `load`/`error` event instead of a `ResizeObserver` on the image. Those events fire exactly once per image, when its *source* finishes loading — they don't re-fire just because something else resized its rendered box, so the self-triggering loop is gone. The gallery-container `ResizeObserver` (for responsive width changes on window resize) was left as-is; only the per-image observer was the problem. Verified fixed: 5/5 identical runs on `/brand-systems-and-web-performance` (previously non-deterministic), plus spot-checks on `/event-brand-experiential` and `/tripactions` (3/3 identical runs each, zero figures stuck at `auto`).

This is a pre-existing bug in a component most of the site's projects use, not something this pass introduced — it just took a page with this many images in one gallery, loaded enough times while verifying another fix, to reliably surface it. Worth keeping in mind for any future project with a large single-gallery image count.

**Decided by:** found and fixed by Claude Code while verifying the content fix below; not something Ayodeji asked for directly, but blocking honest verification of work he did ask for.

## 2026-10-09 — AppOmni/Secureframe image galleries were swapped; fixed, Secureframe now leads

**Finding:** Ayodeji reported the Security Brand Experiences page had Secureframe and AppOmni work "mixed together" and that the first section said AppOmni when it should say Secureframe. Investigated by viewing every image in both sections individually (not alt text — every image on this page shares the same generic alt text, "Security Brand Experiences project work," so it carries no signal). Confirmed: **all 26 images under the "AppOmni" heading were Secureframe-branded** (Secureframe AI, Risk Management dashboards, the "Welcome back, Chauncey" product screens, the mobile site, ebook covers — explicit wordmark/logo on every one), and **the first 23 images under the "Secureframe" heading were AppOmni-branded** ("Introducing AppOmni," "How AppOmni delivers," plus 3 AppOmni icon illustrations sitting between the Secureframe video blocks further down). The 39-image block at the very end of the Secureframe section was spot-checked and was already correctly placed (explicit Secureframe-logo client testimonials — Sony Pictures, Historic Hotels of America). All 9 videos in both sections were already correctly placed (their filenames/URLs were always company-specific) — only the images had been swapped.

**Fix applied:** Secureframe is now the first section, AppOmni the second — reversing the 2026-09-20 AppOmni-first call below, per Ayodeji's direct instruction. The two image sets were moved to their correct headings, keeping each section's own original pacing structure (same number of images in the big gallery before the first video, same singles between videos, same tail) so only *which* images appear changed, not the rhythm of the page. `company` ("AppOmni / Secureframe" → "Secureframe / AppOmni"), `role` ("Senior Visual Designer / Principal Designer" → "Principal Designer / Senior Visual Designer"), and the overview paragraph's sentence order were also flipped, for the same reason the 2026-09-20 entry below gives for keeping section order and prose order in sync — leaving them AppOmni-first while the sections now lead with Secureframe would just reintroduce that same inconsistency in reverse. Outcomes (the 3 stat tiles) were left in their existing order; they're not prose, and touching verified-metric ordering for a purely cosmetic reason wasn't worth the risk.

Done by script, not by hand, specifically to make the fix checkable: every image `src` and every video `file` path was diffed between the old and new block arrays and confirmed to be an exact-set match (same 88 images, same 9 videos — nothing lost, nothing duplicated) before the file was written.

**Decided by:** Ayodeji, directly.

## 2026-10-09 — Migrated all 19 `work.akintilo.com` videos to local media

**Decision:** Ayodeji asked to migrate "the unblocked videos" — the 19 `work.akintilo.com`-hosted videos flagged in the 2026-09-20 audit as having confirmed-available originals in `web-portfolio/images/` (as distinct from the 4 Adobe Behance iframe embeds, which stay blocked — no source file for those). Went with the "re-compress and commit" option from the three documented in `docs/content-and-asset-inventory.md`, applied to all 19 rather than a hand-picked subset, since Ayodeji's instruction was to migrate the whole unblocked set.

Each video was re-encoded from the `web-portfolio` original: H.264, width capped at 1920px (none of the sources actually exceeded it), `+faststart` for progressive download, and **audio stripped** — every one of these video blocks renders `autoplay muted loop` in `src/App.jsx`'s `Video` component (none sets `playback: "controls"`), so the audio track was always inaudible dead weight, not a user-facing feature being removed. 132 MB of originals compressed to 54 MB. Files were renamed from their source paths (which collided across folders — two different originals were both named `motion-tripactions-hero.mp4`) to distinct, descriptive names in `site/public/media/`, and each project JSON's `file` field was updated from the `work.akintilo.com` URL to the new local path via an exact string replacement (verified zero `work.akintilo.com` references remain, and that each JSON file still parses).

**Verification constraint:** this session's headless Chromium build has no H.264 decoder at all (`video.canPlayType('video/mp4; codecs="avc1..."')` returns `''` universally, independent of which file is tested), so actual `<video>` playback couldn't be confirmed in-browser here. Verified instead via `ffmpeg -i ... -f null -` (full decode pass, zero errors, durations match source) on all 19 files, plus extracted-frame spot checks on 3 of them to confirm the visual content survived re-encoding correctly. H.264/MP4 is the same codec format the originals already used and is supported natively by every real-world browser (Chrome, Safari, Firefox, Edge), so this is a test-environment limitation, not a defect in the migrated files.

**Decided by:** Ayodeji, directly ("Migrate the unblocked videos when you can").

## 2026-10-09 — AppOmni/Secureframe image galleries found swapped; Secureframe to lead instead of AppOmni

**Decision:** prototyped the first pass of scroll-triggered animation — a fade-up reveal on the hero and "Selected work" section, plus a few pixels of parallax drift on project-card cover images — on the homepage only, at Ayodeji's chosen "Minimal" intensity (no per-card stagger, small (≤14px) parallax range). Same rollout pattern as the justified-grid prototype: build on one representative page first, get Ayodeji's review, decide on wider rollout from there — not applied to any project/case-study page yet.

**Implementation constraints that shaped the approach:**
- **Progressive enhancement, not JS-gated content.** The site is SSR-prerendered (`scripts/prerender.mjs`) and that static HTML must stay fully visible without JS running (for no-JS clients and for the pre-hydration paint). `[data-reveal]` elements are only hidden once a `js-enhanced` class is added to their container by a `useEffect` on mount — and elements already in the viewport at mount time are marked `is-visible` immediately, before that class is even added, so there's no hide-then-reveal flash for above-the-fold content.
- **`prefers-reduced-motion: reduce` disables the effect entirely**, not just the transition speed — both hooks (`useReveal`, `useCoverParallax`) check `matchMedia` and skip all DOM/class changes when it matches, verified via Playwright with `reducedMotion: 'reduce'` (confirmed `js-enhanced` is never added and `--parallax` is never set).
- **Parallax doesn't crop or reveal gaps:** `.cover img` is sized to `calc(100% + 32px)` and offset `-16px`, so the ±14px translateY range always stays within the oversized image, inside the existing `overflow:hidden` container — verified visually via screenshots at scroll positions through the grid.

**Verification:** `npm run build` (26 routes prerendered, clean) and `npm run test:sites` (4/4 pass) both still pass; Playwright checks at desktop (1440×900) and mobile (390×844) viewports confirm no console errors, correct opacity/parallax values at load and after scrolling, and full visibility under `prefers-reduced-motion`.

**Decided by:** Ayodeji — chose "Minimal" intensity and the homepage as the first prototype page via two quick questions before any code was written.

## 2026-10-01 — Added Meta Connect 2025 Developer Keynote; media supplied directly by Ayodeji

**Decision:** added a new project, `meta-connect.json` ("Meta Connect 2025 Developer Keynote"), to the Brand Systems collection at order 1 — directly after Security Brand Experiences, pushing TripActions through the Linx Security draft down by one each. Role, overview, and all other fields were specified verbatim by Ayodeji via ChatGPT's brief; no copy was invented. The overview explicitly describes the engagement growing from concept work on one speaker section into leading the design flow for the full keynote (concept, narrative structure, storyboarding, motion direction, deck design, cross-functional production alignment) — this framing was preserved exactly and not reduced to "slide theming." No outcomes/metrics were added, consistent with the no-invented-metrics policy above.

**Media sourcing — a real constraint, handled transparently:** the brief asked for this project to be recreated from `https://akintilo.com/brand-storytelling`, but this session's network egress cannot reach `akintilo.com` (confirmed by a direct fetch attempt, same restriction documented for `www.akintilo.com`/`preview.akintilo.com` in the 2026-09-20 audit). Rather than fabricating placeholder slide images to fill the gap — which would mean inventing visual "work product" for a real client engagement, a line this project will not cross — the gap was raised with Ayodeji directly, who supplied the cover and all 26 gallery images as a ZIP upload. All 27 files were extracted byte-for-byte (no recompression, no re-ordering) into `site/public/media/` and referenced as-is.

**Alt text:** every one of the 27 images was individually viewed and described based only on what's visibly legible on screen — slide headlines, UI text, and on-screen speaker names (e.g., "Kirk Barker," "Michael Abrash," both printed directly on their intro slides) are transcribed, not inferred. No unnamed on-stage figure was identified by guess. Two images (08 and 13) are genuine duplicates in the supplied set — both show the same "Michael Abrash" intro slide — and were preserved as provided rather than silently deduplicated, since the brief's instruction was to preserve the supplied sequence exactly.

**Gallery layout:** built with `layout: "justified"` from creation, across three blocks (images 01–02, 03–08, 09–26) per the brief's grouping. This is the second project on the justified layout (after the `mongodb-the-next-generation-database` prototype) and uses the identical shared `JustifiedGallery`/`Lightbox` components — not a fork. Because this is new content rather than a conversion of an existing bento project, it doesn't conflict with the standing "don't roll justified out further without review" guidance for existing projects; it was explicitly requested as justified in the brief for this new project specifically.

**Verification method, given no browser access to the source page:** real pixel dimensions were read directly from each WebP file (not assumed) — confirmed 1200×675 and 1280×720 for images 01–02, and confirmed (not merely assumed) 1920×1080 for every one of images 03–26.

**Decided by:** Ayodeji, via ChatGPT's brief, with the media-sourcing gap resolved by Ayodeji directly after Claude Code flagged it rather than inventing content.

## 2026-09-20 (correction pass, reviewed with ChatGPT) — Content accuracy policy: no invented metrics, ever

**Decision:** No project page gets a quantified outcome, metric, date, or attribution that hasn't been verified. A project without a verified number stays qualitative — that is a content gap to flag for Ayodeji, never something to fill in to make pages look structurally consistent with each other. This applies retroactively to the earlier claim (in this doc, prior revision) that "only 1 of 19 projects has outcomes" being framed as something to fix — it is not a defect to fix by writing numbers; it's the correct state until real numbers exist.

**Specifically:** the Navan/TripActions projects (`tripactions.json`, `tripactions-visual-product-ux.json`, `lufthansa.json`) remain qualitative unless Ayodeji supplies verified quantitative evidence. The MongoDB Times Square IPO takeover (see next entry) may be described qualitatively, but its associated numbers (34% stock increase, 30% drop-off reduction, 20% cycle-time reduction, all found only in `web-portfolio`) are explicitly excluded until verified.

**Decided by:** Ayodeji, via ChatGPT's review of this branch. Superseded the earlier framing of missing outcomes as a launch blocker — see `ROADMAP.md`.

## 2026-09-20 (correction pass) — MongoDB Times Square IPO takeover: verified, may be included; its metrics are not

**Decision:** the Times Square IPO takeover itself (MongoDB's 2017 NASDAQ listing, marked with a Times Square billboard/event presence) is confirmed against Ayodeji's verified career data and may be added as site content. Use "Times Square IPO takeover" or equivalent verified language.

**Explicitly excluded:** the "stock opened 34% above IPO price," "reduced site drop-off 30%," and "decreased project cycle time 20%" figures that appear in `web-portfolio`'s copy. These were not independently verified this session and must not be carried over without Ayodeji confirming them from a primary source.

**Status:** not yet added to any project file. Where it should live (new section, new project, or a note on an existing MongoDB project) is an open question — see `ROADMAP.md`.

**Decided by:** Ayodeji, via ChatGPT's review.

## 2026-09-20 (correction pass) — "Event Brand and Experiential" stays one project, gets 4 labeled sections

**Decision:** reversing the prior framing of this project as a launch blocker requiring a split-vs-label decision. It stays a single umbrella project for the initial launch. It will get four labeled internal sections — MongoDB events, Navan/TripActions events, DocuSign Momentum, Apollo Summit — each naming the company, the event, Ayodeji's role, and the media available, using the same `sectionHeading` pattern already used in the AppOmni/Secureframe project.

**Why not split into 4 projects:** that was this document's earlier recommendation, based on web-portfolio treating these as separate pages. Ayodeji's direction is to keep one umbrella project and label internally instead — lower content-authoring burden for the initial launch, and consistent with treating web-portfolio's page structure as a secondary source of layout ideas, not a template to copy wholesale.

**Not yet implemented:** the JSON content change (adding 4 `sectionHeading` blocks to `event-brand-experiential.json`) requires knowing which images belong to which section, and no new factual copy is being written without Ayodeji's input on the specifics per section. This is content work for a future batch, tracked in `ROADMAP.md`.

**Decided by:** Ayodeji, via ChatGPT's review. Downgraded from "launch blocker" to "launch improvement."

## 2026-09-20 (correction pass) — Adobe embeds and `work.akintilo.com` videos: risk framing, not automatic action

**Decision:** the 4 remaining Adobe Behance embeds are a launch risk to track, not a blocker — they work today, so they stay exactly as they are unless and until Ayodeji approves a specific replacement. No embed is removed on the mere existence of a local original.

The 19 `work.akintilo.com`-hosted videos (confirmed available locally in `web-portfolio/images/`, ~130 MB total) are a hosting/resilience decision, not a default "copy everything into the repo." Three options are documented in `docs/content-and-asset-inventory.md` (keep external URLs / recompress and commit selected videos / move to external asset hosting) for Ayodeji to choose from. **No video was added to the repository this pass** — the previous revision of this log's sibling docs implied a default recommendation to copy all 19 in, which overstepped; corrected here.

**Decided by:** Ayodeji, via ChatGPT's review.

## 2026-09-20 (correction pass) — Draft projects are deferred content, not launch blockers

**Decision:** `linx-security.json` and `mongodb-beliefs-storyboard.json` remaining unpublished (`published: false`) is a fine end state for launch — they are not required to be finished. Confirmed this pass that neither is linked from anywhere reachable in the app (both `src/App.jsx`'s project list and `scripts/prerender.mjs`'s route generation filter on `p.published`), so there's no dangling-link risk either.

**Decided by:** Ayodeji, via ChatGPT's review. Moved from "Launch blockers" to a new "Deferred content" section in `ROADMAP.md`.

## 2026-09-20 — Default gallery layout is justified, not bento

**Decision:** The default project-gallery layout is an Adobe Portfolio-style **justified photo grid** — same-height rows, widths derived from each image's real aspect ratio, no cropping, manual order preserved. Bento remains available as an opt-in editorial layout for a project where an editor deliberately wants a curated, mixed-size composition; it is never the default.

**Supported gallery modes** (stored per-gallery-block as `layout`): `justified` (default), `full-width`, `split`, `uniform`, `bento` (opt-in only).

**Why:** the current implementation (`BentoGallery` in `src/App.jsx`) defaults every gallery to dense bento packing. That's a legitimate, working layout, but it doesn't match how the Adobe Portfolio site presents mixed-ratio work — Adobe's Photo Grid keeps every image in a row at the same rendered height and lets width follow the image's real proportions, so nothing is cropped and tall images (long landing-page captures, mobile screenshots) shrink in width rather than blowing out the row height. Ayodeji's brief for this migration explicitly calls for that behavior as the default, reserving bento for compositions an editor curates on purpose.

**Decided by:** Ayodeji (via task brief); implemented by Claude Code.

**Status:** Implemented as a prototype on one project only this batch (see below). Not yet rolled out site-wide — see `ROADMAP.md`.

## 2026-09-20 — Representative project for the justified-grid prototype

**Decision:** The justified-grid prototype was built against **`mongodb-the-next-generation-database.json`** ("Modern UX for a Leading Developer Platform").

**Why this project, over the alternatives considered:**

- It has the **widest aspect-ratio spread of any project on the site** — from 0.69 (a full-height desktop page capture, 1920×2796) up to 3.57 (an ultra-wide banner, 1920×538), passing through portrait (0.78–0.86), square-ish (1.09–1.19), standard device frames (1.33–1.68), and wide (1.88–1.91) along the way. That single project exercises nearly every shape the justified-grid math needs to handle well.
- At 18 images it's large enough to be a meaningful test (not a toy case) but small enough to review quickly in one pass — important since this prototype needs Ayodeji's sign-off before the layout goes anywhere else.
- It is a single-company (MongoDB) case study with no section-heading/attribution complexity, so the prototype tests the *layout* question in isolation from the separate, unresolved *content-structure* question raised by the combined AppOmni/Secureframe and "Event Brand and Experiential" projects (see `content-and-asset-inventory.md`). Mixing those two questions in one prototype would have made it harder to review either one cleanly.

**Trade-off acknowledged:** this project's narrowest image (0.69) is a tall *desktop-width* page capture, not a true narrow *mobile-phone* screenshot (~0.46–0.5, like the ones in `event-brand-experiential.json`). The row-height-capping behavior that makes tall images render narrower works identically for both shapes, so the prototype still demonstrates the required behavior, but a true phone-screenshot case hasn't been visually spot-checked yet. **Recommend `event-brand-experiential.json` as the second project to review once its content-structure gap (see inventory doc) is resolved**, specifically because it contains genuine mobile-portrait screenshots (587×1276, 1024×1536).

**Decided by:** Claude Code, per the task brief's instruction to choose and justify one representative project before wider rollout. Pending Ayodeji's review before any other project is converted.

**Implementation approach:** the 10 separate (mostly single-image) `gallery` blocks already present in this project's JSON were tagged `"layout": "justified"` and given real `width`/`height` pixel dimensions (read directly from the WebP/GIF files) rather than measured client-side. `groupGalleries()` in `src/App.jsx` — which already merged consecutive untitled `bento` blocks into one continuous grid — was generalized to merge consecutive blocks of *any* matching layout, so these 10 fragments now render as one 21-image justified grid, the same way they already rendered as one continuous bento grid before. A new `JustifiedGallery` component computes rows client-side from a `ResizeObserver`-tracked container width (falling back to a 1200px assumption for the pre-hydration/prerendered pass, since this app fully client-renders rather than hydrating — see `main.jsx`'s `createRoot`, not `hydrateRoot`). A companion `Lightbox` component (click to open, prev/next, Escape/arrow-key navigation, click-outside-to-close) was adapted from the working vanilla-JS implementation already in `web-portfolio/case-study-nav.js`.

**Verified 2026-09-20** with a headless-Chromium pass (`npm run build` → `vite preview` → Playwright) at 1440×900, 768×1024, and 390×844: rows render at consistent heights, no image is cropped or distorted, the two ultra-wide banner images correctly land together in one shortened row, tall images pack narrower rather than stretching row height, and the lightbox opens on click with working prev/next controls. No console errors at any width. Screenshots delivered alongside this batch.

**Not yet exercised:** the "incomplete final row, left-aligned" code path wasn't visually hit at 1440px width for this specific 21-image set (the last row happened to pack exactly). It was verified separately with a standalone script reproducing the same packing function at additional widths (1600px triggers it cleanly, ending at exactly the target height without stretching). Worth an explicit eyeball check once this rolls out to a project whose image count doesn't happen to divide evenly.

## 2026-09-20 — AppOmni/Secureframe separation: adequate; ordering fixed in the correction pass

**Finding:** `brand-systems-and-web-performance.json` already separates its AppOmni and Secureframe content with two in-page `sectionHeading` blocks, and its `outcomes` array already attributes each metric to the correct company. This satisfies the brief's requirement to keep the two clearly labeled within their shared case study.

**Original inconsistency:** the project's `overview` text and `outcomes` order led with AppOmni, while the body's section order was Secureframe-then-AppOmni (matching employment chronology — Secureframe 2022–2024, AppOmni Dec 2024–present). Initially flagged rather than fixed, pending a decision on intended narrative order.

**Resolved 2026-09-20 (correction pass):** Ayodeji's direction is to lead with AppOmni throughout — it's his current work and the strongest immediate hiring signal — followed by Secureframe. The two `sectionHeading` blocks were reordered (AppOmni first, Secureframe second) to match the overview/outcomes text, which already led with AppOmni and was left as-is. No outcome values, labels, or attributions were changed — only the section order.

## Standing decisions carried over from `site/README.md` (context, not new this batch)

- Content system of record is `site/content/settings.json` + `site/content/projects/*.json`, edited through the Decap-based `/admin/` editor or directly in Git. This is intentionally the same schema the future CMS (Phase 5) will read and write — no second source of truth.
- 19 projects were imported from the existing Adobe portfolio; 17 are published, 2 (`linx-security`, `mongodb-beliefs-storyboard`) are held as drafts pending attribution/content confirmation.
- Media was optimized to WebP for stills; animated GIFs were preserved as-is; some embedded video still depends on external hosts (see `content-and-asset-inventory.md`).
