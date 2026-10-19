import GuestInviteClient from "@/components/GuestInviteClient";

// This page renders instantly with no server-side DB lookup — the guest's
// name/side is fetched client-side by GuestInviteClient once mounted, so the
// page shell (fonts, background, entrance animation) never waits on Mongo.
export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <GuestInviteClient slug={slug} />;
}
