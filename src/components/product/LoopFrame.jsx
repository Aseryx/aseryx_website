import StepLoop from '../motion/loops/StepLoop.jsx';

/**
 * A step loop in a frame. Each loop is a square on the page colour, so on a
 * section's grid it sits in a frame, like a screen; near its own 360px size
 * it stays sharp. `name` is the loop (public/motion/loops).
 */
const LoopFrame = ({ name, className = '' }) => (
  <StepLoop
    name={name}
    className={`mx-auto w-full max-w-[24rem] overflow-hidden rounded-2xl border border-border-light ${className}`}
  />
);

export default LoopFrame;
