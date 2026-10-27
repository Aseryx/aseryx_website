import { HERO_OPTIONS } from '../../content/heroOptions.js';

/**
 * Dev only: flips the hero between the Notion lead options so they can be
 * compared in the real design. Never rendered in a production build.
 */
const HeroOptionPicker = ({ current, onPick }) => (
  <div
    className="fixed bottom-4 left-4 z-50 flex flex-wrap items-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-lift"
    role="group"
    aria-label="Hero copy option (dev only)"
  >
    <span className="px-2 text-meta text-ink-muted">Hero</span>
    {Object.entries(HERO_OPTIONS).map(([key, option]) => (
      <button
        key={key}
        type="button"
        onClick={() => onPick(key)}
        aria-pressed={current === key}
        className={`rounded-lg px-2.5 py-1 text-body-sm ${
          current === key ? 'bg-btn-primary text-btn-primary-ink' : 'text-ink-secondary hover:bg-hover hover:text-ink'
        }`}
      >
        {option.short}
      </button>
    ))}
  </div>
);

export default HeroOptionPicker;
