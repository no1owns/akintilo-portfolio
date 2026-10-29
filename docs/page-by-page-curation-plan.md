# Page-by-page curation plan — Phase 1 (recommendations only, nothing applied)

Guideline used throughout, per the task: one strong hero, 6–12 core assets for a focused project, additional images only when they show a distinct format/stage/contribution, and company collections should preview and connect projects rather than repeat every detail-page asset. This is a guideline, not a hard rule — several pages below legitimately sit outside it (a single-event page has less to show than a multi-year brand system, and that's fine). Nothing recommended here removes work that lacks a standalone page; where a page is over-guideline, the suggestion is to retire redundant copies or move process material to Additional Work, never to delete unique evidence.

Current counts (images + videos actually referenced, reel-only appearances excluded) are from `docs/media-asset-ledger.csv`.

## Pages significantly over guideline

### `/brand-systems-and-web-performance` ("Security Brand Experiences") — 109 assets (100 img, 9 vid)
By far the largest page on the site, and the core input to the open Security Brand Experiences structural question (`docs/security-brand-experiences-followup.md`). ~97 of its assets are *also* rendered on `/appomni` or `/secureframe`. Curation here is gated on that structural decision, not a simple "trim it" call:
- **If it becomes a company-choice index** (one of the three options already on the table): its own asset count drops to near zero by design, and this whole section resolves itself.
- **If it stays a standalone page**: recommend keeping it as the "hero or defining asset" tier only — the strongest ~15–20 images (the ones already singled out in prior passes: the 8-segment homepage screenshot, the Marlin AI launch video, the booth/keynote highlights) — and moving the remaining ~80 generic dashboard/UI screenshots to Additional Work or removing them from the *rendered gallery* (not deleting the files) in favor of the collection pages, which already show the same material in better-organized sections.
- Two internal duplicate pairs live here independent of the structural question (see curation audit §4) and should be resolved regardless of which path is chosen.

### `/secureframe` and `/appomni` collections — 53 assets each (49 img, 4 vid each)
Same root cause as above. As *collection* pages, their job per the task's own guideline is to "preview and connect projects, not repeat every asset" — at 53 assets each, both are currently doing the opposite (they're full galleries, not previews). Recommend, once the structural question above is settled: cut each collection's own gallery to a representative preview (6–10 images spanning web/brand/campaign/event) and let the linked project pages (AI-Assisted Design Systems, AppOmni Events, etc.) and, if kept, `/brand-systems-and-web-performance` carry the full depth.

### `/performance-marketing-systems` (`tripactions.json`) — 29 assets (22 img, 7 vid)
Legitimately a multi-campaign page (card launch, brand ads, "Let's go" spots) — some over-guideline length is justified by genuinely distinct campaigns. No duplicate or misattribution issues found here. If trimming, the first candidate is the 10-image product/UI gallery in the second block, which reads as fairly repetitive dashboard/app screenshots; the video content (7 distinct spots) is the strongest, most differentiated evidence and should stay intact.

### `/meta-connect` — 27 assets (all images)
A single, tightly-scoped engagement with no videos. 27 stills for one event is on the high side for the guideline. No duplicates found via hash (the only exact-dupe pair found elsewhere — meta-connect-08/13 — *is* in this gallery and should be resolved here specifically). Recommend a light pass: keep the strongest ~15–18 images spanning stage design, signage, and presentation screens; move redundant crowd/venue-establishing shots to Additional Work if the company ever gets its own collection page.

### `/mongodb-for-giant-ideas-video` ("For Giant Ideas") — 23 assets (22 img, 1 vid)
A single brand film with 22 supporting stills. Given the page is now framed as a focused cinematic brand story (not a multi-workstream case study), 22 stills is more than the story needs — recommend keeping a tight sequence (hero stills + the 5–6 strongest frames showing distinct visual beats) and trusting the video itself to carry most of the narrative.

### `/mongodb-the-next-generation-database` ("Design Systems for a Developer Platform") — 22 assets
Already flagged in prior passes for its 2 wide-aspect-ratio screenshots (confirmed legitimate, not a duplication issue). At 22 images across a wide design-system scope (web, product, print), this is plausibly justified by breadth — no action recommended beyond what's already been reviewed.

### `/betterup-product-presentations` — 20 assets (all images, stage-photographed decks)
20 presentation-deck stills for one case study is dense. Recommend identifying the 8–10 slides that show the most distinct storytelling moments (not just "another deck slide") and moving the rest to Additional Work or trimming them from the rendered gallery.

### `/mongodb-web` ("Launching Stitch and Atlas") — 18 assets (16 img, 2 vid)
One perceptual near-duplicate pair flagged (`5d63296aaf9fa184.webp` / `f18d80655dcf16aa.webp`, not individually re-confirmed) — worth a quick look. Otherwise within reasonable range for a two-launch campaign page.

### `/microsoft-docusign` — 17 assets, `/linx-security` — 17 assets, `/mongodb-beliefs-storyboard` — 17 assets, `/tripactions-visual-product-ux` — 17 assets
All four sit just above the 6–12 guideline but each tells a single, cohesive story (one partnership campaign, one illustration system, one storyboard sequence, one product-UX flow) without obvious padding or duplication found in this audit. No specific trims recommended without a closer per-image pass than Phase 1 covers — flagged as "slightly over guideline, not obviously padded."

### `/docusign-enterprise-campaign` — 16 assets (15 img, 1 vid)
Within reasonable range; no issues found.

### `/apollo-graphql`, `/mongodb-events` — 14 assets each
Within reasonable range for their scope.

## Pages at or near guideline

`/docusign-momentum` (12), `/lilt-ebook` (10), `/visa` (10 — see curation audit §1 for the attribution concern this count doesn't resolve on its own), `/traverse-21` (9), `/ai-assisted-design-systems` (9), `/dream-big` (8 — already trimmed in the prior pass), `/lufthansa` (8), `/appomni-events` (8 — already restructured in the prior pass), `/lyft` (7) — all read as appropriately scoped for what each page is telling. No changes recommended.

## Pages that could use more (not a request to pad with filler)

- **`/mongodb-internal`, `/loft`** — 5 assets each. Thin, but both are smaller-scope engagements; per the task's own instruction, don't pad with repetitive or low-evidentiary-value filler just to hit a number. If more *genuinely distinct* material exists (check with Ayo), add it; otherwise 5 well-chosen images is better than 10 padded ones.
- **`creative-systems-toolkit`** (Design Utilities) — 6 assets, each already distinct (button lab, token export, dot pattern × 2, logo placement, WebP export demo). No gap here — this is the guideline working as intended.

## Company collections: preview-and-connect check

- **`/mongodb` collection** — `blocks: []`, 1 direct media reference (its own cover). Currently functions purely as a project-card index (7 linked projects) with no narrative gallery of its own — this is **exactly** the "preview and connect" pattern the task asks for. No change needed.
- **`/docusign` collection** — same pattern, `blocks: []`, 1 reference.
- **`/navan` collection** — same pattern.
- **`/appomni` and `/secureframe` collections** — the exception; see "Pages significantly over guideline" above.

## Additional Work candidates (not removing anything, only suggesting placement)

Work that doesn't have a standalone page today and surfaced during this audit as worth a placement decision:
- The ~80 non-hero AppOmni/Secureframe screenshots discussed above, if `/brand-systems-and-web-performance` is trimmed per the structural decision.
- `event-secureframe-01.PNG` (new Secureframe event photo) — either its own small events mention or Additional Work on the Secureframe collection page.
- DocuSign '14/London Momentum material, if Ayo doesn't want it folded into the main Momentum narrative.

No work item identified in this audit should be deleted for lacking a standalone page — every candidate above has an Additional Work or collection-page path available.
