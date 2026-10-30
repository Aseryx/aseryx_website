import { TALLY } from './tally.js';

/**
 * Every call to action on the site, one label per destination and intent:
 * a verb and its object, in sentence case, saying what happens next.
 * Owners and AI companies each get their own verbs. Buttons take their
 * label from here through CtaButton, so the same action can't be named
 * three ways again.
 */
export const CTA = {
  // Owners
  listDataset: { label: 'List your dataset', href: TALLY.appraisal },
  previewScore: { label: 'Preview your score', to: '/appraisal' },
  // AI companies
  exploreDatasets: { label: 'Explore datasets', to: '/datasets' },
  requestDataset: { label: 'Request a dataset', href: TALLY.buyerAccess },
  // Only on a dataset's own profile. Until listings run queries, it opens
  // the buyer request form.
  runQuery: { label: 'Run a query', href: TALLY.buyerAccess },
  seeLicensing: { label: 'See how licensing works', to: '/buyers' },
  // Everyone
  seeBenchmarks: { label: 'See the benchmarks', to: '/benchmarks' },
  readBlog: { label: 'Read the blog', to: '/blog' },
  followX: { label: 'Follow on X', href: 'https://x.com/aseryxHQ' },
  backHome: { label: 'Back to home', to: '/' },
};
