# External asset gap audit

Phase 1 deliverable. Compares `no1owns/akintilo-portfolio` against `no1owns/web-portfolio` (cloned read-only this session, `images/` directory, 242 files) and the four public reference sites named in the task.

## Access limitations (same restriction as the 2026-09-20 audit)

This session's network egress does **not** resolve `work.akintilo.com`, `akintilo.com`, `preview.akintilo.com`, or `www.behance.net` — all four failed DNS resolution (`ENOTFOUND`), identically to the restriction documented in `docs/content-and-asset-inventory.md` from the original migration audit. GitHub (including anonymous clone of `no1owns/web-portfolio`) is reachable. **This audit is therefore built entirely from the `web-portfolio` repository comparison, not a live side-by-side of the public sites.** Repeating the existing recommendation: before Phase 2 asset decisions are finalized, someone with real browser access (Ayo, or a session without this egress restriction) should do one direct pass against the four public URLs to confirm nothing here is missed.

## Method

1. Full file listing of `web-portfolio/images/` (242 files across 12 company folders + `awards/`, `ayo/`).
2. Cross-referenced company-by-company against the current `site/public/media/` company folders (458 files, already reorganized by PR #4's `docs/asset-migration-proposal.md` / `docs/asset-migration-ledger.md`, which this audit treats as the trusted baseline for "what's already here" rather than re-deriving it).
3. Where a company's web-portfolio file count was close to or under its akintilo-portfolio count, treated as likely-already-migrated and not re-verified file-by-file (time-boxed; flagged below where a specific check is still worth doing).
4. Where a company's web-portfolio content looked structurally different from anything currently in akintilo-portfolio (i.e., not just "more of the same gallery"), opened the actual files to verify by sight rather than inferring from filename.

## Finding 1 (high confidence): the complete source animation for the MongoDB Atlas cluster-builder frame

**Confirmed.** `site/public/media/mongodb/mongodb-web/mongodb-atlas-cluster-builder-animation.webp` (used as the last block on `/mongodb-web`) is a single 600×338 still frame, added 2026-10-26 from a chat-pasted image with no fuller version available at the time (`docs/portfolio-decisions.md`, "fifth pass" entry).

`web-portfolio/images/mongodb/motion-mongodb-01.gif` is a 600×338, 401-frame, 6.9 MB animated GIF. Its first frame is **pixel-identical** to the still already in the repo (verified by direct visual comparison, not just matching dimensions — see `contact-sheets/mongodb-atlas-gif-frames.png`, which samples frames 0/100/200/300/400 and shows the full white-card-to-dark-card "Edit_" transition in motion).

| | Current (`akintilo-portfolio`) | Located (`web-portfolio`) |
|---|---|---|
| File | `mongodb-atlas-cluster-builder-animation.webp` | `images/mongodb/motion-mongodb-01.gif` |
| Type | Single static frame | 401-frame animated GIF |
| Dimensions | 600×338 | 600×338 (exact match) |
| Size | — (WebP, small) | 6.9 MB |

**Recommendation:** with Ayo's approval, replace the static frame with the full animation, converted to animated WebP (matching the site's existing GIF→WebP convention — see `ROADMAP.md`'s 2026-10-22 entry, which converted 4 similar files at 52%+ size savings) rather than shipping a 6.9 MB raw GIF. Preserve native 600×338 proportions (this is a low-resolution source either way — upscaling would misrepresent it). Write real alt text describing the transition motion, not just the static-frame description currently in place. Respect `prefers-reduced-motion`: the site's current looped-autoplay-video gap (flagged in `ROADMAP.md`, not yet fixed) applies here too if this becomes an autoplaying asset — recommend `playback: "controls"` or a static-poster-first pattern rather than autoplay, consistent with the task's accessibility requirement. **Not imported this phase** — Phase 1 is audit-only.

## Finding 2 (high confidence): AppOmni event/booth content not represented anywhere in akintilo-portfolio

**Confirmed, substantial gap.** `web-portfolio/images/appomni/` contains 10 `event-appomni-*` files (one 4032×3024 real photograph, the rest booth-design renders/graphics) plus a `hero.png` — none of which correspond to anything currently in `site/content/projects/*.json`. AppOmni's only content today is `brand-systems-and-web-performance.json` (web/product/brand) and `ai-assisted-design-systems.json` (the AI-workflow case study) — **there is no AppOmni event content in the live site at all.**

Opened and visually confirmed 4 of the 10 files (see `contact-sheets/appomni-events-web-portfolio.png` for all 10 at a glance):

| File | Content (directly viewed) |
|---|---|
| `event-appomni-01.jpeg` | Real booth photo: 4 AppOmni staff at a branded trade-show booth table, partner-logo wall (Okta, Google, HubSpot, and others visible), "Effortless, automated, and visible SaaS Security" messaging |
| `event-appomni-02.png` | A technical booth floorplan/elevation drawing — labeled "Reception," "Back Wall BW1–BW5" — a real booth-design deliverable, not a photo |
| `event-appomni-05.png` | An immersive, environmental-graphics booth design: overgrown-ruins/jungle theming with embedded video screens — a distinctive installation, consistent with the "environmental graphics" language in the task's AppOmni brief |
| `event-appomni-09.png` | A speaker social graphic: "See Me at Cisco Live! May 31–June 4, 2026, Las Vegas, NV, Booth #????" with a named speaker (Morgan Lloyd, Partner Director EMEA) |

**Important correction to the task's framing:** the task names Black Hat and RSA as the AppOmni events to build around. The one piece of directly legible event-name evidence in this material names **Cisco Live**, not Black Hat or RSA. The jungle/ruins booth design (`event-appomni-05.png`) has no visible show name and could plausibly be either show's booth, but this audit does not assume that — it's flagged in `docs/project-content-audit.md`'s "missing information" as needing Ayo's confirmation before any show name is published. The files are real, verified AppOmni event-brand work regardless of which specific shows they're attributed to.

**Recommendation:** build the AppOmni "Events and environments" grouping the task asks for, sourced from these 10 files plus `hero.png` (likely the related AppOmni website hero, not event content — confirm before use), once Ayo confirms the show attribution. Not imported this phase.

## Finding 3: duplicate media — carried forward from the approved asset-migration-proposal, not re-derived

`docs/asset-migration-proposal.md` §5 already ran a byte-identical (`sha256sum`) duplicate pass across all 458 files in `site/public/media/` as part of PR #4, approved 2026-10-27. Two pairs were found, both **within the same project** (so classified as intentional reuse, not a filing error — the task's own "accidental repeat" vs. "intentional comparison" vs. "reused across projects" categories):

| Pair | Project | Size each | Classification |
|---|---|---|---|
| `meta-connect-08.webp` / `meta-connect-13.webp` | meta-connect | 71,234 B | Same photo used twice in the original narrative — not flagged as an error by the prior audit, not re-investigated here. |
| `a26ee5114fc51d56.webp` / `dd0a597a18f778d5.webp` | loft | 202,722 B | Same — intentional reuse within one project. |

Neither pair was deleted or merged in PR #4 (explicitly deferred to Ayo's go-ahead, "total potential savings ~274 KB — trivial"). This audit does not recommend revisiting that call; it's restated here only because this task explicitly asks for a duplicate-image audit and the work already exists. No new duplicates were found across companies in this pass (would require a fresh cross-company hash sweep of `web-portfolio` vs. `akintilo-portfolio`, not done this session — time-boxed out; flag if Ayo wants it run).

**Unreferenced files** (also carried forward from the approved proposal, §7): 4 files preserved, not deleted — 1 pre-segmentation Secureframe screenshot original (kept for provenance alongside its 8 published segments) and 3 supporting reference files (2 JSON specs + 1 reference photo) uploaded "if useful" for the AI case study but never rendered. No action recommended beyond what's already approved.

## Finding 4: the 2 remaining Adobe Behance embeds have no local original in either repo

Confirmed by direct search of `web-portfolio` (`find . -ipath "*lyft*"`, `find . -ipath "*visa*"` — zero results for either) and by the existing inventory (`content-and-asset-inventory.md` rows 9 and 20, both "Not present as its own page" in `web-portfolio`).

| Project | Embed | Adobe/Behance ID |
|---|---|---|
| `/visa` | `www-ccv.adobe.io/v1/player/ccv/KFgp954czdh/embed` | `KFgp954czdh` |
| `/lyft` | `www-ccv.adobe.io/v1/player/ccv/SMIcP4zAIjK/embed` | `SMIcP4zAIjK` |

**Recommendation:** per the task's own Behance/Adobe rule ("do not automatically download every public asset; recommend based on relevance; after approval, download the best available legitimate version — do not hotlink"), these two are strong candidates for that treatment **if** Ayo can get browser access to the Behance/Adobe Portfolio source and confirm there's a downloadable original. This session cannot reach Behance to check. Not resolved this phase — stays exactly as `ROADMAP.md` already has it queued.

## Finding 5: personal/recognition assets not currently used anywhere

`web-portfolio/images/awards/` (2 files — a "2048 Dept Award" and a Webby Awards badge) and `web-portfolio/images/ayo/` (4 files — 2 personal photos, 1 LinkedIn-style headshot, 1 music-related image) have no equivalent anywhere in `akintilo-portfolio`. These aren't project assets — they're About-page/bio candidates. `settings.json`'s `about` field is text-only today, no photo. **Out of scope for the project restructure** (the task is about project/company architecture, not the About page), flagged here only because the task asked for every potentially-missing asset to be recorded. No recommendation to act on this phase.

## Finding 6: counts worth a direct re-check before building new pages

| Company | `web-portfolio` file count | `akintilo-portfolio` file count | Note |
|---|---|---|---|
| Apollo GraphQL | 14 (13 numbered + `hero.png`) | 12 | **Resolved by direct visual comparison** (see `contact-sheets/apollo-contact-sheet.png`): 10 of `akintilo-portfolio`'s 12 files are confirmed 1:1 matches of `web-portfolio` originals (`hero.png` included — it's reused inside the akintilo gallery, not cropped). 3 `web-portfolio` files have no match in `akintilo-portfolio` and are genuinely missing: `event-apollo-00006.png` ("Welcome to GraphQL Summit / Convene / 225 Liberty / New York City / OCT 8–10 2024" stage screen), `event-apollo-00007.png` (auditorium screen, "Stay connected with real-time highlights... #GraphQLSummit"), `event-apollo-00013.jpeg` (indoor lobby/credenza TV showing the same Convene signage, dated OCT 8–9 — note the 1-day discrepancy against 00006's OCT 8–10, worth Ayo confirming which is correct before either is used as a verified date). The other 2 akintilo files are **not Apollo-specific at all**: `4c3bc4f6d134a55a.webp` is a 4-panel composite combining one image each from TripActions TRAVERSE '21, MongoDB World '17, DocuSign Momentum '15, and an Apollo Lounge wrap — almost certainly the combined `/event-brand-experiential` page's own cover/intro image, filed under "Apollo" in the asset ledger by convention rather than because it's Apollo content; recommend it move to a shared cover position once the page splits, not into Apollo's company-specific media. `83bb729768cff7cf.webp` is a genuine Apollo asset but a **rendered digital-signage design mockup** (a customer-quote panel attributed to "Devashree Shirude, Senior Software Engineer, PlayStation," composited onto a photo of a lobby) — not a photograph of an installed display, and should be labeled as a design mockup/rendering if used, not presented as deployed signage. |
| DocuSign | 42 (20 `ads/` + 22 `events/`) | 45 (16 + 17 + 12) | akintilo-portfolio already has more files than web-portfolio provides — likely already fully migrated plus extras from elsewhere. No action recommended; flagged only for completeness. |
| TripActions/Navan | 52 (34 ads + 3 ad-videos + 1 event hero + 8 Lufthansa + 6 travel-expense) | 73 | Same — akintilo-portfolio already exceeds web-portfolio's count. No action recommended. |
| Secureframe | 54 (including 6 animated GIFs: `motion-secureframe-02/03/04/05/07/11.gif`) | 54 (exact match per the approved migration proposal) | Counts match exactly. The 6 web-portfolio GIFs likely correspond to first-frame WebP extractions already classified into the AppOmni/Secureframe galleries during the documented three-pass branding-verification work (`docs/portfolio-decisions.md`, 2026-10-09/10-10 entries) — not re-verified file-by-file this pass, flagged as a quick confirmation worth doing in Phase 2 rather than a known gap. |

## What this audit does not cover (explicitly out of scope / blocked)

- **Behance (`behance.net/ayodejiakintilo`) and Adobe Portfolio (`akintilo.com`) direct comparison** — blocked by this session's network egress (see "Access limitations" above). Per the task's own instruction, this audit does not download Behance/Adobe assets or assume their content; it recommends only what's visible in `web-portfolio`.
- **The 6 AI-workflow Figma assets** (`product-ui-reference-screen.png`, `product-ui-marketing-composition-{final,first-pass,corrected}.png`, `creative-brief-generator-interface.png`, `creative-brief-ai-context-export.png`) — confirmed **not present anywhere in the repository** (`find . -iname "*product-ui*" -o -iname "*creative-brief*"` returns zero matches, repo-wide). Their Figma node IDs are documented in the task (`43:604`, `46:308`, `46:335`, `46:297`, `3:2115`, `3:2119`, file `pqskgvnzg8ipZidcEnsDbj`). This session's Figma MCP connector was not used to attempt export, since Phase 1 is audit-only and the task says "if the files are not available in the working environment, list them as requiring export... do not block unrelated planning work." Listed here as requiring export from Figma — not blocking.

## Contact sheets produced this pass

- `appomni-events-web-portfolio.png` — all 10 `event-appomni-*` files at a glance (Finding 2).
- `mongodb-atlas-gif-frames.png` — 5-frame progression (0/100/200/300/400 of 401) showing the Atlas animation in motion (Finding 1).

Both saved to the session scratchpad and sent to Ayo alongside this plan; not committed to the repo (Phase 1 produces docs, not binary contact-sheet images, inside `docs/`).
