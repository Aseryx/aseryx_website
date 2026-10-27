import { useMemo, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import FilterChip from '../components/common/FilterChip.jsx';
import TABLES, { BENCHMARK, BANDS, bandOf } from '../data/benchmarks.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

const BAND_DOT = { ready: 'bg-success-dot', usable: 'bg-pending', cleaning: 'bg-brand', serious: 'bg-critical' };
const PROVENANCE = { documented: 'Documented', partial: 'Partly documented', none: 'No stated source' };

const GROUPS = [
  { id: 'ranked', label: 'Ranked', note: '400 rows or more' },
  { id: 'low', label: 'Low confidence', note: 'Under 400 rows, scored but not ranked' },
  { id: 'pending', label: 'Awaiting a score', note: 'Waiting for a v10.1 run' },
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
    unit: 'open licences',
    note: `${count((t) => t.licenceLevel === 'restricted')} restricted, ${count((t) => t.licenceLevel === 'unclear')} to confirm`,
  },
  {
    value: count((t) => t.provenance === 'documented'),
    unit: 'fully documented',
    note: `${count((t) => t.provenance === 'partial')} partly documented, ${count((t) => t.provenance === 'none')} with no stated source`,
  },
];

/** Competition ranking among ranked tables: ties share a rank. */
const rankOf = (table) =>
  table.group === 'ranked' ? 1 + TABLES.filter((t) => t.group === 'ranked' && t.score > table.score).length : null;

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
        <span className={`h-1.5 w-1.5 rounded-full ${BAND_DOT[band.id]}`} aria-hidden="true" />
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
        eyebrow={`Benchmarks · ${BENCHMARK.domain}`}
        title="How ready each dataset is for training"
        lede="One formula scores every dataset in a domain, and datasets are compared only with their own domain. Scores show readiness, not price."
        actions={
          <Button href="#method" variant="standard" arrow={false}>
            How the score works
          </Button>
        }
      >
        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-4 text-body-sm">
          {[
            ['Version', BENCHMARK.version],
            ['Run', BENCHMARK.run],
            ['Scope', `${BENCHMARK.domain} tables, public sources`],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <dt className="font-mono text-table-head uppercase leading-5 text-ink-muted">{label}</dt>
              <dd className="text-ink-secondary">{value}</dd>
            </div>
          ))}
        </dl>

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

      <Section spacing="none" className="pb-16 md:pb-24" aria-labelledby="ranking">
        <SectionHeader
          id="ranking"
          eyebrow="Ranking"
          title="The ranking"
          lede="Ranked by readiness score; ties share a rank. Tables under 400 rows are scored but not ranked."
        />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 mb-6">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by band">
            <FilterChip active={band === 'all'} onClick={() => setBand('all')}>
              All bands
            </FilterChip>
            {BANDS.map((b) => (
              <FilterChip key={b.id} active={band === b.id} onClick={() => setBand(b.id)}>
                <span className={`h-1.5 w-1.5 rounded-full ${BAND_DOT[b.id]}`} aria-hidden="true" />
                {b.label}
              </FilterChip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by task and licence">
            <FilterChip active={task === 'binary'} onClick={() => setTask(task === 'binary' ? 'all' : 'binary')}>
              Binary
            </FilterChip>
            <FilterChip active={task === 'multiclass'} onClick={() => setTask(task === 'multiclass' ? 'all' : 'multiclass')}>
              Multiclass
            </FilterChip>
            <FilterChip active={openOnly} onClick={() => setOpenOnly(!openOnly)}>
              Open licence
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
                  Licence
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
                    <td className="py-4 pl-5 pr-2 font-mono text-body-sm tabular-nums text-ink-muted">{rankOf(t) ?? '·'}</td>
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
    </PageLayout>
  );
};

export default BenchmarksPage;
