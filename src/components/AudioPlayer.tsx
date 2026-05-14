"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleRSVPConfirmed = () => {
      setShowButton(true);
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay was prevented
        });
      }
    };

    window.addEventListener("rsvp-confirmed", handleRSVPConfirmed);

    return () => {
      window.removeEventListener("rsvp-confirmed", handleRSVPConfirmed);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* 
        Ensure you place a romantic.mp3 inside public/audio/
        For now, this uses a placeholder empty path or fails silently.
      */}
      <audio ref={audioRef} loop src="/audio/romantic.mp3" />

      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass bg-white/10 border border-white/20 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300"
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      )}
    </>
  );
}
