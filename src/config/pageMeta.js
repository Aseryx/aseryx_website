import { blogSlugFromPath, findPost } from '../data/blog/index.js';
import { findDataset } from '../data/datasets.js';

/** The site's origin, for canonical URLs, social tags and the sitemap. */
export const SITE_URL = 'https://aseryx.xyz';
export const canonicalUrl = (path) => `${SITE_URL}${path}`;

/** Per-route SEO metadata used by usePageMeta and the prerender script */
export const PAGE_META = {
  '/': {
    title: 'Aseryx · Datasets licensed by the people who made them',
    description:
      "Aseryx appraises data for completeness, consistency and structure, then matches it with AI companies that need it for training and evaluation.",
  },
  '/datasets': {
    title: 'Aseryx · Datasets',
    description: "Datasets from the people who made them. Each profile's owner approves every line before it's shared.",
  },
  '/benchmarks': {
    title: 'Aseryx · Benchmarks',
    description: 'How ready each dataset is for training, scored by one formula per domain.',
  },
  '/buyers': {
    title: 'Aseryx · For buyers',
    description:
      'Aseryx appraises each dataset for completeness, consistency and structure. Start from a small free sample, then license directly from the owner.',
  },
  '/appraisal': {
    title: 'Aseryx · Appraisal preview',
    description: 'Answer seven questions for a preview of your appraisal: the checks your dataset is likely to pass, and what to fix first.',
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
