"use client";

import { useState } from "react";
import { Check, X, Send } from "lucide-react";

export default function RSVPPopup({ onClose }: { onClose: () => void }) {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState("");
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
        window.dispatchEvent(new CustomEvent("rsvp-confirmed")); // triggers music
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(10,26,18,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="popup-card glass rounded-2xl p-8 md:p-12 w-full max-w-[480px] relative text-center"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.4)", border: "1px solid rgba(201,168,76,0.3)" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-xl opacity-40 hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer">
          ✕
        </button>

        {/* Corner ornaments */}
        {(["tl","tr","bl","br"] as const).map((c) => (
          <div key={c} style={{
            position:"absolute",
            [c.includes("t")?"top":"bottom"]: 10,
            [c.includes("l")?"left":"right"]: 10,
            width: 20, height: 20,
            borderTop: c.includes("t") ? "1.5px solid #C9A84C" : "none",
            borderBottom: c.includes("b") ? "1.5px solid #C9A84C" : "none",
            borderLeft: c.includes("l") ? "1.5px solid #C9A84C" : "none",
            borderRight: c.includes("r") ? "1.5px solid #C9A84C" : "none",
            opacity: 0.6,
          }} />
        ))}

        {!attending && !submitted && (
          <div>
            <p style={{ fontFamily:"var(--font-cinzel)", fontSize:9, letterSpacing:"0.35em", color:"var(--color-gold)", textTransform:"uppercase", marginBottom:10 }}>Kindly Reply</p>
            <h3 style={{ fontFamily:"var(--font-garamond)", fontSize:"clamp(1.6rem,4vw,2.2rem)", fontWeight:300, color:"var(--color-emerald)", marginBottom:20 }}>
              Will You Join Us?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setAttending("yes")} className="flex items-center justify-center gap-2 px-8 py-3 rounded-full transition-all"
                style={{ border:"1px solid var(--color-emerald)", background:"var(--color-emerald)", color:"var(--color-gold-pale)", fontFamily:"var(--font-cinzel)", fontSize:10, letterSpacing:"0.15em", cursor:"pointer" }}>
                <Check size={16}/> Yes, I'll be there
              </button>
              <button onClick={() => setAttending("no")} className="flex items-center justify-center gap-2 px-8 py-3 rounded-full transition-all"
                style={{ border:"1px solid rgba(0,0,0,0.2)", background:"transparent", fontFamily:"var(--font-cinzel)", fontSize:10, letterSpacing:"0.15em", cursor:"pointer" }}>
                <X size={16}/> Can't make it
              </button>
            </div>
          </div>
        )}

        {attending && !submitted && (
          <form onSubmit={handleRSVP} className="flex flex-col gap-5">
            <h3 style={{ fontFamily:"var(--font-garamond)", fontSize:"clamp(1.5rem,4vw,2rem)", fontWeight:300, color:"var(--color-emerald)" }}>
              {attending === "yes" ? "Wonderful! 🌿" : "We'll Miss You 🤍"}
            </h3>
            <div className="text-left">
              <label style={{ fontFamily:"var(--font-cinzel)", fontSize:9, letterSpacing:"0.2em", color:"var(--color-gold)", textTransform:"uppercase", display:"block", marginBottom:7 }}>
                {attending === "yes" ? "Guest / Family Name" : "Your Name"}
              </label>
              <input required value={name} onChange={(e) => setName(e.target.value)}
                className="inp" placeholder="Enter your name"
                style={{ width:"100%", background:"rgba(255,255,255,0.85)", border:"1px solid rgba(201,168,76,0.4)", borderRadius:8, padding:"12px 16px", fontFamily:"var(--font-garamond)", fontSize:15, outline:"none" }}
              />
            </div>
            {attending === "yes" && (
              <div className="text-left">
                <label style={{ fontFamily:"var(--font-cinzel)", fontSize:9, letterSpacing:"0.2em", color:"var(--color-gold)", textTransform:"uppercase", display:"block", marginBottom:7 }}>
                  Number Attending
                </label>
                <select value={members} onChange={(e) => setMembers(e.target.value)}
                  style={{ width:"100%", background:"rgba(255,255,255,0.85)", border:"1px solid rgba(201,168,76,0.4)", borderRadius:8, padding:"12px 16px", fontFamily:"var(--font-garamond)", fontSize:15, outline:"none" }}>
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} {n===1?"Person":"People"}</option>)}
                </select>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button type="button" onClick={() => setAttending(null)}
                style={{ padding:"10px 20px", borderRadius:40, border:"1px solid rgba(0,0,0,0.18)", background:"transparent", fontFamily:"var(--font-cinzel)", fontSize:10, cursor:"pointer" }}>
                ← Back
              </button>
              <button type="submit" disabled={loading}
                style={{ padding:"12px 28px", borderRadius:40, background:"linear-gradient(135deg,#1B4332,#2D6A4F)", color:"#F4E4B0", border:"none", fontFamily:"var(--font-cinzel)", fontSize:10, letterSpacing:"0.15em", cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                {loading ? "Sending..." : <>{attending==="yes" ? "Confirm Attendance" : "Send Message"} <Send size={14}/></>}
              </button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="py-6">
            <div style={{ fontSize:44, marginBottom:16 }}>💚</div>
            <h3 style={{ fontFamily:"var(--font-garamond)", fontSize:"clamp(1.5rem,4vw,2rem)", fontWeight:300, color:"var(--color-emerald)", marginBottom:8 }}>
              Thank You, {name}!
            </h3>
            <p style={{ fontFamily:"var(--font-garamond)", fontSize:15, color:"var(--color-ink-soft)", lineHeight:1.8, marginBottom:16 }}>
              {attending==="yes" ? "Your attendance is confirmed. See you at the Nikah!" : "Thank you for your blessings."}
            </p>
            <div className="calligraphy" style={{ fontSize:19, color:"var(--color-emerald-light)", marginBottom:20 }}>
              جَزَاكُمُ اللَّهُ خَيْرًا
            </div>
            <button onClick={onClose} style={{ padding:"10px 24px", borderRadius:40, border:"1.5px solid var(--color-emerald)", background:"transparent", fontFamily:"var(--font-cinzel)", fontSize:10, color:"var(--color-emerald)", cursor:"pointer", letterSpacing:"0.15em" }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}