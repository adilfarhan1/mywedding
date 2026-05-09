import CanvasBackground from "@/components/CanvasBackground";
import Hero from "@/components/Hero";
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
      <div className="relative z-10 flex flex-col gap-20 pb-32">
        
        {guestName && (
          <div className="pt-20 px-4 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-gold)]">Welcome, {guestName}</h2>
            <p className="font-sans text-xs text-white/60 tracking-widest uppercase mt-2">You are joyfully invited</p>
          </div>
        )}

        <div className={guestName ? "mt-[-5rem]" : ""}>
          <Hero />
        </div>
        
        <Countdown />
        <Timeline />
        
        {/* Pass the guest name to pre-fill and disable the name input */}
        <RSVP defaultName={guestName || ""} />
        
        <GiftSection />
      </div>
    </main>
  );
}
