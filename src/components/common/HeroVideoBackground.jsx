import { useEffect, useRef, useState } from 'react';

/**
 * Single muted looping hero video. One network fetch; respects reduced motion.
 * Fully grey in both themes so the fabric reads as folds, not sand.
 * Light: the clip averages 149/255 with its brightest tenth at 208+, so
 * brightness 1.22 lifts that tenth to pure white, contrast 1.4 sharpens the
 * folds, and multiplying it in at 16% keeps the hero white with silver shading.
 * Dark: 22%, since the old hero's 58% relied on dark overlays this hero does
 * not have and washed out the lede and nav without them.
 */
const HeroVideoBackground = ({ src = '/hero-bg.mp4' }) => {
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const playSafe = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    playSafe();

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playSafe();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      video.pause();
    };
  }, [reducedMotion, src]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.16] grayscale brightness-[1.22] contrast-[1.4] mix-blend-multiply dark:opacity-[0.22] dark:brightness-90 dark:contrast-100 dark:mix-blend-normal"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
      />
    </div>
  );
};

export default HeroVideoBackground;
