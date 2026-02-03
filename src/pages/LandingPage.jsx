import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import GrainOverlay from '../components/common/GrainOverlay.jsx';
import CursorGlow from '../components/common/CursorGlow.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import useMousePosition from '../hooks/useMousePosition.jsx';

const LandingPage = () => {
    const mousePosition = useMousePosition();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-black overflow-x-hidden">
            
            <GrainOverlay />
            <CursorGlow mousePosition={mousePosition} />
            <Navigation variant="enterprise" />

            {/* HERO - Editorial/Magazine Style */}
            <section className="relative min-h-screen flex items-end pb-16 md:pb-24 pt-32 md:pt-40">
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

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                    {/* Asymmetric layout */}
                    <div className="grid lg:grid-cols-12 gap-8 items-end">
                        {/* Main headline - massive, serif */}
                        <div className="lg:col-span-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-8 animate-fade-in">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                                </span>
                                COMPLIANCE INFRASTRUCTURE
                            </div>
                            
                            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-tight mb-8">
                                <span className="block animate-fade-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>Verify eligibility.</span>
                                <span className="block animate-fade-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>Skip the</span>
                                <span className="block italic text-gray-500 animate-fade-up delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>compliance queue.</span>
                            </h1>
                        </div>

                        {/* Side content */}
                        <div className="lg:col-span-4 lg:pb-8 animate-fade-up delay-500 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md opacity-80">
                                Verify eligibility across health networks in minutes instead of months. 
                                <span className="text-gray-300">No PHI custody. No breach liability.</span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="https://tally.so/r/dWdWQq"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative px-8 py-4 bg-transparent border border-white/80 text-white font-medium tracking-wide uppercase text-sm overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        Inquire for pilot
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="absolute inset-0 flex items-center justify-center gap-3 text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        Inquire for pilot
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-gray-800 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-12 animate-fade-in delay-700 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <div>
                            <p className="font-mono text-brand-orange text-sm">01</p>
                            <p className="text-3xl font-light mt-1">Zero</p>
                            <p className="text-gray-600 text-sm mt-1">PHI custody required</p>
                        </div>
                        <div>
                            <p className="font-mono text-brand-orange text-sm">02</p>
                            <p className="text-3xl font-light mt-1">Minutes</p>
                            <p className="text-gray-600 text-sm mt-1">not months to verify</p>
                        </div>
                        <div>
                            <p className="font-mono text-brand-orange text-sm">03</p>
                            <p className="text-3xl font-light mt-1">On-chain</p>
                            <p className="text-gray-600 text-sm mt-1">audit trail included</p>
                        </div>
                    </div>

                    {/* Scroll Indicator - hidden on mobile */}
                    <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
                        <span className="text-gray-600 text-xs font-mono uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="w-5 h-5 text-gray-600 animate-scroll-indicator" />
                    </div>
                </div>
            </section>

            {/* THE PROBLEM - Bold typography, staggered grid */}
            <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Section header - offset */}
                    <div className="grid lg:grid-cols-12 gap-4 md:gap-8 mb-12 md:mb-24">
                        <ScrollReveal className="lg:col-span-4" direction="right">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">The Problem</p>
                        </ScrollReveal>
                        <div className="lg:col-span-8">
                            <ScrollReveal delay={200}>
                                <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight">
                                    Getting research-grade health data
                                    <br />
                                    <span className="text-gray-600">is expensive and risky.</span>
                                </h2>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Problem cards - stacked on mobile, grid on larger screens */}
                    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-12 md:gap-6">
                        {/* Card 1 - Large stat dominates */}
                        <ScrollReveal className="md:col-span-5 relative group card-lift" delay={200}>
                            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange via-brand-coral to-transparent transition-all group-hover:w-2"></div>
                            <div className="pl-6 py-8">
                                <p className="font-mono text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-4">Data Custody</p>
                                <p className="font-display text-[4rem] md:text-[5rem] lg:text-[7rem] leading-none text-brand-orange tracking-tighter group-hover:scale-105 transition-transform origin-left">$10.9<span className="text-2xl md:text-3xl text-gray-600">M</span></p>
                                <p className="text-gray-700 text-xs uppercase tracking-wider mt-2 mb-6">avg. breach cost</p>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Traditional data access means custody. Custody means liability. What if you never touched the raw data?</p>
                            </div>
                        </ScrollReveal>
                        
                        {/* Card 2 - Rotated accent, different structure */}
                        <ScrollReveal className="md:col-span-4 md:mt-16 relative group card-lift" delay={400}>
                            <div className="absolute -top-3 left-8 bg-brand-orange text-black text-[10px] font-mono px-3 py-1 tracking-widest group-hover:-translate-y-1 transition-transform">
                                CONSENT & COMPLIANCE
                            </div>
                            <div className="pt-8 pb-6">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="font-display text-[3rem] md:text-[4rem] text-white leading-none">N+1</span>
                                    <span className="text-gray-600 text-xs uppercase tracking-wider">consent<br/>agreements</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">Every patient, every study, every site. Consent management scales linearly with your ambition.</p>
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
                                <p className="font-mono text-[10px] text-gray-700 tracking-widest uppercase mb-8">Access Time</p>
                                <div className="relative">
                                    <p className="font-display text-4xl md:text-5xl text-white tracking-tight">Months</p>
                                    <p className="text-brand-orange text-lg mt-1">to first data</p>
                                    <div className="absolute -left-4 top-1/2 w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                                </div>
                                <p className="text-gray-600 text-xs mt-8 leading-relaxed">By the time you negotiate access, your competitors have already enrolled patients.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS - Pure B2B Flow */}
            <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8 bg-[#050505] relative overflow-hidden">
                {/* Large background text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                    <p className="font-display text-[20vw] text-gray-900/30 select-none animate-hero-drift opacity-50">VERIFY WITHOUT CUSTODY</p>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 mb-24">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase">How It Works</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight">
                                Query. Verify. Ship.
                            </h2>
                        </div>
                    </div>

                    {/* Flow - B2B focused */}
                    <div className="relative">
                        {/* Connection line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-gray-800 via-brand-orange/50 to-gray-800"></div>
                        
                        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
                            <div className="flex-1 relative z-10">
                                <div className="h-full p-8 lg:pr-12 relative">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gray-700"></div>
                                    <p className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-6">Step 01</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">Define Criteria</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">Specify eligibility requirements: health metrics, demographics, or clinical thresholds for your study.</p>
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
                                        AUTOMATED VERIFICATION
                                    </div>
                                    <div className="relative p-8 pt-10">
                                        <h3 className="font-display text-3xl mb-3 text-brand-orange">Query Network</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Our infrastructure verifies eligibility across the network. No PHI touches your systems.</p>
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

                            <div className="flex-1 relative z-10">
                                <div className="h-full p-8 lg:pl-12 relative">
                                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gray-700"></div>
                                    <p className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase mb-6">Step 03</p>
                                    <h3 className="font-display text-3xl mb-3 text-white">Get Verified Results</h3>
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-green-400 font-mono text-sm">"847 eligible patients"</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Use cases - varied layout */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20">
                        {[
                            { title: "Multi-Site Recruitment", desc: "Query eligibility across health networks in minutes, not months", accent: "border-l-2 border-brand-orange" },
                            { title: "Endpoint Monitoring", desc: "Verify outcomes from wearables and EHRs without data custody", accent: "border-l-2 border-brand-coral" },
                            { title: "Regulatory Compliance", desc: "Immutable audit trail for every verification—inspection-ready", accent: "border-l-2 border-gray-600" }
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
            <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8 relative">
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-4 md:gap-8 mb-12 md:mb-24">
                        <div className="lg:col-span-5">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-4 md:mb-6">Results</p>
                            <h2 className="font-display text-3xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight">
                                What this means<br />
                                <span className="italic">for your team.</span>
                            </h2>
                        </div>
                        <div className="lg:col-span-7 lg:pt-20">
                            <ScrollReveal delay={200}>
                                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                    Replace months of compliance reviews with automated verification. 
                                    Your researchers focus on science, not paperwork.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Capability Cards - Editorial style with large stats */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-px bg-gray-900/50">
                        {/* Card 1 - Speed */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={100}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            <div className="flex items-baseline gap-2 mb-4 md:mb-6">
                                <span className="font-display text-[2.5rem] md:text-[3rem] text-white tracking-tight group-hover:text-brand-orange transition-colors duration-300">Mins</span>
                            </div>
                            <p className="text-brand-orange text-sm font-medium uppercase tracking-wider mb-3">Not Months</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Query eligibility across the network instantly. No chart reviews, no DUA negotiations, no waiting.
                            </p>
                            <div className="mt-8 flex gap-1">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`w-2 h-8 ${i === 0 ? 'bg-brand-orange' : 'bg-gray-800'} group-hover:bg-brand-orange/40 transition-colors`} style={{ animationDelay: `${i * 50}ms` }} />
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Card 2 - Zero Exposure */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden" delay={200}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></div>
                            <div className="flex items-baseline gap-2 mb-4 md:mb-6">
                                <span className="font-display text-[2.5rem] md:text-[3rem] text-white tracking-tight group-hover:text-brand-orange transition-colors duration-300">Zero</span>
                            </div>
                            <p className="text-brand-orange text-sm font-medium uppercase tracking-wider mb-3">PHI Custody</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Verification happens at the source. You receive proofs, not raw data. No BAAs. No breach liability.
                            </p>
                            <div className="mt-8 relative">
                                <div className="w-full h-px bg-gray-800" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-brand-orange rounded-full bg-[#0a0a0a] group-hover:left-[95%] transition-all duration-1000 ease-in-out" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-gray-700 rounded-full bg-[#0a0a0a]" />
                            </div>
                        </ScrollReveal>

                        {/* Card 3 - Audit Trail */}
                        <ScrollReveal className="bg-[#0a0a0a] p-6 md:p-10 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden sm:col-span-2 md:col-span-1" delay={300}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
                            <div className="flex items-baseline gap-2 mb-4 md:mb-6">
                                <span className="font-display text-[2.5rem] md:text-[3rem] text-white tracking-tight group-hover:text-brand-orange transition-colors duration-300">On-chain</span>
                            </div>
                            <p className="text-brand-orange text-sm font-medium uppercase tracking-wider mb-3">Audit Trail</p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Every verification recorded immutably. Complete transparency when regulators come calling.
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

            {/* WHO THIS IS FOR - Distinctive asymmetric layout */}
            <section className="py-16 md:py-32 px-4 md:px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
                        {/* Left: Large statement */}
                        <div className="lg:sticky lg:top-32">
                            <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-4 md:mb-6">Built For</p>
                            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tight mb-6 md:mb-8">
                                The leaders who<br />
                                <span className="italic text-gray-500">own the decision.</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                                Enterprise healthcare moves slow because compliance moves slow. 
                                We built this for the people who can change that.
                            </p>
                        </div>
                        
                        {/* Right: Stacked personas with varied treatment */}
                        <div className="space-y-0">
                            <ScrollReveal className="py-8 border-b border-gray-800 group" delay={100}>
                                <div className="flex items-start gap-6">
                                    <span className="font-mono text-brand-orange text-sm">01</span>
                                    <div>
                                        <h3 className="font-display text-2xl text-white group-hover:text-brand-orange transition-colors">Chief Data Officers</h3>
                                        <p className="text-gray-600 mt-2">Reduce compliance overhead without sacrificing rigor.</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal className="py-8 border-b border-gray-800 group" delay={200}>
                                <div className="flex items-start gap-6">
                                    <span className="font-mono text-brand-orange text-sm">02</span>
                                    <div>
                                        <h3 className="font-display text-2xl text-white group-hover:text-brand-orange transition-colors">VP Clinical Operations</h3>
                                        <p className="text-gray-600 mt-2">Hit recruitment timelines without waiting on legal.</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal className="py-8 border-b border-gray-800 group" delay={300}>
                                <div className="flex items-start gap-6">
                                    <span className="font-mono text-brand-orange text-sm">03</span>
                                    <div>
                                        <h3 className="font-display text-2xl text-white group-hover:text-brand-orange transition-colors">Research Directors</h3>
                                        <p className="text-gray-600 mt-2">Access diverse cohorts with audit trails that satisfy regulators.</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal className="py-8 group" delay={400}>
                                <div className="flex items-start gap-6">
                                    <span className="font-mono text-brand-orange text-sm">04</span>
                                    <div>
                                        <h3 className="font-display text-2xl text-white group-hover:text-brand-orange transition-colors">Chief Compliance Officers</h3>
                                        <p className="text-gray-600 mt-2">Eliminate breach liability. Full transparency on demand.</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL FOUNDATION - Unified, editorial */}
            <section className="py-16 md:py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section intro */}
                    <div className="max-w-3xl mb-12 md:mb-24">
                        <p className="font-mono text-brand-orange text-sm tracking-widest uppercase mb-4 md:mb-6">Technical Foundation</p>
                        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tight mb-6 md:mb-8">
                            Three decisions that<br />
                            <span className="italic text-gray-500">change everything.</span>
                        </h2>
                    </div>
                    
                    {/* Horizontal flow - distinctive treatment */}
                    <div className="relative">
                        {/* Connecting line */}
                        <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-brand-orange via-gray-800 to-transparent"></div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
                            <ScrollReveal delay={100}>
                                <div className="relative">
                                    <div className="w-6 h-6 bg-brand-orange rounded-full mb-6 md:mb-8 relative z-10"></div>
                                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Zero custody.</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Verification happens at the source. You receive cryptographic proofs, not raw data. 
                                        No BAAs. No breach liability. Nothing to leak.
                                    </p>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={200}>
                                <div className="relative">
                                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full mb-6 md:mb-8 relative z-10 bg-[#0a0a0a]"></div>
                                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Programmatic queries.</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Define criteria once. Verify across the network instantly. 
                                        No more chart review. No DUA negotiations. No waiting.
                                    </p>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={300}>
                                <div className="relative">
                                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full mb-6 md:mb-8 relative z-10 bg-[#0a0a0a]"></div>
                                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Immutable audit.</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Every verification logged on-chain. Complete transparency. 
                                        Regulators get what they need without you lifting a finger.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                    
                    {/* Compliance - simple inline statement */}
                    <div className="mt-16 md:mt-32 pt-8 md:pt-16 border-t border-gray-900">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-x-12 sm:gap-y-4 text-sm">
                                <span className="text-gray-500">HIPAA <span className="text-white">Compliant</span></span>
                                <span className="text-gray-500">GDPR <span className="text-white">Privacy-first</span></span>
                                <span className="text-gray-500">Architecture <span className="text-white">Zero-custody</span></span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Validated at <span className="text-white">Midnight Summit London, 2025</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* FINAL CTA */}
            <section className="py-16 md:py-32 lg:py-48 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="font-display text-3xl md:text-5xl lg:text-8xl leading-[0.85] tracking-tight mb-8 md:mb-12">
                        Ready to skip the<br />
                        <span className="italic text-gray-600">compliance bottleneck?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="https://tally.so/r/dWdWQq"
                            target="_blank"
                            rel="noreferrer"
                            className="group relative px-10 py-5 bg-transparent border-2 border-white text-white font-medium tracking-wide uppercase text-base overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Inquire for pilot
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-brand-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="absolute inset-0 flex items-center justify-center gap-3 text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                Inquire for pilot
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer variant="enterprise" />



        </div>
    );
};

export default LandingPage;
