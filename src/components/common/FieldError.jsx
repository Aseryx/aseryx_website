/** A field's error: a critical dot and plain words, never colour alone. */
const FieldError = ({ id, children }) => (
  <p id={id} className="mt-2 flex items-center gap-2 text-body-sm text-ink">
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-critical" aria-hidden="true" />
    {children}
  </p>
);

export default FieldError;
