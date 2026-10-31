const contentModules = import.meta.glob('./content/*.js');

/** Post bodies already loaded, by slug. Lets prerender and hydration render a post synchronously. */
const contentCache = new Map();

export function getCachedBlogContent(slug) {
  return contentCache.get(slug) ?? null;
}

export async function loadBlogContent(slug) {
  if (contentCache.has(slug)) return contentCache.get(slug);
  const key = `./content/${slug}.js`;
  const loader = contentModules[key];
  if (!loader) return null;
  const mod = await loader();
  contentCache.set(slug, mod.default);
  return mod.default;
}
