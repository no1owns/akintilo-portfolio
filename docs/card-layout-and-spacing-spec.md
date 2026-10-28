# Card layout and spacing spec

**Approved 2026-10-28 — Option 1 (scoped specificity fix) applied in Phase 2.** See the implementation commit for the exact CSS change and verification results.

Phase 1 deliverable. Verified against the live dev server (`npm run dev`, Vite on `localhost:5173`) via Playwright, not inferred from CSS alone — the root cause below only showed up once actual computed styles were measured, not from reading `src/styles.css` in isolation.

## Root cause (verified, not guessed)

The task's description — "almost no space between the project image and the category label" — is correct and has a precise cause: a CSS specificity collision, not a missing rule.

`src/styles.css` sets:
```css
.card-eyebrow{margin:18px 0 6px}      /* intended: 18px above the category label */
.card-summary{margin-top:10px}         /* intended: 10px above the 2-line summary */
.project-card p{margin:0}              /* a reset, written to zero out default <p> margins */
```

`.card-eyebrow` and `.card-summary` are both single-class selectors (specificity `0,1,0`). `.project-card p` combines a class with an element selector (specificity `0,1,1`) — **higher specificity wins regardless of source order**, so `.project-card p{margin:0}` overrides both of the margin rules above on every card, sitewide. `.card-view` (a `<span>`, not a `<p>`) is unaffected by this and correctly keeps its `margin-top:16px`.

**Measured on the live homepage at 1440px** (`Card()` component, `src/App.jsx:274`), first card ("Security Brand Experiences"):

| Transition | Intended margin | Computed (actual) margin | Gap rendered |
|---|---|---|---|
| Cover image → category label (`.card-eyebrow`) | 18px | **0px** | 0px |
| Category label → title (`h3`) | n/a (h3 has its own `margin:0 0 4px`) | 0px top | 0px |
| Summary → "View case study" (`.card-view`, a `<span>`, not affected by the `<p>` reset) | 16px | 16px | 16px (correct) |

This is visually confirmed in a cropped screenshot of the live homepage at 1440px: the "BRAND SYSTEMS" eyebrow sits flush against the cover image's bottom edge, with the title (`h3`) immediately below it — no breathing room at all between image, label, and title. No breakpoint-specific override changes this at 800px or 560px either (`.card-eyebrow`/`.card-summary` are untouched in both media queries), so the problem is sitewide and not a mobile-only gap.

## Recommended fix (spec only — not applied in Phase 1)

Two ways to fix it, either is minimal:
1. **Raise the eyebrow/summary rules' specificity to match or beat the reset** — e.g. `.project-card .card-eyebrow{margin:18px 0 6px}` / `.project-card .card-summary{margin-top:10px}` (two classes, specificity `0,2,0`, beats `.project-card p`'s `0,1,1`).
2. **Narrow the reset** so it doesn't catch elements that already carry their own margin rule — e.g. change `.project-card p{margin:0}` to target only the elements that actually need zeroing (`.card-company`, which has no margin rule of its own today and currently relies on this reset).

Option 1 is the safer fix (touches only the two rules that are actually wrong, doesn't risk un-zeroing `.card-company` by accident). Recommended values, consistent with the task's ask:

| Breakpoint | Cover → eyebrow gap | Eyebrow → title gap | Summary → view-link gap (unchanged, already correct) |
|---|---|---|---|
| Desktop (>800px) | 20px (mid-point of the requested 16–24px range; the site's existing `.card-eyebrow` value was 18px, so this is a 2px nudge, not a redesign) | 6px (existing `.card-eyebrow` bottom margin, already reasonable once the top margin actually applies) | 16px |
| Mobile (≤560px) | 14px (mid-point of the requested 12–16px range) | 6px (unchanged) | 16px (unchanged) |

This is a **restoration of the originally-intended spacing**, not a new design decision — the 18px/6px values already exist in the stylesheet and were presumably verified visually at some point before the `.project-card p{margin:0}` reset (added in a later pass, per `git blame`-style reasoning: the reset is a generically-named catch-all that was almost certainly written to zero `.card-company`'s margin and happened to also catch the two rules it shouldn't have) silently neutralized them. No Phase 1 change is being made to `src/styles.css` — this section documents the fix for Phase 2 approval.

## Verification checklist for Phase 2 (once the fix lands)

- [ ] Image and text stay visually connected — gap doesn't read as two unrelated blocks (true at both 18–24px and 12–16px; verify nothing above ~28px, which starts to read as disconnected).
- [ ] Cards align across each row — `.project-grid` is a CSS grid with `align-items` default (`stretch`); confirm the fix doesn't change row height alignment, since `.cover` uses a fixed `aspect-ratio`, not content-driven height.
- [ ] Cards with different image aspect ratios stay consistent — `.cover{aspect-ratio:1.32}` already normalizes this; the fix is below the image and doesn't interact with it.
- [ ] Long titles/descriptions don't break alignment — `.card-summary` already uses `-webkit-line-clamp:2`, unaffected by this fix.
- [ ] Full-card link stays accessible — the entire card is one `<a>` (`Card()`, `src/App.jsx:274`); a margin change doesn't affect this.
- [ ] Keyboard focus stays visible — `a:focus-visible{outline:2px solid var(--focus);outline-offset:6px}` is unrelated to this fix, re-verify it still renders correctly with the new spacing (outline offset could visually clip against an adjacent card at the tighter mobile gap — worth a specific check).
- [ ] Loading and image-error states (the shared `Img` component, `docs/portfolio-decisions.md`'s 2026-10-26 entry) are unaffected — they only touch the `<img>` itself, not the text block below it.

## Screenshots captured this pass (current/before state)

Captured via headless Chromium at the four required widths against the live dev server homepage, confirming the current 0px gap is sitewide, not an isolated case:

- 1440px — `home-1440.png` (cropped detail: `card-crop-1440b.png`, shows the flush image/label transition on the first card)
- 1024px — `home-1024.png`
- 768px — `home-768.png`
- 390px — `home-390.png`

Saved to the session scratchpad and sent to Ayo alongside this plan (not committed to the repo — Phase 1 produces docs, not binary screenshots, inside `docs/`).
