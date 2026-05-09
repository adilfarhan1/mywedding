"use client";

import { useState, useEffect } from "react";
import { Calendar, CalendarPlus } from "lucide-react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2026-12-25T10:00:00"); // 25 Dec 2026, 10 AM

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateICS = () => {
    const event = {
      title: "Adil & Zara's Wedding",
      description: "Join us in celebrating our Nikah.",
      location: "The Royal Palace, Dubai, UAE",
      startTime: "20261225T100000Z",
      endTime: "20261225T150000Z",
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AdilZaraWedding//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@adilzara.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.startTime}
DTEND:${event.endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: Adil & Zara's Wedding tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "wedding-invitation.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Adil+%26+Zara%27s+Wedding&dates=20261225T100000Z/20261225T150000Z&details=Join+us+in+celebrating+our+Nikah.&location=The+Royal+Palace,+Dubai,+UAE`;

  return (
    <section className="relative py-32 px-4 flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-4">The Countdown Begins</h3>
        <p className="font-sans text-sm text-white/60 tracking-widest uppercase">Can&apos;t wait to celebrate with you</p>
      </div>

      <div className="flex gap-4 md:gap-8 mb-16">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-24 md:h-24 glass rounded-xl flex items-center justify-center border border-[var(--color-gold)]/20 shadow-[0_0_20px_rgba(212,175,55,0.1)] mb-4">
              <span className="font-serif text-2xl md:text-4xl text-white text-glow">
                {item.value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="font-sans text-xs text-[var(--color-gold)] uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={generateICS}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 glass text-white text-xs uppercase tracking-widest hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300"
        >
          <Calendar size={16} />
          Apple / Outlook
        </button>
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300"
        >
          <CalendarPlus size={16} />
          Google Calendar
        </a>
      </div>
    </section>
  );
}
