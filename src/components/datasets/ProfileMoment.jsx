import Card from '../common/Card.jsx';
import StatusChip from '../common/StatusChip.jsx';
import { SAMPLE_PROFILE } from '../../data/datasets.js';
import { STATUS_DOT } from './provenanceStatus.js';

/**
 * Coded product moment: a dataset profile in miniature, built from the real
 * profile data instead of a screenshot so it themes and stays in sync.
 */
const ProfileMoment = ({ dataset = SAMPLE_PROFILE }) => {
  if (!dataset?.profile) return null;
  const { title, modality, subject, version, profile } = dataset;
  const provenance = profile.provenance.filter((p) => ['Author', 'Source', 'Quality review'].includes(p.label));
  const licence = profile.licence.filter((l) => l.label !== 'Signed by');

  return (
    <Card lift className="overflow-hidden" aria-label={`Profile preview: ${title}`} role="figure">
      <div className="border-b border-border-light px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-meta text-ink-muted">
            {modality} · {subject} · {version}
          </p>
          <StatusChip tone="pass">Approved by owner</StatusChip>
        </div>
        <p className="mt-2 text-heading-lg text-ink">{title}</p>
      </div>

      <dl className="grid grid-cols-3 border-b border-border-light">
        {profile.headline.slice(0, 3).map((stat, i) => (
          <div key={stat.label} className={`flex flex-col px-5 py-4 ${i ? 'border-l border-border-light' : ''}`}>
            <dt className="mt-1 text-body-sm text-ink-muted line-clamp-1">{stat.label}</dt>
            <dd className="order-first text-xl font-medium tracking-tight tabular-nums text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <dl className="px-5 py-2">
        {provenance.map((row) => (
          <div key={row.label} className="grid grid-cols-[6rem_1fr] gap-3 sm:grid-cols-[7.5rem_1fr] border-b border-border-light py-2.5 last:border-0">
            <dt className="pt-0.5 font-mono text-table-head uppercase text-ink-muted">{row.label}</dt>
            <dd className="flex items-baseline gap-2 text-body text-ink">
              <span className={`h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full ${STATUS_DOT[row.status]}`} aria-hidden="true" />
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <dl className="grid grid-cols-2 gap-3 bg-secondary px-5 py-4">
        {licence.map((row) => (
          <div key={row.label}>
            <dt className="font-mono text-table-head uppercase text-ink-muted">{row.label}</dt>
            <dd className="mt-1 text-body text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};

export default ProfileMoment;
