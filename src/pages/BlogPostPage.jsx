import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import BLOG_POSTS from '../data/blog/index.js';
import { loadBlogContent } from '../data/blog/loadContent.js';
import { formatDate } from '../utils/formatDate.js';
import { renderBlogContent } from '../utils/renderBlogContent.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { metaForBlogPost } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const meta = post ? metaForBlogPost(post) : null;
  usePageMeta({
    title: meta?.title,
    description: meta?.description,
    path: post ? `/blog/${post.slug}` : undefined,
  });

  useEffect(() => {
    if (!post) return;
    let cancelled = false;
    setLoading(true);
    loadBlogContent(post.slug)
      .then((text) => {
        if (!cancelled) setContent(text);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <PageLayout>
      <article className="relative pt-28 pb-8 md:pt-36 md:pb-12 px-4 md:px-8 grid-bg">
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Blog
          </Link>

          <div className="section-divider pt-8 md:pt-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[var(--text-secondary)]">{formatDate(post.date)}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
              <span className="font-mono text-xs text-[var(--text-secondary)]">{post.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
              <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">{post.category}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight mb-8">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">{post.excerpt}</p>
          </div>
        </div>
      </article>

      <section className="px-4 md:px-8 pb-16 md:pb-24 grid-bg">
        <div className="max-w-3xl mx-auto relative z-10 section-divider pt-10 md:pt-14">
          {loading && <p className="text-[var(--text-secondary)]">Loading…</p>}
          {!loading && content && (
            <div className="blog-prose">{renderBlogContent(content)}</div>
          )}
        </div>
      </section>

      <section className="px-4 md:px-8 pb-16 md:pb-24 grid-bg">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-[#EDEBE8] dark:bg-[#111111] card-oasis border border-[var(--border-color)] p-8 md:p-10">
            <p className="font-mono text-xs text-brand-orange uppercase tracking-wider mb-4">Product</p>
            <h2 className="font-display text-2xl md:text-3xl leading-tight tracking-tight mb-4">
              A license path for the data you keep.
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8 max-w-xl">
              Aseryx runs pick, lock, quality check, and paid access, so term-bound use opens without selling the
              warehouse.
            </p>
            <a
              href={TALLY.appraisal}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the beta"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-orange text-black font-medium text-sm uppercase tracking-wide hover:bg-white transition-colors"
            >
              Join the beta
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-[var(--border-color)]">
            <a
              href="https://x.com/aseryxHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-brand-orange transition-colors"
            >
              @AseryxHQ
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com/company/aseryx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-brand-orange transition-colors"
            >
              LinkedIn
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-brand-orange transition-colors"
            >
              All posts
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 md:px-8 pb-20 md:pb-28 grid-bg">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-8">Keep reading</p>
            <ul className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group block py-6">
                    <span className="font-mono text-xs text-[var(--text-secondary)]">{formatDate(p.date)}</span>
                    <h3 className="font-display text-xl md:text-2xl leading-tight tracking-tight mt-2 group-hover:text-brand-orange transition-colors">
                      {p.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default BlogPostPage;
