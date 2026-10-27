import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import LicenseParties from '../components/datasets/LicenseParties.jsx';
import ProfileMoment from '../components/datasets/ProfileMoment.jsx';
import DATASETS from '../data/datasets.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

// The one profile with every section approved, so each part below links to
// the real thing instead of describing it in the abstract.
const SAMPLE = `/datasets/${DATASETS[0].slug}`;

const PROFILE_PARTS = [
  { to: `${SAMPLE}#specification`, title: 'Specification', body: 'What the dataset contains, how much there is, and how it was captured.' },
  { to: `${SAMPLE}#metadata`, title: 'Metadata', body: 'What is recorded alongside the data, as the owner describes it.' },
  { to: `${SAMPLE}#provenance`, title: 'Provenance', body: 'Who made it, who owns it, and what is confirmed or still being confirmed.' },
  { to: '/benchmarks', title: 'Appraisal', body: 'How ready it is for training, scored by one formula per domain.' },
  { to: `${SAMPLE}#licence`, title: 'License terms', body: 'Exclusive or not, who signs, and how pricing is agreed.' },
  { to: `${SAMPLE}#limits`, title: 'Limits', body: 'What the data does not cover and what your team handles itself.' },
];

const BuyersPage = () => {
  usePageMeta({ ...PAGE_META['/buyers'], path: '/buyers' });

  return (
    <PageLayout>
      <PageHero
        title="Know what you're getting before you commit"
        lede="Aseryx appraises each dataset for completeness, consistency and structure. Start from a small free sample, then license directly from the owner."
        actions={
          <>
            <Button to="/datasets">Explore datasets</Button>
            <Button href={TALLY.buyerAccess} variant="standard">
              Request a sample
            </Button>
          </>
        }
        aside={<ProfileMoment />}
      />

      <Section aria-labelledby="licensing">
        <SectionHeader
          id="licensing"
          title="You sign with the owner, directly"
          lede="Licenses are non-exclusive, and the owner approves every line of the profile you read."
        />
        <LicenseParties />
      </Section>

      <Section tone="secondary" aria-labelledby="profile-parts">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="profile-parts"
              layout="stack"
              title="What every profile holds"
              lede="The same sections on every dataset, so you can compare before you ask for access. Each one opens in a real profile."
              className="!mb-0 lg:sticky lg:top-28"
            />
          </div>
          <ul className="border-t border-border lg:col-span-8">
            {PROFILE_PARTS.map((part) => (
              <li
                key={part.title}
                className="group relative grid gap-1 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-8 md:py-6"
              >
                <h3 className="text-heading-lg text-ink">
                  <Link
                    to={part.to}
                    className="underline-offset-4 group-hover:underline focus:outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-brand"
                  >
                    {part.title}
                  </Link>
                </h3>
                <p className="text-body text-ink-secondary">{part.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section aria-labelledby="featured">
        <SectionHeader
          id="featured"
          title="Profiles open now"
          lede="Owner-approved profiles you can read today. More open as owners finish their review."
          action={<Button to="/datasets">Explore datasets</Button>}
        />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DATASETS.slice(0, 3).map((dataset) => (
            <li key={dataset.slug} className="flex">
              <DatasetCard dataset={dataset} />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[40rem] text-body-lg text-ink-secondary">
            <span className="text-ink">Looking for something specific?</span> Tell us what you&apos;re training and the
            coverage you need, and we&apos;ll look for an owner who holds it.
          </p>
          <Button href={TALLY.buyerAccess} variant="standard" className="shrink-0">
            Request a dataset
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
};

export default BuyersPage;
