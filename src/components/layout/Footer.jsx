import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { TALLY } from '../../config/tally.js';
import AseryxLogo from '../common/AseryxLogo.jsx';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { to: '/datasets', label: 'Datasets' },
      { to: '/benchmarks', label: 'Benchmarks' },
      { to: '/appraisal', label: 'Appraisal' },
      { to: '/buyers', label: 'For buyers' },
      { to: '/providers', label: 'For providers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/blog', label: 'Blog' },
      { href: '/#how-it-works', label: 'How it works' },
      { href: TALLY.appraisal, label: 'Join the beta', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Use' },
    ],
  },
  {
    title: 'Social',
    links: [
      { href: 'https://x.com/aseryxHQ', label: 'X', external: true },
      { href: 'https://linkedin.com/company/aseryx', label: 'LinkedIn', external: true },
    ],
  },
];

// min-h-10 on phones keeps each link a comfortable tap target; desktop rows stay tight.
const linkClass =
  'inline-flex min-h-10 items-center gap-1 rounded text-body text-ink-secondary transition-colors duration-150 hover:text-ink ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:min-h-0 md:py-1';

const FooterLink = ({ link }) => {
  if (link.to) {
    return (
      <Link to={link.to} className={linkClass}>
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      className={linkClass}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
      {link.external && (
        <>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only"> (opens in new tab)</span>
        </>
      )}
    </a>
  );
};

const Footer = () => (
  <footer className="border-t border-border bg-page px-6 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 py-12 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link
            to="/"
            className="inline-flex rounded hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <AseryxLogo className="h-6" />
          </Link>
          <p className="mt-4 max-w-xs text-body text-ink-secondary">
            Aseryx helps you license a dataset to an AI team. Nothing is shared until you approve.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-meta text-ink-muted">{column.title}</h2>
              <ul className="md:space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-light py-6 text-body-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Aseryx. All rights reserved.</p>
        <p>Every dataset profile is approved by its owner.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
