"use client";

import RSVP from "./RSVP";

interface Props {
  onClose: () => void;
}

export default function RSVPPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* overlay click close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* content */}
      <div className="relative w-full max-w-3xl max-h-[95vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-4 z-10">
        <RSVP />
      </div>
    </div>
  );
}