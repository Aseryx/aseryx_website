import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import ActionRow from '../components/common/ActionRow.jsx';
import StretchedLink from '../components/common/StretchedLink.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import LicenseDiagram from '../components/datasets/LicenseDiagram.jsx';
import LoopFrame from '../components/product/LoopFrame.jsx';
import DATASETS, { SAMPLE_PROFILE } from '../data/datasets.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

// What a team gets before it pays, and after. The held payment, the owner's
// approval and the term of access are the diagram's, above, so they aren't
// said twice. The 7-day check is the strongest protection a team gets, so it
// is said here, not on owner lines.
const BEFORE_AND_AFTER = [
  {
    title: 'Before you pay',
    items: [
      {
        title: 'The certificate',
        body: 'What the dataset contains and how clean and well-structured it is, worked out from that exact data.',
      },
      { title: 'The facts', body: 'How big it is, how many duplicates it has and how complete it is.' },
      {
        title: 'Queries checked against the data',
        body: 'How much of the data meets your conditions, on listings where the owner allows queries (100 rows or more, up to 5 queries per team).',
      },
    ],
  },
  {
    title: 'After you pay',
    items: [
      {
        title: 'A check after access',
        body: "7 days to check the data against the listing and your query results, and dispute if it doesn’t match.",
      },
    ],
  },
];

// Each part below links into the profile approved in full, so it shows the
// real thing instead of describing it in the abstract.
const SAMPLE = `/datasets/${SAMPLE_PROFILE.slug}`;

const PROFILE_PARTS = [
  { to: `${SAMPLE}#specification`, title: 'Specification', body: 'What the dataset contains, how much there is, and how it was captured.' },
  { to: `${SAMPLE}#metadata`, title: 'Metadata', body: 'What is recorded alongside the data, as the owner describes it.' },
  { to: `${SAMPLE}#provenance`, title: 'Provenance', body: 'Who made it, who owns it, and what is confirmed or still being confirmed.' },
  { to: `${SAMPLE}#certificate`, title: 'Quality certificate', body: 'Whether the dataset carries one yet. Profiles without one say so.' },
  { to: `${SAMPLE}#license`, title: 'License terms', body: 'Exclusive or not, the term, and how offers work.' },
  { to: `${SAMPLE}#limits`, title: 'Limits', body: 'What the data does not cover and what your team handles itself.' },
];

const BuyersPage = () => {
  usePageMeta({ ...PAGE_META['/buyers'], path: '/buyers' });

  return (
    <PageLayout>
      <PageHero
        title="Know what you’re getting before you pay"
        lede="Read the quality certificate, query how much of the data meets your conditions, and get a count checked against the data. Then make an offer. Your payment is held until the owner approves."
        actions={
          <>
            <CtaButton action="exploreDatasets" />
            <CtaButton action="requestDataset" variant="standard" />
          </>
        }
        aside={<LoopFrame name="query" />}
      />

      {/* A diagram reads from its middle, so this section is centred */}
      <Section aria-labelledby="licensing">
        <SectionHeader
          id="licensing"
          layout="center"
          title="You deal with the owner, directly"
          lede="Licenses are non-exclusive, and the owner approves every offer before anything is shared."
        />
        <LicenseDiagram className="mx-auto max-w-4xl" />
      </Section>

      <Section tone="secondary" aria-labelledby="before-and-after">
        <SectionHeader id="before-and-after" title="What you get before and after you pay" />
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {BEFORE_AND_AFTER.map((phase) => (
            <div key={phase.title}>
              <h3 className="text-heading-lg text-ink">{phase.title}</h3>
              <dl className="mt-4 border-t border-border">
                {phase.items.map((item) => (
                  <div key={item.title} className="border-b border-border py-5">
                    <dt className="text-body font-medium text-ink">{item.title}</dt>
                    <dd className="mt-1 max-w-[34rem] text-body text-ink-secondary">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="profile-parts">
        <SectionHeader
          id="profile-parts"
          title="What every profile holds"
          lede="The same sections on every dataset, so you can compare before you ask for access. Each one opens in a real profile."
        />
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE_PARTS.map((part) => (
            <li key={part.title} className="group relative border-t border-border pt-5">
              <h3 className="text-heading-lg text-ink">
                <StretchedLink to={part.to}>{part.title}</StretchedLink>
              </h3>
              <p className="mt-2 max-w-[24rem] text-body text-ink-secondary">{part.body}</p>
            </li>
          ))}
        </ul>
      </Section>

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
