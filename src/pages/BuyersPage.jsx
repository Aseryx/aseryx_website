import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import ActionRow from '../components/common/ActionRow.jsx';
import StretchedLink from '../components/common/StretchedLink.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import LicenseParties from '../components/datasets/LicenseParties.jsx';
import ProfileMoment from '../components/datasets/ProfileMoment.jsx';
import DATASETS, { SAMPLE_PROFILE } from '../data/datasets.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

// Each part below links into the profile approved in full, so it shows the
// real thing instead of describing it in the abstract.
const SAMPLE = `/datasets/${SAMPLE_PROFILE.slug}`;

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
            <CtaButton action="exploreDatasets" />
            <CtaButton action="requestDataset" variant="standard" />
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
                  <StretchedLink to={part.to}>{part.title}</StretchedLink>
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
          action={<CtaButton action="exploreDatasets" />}
        />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DATASETS.slice(0, 3).map((dataset) => (
            <li key={dataset.slug} className="flex">
              <DatasetCard dataset={dataset} />
            </li>
          ))}
        </ul>
        <ActionRow
          lead="Looking for something specific?"
          actions={<CtaButton action="requestDataset" variant="standard" />}
          className="mt-12 border-t border-border pt-6"
        >
          Tell us what you&apos;re training and the coverage you need, and we&apos;ll look for an owner who holds it.
        </ActionRow>
      </Section>
    </PageLayout>
  );
};

export default BuyersPage;
