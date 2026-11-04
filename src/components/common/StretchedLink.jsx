import { Link } from 'react-router-dom';

/**
 * A title link stretched over its whole card or row, so the block is one stop
 * for keyboard and screen-reader users and the focus ring goes round the
 * block. The block needs `relative` and `group`.
 */
const StretchedLink = ({ to, className = '', children }) => (
  <Link
    to={to}
    className={`underline-offset-4 decoration-1 group-hover:underline focus:outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-brand ${className}`}
  >
    {children}
  </Link>
);

export default StretchedLink;
