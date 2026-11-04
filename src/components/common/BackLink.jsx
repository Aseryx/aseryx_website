import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/** The way back from a post or a profile to its list. */
const BackLink = ({ to, children }) => (
  <Link
    to={to}
    className="group inline-flex min-h-11 items-center gap-2 rounded-lg text-body-sm text-ink-secondary hover:text-ink"
  >
    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
    {children}
  </Link>
);

export default BackLink;
