import FieldError from './FieldError.jsx';

// A checked chip takes the primary button's colours; the native input under
// each chip keeps keyboard and screen-reader behaviour.
const CHIP =
  'inline-flex min-h-10 items-center rounded-lg border border-border px-3 text-body-sm text-ink-secondary ' +
  'transition-colors duration-150 hover:bg-hover hover:text-ink ' +
  'peer-checked:border-transparent peer-checked:bg-btn-primary peer-checked:text-btn-primary-ink ' +
  'peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-page';

/**
 * A question answered with chips: a radio group, where `value` is one
 * option, or with `multiple` a checkbox group, where `value` is a list.
 * `options` are [value, label] pairs; `error` shows under the chips and is
 * read out with the group.
 */
const ChoiceChips = ({ name, legend, hint, options, value, onChange, multiple = false, error }) => {
  const isChecked = (option) => (multiple ? value.includes(option) : value === option);
  const choose = (option) => {
    if (!multiple) return onChange(option);
    return onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
  };
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset aria-describedby={errorId}>
      <legend className="text-body-lg font-medium text-ink">{legend}</legend>
      {hint && <p className="mt-1 text-body-sm text-ink-muted">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map(([option, label]) => (
          <label key={option} className="cursor-pointer">
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={option}
              checked={isChecked(option)}
              onChange={() => choose(option)}
              className="peer sr-only"
            />
            <span className={CHIP}>{label}</span>
          </label>
        ))}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
};

export default ChoiceChips;
