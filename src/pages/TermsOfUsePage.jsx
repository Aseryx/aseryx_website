import PageLayout from '../components/layout/PageLayout.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import termsHtml from '../content/terms-of-use.html?raw';

const TermsOfUsePage = () => {
  usePageMeta({ ...PAGE_META['/terms'], path: '/terms' });

  return (
    <PageLayout>
      <div className="px-6 pt-28 pb-16 md:pt-36 md:pb-24 lg:px-10">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl p-6 md:p-12 border border-border legal-document">
          <div dangerouslySetInnerHTML={{ __html: termsHtml }} />
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsOfUsePage;