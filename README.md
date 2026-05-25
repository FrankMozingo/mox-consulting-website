# MOX Consulting — Website

Static marketing site for [mox-consulting.com](https://mox-consulting.com). Data cleanup, workflow
automation, systems integration, dashboards, and practical AI for churches, schools, manufacturers,
and small businesses.

## Stack
Plain HTML + CSS + vanilla JS. No build step. Deployed on Cloudflare Pages.

## Structure
- `index.html` — single-page site
- `css/styles.css` — mobile-first dark theme
- `js/main.js` — smooth scroll, FAQ accordion, mobile menu, scroll-spy
- `assets/` — favicon set + Open Graph image
- `robots.txt`, `sitemap.xml` — SEO
- `_headers`, `_redirects` — Cloudflare Pages config

## Local preview
```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy
Cloudflare Pages, Git-connected to `FrankMozingo/mox-consulting-website` (branch `main`).
It's a no-build static site — configure in the Pages dashboard:
- Framework preset: **None**
- Build command: *(empty)*
- Build output directory: **`/`** (repo root)

There is intentionally no `wrangler.toml` — its presence makes the Pages Git builder
attempt a Workers deploy, which fails for a static site.
