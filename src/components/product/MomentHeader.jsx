/** The strip across the top of a product moment: what the screen is, and a mono detail. */
const MomentHeader = ({ label, detail }) => (
  <div className="flex items-center justify-between gap-4 border-b border-border-light px-5 py-3">
    <p className="text-meta text-ink-muted">{label}</p>
    {detail && <p className="truncate font-mono text-table-head uppercase text-ink-muted">{detail}</p>}
  </div>
);

export default MomentHeader;
