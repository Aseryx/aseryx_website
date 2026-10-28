import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useMediaQuery.jsx';

/**
 * Plays a product moment once: the first time it is mostly on screen, or at
 * once when `immediate` (it was just opened by a tap).
 *
 * Phases: 'static' is the finished screen (the server render, reduced motion,
 * a screen already on view at load); 'wait' holds it at its start while it is
 * still below the fold; 'play' runs it to the finished screen. A screen is
 * only held back while nobody can see it, so nothing on view ever vanishes.
 *
 * @returns {[React.RefObject, 'static' | 'wait' | 'play']}
 */
export const usePlayOnView = ({ immediate = false, threshold = 0.5 } = {}) => {
  const ref = useRef(null);
  // Lazy, so a tap-opened screen starts in 'play' on its first paint instead
  // of flashing its finished state for a frame.
  const [phase, setPhase] = useState(() => (immediate && !prefersReducedMotion() ? 'play' : 'static'));

  useEffect(() => {
    // Tapped after it mounted (the step already showing, tapped again): play
    // now. 'wait' must never outlive the observer that would end it.
    if (immediate) {
      setPhase((current) => (current === 'wait' ? 'play' : current));
      return;
    }
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return;
    const { top, bottom } = element.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return;

    setPhase('wait');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('play');
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [immediate, threshold]);

  return [ref, phase];
};

/** Wrapper classes for each phase; the CSS lives with the moments in index.css. */
export const PHASE_CLASS = { static: '', wait: 'moment-run moment-wait', play: 'moment-run' };
