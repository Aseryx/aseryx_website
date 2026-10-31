import { useEffect } from 'react';
import { canonicalUrl } from '../config/pageMeta.js';

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
 * Without a title it does nothing: a page that falls back to <NotFoundPage />
 * for an unknown slug is that page's parent, so its effect runs after the
 * 404's and would otherwise set robots back to index.
 */
export function usePageMeta({ title, description, path, noIndex = false }) {
  useEffect(() => {
    if (!title) return;
    document.title = title;

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:title', title);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:title', title);
      upsertMeta('name', 'twitter:description', description);
    }

    upsertMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');

    if (path) {
      const url = canonicalUrl(path);
      upsertMeta('property', 'og:url', url);
      upsertMeta('name', 'twitter:url', url);
      upsertCanonical(url);
    }
  }, [title, description, path, noIndex]);
}
