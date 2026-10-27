import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Button from '../components/common/Button.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const BuyersPage = () => {
  usePageMeta({ ...PAGE_META['/buyers'], path: '/buyers' });

  return (
    <PageLayout>
      <PageHero
        eyebrow="For buyers"
        title="License data from the people who made it"
        lede="Read the profile, check the readiness report, and sign the licence with the owner directly."
        actions={
          <>
            <Button to="/datasets">Browse datasets</Button>
            <Button href={TALLY.appraisal} variant="standard">
              Request a dataset
            </Button>
          </>
        }
      />
    </PageLayout>
  );
};

export default BuyersPage;
