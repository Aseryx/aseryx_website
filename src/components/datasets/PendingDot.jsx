/** Amber dot for a value the owner is still confirming. */
const PendingDot = () => (
  <>
    <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-pending align-middle" aria-hidden="true" />
    <span className="sr-only"> (being confirmed)</span>
  </>
);

export default PendingDot;
