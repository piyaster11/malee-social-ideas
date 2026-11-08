# Malee Social Ideas

Draft social-content board for a Bangkok planning week of **9–15 November 2026**, with a three-week calendar through **29 November 2026** and a Father's Day preparation note for **5 December 2026**.

Thai is the line meant for a post. English is an optional translation. This site does not publish anything to Facebook, Instagram, or TikTok.

The page is a **public mockup** once GitHub Pages is on. A `github.io` address can be opened by anyone with the link. It is not private, and it is not password-protected. `noindex` only asks crawlers to skip it.

## What is verified

Checked **8 November 2026 ICT**:

- **11.11** is a commerce window on KTC's Double Day page (promotion period 7–13 Nov 2026). That is not a Malee price, voucher, or Live slot.
- **Loy Krathong** night is **Tuesday 24 November 2026** (TAT Newsroom, 5 Nov 2026). This week is for a home light setup, not the festival night.
- **Father's Day / National Day** is **Saturday 5 December 2026**, with **Monday 7 December** as the substitute holiday on the Bank of Thailand list. The board uses that only to time preparation.

Cards marked **editorial** are filming suggestions. They are not measured trends and they are not popularity claims. A short "what we are not chasing" note records one public X Thailand snapshot from 8 Nov 2026. It has no volumes.

The Results section stays labelled **EXAMPLE** until someone uploads a file in their own browser. Uploads and saved ideas stay in that browser. They are not sent to this site, and they do not move with you from an older preview address. Export CSV first.

## Layout

- `src/data.js` — current ideas, themes, calendar, sources
- `src/archive.js` — October 2026 cards, original dates, not this plan
- `src/gen.js` — offline synonym list and caption templates (no AI service)
- `src/app.js`, `src/page.html`, `src/style.css`
- `index.html` — built page, project-relative assets
- `dashboard-offline.html` — one file, including SheetJS, for use with the network off
- `business-trends.html` — F&B, coconut and value-chain radar for the same 8 Nov 2026 snapshot. It is a separate page, linked from the top of Social Ideas. There are no search-popularity charts: no numerical series was retrieved.
- `business-trends-offline.html` — the same radar in one file
- `business/trends.json` — the 15 watchpoints and 10 sources
- `vendor/xlsx.full.min.js` — SheetJS Community Edition 0.20.3 (Apache-2.0). See `vendor/NOTICE-SheetJS.txt`

## Build and test

```bash
python3 build/gen_template.py   # empty CSV/XLSX templates
python3 build/build.py          # index.html and dashboard-offline.html
node build/test.js --static     # syntax, paths, content rules
node build/test.js              # static checks plus headless Chrome
```

`node build/test.js` needs Chrome or Chromium (`CHROME_PATH` overrides the lookup).

## GitHub Pages

The site is built for a **project site** at `/malee-social-ideas/`. Styles, scripts, and templates use relative paths, so they resolve under that folder. `.nojekyll` is in the root so GitHub does not run Jekyll.

After this branch is on `main`, a repository admin turns Pages on:

1. Settings → Pages → Source: **GitHub Actions**. The workflow `.github/workflows/pages.yml` rebuilds and deploys on push to `main`.
2. If Actions is not available, choose **Deploy from a branch**, branch `main`, folder **`/ (root)`**. `.nojekyll` covers that path too.

The public URL will look like `https://<user>.github.io/malee-social-ideas/`. Open `dashboard-offline.html` beside it for the single-file copy. Do not treat either URL as confidential.
