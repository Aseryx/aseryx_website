import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Zap, Building2, Users, FileCheck, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [manifestoExpanded, setManifestoExpanded] = useState(false);
    const [showPartnerModal, setShowPartnerModal] = useState(false);
    const [showIndividualModal, setShowIndividualModal] = useState(false);
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

            {/* Minimal Nav */}
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl' : ''}`}>
                <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/aseryx.webp" alt="Aseryx" className="w-8 h-8 object-contain" />
                        <span className="text-lg font-medium tracking-tight">Aseryx</span>
                    </div>
                    <button 
                        onClick={() => setShowPartnerModal(true)}
                        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Get in touch
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </nav>

            {/* HERO - Editorial/Magazine Style */}
            <section className="relative min-h-screen flex items-end pb-24 pt-40">
                {/* Abstract Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <img 
                        src="/hero-bg.png" 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 animate-hero-drift"
                    />
                    {/* Overlay gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
                    {/* Asymmetric layout */}
                    <div className="grid lg:grid-cols-12 gap-8 items-end">
                        {/* Main headline - massive, serif */}
                        <div className="lg:col-span-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-8 animate-fade-in">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                                </span>
                                PRIVACY INFRASTRUCTURE
                            </div>
                            
                            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-tight mb-8">
                                <span className="block animate-fade-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>Verify patient</span>
                                <span className="block animate-fade-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>data</span>
                                <span className="block italic text-gray-500 animate-fade-up delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>without</span>
                                <span className="block animate-fade-up delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>holding it.</span>
                            </h1>
                        </div>

                        {/* Side content */}
                        <div className="lg:col-span-4 lg:pb-8 animate-fade-up delay-500 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md opacity-80">
                                Verify patient eligibility without accessing their records. 
                                Screen candidates, monitor endpoints, maintain audit trails—
                                <span className="text-gray-300"> your team never touches PHI.</span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={() => setShowPartnerModal(true)}
                                    className="group px-6 py-4 bg-white text-black font-medium rounded-none hover:bg-brand-orange transition-colors flex items-center justify-center gap-2 btn-lift"
                                >
                                    Schedule demo
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button 
                                    onClick={() => setShowIndividualModal(true)}
                                    className="px-6 py-4 border border-gray-700 text-gray-400 font-medium rounded-none hover:border-white hover:text-white transition-all btn-lift"
                                >
                                    I'm an individual
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="mt-20 pt-8 border-t border-gray-800 flex flex-wrap gap-12 animate-fade-in delay-700 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <div>
                            <p className="font-mono text-brand-orange text-sm">01</p>
                            <p className="text-3xl font-light mt-1">Granular</p>
                            <p className="text-gray-600 text-sm mt-1">access control</p>
                        </div>
                        <div>
                            <p className="font-mono text-brand-orange text-sm">02</p>
                            <p className="text-3xl font-light mt-1">Zero</p>
                            <p className="text-gray-600 text-sm mt-1">data custody</p>
                        </div>
                        <div>
                            <p className="font-mono text-brand-orange text-sm">03</p>
                            <p className="text-3xl font-light mt-1">100%</p>
                            <p className="text-gray-600 text-sm mt-1">audit trail</p>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <span className="text-gray-600 text-xs font-mono uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="w-5 h-5 text-gray-600 animate-scroll-indicator" />
                    </div>
                </div>
            </section>

            {/* THE PROBLEM - Bold typography, staggered grid */}
            <section className="py-48 px-8 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Section header - offset */}
                    <div className="grid lg:grid-cols-12 gap-8 mb-24">
                        <ScrollReveal className="lg:col-span-4" direction="right">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">The Problem</p>
                        </ScrollReveal>
                        <div className="lg:col-span-8">
                            <ScrollReveal delay={200}>
                                <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
                                    You need patient data to advance medicine.
                                    <br />
                                    <span className="text-gray-600">But holding it creates liability.</span>
                                </h2>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Problem cards - distinctive asymmetric layouts */}
                    <div className="grid md:grid-cols-12 gap-4 md:gap-6">
                        {/* Card 1 - Large stat dominates */}
                        <ScrollReveal className="md:col-span-5 relative group card-lift" delay={200}>
                            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange via-brand-coral to-transparent transition-all group-hover:w-2"></div>
                            <div className="pl-6 py-8">
                                <p className="font-mono text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-4">Data Liability</p>
                                <p className="font-display text-[5rem] md:text-[7rem] leading-none text-brand-orange tracking-tighter group-hover:scale-105 transition-transform origin-left">$10.9<span className="text-3xl text-gray-600">M</span></p>
                                <p className="text-gray-700 text-xs uppercase tracking-wider mt-2 mb-6">avg. breach cost</p>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Every PHI record you hold is a potential breach. Regulatory risk compounds with scale.</p>
                            </div>
                        </ScrollReveal>
                        
                        {/* Card 2 - Rotated accent, different structure */}
                        <ScrollReveal className="md:col-span-4 md:mt-16 relative group card-lift" delay={400}>
                            <div className="absolute -top-3 left-8 bg-brand-orange text-black text-[10px] font-mono px-3 py-1 tracking-widest group-hover:-translate-y-1 transition-transform">
                                FRAGMENTED
                            </div>
                            <div className="pt-8 pb-6">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="font-display text-[4rem] text-white leading-none">10</span>
                                    <span className="text-brand-coral text-2xl">+</span>
                                    <span className="text-gray-600 text-xs uppercase tracking-wider">sources/<br/>patient</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">EHRs, wearables, labs, imaging—scattered across incompatible systems.</p>
                                <div className="mt-6 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-8 h-1 bg-gray-800 transition-colors group-hover:bg-brand-orange/40" style={{opacity: 1 - i * 0.15, transitionDelay: `${i * 50}ms`}}></div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                        
                        {/* Card 3 - Timeline/duration feel */}
                        <ScrollReveal className="md:col-span-3 md:mt-32 relative card-lift" delay={600}>
                            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gray-800 group-hover:border-brand-orange transition-colors duration-500"></div>
                            <div className="py-8">
                                <p className="font-mono text-[10px] text-gray-700 tracking-widest uppercase mb-8">Recruitment</p>
                                <div className="relative">
                                    <p className="font-display text-5xl text-white tracking-tight">6-12</p>
                                    <p className="text-brand-orange text-lg mt-1">months delay</p>
                                    <div className="absolute -left-4 top-1/2 w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                                </div>
                                <p className="text-gray-600 text-xs mt-8 leading-relaxed">Manual eligibility verification doesn't scale. Trials slip while charts are reviewed.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS - Horizontal scroll feel */}
            <section className="py-48 px-8 bg-[#050505] relative overflow-hidden">
                {/* Large background text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                    <p className="font-display text-[20vw] text-gray-900/30 select-none animate-hero-drift opacity-50">VERIFY WITHOUT ACCESS</p>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 mb-24">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">How It Works</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
                                Verify without custody.
                            </h2>
                        </div>
                    </div>

                    {/* Flow - distinctive horizontal process */}
                    <div className="relative">
                        {/* Connection line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-gray-800 via-brand-orange/50 to-gray-800"></div>
                        
                        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
                            {/* Patient */}
                            <div className="flex-1 relative z-10">
                                <div className="h-full p-8 lg:pr-12 relative">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gray-700"></div>
                                    <p className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-6">Patient</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">Encrypted Vault</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Wearables, labs, EHR data—unified under patient control.</p>
                                    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-[#050505] border border-gray-800 items-center justify-center z-20">
                                        <ArrowRight className="w-4 h-4 text-gray-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Aseryx - central, elevated */}
                            <div className="flex-1 relative z-20">
                                <div className="h-full mx-4 lg:mx-8 relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/20 via-brand-orange/5 to-transparent"></div>
                                    <div className="absolute inset-0 border-2 border-brand-orange/40"></div>
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-orange text-black text-[10px] font-mono tracking-widest">
                                        SECURE VERIFICATION
                                    </div>
                                    <div className="relative p-8 pt-10">
                                        <h3 className="font-display text-3xl mb-3 text-brand-orange">Aseryx</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Secure verification. You never see patient data.</p>
                                        <div className="mt-6 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                                            <span className="text-[10px] text-gray-600 font-mono tracking-wider">PROCESSING</span>
                                        </div>
                                    </div>
                                    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-[#050505] border border-brand-orange/30 items-center justify-center z-20">
                                        <ArrowRight className="w-4 h-4 text-brand-orange" />
                                    </div>
                                </div>
                            </div>

                            {/* Organization */}
                            <div className="flex-1 relative z-10">
                                <div className="h-full p-8 lg:pl-12 relative">
                                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gray-700"></div>
                                    <p className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-6">Your Organization</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">Verified Answer</h3>
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-green-400 font-mono text-sm">"Patient is eligible"</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Use cases - varied layout */}
                    <div className="grid md:grid-cols-3 gap-8 mt-20">
                        {[
                            { title: "Trial Recruitment", desc: "Query eligibility across networks in minutes", accent: "border-l-2 border-brand-orange" },
                            { title: "Remote Monitoring", desc: "Verify endpoints from wearables without custody", accent: "border-l-2 border-brand-coral" },
                            { title: "Audit Compliance", desc: "Tamper-proof record of every verification", accent: "border-l-2 border-gray-600" }
                        ].map((item, i) => (
                            <ScrollReveal key={i} className={`pl-6 py-4 ${item.accent} group hover:bg-white/5 transition-colors duration-300`} delay={i * 150}>
                                <h4 className="font-medium text-white mb-2 text-lg group-hover:text-brand-orange transition-colors">{item.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES - What Our Technology Enables */}
            <section className="py-48 px-8 relative">
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 mb-24">
                        <div className="lg:col-span-5">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-6">Technology</p>
                            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
                                What our<br />
                                <span className="italic">infrastructure</span><br />
                                enables.
                            </h2>
                        </div>
                        <div className="lg:col-span-7 lg:pt-20">
                            <ScrollReveal delay={200}>
                                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                    Verify eligibility in minutes. Never touch PHI. 
                                    Full compliance without trade-offs.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Capability Cards - Editorial style with large stats */}
                    <div className="grid md:grid-cols-3 gap-px bg-gray-900/50">
                        {/* Card 1 - Speed */}
                        <ScrollReveal className="bg-[#0a0a0a] p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={100}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="font-display text-[4rem] text-white tracking-tight group-hover:text-brand-orange transition-colors duration-300">90</span>
                                <span className="text-brand-orange text-2xl font-light">%</span>
                            </div>
                            <p className="text-brand-orange text-sm font-medium uppercase tracking-wider mb-3">Faster Verification</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Eligibility queries that took weeks of manual chart review—resolved in minutes, automatically.
                            </p>
                            <div className="mt-8 flex gap-1">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-2 h-8 bg-brand-orange/20 group-hover:bg-brand-orange/40 transition-colors" style={{ animationDelay: `${i * 50}ms` }} />
                                ))}
                                <div className="w-2 h-8 bg-gray-800" />
                            </div>
                        </ScrollReveal>

                        {/* Card 2 - Zero Exposure */}
                        <ScrollReveal className="bg-[#0a0a0a] p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={200}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></div>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="font-display text-[4rem] text-white tracking-tight group-hover:text-brand-orange transition-colors duration-300">0</span>
                                <span className="text-gray-600 text-sm uppercase tracking-wider ml-2">bytes<br/>exposed</span>
                            </div>
                            <p className="text-brand-orange text-sm font-medium uppercase tracking-wider mb-3">Complete Privacy Protection</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Verify patient eligibility without accessing their records. Your organization never handles PHI.
                            </p>
                            <div className="mt-8 relative">
                                <div className="w-full h-px bg-gray-800" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-brand-orange rounded-full bg-[#0a0a0a] group-hover:left-[95%] transition-all duration-1000 ease-in-out" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-gray-700 rounded-full bg-[#0a0a0a]" />
                            </div>
                        </ScrollReveal>

                        {/* Card 3 - Audit Trail */}
                        <ScrollReveal className="bg-[#0a0a0a] p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={300}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="font-display text-[4rem] text-white tracking-tight group-hover:text-brand-orange transition-colors duration-300">100</span>
                                <span className="text-brand-orange text-2xl font-light">%</span>
                            </div>
                            <p className="text-brand-orange text-sm font-medium uppercase tracking-wider mb-3">Tamper-Proof Audit Trail</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Every verification permanently recorded. Complete regulatory transparency without data exposure.
                            </p>
                            <div className="mt-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-green-500/70 text-xs">Verified</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* TRUST SIGNALS */}
            <section className="py-48 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">Compliance</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-5xl md:text-6xl leading-[0.9] tracking-tight">
                                Built for regulated industries.
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-900">
                        {[
                            { label: "HIPAA", sub: "Compliant" },
                            { label: "21 CFR Part 11", sub: "Audit ready" },
                            { label: "GDPR", sub: "Privacy first" },
                            { label: "Zero-Custody", sub: "Architecture" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-[#0a0a0a] text-center">
                                <p className="text-xl font-medium text-white">{item.label}</p>
                                <p className="text-gray-600 text-sm mt-1">{item.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-8 border border-gray-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <p className="text-white font-medium">Architecture validated</p>
                            <p className="text-gray-600 text-sm">Independent review at Midnight Summit London, 2025</p>
                        </div>
                        <p className="font-mono text-brand-orange text-sm">Prove activity, keep privacy</p>
                    </div>
                </div>
            </section>


            {/* FOR INDIVIDUALS - Distinct section */}
            <section className="py-48 px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="font-mono text-gray-600 text-sm tracking-widest uppercase mb-6">For Individuals</p>
                            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
                                The Swiss Bank
                                <br />
                                <span className="italic text-brand-orange">for your biology.</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Own your health data. Control who sees it. 
                                Get compensated when you share.
                            </p>
                            <button 
                                onClick={() => setShowIndividualModal(true)}
                                className="group px-6 py-4 border border-gray-700 text-white font-medium rounded-none hover:bg-white hover:text-black transition-all flex items-center gap-3"
                            >
                                Join waitlist
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-px bg-gray-900">
                            {[
                                { title: "Unify", desc: "Oura, Apple Health, labs, genetics—one vault" },
                                { title: "Control", desc: "Grant and revoke access with one click" },
                                { title: "Earn", desc: "License your data. Keep 80%." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-[#050505]">
                                    <h4 className="font-display text-xl text-white mb-1">{item.title}</h4>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MANIFESTO TEASER */}
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
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-gray-400">Health data must become programmable property.</p>
                                <p className="text-gray-400">When data is property, the individual becomes sovereign over their own biology. AI laboratories receive consented, longitudinal, high-resolution human truth. Medicine escapes the tragedy of the commons.</p>
                                <p className="text-brand-orange font-medium">This is not a company. It is the infrastructure layer for the biological century.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-48 px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="font-display text-5xl md:text-8xl leading-[0.85] tracking-tight mb-12">
                        Ready to eliminate
                        <br />
                        <span className="italic text-gray-600">data liability?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => setShowPartnerModal(true)}
                            className="group px-8 py-5 bg-white text-black text-lg font-medium rounded-none hover:bg-brand-orange transition-colors flex items-center justify-center gap-3 btn-lift"
                        >
                            Schedule a demo
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={() => setShowIndividualModal(true)}
                            className="px-8 py-5 border border-gray-700 text-gray-400 text-lg font-medium rounded-none hover:border-white hover:text-white transition-all btn-lift"
                        >
                            Join as individual
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER - Minimal */}
            <footer className="py-8 px-8 border-t border-gray-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-sm">© 2025 Aseryx</p>
                    <div className="flex items-center gap-8 text-sm text-gray-600">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </footer>

            {/* Partner Modal */}
            {showPartnerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-xl bg-[#111] border border-gray-800">
                        <button onClick={() => setShowPartnerModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="p-8">
                            <p className="font-mono text-brand-orange text-xs uppercase tracking-widest mb-4">Partner Inquiry</p>
                            <h3 className="font-display text-3xl mb-6">Let's talk.</h3>
                            <iframe src="https://tally.so/r/mVRjjM?transparentBackground=1" width="100%" height="350" frameBorder="0" title="Partner form" />
                        </div>
                    </div>
                </div>
            )}

            {/* Individual Modal */}
            {showIndividualModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-xl bg-[#111] border border-gray-800">
                        <button onClick={() => setShowIndividualModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="p-8">
                            <p className="font-mono text-gray-600 text-xs uppercase tracking-widest mb-4">Individual Waitlist</p>
                            <h3 className="font-display text-3xl mb-6">Join the revolution.</h3>
                            <iframe src="https://tally.so/r/mVRjjM?transparentBackground=1" width="100%" height="350" frameBorder="0" title="Waitlist form" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
