/**
 * Aseryx cube: geometry and drawing, shared by the hero, the step loops and the dot field.
 *
 * Measured from the logo pack (Aseryx Cube Logo canvas, page 19: 35% dots, band round the
 * keyhole): a 7 x 7 x 7 lattice on a 100-unit grid, turned 22.92 deg and tilted 24.06 deg,
 * every lattice point drawn as a 35-unit square with 5.95-unit corners. The keyhole sits on
 * the front face; the band is the keyhole grown by 14.27 units. Rebuilt and compared with
 * the logo SVG, 0.46% of pixels differ, all on anti-aliased edges. With `band: false` it
 * matches aserix_website/public/images/aseryx-cube.svg (0.44%).
 *
 * All drawing is in mark units: the mark's box is VIEW (821.29 x 903.47, centred on 0, 0).
 * Callers translate and scale the context to place it.
 */

export const GRID = 100;
export const DOT = 35;
export const DOT_R = 5.95;
export const BAND = 14.27;
export const VIEW = { x: -410.64, y: -451.74, w: 821.29, h: 903.47 };
export const ASPECT = VIEW.w / VIEW.h;

const ALPHA = (22.9181 * Math.PI) / 180;
const PHI = (24.0644 * Math.PI) / 180;
const SPH = Math.sin(PHI);
const CPH = Math.cos(PHI);

// Keyhole, in front-face units (100 = one grid step); head centre at (k, j) on the face i = -3.
export const KEY = { r: 85, hw: 51, bottom: 199.76, cr: 20.4, j: -0.80405, k: 0.02002 };

/** Screen vectors of one grid step along the cube's three axes, turned by theta about the vertical. */
export function axes(theta = 0) {
  const a = ALPHA + theta;
  return {
    A: [GRID * Math.sin(a), -GRID * Math.cos(a) * SPH], // across the top, receding
    B: [0, GRID * CPH], // down
    C: [GRID * Math.cos(a), GRID * Math.sin(a) * SPH], // across the front
  };
}
export const AX0 = axes(0);

export function proj(ax, i, j, k) {
  return [i * ax.A[0] + j * ax.B[0] + k * ax.C[0], i * ax.A[1] + j * ax.B[1] + k * ax.C[1]];
}

/** All 343 lattice points with their resting position in mark units. */
export const LATTICE = [];
for (let i = -3; i <= 3; i++)
  for (let j = -3; j <= 3; j++)
    for (let k = -3; k <= 3; k++) {
      const [x, y] = proj(AX0, i, j, k);
      LATTICE.push({ i, j, k, x, y });
    }

/** Keyhole head centre, mark units. */
export const HEAD = proj(AX0, -3, KEY.j, KEY.k);

// ---- utilities ---------------------------------------------------------------
export const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
export const seg = (t, t0, t1) => clamp((t - t0) / (t1 - t0), 0, 1);
export const lerp = (a, b, f) => a + (b - a) * f;
export const inOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeOut = (x) => 1 - Math.pow(1 - x, 3);

export function rng(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexRgb(hex) {
  let h = String(hex).trim().replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
/** Mix two #rrggbb colours. */
export function mix(c1, c2, f) {
  const a = hexRgb(c1);
  const b = hexRgb(c2);
  return `rgb(${Math.round(lerp(a[0], b[0], f))},${Math.round(lerp(a[1], b[1], f))},${Math.round(lerp(a[2], b[2], f))})`;
}

// ---- drawing primitives (ctx in mark units) ------------------------------------
export function dot(ctx, x, y, s = 1) {
  const d = DOT * s;
  ctx.roundRect(x - d / 2, y - d / 2, d, d, DOT_R * s);
}

/** Keyhole outline in face space (head centre at the origin), grown outward by `off`. */
export function keyholeFace(ctx, off) {
  const R = KEY.r + off;
  const w = KEY.hw + off;
  const b = KEY.bottom + off;
  const c = KEY.cr + off;
  const ys = Math.sqrt(R * R - w * w);
  const a0 = Math.atan2(ys, w);
  ctx.moveTo(w, ys);
  ctx.arc(0, 0, R, a0, Math.PI - a0, true);
  ctx.lineTo(-w, b - c);
  ctx.arc(-w + c, b - c, c, Math.PI, Math.PI / 2, true);
  ctx.lineTo(w - c, b);
  ctx.arc(w - c, b - c, c, Math.PI / 2, 0, true);
  ctx.closePath();
}

export function withFace(ctx, origin, u, v, fn) {
  ctx.save();
  ctx.transform(u[0] / GRID, u[1] / GRID, v[0] / GRID, v[1] / GRID, origin[0], origin[1]);
  fn();
  ctx.restore();
}

function onKeyhole(ctx, fn) {
  withFace(ctx, HEAD, AX0.C, AX0.B, fn);
}

export function fillKeyhole(ctx, off, style) {
  onKeyhole(ctx, () => {
    ctx.beginPath();
    keyholeFace(ctx, off);
    ctx.fillStyle = style;
    ctx.fill();
  });
}

/** The band alone: the keyhole grown by BAND, minus the keyhole. */
export function bandRing(ctx, style) {
  onKeyhole(ctx, () => {
    ctx.beginPath();
    keyholeFace(ctx, BAND);
    keyholeFace(ctx, 0);
    ctx.fillStyle = style;
    ctx.fill('evenodd');
  });
}

// Mid-line of the band as a polyline (face space), from the top of the head, clockwise.
const BAND_LINE = (() => {
  const off = BAND / 2;
  const R = KEY.r + off;
  const w = KEY.hw + off;
  const b = KEY.bottom + off;
  const c = KEY.cr + off;
  const ys = Math.sqrt(R * R - w * w);
  const a0 = Math.atan2(ys, w);
  const pts = [];
  for (let n = 0; n <= 60; n++) {
    const a = -Math.PI / 2 + ((a0 + Math.PI / 2) * n) / 60;
    pts.push([R * Math.cos(a), R * Math.sin(a)]);
  }
  pts.push([w, b - c]);
  for (let n = 1; n <= 12; n++) {
    const a = ((Math.PI / 2) * n) / 12;
    pts.push([w - c + c * Math.cos(a), b - c + c * Math.sin(a)]);
  }
  pts.push([-w + c, b]);
  for (let n = 1; n <= 12; n++) {
    const a = Math.PI / 2 + ((Math.PI / 2) * n) / 12;
    pts.push([-w + c + c * Math.cos(a), b - c + c * Math.sin(a)]);
  }
  pts.push([-w, ys]);
  const aL = Math.PI - a0;
  for (let n = 1; n <= 60; n++) {
    const a = aL + ((1.5 * Math.PI - aL) * n) / 60;
    pts.push([R * Math.cos(a), R * Math.sin(a)]);
  }
  const cum = [0];
  for (let n = 1; n < pts.length; n++) cum.push(cum[n - 1] + Math.hypot(pts[n][0] - pts[n - 1][0], pts[n][1] - pts[n - 1][1]));
  return { pts, cum, len: cum[cum.length - 1] };
})();

/** Draw the band as a stroke traced from the top of the keyhole, p = 0..1 of the way round. */
export function traceBand(ctx, p, style) {
  if (p <= 0) return;
  if (p >= 1) {
    bandRing(ctx, style);
    return;
  }
  const L = BAND_LINE.len * p;
  const { pts, cum } = BAND_LINE;
  onKeyhole(ctx, () => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let n = 1; n < pts.length; n++) {
      if (cum[n] <= L) {
        ctx.lineTo(pts[n][0], pts[n][1]);
        continue;
      }
      const f = (L - cum[n - 1]) / (cum[n] - cum[n - 1]);
      ctx.lineTo(lerp(pts[n - 1][0], pts[n][0], f), lerp(pts[n - 1][1], pts[n][1], f));
      break;
    }
    ctx.lineWidth = BAND;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = style;
    ctx.stroke();
  });
}

/**
 * Cut the keyhole, top to bottom: w = 0 nothing is cut, w = 1 the whole keyhole.
 * `hole` is a colour to paint the hole with, or 'erase' to make it transparent.
 */
export function cutKeyhole(ctx, w, hole) {
  if (w <= 0) return;
  onKeyhole(ctx, () => {
    const top = -KEY.r - 2;
    const y = top + (KEY.bottom + KEY.r + 4) * Math.min(1, w);
    ctx.beginPath();
    ctx.rect(-KEY.r - 4, top, 2 * KEY.r + 8, y - top);
    ctx.clip();
    ctx.beginPath();
    keyholeFace(ctx, 0);
    if (hole === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    } else {
      ctx.fillStyle = hole;
      ctx.fill();
    }
  });
}

/**
 * The mark at rest. opts: { ink, hole ('erase' or a colour), band (default true), keyhole (default true) }.
 */
export function drawMark(ctx, { ink, hole = 'erase', band = true, keyhole = true } = {}) {
  ctx.fillStyle = ink;
  ctx.beginPath();
  for (const p of LATTICE) dot(ctx, p.x, p.y, 1);
  ctx.fill();
  if (!keyhole) return;
  if (band) bandRing(ctx, ink);
  cutKeyhole(ctx, 1, hole);
}

// ---- the hero intro, and its reverse for the scroll version ---------------------
/** Where each dot starts, in mark units: scattered across a wide area round the mark. */
export const SCATTER = (() => {
  const r = rng(29);
  return LATTICE.map((p) => {
    const ang = r() * Math.PI * 2;
    const rad = 520 + r() * 900;
    return { p, sx: p.x + Math.cos(ang) * rad, sy: p.y + Math.sin(ang) * rad * 0.8, a: r() };
  });
})();

/** Seconds from the first dot moving to the keyhole being fully cut. */
export const INTRO_DURATION = 2.05;

/**
 * One frame of the intro at time t (seconds). Dots fly in and settle (0 to 1.6 s),
 * the band traces the keyhole (1.35 to 1.8 s), then the keyhole is cut top to bottom (1.8 to 2.05 s).
 * At t >= INTRO_DURATION this is the mark at rest.
 */
export function drawIntro(ctx, t, { ink, hole = 'erase', band = true } = {}) {
  if (t >= INTRO_DURATION) {
    drawMark(ctx, { ink, hole, band });
    return;
  }
  ctx.fillStyle = ink;
  let alpha = -1;
  for (const o of SCATTER) {
    const st = 0.05 + 0.75 * o.a;
    const f = easeOut(seg(t, st, st + 0.8));
    if (f <= 0) continue;
    const a = Math.min(1, f * 2.2);
    if (a !== alpha) {
      ctx.globalAlpha = a;
      alpha = a;
    }
    ctx.beginPath();
    dot(ctx, lerp(o.sx, o.p.x, f), lerp(o.sy, o.p.y, f), lerp(0.6, 1, f));
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (band) traceBand(ctx, inOut(seg(t, 1.35, 1.8)), ink);
  cutKeyhole(ctx, inOut(seg(t, 1.8, 2.05)), hole);
}

/** The scroll version: p = 0 the mark at rest, p = 1 fully dissolved (the intro run backwards). */
export function drawDissolve(ctx, p, opts) {
  drawIntro(ctx, INTRO_DURATION * (1 - clamp(p, 0, 1)), opts);
}
