"use client";

import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { MapPin } from "lucide-react";

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/YGhpnnFjS5ay8uf57";

export default function MapSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Neredeyiz?
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Konumumuz
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Map Container */}
        <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-black/20">
          <iframe
            src={RESTAURANT.mapEmbedUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            title="Restoran Konumu"
          />

          {/* Address Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-sm">
            <div className="glass-strong rounded-2xl p-5 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{RESTAURANT.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{RESTAURANT.address}</p>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-primary font-medium hover:underline"
                  >
                    Yol Tarifi Al →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
