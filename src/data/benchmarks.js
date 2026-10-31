/**
 * Health readiness benchmark, from the Dataset Readiness Board (appraisal v10,
 * rules v10.1, Oct 23 run). One formula scores every table and health tables
 * are compared only with each other. Scores are readiness, never price.
 *
 * group: 'ranked' (400+ rows), 'low' (under 400 rows: low confidence, not
 * ranked), 'pending' (waits for a v10.1 score). reputation is what was written
 * down before scoring. rarest is the smallest outcome class, as a share of rows.
 */
export const BENCHMARK = {
  domain: 'Health',
  version: 'appraisal v10 · rules v10.1 · core v0.5.0',
  run: 'Oct 23, 2026',
};

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

const TABLES = [
  { id: 'cmc', name: 'Contraceptive Method Choice', short: 'A married woman in a 1987 Indonesian survey', group: 'ranked', score: 100, reputation: 'good', rows: 1473, columns: 10, task: 'multiclass', rarest: 22.6, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'documented' },
  { id: 'pima', name: 'Pima Indians Diabetes', short: 'A Pima woman aged 21 or older, near Phoenix, Arizona', group: 'ranked', score: 100, reputation: 'good', rows: 768, columns: 9, task: 'binary', rarest: 34.9, license: 'Not stated', licenseLevel: 'unclear', provenance: 'partial' },
  { id: 'wdbc', name: 'Breast Cancer Wisconsin (Diagnostic)', short: 'A breast-mass biopsy image, University of Wisconsin', group: 'ranked', score: 100, reputation: 'good', rows: 569, columns: 31, task: 'binary', rarest: 37.3, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'partial' },
  { id: 'dmft', name: 'Dental DMFT', short: 'A person’s tooth decay before and after prevention', group: 'ranked', score: 100, reputation: 'good', rows: 797, columns: 5, task: 'multiclass', rarest: 15.4, license: 'Not stated', licenseLevel: 'unclear', provenance: 'none' },
  { id: 'hypo', name: 'Thyroid hypo', short: 'A thyroid patient record; the mirror names no source', group: 'ranked', score: 99, reputation: 'dirty', rows: 3269, columns: 29, task: 'multiclass', rarest: 0.1, license: 'Unknown', licenseLevel: 'unclear', provenance: 'partial' },
  { id: 'brfss', name: 'Diabetes Health Indicators (BRFSS 2015)', short: 'A US adult in the CDC’s 2015 phone survey', group: 'ranked', score: 95, reputation: 'good', rows: 253680, columns: 22, task: 'binary', rarest: 13.9, license: 'CC0', licenseLevel: 'open', provenance: 'documented' },
  { id: 'ilpd', name: 'Indian Liver Patient', short: 'A patient in north-east Andhra Pradesh, India', group: 'ranked', score: 92, reputation: 'good', rows: 583, columns: 11, task: 'binary', rarest: 28.6, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'partial' },
  { id: 'framingham', name: 'Framingham Heart Study (Kaggle copy)', short: 'A patient record; the Kaggle page names no source', group: 'ranked', score: 81, reputation: 'dirty', rows: 4240, columns: 16, task: 'binary', rarest: 15.2, license: 'Unknown', licenseLevel: 'unclear', provenance: 'none' },
  { id: 'blood', name: 'Blood Transfusion Service Center', short: 'A blood donor in Hsin-Chu City, Taiwan', group: 'ranked', score: 79, reputation: 'good', rows: 748, columns: 5, task: 'binary', rarest: 23.8, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'documented' },
  { id: 'mammo', name: 'Mammographic Masses', short: 'A mass on a mammogram, Erlangen, 2003 to 2006', group: 'ranked', score: 69, reputation: 'dirty', rows: 961, columns: 6, task: 'binary', rarest: 46.3, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'documented' },
  { id: 'stroke', name: 'Stroke Prediction', short: 'A patient; Kaggle lists a confidential source', group: 'ranked', score: 39, reputation: 'dirty', rows: 5110, columns: 12, task: 'binary', rarest: 4.9, license: 'Education only', licenseLevel: 'restricted', provenance: 'none' },
  { id: 'sick', name: 'Thyroid sick', short: 'A thyroid patient record, Garavan Institute, Sydney', group: 'ranked', score: 28, reputation: 'dirty', rows: 3772, columns: 30, task: 'binary', rarest: 6.1, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'documented' },
  { id: 'vertebral', name: 'Vertebral Column', short: 'An orthopaedic patient, Lyon, France', group: 'low', score: 100, reputation: 'good', rows: 310, columns: 7, task: 'binary', rarest: 32.3, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'partial' },
  { id: 'haberman', name: 'Haberman’s Survival', short: 'A breast-cancer surgery patient, Chicago, 1958 to 1970', group: 'low', score: 100, reputation: 'good', rows: 306, columns: 4, task: 'binary', rarest: 26.5, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'documented' },
  { id: 'heart', name: 'Heart Failure Clinical Records', short: 'A heart-failure patient, Faisalabad, Pakistan, 2015', group: 'low', score: 100, reputation: 'good', rows: 299, columns: 13, task: 'binary', rarest: 32.1, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'documented' },
  { id: 'hepatitis', name: 'Hepatitis', short: 'A hepatitis patient; source not stated', group: 'low', score: 30, reputation: 'dirty', rows: 155, columns: 20, task: 'binary', rarest: 20.6, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'none' },
  { id: 'appendicitis', name: 'Regensburg Pediatric Appendicitis', short: 'A child with abdominal pain, Regensburg, 2016 to 2021', group: 'pending', score: null, reputation: 'dirty', rows: 782, columns: 56, task: 'binary', rarest: null, license: 'Non-commercial', licenseLevel: 'restricted', provenance: 'documented' },
  { id: 'heart_h', name: 'Hungarian Heart Disease', short: 'A heart patient in Budapest, assessed for coronary disease', group: 'pending', score: null, reputation: 'dirty', rows: 294, columns: 14, task: 'binary', rarest: 36.1, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'partial' },
  { id: 'pbc', name: 'Mayo Primary Biliary Cirrhosis', short: 'A liver-disease patient in a Mayo Clinic trial, 1974 to 1984', group: 'pending', score: null, reputation: 'dirty', rows: 418, columns: 19, task: 'binary', rarest: null, license: 'Not stated', licenseLevel: 'unclear', provenance: 'documented' },
  { id: 'cervical', name: 'Cervical Cancer Risk Factors', short: 'A patient at a Caracas hospital: habits, history and four test results', group: 'pending', score: null, reputation: 'dirty', rows: 858, columns: 36, task: 'binary', rarest: null, license: 'CC BY 4.0', licenseLevel: 'open', provenance: 'partial' },
  { id: 'support2', name: 'SUPPORT2', short: 'A seriously ill adult in one of five US hospitals, 1989 to 1994', group: 'pending', score: null, reputation: 'dirty', rows: 9105, columns: 47, task: 'binary', rarest: 31.9, license: 'Permission to use', licenseLevel: 'unclear', provenance: 'documented' },
  { id: 'efron', name: 'Diabetes Progression (Efron et al.)', short: 'A diabetes patient: ten baseline measures, progression a year later', group: 'pending', score: null, reputation: 'good', rows: 442, columns: 11, task: 'binary', rarest: null, license: 'Not stated', licenseLevel: 'unclear', provenance: 'none' }
];

export default TABLES;
