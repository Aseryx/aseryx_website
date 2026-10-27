import { Link } from 'react-router-dom';
import { ArrowRight, Box, FileText, PersonStanding, Video } from 'lucide-react';
import Card from '../common/Card.jsx';
import PendingDot from './PendingDot.jsx';

const MODALITY_ICONS = { Video, '3D': Box, Text: FileText, Motion: PersonStanding };

/**
 * Catalog teaser, after the owner-approved profile drafts: 16:9 media slot,
 * meta line, title, two-line summary, three stats and tags. The whole card is
 * one link (stretched from the title) so it reads as a single stop for
 * keyboard and screen-reader users.
 */
const DatasetCard = ({ dataset }) => {
  const { slug, title, modality, subject, version, summary, media, sample, stats, tags } = dataset;
  const Icon = MODALITY_ICONS[modality] ?? Box;

  return (
    <Card as="article" className="group relative flex flex-col p-3 transition-colors duration-150 hover:border-border-hover">
      <div className="aspect-video rounded-xl border border-border-light bg-secondary">
        {sample ? (
          <figure className="flex h-full flex-col justify-center gap-2 px-6">
            <p className="text-meta text-ink-muted">{sample.meta}</p>
            <blockquote className="text-lede text-ink">“{sample.quote}”</blockquote>
            <figcaption className="text-body-sm text-ink-muted">{sample.note}</figcaption>
          </figure>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <Icon className="h-5 w-5 text-ink-muted" aria-hidden="true" />
            <p className="text-body-sm text-ink-muted">{media}</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className="flex justify-between gap-3 text-meta text-ink-muted">
          <span>
            {modality} · {subject}
          </span>
          <span>{version}</span>
        </p>
        <h3 className="mt-2 text-heading-lg text-ink">
          <Link
            to={`/datasets/${slug}`}
            className="focus:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-brand"
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

        <p className="mt-auto pt-6 inline-flex items-center gap-1.5 text-button-md text-ink" aria-hidden="true">
          View profile
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </p>
      </div>
    </Card>
  );
};

export default DatasetCard;
