import { blogSlugFromPath, findPost } from '../data/blog/index.js';
import { findDataset } from '../data/datasets.js';

/** The site's origin, for canonical URLs, social tags and the sitemap. */
export const SITE_URL = 'https://aseryx.xyz';
export const canonicalUrl = (path) => `${SITE_URL}${path}`;

/** Per-route SEO metadata used by usePageMeta and the prerender script */
export const PAGE_META = {
  '/': {
    title: 'Aseryx · Get paid for your data without handing it over first',
    description:
      "License your data to AI companies. Every dataset gets a quality certificate teams review before anything is shared.",
  },
  '/datasets': {
    title: 'Aseryx · Datasets',
    description:
      'Datasets from the people and companies who own them. Each profile is approved by its owner and says whether it carries a quality certificate.',
  },
  '/benchmarks': {
    title: 'Aseryx · Benchmarks',
    description: 'How ready each dataset is for training, scored by one formula per domain.',
  },
  '/buyers': {
    title: 'Aseryx · For AI companies',
    description:
      "Know what you're getting before you pay. Read the quality certificate, run a query, then make an offer. Payment is held until the owner approves.",
  },
  '/appraisal': {
    title: 'Aseryx · Score preview',
    description: 'See how ready your dataset is, in minutes. A preview of your quality score that never sets a price.',
  },
  '/blog': {
    title: 'Aseryx · Blog',
    description: 'Writing on licensing private data: rights, provenance, quality and who gets paid.',
  },
  '/privacy': {
    title: 'Aseryx | Privacy Policy',
    description: 'Aseryx privacy policy and data handling practices.',
  },
  '/terms': {
    title: 'Aseryx | Terms of Use',
    description: 'Aseryx terms of use.',
  },
  '/404': {
    title: 'Page not found | Aseryx',
    description: 'This URL is not part of the Aseryx site.',
  },
};

export function metaForBlogPost(post) {
  return {
    title: `${post.title} | Aseryx Blog`,
    description: post.excerpt,
  };
}

export function metaForDataset(dataset) {
  return {
    title: `${dataset.title} | Aseryx Datasets`,
    description: dataset.summary,
  };
}

/** Meta for any route the prerender writes: a page, a post or a dataset; anything else gets the 404's. */
export function resolvePageMeta(route) {
  if (PAGE_META[route]) return PAGE_META[route];

  const post = findPost(blogSlugFromPath(route));
  if (post) return metaForBlogPost(post);

  const dataset = findDataset(route.match(/^\/datasets\/([^/]+)\/?$/)?.[1]);
  if (dataset) return metaForDataset(dataset);

  return PAGE_META['/404'];
}
