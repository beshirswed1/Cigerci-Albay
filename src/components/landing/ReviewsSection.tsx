"use client";

import { RESTAURANT } from "@/constants/restaurant-data";
import { useReveal } from "@/hooks/useReveal";
import { Star, Quote, MessageCircle } from "lucide-react";

export default function ReviewsSection() {
  const { ref, isVisible } = useReveal();



  return (
    <section id="reviews" className="py-24 sm:py-32 relative bg-card/10">
      {/* Background Gradients for seamless blending */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Müşteri Deneyimleri
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Müşterilerimiz Ne Diyor?
          </h2>

          {/* Average Rating Badge */}

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {RESTAURANT.reviews.map((review, i) => (
            <div
              key={i}
              className="group relative p-6 sm:p-8 rounded-3xl bg-background border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/5 group-hover:text-primary/15 transition-colors duration-500" />

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20 shadow-inner">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{review.date}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= review.rating ? "text-accent fill-accent" : "text-muted-foreground/20"}`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground/80 text-sm leading-relaxed flex-grow relative z-10 font-medium">
                {review.comment}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
