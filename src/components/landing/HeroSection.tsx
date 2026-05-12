"use client";

import Link from "next/link";
import { RESTAURANT } from "@/constants/restaurant-data";
import { ChevronDown, Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${RESTAURANT.hero.backgroundImage})` }}
      />

      {/* Animated Ken Burns effect */}
      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1.05); }
        }
        .hero-bg-animate {
          animation: kenburns 20s ease-in-out infinite;
        }
      `}</style>

      {/* Light Overlay — for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-in-down mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 text-primary text-sm font-medium backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {RESTAURANT.slogan}
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
          {RESTAURANT.hero.title.split(" ").map((word, i) => (
            <span
              key={i}
              className={i === RESTAURANT.hero.title.split(" ").length - 1 ? "gradient-text drop-shadow-none" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
          {RESTAURANT.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={RESTAURANT.hero.ctaPrimary.href}
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          >
            <span className="relative z-10">{RESTAURANT.hero.ctaPrimary.text}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <Link
            href={RESTAURANT.hero.ctaSecondary.href}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-foreground border border-foreground/20 hover:border-primary/40 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300"
          >
            <Phone className="w-5 h-5 group-hover:animate-wiggle" />
            {RESTAURANT.hero.ctaSecondary.text}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground/50 tracking-widest uppercase">Kaydır</span>
          <ChevronDown className="w-6 h-6 text-foreground/50" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
