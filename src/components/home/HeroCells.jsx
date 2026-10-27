import { useEffect, useState } from 'react';

// Ambient hero motif: the database as a grid of cells, with the chosen cut
// (some fields, some records) outlined in coral. Decorative only. The centre
// is masked clear so the headline keeps full contrast. On the first hero of a
// page load the cut is made in front of you (see .cut-draw in index.css).
const CELL = 60;
const COLS = 24;
const ROWS = 14;

// The locked cut, in cell coordinates, with a few "selected field" cells
// inside it that get a stronger tint. Selected cells fill in the order listed,
// top to bottom, the way you would pick them. The slice crop shows only the middle
// columns on phones, so they get their own cut: one record tall, to fit
// between the buttons and the proof row.
const CUTS = [
  {
    className: 'hidden md:block',
    // Row 3, not 2: the outline starts drawing at its top edge, which has to
    // clear the fixed nav on every desktop size, not just exist under it.
    cut: { col: 18, row: 3, cols: 4, rows: 5 },
    selected: [
      [19, 4],
      [20, 4],
      [21, 5],
      [19, 6],
    ],
  },
  {
    className: 'md:hidden',
    cut: { col: 9, row: 12, cols: 4, rows: 1 },
    selected: [[10, 12]],
  },
];

const CutBlock = ({ cut, selected, className }) => {
  const x = cut.col * CELL;
  const y = cut.row * CELL;
  const w = cut.cols * CELL;
  const h = cut.rows * CELL;

  return (
    <g className={className}>
      <rect x={x} y={y} width={w} height={h} className="cut-fill fill-brand-tint" />
      {selected.map(([col, row], i) => (
        <rect
          key={`${col}-${row}`}
          x={col * CELL + 1}
          y={row * CELL + 1}
          width={CELL - 1}
          height={CELL - 1}
          className="cut-cell fill-brand-tint"
          style={{ '--i': i }}
        />
      ))}
      {/* A path, not a rect, so pathLength lets the CSS draw it as a fraction */}
      <path
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

const HeroCells = () => {
  // Server and first client render agree (drawn is false on both), so the
  // prerendered HTML carries .cut-draw and the drawing starts before hydration.
  const [draw] = useState(() => !drawn);
  useEffect(() => {
    drawn = true;
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_45%,transparent_20%,black_75%)]"
      aria-hidden="true"
    >
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
        {CUTS.map((block) => (
          <CutBlock key={block.className} {...block} />
        ))}
      </svg>
    </div>
  );
};

export default HeroCells;
