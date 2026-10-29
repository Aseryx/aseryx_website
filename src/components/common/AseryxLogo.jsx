// The Aseryx lockup: the dotted keyhole cube, then ASERYX (Aseryx Cube Logo,
// "35% keyhole + ASERYX with a regular X"). Never coral. The canvas's header
// size (cube 44px, a 13px gap, wordmark 18px) read too big beside the 13px nav
// links, so the site sets it at 82% with the same proportions: cube 36px, an
// 11px gap, wordmark 15px.
// Both files are drawn in the light theme's ink (#1a1a1a); dark mode turns
// them white, the dark theme's ink, so each loads once rather than in two
// colours. The name sits on the wrapper, since both images are decoration.
const INK = 'dark:brightness-0 dark:invert';

const AseryxLogo = ({ className = '', title = 'Aseryx' }) => (
  <span role="img" aria-label={title} className={`inline-flex items-center gap-[11px] ${className}`}>
    <img src="/images/aseryx-cube.svg" alt="" className={`h-9 w-auto ${INK}`} width="40" height="44" />
    <img src="/images/aseryx-wordmark.png" alt="" className={`h-[15px] w-auto ${INK}`} width="1000" height="159" />
  </span>
);

export default AseryxLogo;
