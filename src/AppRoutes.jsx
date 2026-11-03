import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { PAGES } from './pageRoutes.js';
import { STATIC_ROUTES } from './config/staticRoutes.js';

export { STATIC_ROUTES };

// The market benchmark's layout study, served by the dev server only: the
// build drops this branch, so it never ships or prerenders.
const BenchmarksMarketMockPage = import.meta.env.DEV ? lazy(() => import('./pages/BenchmarksMarketMockPage.jsx')) : null;

/**
 * The site's routes. Pages load as their own chunks (pageRoutes.js); the
 * Suspense boundary only shows while a page not yet preloaded arrives.
 */
export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {PAGES.map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        {BenchmarksMarketMockPage && <Route path="/benchmarks/market-mock" element={<BenchmarksMarketMockPage />} />}
        {/* Home is the owners' page; old /providers links land there (a 301 in public/_redirects too) */}
        <Route path="/providers" element={<Navigate to="/" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
