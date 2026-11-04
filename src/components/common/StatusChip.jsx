// The site's one status pill: a tinted outline, a dot and a short label.
// Waiting keeps a transparent border so every chip is the same height.
const TONES = {
  pass: { chip: 'border-success-border bg-success-bg text-success-ink', dot: 'bg-success-dot' },
  waiting: { chip: 'border-transparent bg-neutral-bg text-neutral-ink', dot: 'bg-pending' },
  watch: { chip: 'border-border bg-card text-ink-secondary', dot: 'bg-pending' },
  fix: { chip: 'border-border bg-card text-ink', dot: 'bg-critical' },
};

/** `tone` is pass, waiting, watch or fix; the appraisal preview's check statuses use the same names. */
const StatusChip = ({ tone, className = '', children }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-meta ${TONES[tone].chip} ${className}`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${TONES[tone].dot}`} aria-hidden="true" />
    {children}
  </span>
);

export default StatusChip;
