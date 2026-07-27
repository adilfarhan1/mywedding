"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Send, Heart, Crown } from "lucide-react";
import PetalBlast from "./RosePetalBlast";
import Image from "next/image";

type RSVPProps = {
  defaultName?: string;
  defaultSide?: "bride" | "groom" | null;  // ← new prop
  slug?: string;
  onSuccess?: () => void;
};

export default function RSVP({
  defaultName = "",
  defaultSide = null,
  slug,
  onSuccess,
}: RSVPProps) {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  // If side is known from DB, pre-fill and lock it — skip the side-select screen
  const [side, setSide] = useState<"bride" | "groom" | null>(defaultSide ?? null);
  const [name, setName] = useState(defaultName);
  const members = "1";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          attending: attending === "yes",
          members: Number(members),
          side,
          slug,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (attending === "yes") {
          window.dispatchEvent(new CustomEvent("rsvp-confirmed"));
        }
        setShowPetals(true);
        setTimeout(() => setShowPetals(false), 6000);
        setTimeout(() => onSuccess?.(), 800);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Side badge shown on attending question when side is known
  const SideBadge = () =>
    side ? (
      <div className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border mb-4 ${
        side === "bride"
          ? "bg-pink-50 border-pink-200 text-pink-500"
          : "bg-blue-50 border-blue-200 text-blue-500"
      }`}>
        {side === "bride" ? <Heart size={11} /> : <Crown size={11} />}
        {side === "bride" ? "Bride's Side" : "Groom's Side"}
      </div>
    ) : null;

  return (
    <section className="relative py-8 px-4 flex items-center justify-center">
      {showPetals && <PetalBlast />}
            {/* Background */}
            <div className="absolute inset-0 z-0">
        <Image
          src="/texture2.webp"
          alt="Background"
          fill
          priority
          quality={85}
          className="object-cover object-top"
        />
      </div>
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl p-6 md:p-10 border border-[var(--color-gold)]/30 bg-white backdrop-blur-xl text-center shadow-[0_0_60px_rgba(212,175,55,0.08)]">

          <AnimatePresence mode="wait">

            {/* ───── STEP 1: Side Selection — only shown when side is unknown ───── */}
            {!side && !submitted && (
              <motion.div
                key="side-select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-gold)] mb-3">
                  Welcome
                </h2>
                <p className="text-[#7a6a4a]/60 text-sm mb-8 tracking-wide">
                  Please select which side you are joining us from
                </p>
                <div className="grid grid-cols-2 gap-5">
                  <button
                    onClick={() => setSide("bride")}
                    className="group flex flex-col items-center justify-center gap-3 px-6 py-8 rounded-2xl border-2 border-pink-200 bg-pink-50/50 text-pink-500 hover:bg-pink-100 hover:border-pink-300 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-pink-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Heart size={20} className="text-pink-400" />
                    </div>
                    <div>
                      <p className="font-serif text-md md:text-xl text-pink-600">Bride's Side</p>
                      <p className="text-xs text-pink-400 mt-0.5 tracking-wider">عروس</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setSide("groom")}
                    className="group flex flex-col items-center justify-center gap-3 px-6 py-8 rounded-2xl border-2 border-blue-200 bg-blue-50/50 text-blue-500 hover:bg-blue-100 hover:border-blue-300 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Crown size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="font-serif text-md md:text-xl text-blue-600">Groom's Side</p>
                      <p className="text-xs text-blue-400 mt-0.5 tracking-wider">عريس</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ───── STEP 2: Attending Question — with guest name greeting ───── */}
            {side && !attending && !submitted && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SideBadge />

                {/* Guest name greeting */}
                {name && (
                  <p className="text-[#7a6a4a]/50 text-sm tracking-widest uppercase mb-1">
                    Dear
                  </p>
                )}
                {name && (
                  <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-2 capitalize">
                    {name}
                  </h2>
                )}

                <p className="text-[#7a6a4a]/60 text-sm mb-8 tracking-wide">
                  Are you attending our Nikah ceremony?
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <button
                    onClick={() => setAttending("yes")}
                    className="px-8 py-4 rounded-full border border-[#2D6A4F] bg-[#2D6A4F]/10 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                  >
                    <Check size={18} />
                    Yes, I'll Be There
                  </button>
                  <button
                    onClick={() => setAttending("no")}
                    className="px-8 py-4 rounded-full border border-[#F06293]/20 text-[#F06293] bg-[#F06293]/10 hover:border-[#F06293]/50 transition flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                  >
                    <X size={18} />
                    No, I Can't Make It
                  </button>
                </div>
              </motion.div>
            )}

            {/* ───── YES FORM ───── */}
            {side && attending === "yes" && !submitted && (
              <motion.form
                key="yes-form"
                onSubmit={handleRSVP}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6 text-left"
              >
                <div className="text-center">
                  <h3 className="text-3xl font-serif text-[var(--color-gold)]">Wonderful 🌿</h3>
                  <p className="text-[#2D6A4F]/60 text-sm mt-1">We're excited to celebrate with you</p>
                </div>

                {/* Only show side switcher if side was NOT pre-filled from DB */}
                {!defaultSide && (
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[var(--color-gold)] block mb-2">
                      You're attending as
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["bride", "groom"] as const).map((s) => (
                        <label
                          key={s}
                          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm cursor-pointer transition ${
                            side === s
                              ? s === "bride"
                                ? "bg-pink-50 border-pink-300 text-pink-600"
                                : "bg-blue-50 border-blue-300 text-blue-600"
                              : "border-[#e0d4b0] text-[#b0a080]"
                          }`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            value={s}
                            checked={side === s}
                            onChange={() => setSide(s)}
                          />
                          {s === "bride" ? <Heart size={14} /> : <Crown size={14} />}
                          {s === "bride" ? "Bride's Side" : "Groom's Side"}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs uppercase tracking-widest text-[var(--color-gold)]">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!!defaultName}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-white/40 border border-[var(--color-gold)] text-[#2D6A4F] focus:border-[var(--color-gold)] outline-none disabled:opacity-60"
                  />
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setAttending(null)}
                    className="px-6 py-3 rounded-full border border-[#544417]/20 text-[#544417]/70 uppercase text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-full bg-[var(--color-gold)] text-black uppercase text-xs flex items-center gap-2"
                  >
                    {loading ? "Sending..." : "Confirm"} <Send size={16} />
                  </button>
                </div>
              </motion.form>
            )}

            {/* ───── NO FORM ───── */}
            {side && attending === "no" && !submitted && (
              <motion.form
                key="no-form"
                onSubmit={handleRSVP}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-serif text-[var(--color-gold)] text-center">We'll Miss You 🤍</h3>

                {/* Only show side switcher if not pre-filled */}
                {!defaultSide && (
                  <div className="grid grid-cols-2 gap-3">
                    {(["bride", "groom"] as const).map((s) => (
                      <label
                        key={s}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm cursor-pointer transition ${
                          side === s
                            ? s === "bride"
                              ? "bg-pink-50 border-pink-300 text-pink-600"
                              : "bg-blue-50 border-blue-300 text-blue-600"
                            : "border-[#e0d4b0] text-[#b0a080]"
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={s}
                          checked={side === s}
                          onChange={() => setSide(s)}
                        />
                        {s === "bride" ? <Heart size={14} /> : <Crown size={14} />}
                        {s === "bride" ? "Bride's Side" : "Groom's Side"}
                      </label>
                    ))}
                  </div>
                )}

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!!defaultName}
                  className="w-full px-4 py-3 rounded-xl bg-white/40 border border-[var(--color-gold)] text-[#2D6A4F] disabled:opacity-60"
                  placeholder="Your Name"
                />

                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setAttending(null)}
                    className="px-6 py-3 rounded-full border border-[#544417]/20 text-[#544417]/70 uppercase text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-full bg-[var(--color-gold)] text-black uppercase text-xs"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </motion.form>
            )}

            {/* ───── THANK YOU ───── */}
            {submitted && (
              <motion.div
                key="thankyou"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full border border-[var(--color-gold)] flex items-center justify-center mb-6">
                  <Check size={30} className="text-[var(--color-gold)]" />
                </div>
                <p className="text-[var(--color-gold)] text-4xl mb-2">بَارَكَ اللَّهُ فِيكُمْ</p>
                <p className="text-[#2D6A4F] text-sm mb-1">May Allah bless you</p>
                <h3 className="text-3xl font-serif text-[var(--color-gold)] mb-3 capitalize">Thank You, {name}</h3>
                <p className="text-[#2D6A4F] text-sm max-w-md">
                  {attending === "yes"
                    ? "Your attendance has been confirmed. We look forward to seeing you."
                    : "Thank you for your message. You will be in our prayers."}
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}