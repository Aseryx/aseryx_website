import { SITE_URL, canonicalUrl } from './pageMeta.js';
import { OWNER_PENDING } from '../data/owners.js';

/**
 * Page-level schema.org data. index.html carries the site-wide Organization
 * and WebSite; these say what a single page is, and point back to the
 * Organization by its @id rather than repeating it.
 */
const ASERYX = { '@id': `${SITE_URL}/#organization` };

/** The trail search results show above a page's title: [name, path] pairs from Home. */
export const breadcrumbs = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: canonicalUrl(path),
  })),
});

/** A dataset profile as a schema.org Dataset, the type Google Dataset Search lists. */
export const datasetData = (dataset) => ({
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: dataset.title,
  description: dataset.profile?.lede ?? dataset.summary,
  url: canonicalUrl(`/datasets/${dataset.slug}`),
  version: dataset.version,
  dateModified: dataset.updated,
  keywords: dataset.profile?.keywords ?? dataset.tags,
  isAccessibleForFree: false,
  // A card that withholds its owner's name names no creator here either
  ...(dataset.owner !== OWNER_PENDING && { creator: { '@type': 'Organization', name: dataset.owner } }),
  provider: ASERYX,
  includedInDataCatalog: { '@type': 'DataCatalog', name: 'Aseryx datasets', url: canonicalUrl('/datasets') },
});

/** A blog post as a schema.org BlogPosting. */
export const blogPostingData = (post) => {
  const url = canonicalUrl(`/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/aseryx-card.png`,
    articleSection: post.category,
    author: ASERYX,
    publisher: ASERYX,
  };
};
