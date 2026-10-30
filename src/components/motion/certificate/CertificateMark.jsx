import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../../hooks/useMediaQuery.jsx';

/**
 * The certificate seal: a ring of 24 dots, an inner ring and a check, drawn in SVG in currentColor,
 * so it takes the text colour of wherever it sits and follows the theme with it.
 *
 *   <CertificateMark label="Quality certificate" />                    // a dataset with a certificate
 *   <CertificateMark status="to-follow" label="Certificate to follow" /> // footage, audio, 3D for now
 *
 * The first time a certified mark scrolls into view, the ring closes clockwise and the check draws
 * in (about 0.8 s). A mark already on screen when the page loads stays as it is, so nothing flashes;
 * animateOnLoad plays it anyway. "to-follow" is the faint ring with no check, and never moves; nor
 * does anything under prefers-reduced-motion. The page's HTML (and a prerender) always holds the
 * finished mark.
 *
 * The label is the site's own words, shown beside the mark; without one, put the words next to it
 * yourself, since the mark is hidden from screen readers. Same proportions as drawSeal in
 * hero/aseryx-deal.js, which draws it inside the loops.
 */
const R = 41; // ring radius in a 100 x 100 box
const D = R * 0.15; // dot side
const DOTS = Array.from({ length: 24 }, (_, i) => {
  const a = -Math.PI / 2 + (i / 24) * Math.PI * 2;
  return [50 + Math.cos(a) * R - D / 2, 50 + Math.sin(a) * R - D / 2];
});
const CHECK = [[-0.33, 0.02], [-0.09, 0.25], [0.35, -0.22]].map(([x, y]) => `${(50 + x * R).toFixed(2)},${(50 + y * R).toFixed(2)}`).join(' ');

// The mark's CSS (.acm) is in src/index.css, so a prerendered page paints
// with it. The pack injects it from an effect, which lands after that paint.

export default function CertificateMark({
  status = 'certified', // 'certified' | 'to-follow'
  size = 20, // CSS px
  label,
  animateOnLoad = false,
  reducedMotion, // true or false to override the visitor's setting
  className,
  style,
}) {
  const ref = useRef(null);
  const [state, setState] = useState('rest'); // rest -> waiting (off screen) -> play
  const pending = status === 'to-follow';

  useEffect(() => {
    const reduced = reducedMotion ?? prefersReducedMotion();
    if (pending || reduced) {
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
          setState((s) => (s === 'rest' && atLoad ? 'waiting' : s));
          return;
        }
        if (atLoad && !animateOnLoad) {
          io.disconnect();
          return;
        }
        setState('waiting');
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => setState('play'));
        });
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pending, animateOnLoad, reducedMotion]);

  const faint = pending ? 0.34 : 1;
  return (
    <span ref={ref} className={className ? `acm ${className}` : 'acm'} data-state={state} style={style}>
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <g fill="currentColor" opacity={faint}>
          {DOTS.map(([x, y], i) => (
            <rect key={i} className="acm-dot" x={x.toFixed(2)} y={y.toFixed(2)} width={D} height={D} rx={D * 0.17} style={{ '--i': i }} />
          ))}
        </g>
        <circle
          className="acm-draw acm-ring"
          cx="50"
          cy="50"
          r={R * 0.74}
          fill="none"
          stroke="currentColor"
          strokeWidth={R * 0.075}
          strokeLinecap="round"
          opacity={faint}
          pathLength="1"
          strokeDasharray="1 1"
          transform="rotate(-90 50 50)"
        />
        {!pending && (
          <polyline
            className="acm-draw acm-check"
            points={CHECK}
            fill="none"
            stroke="currentColor"
            strokeWidth={R * 0.14}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="1 1"
          />
        )}
      </svg>
      {label ? <span className="acm-label">{label}</span> : null}
    </span>
  );
}
