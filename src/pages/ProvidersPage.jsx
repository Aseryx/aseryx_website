import { Clock, FileCheck2, HardDrive, Scissors } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import { STEPS } from '../data/steps.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const KEEP = [
  { icon: HardDrive, title: 'On your machine', body: 'Connect, lock and appraise where the database already is.' },
  { icon: Scissors, title: 'Your cut', body: 'You choose the tables and fields in the locked dataset. Not the entire database.' },
  { icon: Clock, title: 'Your terms', body: 'You set who gets access and for how long. When the time ends, access ends.' },
  { icon: FileCheck2, title: 'Your profile', body: 'You approve every line of the profile buyers read before it is shared.' },
];

// Illustrative checks for the certificate moment: sample values, not a real run.
const CERTIFICATE_CHECKS = [
  { name: 'Structure', value: '100%' },
  { name: 'Completeness', value: '96.4%' },
  { name: 'Validity', value: '99.1%' },
  { name: 'Uniqueness', value: '100%' },
];

const PassBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-success-border bg-success-bg px-2 py-0.5 text-meta text-success-ink">
    <span className="h-1.5 w-1.5 rounded-full bg-success-dot" aria-hidden="true" />
    Pass
  </span>
);

/** Coded product moment: a quality certificate on a locked cut. Checks, not a price. */
const CertificateMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="Quality certificate preview">
    <div className="flex items-start justify-between gap-4 border-b border-border-light px-5 py-4">
      <div>
        <p className="text-meta text-ink-muted">Quality certificate</p>
        <p className="mt-1 text-heading-lg text-ink">orders_2024 · locked cut</p>
      </div>
      <span className="rounded-md bg-muted px-2 py-1 font-mono text-table-head uppercase text-ink-secondary">Sample</span>
    </div>
    <dl className="grid grid-cols-3 border-b border-border-light text-body-sm">
      {[
        ['Tables', '4'],
        ['Fields', '38'],
        ['Rows', '48,210'],
      ].map(([label, value], i) => (
        <div key={label} className={`flex flex-col px-5 py-3 ${i ? 'border-l border-border-light' : ''}`}>
          <dt className="text-ink-muted">{label}</dt>
          <dd className="order-first font-mono text-body tabular-nums text-ink">{value}</dd>
        </div>
      ))}
    </dl>
    <ul className="px-5 py-2">
      {CERTIFICATE_CHECKS.map((check) => (
        <li key={check.name} className="flex items-center gap-3 border-b border-border-light py-3 last:border-0">
          <span className="text-body text-ink">{check.name}</span>
          <span className="ml-auto font-mono text-body-sm tabular-nums text-ink-secondary">{check.value}</span>
          <PassBadge />
        </li>
      ))}
    </ul>
    <p className="bg-secondary px-5 py-3 font-mono text-table-head uppercase text-ink-muted">
      Hash 7f3a…c91e · locked Oct 26, 2026
    </p>
  </Card>
);

const ProvidersPage = () => {
  usePageMeta({ ...PAGE_META['/providers'], path: '/providers' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="For providers"
        title="Turn the data you made into a licensable asset"
        lede="Connect, lock and appraise on your machine. You decide who gets access, to what, and for how long."
        actions={
          <>
            <Button href={TALLY.appraisal}>Join the beta</Button>
            <Button to="/appraisal" variant="standard">
              Preview your appraisal
            </Button>
          </>
        }
        aside={<CertificateMoment />}
      />

      <Section aria-labelledby="path">
        <SectionHeader
          id="path"
          eyebrow="How it works"
          title="Four steps from database to licence"
          lede="Each step runs on your machine, and nothing is shared until you approve it."
        />
        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.id} className="relative border-t border-border pt-6">
              <span className="absolute -top-px left-0 h-px w-10 bg-brand" aria-hidden="true" />
              <p className="font-mono text-body-sm tabular-nums text-ink-muted">
                0{i + 1} · {step.chip}
              </p>
              <h3 className="mt-3 text-heading-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-body text-ink-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="secondary" aria-labelledby="keep">
        <SectionHeader
          id="keep"
          eyebrow="What you keep"
          title="You stay in charge of the data and the deal"
          lede="Aseryx packages and appraises. The rights, the cut and the terms stay with you."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KEEP.map(({ icon: Icon, title, body }) => (
            <Card as="li" key={title} className="p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-ink">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-heading-lg text-ink">{title}</h3>
              <p className="mt-2 text-body text-ink-secondary">{body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="estimate">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              id="estimate"
              layout="stack"
              eyebrow="Appraisal preview"
              title="See how ready your dataset is before you start"
              lede="Answer a few questions about your dataset and get a readiness preview: the checks it is likely to pass and what to fix first. Not a price."
              action={<Button to="/appraisal">Preview your appraisal</Button>}
              className="!mb-0"
            />
          </div>
          <Card tone="secondary" className="p-6 md:p-8 lg:col-span-6" role="figure" aria-label="Readiness preview example">
            <div className="flex items-center justify-between gap-4">
              <p className="text-meta text-ink-muted">Readiness preview · example</p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-meta text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-pending" aria-hidden="true" />
                Likely usable
              </span>
            </div>
            <p className="mt-6 text-heading-lg text-ink">Fix first</p>
            <ol className="mt-3 space-y-3 text-body text-ink-secondary">
              {['Fill or drop the 12% empty cells in the emptiest column', 'Remove repeated rows before you lock', 'Name a label column so label checks can run'].map(
                (item, i) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-body-sm tabular-nums text-ink-muted">{i + 1}</span>
                    {item}
                  </li>
                )
              )}
            </ol>
          </Card>
        </div>
      </Section>

      <Section tone="secondary" aria-labelledby="join">
        <SectionHeader
          id="join"
          layout="center"
          eyebrow="Beta"
          title="Bring one dataset to the beta"
          lede="We work with a small group of providers on their first locked dataset and profile."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={TALLY.appraisal}>Join the beta</Button>
              <Button to="/benchmarks" variant="standard" arrow={false}>
                See the benchmarks
              </Button>
            </div>
          }
          className="!mb-0"
        />
      </Section>
    </PageLayout>
  );
};

export default ProvidersPage;
