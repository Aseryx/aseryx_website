import { STEPS } from '../data/steps.js';

/**
 * Homepage copy, from Website copy v2 (Aseryx Messaging, Website v2 tab).
 * Each fact is said once, where the reader needs it.
 */
export const HOME_COPY = {
  hero: {
    // The payoff first; the subhead carries the certificate.
    title: 'Get paid for your data without handing it over first.',
    lede: 'License your data to AI companies. Every dataset gets a quality certificate teams review before anything is shared.',
    // Second door, for AI companies (a key in src/config/ctas.js)
    secondaryAction: 'exploreDatasets',
  },
  // Under the hero buttons: where the people building Aseryx studied or
  // worked, as names only. Empty until the team confirms the list, and the
  // line stays hidden while it is empty.
  builtBy: {
    title: 'Built by a team from',
    places: [],
  },
  // Earn, approve, certificate. Non-exclusive is answered in the questions.
  // Earn's heading is its figure, rolling into place: "You keep 80%" of every license.
  proof: [
    {
      label: 'Earn',
      figure: { value: 80, prefix: 'You keep ', suffix: '%' },
      line: 'of every license. Aseryx earns only when a team pays.',
    },
    { label: 'You approve', line: "Nothing is shared until you approve an offer, and it’s scored in your browser." },
    { label: 'Quality certificate', line: 'AI companies review it before they pay, without seeing the data.' },
  ],
  howTitle: 'Three steps to a paid license',
  steps: STEPS,
  datasets: {
    title: 'What you can license',
    lede: 'Tabular data, databases and text, each with a quality certificate. Footage, audio and 3D can show a profile now; certificates follow.',
  },
  benchmarks: {
    title: 'Scored the same way, every time',
    lede: 'One formula per domain, so teams can compare.',
  },
  // The first four answer what owners ask first; the rest follow.
  faqs: [
    {
      question: 'Who is it for?',
      answer:
        'Anyone who owns a dataset AI companies need. Certificates work today for companies, labs and founders with tabular data, databases or text; for makers, studios and robotics teams with footage, audio or 3D, certificates follow.',
    },
    { question: 'What does it cost?', answer: 'Nothing to list. Aseryx keeps 20% of each license, only when a team pays.' },
    {
      question: "How do teams know it’s good?",
      answer:
        'Every dataset gets a quality certificate: what it contains and how clean and well-structured it is, worked out from that exact data. Teams can also query how much of the data meets their conditions before they pay, and get a count checked against the data.',
    },
    {
      question: 'Who sees my data?',
      answer: 'Teams see the certificate and their query results. Nothing else is shared until you approve an offer.',
    },
    {
      question: 'How long does a license run?',
      answer:
        "3, 6, 9 or 12 months, as set in the offer you approve. It’s non-exclusive, so you can license it anywhere else too.",
    },
    {
      question: 'Do teams get a sample?',
      answer: 'No. They read the certificate and run a query instead, so nothing is handed over before they pay.',
    },
    {
      question: 'Can I list footage, audio or 3D?',
      answer:
        'You can show a profile now. Certificates and full listings follow; they start with tabular data, databases and text.',
    },
    { question: 'Is a team asking for my data?', answer: "If no team is asking for your kind of data yet, we’ll tell you." },
    {
      question: 'Where does my data sit?',
      answer:
        "When you lock a dataset, Aseryx stores a locked copy of it. Only a team whose offer you approve can open it, and Aseryx can’t. Its quality score is worked out in your browser.",
    },
    { question: 'When can I start?', answer: 'Aseryx opens in beta soon. List your dataset now and get its profile ready.' },
  ],
  close: {
    title: 'Start with one dataset.',
    lede: 'Nothing is shared until you approve.',
    secondaryAction: 'previewScore',
  },
};
