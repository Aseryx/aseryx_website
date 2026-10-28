import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Card from '../common/Card.jsx';
import StatusChip from '../common/StatusChip.jsx';
import CertificateMoment from './CertificateMoment.jsx';
import MomentHeader from './MomentHeader.jsx';
import { usePlayOnView, PHASE_CLASS } from '../../hooks/usePlayOnView.jsx';

// Coded product moments for the four steps: pick, check, approve, sign. Sample values
// throughout, built from tokens so they theme with the page instead of
// shipping two screenshots per step. Each can play what its step does once
// (see usePlayOnView): the m-* classes mark the parts that move, and --i is
// a part's place in the order.

const FIELDS = [
  ['order_id', true],
  ['region', true],
  ['order_total', true],
  ['created_at', true],
  ['sku', true],
  ['customer_email', false],
  ['card_last4', false],
  ['quantity', true],
];

const LockMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="Choosing what is in the dataset: chosen fields in, personal fields out">
    <MomentHeader label="Choose what's in it" detail="orders_2024" />
    <ul className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-4">
      {FIELDS.map(([field, kept], i) => (
        <li
          key={field}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 font-mono text-body-sm ${
            kept ? 'm-pick border-brand-tint-border bg-brand-tint text-ink' : 'm-drop border-border-light text-ink-muted line-through'
          }`}
          style={{ '--i': i }}
        >
          {kept ? (
            <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          )}
          <span className="truncate">{field}</span>
          <span className="sr-only">{kept ? ' (in the cut)' : ' (left out)'}</span>
        </li>
      ))}
    </ul>
    <div className="m-after flex flex-wrap items-center gap-x-4 gap-y-1 bg-secondary px-5 py-3 text-body-sm text-ink-secondary">
      <span className="inline-flex items-center gap-1.5 text-ink">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Ready for its appraisal
      </span>
      <span className="tabular-nums">6 of 8 kept</span>
    </div>
  </Card>
);

// Plays an owner approving a sample request: Approve is pressed, then the
// request turns from waiting to approved. At rest (or without motion) it
// waits for the owner, which is the point: nothing moves until they say so.
const ApproveMoment = () => {
  const [approved, setApproved] = useState(false);

  return (
    <Card lift className="overflow-hidden" role="figure" aria-label="A sample request waiting for the owner's approval">
      <MomentHeader label="Sample requests" detail="orders_2024" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-heading-lg text-ink">An AI company</p>
            <p className="mt-0.5 text-body-sm text-ink-muted">Asks for a small free sample</p>
          </div>
          {approved ? (
            <StatusChip tone="pass" className="animate-settle">
              Approved
            </StatusChip>
          ) : (
            <StatusChip tone="waiting">Waiting for you</StatusChip>
          )}
        </div>
        <p className="mt-6 text-body-sm text-ink-secondary">Shared only after the team signs confidentiality.</p>
      </div>
      <div className="flex min-h-[3.75rem] items-center gap-2 border-t border-border-light bg-secondary px-5 py-3" aria-hidden="true">
        {approved ? (
          <span className="animate-settle text-body-sm text-ink-secondary">Sample shared with your approval</span>
        ) : (
          <>
            <span
              className="m-press rounded-lg bg-btn-primary px-3 py-1.5 text-body-sm font-medium text-btn-primary-ink"
              onAnimationEnd={() => setApproved(true)}
            >
              Approve
            </span>
            <span className="rounded-lg border border-btn-secondary-border px-3 py-1.5 text-body-sm font-medium text-btn-secondary-ink">
              Decline
            </span>
          </>
        )}
      </div>
    </Card>
  );
};

// The license, signed by the owner and the team directly: its terms come in
// line by line (m-check), then the signature line (m-after).
const LICENSE_TERMS = [
  ['Licensee', 'An AI company'],
  ['Price', 'Set by you'],
  ['Your share', 'At least 80%'],
  ['Exclusive', 'No'],
];

const LicenseMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="A license agreed directly between the owner and the team">
    <MomentHeader label="License" detail="orders_2024" />
    <dl className="px-5 py-2">
      {LICENSE_TERMS.map(([term, value], i) => (
        <div key={term} className="flex items-center justify-between gap-4 border-b border-border-light py-3 last:border-0">
          <dt className="text-body text-ink-secondary">{term}</dt>
          <dd className="m-check text-body text-ink" style={{ '--i': i }}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
    <p className="m-after flex items-center gap-1.5 bg-secondary px-5 py-3 text-body-sm text-ink">
      <Check className="h-3.5 w-3.5" aria-hidden="true" />
      Signed by you and the team
    </p>
  </Card>
);

const MOMENTS = {
  lock: LockMoment,
  verify: CertificateMoment,
  control: ApproveMoment,
  license: LicenseMoment,
};

/**
 * The coded moment for one product step. It plays its step once when first
 * scrolled into view, or straight away when `immediate` (opened by a tap).
 */
const StepMoment = ({ id, immediate = false }) => {
  const [ref, phase] = usePlayOnView({ immediate });
  const Moment = MOMENTS[id];
  if (!Moment) return null;
  return (
    <div ref={ref} className={PHASE_CLASS[phase]}>
      <Moment />
    </div>
  );
};

export default StepMoment;
