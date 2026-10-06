import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import GuestInviteClient from "@/components/GuestInviteClient";

// Guest name/side rarely change after an invite link is created, so a short
// cache window lets repeat visits (very common — guests reopen the link,
// family members share one device) skip the DB round-trip entirely.
export const revalidate = 60;

async function getGuestBySlug(slug: string) {
  try {
    await connectDB();
    const guest = await Guest.findOne({ slug }).select("name side").lean();
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
