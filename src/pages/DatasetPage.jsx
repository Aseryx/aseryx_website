import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import Section from '../components/common/Section.jsx';
import PageClose from '../components/common/PageClose.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import LicenseParties from '../components/datasets/LicenseParties.jsx';
import { MEDIA_CELLS } from '../components/datasets/mediaCells.js';
import NotFoundPage from './NotFoundPage.jsx';
import { findDataset } from '../data/datasets.js';
import { formatDate } from '../utils/formatDate.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { metaForDataset } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const STATUS_DOT = { confirmed: 'bg-success-dot', pending: 'bg-pending' };
const STATUS_LABEL = { confirmed: 'Confirmed by the owner', pending: 'Being confirmed' };

/** Label-left, content-right band, as in the v0.3 profile. */
const ProfileSection = ({ id, title, aside, children }) => (
  <section aria-labelledby={id} className="grid gap-6 border-t border-border py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
    <div className="lg:col-span-4">
      <h2 id={id} className="text-page-title font-semibold text-ink">
        {title}
      </h2>
      {aside}
    </div>
    <div className="min-w-0 lg:col-span-8">{children}</div>
  </section>
);

const DataTable = ({ columns, rows, caption }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[32rem] text-left text-body">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="border-b border-ink">
          {columns.map((col) => (
            <th key={col} scope="col" className="pb-3 pr-4 text-table-head uppercase text-ink-muted">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([first, ...rest]) => (
          <tr key={first} className="border-b border-border-light align-top">
            <th scope="row" className="py-3 pr-4 font-normal text-ink">
              {first}
            </th>
            {rest.map((cell) => (
              <td key={cell} className="py-3 pr-4 text-ink-secondary">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Label column and a value with an optional note; `status` adds a provenance dot. */
const SpecList = ({ items }) => (
  <dl>
    {items.map(({ label, value, note, status }) => (
      <div key={label} className="grid gap-1 border-b border-border-light py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
        <dt className="pt-0.5 text-body-sm text-ink-muted">{label}</dt>
        <dd>
          <span className="flex items-baseline gap-2.5 text-body-lg text-ink">
            {status && (
              <>
                <span className={`h-2 w-2 shrink-0 translate-y-[-1px] rounded-full ${STATUS_DOT[status]}`} aria-hidden="true" />
                <span className="sr-only">{STATUS_LABEL[status]}: </span>
              </>
            )}
            {value}
          </span>
          {note && <span className={`mt-1 block text-body-sm text-ink-muted ${status ? 'pl-[18px]' : ''}`}>{note}</span>}
        </dd>
      </div>
    ))}
  </dl>
);

const DatasetPage = () => {
  const { slug } = useParams();
  const dataset = findDataset(slug);
  const meta = dataset ? metaForDataset(dataset) : null;
  usePageMeta({
    title: meta?.title,
    description: meta?.description,
    path: dataset ? `/datasets/${dataset.slug}` : undefined,
  });

  if (!dataset) {
    return <NotFoundPage />;
  }

  const { title, owner, modality, subject, version, updated, summary, media, stats, tags, profile } = dataset;
  const headline = profile?.headline ?? stats;
  const keywords = profile?.keywords ?? tags;
  const facets = [modality, subject, profile?.uses].filter(Boolean);

  return (
    <PageLayout>
      <Section spacing="none" className="pt-24 md:pt-28">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/datasets"
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg text-body-sm text-ink-secondary hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Datasets
          </Link>
          {profile ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-success-border bg-success-bg px-2.5 py-1 text-meta text-success-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-success-dot" aria-hidden="true" />
              Approved by owner
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-bg px-2.5 py-1 text-meta text-neutral-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-pending" aria-hidden="true" />
              Profile in review
            </span>
          )}
        </div>

        <header className="mx-auto max-w-4xl pt-10 pb-12 text-center md:pt-14 md:pb-16">
          <h1 className="text-display-lg text-ink [text-wrap:balance] md:text-display-xl">{title}</h1>
          <p className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-body-sm text-ink-muted">
            <span className="text-ink">By {owner}</span>
            {facets.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
          <p className="mx-auto mt-6 max-w-[38rem] text-lede text-ink-secondary">{profile?.lede ?? summary}</p>

          <dl className={`mt-12 grid grid-cols-2 gap-y-10 ${headline.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {headline.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-2">
                <dt className="mt-2 text-body-sm text-ink-muted">{stat.label}</dt>
                <dd className="order-first text-display-lg font-medium tracking-tight tabular-nums text-ink md:text-display-xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 flex flex-wrap justify-center gap-1.5" aria-label="Keywords">
            {keywords.map((keyword) => (
              <li key={keyword} className="rounded-md bg-muted px-2 py-1 text-meta text-ink-secondary">
                {keyword}
              </li>
            ))}
          </ul>
        </header>

        <div className="relative aspect-[21/9] rounded-2xl border border-border-light bg-secondary" style={MEDIA_CELLS}>
          <p className="absolute inset-x-5 bottom-5 text-body-sm text-ink-muted">{media ?? 'Sample entry preview'}</p>
        </div>
      </Section>

      <Section spacing="none" className="pt-16 md:pt-24 pb-16 md:pb-24">
        {profile ? (
          <>
            <div className="pb-12 md:pb-16">
              <h2 className="max-w-3xl text-display-lg text-ink">{profile.overview.title}</h2>
              <p className="mt-6 max-w-[40rem] text-lede text-ink-secondary">{profile.overview.body}</p>
            </div>

            <ProfileSection id="glance" title="Data at a glance">
              <DataTable caption="Data at a glance" {...profile.glance} />
            </ProfileSection>

            <ProfileSection id="uses" title="Intended uses">
              <ul>
                {profile.intendedUses.map((use) => (
                  <li key={use.title} className="border-b border-border-light py-4 text-body-lg">
                    <strong className="font-semibold text-ink">{use.title}</strong>{' '}
                    {use.detail && <span className="text-ink-secondary">{use.detail}</span>}
                  </li>
                ))}
              </ul>
            </ProfileSection>

            <ProfileSection id="specification" title="Specification">
              <SpecList items={profile.specification} />
            </ProfileSection>

            <ProfileSection id="metadata" title={profile.metadata.title}>
              <DataTable caption={profile.metadata.title} columns={profile.metadata.columns} rows={profile.metadata.rows} />
              <p className="mt-4 text-body-sm text-ink-muted">{profile.metadata.note}</p>
            </ProfileSection>

            <section aria-labelledby="licensing" className="border-t border-border py-12 md:py-16">
              <h2 id="licensing" className="max-w-2xl text-display-lg text-ink">
                The owner approves every line. You sign with the owner, directly.
              </h2>
              <LicenseParties className="mt-12" />
            </section>

            <ProfileSection
              id="provenance"
              title="Provenance"
              aside={
                <ul className="mt-4 space-y-1.5 text-body-sm text-ink-muted">
                  {Object.keys(STATUS_LABEL).map((status) => (
                    <li key={status} className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden="true" />
                      {STATUS_LABEL[status]}
                    </li>
                  ))}
                </ul>
              }
            >
              <SpecList items={profile.provenance} />
            </ProfileSection>

            <ProfileSection id="delivery" title="Files and delivery">
              <SpecList items={profile.delivery} />
            </ProfileSection>

            <ProfileSection id="licence" title="License">
              <SpecList items={profile.licence} />
            </ProfileSection>

            <ProfileSection id="limits" title="Limits">
              <div className="space-y-4 text-body-lg text-ink">
                {profile.limits.map((limit) => (
                  <p key={limit}>{limit}</p>
                ))}
              </div>
            </ProfileSection>
          </>
        ) : (
          <Card tone="secondary" className="p-8 md:p-10">
            <h2 className="text-heading-lg text-ink">Full profile in review</h2>
            <p className="mt-2 max-w-[40rem] text-body text-ink-secondary">
              The owner is approving the rest of this profile line by line: specification, provenance, delivery and
              license terms. The facts above are already approved.
            </p>
          </Card>
        )}

        <p className="mt-2 flex flex-wrap justify-between gap-2 border-t border-border pt-6 text-body-sm text-ink-muted">
          <span>
            Profile {version}, updated {formatDate(updated)}
          </span>
          <span>Every line is approved by the owner before it is shared.</span>
        </p>
      </Section>

      <PageClose
        id="ask"
        title="Ask the owner about a license"
        lede="Aseryx reviews the request and introduces your team to the owner. You agree the terms and sign with them directly."
        actions={
          <>
            <Button href={TALLY.appraisal}>Request access</Button>
            <Button to="/datasets" variant="standard">
              All datasets
            </Button>
          </>
        }
      />
    </PageLayout>
  );
};

export default DatasetPage;
