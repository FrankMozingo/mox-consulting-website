# MOX Consulting — Redirect Site

Static Cloudflare Pages redirect for [mox-consulting.com](https://mox-consulting.com).

MOX Consulting is a retired brand. The active business identity is Mozingo Systems, and all
traffic should forward to [mozingosystems.com](https://mozingosystems.com).

## Stack
Plain HTML + CSS + vanilla JS. No build step. Deployed on Cloudflare Pages.

## Structure
- `_redirects` — forwards all routes to `https://mozingosystems.com/:splat`
- legacy site files remain in the repo history but are no longer the active public brand
- `robots.txt`, `sitemap.xml` — SEO
- `_headers` — Cloudflare Pages headers

## Local preview
```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy
Cloudflare Pages, Git-connected to `FrankMozingo/mox-consulting-website` (branch `main`).
It's a no-build redirect site — configure in the Pages dashboard:
- Framework preset: **None**
- Build command: *(empty)*
- Build output directory: **`/`** (repo root)

There is intentionally no `wrangler.toml` — its presence makes the Pages Git builder
attempt a Workers deploy, which fails for a static site.
