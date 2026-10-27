import Card from '../common/Card.jsx';
import TABLES, { BENCHMARK, bandOf } from '../../data/benchmarks.js';

const BAND_DOT = { ready: 'bg-success-dot', usable: 'bg-pending', cleaning: 'bg-brand', serious: 'bg-critical' };

// One table per band, so the teaser shows the spread of the board rather than four ties at 100.
const SPREAD = ['brfss', 'framingham', 'mammo', 'stroke'];
const rows = SPREAD.map((id) => TABLES.find((t) => t.id === id)).filter(Boolean);

/** Coded moment: a slice of the readiness ranking. */
const BenchmarkTeaser = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label={`${BENCHMARK.domain} readiness ranking excerpt`}>
    <p className="flex items-center justify-between gap-4 border-b border-border-light px-5 py-3 text-meta text-ink-muted">
      <span>{BENCHMARK.domain} · readiness ranking</span>
      <span className="font-mono">{BENCHMARK.run}</span>
    </p>
    <ul>
      {rows.map((t) => {
        const band = bandOf(t.score);
        return (
          <li key={t.id} className="flex items-center gap-4 border-b border-border-light px-5 py-3.5 last:border-0">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-body text-ink">{t.name}</span>
              <span className="block text-body-sm text-ink-muted">{t.rows.toLocaleString('en-US')} rows</span>
            </span>
            <span className="hidden h-1.5 w-20 overflow-hidden rounded-r-sm bg-muted sm:block" aria-hidden="true">
              <span className="block h-full bg-ink" style={{ width: `${t.score}%` }} />
            </span>
            <span className="w-8 text-right text-heading-lg tabular-nums text-ink">{t.score}</span>
            <span className="flex w-28 items-center gap-1.5 text-body-sm text-ink-secondary">
              <span className={`h-1.5 w-1.5 rounded-full ${BAND_DOT[band.id]}`} aria-hidden="true" />
              {band.label}
            </span>
          </li>
        );
      })}
    </ul>
  </Card>
);

export default BenchmarkTeaser;
