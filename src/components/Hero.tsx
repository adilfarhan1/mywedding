"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      {/* Premium fixed-ratio invitation card container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full max-w-[420px] aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] mx-auto glass rounded-2xl border border-[var(--color-gold)]/30 overflow-hidden flex flex-col items-center justify-center p-8 text-center"
        style={{
          boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.15), inset 0 0 20px rgba(212, 175, 55, 0.05)"
        }}
      >
        {/* Ornaments - Top */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[var(--color-gold)] opacity-50 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[var(--color-gold)] opacity-50 rounded-tr-xl" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="flex flex-col items-center w-full"
        >
          {/* Calligraphy */}
          <h1 className="calligraphy text-[var(--color-gold)] mb-6 drop-shadow-md tracking-wider">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </h1>

          <p className="font-serif text-[var(--color-gold-light)] text-sm tracking-[0.2em] uppercase mb-8">
            Together with their families
          </p>

          {/* Couple Names */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <h2 className="font-serif text-4xl md:text-5xl text-glow text-white">Adil</h2>
            <span className="font-serif italic text-xl text-[var(--color-gold)]">&amp;</span>
            <h2 className="font-serif text-4xl md:text-5xl text-glow text-white">Zara</h2>
          </div>

          <p className="font-sans text-xs text-white/60 uppercase tracking-[0.1em] mb-10 max-w-[250px] leading-relaxed">
            Son of Mr. & Mrs. Ahmed <br/>
            Daughter of Mr. & Mrs. Khan
          </p>

          {/* Date & Time */}
          <div className="w-full flex items-center justify-center gap-6 mb-8 border-y border-[var(--color-gold)]/20 py-4">
            <div className="text-right">
              <span className="block font-sans text-xs text-[var(--color-gold)] tracking-widest uppercase">Nikah</span>
              <span className="block font-serif text-lg text-white">10:00 AM</span>
            </div>
            <div className="h-8 w-px bg-[var(--color-gold)]/40" />
            <div className="text-left">
              <span className="block font-sans text-xs text-[var(--color-gold)] tracking-widest uppercase">Date</span>
              <span className="block font-serif text-lg text-white">25 DEC 2026</span>
            </div>
          </div>

          {/* Venue */}
          <div className="flex flex-col items-center">
            <p className="font-serif text-lg text-white mb-1">The Royal Palace</p>
            <p className="font-sans text-xs text-white/60 tracking-wider mb-4">Dubai, UAE</p>
            
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[var(--color-gold)]/50 text-[var(--color-gold)] text-xs uppercase tracking-widest hover:bg-[var(--color-gold)]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              <MapPin size={14} />
              Open Map
            </a>
          </div>
        </motion.div>

        {/* Ornaments - Bottom */}
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[var(--color-gold)] opacity-50 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[var(--color-gold)] opacity-50 rounded-br-xl" />
      </motion.div>
    </section>
  );
}
