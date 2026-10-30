import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CTA } from '../../config/ctas.js';
import { PAGES } from '../../config/pages.js';
import { isExternal, NEW_TAB } from '../../utils/links.js';
import AseryxLogo from '../common/AseryxLogo.jsx';

const COLUMNS = [
  {
    title: 'Product',
    links: [PAGES.datasets, PAGES.benchmarks, PAGES.scorePreview, PAGES.buyers],
  },
  {
    title: 'Resources',
    links: [PAGES.blog, PAGES.howItWorks, CTA.listDataset],
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
      { href: CTA.followX.href, label: 'X' },
      { href: 'https://linkedin.com/company/aseryx', label: 'LinkedIn' },
    ],
  },
];

// min-h-10 on phones keeps each link a comfortable tap target; desktop rows stay tight.
const linkClass =
  'inline-flex min-h-10 items-center gap-1 rounded text-body text-ink-secondary transition-colors duration-150 hover:text-ink md:min-h-0 md:py-1';

const FooterLink = ({ link }) => {
  if (link.to) {
    return (
      <Link to={link.to} className={linkClass}>
        {link.label}
      </Link>
    );
  }
  // Leaving the site is read from the URL, the same way Button decides it.
  const external = isExternal(link.href);
  return (
    <a href={link.href} className={linkClass} {...(external ? NEW_TAB : {})}>
      {link.label}
      {external && (
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
            aria-label="Aseryx home"
            className="inline-flex rounded hover:opacity-80 transition-opacity"
          >
            <AseryxLogo />
          </Link>
          <p className="mt-4 max-w-xs text-body text-ink-secondary">
            Aseryx is where owners license their data to AI companies.
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
        {/* The prerender's year can be last year's: let the client correct it
            instead of failing hydration and re-rendering the whole page */}
        <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Aseryx. All rights reserved.</p>
        <p>Nothing in a profile is shared until its owner approves it.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
