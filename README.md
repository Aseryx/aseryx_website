# Aseryx Website

Marketing site for Aseryx — built with React, Vite, and Tailwind CSS, deployed to Cloudflare Pages.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000` (set in `vite.config.js`).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build with SSR prerendering
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint
- `npm run deploy` — Build and deploy to Cloudflare Pages

## Deployment (Cloudflare Pages)

Project name: `aseryx-website`

**Build settings:**
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: `20`

Custom domains: `aseryx.xyz` (primary), `www.aseryx.xyz` (redirect to apex).

## Tech Stack

- React 18 + React Router
- Vite 5
- Tailwind CSS 3
- Cloudflare Pages + Wrangler

## Project Structure

```
aseryx_website/
├── public/                 # Static assets, sitemap, robots.txt
├── scripts/
│   ├── build-board-versions.mjs  # Benchmarks version history from aseryx_benchmarks
│   └── prerender.mjs       # SSR prerender + per-route SEO injection
├── src/
│   ├── components/
│   │   ├── common/         # Shared UI (ParticlesBackground, FaqItem, RiskBand, …)
│   │   └── layout/         # Navigation, Footer, PageLayout
│   ├── config/             # Tally URLs, page meta, routes
│   ├── content/            # Legal page HTML
│   ├── data/
│   │   └── blog/           # Blog metadata + lazy-loaded content per post
│   ├── hooks/              # usePageMeta, useScrollReveal
│   ├── pages/              # Route-level page components
│   ├── AppRoutes.jsx       # Shared route definitions
│   ├── App.jsx
│   └── entry-server.jsx    # SSR entry (mirrors AppRoutes)
├── index.html
└── wrangler.jsonc
```

## Adding Content

- **Blog post:** Add metadata to `src/data/blog/index.js` and content to `src/data/blog/content/{slug}.js`
- **Benchmarks version history:** with `aseryx_benchmarks` checked out beside this repo, run `npm run board:versions` to rewrite `src/data/boardVersions.js` from its `benchmarks/reports/evolution/evolution.json`. It writes nothing if a board row or the v11 marks in `src/data/readinessBoard.js` disagree with the record. Pass another checkout path as an argument or in `ASERYX_BENCHMARKS`.
- **New page:** Create a page component, add the route in `AppRoutes.jsx`, and add SEO metadata in `src/config/pageMeta.js`

## License

MIT