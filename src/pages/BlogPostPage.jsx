import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import BLOG_POSTS from '../data/blogPosts.js';

const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

/* Simple markdown-to-JSX renderer for blog content */
const renderContent = (content) => {
    const lines = content.trim().split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Heading ##
        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={i} className="font-display text-2xl md:text-3xl leading-tight tracking-tight mt-12 mb-6 text-[#1A1A1A] dark:text-white">
                    {line.slice(3)}
                </h2>
            );
            i++;
            continue;
        }

        // Unordered list item
        if (line.startsWith('- ')) {
            const items = [];
            while (i < lines.length && lines[i].startsWith('- ')) {
                items.push(lines[i].slice(2));
                i++;
            }
            elements.push(
                <ul key={`ul-${i}`} className="space-y-3 my-6 ml-4">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-[#1A1A1A] dark:text-gray-300 text-base md:text-lg leading-relaxed pl-4 border-l-2 border-brand-orange/30">
                            {renderInline(item)}
                        </li>
                    ))}
                </ul>
            );
            continue;
        }

        // Empty line
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Regular paragraph
        elements.push(
            <p key={i} className="text-[#1A1A1A] dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                {renderInline(line)}
            </p>
        );
        i++;
    }

    return elements;
};

/* Inline markdown: **bold** and links */
const renderInline = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
        // Bold
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        if (boldMatch) {
            const idx = remaining.indexOf(boldMatch[0]);
            if (idx > 0) {
                parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
            }
            parts.push(
                <strong key={key++} className="font-medium text-[#1A1A1A] dark:text-white">
                    {boldMatch[1]}
                </strong>
            );
            remaining = remaining.slice(idx + boldMatch[0].length);
            continue;
        }

        // em dash cleanup
        parts.push(<span key={key++}>{remaining}</span>);
        break;
    }

    return parts;
};

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white font-sans selection:bg-brand-orange selection:text-black overflow-x-hidden">
            <Navigation variant="enterprise" />

            {/* Article Header */}
            <article className="relative pt-28 pb-8 md:pt-36 md:pb-12 px-4 md:px-8 grid-bg">
                <div className="max-w-3xl mx-auto relative z-10">
                    <Link
                        to="/blog"
                        className="group inline-flex items-center gap-2 text-sm text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <div className="section-divider pt-8 md:pt-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">{formatDate(post.date)}</span>
                            <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                            <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">{post.readTime}</span>
                            <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                            <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">{post.category}</span>
                        </div>

                        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight mb-8">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-xl text-[#6B7280] dark:text-gray-400 leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </article>

            {/* Article Body */}
            <section className="px-4 md:px-8 pb-16 md:pb-24 grid-bg">
                <div className="max-w-3xl mx-auto relative z-10 section-divider pt-10 md:pt-14">
                    {renderContent(post.content)}
                </div>
            </section>

            {/* Post Footer CTA */}
            <section className="px-4 md:px-8 pb-16 md:pb-24 grid-bg">
                <div className="max-w-3xl mx-auto relative z-10 section-divider pt-10 md:pt-14">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://aseryx.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[#6B7280] dark:text-gray-400 hover:text-brand-orange transition-colors"
                        >
                            aseryx.xyz
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href="https://x.com/aseryxHQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[#6B7280] dark:text-gray-400 hover:text-brand-orange transition-colors"
                        >
                            @AseryxHQ
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href="https://linkedin.com/company/aseryx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[#6B7280] dark:text-gray-400 hover:text-brand-orange transition-colors"
                        >
                            LinkedIn
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer variant="enterprise" />
        </div>
    );
};

export default BlogPostPage;
