import type { Metadata } from "next";
import { Cinzel, EB_Garamond, Noto_Naskh_Arabic, Rouge_Script, Scheherazade_New } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AudioPlayer from "@/components/AudioPlayer";
import PetalBlast from "@/components/PetalBlast";
import ConfettiCannon from "@/components/ConfettiCannon";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});
const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});
const arabic = Noto_Naskh_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});
const rouge = Rouge_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rouge",
  display: "swap",
});
const bismillah = Scheherazade_New({
  weight: "500",
  subsets: ["arabic"],
  variable: "--font-bismillah",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Wedding Invitation — Adil & Lubna",
  description: "You are joyfully invited to our Nikah celebration.",
  openGraph: {
    title: "Wedding Invitation — Adil & Lubna",
    description: "You are joyfully invited to our Nikah celebration.",
    images: [{ url: "/social-share.png", width: 1729, height: 910 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation — Adil & Lubna",
    description: "You are joyfully invited to our Nikah celebration.",
    images: ["/social-share.png"],
  },
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${garamond.variable} ${arabic.variable} ${rouge.variable} ${bismillah.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          {children}
          <AudioPlayer />
          <PetalBlast />
          <ConfettiCannon />
        </SmoothScroll>
      </body>
    </html>
  );
}