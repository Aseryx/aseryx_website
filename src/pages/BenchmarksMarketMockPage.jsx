import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ChevronDown } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import FilterChip from '../components/common/FilterChip.jsx';
import { BANDS, CHECKS, bandOf } from '../data/benchmarks.js';
import BOARD_ROWS, { BOARD, BOARD_FIELDS, BOARD_MARKS } from '../data/readinessBoard.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

/**
 * A layout study for /benchmarks in the structure of artificialanalysis.ai,
 * for datasets instead of models, in the site's own style. It reads every
 * dataset on the Dataset Readiness Board. One sticky bar filters the whole
 * page by industry and by how a dataset was picked; below it come three
 * highlights, the industries ranked (with a rank chart across measures,
 * after the source's capability comparison), the sources ranked, the score
 * chart, score against size, the score against what was known, a
 * comparison table and the method. Dev server only (AppRoutes); parked as
 * "Benchmark the market" until a fair sample is scored, since the board's
 * own picks drive these industry and source rankings.
 *
 * Colour always means band, on a teal-to-coral scale (Ready deep teal,
 * Serious deep coral) that passes the colourblind checks in both modes,
 * unlike the site's four status colours used as a chart palette.
 */

const fmt = (n) => n.toLocaleString('en-US');
const compact = (n) => {
  if (n == null) return '–';
  if (n < 1000) return String(n);
  if (n < 1e6) return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}k`;
  return `${(n / 1e6).toFixed(1)}M`;
};
const pct = (v) => `${Math.round(v * 100)}%`;
const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const byDesc = (key) => (a, b) => (b[key] ?? -1) - (a[key] ?? -1) || a.name.localeCompare(b.name);
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length / 2;
  if (s.length === 0) return null;
  return s.length % 2 ? s[Math.floor(m)] : (s[m - 1] + s[m]) / 2;
};
const showMedian = (m) => (m == null ? '–' : Number.isInteger(m) ? m : m.toFixed(1));

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
const PICKS = [
  { id: 'any', label: 'Any' },
  { id: 'good', label: 'Known good' },
  { id: 'dirty', label: 'Known dirty' },
];
// Charts show what the board ranks, and its low-confidence datasets lighter
const charted = (r) => r.score != null && (r.state === 'ranked' || r.state === 'low');
const RANKED = BOARD_ROWS.filter((r) => r.state === 'ranked');
// An industry needs this many ranked datasets before its median is ranked
const MIN_TO_RANK = 3;

const BAND_SPANS = BANDS.map((b, i) => ({ ...b, max: i === 0 ? 100 : BANDS[i - 1].min }));
const bandRange = (b) => (b.max === 100 ? `${b.min} and up` : b.min === 0 ? `under ${b.max}` : `${b.min} to ${b.max - 1}`);
const bandCount = (b) => `${b.n} ${b.id === 'cleaning' && b.n !== 1 ? 'need cleaning' : b.label.toLowerCase()}`;
const bandsOf = (rows) => BANDS.map((b) => ({ ...b, n: rows.filter((r) => bandOf(r.score).id === b.id).length }));

// Teal for the good bands and coral for the problem bands, deepest at the ends, checked
// with the dataviz palette validator in both modes. num is a marker number's colour, by
// how light the fill is.
const BAND_COLOR = {
  ready: {
    bg: 'bg-[#0e6e7e] dark:bg-[#3cc0d0]',
    fill: 'fill-[#0e6e7e] dark:fill-[#3cc0d0]',
    stroke: 'stroke-[#0e6e7e] dark:stroke-[#3cc0d0]',
    num: 'fill-[#ffffff] dark:fill-[#121214]',
  },
  usable: {
    bg: 'bg-[#6fb3c0] dark:bg-[#1b5d68]',
    fill: 'fill-[#6fb3c0] dark:fill-[#1b5d68]',
    stroke: 'stroke-[#6fb3c0] dark:stroke-[#1b5d68]',
    num: 'fill-[#1a1a1a] dark:fill-[#ffffff]',
  },
  cleaning: {
    bg: 'bg-[#ee9472] dark:bg-[#8a4530]',
    fill: 'fill-[#ee9472] dark:fill-[#8a4530]',
    stroke: 'stroke-[#ee9472] dark:stroke-[#8a4530]',
    num: 'fill-[#1a1a1a] dark:fill-[#ffffff]',
  },
  serious: {
    bg: 'bg-[#c2410c] dark:bg-[#ff7a4d]',
    fill: 'fill-[#c2410c] dark:fill-[#ff7a4d]',
    stroke: 'stroke-[#c2410c] dark:stroke-[#ff7a4d]',
    num: 'fill-[#ffffff] dark:fill-[#1a1a1a]',
  },
};
const tone = (score) => BAND_COLOR[bandOf(score).id];

/** Groups ranked by median score; groups under minCount are listed after them, unranked. */
const rankGroups = (rows, keyOf, nameOf, minCount = 1) => {
  const groups = [...new Set(rows.map(keyOf))].map((id) => {
    const all = rows.filter((r) => keyOf(r) === id);
    const bands = bandsOf(all);
    return {
      id,
      name: nameOf(id),
      count: all.length,
      fields: new Set(all.map((r) => r.field)).size,
      median: median(all.map((r) => r.score)),
      bands,
      readyShare: bands[0].n / all.length,
      seriousShare: bands[bands.length - 1].n / all.length,
      rows: median(all.filter((r) => r.rows).map((r) => r.rows)),
      cols: median(all.filter((r) => r.cols).map((r) => r.cols)),
      good: all.filter((r) => r.group === 'good').length,
      dirty: all.filter((r) => r.group === 'dirty').length,
    };
  });
  const rankable = groups.filter((g) => g.count >= minCount).sort((a, b) => b.median - a.median || b.count - a.count);
  const rest = groups.filter((g) => g.count < minCount).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  return [
    ...rankable.map((g) => ({ ...g, rank: 1 + rankable.filter((o) => o.median > g.median).length })),
    ...rest.map((g) => ({ ...g, rank: null })),
  ];
};

const LATEST = [
  {
    label: `Frozen ${BOARD.frozen}`,
    text: `${BOARD_ROWS.length} datasets in ${BOARD_FIELDS.length} industries, scored with appraisal ${BOARD.version}.`,
  },
  {
    label: 'Ranked',
    text: `${RANKED.length} ranked within their industry. ${BOARD_ROWS.length - RANKED.length} more are not ranked: generated, small, unconfirmed, copies or held back.`,
  },
  { label: 'Calibration', text: `${BOARD_MARKS.goodAboveDirtyPct}% of good and dirty pairs put the good file higher.` },
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

/** A highlight: one score per row, coloured by its band, every value labelled, so no tip is needed. */
const Highlight = ({ title, note, items, active, empty }) => (
  <Card as="figure" className="p-5">
    <figcaption>
      <h3 className="text-heading-lg text-ink">{title}</h3>
      <span className="mt-1 block text-body-sm text-ink-muted">{note}</span>
    </figcaption>
    {items.length === 0 ? (
      <p className="mt-6 text-body-sm text-ink-muted">{empty}</p>
    ) : (
      <ol className="mt-5 space-y-1.5">
        {items.map((it) => {
          const lit = active === it.id;
          return (
            <li key={it.id} className="group grid grid-cols-[minmax(0,9rem)_1fr_3rem] items-center gap-3">
              <span
                className={`truncate text-body-sm group-hover:text-ink ${lit ? 'font-medium text-ink' : 'text-ink-secondary'}`}
                title={it.name}
              >
                {it.name}
              </span>
              <span className="relative h-2.5">
                <span className={`absolute inset-y-0 left-0 rounded-r ${tone(it.v).bg}`} style={{ width: `${it.v}%` }} />
              </span>
              <span className="text-right text-body-sm tabular-nums text-ink">{showMedian(it.v)}</span>
            </li>
          );
        })}
      </ol>
    )}
  </Card>
);

/** A group's datasets by band, best first, with a 2px gap between bands; the counts are spelled out below it. */
const BandBar = ({ group }) => {
  const present = group.bands.filter((b) => b.n > 0);
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

const SortHead = ({ sort, sortKey, onSort }) => {
  const on = sort.key === sortKey;
  return (
    <th scope="col" aria-sort={on ? 'descending' : undefined} className="pb-3 pr-4 font-normal">
      <button
        type="button"
        onClick={() => onSort(sort.key)}
        className={`inline-flex items-center gap-1 rounded text-table-head uppercase ${on ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
      >
        {sort.label}
        {on && <ArrowDown className="h-3 w-3" aria-hidden="true" />}
      </button>
    </th>
  );
};

const TextButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded text-body-sm font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
  >
    {children}
  </button>
);

/**
 * The industry filter: a button that opens every industry in two columns,
 * with its count of ranked datasets. Escape or a click outside closes it,
 * and focus goes back to the button.
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

/** Industries or sources, ranked by median score; industries can be picked to scope the page. */
const GroupRanking = ({ groups, label, caption, detail, onPick, picked }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[46rem] text-left text-body-sm">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="border-b border-ink">
          <Head>Rank</Head>
          <Head>{label}</Head>
          <Head>By band</Head>
          <Head>Median</Head>
          <Head>Picked as</Head>
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => {
          const lit = picked === g.id;
          return (
            <tr key={g.id} className={`border-b border-border align-top ${lit ? 'bg-secondary' : ''}`}>
              <td className="py-4 pl-2 pr-4 text-heading-lg tabular-nums text-ink">
                {g.rank ?? <span className="whitespace-nowrap text-body-sm text-ink-muted">Too few</span>}
              </td>
              <th scope="row" className="min-w-[11rem] py-4 pr-6 font-normal">
                {onPick ? (
                  <button
                    type="button"
                    onClick={() => onPick(lit ? '' : g.id)}
                    aria-pressed={lit}
                    className="rounded text-left font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
                  >
                    {g.name}
                  </button>
                ) : (
                  <span className="block font-medium text-ink">{g.name}</span>
                )}
                <span className="block text-ink-muted">{detail(g)}</span>
              </th>
              <td className="w-full py-4 pr-6">
                <BandBar group={g} />
              </td>
              <td className={`py-4 pr-6 text-heading-lg tabular-nums ${g.rank ? 'text-ink' : 'text-ink-muted'}`}>
                {showMedian(g.median)}
              </td>
              <td className="whitespace-nowrap py-4 pr-2 text-ink-secondary">
                <span className="block">{g.good} known good</span>
                <span className="block">{g.dirty} known dirty</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// Industries across measures, after the source's capability index comparison
const MEASURES = [
  { key: 'median', label: 'Readiness', unit: 'median score', show: showMedian },
  { key: 'readyShare', label: 'Ready', unit: 'share at 90+', show: pct },
  { key: 'seriousShare', label: 'Fewest serious', unit: 'share under 50', show: pct, low: true },
  { key: 'rows', label: 'Size', unit: 'median rows', show: compact },
  { key: 'cols', label: 'Width', unit: 'median columns', show: showMedian },
];
// r leaves room for the last column's centred unit ("median columns")
const RK = { W: 960, top: 78, row: 40, l: 236, r: 64 };
const rkx = (c) => RK.l + (c * (RK.W - RK.l - RK.r)) / (MEASURES.length - 1);
const rky = (slot) => RK.top + slot * RK.row + RK.row / 2;

/** Per measure, each group's row (ties in name order) and rank (ties share it); a low measure ranks smallest first. */
const ranksOf = (groups) =>
  MEASURES.map((m) => {
    const val = (g) => g[m.key] ?? (m.low ? Infinity : -Infinity);
    const better = (a, b) => (m.low ? val(a) < val(b) : val(a) > val(b));
    const order = [...groups].sort((a, b) => (m.low ? val(a) - val(b) : val(b) - val(a)) || a.name.localeCompare(b.name));
    return new Map(order.map((g, slot) => [g.id, { slot, rank: 1 + groups.filter((o) => better(o, g)).length }]));
  });

const IndustryRanks = ({ groups, picked }) => {
  const [on, setOn] = useState(null);
  const [tip, setTip] = useState(null);
  const cols = useMemo(() => ranksOf(groups), [groups]);
  const focus = on ?? (groups.some((g) => g.id === picked) ? picked : null);
  const H = RK.top + groups.length * RK.row + 12;
  // The industry in focus is drawn last, so its line runs over the others
  const order = focus ? [...groups.filter((g) => g.id !== focus), groups.find((g) => g.id === focus)] : groups;
  return (
    <div className="overflow-x-auto">
      <div className="relative min-w-[44rem]">
        <svg
          viewBox={`0 0 ${RK.W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`Rank of ${groups.length} industries on ${MEASURES.length} measures`}
        >
          {groups.map((g, slot) => (
            <line key={g.id} x1={RK.l} x2={RK.W - RK.r} y1={rky(slot)} y2={rky(slot)} className="stroke-border" />
          ))}
          {MEASURES.map((m, c) => (
            <g key={m.key}>
              <text x={rkx(c)} y={RK.top - 34} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-ink">
                {m.label}
              </text>
              <text x={rkx(c)} y={RK.top - 18} textAnchor="middle" fontSize="11" className="fill-ink-muted">
                {m.unit}
              </text>
            </g>
          ))}
          {order.map((g) => {
            const color = tone(g.median);
            const pts = cols.map((col, c) => [rkx(c), rky(col.get(g.id).slot)]);
            const d = pts.reduce((path, [x, y], i) => {
              if (i === 0) return `M${x} ${y}`;
              const [px, py] = pts[i - 1];
              const mx = (px + x) / 2;
              return `${path}C${mx} ${py} ${mx} ${y} ${x} ${y}`;
            }, '');
            const lit = focus === g.id;
            return (
              <g
                key={g.id}
                opacity={focus && !lit ? 0.2 : 1}
                onPointerEnter={() => setOn(g.id)}
                onPointerLeave={() => {
                  setOn(null);
                  setTip(null);
                }}
              >
                <path d={d} fill="none" stroke="transparent" strokeWidth="16" />
                <path d={d} fill="none" strokeWidth={lit ? 3 : 2} className={color.stroke} />
                <text
                  x={RK.l - 22}
                  y={pts[0][1] + 4}
                  textAnchor="end"
                  fontSize="12"
                  className={lit ? 'fill-ink' : 'fill-ink-secondary'}
                >
                  {g.name}
                </text>
                {pts.map(([x, y], c) => {
                  const m = MEASURES[c];
                  const { rank } = cols[c].get(g.id);
                  return (
                    <g
                      key={m.key}
                      onPointerEnter={() =>
                        setTip({
                          value: m.show(g[m.key]),
                          name: g.name,
                          detail: `${m.label}: rank ${rank} of ${groups.length}`,
                          style: tipAt(x, y, RK.W, H),
                        })
                      }
                    >
                      <circle cx={x} cy={y} r="13" className="fill-card" />
                      <circle cx={x} cy={y} r="11" className={color.fill} />
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

// Name, track, value: the band labels sit over the track from md, where they fit
const BAR_GRID = 'grid grid-cols-[minmax(0,9rem)_1fr_2.25rem] gap-x-3 sm:grid-cols-[minmax(0,15rem)_1fr_2.5rem]';
const TOP = 25;

const where = (r) =>
  `${r.rows ? `${fmt(r.rows)} rows` : 'rows not confirmed'}, ${FIELD_LABEL[r.field]}, from ${r.source ?? 'an unrecorded source'}`;

/** Every charted dataset as a bar in its band's colour, the top 25 first; low confidence is lighter. */
const ScoreBars = ({ rows }) => {
  const [tip, setTip] = useState(null);
  const [all, setAll] = useState(false);
  const shown = all ? rows : rows.slice(0, TOP);
  return (
    <div>
      <div className={`${BAR_GRID} max-md:hidden`} aria-hidden="true">
        <span />
        <span className="relative h-7">
          {BAND_SPANS.map((b) => (
            <span
              key={b.id}
              className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-body-sm text-ink-muted"
              style={{ left: `${(b.min + b.max) / 2}%` }}
            >
              {b.label}
            </span>
          ))}
        </span>
        <span />
      </div>
      <ol>
        {shown.map((r) => {
          const on = tip === r.key;
          return (
            <li key={r.key} className={BAR_GRID} onPointerEnter={() => setTip(r.key)} onPointerLeave={() => setTip(null)}>
              <span className={`truncate py-1.5 text-body-sm ${on ? 'text-ink' : 'text-ink-secondary'}`} title={r.name}>
                {r.name}
              </span>
              <span className="relative">
                {[50, 70, 90].map((s) => (
                  <span key={s} className="absolute inset-y-0 w-px bg-border" style={{ left: `${s}%` }} />
                ))}
                <span
                  className={`absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-r ${tone(r.score).bg} ${
                    r.state === 'low' ? 'opacity-40' : ''
                  } ${on ? 'ring-2 ring-ink ring-offset-1 ring-offset-card' : ''}`}
                  style={{ width: `${r.score}%` }}
                />
                {on && (
                  <Tip
                    value={r.score}
                    name={r.name}
                    detail={`${bandOf(r.score).label}, ${where(r)}${r.state === 'low' ? ', low confidence' : ''}`}
                    style={{ left: `${r.score}%`, bottom: '100%', transform: `translateX(${r.score > 75 ? '-100%' : '-50%'})` }}
                  />
                )}
              </span>
              <span className="py-1.5 text-right text-body-sm tabular-nums text-ink">{r.score}</span>
            </li>
          );
        })}
      </ol>
      {rows.length > TOP && (
        <div className="mt-4">
          <TextButton onClick={() => setAll(!all)}>{all ? `Show the top ${TOP}` : `Show all ${rows.length}`}</TextButton>
        </div>
      )}
    </div>
  );
};

// Rows on a log scale, from 100 to past the biggest dataset charted
const SIZED = BOARD_ROWS.filter((r) => charted(r) && r.rows);
const LOG = [2, Math.log10(Math.max(...SIZED.map((r) => r.rows)) * 1.5)];
const logPlace = (rows) => (Math.log10(rows) - LOG[0]) / (LOG[1] - LOG[0]);
const SC = { W: 800, H: 360, l: 40, r: 16, t: 16, b: 40 };
const sx = (rows) => SC.l + logPlace(rows) * (SC.W - SC.l - SC.r);
const sy = (score) => SC.t + (1 - score / 100) * (SC.H - SC.t - SC.b);
const ROW_TICKS = [
  [100, '100'],
  [400, '400'],
  [1000, '1k'],
  [10000, '10k'],
  [100000, '100k'],
  [1000000, '1M'],
].filter(([v]) => Math.log10(v) <= LOG[1]);
const SCORE_TICKS = [0, 50, 70, 90, 100];

/** Colour is the band; shape is the label written down before scoring (filled good, ring dirty). */
const SizeScatter = ({ rows }) => {
  const [tip, setTip] = useState(null);
  return (
    <div className="overflow-x-auto">
      <div className="relative min-w-[36rem]">
        <svg
          viewBox={`0 0 ${SC.W} ${SC.H}`}
          className="block w-full"
          role="img"
          aria-label={`Readiness score against rows for ${rows.length} datasets`}
        >
          <rect x={sx(100)} y={SC.t} width={sx(400) - sx(100)} height={sy(0) - SC.t} className="fill-secondary" />
          {SCORE_TICKS.map((s) => (
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
          <text x={sx(100) + 8} y={sy(0) - 10} fontSize="11" className="fill-ink-muted">
            Under 400 rows
          </text>
          <text x={SC.W - SC.r} y={SC.H - 4} textAnchor="end" fontSize="11" className="fill-ink-muted">
            Rows, log scale
          </text>
          {rows.map((r) => {
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
                    detail: `${where(r)}${r.group ? `, known ${r.group} before scoring` : ''}`,
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
                  <circle cx={cx} cy={cy} r={(r.group ? 5 : 3.5) + (on ? 1.5 : 0)} className={color.fill} />
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

/** Known good and known dirty datasets, each split by band. */
const AgreementBars = ({ rows }) => (
  <dl className="space-y-5">
    {[
      ['good', 'Known good'],
      ['dirty', 'Known dirty'],
    ].map(([id, label]) => {
      const lane = rows.filter((r) => r.group === id);
      return (
        <div key={id} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <dt className="text-body-sm font-medium text-ink">
            {label}
            <span className="block font-normal text-ink-muted">
              {lane.length} {lane.length === 1 ? 'dataset' : 'datasets'}
            </span>
          </dt>
          <dd>
            {lane.length ? (
              <BandBar group={{ bands: bandsOf(lane) }} />
            ) : (
              <span className="text-body-sm text-ink-muted">None in this view</span>
            )}
          </dd>
        </div>
      );
    })}
  </dl>
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

const SORTS = [
  { key: 'score', label: 'Score' },
  { key: 'rows', label: 'Rows' },
  { key: 'cols', label: 'Columns' },
];
const FIRST = 30;

const DatasetTable = ({ rows }) => {
  const [sortKey, setSortKey] = useState('score');
  const [all, setAll] = useState(false);
  const sorted = useMemo(() => [...rows].sort(byDesc(sortKey)), [rows, sortKey]);
  const shown = all ? sorted : sorted.slice(0, FIRST);
  const sortSet = (key) => SORTS.find((s) => s.key === key);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[80rem] text-left text-body-sm">
          <caption className="sr-only">Datasets on the board, sorted by {sortSet(sortKey).label.toLowerCase()}</caption>
          <thead>
            <tr className="border-b border-ink">
              <Head>Dataset</Head>
              <Head>Industry</Head>
              <Head>Source</Head>
              <SortHead sort={sortSet('score')} sortKey={sortKey} onSort={setSortKey} />
              <SortHead sort={sortSet('rows')} sortKey={sortKey} onSort={setSortKey} />
              <SortHead sort={sortSet('cols')} sortKey={sortKey} onSort={setSortKey} />
              <Head>Weakest check</Head>
              <Head>Picked as</Head>
              <Head>State</Head>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.key} className="border-b border-border align-top">
                <th scope="row" className="py-3 pr-4 font-medium text-ink">
                  {r.name}
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
                <td className="py-3 pr-4 tabular-nums text-ink">{r.cols ?? '–'}</td>
                <td className="py-3 pr-4 text-ink-secondary">{r.lowest ? capital(r.lowest) : '–'}</td>
                <td className="py-3 pr-4 text-ink-secondary">{r.group ? `Known ${r.group}` : 'Not labelled'}</td>
                <td className="py-3 text-ink-secondary">{STATE[r.state]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sorted.length > FIRST && (
        <div className="mt-4">
          <TextButton onClick={() => setAll(!all)}>{all ? `Show the first ${FIRST}` : `Show all ${sorted.length}`}</TextButton>
        </div>
      )}
    </>
  );
};

const BenchmarksMarketMockPage = () => {
  usePageMeta({
    title: 'Benchmarks market mock | Aseryx',
    description: PAGE_META['/benchmarks'].description,
    path: '/benchmarks/market-mock',
    noIndex: true,
  });
  const [field, setField] = useState('');
  const [pick, setPick] = useState('any');

  // One bar filters everything below it, so the numbers always agree. The
  // industry comparisons keep every industry and mark the one picked.
  const pool = useMemo(() => BOARD_ROWS.filter((r) => pick === 'any' || r.group === pick), [pick]);
  const poolRanked = useMemo(() => pool.filter((r) => r.state === 'ranked'), [pool]);
  const inView = useMemo(() => pool.filter((r) => !field || r.field === field), [pool, field]);
  const ranked = useMemo(() => inView.filter((r) => r.state === 'ranked'), [inView]);
  const charts = useMemo(() => inView.filter(charted).sort(byDesc('score')), [inView]);
  const industries = useMemo(() => rankGroups(poolRanked, (r) => r.field, (id) => FIELD_LABEL[id], MIN_TO_RANK), [poolRanked]);
  const rankable = industries.filter((g) => g.rank);
  const sources = useMemo(() => rankGroups(ranked, (r) => r.source, (id) => id), [ranked]);
  // The like-for-like source comparison stays on known good datasets, whatever the pick
  const fairSources = useMemo(
    () => rankGroups(RANKED.filter((r) => r.group === 'good' && (!field || r.field === field)), (r) => r.source, (id) => id),
    [field]
  );
  const industryOptions = useMemo(
    () => [
      { id: '', label: 'All industries', n: poolRanked.length },
      ...BOARD_FIELDS.map((f) => ({ id: f.id, label: f.label, n: poolRanked.filter((r) => r.field === f.id).length })),
    ],
    [poolRanked]
  );

  const good = charts.filter((r) => r.group === 'good');
  const dirty = charts.filter((r) => r.group === 'dirty');
  const scope = `${field ? FIELD_LABEL[field] : 'All industries'}${pick === 'any' ? '' : `, ${pick === 'good' ? 'known good' : 'known dirty'} only`}`;

  return (
    <PageLayout>
      <PageHero
        title="How ready each dataset is for training"
        lede="One formula scores every dataset in a domain, and datasets are compared only with their own domain. Scores show how ready a dataset is for training."
        actions={
          <Button href="#method" variant="standard">
            See how the score works
          </Button>
        }
        aside={
          <div className="lg:pl-8">
            <h2 className="text-body font-semibold text-ink">Latest</h2>
            <dl className="mt-3 border-t border-border">
              {LATEST.map(({ label: name, text }) => (
                <div key={name} className="border-b border-border py-4">
                  <dt className="text-body-sm text-ink-muted">{name}</dt>
                  <dd className="mt-1 text-body text-ink">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* Sticky under the 65px nav from md, so what is filtered stays in view on a long page */}
      <div className="z-30 border-y border-border bg-page px-6 md:sticky md:top-[65px] lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 py-3">
          <IndustryMenu value={field} options={industryOptions} onChange={setField} />
          <div role="group" aria-label="Picked as" className="flex flex-wrap items-center gap-2">
            <span className="text-body-sm text-ink-muted">Picked as</span>
            {PICKS.map((p) => (
              <FilterChip key={p.id} active={pick === p.id} onClick={() => setPick(p.id)}>
                {p.label}
              </FilterChip>
            ))}
          </div>
          <p className="text-body-sm tabular-nums text-ink-muted md:ml-auto" aria-live="polite">
            {ranked.length} ranked of {inView.length} {inView.length === 1 ? 'dataset' : 'datasets'}
          </p>
          {(field || pick !== 'any') && (
            <TextButton
              onClick={() => {
                setField('');
                setPick('any');
              }}
            >
              Clear
            </TextButton>
          )}
        </div>
      </div>

      <Section spacing="none" className="pt-8 pb-16 md:pt-10 md:pb-24" aria-label="Highlights">
        <div className="grid gap-6 lg:grid-cols-3">
          <Highlight
            title="Readiest datasets"
            note="Ranked datasets, out of 100. Higher is better."
            items={[...ranked]
              .sort(byDesc('score'))
              .slice(0, 10)
              .map((r) => ({ id: r.key, name: r.name, v: r.score }))}
            empty="No ranked datasets in this view."
          />
          <Highlight
            title="Industries"
            note={`Median score of every industry with ${MIN_TO_RANK} or more ranked datasets; the one picked is marked.`}
            items={rankable.slice(0, 10).map((g) => ({ id: g.id, name: g.name, v: g.median }))}
            active={field}
            empty="Too few ranked datasets per industry in this view."
          />
          <Highlight
            title="Sources"
            note="Median score of each source's ranked datasets. Higher is better."
            items={sources.map((g) => ({ id: g.id, name: g.name, v: g.median }))}
            empty="No ranked datasets in this view."
          />
        </div>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="industries">
        <SectionHeader
          id="industries"
          title="Industries"
          lede="How each industry's ranked datasets score, and where each industry stands on every measure. Pick an industry to see only its datasets."
        />
        <div className="space-y-6">
          <ChartCard
            id="chart-industries"
            title="How industries stack up"
            note={`Each industry ranked by the median score of its ranked datasets; it needs ${MIN_TO_RANK} to be ranked. The bar splits them by band.`}
            shown={`${industries.length} industries`}
            legend={BAND_LEGEND}
          >
            <GroupRanking
              groups={industries}
              label="Industry"
              caption="Industries ranked by the median score of their ranked datasets"
              detail={(g) => `${g.count} ranked ${g.count === 1 ? 'dataset' : 'datasets'}`}
              onPick={setField}
              picked={field}
            />
          </ChartCard>

          <ChartCard
            id="chart-industry-ranks"
            title="How industries rank on each measure"
            note={`Rank among the industries with ${MIN_TO_RANK} or more ranked datasets on each measure; tied industries share a rank. A line takes the colour of its industry's median band. Point at a rank for its value.`}
            shown={`${rankable.length} of ${BOARD_FIELDS.length} industries`}
            legend={BAND_LEGEND}
          >
            {rankable.length > 1 ? (
              <IndustryRanks groups={rankable} picked={field} />
            ) : (
              <p className="text-body-sm text-ink-muted">Too few industries with ranked datasets in this view.</p>
            )}
          </ChartCard>
        </div>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="sources">
        <SectionHeader
          id="sources"
          title="Sources"
          lede="Where the ranked datasets came from, and how each source's datasets score."
        />
        <ChartCard
          id="chart-sources"
          title="Which sources hold up"
          note={`${scope}. Each source ranked by the median score of its ranked datasets; the bar splits them by band.`}
          shown={`${sources.length} ${sources.length === 1 ? 'source' : 'sources'}`}
          legend={BAND_LEGEND}
          footer={`The board picked these datasets to test the score, many of them for known problems, so how many known dirty files a source has moves its median. Counting known good datasets only: ${
            fairSources.length ? fairSources.map((g) => `${g.name} ${showMedian(g.median)}`).join(', ') : 'none here'
          }. Many Hugging Face files are community uploads of UCI and Kaggle datasets.`}
        >
          {sources.length ? (
            <GroupRanking
              groups={sources}
              label="Source"
              caption="Sources ranked by the median score of their ranked datasets"
              detail={(g) =>
                `${g.count} ${g.count === 1 ? 'dataset' : 'datasets'} in ${g.fields} ${g.fields === 1 ? 'industry' : 'industries'}`
              }
            />
          ) : (
            <p className="text-body-sm text-ink-muted">No ranked datasets in this view.</p>
          )}
        </ChartCard>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="readiness">
        <SectionHeader
          id="readiness"
          title="Readiness"
          lede={`${scope}, from the board's ${BOARD.version} run frozen on ${BOARD.frozen}.`}
        />
        <div className="space-y-6">
          <ChartCard
            id="chart-score"
            title="Readiness score"
            note={`100 times the product of ${CHECKS.length} checks, rounded down. Lines mark the bands at 50, 70 and 90; low-confidence datasets, under 400 rows, are lighter.`}
            shown={`${charts.length} of ${inView.length} datasets`}
            legend={BAND_LEGEND}
          >
            {charts.length ? <ScoreBars rows={charts} /> : <p className="text-body-sm text-ink-muted">No scored datasets here.</p>}
          </ChartCard>

          <ChartCard
            id="chart-size"
            title="Readiness against size"
            note="One dot per dataset with a confirmed row count. Under 400 rows a dataset is scored but not ranked."
            shown={`${charts.filter((r) => r.rows).length} datasets`}
            legend={
              <>
                <Key swatch={<span className="h-2.5 w-2.5 rounded-full bg-ink-secondary" />}>Known good before scoring</Key>
                <Key swatch={<span className="h-2.5 w-2.5 rounded-full border-[1.75px] border-ink-secondary" />}>
                  Known dirty before scoring
                </Key>
                {BAND_LEGEND}
              </>
            }
          >
            <SizeScatter rows={charts.filter((r) => r.rows)} />
          </ChartCard>

          <ChartCard
            id="chart-agreement"
            title="The score against what was known"
            note="Each dataset was written down as known good or known dirty before it was scored. A good dataset should score 70 or more, a dirty one under 70."
            shown={`${good.length + dirty.length} datasets`}
            legend={BAND_LEGEND}
            footer={`${good.filter((r) => r.score >= 70).length} of ${good.length} known good datasets score 70 or more; ${
              dirty.filter((r) => r.score < 70).length
            } of ${dirty.length} known dirty datasets score under 70.`}
          >
            <AgreementBars rows={charts} />
          </ChartCard>
        </div>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="compare">
        <SectionHeader
          id="compare"
          title="Compare datasets"
          lede="Every dataset in this view, with its industry, where it came from and how it was picked."
        />
        <DatasetTable rows={inView} />
      </Section>

      <Section spacing="none" id="method" className="border-t border-border py-16 md:py-24" aria-labelledby="method-title">
        <SectionHeader
          id="method-title"
          title="How the score works"
          lede={`One formula scores every dataset: 100 times the product of ${CHECKS.length} checks, rounded down. Each check falls to zero at the share below.`}
          action={
            <Button to="/benchmarks#method" variant="standard">
              Read the full method
            </Button>
          }
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
          Calibrated on a 439-file corpus. Those files helped build the score, so they show how it was tuned, not proof
          that it works.
        </p>
      </Section>
    </PageLayout>
  );
};

export default BenchmarksMarketMockPage;
