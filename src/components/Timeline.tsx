"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Stars, Utensils, Music, GlassWater, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { time: "10:00 AM", title: "Nikah Ceremony", description: "The sacred union.", icon: Heart },
  { time: "11:30 AM", title: "Groom Entry", description: "The royal arrival.", icon: Stars },
  { time: "12:00 PM", title: "Bride Entry", description: "Walking down the aisle.", icon: Sparkles },
  { time: "01:00 PM", title: "Couple Stage", description: "Blessings and photos.", icon: Music },
  { time: "02:00 PM", title: "Royal Feast", description: "Lunch is served.", icon: Utensils },
  { time: "04:00 PM", title: "Cake Cutting", description: "Sweet beginnings.", icon: GlassWater },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".timeline-item");

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative py-32 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-4">Wedding Itinerary</h3>
        <p className="font-sans text-sm text-white/60 tracking-widest uppercase">The flow of our special day</p>
      </div>

      <div ref={containerRef} className="relative">
        {/* Center Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-[var(--color-gold)]/20 -translate-x-1/2 md:block hidden" />

        <div className="flex flex-col gap-12 md:gap-24">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            const Icon = event.icon;
            
            return (
              <div key={index} className={`timeline-item relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                
                {/* Content Box */}
                <div className={`w-full md:w-[45%] flex ${isEven ? "md:justify-start" : "md:justify-end"} mb-8 md:mb-0`}>
                  <div className={`glass p-6 rounded-2xl border border-[var(--color-gold)]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)] w-full max-w-sm flex flex-col ${isEven ? "md:items-start text-center md:text-left" : "md:items-end text-center md:text-right"}`}>
                    <span className="font-sans text-[var(--color-gold)] text-xs tracking-widest uppercase mb-2 block">{event.time}</span>
                    <h4 className="font-serif text-xl text-white mb-2">{event.title}</h4>
                    <p className="font-sans text-sm text-white/60">{event.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-[50%] -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full glass border border-[var(--color-gold)]/50 text-[var(--color-gold)] shadow-[0_0_15px_rgba(212,175,55,0.2)] md:block hidden">
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon size={20} />
                  </div>
                </div>

                {/* Mobile line connection (optional since we hid the center line on mobile) */}
                <div className="w-full md:w-[45%] flex justify-center md:hidden mb-4">
                  <div className="w-12 h-12 rounded-full glass border border-[var(--color-gold)]/50 text-[var(--color-gold)] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
