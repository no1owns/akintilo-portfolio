# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

Project media galleries default to a **justified photo grid** (Adobe Portfolio style), not bento: every image in a row renders at the same height, widths follow each image's real aspect ratio, nothing is cropped by default, and manual image order is preserved. Bento remains available as an opt-in editorial layout (`layout: "bento"` on a gallery block) for a project an editor deliberately wants to curate as a mixed-size composition — it is never the default. Supported gallery modes: `justified` (default), `full-width`, `split`, `uniform`, `bento` (opt-in only). See `docs/portfolio-decisions.md` for the full reasoning and rollout status; as of 2026-09-20 this has been prototyped on one project (`mongodb-the-next-generation-database`) only, pending Ayodeji's review before wider rollout.
