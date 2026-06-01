"use client";

import { useState, useEffect, useRef } from "react";

// 🎵 Replace this URL with your Arabic nasheed/song hosted file
const AUDIO_URL = "/audio/romantic.mp3";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const handleRSVP = () => {
      setVisible(true);
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    window.addEventListener("rsvp-confirmed", handleRSVP);
    return () => {
      window.removeEventListener("rsvp-confirmed", handleRSVP);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={toggle}
      title={playing ? "Pause music" : "Play music"}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9998,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
        border: "1.5px solid rgba(201,168,76,0.5)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0 4px 20px rgba(27,67,50,0.4)",
      }}
    >
      {playing
        ? [1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="music-bar" style={{ height: 10 }} />
          ))
        : <span style={{ fontSize: 20, color: "#C9A84C" }}>♪</span>
      }
    </button>
  );
}