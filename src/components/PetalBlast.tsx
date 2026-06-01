"use client";

const PETALS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 3.4 + (i % 3) * 1.5) % 100}%`,
  dur: `${9 + (i % 7) * 1}s`,
  delay: `${(i * 0.15) % 0.5}s`,
  size: `${9 + (i % 5) * 3}px`,
  sway: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 15)}px`,
  color: ["#C9A84C","#2D6A4F","#E4C56E","#40916C","#F4E4B0","#1B4332"][i % 6],
  opacity: 0.3 + (i % 4) * 0.12,
  borderRadius: i % 2 === 0 ? "50% 0 50% 0" : "0 50% 0 50%",
}));

export default function PetalBlast() {
  return (
    <>
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            borderRadius: p.borderRadius,
            "--dur": p.dur,
            "--delay": p.delay,
            "--sway": p.sway,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}