// Each readiness band's colour, for every view of the bands: `dot` for HTML
// dots and bars, `fill` for marks in the readiness map's SVG.
export const BAND_TONE = {
  ready: { dot: 'bg-success-dot', fill: 'fill-success-dot' },
  usable: { dot: 'bg-pending', fill: 'fill-pending' },
  cleaning: { dot: 'bg-brand', fill: 'fill-brand' },
  serious: { dot: 'bg-critical', fill: 'fill-critical' },
};
