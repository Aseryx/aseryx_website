import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, BadgeCheck, Database, Shield, Cpu, Brain, TrendingUp } from 'lucide-react';
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
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">

            <GrainOverlay />
            <CursorGlow mousePosition={mousePosition} />

            {/* Nav */}
            <Navigation variant="enterprise" />

            {/* HERO */}
            <section id="main-content" className="relative min-h-screen flex items-center pt-32 pb-24">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
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

                            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight mb-8">
                                <span className="block">Data you can't get</span>
                                <span className="block italic text-gray-400">anywhere else.</span>
                            </h1>

                            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                Scraped data? Synthetic data? Public datasets? Your models deserve better.
                                Aseryx gives you access to verified institutional data with provenance you can audit.
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

                        {/* Visual / Value Props */}
                        <div className="lg:col-span-5 relative">
                             <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl opacity-20 rounded-full"></div>
                             <div className="relative border border-gray-800 bg-[#0f0f0f] p-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded bg-gray-900/50">
                                            <BadgeCheck className="w-5 h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">Provenance Guaranteed</p>
                                            <p className="text-gray-500 text-xs mt-1">Know exactly where your data came from</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded bg-gray-900/50">
                                            <TrendingUp className="w-5 h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">Quality Scored</p>
                                            <p className="text-gray-500 text-xs mt-1">Completeness, diversity, statistical power</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded bg-gray-900/50">
                                            <Shield className="w-5 h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">Compliance-Ready</p>
                                            <p className="text-gray-500 text-xs mt-1">GDPR, HIPAA, EU AI Act built-in</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded bg-gray-900/50">
                                            <Database className="w-5 h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">No Custody Transfer</p>
                                            <p className="text-gray-500 text-xs mt-1">Data stays with source. You get a license.</p>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PROBLEM */}
            <section className="py-32 px-4 md:px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">The Problem</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                                Your models deserve<br/>
                                <span className="block italic text-gray-400">better than scraped data.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800" delay={100}>
                            <p className="font-mono text-xs text-gray-500 mb-4 uppercase tracking-wider">Public Datasets</p>
                            <h3 className="text-xl text-white mb-3">Contaminated</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your training data is already in every other model. No competitive advantage. No differentiation.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800" delay={200}>
                            <p className="font-mono text-xs text-gray-500 mb-4 uppercase tracking-wider">Synthetic Data</p>
                            <h3 className="text-xl text-white mb-3">Artificial</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Generated patterns don't match real-world complexity. Your models fail in production.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-brand-orange/30" delay={300}>
                            <div className="absolute top-0 right-0 p-2 bg-brand-orange text-black text-[10px] font-bold uppercase tracking-wider">The Alternative</div>
                            <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">Institutional Data</p>
                            <h3 className="text-xl text-white mb-3">Verified & Real</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Hospitals, banks, and research labs hold the data that actually matters. Now you can access it.
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
                                <span className="italic text-gray-400">Proven quality.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* Finance 1 */}
                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800 hover:border-brand-orange/50 transition-colors" delay={100}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded bg-brand-orange/10">
                                    <TrendingUp className="w-5 h-5 text-brand-orange" />
                                </div>
                                <span className="text-xs font-mono text-brand-orange uppercase">Finance</span>
                            </div>
                            <h3 className="text-2xl text-white mb-3">Fund Performance</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Prove 3-year returns &gt;20% without revealing current positions or firm identity.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Trade Logs</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">NAV</span>
                            </div>
                        </ScrollReveal>

                        {/* Finance 2 */}
                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800 hover:border-brand-orange/50 transition-colors" delay={200}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded bg-brand-orange/10">
                                    <TrendingUp className="w-5 h-5 text-brand-orange" />
                                </div>
                                <span className="text-xs font-mono text-brand-orange uppercase">Finance</span>
                            </div>
                            <h3 className="text-2xl text-white mb-3">Fraud Patterns</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Train models on 50M+ verified fraud events without accessing transaction ledgers.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Tx Data</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">KYC</span>
                            </div>
                        </ScrollReveal>

                        {/* Health 1 */}
                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800 hover:border-brand-orange/50 transition-colors" delay={300}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded bg-brand-orange/10">
                                    <Brain className="w-5 h-5 text-brand-orange" />
                                </div>
                                <span className="text-xs font-mono text-brand-orange uppercase">Health</span>
                            </div>
                            <h3 className="text-2xl text-white mb-3">Women's Health</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Aggregate cycle patterns across 10K+ users without exposing a single medical record.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Cycle Logs</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Symptoms</span>
                            </div>
                        </ScrollReveal>

                        {/* Health 2 */}
                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800 hover:border-brand-orange/50 transition-colors" delay={400}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded bg-brand-orange/10">
                                    <Brain className="w-5 h-5 text-brand-orange" />
                                </div>
                                <span className="text-xs font-mono text-brand-orange uppercase">Health</span>
                            </div>
                            <h3 className="text-2xl text-white mb-3">Sleep Quality</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Correlate apnea events with medication use — verified, without records leaving the clinic.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Wearables</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Clinical</span>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="https://tally.so/r/dWdWQq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm font-medium"
                        >
                            Browse all available datasets
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-32 px-4 md:px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">How It Works</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                                Prove quality.<br/>
                                <span className="italic text-gray-400">Never move the data.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal className="relative" delay={100}>
                            <div className="border border-gray-800 bg-[#0f0f0f] p-8 h-full">
                                <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-6">
                                    <span className="text-brand-orange font-mono text-lg">1</span>
                                </div>
                                <h3 className="text-xl text-white mb-3">Request Data</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Submit a data request specifying your requirements. Or browse existing datasets from verified partners.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="relative" delay={200}>
                            <div className="border border-brand-orange/30 bg-[#0f0f0f] p-8 h-full">
                                <div className="absolute -top-3 left-8 px-3 py-1 bg-brand-orange text-black text-[10px] font-bold uppercase tracking-wider">Key Step</div>
                                <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-6">
                                    <span className="text-brand-orange font-mono text-lg">2</span>
                                </div>
                                <h3 className="text-xl text-white mb-3">Verify Quality</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Mathematical proofs confirm completeness, diversity, and statistical power — without exposing raw records.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="relative" delay={300}>
                            <div className="border border-gray-800 bg-[#0f0f0f] p-8 h-full">
                                <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-6">
                                    <span className="text-brand-orange font-mono text-lg">3</span>
                                </div>
                                <h3 className="text-xl text-white mb-3">License & Use</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Pay and receive a license. Data stays with the source. You get verified access for your use case.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-32 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-4">FAQ</p>
                        <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                            Common questions
                        </h2>
                    </div>

                    <div className="space-y-8">
                        <ScrollReveal delay={100}>
                            <div className="border-t border-gray-800 pt-8">
                                <h3 className="text-lg text-white font-medium mb-3">What data types are available?</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Finance (trade logs, performance history, deal flow), Health (EHR, patient outcomes, treatment patterns), Research (experimental data, longitudinal studies), and Industrial (sensor arrays, logs). If it's high-volume, high-truth institutional data — it's here.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="border-t border-gray-800 pt-8">
                                <h3 className="text-lg text-white font-medium mb-3">How is quality verified?</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Every dataset receives a mathematical richness score (0–100) based on completeness, diversity, uniqueness, and statistical power. You see the score before you pay. No raw data is exposed during verification.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="border-t border-gray-800 pt-8">
                                <h3 className="text-lg text-white font-medium mb-3">What about compliance?</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Built for GDPR, HIPAA, and the EU AI Act. Data never leaves the source. You receive a license, not a file. Full audit trail on-chain.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="border-t border-gray-800 pt-8">
                                <h3 className="text-lg text-white font-medium mb-3">How does pricing work?</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Partners set their own prices based on dataset richness and demand. Typical licenses range from $3,000–$15,000 per training run. 80–85% goes to the data holder.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div className="border-t border-gray-800 pt-8">
                                <h3 className="text-lg text-white font-medium mb-3">How do I get started?</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Request access via the form above. Tell us what data you need, your use case, and timeline. We'll match you with relevant datasets and facilitate the license.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 px-4 md:px-8 bg-[#050505] border-t border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-8">
                        Your models deserve<br/>
                        <span className="italic text-brand-orange">real-world data.</span>
                    </h2>
                    <p className="text-gray-400 mb-12 text-lg max-w-xl mx-auto">
                        AI labs are paying hundreds of millions for verified institutional data.
                        Request access today.
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
