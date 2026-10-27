import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Button from '../components/common/Button.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

const BenchmarksPage = () => {
  usePageMeta({ ...PAGE_META['/benchmarks'], path: '/benchmarks' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="Benchmarks"
        title="How ready each dataset is for training"
        lede="One formula scores every dataset in a domain, and datasets are compared only with their own domain. Scores show readiness, not price."
        actions={
          <>
            <Button href="#method" variant="standard" arrow={false}>
              How the score works
            </Button>
          </>
        }
      />
    </PageLayout>
  );
};

export default BenchmarksPage;
