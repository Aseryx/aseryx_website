import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';
import PendingDot from './PendingDot.jsx';
import { MEDIA_CELLS } from './mediaCells.js';


/**
 * Catalog teaser, after the owner-approved profile drafts: media on the
 * card's top edge with the modality on it, then subject and version, title,
 * a two-line summary, three stats and tags. The whole card is one link
 * (stretched from the title) so it reads as a single stop for keyboard and
 * screen-reader users.
 */
const DatasetCard = ({ dataset }) => {
  const { slug, title, modality, subject, version, summary, media, sample, stats, tags } = dataset;

  return (
    <Card as="article" className="group relative flex flex-col overflow-hidden transition-colors duration-150 hover:border-border-hover">
      <div className="relative aspect-video border-b border-border-light bg-secondary" style={sample ? undefined : MEDIA_CELLS}>
        <span className="absolute left-4 top-4 rounded-md border border-border-light bg-card px-2 py-1 text-meta text-ink">
          {modality}
        </span>
        {sample ? (
          <figure className="flex h-full flex-col justify-center gap-2 px-6 pt-8">
            <p className="text-meta text-ink-muted">{sample.meta}</p>
            <blockquote className="text-lede text-ink">“{sample.quote}”</blockquote>
            <figcaption className="text-body-sm text-ink-muted">{sample.note}</figcaption>
          </figure>
        ) : (
          <p className="absolute inset-x-4 bottom-4 text-body-sm text-ink-muted">{media}</p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex justify-between gap-3 text-meta text-ink-muted">
          <span>{subject}</span>
          <span>{version}</span>
        </p>
        <h3 className="mt-2 text-heading-lg text-ink">
          <Link
            to={`/datasets/${slug}`}
            className="underline-offset-4 decoration-1 group-hover:underline focus:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-brand"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-body text-ink-secondary line-clamp-2">{summary}</p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-border-light py-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="mt-1 text-body-sm text-ink-muted">{stat.label}</dt>
              <dd className="order-first text-xl font-medium tracking-tight tabular-nums text-ink">
                {stat.value}
                {stat.pending && <PendingDot />}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag} className="rounded-md bg-muted px-2 py-1 text-meta text-ink-secondary">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default DatasetCard;
