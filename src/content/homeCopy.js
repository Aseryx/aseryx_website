import { STEPS } from '../data/steps.js';

/**
 * Homepage copy, written with the Website Copywriting & Positioning skills
 * (diagnose, landing page from a brief, proof check) from the facts in
 * Notion > Aseryx Messaging. Each fact is said once, where the reader needs
 * it. Still a draft until Austin and Tala approve it together.
 */
export const HOME_COPY = {
  hero: {
    // Kled's and DataVendor's register: a category statement, then both
    // sides in one line, with the appraisal said for what it is. Chosen from
    // six wordings; "matches" is a deliberate exception to the go-between
    // rule in Notion's copy rules.
    title: 'Datasets licensed by the people who made them.',
    lede: 'Aseryx appraises data for completeness, consistency and structure, then matches it with AI companies that need it for training and evaluation.',
    // Second door, for AI companies (a key in src/config/ctas.js)
    secondaryAction: 'exploreDatasets',
  },
  // Approved Oct 21 line, Tala's Oct 25 free first sample, and non-exclusive
  // from the copy rules.
  proof: [
    { label: 'You approve every sample', line: 'The first one is free, after the team signs confidentiality.' },
    { label: 'You keep at least 80%', line: 'You set the price.' },
    { label: "It's non-exclusive", line: 'License it anywhere else too.' },
  ],
  howTitle: 'From your dataset to a signed license',
  steps: STEPS,
  datasets: {
    title: 'What you can license',
    lede: 'Archives, captures and research data, with profiles their owners approve line by line.',
  },
  benchmarks: {
    title: 'Scored the same way, every time',
    lede: 'One formula per domain, so teams can compare.',
  },
  // The four questions sellers ask before a call (Oct 22 file, 2.8).
  faqs: [
    {
      question: 'Who is it for?',
      answer: 'People who made a dataset and hold the rights to it, from sample libraries to driving footage.',
    },
    { question: 'What do I keep?', answer: 'The master copy and the final say on every sample.' },
    { question: 'How does Aseryx get paid?', answer: 'Aseryx keeps up to 20% of each license.' },
    { question: 'Is a team asking for my data?', answer: "If no team is asking for your kind of data yet, we'll say so." },
  ],
  close: {
    title: 'Start with one dataset.',
    lede: 'Nothing is shared until you approve.',
    secondaryAction: 'previewAppraisal',
  },
};
