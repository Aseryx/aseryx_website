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
  '/providers': {
    title: 'Aseryx · For providers',
    description:
      'Make your dataset available to the AI companies that need it. You keep the master copy and the final say, and you stay free to work with anyone else.',
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

export function resolvePageMeta(pathname) {
  if (PAGE_META[pathname]) return PAGE_META[pathname];

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return null; // resolved at runtime with post data
  }

  return PAGE_META['/404'];
}
