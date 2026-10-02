"use client";

import { useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  w: number;
  h: number;
  shape: "rect" | "triangle" | "circle";
  color: string;
  rotation: number;
  rotationSpeed: number;
  tiltAngle: number;
  tiltAngleSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  gravity: number;
  drag: number;
};

const COLORS = [
  "rgba(201, 168, 76, 0.95)",  // gold
  "rgba(228, 197, 110, 0.95)", // gold-light
  "rgba(244, 228, 176, 0.95)", // gold-pale
  "rgba(27, 67, 50, 0.9)",     // emerald
  "rgba(64, 145, 108, 0.9)",   // emerald-light
  "rgba(250, 247, 240, 0.95)", // cream
];

function runCannon() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9998";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", onResize, { passive: true });

  const particles: Particle[] = [];
  const isMobile = width < 768;
  const duration = 3000;
  const endTime = Date.now() + duration;

  function spawn(side: "left" | "right"): Particle {
    const isLeft = side === "left";
    const x = isLeft ? -10 : width + 10;
    const y = height * 0.5;

    const spread = (55 * Math.PI) / 180;
    const baseAngle = isLeft ? (-60 * Math.PI) / 180 : (-120 * Math.PI) / 180;
    const angle = baseAngle + (Math.random() * spread - spread / 2);
    const speed = isMobile ? Math.random() * 6 + 12 : Math.random() * 12 + 18;

    const shapeRand = Math.random();
    let shape: Particle["shape"] = "rect";
    if (isMobile) {
      if (shapeRand > 0.6) shape = "circle";
    } else {
      if (shapeRand > 0.7) shape = "circle";
      else if (shapeRand > 0.45) shape = "triangle";
    }

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: Math.random() * 5 + 3,
      w: Math.random() * 8 + 6,
      h: Math.random() * 6 + 4,
      shape,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.08 - 0.04,
      tiltAngle: Math.random() * Math.PI,
      tiltAngleSpeed: Math.random() * 0.05 + 0.02,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      gravity: isMobile ? 0.16 : 0.25,
      drag: isMobile ? 0.98 : 0.975,
    };
  }

  let rafId = 0;

  function draw() {
    ctx!.clearRect(0, 0, width, height);

    if (Date.now() < endTime) {
      const spawnChance = isMobile ? 0.65 : 1.0;
      if (Math.random() < spawnChance) {
        particles.push(spawn("left"));
        particles.push(spawn("right"));
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;

      p.wobble += p.wobbleSpeed;
      const wind = p.vy > 0 ? Math.sin(p.wobble) * 0.4 : 0;
      p.x += p.vx + wind;
      p.y += p.vy;

      p.rotation += p.rotationSpeed;
      p.tiltAngle += p.tiltAngleSpeed;

      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.scale(1, Math.sin(p.tiltAngle));
      ctx!.fillStyle = p.color;

      if (p.shape === "rect") {
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else if (p.shape === "triangle") {
        ctx!.beginPath();
        ctx!.moveTo(0, -p.r);
        ctx!.lineTo(p.r, p.r);
        ctx!.lineTo(-p.r, p.r);
        ctx!.closePath();
        ctx!.fill();
      } else {
        ctx!.beginPath();
        ctx!.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();

      if (p.y > height + 30 || p.x < -30 || p.x > width + 30) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0 || Date.now() < endTime) {
      rafId = requestAnimationFrame(draw);
    } else {
      window.removeEventListener("resize", onResize);
      canvas.remove();
    }
  }

  rafId = requestAnimationFrame(draw);

  // Safety cleanup in case the tab is backgrounded and rAF stalls
  setTimeout(() => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
    canvas.remove();
  }, duration + 4000);
}

export default function ConfettiCannon() {
  useEffect(() => {
    window.addEventListener("invitation-opened", runCannon);
    return () => window.removeEventListener("invitation-opened", runCannon);
  }, []);

  return null;
}
