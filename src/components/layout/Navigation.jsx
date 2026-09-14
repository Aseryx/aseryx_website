import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { TALLY } from '../../config/tally.js';
import AseryxLogo from '../common/AseryxLogo.jsx';

const focusRing = 'focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] rounded';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
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

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

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
    `text-sm transition-colors ${focusRing} px-2 py-1 ${
      isActive(path)
        ? 'text-[var(--text-primary)] font-medium'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
    }`;

  const mobileLinkClass = (path) =>
    `text-base transition-colors ${focusRing} px-2 py-2 ${
      isActive(path)
        ? 'text-[var(--text-primary)] font-medium'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled || isMobileMenuOpen ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[var(--border-color)]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
        <Link to="/" className={`flex items-center hover:opacity-80 transition-opacity ${focusRing}`} onClick={() => setIsMobileMenuOpen(false)}>
          <AseryxLogo className="h-6 md:h-7" />
        </Link>

        <div className="hidden md:flex items-center gap-4 md:gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.label}
            </Link>
          ))}
          <a
            href={LAUNCH_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${focusRing} px-2 py-1`}
            aria-label="Launch Aseryx (opens in new tab)"
          >
            Launch Aseryx
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${focusRing} p-2`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          className={`md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${focusRing} p-2`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)] border-t border-[var(--border-color)] border-b border-[var(--border-color)] p-4 flex flex-col gap-2 mobile-menu-animate" role="menu">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              ref={i === 0 ? mobileMenuFirstLinkRef : undefined}
              to={link.to}
              className={mobileLinkClass(link.to)}
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={LAUNCH_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 flex items-center gap-2 ${focusRing} px-2`}
            onClick={() => setIsMobileMenuOpen(false)}
            role="menuitem"
            aria-label="Launch Aseryx (opens in new tab)"
          >
            Launch Aseryx
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
            className={`text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 flex items-center gap-2 ${focusRing} px-2`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};
export default Navigation;
