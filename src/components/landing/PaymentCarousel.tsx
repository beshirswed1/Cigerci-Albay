"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { CreditCard } from "lucide-react";

const paymentMethods = [
  { name: "Edenred", logo: "/edenred.png" },
  { name: "Multinet", logo: "/multinet.png" },
  { name: "Pluxee", logo: "/pluxee.png" },
  { name: "Sodexo", logo: "/sodex.png" },
  { name: "Metropol", logo: "/pos.png" },
];

export default function PaymentCarousel() {
  const { ref, isVisible } = useReveal();

  // Duplicate the items multiple times for a seamless infinite scroll
  const duplicatedItems = [
    ...paymentMethods,
    ...paymentMethods,
    ...paymentMethods,
    ...paymentMethods,
  ];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            Ödeme Yöntemleri
          </span>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Yemek kartlarınızla kolayca ödeme yapabilirsiniz
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="overflow-hidden">
            <div className="payment-carousel-track flex items-center gap-8 sm:gap-12 md:gap-16">
              {duplicatedItems.map((method, index) => (
                <div
                  key={`${method.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center p-4 sm:p-5 md:p-6 transition-all duration-300 group-hover:scale-110">
                    <Image
                      src={method.logo}
                      alt={method.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-contain drop-shadow-sm"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {method.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
