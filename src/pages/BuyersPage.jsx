import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check, BadgeCheck } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import { AppraisalCertificate } from '../components/common/AppraisalCertificate.jsx';
import { GeometricShield, GeometricCube, GeometricLattice } from '../components/common/GeometricIllustrations.jsx';

const BuyersPage = () => {
    useEffect(() => {
        document.title = "Aseryx | For AI Builders";
    }, []);

    return (
        <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">

            {/* Nav */}
            <Navigation variant="enterprise" />

            {/* HERO */}
            <section id="main-content" className="relative min-h-screen flex items-center pt-32 pb-24 grid-bg">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#F9F8F6] dark:bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,77,0.08),transparent_50%)]" />
                    <ParticlesBackground />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                                </span>
                                FOR AI BUILDERS
                            </div>

                            <h1 className="font-display text-4xl sm:text-5xl lg:text-[clamp(3rem,5vw,4.5rem)] leading-[0.9] tracking-tight mb-8">
                                <span className="block">Rich Datasets,</span>
                                <span className="block italic text-brand-orange">Verified for AI.</span>
                            </h1>

                            <p className="text-[#6B7280] dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                Access cryptographically verified institutional datasets. Train your models on pristine, high-value data, without risks.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://tally.so/r/dWdWQq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group px-8 py-4 bg-brand-orange text-black font-medium text-sm uppercase tracking-wide hover:bg-white transition-colors flex items-center justify-center gap-3"
                                >
                                    Request Access to Datasets
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Trust indicators */}
                            <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-orange" />
                                    <span>Cryptographically verified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-orange" />
                                    <span>Zero custody enforced</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-orange" />
                                    <span>11+ quality dimensions</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual / Quality Certificate */}
                        <div className="lg:col-span-7 relative">
                            <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl opacity-20 rounded-full"></div>
                            <div className="relative">
                                <AppraisalCertificate />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== RISK REVERSAL BAND ===== */}
            <section className="py-5 px-4 md:px-8 border-y border-[#E8E4DE] dark:border-[#1F2937] bg-[#F3F1EE] dark:bg-[#0f0f0f]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                            <span className="text-xs font-mono text-[#6B7280] dark:text-gray-400 tracking-wide">Prove a dataset meets your quality threshold without exposing its contents.</span>
                        </div>
                        <span className="hidden sm:block w-px h-4 bg-[#D1D5DB] dark:bg-gray-700" />
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                            <span className="text-xs font-mono text-[#6B7280] dark:text-gray-400 tracking-wide">Data never leaves the institution. Zero custody risk.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PROBLEM */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505] grid-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16 section-divider pt-8">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase">The Problem</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                                The data quality gap<br/>
                                <span className="block italic text-[#6B7280] dark:text-gray-400">is a competitive gap.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-6 md:gap-8">
                        {/* Left Column: The Problem */}
                        <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
                            <ScrollReveal delay={100} className="flex-1">
                                <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-[#E8E4DE] dark:border-[#1F2937] p-6 md:p-8">
                                    <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">01 / Public Datasets</p>
                                    <h3 className="font-display text-2xl text-[#1A1A1A] dark:text-white mb-3">Exhausted</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-8">
                                        Your training data is already in every other model. No competitive advantage. No differentiation.
                                    </p>
                                    <div className="mt-auto flex justify-end grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100">
                                        <GeometricLattice className="w-24 h-24 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={200} className="flex-1">
                                <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis-alt overflow-hidden border border-[#E8E4DE] dark:border-[#1F2937] p-6 md:p-8">
                                    <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">02 / Synthetic Data</p>
                                    <h3 className="font-display text-2xl text-[#1A1A1A] dark:text-white mb-3">Artificial</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-8">
                                        Generated patterns don't match real-world complexity. Your models fail in production.
                                    </p>
                                    <div className="mt-auto flex justify-end grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100">
                                        <GeometricCube className="w-24 h-24 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right Column: The Solution */}
                        <div className="md:col-span-7">
                            <ScrollReveal delay={300} className="h-full">
                                <div className="group h-full flex flex-col bg-brand-orange text-black overflow-hidden border border-brand-orange p-8 md:p-12 lg:p-16 relative card-oasis">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                                        <GeometricShield className="w-[28rem] h-[28rem] text-black" />
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full">
                                        <p className="font-mono text-sm text-black/60 mb-8 uppercase tracking-wider font-bold">03 / Institutional Data</p>
                                        <h3 className="font-display text-4xl md:text-5xl lg:text-[4rem] mb-6 leading-[1.05] tracking-tight max-w-sm">Cryptographically Verified.</h3>
                                        <p className="text-black/80 text-lg md:text-xl font-medium leading-relaxed max-w-sm mb-12">
                                            Zero custody. 11+ dimension quality scores. Accessible exclusively through verifiable channels.
                                        </p>
                                        
                                        <div className="mt-auto">
                                            <a href="https://tally.so/r/dWdWQq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-black text-brand-orange text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                                                Request Access
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIVE EXAMPLES */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#0a0a0a] grid-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16 section-divider pt-8">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase">What You Can Access</p>
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
                            { category: 'BioTech', title: 'Genomic Sequence Modeling', description: 'Access diverse, cryptographically verified genetic variants without transferring raw patient DNA records.', tags: ['Variants', 'Sequences'] },
                            { category: 'Fintech', title: 'Algorithmic Fraud Detection', description: 'Train on 50M+ verified fraud events. Zero custody ensures no raw PII or transaction histories are exposed.', tags: ['Ledgers', 'Anomalies'] },
                            { category: 'Supply', title: 'Cost Engine Modeling', description: 'Optimize pricing engines using proprietary enterprise freight data, verified via ZK proofs.', tags: ['Freight', 'Pricing'] },
                            { category: 'Quant', title: 'HFT Alpha', description: 'Backtest against institutional order book data. Quality scored across 11+ dimensions before you commit.', tags: ['Order Book', 'L2 Data'] },
                        ].map((d, i) => (
                            <ScrollReveal key={i} delay={i * 100} className="group grid grid-cols-12 gap-4 md:gap-8 items-baseline border-t border-gray-200 dark:border-gray-800 py-8 hover:bg-gray-100/40 dark:hover:bg-[#0f0f0f]/40 transition-colors">
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
                            className="inline-flex items-center gap-2 text-brand-orange hover:text-[#1A1A1A] dark:hover:text-white transition-colors text-sm font-medium"
                        >
                            Request Dataset Access
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505] grid-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16 section-divider pt-8">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase">How It Works</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                                Prove quality.<br/>
                                <span className="italic text-[#6B7280] dark:text-gray-400">Never move the data.</span>
                            </h2>
                        </div>
                    </div>

                    <div>
                        <ScrollReveal delay={100} className="group flex gap-8 md:gap-16 border-t border-gray-200 dark:border-gray-800 py-10 md:py-14 hover:bg-gray-100/30 dark:hover:bg-[#0f0f0f]/30 transition-colors">
                            <span className="font-mono text-[4rem] md:text-[6rem] leading-none text-gray-200 dark:text-gray-800 group-hover:text-brand-orange/15 transition-colors w-24 md:w-40 shrink-0 select-none">01</span>
                            <div className="flex-1 pt-3 md:pt-6">
                                <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-3">Request Data</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed max-w-xl">Submit your requirements, or browse existing verified datasets from institutional partners.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200} className="group flex gap-8 md:gap-16 border-t border-gray-200 dark:border-gray-800 py-10 md:py-14 hover:bg-gray-100/30 dark:hover:bg-[#0f0f0f]/30 transition-colors">
                            <span className="font-mono text-[4rem] md:text-[6rem] leading-none text-brand-orange/25 group-hover:text-brand-orange/50 transition-colors w-24 md:w-40 shrink-0 select-none">02</span>
                            <div className="flex-1 pt-3 md:pt-6">
                                <p className="text-[10px] font-mono text-brand-orange uppercase tracking-widest mb-3">Key Step</p>
                                <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-3">Verify Quality</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed max-w-xl">Define your quality criteria. The protocol checks every record against your requirements and returns a verified result. No raw data is ever exposed.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={300} className="group flex gap-8 md:gap-16 border-t border-b border-gray-200 dark:border-gray-800 py-10 md:py-14 hover:bg-gray-100/30 dark:hover:bg-[#0f0f0f]/30 transition-colors">
                            <span className="font-mono text-[4rem] md:text-[6rem] leading-none text-gray-200 dark:text-gray-800 group-hover:text-brand-orange/15 transition-colors w-24 md:w-40 shrink-0 select-none">03</span>
                            <div className="flex-1 pt-3 md:pt-6">
                                <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-3">Access & Use</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed max-w-xl">Pay and receive verified access. Data stays with the source. You get confirmed quality for your use case.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">FAQ</p>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                            Common <span className="italic text-[#6B7280] dark:text-gray-400">questions</span>
                        </h2>
                    </div>

                    <div className="border-t-2 border-[#1A1A1A] dark:border-[#333]">
                        <ScrollReveal delay={100}>
                            <details className="group border-b border-[#E8E4DE] dark:border-[#1F2937] [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
                                <summary className="font-display text-xl md:text-2xl lg:text-3xl text-[#1A1A1A] dark:text-white cursor-pointer list-none flex justify-between items-center py-6 md:py-8 hover:text-brand-orange transition-colors">
                                    <span className="max-w-3xl pr-8 leading-tight">How do I know the data meets my requirements?</span>
                                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8E4DE] dark:border-[#1F2937] flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    </span>
                                </summary>
                                <div className="pb-10 text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
                                    Every dataset on Aseryx goes through a two-layer verification. The first layer checks provenance and readiness. The second scores information richness across 11+ dimensions. You see the full verified breakdown before committing any budget.
                                </div>
                            </details>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <details className="group border-b border-[#E8E4DE] dark:border-[#1F2937] [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
                                <summary className="font-display text-xl md:text-2xl lg:text-3xl text-[#1A1A1A] dark:text-white cursor-pointer list-none flex justify-between items-center py-6 md:py-8 hover:text-brand-orange transition-colors">
                                    <span className="max-w-3xl pr-8 leading-tight">Can I evaluate data quality before I pay?</span>
                                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8E4DE] dark:border-[#1F2937] flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    </span>
                                </summary>
                                <div className="pb-10 text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
                                    Yes. The appraisal certificate and richness score are available before any transaction. You see proof that the dataset meets a defined quality threshold without the institution exposing its contents.
                                </div>
                            </details>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <details className="group border-b border-[#E8E4DE] dark:border-[#1F2937] [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
                                <summary className="font-display text-xl md:text-2xl lg:text-3xl text-[#1A1A1A] dark:text-white cursor-pointer list-none flex justify-between items-center py-6 md:py-8 hover:text-brand-orange transition-colors">
                                    <span className="max-w-3xl pr-8 leading-tight">How can I trust the quality score without seeing the raw data?</span>
                                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8E4DE] dark:border-[#1F2937] flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    </span>
                                </summary>
                                <div className="pb-10 text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
                                    The score is not a self-reported claim. It is the output of a verification protocol that either passes or fails. You verify the proof, not the data. The result is deterministic and independently reproducible.
                                </div>
                            </details>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <details className="group border-b border-[#E8E4DE] dark:border-[#1F2937] [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
                                <summary className="font-display text-xl md:text-2xl lg:text-3xl text-[#1A1A1A] dark:text-white cursor-pointer list-none flex justify-between items-center py-6 md:py-8 hover:text-brand-orange transition-colors">
                                    <span className="max-w-3xl pr-8 leading-tight">What if I need to verify something the standard appraisal does not cover?</span>
                                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8E4DE] dark:border-[#1F2937] flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    </span>
                                </summary>
                                <div className="pb-10 text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
                                    You define your own criteria. Set the variables, the acceptable ranges, and the failure tolerance. The protocol checks every record in the dataset against your requirements and returns a pass-or-fail result with failure counts per variable. You see exactly whether the data qualifies. The raw records never leave the provider.
                                </div>
                            </details>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505] border-t border-gray-200 dark:border-gray-900 grid-bg">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-8">
                        Better data.<br/>
                        <span className="italic text-brand-orange">Better models.</span>
                    </h2>
                    <p className="text-[#6B7280] dark:text-gray-400 mb-12 text-lg max-w-xl mx-auto">
                        Access verified institutional data no other model has trained on.
                    </p>
                    <a
                        href="https://tally.so/r/dWdWQq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-black font-medium hover:bg-white transition-colors text-sm uppercase tracking-wide"
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
