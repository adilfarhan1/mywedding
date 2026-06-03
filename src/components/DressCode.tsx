"use client";

import { useEffect, useRef, useState } from "react";

const femaleSwatches = [
  { hex: "#A73060", name: "Deep Rose" },
  { hex: "#FF2E63", name: "Crimson Bloom" },
  { hex: "#FF5B84", name: "Blush Petal" },
  { hex: "#FF8AAD", name: "Soft Carnation" },
  { hex: "#FFC1E3", name: "pastel pink" },
  { hex: "#C12664", name: "Berry Velvet" },
];

const maleSwatches = [
  { hex: "#03045E", name: "Dark Blue" },
  { hex: "#0078B7", name: "Strong Blue" },
  { hex: "#00B4D7", name: "Sparkling Cyan" },
  { hex: "#92DFEF", name: "Sky Blue" },
  { hex: "#CAF1F8", name: "Baby Blue" },
  { hex: "#FFFFFF", name: "Pure white" },
  
];

function SwatchStrip({
  swatches,
  visible,
  delay = 0,
}: {
  swatches: typeof femaleSwatches;
  visible: boolean;
  delay?: number;
}) {
  return (
    <div className="flex items-stretch gap-0 w-full overflow-hidden rounded-xl">
      {swatches.map((s, i) => (
        <div
          key={s.hex}
          className="relative flex-1 group cursor-default"
          style={{
            backgroundColor: s.hex,
            height: 72,
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left center",
            transition: `opacity 0.5s ease ${delay + i * 0.08}s, transform 0.5s ease ${delay + i * 0.08}s`,
          }}
        >
          {/* Hover name tooltip */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <span
              className="text-[8px] tracking-widest uppercase font-medium px-1 text-center leading-tight"
              style={{
                color: i < 3 ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.45)",
                textShadow: i < 3 ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {s.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DressCode() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#faf7f0" }}
    >
      {/* Subtle top & bottom border rules matching site theme */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

      <div className="relative max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14" style={fadeUp(0)}>
          <p
            className="tracking-[0.45em] uppercase mb-4"
            style={{ fontFamily: "Georgia, serif", fontSize: 11, color: "#c9a84c" }}
          >
            ✦ &nbsp; Dress Code &nbsp; ✦
          </p>

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(26px, 5.5vw, 38px)",
              color: "#7a6a4a",
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: 16,
            }}
          >
            Come Dressed in Harmony
          </h2>

          {/* Gold ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span style={{ color: "#c9a84c", fontSize: 10 }}>✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>

          <p
            className="mx-auto leading-[1.85]"
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "#9a8860",
              fontSize: "clamp(13px, 2.4vw, 14.5px)",
              maxWidth: 460,
            }}
          >
            To create a beautifully unified celebration, we warmly invite
            our guests to embrace the colours of our day. Your care in dressing
            within this palette will add to the joy and elegance of the occasion.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-6">

          {/* ─ Ladies ─ */}
          <div
            style={{
              ...fadeUp(0.2),
              backgroundColor: "#fff",
              border: "1px solid #e8dfc0",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* Card header bar — thin gold top accent */}
            <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, #A73060, #FF2E63, #FF5B84, #FF8AAD, #C12664)" }} />

            <div className="px-7 pt-6 pb-7">
              {/* Label */}
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#fff0f4", border: "1px solid #ffc0cf" }}
                >
                  <span style={{ fontSize: 13 }}>🌸</span>
                </div>
                <div>
                  <p
                    className="uppercase tracking-[0.3em]"
                    style={{ fontFamily: "Georgia, serif", fontSize: 10, color: "#b0986a" }}
                  >
                    For the Ladies
                  </p>
                  <p
                    style={{ fontFamily: "Georgia, serif", fontSize: 17, color: "#8a3050", fontWeight: 400, lineHeight: 1.1 }}
                  >
                    Rose &amp; Crimson Palette
                  </p>
                </div>
              </div>

              {/* Swatch strip */}
              <SwatchStrip swatches={femaleSwatches} visible={visible} delay={0.3} />

              {/* Swatch labels row */}
              <div className="flex mt-3">
                {femaleSwatches.map((s) => (
                  <div key={s.hex} className="flex-1 text-center">
                    <span
                      className="text-[9px] tracking-wider uppercase leading-tight block"
                      style={{ color: "#c0a880" }}
                    >
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className="mt-5 leading-relaxed"
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "#b07090",
                  fontSize: 12.5,
                }}
              >
                From deep berry to the softest blush — sarees, gowns, churidars, abayas
                and all elegant attire are warmly welcome.
              </p>
            </div>
          </div>

          {/* ─ Gentlemen ─ */}
          <div
            style={{
              ...fadeUp(0.35),
              backgroundColor: "#fff",
              border: "1px solid #e8dfc0",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, #2081C5, #4DAACC, #77D5D7, #B7E7E7, #F7F9F8)" }} />

            <div className="px-7 pt-6 pb-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#eef6fc", border: "1px solid #b0d8ec" }}
                >
                  <span style={{ fontSize: 13 }}>🤍</span>
                </div>
                <div>
                  <p
                    className="uppercase tracking-[0.3em]"
                    style={{ fontFamily: "Georgia, serif", fontSize: 10, color: "#b0986a" }}
                  >
                    For the Gentlemen
                  </p>
                  <p
                    style={{ fontFamily: "Georgia, serif", fontSize: 17, color: "#1a6090", fontWeight: 400, lineHeight: 1.1 }}
                  >
                    Azure &amp; Sky Palette
                  </p>
                </div>
              </div>

              <SwatchStrip swatches={maleSwatches} visible={visible} delay={0.45} />

              <div className="flex mt-3">
                {maleSwatches.map((s) => (
                  <div key={s.hex} className="flex-1 text-center">
                    <span
                      className="text-[9px] tracking-wider uppercase leading-tight block"
                      style={{ color: "#c0a880" }}
                    >
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className="mt-5 leading-relaxed"
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "#4878a0",
                  fontSize: 12.5,
                }}
              >
                From rich royal blue to crisp ivory — shirts, sherwanis, suits
                and all formal attire are most welcome.
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="mt-10 text-center" style={fadeUp(0.55)}>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
            <span style={{ color: "#c9a84c", fontSize: 10 }}>✦</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
          </div>

          <p
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "#b0986a",
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            Above all, your presence is the greatest adornment of our day.
            <br />
            <span className="text-[2rem] md:text-[3rem]" style={{ color: "#c9a84c", }}>بَارَكَ اللَّهُ فِيكُمْ</span>
          </p>
        </div>

      </div>
    </section>
  );
}