/**
 * Shared section heading. No label above the title: the title names the
 * section on its own.
 *
 * layout="split"  title left, lede + action right (default)
 * layout="stack"  one left-aligned column
 * layout="center" short closing sections
 */
const SectionHeader = ({
  title,
  lede,
  action,
  layout = 'split',
  as: Heading = 'h2',
  id,
  className = '',
}) => {
  const center = layout === 'center';

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
      {titleEl}
      {lede && <div className={`mt-4 ${center ? 'flex justify-center' : ''}`}>{ledeEl}</div>}
      {action && <div className={`mt-6 flex ${center ? 'justify-center' : ''}`}>{action}</div>}
    </div>
  );
};

export default SectionHeader;
