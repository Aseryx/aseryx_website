import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import AseryxLogo from '../common/AseryxLogo.jsx';
import CtaButton from '../common/CtaButton.jsx';
import { PAGES } from '../../config/pages.js';

// Centre: what you can look at, in reading order. Right: the two audience
// doors, AI companies as a link and owners as the one filled button.
const NAV_LINKS = [PAGES.datasets, PAGES.benchmarks, PAGES.scorePreview, PAGES.blog];

const BUYERS_LINK = PAGES.buyers;

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
    // A reload can restore the page already scrolled, before any scroll event.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuFirstLinkRef.current) {
      mobileMenuFirstLinkRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  // While the phone menu is open: Escape closes it and hands focus back to
  // its button, and Tab cycles through that button and the menu.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = [
        mobileMenuButtonRef.current,
        ...document.querySelectorAll('#mobile-menu a, #mobile-menu button'),
      ].filter(Boolean);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // The active page gets full ink and a short coral underline (coral marks
  // active states in the design system); the rest use the softened nav ink.
  const linkClass = (path) =>
    `relative px-3 py-2 text-button-md transition-colors duration-150 hover:bg-hover hover:text-ink rounded-lg ${
      isActive(path)
        ? 'text-ink after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand'
        : 'text-ink-soft'
    }`;

  const navLink = (link) => (
    <Link
      key={link.to}
      to={link.to}
      className={linkClass(link.to)}
      aria-current={isActive(link.to) ? 'page' : undefined}
    >
      {link.label}
    </Link>
  );

  const themeLabel = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-40 bg-nav backdrop-blur-xl border-b transition-colors duration-300 ${
        scrolled || isMobileMenuOpen ? 'border-border' : 'border-transparent'
      }`}
    >
      {/* Always on its own surface: over the hero's video and grid, links on a
          see-through bar dropped to about 3.7:1 in dark mode. */}
      {/* Large screens: three columns, the outer two equal, so the links sit
          in the true centre of the bar whatever the logo and actions measure. */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-[72px] flex items-center gap-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          aria-label="Aseryx home"
          className="flex shrink-0 items-center justify-self-start rounded-lg hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          <AseryxLogo />
        </Link>

        <div className="hidden lg:flex items-center gap-1">{NAV_LINKS.map(navLink)}</div>

        <div className="hidden lg:flex items-center justify-self-end gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-ink-soft hover:text-ink hover:bg-hover transition-colors duration-150 rounded-lg"
            aria-label={themeLabel}
          >
            <ThemeIcon className="w-4 h-4" />
          </button>
          <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
          {navLink(BUYERS_LINK)}
          <CtaButton action="listDataset" size="sm" className="ml-1" />
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="ml-auto lg:hidden p-2.5 -mr-2.5 text-ink transition-colors rounded-lg"
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
          {[...NAV_LINKS, BUYERS_LINK].map((link, i) => (
            <Link
              key={link.to}
              ref={i === 0 ? mobileMenuFirstLinkRef : undefined}
              to={link.to}
              className={`flex items-center justify-between py-3 text-base border-b border-border-light rounded-lg ${
                isActive(link.to) ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
              }`}
              aria-current={isActive(link.to) ? 'page' : undefined}
              onClick={closeMenu}
            >
              {link.label}
              {isActive(link.to) && <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />}
            </Link>
          ))}
          <div className="mt-5 grid">
            <CtaButton action="listDataset" onClick={closeMenu} />
          </div>
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            className={`mt-3 self-start py-2 text-body-sm text-ink-soft hover:text-ink flex items-center gap-2 rounded-lg`}
          >
            <ThemeIcon className="w-4 h-4" aria-hidden="true" />
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
