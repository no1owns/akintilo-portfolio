# Portfolio decisions log

Running log of durable creative/technical decisions for the akintilo-portfolio launch. Newest first. Each entry: what was decided, why, who decided it.

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
