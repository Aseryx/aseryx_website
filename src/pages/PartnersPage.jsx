import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Check, TrendingUp, Activity, Factory } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import { GeometricToroid, GeometricLattice } from '../components/common/GeometricIllustrations.jsx';

const PartnersPage = () => {
    useEffect(() => {
        document.title = "Aseryx | For Data Holders";
    }, []);

    return (
        <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">

            {/* Nav */}
            <Navigation variant="enterprise" />

            <section id="main-content" className="relative min-h-screen flex items-center pt-32 pb-24 grid-bg">
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
                                FOR PARTNERS
                            </div>

                            <h1 className="font-display text-4xl sm:text-5xl lg:text-[clamp(3.5rem,6vw,5rem)] leading-[0.9] tracking-tight mb-8">
                                <span className="block">Your data is already</span>
                                <span className="block italic text-[#6B7280] dark:text-gray-400">in demand.</span>
                            </h1>

                            <p className="text-[#6B7280] dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                Know what your data is worth. License it without giving up control. Keep 80 to 85%.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://tally.so/r/eq6aVq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group px-8 py-4 bg-brand-orange text-black font-medium text-sm uppercase tracking-wide hover:bg-white transition-colors flex items-center justify-center gap-3"
                                >
                                    Talk to Our Team
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Visual / Stats */}
                        <div className="lg:col-span-5 relative">
                             <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl opacity-20 rounded-full"></div>
                             <div className="relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f0f0f] p-8">
                                <div className="space-y-8">
                                    <div>
                                        <p className="font-mono text-[10px] text-[#6B7280] dark:text-gray-400 uppercase tracking-widest mb-2">Quality Score</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-[#1A1A1A] dark:text-white font-display">0 to 100</span>
                                            <span className="text-sm text-[#6B7280] dark:text-gray-400">verified before you price</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-[87%] h-full bg-brand-orange"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-[#6B7280] dark:text-gray-400 uppercase tracking-widest mb-2">Revenue Share</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-[#1A1A1A] dark:text-white font-display">80 to 85%</span>
                                            <span className="text-sm text-[#6B7280] dark:text-gray-400">revenue to you</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-full h-full bg-brand-orange animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-[#6B7280] dark:text-gray-400 uppercase tracking-widest mb-2">Control</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-[#1A1A1A] dark:text-white font-display">100%</span>
                                            <span className="text-sm text-[#6B7280] dark:text-gray-400">approval authority</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-full h-full bg-brand-orange"></div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                
            </section>

            {/* THE SHIFT */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505] grid-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16 section-divider pt-8">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase">The Shift</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                                You stay in control.<br/>
                                <span className="block italic text-[#6B7280] dark:text-gray-400">The revenue comes to you.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal delay={100}>
                            <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-transparent dark:border-transparent opacity-70 hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center justify-center py-12 md:py-16 grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <GeometricLattice className="w-40 h-40 md:w-56 md:h-56 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 md:p-10 flex-1 border-t border-[#E8E4DE] dark:border-[#1F2937]">
                                    <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-6 uppercase tracking-wider">The Old Way</p>
                                    <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-6">Data Brokering</h3>
                                    <ul className="space-y-4 text-[#6B7280] dark:text-gray-400 text-sm md:text-base">
                                        <li className="flex gap-3"><span className="text-red-500 mt-0.5">×</span> Lose custody of files forever</li>
                                        <li className="flex gap-3"><span className="text-red-500 mt-0.5">×</span> One-time payment only</li>
                                        <li className="flex gap-3"><span className="text-red-500 mt-0.5">×</span> You inherit the compliance liability</li>
                                        <li className="flex gap-3"><span className="text-red-500 mt-0.5">×</span> Generic pricing, low value</li>
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="group h-full flex flex-col bg-[#EDEBE8] dark:bg-[#111111] card-oasis-alt overflow-hidden border border-brand-orange/10 dark:border-brand-orange/20">
                                <div className="flex items-center justify-center py-12 md:py-16">
                                    <GeometricToroid className="w-40 h-40 md:w-56 md:h-56 text-brand-orange group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 md:p-10 flex-1 border-t border-brand-orange/20 dark:border-brand-orange/30">
                                    <p className="font-mono text-xs text-brand-orange mb-6 uppercase tracking-wider">The New Way</p>
                                    <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-6">Verified Licensing</h3>
                                    <ul className="space-y-4 text-[#6B7280] dark:text-gray-400 text-sm md:text-base">
                                        <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" /> <span>Verified quality score (0 to 100) before you set a price</span></li>
                                        <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" /> <span>You approve every access request</span></li>
                                        <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" /> <span>80 to 85% recurring revenue per training run</span></li>
                                        <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" /> <span>Zero liability. Enforced automatically, not by contracts</span></li>
                                        <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" /> <span>Your terms. Your price.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

             {/* PARTNER PROFILES */}
             <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#0a0a0a] grid-bg">
                 <div className="max-w-7xl mx-auto">
                     <h2 className="font-display text-4xl md:text-5xl mb-24 text-[#1A1A1A] dark:text-white">Built For</h2>

                     <div className="flex flex-col">
                         {/* 1. FINANCE */}
                         <ScrollReveal className="group relative border-t border-gray-200 dark:border-gray-800 py-12 transition-colors duration-500 hover:bg-gray-100/50 dark:hover:bg-[#0f0f0f]/50" delay={100}>
                             <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/50 to-brand-orange/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="grid md:grid-cols-12 gap-8 items-start">
                                 <div className="md:col-span-4 flex items-center gap-4">
                                     <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-900/50 text-[#6B7280] dark:text-gray-400 group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition-colors duration-300">
                                        <TrendingUp className="w-6 h-6" />
                                     </div>
                                     <span className="font-mono text-sm text-[#6B7280] dark:text-gray-400 uppercase tracking-widest group-hover:text-brand-orange/80 transition-colors">Finance Focus</span>
                                 </div>
                                 <div className="md:col-span-8">
                                     <h3 className="font-display text-3xl text-[#1A1A1A] dark:text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">Hedge Funds & Syndicates</h3>
                                     <p className="text-[#6B7280] dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        Monetize deal flow, trade logs, and performance data. Prove quality to AI buyers without revealing positions or strategy.
                                     </p>
                                 </div>
                             </div>
                         </ScrollReveal>

                         {/* 2. HEALTHCARE */}
                         <ScrollReveal className="group relative border-t border-gray-200 dark:border-gray-800 py-12 transition-colors duration-500 hover:bg-gray-100/50 dark:hover:bg-[#0f0f0f]/50" delay={200}>
                             <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/50 to-brand-orange/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="grid md:grid-cols-12 gap-8 items-start">
                                 <div className="md:col-span-4 flex items-center gap-4">
                                     <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-900/50 text-[#6B7280] dark:text-gray-400 group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition-colors duration-300">
                                        <Activity className="w-6 h-6" />
                                     </div>
                                     <span className="font-mono text-sm text-[#6B7280] dark:text-gray-400 uppercase tracking-widest group-hover:text-brand-orange/80 transition-colors">Health Focus</span>
                                 </div>
                                 <div className="md:col-span-8">
                                     <h3 className="font-display text-3xl text-[#1A1A1A] dark:text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">Clinics & Health Systems</h3>
                                     <p className="text-[#6B7280] dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        Patient data never leaves your systems. Get a verified quality score, set your price, and earn recurring revenue on every training run.
                                     </p>
                                 </div>
                             </div>
                         </ScrollReveal>

                         {/* 3. INDUSTRY AGNOSTIC */}
                         <ScrollReveal className="group relative border-t border-b border-gray-200 dark:border-gray-800 py-12 transition-colors duration-500 hover:bg-gray-100/50 dark:hover:bg-[#0f0f0f]/50" delay={300}>
                             <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/50 to-brand-orange/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/50 to-brand-orange/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="grid md:grid-cols-12 gap-8 items-start">
                                 <div className="md:col-span-4 flex items-center gap-4">
                                     <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-900/50 text-[#6B7280] dark:text-gray-400 group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition-colors duration-300">
                                        <Factory className="w-6 h-6" />
                                     </div>
                                     <span className="font-mono text-sm text-[#6B7280] dark:text-gray-400 uppercase tracking-widest group-hover:text-brand-orange/80 transition-colors">Industry Agnostic</span>
                                 </div>
                                 <div className="md:col-span-8">
                                     <h3 className="font-display text-3xl text-[#1A1A1A] dark:text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">Legal, Research & Industrial</h3>
                                     <p className="text-[#6B7280] dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        Legal archives. Sensor data. Research datasets. If it's valuable and hard to share safely, Aseryx was built for it.
                                     </p>
                                 </div>
                             </div>
                         </ScrollReveal>
                     </div>
                 </div>
             </section>

            {/* CTA */}
            <section className="py-32 px-4 md:px-8 bg-[#F9F8F6] dark:bg-[#050505] border-t border-gray-200 dark:border-gray-900 grid-bg">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-8">
                        Your data has value.<br/>
                        <span className="italic text-brand-orange">Start earning from it.</span>
                    </h2>
                    <p className="text-[#6B7280] dark:text-gray-400 mb-12 text-lg">Keep full custody. We handle the rest.</p>
                    <a
                        href="https://tally.so/r/eq6aVq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-black font-medium hover:bg-white transition-colors text-sm uppercase tracking-wide"
                    >
                        Talk to Our Partnership Team
                        <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer variant="enterprise" />

        </div>
    );
};

export default PartnersPage;
