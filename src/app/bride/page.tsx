import type { Metadata } from "next";
import BridePage from "@/components/BridePage";

export const metadata: Metadata = {
  title: "Wedding Invitation — Lubna & Adil",
  description: "You are joyfully invited to our Nikah celebration.",
  openGraph: {
    title: "Wedding Invitation — Lubna & Adil",
    description: "You are joyfully invited to our Nikah celebration.",
    images: [{ url: "/bride-social-share.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation — Lubna & Adil",
    description: "You are joyfully invited to our Nikah celebration.",
    images: ["/bride-social-share.webp"],
  },
};

export default function Page() {
  return <BridePage />;
}
