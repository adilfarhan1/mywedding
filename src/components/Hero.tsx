"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-20 px-4 min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse at 15% 10%, rgba(64,145,108,0.13) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 85%, rgba(201,168,76,0.1) 0%, transparent 50%),
          #FAF7F0
        `,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full max-w-[460px] mx-auto text-center"
      >
        {/* Outer frame */}
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.5)",
            borderRadius: 4,
            padding: 4,
            background: "rgba(201,168,76,0.05)",
          }}
        >
          {/* Card */}
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.22)",
              borderRadius: 2,
              padding: "42px clamp(24px,6vw,48px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* ✅ Optimized Background Image */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <Image
                src="/wedBg.webp"
                alt="Wedding Background"
                fill
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 460px"
                style={{
                  objectFit: "cover",
                  // opacity: 0.18,
                }}
              />
            </div>

            {/* Overlay for readability */}
            <div
              style={{
                position: "absolute",
                inset: 0,
// background: `
//   linear-gradient(
//     135deg,
//     rgba(27, 67, 50, 0.12),
//     rgba(201, 168, 76, 0.06),
//     rgba(250, 247, 240, 0.80)
//   )
// `,
                // backdropFilter: "blur(6px)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Corner ornaments */}
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <div
                  key={c}
                  style={{
                    position: "absolute",
                    [c.includes("t") ? "top" : "bottom"]: 14,
                    [c.includes("l") ? "left" : "right"]: 14,
                    width: 28,
                    height: 28,
                    borderTop: c.includes("t") ? "2px solid #C9A84C" : "none",
                    borderBottom: c.includes("b") ? "2px solid #C9A84C" : "none",
                    borderLeft: c.includes("l") ? "2px solid #C9A84C" : "none",
                    borderRight: c.includes("r") ? "2px solid #C9A84C" : "none",
                    opacity: 0.65,
                  }}
                />
              ))}

              {/* Bismillah */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="calligraphy text-[1.3rem] mb-6"
                style={{ color: "var(--color-emerald)" }}
              >
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </motion.div>

              <p
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: 9.5,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--color-emerald-light)",
                  margin: "16px 0",
                }}
              >
                With the blessings of Almighty Allah
              </p>

              <p
                style={{
                  fontFamily: "var(--font-garamond)",
                  fontSize: 13.5,
                  color: "var(--color-ink-soft)",
                  lineHeight: 1.3,
                  opacity: 0.7,
                  marginBottom: 20,
                }}
              >
                Mr. Ibrahim & Mrs. Naseema
                <br />
                <span
                  className="calligraphy"
                  style={{
                    fontSize: 10,
                    color: "var(--color-emerald-light)",
                    display: "inline-block",
                    margin: "2px 0",
                  }}
                >
                  together with
                </span>
                <br />
                Mr. Riyas & Mrs. Rahana
              </p>

              <p
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: 9.5,
                  color: "var(--color-emerald-light)",
                  margin: "16px 0",
                }}
              >
                warmly invite you to the Nikah ceremony of their beloved children
              </p>

             {/* Names */}
<div
  style={{
    margin: "20px 0 14px",
    position: "relative",
    textAlign: "center",
  }}
>
  <h2
    style={{
      fontFamily: "var(--font-rouge), cursive",
      fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
      color: "var(--color-emerald)",
      lineHeight: 1.05,
      margin: 0,
    }}
  >
    Adil Farhan
  </h2>

  {/* Decorative & */}
  <div
    style={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: "40%",
      fontFamily: "var(--font-cinzel)",
      fontSize: 18,
      color: "var(--color-gold)",
      letterSpacing: "0.35em",
      opacity: 0.9,
      background: "rgba(250,247,240,0.6)",
      padding: "2px 10px",
      borderRadius: 20,
      // backdropFilter: "blur(4px)",
    }}
  >
    &amp;
  </div>

  <h2
    style={{
      fontFamily: "var(--font-rouge), cursive",
      fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
      color: "var(--color-emerald)",
      fontStyle: "italic",
      lineHeight: 1.05,
      // marginTop: 10,
    }}
  >
    Lubna Nasrin
  </h2>
</div>

              {/* Date & Time */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 24,
                  padding: "16px 0",
                  borderTop: "1px solid rgba(201,168,76,0.2)",
                  borderBottom: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <div>
                  <div style={{ fontSize: 10, color: "var(--color-gold)" }}>
                    Nikah
                  </div>
                  <div style={{ fontSize: 22, color: "var(--color-emerald)" }}>
                    11:30 AM
                  </div>
                </div>

                <div
                  style={{
                    width: 1,
                    background: "rgba(201,168,76,0.3)",
                  }}
                />

                <div>
                  <div style={{ fontSize: 10, color: "var(--color-gold)" }}>
                    Date
                  </div>
                  <div style={{ fontSize: 22, color: "var(--color-emerald)" }}>
                    22 Nov 2026
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: 9.5,
                  color: "var(--color-emerald-light)",
                  margin: "16px 0",
                }}
              >
               We request your presence and blessings on this joyous occasion.
              </p>

              {/* Venue */}
              <div style={{ marginTop: 20 }}>
                <div
                  style={{
                    fontSize: 20,
                    color: "var(--color-emerald)",
                  }}
                >
                  Athafy Auditorium
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "var(--color-ink-soft)",
                    opacity: 0.65,
                  }}
                >
                  Vadakara, Vallikkad Road
                </div>
              </div>

              {/* Map */}
              <a
                href="https://www.google.com/maps/place/Athafy+Auditorium/@11.6399316,75.5881128,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full mt-4"
                style={{
                  border: "1px solid rgba(27,67,50,0.35)",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "var(--color-emerald)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <MapPin size={13} />
                Open Map
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <p
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontSize: 9.5,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--color-emerald-light)",
                  margin: "16px 0",
                  textAlign: "center",
                }}
              >
                With Compliments
              </p>

        <p
                style={{
                  fontFamily: "var(--font-garamond)",
                  fontSize: 13.5,
                  color: "var(--color-ink-soft)",
                  lineHeight: 1.3,
                  opacity: 0.7,
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                Kaiprath Family & Kottayil Family |
                Irfana • Muhammed • Rifa • Ziya
              </p>

      {/* Scroll Hint */}
      <div className="scroll-hint mt-10 flex flex-col items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: 8.5,
            letterSpacing: "0.28em",
            color: "var(--color-gold)",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Scroll to explore
        </span>

        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <rect
            x="1"
            y="1"
            width="16"
            height="26"
            rx="8"
            stroke="#C9A84C"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <circle cx="9" cy="8" r="2.5" fill="#C9A84C" opacity="0.7">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;0,10;0,0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

    
    </section>
  );
}