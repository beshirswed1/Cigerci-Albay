"use client";

import { useEffect, useState, useRef } from "react";
import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { Award, Users, UtensilsCrossed, Star, Clock } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  utensils: <UtensilsCrossed className="w-8 h-8" />,
  star: <Star className="w-8 h-8" />,
  watch: <Clock className="w-8 h-8" />,
};

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const isDecimal = end % 1 !== 0;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count % 1 !== 0 ? count.toFixed(1) : count.toLocaleString("tr-TR")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div
        ref={ref}
        className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {RESTAURANT.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 text-center transition-all duration-500 card-hover"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  {iconMap[stat.icon]}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2 font-serif">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
