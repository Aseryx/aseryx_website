import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

const NotFoundPage = () => {
  usePageMeta({ ...PAGE_META['/404'], path: '/404', noIndex: true });

  return (
    <PageLayout>
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 px-4 md:px-8 grid-bg">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-6">404</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl">
            This URL is not part of the site. It may have been retired.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand-orange text-sm font-medium hover:gap-3 transition-all"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFoundPage;
