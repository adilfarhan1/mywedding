import type { Metadata } from "next";
import BridePage from "@/components/BridePage";

// Placeholder — replace public/bride-social-share.jpg with the bride-specific
// share image, then update width/height below to match its actual size.
export const metadata: Metadata = {
  title: "Wedding Invitation — Lubna & Adil",
  description: "You are joyfully invited to our Nikah celebration.",
  openGraph: {
    title: "Wedding Invitation — Lubna & Adil",
    description: "You are joyfully invited to our Nikah celebration.",
    images: [{ url: "/bride-social-share.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation — Lubna & Adil",
    description: "You are joyfully invited to our Nikah celebration.",
    images: ["/bride-social-share.jpg"],
  },
};

export default function Page() {
  return <BridePage />;
}
