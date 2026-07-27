import type { Metadata } from "next";
import { Cinzel, EB_Garamond, Noto_Naskh_Arabic, Rouge_Script } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AudioPlayer from "@/components/AudioPlayer";
import PetalBlast from "@/components/PetalBlast";

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

export const metadata: Metadata = {
  title: "Wedding Invitation — Adil & Lubna",
  description: "You are joyfully invited to our Nikah celebration.",
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${garamond.variable} ${arabic.variable} ${rouge.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          {children}
          <AudioPlayer />
          <PetalBlast />
        </SmoothScroll>
      </body>
    </html>
  );
}