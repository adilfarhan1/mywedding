"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CanvasBackground from "@/components/CanvasBackground";
import GustHero from "@/components/GustHero";
import RSVP from "@/components/RSVP";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import DressCode from "@/components/DressCode";
import InviteCover from "@/components/InviteCover";

interface GuestInviteClientProps {
  guestName?: string;
  guestSide?: "bride" | "groom" | null;
  slug: string;
}

export default function GuestInviteClient({
  guestName,
  guestSide,
  slug,
}: GuestInviteClientProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("invitation-opened"));
    setOpened(true);
  };

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />

      <AnimatePresence>
        {!opened && <InviteCover guestName={guestName} onOpen={handleOpen} />}
      </AnimatePresence>

      {opened && (
        <div className="relative z-10 flex flex-col">
          <GustHero guestName={guestName ?? ""} />
          <RSVP defaultName={guestName || ""} defaultSide={guestSide || null} slug={slug} />
          <Countdown />
          <Timeline />
          <DressCode />
        </div>
      )}
    </main>
  );
}
