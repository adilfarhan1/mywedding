"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import DressCode from "@/components/DressCode";
import Wishes from "@/components/Wishes";
import InviteCover from "@/components/InviteCover";

export default function BridePage() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("invitation-opened"));
    setOpened(true);
  };

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />

      <AnimatePresence>
        {!opened && <InviteCover onOpen={handleOpen} brideFirst />}
      </AnimatePresence>

      {opened && (
        <div className="relative z-10 flex flex-col">
          <Hero brideFirst />
          <RSVP defaultSide="bride" />
          <Countdown />
          <Timeline />
          <DressCode />
          <Wishes />
        </div>
      )}
    </main>
  );
}
