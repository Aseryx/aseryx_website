import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import PageClose from '../components/common/PageClose.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import FilterChip from '../components/common/FilterChip.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import DATASETS, { MODALITIES } from '../data/datasets.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

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
        title="Datasets with a profile you can check"
        lede="Each profile shows what the dataset holds, how it was made and whether it carries a quality certificate. Its owner approves every line."
        actions={
          <>
            <CtaButton action="requestDataset" />
            <CtaButton action="listDataset" variant="standard" />
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

      <PageClose
        id="request"
        title="Not finding the dataset you need?"
        lede="Send a request with what you're training and the coverage you need."
        actions={
          <>
            <CtaButton action="requestDataset" />
            <CtaButton action="seeLicensing" variant="standard" />
          </>
        }
      />
    </PageLayout>
  );
};

export default DatasetsPage;
