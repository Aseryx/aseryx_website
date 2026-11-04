import { useEffect, useState } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Whether a media query matches, kept current as it changes. False on the
 * server and on the first client render, so hydration matches the prerendered
 * HTML; the effect then reads the real value.
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
};

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION);

/** The same check for effects and handlers, which only run in the browser. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches;
