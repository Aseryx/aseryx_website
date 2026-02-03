import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

/**
 * Navigation component with scroll-based styling
 * @param {string} variant - 'enterprise' or 'individuals' to show appropriate nav items
 */
const Navigation = ({ variant = 'enterprise' }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src="/renew.png" alt="Aseryx" className="w-10 h-10 object-contain" />
                        <span className="text-lg font-medium tracking-tight">Aseryx</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    {variant === 'enterprise' ? (
                        <>
                            <Link 
                                to="/individuals"
                                className="hidden md:block text-sm text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                For Individuals
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
                        </>
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
            </div>
        </nav>
    );
};

export default Navigation;
