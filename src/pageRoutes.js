import { matchPath } from 'react-router-dom';
import lazyPage from './utils/lazyPage.jsx';

// Each page is its own chunk (lazyPage), so a visitor downloads only the page
// they open. The 404 stays in the main bundle: other pages fall back to it.
const LandingPage = lazyPage(() => import('./pages/LandingPage'));
const DatasetsPage = lazyPage(() => import('./pages/DatasetsPage'));
const DatasetPage = lazyPage(() => import('./pages/DatasetPage'));
const BenchmarksPage = lazyPage(() => import('./pages/BenchmarksPage'));
const BuyersPage = lazyPage(() => import('./pages/BuyersPage'));
const AppraisalPage = lazyPage(() => import('./pages/AppraisalPage'));
const PrivacyPolicyPage = lazyPage(() => import('./pages/PrivacyPolicyPage'));
const TermsOfUsePage = lazyPage(() => import('./pages/TermsOfUsePage'));
const BlogPage = lazyPage(() => import('./pages/BlogPage'));
const BlogPostPage = lazyPage(() => import('./pages/BlogPostPage'));

/** Every page by the path it answers, for AppRoutes and for preloading. */
export const PAGES = [
  ['/', LandingPage],
  ['/datasets', DatasetsPage],
  ['/datasets/:slug', DatasetPage],
  ['/benchmarks', BenchmarksPage],
  ['/buyers', BuyersPage],
  ['/appraisal', AppraisalPage],
  ['/privacy', PrivacyPolicyPage],
  ['/terms', TermsOfUsePage],
  ['/blog', BlogPage],
  ['/blog/:slug', BlogPostPage],
];

/** Loads the page at `pathname` before the first render (nothing for a 404). */
export function preloadRoute(pathname) {
  const page = PAGES.find(([path]) => matchPath(path, pathname));
  return page ? page[1].preload() : Promise.resolve();
}

/** Loads every page, so later links open at once; run once the first page is up. */
export function preloadAllPages() {
  return Promise.allSettled(PAGES.map(([, Page]) => Page.preload()));
}
