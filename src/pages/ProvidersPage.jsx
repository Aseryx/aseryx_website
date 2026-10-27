import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import PageClose from '../components/common/PageClose.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import CertificateMoment from '../components/product/CertificateMoment.jsx';
import { STEPS } from '../data/steps.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const KEEP = [
  { title: 'On your machine', body: 'Connect, lock and appraise where the database already is.' },
  { title: 'Your cut', body: 'You choose the tables and fields in the locked dataset. Not the entire database.' },
  { title: 'Your terms', body: 'You set who gets access and for how long. When the time ends, access ends.' },
  { title: 'Your profile', body: 'You approve every line of the profile buyers read before it is shared.' },
];

const ProvidersPage = () => {
  usePageMeta({ ...PAGE_META['/providers'], path: '/providers' });

  return (
    <PageLayout>
      <PageHero
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
          title="Four steps from database to license"
          lede="Each step runs on your machine, and nothing is shared until you approve it."
        />
        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.id} className="relative border-t border-border pt-6">
              <span className="absolute -top-px left-0 h-px w-10 bg-brand" aria-hidden="true" />
              <p className="text-body-sm tabular-nums text-ink-muted">Step {i + 1}</p>
              <h3 className="mt-3 text-heading-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-body text-ink-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="secondary" aria-labelledby="keep">
        <SectionHeader
          id="keep"
          title="You stay in charge of the data and the deal"
          lede="Aseryx packages and appraises. The rights, the cut and the terms stay with you."
        />
        {/* The four things that stay yours, set as type rather than boxed: the
            claim is the headline of each row. */}
        <dl className="border-t border-border">
          {KEEP.map(({ title, body }) => (
            <div key={title} className="grid gap-2 border-b border-border py-6 md:grid-cols-12 md:items-baseline md:gap-12 md:py-8">
              <dt className="text-page-title font-semibold text-ink md:col-span-5 md:text-display-lg">{title}</dt>
              <dd className="max-w-[34rem] text-lede text-ink-secondary md:col-span-7">{body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section aria-labelledby="estimate">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              id="estimate"
              layout="stack"
              title="See how ready your dataset is before you start"
              lede="Answer a few questions about your dataset and get a readiness preview: the checks it is likely to pass and what to fix first. Not a price."
              action={<Button to="/appraisal">Preview your appraisal</Button>}
              className="!mb-0"
            />
          </div>
          <Card tone="secondary" className="p-6 md:p-8 lg:col-span-6" role="figure" aria-label="Readiness preview example">
            <div className="flex items-center justify-between gap-4">
              <p className="text-meta text-ink-muted">Example readiness preview</p>
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

      <PageClose
        id="join"
        title="Bring one dataset to the beta"
        lede="We work with a small group of providers on their first locked dataset and profile."
        actions={
          <>
            <Button href={TALLY.appraisal}>Join the beta</Button>
            <Button to="/benchmarks" variant="standard">
              See the benchmarks
            </Button>
          </>
        }
      />
    </PageLayout>
  );
};

export default ProvidersPage;
