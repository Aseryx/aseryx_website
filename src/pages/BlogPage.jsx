import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import BLOG_POSTS from '../data/blogPosts.js';

const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BlogPage = () => {
    const featured = BLOG_POSTS.find((p) => p.featured);
    const rest = BLOG_POSTS.filter((p) => !p.featured);

    return (
        <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">
            <Navigation variant="enterprise" />

            {/* Hero / Featured Post */}
            {featured && (
                <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 md:px-8 grid-bg">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-12 animate-fade-in">Blog</p>

                        <Link to={`/blog/${featured.slug}`} className="group block">
                            <div className="section-divider pt-8 md:pt-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">{formatDate(featured.date)}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                                    <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">{featured.readTime}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                                    <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">{featured.category}</span>
                                </div>

                                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-4xl mb-6 group-hover:text-brand-orange transition-colors duration-300">
                                    {featured.title}
                                </h1>

                                <p className="text-lg md:text-xl text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl mb-8">
                                    {featured.excerpt}
                                </p>

                                <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-medium group-hover:gap-3 transition-all">
                                    Read article
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Article List */}
            {rest.length > 0 && (
                <section className="py-16 md:py-24 px-4 md:px-8 grid-bg">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="section-divider pt-8 md:pt-12 mb-12">
                            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">Recent</p>
                        </div>

                        <div className="space-y-0">
                            {rest.map((post, index) => (
                                <ScrollReveal key={post.slug} delay={index * 100}>
                                    <Link to={`/blog/${post.slug}`} className="group block section-divider pt-8 pb-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">{formatDate(post.date)}</span>
                                            <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                                            <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">{post.category}</span>
                                        </div>
                                        <h3 className="font-display text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight mb-3 group-hover:text-brand-orange transition-colors duration-300 max-w-3xl">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#6B7280] dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                                            {post.excerpt}
                                        </p>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 md:py-24 px-4 md:px-8 grid-bg">
                <div className="max-w-4xl mx-auto relative z-10 text-center section-divider pt-12 md:pt-16">
                    <ScrollReveal>
                        <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight mb-6">
                            Stay up to date
                        </h2>
                        <p className="text-[#6B7280] dark:text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                            Follow our thinking on data verification, AI privacy, and assetization infrastructure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://x.com/aseryxHQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-brand-orange text-black font-medium hover:bg-white transition-colors text-sm uppercase tracking-wide"
                            >
                                Follow on X
                            </a>
                            <a
                                href="https://linkedin.com/company/aseryx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-transparent border border-[#E8E4DE] dark:border-gray-700 text-[#1A1A1A] dark:text-white font-medium hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-[#0a0a0a] transition-colors text-sm uppercase tracking-wide"
                            >
                                Follow on LinkedIn
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer variant="enterprise" />
        </div>
    );
};

export default BlogPage;
