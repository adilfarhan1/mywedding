"use client";

import { useEffect, useRef, useState } from "react";

const femaleSwatches = [
  { hex: "#823154", name: "Mulberry" },
  { hex: "#D4567D", name: "Rose" },
  { hex: "#A91046", name: "Azalea" },
  { hex: "#8E152A", name: "Burgundy" },
  { hex: "#C9365C", name: "Pink" },
  { hex: "#940939", name: "Magenta" },
  { hex: "#C01035", name: "Fuchsia" },
  { hex: "#580109", name: "Cranberry" },
  { hex: "#E1334F", name: "Flamingo" },
  { hex: "#A73264", name: "Foxglove" },
  { hex: "#E03B66", name: "Bubblegum" },
  { hex: "#E77B91", name: "Cotton Candy" },
  { hex: "#E46F86", name: "Blush" },
  { hex: "#D14F72", name: "Peony" },
  { hex: "#A41A39", name: "Camellia" },
  { hex: "#F59A91", name: "Salmon Pink" },
  { hex: "#ED8C88", name: "Coral Pink" },
  { hex: "#D74460", name: "Watermelon" },
  { hex: "#EE92AD", name: "Taffy" },
  { hex: "#E99FA7", name: "Dusty Rose" },
  { hex: "#E796A9", name: "Mauve" },
  { hex: "#D1859C", name: "Lilac Pink" },
  { hex: "#D57A87", name: "Rosewood" },
  { hex: "#E99A98", name: "Vintage Pink" },
  { hex: "#F8C7CE", name: "Baby Pink" },
  { hex: "#F6C1C4", name: "Powder Pink" },
  { hex: "#F0CAC2", name: "Pearl Pink" },
  { hex: "#F0C0B7", name: "Champagne Pink" },
  { hex: "#F2BBB8", name: "Pastel Pink" },
  { hex: "#E6B5B9", name: "Light Pink" },
];

const maleSwatches = [
  { hex: "#F1D7C2", name: "Ivory Brown" },
  { hex: "#DBB699", name: "Sand Brown" },
  { hex: "#B28767", name: "Taupe Brown" },
  { hex: "#93694B", name: "Beige Brown" },
  { hex: "#854923", name: "Camel Brown" },
  { hex: "#6C360D", name: "Caramel Brown" },
  { hex: "#773E11", name: "Honey Brown" },
  { hex: "#67330F", name: "Chestnut Brown" },
  { hex: "#5C2A0B", name: "Hazelnut Brown" },
  { hex: "#532408", name: "Toffee Brown" },
  { hex: "#4C1A05", name: "Cinnamon Brown" },
  { hex: "#421604", name: "Cocoa Brown" },
  { hex: "#351808", name: "Mocha Brown" },
  { hex: "#582707", name: "Maple Brown" },
  { hex: "#572805", name: "Nutmeg Brown" },
  { hex: "#B7805A", name: "Almond Brown" },
  { hex: "#C79672", name: "Walnut Brown" },
  { hex: "#C08C6C", name: "Wood Brown" },
  { hex: "#9A6B4C", name: "Mink Brown" },
  { hex: "#68432B", name: "Coffee Brown" },
  { hex: "#442B21", name: "Espresso Brown" },
  { hex: "#291610", name: "Chocolate Brown" },
  { hex: "#24130C", name: "Dark Chocolate" },
  { hex: "#281308", name: "Umber Brown" },
  { hex: "#1F100C", name: "Bark Brown" },
  { hex: "#2A1209", name: "Saddle Brown" },
  { hex: "#2B140F", name: "Mahogany Brown" },
  { hex: "#2D140E", name: "Cedar Brown" },
  { hex: "#23130F", name: "Sepia Brown" },
  { hex: "#12100D", name: "Ebony Brown" },
];

function SwatchGrid({
  swatches,
  visible,
  delay = 0,
}: {
  swatches: typeof femaleSwatches;
  visible: boolean;
  delay?: number;
}) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
      {swatches.map((s, i) => {
        // crude luminance check so the index badge stays legible on any swatch
        const r = parseInt(s.hex.slice(1, 3), 16);
        const g = parseInt(s.hex.slice(3, 5), 16);
        const b = parseInt(s.hex.slice(5, 7), 16);
        const isLight = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;

        return (
          <div
            key={s.hex + s.name}
            className="group flex flex-col items-center gap-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.92)",
              transition: `opacity 0.5s ease ${delay + i * 0.015}s, transform 0.5s ease ${delay + i * 0.015}s`,
            }}
          >
            <div
              className="relative w-full aspect-square rounded-lg shadow-sm border border-black/[0.08] overflow-hidden cursor-default transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: s.hex }}
              title={s.name}
            >
              <span
                className="absolute top-0.5 left-0.5 text-[6.5px] font-semibold leading-none px-[3px] py-[1.5px] rounded-full"
                style={{
                  background: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.3)",
                  color: isLight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.9)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <span
              className="text-[7px] tracking-wide uppercase text-center leading-tight"
              style={{ color: "#b0986a", fontFamily: "Georgia, serif" }}
            >
              {s.name}
            </span>
          </div>
        );
      })}
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
            our guests to embrace the colours of our day. Any shade from the
            palettes below will add to the joy and elegance of the occasion.
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
            <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, #F8C7CE, #F2BBB8, #E99A98, #D1859C, #D14F72, #C9365C, #C01035, #580109)" }} />

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
                    30 Shades of Pink
                  </p>
                </div>
              </div>

              <SwatchGrid swatches={femaleSwatches} visible={visible} delay={0.3} />

              <p
                className="mt-5 leading-relaxed"
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "#b07090",
                  fontSize: 12.5,
                }}
              >
                From deep mulberry and burgundy to the softest baby pink — sarees,
                gowns, churidars, abayas and all elegant attire are warmly welcome.
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
            <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, #EFD5C3, #B28767, #854923, #67330F, #532408, #291610, #2A1209, #12100D)" }} />

            <div className="px-7 pt-6 pb-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#f2ede6", border: "1px solid #c9b7a3" }}
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
                    style={{ fontFamily: "Georgia, serif", fontSize: 17, color: "#38220F", fontWeight: 400, lineHeight: 1.1 }}
                  >
                    30 Shades of Brown
                  </p>
                </div>
              </div>

              <SwatchGrid swatches={maleSwatches} visible={visible} delay={0.45} />

              <p
                className="mt-5 leading-relaxed"
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "#7a6450",
                  fontSize: 12.5,
                }}
              >
                From ivory and sand to deep espresso and ebony — shirts, sherwanis,
                suits and all formal attire are most welcome.
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
