import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Shield, BadgeCheck, Lock } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import BLOG_POSTS from '../data/blogPosts.js';
import { AppraisalCertificate } from '../components/common/AppraisalCertificate.jsx';

import { GeometricShield, GeometricCube, GeometricSphere, GeometricToroid, GeometricLattice, GeometricPrism, GeometricWave, GeometricHex } from '../components/common/GeometricIllustrations.jsx';
const ROTATING_TEXTS = [
    'We prove it.',
    'You license it.',
];


/* -------------------------------------------------------
   USE CASE CATEGORIES
   ------------------------------------------------------- */

const USE_CASES = ['Genomic Sequence Modeling', 'Algorithmic Fraud Detection', 'Cost Engine Modeling', 'Predictive Maintenance Systems', 'High-Frequency Trading Alpha'];

const UNLOCKS = [
    {
        icon: BadgeCheck,
        title: 'Cryptographic Data Appraisal',
        description: 'Every dataset undergoes a cryptographic appraisal to score information richness. Buyers see proof, not promises.',
    },
    {
        icon: Shield,
        title: 'Zero Custody Licensing',
        description: 'License datasets to AI builders without transferring custody. Your data stays in your infrastructure.',
    },
    {
        icon: Lock,
        title: 'Compliance Built In',
        description: 'Designed for GDPR, HIPAA, and the EU AI Act. Enforced automatically.',
    },
];

/* -------------------------------------------------------
   APPRAISAL CERTIFICATE COMPONENT (IMPORTED)
   ------------------------------------------------------- */

/* -------------------------------------------------------
   LANDING PAGE
   ------------------------------------------------------- */

const LandingPage = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        }, 2000);
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
                        Your data is an asset.<br />
                        <span className="text-rotate-wrapper inline-block align-baseline">
                            {ROTATING_TEXTS.map((text, index) => (
                                <span
                                    key={text}
                                    className={`text-rotate-item text-brand-orange italic ${index === currentTextIndex ? 'active' : ''}`}
                                >
                                    {text}
                                </span>
                            ))}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#6B7280] dark:text-gray-400 leading-relaxed mb-10 max-w-2xl animate-fade-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        Aseryx runs a cryptographic appraisal on your dataset without your data ever leaving your infrastructure. AI builders see a verified score. You license your data to them on your terms.
                    </p>

                    <div className="animate-fade-up delay-300 opacity-0 flex flex-wrap gap-4" style={{ animationFillMode: 'forwards' }}>
                        <a
                            href="https://tally.so/r/eq6aVq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-orange text-black font-medium tracking-wide text-sm uppercase hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a]"
                        >
                            Request an Appraisal
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#how-it-works"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#E5E5E5] dark:border-[#333] text-[#1A1A1A] dark:text-white font-medium tracking-wide text-sm uppercase hover:bg-[#F3F4F6] dark:hover:bg-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                            See How It Works
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
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

            {/* ===== RISK REVERSAL BAND ===== */}
            <section className="py-5 px-4 md:px-8 border-y border-[#E8E4DE] dark:border-[#1F2937] bg-[#F3F1EE] dark:bg-[#0f0f0f]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                            <span className="text-xs font-mono text-[#6B7280] dark:text-gray-400 tracking-wide">Appraisal runs in your environment. Nothing is transmitted.</span>
                        </div>
                        <span className="hidden sm:block w-px h-4 bg-[#D1D5DB] dark:bg-gray-700" />
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                            <span className="text-xs font-mono text-[#6B7280] dark:text-gray-400 tracking-wide">No lock-in. Control access at alltimes.</span>
                        </div>
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

            {/* ===== SECTION 4: HOW IT WORKS ===== */}
            <section id="how-it-works" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
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
                                    <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">01 / Connect</p>
                                    <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Local Infrastructure</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                                        Connect to our enclave. Your data stays local. You control access.
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
                                    <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">02 / Appraise</p>
                                    <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Cryptographic Proof</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-4">
                                        We verify provenance and score information richness. No raw data is ever read.
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
                                    <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">03 / License</p>
                                    <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">On Your Terms</h3>
                                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-4">
                                        AI builders see a verified score. You license access.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ===== DATA APPRAISAL ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">Data Appraisal</p>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight max-w-2xl">
                            Know exactly what your dataset{' '}
                            <span className="italic text-[#6B7280] dark:text-gray-400">is worth to an AI builder.</span>
                        </h2>
                        <p className="text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
                            Every dataset on Aseryx goes through a two-layer cryptographic appraisal. Provenance verified. Richness scored. No raw data is transmitted at any point.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left: Score readout */}
                        <ScrollReveal delay={100}>
                            <AppraisalCertificate />

                            <div className="mt-6">
                                <a
                                    href="https://tally.so/r/eq6aVq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-6 py-3 bg-brand-orange text-black font-medium tracking-wide text-sm uppercase hover:bg-white transition-colors"
                                >
                                    Request an Appraisal
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </ScrollReveal>

                        {/* Right: Layer cards */}
                        <div className="space-y-6">
                            <ScrollReveal delay={200}>
                                <div className="group bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-transparent hover:border-brand-orange/20 transition-colors">
                                    <div className="p-6 md:p-8">
                                        <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">01 / Layer 1</p>
                                        <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Provenance and Readiness</h3>
                                        <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-5">
                                            We verify where the data came from and whether it meets minimum quality standards. A cryptographically signed Verifiable Credential is issued on full pass.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Completeness', 'Accuracy', 'Uniqueness', 'Authenticity'].map((tag) => (
                                                <span key={tag} className="px-2 py-1 text-[10px] font-mono bg-[#F9F8F6] dark:bg-[#0a0a0a] border border-[#E8E4DE] dark:border-[#1F2937] text-[#6B7280] dark:text-gray-500 uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={300}>
                                <div className="group bg-[#EDEBE8] dark:bg-[#111111] card-oasis-alt overflow-hidden border border-brand-orange/10 dark:border-brand-orange/20">
                                    <div className="p-6 md:p-8">
                                        <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">02 / Layer 2</p>
                                        <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">Information Richness</h3>
                                        <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed mb-5">
                                            A score across 11+ dimensions computed via Cryptography. You and the buyer receive a verfiable breakdown of what makes your data useful before any commitment.
                                        </p>
                                        <div className="space-y-2">
                                            {[
                                                { label: 'Schema Depth', desc: 'Field count and type diversity' },
                                                { label: 'Statistical Power', desc: 'Rows relative to dimensionality' },
                                                { label: 'Information Density', desc: 'Cardinality and entropy proxy' },
                                                { label: 'Distribution Quality', desc: 'Class balance across categorical fields' },
                                            ].map((dim) => (
                                                <div key={dim.label} className="flex items-baseline gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0 mt-1.5" />
                                                    <span className="text-xs text-[#1A1A1A] dark:text-white font-medium">{dim.label}</span>
                                                    <span className="text-xs text-[#6B7280] dark:text-gray-500">{dim.desc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 2: KEY BENEFITS (STACKED CARDS LAYOUT) ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg relative">
                <div className="max-w-5xl mx-auto relative z-10 pb-16 md:pb-32">
                    <div className="section-divider pt-8 md:pt-12 mb-16 md:mb-24">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">Key Benefits</p>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                            The economics of private data, <span className="italic text-[#6B7280] dark:text-gray-400">solved.</span>
                        </h2>
                    </div>

                    <div className="relative w-full">
                        {/* Card 1 */}
                        <div className="sticky top-24 w-full h-auto min-h-[40vh] bg-[#EDEBE8] dark:bg-[#111111] border border-[#E8E4DE] dark:border-[#1F2937] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl mb-12 origin-top transition-all card-oasis">
                            <div className="max-w-xl">
                                <p className="font-mono text-brand-orange mb-4 tracking-widest">01 // ZERO CUSTODY</p>
                                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-[#1A1A1A] dark:text-white">Zero Custody Transfer</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                                    Data stays in your infrastructure. Always. License access without surrendering control over your most valuable asset.
                                </p>
                            </div>
                            <GeometricShield className="w-32 h-32 md:w-48 md:h-48 text-brand-orange flex-shrink-0" />
                        </div>

                        {/* Card 2 */}
                        <div className="sticky top-32 w-full h-auto min-h-[40vh] bg-[#F9F8F6] dark:bg-[#0a0a0a] border border-[#E8E4DE] dark:border-[#1F2937] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl mb-12 origin-top transition-all card-oasis">
                            <div className="max-w-xl">
                                <p className="font-mono text-brand-orange mb-4 tracking-widest">02 // VERIFICATION</p>
                                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-[#1A1A1A] dark:text-white">Quality Proven</h3>
                                <p className="text-[#6B7280] dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                                    Every dataset gets a verified appraisal. Buyers see mathematical proof before they commit, eliminating self-reported claims.
                                </p>
                            </div>
                            <GeometricPrism className="w-32 h-32 md:w-48 md:h-48 text-brand-orange flex-shrink-0" />
                        </div>

                        {/* Card 3 */}
                        <div className="sticky top-40 w-full h-auto min-h-[40vh] bg-brand-orange text-black border border-brand-orange p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl origin-top transition-all card-oasis">
                            <div className="max-w-xl">
                                <p className="font-mono text-black/60 mb-4 tracking-widest">03 // ECONOMICS</p>
                                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-black tracking-tight">80-85% Revenue</h3>
                                <p className="text-black/80 text-lg md:text-xl leading-relaxed font-medium">
                                    The vast majority of every licensing agreement goes directly to the data holder. Transparent, auditable, and recurring.
                                </p>
                            </div>
                            <GeometricWave className="w-32 h-32 md:w-48 md:h-48 text-black/20 flex-shrink-0" />
                        </div>
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

            {/* ===== FAQ ===== */}
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
                                    <span className="max-w-3xl pr-8 leading-tight">How does the appraisal work if the data never leaves?</span>
                                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8E4DE] dark:border-[#1F2937] flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    </span>
                                </summary>
                                <div className="pb-10 text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
                                    Our protocol runs directly in your environment. We use cryptographic techniques to verify specific quality dimensions and generate an information richness score, returning only the verified proof and never the raw data itself.
                                </div>
                            </details>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <details className="group border-b border-[#E8E4DE] dark:border-[#1F2937] [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
                                <summary className="font-display text-xl md:text-2xl lg:text-3xl text-[#1A1A1A] dark:text-white cursor-pointer list-none flex justify-between items-center py-6 md:py-8 hover:text-brand-orange transition-colors">
                                    <span className="max-w-3xl pr-8 leading-tight">What happens if my dataset fails Layer 1?</span>
                                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8E4DE] dark:border-[#1F2937] flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    </span>
                                </summary>
                                <div className="pb-10 text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
                                    If a dataset fails the initial provenance and readiness gate, it simply isn't issued a Verifiable Credential. You receive a report on what minimum requirements were not met so you can address them.
                                </div>
                            </details>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <details className="group border-b border-[#E8E4DE] dark:border-[#1F2937] [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
                                <summary className="font-display text-xl md:text-2xl lg:text-3xl text-[#1A1A1A] dark:text-white cursor-pointer list-none flex justify-between items-center py-6 md:py-8 hover:text-brand-orange transition-colors">
                                    <span className="max-w-3xl pr-8 leading-tight">Are you compliant with GDPR and HIPAA?</span>
                                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8E4DE] dark:border-[#1F2937] flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                                    </span>
                                </summary>
                                <div className="pb-10 text-[#6B7280] dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
                                    Yes. Because the data never changes custody or moves to our servers, the Aseryx protocol inherently aligns with strict data residency and privacy regulations.
                                </div>
                            </details>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
                <div className="max-w-4xl mx-auto relative z-10 text-center section-divider pt-12 md:pt-16">
                    <ScrollReveal>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
                            You are one appraisal away from knowing{' '}
                            <span className="italic text-[#6B7280] dark:text-gray-400">what your data is worth.</span>
                        </h2>
                        <p className="text-[#6B7280] dark:text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                            Submit your dataset. You run the appraisal in your environment. You receive a Verifiable Credential and no data leaves your servers.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://tally.so/r/eq6aVq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-orange text-black font-medium hover:bg-white transition-colors text-sm uppercase tracking-wide"
                            >
                                Request an Appraisal
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link
                                to="/buyers"
                                className="group inline-flex items-center gap-3 px-8 py-4 border border-[#E5E5E5] dark:border-[#333] text-[#1A1A1A] dark:text-white font-medium hover:bg-[#F3F4F6] dark:hover:bg-[#1A1A1A] transition-colors text-sm uppercase tracking-wide"
                            >
                                For AI Builders
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </ScrollReveal>
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

            <Footer variant="enterprise" />
        </div>
    );
};

export default LandingPage;
