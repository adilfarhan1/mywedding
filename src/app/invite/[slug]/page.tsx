import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import GuestInviteClient from "@/components/GuestInviteClient";

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
    <GuestInviteClient
      guestName={guest?.name ?? undefined}
      guestSide={guest?.side ?? null}
      slug={resolvedParams.slug}
    />
  );
}
