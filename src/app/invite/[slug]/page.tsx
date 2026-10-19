import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import Guest from "@/models/Guest";
import GuestInviteClient from "@/components/GuestInviteClient";

// Guest side rarely changes after an invite link is created, so caching the
// rendered result (including metadata) lets repeat visits skip the DB.
export const revalidate = 60;

// Social-share previews (WhatsApp, etc.) need the right-side image resolved
// server-side in <head> before the link is ever opened, so this one lookup
// can't be avoided — kept minimal (indexed slug, single field) so it stays
// fast. The visible page itself does NOT wait on this: see GuestInviteClient.
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  let side: "bride" | "groom" | null = null;
  try {
    await connectDB();
    const guest = await Guest.findOne({ slug }).select("side").lean();
    side = guest?.side ?? null;
  } catch {
    // DB unavailable — fall back to the root layout's default metadata below.
  }

  if (side === "bride") {
    const title = "Wedding Invitation — Lubna & Adil";
    const description = "You are joyfully invited to our Nikah celebration.";
    const images = [{ url: "/bride-social-share.webp", width: 1200, height: 630 }];
    return {
      title,
      description,
      openGraph: { title, description, images },
      twitter: { card: "summary_large_image", title, description, images: [images[0].url] },
    };
  }

  return {}; // groom / unknown side inherits the root layout's default metadata
}

// This page renders instantly with no blocking DB lookup for its visible
// content — the guest's name/side is fetched client-side by
// GuestInviteClient once mounted, so the page shell (fonts, background,
// entrance animation) never waits on Mongo.
export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <GuestInviteClient slug={slug} />;
}
