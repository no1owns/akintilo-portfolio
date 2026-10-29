# Media migration plan — Phase 1 proposal (not implemented)

This is a proposal for a future Phase 2 execution pass. Nothing in this document has been applied — no file was moved, renamed, copied, deleted, compressed, or converted, and no content JSON was changed to implement any of it.

## Naming convention (proposed)

`site/public/media/{company}/{project-slug}/{descriptive-name}.{ext}`

- `{company}` and `{project-slug}` already match this pattern almost everywhere; no folder restructuring is proposed.
- `{descriptive-name}` replaces the 16-character hex filename (~73% of current files) with a short, lowercase, hyphenated description derived from the asset's own alt text, e.g. `73210c14a4911ab5.webp` (alt: "Secureframe compliance dashboard with a 'View history' dialog open over a Risk Management table") → `secureframe-dashboard-risk-management-view-history.webp`.
- Multi-part assets keep their existing suffix convention (`-seg1` through `-seg8`, `-poster`) rather than inventing a new one.
- Rename only when a file is already being touched for another reason (content correction, new upload, dedup resolution) — a dedicated rename-everything pass isn't proposed; the churn-to-value ratio is poor for files nobody is currently editing, and git history/blame gets needlessly scrambled across hundreds of files for a cosmetic change.
- The full computed proposed name for every current file is in `docs/media-asset-ledger.csv` (`proposed_canonical_path` column), so a future pass can apply it file-by-file without re-deriving it.

## Video posters and animated assets

- **Every video block with `playback: "controls"` should have an explicit WebP poster.** This is already the pattern for the 4 TripActions videos that have one; it should extend to the ones that currently rely on the browser's default first-frame behavior (inconsistent across browsers and sometimes shows a black/blank frame before decode).
- **`playback: "loop"` videos don't need a poster** (they autoplay immediately) — no change proposed there.
- **Animated GIFs are already converted to animated WebP site-wide** per the 2026-10-22 pass; this rule should simply continue: any newly-supplied GIF gets converted to animated WebP (`ffmpeg -loop 0 -lossless 0 -q:v 80 -compression_level 6 -an`) before it's referenced anywhere, with the original moved to `../../original-portfolio-media/` (the existing sibling archive), never deleted.

## Source originals vs. optimized web derivatives

- Follow the existing `source-originals/` pattern (seen today under `secureframe/brand-systems-and-web-performance/source-originals/`) whenever a derivative is a crop, segment, or heavy recompression of something worth keeping in full: put the original in a `source-originals/` subfolder next to the derivatives, never delete it, never reference it directly from content JSON.
- Everything actually rendered stays web-optimized WebP (images) or compressed MP4 (video), matching current practice.

## Recording source provenance

Add one optional field to the existing project/collection JSON schema rather than a separate database:

```json
"sourceProvenance": "web-portfolio"   // or "direct-upload", "behance", etc. — free text, optional, not rendered
```

This is enough to answer "where did this come from" without exposing anything internal or private — it's a short tag, not a URL, credential, or path into a private system. It's optional and invisible to visitors (not rendered anywhere in `App.jsx`), purely a maintenance aid surfaced in the CMS and in the audit script below. Simpler than a database: it's just another field on content that already lives in git, versioned and diffable like everything else.

## CMS upload behavior

No change needed to the actual upload mechanism — `site/admin/editor.js` already routes uploads through `media_folder`/`public_folder` templates keyed on each collection's own `companyFolder` and `slug` fields (confirmed previously by reading the installed `decap-cms-core` source), so new uploads already land in the correct `{company}/{project}` folder automatically. The one gap: Decap doesn't enforce the descriptive-filename convention above — a photographer dragging in `IMG_4821.jpg` still lands with that filename. Proposed fix, low-effort: a short naming hint already exists in several field definitions (e.g. `companyFolderField`'s hint text) — add a similar hint on the image/gallery fields themselves reminding the editor (Ayo) to rename the file before upload when convenient. This is a UX nudge, not an enforced rule; nothing in Decap's config can force a rename without a custom media-library plugin, which isn't proposed here as the complexity outweighs the benefit for a single-editor site.

## Proposed media-audit script

A new `scripts/audit-media-health.mjs`, run the same way `scripts/audit-gallery-ratios.mjs` already is today, extending rather than replacing it:

```
node scripts/audit-media-health.mjs
```

Detects, in one pass over `site/content/**/*.json` and `site/public/media/**`:
1. **Dangling references** — any `image`/`file`/`poster`/`cover` path in content JSON that doesn't resolve to a real file (the opposite problem from "unreferenced files," equally worth catching).
2. **External embeds** — any `url` field pointing outside `/media/` (what this audit did by hand via `grep`; scripting it means it's caught automatically in every future PR, not just when someone remembers to check).
3. **Exact duplicates** — MD5 hash collisions across the whole media folder (this audit's method, scripted).
4. **Unreferenced files** — files in `site/public/media` that no content JSON points to (excluding an explicit allow-list for intentional cases like `source-originals/` and `_unreferenced/supporting/`).
5. **Oversized assets** — flag any file over a size threshold (proposed: 3 MB for images, 15 MB for video) as a reminder to check compression, mirroring the existing aspect-ratio audit's "flag, don't block" style.

This deliberately does **not** attempt perceptual-hash duplicate detection or cross-repo matching as part of the automated, every-PR check — that was useful for this one-time audit but is too slow and too fuzzy (false positives like the Linx/Lilt deck-slide pairs) to run unattended on every merge. Exact-hash duplicate detection (item 3) catches the clear-cut cases (meta-connect, loft) cheaply; anything fuzzier stays a manual, occasional audit like this one.

## Check before future merges

Add `audit-media-health.mjs` to the same place `npm run build` and `npm run test:sites` already run (locally before a push, and in `pr-preview-build.yml`'s CI job) as a non-blocking report step — matching how `audit:media` (the existing aspect-ratio check) already runs today: it prints findings but doesn't fail the build. A future tightening (failing CI on a *new* dangling reference or external embed, specifically — not on pre-existing, already-reviewed findings) is a reasonable next step once the script exists and has a baseline to diff against, but isn't proposed as part of this initial version.

## Proposed implementation sequence (for a future Phase 2 branch)

1. Resolve the 3 confirmed exact/near-exact duplicate pairs (meta-connect, loft, secureframe) — pick the canonical copy, repoint the other content-JSON reference, leave both files on disk until confirmed safe to remove.
2. Resolve the 2 "same asset in two galleries" cases (AppOmni booth photo, Black Hat graphic) — same approach.
3. Settle the Security Brand Experiences structural question (index / Selected Work / redirect) — this one decision resolves the ~97-asset overlap in one move and should happen before any individual-asset cleanup on that page, since the right fix depends on which path is chosen.
4. Add the Visa card photography (`ad-tripactions-01.png`) and resolve the Visa attribution question.
5. Add the Secureframe event photo and decide on a small events presence for Secureframe.
6. Decide on DocuSign Momentum '14/London scope.
7. Write `scripts/audit-media-health.mjs` and wire it into the build/CI pipeline alongside the existing `audit:media`.
8. Apply the renaming convention opportunistically from this point forward — not as a dedicated bulk pass.
9. Re-run the Behance comparison once network access is granted, and fold any findings into the ledger.

Each step above is independent and can be its own small PR, consistent with how every prior pass on this project has shipped (small, verified, reviewed commits rather than one large unreviewable change).
