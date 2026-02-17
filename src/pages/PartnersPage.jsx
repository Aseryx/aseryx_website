import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ArrowUpRight, ChevronDown, Check, Shield, Database, Lock, Linkedin } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';

const PartnersPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouse);
        document.title = "Aseryx | For Data Holders";
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-brand-coral selection:text-black overflow-x-hidden">
            
            {/* Grain overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" 
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} 
            />

            {/* Floating cursor glow */}
            <div 
                className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 transition-all duration-1000 ease-out opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(235, 94, 40, 0.15) 0%, transparent 70%)', // brand-coral skew
                    left: mousePosition.x - 250,
                    top: mousePosition.y - 250,
                }}
            />

            {/* Nav */}
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <img src="/renew.png" alt="Aseryx" className="w-10 h-10 object-contain" />
                            <span className="text-lg font-medium tracking-tight">Aseryx</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link 
                            to="/"
                            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative min-h-screen flex items-center pt-32 pb-24">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/10 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 border border-brand-coral/20 text-brand-coral text-xs font-mono mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-coral opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-coral"></span>
                                </span>
                                FOR PARTNERS
                            </div>
                            
                            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight mb-8">
                                <span className="block">Monetize Your Data.</span>
                                <span className="block italic text-gray-500">Keep Full Control.</span>
                            </h1>
                            
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                You have the data AI labs need. We give you the rails to license it without taking on compliance or liability.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="https://tally.so/r/eq6aVq"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group px-8 py-4 bg-brand-coral text-black font-medium text-sm uppercase tracking-wide hover:bg-white transition-colors flex items-center justify-center gap-3"
                                >
                                    Become a Data Partner
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Visual / Stats */}
                        <div className="lg:col-span-5 relative">
                             <div className="absolute -inset-4 bg-brand-coral/20 blur-3xl opacity-20 rounded-full"></div>
                             <div className="relative border border-gray-800 bg-[#0f0f0f] p-8">
                                <div className="space-y-8">
                                    <div>
                                        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">Liability</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-white font-display">0</span>
                                            <span className="text-sm text-gray-500">Compliance risk</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-0 h-full bg-brand-coral"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">Revenue Source</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-white font-display">Compute</span>
                                            <span className="text-sm text-gray-500">per training run</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-full h-full bg-brand-coral animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">Control</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-white font-display">100%</span>
                                            <span className="text-sm text-gray-500">on-premise</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-full h-full bg-brand-coral"></div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                
            </section>

            {/* THE SHIFT */}
            <section className="py-32 px-4 md:px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-coral text-sm tracking-widest uppercase">The Shift</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                                You stay in control.<br/>
                                <span className="block italic text-gray-500">The revenue comes to you.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" delay={100}>
                            <p className="font-mono text-xs text-red-500 mb-6 uppercase tracking-wider">The Old Way</p>
                            <h3 className="text-2xl text-white mb-4">Data Brokering</h3>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li className="flex gap-3"><span className="text-red-500">×</span> Lose custody of files forever</li>
                                <li className="flex gap-3"><span className="text-red-500">×</span> One-time payment only</li>
                                <li className="flex gap-3"><span className="text-red-500">×</span> Huge compliance (GDPR) liability</li>
                                <li className="flex gap-3"><span className="text-red-500">×</span> Generic pricing, low value</li>
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-brand-coral/30 relative" delay={200}>
                            <div className="absolute top-0 right-0 p-2 bg-brand-coral text-black text-[10px] font-bold uppercase tracking-wider">The Aseryx Way</div>
                            <p className="font-mono text-xs text-brand-coral mb-6 uppercase tracking-wider">The New Way</p>
                            <h3 className="text-2xl text-white mb-4">Compute-over-Data</h3>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> You approve every access request</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> Recurring revenue per training run</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> Zero liability (verified by code)</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> Premium pricing for grounded truth</li>
                            </ul>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

             {/* PARTNER PROFILES */}
             <section className="py-32 px-4 md:px-8">
                 <div className="max-w-7xl mx-auto">
                     <h2 className="font-display text-4xl text-center mb-20 text-white">Built For</h2>
                     <div className="grid md:grid-cols-3 gap-8">
                         {/* 1. FINANCE */}
                         <ScrollReveal className="border-t border-gray-800 pt-6 group hover:border-brand-coral transition-colors" delay={100}>
                             <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono text-brand-coral border border-brand-coral/30 px-2 py-1 uppercase">Finance Focus</span>
                             </div>
                             <h3 className="text-xl text-white mb-3 group-hover:text-brand-coral transition-colors">Hedge Funds & Syndicates</h3>
                             <p className="text-gray-500 leading-relaxed text-sm">
                                Monetize proprietary deal flow, trade logs, and performance data. Prove "alpha" to AI allocators without revealing your positions or strategy.
                             </p>
                         </ScrollReveal>

                         {/* 2. HEALTHCARE */}
                         <ScrollReveal className="border-t border-gray-800 pt-6 group hover:border-brand-coral transition-colors" delay={200}>
                             <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono text-brand-coral border border-brand-coral/30 px-2 py-1 uppercase">Health Focus</span>
                             </div>
                             <h3 className="text-xl text-white mb-3 group-hover:text-brand-coral transition-colors">Clinics & Systems</h3>
                             <p className="text-gray-500 leading-relaxed text-sm">
                                Unlock dormant patient archives (Sleep, IVF, EHR). Allow MedTech AIs to train on real-world outcomes without a single file leaving your firewall.
                             </p>
                         </ScrollReveal>

                         {/* 3. ANY DATA */}
                         <ScrollReveal className="border-t border-gray-800 pt-6 group hover:border-brand-coral transition-colors" delay={300}>
                             <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono text-brand-coral border border-brand-coral/30 px-2 py-1 uppercase">Industry Agnostic</span>
                             </div>
                             <h3 className="text-xl text-white mb-3 group-hover:text-brand-coral transition-colors">Legal, Research & Industrial</h3>
                             <p className="text-gray-500 leading-relaxed text-sm">
                                Supply Chain logs? Sensor arrays? Customer sentiment? If it's high-volume and high-truth, we pipe it to the AI economy.
                             </p>
                         </ScrollReveal>
                     </div>
                 </div>
             </section>

            {/* CTA */}
            <section className="py-32 px-4 md:px-8 bg-[#050505] border-t border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-8">
                        Ready to turn your data<br />
                        <span className="italic text-brand-coral">into a revenue stream?</span>
                    </h2>
                    <p className="text-gray-500 mb-12 text-lg">Join our partner network. You keep custody. We bring the demand.</p>
                    <a 
                        href="https://tally.so/r/eq6aVq"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium hover:bg-brand-coral transition-colors"
                    >
                        Talk to our partnership team
                        <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>

            {/* FOOTER - Minimal */}
            <footer className="py-8 px-4 md:px-8 border-t border-gray-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <p className="text-gray-600 text-sm">© 2026 Aseryx</p>
                    </div>
                    <div className="flex items-center gap-8 text-sm text-gray-600">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                         <a 
                            href="https://x.com/aseryxHQ" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="hover:text-white transition-colors"
                        >
                            Twitter
                        </a>
                        <a 
                            href="https://linkedin.com/company/aseryx" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="hover:text-white transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default PartnersPage;
