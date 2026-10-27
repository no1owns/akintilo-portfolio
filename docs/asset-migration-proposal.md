# Asset migration proposal

**Approved by Ayodeji 2026-10-27.** This document and `docs/asset-migration-ledger.md` are the final, approved plan for reorganizing `site/public/media/` into company/project subfolders, prepared from a full repository audit and refined through 7 explicit decisions (§4). Companion to the full per-file table in `docs/asset-migration-ledger.md` (458 rows). Phase 2 (the actual move) is tracked separately in `docs/portfolio-decisions.md`.

## 1. Method

Three parallel, read-only investigations, cross-referenced:
1. **File inventory** — every file under `site/public/media/`, with type, size, and dimensions/duration (ImageMagick `identify` / `ffprobe`), plus byte-identical duplicate detection via `sha256sum`.
2. **Reference mapping** — every place in the codebase a media path is used: all 20 project JSON files (plus the new `ai-assisted-design-systems.json` = 21), 3 experiment files, `reel.json`, `settings.json`, `App.jsx`/`bento.js`/`justified.js`, `admin/editor.js`, `index.html`, CSS, build scripts, tests.
3. **Company/project attribution** — cross-referenced against `docs/content-and-asset-inventory.md` and `docs/portfolio-decisions.md`, which already carry a verified, dated history of exactly which company each project (and in two cases, each *section* of a project) belongs to — including two documented correction passes where attribution was initially wrong and later fixed.

No attribution in the ledger was inferred from a file's appearance. Every row traces to a project JSON's own `company` field, a documented section boundary (for the two split files), or is explicitly marked unreferenced/uncertain rather than guessed.

## 2. Counts

**Current: 458 files, ~178.6 MB** (416 webp, 26 mp4, 12 jpg, 2 png, 2 json).
**Proposed: 458 files** — this is a pure reorganization. No file is deleted, resized, or re-encoded. Two suspected-duplicate pairs are flagged but **not merged or deleted** (see §5).

### By company (file count, final — after decision-6 re-verification)

| Company | Files | Projects |
|---|---|---|
| MongoDB | 108 | dream-big, mongodb-the-next-generation-database, mongodb-web, mongodb-for-giant-ideas-video, mongodb-internal, mongodb-beliefs-storyboard, + its share of event-brand-experiential |
| TripActions (folder: `navan`) | 73 | tripactions, tripactions-visual-product-ux, lufthansa, visa, + its share of event-brand-experiential |
| AppOmni | 66 | ai-assisted-design-systems, + its share of brand-systems-and-web-performance |
| Secureframe | 52 | its share of brand-systems-and-web-performance |
| DocuSign | 45 | docusign-enterprise-campaign, microsoft-docusign, + its share of event-brand-experiential |
| Meta | 27 | meta-connect |
| BetterUp | 20 | betterup-product-presentations |
| Linx | 17 | linx-security |
| Apollo GraphQL | 12 | its share of event-brand-experiential |
| LILT | 10 | lilt-ebook |
| Lab (no company) | 8 | creative-systems-toolkit, multistep-form-generator, stephen-kings-universe |
| Lyft Business | 7 | lyft |
| Loft | 5 | loft |
| Byron (reel-only) | 1 | no case-study page — `byron/additional-work/` |
| **Uncertain (decision 6)** | **3** | all within brand-systems-and-web-performance — held in `_uncertain/` |
| **Unreferenced** | **4** | 1 kept with its segments for provenance (decision 7), 3 held in `_unreferenced/` |

## 3. Final folder tree

```text
site/public/media/
├── appomni/
│   ├── brand-systems-and-web-performance/   (57 files — AppOmni's section of this shared project)
│   └── ai-assisted-design-systems/          (9 files)
├── secureframe/
│   └── brand-systems-and-web-performance/   (52 files — Secureframe's section of the same project)
│       └── source-originals/                (1 — pre-segmentation original, see §7)
├── mongodb/
│   ├── dream-big/                           (10)
│   ├── mongodb-the-next-generation-database/ (22)
│   ├── mongodb-web/                         (17)
│   ├── mongodb-for-giant-ideas-video/       (23)
│   ├── mongodb-internal/                    (5)
│   ├── mongodb-beliefs-storyboard/          (17)
│   └── event-brand-experiential/            (14 — MongoDB's section)
├── docusign/
│   ├── docusign-enterprise-campaign/        (16)
│   ├── microsoft-docusign/                  (17)
│   └── event-brand-experiential/            (12 — DocuSign's section)
├── navan/                                    (TripActions — folder name per decision 2)
│   ├── tripactions/                         (29)
│   ├── tripactions-visual-product-ux/       (17)
│   ├── lufthansa/                           (8)
│   ├── visa/                                (10)
│   └── event-brand-experiential/            (9 — TripActions' section)
├── apollo/
│   └── event-brand-experiential/            (12 — Apollo GraphQL's section)
├── lyft/                                     (7, flat -- single project)
├── linx/                                     (17, flat -- single project)
├── meta-connect/                             (27, flat -- single project)
├── betterup/                                 (20, flat -- single project)
├── lilt/                                     (10, flat -- single project)
├── loft/                                     (5, flat -- single project)
├── byron/
│   └── additional-work/                     (1 — reel-only video, decision 4)
├── lab/
│   ├── creative-systems-toolkit/            (6)
│   ├── multistep-form-generator/            (1 — slug kept per decision 5)
│   └── stephen-kings-universe/              (1 — slug kept per decision 5)
├── _uncertain/
│   └── brand-systems-and-web-performance/   (3 — re-verified individually, no visible company evidence, decision 6)
└── _unreferenced/                            (3, held not deleted -- see §7)
    └── supporting/
```

Full per-file mapping: `docs/asset-migration-ledger.md`.

## 4. Decisions (approved 2026-10-27)

1. **Folder grain: project-level, not sub-initiative-level.** One subfolder per existing project `slug`. Finer splitting deferred to the later redesign.
2. **"TripActions" → `navan/`.** Matches the Resume page's existing "Navan (TripActions)" naming. The JSON `company` field text, project copy, captions, and alt text all stay unchanged.
3. **Visa, Lufthansa, Microsoft get no top-level company folder.** Filed under the primary company (`navan/visa/`, `navan/lufthansa/`, `docusign/microsoft-docusign/`). Partner names are preserved everywhere they currently appear in copy/captions/alt text/metadata — only the file's folder location changes.
4. **Byron → `byron/additional-work/`**, not a generic `shared/` bucket — stays clearly attributable to Byron even without a case-study page.
5. **Lab subfolders use existing project slugs** (`multistep-form-generator`, `stephen-kings-universe`, `creative-systems-toolkit`) — this is a technical migration; friendlier public names are a content/routing-layer concern for later.
6. **AppOmni/Secureframe boundary — individually re-verified.** Every GIF-derived first frame and the one generic icon the docs flagged were viewed directly (not re-derived from palette or section position). Result: **3 of the 4 candidates had no visible logo, text, or other company-identifying evidence** and are held in `_uncertain/brand-systems-and-web-performance/`, flagged in the ledger, not assigned. The 4th (`440fd6e00a8b97ce.webp`) is confirmed Secureframe on the strength of an *existing reference* — a prior documented pass that pulled multiple frames of the same source GIF and found an explicit "Introducing Comply AI" Secureframe title card later in the animation (see `docs/portfolio-decisions.md`). Every other image in this project keeps its structural section attribution (which company's `sectionHeading` block it falls under), which is unambiguous and doesn't rely on pixel content.
7. **Unreferenced files**: all 4 are preserved, none deleted. The pre-segmentation original (`3564c19109ee9aa0.webp`) moves into `secureframe/brand-systems-and-web-performance/source-originals/`, alongside its 8 already-used `-seg1`…`-seg8` segments in the parent folder, with the relationship documented in the ledger. The other 3 (2 `supporting/*.json` spec files + `motion-reference-presentation.jpg`, all uploaded as "if useful" reference material for the AI case study, never rendered) go into `_unreferenced/`.

## 5. Suspected duplicates (not deleted)

Two byte-identical pairs, confirmed via `sha256sum`, both pairs **within the same project** (so very likely intentional — the same photo used twice in that project's original narrative, not a filing error):

| Pair | Project | Size each |
|---|---|---|
| `meta-connect-08.webp` / `meta-connect-13.webp` | meta-connect | 71,234 B |
| `a26ee5114fc51d56.webp` / `dd0a597a18f778d5.webp` | loft | 202,722 B |

Phase 2 will **not** delete or merge either pair without your explicit go-ahead. Total potential savings if merged: ~274 KB — trivial, so there's no urgency either way.

## 6. Shared assets (deliberately not assigned to any company)

- `site/public/favicon.svg` — outside `site/public/media/` entirely, referenced once in `index.html`. No change needed.
- Self-hosted fonts (Newsreader/IBM Plex) — bundled from `node_modules` via Vite's own asset pipeline, never touch `site/public/media/`. No change needed.
- Résumé PDF — `settings.json`'s `resume` field is currently empty; nothing to move.
- Social-preview images — no static file exists; `prerender.mjs` builds a per-route preview URL dynamically from each project's own `cover` field at build time. Nothing to move; this already "just works" with any new path, since it reads the `cover` field, not a hardcoded path.

## 7. Risks and path patterns likely to break

- **None of the actual React/CMS code hardcodes a media path.** Confirmed directly: `mediaURL()`/`safeURL()` in `App.jsx` are pure pass-through/validation functions — whatever path a project's JSON supplies is used verbatim. `bento.js` and `justified.js` have zero media references. This means a path rename is a **content-only change** (JSON field edits), not a code change, for every project/experiment/reel file.
- **`admin/editor.js`'s CMS config hardcodes a single flat `media_folder`/`public_folder` pair** (`public/media` / `/media`), with no per-collection override. This still works with subfolders today (Decap's media picker can browse into them), but it means new uploads through the CMS UI won't auto-file into a project's subfolder — editors will need to navigate there manually in the media picker. Not a breakage, but worth flagging as a UX gap this migration doesn't fix.
- **Three doc files hardcode individual filenames in prose** (not just folder names): `docs/content-and-asset-inventory.md` lines mentioning `/media/experiment-multistep-form-generator.webp`, `/media/experiment-stephen-kings-universe.webp`, and `/media/lab/creative-systems-button-lab.jpg` by name. These three will go stale unless updated alongside the move (planned in Phase 2, not yet done).
- **Two project files have media split by company within one JSON file** (`brand-systems-and-web-performance.json`, `event-brand-experiential.json`). Phase 2 must edit each company's share of paths independently within the same file — higher risk of a copy-paste slip than a straight file-level rename. These two get extra scrutiny (full before/after image-count diff, not just a route smoke-test) in Phase 2 verification.
- **`reel.json` cross-references 27 of the same media paths already used in project JSON** (videos that appear both on their project page and the reel). Every rename touches two JSON files, not one, for those paths — tracked explicitly in the ledger's "current references" column so Phase 2 can't miss one side.
- **CSS and build scripts have zero hardcoded media paths** (confirmed directly) — no risk there.

## 8. Exact validation steps planned for Phase 2

1. `git mv` (or `git add` the new path + `git rm` the old, where a true rename isn't detected) for every file, preserving history where Git can.
2. Update every JSON reference (project/experiment/reel) to the new path — scripted from the same ledger data used to build this proposal, not re-typed by hand.
3. Update the 3 doc files with hardcoded individual filenames (§7).
4. Repo-wide `grep` for every **old** path string — must return zero hits outside this changelog/ledger itself.
5. Repo-wide check that every **new** path referenced in content actually exists on disk — zero dangling references.
6. `npm run build` (expect same route count as before the move — currently 30), `npm run test:sites` (23/23), `node scripts/audit-gallery-ratios.mjs` (same 2 pre-existing flags, nothing new).
7. Playwright pass at 1440/1024/768/390px across every touched route — especially `brand-systems-and-web-performance`, `event-brand-experiential`, and the reel page (the three multi-reference files from §7).
8. Confirm zero new console errors, lightbox still opens/navigates, video posters still load, CMS preview (`/admin/`) still resolves images for a sample of moved paths.
9. Before/after file-count and byte-size diff on `site/public/media/` — must match exactly (458 files, same total bytes; only paths changed).
10. Report, do not delete, the 4 unreferenced files and both duplicate pairs — final state stays exactly what this proposal describes unless you've separately approved deletion.

## 9. What Phase 2 will *not* do

No redesign, no route changes, no Selected Work changes, no copy changes, no merge to `main`. Pushed only to a new branch off `origin/main`, for your review.
