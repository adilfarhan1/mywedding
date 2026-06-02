"use client";

const PETALS = Array.from({ length: 50 }, (_, i) => {
  const left = `${(i * 3.4 + (i % 3) * 1.5) % 100}%`;
  const startY = `-10%`;
  const size = `${10 + (i % 5) * 3}px`;
  const sway = `${(i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 10)}px`;
  const dur = `${2.5 + (i % 6) * 0.4}s`; 
  const delay = `${(i * 0.12) % 1.5}s`; 

  return {
    id: i,
    left,
    startY,
    size,
    dur,
    delay,
    sway,
    color: ["#C9A84C", "#2D6A4F", "#E4C56E", "#40916C", "#F4E4B0", "#1B4332"][i % 6],
    opacity: 0.4 + (i % 4) * 0.12,
    borderRadius: i % 2 === 0 ? "50% 0 50% 0" : "0 50% 0 50%",
    spinDirection: i % 3 === 0 ? 1 : -1,
  };
});

export default function PetalBlast() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
      <style jsx global>{`
        @keyframes rainyFallTopToBottom {
          0% {
            transform: translateY(0) translateX(0) rotateX(0deg) rotateZ(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--op);
          }
          50% {
            transform: translateY(55vh) translateX(var(--sway)) rotateX(180deg) rotateZ(calc(var(--spin) * 240deg));
            opacity: var(--op);
          }
          100% {
            transform: translateY(115vh) translateX(calc(var(--sway) * 1.5)) rotateX(360deg) rotateZ(calc(var(--spin) * 540deg));
            opacity: 0;
          }
        }
      `}</style>

      {PETALS.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: p.left,
            top: p.startY,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.borderRadius,
            perspective: "800px",
            
            // Single, consolidated animation hook
            animation: `rainyFallTopToBottom var(--dur) linear infinite`,
            animationDelay: "var(--delay)",
            
            // Shared element context variables
            ["--sway" as any]: p.sway,
            ["--spin" as any]: p.spinDirection,
            ["--dur" as any]: p.dur,
            ["--delay" as any]: p.delay,
            ["--op" as any]: p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}