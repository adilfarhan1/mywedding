import CanvasBackground from "@/components/CanvasBackground";
import GustHero from "@/components/GustHero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import GiftSection from "@/components/GiftSection";
import RSVP from "@/components/RSVP";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";

async function getGuestBySlug(slug: string) {
  try {
    await connectDB();
    const guest = await Guest.findOne({ slug });
    return guest ? guest.name : null;
  } catch (e) {
    return null;
  }
}

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guestName = await getGuestBySlug(resolvedParams.slug);

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <div className="relative z-10 flex flex-col pb-32">
        
       

        <div>
          <GustHero guestName={guestName} />
        </div>
        
        <Countdown />
        <Timeline />
        
        {/* Pass the guest name to pre-fill and disable the name input */}
        <RSVP defaultName={guestName || ""} />
        
      </div>
    </main>
  );
}
