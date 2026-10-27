import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Eyebrow from '../components/common/Eyebrow.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import BlogCard from '../components/blog/BlogCard.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import BLOG_POSTS from '../data/blog/index.js';
import { getCachedBlogContent, loadBlogContent } from '../data/blog/loadContent.js';
import { formatDate } from '../utils/formatDate.js';
import { renderBlogContent } from '../utils/renderBlogContent.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { metaForBlogPost } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  // Prerender and hydration preload the body, so the first render already has it.
  const [content, setContent] = useState(() => (post ? getCachedBlogContent(post.slug) : null));
  const [loading, setLoading] = useState(() => !(post && getCachedBlogContent(post.slug)));

  const meta = post ? metaForBlogPost(post) : null;
  usePageMeta({
    title: meta?.title,
    description: meta?.description,
    path: post ? `/blog/${post.slug}` : undefined,
  });

  useEffect(() => {
    if (!post) return;
    const cached = getCachedBlogContent(post.slug);
    if (cached) {
      setContent(cached);
      setLoading(false);
      return;
    }
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
              <p className="flex flex-wrap items-center gap-x-2 text-meta text-ink-muted">
                <span>{post.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </p>
              <h1 className="mt-4 text-display-lg text-ink [text-wrap:balance] md:text-display-xl">{post.title}</h1>
              <p className="mt-6 text-lede text-ink-secondary">{post.excerpt}</p>
            </header>
          </div>
        </Section>

        <Section spacing="none" className="pt-10 pb-16 md:pt-14 md:pb-24">
          <div className="mx-auto max-w-3xl">
            {loading && <p className="text-ink-secondary">Loading…</p>}
            {!loading && content && <div className="blog-prose">{renderBlogContent(content)}</div>}
          </div>
        </Section>
      </article>

      <Section spacing="none" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <Card tone="secondary" className="p-8 md:p-10">
            <Eyebrow>Product</Eyebrow>
            <h2 className="text-display-lg text-ink">Grant access on your terms.</h2>
            <p className="mt-4 max-w-xl text-lede text-ink-secondary">
              Package and appraise on your own machine. Quality certificate. Dataset you can license.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={TALLY.appraisal}>Join the beta</Button>
              <Button href="https://x.com/aseryxHQ" variant="standard">
                Follow on X
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="secondary" aria-labelledby="keep-reading">
          <SectionHeader
            id="keep-reading"
            eyebrow="Keep reading"
            title="More notes"
            action={
              <Button to="/blog" variant="standard">
                All posts
              </Button>
            }
          />
          <ul className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug} className="flex">
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </PageLayout>
  );
};

export default BlogPostPage;
