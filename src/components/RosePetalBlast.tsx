"use client";

import { useEffect, useRef } from "react";

type Particle = {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotV: number;
  gravity: number;
  drag: number;
  scale: number;
  scaleV: number;
  opacity: number;
  opacityV: number;
  dead: boolean;
};

const COLORS = [
  "#C9A84C", "#E4C56E", "#F4E4B0", "#D4A843",
  "#2D6A4F", "#40916C", "#74C69D", "#1B4332",
  "#F0E6C8", "#B7935A",
];

type Shape = "petal-a" | "petal-b" | "square" | "circle" | "diamond";
const SHAPES: Shape[] = ["petal-a", "petal-a", "petal-b", "petal-b", "square", "circle", "diamond"];

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createPetal(shape: Shape, color: string, size: number): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    pointer-events: none;
    will-change: transform, opacity;
  `;
  if (shape === "petal-a") el.style.borderRadius = "80% 0 80% 0";
  else if (shape === "petal-b") el.style.borderRadius = "0 80% 0 80%";
  else if (shape === "circle") el.style.borderRadius = "50%";
  else if (shape === "diamond") el.style.borderRadius = "0";
  else el.style.borderRadius = "3px";
  return el;
}

export default function RosePetalBlast({ originX, originY }: { originX?: number; originY?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = originX ?? W / 2;
    const cy = originY ?? H / 2;

    // ── Burst particles ──────────────────────────────────────────────
    const BURST_COUNT = 90;
    for (let i = 0; i < BURST_COUNT; i++) {
      const shape = pick(SHAPES);
      const color = pick(COLORS);
      const size = rnd(7, shape.startsWith("petal") ? 18 : 12);
      const el = createPetal(shape, color, size);
      container.appendChild(el);

      const angle = (i / BURST_COUNT) * Math.PI * 2 + rnd(-0.4, 0.4);
      const speed = rnd(4, 14) * (i < 20 ? 1.5 : 1);

      particles.current.push({
        el,
        x: cx - size / 2,
        y: cy - size / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rnd(2, 6),
        rot: rnd(0, 360),
        rotV: rnd(-12, 12),
        gravity: rnd(0.18, 0.35),
        drag: rnd(0.97, 0.99),
        scale: 1,
        scaleV: rnd(-0.008, -0.003),
        opacity: rnd(0.75, 1),
        opacityV: rnd(-0.012, -0.006),
        dead: false,
      });
    }

    // ── Rain particles ───────────────────────────────────────────────
    const RAIN_COUNT = 60;
    for (let i = 0; i < RAIN_COUNT; i++) {
      setTimeout(() => {
        if (!containerRef.current) return;
        const shape = pick(SHAPES);
        const color = pick(COLORS);
        const size = rnd(8, shape.startsWith("petal") ? 17 : 11);
        const el = createPetal(shape, color, size);
        containerRef.current.appendChild(el);

        particles.current.push({
          el,
          x: rnd(0, W),
          y: rnd(-80, -10),
          vx: rnd(-1.5, 1.5),
          vy: rnd(1.5, 3.5),
          rot: rnd(0, 360),
          rotV: rnd(-8, 8),
          gravity: rnd(0.04, 0.12),
          drag: rnd(0.98, 0.995),
          scale: 1,
          scaleV: 0,
          opacity: rnd(0.45, 0.85),
          opacityV: rnd(-0.004, -0.002),
          dead: false,
        });
      }, i * rnd(30, 80));
    }

    // ── Animation loop ───────────────────────────────────────────────
    const tick = () => {
      let alive = false;
      for (const p of particles.current) {
        if (p.dead) continue;
        alive = true;

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;
        p.scale = Math.max(0, p.scale + p.scaleV);
        p.opacity = Math.max(0, p.opacity + p.opacityV);

        if (p.opacity <= 0 || p.y > H + 60) {
          p.dead = true;
          p.el.remove();
          continue;
        }

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`;
        p.el.style.opacity = String(p.opacity);
      }

      if (alive) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      particles.current.forEach(p => p.el.remove());
      particles.current = [];
    };
  }, [originX, originY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}