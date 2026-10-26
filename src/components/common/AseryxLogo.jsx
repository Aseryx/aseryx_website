// Design-system wordmark: black ink on light, white on dark. Never coral.
const AseryxLogo = ({ className = 'h-7', title = 'Aseryx' }) => (
  <span className={`inline-flex items-center ${className}`}>
    <img
      src="/images/aseryx-logo-black.png"
      alt={title}
      className="h-full w-auto dark:hidden"
      width="1000"
      height="159"
    />
    <img
      src="/images/aseryx-logo-white.png"
      alt=""
      aria-hidden="true"
      className="hidden h-full w-auto dark:block"
      width="1000"
      height="159"
    />
  </span>
);

export default AseryxLogo;
