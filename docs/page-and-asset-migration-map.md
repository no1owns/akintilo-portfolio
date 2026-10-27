# Page and asset migration map

Phase 1 deliverable. Maps every current route to its proposed destination under the project-led, company-collection architecture. **No routes change in Phase 1.** This is the plan `docs/portfolio-restructure-plan.md` references for "what moves where."

## Current routing, for reference

`site/scripts/prerender.mjs` generates 30 routes today: `''`, `about`, `resume`, `contact`, 4 category-alias routes (`brand-storytelling`→Brand Systems, `partnership-campaigns`→Partnerships, `technical-storytelling`→Technical Storytelling, `communications`→Communications, via the `aliases` map in `src/App.jsx`), the 21 project slugs, plus 1 unlisted route (`reel`, `noindex`/excluded from the sitemap). None of this changes structurally in Phase 1; the category-alias routes are untouched by the company-collection work (categories stay a secondary cross-company filter — see `project-content-audit.md`'s category audit).

## Asset folders: already migrated, not re-done here

`site/public/media/` was already reorganized into company/project subfolders in PR #4 (`docs/asset-migration-proposal.md`, approved 2026-10-27; full per-file mapping in `docs/asset-migration-ledger.md`, 458 rows). This document does not repeat that work — it's the trusted baseline. The folder tree already matches the company groupings this task asks for:

```
site/public/media/{appomni,secureframe,mongodb,docusign,navan,apollo,lyft,linx,meta-connect,betterup,lilt,loft,byron,lab}/...
```

What Phase 2 adds on top of this baseline is **route-level** (new company-collection pages, new standalone project pages split out of combined files) and a small amount of **new media** (the AppOmni events assets and the MongoDB Atlas animation identified in `external-asset-gap-audit.md`, both pending Ayo's approval) — not a re-migration of what's already in place.

## Route map: current → proposed

| Current route | Current title | Proposed destination | Action |
|---|---|---|---|
| `/brand-systems-and-web-performance` | Security Brand Experiences | **Splits into two company-owned pieces.** AppOmni's share (46 of 94 images, 4 of 9 videos per the verified 2026-10-09/10-10 branding pass) becomes AppOmni's web-experience content, linked from `/appomni`. Secureframe's share (the remaining 48 images/5 videos) becomes Secureframe's web-experience + brand-evolution content, linked from `/secureframe`. | **Retain the existing route as a compatibility page** until the split is built and verified (zero images lost, zero broken links) — see "Non-negotiable safeguards." Do not delete or redirect until both successor pieces exist and are confirmed complete. |
| `/ai-assisted-design-systems` | AI-Assisted Design Systems | Standalone case study, linked from the `/appomni` collection (exactly as currently structured — no content move needed, only a new inbound link from the collection page). | No route change. |
| `/meta-connect` | Meta Connect 2025 Developer Keynote | Standalone — Meta is a single-project company, no collection needed. | No route change. |
| `/tripactions` | Performance Marketing Systems | Standalone under the Navan/TripActions collection, linked from `/navan`. **Content fix needed first** — see project-content-audit.md row 3 (mis-homed Visa video, ungrouped ad campaign). | No route change; content edit only. |
| `/event-brand-experiential` | Event Brand and Experiential | **Source material for 4–5 new standalone event pages**, not a destination itself: Apollo GraphQL Summit (new `/apollo-graphql`), TripActions TRAVERSE '21 (new route, linked from `/navan`), MongoDB events (folds into MongoDB's events content, linked from `/mongodb`), DocuSign Momentum (new route, linked from `/docusign`), plus the newly-identified AppOmni events/booth material (new route, linked from `/appomni`, pending Ayo's show-name confirmation per external-asset-gap-audit.md). | **Keep the existing route live, unchanged, until every one of its 4 sections has a built, verified successor page.** Then convert it to a compatibility collection page (an index linking to the 4–5 new pages) rather than a hard redirect — the task's own instruction is "do not delete the existing page until every asset and piece of copy has a destination," and an index serves inbound links better than a 301 to a single arbitrary successor. |
| `/docusign-enterprise-campaign` | Enterprise Brand Campaigns | Standalone under DocuSign collection, linked from `/docusign` → "Campaigns and co-marketing." | No route change. |
| `/dream-big` | Global Rebrand Launch Experience | Standalone under MongoDB collection, linked from `/mongodb` → "Global rebrand launch experience" (task names this explicitly). | No route change. |
| `/mongodb-the-next-generation-database` | Modern UX for a Leading Developer Platform | Standalone under MongoDB collection → "Web experience." Possible overlap with `/mongodb-web` — flag for Ayo (see project-content-audit.md). | No route change. |
| `/linx-security` | Linx Brand Illustration System | Already exists, already in All Work, already published. No company collection needed (single-project company). | No route change. |
| `/visa` | Global Partnership Campaigns | Standalone under Navan/TripActions collection → "Partnership campaigns." Should also receive the mis-homed co-marketing video currently sitting on `/tripactions` (see content fix above). | No route change; content edit only. |
| `/microsoft-docusign` | Enterprise Integration Campaigns | Standalone under DocuSign collection → "Partnerships (Microsoft)." Preserve Microsoft/DocuSign attribution exactly. | No route change. |
| `/lufthansa` | Airline Partnership Experience Design | Standalone under Navan/TripActions collection → "Partnership campaigns." | No route change. |
| `/tripactions-visual-product-ux` | Frictionless Product Onboarding | Standalone under Navan/TripActions collection → "Web experience / product UX." | No route change. |
| `/mongodb-web` | Designing for a Developer Platform | Standalone under MongoDB collection → "Web experience." **Content fix needed first** — replace the static Atlas frame with the full animation, pending approval (external-asset-gap-audit.md, Finding 1). Possible overlap with `/mongodb-the-next-generation-database` — flag for Ayo. | No route change; content edit only. |
| `/mongodb-for-giant-ideas-video` | Innovation Without Limits | Standalone under MongoDB collection → "For Giant Ideas" video (task names this explicitly). | No route change. |
| `/loft` | Technical Concept Visualization | Standalone — single-project company. | No route change. |
| `/lilt-ebook` | Translation Transformation eBook | Standalone — single-project company. | No route change. |
| `/mongodb-internal` | Culture and Internal Brand Storytelling | **Not named in the task's MongoDB bullet list.** Recommend "Additional work" within the MongoDB collection unless Ayo wants it promoted to a named standalone section alongside Company Values Launch (same Communications category, adjacent subject matter). | No route change; placement within the collection is Ayo's call. |
| `/mongodb-beliefs-storyboard` | MongoDB Company Values Launch Campaign | Standalone under MongoDB collection → "Company values launch" (task names this explicitly). Preserve storyboarding/presentation design/communications design/original illustration attribution exactly. | No route change. |
| `/betterup-product-presentations` | Executive Presentation Systems | Standalone — single-project company. | No route change. |
| `/lyft` | Creative Communications for Lyft | Standalone — single-project company. | No route change. |

## New routes proposed (none created in Phase 1)

| Proposed route | Type | Sourced from |
|---|---|---|
| `/appomni` | Company collection | New page — introduces Ayo's AppOmni role, links `/ai-assisted-design-systems`, AppOmni's share of `/brand-systems-and-web-performance`, a new AppOmni events page (pending Ayo's confirmation of which shows), and Marlin AI/campaign content already present in the brand-systems file. **Gap flagged:** no AppOmni presentations/SKO/sales-enablement content was identified anywhere in this repository or `web-portfolio` this session — the task names this as a required grouping ("Presentations: SKO, product presentations, executive storytelling, sales enablement"), but no source material was found. Needs Ayo's input before this subsection can be built. |
| `/secureframe` | Company collection | New page — Secureframe's share of `/brand-systems-and-web-performance`. **Gap flagged:** the task asks for a "brand evolution" section distinguishing old vs. new Secureframe visual identity, labeled clearly. No old-identity assets were identified as such in this audit (nothing in the current content or `web-portfolio` is tagged "previous brand" vs. "rebrand") — needs Ayo's input on which assets (if any already in the 48-image Secureframe share) represent the prior identity, since guessing from appearance alone is explicitly disallowed by the task's safeguards. |
| `/mongodb` | Company collection | New page — links `/dream-big`, `/mongodb-the-next-generation-database`, `/mongodb-web`, `/mongodb-for-giant-ideas-video`, `/mongodb-beliefs-storyboard`, MongoDB's event-brand section, and (recommend) `/mongodb-internal` as Additional work. |
| `/docusign` | Company collection | New page — links `/docusign-enterprise-campaign`, `/microsoft-docusign`, and a new DocuSign Momentum page (from the event-brand split). |
| `/navan` | Company collection | New page — per the task's explicit instruction, uses `navan/` as the route/folder but preserves "TripActions" naming in all page copy. Links `/tripactions`, `/tripactions-visual-product-ux`, `/visa`, `/lufthansa`, and a new TRAVERSE '21 page (from the event-brand split). **Gaps flagged:** no content identified for "Navan rebrand and global rollout" or "Sales and presentation systems," both named in the task's bullet list. Needs Ayo's input. |
| `/apollo-graphql` | Standalone page (not a full collection — task says "evaluate a standalone page") | New page, sourced from the Apollo GraphQL Summit section of `/event-brand-experiential` (12 images currently in `apollo/event-brand-experiential/`, pending the count-discrepancy check in external-asset-gap-audit.md). |
| New route for AppOmni events (name TBD, e.g. `/appomni-events` or nested under `/appomni`) | Standalone or collection-nested | New page, sourced from the 10 `event-appomni-*` files + `hero.png` found in `web-portfolio` (external-asset-gap-audit.md, Finding 2). Blocked on Ayo confirming show attribution (Black Hat/RSA/Cisco Live) before publishing any show-name claim. |
| New route for TripActions TRAVERSE '21 | Standalone, linked from `/navan` | Sourced from the TripActions section of `/event-brand-experiential`. |
| New route for DocuSign Momentum | Standalone, linked from `/docusign` | Sourced from the DocuSign section of `/event-brand-experiential`. |

## Redirect / compatibility recommendations

- **No existing route is deleted or redirected in Phase 1 or at the start of Phase 2.** Every current route in the table above either stays exactly as-is (most rows) or gets a documented split (`/brand-systems-and-web-performance`, `/event-brand-experiential`) where the *old* route remains live as a compatibility page until its successors are built and verified.
- Once `/brand-systems-and-web-performance`'s split is complete and approved, recommend it become a **redirect to `/appomni`** (AppOmni is Ayo's current role and the stronger landing destination per the existing "AppOmni-first" ordering decision in `portfolio-decisions.md`'s 2026-09-20 entry) rather than staying live as a combined page — but only after Ayo confirms both successor pieces are complete. Not applied this phase.
- Once `/event-brand-experiential`'s 4–5 sections have verified successor pages, recommend it become an **index/compatibility collection** (not a single-target redirect, since it currently serves 4+ distinct audiences) linking out to the new event pages. Not applied this phase.
- `scripts/prerender.mjs`'s `routes` array and `sitemap.xml` generation need updating whenever new routes are added — flagged here as a Phase 2 build-script change, not content.

## What this map does not resolve (left to Ayo, not guessed)

1. Where exactly `/mongodb-internal` sits (named standalone vs. Additional work).
2. AppOmni Presentations section — no source content identified.
3. Secureframe brand-evolution (old vs. new identity) — no assets confidently distinguishable without Ayo's input.
4. Navan rebrand/global rollout and Sales/presentation systems — no source content identified.
5. Exact route slugs for the 3 new standalone event pages and the company-collection pages above (`/appomni`, `/secureframe`, `/mongodb`, `/docusign`, `/navan`, `/apollo-graphql` are proposed, not final).
