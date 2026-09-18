import { useEffect } from 'react';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  if (!href) return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Updates document title and core SEO meta tags for the current route.
 */
export function usePageMeta({ title, description, path, noIndex = false }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:title', title);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:title', title);
      upsertMeta('name', 'twitter:description', description);
    }

    upsertMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');

    if (path) {
      const url = `https://aseryx.xyz${path === '/' ? '/' : path}`;
      upsertMeta('property', 'og:url', url);
      upsertMeta('name', 'twitter:url', url);
      upsertCanonical(url);
    }
  }, [title, description, path, noIndex]);
}
