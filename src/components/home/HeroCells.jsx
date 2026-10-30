import { useEffect, useRef, useState } from 'react';

// Ambient hero motif: a grid of cells with one cut outlined in coral, and on
// wider screens the hero's motion inside that cut. Decorative only. The centre
// is masked clear so the headline keeps full contrast. On the first hero of a
// page load the cut is made in front of you (see .cut-draw in index.css).
const CELL = 60;
const COLS = 24;
const ROWS = 14;

// The cut, in cell coordinates, with a few selected cells inside it that get
// a stronger tint. Selected cells fill in the order listed, top to bottom.
// The slice crop shows only the middle columns on phones, so they get their
// own cut: one cell tall, to fit between the buttons and the proof row.
const CUTS = [
  {
    className: 'hidden md:block',
    // Row 4 and column 19: the cut holds the hero's motion, so its top edge
    // has to clear the fixed nav (at 1440 x 860, row 3 sat under it) and its
    // left edge the headline's last letters (at 1280, column 18 came within 6px).
    cut: { col: 19, row: 4, cols: 4, rows: 5 },
    selected: [
      [20, 5],
      [21, 5],
      [22, 6],
      [20, 7],
    ],
  },
  {
    className: 'md:hidden',
    cut: { col: 9, row: 12, cols: 4, rows: 1 },
    selected: [[10, 12]],
  },
];

const CutBlock = ({ cut, selected, className, outlineRef, holdsMotion }) => {
  const x = cut.col * CELL;
  const y = cut.row * CELL;
  const w = cut.cols * CELL;
  const h = cut.rows * CELL;
  // Where the cut holds the motion (1280px and up), the motion's dot field
  // takes the place of its flat tint and selected cells
  const tint = holdsMotion ? 'xl:hidden' : '';

  return (
    <g className={className}>
      <rect x={x} y={y} width={w} height={h} className={`cut-fill fill-brand-tint ${tint}`} />
      {selected.map(([col, row], i) => (
        <rect
          key={`${col}-${row}`}
          x={col * CELL + 1}
          y={row * CELL + 1}
          width={CELL - 1}
          height={CELL - 1}
          className={`cut-cell fill-brand-tint ${tint}`}
          style={{ '--i': i }}
        />
      ))}
      {/* A path, not a rect, so pathLength lets the CSS draw it as a fraction */}
      <path
        ref={outlineRef}
        d={`M ${x} ${y} h ${w} v ${h} h ${-w} Z`}
        pathLength="1"
        fill="none"
        className="cut-outline stroke-brand"
        strokeWidth="1.5"
      />
    </g>
  );
};

// Set after the first hero mounts, so coming back to Home in the same visit
// shows the cut already made. Module scope resets on a full page load.
let drawn = false;

/**
 * `children` (the hero's motion) sit inside the desktop cut, wherever the
 * slice crop puts it at this size. Below 1280px the crop brings the cut in
 * against the headline's last letters, so there the cut stays empty.
 */
const HeroCells = ({ children }) => {
  // Server and first client render agree (drawn is false on both), so the
  // prerendered HTML carries .cut-draw and the drawing starts before hydration.
  const [draw] = useState(() => !drawn);
  const wrapRef = useRef(null);
  const outlineRef = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    drawn = true;
  }, []);

  useEffect(() => {
    if (!children) return undefined;
    const place = () => {
      const cut = outlineRef.current.getBoundingClientRect();
      const wrap = wrapRef.current.getBoundingClientRect();
      // display: none on phones, where the cut measures 0 wide. A pixel in
      // from each side, so the coral outline stays whole over the motion.
      setBox(
        cut.width
          ? { left: cut.left - wrap.left + 1, top: cut.top - wrap.top + 1, width: cut.width - 2, height: cut.height - 2 }
          : null,
      );
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_45%,transparent_20%,black_75%)]">
        <svg
          className={`h-full w-full ${draw ? 'cut-draw' : ''}`}
          viewBox={`0 0 ${CELL * COLS} ${CELL * ROWS}`}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="hero-cell" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
              <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" className="stroke-border" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-cell)" />
          {CUTS.map((block, i) => (
            <CutBlock
              key={block.className}
              {...block}
              outlineRef={i === 0 ? outlineRef : undefined}
              holdsMotion={i === 0 && Boolean(children)}
            />
          ))}
        </svg>
      </div>
      {box && (
        <div className="absolute hidden items-center justify-center overflow-hidden xl:flex" style={box}>
          {children}
        </div>
      )}
    </div>
  );
};

export default HeroCells;
