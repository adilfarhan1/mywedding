import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AudioPlayer from "@/components/AudioPlayer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "You are joyfully invited to our wedding celebration.",
  openGraph: {
    title: "Wedding Invitation",
    description: "You are joyfully invited to our wedding celebration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}>
      <body className="antialiased selection:bg-gold/30 selection:text-gold-light">
        <SmoothScroll>
          {children}
          <AudioPlayer />
        </SmoothScroll>
      </body>
    </html>
  );
}
