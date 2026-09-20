# Launch checklist

This is the Phase 3 (Launch QA) checklist referenced by `ROADMAP.md`. Nothing below has been checked off yet unless noted — this document was created during the initial audit (2026-09-20), before the visual-refinement phase started. Update it in place as items are verified; don't create a second copy.

## Before any item below: real launch blockers must clear first

See `ROADMAP.md` → "Launch blockers" (as of the 2026-09-20 correction pass, just two: blank site settings, and sitewide mobile verification). The two draft projects, the outcomes-population gap, and the "Event Brand and Experiential" structure are **not** blockers — see `ROADMAP.md`'s "Deferred content" and "Launch improvements" sections — so QA does not need to wait on them.

## Build and content integrity

- [x] `npm ci` succeeds from `/site` on Node 22 (verified 2026-09-20)
- [x] `npm run build` succeeds from `/site` (verified 2026-09-20 — 25 routes + 404 prerendered)
- [x] `npm run test:sites` passes (4/4, verified 2026-09-20)
- [x] No tracked `.DS_Store` files anywhere in the repo (fixed 2026-09-20)
- [x] Content-reading scripts explicitly filter for `*.json` rather than reading every file in `content/projects/` (already true in `prerender.mjs`, `optimize-media.mjs`, and `App.jsx`'s `import.meta.glob`)
- [ ] `site/content/settings.json` has real values for `siteUrl`, `email` or `contactUrl`, and `resume` (all currently blank — see `ROADMAP.md`)
- [x] All 19 project JSON files reviewed for `[CONFIRM: ...]` placeholder text — 2 found (`linx-security.json`, `mongodb-beliefs-storyboard.json`), both correctly unpublished and not linked anywhere in the app; not a launch blocker (see `ROADMAP.md`)

## Desktop rendering

- [ ] Homepage hero, filters, and project grid render correctly at 1920px, 1440px, and 1280px widths
- [ ] Every published project's hero image, overview, and outcomes (where present) render without layout breakage
- [ ] Gallery blocks (bento today, justified on the prototype project) render without overlapping figures or broken aspect ratios
- [ ] Video blocks show controls, respect poster images, and do not autoplay with sound
- [ ] Adobe-embedded videos (Visa, mongodb-web, mongodb-for-giant-ideas-video, Lyft) load and play

## Tablet rendering

- [ ] Homepage and project pages checked at ~768–1024px (iPad portrait/landscape)
- [ ] `.project-grid` and `.gallery` column collapses (from `columns-3`/`columns-2` down) look intentional, not just "whatever CSS grid did"

## Mobile rendering

- [ ] Explicitly called out as outstanding in `site/design-qa.md` — has not been done yet as of this audit
- [ ] Nav menu toggle (`.menu-toggle`) opens/closes correctly and is reachable by keyboard
- [x] Justified-grid prototype checked at 390×844 via headless Chromium (2026-09-20) — rows stay compact, no blown-out row heights, no console errors. Still needs a real-device pass, not just headless.
- [ ] Video blocks and Adobe embeds checked on mobile Safari and Chrome (iframe embeds and native `<video>` behave differently across mobile browsers)

## Accessibility

- [ ] Skip-to-content link (`.skip`) works
- [ ] All images have meaningful `alt` text (currently editor-supplied per image; spot-check a sample of the 19 projects rather than assuming)
- [ ] Category filter buttons expose `aria-pressed` correctly (implemented in code — verify in a screen reader)
- [ ] Video "Load video" buttons for untrusted-host iframes are reachable and labeled (implemented in code — verify)
- [ ] `prefers-reduced-motion: reduce` is respected — currently only disables CSS transitions; autoplaying looped `<video>` elements (`autoPlay={loop} muted={loop}`) do **not** currently check for reduced-motion. Flagged as a gap, not yet fixed.
- [ ] Color contrast spot-checked against WCAG AA (body text is `#555`/`#666` on white in several places — verify against the 4.5:1 threshold at the sizes used)

## SEO and metadata

- [ ] `site/content/settings.json.siteUrl` set to the final domain before launch (prerender explicitly suppresses canonical links, sitemap, and indexing while it's blank — this is intentional, not a bug)
- [ ] Per-project `<title>`/`<meta description>`/OG tags spot-checked once `siteUrl` is set (logic already exists in `scripts/prerender.mjs`)
- [ ] `sitemap.xml` and `robots.txt` regenerate correctly once `siteUrl` is set
- [ ] Structured data (schema.org) — web-portfolio's case-study pages include `CreativeWork` JSON-LD; akintilo-portfolio currently does not. Decide whether to add before or after launch (post-launch improvement, not a blocker).

## Performance

- [ ] Lighthouse or equivalent pass once `siteUrl` is set and hosting is live
- [ ] Confirm lazy-loading (`loading="lazy"`) is working across gallery images in the browser network panel, not just present in markup
- [ ] Video file sizes reviewed before the ~130 MB of `work.akintilo.com`-hosted originals are copied in (see `content-and-asset-inventory.md`) — may need re-compression, not a straight copy

## Media

- [ ] Every changed image/video URL loads (re-check after any media migration batch)
- [ ] Poster images present for all local `<video>` blocks that have one available
- [ ] Adobe-hosted embeds (4 total) still resolve — flag immediately if `www-ccv.adobe.io` becomes unreachable, since there's no local fallback for those four yet

## Cross-browser

- [ ] Chrome, Safari, Firefox — desktop
- [ ] Mobile Safari (iOS) and Chrome (Android)
- [ ] External video links (YouTube/Vimeo trusted-host iframes) tested in each — called out as outstanding in `site/design-qa.md`

## GitHub Pages / deployment

- [ ] Review the GitHub Actions workflow run after every push to confirm it completed successfully — do not report a deploy as done from the push alone
- [ ] Verify the live preview reflects the pushed commit (check a visible content change, not just workflow "success")
- [ ] Confirm GitHub Pages is serving at the domain root (required, since routes/assets are absolute paths starting with `/` — the default `/akintilo-portfolio/` project path will not work, per `site/README.md`)
