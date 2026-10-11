# Roadmap

Living roadmap for replacing Adobe Portfolio with `akintilo-portfolio`. Updated as work lands — see `docs/portfolio-decisions.md` for the reasoning behind specific calls, and `docs/content-and-asset-inventory.md` for the full project-by-project audit this roadmap is drawn from.

**Content accuracy policy:** never invent metrics, outcomes, dates, or attributions to make project pages look structurally consistent. A project without a verified quantified outcome stays qualitative — that's a content gap to flag, not something to paper over. See "no invented metrics" in `docs/portfolio-decisions.md`.

## Launch blockers

Must resolve before Phase 4 (domain migration). Ordered by severity. (Reviewed 2026-09-20 with ChatGPT — several items previously listed here were downgraded; see "Launch risks" and "Launch improvements" below.)

1. **Site settings are placeholder/blank.** `siteUrl` and `resume` are still empty in `site/content/settings.json`. The prerender script intentionally suppresses indexing while `siteUrl` is blank — this is working as designed, but it means the site cannot go live as-is. (The Contact page itself is no longer blocked on this: it now has a working mailto-based form — see "Resolved this pass.")
2. **Mobile layout has not been sitewide-verified in a real browser.** `site/design-qa.md` explicitly lists this as outstanding. Responsive CSS exists (breakpoints at 800px/560px) but hasn't been checked on physical devices. (The justified-grid prototype specifically has now been checked at 390×844 and 768×1024 via headless Chromium — see `docs/launch-checklist.md` — but that's one project, not the site.)

## Launch risks (not blockers — keep working, don't remove without approval)

- **4 videos still depend on Adobe's Behance embed player** (`www-ccv.adobe.io`) with no located local original (Visa, Designing for a Developer Platform, Innovation Without Limits, Lyft). These work today. Treat as a dependency risk to resolve opportunistically, not something to launch-gate on — and do not remove or replace a working embed without Ayodeji's approval, even after a local original is found.

## Deferred content (not blockers — may stay unpublished at launch)

- `linx-security.json` ("Brand Illustration System") and `mongodb-beliefs-storyboard.json` ("Company Values Launch Campaign") both contain literal `[CONFIRM: ...]` placeholder text and are marked `published: false`. Confirmed this pass: nothing in the app links to unpublished projects — `src/App.jsx`'s project list and `scripts/prerender.mjs`'s route list both filter on `p.published`, so these two are not reachable from the live site at all today. **They may remain unpublished indefinitely; finishing them is not required for launch.** Revisit only if/when Ayodeji wants to confirm client/scope/attribution and publish them.

## Launch improvements

Worth doing before or shortly after launch, not blocking.

- **"Event Brand and Experiential" gets labeled internal sections, not a split.** Decision (2026-09-20): keep this as one umbrella project for the initial launch — do not break it into 4 separate portfolio projects. Instead, add section headings (the same pattern already used in the AppOmni/Secureframe project) for: MongoDB events, Navan/TripActions events, DocuSign Momentum, and Apollo Summit. Each section should name the company, the event, Ayodeji's role, and the media available for it. **Write no new factual claims without verification** — if a section can only be labeled and illustrated (not narrated with specifics) until Ayodeji confirms details, that's fine; label it and leave the copy request open rather than inferring content from web-portfolio's page.
- **MongoDB Times Square IPO takeover** is verified in Ayodeji's career data and may be added as content (its own section within the MongoDB umbrella, or a short addition to an existing MongoDB project — Ayodeji's call, see decision item below). Use "Times Square IPO takeover" or equivalent verified language. **Do not use the 34% stock-increase, 30% drop-off-reduction, or 20% cycle-time-reduction figures** found in `web-portfolio` — those were not independently verified this session and must not be ported in without Ayodeji supplying and confirming them.
- Continue justified-grid rollout planning once Ayodeji reviews the prototype (`mongodb-the-next-generation-database`), which now includes the accessibility pass below. Second candidate to convert when approved: `event-brand-experiential`, once its labeled-sections pass above lands (it also has the site's only true mobile-portrait screenshots, a case the current prototype doesn't cover).
- Add a lightbox for gallery images generally, not just the justified-grid prototype — currently only the justified prototype has one. (Adapted from the working, dependency-free implementation in `web-portfolio/case-study-nav.js`; the prototype's version now has full keyboard/dialog accessibility — see `docs/portfolio-decisions.md`.)
- Fix `prefers-reduced-motion` handling for autoplaying looped videos (currently only CSS transitions respect it).

## New work requested (2026-10-09)

Three items Ayodeji asked to queue up next, after confirming the gallery-grid fix and Meta Connect both look correct:

1. **New images for Lyft and BetterUp.** Blocked on Ayodeji — the Lyft gallery currently has 1 image and BetterUp has 18 (both already "Ready" in the inventory doc on content grounds, so this is a refresh/addition he wants, not a gap I found). Need the actual image files and, for Lyft, where they should slot in relative to the existing single image.
2. **Replace Adobe-hosted videos with self-hosted (GitHub) or YouTube/Vimeo-hosted ones.** Two tiers, different blocking status:
   - *19 `work.akintilo.com` videos* — **done, 2026-10-09.** See "Resolved this pass" below.
   - *4 Adobe Behance iframe embeds* (Visa, "Designing for a Developer Platform" / `mongodb-web`, "Innovation Without Limits" / `mongodb-for-giant-ideas-video`, Lyft). **Blocked.** No original video file for any of these four was found in either repo as of this session. Need Ayodeji to supply the original file, an existing YouTube/Vimeo link, or confirm these stay as Adobe embeds for now.
3. **Subtle scroll-triggered text and parallax animation**, to make the site feel more "playful and advanced." **Prototyped, 2026-10-09** — homepage only, minimal intensity (Ayodeji's choices). See `docs/portfolio-decisions.md`. Awaiting his review before deciding on wider rollout.

Also requested the same day, after reviewing the above: a minimal contact form (**done** — mailto-based, see "Resolved this pass" and `docs/portfolio-decisions.md`), and the AppOmni/Secureframe section fix below (**done**).

## New work requested (2026-10-10)

A four-part batch Ayodeji pasted directly, all **done** this pass — see `docs/portfolio-decisions.md` for the full reasoning on each:

1. **Rename "Resume" to "Experience" in the main nav** — done. Route stays `/resume` (no redirect needed; the page's own title/eyebrow already said "Experience").
2. **Curate the homepage "Selected work" grid to 8 named projects** — done, via the existing (previously unused) `featured` field. The rest of the published catalog stays reachable through the new expand control below.
3. **One signature interaction: an expandable work collection** — done. "View all work" / "Show selected work" toggle, `aria-expanded`, focus held on the control, View Transitions API preferred with a dependency-free FLIP fallback, both skipped under `prefers-reduced-motion`.
4. **Add an "Experiments" section** (not "Lab") — done. New `site/content/experiments/*.json` content type, its own CMS collection, placed after Selected Work and before the footer. Published two: Multistep Form Generator and Stephen King's Universe, sourced from `web-portfolio`'s existing "Lab" section (confirmed live, both already had verified copy and a working URL). ~~**Open gap:** neither has a real cover screenshot...~~ **Resolved 2026-10-11** — see below.

Not done, out of scope for this batch per explicit instruction: adding "Experiments" to the main nav, merging to `main`, or touching `akintilo.com` DNS/deployment.

## New work requested (2026-10-10, second batch) — bento grid rewrite

Ayodeji's instruction: stop patching `BentoGallery`'s runtime-measured layout (it kept causing desktop alignment problems) and replace it with a deterministic CSS grid. **Done** — see `docs/portfolio-decisions.md` for the full before/after, including a real 0-height-tile bug (`align-items:start` + flex content-sizing + lazy-loaded images) caught and fixed during validation, not before. Five fixed tile shapes (square/landscape/portrait/feature/wide), old `small`/`medium`/`large`/`wide`/`auto` values still work via an alias map, new per-image `fit`/`position` fields, a lightbox reusing the same accessible component the justified grid already has. No project's `layout` field was changed — see the audit table in `docs/portfolio-decisions.md` and "Items requiring Ayodeji's decision" below for what's recommended next.

## New work requested (2026-10-11) — real Experiment thumbnails

Both Experiment cards were rendering a text-only placeholder since neither live project is reachable from this session. **Done** — Multistep Form Generator's thumbnail comes from running its own (zero-build, zero-dependency) source locally, since `no1owns/ForgeHQ` is an accessible repo and that project's checked-in source is exactly what's deployed. Stephen King's Universe's thumbnail is the dark-universe project's own existing `og-image.png` social-preview art (its live-rendered portal turned out to be a weaker candidate — its game tiles are still emoji placeholders, not real art). Thumbnail aspect ratio changed from 2.4 to 16:9 per instruction; `coverPosition` field added to the experiment schema/CMS for future focal-point control; "Stephen King's Universe" now uses a typographic apostrophe consistently. See `docs/portfolio-decisions.md` for the full account, including why `og-image.png` beat the live-rendered portal.

## Resolved this pass

- ~~AppOmni/Secureframe overview-vs-body ordering inconsistency~~ — fixed 2026-09-20. AppOmni is now presented first in both the section order and the overview/outcomes text (AppOmni is Ayodeji's current work and the stronger immediate hiring signal), followed by Secureframe. All outcome attributions were preserved exactly as before — only order changed, no numbers or copy were altered.
- ~~Contact page has no way to actually send a message~~ — fixed 2026-10-09. Added a name/email/message form that hands off to a `mailto:` link on submit — no backend, no third-party service. See `docs/portfolio-decisions.md` for why (a third-party form service was tried first and reverted) and the silent-delivery trade-off this implies.
- ~~`work.akintilo.com` video hosting~~ — migrated 2026-10-09. All 19 videos (`brand-systems-and-web-performance` ×9, `event-brand-experiential` ×4, `tripactions` ×4, `docusign-enterprise-campaign` ×1, `lufthansa` ×1) re-encoded from the originals confirmed in `web-portfolio/images/` (H.264, capped at 1920px width, audio stripped since every one of these blocks renders muted/looped — none set `playback: "controls"`), committed to `site/public/media/`, and each project's `file` field repointed from the `work.akintilo.com` URL to the local path. 132 MB of originals → 54 MB encoded. Verified via `ffmpeg -f null` decode pass (no errors, correct durations) and extracted-frame spot checks on 3 files — real-browser `<video>` playback could not be verified in this sandbox (its Chromium build has no H.264 decode support at all, confirmed via `canPlayType`, independent of these files), but H.264/MP4 is universally supported in real browsers and is the same codec the originals already used.
- ~~`brand-systems-and-web-performance` AppOmni/Secureframe image swap and section order~~ — fixed across three passes, 2026-10-09 to 2026-10-10, each driven by Ayodeji catching that the previous pass was incomplete (see `docs/portfolio-decisions.md` for all three entries). Pass 1 fixed the two main galleries being reversed. Pass 2 found 24 more AppOmni images still sitting under "Secureframe" in a tail block that had only been spot-checked, not fully verified. Pass 3 found one of the two remaining unbranded GIFs — classified by its first frame only — was actually Secureframe-branded ("Introducing Comply AI") once multiple frames were pulled with `ffmpeg`. Final state: Secureframe 42 images, AppOmni 46 — every one of the 88 images, including every frame of every animated GIF, has now been individually viewed and classified, not sampled. `company`, `role`, and the overview paragraph were reordered (Secureframe-first) to stay internally consistent, mirroring the 2026-09-20 AppOmni-first fix this reverses. Every image src and video file was checked programmatically before and after all three passes (exact-set match, nothing lost or duplicated).
- **Found and fixed a real bug while verifying the above**, unrelated to the content itself: `BentoGallery`'s row-height calculation (`src/App.jsx`) had a race condition. It used a `ResizeObserver` on every image to know when to recompute each figure's grid row span — but setting that figure's column span (to size it by aspect ratio) itself changes the image's rendered width, which re-triggers that same observer, which cancels the pending row-span calculation and starts over. With enough images in one gallery, this could get stuck indefinitely at `grid-row-end: auto`, collapsing those figures to an 8px sliver (`grid-auto-rows: 8px`) with their content clipped — intermittently, depending on image-load timing, so it wouldn't show up the same way twice. Confirmed non-deterministic before the fix (total page height on this project ranged from ~8,400px to ~32,000px across otherwise-identical repeated loads) and now deterministic after it (exact same height, 5/5 runs, on this page and spot-checked on `event-brand-experiential` and `tripactions` too). Fix: re-measure on each image's own `load`/`error` event (fires once, regardless of layout-driven resizes) instead of a `ResizeObserver` on the image. This is a pre-existing bug in a component used by most projects on the site, not something introduced this pass — it just took a page with this many images in one gallery to reliably surface it.

## Post-launch improvements

- Add `schema.org` structured data to project pages (web-portfolio's case-study pages have this; akintilo-portfolio currently doesn't).
- Lighthouse/performance pass once real hosting and `siteUrl` are in place.
- Revisit whether any of the 9 "uniform-recommended" small/single-image galleries in the inventory doc would read better as `full-width` instead.

## CMS work (Phase 5 — do not let this delay the Adobe replacement)

- The Decap-based `/admin/` editor already exists and reads/writes the same `site/content/*.json` schema that will remain the system of record — no separate CMS data model is planned.
- Online (non-local) publishing needs a Decap-compatible GitHub OAuth service (`VITE_CMS_AUTH_URL`) that isn't configured yet. This is explicitly out of scope until after the public replacement is stable.

## Items requiring Ayodeji's decision

- Where should the MongoDB Times Square IPO takeover content live — its own new section/project, or folded into an existing MongoDB project? What's the actual verified language beyond "Times Square IPO takeover" (dates, specifics) that's safe to publish?
- For the "Event Brand and Experiential" labeled sections: what are the real specifics (company, event, role, contribution) for each of the 4 sections beyond what's inferable from media alone?
- If/when `linx-security` and `mongodb-beliefs-storyboard` should be finished and published: confirm client/scope/attribution.
- Review and approve (or redirect) the justified-grid + accessibility prototype on `mongodb-the-next-generation-database` before it's rolled out to any other project.
- Supply real values for site settings before launch: `siteUrl` (final domain), résumé PDF.
- New images for Lyft and BetterUp: supply the files, and for Lyft, where they should sit relative to the existing image.
- For the 4 Adobe Behance embeds (Visa, `mongodb-web`, `mongodb-for-giant-ideas-video`, Lyft): original file, existing YouTube/Vimeo link, or keep as Adobe embeds for now?
- If true silent server-side delivery is wanted for the contact form (vs. the current mailto hand-off, which needs the visitor's own email client): accept a third-party form-backend dependency (Formspree, FormSubmit, etc.) for it?
- Whether to add `sourceUrl` links for the two Experiments now that `no1owns/ForgeHQ` is a known, accessible source repo (`projects/multistep-form-generator/`, `projects/games/dark-universe/`) — not added this pass since it wasn't explicitly requested.
- Whether to add more Experiment records from `web-portfolio`'s "Lab" section (Scene Generator, Brand Content Flywheel, Event Deck Generator, EPS-Agent, and the "coming soon" cards) — all are in-development/coming-soon, not live, so they weren't published this pass. Confirm which should become `published: false` drafts now vs. wait.
- When to add "Experiments" to the main nav (currently reachable only via the homepage section itself, per this batch's explicit instruction not to add it yet).
- Approve (or redirect) converting 8 bento projects to `layout: "uniform"` — Visa, Enterprise Integration Campaigns, Lufthansa, Designing for a Developer Platform, Loft, LILT eBook, MongoDB Internal, BetterUp. Each is a one-line JSON change, unambiguous recommendation, zero open content question — see the audit table in `docs/portfolio-decisions.md`. 2 more (Dream Big; Frictionless Product Onboarding) need Ayodeji's pick between two options rather than a default. The rest stay bento for now (either blocked on other content work, or too large/recently-corrected to bundle a layout change into this pass) — same table has the full reasoning per project.
