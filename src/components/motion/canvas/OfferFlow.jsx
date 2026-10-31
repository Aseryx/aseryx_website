import { useEffect, useRef } from 'react';
import { FLOW, drawFlow } from '../hero/aseryx-deal.js';

/**
 * The deal, for For AI companies › "You deal with the owner, directly": the owner's cube (with its
 * keyhole and certificate), Aseryx's frame, and the team's cube.
 *
 * Plays once, the first time it is 40% on screen (about 7 s): the team's query and its count, the
 * offer's payment held in Aseryx's frame, the owner's approval (the keyhole lights coral), access
 * opening for the term, and the payment going to the owner. Then it rests on that last frame, and it
 * never plays again on the page. Before it plays it shows the two cubes and the empty frame; under
 * prefers-reduced-motion it shows the last frame at once.
 *
 * The words for each party are the site's own, set around it in HTML. Colours come from the site's
 * CSS variables and are read again when the theme changes. The canvas is opaque (it paints
 * --bg-page) and keeps the drawing's proportions (1200 : 440); size it with width.
 */
export default function OfferFlow({
  inkVar = '--ink',
  signalVar = '--brand',
  backgroundVar = '--bg-page',
  reducedMotion, // true or false to override the visitor's setting
  label, // optional accessible description; without it the canvas is decorative
  className,
  style,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = () => reducedMotion ?? motionQuery.matches;
    let theme = { bg: '#ffffff', ink: '#1a1a1a', signal: '#ff7a4d' };
    let t = reduced() ? FLOW.duration : 0;
    let raf = 0;
    let start = 0;
    let played = reduced();

    const readTheme = () => {
      const cs = getComputedStyle(canvas);
      theme = {
        bg: cs.getPropertyValue(backgroundVar).trim() || '#ffffff',
        ink: cs.getPropertyValue(inkVar).trim() || '#1a1a1a',
        signal: cs.getPropertyValue(signalVar).trim() || '#ff7a4d',
      };
    };
    const draw = () => {
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round((w * FLOW.h) / FLOW.w));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.setTransform(w / FLOW.w, 0, 0, h / FLOW.h, 0, 0);
      drawFlow(ctx, t, theme);
    };
    const tick = (now) => {
      t = Math.min(FLOW.duration, (now - start) / 1000);
      draw();
      raf = t < FLOW.duration ? requestAnimationFrame(tick) : 0;
    };
    const play = () => {
      if (played) return;
      played = true;
      start = performance.now();
      raf = requestAnimationFrame(tick);
    };

    readTheme();
    draw();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (!played) io.observe(canvas);

    const retheme = () => {
      readTheme();
      if (!raf) draw();
    };
    const themeObserver = new MutationObserver(retheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', retheme);
    const onMotion = () => {
      if (!reduced()) return;
      cancelAnimationFrame(raf);
      raf = 0;
      played = true;
      t = FLOW.duration;
      io.disconnect();
      draw();
    };
    motionQuery.addEventListener('change', onMotion);
    const ro = new ResizeObserver(() => {
      if (!raf) draw();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener('change', retheme);
      motionQuery.removeEventListener('change', onMotion);
      ro.disconnect();
    };
  }, [inkVar, signalVar, backgroundVar, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: `${FLOW.w} / ${FLOW.h}`, ...style }}
    />
  );
}
