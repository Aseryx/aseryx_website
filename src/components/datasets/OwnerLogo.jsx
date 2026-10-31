/**
 * An owner's logo, cut from their dataset card, always shown beside their
 * name in text, so the image itself is decorative. Most are dark marks on a
 * transparent ground; in dark mode they sit on a white chip instead of
 * vanishing, which keeps every brand in its own colours.
 */
const OwnerLogo = ({ logo, className = '' }) => (
  <img
    src={logo.src}
    width={logo.width}
    height={logo.height}
    alt=""
    className={`w-auto shrink-0 rounded-sm dark:bg-white dark:p-0.5 ${className}`}
  />
);

export default OwnerLogo;
