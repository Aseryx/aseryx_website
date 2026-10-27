import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Button from '../components/common/Button.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const DatasetsPage = () => {
  usePageMeta({ ...PAGE_META['/datasets'], path: '/datasets' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="Datasets"
        title="Datasets with a profile you can check"
        lede="Each dataset has a profile its owner approved line by line: what it holds, how it was made, and how it is licensed."
        actions={
          <>
            <Button href={TALLY.appraisal}>Request a dataset</Button>
            <Button to="/providers" variant="standard" arrow={false}>
              List your dataset
            </Button>
          </>
        }
      />
    </PageLayout>
  );
};

export default DatasetsPage;
