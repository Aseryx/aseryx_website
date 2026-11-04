/**
 * A short aside with its next step beside it: the lead in ink, the rest in
 * secondary ink, and the buttons to the right on wider screens.
 */
const ActionRow = ({ lead, children, actions, className = '' }) => (
  <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
    <p className="max-w-[40rem] text-body-lg text-ink-secondary">
      <span className="text-ink">{lead}</span> {children}
    </p>
    <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
  </div>
);

export default ActionRow;
