"use client";

import { useEffect, useState, useRef } from "react";
import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { Award, Users, UtensilsCrossed, Star, Clock } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-7 h-7" />,
  users: <Users className="w-7 h-7" />,
  utensils: <UtensilsCrossed className="w-7 h-7" />,
  star: <Star className="w-7 h-7" />,
  watch: <Clock className="w-7 h-7" />,
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
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div
        ref={ref}
        className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {RESTAURANT.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative p-5 sm:p-7 rounded-2xl bg-card/40 border border-border/40 hover:border-primary/30 text-center transition-all duration-500 card-hover"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                  {iconMap[stat.icon]}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
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
