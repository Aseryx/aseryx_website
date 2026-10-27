import PageLayout from '../components/layout/PageLayout.jsx';
import Section from '../components/common/Section.jsx';
import Button from '../components/common/Button.jsx';
import Eyebrow from '../components/common/Eyebrow.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

const NotFoundPage = () => {
  usePageMeta({ ...PAGE_META['/404'], path: '/404', noIndex: true });

  return (
    <PageLayout>
      <Section className="pt-28 md:pt-36">
        <Eyebrow>404</Eyebrow>
        <h1 className="text-display-lg md:text-display-xl text-ink mb-4">Page not found</h1>
        <p className="text-lede text-ink-secondary mb-10 max-w-[40rem]">
          This URL is not part of the site. It may have been retired.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button to="/">Home</Button>
          <Button to="/blog" variant="standard" arrow={false}>
            Blog
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
};

export default NotFoundPage;
