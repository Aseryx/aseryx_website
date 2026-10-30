import { useEffect, useRef, useState } from 'react';

// Ambient hero motif: a grid of cells, and on wider screens the hero's motion
// set into a block of them beside the headline. Decorative only. The centre
// is masked clear so the headline keeps full contrast.
const CELL = 60;
const COLS = 24;
const ROWS = 14;

// The motion's block, in cell coordinates. Row 4 and column 19: its top edge
// clears the fixed nav (at 1440 x 860, row 3 sat under it), and its left
// edge clears the headline's last letters, by 7px at 1024 and more as the
// screen widens. Below 1024 the slice crop pushes the block past the right
// edge, so there the hero has no motion.
const SLOT = { col: 19, row: 4, cols: 4, rows: 5 };

/**
 * `children` (the hero's motion) sit in the SLOT cells, wherever the slice
 * crop puts them at this size, from 1024px up.
 */
const HeroCells = ({ children }) => {
  const wrapRef = useRef(null);
  const slotRef = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    if (!children) return undefined;
    const place = () => {
      const slot = slotRef.current.getBoundingClientRect();
      const wrap = wrapRef.current.getBoundingClientRect();
      setBox({ left: slot.left - wrap.left, top: slot.top - wrap.top, width: slot.width, height: slot.height });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_45%,transparent_20%,black_75%)]">
        <svg className="h-full w-full" viewBox={`0 0 ${CELL * COLS} ${CELL * ROWS}`} preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hero-cell" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
              <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" className="stroke-border" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-cell)" />
          {/* Drawn as nothing: only measured, to place the motion */}
          <rect
            ref={slotRef}
            x={SLOT.col * CELL}
            y={SLOT.row * CELL}
            width={SLOT.cols * CELL}
            height={SLOT.rows * CELL}
            fill="none"
          />
        </svg>
      </div>
      {box && (
        <div className="absolute hidden items-center justify-center overflow-hidden lg:flex" style={box}>
          {children}
        </div>
      )}
    </div>
  );
};

export default HeroCells;
