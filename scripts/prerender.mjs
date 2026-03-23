import { chromium } from 'playwright';
import { preview } from 'vite';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');

const routes = ['/', '/partners', '/privacy'];

async function prerender() {
  const server = await preview({
    preview: { port: 4173, strictPort: true },
  });

  const browser = await chromium.launch();

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `http://localhost:4173${route}`;

    console.log(`Prerendering ${route}...`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for React to finish rendering
    await page.waitForSelector('#root > *', { timeout: 10000 });

    // Get the full rendered HTML
    const html = await page.content();

    // Determine output path
    const filePath =
      route === '/'
        ? resolve(distDir, 'index.html')
        : resolve(distDir, `${route.slice(1)}.html`);

    writeFileSync(filePath, html, 'utf-8');
    console.log(`  -> Wrote ${filePath}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete.');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
