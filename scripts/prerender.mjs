import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const serverDir = resolve(distDir, 'server');

const routes = ['/', '/partners', '/buyers', '/privacy', '/terms', '/blog', '/blog/benchmarks-tell-you-what-to-measure'];

async function prerender() {
  // Build the SSR bundle
  await build({
    build: {
      ssr: resolve(__dirname, '../src/entry-server.jsx'),
      outDir: serverDir,
    },
  });

  // Load the SSR bundle
  const modulePath = pathToFileURL(resolve(serverDir, 'entry-server.js')).href;
  const { render } = await import(modulePath);

  // Read the built HTML template
  const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

  for (const route of routes) {
    console.log(`Prerendering ${route}...`);

    // Render the route to HTML
    const appHtml = render(route);

    // Inject rendered HTML into the template
    const html = template.replace(
      /(<div id="root">)(<\/div>)/,
      `$1${appHtml}$2`
    );

    // Determine output path
    let filePath;
    if (route === '/') {
      filePath = resolve(distDir, 'index.html');
    } else {
      filePath = resolve(distDir, `${route.slice(1)}.html`);
      mkdirSync(dirname(filePath), { recursive: true });
    }

    writeFileSync(filePath, html, 'utf-8');
    console.log(`  -> Wrote ${filePath}`);
  }

  // Clean up the SSR bundle — not needed for deployment
  rmSync(serverDir, { recursive: true, force: true });

  console.log('Prerendering complete.');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
