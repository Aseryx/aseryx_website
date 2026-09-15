/** Per-route SEO metadata used by usePageMeta and the prerender script */
export const PAGE_META = {
  '/': {
    title: 'Aseryx · Your data hub. Access on your terms',
    description:
      'Pick the files or tables. Decide who gets access and for how long. Lock, check, then paid access for a fixed term. Keep the archive. Access ends when the term ends.',
  },
  '/partners': {
    title: 'Aseryx · The platform for proprietary data licensing',
    description: 'Get paid for access. The archive is not the SKU.',
  },
  '/buyers': {
    title: 'Aseryx · The platform for proprietary data licensing',
    description: 'Get paid for access. The archive is not the SKU.',
  },
  '/datasets': {
    title: 'Aseryx · The platform for proprietary data licensing',
    description: 'Get paid for access. The archive is not the SKU.',
  },
  '/blog': {
    title: 'Aseryx · Blog',
    description: 'Writing on private data licenses, custody honesty, and what a quality check is not.',
  },
  '/privacy': {
    title: 'Aseryx | Privacy Policy',
    description: 'Aseryx privacy policy and data handling practices.',
  },
  '/terms': {
    title: 'Aseryx | Terms of Use',
    description: 'Aseryx terms of use.',
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
    title: `${dataset.shortTitle} | Aseryx Datasets`,
    description: dataset.description,
  };
}

export function resolvePageMeta(pathname) {
  if (PAGE_META[pathname]) return PAGE_META[pathname];

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return null; // resolved at runtime with post data
  }

  const datasetMatch = pathname.match(/^\/dataset\/([^/]+)$/);
  if (datasetMatch) {
    return null; // resolved at runtime with dataset data
  }

  return PAGE_META['/'];
}
