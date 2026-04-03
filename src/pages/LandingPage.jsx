import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Shield, BadgeCheck, Lock } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import BLOG_POSTS from '../data/blogPosts.js';

import { GeometricShield, GeometricCube, GeometricSphere, GeometricToroid, GeometricLattice, GeometricPrism, GeometricWave, GeometricHex } from '../components/common/GeometricIllustrations.jsx';

const ROTATING_TEXTS = [
    'AI development',
    'data rich institutions',
];

/* -------------------------------------------------------
   USE CASE CATEGORIES
   ------------------------------------------------------- */

const USE_CASES = ['Clinical Trials', 'Financial Intelligence', 'LLM Training', 'Drug Discovery', 'Risk Modeling'];

const UNLOCKS = [
    {
        icon: Shield,
        title: 'Zero Custody Licensing',
        description: 'License datasets to AI builders without transferring custody. Your data stays in your infrastructure.',
    },
    {
        icon: BadgeCheck,
        title: 'Verified Quality Scores',
        description: 'Every dataset receives a verified 0 to 100 quality score. Buyers see proof, not promises.',
    },
    {
        icon: Lock,
        title: 'Compliance Built In',
        description: 'Designed for GDPR, HIPAA, and the EU AI Act. Enforced automatically, not by legal agreements.',
    },
];

/* -------------------------------------------------------
   LANDING PAGE
   ------------------------------------------------------- */

const LandingPage = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">

            <Navigation variant="enterprise" />

            {/* ===== SECTION 1: HERO ===== */}
            <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24 grid-bg overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,77,0.06),transparent_50%)]" />
                    <img
                        src="/hero-bg-new.jpg"
                        alt=""
                        className="absolute top-0 right-0 w-full md:w-[70%] h-full object-cover object-top md:object-[center_20%] grayscale opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
                        style={{ maskImage: 'linear-gradient(to right, transparent 5%, black 35%), linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 35%), linear-gradient(to bottom, black 80%, transparent 100%)', maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
                        loading="eager"
                        fetchPriority="high"
                    />
                    <ParticlesBackground />
                </div>

                {/* Hero content -- left-aligned */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                        </span>
                        NOW IN BETA
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-up delay-100 opacity-0 max-w-3xl" style={{ animationFillMode: 'forwards' }}>
                        Data licensing protocol for{' '}
                        <span className="text-rotate-wrapper inline-block align-baseline">
                            {ROTATING_TEXTS.map((text, index) => (
                                <span
                                    key={text}
                                    className={`text-rotate-item text-brand-orange font-medium ${index === currentTextIndex ? 'active' : ''}`}
                                >
                                    {text}
                                </span>
                            ))}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#6B7280] dark:text-gray-400 leading-relaxed mb-10 max-w-2xl animate-fade-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        Institutions license sensitive data to AI builders.
                        Quality proven. Data never moves.
                    </p>

                    <div className="animate-fade-up delay-300 opacity-0 flex flex-wrap gap-4" style={{ animationFillMode: 'forwards' }}>
                        <Link
                            to="/partners"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-orange text-black font-medium tracking-wide text-sm uppercase hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a]"
                        >
                            For Data Providers
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/buyers"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#E5E5E5] dark:border-[#333] text-[#1A1A1A] dark:text-white font-medium tracking-wide text-sm uppercase hover:bg-[#F3F4F6] dark:hover:bg-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a]"
                        >
                            For AI Builders
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="animate-fade-up delay-400 opacity-0 mt-8 flex items-center gap-3 text-[#6B7280] dark:text-gray-500" style={{ animationFillMode: 'forwards' }}>
                        <span className="text-xs font-mono tracking-wider uppercase">Built for</span>
                        <span className="w-px h-3 bg-[#D1D5DB] dark:bg-gray-700" />
                        <span className="text-xs tracking-wide">GDPR</span>
                        <span className="w-px h-3 bg-[#D1D5DB] dark:bg-gray-700" />
                        <span className="text-xs tracking-wide">HIPAA</span>
                        <span className="w-px h-3 bg-[#D1D5DB] dark:bg-gray-700" />
                        <span className="text-xs tracking-wide">EU AI Act</span>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 2: KEY BENEFITS ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section header */}
                    <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">Key Benefits</p>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight max-w-lg">
                            What makes private data licensing possible
                        </h2>
                    </div>

                    {/* Three-column numbered grid */}
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {/* Card 01 */}
                        <ScrollReveal delay={100}>
                            <div className="group">
                                <p className="font-display text-3xl md:text-4xl text-[#C8C4BE] dark:text-gray-700 mb-4">01</p>
                                <div className="card-illustration mb-6">
                                    <GeometricShield className="w-32 h-32 md:w-40 md:h-40 text-brand-orange" />
                                </div>
                                <h3 className="font-display text-xl md:text-2xl mb-3 text-[#1A1A1A] dark:text-white">Zero Custody Transfer</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                    Data stays in your infrastructure. Always. License access and revenue without surrendering control over your most valuable asset.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Card 02 */}
                        <ScrollReveal delay={200}>
                            <div className="group">
                                <p className="font-display text-3xl md:text-4xl text-[#C8C4BE] dark:text-gray-700 mb-4">02</p>
                                <div className="card-illustration mb-6">
                                    <GeometricPrism className="w-32 h-32 md:w-40 md:h-40 text-brand-orange" />
                                </div>
                                <h3 className="font-display text-xl md:text-2xl mb-3 text-[#1A1A1A] dark:text-white">Quality Proven, Not Promised</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                    Every dataset gets a verified quality score. Buyers see real proof before they pay, not self-reported claims.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Card 03 */}
                        <ScrollReveal delay={300}>
                            <div className="group">
                                <p className="font-display text-3xl md:text-4xl text-[#C8C4BE] dark:text-gray-700 mb-4">03</p>
                                <div className="card-illustration mb-6">
                                    <GeometricWave className="w-32 h-32 md:w-40 md:h-40 text-brand-orange" />
                                </div>
                                <h3 className="font-display text-xl md:text-2xl mb-3 text-[#1A1A1A] dark:text-white">80-85% Revenue to You</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                    Per training run. Recurring. The majority of every licensing fee goes directly to the data holder. Transparent, auditable, fair.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ===== THE PRIVACY PARADOX ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">The Privacy Paradox</p>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight max-w-2xl">
                            To make data safe, you've always had to <span className="italic text-[#6B7280] dark:text-gray-400">destroy its value.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-5 gap-6 md:gap-8">
                        {/* Left column: The two problems stacked */}
                        <div className="md:col-span-3 space-y-6">
                            <ScrollReveal delay={100}>
                                <div className="group flex flex-col sm:flex-row bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-transparent dark:border-transparent opacity-70 hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center justify-center p-8 sm:p-10 grayscale group-hover:grayscale-0 transition-all duration-500 sm:border-r border-b sm:border-b-0 border-[#E8E4DE] dark:border-[#1F2937]">
                                        <GeometricLattice className="w-24 h-24 md:w-32 md:h-32 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 md:p-8 flex-1">
                                        <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">01 / Finance</p>
                                        <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Signal Lost</h3>
                                        <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                            Remove the fund name? You lost the track record. Remove the dates? You lost the trend. De-identification wipes out the signal.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={200}>
                                <div className="group flex flex-col sm:flex-row bg-[#EDEBE8] dark:bg-[#111111] card-oasis-alt overflow-hidden border border-transparent dark:border-transparent opacity-70 hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center justify-center p-8 sm:p-10 grayscale group-hover:grayscale-0 transition-all duration-500 sm:border-r border-b sm:border-b-0 border-[#E8E4DE] dark:border-[#1F2937]">
                                        <GeometricSphere className="w-24 h-24 md:w-32 md:h-32 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 md:p-8 flex-1">
                                        <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">02 / Health</p>
                                        <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Participation Collapse</h3>
                                        <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                            Privacy fears are locking up the most valuable health data on the planet.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right column: The Fix - tall highlighted card */}
                        <div className="md:col-span-2">
                            <ScrollReveal delay={300}>
                                <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-brand-orange/10 dark:border-brand-orange/20">
                                    <div className="flex items-center justify-center py-12 md:py-16 flex-1">
                                        <GeometricShield className="w-36 h-36 md:w-44 md:h-44 text-brand-orange group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 md:p-8 border-t border-brand-orange/20 dark:border-brand-orange/30">
                                        <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">03 / The Fix</p>
                                        <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Verify, Don't Reveal</h3>
                                        <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                            Prove the quality. Never move the data.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 3: SOLUTIONS (moved up) ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">Solutions</p>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight max-w-2xl">
                            Built for<br />
                            <span className="text-[#6B7280] dark:text-gray-400">verified data licensing</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Card: For Data Providers */}
                        <ScrollReveal delay={100}>
                            <div className="group bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden">
                                <div className="flex items-center justify-center py-12 md:py-16">
                                    <GeometricHex className="w-48 h-48 md:w-64 md:h-64 text-brand-orange group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="font-display text-xl md:text-2xl mb-3 text-[#1A1A1A] dark:text-white">For Data Providers</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-6">
                                        Approve every request. Set your price. Revoke anytime. Your data never leaves your control.
                                    </p>
                                    <Link
                                        to="/partners"
                                        className="inline-flex items-center gap-2 text-brand-orange hover:text-[#1A1A1A] dark:hover:text-white transition-colors text-sm font-medium"
                                    >
                                        Learn more
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Card: For AI Builders */}
                        <ScrollReveal delay={200}>
                            <div className="group bg-[#EDEBE8] dark:bg-[#111111] card-oasis-alt overflow-hidden">
                                <div className="flex items-center justify-center py-12 md:py-16">
                                    <GeometricSphere className="w-48 h-48 md:w-64 md:h-64 text-brand-orange group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="font-display text-xl md:text-2xl mb-3 text-[#1A1A1A] dark:text-white">For AI Builders</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-6">
                                        Access verified datasets from hospitals, banks, and research labs. Know exactly what you're licensing before you pay.
                                    </p>
                                    <Link
                                        to="/buyers"
                                        className="inline-flex items-center gap-2 text-brand-orange hover:text-[#1A1A1A] dark:hover:text-white transition-colors text-sm font-medium"
                                    >
                                        Learn more
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 4: HOW IT WORKS ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">How It Works</p>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight max-w-2xl">
                            Prove quality.<br />
                            <span className="italic text-[#6B7280] dark:text-gray-400">Never move the data.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        <ScrollReveal delay={100}>
                            <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden relative">
                                <div className="flex items-center justify-center py-10 md:py-14 text-[#6B7280] grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <GeometricCube className="w-32 h-32 md:w-36 md:h-36 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 md:p-8 flex-1 border-t border-[#E8E4DE] dark:border-[#1F2937]">
                                    <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">01 / Partner</p>
                                    <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Keep Control</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                        You control who gets in. Approve or decline every request. Your terms, always.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis-alt overflow-hidden border border-brand-orange/10 dark:border-brand-orange/20 relative">
                                <div className="flex items-center justify-center py-10 md:py-14">
                                    <GeometricShield className="w-32 h-32 md:w-36 md:h-36 text-brand-orange group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 md:p-8 flex-1 border-t border-brand-orange/20 dark:border-brand-orange/30">
                                    <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">02 / Aseryx</p>
                                    <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">We Verify It</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-4">
                                        Specific claims are verified against your data. No file ever changes hands.
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></div>
                                        <span className="text-[10px] text-brand-orange font-mono tracking-wider">VERIFYING</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden relative">
                                <div className="flex items-center justify-center py-10 md:py-14 text-[#6B7280] grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <GeometricToroid className="w-32 h-32 md:w-36 md:h-36 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 md:p-8 flex-1 border-t border-[#E8E4DE] dark:border-[#1F2937]">
                                    <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">03 / The Buyer</p>
                                    <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Get Verified Proof</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-4">
                                        Quality confirmed. Legally sound. You get paid.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 5: USE CASES ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="section-divider pt-8 md:pt-12 mb-8 md:mb-12">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase">Use Cases</p>
                    </div>

                    <div className="use-cases-scroll mb-12 md:mb-16 section-divider pt-4 pb-4">
                        {USE_CASES.map((category) => (
                            <span
                                key={category}
                                className="whitespace-nowrap text-sm md:text-base text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-default font-medium"
                            >
                                {category}
                            </span>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        <ScrollReveal>
                            <div>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-8">
                                    Aseryx unlocks:
                                </h2>
                                <div className="hidden lg:block">
                                    <GeometricLattice className="w-full max-w-md text-brand-orange/60 dark:text-brand-orange/40" />
                                </div>
                            </div>
                        </ScrollReveal>

                        <div className="space-y-6">
                            {UNLOCKS.map((item, index) => (
                                <ScrollReveal key={item.title} delay={index * 150}>
                                    <div className="group p-6 bg-[#EDEBE8] dark:bg-[#111111] card-oasis hover:bg-[#E5E2DD] dark:hover:bg-[#1a1a1a] transition-colors">
                                        <div className="w-12 h-12 rounded-lg bg-[#F9F8F6] dark:bg-[#0a0a0a] flex items-center justify-center mb-4">
                                            <item.icon className="w-5 h-5 text-brand-orange" />
                                        </div>
                                        <h3 className="font-display text-lg md:text-xl mb-2 text-[#1A1A1A] dark:text-white">{item.title}</h3>
                                        <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== LATEST ARTICLE ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">Latest Article</p>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight max-w-2xl">
                            From our <span className="text-[#6B7280] dark:text-gray-400">blog</span>
                        </h2>
                    </div>

                    {BLOG_POSTS.filter((p) => p.featured).map((post) => {
                        const formatDate = (dateStr) => {
                            const date = new Date(dateStr + 'T00:00:00');
                            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                        };

                        return (
                            <ScrollReveal key={post.slug}>
                                <Link to={`/blog/${post.slug}`} className="group block bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden">
                                    <div className="p-8 md:p-12">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">{formatDate(post.date)}</span>
                                            <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                                            <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">{post.readTime}</span>
                                            <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                                            <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">{post.category}</span>
                                        </div>

                                        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight mb-4 text-[#1A1A1A] dark:text-white group-hover:text-brand-orange transition-colors duration-300 max-w-4xl">
                                            {post.title}
                                        </h3>

                                        <p className="text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                                            {post.excerpt}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-medium group-hover:gap-3 transition-all">
                                            Read article
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-4xl mx-auto relative z-10 text-center section-divider pt-12 md:pt-16">
                    <ScrollReveal>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
                            Ready to get started?
                        </h2>
                        <p className="text-[#6B7280] dark:text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                            License your data or access verified datasets. Talk to our team today.
                        </p>
                        <div className="flex justify-center">
                            <a
                                href="https://tally.so/r/gDGD7O"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-brand-orange text-black font-medium hover:bg-white transition-colors text-sm uppercase tracking-wide"
                            >
                                Get Started
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer variant="enterprise" />
        </div>
    );
};

export default LandingPage;
