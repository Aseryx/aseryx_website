import { pickerKeys } from '../../content/homeCopyDrafts.js';

/**
 * Dev only: flips Home between the Notion copy drafts (whole pages, then the
 * other lead options as heroes) so they can be compared in the real design.
 * Never rendered in a production build.
 */
const CopyPicker = ({ current, onPick }) => (
  <div
    className="fixed bottom-4 left-4 z-50 flex flex-wrap items-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-lift"
    role="group"
    aria-label="Copy draft (dev only)"
  >
    <span className="px-2 text-meta text-ink-muted">Copy</span>
    {pickerKeys().map(([key, label]) => (
      <button
        key={key}
        type="button"
        onClick={() => onPick(key)}
        aria-pressed={current === key}
        className={`rounded-lg px-2.5 py-1 text-body-sm ${
          current === key ? 'bg-btn-primary text-btn-primary-ink' : 'text-ink-secondary hover:bg-hover hover:text-ink'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default CopyPicker;
