import { useEffect, useRef } from 'react';
import { prefersReducedMotion, useReducedMotion } from '../../../hooks/useMediaQuery.jsx';

/**
 * One product clip: a real flow in the Aseryx app, recorded from the demo with sample data
 * (list, certificate, offer, paid). 16:10, made at 1600 x 1000 to show at up to 800 x 500.
 *
 * Renders the light and the dark clip and lets CSS show the one that matches the site theme (the
 * `.dark` class on <html>), so the right one shows from the first paint, prerendered or not. Only
 * the one on show loads anything: its poster as it nears the screen, its video the first time it
 * is on screen. It plays muted and looped while it is on screen, from the start the first time.
 * Under prefers-reduced-motion it shows the still poster alone, nothing moves and no video loads.
 *
 *   <ProductClip name="offer" label="An AI company asks for a 6 month license" />
 *
 * The clips show the app's own words, so they are not decorative: pass `label`, a sentence on what
 * the clip shows. The words in the app are the product's, not the site's (see the README).
 *
 * From ../aseryx-motion/product. Its theme rules (.aseryx-clip) are in src/index.css rather than
 * an inline <style>, whose escaped text broke hydration for StepLoop, and it uses the site's
 * reduced-motion hooks.
 */

/**
 * The video, over its poster. It has no poster attribute (browsers fetch those even for a hidden
 * theme): the poster is the lazy image under it, which shows through until the first frame plays.
 * preload="none" means nothing is fetched until the first play().
 */
function Video({ src, reducedMotion }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    video.muted = true; // set the property too, so autoplay policies allow play()
    const io = new IntersectionObserver(
      ([entry]) => {
        // The first render has the video before the reduced-motion check has run, so check here
        // too: under reduced motion play() is never called, so the video never loads
        const reduce = reducedMotion ?? prefersReducedMotion();
        if (entry.isIntersecting && !reduce) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video); // a hidden (display: none) clip never intersects, so only the theme on show plays
    return () => io.disconnect();
  }, [reducedMotion]);
  return (
    <video ref={ref} width={800} height={500} muted loop playsInline preload="none" aria-hidden="true">
      <source src={`${src}.webm`} type='video/webm; codecs="vp9"' />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}

export default function ProductClip({ name, base = '/motion/product', label, reducedMotion, className, style }) {
  const prefersReduced = useReducedMotion();
  const reduced = reducedMotion ?? prefersReduced;
  return (
    <div className={className} style={style}>
      {['light', 'dark'].map((theme) => {
        const src = `${base}/${name}-${theme}`;
        return (
          <div
            key={theme}
            className={`aseryx-clip aseryx-clip--${theme}`}
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
          >
            {/* loading="lazy": a hidden theme's poster never loads */}
            <img src={`${src}.png`} width={800} height={500} alt="" loading="lazy" decoding="async" />
            {!reduced && <Video src={src} reducedMotion={reducedMotion} />}
          </div>
        );
      })}
    </div>
  );
}
