import Card from '../common/Card.jsx';
import MomentHeader from '../product/MomentHeader.jsx';
import RollingNumber from '../motion/numbers/RollingNumber.jsx';
import { BAND_COLOR } from '../benchmarks/bandColor.js';
import { bandOf } from '../../data/benchmarks.js';
import BOARD_ROWS, { BOARD } from '../../data/readinessBoard.js';

// One table per band, so the teaser shows the spread of the board rather than four ties at 100.
// The same readiness board, run and colours as /benchmarks.
const SPREAD = ['diabetes_indicators', 'framingham', 'mammographic', 'stroke'];
const rows = SPREAD.map((key) => BOARD_ROWS.find((r) => r.key === key)).filter(Boolean);

/** Coded moment: a slice of the readiness board. */
const BenchmarkTeaser = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="How we tested the score: an excerpt of the readiness ranking">
    <MomentHeader label="How we tested the score" detail={BOARD.frozen} />
    <ul>
      {rows.map((t) => {
        const band = bandOf(t.score);
        return (
          <li key={t.key} className="flex items-center gap-4 border-b border-border-light px-5 py-3.5 last:border-0">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-body text-ink">{t.name}</span>
              <span className="block text-body-sm text-ink-muted">{t.rows.toLocaleString('en-US')} rows</span>
            </span>
            <span className="hidden h-1.5 w-20 overflow-hidden rounded-r-sm bg-muted sm:block" aria-hidden="true">
              <span className="block h-full bg-ink" style={{ width: `${t.score}%` }} />
            </span>
            <span className="w-8 text-right text-heading-lg tabular-nums text-ink">
              <RollingNumber value={t.score} />
            </span>
            <span className="flex w-28 items-center gap-1.5 text-body-sm text-ink-secondary">
              <span className={`h-2 w-2 rounded-full ${BAND_COLOR[band.id].bg}`} aria-hidden="true" />
              {band.label}
            </span>
          </li>
        );
      })}
    </ul>
  </Card>
);

export default BenchmarkTeaser;
