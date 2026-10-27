import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Card from '../common/Card.jsx';
import CertificateMoment from './CertificateMoment.jsx';
import { usePlayOnView, PHASE_CLASS } from '../../hooks/usePlayOnView.jsx';

// Coded product moments for Connect, Lock, Verify and Control. Sample values
// throughout, built from tokens so they theme with the page instead of
// shipping two screenshots per step. Each can play what its step does once
// (see usePlayOnView): the m-* classes mark the parts that move, and --i is
// a part's place in the order.

const Header = ({ label, detail }) => (
  <div className="flex items-center justify-between gap-4 border-b border-border-light px-5 py-3">
    <p className="text-meta text-ink-muted">{label}</p>
    {detail && <p className="truncate font-mono text-table-head uppercase text-ink-muted">{detail}</p>}
  </div>
);

const TABLES = [
  { name: 'orders', rows: '1.2M', utility: 92 },
  { name: 'line_items', rows: '4.8M', utility: 81 },
  { name: 'products', rows: '12K', utility: 64 },
  { name: 'customers', rows: '310K', utility: 38 },
  { name: 'audit_log', rows: '22M', utility: 9 },
];

const ConnectMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="Connected database with tables ranked by utility">
    <Header label="Workspace · connected" detail="postgres · orders-db" />
    <div className="flex items-center justify-between px-5 pt-4 pb-2 text-table-head uppercase text-ink-muted">
      <span>Table</span>
      <span>Utility</span>
    </div>
    <ul className="px-5 pb-3">
      {TABLES.map((t, i) => (
        <li key={t.name} className="flex items-center gap-4 border-b border-border-light py-2.5 last:border-0">
          <span className="font-mono text-body text-ink">{t.name}</span>
          <span className="font-mono text-body-sm tabular-nums text-ink-muted">{t.rows} rows</span>
          <span className="ml-auto h-1.5 w-24 overflow-hidden rounded-r-sm bg-muted" aria-hidden="true">
            <span className="m-bar block h-full bg-ink" style={{ width: `${t.utility}%`, '--i': i }} />
          </span>
          <span className="w-7 text-right font-mono text-body-sm tabular-nums text-ink-secondary">{t.utility}</span>
        </li>
      ))}
    </ul>
  </Card>
);

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
    <Header label="Choose what's in it" detail="orders_2024" />
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
        Ready for its quality check
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
      <Header label="Sample requests" detail="orders_2024" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-heading-lg text-ink">An AI team</p>
            <p className="mt-0.5 text-body-sm text-ink-muted">Asks for a small free sample</p>
          </div>
          {approved ? (
            <span className="animate-settle inline-flex items-center gap-1.5 rounded-full border border-success-border bg-success-bg px-2 py-0.5 text-meta text-success-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-success-dot" aria-hidden="true" />
              Approved
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-bg px-2 py-0.5 text-meta text-neutral-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-pending" aria-hidden="true" />
              Waiting for you
            </span>
          )}
        </div>
        <p className="mt-6 text-body-sm text-ink-secondary">
          Shared only after the team signs confidentiality. Nothing is shared until you approve.
        </p>
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

const MOMENTS = { connect: ConnectMoment, lock: LockMoment, verify: CertificateMoment, control: ApproveMoment };

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
