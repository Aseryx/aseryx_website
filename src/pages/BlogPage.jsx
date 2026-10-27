import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import BlogIndex from '../components/blog/BlogIndex.jsx';
import BLOG_POSTS from '../data/blog/index.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

const BlogPage = () => {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter((p) => p !== featured);

  usePageMeta({ ...PAGE_META['/blog'], path: '/blog' });

  return (
    <PageLayout>
      <PageHero
        title="Notes on private data licensing"
        lede="Writing on licensing private data: rights, provenance, quality and who gets paid."
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Posts">
        <BlogIndex posts={[featured, ...rest]} lead headingLevel="h2" />
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[40rem] text-body-lg text-ink-secondary">
            <span className="text-ink">Aseryx is in beta.</span> Get your dataset appraised, then license it on your
            terms.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <CtaButton action="becomeProvider" />
            <CtaButton action="followX" variant="standard" />
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default BlogPage;
