"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  vx: number;
  vy: number;
  twinkle: number;
  twinkleSpeed: number;
};

const PARTICLE_COUNT = 160;
const GOLD = "201, 168, 76"; // #C9A84C as rgb

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        baseOpacity: Math.random() * 0.35 + 0.1,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
      }));
    }

    resize();
    initParticles();
    window.addEventListener("resize", resize, { passive: true });

    let rafId = 0;
    let running = true;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += p.twinkleSpeed;

        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        const opacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(p.twinkle));

        ctx.beginPath();
        ctx.fillStyle = `rgba(${GOLD}, ${opacity})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) rafId = requestAnimationFrame(draw);
    }

    const onVisibility = () => {
      running = !document.hidden;
      if (running) rafId = requestAnimationFrame(draw);
      else cancelAnimationFrame(rafId);
    };
    document.addEventListener("visibilitychange", onVisibility);

    rafId = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      {/* Clean cinematic background */}
      <div className="fixed inset-0 -z-10" style={{ background: "#FAF7F0" }} />

      {/* Ambient gold particle layer */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />

      {/* Soft overlay for readability */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, #FAF7F0, #E4C77433)" }}
      />
    </>
  );
}
