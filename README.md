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
- `_headers`, `_redirects`, `wrangler.toml` — Cloudflare Pages config

## Local preview
```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy
Cloudflare Pages builds from the repo root (`pages_build_output_dir = "."`).
