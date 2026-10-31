/**
 * The deal, in the cube's language: the pieces the Website v2 motion is drawn from.
 *
 * Shared by the three v2 loops (loops/scenes-v2.js) and the offer flow (canvas/OfferFlow.jsx).
 * Data is always the cube's square dots, and the data never leaves the owner's cube: a team gets
 * a count, and access once the owner approves. A payment is the one round dot, and Aseryx holds it
 * in a frame of four corner marks. Coral marks only a selection (the cells a query matches) or an
 * approval (the keyhole lighting).
 *
 * The certificate seal here is the canvas twin of certificate/CertificateMark.jsx: the same
 * 24 dots round the edge, inner ring and check, at the same proportions.
 */
import { LATTICE, clamp, dot, drawMark, easeOut, fillKeyhole, inOut, lerp, mix, rng, seg } from './aseryx-cube.js';

// ---- the certificate seal ------------------------------------------------------------------
/**
 * The seal at (cx, cy), radius r. ring 0..1: how much of the ring has closed, clockwise from the top;
 * check 0..1: how much of the check is drawn. pending draws the faint ring alone, for "Certificate to
 * follow". halo clears the ground under the seal (bg), so it reads over the cube's dots.
 */
export function drawSeal(ctx, cx, cy, r, { ink, bg, ring = 1, check = 1, alpha = 1, halo = true, pending = false }) {
  if (alpha <= 0 || ring <= 0) return;
  const n = 24;
  const d = r * 0.15;
  const fade = pending ? 0.34 : 1;
  ctx.save();
  if (halo) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(cx, cy, (r + d * 1.6) * easeOut(clamp(ring * 3, 0, 1)), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = ink;
  for (let i = 0; i < n; i++) {
    const appear = clamp(ring * n - i, 0, 1);
    if (appear <= 0) break;
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const s = easeOut(appear);
    const dd = d * lerp(0.3, 1, s);
    ctx.globalAlpha = alpha * s * fade;
    ctx.beginPath();
    ctx.roundRect(cx + Math.cos(a) * r - dd / 2, cy + Math.sin(a) * r - dd / 2, dd, dd, dd * 0.17);
    ctx.fill();
  }
  const inner = clamp((ring - 0.15) / 0.85, 0, 1);
  if (inner > 0) {
    ctx.globalAlpha = alpha * fade;
    ctx.strokeStyle = ink;
    ctx.lineWidth = r * 0.075;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.74, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * inOut(inner));
    ctx.stroke();
  }
  if (!pending && check > 0) {
    const P = SEAL_CHECK.map(([x, y]) => [cx + x * r, cy + y * r]);
    const L1 = Math.hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]);
    const L2 = Math.hypot(P[2][0] - P[1][0], P[2][1] - P[1][1]);
    const L = (L1 + L2) * clamp(check, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = ink;
    ctx.lineWidth = r * 0.14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(P[0][0], P[0][1]);
    if (L <= L1) ctx.lineTo(lerp(P[0][0], P[1][0], L / L1), lerp(P[0][1], P[1][1], L / L1));
    else {
      ctx.lineTo(P[1][0], P[1][1]);
      const f = (L - L1) / L2;
      ctx.lineTo(lerp(P[1][0], P[2][0], f), lerp(P[1][1], P[2][1], f));
    }
    ctx.stroke();
  }
  ctx.restore();
}
/** The check's three points, in units of the seal's radius. */
export const SEAL_CHECK = [[-0.33, 0.02], [-0.09, 0.25], [0.35, -0.22]];

// ---- payment, and the frame Aseryx holds it in ------------------------------------------------
export function coin(ctx, x, y, r, ink, alpha = 1) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
/** Four corner marks round (x, y), w across. */
export function heldFrame(ctx, x, y, w, ink, alpha = 1) {
  if (alpha <= 0) return;
  const h = w / 2;
  const l = w * 0.28;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = ink;
  ctx.lineWidth = w * 0.07;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    ctx.moveTo(x + sx * h, y + sy * (h - l));
    ctx.lineTo(x + sx * h, y + sy * h);
    ctx.lineTo(x + sx * (h - l), y + sy * h);
  }
  ctx.stroke();
  ctx.restore();
}
/** A point on a gentle arc from a to b, bulging upward by `lift`, f = 0..1. */
export function along(a, b, f, lift) {
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f) - Math.sin(Math.PI * f) * lift];
}

// ---- a query and its count ----------------------------------------------------------------
/** The twelve cells a query matches: on the owner's outer faces, clear of the keyhole. */
export const MATCH = (() => {
  const r = rng(7);
  const skip = new Set(['-2,0', '-1,-1', '-1,0', '-1,1', '0,0', '1,0']);
  const faces = LATTICE.filter((p) => (p.i === -3 && !skip.has(`${p.j},${p.k}`)) || p.j === -3 || p.k === 3);
  const picked = [];
  while (picked.length < 12) {
    const p = faces[Math.floor(r() * faces.length)];
    if (!picked.includes(p)) picked.push(p);
  }
  return picked;
})();
/** How far the count bar fills once every match is counted. */
export const MATCH_SHARE = 0.42;

/** The count a query returns, as a bar: how much of the data meets the team's conditions. */
export function countBar(ctx, cx, y, w, h, track, fill, ink) {
  if (track <= 0) return;
  ctx.save();
  ctx.fillStyle = ink;
  ctx.globalAlpha = 0.14 * track;
  ctx.beginPath();
  ctx.roundRect(cx - w / 2, y - h / 2, w, h, h / 2);
  ctx.fill();
  if (fill > 0) {
    ctx.globalAlpha = track;
    ctx.beginPath();
    ctx.roundRect(cx - w / 2, y - h / 2, Math.max(h, w * fill), h, h / 2);
    ctx.fill();
  }
  ctx.restore();
}
/** The query: a dotted line drawn from x1 towards x2, p = 0..1 of the way. */
export function queryLine(ctx, x1, x2, y, p, ink, alpha = 1) {
  if (p <= 0 || alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.setLineDash([0.5, 10]);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(lerp(x1, x2, p), y);
  ctx.stroke();
  ctx.restore();
}
/** Light the matched cells of a cube drawn at (cx, cy), scale s: each turns coral at its moment. */
export function matches(ctx, cx, cy, s, t, start, step, off, theme) {
  let found = 0;
  MATCH.forEach((p, m) => {
    const on = start + step * m;
    const c = seg(t, on, on + 0.12) * (1 - inOut(seg(t, off, off + 0.3)));
    if (c > 0) {
      ctx.fillStyle = mix(theme.ink, theme.signal, c);
      ctx.beginPath();
      dot(ctx, cx + p.x * s, cy + p.y * s, s);
      ctx.fill();
    }
    found += easeOut(seg(t, on + 0.05, on + 0.2));
  });
  return found / MATCH.length;
}

// ---- the owner's cube and a team's cube ------------------------------------------------------
function inMark(ctx, cx, cy, s, fn) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  fn();
  ctx.restore();
}
/** The owner's cube: the mark with its keyhole (lit coral by `lit`), and its certificate seal. */
export function ownerCube(ctx, cx, cy, s, theme, { lit = 0, seal = null } = {}) {
  inMark(ctx, cx, cy, s, () => {
    drawMark(ctx, { ink: theme.ink, hole: theme.bg });
    if (lit > 0) {
      ctx.globalAlpha = lit;
      fillKeyhole(ctx, 0, theme.signal);
      ctx.globalAlpha = 1;
    }
  });
  if (seal) drawSeal(ctx, seal[0], seal[1], seal[2], { ink: theme.ink, bg: theme.bg });
}
/** A team's cube: the plain mark, no keyhole. */
export function teamCube(ctx, cx, cy, s, theme) {
  inMark(ctx, cx, cy, s, () => drawMark(ctx, { ink: theme.ink, keyhole: false }));
}

// ---- the offer flow (For AI companies, "You deal with the owner, directly") -----------------------
/**
 * The whole deal, drawn at time t on a FLOW.w x FLOW.h canvas: the team's query and its count
 * (0.3 to 2.9 s), the offer's payment held by Aseryx (2.8 to 3.6 s), the owner's approval (3.9 s),
 * access opening for the term (4.4 to 5.4 s) and the payment going to the owner (5.6 to 6.6 s).
 * From FLOW.duration on it is the resting diagram.
 */
export const FLOW = { w: 1200, h: 440, duration: 6.8 };
export function drawFlow(ctx, t, theme) {
  const W = FLOW.w;
  const s = 0.3;
  const cy = 200;
  const xL = 205;
  const xR = W - 205;
  const frame = [W / 2, cy + 82];
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, FLOW.h);
  ownerCube(ctx, xL, cy, s, theme, { lit: inOut(seg(t, 3.9, 4.2)), seal: [xL + 112, cy + 124, 28] });
  teamCube(ctx, xR, cy, s, theme);
  heldFrame(ctx, frame[0], frame[1], 62, theme.ink, 0.3);
  queryLine(ctx, xR - 108, xL + 116, cy - 70, inOut(seg(t, 0.3, 1.2)), theme.ink, 1 - inOut(seg(t, 2.6, 3.0)));
  const found = matches(ctx, xL, cy, s, t, 1.3, 0.09, 2.6, theme);
  countBar(ctx, xR, cy + 172, 170, 9, inOut(seg(t, 1.0, 1.3)), MATCH_SHARE * found, theme.ink);
  const o = inOut(seg(t, 2.8, 3.6));
  const go = inOut(seg(t, 5.6, 6.6));
  if (o > 0 && go < 1) {
    let [x, y] = along([xR - 96, frame[1]], frame, o, 40);
    if (go > 0) [x, y] = along(frame, [xL + 70, cy + 72], go, 0);
    coin(ctx, x, y, 13 * lerp(1, 0.55, seg(go, 0.7, 1)), theme.ink, Math.min(1, o * 4) * (1 - seg(go, 0.75, 1)));
  }
  const a = inOut(seg(t, 4.4, 5.4));
  if (a > 0) {
    ctx.save();
    ctx.strokeStyle = theme.ink;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(xL + 136, cy - 6);
    ctx.lineTo(lerp(xL + 136, xR - 128, a), cy - 6);
    ctx.stroke();
    ctx.restore();
  }
}
