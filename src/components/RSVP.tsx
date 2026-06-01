"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Send } from "lucide-react";

type RSVPProps = {
  defaultName?: string;
};

export default function RSVP({ defaultName = "" }: RSVPProps) {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState(defaultName);
  const [members, setMembers] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          attending: attending === "yes",
          members: Number(members),
        }),
      });

      if (res.ok) {
        setSubmitted(true);

        if (attending === "yes") {
          window.dispatchEvent(new CustomEvent("rsvp-confirmed"));
        }
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

  return (
    <section className="relative py-28 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">

        <div className="rounded-3xl p-6 md:p-10 border border-[var(--color-gold)]/30 bg-[white] backdrop-blur-xl text-center shadow-[0_0_60px_rgba(212,175,55,0.08)]">

          <AnimatePresence mode="wait">

            {/* ───── QUESTION ───── */}
            {!attending && !submitted && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-gold)] mb-8">
                  Are You Attending?
                </h2>

                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <button
                    onClick={() => setAttending("yes")}
                    className="px-8 py-4 rounded-full border border-[#2D6A4F] bg-[#2D6A4F]/10 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                  >
                    <Check size={18} />
                    Yes, I’ll Be There
                  </button>

                  <button
                    onClick={() => setAttending("no")}
                    className="px-8 py-4 rounded-full border border-[#F06293]/20 text-[#F06293] bg-[#F06293]/10 hover:border-[#F06293]/50 transition flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                  >
                    <X size={18} />
                    No, I Can’t Make It
                  </button>
                </div>
              </motion.div>
            )}

            {/* ───── YES FORM ───── */}
            {attending === "yes" && !submitted && (
              <motion.form
                key="yes-form"
                onSubmit={handleRSVP}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6 text-left"
              >
                <h3 className="text-3xl font-serif text-[var(--color-gold)] text-center">
                  Wonderful 🌿
                </h3>

                <p className="text-center text-[#2D6A4F]/60 text-sm">
                  We’re excited to celebrate with you
                </p>

                <div>
                  <label className="text-xs uppercase tracking-widest text-[var(--color-gold)]">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!!defaultName}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-white/40 border border-[var(--color-gold)] text-[#2D6A4F] focus:border-[var(--color-gold)] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-[var(--color-gold)]">
                    Members
                  </label>
                  <select
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-white/40 border border-[var(--color-gold)] text-[#2D6A4F] focus:border-[var(--color-gold)] outline-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
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
                    {loading ? "Sending..." : "Confirm"}
                    <Send size={16} />
                  </button>
                </div>
              </motion.form>
            )}

            {/* ───── NO FORM ───── */}
            {attending === "no" && !submitted && (
              <motion.form
                key="no-form"
                onSubmit={handleRSVP}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl font-serif text-[var(--color-gold)] text-center">
                  We’ll Miss You 🤍
                </h3>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/40 border border-[var(--color-gold)] text-[#2D6A4F]"
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

                <p className="text-[var(--color-gold)] text-4xl mb-2">
                  بَارَكَ اللَّهُ فِيكُمْ
                </p>

                <p className="text-[#2D6A4F] text-sm mb-1">
                  May Allah bless you
                </p>

                <h3 className="text-3xl font-serif text-[var(--color-gold)] mb-3">
                  Thank You, {name}
                </h3>

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