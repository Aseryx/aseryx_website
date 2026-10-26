import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppRoutes } from './AppRoutes.jsx';
import { blogSlugFromPath, loadBlogContent } from './data/blog/loadContent.js';

export async function render(url) {
  // Effects never run in renderToString, so load a post's body up front.
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
