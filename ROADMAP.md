# Roadmap

Living roadmap for replacing Adobe Portfolio with `akintilo-portfolio`. Updated as work lands — see `docs/portfolio-decisions.md` for the reasoning behind specific calls, and `docs/content-and-asset-inventory.md` for the full project-by-project audit this roadmap is drawn from.

## Launch blockers

Must resolve before Phase 4 (domain migration). Ordered by severity.

1. **Two draft projects have placeholder content.** `linx-security.json` and `mongodb-beliefs-storyboard.json` both contain literal `[CONFIRM: ...]` text in `company`/`summary` fields. They are correctly marked `published: false`, so they aren't live, but they can't launch until Ayodeji confirms client/scope/attribution or the drafts are removed.
2. **"Event Brand and Experiential" has weak content structure.** One combined project spans TripActions, MongoDB, and DocuSign work with a single generic overview paragraph, zero outcomes, and no internal section headings — unlike the AppOmni/Secureframe project, which already separates its two companies cleanly. web-portfolio suggests this may originally have been (at least) 4 distinct stories (MongoDB World, Navan, DocuSign Momentum, Apollo Summit). Needs a decision: split into separate projects, or add labeled sections like AppOmni/Secureframe. See open question in the inventory doc.
3. **Site settings are placeholder/blank.** `siteUrl`, `email`/`contactUrl`, and `resume` are all empty in `site/content/settings.json`. The prerender script intentionally suppresses indexing while `siteUrl` is blank, and the Contact page shows a "will be added before launch" message — this is working as designed, but it means the site cannot go live as-is.
4. **Outcomes are populated on only 1 of 19 projects.** Only the AppOmni/Secureframe case study has quantified outcomes. The brief calls for outcomes to be "visually scannable" across projects; right now that's true for one project and silently absent (not broken, just empty) on the other 18. Needs Ayodeji to supply metrics where they exist, or an explicit decision to launch without outcome chips on projects that don't have them.
5. **Mobile layout has not been verified.** `site/design-qa.md` explicitly lists this as outstanding. Responsive CSS exists (breakpoints at 800px/560px) but hasn't been checked in a real mobile browser.
6. **4 videos still depend on Adobe's Behance embed player** (`www-ccv.adobe.io`) with no located local original. Not necessarily a blocker to launch (they work today), but it is an unresolved Adobe dependency the brief asks to identify and, where possible, replace.

## Launch improvements

Worth doing before or shortly after launch, not blocking.

- Copy the 19 videos currently referenced from `work.akintilo.com` into `site/public/media/` and repoint the JSON. Originals confirmed present in `web-portfolio/images/` (~130 MB total) — see inventory doc for the file list and a note on re-compression before committing that much video.
- Roll the justified-grid layout out to more projects, one batch at a time, after Ayodeji reviews the single-project prototype (`mongodb-the-next-generation-database`). Second candidate to convert: `event-brand-experiential` once its content-structure blocker above is resolved (it has the site's only true mobile-portrait screenshots, a case the current prototype doesn't cover).
- Add a lightbox for gallery images generally, not just the justified-grid prototype — currently no gallery on the site supports opening an image full-size. (A working, dependency-free implementation already exists in `web-portfolio/case-study-nav.js` and is worth adapting rather than rewriting from scratch.)
- Fix `prefers-reduced-motion` handling for autoplaying looped videos (currently only CSS transitions respect it).
- Resolve the AppOmni/Secureframe overview-vs-body ordering inconsistency noted in `docs/portfolio-decisions.md` (cosmetic, not factual).

## Post-launch improvements

- Add `schema.org` structured data to project pages (web-portfolio's case-study pages have this; akintilo-portfolio currently doesn't).
- Lighthouse/performance pass once real hosting and `siteUrl` are in place.
- Revisit whether any of the 9 "uniform-recommended" small/single-image galleries in the inventory doc would read better as `full-width` instead.

## CMS work (Phase 5 — do not let this delay the Adobe replacement)

- The Decap-based `/admin/` editor already exists and reads/writes the same `site/content/*.json` schema that will remain the system of record — no separate CMS data model is planned.
- Online (non-local) publishing needs a Decap-compatible GitHub OAuth service (`VITE_CMS_AUTH_URL`) that isn't configured yet. This is explicitly out of scope until after the public replacement is stable.

## Items requiring Ayodeji's decision

- Should "Event Brand and Experiential" be split into separate projects (MongoDB World, Navan, DocuSign Momentum, Apollo Summit) or kept as one project with labeled sections, matching the AppOmni/Secureframe pattern?
- Is the MongoDB IPO Launch story (NASDAQ, 2017) real, launch-worthy content that should be added as a new project? If so, what are the actual, verifiable metrics — the numbers found in `web-portfolio` (34% stock pop, 30% drop-off reduction, 20% cycle time reduction) were **not** independently verified this session and should not be assumed accurate.
- For the 4 Adobe-embedded videos (Visa, Designing for a Developer Platform, Innovation Without Limits, Lyft): are original files available to replace the Adobe embed, or should the embed remain?
- Confirm client/scope/attribution for `linx-security` and `mongodb-beliefs-storyboard` so those drafts can be finished or dropped.
- Review and approve (or redirect) the justified-grid prototype on `mongodb-the-next-generation-database` before it's rolled out to any other project.
- Supply real values for site settings before launch: `siteUrl` (final domain), contact email or URL, résumé PDF.
