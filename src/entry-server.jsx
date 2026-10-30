import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppRoutes } from './AppRoutes.jsx';
import { preloadRoute } from './pageRoutes.js';
import { blogSlugFromPath } from './data/blog/index.js';
import { loadBlogContent } from './data/blog/loadContent.js';

export async function render(url) {
  // renderToString can't wait, so load the page's chunk, and a post's body,
  // up front: the page then renders in full instead of its fallback.
  await preloadRoute(url);
  const slug = blogSlugFromPath(url);
  if (slug) await loadBlogContent(slug);

  return renderToString(
    <React.StrictMode>
      <ThemeProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
