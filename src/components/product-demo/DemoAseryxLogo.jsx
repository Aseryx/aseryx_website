/**
 * Aseryx wordmark from aseryx_demo@demo/screenshot-ready-seed
 * (public/images/aseryx-logo-{black,white}.png).
 */
export default function DemoAseryxLogo({
  className = 'h-6 w-auto max-w-[160px]',
  title = 'Aseryx',
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src="/images/aseryx-logo-black.png"
        alt={title}
        className="h-full w-auto object-contain dark:hidden"
        width={1000}
        height={159}
      />
      <img
        src="/images/aseryx-logo-white.png"
        alt=""
        aria-hidden="true"
        className="hidden h-full w-auto object-contain dark:block"
        width={1000}
        height={159}
      />
    </span>
  );
}
