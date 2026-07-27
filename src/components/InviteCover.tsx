"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";

interface InviteCoverProps {
  guestName?: string;
  onOpen: () => void;
}

export default function InviteCover({ guestName, onOpen }: InviteCoverProps) {
  return (
    <motion.div
      key="invite-cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-[9997] flex flex-col items-center justify-center px-6 py-10 text-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 15%, rgba(64,145,108,0.16) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 85%, rgba(201,168,76,0.14) 0%, transparent 55%),
          #FAF7F0
        `,
      }}
    >
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image src="/wedBg.webp" alt="" fill priority className="object-cover" />
      </div>

      {/* Corner ornaments */}
      {(["tl", "tr", "bl", "br"] as const).map((c) => (
        <div
          key={c}
          style={{
            position: "absolute",
            [c.includes("t") ? "top" : "bottom"]: 22,
            [c.includes("l") ? "left" : "right"]: 22,
            width: 32,
            height: 32,
            borderTop: c.includes("t") ? "2px solid #C9A84C" : "none",
            borderBottom: c.includes("b") ? "2px solid #C9A84C" : "none",
            borderLeft: c.includes("l") ? "2px solid #C9A84C" : "none",
            borderRight: c.includes("r") ? "2px solid #C9A84C" : "none",
            opacity: 0.55,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.1, ease: "easeOut" }}
        className="calligraphy text-2xl mb-7"
        style={{ color: "var(--color-emerald)" }}
      >
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="uppercase mb-6"
        style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: 10.5,
          letterSpacing: "0.42em",
          color: "var(--color-emerald-light)",
        }}
      >
        Two Hearts &middot; One Beginning
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8"
      >
        <motion.p
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="leading-none text-glow"
          style={{
            fontFamily: "var(--font-rouge), cursive",
            fontSize: "clamp(2.8rem, 10vw, 5rem)",
            color: "var(--color-emerald)",
          }}
        >
          Adil Farhan
        </motion.p>

        <span
          className="block my-3"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontSize: 15,
            letterSpacing: "0.5em",
            color: "var(--color-gold)",
          }}
        >
          &amp;
        </span>

        <motion.p
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="leading-none italic text-glow"
          style={{
            fontFamily: "var(--font-rouge), cursive",
            fontSize: "clamp(2.8rem, 10vw, 5rem)",
            color: "var(--color-emerald)",
          }}
        >
          Lubna Nasrin
        </motion.p>
      </motion.div>

      {guestName && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xs mb-2 tracking-[0.3em] uppercase"
            style={{ color: "var(--color-ink-soft)", opacity: 0.65 }}
          >
            Joyfully Requesting the Presence of
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="font-serif text-2xl mb-8 capitalize"
            style={{ fontFamily: "var(--font-garamond)", color: "var(--color-gold)" }}
          >
            {guestName}
          </motion.p>
        </>
      )}

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: guestName ? 1.35 : 1.1, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onOpen}
        className="animate-pulse-glow inline-flex items-center gap-3 px-9 py-4 rounded-full uppercase tracking-[0.25em] text-xs cursor-pointer"
        style={{
          border: "1px solid var(--color-gold)",
          background: "rgba(201,168,76,0.12)",
          color: "var(--color-emerald)",
        }}
      >
        <Mail size={15} />
        Open Invitation
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: guestName ? 1.6 : 1.35, duration: 0.8 }}
        className="mt-5 text-[10px] uppercase tracking-[0.3em]"
        style={{ color: "var(--color-emerald-light)", opacity: 0.6 }}
      >
        Tap to unveil our story
      </motion.p>
    </motion.div>
  );
}
