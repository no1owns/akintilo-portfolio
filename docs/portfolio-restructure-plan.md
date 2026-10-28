# Portfolio restructure plan

**Status: Phase 1 approved 2026-10-28. Phase 2 implementation in progress on `claude/portfolio-project-restructure`.** The original Phase 1 body below is left intact as the historical record of what was proposed and why. See "Phase 2: approved decisions and directed-audit corrections" at the end of this document for what Ayo approved, what the required directed audits found (several corrections to Phase 1's findings), and what changed as a result.

## Phase 1 status (historical — see Phase 2 section below for current state)

**Status: Phase 1 (planning and audit) only. No pages restructured, no media copied, no routes changed, no Selected Work changes, nothing committed as implementation. Stop here for Ayo's review, per the task.**

Companion documents: `docs/project-content-audit.md` (per-project ground truth), `docs/page-and-asset-migration-map.md` (route-by-route destinations), `docs/external-asset-gap-audit.md` (what's missing/found outside this repo), `docs/selected-work-recommendation.md`, `docs/card-layout-and-spacing-spec.md`. This document is the synthesis — read it first, then the companions for detail.

Built on top of the substantial prior audit already in this repo (`ROADMAP.md`, `docs/portfolio-decisions.md`, `docs/content-and-asset-inventory.md`, `docs/asset-migration-proposal.md` + `docs/asset-migration-ledger.md` — the last two already executed the media-folder reorganization this task's architecture depends on, merged as PR #4, approved 2026-10-27). This plan doesn't repeat that work; it extends it to the project-led, company-collection structure the task asks for.

## 1. The three-level architecture, applied

The task specifies: (1) individual project pages for work with a distinct challenge/contribution/process/evidence, (2) company collection pages introducing Ayo's broader role and connecting related projects, (3) "Additional work" sections for valuable but unattributable-to-a-specific-project assets. Current state: **level 1 already exists for all 21 published projects** (that's the whole site today). **Level 2 does not exist anywhere** — there are no company collection pages. **Level 3 does not exist as a distinct UI pattern** — the closest analog is the `sectionHeading` block type already used inside `/event-brand-experiential` and `/lyft`, which could extend to render an "Additional work" subsection.

### AppOmni

**Collection page: `/appomni` (new).**

| Grouping (per task) | Source | Status |
|---|---|---|
| Events and environments (Black Hat, RSA, booth systems, event signage/environmental graphics) | 10 `event-appomni-*` files + `hero.png`, found in `web-portfolio`, not currently in akintilo-portfolio at all | **Gap, located.** See external-asset-gap-audit.md Finding 2. Show-name attribution (task assumes Black Hat; only legible evidence found names Cisco Live) needs Ayo's confirmation before publishing. Black Hat eval as its own standalone case study is contingent on that confirmation and on there being enough material specific to that one show (not yet established). |
| Presentations (SKO, product presentations, executive storytelling, sales enablement) | — | **Gap, not located.** No source material identified in this repo or `web-portfolio`. Needs Ayo to supply content or confirm this section stays unbuilt for now. |
| Web experience (homepage, product/platform pages, Salesforce Security, Common Apps, customer stories, performance, experimentation/analytics) | AppOmni's share of `/brand-systems-and-web-performance` (46 of 94 images, 4 of 9 videos) | **Exists, needs to be split out** of the combined Secureframe/AppOmni file. See migration map. |
| Campaigns and social (display, paid/organic social, motion/video, Marlin AI launch) | Same file — the AppOmni share already includes the Marlin AI video and social graphics (the 2026-10-15 Cybersecurity Awareness Month additions) | Same split as above. |
| AI-Assisted Design Systems | `/ai-assisted-design-systems` | **Stays its own standalone case study**, linked from the collection, per the task's explicit instruction ("keep this as a standalone case study connected to the AppOmni collection"). |

### Secureframe

**Collection page: `/secureframe` (new).**

| Grouping (per task) | Source | Status |
|---|---|---|
| Brand evolution (previous identity, transition, new identity, Ayo's role managing it, old vs. new clearly labeled) | Secureframe's share of `/brand-systems-and-web-performance` (48 images, 5 videos) | **Needs Ayo's input.** Nothing in the current content or asset history distinguishes "previous brand" from "current brand" assets — the task's own safeguard against assigning by appearance alone applies directly here. Recommend asking Ayo which (if any) of the existing 48 images are pre-rebrand, rather than guessing from color/style. |
| Web experience (landing pages, product marketing, website systems, conversion/performance) | Same file | Splits out alongside AppOmni's share — see migration map. |
| Campaigns and display (display ads, paid campaigns, social, campaign systems, testing/optimization) | Same file | Same split. |

### MongoDB

**Collection page: `/mongodb` (new).** All 6 named evaluations map to existing, already-strong standalone pages — no gaps here, only placement decisions:

| Task's named evaluation | Maps to | Status |
|---|---|---|
| MongoDB brand evolution | `/dream-big` (Global Rebrand Launch Experience) | Exists, stays standalone. |
| MongoDB events | MongoDB's section of `/event-brand-experiential` | Migrates into the collection's events presence — see migration map. |
| MongoDB web experience | `/mongodb-the-next-generation-database` + `/mongodb-web` | Both exist; possible overlap flagged for Ayo (see project-content-audit.md). |
| "For Giant Ideas" video | `/mongodb-for-giant-ideas-video` (Innovation Without Limits) | Exists, stays standalone — task names this project by its actual content, not its current title; recommend keeping the current title (it's accurate and already established) rather than renaming to "For Giant Ideas." |
| MongoDB company values launch | `/mongodb-beliefs-storyboard` | Exists, stays standalone. Storyboarding/presentation design/communications design/original-illustration attribution preserved exactly — **do not change this language.** |
| Global rebrand launch experience | `/dream-big` | Same as "brand evolution" above — these may be the same project evaluated under two names in the task; flagged, not duplicated. |

`/mongodb-internal` (Culture and Internal Brand Storytelling) isn't named in the task's MongoDB list — recommend Additional work within the collection unless Ayo wants it promoted (see migration map).

### DocuSign

**Collection page: `/docusign` (new).**

| Task's named evaluation | Maps to | Status |
|---|---|---|
| DocuSign Momentum | DocuSign's section of `/event-brand-experiential` | New standalone page, migrated from that section. |
| Enterprise brand campaigns | `/docusign-enterprise-campaign` | Exists, stays standalone. |
| Enterprise integration and co-marketing campaigns | `/microsoft-docusign` | Exists, stays standalone. Microsoft/Salesforce/Google/Apple partnership attribution preserved exactly where it currently appears — no new partner claims added. |
| Additional DocuSign work | — | None specifically identified beyond the above in this audit; `web-portfolio`'s `docusign/ads/` folder (OOH/billboard pieces among it) may supply more once cross-checked against what's already in the 45-file DocuSign media set (see external-asset-gap-audit.md, Finding 6). |

### Navan / TripActions

**Collection page: `/navan` (new — route/folder name per the task's explicit instruction; page copy stays "TripActions" where historically accurate).**

| Task's named evaluation | Maps to | Status |
|---|---|---|
| TRAVERSE '21 | TripActions' section of `/event-brand-experiential` | New standalone page, migrated from that section. |
| Performance Marketing Systems | `/tripactions` | Exists, stays standalone. **Content fix needed** — see "Specific page corrections" below. |
| Frictionless Product Onboarding | `/tripactions-visual-product-ux` | Exists, stays standalone. |
| Navan rebrand and global rollout | — | **Gap, not located.** No source material identified. Needs Ayo. |
| Sales and presentation systems | — | **Gap, not located.** No source material identified. Needs Ayo. |
| Partnership campaigns | `/visa`, `/lufthansa` | Both exist, stay standalone, move under this collection. |

### Apollo GraphQL

**Standalone page (new route, e.g. `/apollo-graphql`) — not a full collection, per the task's own instruction.** Sourced from the Apollo section of `/event-brand-experiential` (12 images currently in `apollo/event-brand-experiential/`; `web-portfolio` has 14 — see external-asset-gap-audit.md, Finding 6, for the count check still worth doing before this page is built).

### Other companies

Preserved exactly as they exist today — all are single-project companies, none need a collection:

| Company | Route | Status |
|---|---|---|
| Meta Connect | `/meta-connect` | No change. |
| Lyft | `/lyft` | No change to structure; content corrections below. |
| BetterUp | `/betterup-product-presentations` | No change; flagged in Selected Work review as a range candidate. |
| Linx | `/linx-security` | Already published, already in All Work, not treated as missing (per the task's explicit instruction). See `selected-work-recommendation.md`. |
| Loft | `/loft` | No change. |
| LILT | `/lilt-ebook` | No change. |
| Byron | reel-only, no case-study page | Confirmed intentional (`ROADMAP.md`) — not a gap. |

No Visa, Lufthansa, Microsoft/DocuSign, or other "partnership" company needs its own top-level collection — each stays a standalone project nested under its primary company's collection (Visa/Lufthansa under Navan, Microsoft under DocuSign), consistent with how the media folders are already organized.

## 2. Linx status (task item 4)

Already covered in detail in `selected-work-recommendation.md`. Summary: exists, published, in All Work, not missing. Recommend evaluating for Selected Work on format-range grounds (illustration system + AI tooling); not asserting it should replace anything specific.

## 3. Specific page corrections (task item 11)

### Lyft

- **Remaining Adobe-hosted asset:** the "Motion Design for Internal Communications" video block (`www-ccv.adobe.io/.../SMIcP4zAIjK`). No local original found in either repository this session (confirmed: `find . -ipath "*lyft*"` in `web-portfolio` returns zero results).
- **Behance embed:** same one — Lyft has exactly one remaining external dependency, this video. No separate embed.
- **Recommended locally-hosted replacement:** none available to substitute yet. Per the task's Behance/Adobe rule, this would need Ayo to confirm a downloadable original exists on the public Behance/Adobe Portfolio page — this session cannot reach `behance.net` (DNS blocked, see external-asset-gap-audit.md) to check.
- **Comparison against `work.akintilo.com`, Behance, Adobe Portfolio:** not possible this session — all three hosts are unreachable (DNS failure). `web-portfolio` (the one reachable comparison source) has no Lyft content at all.
- **Missing landing-page/email/presentation/motion/internal-comms/launch-marketing examples:** the 2026-10-26 "fourth pass" already closed most of this gap — 2 landing-page color treatments, 2 distinct email designs, and 1 new animation frame were supplied and added (`docs/portfolio-decisions.md`). What remains open per `ROADMAP.md`: a local replacement for the internal-communications motion embed (above).
- **Selected Work recommendation:** not currently featured; not recommended for promotion this phase — see `selected-work-recommendation.md` for the full reasoning (it's a strong but different kind of project; no verdict forced).

### Designing for a Developer Platform (MongoDB, `/mongodb-web`)

Fully resolved as a finding — see `external-asset-gap-audit.md`, Finding 1. The still frame is `mongodb-atlas-cluster-builder-animation.webp` (600×338); the complete 401-frame source GIF was located at `web-portfolio/images/mongodb/motion-mongodb-01.gif`, confirmed pixel-identical at frame 0. Plan for Phase 2 (pending Ayo's approval): convert to animated WebP at native 600×338 (no upscaling), write motion-accurate alt text, respect `prefers-reduced-motion` (static poster or `playback:"controls"` rather than silent autoplay, consistent with the site's one known accessibility gap flagged in `ROADMAP.md`).

### Creative Systems Toolkit

Confirmed via direct inspection of `src/App.jsx`'s `ExperimentCard` component: it has **no dedicated detail page or route** (Experiments render entirely inline on the homepage, no `/experiments/<slug>` pattern exists in `prerender.mjs`'s routes). The card's link block only renders when `liveUrl` or `sourceUrl` is set (`src/App.jsx:319`); Creative Systems Toolkit has neither, so no "View experiment" link is possible today without either (a) adding a route, or (b) adding a URL field it doesn't have content for.

**Recommendation:**
- Add a dedicated detail page (new route, e.g. `/lab/creative-systems-toolkit` or `/experiments/creative-systems-toolkit` — naming TBD) that renders the experiment's existing `overview` (already accurate, already distinguishes observed-CSS vs. proposed vs. custom-edit vs. demonstration-only, per `docs/portfolio-decisions.md`'s 2026-10-26 third-pass entry) plus its 6-image gallery (already captioned with correct provenance language).
- Change the homepage card to link to that new route (reusing the existing `liveUrl`/`sourceUrl` link pattern, or a new `detailUrl`-style field).
- Shorten the homepage card copy to the task's suggested line: *"Small tools for testing brand components, patterns, asset production, and accessibility."* Move the full ~180-word provenance explanation to the detail page, not the card — this directly fixes the "far too long" homepage description.
- The detail page's content (per the task's outline): Button System Lab, token export, Dot Pattern Studio, logo-placement tool, WebP export demonstration, observed AppOmni styles vs. recreated demonstrations vs. proposed states vs. custom additions, and the accessibility/compression demo's limits — **all of this already exists verbatim in the experiment's current `overview` field**, it just needs to move from an inline homepage block to its own page.

### Performance Marketing Systems (`/tripactions`)

Confirmed via direct inspection of `tripactions.json`'s block order (see `project-content-audit.md` row 3 for the full table):

- **First video shown:** `motion-tripactions-travel-expense-hero.mp4`, generically titled "Performance Marketing Systems video." Its `reel.json` entry is explicitly captioned "TripActions × Visa" with the description "Co-marketing that connected the corporate card with a broader travel story" — **word-for-word Visa's own project summary.** This confirms it's Visa's video, mis-homed here.
  - **Recommendation:** remove it from `/tripactions`'s block sequence; confirm it's already represented on `/visa` (currently `/visa`'s video block is the Adobe embed, not this file — so this local file should likely become `/visa`'s *locally-hosted* video, resolving part of the Visa Adobe-dependency question too, pending Ayo's confirmation that this is in fact the same content as the embed, not a different Visa asset).
- **Airplane-window video:** `motion-tripactions-ad-1.mp4` ("Hello Travel" — "An animated brand ad built around a plane-window reveal," per its reel.json description). Currently sits at position 6 of 10 blocks, between "Inside the Card" and "Goodbye Expenses, Hello Liquid" — separated from the other two campaign-ad videos (`ad-2`/"Bring It On," `ad-3`/"Future of Work") by the Liquid-card video sandwiched in between.
  - **Recommendation:** move it earlier in the sequence and group it directly with `ad-2` and `ad-3` — all three appear to be one coherent "Let's go" brand-ad campaign (confirmed by their shared tagline per the reel descriptions), currently split across 3 non-adjacent positions in the block list.
- **Overall sequence:** recommend a full pass regrouping this page's videos into coherent campaign clusters (the 3 brand ads together; the Liquid-card ads — "Goodbye Expenses, Hello Liquid" and "Hello, Liquid" — already adjacent and fine as-is; "Inside the Card" as its own feature-focused block) rather than the current interleaved order.

### Event Brand and Experiential

Covered in full in `page-and-asset-migration-map.md`. Summary: used as migration source for the 4 new standalone event pages (Apollo GraphQL Summit, TRAVERSE '21, MongoDB events, DocuSign Momentum) plus the newly-identified AppOmni events material. **Not deleted** until every section has a verified successor. Recommended end state: an index/compatibility collection page, not a single-target redirect (it currently serves 4+ distinct audiences, so one redirect target would be wrong for most of its current inbound traffic).

## 4. AI-workflow evidence (task item 12)

Confirmed: **none of the 6 named assets exist anywhere in the repository** (`find . -iname "*product-ui*" -o -iname "*creative-brief*"`, repo-wide, zero matches). This matches `ROADMAP.md`'s existing record of the same gap from the 2026-10-26 pass. Figma source and node IDs are documented in the task (file `pqskgvnzg8ipZidcEnsDbj`, nodes `43:604`, `46:308`, `46:335`, `46:297`, `3:2115`, `3:2119`) — **listed here as requiring export, not attempted this session** (Phase 1 is audit-only; exporting and importing these is Phase 2 work, contingent on Ayo's approval). Per the task's own prior framing (already reflected in the existing case-study copy, per `docs/portfolio-decisions.md`'s third-pass entry): the Product UI assets must be labeled recreated demonstrations when added; the Creative Brief Generator images are actual interface evidence, not recreations.

## 5. CMS media-folder behavior (task item 13)

**Problem, confirmed directly in code:** `site/admin/editor.js` hardcodes a single flat `media_folder`/`public_folder` pair (`public/media` / `/media`) with no per-collection override (confirmed in `docs/asset-migration-proposal.md` §7, "Risks"). New uploads through `/admin/`'s Decap CMS editor land in the flat `site/public/media/` root, not into a project's company/project subfolder — the subfolder structure introduced by PR #4 is browsable in the media picker, but not where new uploads default to.

**Proposed approach (not implemented in Phase 1):**
- Decap CMS supports **per-field media folders** (a `media_folder` override on an individual image/file field in the collection schema, relative to the collection's folder) rather than only one global pair. This lets each project's own content file in `site/content/projects/*.json` direct its own image/gallery fields into `media/<company>/<project-slug>/` automatically, without a hardcoded list of every company/project combination (which would be exactly the "hardcoded folder lists that become difficult to maintain" problem the task warns against).
- Concretely: Decap's `media_folder` field-level override can use the entry's own `slug` as a template variable (Decap supports `{{slug}}` interpolation in folder paths). If each project's `company` field is also normalized to match its existing media folder name (already true — `appomni`, `secureframe`, `mongodb`, `docusign`, `navan`, `apollo`, etc. already match the company values used in content, per the asset-migration-ledger's company/folder mapping), a template like `media/{{fields.company}}/{{slug}}` would route new uploads correctly without any per-project hardcoding.
- **Risk to verify in Phase 2, not assumed here:** whether the installed Decap CMS version (`decap-cms@3.16.2` per `site/package.json`) supports `fields.*` template interpolation in `media_folder` (vs. only `{{slug}}`/`{{dirname}}`/date tokens) — this needs a config spike before committing to the exact template syntax. If `fields.company` interpolation isn't supported, the fallback is a `media_folder` override per project collection entry (one per existing project file, not per company — still no hardcoded list of companies, just reusing each project's own already-existing collection definition).
- **What this does not break:** existing media browsing (the global `media_folder`/`public_folder` pair stays as the picker's root, so every existing file is still browsable), existing project editing (no schema field removed, only a folder-routing behavior added), public path predictability (uploaded files still resolve to the same `/media/...` URL structure already in place).
- **Documentation for new projects:** once implemented, document in `site/README.md` (or a new `site/admin/README.md`) that creating a new project collection entry should set its `media_folder` to `media/<company-folder>/<project-slug>` to match the established convention, with the company folder name taken from the existing `docs/asset-migration-ledger.md` company list rather than invented per-project.

## 6. Technical risks

1. **The two combined-company files** (`brand-systems-and-web-performance.json`, `event-brand-experiential.json`) are the highest-risk edits in Phase 2 — both require splitting one JSON file's media references across multiple new files/routes, which `docs/asset-migration-proposal.md` §7 already flagged as "higher risk of a copy-paste slip than a straight file-level rename" for the equivalent media-path risk. Recommend a full before/after image-count diff on both, not a spot-check, exactly as the approved media migration did.
2. **`reel.json` cross-references** 27 media paths also used in project JSON (confirmed in the approved migration proposal). Any path that moves as part of a company-collection split needs updating in both places — tracked explicitly, not assumed.
3. **CMS schema changes** (media-folder routing, any new `company`/collection fields for the collection pages themselves) need a config spike before Phase 2 implementation starts, per §5 above.
4. **Prerender route list and sitemap** (`scripts/prerender.mjs`) need updating for every new route — straightforward but easy to miss if a new page is built without also adding its route to the `routes` array.
5. **No regression to the justified-grid/lightbox/video/accessibility work already completed** — every company-collection and new standalone page should reuse the existing `Blocks()`/`JustifiedGallery`/`Img`/lightbox components, not introduce new one-off layout code, consistent with the task's "do not redo... the recently completed loading component unless a verified defect requires a targeted correction" instruction (the one verified defect found — the card-spacing CSS specificity bug — is documented separately in `docs/card-layout-and-spacing-spec.md`, not touched here).

## 7. Recommended implementation order (Phase 2, pending approval)

Mirrors the task's own suggested commit sequence:

1. Approved asset imports (Atlas GIF→WebP conversion, AppOmni events material, any resolved Apollo/DocuSign count gaps) — contingent on Ayo's approvals from this plan.
2. Company-collection CMS schema + media-folder routing config spike.
3. Build the 6 company collection pages (`/appomni`, `/secureframe`, `/mongodb`, `/docusign`, `/navan`) + the Apollo GraphQL standalone page — as new pages linking existing content, before any existing project content is split or moved.
4. Split `/brand-systems-and-web-performance` into AppOmni/Secureframe pieces; split `/event-brand-experiential` into its 4–5 successor pages. Full before/after media-count verification on both, per the risk above.
5. Content/category updates identified in `project-content-audit.md` (Performance Marketing Systems reordering, Lyft/Atlas fixes, category decisions).
6. Homepage card spacing fix (`docs/card-layout-and-spacing-spec.md`) + Selected Work changes, once Ayo approves a specific lineup from `docs/selected-work-recommendation.md`.
7. Creative Systems Toolkit detail page + route.
8. Redirects/compatibility routes for the two split pages, once their successors are verified complete.
9. Media corrections (any approved duplicate handling — none currently recommended, see external-asset-gap-audit.md Finding 3).
10. Documentation/QA — update `ROADMAP.md`, `docs/content-and-asset-inventory.md`, and the asset ledger to reflect the new structure; do not leave two parallel "source of truth" docs describing different states.

## 8. Decisions requiring Ayo's approval before Phase 2 starts

Consolidated from every companion document:

1. The 6 open "missing information" items in `project-content-audit.md` (row-7/row-13 MongoDB overlap, AppOmni event show-name attribution, Lyft/Visa Adobe-embed sourcing, BetterUp/Lyft new images, Apollo count check, Events-category split).
2. The 4 structural gaps with no located source content: AppOmni Presentations, Secureframe brand-evolution old/new labeling, Navan rebrand/global rollout, Navan sales/presentation systems.
3. The Selected Work shortlist in `selected-work-recommendation.md` (no specific swap proposed — Ayo's call).
4. The card-spacing fix approach in `card-layout-and-spacing-spec.md` (recommended: raise the two margin rules' specificity, not widen the reset).
5. The Atlas GIF replacement in `external-asset-gap-audit.md` Finding 1 (confirm the located `web-portfolio` file is in fact the right source before it's converted and published).
6. The CMS media-folder routing approach in §5 above (confirm the `{{fields.company}}` template spike before Phase 2 commits to it).
7. Exact route slugs for the new collection/standalone pages (proposed, not final, in `page-and-asset-migration-map.md`).

## Phase 2: approved decisions and directed-audit corrections (2026-10-28)

Ayo approved all 15 Phase 1 decisions with specific modifications, and required 4 directed audits be completed before any earlier gap claim could be treated as final. Results below — **three of these audits overturned or substantially revised a Phase 1 finding.**

### Directed audit 1: AppOmni presentations — found, not missing

Phase 1 reported no AppOmni presentation content was located. **Corrected.** A full visual pass of the 50-image AppOmni gallery in `brand-systems-and-web-performance.json` (block 16) found:
- **5 genuine presentation-slide photographs** (stage photography — presenter silhouette, audience in foreground, large screen behind): `c6c27ca9fce9d1b8.webp` ("Unmatched Depth" — Surface Level vs. Deep Level competitive positioning), `8acd0f212dfedd46.webp` ("Just Along for the Ride?"), `f056841dd5d3182a.webp` ("The Innovation" — AskOmni, Marlin Insights, Detected AI Agents product features), `eaa2afbce7250c4f.webp` ("Or Are You in the Driver's Seat"), `e232e4cdae473b49.webp` ("The Last Mile"). These are executive-storytelling/keynote material — moved into a new AppOmni Presentations section.
- **3 booth/environmental design assets misfiled in this "web" gallery**, not presentations: `72633835e2339a65.webp` (3D booth render with build-spec labels: "15' Square Hanging Sign," "LED Tiles," "Demo Station," etc.), `5ab8998427c984e3.webp` (booth wall-elevation spec: "Reception Panel," "Swag Wall," "Main Wall," "Demo Station"), `914d489fb76c9b67.webp` (booth floorplan: "Back Wall," "BW1–BW5," "Reception"). These move to AppOmni Events, alongside the `web-portfolio` event material (external-asset-gap-audit.md Finding 2).
- The remaining ~42 images in this gallery (web dashboard screenshots, campaign illustrations/comics, social graphics, the Cybersecurity Awareness Month tip series) stay as AppOmni Web/Campaigns content — correctly classified in Phase 1.

Not every one of the 50 images was individually opened (a representative sample of ~25 was, plus the full set was scanned via contact sheet for the stage-photo genre, which is visually distinctive and unlikely to have been missed). If any further presentation-style image surfaces later, it moves into this same section.

### Directed audit 2: Secureframe brand evolution — classified, not left generic

Using the confirmed rule (purple = old brand, green/black = new brand), a full visual pass of the 42 non-segment images in Secureframe's share of `brand-systems-and-web-performance.json` found a clear, consistent pattern:

- **Old brand**: light lavender/white background, a teal-to-navy gradient "S" mark, periwinkle-purple accent color on buttons/stats/headlines. Confirmed: `02406e0598303174.webp` / `e3f45301...` ("Sony Pictures saved 80%"), `2268baac...` ("Respond to RFPs faster"), `2bed62d83696119d.webp` ("Cut compliance time in half"), `6e16f20f.webp` ("Everything Compliance" donut chart), `99a31cdf.webp` ("Framework Perfection"), `e4c95b55d6412af9.webp` ("100+ Integrations"), `e9d77b39322ea1aa.webp` (solid-purple testimonial card), `9a07a0fd2355fd34.webp` ("By 2026, 85%..." stat graphic). 8 confirmed old-brand assets.
- **New brand**: dark navy/black product-UI chrome, flat (non-gradient) wordmark, solid green or black brand-lockup cards. Confirmed definitively by the two purest brand-lockup assets: `f85ecf26.webp` ("securframe.comply" on black) and `fc8eb9ad2dc493b6.webp` ("securframe.comply" on solid green) — these are the clearest possible match to the stated rule. The remaining ~30 dark-UI product screenshots (dashboards, risk management, training modules, the CTEM graphic) share the same dark-navy/black chrome and are grouped as new-brand product/web material, not individually re-verified pixel-by-pixel.
- A handful (G2 award badges, a few ambiguous photo-based testimonials) carry no brand-specific color signal either way and are left in Web experience/Campaigns rather than forced into Brand Evolution.

This is enough to build the "Brand Evolution" section the task asked for, showing old → new with the two clearest artifacts anchoring each end.

### Directed audit 3: Performance Marketing Systems / Visa video — reversed

**This is the most important correction.** Phase 1 concluded `motion-tripactions-travel-expense-hero.mp4` was Visa's co-marketing video, mis-homed on `/tripactions`, based on a text match between its `reel.json` entry ("TripActions × Visa") and Visa's own project summary. **Direct frame-by-frame inspection of the actual video file overturns this.** Extracted 24 sample frames across its full 30-second runtime: it shows TripActions push-notification mockups ("Hello Sam"/"Hello Tina," flight check-in reminders), travel lifestyle B-roll, a Las Vegas skyline, the TripActions Liquid card product UI ("tracks expenses," manual transactions, "Reimbursements Reimagined — Coming soon: TripActions × Coinbase"), and closes on explicit on-screen text: **"TripActions Liquid. Goodbye, Expense Management. Hello, Liquid. MONEY 20/20 — Visit us at Booth #2820."** This is a TripActions Liquid product/conference-booth promo video, not Visa co-marketing — no Visa branding, product, or messaging appears anywhere in it.

**Correction applied:** this video stays on `/tripactions`, retitled to reflect its actual content ("TripActions Liquid: Money 20/20 Launch," not the prior generic "Performance Marketing Systems video" title and not a move to Visa). It's grouped with the page's other 2 Liquid-campaign videos ("Goodbye Expenses, Hello Liquid," "Hello, Liquid") rather than left isolated or moved off the page. The `reel.json` entry's "TripActions × Visa" label and Visa-summary description text were also inaccurate and are corrected to match the video's real content.

**Consequence:** Visa's Adobe embed has **no verified local replacement** — Decision 3's embed stays in place, unresolved, exactly as flagged in Phase 1 (just for a different reason: not "no file was found," but "the one candidate file turned out not to be Visa's").

### Directed audit 4: BetterUp and Lyft asset search

- `web-portfolio/images/betterup/` (5 files: 4 deck/UI images + 1 high-res hero render) — all 4 checkable images were confirmed, by direct visual comparison, **already present** in `akintilo-portfolio`'s existing 19-image BetterUp gallery (re-encoded to WebP). No new content to copy.
- `web-portfolio/images/lyft/` — does not exist; confirmed again this session (zero Lyft files anywhere in that repository).
- Adobe Portfolio (`akintilo.com`) and Behance (`behance.net/ayodejiakintilo`) — **still unreachable from this session** (DNS resolution fails for both, re-tested this pass; `www-ccv.adobe.io`, the Adobe Behance video-embed host, returns `403` on the proxy's CONNECT tunnel). Cannot check either source for additional BetterUp or Lyft material. This remains an open item requiring Ayo's own browser access or an uploaded file, for both Decision 3 (Visa/Lyft embeds) and Decision 4 (BetterUp/Lyft new images).

### Decisions 6–15, applied as approved (no correction needed)

- **Events and Environments** category added; AppOmni/MongoDB/DocuSign/Navan/Apollo event work reclassified into it; no unrelated company work reclassified merely because the company also has event projects.
- **MongoDB pages** (`mongodb-the-next-generation-database`, `mongodb-web`) kept separate, retitled for distinct scope, cross-linked.
- **Navan rebrand/global-rollout and sales/presentation-systems sections**: dropped, not built as empty pages, per instruction.
- **Card spacing**: scoped-specificity fix applied (`.project-card .card-eyebrow` / `.project-card .card-summary`), not a rewrite of the `<p>` reset.
- **MongoDB Atlas animation**: replaced with the verified `web-portfolio` source, copied into the reorganized media folder.
- **CMS media routing**: Decap compatibility spike run first (see the CMS section below for the result).
- **Route names**: proposed slugs used as-is, aligned to existing media folder names.
- **Selected Work**: flags not yet changed — the approved process requires presenting exact swaps for Ayo's sign-off first (see the Selected Work section of this plan / `selected-work-recommendation.md` for the proposed swap). This does not block the rest of Phase 2.
- **Apollo**: 3 verified images copied from `web-portfolio`; the 4-company collage moved out of Apollo's folder to a shared cover location; the signage mockup kept and labeled as a mockup.
