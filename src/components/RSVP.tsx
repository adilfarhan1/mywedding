"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Send } from "lucide-react";

export default function RSVP({ defaultName = "" }: { defaultName?: string }) {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState(defaultName);
  const [members, setMembers] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending: attending === "yes", members: Number(members) }),
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
    <section className="relative py-32 px-4 flex flex-col items-center justify-center max-w-2xl mx-auto">
      <div className="glass rounded-3xl p-8 md:p-12 border border-[var(--color-gold)]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] w-full text-center relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!attending && !submitted && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-8">Are You Attending?</h3>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => setAttending("yes")}
                  className="w-full sm:w-auto px-10 py-4 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black transition-all flex items-center justify-center gap-3 font-sans uppercase tracking-widest text-sm"
                >
                  <Check size={18} />
                  Yes, I&apos;ll be there
                </button>
                <button
                  onClick={() => setAttending("no")}
                  className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/20 text-white hover:border-white/50 transition-all flex items-center justify-center gap-3 font-sans uppercase tracking-widest text-sm"
                >
                  <X size={18} />
                  No, I can&apos;t make it
                </button>
              </div>
            </motion.div>
          )}

          {attending === "yes" && !submitted && (
            <motion.form
              key="yes-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleRSVP}
              className="flex flex-col gap-6"
            >
              <h3 className="font-serif text-3xl text-[var(--color-gold)] mb-2">Wonderful!</h3>
              <p className="text-white/70 text-sm tracking-wider uppercase mb-4">We can&apos;t wait to see you.</p>

              <div className="text-left">
                <label className="block text-[var(--color-gold)] text-xs uppercase tracking-widest mb-2">Guest / Family Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!!defaultName}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors disabled:opacity-50"
                  placeholder="e.g. Mr. & Mrs. Khan"
                />
              </div>

              <div className="text-left mb-4">
                <label className="block text-[var(--color-gold)] text-xs uppercase tracking-widest mb-2">Number of Members Attending</label>
                <select
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num} className="bg-[#111]">{num}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(null)}
                  className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-widest transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 transition-all"
                >
                  {loading ? "Confirming..." : "Confirm Attendance"}
                  {!loading && <Send size={16} />}
                </button>
              </div>
            </motion.form>
          )}

          {attending === "no" && !submitted && (
            <motion.form
              key="no-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleRSVP}
              className="flex flex-col gap-6"
            >
              <h3 className="font-serif text-3xl text-white mb-2">We will miss you!</h3>
              <p className="text-white/50 text-sm tracking-wider max-w-sm mx-auto mb-4">
                Thank you for letting us know. You will be in our hearts on our special day.
              </p>

              <div className="text-left mb-6">
                <label className="block text-[var(--color-gold)] text-xs uppercase tracking-widest mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!!defaultName}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors disabled:opacity-50"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(null)}
                  className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-widest transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-gold)] disabled:opacity-50 transition-all"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </motion.form>
          )}

          {submitted && (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8"
            >
              <div className="w-20 h-20 rounded-full border border-[var(--color-gold)] text-[var(--color-gold)] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Heart size={32} />
              </div>
              <h3 className="font-serif text-3xl text-[var(--color-gold)] mb-4">Thank You, {name}!</h3>
              <p className="text-white/70 text-sm tracking-wider">
                {attending === "yes" 
                  ? "Your attendance has been confirmed. See you at the Nikah!" 
                  : "We have received your message. Thank you for your blessings."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// We need a Heart icon here since we use it above
function Heart({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
}
