import { useEffect, useRef, useState } from 'react';

/**
 * Single muted looping hero video. One network fetch; respects reduced motion.
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
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-[0.58] grayscale-[0.15] dark:grayscale-[0.2] dark:brightness-90 mix-blend-multiply dark:mix-blend-normal"
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
