export const BLOG_POSTS = [
  {
    slug: 'whos-really-making-money-off-your-data',
    title: 'Brokers take a cut when owners cannot finish',
    excerpt:
      'Licenses stall on what gets shared, where bytes sit, payment, and term. Brokers fill that gap, for a fee.',
    date: '2026-04-24',
    category: 'Data Economics',
    featured: true,
    readTime: '14 min read',
  },
  {
    slug: 'the-training-data-dead-end',
    title: 'The Training Data Dead End.',
    excerpt:
      'He needed a rights-clear feed. Public dumps were wrong. Brokers were expensive. Cold start is a counterparty problem, not a scoreboard problem.',
    date: '2026-04-16',
    category: 'AI Strategy',
    featured: false,
    readTime: '12 min read',
  },
  {
    slug: 'six-breaches-one-week-ai-stack-failing',
    title: 'Six Breaches in One Week: Why the Modern AI Stack Keeps Failing',
    excerpt: 'The last week of March 2026 was a masterclass in how the modern AI stack fails.',
    date: '2026-04-02',
    category: 'AI Security',
    featured: false,
    readTime: '12 min read',
  },
  {
    slug: 'benchmarks-tell-you-what-to-measure',
    title: 'Benchmarks Tell You What to Measure. But Who Verifies the Data Actually Meets the Benchmark?',
    excerpt: 'Standards name what to check. A license still needs proof of origin, rights, scope, and fitness.',
    date: '2026-04-01',
    category: 'Data Licensing',
    featured: false,
    readTime: '10 min read',
  },
];
export default BLOG_POSTS;

export const findPost = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

/** Slug of the blog post at `pathname`, or null for any other URL. */
export function blogSlugFromPath(pathname) {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
  return match ? match[1] : null;
}
