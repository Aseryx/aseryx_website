import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import BLOG_POSTS, { blogSlugFromPath, findPost } from '../src/data/blog/index.js';
import DATASETS, { findDataset } from '../src/data/datasets.js';
import { PAGE_META, canonicalUrl, metaForBlogPost, metaForDataset } from '../src/config/pageMeta.js';
import { STATIC_ROUTES } from '../src/config/staticRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const serverDir = resolve(distDir, 'server');

function getRoutes() {
  const blogRoutes = BLOG_POSTS.map((p) => `/blog/${p.slug}`);
  const datasetRoutes = DATASETS.map((d) => `/datasets/${d.slug}`);
  return [...STATIC_ROUTES, ...blogRoutes, ...datasetRoutes, '/404'];
}

/** Meta for any route written here: a page, a post or a dataset; anything else gets the 404's. */
function resolvePageMeta(route) {
  if (PAGE_META[route]) return PAGE_META[route];

  const post = findPost(blogSlugFromPath(route));
  if (post) return metaForBlogPost(post);

  const dataset = findDataset(route.match(/^\/datasets\/([^/]+)\/?$/)?.[1]);
  if (dataset) return metaForDataset(dataset);

  return PAGE_META['/404'];
}

/**
 * The sitemap, written from the same route list as the pages, so a new route
 * can't be left out of it again. Blog posts carry their publish date; other
 * pages carry no lastmod rather than a date that isn't true.
 */
function writeSitemap(routes) {
  const postDates = Object.fromEntries(BLOG_POSTS.map((p) => [`/blog/${p.slug}`, p.date]));
  const urls = routes
    .filter((route) => route !== '/404')
    .map((route) => {
      const lastmod = postDates[route] ? `\n    <lastmod>${postDates[route]}</lastmod>` : '';
      return `  <url>\n    <loc>${canonicalUrl(route)}</loc>${lastmod}\n  </url>`;
    });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`  -> Wrote ${resolve(distDir, 'sitemap.xml')} (${urls.length} URLs)`);
}

/** Escape a value for HTML text or a double-quoted attribute. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Replace the first match of `pattern` with `replacement` verbatim.
 * A plain string replacement would expand "$1", "$&", "$'" etc. inside it,
 * which corrupts page content such as "$12.9 million".
 */
function replaceLiteral(html, pattern, replacement) {
  return html.replace(pattern, () => replacement);
}

function injectMeta(html, { title, description }, route, { noIndex = false } = {}) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const url = canonicalUrl(route);
  const robots = noIndex ? 'noindex, follow' : 'index, follow';

  const tags = [
    [/<title>[^<]*<\/title>/, `<title>${t}</title>`],
    [/<meta name="title" content="[^"]*"\s*\/>/, `<meta name="title" content="${t}" />`],
    [/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${d}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${t}" />`],
    [/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${d}" />`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${t}" />`],
    [/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${d}" />`],
    [/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`],
    [/<meta name="twitter:url" content="[^"]*"\s*\/>/, `<meta name="twitter:url" content="${url}" />`],
  ];

  let out = html;
  for (const [pattern, tag] of tags) {
    out = replaceLiteral(out, pattern, tag);
  }

  const robotsTag = `<meta name="robots" content="${robots}" />`;
  const robotsPattern = /<meta name="robots" content="[^"]*"\s*\/>/;
  out = robotsPattern.test(out)
    ? replaceLiteral(out, robotsPattern, robotsTag)
    : replaceLiteral(out, '</head>', `  ${robotsTag}\n</head>`);

  return out;
}

async function prerender() {
  await build({
    build: {
      ssr: resolve(__dirname, '../src/entry-server.jsx'),
      outDir: serverDir,
    },
  });

  const modulePath = pathToFileURL(resolve(serverDir, 'entry-server.js')).href;
  const { render } = await import(modulePath);

  const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');
  const routes = getRoutes();

  for (const route of routes) {
    console.log(`Prerendering ${route}...`);

    const appHtml = await render(route);
    const meta = resolvePageMeta(route);
    const noIndex = route === '/404';
    let html = replaceLiteral(template, '<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    html = injectMeta(html, meta, route, { noIndex });

    let filePath;
    if (route === '/') {
      filePath = resolve(distDir, 'index.html');
    } else if (route === '/404') {
      // Cloudflare Pages serves dist/404.html for missing paths (HTTP 404).
      filePath = resolve(distDir, '404.html');
    } else {
      filePath = resolve(distDir, route.slice(1), 'index.html');
      mkdirSync(dirname(filePath), { recursive: true });
    }

    writeFileSync(filePath, html, 'utf-8');
    console.log(`  -> Wrote ${filePath}`);
  }

  writeSitemap(routes);
  rmSync(serverDir, { recursive: true, force: true });
  console.log(`Prerendering complete (${routes.length} routes).`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
