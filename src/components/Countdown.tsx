"use client";

import { useState, useEffect } from "react";
import { Calendar, CalendarPlus } from "lucide-react";
import Image from "next/image";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [pulseKey, setPulseKey] = useState(0);

  const targetDate = new Date("2026-11-22T10:00:00");

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

        // trigger glow animation
        setPulseKey((prev) => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateICS = () => {
    const event = {
      title: "Adil Farhan & Lubna Nasrin's Wedding",
      description: "Join us in celebrating our Nikah.",
      location: "Athafy Auditorium, Vadakara, Vallikkad Road",
      startTime: "20261122T100000Z",
      endTime: "20261122T150000Z",
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${event.startTime}
DTEND:${event.endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "wedding-invitation.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Adil+%26+Lubna%27s+Wedding&dates=20261122T100000Z/20261122T150000Z&details=Join+us+in+celebrating+our+Nikah.&location=Athafy+Auditorium";

  return (
    <section className="relative py-32 px-4 flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
  <Image
    src="/countdown-bg.webp"
    alt="Background"
    fill
    loading="lazy"
    quality={85}
    className="object-cover object-top"
  />
</div>

      {/* Overlay */}
      <div
  className="absolute top-0 inset-0 z-10"
  style={{
    background: "rgba(27, 67, 50, 0.25)",
    backdropFilter: "blur(10px)",
  }}
/>

      {/* Title */}
      <div className="relative z-20 text-center mb-16">
        <h3 className="font-serif text-3xl md:text-4xl text-[#E4C774] mb-4">
          The Countdown Begins
        </h3>
        <p className="font-sans text-sm text-[#E4C774] tracking-widest uppercase">
          Can&apos;t wait to celebrate with you
        </p>
      </div>

      {/* Timer */}
      <div className="relative z-20 flex gap-4 md:gap-8 mb-9">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">

            {/* Glow Box */}
            <div
              key={pulseKey + i + item.value}
              className="w-16 h-16 md:w-24 md:h-24 glass rounded-xl flex items-center justify-center border !border-[var(--color-gold)] bg-[var(--color-gold)]/10 shadow-[0_0_25px_rgba(212,175,55,0.15)] mb-4 animate-pulse-glow"
            >
              <span className="font-serif text-2xl md:text-4xl text-[#123d2f] animate-number-glow">
                {item.value.toString().padStart(2, "0")}
              </span>
            </div>

            <span className="font-sans text-xs text-[#E4C774] uppercase tracking-widest">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <p className="relative z-20 mb-5 font-sans text-center text-sm text-[#E4C774] tracking-widest">
          Please mark this date in your calendar and join us on the wedding day.
        </p>

      {/* Buttons */}
      <div className="relative z-20 flex flex-col sm:flex-row gap-4">
        
        <button
          onClick={generateICS}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#E4C774] bg-[var(--color-gold)]/10 text-[#E4C774] text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300"
        >
          <Calendar size={16} />
          Apple / Outlook
        </button>

        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#E4C774] bg-[var(--color-gold)]/10 text-[#E4C774] text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300"
        >
          <CalendarPlus size={16} />
          Google Calendar
        </a>
      </div>
    </section>
  );
}