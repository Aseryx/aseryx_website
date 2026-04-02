import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, BadgeCheck } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import GrainOverlay from '../components/common/GrainOverlay.jsx';
import CursorGlow from '../components/common/CursorGlow.jsx';

const BuyersPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouse);
        document.title = "Aseryx | For AI Builders";
        return () => {
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">

            <GrainOverlay />
            <CursorGlow mousePosition={mousePosition} />

            {/* Nav */}
            <Navigation variant="enterprise" />

            {/* HERO */}
            <section id="main-content" className="relative min-h-screen flex items-center pt-32 pb-24">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#F9F8F6] dark:bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,77,0.08),transparent_50%)]" />
                    <ParticlesBackground />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                                </span>
                                FOR AI BUILDERS
                            </div>

                            <h1 className="font-display text-4xl sm:text-5xl lg:text-[clamp(3.5rem,6vw,5rem)] leading-[0.9] tracking-tight mb-8">
                                <span className="block">Data you can't get</span>
                                <span className="block italic text-[#6B7280] dark:text-gray-400">anywhere else.</span>
                            </h1>

                            <p className="text-[#6B7280] dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                Public datasets are in every model. Synthetic data fails in production. This is neither.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://tally.so/r/dWdWQq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group px-8 py-4 bg-white text-black font-medium text-sm uppercase tracking-wide hover:bg-brand-orange transition-colors flex items-center justify-center gap-3"
                                >
                                    Request Access to Datasets
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Trust indicators */}
                            <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-orange" />
                                    <span>Provenance guaranteed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-orange" />
                                    <span>Quality scored (0–100)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-orange" />
                                    <span>Built for GDPR, HIPAA, EU AI Act</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual / Quality Certificate */}
                        <div className="lg:col-span-5 relative">
                            <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl opacity-20 rounded-full"></div>
                            <div className="relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f0f0f] p-8">
                                <p className="font-mono text-[10px] text-[#6B7280] dark:text-gray-500 uppercase tracking-widest mb-6">Quality Certificate</p>
                                <div className="flex items-end gap-3 mb-8">
                                    <span className="font-display text-7xl text-[#1A1A1A] dark:text-white leading-none">87</span>
                                    <div className="pb-1">
                                        <p className="text-[#6B7280] dark:text-gray-400 text-xs font-mono">/ 100</p>
                                        <p className="text-green-400 text-xs font-mono mt-1">VERIFIED</p>
                                    </div>
                                </div>
                                {[
                                    { label: 'Completeness', score: 92 },
                                    { label: 'Uniqueness', score: 88 },
                                    { label: 'Accuracy', score: 85 },
                                    { label: 'Timeliness', score: 79 },
                                ].map((d) => (
                                    <div key={d.label} className="mb-4">
                                        <div className="flex justify-between mb-1.5">
                                            <span className="text-[10px] font-mono text-[#6B7280] dark:text-gray-500 uppercase tracking-wider">{d.label}</span>
                                            <span className="text-[10px] font-mono text-[#4B5563] dark:text-gray-400">{d.score}</span>
                                        </div>
                                        <div className="w-full h-px bg-gray-200 dark:bg-gray-800">
                                            <div className="h-full bg-brand-orange transition-all" style={{ width: `${d.score}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-[#6B7280] dark:text-gray-500">Institutional · Finance</span>
                                    <span className="text-[10px] font-mono text-green-400 flex items-center gap-1.5">
                                        <BadgeCheck className="w-3 h-3" /> Proof on-chain
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PROBLEM */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">The Problem</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                                The data quality gap<br/>
                                <span className="block italic text-[#6B7280] dark:text-gray-400">is a competitive gap.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal className="bg-white dark:bg-[#0f0f0f] p-8 border border-gray-200 dark:border-gray-800" delay={100}>
                            <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">Public Datasets</p>
                            <h3 className="text-xl text-[#1A1A1A] dark:text-white mb-3">Contaminated</h3>
                            <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                Your training data is already in every other model. No competitive advantage. No differentiation.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal className="bg-white dark:bg-[#0f0f0f] p-8 border border-gray-200 dark:border-gray-800" delay={200}>
                            <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">Synthetic Data</p>
                            <h3 className="text-xl text-[#1A1A1A] dark:text-white mb-3">Artificial</h3>
                            <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                Generated patterns don't match real-world complexity. Your models fail in production.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal className="bg-white dark:bg-[#0f0f0f] p-8 border border-brand-orange/30 dark:border-brand-orange/40" delay={300}>
                            <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">Institutional Data</p>
                            <h3 className="text-xl text-[#1A1A1A] dark:text-white mb-3">Verified & Real</h3>
                            <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                Institutional data. Authenticity checked. Quality scored. Now accessible.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* LIVE EXAMPLES */}
            <section className="py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">What You Can Access</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                                Verified datasets.<br/>
                                <span className="italic text-[#6B7280] dark:text-gray-400">Proven quality.</span>
                            </h2>
                        </div>
                    </div>

                    <div>
                        {[
                            { category: 'Finance', title: 'Fund Performance', description: 'Prove 3-year returns >20% without revealing current positions or firm identity.', tags: ['Trade Logs', 'NAV'] },
                            { category: 'Finance', title: 'Fraud Patterns', description: 'Train on 50M+ verified fraud events without accessing transaction ledgers.', tags: ['Tx Data', 'KYC'] },
                            { category: 'Health', title: "Women's Health", description: 'Cycle patterns across 10K+ users. Zero medical records exposed.', tags: ['Cycle Logs', 'Symptoms'] },
                            { category: 'Health', title: 'Sleep Quality', description: 'Correlate apnea events with medication use. Verified without records leaving the clinic.', tags: ['Wearables', 'Clinical'] },
                        ].map((d, i) => (
                            <ScrollReveal key={i} delay={i * 100} className="group grid grid-cols-12 gap-4 md:gap-8 items-baseline border-t border-gray-200 dark:border-gray-800 py-8 hover:bg-[#0f0f0f]/40 transition-colors">
                                <span className="col-span-2 md:col-span-1 font-mono text-xs text-brand-orange uppercase tracking-wider">{d.category}</span>
                                <div className="col-span-10 md:col-span-3">
                                    <h3 className="text-lg text-[#1A1A1A] dark:text-white group-hover:text-brand-orange transition-colors">{d.title}</h3>
                                </div>
                                <p className="col-span-12 md:col-span-6 text-[#6B7280] dark:text-gray-500 text-sm leading-relaxed">{d.description}</p>
                                <div className="col-span-12 md:col-span-2 flex gap-2 md:justify-end">
                                    {d.tags.map(t => <span key={t} className="text-[#6B7280] dark:text-gray-600 text-[10px] border border-gray-200 dark:border-gray-800 px-2 py-1">{t}</span>)}
                                </div>
                            </ScrollReveal>
                        ))}
                        <div className="border-b border-gray-200 dark:border-gray-800"></div>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="https://tally.so/r/dWdWQq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm font-medium"
                        >
                            Request Dataset Access
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">How It Works</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                                Prove quality.<br/>
                                <span className="italic text-[#6B7280] dark:text-gray-400">Never move the data.</span>
                            </h2>
                        </div>
                    </div>

                    <div>
                        <ScrollReveal delay={100} className="group flex gap-8 md:gap-16 border-t border-gray-200 dark:border-gray-800 py-10 md:py-14 hover:bg-[#0f0f0f]/30 transition-colors">
                            <span className="font-mono text-[4rem] md:text-[6rem] leading-none text-gray-200 dark:text-gray-800 group-hover:text-brand-orange/15 transition-colors w-24 md:w-40 shrink-0 select-none">01</span>
                            <div className="flex-1 pt-3 md:pt-6">
                                <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-3">Request Data</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed max-w-xl">Submit your requirements, or browse existing verified datasets from institutional partners.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200} className="group flex gap-8 md:gap-16 border-t border-gray-200 dark:border-gray-800 py-10 md:py-14 hover:bg-[#0f0f0f]/30 transition-colors">
                            <span className="font-mono text-[4rem] md:text-[6rem] leading-none text-brand-orange/25 group-hover:text-brand-orange/50 transition-colors w-24 md:w-40 shrink-0 select-none">02</span>
                            <div className="flex-1 pt-3 md:pt-6">
                                <p className="text-[10px] font-mono text-brand-orange uppercase tracking-widest mb-3">Key Step</p>
                                <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-3">Verify Quality</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed max-w-xl">Mathematical proofs confirm completeness, diversity, and statistical power. No raw data is ever exposed.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={300} className="group flex gap-8 md:gap-16 border-t border-b border-gray-200 dark:border-gray-800 py-10 md:py-14 hover:bg-[#0f0f0f]/30 transition-colors">
                            <span className="font-mono text-[4rem] md:text-[6rem] leading-none text-gray-200 dark:text-gray-800 group-hover:text-brand-orange/15 transition-colors w-24 md:w-40 shrink-0 select-none">03</span>
                            <div className="flex-1 pt-3 md:pt-6">
                                <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-3">License & Use</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed max-w-xl">Pay and receive a verified license. Data stays with the source. You get confirmed access for your use case.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505] border-t border-gray-200 dark:border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-8">
                        The edge is not in the architecture.<br/>
                        <span className="italic text-brand-orange">It's in the data.</span>
                    </h2>
                    <p className="text-[#6B7280] dark:text-gray-400 mb-12 text-lg max-w-xl mx-auto">
                        Access verified institutional data that no other model has trained on.
                    </p>
                    <a
                        href="https://tally.so/r/dWdWQq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium hover:bg-brand-orange transition-colors"
                    >
                        Request Access to Datasets
                        <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer variant="enterprise" />

        </div>
    );
};

export default BuyersPage;
