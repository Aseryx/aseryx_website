// Ambient hero motif: the database as a grid of cells, with the chosen cut
// (some fields, some records) outlined in coral. Decorative only. The centre
// is masked clear so the headline keeps full contrast.
const CELL = 60;
const COLS = 24;
const ROWS = 14;

// The locked cut, in cell coordinates. A few cells inside it are "selected
// fields" and get a stronger tint.
const CUT = { col: 18, row: 2, cols: 4, rows: 5 };
const SELECTED = [
  [19, 3],
  [20, 3],
  [19, 5],
  [21, 4],
];

const HeroCells = () => (
  <div
    className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_45%,transparent_20%,black_75%)]"
    aria-hidden="true"
  >
    <svg
      className="h-full w-full"
      viewBox={`0 0 ${CELL * COLS} ${CELL * ROWS}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="hero-cell" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
          <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" className="stroke-border" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-cell)" />

      <rect
        x={CUT.col * CELL}
        y={CUT.row * CELL}
        width={CUT.cols * CELL}
        height={CUT.rows * CELL}
        className="fill-brand-tint"
      />
      {SELECTED.map(([col, row]) => (
        <rect
          key={`${col}-${row}`}
          x={col * CELL + 1}
          y={row * CELL + 1}
          width={CELL - 1}
          height={CELL - 1}
          className="fill-brand-tint"
        />
      ))}
      <rect
        x={CUT.col * CELL}
        y={CUT.row * CELL}
        width={CUT.cols * CELL}
        height={CUT.rows * CELL}
        fill="none"
        className="stroke-brand"
        strokeWidth="1.5"
      />
    </svg>
  </div>
);

export default HeroCells;
