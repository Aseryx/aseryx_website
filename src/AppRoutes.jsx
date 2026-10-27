import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import DatasetsPage from './pages/DatasetsPage';
import BenchmarksPage from './pages/BenchmarksPage';
import BuyersPage from './pages/BuyersPage';
import ProvidersPage from './pages/ProvidersPage';
import AppraisalPage from './pages/AppraisalPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import { STATIC_ROUTES } from './config/staticRoutes.js';

export { STATIC_ROUTES };

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/datasets" element={<DatasetsPage />} />
      <Route path="/benchmarks" element={<BenchmarksPage />} />
      <Route path="/buyers" element={<BuyersPage />} />
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/appraisal" element={<AppraisalPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfUsePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
