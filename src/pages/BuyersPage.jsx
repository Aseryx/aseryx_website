import { Building2, FileSignature, Gauge, Info, ListChecks, ShieldCheck, Tags, UserRound } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import ProfileMoment from '../components/datasets/ProfileMoment.jsx';
import DATASETS from '../data/datasets.js';
import { LICENSING_STEPS } from '../data/licensing.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const STEP_ICONS = [UserRound, ShieldCheck, Building2];

const PROFILE_PARTS = [
  { icon: ListChecks, title: 'Specification', body: 'What one record is, how much there is, and how it was captured.' },
  { icon: Tags, title: 'Metadata', body: 'The fields recorded on every record, as the owner describes them.' },
  { icon: ShieldCheck, title: 'Provenance', body: 'Who made it, who owns it, and what is confirmed or still being confirmed.' },
  { icon: Gauge, title: 'Readiness', body: 'How ready it is for training, scored by one formula per domain.' },
  { icon: FileSignature, title: 'License terms', body: 'Exclusive or not, who signs, and how pricing is agreed.' },
  { icon: Info, title: 'Limits', body: 'What the data does not cover and what your team handles itself.' },
];

const BuyersPage = () => {
  usePageMeta({ ...PAGE_META['/buyers'], path: '/buyers' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="For buyers"
        title="License data from the people who made it"
        lede="Read the profile, check the readiness report, and sign the license with the owner directly."
        actions={
          <>
            <Button to="/datasets">Browse datasets</Button>
            <Button href={TALLY.appraisal} variant="standard">
              Request a dataset
            </Button>
          </>
        }
        aside={<ProfileMoment />}
      />

      <Section aria-labelledby="licensing">
        <SectionHeader
          id="licensing"
          eyebrow="Licensing"
          title="You sign with the owner, directly"
          lede="Aseryx is not a party to the license. We review the dataset, make the introduction, and the owner approves every line you read."
        />
        <ol className="grid gap-6 md:grid-cols-3">
          {LICENSING_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Card as="li" key={step.title} className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-ink">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-body-sm tabular-nums text-ink-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-heading-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-body text-ink-secondary">{step.body}</p>
              </Card>
            );
          })}
        </ol>
      </Section>

      <Section tone="secondary" aria-labelledby="profile-parts">
        <SectionHeader
          id="profile-parts"
          eyebrow="Profiles"
          title="What every profile holds"
          lede="The same sections on every dataset, so you can compare before you ask for access."
          action={
            <Button to="/benchmarks" variant="standard">
              See the benchmarks
            </Button>
          }
        />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE_PARTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-card p-6 md:p-8">
              <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
              <h3 className="mt-6 text-heading-lg text-ink">{title}</h3>
              <p className="mt-2 text-body text-ink-secondary">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="featured">
        <SectionHeader
          id="featured"
          eyebrow="Datasets"
          title="Profiles open now"
          lede="Owner-approved profiles you can read today. More open as owners finish their review."
          action={<Button to="/datasets">All datasets</Button>}
        />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DATASETS.slice(0, 3).map((dataset) => (
            <li key={dataset.slug} className="flex">
              <DatasetCard dataset={dataset} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="secondary" aria-labelledby="request">
        <SectionHeader
          id="request"
          layout="center"
          eyebrow="Request"
          title="Looking for something specific?"
          lede="Tell us what you are training and the coverage you need. We look for an owner who holds it."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={TALLY.appraisal}>Request a dataset</Button>
              <Button to="/datasets" variant="standard" arrow={false}>
                Browse datasets
              </Button>
            </div>
          }
          className="!mb-0"
        />
      </Section>
    </PageLayout>
  );
};

export default BuyersPage;
