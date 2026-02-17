import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, BadgeCheck, EyeOff, ArrowRight, ArrowUpRight, ChevronDown, Twitter, Linkedin, Zap, Lock, Cpu, Search } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import GrainOverlay from '../components/common/GrainOverlay.jsx';
import CursorGlow from '../components/common/CursorGlow.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import useMousePosition from '../hooks/useMousePosition.jsx';

const LandingPage = () => {
    const mousePosition = useMousePosition();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">
            
            <GrainOverlay />
            <CursorGlow mousePosition={mousePosition} />
            <Navigation variant="enterprise" />

            {/* HERO - Functional & Direct (Kept New Headline + Dual CTA) */}
            <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40">
                {/* Abstract Background - Darker, cleaner */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(235,94,40,0.08),transparent_50%)]" />
                    <img 
                        src="/hero-bg.png" 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                    />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                            </span>
                            EARLY ACCESS
                        </div>
                        
                        {/* Unique Functional Headline */}
                        <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-tight mb-8">
                            <span className="block animate-fade-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>Access the world's</span>
                            <span className="block text-white animate-fade-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}> 
                                <span className="italic text-brand-coral">protected</span> data.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-10 max-w-2xl animate-fade-up delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            The compliant source for real-world AI training data across every regulated industry.
                            <span className="text-white block mt-2">Real data. Real access. Fully licensed.</span>
                        </p>

                        {/* DUAL CTAS */}
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            {/* Primary: Demand (Buy) */}
                            <a 
                                href="https://tally.so/r/dWdWQq"
                                target="_blank"
                                rel="noreferrer"
                                className="group relative px-8 py-4 bg-white text-black font-medium tracking-wide text-sm rounded-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
                            >
                                <Search className="w-4 h-4" />
                                Request Data
                            </a>

                            {/* Secondary: Supply (Sell) */}
                            <Link 
                                to="/partners"
                                className="group relative px-8 py-4 bg-transparent border border-gray-700 text-white font-medium tracking-wide text-sm rounded-sm hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center justify-center gap-3"
                            >
                                Become a Partner
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Vertical Scroll Hint */}
                <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-4 animate-fade-in delay-1000">
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest rotate-90 origin-center translate-y-8">Scroll</span>
                </div>

                {/* HERO STATS BAR */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-[#0a0a0a]/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                        <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-12 animate-fade-in delay-700 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <div>
                                <p className="font-mono text-brand-orange text-sm">01</p>
                                <p className="text-2xl font-light mt-1 text-white">Consent-Verified</p>
                                <p className="text-gray-600 text-xs mt-1">Every dataset is owner-approved.</p>
                            </div>
                            <div>
                                <p className="font-mono text-brand-orange text-sm">02</p>
                                <p className="text-2xl font-light mt-1 text-white">Math-Verified</p>
                                <p className="text-gray-600 text-xs mt-1">Proof you can audit.</p>
                            </div>
                            <div>
                                <p className="font-mono text-brand-orange text-sm">03</p>
                                <p className="text-2xl font-light mt-1 text-white">Earn on Every Use</p>
                                <p className="text-gray-600 text-xs mt-1">Monetize each time your data trains a model</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* THE PROBLEM - The Privacy Paradox (Restored Rich Version) */}
             <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8 relative bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    {/* Section header - offset */}
                    <div className="grid lg:grid-cols-12 gap-4 md:gap-8 mb-12 md:mb-24">
                        <ScrollReveal className="lg:col-span-4" direction="right">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">The Privacy Paradox</p>
                        </ScrollReveal>
                        <div className="lg:col-span-8">
                            <ScrollReveal delay={200}>
                                <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight">
                                    To make data safe,
                                    <br />
                                    <span className="italic text-gray-600">you usually destroy its value.</span>
                                </h2>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Problem cards - stacked on mobile, grid on larger screens */}
                    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-12 md:gap-6">
                        {/* Card 1 - Finance Example */}
                        <ScrollReveal className="md:col-span-5 relative group card-lift" delay={200}>
                            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange via-brand-orange/50 to-transparent transition-all group-hover:w-2"></div>
                            <div className="pl-6 py-8">
                                <p className="font-mono text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-4">Finance</p>
                                <p className="font-display text-[3rem] md:text-[4rem] text-brand-orange tracking-tighter leading-none mb-4">Alpha<span className="text-gray-600">Lost</span></p>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                    Remove the fund name? You lost the track record. Remove the dates? You lost the trend. De-identification wipes out the signal.
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        {/* Card 2 - Health Example */}
                        <ScrollReveal className="md:col-span-4 md:mt-16 relative group card-lift" delay={400}>
                            <div className="absolute -top-3 left-8 bg-brand-orange text-black text-[10px] font-mono px-3 py-1 tracking-widest group-hover:-translate-y-1 transition-transform">
                                HEALTH
                            </div>
                            <div className="pt-8 pb-6">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <EyeOff className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-2xl text-white font-display mb-2">Participation Collapse</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Privacy concerns are making individuals unwilling to contribute identifying data.
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        {/* Card 3 - The Solution Hint */}
                        <ScrollReveal className="md:col-span-3 md:mt-32 relative card-lift" delay={600}>
                            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gray-800 group-hover:border-brand-orange transition-colors duration-500"></div>
                            <div className="py-8">
                                <p className="font-mono text-[10px] text-gray-700 tracking-widest uppercase mb-8">The Fix</p>
                                <div className="relative">
                                    <p className="font-display text-4xl md:text-5xl text-white tracking-tight">Verify</p>
                                    <p className="text-brand-orange text-lg mt-1">don't reveal</p>
                                </div>
                                <p className="text-gray-600 text-xs mt-8 leading-relaxed">
                                    Prove the insight. Never expose the data.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

             {/* HOW IT WORKS - Model B Layout (Restored Rich Version) */}
            <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8 bg-[#050505] relative overflow-hidden">
                {/* Large background text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                    <p className="font-display text-[20vw] text-gray-900/30 select-none animate-hero-drift opacity-50">PROVE WITHOUT SHARING</p>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 mb-24">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">The Infrastructure</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight">
                                We prove it.<br/>
                                <span className="italic text-brand-coral">You keep it.</span>
                            </h2>
                        </div>
                    </div>

                    {/* Flow - Marketplace Model B */}
                    <div className="relative">
                        {/* Connection line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-gray-800 via-brand-orange/50 to-gray-800"></div>
                        
                        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
                            <div className="flex-1 relative z-10">
                                <div className="h-full p-8 lg:pr-12 relative bg-[#0a0a0a]/50 backdrop-blur-sm border border-gray-800 lg:border-none">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gray-700"></div>
                                    <p className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-6">PARTNER</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">Keep Control</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">You control who gets in. Approve or decline every request. Your terms, always.</p>
                                    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-[#050505] border border-gray-800 items-center justify-center z-20">
                                        <Database className="w-4 h-4 text-gray-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Aseryx - central, elevated */}
                            <div className="flex-1 relative z-20">
                                <div className="h-full mx-4 lg:mx-8 relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/20 via-brand-orange/5 to-transparent"></div>
                                    <div className="absolute inset-0 border-2 border-brand-orange/40"></div>
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-orange text-black text-[10px] font-mono tracking-widest">
                                        ASERYX ENGINE
                                    </div>
                                    <div className="relative p-8 pt-10">
                                        <h3 className="font-display text-3xl mb-3 text-brand-orange">We Verify It</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Our engine verifies specific claims against your data without ever seeing the underlying file.</p>
                                        <div className="mt-6 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                                            <span className="text-[10px] text-gray-600 font-mono tracking-wider">CALCULATING</span>
                                        </div>
                                    </div>
                                    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-[#050505] border border-brand-orange/30 items-center justify-center z-20">
                                        <Shield className="w-4 h-4 text-brand-orange" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <div className="h-full p-8 lg:pl-12 relative bg-[#0a0a0a]/50 backdrop-blur-sm border border-gray-800 lg:border-none">
                                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gray-700"></div>
                                    <p className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-6">The Buyer</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">Get the Result/Proof</h3>
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30">
                                        <BadgeCheck className="w-4 h-4 text-green-500" />
                                        <span className="text-green-400 font-mono text-sm">"Verified Quality Dataset"</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mt-4">Buyer gets the insight/proof. You get paid.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* MARKETPLACE SHOWCASE - "Verified Datasets" (Restored Rich Version) */}
             <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8 relative bg-[#0a0a0a]">
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-4 md:gap-8 mb-12 md:mb-24">
                        <div className="lg:col-span-5">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-4 md:mb-6">Aseryx Protocol</p>
                            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight">
                                Verified<br />
                                <span className="italic">Datasets.</span>
                            </h2>
                        </div>
                        <div className="lg:col-span-7 lg:pt-20">
                            <ScrollReveal delay={200}>
                                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                    Access ground-truth data from the world's most protected sectors. 
                                    Pre-verified for quality, compliance, and origin.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Verified Dataset Cards */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px bg-gray-900/50">
                        {/* Finance Card 1 */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={100}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mb-4">Finance</p>
                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">Fund Performance</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Prove 3-year returns {'>'}20% without revealing current positions or firm identity.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Trade Logs</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">NAV</span>
                            </div>
                        </ScrollReveal>

                        {/* Finance Card 2 */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={200}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></div>
                            <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mb-4">Finance</p>
                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">Fraud Patterns</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Train detection models on 50M+ verified fraud events without accessing transaction ledgers.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Tx Data</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">KYC</span>
                            </div>
                        </ScrollReveal>

                        {/* Health Card 1 */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={300}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
                            <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mb-4">Health</p>
                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">Women's Health</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Aggregate cycle patterns and symptom correlations without exposing individual user identities.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Cycle Logs</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Symptoms</span>
                            </div>
                        </ScrollReveal>

                         {/* Health Card 2 */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={400}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-200"></div>
                            <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mb-4">Health</p>
                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">Sleep Quality</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Correlate apnea events with medication use. 10K+ users certified {'>'}5 events/night.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Wearables</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-500 text-[10px] border border-gray-800">Clinical</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

             {/* WHO THIS IS FOR - Ecosystem (Restored Rich Version) */}
             

             {/* TECHNICAL FOUNDATION - ZK + LIT (Restored Rich Version) */}
             <section className="py-16 md:py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section intro */}
                    <div className="max-w-3xl mb-12 md:mb-24">
                        <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-4 md:mb-6">Why It's Safe</p>
                        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tight mb-6 md:mb-8">
                            Proof you can audit,<br />
                            <span className="italic text-gray-500">not promises you can't.</span>
                        </h2>
                    </div>
                    
                    
                    
                    {/* Compliance - simple inline statement */}
                    <div className="mt-16 md:mt-32 pt-8 md:pt-16 border-t border-gray-900">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-x-12 sm:gap-y-4 text-sm">
                                <span className="text-gray-500">Infrastructure <span className="text-white">We Never Hold Data</span></span>
                                <span className="text-gray-500">Security <span className="text-white">Audited</span></span>
                                <span className="text-gray-500">Privacy <span className="text-white">Private by Math</span></span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

             {/* FINAL CTA (Re-using the cleaner Dual CTA one) */}
            <section className="py-16 md:py-32 px-4 md:px-8 border-t border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight mb-8">
                        Ready to access the<br />
                        <span className="text-brand-orange">hidden 90%?</span>
                    </h2>
                    <p className="text-gray-400 mb-12 text-lg max-w-xl mx-auto">
                        Connect with verified data partners in Finance and Health today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="https://tally.so/r/dWdWQq"
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors uppercase tracking-wide text-sm"
                        >
                            Request Data Access
                        </a>
                        <Link 
                            to="/partners"
                            className="px-8 py-4 bg-transparent border border-gray-800 text-white hover:border-white transition-colors uppercase tracking-wide text-sm"
                        >
                            I Have Data to Sell
                        </Link>
                    </div>
                </div>
            </section>

            <Footer variant="enterprise" />

        </div>
    );
};

export default LandingPage;
