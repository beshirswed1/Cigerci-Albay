"use client";

import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { Star, Quote, MessageCircle } from "lucide-react";

export default function ReviewsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="reviews" className="py-16 sm:py-24 relative">
      {/* Background Gradients for seamless blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Müşteri Deneyimleri
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Google Haritalar üzerinden gerçek müşteri yorumları
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-5" />
        </div>

        {/* Reviews Grid */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible gap-5 lg:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {RESTAURANT.reviews.map((review, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-auto group relative p-6 sm:p-7 rounded-2xl bg-card/40 border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/5 group-hover:text-primary/15 transition-colors duration-500" />

              {/* Author Info */}
              <div className="flex items-center gap-3.5 mb-5 relative z-10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20 shadow-inner">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{review.date}</div>
                </div>
              </div>

              {/* Stars — gold color for visibility */}
              <div className="flex gap-0.5 mb-4 relative z-10">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/20"}`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground/75 text-sm leading-relaxed flex-grow relative z-10">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Google Maps Link */}
        <div className="text-center mt-10">
          <a
            href="https://maps.app.goo.gl/YGhpnnFjS5ay8uf57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            Tüm Google yorumları Gör
          </a>
        </div>
      </div>
    </section>
  );
}
