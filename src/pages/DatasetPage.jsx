import { useParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import Section from '../components/common/Section.jsx';
import PageClose from '../components/common/PageClose.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import Card from '../components/common/Card.jsx';
import BackLink from '../components/common/BackLink.jsx';
import StatusChip from '../components/common/StatusChip.jsx';
import CertificateChip from '../components/datasets/CertificateChip.jsx';
import CertificateMark from '../components/motion/certificate/CertificateMark.jsx';
import DatasetArt from '../components/datasets/DatasetArt.jsx';
import OwnerLogo from '../components/datasets/OwnerLogo.jsx';
import { certificateFor } from '../components/datasets/certificate.js';
import LicenseParties from '../components/datasets/LicenseParties.jsx';
import TagList from '../components/datasets/TagList.jsx';
import { MEDIA_CELLS } from '../components/datasets/mediaCells.js';
import { STATUS_DOT, STATUS_LABEL } from '../components/datasets/provenanceStatus.js';
import NotFoundPage from './NotFoundPage.jsx';
import { OWNER_PENDING, findDataset } from '../data/datasets.js';
import { formatDate } from '../utils/formatDate.js';
import { keepHyphenated } from '../utils/keepHyphenated.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { metaForDataset } from '../config/pageMeta.js';

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

  const { title, owner, ownerLogo, modality, subject, version, updated, summary, media, art, stats, tags, profile } = dataset;
  const headline = profile?.headline ?? stats;
  const keywords = profile?.keywords ?? tags;
  const facets = [modality, subject, profile?.uses].filter(Boolean);
  const certificate = certificateFor(dataset);

  return (
    <PageLayout>
      <Section spacing="none" className="pt-24 md:pt-28">
        <div className="flex items-center justify-between gap-4">
          <BackLink to="/datasets">Datasets</BackLink>
          <div className="flex flex-wrap justify-end gap-2">
            <CertificateChip dataset={dataset} />
            {profile ? (
              <StatusChip tone="pass">Approved by owner</StatusChip>
            ) : (
              <StatusChip tone="waiting">Profile in review</StatusChip>
            )}
          </div>
        </div>

        <header className="mx-auto max-w-4xl pt-10 pb-12 text-center md:pt-14 md:pb-16">
          <h1 className="text-display-lg text-ink [text-wrap:balance] md:text-display-xl">{keepHyphenated(title)}</h1>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-body-sm text-ink-muted">
            {/* No byline until the owner's name is in, as on the cards */}
            {owner !== OWNER_PENDING && (
              <span className="inline-flex items-center gap-2 text-ink">
                By {ownerLogo && <OwnerLogo logo={ownerLogo} className="h-6" />} {owner}
              </span>
            )}
            {facets.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
          <p className="mx-auto mt-6 max-w-[38rem] text-lede text-ink-secondary">{profile?.lede ?? summary}</p>

          {/* Four facts sit in one row; three or six in rows of three */}
          <dl className={`mt-12 grid grid-cols-2 gap-y-10 ${headline.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {headline.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-2">
                <dt className="mt-2 text-body-sm text-ink-muted">{stat.label}</dt>
                <dd className="order-first text-display-lg font-medium tracking-tight tabular-nums text-ink md:text-display-xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          {profile?.headlineNote && <p className="mt-8 text-body-sm text-ink-muted">{profile.headlineNote}</p>}

          <TagList tags={keywords} label="Keywords" className="mt-10 justify-center" />
        </header>

        <div className="relative aspect-[21/9] rounded-2xl border border-border-light bg-secondary" style={MEDIA_CELLS}>
          <DatasetArt kind={art} className="absolute inset-x-8 top-6 bottom-12 text-ink-secondary md:top-10 md:bottom-16" />
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

            {profile.sampleEntry && (
              <ProfileSection id="sample" title="Sample entry">
                <figure className="max-w-[40rem]">
                  <p className="text-meta text-ink-muted">{profile.sampleEntry.meta}</p>
                  <blockquote className="mt-3 text-lede text-ink">“{profile.sampleEntry.quote}”</blockquote>
                  <p className="mt-3 text-body text-ink-secondary">{profile.sampleEntry.answer}</p>
                  <figcaption className="mt-3 text-body-sm text-ink-muted">{profile.sampleEntry.note}</figcaption>
                </figure>
              </ProfileSection>
            )}

            <ProfileSection id="specification" title="Specification">
              <SpecList items={profile.specification} />
            </ProfileSection>

            {profile.metadata && (
              <ProfileSection id="metadata" title={profile.metadata.title}>
                <DataTable caption={profile.metadata.title} columns={profile.metadata.columns} rows={profile.metadata.rows} />
                {profile.metadata.note && <p className="mt-4 text-body-sm text-ink-muted">{profile.metadata.note}</p>}
              </ProfileSection>
            )}

            {/* Sections only some cards have, such as Method and More on request */}
            {profile.notes?.map((note) => (
              <ProfileSection key={note.id} id={note.id} title={note.title}>
                <div className="max-w-[40rem] space-y-3 text-body-lg text-ink">
                  {note.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </ProfileSection>
            ))}

            <section aria-labelledby="licensing" className="border-t border-border py-12 md:py-16">
              <h2 id="licensing" className="max-w-2xl text-display-lg text-ink">
                The owner approves every offer. Access runs for 3 to 12 months, on the price and term in the offer.
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

            <ProfileSection
              id="certificate"
              title="Quality certificate"
              aside={<CertificateMark status={certificate.status} size={84} className="mt-6 text-ink" />}
            >
              <p className="max-w-[40rem] text-body-lg text-ink">{certificate.body}</p>
            </ProfileSection>

            <ProfileSection id="delivery" title="Files and delivery">
              <SpecList items={profile.delivery} />
            </ProfileSection>

            <ProfileSection id="license" title="License terms">
              <SpecList items={profile.license} />
            </ProfileSection>

            <ProfileSection id="limits" title="Limits">
              <div className="max-w-[40rem] space-y-4 text-body-lg text-ink">
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
        title="Query the data"
        lede="Query how much of the data meets your conditions and get a count checked against the data, then make an offer."
        actions={
          <>
            <CtaButton action="runQuery" />
            <CtaButton action="exploreDatasets" variant="standard" />
          </>
        }
      />
    </PageLayout>
  );
};

export default DatasetPage;
