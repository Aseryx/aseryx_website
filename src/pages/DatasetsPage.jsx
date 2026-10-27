import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import FilterChip from '../components/common/FilterChip.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import DATASETS, { MODALITIES } from '../data/datasets.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const FILTERS = [{ value: 'All', count: DATASETS.length }].concat(
  MODALITIES.map((m) => ({ value: m, count: DATASETS.filter((d) => d.modality === m).length }))
);

const DatasetsPage = () => {
  usePageMeta({ ...PAGE_META['/datasets'], path: '/datasets' });
  const [modality, setModality] = useState('All');

  const shown = modality === 'All' ? DATASETS : DATASETS.filter((d) => d.modality === modality);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Datasets"
        title="Datasets with a profile you can check"
        lede="Each dataset has a profile its owner approved line by line: what it holds, how it was made, and how it is licensed."
        actions={
          <>
            <Button href={TALLY.appraisal}>Request a dataset</Button>
            <Button to="/providers" variant="standard" arrow={false}>
              List your dataset
            </Button>
          </>
        }
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Catalog">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            {FILTERS.map((f) => (
              <FilterChip
                key={f.value}
                active={modality === f.value}
                count={f.count}
                onClick={() => setModality(f.value)}
              >
                {f.value}
              </FilterChip>
            ))}
          </div>
          <p className="text-body-sm text-ink-muted" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'dataset' : 'datasets'}
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((dataset) => (
            <li key={dataset.slug} className="flex">
              <DatasetCard dataset={dataset} />
            </li>
          ))}
        </ul>

        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-ink-muted">
          <span>Every line is approved by the owner before it is shared.</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-pending" aria-hidden="true" />
            Being confirmed by the owner
          </span>
        </p>
      </Section>

      <Section tone="secondary">
        <SectionHeader
          eyebrow="Request"
          title="Not finding the dataset you need?"
          lede="Tell us what you are training. We look for an owner who holds it and ask them to open a profile."
          action={
            <div className="flex flex-wrap gap-3">
              <Button href={TALLY.appraisal}>Request a dataset</Button>
              <Button to="/buyers" variant="standard" arrow={false}>
                How licensing works
              </Button>
            </div>
          }
          className="!mb-0"
        />
      </Section>
    </PageLayout>
  );
};

export default DatasetsPage;
