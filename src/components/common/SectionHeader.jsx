/**
 * Shared section heading.
 *
 * layout="split"  title left, lede + action right (default)
 * layout="stack"  one left-aligned column
 * layout="center" short closing sections
 *
 * Eyebrow follows the design system (text-meta in ink-muted) behind a short
 * coral rule, one of coral's allowed page accents.
 */
const SectionHeader = ({
  eyebrow,
  title,
  lede,
  action,
  layout = 'split',
  as: Heading = 'h2',
  id,
  className = '',
}) => {
  const center = layout === 'center';

  const eyebrowEl = eyebrow && (
    <p className={`flex items-center gap-2.5 mb-4 text-meta text-ink-muted ${center ? 'justify-center' : ''}`}>
      <span className="h-px w-5 bg-brand" aria-hidden="true" />
      {eyebrow}
    </p>
  );
  const titleEl = (
    <Heading id={id} className="text-display-lg text-ink">
      {title}
    </Heading>
  );
  const ledeEl = lede && <p className="text-lede text-ink-secondary max-w-[40rem]">{lede}</p>;

  if (layout === 'split') {
    return (
      <div className={`grid gap-6 mb-12 md:mb-16 lg:grid-cols-12 lg:gap-12 lg:items-end ${className}`}>
        <div className="lg:col-span-7">
          {eyebrowEl}
          {titleEl}
        </div>
        {(lede || action) && (
          <div className="lg:col-span-5">
            {ledeEl}
            {action && <div className={lede ? 'mt-6' : ''}>{action}</div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-12 md:mb-16 max-w-3xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrowEl}
      {titleEl}
      {lede && <div className={`mt-4 ${center ? 'flex justify-center' : ''}`}>{ledeEl}</div>}
      {action && <div className={`mt-6 flex ${center ? 'justify-center' : ''}`}>{action}</div>}
    </div>
  );
};

export default SectionHeader;
