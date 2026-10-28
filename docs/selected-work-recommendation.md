# Selected Work recommendation

Phase 1 deliverable. Reviews the current 8 `featured: true` projects against the task's criteria. **No change to the featured lineup is made this phase** — the task is explicit that Selected Work changes wait for Phase 2 approval.

## Current Selected Work (8, confirmed via `jq` against `site/content/projects/*.json`)

In homepage render order (`order` field):

| Order | Project | Company | Category | Visual evidence | Strategic depth | Verified outcomes |
|---|---|---|---|---|---|---|
| 0 | Security Brand Experiences | Secureframe / AppOmni | Brand Systems | Strongest on the site — 94 images, 9 videos, individually verified | High — two companies' full brand/web systems in one page | Yes — 3 quantified outcomes, the only project with more than one | 
| 0.5 | AI-Assisted Design Systems | AppOmni | Brand Systems | Good, but partial — section 4 is missing (blocked on assets) | High — directly demonstrates AI-assisted workflow, a distinct hiring signal from the rest of the catalog | Yes — "10 days to 3 days" |
| 1 | Meta Connect 2025 Developer Keynote | Meta | Brand Systems | Strong — 27 images, single engagement, tightly scoped | Medium-high — single marquee brand name (Meta), narrative/storyboarding/deck-design range | No |
| 2 | Performance Marketing Systems | TripActions | Brand Systems | Strong, but currently disordered (see project-content-audit — one mis-homed video, ungrouped ad campaign) | Medium — campaign-system range (travel, cards, expense) | No |
| 4 | Enterprise Brand Campaigns | DocuSign | Brand Systems | Good — 6 galleries + 1 video | Medium — enterprise campaign/comms range | No |
| 5 | Global Rebrand Launch Experience (Dream Big) | MongoDB | Brand Systems | Good — 5 galleries | Medium — live-experience/rebrand range | No |
| 6 | Modern UX for a Leading Developer Platform | MongoDB | Brand Systems | Strongest single-project image-ratio range on the site | Medium-high — developer-platform UX, distinct from the rest of the brand-heavy lineup | No |
| 10 | Frictionless Product Onboarding | TripActions | Technical Storytelling | Good — 4 galleries | Medium-high — the only pure product-UX entry in Selected Work | No |

## Assessment against the task's criteria

**Range across brand, web, events, presentation, systems, product storytelling, and AI-assisted workflows.** The current 8 are heavily weighted toward Brand Systems (6 of 8) and skew brand/campaign-first. Missing from Selected Work entirely: **events** (Event Brand and Experiential is `featured: false`, demoted 2026-10-26 specifically to make room for the AI case study — `docs/portfolio-decisions.md`), **presentation systems** (Executive Presentation Systems / BetterUp is `featured: false`), and **partnerships** (none of the 3 Partnership-category projects are featured). Technical Storytelling has exactly one representative (Frictionless Product Onboarding); Communications has zero.

**Leadership and creative-direction evidence.** Strong across the current 8 — every one of them carries a Director/Creative Director-level role string except AI-Assisted Design Systems (Senior Visual Designer) and Security Brand Experiences (Principal Designer / Senior Visual Designer, which is itself two roles for two companies).

**Quality of visual evidence.** Uneven, but not due to any project being weak — Security Brand Experiences and Modern UX for a Leading Developer Platform are the clear top two by volume/range; the rest are solid mid-size galleries with no outstanding media quality problems.

**Verified outcomes.** Only 2 of the current 8 (Security Brand Experiences, AI-Assisted Design Systems) carry quantified outcomes. This matches the sitewide pattern documented in `content-and-asset-inventory.md` — only 1 of 21 projects total had quantified outcomes as of the 2026-10-01 audit, since outcomes are never invented. Not something Selected Work curation can fix on its own; it's a content-population gap that applies regardless of which 8 projects are chosen.

## Recommendation: once company collections exist, re-evaluate for range — don't act on this yet

Two structural facts change the calculus for Phase 2, so this phase stops short of proposing a specific new lineup:

1. **Once projects are grouped into company collections, "Selected Work" should probably feature a mix of standalone case-study pages and company-collection links, not only individual projects** — except the task is explicit that "Selected Work must contain individual projects, not vague company groupings." That constraint is honored here: any revised lineup should stay project-level, with company collections doing the "broader work" job elsewhere on the homepage.
2. **Two currently-unfeatured projects are the strongest candidates to add range**, if Ayo wants to trade something out in Phase 2:
   - **Event Brand and Experiential** (or whichever of its post-split successor projects — e.g. a standalone Apollo GraphQL Summit or TripActions TRAVERSE page — has the strongest individual case for it) would restore event-work representation, which the current 8 lack entirely.
   - **Executive Presentation Systems (BetterUp)** would add presentation-systems range and a 3rd company outside the AppOmni/MongoDB/TripActions cluster that otherwise dominates Selected Work (6 of 8 current picks are AppOmni, Meta, TripActions×2, DocuSign, or MongoDB×2 — genuinely varied by company already, but presentation-format work specifically is absent).
   - **Linx Brand Illustration System** is also worth evaluating (see below) — it's a different medium (illustration system + custom GPT tool) from anything else in the current 8, which would add format range (not just company range).

**No specific swap is recommended as final** — this is a shortlist for Ayo to react to, consistent with the task's "do not change the featured lineup during Phase 1" instruction. The actual trade-off (what comes out if something goes in, since the task doesn't ask to simply grow past 8) is Ayo's call.

## Linx status (task item 4)

Linx (`/linx-security`) already exists, is already published (since 2026-10-26, contrary to `site/README.md`'s stale "draft" note — see project-content-audit.md), and is already in All Work. It is **not** currently featured. Content is solid: a scalable botanical illustration system plus a custom AI tool ("Linx Brand Illustrator" GPT), framed accurately as "Exploratory engagement, Forge HQ" (not formal employment — confirmed language, not invented), with all 16 images individually viewed and captioned per `docs/portfolio-decisions.md`'s 2026-10-26 entry.

**Recommendation: evaluate it for Selected Work, but don't assume it must replace anything specific.** It's a strong, distinct addition on medium/format grounds (illustration system + AI tooling, which nothing else in the current 8 directly represents), but "exploratory engagement" is also a materially different relationship than the W-2/full-time and Forge HQ-client work that makes up the rest of the catalog — worth Ayo weighing that framing against how prominently he wants it positioned, rather than this audit asserting a verdict either way.

## Summary table: shortlist for Ayo's Phase 2 decision

| Candidate | Currently featured? | What it would add to Selected Work |
|---|---|---|
| Event Brand and Experiential (or a post-split successor) | No | Event-work representation (currently zero) |
| Executive Presentation Systems (BetterUp) | No | Presentation-format range + a non-AppOmni/MongoDB/TripActions/DocuSign/Meta company |
| Linx Brand Illustration System | No | Illustration-system + AI-tooling format range |

No change made to `featured` flags this phase.

## Phase 2: proposed exact swap (approval gate — flags not yet changed)

Per Ayo's approval of Decision 11 ("include one strong event project; include either BetterUp Executive Presentation Systems or Linx Brand Illustration System; present the exact proposed swap before applying flags"), here is the specific proposal:

**Add:**
- **Apollo GraphQL Summit** (new standalone page, built this pass from the Apollo section of `/event-brand-experiential` plus 3 newly-copied `web-portfolio` images) — the strongest single self-contained event case study available: real conference branding, booth photography, stage-presentation screens, and a signage design mockup, all for one coherent event rather than a multi-company umbrella. This is the "one strong event project" slot.
- **Linx Brand Illustration System** (`/linx-security`, existing) — chosen over BetterUp Executive Presentation Systems because it adds a *medium* the current 8 lack entirely (illustration system + custom AI tooling), not just a different company. BetterUp remains a reasonable alternative if Ayo prefers presentation-format range over illustration-format range instead.

**Remove:**
- **Global Rebrand Launch Experience** (Dream Big, MongoDB) — MongoDB keeps strong Selected Work representation through "MongoDB Web Design System" (retitled from "Modern UX for a Leading Developer Platform" in commit 4 of this pass — same project, `mongodb-the-next-generation-database`), which has the widest image-ratio range on the site; removing Dream Big reduces redundancy within one company rather than cutting a company entirely.
- **Enterprise Brand Campaigns** (DocuSign) — DocuSign stays fully visible in All Work and gets its own new `/docusign` collection page; this is the one full removal (no other DocuSign project replaces it in Selected Work this round).

**Resulting lineup (8):** Security Brand Experiences · AI-Assisted Design Systems · Meta Connect 2025 Developer Keynote · Performance Marketing Systems · MongoDB Web Design System (`mongodb-the-next-generation-database`) · Frictionless Product Onboarding · Apollo GraphQL Summit (new) · Linx Brand Illustration System.

**This swap is proposed, not applied.** No `featured` flag changes until Ayo confirms this exact lineup (or an adjusted one). This gate does not block any other Phase 2 work — the Apollo page, Linx's existing state, and every other change proceed regardless of the outcome here.
