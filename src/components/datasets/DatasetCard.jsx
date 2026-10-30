import Card from '../common/Card.jsx';
import StretchedLink from '../common/StretchedLink.jsx';
import CertificateChip from './CertificateChip.jsx';
import DatasetArt from './DatasetArt.jsx';
import OwnerLogo from './OwnerLogo.jsx';
import PendingDot from './PendingDot.jsx';
import TagList from './TagList.jsx';
import { MEDIA_CELLS } from './mediaCells.js';
import { OWNER_PENDING } from '../../data/datasets.js';

/**
 * Catalog teaser, after the owner-approved profile drafts: media on the
 * card's top edge (a drawing of what the dataset holds, captioned) with the
 * modality and certificate status on it, then subject and version, title,
 * the owner with their logo where their card has one, a two-line summary,
 * three stats and tags. The whole card is one link (stretched from the
 * title) so it reads as a single stop for keyboard and screen-reader users.
 */
const DatasetCard = ({ dataset }) => {
  const { slug, title, owner, ownerLogo, modality, subject, version, summary, media, art, sample, stats, tags } = dataset;

  return (
    <Card as="article" className="group relative flex flex-col overflow-hidden transition-colors duration-150 hover:border-border-hover">
      <div className="relative aspect-video border-b border-border-light bg-secondary" style={sample ? undefined : MEDIA_CELLS}>
        <span className="absolute left-4 top-4 rounded-md border border-border-light bg-card px-2 py-1 text-meta text-ink">
          {modality}
        </span>
        <CertificateChip dataset={dataset} className="absolute right-4 top-4" />
        {sample ? (
          <figure className="flex h-full flex-col justify-center gap-2 px-6 pt-8">
            <p className="text-meta text-ink-muted">{sample.meta}</p>
            <blockquote className="text-lede text-ink">“{sample.quote}”</blockquote>
            <figcaption className="text-body-sm text-ink-muted">{sample.note}</figcaption>
          </figure>
        ) : (
          <>
            <DatasetArt kind={art} className="absolute inset-x-6 top-12 bottom-11 text-ink-secondary" />
            <p className="absolute inset-x-4 bottom-4 text-body-sm text-ink-muted">{media}</p>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex justify-between gap-3 text-meta text-ink-muted">
          <span>{subject}</span>
          <span>{version}</span>
        </p>
        <h3 className="mt-2 text-heading-lg text-ink">
          <StretchedLink to={`/datasets/${slug}`} className="after:rounded-2xl">
            {title}
          </StretchedLink>
        </h3>
        {owner !== OWNER_PENDING && (
          <p className="mt-2 flex items-center gap-2 text-body-sm text-ink-secondary">
            {ownerLogo && <OwnerLogo logo={ownerLogo} className="h-5" />}
            <span>{owner}</span>
          </p>
        )}
        <p className="mt-2 text-body text-ink-secondary line-clamp-2">{summary}</p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-border-light py-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="mt-1 text-body-sm text-ink-muted">{stat.label}</dt>
              {/* A long value ("195 h 48 min") steps down a size so it stays on one line */}
              <dd
                className={`order-first font-medium tracking-tight tabular-nums text-ink ${
                  stat.value.length > 8 ? 'text-base' : 'text-xl'
                }`}
              >
                {stat.value}
                {stat.pending && <PendingDot />}
              </dd>
            </div>
          ))}
        </dl>

        <TagList tags={tags} label="Tags" className="mt-4" />
      </div>
    </Card>
  );
};

export default DatasetCard;
