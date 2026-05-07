"use client";

import { useState } from "react";
import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { Phone, MapPin, Clock, ExternalLink, ArrowRight, Send, MessageCircle } from "lucide-react";
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

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }
  return phone;
}

export default function ContactSection() {
  const { ref, isVisible } = useReveal();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent(
      `Merhaba, ben ${formState.name}.\nTelefon: ${formState.phone}\n\n${formState.message}`
    );
    const whatsappNumber = RESTAURANT.whatsapp || RESTAURANT.phone.replace(/\D/g, "").replace(/^0/, "90");
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            İletişim
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Bize Ulaşın
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Rezervasyon, sipariş veya sorularınız için bize ulaşabilirsiniz. Sizi ağırlamaktan mutluluk duyarız.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-5" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Info Cards */}
          <div className="flex flex-col gap-4">
            {/* Phone */}
            <a
              href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
              className="group flex items-center gap-4 sm:gap-5 rounded-2xl bg-card/50 border border-border/50 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Telefon</p>
                <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{formatPhone(RESTAURANT.phone)}</p>
              </div>
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${RESTAURANT.whatsapp || RESTAURANT.phone.replace(/\D/g, "").replace(/^0/, "90")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 sm:gap-5 rounded-2xl bg-card/50 border border-border/50 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:border-[#25D366]/40 hover:-translate-y-1"
            >
              <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 text-[#25D366] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">WhatsApp</p>
                <p className="text-sm font-bold text-foreground group-hover:text-[#25D366] transition-colors">Hızlı mesaj gönderin</p>
              </div>
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>

            {/* Address */}
            <a
              href="https://maps.app.goo.gl/YGhpnnFjS5ay8uf57"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 sm:gap-5 rounded-2xl bg-card/50 border border-border/50 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium flex items-center gap-1">Adres <ExternalLink className="w-3 h-3" /></p>
                <p className="text-sm font-medium text-foreground/90 leading-snug line-clamp-2">{RESTAURANT.address}</p>
              </div>
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>

            {/* Working Hours & Social */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-card/50 border border-border/50 p-4 sm:p-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Çalışma Saatleri</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  {RESTAURANT.workingHours.map((wh, i) => (
                    <div key={i} className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
                      <span className="text-foreground/70">{wh.days}</span>
                      <span className="text-primary font-bold">{wh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-card/50 border border-border/50 p-4 sm:p-5 flex flex-col justify-center">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">Sosyal Medya</p>
                <div className="flex flex-wrap gap-2.5">
                  {Object.entries(RESTAURANT.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${socialColors[platform] || "from-gray-600 to-gray-800"} text-white text-xs font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95`}
                      title={platform}
                    >
                      <FontAwesomeIcon icon={socialIcons[platform]} className="w-4 h-4" />
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="rounded-2xl bg-card/50 border border-border/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-center">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20 text-green-500 mb-4">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Mesajınız İletiliyor!</h3>
                <p className="text-muted-foreground">
                  WhatsApp uygulamasına yönlendiriliyorsunuz. Lütfen mesajınızı oradan gönderin.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-border/50 text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-foreground mb-6">Bize Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all placeholder:text-muted-foreground/50"
                      placeholder="Örn: Ahmet Yılmaz"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground/80">
                      Telefon Numaranız
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all placeholder:text-muted-foreground/50"
                      placeholder="Örn: 05xx xxx xx xx"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all placeholder:text-muted-foreground/50 resize-none"
                      placeholder="Size nasıl yardımcı olabiliriz?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] mt-2"
                  >
                    <span>WhatsApp'tan Gönder</span>
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

