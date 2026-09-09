import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';

const FADE_IN_MS = 2200;

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let isPaused = false;
    const startedAt = performance.now();

    const isDark = theme === 'dark';
    // Softer orange so nodes sit in the video instead of floating on top
    const nodeRgb = isDark ? '255, 140, 95' : '175, 70, 35';
    const edgeRgb = isDark ? '255, 150, 105' : '155, 65, 30';
    const nodeAlphaRange = isDark ? [0.22, 0.52] : [0.18, 0.42];
    const maxEdgeAlpha = isDark ? 0.26 : 0.2;
    const ringAlpha = isDark ? 0.12 : 0.09;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width, height };
    };

    let { width, height } = resizeCanvas();

    const particleCount = Math.min(Math.floor(width / 16), 42);
    const connectionDistance = 150;
    const cellSize = connectionDistance;
    const speed = 0.22;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 1.6 + 1.2;
        this.alpha =
          nodeAlphaRange[0] + Math.random() * (nodeAlphaRange[1] - nodeAlphaRange[0]);
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.006 + Math.random() * 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw() {
        const glow = 0.88 + Math.sin(this.pulse) * 0.12;
        const r = this.size * glow;

        ctx.beginPath();
        ctx.arc(this.x, this.y, r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeRgb}, ${ringAlpha * this.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeRgb}, ${this.alpha})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const getCellKey = (x, y) => {
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      return `${col},${row}`;
    };

    const buildGrid = () => {
      const grid = new Map();
      for (let i = 0; i < particles.length; i++) {
        const key = getCellKey(particles[i].x, particles[i].y);
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(i);
      }
      return grid;
    };

    const drawConnections = (grid) => {
      const checked = new Set();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const col = Math.floor(p.x / cellSize);
        const row = Math.floor(p.y / cellSize);

        for (let dc = -1; dc <= 1; dc++) {
          for (let dr = -1; dr <= 1; dr++) {
            const neighbors = grid.get(`${col + dc},${row + dr}`);
            if (!neighbors) continue;

            for (const j of neighbors) {
              if (j <= i) continue;
              const pairKey = `${i}-${j}`;
              if (checked.has(pairKey)) continue;
              checked.add(pairKey);

              const q = particles[j];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < connectionDistance) {
                const t = 1 - distance / connectionDistance;
                const alpha = t * t * maxEdgeAlpha;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${edgeRgb}, ${alpha})`;
                ctx.lineWidth = 0.6 + t * 0.55;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    };

    const easeOutCubic = (t) => 1 - (1 - t) ** 3;

    const animate = (now) => {
      if (!isPaused) {
        ctx.clearRect(0, 0, width, height);
        const fade = Math.min(1, (now - startedAt) / FADE_IN_MS);
        ctx.globalAlpha = easeOutCubic(fade);

        const grid = buildGrid();
        drawConnections(grid);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }

        ctx.globalAlpha = 1;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      ({ width, height } = resizeCanvas());
      init();
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    init();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion, theme]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50 dark:opacity-55 mix-blend-multiply dark:mix-blend-screen"
      style={{
        maskImage:
          'radial-gradient(ellipse 85% 75% at 70% 45%, black 20%, transparent 78%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 85% 75% at 70% 45%, black 20%, transparent 78%)',
      }}
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;
