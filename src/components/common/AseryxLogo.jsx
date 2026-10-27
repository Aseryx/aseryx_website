// Design-system wordmark: black ink on light, white on dark. Never coral.
// The name sits on the wrapper: the theme hides one image with display:none,
// which would drop an alt text that lived on it.
const AseryxLogo = ({ className = 'h-7', title = 'Aseryx' }) => (
  <span role="img" aria-label={title} className={`inline-flex items-center ${className}`}>
    <img
      src="/images/aseryx-logo-black.png"
      alt=""
      className="h-full w-auto dark:hidden"
      width="1000"
      height="159"
    />
    <img
      src="/images/aseryx-logo-white.png"
      alt=""
      className="hidden h-full w-auto dark:block"
      width="1000"
      height="159"
    />
  </span>
);

export default AseryxLogo;
