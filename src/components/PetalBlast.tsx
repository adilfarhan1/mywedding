"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
}

export default function PetalBlast() {
  const [isActive, setIsActive] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const handleRSVPConfirmed = () => {
      // Generate 50 random petals
      const newPetals = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage of screen width
        delay: Math.random() * 2, // stagger the start times
        duration: 3 + Math.random() * 4, // fall duration between 3-7s
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.8,
      }));
      setPetals(newPetals);
      setIsActive(true);

      // Stop rendering the petals after they've all fallen
      setTimeout(() => {
        setIsActive(false);
        setPetals([]);
      }, 10000); // 10 seconds is enough for all to fall
    };

    window.addEventListener("rsvp-confirmed", handleRSVPConfirmed);
    return () => window.removeEventListener("rsvp-confirmed", handleRSVPConfirmed);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ 
                top: "-10%", 
                left: `${petal.x}%`, 
                rotate: petal.rotation,
                scale: petal.scale,
                opacity: 0
              }}
              animate={{ 
                top: "110%", 
                rotate: petal.rotation + (Math.random() > 0.5 ? 360 : -360),
                opacity: [0, 1, 1, 0] // Fade in at start, fade out at bottom
              }}
              transition={{ 
                duration: petal.duration, 
                delay: petal.delay, 
                ease: "linear"
              }}
              className="absolute text-[var(--color-gold)]"
            >
              {/* Simple petal SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C12 0 17 6 17 12C17 18 12 24 12 24C12 24 7 18 7 12C7 6 12 0 12 0Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
