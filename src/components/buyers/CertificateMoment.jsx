import Card from '../common/Card.jsx';
import MomentHeader from '../product/MomentHeader.jsx';
import { BAND_COLOR } from '../benchmarks/bandColor.js';
import { bandOf } from '../../data/benchmarks.js';
import BOARD_ROWS from '../../data/readinessBoard.js';

// A public table from the readiness board, so the certificate shows a real v11
// result. The board keeps only the weakest check's figure, so that is the one shown.
const TABLE = BOARD_ROWS.find((r) => r.key === 'diabetes_indicators');
const BAND = bandOf(TABLE.score);

// What each check counts, in the score preview's words.
const CHECKS = [
  { name: 'Structure', counts: "Entries that don't fit the columns, or show garbled text" },
  { name: 'Cell quality', counts: 'Empty, malformed and one-off values' },
  { name: 'Duplicates', counts: 'Repeated entries' },
  { name: 'Labels', counts: 'Identical entries with different labels' },
];

/** Coded moment: a quality certificate, after the demo's certificate page. */
const CertificateMoment = () => (
  <Card
    lift
    className="overflow-hidden"
    role="figure"
    aria-label={`A quality certificate for ${TABLE.name}: ${TABLE.score}, ${BAND.label}`}
  >
    <MomentHeader label="Quality certificate" detail={TABLE.source} />
    <div className="px-5 py-5">
      <p className="text-body font-medium text-ink">{TABLE.name}</p>
      <p className="mt-1 text-body-sm text-ink-muted">
        {TABLE.rows.toLocaleString('en-US')} entries, {TABLE.cols} columns
      </p>
      <p className="mt-5 flex items-center gap-3">
        <span className="text-page-title font-semibold tabular-nums text-ink">{TABLE.score}</span>
        <span className="flex items-center gap-1.5 text-body-sm text-ink-secondary">
          <span className={`h-2 w-2 rounded-full ${BAND_COLOR[BAND.id].bg}`} aria-hidden="true" />
          {BAND.label}
        </span>
      </p>
      <p className="mt-1 text-body-sm text-ink-muted">Lowest check: {TABLE.lowest}</p>
    </div>
    <ul className="border-t border-border-light">
      {CHECKS.map((check) => (
        <li
          key={check.name}
          className="flex flex-col gap-0.5 border-b border-border-light px-5 py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <span className="text-body text-ink">{check.name}</span>
          <span className="text-body-sm text-ink-muted sm:text-right">{check.counts}</span>
        </li>
      ))}
    </ul>
  </Card>
);

export default CertificateMoment;
