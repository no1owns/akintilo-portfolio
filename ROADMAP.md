# Roadmap

Living roadmap for replacing Adobe Portfolio with `akintilo-portfolio`. Updated as work lands — see `docs/portfolio-decisions.md` for the reasoning behind specific calls, and `docs/content-and-asset-inventory.md` for the full project-by-project audit this roadmap is drawn from.

**Content accuracy policy:** never invent metrics, outcomes, dates, or attributions to make project pages look structurally consistent. A project without a verified quantified outcome stays qualitative — that's a content gap to flag, not something to paper over. See "no invented metrics" in `docs/portfolio-decisions.md`.

## Launch blockers

Must resolve before Phase 4 (domain migration). Ordered by severity. (Reviewed 2026-09-20 with ChatGPT — several items previously listed here were downgraded; see "Launch risks" and "Launch improvements" below.)

1. **Site settings are placeholder/blank.** `siteUrl`, `email`/`contactUrl`, and `resume` are all empty in `site/content/settings.json`. The prerender script intentionally suppresses indexing while `siteUrl` is blank, and the Contact page shows a "will be added before launch" message — this is working as designed, but it means the site cannot go live as-is.
2. **Mobile layout has not been sitewide-verified in a real browser.** `site/design-qa.md` explicitly lists this as outstanding. Responsive CSS exists (breakpoints at 800px/560px) but hasn't been checked on physical devices. (The justified-grid prototype specifically has now been checked at 390×844 and 768×1024 via headless Chromium — see `docs/launch-checklist.md` — but that's one project, not the site.)
3. **`brand-systems-and-web-performance` ("Security Brand Experiences") has its AppOmni and Secureframe image galleries swapped, and the section order is wrong.** Found 2026-10-09 by viewing every image in both sections individually (alt text is useless here — it's generic "Security Brand Experiences project work" on all of them). Confirmed: all 26 images currently under the "AppOmni" heading carry the Secureframe wordmark/logo (Secureframe AI, Risk Management dashboards, the mobile site, ebook covers); the first 23 images under the "Secureframe" heading carry the AppOmni wordmark/logo ("Introducing AppOmni," "How AppOmni delivers," 3 AppOmni-branded icon illustrations between the Secureframe videos further down). The 39-image tail block at the end of the Secureframe section is correctly placed (spot-checked — explicit Secureframe-logo client testimonials). Videos are unaffected (already correctly named/placed by company). Ayodeji has confirmed directly: Secureframe should be the first section, not AppOmni — reversing the 2026-09-20 AppOmni-first ordering decision below. **Fix identified and approved, not yet executed** — queued next.

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
3. **Subtle scroll-triggered text and parallax animation**, to make the site feel more "playful and advanced." **Unblocked** — doesn't depend on new media, can be prototyped now. Following the same pattern as the justified-grid rollout: build on one representative page first, get Ayodeji's review, then decide on wider rollout. See `docs/portfolio-decisions.md` for the proposed approach once it's drafted.

## Resolved this pass

- ~~AppOmni/Secureframe overview-vs-body ordering inconsistency~~ — fixed 2026-09-20. AppOmni is now presented first in both the section order and the overview/outcomes text (AppOmni is Ayodeji's current work and the stronger immediate hiring signal), followed by Secureframe. All outcome attributions were preserved exactly as before — only order changed, no numbers or copy were altered.
- ~~`work.akintilo.com` video hosting~~ — migrated 2026-10-09. All 19 videos (`brand-systems-and-web-performance` ×9, `event-brand-experiential` ×4, `tripactions` ×4, `docusign-enterprise-campaign` ×1, `lufthansa` ×1) re-encoded from the originals confirmed in `web-portfolio/images/` (H.264, capped at 1920px width, audio stripped since every one of these blocks renders muted/looped — none set `playback: "controls"`), committed to `site/public/media/`, and each project's `file` field repointed from the `work.akintilo.com` URL to the local path. 132 MB of originals → 54 MB encoded. Verified via `ffmpeg -f null` decode pass (no errors, correct durations) and extracted-frame spot checks on 3 files — real-browser `<video>` playback could not be verified in this sandbox (its Chromium build has no H.264 decode support at all, confirmed via `canPlayType`, independent of these files), but H.264/MP4 is universally supported in real browsers and is the same codec the originals already used.

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
- For the 4 Adobe-embedded videos (Visa, Designing for a Developer Platform, Innovation Without Limits, Lyft): are original files available to replace the Adobe embed? Until then, they stay as-is.
- If/when `linx-security` and `mongodb-beliefs-storyboard` should be finished and published: confirm client/scope/attribution.
- Review and approve (or redirect) the justified-grid + accessibility prototype on `mongodb-the-next-generation-database` before it's rolled out to any other project.
- Supply real values for site settings before launch: `siteUrl` (final domain), contact email or URL, résumé PDF.
- New images for Lyft and BetterUp: supply the files, and for Lyft, where they should sit relative to the existing image.
- For the 4 Adobe Behance embeds (Visa, `mongodb-web`, `mongodb-for-giant-ideas-video`, Lyft): original file, existing YouTube/Vimeo link, or keep as Adobe embeds for now?
- Scroll animation prototype: which page should it land on first, and how pronounced should it be? (Proposal pending — see "New work requested" above.)
