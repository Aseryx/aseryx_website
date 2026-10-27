/**
 * Homepage hero drafts, word for word from Notion > Aseryx Messaging (lead
 * options, Oct 26, 2026). None is approved for public use yet: Austin and
 * Tala pick one together. The site shows DEFAULT_HERO; in dev, ?hero=<key>
 * or the picker in the corner previews another in place.
 */
export const HERO_OPTIONS = {
  e: {
    short: 'E',
    title: 'Let AI teams judge your dataset before you share it.',
    lede: "Aseryx checks your dataset's quality and gives teams a result they can review up front. You decide who gets a sample, and nothing is shared until you approve.",
  },
  c: {
    short: 'C',
    title: 'Get your dataset in front of the AI teams that need it.',
    lede: 'Nothing is shared until you approve it.',
  },
  d: {
    short: 'D',
    title: 'Turn your data into a licensable asset.',
    lede: "You set the price and approve what's shared. Buyers see its quality before they pay.",
  },
  b: {
    short: 'B',
    title: "Aseryx certifies a dataset's quality, so buyers can trust it before they see it.",
    lede: 'Then you license it on your terms, for a set time.',
  },
  a: {
    short: 'A',
    title: "Aseryx certifies a dataset's quality without exposing the records, so buyers can trust it before they see it.",
    lede: 'Then you license it on your terms, for a set time, without handing it to a broker.',
  },
  approved: {
    short: 'Oct 21',
    title: 'Aseryx helps you license a dataset to an AI team.',
    lede: 'You set the price and keep at least 80%. Your data stays under your control, and nothing is shared until you approve.',
  },
};

// Option E: the newest, and the one the Notion comparison rates as fitting
// the Oct 25 plans with low rule risk.
export const DEFAULT_HERO = 'e';
