"use client";

import { Phone } from "lucide-react";
import { RESTAURANT } from "@/constants/restaurant-data";

export default function FloatingCallButton() {
  const phoneNumber = RESTAURANT.phone.replace(/\D/g, "");

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-6 right-6 z-50 group"
      title="Hemen Ara"
      aria-label="Telefon ile ara"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping-slow" />
      
      {/* Button */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95">
        <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-card border border-border/50 text-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
        Hemen Ara
      </span>
    </a>
  );
}
