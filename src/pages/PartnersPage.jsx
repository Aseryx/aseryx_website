import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ArrowUpRight, Check, Shield, Database, Linkedin, TrendingUp, Activity, Factory } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import GrainOverlay from '../components/common/GrainOverlay.jsx';
import CursorGlow from '../components/common/CursorGlow.jsx';

const PartnersPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouse);
        document.title = "Aseryx | For Data Holders";
        return () => {
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-brand-coral selection:text-black overflow-x-hidden">

            <GrainOverlay />
            <CursorGlow mousePosition={mousePosition} />

            {/* Nav */}
            <Navigation variant="enterprise" />

            <section id="main-content" className="relative min-h-screen flex items-center pt-32 pb-24">
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <ParticlesBackground />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/10 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 border border-brand-coral/20 text-brand-coral text-xs font-mono mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-coral opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-coral"></span>
                                </span>
                                FOR PARTNERS
                            </div>
                            
                            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight mb-8">
                                <span className="block">Your data is worth millions.</span>
                                <span className="block italic text-gray-400">Let's prove it.</span>
                            </h1>

                            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                You hold what AI labs will pay hundreds of millions for. Aseryx gives you the infrastructure to license it — without surrendering custody or taking on compliance liability.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://tally.so/r/eq6aVq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group px-8 py-4 bg-brand-coral text-black font-medium text-sm uppercase tracking-wide hover:bg-white transition-colors flex items-center justify-center gap-3"
                                >
                                    Talk to Our Team
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Visual / Stats */}
                        <div className="lg:col-span-5 relative">
                             <div className="absolute -inset-4 bg-brand-coral/20 blur-3xl opacity-20 rounded-full"></div>
                             <div className="relative border border-gray-800 bg-[#0f0f0f] p-8">
                                <div className="space-y-8">
                                    <div>
                                        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2">Liability</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-white font-display">0</span>
                                            <span className="text-sm text-gray-400">Custody transfer required</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-0 h-full bg-brand-coral"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2">Revenue Share</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-white font-display">80–85%</span>
                                            <span className="text-sm text-gray-400">revenue to you</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-full h-full bg-brand-coral animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2">Control</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl text-white font-display">100%</span>
                                            <span className="text-sm text-gray-400">approval authority</span>
                                        </div>
                                        <div className="w-full h-1 bg-gray-800 mt-4 overflow-hidden">
                                            <div className="w-full h-full bg-brand-coral"></div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                
            </section>

            {/* THE SHIFT */}
            <section className="py-32 px-4 md:px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <p className="font-mono text-brand-coral text-sm tracking-widest uppercase">The Shift</p>
                        </div>
                        <div className="lg:col-span-8">
                            <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                                You stay in control.<br/>
                                <span className="block italic text-gray-400">The revenue comes to you.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-gray-800 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" delay={100}>
                            <p className="font-mono text-xs text-red-500 mb-6 uppercase tracking-wider">The Old Way</p>
                            <h3 className="text-2xl text-white mb-4">Data Brokering</h3>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li className="flex gap-3"><span className="text-red-500">×</span> Lose custody of files forever</li>
                                <li className="flex gap-3"><span className="text-red-500">×</span> One-time payment only</li>
                                <li className="flex gap-3"><span className="text-red-500">×</span> You inherit the compliance liability</li>
                                <li className="flex gap-3"><span className="text-red-500">×</span> Generic pricing, low value</li>
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal className="bg-[#0f0f0f] p-8 border border-brand-coral/30 relative" delay={200}>
                            <div className="absolute top-0 right-0 p-2 bg-brand-coral text-black text-[10px] font-bold uppercase tracking-wider">The Aseryx Way</div>
                            <p className="font-mono text-xs text-brand-coral mb-6 uppercase tracking-wider">The New Way</p>
                            <h3 className="text-2xl text-white mb-4">Compute-over-Data</h3>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> You approve every access request</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> 80–85% recurring revenue, per training run</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> Zero liability — enforced by cryptography, not contracts</li>
                                <li className="flex gap-3"><Check className="w-4 h-4 text-brand-coral" /> Premium pricing. Your data, your terms.</li>
                            </ul>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

             {/* PARTNER PROFILES */}
             <section className="py-32 px-4 md:px-8">
                 <div className="max-w-7xl mx-auto">
                     <h2 className="font-display text-4xl md:text-5xl mb-24 text-white">Built For</h2>
                     
                     <div className="flex flex-col">
                         {/* 1. FINANCE */}
                         <ScrollReveal className="group relative border-t border-gray-800 py-12 transition-colors duration-500 hover:bg-[#0f0f0f]/50" delay={100}>
                             <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-brand-coral/0 via-brand-coral/50 to-brand-coral/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="grid md:grid-cols-12 gap-8 items-start">
                                 <div className="md:col-span-4 flex items-center gap-4">
                                     <div className="p-3 rounded-md bg-gray-900/50 text-gray-400 group-hover:text-brand-coral group-hover:bg-brand-coral/10 transition-colors duration-300">
                                        <TrendingUp className="w-6 h-6" />
                                     </div>
                                     <span className="font-mono text-sm text-gray-400 uppercase tracking-widest group-hover:text-brand-coral/80 transition-colors">Finance Focus</span>
                                 </div>
                                 <div className="md:col-span-8">
                                     <h3 className="font-display text-3xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">Hedge Funds & Syndicates</h3>
                                     <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        Monetize proprietary deal flow, trade logs, and performance data. Prove "alpha" to AI allocators without revealing your positions or strategy.
                                     </p>
                                 </div>
                             </div>
                         </ScrollReveal>

                         {/* 2. HEALTHCARE */}
                         <ScrollReveal className="group relative border-t border-gray-800 py-12 transition-colors duration-500 hover:bg-[#0f0f0f]/50" delay={200}>
                             <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-brand-coral/0 via-brand-coral/50 to-brand-coral/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="grid md:grid-cols-12 gap-8 items-start">
                                 <div className="md:col-span-4 flex items-center gap-4">
                                     <div className="p-3 rounded-md bg-gray-900/50 text-gray-400 group-hover:text-brand-coral group-hover:bg-brand-coral/10 transition-colors duration-300">
                                        <Activity className="w-6 h-6" />
                                     </div>
                                     <span className="font-mono text-sm text-gray-400 uppercase tracking-widest group-hover:text-brand-coral/80 transition-colors">Health Focus</span>
                                 </div>
                                 <div className="md:col-span-8">
                                     <h3 className="font-display text-3xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">Clinics & Systems</h3>
                                     <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        Unlock dormant patient archives (Sleep, IVF, EHR). Allow MedTech AIs to train on real-world outcomes. Your plaintext never moves. Buyers verify the data without seeing it.
                                     </p>
                                 </div>
                             </div>
                         </ScrollReveal>

                         {/* 3. INDUSTRY AGNOSTIC */}
                         <ScrollReveal className="group relative border-t border-b border-gray-800 py-12 transition-colors duration-500 hover:bg-[#0f0f0f]/50" delay={300}>
                             <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-brand-coral/0 via-brand-coral/50 to-brand-coral/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-brand-coral/0 via-brand-coral/50 to-brand-coral/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                             <div className="grid md:grid-cols-12 gap-8 items-start">
                                 <div className="md:col-span-4 flex items-center gap-4">
                                     <div className="p-3 rounded-md bg-gray-900/50 text-gray-400 group-hover:text-brand-coral group-hover:bg-brand-coral/10 transition-colors duration-300">
                                        <Factory className="w-6 h-6" />
                                     </div>
                                     <span className="font-mono text-sm text-gray-400 uppercase tracking-widest group-hover:text-brand-coral/80 transition-colors">Industry Agnostic</span>
                                 </div>
                                 <div className="md:col-span-8">
                                     <h3 className="font-display text-3xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">Legal, Research & Industrial</h3>
                                     <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        Legal archives. Sensor arrays. Research datasets. If it's high-volume, high-truth, and locked behind compliance walls — Aseryx was built for it.
                                     </p>
                                 </div>
                             </div>
                         </ScrollReveal>
                     </div>
                 </div>
             </section>

            {/* CTA */}
            <section className="py-32 px-4 md:px-8 bg-[#050505] border-t border-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight mb-8">
                        Your data already has<br/>
                        <span className="italic text-brand-coral">buyers.</span>
                    </h2>
                    <p className="text-gray-400 mb-12 text-lg">Join the network. Keep full custody. We handle the rest.</p>
                    <a
                        href="https://tally.so/r/eq6aVq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium hover:bg-brand-coral transition-colors"
                    >
                        Talk to Our Partnership Team
                        <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer variant="individuals" />

        </div>
    );
};

export default PartnersPage;
