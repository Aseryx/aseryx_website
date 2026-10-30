import ProductClip from '../motion/product/ProductClip.jsx';

/**
 * A product clip in a frame, as LoopFrame frames a loop: a real flow in the
 * Aseryx app, 16:10 and sharp up to 800px wide (public/motion/product).
 * `label` says what it shows, since the words in it are the app's. The
 * caption is the copy check's line for public use of the clips, whose
 * names and figures are the demo's sample data.
 */
const ClipFrame = ({ name, label, className = '' }) => (
  <figure className={`w-full max-w-[50rem] ${className}`}>
    <ProductClip name={name} label={label} className="overflow-hidden rounded-2xl border border-border-light" />
    <figcaption className="mt-3 text-body-sm text-ink-muted">Sample data. Opens in beta soon.</figcaption>
  </figure>
);

export default ClipFrame;
