// app/page.tsx
"use client";

import { useState } from "react";
import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import GiftSection from "@/components/GiftSection";
import RSVP from "@/components/RSVP";
import RSVPPopup from "@/components/RSVPPopup";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [rsvpOpened, setRsvpOpened] = useState(false);

  const openRSVP = () => { setShowPopup(true); setRsvpOpened(true); };

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <div className="relative z-10 flex flex-col ">
        <Hero />
        <Countdown />
        <Timeline />
        <RSVP />
      </div>
      {showPopup && <RSVPPopup onClose={() => setShowPopup(false)} />}
    </main>
  );
}