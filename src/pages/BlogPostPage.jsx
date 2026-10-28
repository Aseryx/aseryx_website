import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import BlogIndex from '../components/blog/BlogIndex.jsx';
import BetaNote from '../components/blog/BetaNote.jsx';
import BackLink from '../components/common/BackLink.jsx';
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
            <BackLink to="/blog">Blog</BackLink>

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
        <BetaNote
          className="mx-auto max-w-3xl border-t border-border pt-6"
          actions={<CtaButton action="becomeProvider" />}
        />
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
