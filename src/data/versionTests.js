/**
 * Every published version of the score, v6 to v11, on the tests the corpus
 * marks in boardVersions.js do not cover. Copied from aseryx_benchmarks
 * benchmarks/docs/versions/README.md and the reports it names in
 * benchmarks/reports/runs (2026-11-09). v10 is rules v10.2. Each values array
 * follows BOARD_VERSIONS' order.
 */

/**
 * Held-out set 9: real exports picked and labelled before download, after
 * every version was frozen, scored once by each with no declarations
 * (2026-11-09-heldout9-v6-to-v11.md). met marks where a version reached the
 * mark set before scoring.
 */
export const HELDOUT9 = {
  good: 66,
  dirty: 37,
  usable: 4,
  twins: 27,
  checks: 10,
  // 160 files registered; 16 not scored: 13 under the registered rules, 2 twins whose originals were left out, 1 twin not built
  registered: 160,
  excludedByRule: 13,
  twinsWithoutOriginal: 2,
  goodAboveDirtyRange: [54.4, 65.2],
  marks: [
    { mark: 'Known-good files at 90 or more', needed: '53 of 66', values: [0, 32, 24, 29, 29, 26], met: [false, false, false, false, false, false] },
    { mark: 'Known-dirty files under 70', needed: '30 of 37', values: [33, 24, 28, 23, 27, 31], met: [true, false, false, false, false, true] },
    {
      mark: 'Good and dirty pairs with the good file higher',
      needed: '90%',
      values: ['61.8%', '57.8%', '59.5%', '54.4%', '65.2%', '64.8%'],
      met: [false, false, false, false, false, false],
    },
    { mark: 'Clean originals at or above their copy with errors added', needed: '25 of 27', values: [25, 23, 21, 22, 26, 26], met: [true, false, false, false, true, true] },
    { mark: 'Automatic-check cases found as written', needed: '10 of 10', values: [0, 0, 0, 0, 0, 10], met: [false, false, false, false, false, true] },
  ],
  // Each mark as a share with its 95% interval, [share, low, high] in percent: 10,000 resamples of the datasets, seed 9
  intervals: [
    { mark: 'Known-good files at 90 or more', values: [[0, 0, 0], [48.5, 36.5, 60.3], [36.4, 25.0, 47.9], [43.9, 32.2, 55.9], [43.9, 32.1, 56.1], [39.4, 27.6, 51.4]] },
    { mark: 'Known-dirty files under 70', values: [[89.2, 78.0, 97.6], [64.9, 48.6, 80.0], [75.7, 61.3, 88.9], [62.2, 46.2, 77.8], [73.0, 58.1, 86.7], [83.8, 71.1, 94.7]] },
    {
      mark: 'Good and dirty pairs with the good file higher',
      values: [[61.8, 50.0, 73.3], [57.8, 46.0, 69.4], [59.5, 47.7, 71.1], [54.4, 42.5, 66.6], [65.2, 54.6, 75.4], [64.8, 54.2, 75.1]],
    },
    {
      mark: 'Clean originals at or above their copy with errors added',
      values: [[92.6, 81.2, 100], [85.2, 70.8, 96.8], [77.8, 60.7, 92.6], [81.5, 65.4, 95.7], [96.3, 87.5, 100], [96.3, 87.5, 100]],
    },
  ],
};

/**
 * Held-out set 8 on the 66 files that could be rebuilt unchanged, as
 * delivered and with the 7 files v6 to v9's reader cannot open converted to
 * plain CSV
 * (2026-11-09-heldout8-v6-to-v11.md, 2026-11-09-heldout8-reader-fair.md).
 */
export const HELDOUT8_REBUILT = {
  files: 66,
  goodAboveDirtyPct: [41.8, 53.0, 51.0, 51.2, 77.0, 80.0],
  goodAboveDirtyPctConverted: [56.3, 76.5, 73.3, 74.0, 77.0, 80.0],
  // 95% intervals, [low, high] in percent: 10,000 resamples of the datasets, seed 9
  // (2026-11-09-bootstrap-v6-to-v11.md, "The 66 rebuilt files"). v10 and v11 less
  // each of v7 to v9 excludes zero on these files; on the 58 files every version
  // reads, no difference among v7 to v11 does.
  goodAboveDirtyInterval: [[21.0, 64.1], [32.6, 73.9], [29.6, 72.8], [29.4, 73.3], [59.0, 91.7], [64.6, 92.5]],
  readByAll: 58,
};

/**
 * Held-out set 8 on all 101 registered files, scored on v10 and v11 only:
 * v11's share of good and dirty pairs with the good file higher, with its 95%
 * interval (2026-11-09-bootstrap-v6-to-v11.md, "The registered 101 files").
 */
export const HELDOUT8_REGISTERED = { files: 101, goodAboveDirtyPct: 80.4, goodAboveDirtyInterval: [70.0, 89.8] };

/**
 * v11's must-pass attack cases on every version: files built to break the
 * score, each written after a break was found in an earlier version. Counted
 * only where a case reads output the version reports
 * (2026-11-09-attack-cases-by-origin.md).
 */
export const ATTACK_CASES = { passed: [13, 13, 18, 30, 41, 59], judged: [33, 34, 34, 39, 43, 59] };

/**
 * 240 seeded draws of 100 to 10,000 rows from five datasets; a draw holds
 * when it lands in its full file's band and within 5 points of its score.
 * at1000 is the 50 draws of 1,000 rows (2026-11-09-stability-v6-to-v11.md).
 */
export const STABILITY = { held: [38, 220, 200, 198, 194, 224], draws: 240, at1000: { held: [8, 50, 50, 48, 49, 50], draws: 50 } };

/**
 * v11's proofs on the corpus and the golden files: every file proved and
 * verified with every public output equal to the engine's, times in
 * milliseconds (aseryx_benchmarks benchmarks/reports/proofs/corpus-v11.0.json
 * and goldens-v11.0.json).
 */
export const PROOFS = { files: 439, goldens: 16, proveMsMedian: 242, proveMsMax: 389, verifyMsMedian: 10 };
