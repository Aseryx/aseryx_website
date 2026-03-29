import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';

/**
 * Footer component with social links and navigation
 * @param {string} variant - 'enterprise' or 'individuals' to show appropriate links
 */
const Footer = ({ variant = 'enterprise' }) => {
    return (
        <footer className="py-6 md:py-8 px-4 md:px-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <p className="text-gray-400 text-sm">© 2026 Aseryx</p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://x.com/aseryxHQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Follow us on X (opens in new tab)"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/company/aseryx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Connect with us on LinkedIn (opens in new tab)"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-sm text-gray-400">
                    {variant === 'enterprise' ? (
                        <Link to="/partners" className="hover:text-white transition-colors">For Partners</Link>
                    ) : (
                        <Link to="/" className="hover:text-white transition-colors">For Enterprises</Link>
                    )}
                    <a href="mailto:info@aseryx.xyz" className="hover:text-white transition-colors" aria-label="Contact us via email">Contact</a>
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
