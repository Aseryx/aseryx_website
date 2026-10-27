/** Per-route SEO metadata used by usePageMeta and the prerender script */
export const PAGE_META = {
  '/': {
    title: 'Aseryx · Turn your chosen dataset into a licensable asset',
    description:
      'Package and appraise your dataset, get a quality certificate, and grant access for a set time. All on your machine. Join the beta.',
  },
  '/datasets': {
    title: 'Aseryx · Datasets',
    description: 'Datasets with an owner-approved profile: what each one holds, how it was made, and how it is licensed.',
  },
  '/benchmarks': {
    title: 'Aseryx · Benchmarks',
    description: 'How ready each dataset is for training, scored by one formula per domain. Readiness, not price.',
  },
  '/buyers': {
    title: 'Aseryx · For buyers',
    description: 'Read the profile, check the readiness report, and sign the license with the owner directly.',
  },
  '/providers': {
    title: 'Aseryx · For providers',
    description: 'Connect, lock and appraise your dataset on your machine, then decide who gets access and for how long.',
  },
  '/appraisal': {
    title: 'Aseryx · Appraisal preview',
    description: 'Describe your dataset and see a readiness preview: the checks it passes and what to fix first.',
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

export function resolvePageMeta(pathname) {
  if (PAGE_META[pathname]) return PAGE_META[pathname];

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return null; // resolved at runtime with post data
  }

  return PAGE_META['/404'];
}
