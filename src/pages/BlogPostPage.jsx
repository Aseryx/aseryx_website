import { useEffect, useReducer, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import BlogIndex from '../components/blog/BlogIndex.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import BLOG_POSTS, { findPost } from '../data/blog/index.js';
import { getCachedBlogContent, loadBlogContent } from '../data/blog/loadContent.js';
import { formatDate } from '../utils/formatDate.js';
import { renderBlogContent } from '../utils/renderBlogContent.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { metaForBlogPost } from '../config/pageMeta.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = findPost(slug);
  // The body is read from the shared cache on every render (prerender and
  // hydration fill it first), so moving to another post can never show the
  // last post's body. A finished load only needs a re-render; a failed one
  // is remembered by its slug.
  const content = post ? getCachedBlogContent(post.slug) : null;
  const [, rerender] = useReducer((n) => n + 1, 0);
  const [failedSlug, setFailedSlug] = useState(null);

  const meta = post ? metaForBlogPost(post) : null;
  usePageMeta({
    title: meta?.title,
    description: meta?.description,
    path: post ? `/blog/${post.slug}` : undefined,
  });

  useEffect(() => {
    if (!post || getCachedBlogContent(post.slug)) return;
    let cancelled = false;
    loadBlogContent(post.slug)
      .then((text) => {
        if (!text) throw new Error(`No body for ${post.slug}`);
        if (!cancelled) rerender();
      })
      .catch(() => {
        if (!cancelled) setFailedSlug(post.slug);
      });
    return () => {
      cancelled = true;
    };
  }, [post]);

  if (!post) {
    return <NotFoundPage />;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <PageLayout>
      <article>
        <Section spacing="none" className="pt-24 md:pt-28">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/blog"
              className="group inline-flex min-h-11 items-center gap-2 rounded-lg text-body-sm text-ink-secondary hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              Blog
            </Link>

            <header className="border-b border-border pt-8 pb-10 md:pt-12 md:pb-12">
              <h1 className="text-display-lg text-ink [text-wrap:balance] md:text-display-xl">{post.title}</h1>
              <p className="mt-6 text-lede text-ink-secondary">{post.excerpt}</p>
              <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-body-sm text-ink-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </p>
            </header>
          </div>
        </Section>

        <Section spacing="none" className="pt-10 pb-16 md:pt-14 md:pb-24">
          <div className="mx-auto max-w-3xl">
            {content ? (
              <div className="blog-prose">{renderBlogContent(content)}</div>
            ) : (
              <p className="text-ink-secondary">
                {failedSlug === post.slug ? "This post didn't load. Refresh the page to try again." : 'Loading…'}
              </p>
            )}
          </div>
        </Section>
      </article>

      <Section spacing="none" className="pb-16 md:pb-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-lg text-ink-secondary">
            <span className="text-ink">Aseryx is in beta.</span> Get your dataset appraised, then license it on your terms.
          </p>
          <CtaButton action="becomeProvider" className="shrink-0" />
        </div>
      </Section>

      {related.length > 0 && (
        <Section aria-labelledby="keep-reading">
          <SectionHeader
            id="keep-reading"
            title="More notes"
            action={
              <CtaButton action="readBlog" variant="standard" />
            }
          />
          <BlogIndex posts={related} />
        </Section>
      )}
    </PageLayout>
  );
};

export default BlogPostPage;
