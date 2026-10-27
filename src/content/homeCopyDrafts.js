import { HOME_COPY } from './homeCopy.js';

/**
 * Dev only: the other homepage drafts from Notion > Aseryx Messaging, for the
 * copy picker. PAGES are whole pages; HERO_ONLY are the other lead options
 * word for word, shown as a hero over the Option E page. Nothing here is
 * approved, and production builds drop this file.
 */

// Kled's voice with Aseryx's facts: the owner's job up front, short concrete
// lines, one door per audience, and each promise said once. Built with the
// ux-strategy pass (the owner's anxieties: who are you, the fee, control,
// exclusivity; the habit: selling direct) and the ux-writing standards
// (titles under 40 characters, sentences of 8 to 15 words).
const K = {
  label: 'Kled voice',
  hero: {
    title: 'License the data you made.',
    lede: "Aseryx checks your dataset's quality, so AI teams can judge it before anything is shared.",
    secondary: { label: 'Explore datasets', to: '/datasets' },
  },
  proof: [
    { label: 'You approve every sample', line: 'Teams start with a small free sample, after they sign confidentiality.' },
    { label: 'You set the price', line: 'You keep at least 80% of every license.' },
    { label: 'You keep your options', line: "It's non-exclusive. Keep selling direct and license it anywhere else." },
  ],
  howTitle: 'From your dataset to a license',
  steps: [
    { id: 'lock', chip: 'Pick', title: 'Pick your dataset', body: 'Choose the archive or capture you made, and what goes in it.' },
    {
      id: 'verify',
      chip: 'Check',
      title: 'Get it checked',
      body: 'Aseryx checks its quality and drafts a short profile. You approve every line.',
    },
    { id: 'control', chip: 'Approve', title: 'Approve a sample', body: 'When a team asks for a sample, you say yes or no.' },
    { id: 'license', chip: 'Sign', title: 'Sign the license', body: 'Agree terms with the team directly. You set the price.' },
  ],
  datasets: {
    title: 'Find data from the people who made it',
    lede: 'Every dataset comes with a quality check and a profile its owner approved. Start from a small free sample.',
    action: 'Explore datasets',
  },
  benchmarks: HOME_COPY.benchmarks,
  faqLede: 'What owners ask before anything else.',
  faqs: [
    {
      question: 'What does Aseryx do?',
      answer: "Aseryx checks your dataset's quality and drafts a profile you approve. AI teams can judge it before anything is shared.",
    },
    { question: 'Is a team asking for my data?', answer: "If no team is asking for your kind of data yet, we'll say so." },
    { question: 'How does Aseryx get paid?', answer: 'You set the price and keep at least 80% of every license.' },
    {
      question: 'What do I keep?',
      answer: 'The master copy, the final say on every sample, and the freedom to work with anyone else.',
    },
    {
      question: 'Who is it for?',
      answer:
        'People who made their own data: sample libraries, maps, 3D models, driving, drone and motion capture, and consented research data.',
    },
  ],
  close: {
    title: 'Get your dataset in front of the AI teams that need it.',
    lede: 'Start with one dataset. Nothing is shared until you approve.',
    secondary: { label: 'Explore datasets', to: '/datasets' },
  },
};

// DataVendor's voice: the whole page in as few words as it can take. A
// headline under 6 words, one line under it, labels without lines, three
// steps, three questions, and a close that points to the readiness preview
// the way theirs points to an estimator. Their prices, "marketplace",
// matching and borrowed statistics break the Aseryx copy rules, so none of
// those come across.
const DV = {
  label: 'DataVendor voice',
  hero: {
    title: 'License the data you made.',
    lede: 'Teams see its quality first. Nothing is shared until you approve.',
    secondary: { label: 'Explore datasets', to: '/datasets' },
  },
  proof: [{ label: 'You approve every sample' }, { label: 'You keep at least 80%' }, { label: 'Non-exclusive' }],
  howTitle: 'How it works',
  steps: [
    { id: 'lock', chip: 'Add', title: 'Add your dataset', body: 'Choose what goes in it.' },
    { id: 'verify', chip: 'Check', title: 'Get it checked', body: 'Teams see the result up front.' },
    { id: 'license', chip: 'License', title: 'License it', body: 'Approve a sample, then sign directly.' },
  ],
  datasets: {
    title: 'What you can license',
    lede: 'Archives, captures and research data you made yourself.',
    action: 'Explore datasets',
  },
  benchmarks: {
    title: 'Scored the same way, every time',
    lede: 'One formula per domain, so teams can compare.',
  },
  faqLede: null,
  faqs: [
    { question: 'What does Aseryx do?', answer: 'It checks your dataset so AI teams can judge it before anything is shared.' },
    { question: 'How does Aseryx get paid?', answer: 'You set the price and keep at least 80%.' },
    { question: 'Is a team asking for my data?', answer: "If no team is asking yet, we'll say so." },
  ],
  close: {
    title: 'Start with one dataset.',
    lede: null,
    secondary: { label: 'Check your dataset', to: '/appraisal' },
  },
};

const PAGES = { e: HOME_COPY, k: K, dv: DV };

const HERO_ONLY = {
  c: {
    label: 'C',
    title: 'Get your dataset in front of the AI teams that need it.',
    lede: 'Nothing is shared until you approve it.',
  },
  d: {
    label: 'D',
    title: 'Turn your data into a licensable asset.',
    lede: "You set the price and approve what's shared. Buyers see its quality before they pay.",
  },
  b: {
    label: 'B',
    title: "Aseryx certifies a dataset's quality, so buyers can trust it before they see it.",
    lede: 'Then you license it on your terms, for a set time.',
  },
  a: {
    label: 'A',
    title: "Aseryx certifies a dataset's quality without exposing the records, so buyers can trust it before they see it.",
    lede: 'Then you license it on your terms, for a set time, without handing it to a broker.',
  },
  approved: {
    label: 'Oct 21',
    title: 'Aseryx helps you license a dataset to an AI team.',
    lede: 'You set the price and keep at least 80%. Your data stays under your control, and nothing is shared until you approve.',
  },
};

/** The page for a picker key: a whole page, or Option E with another hero. */
export const copyFor = (key) => {
  if (PAGES[key]) return PAGES[key];
  if (HERO_ONLY[key]) return { ...HOME_COPY, hero: { ...HOME_COPY.hero, ...HERO_ONLY[key] } };
  return HOME_COPY;
};

// A function, not a constant: a top-level call would count as a side effect
// and keep this whole file (and every unapproved line) in production builds.
export const pickerKeys = () =>
  [...Object.keys(PAGES), ...Object.keys(HERO_ONLY)].map((key) => [key, (PAGES[key] ?? HERO_ONLY[key]).label]);
