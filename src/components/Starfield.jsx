import { useEffect, useRef } from 'react';

// twinkling, slowly drifting starfield on one fixed canvas behind the page.
// each star has a depth: nearer stars are bigger, drift faster and shift more with mouse and scroll
export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let stars = [];
    let frame = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() * 0.8 + 0.2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          r: 0.25 + depth * 1.05,
          phase: Math.random() * Math.PI * 2,
          twinkle: Math.random() * 0.016 + 0.005,
          tint: Math.random() < 0.15 ? '196, 181, 253' : '226, 232, 240',
        };
      });
    };

    const onPointer = (e) => {
      pointer.x = e.clientX / w - 0.5;
      pointer.y = e.clientY / h - 0.5;
    };

    const wrap = (v, max) => ((v % max) + max) % max;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      eased.x += (pointer.x - eased.x) * 0.04;
      eased.y += (pointer.y - eased.y) * 0.04;
      const scroll = window.scrollY;

      for (const s of stars) {
        if (!reduceMotion) {
          s.phase += s.twinkle;
          s.x += 0.08 * s.depth;
          s.y -= 0.35 * s.depth;
        }
        const x = wrap(s.x - eased.x * 30 * s.depth, w);
        const y = wrap(s.y - scroll * 0.08 * s.depth - eased.y * 30 * s.depth, h);
        const alpha = 0.12 + (Math.sin(s.phase) + 1) * 0.22 * (0.6 + s.depth * 0.4);

        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tint}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    if (!reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />;
}
