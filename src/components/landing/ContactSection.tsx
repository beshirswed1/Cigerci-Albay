"use client";

import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { Phone, MapPin, Clock, ExternalLink, ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const socialIcons: Record<string, typeof faInstagram> = {
  instagram: faInstagram,
  facebook: faFacebook,
  twitter: faTwitter,
};

const socialColors: Record<string, string> = {
  instagram: "from-pink-500 to-purple-600",
  facebook: "from-blue-500 to-blue-700",
  twitter: "from-sky-400 to-sky-600",
};

export default function ContactSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Bize Ulaşın
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            İletişim
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Bize ulaşmak, sipariş vermek veya bilgi almak için aşağıdaki kanalları kullanabilirsiniz.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-5" />
        </div>

        {/* Top Row: 3 equal cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">

          {/* Phone Card */}
          <a
            href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
            className="group p-6 sm:p-7 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6" />
            </div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Telefon</p>
            <p className="text-xl font-bold text-primary tracking-wide">{RESTAURANT.phone}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
              <span>Hemen Ara</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Address Card */}
          <a
            href="https://maps.app.goo.gl/YGhpnnFjS5ay8uf57"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 sm:p-7 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium flex items-center gap-1">
              Adres <ExternalLink className="w-3 h-3" />
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">{RESTAURANT.address}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
              <span>Yol Tarifi Al</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Working Hours Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-card/50 border border-border/50 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">Çalışma Saatleri</p>
            <div className="space-y-2">
              {RESTAURANT.workingHours.map((wh, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 px-4 rounded-xl bg-background/50 border border-border/20"
                >
                  <span className="text-foreground/70 text-sm">{wh.days}</span>
                  <span className="text-primary font-bold text-sm tracking-wide">{wh.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Social Media — full width */}
        <div className="p-6 sm:p-7 rounded-2xl bg-card/50 border border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Sosyal Medya</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Bizi takip edin, lezzetleri kaçırmayın!</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(RESTAURANT.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r ${socialColors[platform] || "from-gray-600 to-gray-800"} text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:scale-105 active:scale-95`}
                  title={platform}
                >
                  <FontAwesomeIcon
                    icon={socialIcons[platform]}
                    className="w-4.5 h-4.5"
                  />
                  <span className="capitalize">{platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
