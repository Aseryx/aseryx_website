// Imports no data: every page uses this file, so anything it imported would
// ride in the bundle every visitor downloads. The prerender matches routes to
// posts and datasets itself (resolvePageMeta in scripts/prerender.mjs).

/** The site's origin, for canonical URLs, social tags and the sitemap. */
export const SITE_URL = 'https://aseryx.xyz';

/**
 * A page's one address. Each page is written to route/index.html, which the
 * host serves at the trailing-slash URL and redirects to from the bare one
 * (/privacy goes to /privacy/), so canonical links, social tags and the
 * sitemap all name the URL that answers with the page, not a redirect.
 */
export const canonicalUrl = (path) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;

/**
 * The one title format: what the page offers first, in the words people
 * search, so results and open tabs stay tellable apart. Home is the exception
 * that leads with the name it is about. Titles stay under 60 characters,
 * where search results start cutting them.
 */
const titled = (name) => `${name} | Aseryx`;

/** Per-route SEO metadata used by usePageMeta and the prerender script */
export const PAGE_META = {
  '/': {
    title: 'Aseryx | License your data to AI companies',
    description:
      "License your data to AI companies. Every dataset gets a quality certificate teams review before anything is shared.",
  },
  '/datasets': {
    title: titled('AI training datasets with a profile you can check'),
    description:
      'Datasets from the people and companies who own them. Each profile is approved by its owner and says whether it carries a quality certificate.',
  },
  '/benchmarks': {
    title: titled('How we test the readiness score'),
    description:
      'How we test the readiness score: public datasets labelled good or dirty before scoring, every miss named, and every score linked to its source.',
  },
  '/buyers': {
    title: titled('License AI training data you can check first'),
    description:
      "Know what you’re getting before you pay. Read the quality certificate, run a query, then make an offer. Payment is held until the owner approves.",
  },
  '/appraisal': {
    title: titled('See how ready your dataset is'),
    description: 'See how ready your dataset is, in minutes. A preview of your quality score that never sets a price.',
  },
  '/blog': {
    title: titled('Notes on private data licensing'),
    description: 'Writing on licensing private data: rights, provenance, quality and who gets paid.',
  },
  '/privacy': {
    title: titled('Privacy Policy'),
    description: 'How Aseryx collects, uses and protects your information when you use the site, and the rights you have over it.',
  },
  '/terms': {
    title: titled('Terms of Use'),
    description: 'The terms that apply when you use the Aseryx website and its services.',
  },
  '/404': {
    title: titled('Page not found'),
    description: 'This URL is not part of the Aseryx site.',
  },
};

export function metaForBlogPost(post) {
  return {
    // A title's own full stop ("The Training Data Dead End.") reads oddly before
    // the bar. A post whose title runs past 60 characters gives a shorter seoTitle.
    title: titled((post.seoTitle ?? post.title).replace(/\.$/, '')),
    description: post.excerpt,
  };
}

export function metaForDataset(dataset) {
  return {
    title: titled(dataset.title),
    description: dataset.summary,
  };
}
