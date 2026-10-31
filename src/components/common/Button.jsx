import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { isExternal, NEW_TAB } from '../../utils/links.js';

// Mirrors the design-system Button (.ax-btn). Every variant has a 1px border so
// they share one size; each variant sets the border colour itself, because a
// shared border-transparent here would win over it in Tailwind's CSS order.
// Focus is the site-wide coral outline (index.css), offset from the edge.
const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-lg border transition-all duration-150 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const SIZES = {
  sm: 'px-3 py-1.5 text-body-sm font-medium whitespace-nowrap',
  // min-h-11 lifts the system's 41px md button to the 44px touch minimum
  md: 'px-4 py-2.5 min-h-11 text-button-md',
  lg: 'px-7 py-3 text-button-lg',
};

// Primary is ink (black in light, white in dark), never coral: coral is the focus ring.
const VARIANTS = {
  primary: 'border-transparent bg-btn-primary text-btn-primary-ink hover:bg-btn-primary-hover',
  secondary: 'border-btn-secondary-border text-btn-secondary-ink hover:bg-btn-secondary-hover',
  standard: 'border-btn-standard-border bg-btn-standard text-ink hover:bg-btn-standard-hover',
  outline: 'border-btn-outline text-btn-outline hover:bg-btn-outline-hover',
};

/**
 * The site's one button.
 * `to` renders an in-app route, `href` a link, neither a <button>. External
 * URLs open in a new tab and carry the up-right arrow, the one icon that says
 * something the label does not; pass `arrow` to force it on or off.
 */
const Button = ({ variant = 'primary', size = 'md', to, href, arrow, className = '', children, ...rest }) => {
  const external = Boolean(href) && isExternal(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const showArrow = arrow ?? external;
  const classes = [BASE, SIZES[size], VARIANTS[variant], className].filter(Boolean).join(' ');

  const content = (
    <>
      {children}
      {showArrow && (
        <Icon
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const newTab = external ? NEW_TAB : {};
    return (
      <a href={href} className={classes} {...newTab} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
};

export default Button;
