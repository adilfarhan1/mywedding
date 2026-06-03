"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Heart,
  Stars,
  Utensils,
  Music,
  GlassWater,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { time: "11:30 AM", title: "Groom Entry", description: "The royal arrival.", icon: Stars, emoji: "🌿" },
  { time: "12:00 PM", title: "Nikah Ceremony", description: "The sacred union.", icon: Heart, emoji: "🤍" },
  { time: "01:00 PM", title: "Bride Entry", description: "Walking into a new chapter.", icon: Sparkles, emoji: "🌸" },
  { time: "01:15 PM", title: "Couple on Stage", description: "Blessings and photos.", icon: Music, emoji: "✨" },
  { time: "01:30 PM", title: "Mutti Pattu", description: "A joyful traditional celebration.", icon: Music, emoji: "🥁" },
  { time: "12:30 PM", title: "Royal Feast", description: "Lunch is served.", icon: Utensils, emoji: "🍽️" },
  { time: "03:00 PM", title: "Cake Cutting", description: "Sweet beginnings.", icon: GlassWater, emoji: "🎂" },
];


export default function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll<HTMLElement>(
      ".timeline-item"
    );

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      style={{
        padding: "90px 16px",
        background: "var(--parch)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: 12,
              letterSpacing: "0.4em",
              color: "#544417",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            The Flow of Our Day
          </p>

          <h2
            style={{
              fontFamily: "var(--font-garamond)",
              fontSize: "clamp(1.8rem,5vw,2.8rem)",
              fontWeight: 300,
              color: "#2D6A4F",
            }}
          >
            Wedding Itinerary
          </h2>

          <div style={{ marginTop: 14 }}>
            <span style={{ color: "var(--color-gold)", fontSize: 13 }}>
              ✦ ❧ ✦
            </span>
          </div>
        </div>

        {/* TIMELINE */}
        <div ref={containerRef} style={{ position: "relative" }}>
          {/* center line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              transform: "translateX(-50%)",
              background:
                "linear-gradient(to bottom, transparent, var(--color-gold) 15%, var(--color-gold) 85%, transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 42 }}>
            {timelineEvents.map((ev, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className="timeline-item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 60px 1fr",
                    alignItems: "center",
                  }}
                >
                  {/* LEFT CARD */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingRight: 18,
                    }}
                  >
                    {isLeft && (
                      <div
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          backdropFilter: "blur(10px)",
                          borderRadius: 18,
                          padding: "18px 20px",
                          maxWidth: 260,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                          textAlign: "right",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.29em",
                            color: "#C9A84C",
                            fontFamily: "var(--font-cinzel)",
                          }}
                        >
                          {ev.time}
                        </div>

                        <h3
                          style={{
                            fontFamily: "var(--font-garamond)",
                            fontSize: 18,
                            marginTop: 6,
                            color: "var(--color-emerald)",
                          }}
                        >
                          {ev.title}
                        </h3>

                        <p
                          style={{
                            fontSize: 13,
                            opacity: 0.75,
                            marginTop: 6,
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {ev.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CENTER DOT */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "white",
                        border: "2px solid var(--color-gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        boxShadow: "0 2px 14px rgba(201,168,76,0.25)",
                      }}
                    >
                      {ev.emoji}
                    </div>
                  </div>

                  {/* RIGHT CARD */}
                  <div style={{ paddingLeft: 18 }}>
                    {!isLeft && (
                      <div
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          backdropFilter: "blur(10px)",
                          borderRadius: 18,
                          padding: "18px 20px",
                          maxWidth: 260,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                          textAlign: "left",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.25em",
                            color: "var(--color-gold)",
                            fontFamily: "var(--font-cinzel)",
                          }}
                        >
                          {ev.time}
                        </div>

                        <h3
                          style={{
                            fontFamily: "var(--font-garamond)",
                            fontSize: 18,
                            marginTop: 6,
                            color: "var(--color-emerald)",
                          }}
                        >
                          {ev.title}
                        </h3>

                        <p
                          style={{
                            fontSize: 13,
                            opacity: 0.75,
                            marginTop: 6,
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {ev.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}