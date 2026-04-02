import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer = ({ variant = 'enterprise' }) => {
    return (
        <footer className="px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#0a0a0a] grid-bg">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main footer content */}
                <div className="section-divider pt-12 md:pt-16 pb-12 md:pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">

                        {/* Column 1: Logo + Subscribe */}
                        <div className="col-span-2">
                            <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
                                <img src="/aseryx.png" alt="Aseryx" className="w-10 h-10 object-contain" width="40" height="40" />
                                <span className="text-lg font-medium tracking-tight text-[#1A1A1A] dark:text-white">Aseryx</span>
                            </Link>
                            <p className="text-sm text-[#1A1A1A] dark:text-white font-medium mb-1">Stay Up to Date</p>
                            <p className="text-sm text-[#6B7280] dark:text-gray-400 mb-6">on Data Licensing & AI Privacy</p>
                            <a
                                href="https://tally.so/r/gDGD7O"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E8E4DE] dark:border-gray-700 text-sm text-[#1A1A1A] dark:text-white hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-[#0a0a0a] transition-all"
                            >
                                Subscribe
                            </a>
                            {/* Social icons */}
                            <div className="flex items-center gap-3 mt-8">
                                <a
                                    href="https://x.com/aseryxHQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors p-2"
                                    aria-label="Follow us on X (opens in new tab)"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://linkedin.com/company/aseryx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors p-2"
                                    aria-label="Connect with us on LinkedIn (opens in new tab)"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Resources */}
                        <div>
                            <h4 className="text-sm font-medium text-[#1A1A1A] dark:text-white mb-4">Resources</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="https://tally.so/r/dWdWQq"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors inline-flex items-center gap-1"
                                    >
                                        Datasets
                                        <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </li>
                                <li>
                                    <Link to="/privacy" className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                                        Terms of Use
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: For Partners */}
                        <div>
                            <h4 className="text-sm font-medium text-[#1A1A1A] dark:text-white mb-4">For Partners</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/partners" className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                                        Data Holders
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://tally.so/r/gDGD7O"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors inline-flex items-center gap-1"
                                    >
                                        Get in Touch
                                        <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: For Builders */}
                        <div>
                            <h4 className="text-sm font-medium text-[#1A1A1A] dark:text-white mb-4">For Builders</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/buyers" className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                                        AI Builders
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://tally.so/r/dWdWQq"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors inline-flex items-center gap-1"
                                    >
                                        Explore Datasets
                                        <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@aseryx.xyz" className="text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="section-divider pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[#6B7280] dark:text-gray-500">
                        &copy; {new Date().getFullYear()} Aseryx. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="text-xs text-[#6B7280] dark:text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-xs text-[#6B7280] dark:text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
