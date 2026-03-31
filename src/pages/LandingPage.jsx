import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, BadgeCheck, EyeOff, ArrowRight, ArrowUpRight, Search, TrendingUp, Activity } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import GrainOverlay from '../components/common/GrainOverlay.jsx';
import CursorGlow from '../components/common/CursorGlow.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
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

            {/* HERO */}
            <section id="main-content" className="relative min-h-screen flex flex-col pt-24 md:pt-40">
                {/* Abstract Background - Darker, cleaner */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(235,94,40,0.08),transparent_50%)]" />
                    <ParticlesBackground />
                    <picture>
                        <source srcSet="/hero-bg.webp" type="image/webp" />
                        <img
                            src="/hero-bg.png"
                            alt="Aseryx data verification visualization"
                            width="1024"
                            height="1024"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen animate-hero-drift"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </picture>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex-grow pb-0 md:pb-32">
                    <div className="max-w-5xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-6 md:mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                            </span>
                            NOW IN BETA
                        </div>

                        {/* Headline */}
                        <h1 className="font-display text-4xl sm:text-5xl md:text-[clamp(3rem,8vw,6rem)] leading-[1.05] tracking-tight mb-6 md:mb-8">
                            <span className="block animate-fade-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>The data licensing</span>
                            <span className="block text-white animate-fade-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                                <span className="italic text-brand-orange">infrastructure</span> for AI.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 md:mb-10 max-w-2xl animate-fade-up delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            Institutions license sensitive data to AI builders.
                            <span className="text-white block mt-2">Quality proven. Data never moves.</span>
                        </p>

                        {/* DUAL CTAS */}
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-400 opacity-0 pb-12 md:pb-0" style={{ animationFillMode: 'forwards' }}>
                            <a
                                href="https://tally.so/r/dWdWQq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-8 py-4 bg-white text-black font-medium tracking-wide text-sm rounded-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                                aria-label="Request access to verified datasets (opens in new tab)"
                            >
                                <Search className="w-4 h-4" aria-hidden="true" />
                                Access Verified Data
                            </a>

                            <Link
                                to="/partners"
                                className="group relative px-8 py-4 bg-transparent border border-gray-700 text-white font-medium tracking-wide text-sm rounded-sm hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                            >
                                Monetize Your Data
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Vertical Scroll Hint */}
                <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-4 animate-fade-in delay-1000">
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest rotate-90 origin-center translate-y-8">Scroll</span>
                </div>

                {/* HERO STATS BAR */}
                <div className="relative mt-auto border-t border-gray-800 bg-[#0a0a0a]/80 md:bg-[#0a0a0a]/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                        <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-12 animate-fade-in delay-700 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <div>
                                <p className="font-mono text-brand-orange text-sm">01</p>
                                <p className="text-xl md:text-2xl font-light mt-1 text-white">Zero Custody Transfer</p>
                                <p className="text-gray-400 text-xs mt-1">Data stays with you. Always.</p>
                            </div>
                            <div>
                                <p className="font-mono text-brand-orange text-sm">02</p>
                                <p className="text-xl md:text-2xl font-light mt-1 text-white">Quality Proven, Not Promised</p>
                                <p className="text-gray-400 text-xs mt-1">Scored and verified before anyone pays.</p>
                            </div>
                            <div>
                                <p className="font-mono text-brand-orange text-sm">03</p>
                                <p className="text-xl md:text-2xl font-light mt-1 text-white">80–85% to You</p>
                                <p className="text-gray-400 text-xs mt-1">Per training run. Recurring.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AUDIENCE FORK */}
            <section className="py-24 px-4 md:px-8 bg-[#0a0a0a] border-t border-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-4 md:gap-8 mb-12">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">Two Sides, One Platform</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {/* Sell Your Data */}
                        <ScrollReveal className="group relative bg-[#0f0f0f] p-8 border border-gray-800 hover:border-brand-orange/50 transition-all duration-300" delay={100}>
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-lg bg-brand-orange/10 group-hover:bg-brand-orange/20 transition-colors">
                                        <TrendingUp className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">For Data Holders</span>
                                </div>
                                <h3 className="text-2xl font-display text-white mb-4">Your data has buyers.</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    License it without giving up control.
                                </p>
                                <Link
                                    to="/partners"
                                    className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm font-medium group/link"
                                >
                                    Become a Partner
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </ScrollReveal>

                        {/* Buy Verified Data */}
                        <ScrollReveal className="group relative bg-[#0f0f0f] p-8 border border-gray-800 hover:border-brand-orange/50 transition-all duration-300" delay={200}>
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-lg bg-brand-orange/10 group-hover:bg-brand-orange/20 transition-colors">
                                        <Search className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">For AI Builders</span>
                                </div>
                                <h3 className="text-2xl font-display text-white mb-4">Data you can trust.</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Verified quality. Guaranteed source. Built-in compliance.
                                </p>
                                <a
                                    href="https://tally.so/r/dWdWQq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm font-medium group/link"
                                >
                                    Explore Datasets
                                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

             {/* THE PROBLEM - The Privacy Paradox */}
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
                                    <span className="italic text-gray-400">you've always had to destroy its value.</span>
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
                                <p className="font-mono text-gray-400 text-[10px] tracking-[0.3em] uppercase mb-4">Finance</p>
                                <p className="font-display text-[3rem] md:text-[4rem] text-brand-orange tracking-tighter leading-none mb-4">Signal<span className="text-gray-400">Destroyed</span></p>
                                <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
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
                                <h3 className="text-2xl text-white font-display mb-2">Data Locked Away</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    The most valuable health data on the planet is locked behind privacy walls.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Card 3 - The Solution Hint */}
                        <ScrollReveal className="md:col-span-3 md:mt-32 relative card-lift" delay={600}>
                            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gray-800 group-hover:border-brand-orange transition-colors duration-500"></div>
                            <div className="py-8">
                                <p className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-8">What Changes</p>
                                <div className="relative">
                                    <p className="font-display text-4xl md:text-5xl text-white tracking-tight">Verify</p>
                                    <p className="text-brand-orange text-lg mt-1">don't reveal</p>
                                </div>
                                <p className="text-gray-300 text-sm mt-8 leading-relaxed">
                                    Prove quality where the data lives. Buyers see a score -- not the data.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

             {/* HOW IT WORKS */}
            <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8 bg-[#050505] relative overflow-hidden">
                {/* Large background text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                    <p className="font-display text-[20vw] text-gray-900/30 select-none animate-hero-drift opacity-50">PROVE QUALITY</p>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 mb-24">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">How It Works</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight">
                                Prove quality.<br/>
                                <span className="italic text-brand-orange">Never move the data.</span>
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
                                    <p className="font-mono text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-6">PARTNER</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">You Stay in Control</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">Approve every request. Set your price. Revoke anytime.</p>
                                    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-[#050505] border border-gray-800 items-center justify-center z-20">
                                        <Database className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Aseryx - central, elevated */}
                            <div className="flex-1 relative z-20">
                                <div className="h-full mx-4 lg:mx-8 relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/20 via-brand-orange/5 to-transparent"></div>
                                    <div className="absolute inset-0 border-2 border-brand-orange/40"></div>
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-orange text-black text-[10px] font-mono tracking-widest">
                                        ASERYX PROTOCOL
                                    </div>
                                    <div className="relative p-8 pt-10">
                                        <h3 className="font-display text-3xl mb-3 text-brand-orange">We Prove the Quality</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">Every dataset gets a quality gate and a 0-100 score. Verified, not self-reported.</p>
                                        <div className="mt-6 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                                            <span className="text-[10px] text-gray-400 font-mono tracking-wider">CALCULATING</span>
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
                                    <p className="font-mono text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-6">BUYER</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">You Get Proof, Not Files</h3>
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30">
                                        <BadgeCheck className="w-4 h-4 text-green-500" />
                                        <span className="text-green-400 font-mono text-sm">"Verified"</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed mt-4">Know exactly what you are licensing before you pay.</p>
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
                                <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                                    The best training data sits inside hospitals, banks, and research labs.
                                    We make it accessible. Without moving it.
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
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Prove 3-year returns {'>'}20% without revealing current positions or firm identity.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">Trade Logs</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">NAV</span>
                            </div>
                        </ScrollReveal>

                        {/* Finance Card 2 */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={200}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></div>
                            <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mb-4">Finance</p>
                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">Fraud Patterns</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Train detection models on 50M+ verified fraud events without accessing transaction ledgers.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">Tx Data</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">KYC</span>
                            </div>
                        </ScrollReveal>

                        {/* Health Card 1 */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={300}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
                            <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mb-4">Health</p>
                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">Women's Health</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Aggregate cycle patterns and symptom correlations without exposing individual user identities.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">Cycle Logs</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">Symptoms</span>
                            </div>
                        </ScrollReveal>

                         {/* Health Card 2 */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={400}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-200"></div>
                            <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mb-4">Health</p>
                            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">Sleep Quality</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Correlate apnea events with medication use across 10K+ users. Verified, without a single medical record leaving the clinic.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">Wearables</span>
                                <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] border border-gray-800">Clinical</span>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Section CTA */}
                    <div className="mt-16 flex justify-center">
                        <a
                            href="https://tally.so/r/dWdWQq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm font-medium border-b border-transparent hover:border-brand-orange pb-0.5"
                        >
                            Explore full dataset catalog
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

             {/* WHO THIS IS FOR - Ecosystem (Restored Rich Version) */}


             {/* TECHNICAL FOUNDATION - ZK + LIT (Restored Rich Version) */}
             <section className="py-16 md:py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 items-end">
                        {/* Left: Compliance/Claims */}
                        <div className="w-full lg:w-1/2 border-t border-gray-800 pt-8">
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-gray-400 mb-1 text-sm font-mono uppercase tracking-wider">Custody</h3>
                                    <p className="text-white text-lg">Your plaintext never leaves your control.</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 mb-1 text-sm font-mono uppercase tracking-wider">Verification</h3>
                                    <p className="text-white text-lg">Access enforced by code, not legal agreements.</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 mb-1 text-sm font-mono uppercase tracking-wider">Compliance</h3>
                                    <p className="text-white text-lg">Built for GDPR, HIPAA, and the EU AI Act.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Header */}
                        <div className="w-full lg:w-1/2 text-left lg:text-right">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-4 md:mb-6">Why It's Safe</p>
                            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tight">
                                Proof you can audit,<br />
                                <span className="italic text-gray-400">not promises you can't.</span>
                            </h2>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center lg:text-right">
                        <Link
                            to="/buyers"
                            className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm font-medium"
                        >
                            See the Technology
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

             {/* FINAL CTA (Re-using the cleaner Dual CTA one) */}
            <section className="py-16 md:py-32 px-4 md:px-8 border-t border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight mb-8">
                        The most valuable data in the world<br />
                        <span className="text-brand-orange">has never been licensed. Until now.</span>
                    </h2>
                    <p className="text-gray-400 mb-12 text-lg max-w-xl mx-auto">
                        Institutions can now license their data to AI builders. Without giving up control.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://tally.so/r/dWdWQq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors uppercase tracking-wide text-sm"
                        >
                            Request Access
                        </a>
                        <Link
                            to="/partners"
                            className="px-8 py-4 bg-transparent border border-gray-800 text-white hover:border-white transition-colors uppercase tracking-wide text-sm"
                        >
                            List Your Data
                        </Link>
                    </div>
                </div>
            </section>

            <Footer variant="enterprise" />

        </div>
    );
};

export default LandingPage;
