import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../../hooks/useMediaQuery.jsx';
import NumberFlow, { continuous } from '@number-flow/react';

/**
 * A dataset's score on a dial: 40 dots round a ring, filled clockwise to the score, with the figure
 * in the middle (NumberFlow, tabular figures). Drawn in SVG in currentColor, so it follows the theme.
 *
 *   <ScoreDial score={dataset.score} above="Quality certificate" below="Score" />
 *
 * The first time it scrolls into view, the dots fill and the figure rolls up from 0 together
 * (about 1.4 s). A dial already on screen when the page loads stays as it is, so nothing flashes;
 * animateOnLoad plays it anyway. Under prefers-reduced-motion it shows the final score at once.
 * The page's HTML (and a prerender) always holds the real score.
 *
 * above and below are the site's own words; the dial adds none of its own.
 * Needs: npm i @number-flow/react
 */
const N = 40;
const R = 42;
const SIDE = ((Math.PI * 2 * R) / N) * 0.52;
const FILL_MS = 1400;
const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)';

const CSS = `
.asd{position:relative;display:inline-block;aspect-ratio:1;container-type:inline-size;color:inherit}
.asd svg{display:block;width:100%;height:100%;overflow:visible}
.asd[data-state="waiting"] .asd-dot{opacity:.14}
.asd[data-state="play"] .asd-dot{animation:asd-on .16s ease-out both;animation-delay:var(--d)}
@keyframes asd-on{from{opacity:.14}to{opacity:var(--o)}}
.asd-in{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:2cqi;text-align:center}
.asd-fig{font-size:27cqi;font-weight:600;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums}
.asd-cap{font-size:max(9px,4.4cqi);line-height:1.3;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-secondary,inherit)}
@media (prefers-reduced-motion: reduce){.asd .asd-dot{animation:none!important;opacity:var(--o)!important}}
`;
function useStyles() {
  useEffect(() => {
    if (document.getElementById('aseryx-score-dial')) return;
    const style = document.createElement('style');
    style.id = 'aseryx-score-dial';
    style.textContent = CSS;
    document.head.appendChild(style);
  }, []);
}

export default function ScoreDial({
  score, // 0 to 100
  size = 220, // CSS px across
  above,
  below,
  animateOnLoad = false,
  reducedMotion, // true or false to override the visitor's setting
  className,
  style,
}) {
  useStyles();
  const ref = useRef(null);
  const [state, setState] = useState('rest'); // rest -> waiting (off screen) -> play
  const [shown, setShown] = useState(score);
  const [animated, setAnimated] = useState(false);
  const value = Math.max(0, Math.min(100, score));
  const lit = (value / 100) * N;
  // each dot lights when the figure passes its share of the score (the figure eases out, so do the dots)
  const delay = (i) => Math.round(FILL_MS * (1 - Math.cbrt(1 - Math.min(1, i / Math.max(lit, 1)))));

  useEffect(() => {
    const reduced = reducedMotion ?? prefersReducedMotion();
    if (reduced) {
      setState('rest');
      setAnimated(false);
      setShown(value);
      return undefined;
    }
    let first = true;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        const atLoad = first;
        first = false;
        if (!entry.isIntersecting) {
          if (atLoad) {
            setAnimated(false);
            setShown(0);
            setState('waiting');
          }
          return;
        }
        io.disconnect();
        if (atLoad && !animateOnLoad) return;
        setAnimated(false);
        setShown(0);
        setState('waiting');
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            setAnimated(true);
            setShown(value);
            setState('play');
          });
        });
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, animateOnLoad, reducedMotion]);

  return (
    <div ref={ref} className={className ? `asd ${className}` : 'asd'} data-state={state} style={{ width: size, ...style }}>
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        {Array.from({ length: N }, (_, i) => {
          const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
          const on = Math.max(0, Math.min(1, lit - i));
          const o = 0.14 + 0.86 * on;
          return (
            <rect
              key={i}
              className="asd-dot"
              x={(50 + Math.cos(a) * R - SIDE / 2).toFixed(2)}
              y={(50 + Math.sin(a) * R - SIDE / 2).toFixed(2)}
              width={SIDE.toFixed(2)}
              height={SIDE.toFixed(2)}
              rx={(SIDE * 0.17).toFixed(2)}
              fill="currentColor"
              opacity={o.toFixed(3)}
              style={{ '--o': o.toFixed(3), '--d': `${delay(i)}ms` }}
            />
          );
        })}
      </svg>
      <div className="asd-in">
        {above ? <span className="asd-cap">{above}</span> : null}
        <NumberFlow
          className="asd-fig"
          value={shown}
          animated={animated}
          respectMotionPreference
          plugins={[continuous]}
          spinTiming={{ duration: FILL_MS, easing: EASE }}
          transformTiming={{ duration: FILL_MS, easing: EASE }}
          willChange
          style={{ fontVariantNumeric: 'tabular-nums' }}
        />
        {below ? <span className="asd-cap">{below}</span> : null}
      </div>
    </div>
  );
}
