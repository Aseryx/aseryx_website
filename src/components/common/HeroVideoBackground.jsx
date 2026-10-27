import { useEffect, useRef, useState } from 'react';

/**
 * Single muted looping hero video. One network fetch; respects reduced motion.
 * Fully grey in both themes so the fabric reads as folds, not sand.
 * Light: the clip averages 149/255 with its brightest tenth at 208+, so
 * brightness 1.22 lifts that tenth to pure white, contrast 1.4 sharpens the
 * folds, and multiplying it in at 16% keeps the hero white with silver shading.
 * Dark: 22%, since the old hero's 58% relied on dark overlays this hero does
 * not have and washed out the lede and nav without them.
 * Phones get a stronger mix (24% light, 28% dark): the folds are small there,
 * and the lede's softened ink keeps at least 4.5:1 over the brightest frames.
 * The poster is the clip's first frame, so a phone that blocks autoplay (Low
 * Power Mode, data saver) still shows the waves, and reduced motion gets the
 * same frame as a still instead of nothing.
 */
const LAYER =
  'absolute inset-0 overflow-hidden pointer-events-none grayscale brightness-[1.22] contrast-[1.4] mix-blend-multiply ' +
  'opacity-[0.24] md:opacity-[0.16] ' +
  'dark:opacity-[0.28] md:dark:opacity-[0.22] dark:brightness-90 dark:contrast-100 dark:mix-blend-normal';

const HeroVideoBackground = ({ src = '/hero-bg.mp4', poster = '/hero-waves-poster.jpg' }) => {
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
    return (
      <div className={LAYER} aria-hidden="true">
        <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={LAYER} aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
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
