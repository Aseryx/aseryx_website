const TONES = {
  page: '',
  // Full-width warm band for the proof strip and closing sections
  secondary: 'bg-secondary border-y',
};

const SPACING = {
  default: 'py-16 md:py-24 lg:py-32',
  compact: 'py-10 md:py-14',
  none: '',
};

/**
 * Page section with the site's single content width (max-w-7xl) and the
 * design-system page gutter (24px, 40px on large screens), so every section
 * shares the same left edge. `backdrop` is drawn edge to edge behind the
 * content (the dot field).
 */
const Section = ({
  id,
  tone = 'page',
  spacing = 'default',
  grid = true,
  className = '',
  containerClassName = '',
  backdrop,
  children,
  ...rest
}) => {
  const classes = ['relative px-6 lg:px-10', TONES[tone], SPACING[spacing], grid && 'grid-bg', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={classes} {...rest}>
      {backdrop}
      {/* z-10 keeps content above the .grid-bg overlay and the backdrop */}
      <div className={['relative z-10 max-w-7xl mx-auto', containerClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </section>
  );
};

export default Section;
