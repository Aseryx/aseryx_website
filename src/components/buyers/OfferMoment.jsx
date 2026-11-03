import Card from '../common/Card.jsx';
import StatusChip from '../common/StatusChip.jsx';
import MomentHeader from '../product/MomentHeader.jsx';

// The terms a team can ask for, as the app's Request access dialog offers them.
const TERMS = [3, 6, 9, 12];
const CHOSEN = 6;

/**
 * Coded moment: an offer in the app, after the demo's Request access dialog.
 * It is a picture of the form, not a form, so its parts are hidden from
 * screen readers and the figure's label says what it shows. The amount is
 * one a team might type, never a dataset's price.
 */
const OfferMoment = () => (
  <Card
    lift
    className="overflow-hidden"
    role="figure"
    aria-label="An offer in the app: a 6-month term and an amount the team typed, waiting for the owner, who has 14 days to answer"
  >
    <MomentHeader label="Make an offer" />
    <div className="space-y-5 px-5 py-5" aria-hidden="true">
      <div>
        <p className="text-meta text-ink-muted">License term</p>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg border border-border p-1 sm:grid-cols-4">
          {TERMS.map((months) => (
            <span
              key={months}
              className={`rounded-md py-1.5 text-center text-body-sm ${
                months === CHOSEN ? 'bg-btn-primary text-btn-primary-ink' : 'text-ink-secondary'
              }`}
            >
              {months} months
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-meta text-ink-muted">Your offer</p>
        <p className="mt-2 rounded-lg border border-border px-3 py-2.5 text-heading-lg tabular-nums text-ink">$12,000</p>
      </div>
      <span className="inline-flex min-h-10 items-center rounded-lg bg-btn-primary px-4 text-body-sm font-medium text-btn-primary-ink">
        Send offer
      </span>
    </div>
    <div
      className="flex flex-wrap items-center justify-between gap-3 border-t border-border-light px-5 py-3.5"
      aria-hidden="true"
    >
      <StatusChip tone="waiting">Waiting for the owner</StatusChip>
      <span className="text-body-sm text-ink-muted">14 days to answer</span>
    </div>
  </Card>
);

export default OfferMoment;
