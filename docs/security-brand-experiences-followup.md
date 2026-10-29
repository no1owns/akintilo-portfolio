# Security Brand Experiences — follow-up decision (not actioned)

Written during the `claude/portfolio-content-corrections` content-correction pass, per an explicit instruction not to restructure `/brand-systems-and-web-performance` in that batch. This page was intentionally left untouched. It is documented here for Ayo's review, not acted on.

## Why this is now a decision point

`/brand-systems-and-web-performance` ("Security Brand Experiences") predates the company-collection restructure and still carries the full AppOmni + Secureframe media library directly on one page (94 images, 9 videos, both companies' sections). Since that restructure, the same material is now also reachable through the dedicated `/appomni` and `/secureframe` collection pages. The project page is live, `featured: true`, and sits at `order: 0` — the first card in Selected Work — so it is not an edge case; it's prominent and partly redundant with newer, better-organized pages.

## Three open questions, for Ayo to decide

1. **Should it become a simple company-choice index?** Instead of hosting the full media library itself, the page could be trimmed to a short framing paragraph plus two links out to `/appomni` and `/secureframe` — similar in spirit to how `/event-brand-experiential` now works as a per-company index. This would remove the duplication without losing any content, since everything would still live on the two collection pages.
2. **Should it be removed from Selected Work?** With `/appomni` and `/secureframe` now able to carry that material on their own collection pages, Security Brand Experiences' `order: 0` Selected Work slot could go to a different project, or the page could stay in Selected Work in a trimmed (index) form. This interacts with `docs/selected-work-recommendation.md`'s existing proposed 8-project lineup — that proposal already assumes Security Brand Experiences stays as-is; this question would need to be reconciled with it before any lineup change ships.
3. **Should it redirect once content parity is confirmed?** If the page is converted to an index or removed from Selected Work, a later step could redirect `/brand-systems-and-web-performance` to `/appomni` (or retire it) once every image/video on it is confirmed to exist on the two collection pages with equal or better framing. That parity check hasn't been done — it would be the first step of implementing this, not something to assume.

## What this pass did and did not do

- Did not edit, restructure, trim, or redirect `/brand-systems-and-web-performance` in any way.
- Did not change its `featured` flag, `order`, or Selected Work status.
- Did not change `docs/selected-work-recommendation.md`'s existing proposed lineup.

No action should be taken on any of the three questions above without Ayo's explicit go-ahead.
