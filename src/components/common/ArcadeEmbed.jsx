/**
 * Arcade interactive product demo embed.
 * Native Arcade frame sizing, with a soft fade over the bottom chrome / watermark.
 */
export default function ArcadeEmbed({
  src = 'https://demo.arcade.software/6JUAupkrtOtV98abBXDY?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true',
  title = 'Aseryx product demo',
  className = '',
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      style={{ paddingBottom: 'calc(57.7805% + 41px)', height: 0 }}
    >
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write; autoplay"
        className="absolute inset-0 h-full w-full"
        style={{ colorScheme: 'light' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 md:h-48 bg-gradient-to-t from-[#F9F8F6] from-25% via-[#F9F8F6]/85 via-55% to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/85 dark:to-transparent"
        aria-hidden
      />
    </div>
  );
}
