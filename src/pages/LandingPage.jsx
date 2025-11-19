import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [manifestoExpanded, setManifestoExpanded] = useState(false);
    const [showWaitlistModal, setShowWaitlistModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-white">

            {/* 1. Hero Section with Video Background */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="/new.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 px-4 text-center max-w-5xl mx-auto">
                    <div className="mb-8 animate-fade-in-up">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md text-orange-400 text-sm font-medium tracking-wide uppercase">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
                            Founding Members
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                        The Swiss Bank for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                            Your Health Data
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto font-light leading-relaxed">
                        Own it. Get paid by AI labs. Unlock your Personal Health LLM.
                    </p>

                    <p className="text-lg text-gray-400 mb-12 font-light">
                        Connect Oura, Apple, Whoop — early access to the AI trained only on you.
                    </p>

                    <button onClick={() => setShowWaitlistModal(true)} className="group relative px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)]">
                        <span className="relative z-10">Join Waitlist</span>
                        <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* 2. Problem Section - Premium Dark Cards */}
            <section className="py-32 px-4 bg-black relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center tracking-tight">
                        The <span className="text-gray-500">Old System</span> is Broken
                    </h2>
                    <p className="text-center text-xl text-gray-400 mb-20 max-w-3xl mx-auto">
                        For decades, your health data has been fragmented, controlled, and used without your knowledge or consent.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Data Silos",
                                desc: "Scattered across 10+ systems. Inaccessible when you need it most."
                            },
                            {
                                title: "Zero Value",
                                desc: "Corporations profit billions from your biology. You get nothing."
                            },
                            {
                                title: "No Control",
                                desc: "No transparency. No consent. No compensation. The final enclosure."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-10 rounded-3xl bg-gradient-to-b from-gray-900/80 to-gray-900/50 border border-gray-800 hover:border-orange-500/50 transition-all duration-500 hover:bg-gray-900 hover:shadow-2xl hover:shadow-orange-900/20 backdrop-blur-sm">
                                <div className="w-12 h-1 bg-orange-500 mb-6 rounded-full"></div>
                                <h3 className="text-2xl font-bold mb-6 text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-base">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Solution + Flow Section - Glowing Dashboard Vibe */}
            <section className="py-32 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">The Solution</h2>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
                            <span className="text-orange-500 font-medium">Phase 1:</span> Time-series vault + payouts. <br />
                            <span className="text-orange-500 font-medium">Phase 3:</span> Your exclusive Health LLM.
                        </p>
                    </div>

                    {/* Premium Flowchart */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                        {/* Node 1 */}
                        <div className="w-full md:w-64 p-8 rounded-2xl bg-black border border-gray-800 text-center relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                            <div className="text-gray-500 text-sm uppercase tracking-widest mb-2">Input</div>
                            <div className="text-2xl font-bold text-white mb-2">Wearables</div>
                            <div className="text-gray-500 text-sm">Oura, Apple, Whoop</div>
                        </div>

                        {/* Arrow */}
                        <div className="hidden md:block text-gray-700">
                            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                        <div className="md:hidden text-gray-700 rotate-90 my-4">
                            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>

                        {/* Node 2 - Centerpiece */}
                        <div className="w-full md:w-72 p-1 rounded-2xl bg-gradient-to-b from-orange-500 to-red-600 shadow-[0_0_50px_-10px_rgba(234,88,12,0.3)] transform md:scale-110 z-10">
                            <div className="bg-black rounded-xl p-8 text-center h-full flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-orange-500/5"></div>
                                <div className="relative z-10">
                                    <div className="text-orange-500 text-sm uppercase tracking-widest mb-2 font-bold">Encrypted Vault</div>
                                    <div className="text-3xl font-bold text-white mb-2">Aseryx</div>
                                    <div className="text-orange-400/80 text-sm">Owned by You</div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="hidden md:block text-gray-700">
                            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                        <div className="md:hidden text-gray-700 rotate-90 my-4">
                            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>

                        {/* Node 3 */}
                        <div className="w-full md:w-64 p-8 rounded-2xl bg-black border border-gray-800 text-center relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                            <div className="text-gray-500 text-sm uppercase tracking-widest mb-2">Output</div>
                            <div className="text-2xl font-bold text-white mb-2">AI Labs</div>
                            <div className="text-green-400 text-sm font-mono">$$$ Payouts</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Manifesto Section - Full Styled Content */}
            <section className="py-32 px-4 relative" style={{ backgroundImage: 'url(/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-orange-500 mb-4 tracking-tight">
                            The Aseryx Manifesto
                        </h2>
                        <p className="text-xl text-gray-400">Programmable Property in the Age of the Body</p>
                        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mt-4"></div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
                        <div className={`transition-all duration-700 ease-in-out ${manifestoExpanded ? 'max-h-[15000px]' : 'max-h-[600px]'}`}>
                            <div className="p-8 sm:p-10 md:p-12 lg:p-16">
                                {/* The Theft */}
                                <div className="mb-12">
                                    <h3 className="text-3xl font-bold text-white mb-6">The Theft</h3>
                                    <p className="text-gray-200 leading-relaxed mb-4 text-lg font-light">
                                        Your body is the last unowned territory on earth.
                                    </p>
                                    <p className="text-gray-200 leading-relaxed mb-4 text-lg font-light">
                                        Every heartbeat, every breath, every hormone fluctuation is recorded.
                                    </p>
                                    <p className="text-gray-200 leading-relaxed mb-4 text-lg font-light">
                                        The record is worth billions.
                                    </p>
                                    <p className="text-gray-200 leading-relaxed mb-4 text-lg font-light">
                                        You receive nothing.
                                    </p>
                                    <p className="text-orange-400 leading-relaxed text-lg font-medium">
                                        This is not a bug. It is the final enclosure movement.
                                    </p>
                                </div>

                                {manifestoExpanded && (
                                    <div className="space-y-12">
                                        {/* Thesis */}
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-6">Thesis</h3>
                                            <p className="text-gray-200 leading-relaxed mb-6 text-lg font-light">
                                                Health data must become programmable property.
                                            </p>
                                            <p className="text-gray-200 leading-relaxed mb-4 text-lg font-light">
                                                When data is property, three miracles occur simultaneously:
                                            </p>
                                            <ol className="space-y-3 mb-6 ml-6">
                                                <li className="text-gray-200 leading-relaxed text-lg font-light list-decimal">
                                                    The individual becomes sovereign over their own biology.
                                                </li>
                                                <li className="text-gray-200 leading-relaxed text-lg font-light list-decimal">
                                                    AI laboratories receive the only fuel that matters: consented, longitudinal, high-resolution human truth.
                                                </li>
                                                <li className="text-gray-200 leading-relaxed text-lg font-light list-decimal">
                                                    Medicine finally escapes the tragedy of the commons and enters the age of aligned incentives.
                                                </li>
                                            </ol>
                                            <p className="text-orange-400 leading-relaxed text-lg font-medium">
                                                Everything we build at Aseryx serves this single thesis.
                                            </p>
                                        </div>

                                        {/* The World After Property */}
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-6">The World After Property</h3>
                                            <p className="text-gray-200 leading-relaxed mb-6 text-lg font-light italic">
                                                Imagine 2035.
                                            </p>

                                            <div className="space-y-6">
                                                <p className="text-gray-200 leading-relaxed text-base font-light">
                                                    A woman in Lagos licenses her 8-year reproductive hormone panel to four competing fertility labs. She earns $3,800. One lab builds a better model that predicts her next miscarriage risk 14 days early. She conceives a healthy child. The lab publishes. The model spreads. Millions benefit. She is paid every time.
                                                </p>
                                                <p className="text-gray-200 leading-relaxed text-base font-light">
                                                    A man in Berlin keeps his raw genome and wearable data private forever, but licenses a zero-knowledge proof that he is not BRCA1 positive to an insurance company for lower premiums.
                                                </p>
                                                <p className="text-gray-200 leading-relaxed text-base font-light">
                                                    A researcher in São Paulo posts a bounty: "$120,000 for 5,000 consented 3-year glucose + activity datasets from prediabetics." The bounty is filled in nine weeks. A new reversal protocol is discovered. The researcher wins the Nobel. The 5,000 contributors split $4 million.
                                                </p>
                                            </div>

                                            <div className="mt-8 space-y-2">
                                                <p className="text-gray-200 leading-relaxed text-lg font-light">
                                                    No one was coerced.
                                                </p>
                                                <p className="text-gray-200 leading-relaxed text-lg font-light">
                                                    No one was de-anonymized against their will.
                                                </p>
                                                <p className="text-gray-200 leading-relaxed text-lg font-light">
                                                    No institution stood in the middle taking 90%.
                                                </p>
                                            </div>

                                            <p className="text-orange-400 leading-relaxed text-lg font-medium mt-6">
                                                This is not science fiction. It is the logical endpoint of programmable property rights applied to the human body.
                                            </p>
                                        </div>

                                        {/* Five Lenses */}
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-8">Five Lenses on the Same Revolution</h3>

                                            <div className="space-y-8">
                                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                                    <h4 className="text-xl font-semibold text-white mb-3">The Philosopher</h4>
                                                    <p className="text-gray-200 leading-relaxed font-light">
                                                        Locke was right: we have property in our persons. The data exhaust of our persons is therefore ours. Anything else is theft.
                                                    </p>
                                                </div>

                                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                                    <h4 className="text-xl font-semibold text-white mb-3">The Economist</h4>
                                                    <p className="text-gray-200 leading-relaxed font-light">
                                                        Non-rival goods become rival when wrapped in enforceable scarcity. Zero-knowledge proofs are the fence. Licensing markets are the price discovery mechanism. The result is a new asset class worth trillions.
                                                    </p>
                                                </div>

                                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                                    <h4 className="text-xl font-semibold text-white mb-3">The Political Thinker</h4>
                                                    <p className="text-gray-200 leading-relaxed font-light">
                                                        Power flows to whoever controls the data about your body. Today that is corporations and states. When individuals control it, a new political subject is born: the biological citizen who monetizes their own flesh and demands truth from medicine.
                                                    </p>
                                                </div>

                                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                                    <h4 className="text-xl font-semibold text-white mb-3">The Governance Designer</h4>
                                                    <p className="text-gray-200 leading-relaxed font-light">
                                                        Centralized vaults breach. Public blockchains expose. The correct architecture is encrypted private vaults with cryptographic consent ledgers. Governance becomes proof, not policy.
                                                    </p>
                                                </div>

                                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                                    <h4 className="text-xl font-semibold text-white mb-3">The Technologist</h4>
                                                    <p className="text-gray-200 leading-relaxed font-light mb-4">
                                                        The primitives exist today:
                                                    </p>
                                                    <ul className="text-gray-200 leading-relaxed font-light space-y-2 ml-4">
                                                        <li>• Wearable APIs (Oura, Whoop, Apple Health, Google Fit)</li>
                                                        <li>• Midnight ZK smart contracts for selective disclosure and consent</li>
                                                        <li>• Encrypted personal vaults where the user holds the only key</li>
                                                        <li>• Instant settlement when data is licensed</li>
                                                    </ul>
                                                    <p className="text-gray-200 leading-relaxed font-light mt-4">
                                                        We are only assembling what already works.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* What Must Be Built */}
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-6">What Must Be Built</h3>
                                            <ol className="space-y-3 mb-6 ml-6">
                                                <li className="text-gray-200 leading-relaxed text-base font-light list-decimal">
                                                    A vault that unifies every stream of your health data in one place you truly control.
                                                </li>
                                                <li className="text-gray-200 leading-relaxed text-base font-light list-decimal">
                                                    Granular, revocable, cryptographically provable licenses ("this lab may train on my HRV for 12 months for $1,200").
                                                </li>
                                                <li className="text-gray-200 leading-relaxed text-base font-light list-decimal">
                                                    Instant payment when the license is used.
                                                </li>
                                                <li className="text-gray-200 leading-relaxed text-base font-light list-decimal">
                                                    Zero-knowledge interfaces so you can prove facts about your body without exposing the body itself.
                                                </li>
                                                <li className="text-gray-200 leading-relaxed text-base font-light list-decimal">
                                                    A personal Health LLM, trained only on your lifetime data, that finally knows you better than any human doctor ever could.
                                                </li>
                                            </ol>
                                            {/* <p className="text-gray-200 leading-relaxed text-lg font-light mb-2">
                                                We are shipping 1–4 in 2026.
                                            </p>
                                            <p className="text-gray-200 leading-relaxed text-lg font-light">
                                                Number 5 arrives the day the first lab agrees to white-label their model back to our users.
                                            </p> */}
                                        </div>

                                        {/* The Aseryx Commitment */}
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-6">The Aseryx Commitment</h3>
                                            <div className="space-y-4 mb-6">
                                                {/* <p className="text-gray-200 leading-relaxed text-xl font-medium">
                                                    We take 20%. You keep 80%. Forever.
                                                </p> */}
                                                <p className="text-gray-200 leading-relaxed text-lg font-light">
                                                    We will never sell your data.
                                                </p>
                                                <p className="text-gray-200 leading-relaxed text-lg font-light">
                                                    We will never train on it without your explicit, paid license.
                                                </p>
                                                <p className="text-gray-200 leading-relaxed text-lg font-light">
                                                    We will fight any law or company that tries to take this right away from you.
                                                </p>
                                            </div>
                                            <p className="text-orange-400 leading-relaxed text-xl font-medium mb-6">
                                                This is not a company. It is the infrastructure layer for the biological century.
                                            </p>
                                            <p className="text-gray-200 leading-relaxed text-2xl font-semibold mb-2">
                                                Join or be left behind.
                                            </p>
                                            <p className="text-gray-200 leading-relaxed text-lg font-light mb-2">
                                                The body is the final frontier.
                                            </p>
                                            <p className="text-white leading-relaxed text-xl font-bold">
                                                We intend to own ours.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center pb-8">
                            <button
                                onClick={() => setManifestoExpanded(!manifestoExpanded)}
                                className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-semibold hover:bg-orange-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                {manifestoExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Final CTA - Powerful */}
            <section className="relative py-40 px-4 overflow-hidden" style={{ backgroundImage: 'url(/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight tracking-tight">
                        Own Your Biology.
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light">
                        Join the revolution.
                    </p>

                    <button onClick={() => setShowWaitlistModal(true)} className="px-16 py-6 bg-gradient-to-r from-orange-600 to-red-600 text-white text-2xl font-bold rounded-full hover:from-orange-500 hover:to-red-500 transition-all duration-300 hover:scale-105 shadow-[0_0_60px_-10px_rgba(234,88,12,0.6)] hover:shadow-[0_0_80px_-10px_rgba(234,88,12,0.8)]">
                        Join Waitlist
                    </button>

                    <p className="mt-12 text-sm text-orange-400 uppercase tracking-widest">
                        The body is the final frontier. We intend to own ours.
                    </p>
                </div>
            </section>

            {/* Waitlist Modal */}
            {showWaitlistModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
                    <div className="relative w-full max-w-4xl h-[90vh] sm:h-[80vh] bg-white/90 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowWaitlistModal(false)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Tally Embed */}
                        <div className="w-full h-full flex flex-col">
                            <div className="p-3 sm:p-4 bg-gray-50 border-b">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Join the Member Waitlist</h3>
                                <p className="text-xs sm:text-sm text-gray-600">Be among the first to own and monetize your health data</p>
                            </div>
                            <iframe
                                src="https://tally.so/r/mVRjjM?transparentBackground=1"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title="Join the waitlist"
                                className="flex-1"
                                style={{ minHeight: '400px' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
