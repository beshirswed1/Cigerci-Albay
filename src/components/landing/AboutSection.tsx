"use client";

import Image from "next/image";
import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { Leaf, ChefHat, ScrollText, Flame, Award } from "lucide-react";

const featureIcons: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-6 h-6" />,
  "chef-hat": <ChefHat className="w-6 h-6" />,
  scroll: <ScrollText className="w-6 h-6" />,
  flame: <Flame className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
};

export default function AboutSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {RESTAURANT.about.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {RESTAURANT.about.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
              <Image
                src={RESTAURANT.about.image}
                alt={RESTAURANT.about.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-primary/20 -z-10" />
            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-2 sm:left-6 glass-strong rounded-2xl px-6 py-4 shadow-2xl">
              <div className="text-3xl font-bold gradient-text">
                {new Date().getFullYear() - RESTAURANT.foundedYear}+
              </div>
              <div className="text-sm text-muted-foreground">Yıllık Deneyim</div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-8">
            <p className="text-lg text-foreground/80 leading-relaxed">
              {RESTAURANT.about.description}
            </p>

            {/* Features */}
            <div className="space-y-5">
              {RESTAURANT.about.features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-card/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    {featureIcons[feature.icon]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
