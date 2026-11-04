const TONES = {
  card: 'bg-card',
  // Quiet well: info boxes and frames behind product stills
  secondary: 'bg-secondary',
};

/**
 * Flat bordered surface with the design-system card radius (16px).
 * Borders, not shadows; pass `lift` for the one raised-panel shadow.
 * Pass `as` to render a link or list item with the same look.
 */
const Card = ({ as: Element = 'div', tone = 'card', lift = false, className = '', children, ...rest }) => (
  <Element
    className={['rounded-2xl border', TONES[tone], lift && 'shadow-lift', className].filter(Boolean).join(' ')}
    {...rest}
  >
    {children}
  </Element>
);

export default Card;
