"use client";

import { CreditCard, QrCode, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function GiftSection() {
  return (
    <section className="relative py-32 px-4 flex flex-col items-center justify-center max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <HeartHandshake className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
        <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-4">Send Your Blessings</h3>
        <p className="font-sans text-sm text-white/60 tracking-widest uppercase max-w-lg mx-auto leading-relaxed">
          Your presence is our biggest gift. However, if you wish to bless us with a gift, you may use the options below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {/* Google Pay */}
        <motion.a
          whileHover={{ y: -10 }}
          href="https://pay.google.com" // Placeholder
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-8 glass rounded-2xl border border-[var(--color-gold)]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:border-[var(--color-gold)] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-gold)]/10 transition-colors">
            <CreditCard className="w-8 h-8 text-white group-hover:text-[var(--color-gold)] transition-colors" />
          </div>
          <h4 className="font-serif text-xl text-white mb-2">Google Pay</h4>
          <span className="font-sans text-xs text-white/40 uppercase tracking-widest">Send Securely</span>
        </motion.a>

        {/* QR Code Placeholder */}
        <motion.div
          whileHover={{ y: -10 }}
          className="flex flex-col items-center justify-center p-8 glass rounded-2xl border border-[var(--color-gold)]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:border-[var(--color-gold)] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all group"
        >
          <div className="w-40 h-40 bg-white p-2 rounded-xl mb-6 shadow-inner flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
            <QrCode className="w-full h-full text-black/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
          </div>
          <h4 className="font-serif text-xl text-white mb-2">Scan QR</h4>
          <span className="font-sans text-xs text-[var(--color-gold)] uppercase tracking-widest">Bank Transfer</span>
        </motion.div>

        {/* Apple Pay */}
        <motion.a
          whileHover={{ y: -10 }}
          href="https://apple.com/apple-pay" // Placeholder
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-8 glass rounded-2xl border border-[var(--color-gold)]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:border-[var(--color-gold)] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-gold)]/10 transition-colors">
            <CreditCard className="w-8 h-8 text-white group-hover:text-[var(--color-gold)] transition-colors" />
          </div>
          <h4 className="font-serif text-xl text-white mb-2">Apple Pay</h4>
          <span className="font-sans text-xs text-white/40 uppercase tracking-widest">Send Securely</span>
        </motion.a>
      </div>
    </section>
  );
}
