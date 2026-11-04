import ProductClip from '../motion/product/ProductClip.jsx';

// What each clip shows, said for screen readers, since the words on screen are
// the app's. Recorded from the app's redesign on Nov 3, 2026
// (aseryx-motion/product); list-certificate is the list clip, then the
// certificate clip, joined into one file so it loops like the others.
const LABELS = {
  'list-certificate': 'An owner lists a dataset in the app, then opens its quality certificate, with its score and checks',
  offer:
    'An AI company reads the answer to its query on a dataset, picks a 6-month term and makes an offer, and its payment is held',
  paid: 'The owner approves the offer and gets paid',
};

/**
 * A product clip in a frame, as LoopFrame frames a loop: a real flow in the
 * Aseryx app, 16:10 and sharp up to 800px wide (public/motion/clips).
 */
const ClipFrame = ({ name, className = '' }) => (
  <ProductClip
    name={name}
    base="/motion/clips"
    label={LABELS[name]}
    className={`w-full max-w-[50rem] overflow-hidden rounded-2xl border border-border-light ${className}`}
  />
);

export default ClipFrame;
