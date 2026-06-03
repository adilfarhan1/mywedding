import CanvasBackground from "@/components/CanvasBackground";
import GustHero from "@/components/GustHero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import GiftSection from "@/components/GiftSection";
import RSVP from "@/components/RSVP";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import DressCode from "@/components/DressCode";

async function getGuestBySlug(slug: string) {
  try {
    await connectDB();
    const guest = await Guest.findOne({ slug });
    return guest ? { name: guest.name, side: guest.side } : null;
  } catch (e) {
    return null;
  }
}

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guest = await getGuestBySlug(resolvedParams.slug);

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <div className="relative z-10 flex flex-col ">
        <div>
          <GustHero guestName={guest?.name ?? null} />
        </div>
        <RSVP
          defaultName={guest?.name || ""}
          defaultSide={guest?.side || null} 
          slug={resolvedParams.slug}
        />
        <Countdown />
        <Timeline />
        <DressCode />
      </div>
    </main>
  );
}