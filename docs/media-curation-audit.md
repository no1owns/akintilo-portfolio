# Media curation audit — Phase 1 (audit only, no changes made)

Scope: `no1owns/akintilo-portfolio` (this repo), `no1owns/web-portfolio` (source for `work.akintilo.com`), `no1owns/ForgeHQ`, and four smaller `no1owns` repos reviewed for relevance. Behance could not be reached (see "What could not be checked" below). Nothing was moved, renamed, copied, deleted, compressed, converted, or changed in site content during this pass — this document, `docs/media-asset-ledger.csv`, `docs/media-migration-plan.md`, `docs/page-by-page-curation-plan.md`, and the `docs/review/` contact sheets are the complete Phase 1 output.

## At a glance

- **468 media files** currently live in `site/public/media` (439 images, 27 videos, ~189 MB).
- **Exactly 2 external media dependencies remain**, both confirmed, both Adobe Behance CCV embeds (Visa, Lyft) — see below.
- **6 unreferenced files**, all intentional (source originals, deliberately-skipped near-duplicates, supporting data exports) — none are accidental orphans.
- **15 perceptual-duplicate groups** found within the existing media library (some already resolved in the prior content-corrections pass).
- **~105 candidate images from `web-portfolio`** are not currently used anywhere in the portfolio; most are legitimately out of scope (near-duplicates, lower-resolution versions, unrelated content misfiled in a company folder), but several are genuine, specific gaps — detailed below.
- **A large structural finding**: ~97 images and videos on the AppOmni and Secureframe collection pages are *also* still referenced from the original, pre-restructure `/brand-systems-and-web-performance` project page. This isn't new — it's the known redundancy already flagged in `docs/security-brand-experiences-followup.md` — but this audit quantifies it precisely for the first time.

## 1. External media dependencies

Searched every file in `site/content/`, `site/src/`, `site/scripts/`, and `site/admin/` for Adobe Portfolio embeds, Behance embeds, Adobe CCV players, external image/video/GIF/iframe/poster URLs, and redirect/proxy URLs.

**Confirmed: exactly two remain, and they are the two the task named.**

| Project | File | Embed URL |
|---|---|---|
| `site/content/projects/visa.json` | blocks[0] (video) | `https://www-ccv.adobe.io/v1/player/ccv/KFgp954czdh/embed?...` |
| `site/content/projects/lyft.json` | blocks[8] (video) | `https://www-ccv.adobe.io/v1/player/ccv/SMIcP4zAIjK/embed?...` |

No other Adobe Portfolio embeds, Behance embeds, external image/video/GIF URLs, iframes, or redirect/proxy links exist anywhere in the codebase or content. (`site/AGENTS.md`, `site/scripts/import-portfolio.py`, and `package-lock.json` mention "Adobe" only in prose/comments or npm package metadata, not as live media references.)

**Could either embed be replaced with a confirmed local source? Not with certainty, for either:**

- **Adobe's CCV player itself is unreachable from this environment** (`www-ccv.adobe.io` is not on the network allow-list), so neither embed's actual footage could be viewed directly to compare frame-by-frame against a candidate file.
- **Lyft**: no local source was found in *any* audited repository. `no1owns/web-portfolio` has no `lyft` folder at all — Lyft's existing site assets were supplied directly by Ayo via chat upload in an earlier pass, not sourced from a repo. There is nothing to recommend here beyond asking Ayo directly for the original export if he wants to replace this embed.
- **Visa**: no exact match either, but a strong circumstantial finding. The Visa project's own overview text says "custom photography featuring the physical expense card" — but none of the 9 images currently in the gallery show a card or Visa branding; they're generic TripActions flight-notification video stills (phone mockups, "Hello Sara/Tina/Sam, time to check in for your flight to LAS VEGAS" screens). Meanwhile, `web-portfolio/images/navan/ads/ad-tripactions-01.png` — not currently used anywhere on the site — shows exactly the described physical-card product photography ("TripActions Liquid," VISA-branded card mockups, "Fly through expenses."). This is very likely the kind of asset the embed shows or relates to, but it cannot be confirmed as the *same footage* without viewing the embed. See contact sheet 1.

**A secondary, related finding**: given the gallery mismatch above, **the Visa project's attribution itself is worth re-confirming with Ayo** — the current 9 images support a "TripActions in-app notifications" story, not a "Visa co-marketing photography" story. This is flagged, not acted on.

## 2. Local source-file matching methodology

Filename matching alone was not used. For every image, dimensions, byte-exact MD5 hash, and a 64-bit perceptual difference-hash (dHash, robust to recompression and minor resizing, not to cropping) were computed and compared across repos. For video, dimensions and duration were compared, and representative frames were extracted via `ffmpeg` and viewed directly wherever a dimension/duration match existed.

Results against `web-portfolio` (229 images with usable dimensions, 203 successfully hashed):

| Match quality (dHash distance, 0–64) | Count | Treatment |
|---|---|---|
| Exact (0) | 65 | Confirmed source |
| Strong (1–5) | 30 | Visually confirmed source |
| Probable (6–10) | 3 | Visually confirmed source |
| Weak (11–15) | 12 | Flagged for manual review, not assumed |
| No match (16+) | ~91 | Candidate new/unused asset, or out of scope |

Videos were matched separately by dimensions + duration (within 1 second): this confirmed `motion-navan-events-hero.mp4`, `motion-lufthansa-hero.mp4`, `motion-tripactions-travel-expense-hero.mp4`, and `motion-tripactions-ad-1/2/3.mp4` are all exact re-encodes of files in `web-portfolio/images/navan/{events,lufthansa,travel-expense-video-spot,ads}/`, and all are already correctly referenced in `tripactions.json`, `lufthansa.json`, `traverse-21.json`, and `reel.json` — none are orphaned.

Every row in `docs/media-asset-ledger.csv` carries its own match confidence; nothing is marked "exact" or "visually confirmed" without either a hash match or a direct side-by-side view.

## 3. The media ledger

See `docs/media-asset-ledger.csv` — 575 rows: 2 external-embed rows, 468 rows for every file currently in `site/public/media`, and 105 candidate rows for `web-portfolio` assets with no confirmed local counterpart. Columns match the spec in the task (filename, source repo/path, portfolio path, company, project, file type, dimensions, duration, size, hash, perceptual-duplicate group, referencing pages, reference count, status, attribution confidence, recommended action, proposed canonical path), plus a `curator_note` column for the specific findings below.

## 4. Organization audit

The intended pattern (`site/public/media/{company}/{project}/{descriptive-filename.ext}`) is followed structurally — every file lives under a company folder, and all but a handful live under a further project subfolder. Specific issues found:

- **Hash filenames are the norm, not the exception.** ~340 of 468 files (73%) carry a 16-character hex filename with no descriptive meaning. This is consistent across almost every company. `docs/media-migration-plan.md` proposes a renaming convention; it is not applied in this pass.
- **Source originals mixed with derivatives in one case, correctly separated.** `secureframe/brand-systems-and-web-performance/source-originals/3564c19109ee9aa0.webp` is the full-height original of a homepage screenshot that's segmented into 8 pieces (`...-seg1` through `-seg8`) for actual rendering. This is the *right* pattern (source kept, clearly labeled, out of the render path) — called out as a model to follow elsewhere, not a problem.
- **Three confirmed duplicate-asset pairs, same visual content under two filenames, both in active use:**
  - `meta-connect-08.webp` / `meta-connect-13.webp` (byte-identical)
  - `loft/a26ee5114fc51d56.webp` / `loft/dd0a597a18f778d5.webp` (byte-identical)
  - `secureframe/c03ba1ee832d46a7.webp` / `secureframe/ae04082dbcfe7f8f.webp` (visually identical, different compression)
- **One asset copied into two galleries instead of referenced once**, found twice:
  - The AppOmni Events cover photo (overgrown-ruins booth installation) also sits, generically alt-tagged ("Security Brand Experiences project work"), inside the 29-image homepage/product-screenshot gallery used by both `/brand-systems-and-web-performance` and `/appomni`.
  - The Black Hat USA 2026 promo graphic, same pattern: correctly used on `/appomni-events`, *and* sitting anonymously inside that same 29-image gallery.
- **12 additional near-duplicate pairs/groups** flagged by perceptual hash but not individually re-confirmed by eye in this pass (listed in the ledger with a note to that effect) — mostly deck title-slide pairs (Linx, Lilt) where visual similarity may be an expected feature of the source material rather than a true duplicate.
- **`_unreferenced/` holds exactly 3 files**, all intentional: a deliberately-unused near-duplicate presentation frame, and two JSON data exports (token/spec files) supporting the Creative Systems Toolkit case study — correctly kept outside the render path, not orphaned.
- **Poster-image handling is inconsistent but not broken.** Some videos have an explicit WebP poster (`motion-tripactions-inside-the-card-poster.webp` and similar); others rely on the browser's default first-frame behavior. No rule currently governs when a poster is required — proposed in the migration plan.
- **No unnecessarily large files were flagged** by the media-ratio/size audit beyond what prior passes already found and confirmed legitimate (the 2 wide UI screenshots in `mongodb-the-next-generation-database.json` at a 3.57 aspect ratio).

## 5. The Security Brand Experiences overlap, quantified

This audit's single largest structural finding. `docs/security-brand-experiences-followup.md` (written during the prior content-corrections pass) flagged that `/brand-systems-and-web-performance` is "partly redundant" with the new `/appomni` and `/secureframe` collection pages, as a qualitative concern. This audit now has the exact count:

| Pages involved | Files shared between them |
|---|---|
| `brand-systems-and-web-performance.json` ↔ `collections/secureframe.json` | 49 |
| `brand-systems-and-web-performance.json` ↔ `collections/appomni.json` | 48 |
| All three (project + both collections' overlap with reel) | 8 |

**~97 distinct images and videos are currently rendered from two different pages each.** This is not a bug introduced by this audit's pass — it's the direct, expected result of the earlier restructure, which built the new collection pages by carrying over the existing AppOmni/Secureframe gallery content rather than moving it. It is the central input to the three open questions already on the table in `docs/security-brand-experiences-followup.md` (convert to an index, remove from Selected Work, or redirect). No new structural decision is made here; this number should inform that decision when Ayo makes it.

## 6. Comparison against `work.akintilo.com` (`web-portfolio`) — strong candidates found

Full company-by-company counts, and the complete candidate list with confidence/action, are in the ledger and `docs/review/contact-sheets.md`. Highlights:

- **Visa card photography** (`ad-tripactions-01.png`) — see §1. The strongest single candidate in this audit.
- **A real Secureframe event photo** (`event-secureframe-01.PNG`, a conference booth with staff in branded shirts) — Secureframe currently has *zero* event/environmental representation anywhere on the site. Direct gap-fill.
- **DocuSign Momentum material from other years** — `event-docusign-00023.jpg` ("Momentum '15, London") and `campaign-docusign-01.png` (a Momentum '14 direct-mail piece). The current `/docusign-momentum` page only shows Momentum '15 San Francisco material. Whether to broaden the page to multiple years/regions is Ayo's call, not assumed here.
- **A misattribution risk caught before it could cause harm**: 7 files (`web-modernassurance-01.png` through `-07.png`) sit inside `web-portfolio/images/secureframe/` but show an unrelated company's generic careers page with no Secureframe branding anywhere. These are excluded from every recommendation in this audit and flagged to Ayo as likely misfiled in the source repo.
- **4 "web-help-*" files** are raw, unstyled component/wireframe exports (visible dev-tool chrome, placeholder "Jorem/Rorem ipsum" text) rather than deployed site content — deprioritized.
- **`ayo/` (4 files) and `awards/` (1 file)** in `web-portfolio` are new to every repo audited — personal/headshot photography and a recognition graphic, relevant to About/Resume rather than any single project page. Not deeply reviewed in this pass; flagged for Ayo's attention.
- **`apollo` (14/14) and `linx` (16/17) are essentially fully migrated already** — almost nothing left to import there.
- **`lilt` and `loft` have zero files in `web-portfolio`** — their current akintilo-portfolio content was supplied directly by Ayo, not sourced from this repo.

## What could not be checked

- **Behance** (`https://www.behance.net/ayodejiakintilo`) could not be reached — this environment's network policy does not resolve `www.behance.net` (confirmed: DNS resolution failure, the same restriction documented in earlier passes for other external hosts). No Behance-sourced findings are in this audit. To have this covered, add `www.behance.net` to the environment's allowed network domains (environment settings → Network access) and ask for this audit to be re-run against it.
- **`no1owns/ForgeHQ`** was cloned and reviewed. It holds Forge HQ's own site assets and Lab-project source (Multistep Form Generator, the Dark Universe game, the still-blocked Creative Brief Generator tool) — all already accounted for in prior passes. It does **not** contain Linx or Apollo GraphQL material (that's in `web-portfolio`, already migrated). No new case-study assets found there.
- **`no1owns/itstrue-web`, `sirenszen-wellness`, `cleanbybelle`, `100MalcolmX`** were cloned and reviewed for relevance. These are Forge HQ client-site builds and a personal project with no corresponding case-study page anywhere in the current portfolio structure — reviewed, no actionable overlap found. `no1owns/stillspringcoaching` is an empty repository.
- **Adobe's CCV player** (`www-ccv.adobe.io`) is unreachable for the same network-policy reason, so neither remaining embed's actual footage could be viewed (see §1).

## Decisions requiring Ayo's approval (nothing below was acted on)

1. **Add `ad-tripactions-01.png` to `/visa`**, and re-evaluate whether the current 9 notification-still images stay, go, or are supplemented.
2. **Re-confirm the Visa project's attribution** — the current gallery doesn't show what the overview text claims.
3. **Add a Secureframe event photo / small events presence**, using `event-secureframe-01.PNG` as a starting point.
4. **Whether to broaden `/docusign-momentum`** to cover the '14 and London-'15 material found, or keep it scoped to the current SF-'15 story.
5. **The Security Brand Experiences structural question** from `docs/security-brand-experiences-followup.md` — now with an exact number (~97 shared assets) to weigh.
6. **Whether to pursue the `ayo/` and `awards/` web-portfolio assets** for About/Resume use.
7. **Whether any of the 12 flagged-but-unconfirmed near-duplicate pairs (Linx, Lilt, MongoDB Web, TripActions UX) are true duplicates** worth resolving, or expected similarity within a deck/shoot.
8. **Whether to grant Behance network access** so this audit can be extended to cover it.

No file was moved, renamed, copied, deleted, compressed, converted, or had its content-JSON reference changed in this pass.
