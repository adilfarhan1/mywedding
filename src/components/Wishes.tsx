"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Send, Quote } from "lucide-react";

type Wish = {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const loadWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data.wishes || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        setName("");
        setMessage("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        await loadWishes();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#faf7f0" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" style={fadeUp(0)}>
          <p
            className="tracking-[0.45em] uppercase mb-4"
            style={{ fontFamily: "Georgia, serif", fontSize: 11, color: "#c9a84c" }}
          >
            ✦ &nbsp; Blessings &nbsp; ✦
          </p>

          <h2
            style={{
              fontFamily: "var(--font-rouge), cursive",
              fontSize: "clamp(2.4rem, 6vw, 3.4rem)",
              color: "var(--color-emerald)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Wishes for Us
          </h2>

          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span style={{ color: "#c9a84c", fontSize: 10 }}>✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>

          <p
            className="mx-auto leading-[1.85]"
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "#9a8860",
              fontSize: "clamp(13px, 2.4vw, 14.5px)",
              maxWidth: 460,
            }}
          >
            Leave us a message, a du&apos;a, or a blessing — we will treasure
            every word as we begin this new chapter together.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ ...fadeUp(0.2), backgroundColor: "#fff", border: "1px solid #e8dfc0", borderRadius: 20 }}
          className="p-6 md:p-8 mb-12 shadow-sm"
        >
          <div className="grid gap-4">
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-4 py-3 text-sm text-[#3a3020] focus:outline-none focus:border-[#c9a84c] transition"
            />
            <textarea
              required
              rows={3}
              placeholder="Your message, du'a, or blessing for the couple…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#faf7f0] border border-[#e0d4b0] rounded-xl px-4 py-3 text-sm text-[#3a3020] focus:outline-none focus:border-[#c9a84c] transition resize-none"
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9a84c] text-white text-xs uppercase tracking-widest hover:bg-[#b8973b] transition disabled:opacity-60"
            >
              <Send size={14} />
              {submitting ? "Sending…" : "Add Blessing"}
            </button>
            {success && (
              <span className="text-xs text-[#2D6A4F] italic">
                ✓ Jazakallahu Khayran!
              </span>
            )}
          </div>
        </form>

        {/* Wall */}
        {loading ? (
          <div className="text-center py-12 text-[#b0a080] text-sm">
            Loading wishes…
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-12" style={fadeUp(0.3)}>
            <Heart size={22} className="mx-auto mb-3 text-[#c9a84c]/40" />
            <p className="italic text-sm text-[#b0a080]">
              Be the first to leave a blessing.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5" style={fadeUp(0.3)}>
            {wishes.map((w) => (
              <div
                key={w._id}
                className="relative bg-white rounded-2xl p-6 border border-[#e8dfc0] shadow-sm"
              >
                <Quote size={18} className="absolute top-4 right-4 text-[#c9a84c]/15" />
                <p
                  className="italic text-[#5c4a2a] text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {w.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#7a6a4a]">
                    — {w.name}
                  </span>
                  <span className="text-[10px] text-[#c0b898]">
                    {timeAgo(w.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
