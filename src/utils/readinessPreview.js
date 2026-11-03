import { bandOf } from '../data/benchmarks.js';

/**
 * Rough readiness preview from a provider's answers, shaped like appraisal v11
 * (score = 100 x the product of its four checks) but run on estimates, not
 * data. Like v11 it scores tables only. It returns a band and per-check
 * statuses, never a number or a price. Rights and provenance are needed to
 * list but are not scored, so they come back apart from the checks.
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
  // tableOnly questions feed the score, so they are asked about tables only.
  {
    id: 'size',
    legend: 'How many entries does it have?',
    tableOnly: true,
    options: [
      ['under100', 'Under 100'],
      ['under400', '100 to 399'],
      ['under10k', '400 to 9,999'],
      ['under100k', '10,000 to 99,999'],
      ['more', '100,000 or more'],
    ],
  },
  {
    id: 'structure',
    legend: "Any entries that don't fit the columns, or show garbled text?",
    tableOnly: true,
    options: [
      ['none', 'None that I know of'],
      ['some', 'Some'],
      ['many', 'Many'],
    ],
  },
  {
    id: 'cells',
    legend: 'How many values are empty or malformed?',
    tableOnly: true,
    options: [
      ['under1', 'Under 1%'],
      ['under5', '1 to 5%'],
      ['under15', '5 to 15%'],
      ['under30', '15 to 30%'],
      ['more', 'Over 30%'],
    ],
  },
  {
    id: 'repeats',
    legend: 'Any repeated entries?',
    tableOnly: true,
    options: [
      ['none', 'None that I know of'],
      ['some', 'Some'],
      ['many', 'Many'],
    ],
  },
  {
    id: 'labels',
    legend: 'Do otherwise identical entries ever have different labels?',
    tableOnly: true,
    options: [
      ['agree', 'No, they agree'],
      ['some', 'Sometimes'],
      ['many', 'Often'],
      ['nolabel', 'There is no label'],
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
  structure: 'none',
  cells: 'under15',
  repeats: 'none',
  labels: 'agree',
  docs: 'partial',
  rights: 'own',
};

// Each factor follows its check's curve at a typical share for each answer:
// - structure reaches 0 at 10% of entries: 10% off at about 1% (some), half
//   at about 5% (many);
// - cell quality reaches 0 at 20% of values, file-wide, taken at each range's
//   midpoint. v11 also tests the worst column alone, so one mostly empty
//   column can cost more than this;
// - duplicates cost 2% at about 1% of entries (some), 30% at about 18% (many);
// - label conflicts cost 10% at about 1% (sometimes) and at most half, reached
//   at 5% (often); a table with no label loses nothing.
const STRUCTURE = { none: 1, some: 0.9, many: 0.5 };
const CELL_QUALITY = { under1: 0.975, under5: 0.85, under15: 0.5, under30: 0, more: 0 };
const DUPLICATES = { none: 1, some: 0.98, many: 0.7 };
const LABELS = { agree: 1, some: 0.9, many: 0.5, nolabel: 1 };

const TONE = { pass: 'Looks fine', watch: 'Worth a look', fix: 'Fix first' };

export function previewReadiness(answers) {
  const { type, size, structure, cells, repeats, labels, docs, rights } = answers;
  const tabular = type === 'table';

  // Needed to list any data, and never part of the score.
  const beforeListing = [
    docs !== 'full' && 'Write down who made the data, how and when',
    rights === 'licensed' && 'Confirm your license lets you license it onward',
    rights === 'unsure' && 'Confirm who holds the rights before anything is shared',
  ].filter(Boolean);

  // v11 reads tables only (CSV, TSV, JSON and JSONL), so other data gets no band.
  if (!tabular) {
    return { state: 'unscored', tabular, band: null, checks: [], fixFirst: [], beforeListing };
  }

  const score = Math.floor(
    100 * STRUCTURE[structure] * CELL_QUALITY[cells] * DUPLICATES[repeats] * LABELS[labels],
  );

  let state = 'scored';
  if (size === 'under100') state = 'insufficient';
  else if (size === 'under400') state = 'low';

  const status = (good, ok) => (good ? 'pass' : ok ? 'watch' : 'fix');
  const checks = [
    {
      name: 'Structure',
      status: status(structure === 'none', structure === 'some'),
      fix: "Repair entries that don't fit the columns or show garbled text",
    },
    {
      name: 'Cell quality',
      status: status(cells === 'under1', cells === 'under5'),
      fix: 'Fill or fix empty and malformed values, worst column first',
    },
    {
      name: 'Duplicates',
      status: status(repeats === 'none', repeats === 'some'),
      fix: 'Remove repeated entries before scoring',
    },
    {
      name: 'Labels',
      status: status(labels === 'agree' || labels === 'nolabel', labels === 'some'),
      fix: 'Reconcile identical entries that carry different labels',
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
    beforeListing,
  };
}
