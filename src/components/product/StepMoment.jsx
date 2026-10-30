import { useState } from 'react';
import { Check } from 'lucide-react';
import Card from '../common/Card.jsx';
import StatusChip from '../common/StatusChip.jsx';
import CertificateMoment from './CertificateMoment.jsx';
import MomentHeader from './MomentHeader.jsx';
import { usePlayOnView, PHASE_CLASS } from '../../hooks/usePlayOnView.jsx';
import { SAMPLE_LISTING } from '../../data/steps.js';

// Coded product moments for the three steps: list, certificate, offer. Sample
// values throughout, built from tokens so they theme with the page instead of
// shipping two screenshots per step. Each can play what its step does once
// (see usePlayOnView): the m-* classes mark the parts that move, and --i is
// a part's place in the order.

const LISTING_FACTS = [
  ['Documents', SAMPLE_LISTING.size],
  ['Languages', '2'],
  ['Years', '2015–2024'],
];

// The listing as the owner sends it in: its facts arrive one by one, then
// the certificate it gets (m-after).
const ListMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="A dataset being listed, then given its quality certificate">
    <MomentHeader label="New listing" detail="Sample" />
    <div className="px-5 pt-5">
      <p className="text-meta text-ink-muted">{SAMPLE_LISTING.kind}</p>
      <p className="mt-1 text-heading-lg text-ink">{SAMPLE_LISTING.name}</p>
    </div>
    <dl className="grid grid-cols-3 px-5 pb-5 pt-4 text-body-sm">
      {LISTING_FACTS.map(([label, value], i) => (
        <div
          key={label}
          className={`m-check flex flex-col ${i ? 'border-l border-border-light pl-4' : ''}`}
          style={{ '--i': i }}
        >
          <dt className="text-ink-muted">{label}</dt>
          <dd className="order-first font-mono text-body tabular-nums text-ink">{value}</dd>
        </div>
      ))}
    </dl>
    <p className="m-after flex items-center gap-1.5 bg-secondary px-5 py-3 text-body-sm text-ink">
      <Check className="h-3.5 w-3.5" aria-hidden="true" />
      Quality certificate issued
    </p>
  </Card>
);

// Plays an owner approving an offer: Approve is pressed, then the offer turns
// from waiting to approved and the held payment is released. At rest (or
// without motion) it waits for the owner, which is the point: nothing moves
// until they say so.
const OfferMoment = () => {
  const [approved, setApproved] = useState(false);
  const terms = [
    ['Term', '6 months'],
    ['Payment', approved ? 'Released to you' : 'Held'],
  ];

  return (
    <Card lift className="overflow-hidden" role="figure" aria-label="An offer waiting for the owner's approval">
      <MomentHeader label="Offers" detail="Sample" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-heading-lg text-ink">Offer from an AI company</p>
            <p className="mt-0.5 text-body-sm text-ink-muted">{SAMPLE_LISTING.name}</p>
          </div>
          {approved ? (
            <StatusChip tone="pass" className="animate-settle">
              Approved
            </StatusChip>
          ) : (
            <StatusChip tone="waiting">Waiting for you</StatusChip>
          )}
        </div>
        <dl className="mt-5 border-t border-border-light">
          {terms.map(([term, value]) => (
            <div key={term} className="flex items-center justify-between gap-4 border-b border-border-light py-3 last:border-0">
              <dt className="text-body text-ink-secondary">{term}</dt>
              <dd className="text-body text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex min-h-[3.75rem] items-center gap-2 border-t border-border-light bg-secondary px-5 py-3" aria-hidden="true">
        {approved ? (
          <span className="animate-settle text-body-sm text-ink-secondary">Approved by you</span>
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

const MOMENTS = {
  list: ListMoment,
  certificate: CertificateMoment,
  offer: OfferMoment,
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
