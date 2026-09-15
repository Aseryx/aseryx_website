import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * Product screenshot frame.
 * Pass lightSrc / darkSrc for theme-aware stills; children for custom overlays;
 * otherwise shows a labeled placeholder.
 */
export default function ProductPlaceholder({
  label = 'Product',
  caption = 'Screenshot coming',
  lightSrc = null,
  darkSrc = null,
  alt = '',
  aspect = 'video',
  /** cover = crop to frame (default). contain = letterbox. natural = full image, height follows PNG. */
  fit = 'cover',
  className = '',
  children = null,
}) {
  const { theme } = useTheme();
  const aspectClass =
    aspect === 'square'
      ? 'aspect-square'
      : aspect === 'wide'
        ? 'aspect-[21/9]'
        : aspect === 'auto'
          ? ''
          : 'aspect-video';

  const hasImage = Boolean(lightSrc || darkSrc);
  const src =
    theme === 'dark' ? darkSrc || lightSrc : lightSrc || darkSrc;

  const imgClass =
    fit === 'natural'
      ? 'relative z-10 block h-auto w-full'
      : fit === 'contain'
        ? 'absolute inset-0 z-10 h-full w-full object-contain object-top'
        : 'absolute inset-0 z-10 h-full w-full object-cover object-top';

  return (
    <figure className={`w-full ${className}`}>
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-xl border border-[var(--border-color)] bg-[#EDEBE8] dark:bg-[#111111]`}
      >
        {hasImage && src ? (
          <img
            src={src}
            alt={alt || label}
            className={imgClass}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,122,77,0.08),transparent_55%)]" />
            <div
              className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--border-color) 1px, transparent 1px), linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {children ? (
              <div className="relative z-10 h-full w-full flex items-center justify-center p-4 md:p-6">
                {children}
              </div>
            ) : (
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-orange">
                  {label}
                </p>
                <p className="text-sm text-[#6B7280] dark:text-gray-500 max-w-xs leading-relaxed">
                  {caption}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </figure>
  );
}
