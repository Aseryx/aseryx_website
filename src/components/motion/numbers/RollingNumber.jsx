import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../../hooks/useMediaQuery.jsx';
import NumberFlow, { continuous } from '@number-flow/react';

/**
 * A figure whose digits roll into place the first time it scrolls into view, with NumberFlow.
 *
 *   <RollingNumber value={80} prefix="At least " suffix="%" />   // At least 80%
 *   <RollingNumber value={score} />                               // a dataset's appraisal score
 *
 * Figures are tabular, so the width never jumps while digits roll. The page's own HTML (and a
 * prerender) always holds the real value; the roll starts from `start` once the figure is on screen.
 * Under prefers-reduced-motion the final value shows at once.
 *
 * rollOnLoad={false} leaves a figure that is already on screen at load as it is, so a prerendered page
 * never shows its real value, then `start`, then the roll.
 *
 * Needs: npm i @number-flow/react
 */
export default function RollingNumber({
  value,
  start = 0,
  prefix,
  suffix,
  format,
  locales,
  rollOnLoad = true,
  reducedMotion,
  className,
  style,
  ...rest
}) {
  const wrap = useRef(null);
  const systemReduced = useReducedMotion();
  const reduced = reducedMotion ?? systemReduced;
  const [shown, setShown] = useState(value);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (reduced) {
      setAnimated(false);
      setShown(value);
      return undefined;
    }
    const el = wrap.current;
    let first = true;
    let played = false;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (played) return;
        const atLoad = first;
        first = false;
        if (!entry.isIntersecting) {
          // off screen: wait at the start value, without animating, so the roll begins from it
          setAnimated(false);
          setShown(start);
          return;
        }
        played = true;
        if (atLoad && !rollOnLoad) return;
        setAnimated(false);
        setShown(start);
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            setAnimated(true);
            setShown(value);
          });
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, start, reduced, rollOnLoad]);

  return (
    <span ref={wrap} className={className} style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums', ...style }}>
      <NumberFlow
        value={shown}
        prefix={prefix}
        suffix={suffix}
        format={format}
        locales={locales}
        animated={animated && !reduced}
        respectMotionPreference
        plugins={[continuous]}
        willChange
        style={{ fontVariantNumeric: 'tabular-nums' }}
        {...rest}
      />
    </span>
  );
}
