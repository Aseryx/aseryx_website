import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

/**
 * Footer component with social links and navigation
 * @param {string} variant - 'enterprise' or 'individuals' to show appropriate links
 */
const Footer = ({ variant = 'enterprise' }) => {
    return (
        <footer className="py-6 md:py-8 px-4 md:px-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <p className="text-gray-600 text-sm">© 2025 Aseryx</p>
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://x.com/aseryxHQ" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-gray-600 hover:text-white transition-colors"
                            aria-label="Twitter"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a 
                            href="https://linkedin.com/company/aseryx" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-gray-600 hover:text-white transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-sm text-gray-600">
                    {variant === 'enterprise' ? (
                        <Link to="/partners" className="hover:text-white transition-colors">For Partners</Link>
                    ) : (
                        <Link to="/" className="hover:text-white transition-colors">For Enterprises</Link>
                    )}
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
