import { useEffect, useRef } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.jsx';

// A new page starts at its top, or at its #section when the link names one.
// The first page keeps the position the browser gave it: the #section in the
// URL, or where a reload left off.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigated = useRef(false);
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
    else if (navigated.current) window.scrollTo(0, 0);
    navigated.current = true;
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
