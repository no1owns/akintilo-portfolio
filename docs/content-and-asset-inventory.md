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

| # | Project (target title) | Adobe URL | Target URL (preview.akintilo.com) | In akintilo-portfolio | In web-portfolio | Content completeness | Media completeness | External/Adobe dependencies | Current layout | Recommended layout | Launch status | Recommended action | Open question for Ayodeji |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Security Brand Experiences (AppOmni / Secureframe) | not verified this session | `/brand-systems-and-web-performance` | Yes (order 0, featured) | Split across `brand-systems/appomni.html` + `brand-systems/secureframe.html` | Good — overview, role, and 3 quantified outcomes present; AppOmni and Secureframe are already separated by in-page `sectionHeading` blocks | Mostly local (64 images); 9 videos still point at `work.akintilo.com/images/{appomni,secureframe}/*.mp4` | 9 external `.mp4` — see External Media table | bento (dense JS grid) | **justified (prototype target)** | Near-ready | Copy the 9 videos into `site/public/media/`; verify Secureframe-before-AppOmni body order against the AppOmni-first overview/outcomes text | Confirm intended narrative order (chronological Secureframe→AppOmni vs. overview's AppOmni-first phrasing) |
| 2 | Performance Marketing Systems | not verified | `/tripactions` | Yes | Rolled into `event-brand/navan.html` | Good | Local images; 4 videos external (`work.akintilo.com/images/navan/...`) | 4 external `.mp4` | bento | justified (later batch) | Near-ready | Copy 4 videos locally | — |
| 3 | Event Brand and Experiential | not verified | `/event-brand-experiential` | Yes | Corresponds to `event-brand/mongodb-world.html`, `navan.html`, `docusign-momentum.html`, `apollo-summit.html` (4 separate pages) | **Weak** — single generic overview paragraph, 0 outcomes, no per-event section headings even though it spans 3 companies and (per web-portfolio) at least 4 distinct events | Local (42 images); 4 videos external (navan hero + 3 mongodb events) | 4 external `.mp4` | bento | justified or split (needs content pass first) | **Blocker** | Add section headings per company/event (mirroring the AppOmni/Secureframe pattern already used elsewhere); copy 4 videos locally | web-portfolio names this as 4 distinct case studies (MongoDB World, Navan, DocuSign Momentum, Apollo Summit) with individual outcomes — should the target site split these into separate projects, or keep one combined project with labeled sections? |
| 4 | Enterprise Brand Campaigns | not verified | `/docusign-enterprise-campaign` | Yes | `campaign-partner/docusign-campaigns.html` | Good | Local; 1 video external | 1 external `.mp4` | bento | justified (later) | Near-ready | Copy 1 video locally | — |
| 5 | Global Rebrand Launch Experience (Dream Big) | not verified | `/dream-big` | Yes | `brand-character/mongodb-dream-big.html` (per llms.txt) | Good | Fully local | None found | bento | uniform or justified | Ready | none | — |
| 6 | Modern UX for a Leading Developer Platform | not verified | `/mongodb-the-next-generation-database` | Yes | Overlaps `event-brand/mongodb-world.html`'s "web redesign" thread | Good — widest single-project image-ratio spread on the site | Fully local (18 images) | None found | bento | **justified (prototype implemented this batch)** | Ready | See prototype section below | — |
| 7 | Brand Illustration System (Linx Security) | not verified | `/linx-security` | Yes, **draft/unpublished** | `linx-security/linx.html` | **Blocker** — company/scope and summary are literal `[CONFIRM: ...]` placeholders | Unknown, not reviewed this pass | Unknown | bento | TBD | Not launch-ready | Do not publish until content is confirmed | Confirm client name, scope, and attribution before this can go live |
| 8 | Global Partnership Campaigns (Visa) | not verified | `/visa` | Yes | Not present as its own page | Good | Local images; hero video via Adobe Behance embed (`www-ccv.adobe.io`) | **1 Adobe-hosted embed** | bento | uniform | Near-ready | Decide whether to keep the Adobe embed or source/re-host the original file | Is the original video file available, or should the Adobe embed stay (accepting the Adobe dependency it's meant to remove)? |
| 9 | Enterprise Integration Campaigns | not verified | `/microsoft-docusign` | Yes | Not present as its own page | Good | Fully local | None found | bento | uniform | Ready | none | — |
| 10 | Airline Partnership Experience Design (Lufthansa) | not verified | `/lufthansa` | Yes | Sub-thread of `event-brand/navan.html` | Good | Local; 1 video external | 1 external `.mp4` | bento | uniform | Near-ready | Copy 1 video locally | — |
| 11 | Frictionless Product Onboarding | not verified | `/tripactions-visual-product-ux` | Yes | Not present as its own page | Good | Fully local | None found | bento | uniform or split | Ready | none | — |
| 12 | Designing for a Developer Platform | not verified | `/mongodb-web` | Yes | Overlaps `mongodb-world.html` | Good | Local; hero video via Adobe Behance embed | **1 Adobe-hosted embed** | bento | uniform | Near-ready | Same embed decision as row 8 | Same as row 8 |
| 13 | Innovation Without Limits | not verified | `/mongodb-for-giant-ideas-video` | Yes | Not present as its own page | Good | Local; hero video via Adobe Behance embed | **1 Adobe-hosted embed** | bento | full-width (video-led) | Near-ready | Same embed decision as row 8 | Same as row 8 |
| 14 | Technical Concept Visualization (Loft) | not verified | `/loft` | Yes | Not present | Good, small gallery (4 images, all portrait) | Fully local | None found | bento | uniform | Ready | none | — |
| 15 | Translation Transformation eBook (LILT) | not verified | `/lilt-ebook` | Yes | Not present | Good | Fully local | None found | bento | uniform | Ready | none | — |
| 16 | Culture and Internal Brand Storytelling | not verified | `/mongodb-internal` | Yes | Sub-thread of `mongodb-world.html`/beliefs content | Good, small (3 images) | Fully local | None found | bento | uniform | Ready | none | — |
| 17 | Company Values Launch Campaign (Beliefs) | not verified | `/mongodb-beliefs-storyboard` | Yes, **draft/unpublished** | `brand-character/mongodb-values.html` | **Blocker** — summary is a literal `[CONFIRM: ...]` placeholder | Unknown, not reviewed this pass | Unknown | bento | TBD | Not launch-ready | Do not publish until content is confirmed | Confirm attribution and scope |
| 18 | Executive Presentation Systems (BetterUp) | not verified | `/betterup-product-presentations` | Yes | `presentation-design/betterup.html` | Good | Fully local (18 images, uniform 16:9-ish ratios) | None found | bento | uniform | Ready | none | — |
| 19 | Launch Marketing for Lyft Business | not verified | `/lyft` | Yes | Not present | Good, small (1 image) | Local; hero video via Adobe Behance embed | **1 Adobe-hosted embed** | bento | full-width | Near-ready | Same embed decision as row 8 | Same as row 8 |

### Present in web-portfolio only (not yet in akintilo-portfolio, or only partially represented)

| Item | Where it lives in web-portfolio | Status in akintilo-portfolio | Notes / caution |
|---|---|---|---|
| **MongoDB IPO Launch** (NASDAQ, 2017) | `event-brand/mongodb-world.html`, described as part of "MongoDB — Events, IPO & Brand"; also called out on `portfolio.html` ("the company's NASDAQ IPO launch... stock opened 34% above IPO price") and in the résumé timeline ("Reduced site drop-off 30%... decreased project cycle time 20%") | **No project or mention found anywhere in `site/content/projects/*.json`** (checked for "IPO", "NASDAQ", "Times Square" — zero matches) | This reads as one of the strongest, most quantifiable stories in the whole career history and is currently absent from the target site. **Do not port the numbers above without Ayodeji confirming them** — they were not independently verified against a primary source this session, and the instructions are explicit about not inventing metrics. Flagging as a content gap, not proposing copy. |
| **Apollo Summit** (event brand) | Own page: `event-brand/apollo-summit.html`; own image folder `web-portfolio/images/apollo/` (13 images) | Not named anywhere in akintilo-portfolio; likely folded anonymously into the generic "Event Brand and Experiential" project (row 3 above) | Same caution: confirm before treating web-portfolio's page copy as fact. |
| **DocuSign Momentum** (event brand) | Own page: `event-brand/docusign-momentum.html` | Same as Apollo Summit — likely folded into row 3, not separately named | Same caution. |
| **MongoDB World** (developer conference) | Own page: `event-brand/mongodb-world.html`, own video assets `web-portfolio/images/mongodb/events/*.mp4` | Same as above | Same caution. |

None of these four are being added to the target repo in this batch — the task instructions require flagging content gaps rather than inventing or porting unverified copy. This is a decision item for Ayodeji (see "Items requiring Ayodeji's decision" in `ROADMAP.md`).

## External media dependencies

### Adobe-hosted (Behance/Adobe Portfolio video embeds — `www-ccv.adobe.io`)

These are the site's actual remaining **Adobe** dependencies (as distinct from `work.akintilo.com`, which is Ayodeji's own earlier site, not Adobe):

| Project | Field | URL |
|---|---|---|
| Global Partnership Campaigns (Visa) | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/KFgp954czdh/embed...` |
| Designing for a Developer Platform | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/GjsQMLn3E7-/embed...` |
| Innovation Without Limits | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/4psJ9Iy7jBf/embed...` |
| Launch Marketing for Lyft Business | `blocks[].url` | `https://www-ccv.adobe.io/v1/player/ccv/SMIcP4zAIjK/embed...` |

No original source file for these four was located in either repository this session. **Do not delete these embeds** until a local replacement is confirmed available (per the media requirements — don't remove unmatched Adobe media until a replacement is approved). If Ayodeji has the original video files, they can be added to `site/public/media/` and these embeds swapped for local `<video>` blocks the same way the other 19 videos below should be.

### `work.akintilo.com`-hosted (Ayodeji's earlier site — not Adobe, but still an external, single-point-of-failure dependency)

19 video files across 7 projects are referenced by absolute URL to `work.akintilo.com` instead of being copied into `site/public/media/`. **All 19 were confirmed present as original files in `web-portfolio/images/`** in this session (sizes 0.6 MB–22 MB, ~130 MB total):

- `brand-systems-and-web-performance.json` — 5 Secureframe + 4 AppOmni videos (`web-portfolio/images/secureframe/*.mp4`, `web-portfolio/images/appomni/*.mp4`)
- `docusign-enterprise-campaign.json` — 1 video (`web-portfolio/images/docusign/ads/motion-docusign.mp4`)
- `event-brand-experiential.json` — 4 videos (`web-portfolio/images/navan/events/event-tripactions-hero.mp4`, `web-portfolio/images/mongodb/events/motion-mongodb-0{1,2,3}.mp4`)
- `lufthansa.json` — 1 video (`web-portfolio/images/navan/lufthansa/motion-tripactions-hero.mp4`)
- `tripactions.json` — 4 videos (`web-portfolio/images/navan/travel-expense-video-spot/motion-tripactions-hero.mp4`, `web-portfolio/images/navan/ads/motion-tripactions-{1,2,3}.mp4`)

**Recommendation:** copy these into `site/public/media/` and repoint the JSON `file` fields, the same way the still images were already migrated. Total add is ~130 MB, which is meaningful for a git repo — worth deciding whether to commit the originals directly, re-compress them first (the existing `scripts/optimize-media.mjs` pipeline only handles stills), or use Git LFS. Flagged in `ROADMAP.md` as a launch improvement, not a blocker, since the videos currently work (they just depend on `work.akintilo.com` staying up).

## Gallery layout audit

Every one of the 19 projects' `gallery` blocks currently uses the default `layout: "bento"` (no project sets an explicit `layout` field). `src/App.jsx`'s `BentoGallery` component computes column spans from each image's aspect ratio (or an editor-set `small/medium/large/wide` size) and packs rows densely — this is a real, working masonry, not a placeholder. The CSS also defines `.gallery.layout-uniform` selectors for narrow breakpoints, but no component currently sets `layout: "uniform"`, so that mode is effectively unused today. There is no `justified`, `full-width`, or `split`-specific gallery mode yet, and **no lightbox** — clicking a gallery image does nothing.

This confirms the task's premise: the site needs a justified-grid mode added, plus a lightbox, before the gallery redesign can roll out broadly.
