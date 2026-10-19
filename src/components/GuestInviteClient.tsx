"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CanvasBackground from "@/components/CanvasBackground";
import GustHero from "@/components/GustHero";
import RSVP from "@/components/RSVP";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import DressCode from "@/components/DressCode";
import Wishes from "@/components/Wishes";
import InviteCover from "@/components/InviteCover";

interface GuestInviteClientProps {
  // Optional pre-fetched values (e.g. from a server render). When omitted,
  // the component fetches them itself right after mount so the page shell
  // (fonts, background, animations) paints immediately instead of waiting
  // on a database round-trip before anything is shown.
  guestName?: string;
  guestSide?: "bride" | "groom" | null;
  slug: string;
}

export default function GuestInviteClient({
  guestName: initialGuestName,
  guestSide: initialGuestSide,
  slug,
}: GuestInviteClientProps) {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState(initialGuestName);
  const [guestSide, setGuestSide] = useState(initialGuestSide ?? null);

  useEffect(() => {
    if (initialGuestName !== undefined) return; // already have it, no fetch needed
    let cancelled = false;

    fetch(`/api/guest/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setGuestName(data.name);
        setGuestSide(data.side ?? null);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug, initialGuestName]);

  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("invitation-opened"));
    setOpened(true);
  };

  const brideFirst = guestSide === "bride";

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />

      <AnimatePresence>
        {!opened && (
          <InviteCover guestName={guestName} onOpen={handleOpen} brideFirst={brideFirst} />
        )}
      </AnimatePresence>

      {opened && (
        <div className="relative z-10 flex flex-col">
          <GustHero guestName={guestName ?? ""} brideFirst={brideFirst} />
          <RSVP defaultName={guestName || ""} defaultSide={guestSide} slug={slug} />
          <Countdown />
          <Timeline />
          <DressCode />
          <Wishes />
        </div>
      )}
    </main>
  );
}
