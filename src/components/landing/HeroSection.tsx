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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${RESTAURANT.hero.backgroundImage})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-in-down mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {RESTAURANT.slogan}
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
          {RESTAURANT.hero.title.split(" ").map((word, i) => (
            <span
              key={i}
              className={i === RESTAURANT.hero.title.split(" ").length - 1 ? "gradient-text" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
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
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white border border-white/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
          >
            <Phone className="w-5 h-5 group-hover:animate-wiggle" />
            {RESTAURANT.hero.ctaSecondary.text}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <ChevronDown className="w-8 h-8 text-white/40" />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
