import ProductClip from '../motion/product/ProductClip.jsx';

/**
 * A product clip in a frame, as LoopFrame frames a loop: a real flow in the
 * Aseryx app, 16:10 and sharp up to 800px wide (public/motion/product).
 * `label` says what it shows, since the words in it are the app's.
 */
const ClipFrame = ({ name, label, className = '' }) => (
  <ProductClip
    name={name}
    label={label}
    className={`w-full max-w-[50rem] overflow-hidden rounded-2xl border border-border-light ${className}`}
  />
);

export default ClipFrame;
