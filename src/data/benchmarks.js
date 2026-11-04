/** Score bands, highest first. */
export const BANDS = [
  { id: 'ready', label: 'Ready', min: 90 },
  { id: 'usable', label: 'Usable', min: 70 },
  { id: 'cleaning', label: 'Needs cleaning', min: 50 },
  { id: 'serious', label: 'Serious', min: 0 },
];

export const bandOf = (score) => (score == null ? null : BANDS.find((b) => score >= b.min));

/** Appraisal v11's four checks; the score is 100 x their product, rounded down. */
export const CHECKS = [
  { name: 'Structure', counts: 'Records the reader could not place, and records with broken text encoding', zero: '10% of records' },
  {
    name: 'Cell quality',
    counts: 'Empty cells and placeholders such as ? and NA, values of the wrong kind for their column, and text values seen only once in a category column, each cell counted once',
    zero: '20% of cells, or 30% in the worst column (a column of blanks alone costs at most 70%)',
  },
  { name: 'Duplicates', counts: 'Repeated rows, compared without ID columns', zero: '30% of rows (costs at most half the score: 10% at 5% of rows, 30% at 18%)' },
  { name: 'Labels', counts: 'Rows whose features match but whose labels disagree', zero: '10% of rows (costs at most half the score)' },
];

/** Calibration on the 439-file corpus: these files helped build the score, so this is not evidence. */
export const CALIBRATION = [
  { value: '75 of 82', note: 'known-good files score 90 or more' },
  { value: '55 of 65', note: 'known-dirty files score under 70' },
  { value: '96.5%', note: 'of good and dirty pairs put the good file higher' },
  { value: '15 of 15', note: 'clean and dirty twins put the clean copy higher or level' },
];
