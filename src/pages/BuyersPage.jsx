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

// What a team gets before it pays, then after. The 7-day check is the
// strongest protection a team gets, so it is said here, not on owner lines.
const TEAM_GETS = [
  {
    title: 'The certificate',
    body: 'What the dataset contains and how clean and well-structured it is, worked out from that exact data.',
  },
  { title: 'The facts', body: 'How big it is, how many duplicates it has and how complete it is, before you pay.' },
  {
    title: 'Queries checked against the data',
    body: 'How much of the data meets your conditions, on listings where the owner allows queries (100 rows or more, up to 5 queries per team).',
  },
  { title: 'Payment held', body: 'Your payment is held until the owner approves.' },
  {
    title: 'A check after access',
    body: "7 days to check the data against the listing and your query results, and dispute if it doesn't match.",
  },
  { title: 'The term', body: '3 to 12 months, non-exclusive.' },
];

// Each part below links into the profile approved in full, so it shows the
// real thing instead of describing it in the abstract.
const SAMPLE = `/datasets/${SAMPLE_PROFILE.slug}`;

const PROFILE_PARTS = [
  { to: `${SAMPLE}#specification`, title: 'Specification', body: 'What the dataset contains, how much there is, and how it was captured.' },
  { to: `${SAMPLE}#metadata`, title: 'Metadata', body: 'What is recorded alongside the data, as the owner describes it.' },
  { to: `${SAMPLE}#provenance`, title: 'Provenance', body: 'Who made it, who owns it, and what is confirmed or still being confirmed.' },
  {
    to: `${SAMPLE}#certificate`,
    title: 'Quality certificate',
    body: 'What the dataset contains and how clean and well-structured it is, worked out from that exact data. Profiles without one say so.',
  },
  { to: `${SAMPLE}#licence`, title: 'License terms', body: 'Exclusive or not, the term, and how offers work.' },
  { to: `${SAMPLE}#limits`, title: 'Limits', body: 'What the data does not cover and what your team handles itself.' },
];

/** A header beside a list of short definitions; a row links when it has somewhere to go. */
const PartsSection = ({ id, title, lede, parts, tone }) => (
  <Section tone={tone} aria-labelledby={id}>
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <SectionHeader id={id} layout="stack" title={title} lede={lede} className="!mb-0 lg:sticky lg:top-28" />
      </div>
      <ul className="border-t border-border lg:col-span-8">
        {parts.map((part) => (
          <li
            key={part.title}
            className="group relative grid gap-1 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-8 md:py-6"
          >
            <h3 className="text-heading-lg text-ink">
              {part.to ? <StretchedLink to={part.to}>{part.title}</StretchedLink> : part.title}
            </h3>
            <p className="text-body text-ink-secondary">{part.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

const BuyersPage = () => {
  usePageMeta({ ...PAGE_META['/buyers'], path: '/buyers' });

  return (
    <PageLayout>
      <PageHero
        title="Know what you're getting before you pay"
        lede="Read the quality certificate, query how much of the data meets your conditions, and get a count checked against the data. Then make an offer. Your payment is held until the owner approves."
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
          title="You deal with the owner, directly"
          lede="Licenses are non-exclusive, and the owner approves every offer before anything is shared."
        />
        <LicenseParties />
      </Section>

      <PartsSection id="before-and-after" tone="secondary" title="What you get before and after you pay" parts={TEAM_GETS} />

      <PartsSection
        id="profile-parts"
        title="What every profile holds"
        lede="The same sections on every dataset, so you can compare before you ask for access. Each one opens in a real profile."
        parts={PROFILE_PARTS}
      />

      <Section tone="secondary" aria-labelledby="featured">
        <SectionHeader
          id="featured"
          title="Profiles open now"
          lede="Owner-approved profiles you can read today. More open as owners finish their review. Each says whether it carries a quality certificate."
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
          Send a request with what you&apos;re training and the coverage you need.
        </ActionRow>
      </Section>
    </PageLayout>
  );
};

export default BuyersPage;
