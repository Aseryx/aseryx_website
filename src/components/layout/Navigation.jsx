import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navigation = ({ variant = 'enterprise' }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuButtonRef = useRef(null);
    const mobileMenuFirstLinkRef = useRef(null);
    const { theme, toggleTheme } = useTheme();

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
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };
        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isMobileMenuOpen]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled || isMobileMenuOpen ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#E8E4DE] dark:border-gray-800' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded" onClick={() => setIsMobileMenuOpen(false)}>
                        <img src="/aseryx.png" alt="Aseryx" className="w-12 h-12 object-contain" width="48" height="48" />
                        <span className="text-lg font-medium tracking-tight text-[#1A1A1A] dark:text-white">Aseryx</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4 md:gap-6">
                    {variant === 'enterprise' ? (
                        <div className="flex items-center gap-6">
                            <Link to="/" className="text-sm text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2 py-1">
                                Home
                            </Link>
                            <Link to="/partners" className="text-sm text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2 py-1">
                                For Partners
                            </Link>
                            <Link to="/buyers" className="text-sm text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2 py-1">
                                For AI Builders
                            </Link>
                            <a
                                href="https://tally.so/r/gDGD7O"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2 py-1"
                                aria-label="Get in touch (opens in new tab)"
                            >
                                Get in touch
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded p-2"
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    ) : (
                        <Link to="/" className="group flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2 py-1">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            For Enterprises
                        </Link>
                    )}
                </div>

                <button
                    ref={mobileMenuButtonRef}
                    className="md:hidden text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-[#F9F8F6] dark:bg-[#0a0a0a] border-t border-[#E8E4DE] dark:border-gray-800 border-b border-[#E8E4DE] dark:border-gray-800 p-4 flex flex-col gap-4 mobile-menu-animate" role="menu">
                    {variant === 'enterprise' ? (
                        <>
                            <Link ref={mobileMenuFirstLinkRef} to="/" className="text-base text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">
                                Home
                            </Link>
                            <Link to="/partners" className="text-base text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">
                                For Partners
                            </Link>
                            <Link to="/buyers" className="text-base text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">
                                For AI Builders
                            </Link>
                            <a href="https://tally.so/r/gDGD7O" target="_blank" rel="noopener noreferrer" className="text-base text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white py-2 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2" onClick={() => setIsMobileMenuOpen(false)} role="menuitem" aria-label="Get in touch (opens in new tab)">
                                Get in touch
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                                className="text-base text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white py-2 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2"
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </>
                    ) : (
                        <Link ref={mobileMenuFirstLinkRef} to="/" className="text-base text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white py-2 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a] rounded px-2" onClick={() => setIsMobileMenuOpen(false)} role="menuitem">
                            <ArrowLeft className="w-4 h-4" />
                            For Enterprises
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
