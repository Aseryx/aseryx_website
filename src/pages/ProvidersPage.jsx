import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Button from '../components/common/Button.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const ProvidersPage = () => {
  usePageMeta({ ...PAGE_META['/providers'], path: '/providers' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="For providers"
        title="Turn the data you made into a licensable asset"
        lede="Connect, lock and appraise on your machine. You decide who gets access, to what, and for how long."
        actions={
          <>
            <Button href={TALLY.appraisal}>Join the beta</Button>
            <Button to="/appraisal" variant="standard">
              Preview your appraisal
            </Button>
          </>
        }
      />
    </PageLayout>
  );
};

export default ProvidersPage;
