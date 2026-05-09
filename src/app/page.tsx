import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import GiftSection from "@/components/GiftSection";
import RSVP from "@/components/RSVP";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <div className="relative z-10 flex flex-col gap-20">
        <Hero />
        <RSVP />
        <Countdown />
        <Timeline />
        <GiftSection />
      </div>
    </main>
  );
}
