import TABLES, { BANDS } from '../../data/benchmarks.js';
import { BAND_TONE } from './bandTone.js';

// Score against size, after the readiness board's map. Rows run on a log
// scale; the right gutter holds the band labels. Fill marks the reputation
// written down before scoring, so colour never carries it alone.
const W = 800;
const H = 360;
const PAD = { l: 44, r: 128, t: 20, b: 44 };
const LOG_MIN = 2;
const LOG_MAX = Math.log10(400000);

const x = (rows) => PAD.l + ((Math.log10(rows) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (W - PAD.l - PAD.r);
const y = (score) => PAD.t + (1 - score / 100) * (H - PAD.t - PAD.b);

const TICKS = [
  [100, '100'],
  [1000, '1k'],
  [10000, '10k'],
  [100000, '100k'],
];
const SCORE_LINES = [100, 90, 70, 50, 0];

const scored = TABLES.filter((t) => t.score != null);

const ReadinessMap = ({ titleId }) => (
  <figure>
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px]" role="img" aria-labelledby={titleId}>
        <defs>
          <pattern id="low-confidence" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className="stroke-border" strokeWidth="1.5" />
          </pattern>
        </defs>

        <rect x={x(100)} y={PAD.t} width={x(400) - x(100)} height={H - PAD.t - PAD.b} fill="url(#low-confidence)" />
        <text x={x(100) + 6} y={H - PAD.b - 8} fontSize="11" className="fill-ink-muted">
          Under 400 rows
        </text>

        {SCORE_LINES.map((s) => (
          <g key={s}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(s)}
              y2={y(s)}
              className={s === 0 || s === 100 ? 'stroke-border' : 'stroke-border-light'}
              strokeDasharray={s === 0 || s === 100 ? undefined : '4 4'}
            />
            <text x={PAD.l - 10} y={y(s) + 4} fontSize="11" textAnchor="end" className="fill-ink-muted font-mono">
              {s}
            </text>
          </g>
        ))}

        {BANDS.map((band, i) => {
          const top = i === 0 ? 100 : BANDS[i - 1].min;
          const mid = y((top + band.min) / 2);
          return (
            <g key={band.id}>
              <circle cx={W - PAD.r + 18} cy={mid - 4} r="3.5" className={BAND_TONE[band.id].fill} />
              <text x={W - PAD.r + 28} y={mid} fontSize="12" className="fill-ink-secondary">
                {band.label}
              </text>
            </g>
          );
        })}

        {TICKS.map(([rows, label]) => (
          <g key={rows}>
            <line x1={x(rows)} x2={x(rows)} y1={H - PAD.b} y2={H - PAD.b + 5} className="stroke-border" />
            <text x={x(rows)} y={H - PAD.b + 20} fontSize="11" textAnchor="middle" className="fill-ink-muted font-mono">
              {label}
            </text>
          </g>
        ))}
        <text x={W - PAD.r} y={H - 4} fontSize="11" textAnchor="end" className="fill-ink-muted">
          Rows, log scale
        </text>

        {scored.map((t) => (
          <circle
            key={t.id}
            cx={x(t.rows)}
            cy={y(t.score)}
            r="6"
            strokeWidth="2"
            className={t.reputation === 'good' ? 'fill-ink stroke-page' : 'fill-page stroke-ink-secondary'}
          >
            <title>{`${t.name}: score ${t.score}, ${t.rows.toLocaleString('en-US')} rows, known ${t.reputation} before scoring`}</title>
          </circle>
        ))}
      </svg>
    </div>
    <figcaption className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-ink-secondary">
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ink" aria-hidden="true" />
        Known good before scoring
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full border-2 border-ink-secondary" aria-hidden="true" />
        Known dirty before scoring
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          className="h-2.5 w-3.5 rounded-sm border border-border bg-[repeating-linear-gradient(45deg,var(--border)_0_1px,transparent_1px_4px)]"
          aria-hidden="true"
        />
        Under 400 rows: low confidence, not ranked
      </span>
    </figcaption>
  </figure>
);

export default ReadinessMap;
