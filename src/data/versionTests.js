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
  twins: 27,
  checks: 10,
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
};

/**
 * v11's must-pass attack cases on every version: files built to break the
 * score, each written after a break was found in an earlier version. Counted
 * only where a case reads output the version reports
 * (2026-11-09-attack-cases-by-origin.md).
 */
export const ATTACK_CASES = { passed: [13, 13, 18, 30, 41, 59], judged: [33, 34, 34, 39, 43, 59] };

/**
 * 240 seeded draws of 100 to 10,000 rows from five datasets; a draw holds
 * when it lands in its full file's band and within 5 points of its score
 * (2026-11-09-stability-v6-to-v11.md).
 */
export const STABILITY = { held: [38, 220, 200, 198, 194, 224], draws: 240 };
