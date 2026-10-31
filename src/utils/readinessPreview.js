import { bandOf } from '../data/benchmarks.js';

/**
 * Rough readiness preview from a provider's answers, shaped like the real
 * appraisal (score = 100 x product of checks) but run on estimates, not data.
 * It returns a band and per-check statuses, never a number or a price.
 */

export const QUESTIONS = [
  {
    id: 'type',
    legend: 'What kind of data is it?',
    options: [
      ['table', 'Tables'],
      ['text', 'Text'],
      ['video', 'Video'],
      ['images', 'Images'],
      ['3d', '3D'],
      ['motion', 'Motion'],
    ],
  },
  {
    id: 'size',
    legend: 'How big is it (files, clips, hours or entries)?',
    options: [
      ['under100', 'Under 100'],
      ['under400', '100 to 399'],
      ['under10k', '400 to 9,999'],
      ['under100k', '10,000 to 99,999'],
      ['more', '100,000 or more'],
    ],
  },
  {
    id: 'empty',
    legend: 'How complete is it?',
    options: [
      ['full', 'Almost all filled'],
      ['mostly', 'Mostly, 5 to 15% empty'],
      ['patchy', 'Patchy, 15 to 30% empty'],
      ['sparse', 'Sparse, over 30% empty'],
    ],
  },
  {
    id: 'repeats',
    legend: 'Any repeated entries?',
    options: [
      ['none', 'None that I know of'],
      ['some', 'Some'],
      ['many', 'Many'],
    ],
  },
  {
    id: 'label',
    legend: 'Does each entry have a label or outcome?',
    options: [
      ['yes', 'Yes'],
      ['no', 'No'],
      ['na', 'Not for this data'],
    ],
  },
  {
    id: 'docs',
    legend: 'Is it written down who made it and how?',
    options: [
      ['full', 'Yes, fully'],
      ['partial', 'In part'],
      ['none', 'Not yet'],
    ],
  },
  {
    id: 'rights',
    legend: 'Who holds the rights?',
    options: [
      ['own', 'We made it and own it'],
      ['licensed', 'We licensed it from someone'],
      ['unsure', 'Not sure'],
    ],
  },
];

export const DEFAULT_ANSWERS = {
  type: 'table',
  size: 'under10k',
  empty: 'mostly',
  repeats: 'none',
  label: 'yes',
  docs: 'partial',
  rights: 'own',
};

// Each factor follows its check's curve at the midpoint of the chosen range:
// cell quality reaches 0 at 20% empty; duplicates cost 2% at about 1% of rows
// (some) and 30% at about 18% (many).
const CELL_QUALITY = { full: 0.88, mostly: 0.5, patchy: 0, sparse: 0 };
const DUPLICATES = { none: 1, some: 0.98, many: 0.7 };

const TONE = { pass: 'Looks fine', watch: 'Worth a look', fix: 'Fix first' };

export function previewReadiness(answers) {
  const { type, size, empty, repeats, label, docs, rights } = answers;
  const tabular = type === 'table';
  const score = Math.floor(100 * CELL_QUALITY[empty] * DUPLICATES[repeats]);

  let state = 'scored';
  if (size === 'under100') state = 'insufficient';
  else if (size === 'under400') state = 'low';

  const status = (good, ok) => (good ? 'pass' : ok ? 'watch' : 'fix');
  const checks = [
    {
      name: 'Cell quality',
      status: status(empty === 'full', empty === 'mostly'),
      fix: 'Fill or drop empty values, starting where the most is missing',
    },
    {
      name: 'Duplicates',
      status: status(repeats === 'none', repeats === 'some'),
      fix: 'Remove repeated entries before scoring',
    },
    {
      name: 'Labels',
      status: label === 'no' && tabular ? 'watch' : 'pass',
      fix: 'Add a label to each entry so label checks can run',
    },
    {
      name: 'Provenance',
      status: status(docs === 'full', docs === 'partial'),
      fix: 'Write down who made the data, how and when',
    },
    {
      name: 'Rights',
      status: status(rights === 'own', rights === 'licensed'),
      fix:
        rights === 'licensed'
          ? 'Confirm your license lets you license it onward'
          : 'Confirm who holds the rights before anything is shared',
    },
  ].map((c) => ({ ...c, label: TONE[c.status] }));

  const order = { fix: 0, watch: 1, pass: 2 };
  const fixFirst = checks
    .filter((c) => c.status !== 'pass')
    .sort((a, b) => order[a.status] - order[b.status])
    .slice(0, 3)
    .map((c) => c.fix);

  return {
    state,
    tabular,
    band: state === 'insufficient' ? null : bandOf(score),
    checks,
    fixFirst,
  };
}
