import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Menu, X } from 'lucide-react';

/**
 * Navigation component with scroll-based styling
 * @param {string} variant - 'enterprise' or 'individuals' to show appropriate nav items
 */
const Navigation = ({ variant = 'enterprise' }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled || isMobileMenuOpen ? 'bg-[#0a0a0a]/90 backdrop-blur-xl' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
                        <img src="/aseryx.png" alt="Aseryx" className="w-12 h-12 object-contain" />
                        <span className="text-lg font-medium tracking-tight">Aseryx</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 md:gap-6">
                    {variant === 'enterprise' ? (
                        <div className="flex items-center gap-6">
                            <Link 
                                to="/"
                                className="text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/partners"
                                className="text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                For Partners
                            </Link>
                            <a 
                                href="https://tally.so/r/gDGD7O"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Get in touch
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    ) : (
                        <Link 
                            to="/"
                            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            For Enterprises
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 p-4 flex flex-col gap-4 border-b border-gray-800 animate-fade-in">
                    {variant === 'enterprise' ? (
                        <>
                            <Link 
                                to="/" 
                                className="text-base text-gray-400 hover:text-white py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/partners" 
                                className="text-base text-gray-400 hover:text-white py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                For Partners
                            </Link>
                            <a 
                                href="https://tally.so/r/gDGD7O" 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-base text-gray-400 hover:text-white py-2 flex items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get in touch
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </>
                    ) : (
                        <Link 
                            to="/" 
                            className="text-base text-gray-400 hover:text-white py-2 flex items-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
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
