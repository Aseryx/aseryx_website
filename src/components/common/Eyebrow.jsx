/**
 * Section label: design-system meta text in ink-muted behind a short coral
 * rule, one of coral's allowed page accents.
 */
const Eyebrow = ({ center = false, className = '', children }) => (
  <p className={`flex items-center gap-2.5 mb-4 text-meta text-ink-muted ${center ? 'justify-center' : ''} ${className}`}>
    <span className="h-px w-5 bg-brand" aria-hidden="true" />
    {children}
  </p>
);

export default Eyebrow;
