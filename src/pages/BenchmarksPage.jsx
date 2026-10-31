import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Search } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import PageClose from '../components/common/PageClose.jsx';
import { BANDS, CHECKS, bandOf } from '../data/benchmarks.js';
import BOARD_ROWS, { BOARD, BOARD_FIELDS, BOARD_MARKS, BOARD_PAIRS, BOARD_VERSIONS } from '../data/readinessBoard.js';
import { BAND_COLOR, tone } from '../components/benchmarks/bandColor.js';
import { NEW_TAB } from '../utils/links.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

/**
 * Benchmarks: how we test the readiness score. What the score measures, how
 * it lines up with datasets labelled good or dirty before scoring (every miss
 * named), research pairs of the same table before and after cleaning, how
 * each version ranked the same datasets, a lookup of every dataset on the
 * Dataset Readiness Board with its source, then what comes next. The market
 * benchmark waits at /benchmarks/market-mock (dev only) for a fair sample.
 *
 * The board's own caveat holds throughout: its rules were tuned on these
 * files, so this is calibration, not proof on data the score has never seen.
 * Colour always means band (src/components/benchmarks/bandColor.js).
 */

const fmt = (n) => n.toLocaleString('en-US');
const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const byDesc = (key) => (a, b) => (b[key] ?? -1) - (a[key] ?? -1) || a.name.localeCompare(b.name);
const list = (words) => `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;

const FIELD_LABEL = Object.fromEntries(BOARD_FIELDS.map((f) => [f.id, f.label]));
const STATE = {
  ranked: 'Ranked',
  low: 'Low confidence',
  gen: 'Generated data',
  size: 'Size not checked',
  copy: 'Copy differs',
  held: 'Held back',
  insufficient: 'Insufficient rows',
};

const BAND_SPANS = BANDS.map((b, i) => ({ ...b, max: i === 0 ? 100 : BANDS[i - 1].min }));
const bandRange = (b) => (b.max === 100 ? `${b.min} and up` : b.min === 0 ? `under ${b.max}` : `${b.min} to ${b.max - 1}`);
const bandCount = (b) => `${b.n} ${b.id === 'cleaning' && b.n !== 1 ? 'need cleaning' : b.label.toLowerCase()}`;
const bandsOf = (rows) => BANDS.map((b) => ({ ...b, n: rows.filter((r) => bandOf(r.score).id === b.id).length }));

// Every dataset the board shows a score for, and those labelled before scoring
const SCORED = BOARD_ROWS.filter((r) => r.score != null);
const LABELLED = SCORED.filter((r) => r.group);
const GOOD = LABELLED.filter((r) => r.group === 'good');
const DIRTY = LABELLED.filter((r) => r.group === 'dirty');
const GOOD_AT_90 = GOOD.filter((r) => r.score >= 90).length;
const DIRTY_UNDER_70 = DIRTY.filter((r) => r.score < 70).length;
// Misses: a known-good dataset under 90 or a known-dirty one at 70 or more, worst first
const MISSES = [
  ...GOOD.filter((r) => r.score < 90).sort((a, b) => a.score - b.score),
  ...DIRTY.filter((r) => r.score >= 70).sort((a, b) => b.score - a.score),
];

// Research pairs: the ones whose errors the benchmark labelled, biggest gap first
const ERRORS = { mv: 'missing values', outlier: 'outliers', mislabel: 'wrong labels', inconsistency: 'inconsistent values' };
const pairLabel = (p) => {
  const [type, ...rest] = p.name.split('_');
  if (ERRORS[type]) return { name: rest.join(' ').replace(/ major$/, ''), errors: ERRORS[type] };
  return { name: capital(p.name.replace('_', ' ')), errors: 'mixed errors' };
};
const PAIRS = BOARD_PAIRS.filter((p) => p.counted)
  .map((p) => ({ ...p, ...pairLabel(p), gap: p.clean - p.dirty }))
  .sort((a, b) => b.gap - a.gap || b.clean - a.clean);
const PAIRS_HIGHER = PAIRS.filter((p) => p.gap > 0).length;
const PAIRS_LEVEL = PAIRS.filter((p) => p.gap === 0);
const PAIRS_LOWER = PAIRS.filter((p) => p.gap < 0).length;

const RUN = [
  {
    label: `Appraisal ${BOARD.version}, frozen ${BOARD.frozen}`,
    text: `${BOARD_ROWS.length} public tables from OpenML and Hugging Face, in ${BOARD_FIELDS.length} industries.`,
  },
  {
    label: 'Calibration, not proof',
    text: 'The rules were tuned on these files, so this shows how well the score fits them, not how it does on data it has never seen.',
  },
  { label: 'On data it had never seen', text: 'Held-out set 8, 55 real exports labelled before download: v11 met 3 of its 5 marks (below).' },
];

const CALIBRATION = [
  { value: `${BOARD_MARKS.good90} of ${BOARD_MARKS.good}`, note: 'known-good files score 90 or more' },
  { value: `${BOARD_MARKS.dirty70} of ${BOARD_MARKS.dirty}`, note: 'known-dirty files score under 70' },
  { value: `${BOARD_MARKS.goodAboveDirtyPct}%`, note: 'of good and dirty pairs put the good file higher' },
  { value: `${BOARD_MARKS.pairsInOrder} of ${BOARD_MARKS.pairs}`, note: 'clean and dirty twins put the clean copy higher or level' },
];

/** Values lead, names follow; absolutely placed by its chart. */
const Tip = ({ value, name, detail, style }) => (
  <span
    className="pointer-events-none absolute z-10 w-max max-w-[15rem] rounded-lg border border-border bg-card px-3 py-2 shadow-lift"
    style={style}
  >
    <span className="block text-body font-semibold tabular-nums text-ink">{value}</span>
    <span className="block text-body-sm text-ink-secondary">{name}</span>
    {detail && <span className="block text-body-sm text-ink-muted">{detail}</span>}
  </span>
);

/**
 * Places a tip over a point in viewBox units. It flips inward near the sides
 * and below the point near the top, since the chart's scroll box clips it.
 */
const tipAt = (x, y, W, H) => {
  const left = (x / W) * 100;
  const top = (y / H) * 100;
  const tx = left > 75 ? '-100%' : left < 25 ? '0%' : '-50%';
  const ty = top < 35 ? '14px' : 'calc(-100% - 14px)';
  return { left: `${left}%`, top: `${top}%`, transform: `translate(${tx}, ${ty})` };
};

const Key = ({ swatch, children }) => (
  <li className="flex items-center gap-2">
    {swatch}
    {children}
  </li>
);

const BAND_LEGEND = BAND_SPANS.map((b) => (
  <Key key={b.id} swatch={<span className={`h-2.5 w-4 rounded-sm ${BAND_COLOR[b.id].bg}`} />}>
    {b.label}, {bandRange(b)}
  </Key>
));

const ChartCard = ({ id, title, note, shown, legend, footer, children }) => (
  <Card as="figure" aria-labelledby={id} className="p-5 md:p-6">
    <figcaption className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2">
      <span className="block max-w-2xl">
        <h3 id={id} className="text-heading-lg text-ink">
          {title}
        </h3>
        <span className="mt-1 block text-body-sm text-ink-muted">{note}</span>
      </span>
      {shown && <span className="text-body-sm tabular-nums text-ink-muted">{shown}</span>}
    </figcaption>
    {legend && <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-body-sm text-ink-secondary">{legend}</ul>}
    <div className="mt-5">{children}</div>
    {footer && <p className="mt-5 border-t border-border pt-4 text-body-sm text-ink-secondary">{footer}</p>}
  </Card>
);

/** A row of figures, each a value over what it counts. */
const Figures = ({ items }) => (
  <dl className="mb-8 grid gap-x-6 gap-y-6 border-y border-border py-6 sm:grid-cols-3">
    {items.map((f) => (
      <div key={f.note} className="flex flex-col">
        <dt className="text-body-sm text-ink-secondary">{f.note}</dt>
        <dd className="order-first text-page-title font-semibold text-ink">{f.value}</dd>
      </div>
    ))}
  </dl>
);

/** A group's datasets by band, best first, with a 2px gap between bands; the counts are spelled out below it. */
const BandBar = ({ bands }) => {
  const present = bands.filter((b) => b.n > 0);
  return (
    <span className="block min-w-[14rem]">
      <span className="flex h-3 gap-0.5">
        {present.map((b) => (
          <span
            key={b.id}
            title={`${b.label}: ${b.n}`}
            className={`basis-0 rounded-sm ${BAND_COLOR[b.id].bg}`}
            style={{ flexGrow: b.n }}
          />
        ))}
      </span>
      <span className="mt-2 block text-body-sm text-ink-secondary">{present.map(bandCount).join(', ')}</span>
    </span>
  );
};

const Head = ({ children }) => (
  <th scope="col" className="pb-3 pr-4 text-table-head font-normal uppercase text-ink-muted">
    {children}
  </th>
);

const TextButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded text-body-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
  >
    {children}
  </button>
);

const ScoreCell = ({ score }) => {
  if (score == null) return <span className="text-ink-muted">Not shown</span>;
  const band = bandOf(score);
  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <span className="w-8 font-medium tabular-nums text-ink">{score}</span>
      <span className="flex items-center gap-1.5 text-ink-secondary">
        <span className={`h-2 w-2 rounded-full ${BAND_COLOR[band.id].bg}`} aria-hidden="true" />
        {band.label}
      </span>
    </span>
  );
};

/** A dataset's name, linked to its page on its source where the board has one. */
const DatasetName = ({ row }) =>
  row.url ? (
    <a
      href={row.url}
      {...NEW_TAB}
      className="inline-flex items-center gap-1 rounded font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
    >
      {row.name}
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  ) : (
    <span className="font-medium text-ink">{row.name}</span>
  );

/** Known good and known dirty datasets, each split by band. */
const AgreementBars = () => (
  <dl className="space-y-5">
    {[
      ['Known good', GOOD],
      ['Known dirty', DIRTY],
    ].map(([label, lane]) => (
      <div key={label} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <dt className="text-body-sm font-medium text-ink">
          {label}
          <span className="block font-normal text-ink-muted">{lane.length} datasets</span>
        </dt>
        <dd>
          <BandBar bands={bandsOf(lane)} />
        </dd>
      </div>
    ))}
  </dl>
);

// Score against size: rows on a log scale, from 100 to past the biggest dataset
const SIZED = LABELLED.filter((r) => r.rows);
const LOG = [2, Math.log10(Math.max(...SIZED.map((r) => r.rows)) * 1.5)];
const SC = { W: 800, H: 360, l: 40, r: 16, t: 16, b: 40 };
const sx = (rows) => SC.l + ((Math.log10(rows) - LOG[0]) / (LOG[1] - LOG[0])) * (SC.W - SC.l - SC.r);
const sy = (score) => SC.t + (1 - score / 100) * (SC.H - SC.t - SC.b);
const ROW_TICKS = [
  [100, '100'],
  [1000, '1k'],
  [10000, '10k'],
  [100000, '100k'],
  [1000000, '1M'],
].filter(([v]) => Math.log10(v) <= LOG[1]);

/** Colour is the band; shape is the label written down before scoring (filled good, ring dirty). */
const SizeScatter = () => {
  const [tip, setTip] = useState(null);
  return (
    <div className="overflow-x-auto">
      <div className="relative min-w-[36rem]">
        <svg viewBox={`0 0 ${SC.W} ${SC.H}`} className="block w-full" role="img" aria-label={`Score against rows for ${SIZED.length} labelled datasets`}>
          {[0, 50, 70, 90, 100].map((s) => (
            <g key={s}>
              <line x1={SC.l} x2={SC.W - SC.r} y1={sy(s)} y2={sy(s)} className={s === 0 ? 'stroke-ink-muted' : 'stroke-border'} />
              <text x={SC.l - 8} y={sy(s) + 4} textAnchor="end" fontSize="11" className="fill-ink-muted">
                {s}
              </text>
            </g>
          ))}
          {ROW_TICKS.map(([v, label]) => (
            <text key={v} x={sx(v)} y={sy(0) + 18} textAnchor="middle" fontSize="11" className="fill-ink-muted">
              {label}
            </text>
          ))}
          <text x={SC.W - SC.r} y={SC.H - 4} textAnchor="end" fontSize="11" className="fill-ink-muted">
            Rows, log scale
          </text>
          {SIZED.map((r) => {
            const cx = sx(r.rows);
            const cy = sy(r.score);
            const on = tip?.id === r.key;
            const color = tone(r.score);
            return (
              <g
                key={r.key}
                onPointerEnter={() =>
                  setTip({
                    id: r.key,
                    value: r.score,
                    name: r.name,
                    detail: `${fmt(r.rows)} rows, known ${r.group} before scoring`,
                    style: tipAt(cx, cy, SC.W, SC.H),
                  })
                }
                onPointerLeave={() => setTip(null)}
              >
                <circle cx={cx} cy={cy} r="12" fill="transparent" />
                <circle cx={cx} cy={cy} r={on ? 8.5 : 7} className="fill-card" />
                {r.group === 'dirty' ? (
                  <circle cx={cx} cy={cy} r={on ? 5.5 : 4.25} strokeWidth="1.75" className={`fill-card ${color.stroke}`} />
                ) : (
                  <circle cx={cx} cy={cy} r={on ? 6.5 : 5} className={color.fill} />
                )}
              </g>
            );
          })}
        </svg>
        {tip && <Tip {...tip} />}
      </div>
    </div>
  );
};

/** Every miss, named, with the check that cost it most where the board notes one. */
const MissTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[44rem] text-left text-body-sm">
      <caption className="sr-only">Datasets where the score disagreed with the label written down before scoring</caption>
      <thead>
        <tr className="border-b border-ink">
          <Head>Dataset</Head>
          <Head>Picked as</Head>
          <Head>Score</Head>
          <Head>Weakest check</Head>
          <Head>Industry</Head>
        </tr>
      </thead>
      <tbody>
        {MISSES.map((r) => (
          <tr key={r.key} className="border-b border-border align-top">
            <th scope="row" className="py-3 pr-4 font-normal">
              <DatasetName row={r} />
            </th>
            <td className="py-3 pr-4 text-ink-secondary">Known {r.group}</td>
            <td className="py-3 pr-4">
              <ScoreCell score={r.score} />
            </td>
            <td className="py-3 pr-4 text-ink-secondary">{r.lowest ? capital(r.lowest) : 'Not noted'}</td>
            <td className="py-3 text-ink-secondary">{FIELD_LABEL[r.field]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Each pair on one line: the copy with errors a ring, the cleaned copy filled in its band's colour. */
const PairsChart = () => (
  <ol>
    {PAIRS.map((p) => (
      <li
        key={p.name}
        className="grid grid-cols-[minmax(0,10rem)_1fr_4.5rem] items-center gap-3 py-1.5 sm:grid-cols-[minmax(0,16rem)_1fr_5rem]"
      >
        <span className="truncate text-body-sm text-ink-secondary" title={`${p.name}, ${p.errors}`}>
          <span className="text-ink">{p.name}</span>, {p.errors}
        </span>
        <span className="relative h-5" aria-hidden="true">
          <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
          {[50, 70, 90].map((s) => (
            <span key={s} className="absolute inset-y-0 w-px bg-border" style={{ left: `${s}%` }} />
          ))}
          {p.gap > 0 && (
            <span className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-ink-muted" style={{ left: `${p.dirty}%`, width: `${p.gap}%` }} />
          )}
          <span
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.75px] border-ink-secondary bg-card"
            style={{ left: `${p.dirty}%` }}
          />
          <span
            className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card ${tone(p.clean).bg}`}
            style={{ left: `${p.clean}%` }}
          />
        </span>
        <span className="text-right text-body-sm tabular-nums text-ink-secondary">
          {p.gap > 0 ? (
            <>
              {p.dirty} to <span className="text-ink">{p.clean}</span>
            </>
          ) : (
            <>
              <span className="text-ink">{p.clean}</span>, level
            </>
          )}
        </span>
      </li>
    ))}
  </ol>
);

// How each version ranked the same datasets, after Artificial Analysis's capability comparison:
// the eight known-good and eight known-dirty datasets whose rank moved most from the first
// version to the last, ranked among themselves in every version
const rankIn = (rows, v) => new Map(rows.map((r) => [r.key, 1 + rows.filter((o) => o.history[v] > r.history[v]).length]));
const MOVERS = (() => {
  const first = rankIn(LABELLED, 0);
  const last = rankIn(LABELLED, BOARD_VERSIONS.length - 1);
  const moved = (r) => Math.abs(first.get(r.key) - last.get(r.key));
  const pick = (group) =>
    LABELLED.filter((r) => r.group === group)
      .sort((a, b) => moved(b) - moved(a) || a.name.localeCompare(b.name))
      .slice(0, 8);
  return [...pick('good'), ...pick('dirty')];
})();
// Per version, each dataset's row (ties in name order) and rank (ties share it)
const MOVER_RANKS = BOARD_VERSIONS.map((_, v) => {
  const order = [...MOVERS].sort((a, b) => b.history[v] - a.history[v] || a.name.localeCompare(b.name));
  const rank = rankIn(MOVERS, v);
  return new Map(order.map((r, slot) => [r.key, { slot, rank: rank.get(r.key) }]));
});
const STATUS = { v6: 'retired', v9: 'Oct 23', 'v10.1': 'Oct 23', 'v10.2': 'Oct 27', v11: 'live now' };
const LINE = { good: BAND_COLOR.ready, dirty: BAND_COLOR.serious };
const VR = { W: 960, top: 100, row: 34, l: 250, r: 64 };
const vrx = (c) => VR.l + (c * (VR.W - VR.l - VR.r)) / (BOARD_VERSIONS.length - 1);
const vry = (slot) => VR.top + slot * VR.row + VR.row / 2;
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

const VersionRanks = () => {
  const [on, setOn] = useState(null);
  const [tip, setTip] = useState(null);
  const H = VR.top + MOVERS.length * VR.row + 12;
  // The dataset under the pointer is drawn last, so its line runs over the others
  const order = on ? [...MOVERS.filter((r) => r.key !== on), MOVERS.find((r) => r.key === on)] : MOVERS;
  return (
    <div className="overflow-x-auto">
      <div className="relative min-w-[44rem]">
        <svg
          viewBox={`0 0 ${VR.W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`Rank of ${MOVERS.length} labelled datasets in ${BOARD_VERSIONS.length} versions of the score`}
        >
          {MOVERS.map((r, slot) => (
            <line key={r.key} x1={VR.l} x2={VR.W - VR.r} y1={vry(slot)} y2={vry(slot)} className="stroke-border" />
          ))}
          {BOARD_VERSIONS.map((v, c) => (
            <g key={v.version}>
              <text x={vrx(c)} y={VR.top - 52} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-ink">
                {v.version}
              </text>
              <text x={vrx(c)} y={VR.top - 36} textAnchor="middle" fontSize="11" className="fill-ink-muted">
                {STATUS[v.version] ?? ''}
              </text>
              <text x={vrx(c)} y={VR.top - 16} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-ink">
                {v.goodAboveDirtyPct}%
              </text>
            </g>
          ))}
          {order.map((r) => {
            const color = LINE[r.group];
            const pts = MOVER_RANKS.map((col, c) => [vrx(c), vry(col.get(r.key).slot)]);
            const d = pts.reduce((path, [x, y], i) => {
              if (i === 0) return `M${x} ${y}`;
              const [px, py] = pts[i - 1];
              const mx = (px + x) / 2;
              return `${path}C${mx} ${py} ${mx} ${y} ${x} ${y}`;
            }, '');
            const lit = on === r.key;
            return (
              <g
                key={r.key}
                opacity={on && !lit ? 0.2 : 1}
                onPointerEnter={() => setOn(r.key)}
                onPointerLeave={() => {
                  setOn(null);
                  setTip(null);
                }}
              >
                <path d={d} fill="none" stroke="transparent" strokeWidth="16" />
                <path d={d} fill="none" strokeWidth={lit ? 3 : 2} className={color.stroke} />
                <text x={VR.l - 22} y={pts[0][1] + 4} textAnchor="end" fontSize="12" className={lit ? 'fill-ink' : 'fill-ink-secondary'}>
                  {clip(r.name, 32)}
                </text>
                {pts.map(([x, y], c) => {
                  const { rank } = MOVER_RANKS[c].get(r.key);
                  return (
                    <g
                      key={BOARD_VERSIONS[c].version}
                      onPointerEnter={() =>
                        setTip({
                          value: r.history[c],
                          name: r.name,
                          detail: `Known ${r.group}. ${BOARD_VERSIONS[c].version}: rank ${rank} of ${MOVERS.length}`,
                          style: tipAt(x, y, VR.W, H),
                        })
                      }
                    >
                      <circle cx={x} cy={y} r="12" className="fill-card" />
                      <circle cx={x} cy={y} r="10" className={color.fill} />
                      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" className={color.num}>
                        {rank}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
        {tip && <Tip {...tip} />}
      </div>
    </div>
  );
};

/**
 * The industry filter for the lookup: a button that opens every industry in
 * two columns with its count. Escape or a click outside closes it, and focus
 * goes back to the button.
 */
const IndustryMenu = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => {
      if (!box.current?.contains(e.target)) setOpen(false);
    };
    const escape = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', escape);
    box.current?.querySelector('[aria-pressed="true"]')?.focus();
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  const current = options.find((o) => o.id === value) ?? options[0];
  return (
    <div ref={box} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="industry-menu"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-body-sm text-ink transition-colors duration-150 hover:border-border-hover"
      >
        <span className="text-ink-muted">Industry</span>
        <span className="font-medium">{current.label}</span>
        <ChevronDown className={`h-4 w-4 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div
          id="industry-menu"
          className="absolute left-0 top-full z-40 mt-2 w-[min(42rem,calc(100vw-3rem))] rounded-xl border border-border bg-card p-2 shadow-lift"
        >
          <ul className="grid gap-0.5 sm:grid-cols-2">
            {options.map((o) => {
              const on = o.id === value;
              return (
                <li key={o.id || 'all'}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      onChange(o.id);
                      setOpen(false);
                      trigger.current?.focus();
                    }}
                    className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-body-sm ${
                      on ? 'bg-secondary font-medium text-ink' : 'text-ink-secondary hover:bg-secondary hover:text-ink'
                    }`}
                  >
                    <span>{o.label}</span>
                    <span className="tabular-nums text-ink-muted">{o.n}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const INDUSTRY_OPTIONS = [
  { id: '', label: 'All industries', n: BOARD_ROWS.length },
  ...BOARD_FIELDS.map((f) => ({ id: f.id, label: f.label, n: BOARD_ROWS.filter((r) => r.field === f.id).length })),
];
const FIRST = 30;

/** Every dataset on the board, searchable by name or source and filtered by industry. */
const Lookup = () => {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('');
  const [all, setAll] = useState(false);
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BOARD_ROWS.filter(
      (r) => (!field || r.field === field) && (!q || `${r.name} ${r.ref ?? ''} ${r.source ?? ''}`.toLowerCase().includes(q))
    ).sort(byDesc('score'));
  }, [query, field]);
  const shown = all ? rows : rows.slice(0, FIRST);
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-border py-3">
        <label className="relative flex min-w-[16rem] flex-1 items-center sm:max-w-sm">
          <span className="sr-only">Search datasets</span>
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-ink-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or source"
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-body-sm text-ink placeholder:text-ink-muted"
          />
        </label>
        <IndustryMenu value={field} options={INDUSTRY_OPTIONS} onChange={setField} />
        <p className="text-body-sm tabular-nums text-ink-muted sm:ml-auto" aria-live="polite">
          {rows.length} of {BOARD_ROWS.length} datasets
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="text-body text-ink-secondary">No dataset matches. Try another name, or all industries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[64rem] text-left text-body-sm">
            <caption className="sr-only">Datasets on the board, highest score first</caption>
            <thead>
              <tr className="border-b border-ink">
                <Head>Dataset</Head>
                <Head>Industry</Head>
                <Head>Source</Head>
                <Head>Score</Head>
                <Head>Rows</Head>
                <Head>Picked as</Head>
                <Head>State</Head>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.key} className="border-b border-border align-top">
                  <th scope="row" className="py-3 pr-4 font-normal">
                    <DatasetName row={r} />
                  </th>
                  <td className="py-3 pr-4 text-ink-secondary">{FIELD_LABEL[r.field]}</td>
                  <td className="py-3 pr-4">
                    <span className="block text-ink">{r.source ?? 'Not recorded'}</span>
                    {r.ref && <span className="block max-w-[14rem] break-words text-ink-muted">{r.ref}</span>}
                  </td>
                  <td className="py-3 pr-4">
                    <ScoreCell score={r.score} />
                  </td>
                  <td className="py-3 pr-4 tabular-nums text-ink">{r.rows ? fmt(r.rows) : 'Not confirmed'}</td>
                  <td className="py-3 pr-4 text-ink-secondary">{r.group ? `Known ${r.group}` : 'Not labelled'}</td>
                  <td className="py-3 text-ink-secondary">{STATE[r.state]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {rows.length > FIRST && (
        <div className="mt-4">
          <TextButton onClick={() => setAll(!all)}>{all ? `Show the first ${FIRST}` : `Show all ${rows.length}`}</TextButton>
        </div>
      )}
    </>
  );
};

const BenchmarksPage = () => {
  usePageMeta({ ...PAGE_META['/benchmarks'], path: '/benchmarks' });

  return (
    <PageLayout>
      <PageHero
        title="How we test the readiness score"
        lede="We scored public datasets whose quality was written down before scoring, and we publish how the score lined up, including where it got it wrong."
        actions={
          <>
            <CtaButton action="previewScore" />
            <Button href="#lookup" variant="standard">
              Look up a dataset
            </Button>
          </>
        }
        aside={
          <div className="lg:pl-8">
            <h2 className="text-body font-semibold text-ink">This run</h2>
            <dl className="mt-3 border-t border-border">
              {RUN.map(({ label, text }) => (
                <div key={label} className="border-b border-border py-4">
                  <dt className="text-body-sm text-ink-muted">{label}</dt>
                  <dd className="mt-1 text-body text-ink">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="measures">
        <SectionHeader id="measures" title="What the score measures" lede="One score from 0 to 100 for one table: how clean and well-formed it is." />
        <ul className="grid gap-x-12 md:grid-cols-3">
          <li className="border-t border-border py-5">
            <h3 className="text-heading-lg text-ink">100 means ready</h3>
            <p className="mt-2 text-body text-ink-secondary">
              No broken records, empty or invalid cells, repeated rows or conflicting labels. Each kind of problem costs
              points.
            </p>
          </li>
          <li className="border-t border-border py-5">
            <h3 className="text-heading-lg text-ink">{CHECKS.length} checks</h3>
            <p className="mt-2 text-body text-ink-secondary">
              {list(CHECKS.map((c) => c.name))}, each falling to zero at a set share of problems.
            </p>
          </li>
          <li className="border-t border-border py-5">
            <h3 className="text-heading-lg text-ink">What it doesn&rsquo;t judge</h3>
            <p className="mt-2 text-body text-ink-secondary">
              Who owns the data, where it came from, what it costs, or anything that isn&rsquo;t a table.
            </p>
          </li>
        </ul>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="agreement">
        <SectionHeader
          id="agreement"
          title="Does the score agree with what was known?"
          lede="Before scoring, each dataset was labelled known good or known dirty from its reputation. A good one should score 90 or more, a dirty one under 70."
        />
        <Figures
          items={[
            { value: `${GOOD_AT_90} of ${GOOD.length}`, note: 'known-good datasets scored 90 or more' },
            { value: `${DIRTY_UNDER_70} of ${DIRTY.length}`, note: 'known-dirty datasets scored under 70' },
            { value: MISSES.length, note: 'datasets where the score disagreed, all listed below' },
          ]}
        />
        <div className="space-y-6">
          <ChartCard
            id="chart-agreement"
            title="Known good against known dirty"
            note="Every labelled dataset on the board, split by band. The rules were tuned on these files, so this shows fit, not proof."
            shown={`${LABELLED.length} datasets`}
            legend={BAND_LEGEND}
          >
            <AgreementBars />
          </ChartCard>

          <ChartCard
            id="chart-size"
            title="Score against size"
            note="One dot per labelled dataset with a confirmed row count. Known-good datasets should sit near the top, known-dirty ones lower."
            shown={`${SIZED.length} datasets`}
            legend={
              <>
                <Key swatch={<span className="h-2.5 w-2.5 rounded-full bg-ink-secondary" />}>Known good</Key>
                <Key swatch={<span className="h-2.5 w-2.5 rounded-full border-[1.75px] border-ink-secondary" />}>Known dirty</Key>
                {BAND_LEGEND}
              </>
            }
          >
            <SizeScatter />
          </ChartCard>

          <ChartCard
            id="chart-misses"
            title="Where the score disagreed"
            note="Known-good datasets under 90 and known-dirty ones at 70 or more, worst first, with the check that cost each one most where the board notes it."
            shown={`${MISSES.length} datasets`}
          >
            <MissTable />
          </ChartCard>
        </div>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="pairs">
        <SectionHeader
          id="pairs"
          title="Same table, before and after cleaning"
          lede="Research pairs from the Raha and CleanML benchmarks: one copy with known errors, one cleaned by the benchmark's authors. A working score never puts the copy with errors above the clean one."
        />
        <Figures
          items={[
            { value: PAIRS_HIGHER, note: 'pairs where the clean copy scored higher' },
            { value: PAIRS_LEVEL.length, note: "pairs scored level: the score didn't see those errors" },
            { value: PAIRS_LOWER, note: 'pairs where the copy with errors scored higher' },
          ]}
        />
        <ChartCard
          id="chart-pairs"
          title="Clean copy against copy with errors"
          note={`The ${PAIRS.length} pairs whose errors the benchmarks labelled, biggest difference first. Lines mark the bands at 50, 70 and 90.`}
          shown={`${PAIRS.length} pairs`}
          legend={
            <>
              <Key swatch={<span className="h-3 w-3 rounded-full border-[1.75px] border-ink-secondary" />}>Copy with errors</Key>
              <Key swatch={<span className={`h-3 w-3 rounded-full ${BAND_COLOR.ready.bg}`} />}>Cleaned copy, in its band&rsquo;s colour</Key>
            </>
          }
          footer={`A cleaned copy can still score low: the benchmark's authors fixed the errors they listed, and the score counts every problem it finds. Level pairs: ${list(
            PAIRS_LEVEL.map((p) => `${p.name} (${p.errors})`)
          )}. ${BOARD_PAIRS.length - PAIRS.length} more pairs, whose errors the benchmarks didn't label, aren't counted.`}
        >
          <PairsChart />
        </ChartCard>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="versions">
        <SectionHeader
          id="versions"
          title="How each version ranked the same datasets"
          lede="We keep every version's scores. A better score ranks known-good datasets above known-dirty ones; under each version is the share of good-and-dirty pairs it put in that order."
        />
        <ChartCard
          id="chart-versions"
          title="Rank by version"
          note={`The ${MOVERS.length / 2} known-good and ${MOVERS.length / 2} known-dirty datasets whose rank moved most from ${
            BOARD_VERSIONS[0].version
          } to ${BOARD_VERSIONS[BOARD_VERSIONS.length - 1].version}, ranked among themselves; tied datasets share a rank. The percentages cover all ${
            BOARD_VERSIONS[0].good + BOARD_VERSIONS[0].dirty
          } labelled files. Point at a rank for its score.`}
          shown={`${MOVERS.length} of ${LABELLED.length} labelled datasets`}
          legend={
            <>
              <Key swatch={<span className={`h-0.5 w-4 rounded-full ${BAND_COLOR.ready.bg}`} />}>Known good</Key>
              <Key swatch={<span className={`h-0.5 w-4 rounded-full ${BAND_COLOR.serious.bg}`} />}>Known dirty</Key>
            </>
          }
          footer={`${BOARD_VERSIONS[0].version} was the score live before v10. Every version since was tuned on this corpus, so the climb shows fit; ${
            BOARD_VERSIONS[BOARD_VERSIONS.length - 1].version
          }'s test on data it had never seen is below.`}
        >
          <VersionRanks />
        </ChartCard>
      </Section>

      <Section spacing="none" id="lookup" className="pb-16 md:pb-24" aria-labelledby="lookup-title">
        <SectionHeader
          id="lookup-title"
          title="Look up a dataset"
          lede="Every dataset on the board, with its score and a link to it on its source, so you can check our work."
        />
        <Lookup />
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="next">
        <SectionHeader
          id="next"
          title="On data it had never seen, and what comes next"
          lede="The numbers above show how well the score fits the files its rules were tuned on. This is how it did on files it had never seen."
        />
        <ul className="grid gap-x-12 md:grid-cols-2">
          <li className="border-t border-border py-6">
            <h3 className="text-heading-lg text-ink">A test on data the score had never seen</h3>
            <p className="mt-2 text-body text-ink-secondary">
              Held-out set 8: 32 known-good and 23 known-dirty real exports in CSV, TSV, JSON and JSONL, from 11 industries
              and 8 languages, labelled before download and scored once on Appraisal v11. It met three of its five marks:
              all 23 dirty files scored under 70, no dirty twin outscored its original, and all 10 automatic-check cases found
              what was written down. It missed two: 9 of 32 good files scored 90 or more (26 needed), and good files ranked
              above dirty ones in 80.4% of pairs (90% needed). v10.2 missed the same two. Most good files lost points for
              blanks that are blank by design, such as optional fields and footnote columns, and for letters in ID and code
              columns.
            </p>
          </li>
          <li className="border-t border-border py-6">
            <h3 className="text-heading-lg text-ink">Benchmark the market</h3>
            <p className="mt-2 text-body text-ink-secondary">
              How industries and sources compare on clean, ready data. It needs a fair sample first: the same rule for
              every industry and source, set before any scoring, so no ranking reflects how we picked the files.
            </p>
          </li>
        </ul>
      </Section>

      <Section spacing="none" id="method" className="border-t border-border py-16 md:py-24" aria-labelledby="method-title">
        <SectionHeader
          id="method-title"
          title="How the score works"
          lede={`One formula scores every dataset: 100 times the product of ${CHECKS.length} checks, rounded down. Each check falls to zero at the share below.`}
        />
        <ol className="grid gap-x-12 md:grid-cols-2">
          {CHECKS.map((c) => (
            <li key={c.name} className="border-t border-border py-5">
              <h3 className="text-heading-lg text-ink">{c.name}</h3>
              <p className="mt-1 text-body text-ink-secondary">{c.counts}</p>
              <p className="mt-2 text-body-sm text-ink-muted">Zero at {c.zero}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 lg:grid-cols-4">
          {CALIBRATION.map((c) => (
            <div key={c.note} className="flex flex-col">
              <dt className="text-body-sm text-ink-secondary">{c.note}</dt>
              <dd className="order-first text-page-title font-semibold text-ink">{c.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-body-sm text-ink-muted">
          Calibrated on a 439-file corpus that includes the datasets and pairs above. Those files helped build the
          score, so they show how it was tuned, not proof that it works.
        </p>
      </Section>

      <PageClose
        id="close"
        title="See how ready your data is"
        lede="Preview your score in minutes. It never sets a price."
        actions={
          <>
            <CtaButton action="previewScore" />
            <CtaButton action="exploreDatasets" variant="standard" />
          </>
        }
      />
    </PageLayout>
  );
};

export default BenchmarksPage;
