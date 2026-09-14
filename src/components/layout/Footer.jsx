import { Link } from 'react-router-dom';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { TALLY } from '../../config/tally.js';
import AseryxLogo from '../common/AseryxLogo.jsx';
import XLogo from '../common/XLogo.jsx';

const Footer = () => (
  <footer className="px-4 md:px-8 bg-[var(--bg-primary)] grid-bg">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="section-divider pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center mb-6 hover:opacity-80 transition-opacity">
              <AseryxLogo className="h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/aseryxHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2"
                aria-label="Follow us on X (opens in new tab)"
              >
                <XLogo className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/aseryx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2"
                aria-label="Connect with us on LinkedIn (opens in new tab)"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={TALLY.appraisal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1"
                  aria-label="Launch Aseryx (opens in new tab)"
                >
                  Launch Aseryx
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="section-divider pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} Aseryx. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;