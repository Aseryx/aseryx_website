import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useMediaQuery.jsx';
import { INTRO_DURATION, VIEW, clamp, drawDissolve, drawIntro, drawMark } from './aseryx-cube.js';

/**
 * The Aseryx cube for the hero, drawn in code so it follows the light/dark switch.
 *
 * variant="intro"  the cube assembles from scattered dots in about 2 s, the keyhole cuts through, then it rests.
 * variant="scroll" the same intro, then the dots scatter as the hero leaves the screen and re-form as it returns.
 *
 * Colour comes from the site's --ink variable, read again whenever the theme changes. The keyhole is cut
 * out, so whatever sits behind the hero shows through it. Under prefers-reduced-motion the mark is drawn at
 * rest and nothing moves.
 *
 * The box keeps the mark's proportions (821 : 903); size it with width or className. Dots fly in from
 * outside the box, over a margin of `bleed` x the box on every side, so the parent must not clip it.
 *
 * band={false} draws the keyhole cut straight through the dots, matching the nav's aseryx-cube.svg.
 */
export default function AseryxHero({
  variant = 'intro',
  band = true,
  bleed = 0.6,
  inkVar = '--ink',
  label = 'Aseryx',
  reducedMotion,
  className,
  style,
}) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const systemReduced = useReducedMotion();
  const reduced = reducedMotion ?? systemReduced;

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let ink = '#1a1a1a';
    let raf = 0;
    let phase = reduced ? 'rest' : 'waiting'; // waiting -> intro -> rest
    let start = 0;
    let p = 0; // dissolve, 0 at rest
    let target = 0;

    const readInk = () => {
      ink = getComputedStyle(box).getPropertyValue(inkVar).trim() || '#1a1a1a';
    };
    const size = () => {
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      const w = Math.round(box.clientWidth * (1 + 2 * bleed) * dpr);
      const h = Math.round(box.clientHeight * (1 + 2 * bleed) * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      return dpr;
    };
    const draw = (now) => {
      const dpr = size();
      const s = (box.clientWidth / VIEW.w) * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(s, 0, 0, s, canvas.width / 2, canvas.height / 2);
      const opts = { ink, band, hole: 'erase' };
      if (phase === 'intro') drawIntro(ctx, (now - start) / 1000, opts);
      else if (phase === 'waiting') return;
      else if (p > 0.0005) drawDissolve(ctx, p, opts);
      else drawMark(ctx, opts);
    };
    const tick = (now) => {
      raf = 0;
      if (phase === 'intro' && now - start >= INTRO_DURATION * 1000) phase = 'rest';
      if (phase === 'rest' && variant === 'scroll' && !reduced) p += (target - p) * 0.18;
      draw(now);
      const settling = phase === 'rest' && Math.abs(target - p) > 0.0005;
      if (phase === 'intro' || settling) raf = requestAnimationFrame(tick);
      else if (phase === 'rest') {
        p = target;
        draw(now);
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Dissolve follows how much of the box is still on screen.
    const measure = () => {
      if (variant !== 'scroll' || reduced) return;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visible = clamp((Math.min(r.bottom, vh) - Math.max(r.top, 0)) / Math.max(1, r.height), 0, 1);
      target = 1 - visible;
      if (phase === 'rest') kick();
    };

    readInk();
    measure();
    if (phase === 'rest') draw(performance.now());

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 'waiting') {
          phase = 'intro';
          start = performance.now();
          kick();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(box);

    const redraw = () => {
      readInk();
      if (phase !== 'intro') draw(performance.now());
    };
    const themeObserver = new MutationObserver(redraw);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', redraw);
    const ro = new ResizeObserver(() => {
      measure();
      if (phase !== 'intro') draw(performance.now());
    });
    ro.observe(box);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener('change', redraw);
      ro.disconnect();
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [variant, band, bleed, inkVar, reduced]);

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={label}
      className={className}
      style={{ position: 'relative', aspectRatio: `${VIEW.w} / ${VIEW.h}`, ...style }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: `${-bleed * 100}%`,
          top: `${-bleed * 100}%`,
          width: `${100 + 200 * bleed}%`,
          height: `${100 + 200 * bleed}%`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
