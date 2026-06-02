"use client";

import { useEffect, useRef, useState } from "react";
import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import RSVPPopup from "@/components/RSVPPopup";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("rsvp-popup-shown");
    if (alreadyShown) return;

    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowPopup(true);
          localStorage.setItem("rsvp-popup-shown", "true");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />

      <div className="relative z-10 flex flex-col">
        <Hero />
        <RSVP />
        <Countdown />
        <Timeline />
        

        {/* ✅ IMPORTANT: real ref trigger */}
        {/* <div ref={triggerRef} className="h-10" /> */}
      </div>

      {/* {showPopup && (
        <RSVPPopup onClose={() => setShowPopup(false)} />
      )} */}
    </main>
  );
}