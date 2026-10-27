/** Per-route SEO metadata used by usePageMeta and the prerender script */
export const PAGE_META = {
  '/': {
    title: 'Aseryx · Let AI teams judge your dataset before you share it',
    description:
      "Aseryx checks your dataset's quality and gives AI teams a result they can review up front. You decide who gets a sample, and nothing is shared until you approve.",
  },
  '/datasets': {
    title: 'Aseryx · Datasets',
    description: 'Datasets with an owner-approved profile: what each one holds, how it was made, and how it is licensed.',
  },
  '/benchmarks': {
    title: 'Aseryx · Benchmarks',
    description: 'How ready each dataset is for training, scored by one formula per domain.',
  },
  '/buyers': {
    title: 'Aseryx · For buyers',
    description:
      "Real datasets from the people who made them, each with a quality check you can review first. Start from a small free sample, then license directly from the owner.",
  },
  '/providers': {
    title: 'Aseryx · For providers',
    description:
      'Make your dataset available to teams training AI models. Teams start from a small free sample you approve, and you keep the master copy and the final say.',
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
