import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useMediaQuery.jsx';

/**
 * One How it works loop (pick, appraise, approve, sign).
 *
 * Renders the light and the dark file and lets CSS show the one that matches the site theme
 * (the `.dark` class on <html>), so the right one shows from the first paint, prerendered or not.
 * Plays muted and looped only while it is on screen. Under prefers-reduced-motion it shows the
 * still poster instead, and nothing moves.
 *
 * Copy loops/*.webm, *.mp4 and *.png into public/motion/loops/ (or pass `base`).
 *
 *   <StepLoop name="pick" />
 *
 * Without `label` the loop is decorative (hidden from screen readers), which suits How it works, where
 * the step's own title and text sit beside it. Pass `label` only when a loop stands alone.
 */
const CSS = `
.aseryx-loop{display:block;width:100%;height:auto;aspect-ratio:1}
.aseryx-loop--dark{display:none}
.dark .aseryx-loop--light,[data-theme="dark"] .aseryx-loop--light{display:none}
.dark .aseryx-loop--dark,[data-theme="dark"] .aseryx-loop--dark{display:block}
`;

function Clip({ src, label, size, theme }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    video.muted = true; // set the property too, so autoplay policies allow play()
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video); // a hidden (display: none) clip never intersects, so only the visible theme plays
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={`aseryx-loop aseryx-loop--${theme}`}
      width={size}
      height={size}
      muted
      loop
      playsInline
      preload="metadata"
      poster={`${src}.png`}
      aria-label={label}
      role={label ? 'img' : undefined}
      aria-hidden={label ? undefined : true}
    >
      <source src={`${src}.webm`} type='video/webm; codecs="vp9"' />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}

export default function StepLoop({ name, base = '/motion/loops', size = 360, label, reducedMotion, className, style }) {
  const systemReduced = useReducedMotion();
  const reduced = reducedMotion ?? systemReduced;
  return (
    <div className={className} style={style}>
      <style>{CSS}</style>
      {['light', 'dark'].map((theme) =>
        reduced ? (
          <img
            key={theme}
            className={`aseryx-loop aseryx-loop--${theme}`}
            src={`${base}/${name}-${theme}.png`}
            width={size}
            height={size}
            alt={label ?? ''}
          />
        ) : (
          <Clip key={theme} src={`${base}/${name}-${theme}`} label={label} size={size} theme={theme} />
        ),
      )}
    </div>
  );
}
