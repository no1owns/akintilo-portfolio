# Ayo Akintilo portfolio

Option 1 portfolio with original project media, responsive project pages, category filters, and a Decap content editor.

## Run and edit

Requires Node 22 or later.

```sh
cd site
npm ci
npm run dev
```

Open the URL printed by Vite. Visit `/admin/` and click Login for the **local** editor. The development command starts the local content server too. Local Publish saves files on this computer; it does not push GitHub or deploy a website.

- Site settings: edit the homepage, about copy, contact details, résumé PDF, and grid columns/spacing.
- Projects: choose cover images, edit text, change project order and visibility.
- Page sections: add and reorder text, images, galleries, image/text splits, and video links. Gallery columns, image placement, crop focus, and spacing are editable.
- Media: choose an existing image or upload a new one. Add useful image descriptions.
- Preview updates beside the fields. This is a structured block editor, not a freeform Adobe canvas.

## Build

```sh
cd site
npm run build
npm run test:sites
```

Static output is `site/dist/client`. The build generates HTML for each published project and the main pages, plus a 404 page. Existing project slugs are preserved. The Worker packaging is retained for compatibility but is not required by static hosting.

## Online editing and hosting

Online editing requires a Decap-compatible GitHub OAuth service. Set `VITE_CMS_AUTH_URL` to its HTTPS origin in the hosting build environment, then rebuild. The service must expose `/auth` and complete Decap's GitHub authentication flow. Keep its client secret on the OAuth server, never in a Vite variable or this repository. GitHub repository permissions control who can publish. No OAuth service or credentials are included in this build.

Production editing targets `no1owns/akintilo-portfolio`, branch `main`, with content under `site/content` and uploads under `site/public/media`. Configure the hosting provider to rebuild when `main` changes. Until authentication is configured, `/admin/` displays setup instructions rather than a nonworking login.

For a static host such as Cloudflare Pages: use `site` as the project root, `npm run build` as the build command, and `dist/client` as output. A GitHub Pages deployment needs to serve at the domain root because routes and asset paths start with `/`; the default `/akintilo-portfolio/` project URL is not configured.

Test a preview domain before connecting `akintilo.com`. DNS has not been changed. Set Public site URL in Site settings to the final HTTPS domain to enable indexing, canonical links, and the sitemap. It is currently blank, so builds discourage indexing. Add your contact email/link and optional résumé PDF before launch.

## Content notes

19 projects were imported from the existing portfolio. 17 are visible. Linx Security and the MongoDB beliefs storyboard are retained as drafts pending attribution/content review. Drafts are not private: repository files and bundled content remain accessible. Do not store confidential material here.

Project copy was checked against the supplied career data. Imported visuals remain the original portfolio work. Still images were optimized to WebP; animated GIFs are preserved. Some older embedded media still depend on their external provider.

The `scripts/import-portfolio.py` and `scripts/curate-content.mjs` scripts document the initial migration. Do not rerun them over edited content. `images/` at repository root was already present and is preserved; active site media lives in `site/public/media`.
