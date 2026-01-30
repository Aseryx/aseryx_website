import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronDown, Twitter, Linkedin } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';

const IndividualsPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [manifestoExpanded, setManifestoExpanded] = useState(false);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouse);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-black overflow-x-hidden">
            
            {/* Grain overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" 
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} 
            />

            {/* Floating cursor glow */}
            <div 
                className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 transition-all duration-1000 ease-out opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(252,95,43,0.15) 0%, transparent 70%)',
                    left: mousePosition.x - 250,
                    top: mousePosition.y - 250,
                }}
            />

            {/* Nav */}
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl' : ''}`}>
                <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
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
                            For Enterprises
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative min-h-screen flex items-center pt-32 pb-24">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/5 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-gray-400 text-xs font-mono mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                                </span>
                                FOR INDIVIDUALS
                            </div>
                            
                            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-tight mb-8">
                                <span className="block">The Swiss Bank</span>
                                <span className="block italic text-brand-orange">for your biology.</span>
                            </h1>
                            
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                                Own your health data. Control who sees it. 
                                Get compensated when you share.
                            </p>
                            
                            <a 
                                href="https://tally.so/r/mVRjjM"
                                target="_blank"
                                rel="noreferrer"
                                className="group px-6 py-4 bg-white text-black font-medium rounded-none hover:bg-brand-orange transition-colors flex items-center gap-3 btn-lift"
                            >
                                Join the waitlist
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-1 gap-px bg-gray-900">
                            {[
                                { title: "Unify", desc: "Oura, Apple Health, labs, genetics—one vault" },
                                { title: "Control", desc: "Grant and revoke access with one click" },
                                { title: "Earn", desc: "License your data. Keep 80%." }
                            ].map((item, i) => (
                                <ScrollReveal key={i} className="p-8 bg-[#0a0a0a] group hover:bg-[#111] transition-colors" delay={i * 150}>
                                    <h4 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">{item.title}</h4>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-gray-600 text-xs font-mono uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-5 h-5 text-gray-600 animate-scroll-indicator" />
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-32 px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">How It Works</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                                Your data. Your rules.
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                step: "01", 
                                title: "Connect your sources", 
                                desc: "Sync wearables, lab results, EHRs, and genetic data into your encrypted vault." 
                            },
                            { 
                                step: "02", 
                                title: "Control access", 
                                desc: "Decide exactly who can see what. Grant and revoke permissions instantly." 
                            },
                            { 
                                step: "03", 
                                title: "Earn from research", 
                                desc: "License your anonymized data to researchers. Keep 80% of the value." 
                            }
                        ].map((item, i) => (
                            <ScrollReveal key={i} className="relative group" delay={i * 150}>
                                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange via-brand-coral to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="pl-6 py-4">
                                    <p className="font-mono text-brand-orange text-xs mb-4">{item.step}</p>
                                    <h3 className="font-display text-xl text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* MANIFESTO */}
            <section className="py-32 px-8 border-t border-gray-900">
                <div className="max-w-4xl mx-auto">
                    <blockquote className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-center">
                        "Your body is the last unowned territory on earth.
                        <span className="text-gray-600"> The data it produces is worth billions. You receive nothing.</span>"
                    </blockquote>
                    <div className="mt-12 text-center">
                        <button 
                            onClick={() => setManifestoExpanded(!manifestoExpanded)}
                            className="font-mono text-brand-orange text-sm hover:underline"
                        >
                            {manifestoExpanded ? '— Close manifesto' : '+ Read our manifesto'}
                        </button>
                    </div>
                    {manifestoExpanded && (
                        <div className="mt-12 pt-12 border-t border-gray-900">
                            <div className="prose prose-invert prose-lg max-w-none space-y-6">
                                <p className="text-gray-400">Health data must become programmable property.</p>
                                <p className="text-gray-400">When data is property, the individual becomes sovereign over their own biology. AI laboratories receive consented, longitudinal, high-resolution human truth. Medicine escapes the tragedy of the commons.</p>
                                <p className="text-brand-orange font-medium">This is not a company. It is the infrastructure layer for the biological century.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-7xl leading-[0.85] tracking-tight mb-12">
                        Ready to own
                        <br />
                        <span className="italic text-brand-orange">your biology?</span>
                    </h2>
                    <a 
                        href="https://tally.so/r/mVRjjM"
                        target="_blank"
                        rel="noreferrer"
                        className="group px-8 py-5 bg-white text-black text-lg font-medium rounded-none hover:bg-brand-orange transition-colors inline-flex items-center gap-3 btn-lift"
                    >
                        Join the waitlist
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 px-8 border-t border-gray-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <p className="text-gray-600 text-sm">© 2025 Aseryx</p>
                        <div className="flex items-center gap-4">
                            <a href="https://x.com/aseryxHQ" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-white transition-colors">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com/company/aseryx" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-white transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm text-gray-600">
                        <Link to="/" className="hover:text-white transition-colors">For Enterprises</Link>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </footer>


        </div>
    );
};

export default IndividualsPage;
