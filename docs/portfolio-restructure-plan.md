# Portfolio restructure plan — Phase 1

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
