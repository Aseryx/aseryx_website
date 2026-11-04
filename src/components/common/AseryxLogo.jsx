// The Aseryx lockup: the dotted keyhole cube in coral, then ASERYX (Aseryx
// Cube Logo, logo pack: "coral cube on light" and "coral cube on dark"). The
// canvas's header size (cube 44px, a 13px gap, wordmark 18px) read too big
// beside the 13px nav links, so the site sets it at 82% with the same
// proportions: cube 36px, an 11px gap, wordmark 15px.
// The cube is coral in both themes. The wordmark is drawn in the light
// theme's ink (#1a1a1a) and dark mode turns it white, the dark theme's ink,
// so it loads once rather than in two colours. The name sits on the wrapper,
// since both images are decoration.
const INK = 'dark:brightness-0 dark:invert';

const AseryxLogo = ({ className = '', title = 'Aseryx' }) => (
  <span role="img" aria-label={title} className={`inline-flex items-center gap-[11px] ${className}`}>
    <img src="/images/aseryx-cube-coral.svg" alt="" className="h-9 w-auto" width="40" height="44" />
    <img src="/images/aseryx-wordmark.png" alt="" className={`h-[15px] w-auto ${INK}`} width="1000" height="159" />
  </span>
);

export default AseryxLogo;
