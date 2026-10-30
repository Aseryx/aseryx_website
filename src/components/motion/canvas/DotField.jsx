import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../../hooks/useMediaQuery.jsx';

/**
 * A slow field of dots on the cube's grid, for a section background.
 *
 * Dots sit on the lattice of the cube's top face (the logo's 100-unit grid, turned and tilted the same
 * way), drawn at 35% of a grid step. A few brighten and dim slowly; cells near the pointer brighten and a
 * few turn coral. On touch screens, or once the pointer leaves, the bright patch follows the scroll position.
 *
 * Colours come from the site's CSS variables (--ink, --brand and --bg-page by default) and are read again
 * when the theme changes. The canvas is opaque: it paints the section's background itself.
 *
 * The loop pauses when the field is off screen or the tab is hidden, and each frame repaints only the
 * dots that changed. Under prefers-reduced-motion it draws one still frame and stops.
 *
 * Fill the parent: give the parent a size and position: relative, and the field position: absolute; inset: 0.
 */
// One grid step across the cube's top face, in the logo's units (hero/aseryx-cube.js, axes()).
const A = [38.9414, -37.558];
const C = [92.1058, 15.8796];
const DOT_SHARE = 0.35; // dot side as a share of the grid step
const LEVELS = 16; // brightness steps between resting and full ink
// Most repainting per frame, by count and by time; whatever is left is painted on the next frames.
const MAX_PAINTS = 140;
const BUDGET = 1.2; // ms
const CORAL_LEVELS = 8;

const smooth = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

export default function DotField({
  step = 26, // CSS px per grid step (keep it 18 or more, so dots never touch)
  radius = 170, // CSS px: reach of the bright patch round the pointer
  coral = 3, // most coral cells at once
  base = 0.1, // resting opacity of every dot
  peak = 0.85, // opacity at the centre of the bright patch
  twinkle = 0.02, // share of dots slowly brightening at any moment
  inkVar = '--ink',
  signalVar = '--brand',
  backgroundVar = '--bg-page', // the field is opaque and paints the section background itself
  reducedMotion, // true or false to override the visitor's setting
  onStats, // optional: about once a second, { avg, max } milliseconds spent per frame over the last 2 s
  className,
  style,
}) {
  const canvasRef = useRef(null);
  const statsRef = useRef(onStats);
  statsRef.current = onStats;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const sprites = document.createElement('canvas'); // one dot per brightness step, then coral
    const sctx = sprites.getContext('2d');

    let w = 0;
    let h = 0;
    let dpr = 1;
    let D = 0; // dot side, device px
    let cell = 0; // sprite cell, device px
    let ink = '#1a1a1a';
    let signal = '#ff7a4d';
    let paper = '#ffffff';
    let N = 0;
    let xs = new Int32Array(0); // top-left of each dot, device px
    let ys = new Int32Array(0);
    let grid = new Int32Array(0); // lattice (m, n) -> dot index, or -1
    let m0 = 0;
    let n0 = 0;
    let mm = 0;
    let nn = 0;
    let inv = [0, 0, 0, 0];

    // What each dot shows: 0 resting, 1..LEVELS brighter ink, 100 + c coral at c / CORAL_LEVELS.
    let drawn = new Int16Array(0);
    let want = new Int16Array(0);
    let seen = new Int32Array(0); // frame number in which `want` was last set
    let active = new Int32Array(0); // dots not at rest, after the last frame
    let activeNext = new Int32Array(0);
    let activeCount = 0;
    let touched = new Int32Array(0);
    let touchedCount = 0;
    let frameNo = 0;

    const focus = { x: 0, y: 0, tx: 0, ty: 0, i: 0, ti: 0 };
    const scrollTarget = { x: 0, y: 0 };
    let inside = false;
    let leftAt = -1e9;
    let twinkles = [];
    let corals = [];
    let nextCoral = 0;
    let raf = 0;
    let onScreen = false;
    const times = new Float32Array(120);
    let timeCount = 0;
    let lastReport = 0;

    const reduced = () => reducedMotion ?? prefersReducedMotion();
    let seed = 1234567;
    const rng = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    const levelOf = (a) => Math.max(0, Math.min(LEVELS, Math.round(((a - base) / (1 - base)) * LEVELS)));

    function readColours() {
      const cs = getComputedStyle(canvas);
      ink = cs.getPropertyValue(inkVar).trim() || '#1a1a1a';
      signal = cs.getPropertyValue(signalVar).trim() || '#ff7a4d';
      paper = cs.getPropertyValue(backgroundVar).trim() || '#ffffff';
    }

    // Each sprite is a whole D x D cell, background included, so painting a dot is one opaque copy.
    // Cells 0..LEVELS: ink from resting to full; then CORAL_LEVELS cells of coral fading in over a resting dot.
    function buildSprites() {
      cell = D;
      sprites.width = cell * (LEVELS + 1 + CORAL_LEVELS);
      sprites.height = cell;
      sctx.globalAlpha = 1;
      sctx.fillStyle = paper;
      sctx.fillRect(0, 0, sprites.width, sprites.height);
      const r = Math.max(1, D * 0.17);
      const dotAt = (i, colour, alpha) => {
        sctx.globalAlpha = alpha;
        sctx.fillStyle = colour;
        sctx.beginPath();
        sctx.roundRect(i * cell, 0, D, D, r);
        sctx.fill();
      };
      for (let k = 0; k <= LEVELS; k++) dotAt(k, ink, base + ((1 - base) * k) / LEVELS);
      for (let c = 1; c <= CORAL_LEVELS; c++) {
        const i = LEVELS + c;
        dotAt(i, ink, base);
        dotAt(i, signal, c / CORAL_LEVELS);
      }
      sctx.globalAlpha = 1;
    }

    function paint(k, code) {
      const i = code >= 100 ? LEVELS + (code - 100) : code;
      ctx.drawImage(sprites, i * cell, 0, cell, cell, xs[k], ys[k], cell, cell);
    }

    function paintAll() {
      ctx.globalAlpha = 1;
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = base;
      ctx.fillStyle = ink;
      ctx.beginPath();
      const r = Math.max(1, D * 0.17);
      for (let k = 0; k < N; k++) ctx.roundRect(xs[k], ys[k], D, D, r);
      ctx.fill();
      ctx.globalAlpha = 1;
      drawn.fill(0);
      activeCount = 0;
    }

    function build() {
      dpr = Math.min(3, window.devicePixelRatio || 1);
      w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      const g = (step * dpr) / 100;
      const ax = [A[0] * g, A[1] * g];
      const cx = [C[0] * g, C[1] * g];
      const det = ax[0] * cx[1] - ax[1] * cx[0];
      inv = [cx[1] / det, -cx[0] / det, -ax[1] / det, ax[0] / det];
      D = Math.max(2, Math.round(step * DOT_SHARE * dpr));
      const corners = [[0, 0], [w, 0], [0, h], [w, h]].map(([x, y]) => [inv[0] * x + inv[1] * y, inv[2] * x + inv[3] * y]);
      m0 = Math.floor(Math.min(...corners.map((q) => q[0]))) - 1;
      const m1 = Math.ceil(Math.max(...corners.map((q) => q[0]))) + 1;
      n0 = Math.floor(Math.min(...corners.map((q) => q[1]))) - 1;
      const n1 = Math.ceil(Math.max(...corners.map((q) => q[1]))) + 1;
      mm = m1 - m0 + 1;
      nn = n1 - n0 + 1;
      grid = new Int32Array(mm * nn).fill(-1);
      const px = [];
      const py = [];
      for (let m = m0; m <= m1; m++)
        for (let n = n0; n <= n1; n++) {
          // whole device pixels, so every dot stays sharp
          const x = Math.round(m * ax[0] + n * cx[0] - D / 2);
          const y = Math.round(m * ax[1] + n * cx[1] - D / 2);
          if (x < -D || y < -D || x > w || y > h) continue;
          grid[(m - m0) * nn + (n - n0)] = px.length;
          px.push(x);
          py.push(y);
        }
      N = px.length;
      xs = Int32Array.from(px);
      ys = Int32Array.from(py);
      drawn = new Int16Array(N);
      want = new Int16Array(N);
      seen = new Int32Array(N);
      active = new Int32Array(N);
      activeNext = new Int32Array(N);
      touched = new Int32Array(N);
      activeCount = 0;
      twinkles = [];
      corals = Array.from({ length: coral }, () => ({ k: 0, t: 0, d: 0 }));
      near = new Int32Array(Math.min(N, 4096));
      readColours();
      buildSprites();
      paintAll();
    }

    function setWant(k, code) {
      if (seen[k] !== frameNo) {
        seen[k] = frameNo;
        want[k] = code;
        touched[touchedCount++] = k;
      } else if (code >= 100 || (want[k] < 100 && code > want[k])) {
        want[k] = code;
      }
    }

    function pointsNear(x, y, r, visit) {
      // lattice bounds of the square round (x, y): each of m and n is linear in x and y
      const mc = inv[0] * x + inv[1] * y;
      const nc = inv[2] * x + inv[3] * y;
      const mr = (Math.abs(inv[0]) + Math.abs(inv[1])) * r;
      const nr = (Math.abs(inv[2]) + Math.abs(inv[3])) * r;
      const ma = Math.max(m0, Math.floor(mc - mr));
      const mb = Math.min(m0 + mm - 1, Math.ceil(mc + mr));
      const na = Math.max(n0, Math.floor(nc - nr));
      const nb = Math.min(n0 + nn - 1, Math.ceil(nc + nr));
      const half = D / 2;
      for (let m = ma; m <= mb; m++)
        for (let n = na; n <= nb; n++) {
          const k = grid[(m - m0) * nn + (n - n0)];
          if (k < 0) continue;
          const d = Math.hypot(xs[k] + half - x, ys[k] + half - y);
          if (d < r) visit(k, d);
        }
    }

    let patchR = 1;
    let patchI = 0;
    const visitPatch = (k, d) => {
      const lvl = levelOf(base + (peak - base) * patchI * smooth(1 - d / patchR));
      if (lvl > 0) setWant(k, lvl);
    };
    let near = new Int32Array(0);
    let nearCount = 0;
    const visitNear = (k) => {
      if (nearCount < near.length) near[nearCount++] = k;
    };

    // Where the bright patch rests with no pointer over the field: it crosses the field as the page scrolls.
    function scrollFocus() {
      const rect = canvas.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      scrollTarget.x = w * (0.15 + 0.7 * progress);
      scrollTarget.y = h * 0.45;
    }

    function commit(t0, budget, limit) {
      // Repaint only what changed: dots wanted this frame, and dots that were lit and are now at rest.
      // Past the budget, dots keep what they show and are painted on the next frame.
      let next = 0;
      let open = true;
      let painted = 0;
      for (let t = 0; t < touchedCount; t++) {
        const k = touched[t];
        const code = want[k];
        if (drawn[k] !== code && open) {
          if (painted < limit && performance.now() - t0 < budget) {
            paint(k, code);
            drawn[k] = code;
            painted++;
          } else open = false;
        }
        if (code !== 0 || drawn[k] !== 0) activeNext[next++] = k;
      }
      for (let a = 0; a < activeCount; a++) {
        const k = active[a];
        if (seen[k] === frameNo || drawn[k] === 0) continue;
        if (open && painted < limit && performance.now() - t0 < budget) {
          paint(k, 0);
          drawn[k] = 0;
          painted++;
        } else {
          open = false;
          activeNext[next++] = k;
        }
      }
      // the lit dots, for the next frame
      const done = active;
      active = activeNext;
      activeNext = done;
      activeCount = next;
    }

    function frame(now) {
      raf = 0;
      const t0 = performance.now();
      const R = radius * dpr;
      frameNo++;
      touchedCount = 0;

      if (!inside && now - leftAt > 1200) {
        focus.tx = scrollTarget.x;
        focus.ty = scrollTarget.y;
        focus.ti = 0.7;
      }
      focus.x += (focus.tx - focus.x) * 0.08;
      focus.y += (focus.ty - focus.y) * 0.08;
      focus.i += (focus.ti - focus.i) * 0.06;

      // the slow field: a few dots brighten and dim over 3 to 6 s
      const count = Math.round(N * twinkle);
      while (twinkles.length < count) twinkles.push({ k: 0, t: 0, d: 1, a: 0 });
      for (const tw of twinkles) {
        let u = (now - tw.t) / tw.d;
        if (u >= 1 || tw.d === 1) {
          tw.k = Math.floor(rng() * N);
          tw.t = now + rng() * 3000;
          tw.d = 3000 + rng() * 3000;
          tw.a = 0.1 + rng() * 0.16;
          u = -1;
        }
        if (u > 0) {
          const s = Math.sin(Math.PI * u);
          const lvl = levelOf(base + tw.a * s * s);
          if (lvl > 0) setWant(tw.k, lvl);
        }
      }

      // the bright patch round the pointer, or the scroll position
      if (focus.i > 0.01) {
        patchR = R;
        patchI = focus.i;
        pointsNear(focus.x, focus.y, R, visitPatch);
      }

      // a few cells near the patch turn coral, one after another
      let live = 0;
      for (const c of corals) if (now - c.t < c.d) live++;
      if (focus.i > 0.5 && live < coral && now > nextCoral) {
        nearCount = 0;
        pointsNear(focus.x, focus.y, R * 0.6, visitNear);
        const slot = corals.find((c) => now - c.t >= c.d);
        if (nearCount && slot) {
          slot.k = near[Math.floor(rng() * nearCount)];
          slot.t = now;
          slot.d = 1600 + rng() * 800;
        }
        nextCoral = now + 500 + rng() * 400;
      }
      for (const c of corals) {
        const age = now - c.t;
        if (age >= c.d) continue;
        const a = Math.min(1, age / 150, (c.d - age) / 400);
        const lvl = Math.round(a * CORAL_LEVELS);
        if (lvl > 0) setWant(c.k, 100 + lvl);
      }

      commit(t0, BUDGET, MAX_PAINTS);

      const spent = performance.now() - t0;
      times[timeCount++ % times.length] = spent;
      if (statsRef.current && now - lastReport > 1000) {
        lastReport = now;
        const n = Math.min(timeCount, times.length);
        let sum = 0;
        let max = 0;
        for (let i = 0; i < n; i++) {
          sum += times[i];
          max = Math.max(max, times[i]);
        }
        statsRef.current({ avg: sum / n, max });
      }
      if (running()) raf = requestAnimationFrame(frame);
    }

    // The still frame for reduced motion: the field with one bright patch and three coral cells.
    function still() {
      paintAll();
      frameNo++;
      touchedCount = 0;
      const fx = w * 0.65;
      const fy = h * 0.42;
      const R = radius * dpr;
      const near = [];
      pointsNear(fx, fy, R, (k, d) => {
        const lvl = levelOf(base + (peak - base) * smooth(1 - d / R));
        if (lvl > 0) setWant(k, lvl);
        if (d < R * 0.6) near.push([d, k]);
      });
      near.sort((a, b) => a[0] - b[0]);
      for (const i of [3, 9, 16]) if (near[i]) setWant(near[i][1], 100 + CORAL_LEVELS);
      commit(performance.now(), Infinity, Infinity);
      if (statsRef.current) statsRef.current(null);
    }

    const running = () => onScreen && document.visibilityState === 'visible' && !reduced();
    function sync() {
      if (running()) {
        if (!raf) raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
        if (reduced()) still();
      }
    }

    function leave() {
      if (!inside) return;
      inside = false;
      leftAt = performance.now();
      focus.ti = 0;
    }
    function onPointer(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        leave();
        return;
      }
      inside = true;
      focus.tx = x * dpr;
      focus.ty = y * dpr;
      focus.ti = 1;
    }

    build();
    scrollFocus();
    focus.x = focus.tx = scrollTarget.x;
    focus.y = focus.ty = scrollTarget.y;
    if (reduced()) still();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      build();
      scrollFocus();
      if (reduced()) still();
    });
    ro.observe(canvas);
    const retheme = () => {
      readColours();
      buildSprites();
      paintAll();
      if (reduced()) still();
    };
    const themeObserver = new MutationObserver(retheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', retheme);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    window.addEventListener('scroll', scrollFocus, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener('change', retheme);
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      window.removeEventListener('scroll', scrollFocus);
    };
  }, [step, radius, coral, base, peak, twinkle, inkVar, signalVar, backgroundVar, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
