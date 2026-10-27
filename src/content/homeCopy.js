import { STEPS } from '../data/steps.js';

/**
 * The homepage copy the site ships: Option E from Notion > Aseryx Messaging,
 * drafted, not yet approved (Austin and Tala approve together). The other
 * drafts live in homeCopyDrafts.js, which only dev builds load, so
 * unapproved lines never reach the public bundle.
 */

export const HOME_COPY = {
  label: 'E',
  hero: {
    title: 'Let AI teams judge your dataset before you share it.',
    lede: "Aseryx checks your dataset's quality and gives teams a result they can review up front. You decide who gets a sample, and nothing is shared until you approve.",
    secondary: { label: 'See how it works', href: '#how-it-works' },
  },
  proof: [
    { label: "Checked before it's shared", line: "Aseryx checks your dataset's quality and gives teams a result they can review up front." },
    { label: 'You approve every sample', line: 'Teams start with a small free sample. Nothing is shared until you approve.' },
    { label: 'You set the price', line: 'You keep at least 80%, and you can license your dataset anywhere else too.' },
  ],
  howTitle: 'One path, from your dataset to a license on terms you both agree.',
  steps: STEPS,
  datasets: {
    title: 'Profiles you can check',
    lede: 'Every dataset has a profile its owner approved line by line: what it holds, how it was made, and how it is licensed.',
    action: 'All datasets',
  },
  benchmarks: {
    title: 'Readiness, scored the same way every time',
    lede: 'One formula scores every dataset in a domain, so you can compare before anyone asks for access.',
  },
  faqLede: 'What owners ask before anything else.',
  faqs: [
    {
      question: 'What does Aseryx do?',
      answer:
        "Aseryx lets a dataset be judged before it's shared. It checks the dataset's quality and writes a short profile its owner approves line by line, and the owner decides who gets a sample.",
    },
    {
      question: 'Who is it for?',
      answer:
        'People who made their data themselves: original archives such as sample libraries, maps, 3D models and photography, and first-hand capture such as robotics, driving, drone, motion and sensor data. Researchers and clinicians with a real, consented dataset too.',
    },
    { question: 'How is Aseryx paid?', answer: 'You set the price and keep at least 80%.' },
    {
      question: 'What do I keep?',
      answer:
        'The master copy and the final say. Nothing is shared until you approve, and you stay free to license the dataset anywhere else.',
    },
    {
      question: 'What does the quality check look at?',
      answer:
        'Six checks: structure, completeness, validity, uniqueness, consistency and labels. Every dataset in a domain is checked the same way, so teams can compare them.',
    },
  ],
  close: {
    title: 'Nothing is shared until you approve.',
    lede: 'You set the price, keep at least 80%, and stay free to license your dataset anywhere else.',
    secondary: { label: 'See how it works', href: '#how-it-works' },
  },
};
