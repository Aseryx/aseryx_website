import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import BlogCard from '../components/blog/BlogCard.jsx';
import BLOG_POSTS from '../data/blog/index.js';
import { formatDate } from '../utils/formatDate.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

/** The site's cells motif in a tile: a grid with one chosen cut outlined in coral. */
const CellsTile = () => (
  <div
    className="relative h-full min-h-[14rem] overflow-hidden rounded-xl border border-border-light bg-secondary"
    style={{
      backgroundImage:
        'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
    aria-hidden="true"
  >
    <span className="absolute left-[40%] top-[30%] h-[40%] w-[30%] border-[1.5px] border-brand bg-brand-tint" />
  </div>
);

const BlogPage = () => {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter((p) => p !== featured);

  usePageMeta({ ...PAGE_META['/blog'], path: '/blog' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="Blog"
        title="Notes on private data licensing"
        lede="Writing on private data licenses, custody honesty, and what a quality check is not."
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Posts">
        <Card as="article" className="group relative grid gap-8 p-6 transition-colors duration-150 hover:border-border-hover md:p-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col lg:col-span-7">
            <p className="flex flex-wrap items-center gap-x-2 text-meta text-ink-muted">
              <span>Featured</span>
              <span aria-hidden="true">·</span>
              <span>{featured.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{featured.readTime}</span>
            </p>
            <h2 className="mt-4 text-display-lg text-ink">
              <Link
                to={`/blog/${featured.slug}`}
                className="focus:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-brand"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-4 max-w-[40rem] text-lede text-ink-secondary">{featured.excerpt}</p>
            <p className="mt-auto inline-flex items-center gap-1.5 pt-8 text-button-md text-ink" aria-hidden="true">
              Read
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </p>
          </div>
          <div className="lg:col-span-5">
            <CellsTile />
          </div>
        </Card>

        {rest.length > 0 && (
          <>
            <h2 className="mt-16 mb-6 text-heading-lg text-ink">More posts</h2>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug} className="flex">
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>

      <Section tone="secondary" aria-labelledby="blog-close">
        <SectionHeader
          id="blog-close"
          layout="center"
          eyebrow="Beta"
          title="Grant access on your terms."
          lede="Package and appraise on your own machine. Quality certificate. Dataset you can license."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={TALLY.appraisal}>Join the beta</Button>
              <Button href="https://x.com/aseryxHQ" variant="standard">
                Follow on X
              </Button>
            </div>
          }
          className="!mb-0"
        />
      </Section>
    </PageLayout>
  );
};

export default BlogPage;
