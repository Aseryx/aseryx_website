import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

const AppraisalPage = () => {
  usePageMeta({ ...PAGE_META['/appraisal'], path: '/appraisal' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="Appraisal"
        title="See how ready your dataset is"
        lede="Describe your dataset and get a readiness preview: the checks it is likely to pass and what to fix first. Not a price."
      />
    </PageLayout>
  );
};

export default AppraisalPage;
