# Content and asset inventory

Audit date: 2026-09-20
Audited by: Claude Code, working from `no1owns/akintilo-portfolio` (branch `claude/akintilo-portfolio-audit-j7gue1`) and `no1owns/web-portfolio` (same branch name, separate repo).

## How this audit was done, and its limits

This session's network egress is restricted to GitHub, npm/PyPI-class registries, and a few other allow-listed hosts. Direct requests to `www.akintilo.com` and `preview.akintilo.com` were blocked by the environment's proxy (`EGRESS_BLOCKED`), so **the live Adobe Portfolio site and the live preview were not fetched or re-verified in this session.** Where the task asked for a live side-by-side comparison, this document instead relies on:

- `site/README.md` and `site/design-qa.md` in `akintilo-portfolio`, which record an earlier, in-browser comparison against a "user-selected Option 1 screenshot" of the Adobe site (dated September 13, 2026) and confirm the migration already captured the Adobe project list (19 projects imported, 17 published).
- The structured content in `site/content/projects/*.json` and `site/content/settings.json`, which is the current system of record for the target repo.
- `web-portfolio`'s `llms.txt`, `portfolio.html`, and its per-case-study HTML pages, which describe an independently-redesigned personal site built from the same underlying career history, plus a large library of original media in `web-portfolio/images/`.

**Recommendation:** before Phase 3 QA, someone with browser access to `https://www.akintilo.com` and `https://preview.akintilo.com` (Ayodeji or ChatGPT) should do one direct side-by-side pass to confirm nothing has changed on the Adobe site since the September 13 reference screenshot, and to sanity-check the preview against this document's findings.

## Comparison matrix

Legend — **Media**: Local = served from `site/public/media/*.webp` (already in the target repo); External = fetched from another host at runtime.

**Note on outcomes (updated 2026-09-20):** only 1 of 19 projects (row 1, AppOmni/Secureframe) has quantified outcomes populated. This is a content gap to close opportunistically, **not a launch blocker**, and it is not being closed by inventing numbers — a project without a verified metric stays qualitative. In particular, the Navan/TripActions projects (rows 2, 10, 11) must remain qualitative unless Ayodeji provides verified quantitative evidence; none is assumed or estimated here.

| # | Project (target title) | Adobe URL | Target URL (preview.akintilo.com) | In akintilo-portfolio | In web-portfolio | Content completeness | Media completeness | External/Adobe dependencies | Current layout | Recommended layout | Launch status | Recommended action | Open question for Ayodeji |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Security Brand Experiences (AppOmni / Secureframe) | not verified this session | `/brand-systems-and-web-performance` | Yes (order 0, featured) | Split across `brand-systems/appomni.html` + `brand-systems/secureframe.html` | Good — overview, role, and 3 quantified outcomes present; AppOmni and Secureframe are already separated by in-page `sectionHeading` blocks. **Fixed 2026-09-20:** AppOmni now presented first (current work, strongest immediate hiring signal), Secureframe second — order was inconsistent before, all outcome attributions unchanged | Mostly local (64 images); 9 videos still point at `work.akintilo.com/images/{appomni,secureframe}/*.mp4` | 9 external `.mp4` — see External Media table | bento (dense JS grid) | **justified (prototype target)** | Near-ready | Copy the 9 videos into `site/public/media/` (see hosting-decision options below) | — |
| 2 | Performance Marketing Systems | not verified | `/tripactions` | Yes | Rolled into `event-brand/navan.html` | Good | Local images; 4 videos external (`work.akintilo.com/images/navan/...`) | 4 external `.mp4` | bento | justified (later batch) | Near-ready | Copy 4 videos locally | — |
| 3 | Event Brand and Experiential | not verified | `/event-brand-experiential` | Yes | Corresponds to `event-brand/mongodb-world.html`, `navan.html`, `docusign-momentum.html`, `apollo-summit.html` (4 separate pages) | **Decision (2026-09-20): stays one umbrella project, not split.** Currently a single generic overview paragraph, 0 outcomes, no per-event section headings even though it spans 3 companies and (per web-portfolio) at least 4 distinct events. Plan: add 4 labeled internal sections — MongoDB events, Navan/TripActions events, DocuSign Momentum, Apollo Summit — each naming company, event, Ayodeji's role, and available media, mirroring the AppOmni/Secureframe pattern. No new factual claims until Ayodeji confirms specifics; sections may launch labeled-but-thin rather than invented | Local (42 images); 4 videos external (navan hero + 3 mongodb events) | 4 external `.mp4` | bento | justified (after the labeled-sections pass) | Launch improvement, not a blocker | Add the 4 labeled sections (content pending Ayodeji's input); copy 4 videos locally (see hosting-decision options below) | What are the real specifics (company, event, role, contribution) for each of the 4 sections? |
| 4 | Enterprise Brand Campaigns | not verified | `/docusign-enterprise-campaign` | Yes | `campaign-partner/docusign-campaigns.html` | Good | Local; 1 video external | 1 external `.mp4` | bento | justified (later) | Near-ready | Copy 1 video locally | — |
| 5 | Global Rebrand Launch Experience (Dream Big) | not verified | `/dream-big` | Yes | `brand-character/mongodb-dream-big.html` (per llms.txt) | Good | Fully local | None found | bento | uniform or justified | Ready | none | — |
| 6 | Modern UX for a Leading Developer Platform | not verified | `/mongodb-the-next-generation-database` | Yes | Overlaps `event-brand/mongodb-world.html`'s "web redesign" thread | Good — widest single-project image-ratio spread on the site | Fully local (18 images) | None found | bento | **justified (prototype implemented this batch)** | Ready | See prototype section below | — |
| 7 | Brand Illustration System (Linx Security) | not verified | `/linx-security` | Yes, **draft/unpublished** | `linx-security/linx.html` | Company/scope and summary are literal `[CONFIRM: ...]` placeholders | Unknown, not reviewed this pass | Unknown | bento | TBD | **Deferred, not a blocker** — `published: false` and not linked from anywhere in the app (confirmed by reading the `published` filters in `src/App.jsx` and `scripts/prerender.mjs`); may stay unpublished at launch | No action required for launch; finish only if/when Ayodeji wants it published | If Ayodeji wants this published eventually: confirm client name, scope, and attribution |
| 8 | Global Partnership Campaigns (Visa) | not verified | `/visa` | Yes | Not present as its own page | Good | Local images; hero video via Adobe Behance embed (`www-ccv.adobe.io`) | **1 Adobe-hosted embed** | bento | uniform | Near-ready | Decide whether to keep the Adobe embed or source/re-host the original file | Is the original video file available, or should the Adobe embed stay (accepting the Adobe dependency it's meant to remove)? |
| 9 | Enterprise Integration Campaigns | not verified | `/microsoft-docusign` | Yes | Not present as its own page | Good | Fully local | None found | bento | uniform | Ready | none | — |
| 10 | Airline Partnership Experience Design (Lufthansa) | not verified | `/lufthansa` | Yes | Sub-thread of `event-brand/navan.html` | Good | Local; 1 video external | 1 external `.mp4` | bento | uniform | Near-ready | Copy 1 video locally | — |
| 11 | Frictionless Product Onboarding | not verified | `/tripactions-visual-product-ux` | Yes | Not present as its own page | Good | Fully local | None found | bento | uniform or split | Ready | none | — |
| 12 | Designing for a Developer Platform | not verified | `/mongodb-web` | Yes | Overlaps `mongodb-world.html` | Good | Local; hero video via Adobe Behance embed | **1 Adobe-hosted embed** | bento | uniform | Near-ready | Same embed decision as row 8 | Same as row 8 |
| 13 | Innovation Without Limits | not verified | `/mongodb-for-giant-ideas-video` | Yes | Not present as its own page | Good | Local; hero video via Adobe Behance embed | **1 Adobe-hosted embed** | bento | full-width (video-led) | Near-ready | Same embed decision as row 8 | Same as row 8 |
| 14 | Technical Concept Visualization (Loft) | not verified | `/loft` | Yes | Not present | Good, small gallery (4 images, all portrait) | Fully local | None found | bento | uniform | Ready | none | — |
| 15 | Translation Transformation eBook (LILT) | not verified | `/lilt-ebook` | Yes | Not present | Good | Fully local | None found | bento | uniform | Ready | none | — |
| 16 | Culture and Internal Brand Storytelling | not verified | `/mongodb-internal` | Yes | Sub-thread of `mongodb-world.html`/beliefs content | Good, small (3 images) | Fully local | None found | bento | uniform | Ready | none | — |
| 17 | Company Values Launch Campaign (Beliefs) | not verified | `/mongodb-beliefs-storyboard` | Yes, **draft/unpublished** | `brand-character/mongodb-values.html` | Summary is a literal `[CONFIRM: ...]` placeholder | Unknown, not reviewed this pass | Unknown | bento | TBD | **Deferred, not a blocker** — `published: false` and not linked from anywhere in the app; may stay unpublished at launch | No action required for launch; finish only if/when Ayodeji wants it published | If Ayodeji wants this published eventually: confirm attribution and scope |
| 18 | Executive Presentation Systems (BetterUp) | not verified | `/betterup-product-presentations` | Yes | `presentation-design/betterup.html` | Good | Fully local (18 images, uniform 16:9-ish ratios) | None found | bento | uniform | Ready | none | — |
| 19 | Launch Marketing for Lyft Business | not verified | `/lyft` | Yes | Not present | Good, small (1 image) | Local; hero video via Adobe Behance embed | **1 Adobe-hosted embed** | bento | full-width | Near-ready | Same embed decision as row 8 | Same as row 8 |

### Present in web-portfolio only (not yet in akintilo-portfolio, or only partially represented)

| Item | Where it lives in web-portfolio | Status in akintilo-portfolio | Notes / caution |
|---|---|---|---|
| **MongoDB Times Square IPO takeover** (2017) | `event-brand/mongodb-world.html`, described as part of "MongoDB — Events, IPO & Brand"; also called out on `portfolio.html` ("the company's NASDAQ IPO launch... stock opened 34% above IPO price") and in the résumé timeline ("Reduced site drop-off 30%... decreased project cycle time 20%") | **No project or mention found anywhere in `site/content/projects/*.json`** (checked for "IPO", "NASDAQ", "Times Square" — zero matches) | **Update (2026-09-20): the Times Square IPO takeover itself is verified in Ayodeji's career data and may be added as content.** Use "Times Square IPO takeover" or equivalent verified language. **The 34% stock-increase, 30% drop-off-reduction, and 20% cycle-time-reduction figures remain unverified and must not be used** — they were not confirmed against a primary source this session. See `ROADMAP.md` for the open question on where this content should live. |
| **Apollo Summit** (event brand) | Own page: `event-brand/apollo-summit.html`; own image folder `web-portfolio/images/apollo/` (13 images) | Not named anywhere in akintilo-portfolio; likely folded anonymously into the generic "Event Brand and Experiential" project (row 3 above) | Same caution: confirm before treating web-portfolio's page copy as fact. |
| **DocuSign Momentum** (event brand) | Own page: `event-brand/docusign-momentum.html` | Same as Apollo Summit — likely folded into row 3, not separately named | Same caution. |
| **MongoDB World** (developer conference) | Own page: `event-brand/mongodb-world.html`, own video assets `web-portfolio/images/mongodb/events/*.mp4` | Same as above | Same caution. |

None of these four have been added to the target repo in this batch. The Times Square IPO takeover is verified and may be added once Ayodeji decides where it should live (see `ROADMAP.md`); Apollo Summit, DocuSign Momentum, and MongoDB World are addressed via the "Event Brand and Experiential" labeled-sections plan (row 3 above) rather than as new standalone projects, and still need Ayodeji to confirm the actual specifics before any new copy is written.

## External media dependencies

### Adobe-hosted (Behance/Adobe Portfolio video embeds — `www-ccv.adobe.io`)

These are the site's actual remaining **Adobe** dependencies (as distinct from `work.akintilo.com`, which is Ayodeji's own earlier site, not Adobe). **Status (2026-09-20): treated as a launch risk, not a launch blocker.** They work today; keep them until a replacement is confirmed, and do not remove or swap a working embed without Ayodeji's explicit approval even after a local original is found.

| Project | Field | URL |
|---|---|---|
| Global Partnership Campaigns (Visa) | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/KFgp954czdh/embed...` |
| Designing for a Developer Platform | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/GjsQMLn3E7-/embed...` |
| Innovation Without Limits | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/4psJ9Iy7jBf/embed...` |
| Launch Marketing for Lyft Business | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/SMIcP4zAIjK/embed...` |

No original source file for these four was located in either repository this session. **Do not delete these embeds** until a local replacement is confirmed available and approved (per the media requirements — don't remove unmatched Adobe media until a replacement is approved). If Ayodeji has the original video files, they can be added to `site/public/media/` and these embeds swapped for local `<video>` blocks — as a proposal for approval, not automatically.

### `work.akintilo.com`-hosted (Ayodeji's earlier site — not Adobe, but still an external, single-point-of-failure dependency)

19 video files across 7 projects are referenced by absolute URL to `work.akintilo.com` instead of being copied into `site/public/media/`. **All 19 were confirmed present as original files in `web-portfolio/images/`** in this session (sizes 0.6 MB–22 MB, ~130 MB total):

- `brand-systems-and-web-performance.json` — 5 Secureframe + 4 AppOmni videos (`web-portfolio/images/secureframe/*.mp4`, `web-portfolio/images/appomni/*.mp4`)
- `docusign-enterprise-campaign.json` — 1 video (`web-portfolio/images/docusign/ads/motion-docusign.mp4`)
- `event-brand-experiential.json` — 4 videos (`web-portfolio/images/navan/events/event-tripactions-hero.mp4`, `web-portfolio/images/mongodb/events/motion-mongodb-0{1,2,3}.mp4`)
- `lufthansa.json` — 1 video (`web-portfolio/images/navan/lufthansa/motion-tripactions-hero.mp4`)
- `tripactions.json` — 4 videos (`web-portfolio/images/navan/travel-expense-video-spot/motion-tripactions-hero.mp4`, `web-portfolio/images/navan/ads/motion-tripactions-{1,2,3}.mp4`)

**This is a hosting and resilience decision, not a default "copy everything in."** No video has been added to the repository this pass. Three options, to be decided by Ayodeji:

1. **Keep the current external URLs.** Zero repo cost, zero migration work. Risk: the site depends on `work.akintilo.com` staying online indefinitely, including through any future Adobe/domain transition.
2. **Re-compress and commit selected videos.** Pick the highest-value ones (e.g., the AppOmni/Secureframe motion pieces on the featured project) and run them through a video-equivalent of the existing `scripts/optimize-media.mjs` still-image pipeline before committing, rather than committing the originals as-is (0.6 MB–22 MB each, ~130 MB total uncompressed). Keeps the repo small while removing the dependency for the projects that matter most.
3. **Move video to external asset hosting** (e.g., Cloudflare Stream, Mux, S3 + CDN, or GitHub Releases as a static asset bucket) and update the JSON `file` fields to point there instead of `work.akintilo.com` or the git repo. Removes the git-repo-size problem entirely and can offer better delivery (adaptive bitrate, thumbnails) than a flat file, at the cost of a new external dependency and possibly a hosting bill.

Flagged in `ROADMAP.md` under "Launch improvements," with the decision itself listed under "Items requiring Ayodeji's decision."

## Gallery layout audit

Every one of the 19 projects' `gallery` blocks currently uses the default `layout: "bento"` (no project sets an explicit `layout` field). `src/App.jsx`'s `BentoGallery` component computes column spans from each image's aspect ratio (or an editor-set `small/medium/large/wide` size) and packs rows densely — this is a real, working masonry, not a placeholder. The CSS also defines `.gallery.layout-uniform` selectors for narrow breakpoints, but no component currently sets `layout: "uniform"`, so that mode is effectively unused today. There is no `justified`, `full-width`, or `split`-specific gallery mode yet, and **no lightbox** — clicking a gallery image does nothing.

This confirms the task's premise: the site needs a justified-grid mode added, plus a lightbox, before the gallery redesign can roll out broadly.
