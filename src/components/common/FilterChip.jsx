/**
 * Toggle chip for filter rows. Pressed state is ink-filled like the primary
 * button; min-h-10 keeps a comfortable tap target.
 */
const FilterChip = ({ active, count, onClick, children }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={
      'inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-body-sm transition-colors duration-150 ' +
      (active
        ? 'border-transparent bg-btn-primary text-btn-primary-ink'
        : 'border-border text-ink-secondary hover:bg-hover hover:text-ink')
    }
  >
    {children}
    {count != null && <span className="tabular-nums opacity-60">{count}</span>}
  </button>
);

export default FilterChip;
