import PageLayout from '../components/layout/PageLayout.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import privacyHtml from '../content/privacy-policy.html?raw';

const PrivacyPolicyPage = () => {
  usePageMeta({ ...PAGE_META['/privacy'], path: '/privacy' });

  return (
    <PageLayout>
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-card rounded-lg p-6 md:p-12 border border-border legal-document">
          <div dangerouslySetInnerHTML={{ __html: privacyHtml }} />
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;