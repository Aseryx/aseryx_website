import { useMemo, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import FilterChip from '../components/common/FilterChip.jsx';
import Card from '../components/common/Card.jsx';
import ReadinessMap from '../components/benchmarks/ReadinessMap.jsx';
import ScoreDial from '../components/motion/certificate/ScoreDial.jsx';
import { BAND_TONE } from '../components/benchmarks/bandTone.js';
import TABLES, { BENCHMARK, BANDS, CHECKS, CALIBRATION, bandOf } from '../data/benchmarks.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

const PROVENANCE = { documented: 'Documented', partial: 'Partly documented', none: 'No stated source' };

const GROUPS = [
  { id: 'ranked', label: 'Ranked', note: '400 rows or more' },
  { id: 'low', label: 'Low confidence', note: 'Under 400 rows, scored but not ranked' },
  { id: 'pending', label: 'Awaiting a score', note: 'Waiting for a score' },
];

const SORTS = [
  { key: 'score', label: 'Score' },
  { key: 'rows', label: 'Rows' },
  { key: 'rarest', label: 'Rarest class' },
];

const fmt = (n) => n.toLocaleString('en-US');
const count = (pred) => TABLES.filter(pred).length;

const rowCounts = TABLES.map((t) => t.rows);
const FACTS = [
  {
    value: TABLES.length,
    unit: 'tables',
    note: `${count((t) => t.group === 'ranked')} ranked, ${count((t) => t.group === 'low')} low confidence, ${count(
      (t) => t.group === 'pending'
    )} awaiting a score`,
  },
  {
    value: `${fmt(Math.min(...rowCounts))} to ${fmt(Math.max(...rowCounts))}`,
    unit: 'rows',
    note: 'From 155 hepatitis patients to a national phone survey',
  },
  {
    value: count((t) => t.licenceLevel === 'open'),
    unit: 'open licenses',
    note: `${count((t) => t.licenceLevel === 'restricted')} restricted, ${count((t) => t.licenceLevel === 'unclear')} to confirm`,
  },
  {
    value: count((t) => t.provenance === 'documented'),
    unit: 'fully documented',
    note: `${count((t) => t.provenance === 'partial')} partly documented, ${count((t) => t.provenance === 'none')} with no stated source`,
  },
];

// How far the score agrees with the reputation written down before scoring.
const scoredTables = TABLES.filter((t) => t.score != null);
const knownGood = scoredTables.filter((t) => t.reputation === 'good');
const knownDirty = scoredTables.filter((t) => t.reputation === 'dirty');
const AGREEMENT = `${knownGood.filter((t) => t.score >= 70).length} of ${knownGood.length} tables known good before scoring score 70 or more; ${
  knownDirty.filter((t) => t.score < 70).length
} of ${knownDirty.length} known dirty score under 70.`;

const STATES = [
  ['Low confidence', '100 to 399 effective rows. Scored and shown, not ranked.'],
  ['Insufficient rows', 'Under 100 effective rows. Scored, not shown.'],
  ['Not scored yet', 'A recorded known limit, with the reason.'],
];

/** Competition ranking among ranked tables (ties share a rank), worked out once instead of on every render. */
const ranked = TABLES.filter((t) => t.group === 'ranked');
const RANK = new Map(ranked.map((t) => [t.id, 1 + ranked.filter((other) => other.score > t.score).length]));

// The hero's dial shows one real score: the table the motion pack was drawn from.
const FEATURED = TABLES.find((t) => t.id === 'brfss');

const ScoreCell = ({ score }) => {
  const band = bandOf(score);
  if (!band) return <span className="text-body-sm text-ink-muted">Not scored yet</span>;
  return (
    <div className="min-w-[5.5rem] sm:min-w-[7.5rem]">
      <div className="flex items-center gap-3">
        <span className="w-9 text-heading-lg tabular-nums text-ink">{score}</span>
        <span className="hidden h-1.5 w-16 overflow-hidden rounded-r-sm bg-muted sm:block" aria-hidden="true">
          <span className="block h-full bg-ink" style={{ width: `${score}%` }} />
        </span>
      </div>
      <span className="mt-1 flex items-center gap-1.5 text-body-sm text-ink-secondary">
        <span className={`h-1.5 w-1.5 rounded-full ${BAND_TONE[band.id].dot}`} aria-hidden="true" />
        {band.label}
      </span>
    </div>
  );
};

const BenchmarksPage = () => {
  usePageMeta({ ...PAGE_META['/benchmarks'], path: '/benchmarks' });
  const [band, setBand] = useState('all');
  const [openOnly, setOpenOnly] = useState(false);
  const [task, setTask] = useState('all');
  const [sortKey, setSortKey] = useState('score');

  const groups = useMemo(() => {
    const keep = (t) =>
      (band === 'all' || bandOf(t.score)?.id === band) &&
      (!openOnly || t.licenceLevel === 'open') &&
      (task === 'all' || t.task === task);
    const byKey = (a, b) => (b[sortKey] ?? -1) - (a[sortKey] ?? -1) || a.name.localeCompare(b.name);
    return GROUPS.map((g) => ({ ...g, tables: TABLES.filter((t) => t.group === g.id && keep(t)).sort(byKey) })).filter(
      (g) => g.tables.length > 0
    );
  }, [band, openOnly, task, sortKey]);

  const shown = groups.reduce((n, g) => n + g.tables.length, 0);
  const clear = () => {
    setBand('all');
    setOpenOnly(false);
    setTask('all');
  };

  return (
    <PageLayout>
      <PageHero
        title="How ready each dataset is for training"
        lede="One formula scores every dataset in a domain, and datasets are compared only with their own domain. Scores show how ready a dataset is for training."
        aside={
          <figure className="mx-auto w-fit text-center text-ink">
            {/* In the hero it is on screen at load, so it plays then rather than waiting to be scrolled to */}
            <ScoreDial score={FEATURED.score} above="Readiness score" size={240} animateOnLoad />
            <figcaption className="mx-auto mt-4 max-w-[16rem] text-body-sm text-ink-secondary">{FEATURED.name}</figcaption>
          </figure>
        }
        actions={
          <Button href="#method" variant="standard">
            See how the score works
          </Button>
        }
      >
        <p className="mt-10 border-t border-border pt-4 text-body-sm text-ink-secondary">
          How we tested the score: public datasets, scored on {BENCHMARK.run}.
        </p>

        <dl className="mt-10 grid grid-cols-2 border-y border-border lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <div
              key={fact.unit}
              className={`py-6 pr-4 ${i % 2 ? 'border-l border-border pl-4' : ''} ${i > 1 ? 'border-t border-border lg:border-t-0' : ''} ${
                i === 2 ? 'lg:border-l lg:pl-4' : ''
              }`}
            >
              <dt className="text-body-sm text-ink-secondary">
                <span className="block text-page-title font-semibold tabular-nums text-ink">{fact.value}</span>
                {fact.unit}
              </dt>
              <dd className="mt-2 text-body-sm text-ink-muted">{fact.note}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="map">
        <SectionHeader
          id="map"
          title="Readiness against size"
          lede="Each dot is one dataset. Higher is readier for training, further right is bigger. Hover a dot for its name."
        />
        <Card className="p-5 md:p-8">
          <ReadinessMap titleId="map" />
          <p className="mt-6 border-t border-border-light pt-4 text-body text-ink-secondary">{AGREEMENT}</p>
        </Card>
      </Section>

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="ranking">
        <SectionHeader
          id="ranking"
          title="The ranking"
          lede="Ranked by readiness score; ties share a rank. Very small datasets are scored but not ranked."
        />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 mb-6">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by band">
            <FilterChip active={band === 'all'} onClick={() => setBand('all')}>
              All bands
            </FilterChip>
            {BANDS.map((b) => (
              <FilterChip key={b.id} active={band === b.id} onClick={() => setBand(b.id)}>
                <span className={`h-1.5 w-1.5 rounded-full ${BAND_TONE[b.id].dot}`} aria-hidden="true" />
                {b.label}
              </FilterChip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by task and license">
            <FilterChip active={task === 'binary'} onClick={() => setTask(task === 'binary' ? 'all' : 'binary')}>
              Binary
            </FilterChip>
            <FilterChip active={task === 'multiclass'} onClick={() => setTask(task === 'multiclass' ? 'all' : 'multiclass')}>
              Multiclass
            </FilterChip>
            <FilterChip active={openOnly} onClick={() => setOpenOnly(!openOnly)}>
              Open license
            </FilterChip>
          </div>
          <p className="ml-auto flex items-center gap-4 text-body-sm text-ink-muted" aria-live="polite">
            {shown} of {TABLES.length} tables
            {shown < TABLES.length && (
              <button type="button" onClick={clear} className="text-ink underline underline-offset-4 hover:text-ink-secondary">
                Clear filters
              </button>
            )}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-body">
            <caption className="sr-only">
              {BENCHMARK.domain} tables by readiness score. Sort with the column buttons.
            </caption>
            <thead>
              <tr className="border-b border-border text-table-head uppercase text-ink-muted">
                <th scope="col" className="w-12 py-3 pl-5 pr-2 font-medium">
                  #
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  Dataset · what one row is
                </th>
                {SORTS.map((s) => (
                  <th
                    key={s.key}
                    scope="col"
                    aria-sort={sortKey === s.key ? 'descending' : 'none'}
                    className={`py-3 pr-4 font-medium ${s.key === 'score' ? '' : 'hidden md:table-cell'}`}
                  >
                    <button
                      type="button"
                      onClick={() => setSortKey(s.key)}
                      className={`inline-flex items-center gap-1 uppercase ${sortKey === s.key ? 'text-ink' : 'hover:text-ink'}`}
                    >
                      {s.label}
                      <ArrowDown className={`h-3 w-3 ${sortKey === s.key ? '' : 'opacity-0'}`} aria-hidden="true" />
                    </button>
                  </th>
                ))}
                <th scope="col" className="hidden py-3 pr-4 font-medium lg:table-cell">
                  License
                </th>
                <th scope="col" className="hidden py-3 pr-5 font-medium lg:table-cell">
                  Provenance
                </th>
              </tr>
            </thead>
            {groups.map((group) => (
              <tbody key={group.id}>
                {group.id !== 'ranked' && (
                  <tr className="border-t border-border bg-secondary">
                    <th scope="colgroup" colSpan={7} className="py-2.5 pl-5 text-body-sm font-normal text-ink-muted">
                      <span className="font-medium text-ink-secondary">{group.label}</span> · {group.note}
                    </th>
                  </tr>
                )}
                {group.tables.map((t) => (
                  <tr key={t.id} className="border-t border-border-light align-top transition-colors hover:bg-hover">
                    <td className="py-4 pl-5 pr-2 font-mono text-body-sm tabular-nums text-ink-muted">{RANK.get(t.id) ?? '·'}</td>
                    <th scope="row" className="py-4 pr-4 font-normal">
                      <span className="block font-medium text-ink">{t.name}</span>
                      <span className="mt-0.5 block text-body-sm text-ink-muted">{t.short}</span>
                      <span className="mt-1 block text-body-sm text-ink-secondary md:hidden">
                        {fmt(t.rows)} rows · {t.licence}
                      </span>
                    </th>
                    <td className="py-4 pr-4">
                      <ScoreCell score={t.score} />
                    </td>
                    <td className="hidden py-4 pr-4 font-mono text-body-sm tabular-nums text-ink-secondary md:table-cell">
                      {fmt(t.rows)}
                      <span className="block font-sans text-ink-muted">{t.columns} columns</span>
                    </td>
                    <td className="hidden py-4 pr-4 font-mono text-body-sm tabular-nums text-ink-secondary md:table-cell">
                      {t.rarest == null ? '·' : `${t.rarest}%`}
                      <span className="block font-sans capitalize text-ink-muted">{t.task}</span>
                    </td>
                    <td className="hidden py-4 pr-4 text-body-sm text-ink-secondary lg:table-cell">{t.licence}</td>
                    <td className="hidden py-4 pr-5 text-body-sm text-ink-secondary lg:table-cell">
                      {PROVENANCE[t.provenance]}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
          {shown === 0 && <p className="border-t border-border px-5 py-6 text-body text-ink-secondary">No table matches these filters.</p>}
        </div>

        <p className="mt-4 text-body-sm text-ink-muted">
          Bands: Ready 90 and up, Usable 70 to 89, Needs cleaning 50 to 69, Serious under 50. Rarest class is the smallest
          outcome as a share of rows.
        </p>
      </Section>

      <Section tone="secondary" id="method" aria-labelledby="method-title">
        <SectionHeader
          id="method-title"
          title="How the score works"
          lede="Every dataset in a domain is scored by the same formula. One weak spot pulls the whole score down, so a high score means no weak spots."
        />

        <Card className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-body">
            <caption className="sr-only">The checks behind the readiness score</caption>
            <thead>
              <tr className="border-b border-border text-table-head uppercase text-ink-muted">
                <th scope="col" className="py-3 pl-5 pr-4 font-medium">
                  Check
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  What it counts
                </th>
                <th scope="col" className="py-3 pr-5 font-medium">
                  Reaches 0 at
                </th>
              </tr>
            </thead>
            <tbody>
              {CHECKS.map((check) => (
                <tr key={check.name} className="border-t border-border-light align-top">
                  <th scope="row" className="py-4 pl-5 pr-4 font-medium text-ink">
                    {check.name}
                  </th>
                  <td className="py-4 pr-4 text-ink-secondary">{check.counts}</td>
                  <td className="py-4 pr-5 text-ink-secondary">{check.zero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="border-t border-border pt-5">
            <h3 className="text-heading-lg text-ink">Bands</h3>
            <ul className="mt-4 space-y-2 text-body text-ink-secondary">
              {BANDS.map((b, i) => (
                <li key={b.id} className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${BAND_TONE[b.id].dot}`} aria-hidden="true" />
                  <span className="text-ink">{b.label}</span>
                  <span className="ml-auto font-mono text-body-sm tabular-nums">
                    {i === 0 ? `${b.min}+` : i === BANDS.length - 1 ? `under ${BANDS[i - 1].min}` : `${b.min} to ${BANDS[i - 1].min - 1}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-border pt-5">
            <h3 className="text-heading-lg text-ink">States</h3>
            <dl className="mt-4 space-y-3 text-body">
              {STATES.map(([term, detail]) => (
                <div key={term}>
                  <dt className="text-ink">{term}</dt>
                  <dd className="text-ink-secondary">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t border-border pt-5">
            <h3 className="text-heading-lg text-ink">Ranking</h3>
            <p className="mt-4 text-body text-ink-secondary">
              Tables are ranked only against their own domain, by score, highest first. Ties share a rank. Low-confidence
              tables sit below the ranking, and a table without a score waits for one.
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <h3 className="text-heading-lg text-ink">Calibration</h3>
          <p className="mt-1 text-body-sm text-ink-muted">
            Every one of these files helped build the score, so these marks show calibration, not evidence.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {CALIBRATION.map((c) => (
              <div key={c.note} className="flex flex-col border-t-2 border-ink pt-3">
                <dt className="text-body-sm text-ink-secondary">{c.note}</dt>
                <dd className="order-first text-page-title font-semibold tabular-nums text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </PageLayout>
  );
};

export default BenchmarksPage;
