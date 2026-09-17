import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, DollarSign } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import PageLayout from '../components/layout/PageLayout.jsx';
import ProductPlaceholder from '../components/common/ProductPlaceholder.jsx';
import BLOG_POSTS from '../data/blog/index.js';
import { formatDate } from '../utils/formatDate.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const BlogPage = () => {
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  usePageMeta({ ...PAGE_META['/blog'], path: '/blog' });

  return (
    <PageLayout>
      {/* Hero / featured */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 md:px-8 grid-bg overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,77,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-10 md:mb-14">Blog</p>

          {featured && (
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                <div className="lg:col-span-6 section-divider pt-8 md:pt-10">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="font-mono text-xs text-[var(--text-secondary)]">{formatDate(featured.date)}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
                    <span className="font-mono text-xs text-[var(--text-secondary)]">{featured.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
                    <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">
                      {featured.category}
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight mb-6 group-hover:text-brand-orange transition-colors duration-300">
                    {featured.title}
                  </h1>

                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
                    {featured.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-medium group-hover:gap-3 transition-all">
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <ProductPlaceholder label="Featured · still" aspect="video">
                    <DollarSign
                      className="w-20 h-20 md:w-28 md:h-28 text-[#1A1A1A] dark:text-white"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </ProductPlaceholder>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Index list - Linear changelog rhythm */}
      {rest.length > 0 && (
        <section className="py-12 md:py-20 px-4 md:px-8 grid-bg">
          <div className="max-w-7xl mx-auto">
            <div className="section-divider pt-8 mb-2">
              <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-8">More posts</p>
            </div>

            <ul className="divide-y divide-[var(--border-color)] border-b border-[var(--border-color)]">
              {rest.map((post, index) => (
                <li key={post.slug}>
                  <ScrollReveal delay={index * 80}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group grid sm:grid-cols-12 gap-3 sm:gap-8 py-8 md:py-10 items-baseline"
                    >
                      <div className="sm:col-span-3 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-[var(--text-secondary)]">{formatDate(post.date)}</span>
                        <span className="hidden sm:inline w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
                        <span className="font-mono text-[10px] text-brand-orange uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                      <div className="sm:col-span-9">
                        <h2 className="font-display text-xl md:text-2xl leading-tight tracking-tight mb-2 group-hover:text-brand-orange transition-colors duration-300 max-w-3xl">
                          {post.title}
                        </h2>
                        <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-2xl">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Close — editorial rail, not full-bleed wash / not Honesty clone */}
      <section className="relative py-20 md:py-28 px-4 md:px-8 bg-[#F3F1EE] dark:bg-[#0f0f0f] border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              <div className="hidden lg:flex lg:col-span-1 justify-center">
                <span className="block w-1.5 self-stretch min-h-[10rem] rounded-full bg-brand-orange" aria-hidden />
              </div>

              <div className="lg:col-span-7">
                <span className="lg:hidden block w-12 h-1.5 rounded-full bg-brand-orange mb-8" aria-hidden />
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-[#1A1A1A] dark:text-white">
                  A license path for the data you keep.
                </h2>
                <p className="mt-6 text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-xl">
                  Aseryx runs pick, lock, quality check, and paid access, so term-bound use opens without selling
                  the warehouse.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col lg:items-end gap-4">
                <p className="text-sm text-[#6B7280] dark:text-gray-500 lg:text-right w-full sm:w-auto">
                  You set the price.
                </p>
                <a
                  href={TALLY.appraisal}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the beta"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-orange text-black font-medium hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm uppercase tracking-wide"
                >
                  Join the beta
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/aseryxHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#D1D5DB] dark:border-[#333] text-[#1A1A1A] dark:text-white font-medium hover:border-brand-orange hover:text-brand-orange transition-colors text-sm uppercase tracking-wide"
                >
                  Follow on X
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPage;
