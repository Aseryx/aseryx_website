import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { TALLY } from '../../config/tally.js';
import AseryxLogo from '../common/AseryxLogo.jsx';
import Button from '../common/Button.jsx';

const focusRing =
  'rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page';

const NAV_LINKS = [
  { to: '/datasets', label: 'Datasets' },
  { to: '/benchmarks', label: 'Benchmarks' },
  { to: '/buyers', label: 'For buyers' },
  { to: '/appraisal', label: 'Appraisal' },
  { to: '/blog', label: 'Blog' },
];

/** Primary product door href on this branch (no separate app URL yet). */
const LAUNCH_HREF = TALLY.appraisal;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef(null);
  const mobileMenuFirstLinkRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);
  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuFirstLinkRef.current) {
      mobileMenuFirstLinkRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      const focusableElements = document.querySelectorAll('#mobile-menu a, #mobile-menu button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMobileMenuOpen]);

  const linkClass = (path) =>
    `px-3 py-2 text-button-md transition-colors duration-150 hover:bg-hover ${focusRing} ${
      isActive(path) ? 'text-ink' : 'text-ink-secondary hover:text-ink'
    }`;

  const themeLabel = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled || isMobileMenuOpen ? 'bg-nav backdrop-blur-xl border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-[72px] flex items-center justify-between gap-6">
        <Link to="/" className={`flex items-center hover:opacity-80 transition-opacity ${focusRing}`} onClick={closeMenu}>
          <AseryxLogo className="h-6" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkClass(link.to)}
              aria-current={isActive(link.to) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 text-ink-secondary hover:text-ink hover:bg-hover transition-colors duration-150 ${focusRing}`}
            aria-label={themeLabel}
          >
            <ThemeIcon className="w-4 h-4" />
          </button>
          <Button to="/providers" variant="standard" size="sm">
            Become a provider
          </Button>
          <Button href={LAUNCH_HREF} size="sm">
            Join the beta
          </Button>
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          className={`lg:hidden p-2.5 -mr-2.5 text-ink-secondary hover:text-ink transition-colors ${focusRing}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 bg-page border-b border-border px-6 pt-2 pb-6 flex flex-col mobile-menu-animate"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              ref={i === 0 ? mobileMenuFirstLinkRef : undefined}
              to={link.to}
              className={`py-3 text-base border-b border-border-light ${focusRing} ${
                isActive(link.to) ? 'text-ink' : 'text-ink-secondary hover:text-ink'
              }`}
              aria-current={isActive(link.to) ? 'page' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            className={`py-3 text-base text-ink-secondary hover:text-ink flex items-center gap-2 ${focusRing}`}
          >
            <ThemeIcon className="w-4 h-4" aria-hidden="true" />
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button to="/providers" variant="standard" onClick={closeMenu}>
              Become a provider
            </Button>
            <Button href={LAUNCH_HREF} onClick={closeMenu}>
              Join the beta
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
