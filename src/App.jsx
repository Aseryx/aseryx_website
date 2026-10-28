import { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter, useLocation, useNavigationType } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.jsx';

// Where each visited page was left, by history entry. In memory only: a
// reload starts afresh, and the browser puts the reloaded page back itself.
const scrollPositions = new Map();

// A link opens a page at its top, or at the #section it names. Back and
// Forward return to where that page was left, as on a site of separate
// pages. The first page keeps the position the browser gave it: the #section
// in the URL, or where a reload left off.
function ScrollOnNavigate() {
  const { pathname, hash, key } = useLocation();
  // 'PUSH' for a link, 'POP' for Back, Forward and the first page
  const navigationType = useNavigationType();
  const shown = useRef(null); // the history entry on screen

  useEffect(() => {
    // Left to itself, the browser restores Back and Forward onto the page
    // being left, before React swaps it in. Take that over while the site
    // runs, and hand it back on pagehide so a reload still lands in place.
    const take = () => {
      window.history.scrollRestoration = 'manual';
    };
    const release = () => {
      window.history.scrollRestoration = 'auto';
    };
    const save = () => {
      if (shown.current) scrollPositions.set(shown.current, window.scrollY);
    };
    take();
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('pageshow', take);
    window.addEventListener('pagehide', release);
    return () => {
      window.removeEventListener('scroll', save);
      window.removeEventListener('pageshow', take);
      window.removeEventListener('pagehide', release);
      release();
    };
  }, []);

  // Before paint, so a page never shows at the previous page's offset.
  useLayoutEffect(() => {
    const first = shown.current === null;
    shown.current = key;
    const saved = navigationType === 'POP' ? scrollPositions.get(key) : undefined;
    const target = hash && document.getElementById(hash.slice(1));
    if (saved !== undefined) window.scrollTo(0, saved);
    else if (target) target.scrollIntoView();
    else if (!first) window.scrollTo(0, 0);
  }, [pathname, hash, key, navigationType]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollOnNavigate />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
