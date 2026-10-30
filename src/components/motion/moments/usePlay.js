import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../../hooks/useMediaQuery.jsx';

/**
 * When a moment plays: 'rest' (the finished screen), 'waiting' (the screen before it starts) or
 * 'play'. The same rules as CertificateMark and ScoreDial: a moment off screen when the page loads
 * waits, and plays the first time half of it is in view; one already on screen at load stays as
 * it is, unless animateOnLoad; under prefers-reduced-motion it never moves. The page's HTML (and a
 * prerender) always holds the finished screen.
 *
 * From ../aseryx-motion/moments. The look the moments share and each one's own CSS live at the
 * end of src/index.css instead of being injected from an effect, which landed after a prerendered
 * page had painted.
 */
export default function usePlay(ref, { animateOnLoad = false, reducedMotion } = {}) {
  const [state, setState] = useState('rest');
  useEffect(() => {
    const reduced = reducedMotion ?? prefersReducedMotion();
    if (reduced) {
      setState('rest');
      return undefined;
    }
    let first = true;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        const atLoad = first;
        first = false;
        if (!entry.isIntersecting) {
          if (atLoad) setState('waiting');
          return;
        }
        io.disconnect();
        if (atLoad && !animateOnLoad) return;
        setState('waiting');
        // Two frames, so the waiting screen paints before the animations start from it
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => setState('play'));
        });
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, animateOnLoad, reducedMotion]);
  return state;
}

/**
 * How many of a moment's cues (ms after it starts playing) have passed: none while it waits, each
 * in turn while it plays, and all of them at rest. For the steps CSS cannot start on its own, like
 * a figure's roll or a seal that draws when it mounts.
 */
export function useCues(state, cues) {
  const [passed, setPassed] = useState(state === 'rest' ? cues.length : 0);
  useEffect(() => {
    if (state === 'rest') {
      setPassed(cues.length);
      return undefined;
    }
    setPassed(0);
    if (state !== 'play') return undefined;
    const timers = cues.map((ms, i) => setTimeout(() => setPassed((p) => Math.max(p, i + 1)), ms));
    return () => timers.forEach(clearTimeout);
    // The cues are fixed for a moment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return passed;
}
