"use client";

import { useEffect, useState } from "react";
import { subscribeToGallery, GalleryItem } from "@/lib/firestore";
import { Camera, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function GallerySection() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToGallery((items) => {
      setImages(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background border-y border-border/50 relative overflow-hidden flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </section>
    );
  }

  if (images.length === 0) {
    return null; // Don't show the gallery section if there are no images
  }

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0A0A0A]" id="gallery">
      {/* Ultra Premium Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[10000ms] delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(10,10,10,1)_80%)] pointer-events-none" />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 max-w-7xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary mb-6 shadow-[0_0_30px_rgba(var(--primary),0.1)]">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">Görsel Şölen</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-md">
            Göz Alıcı <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Anlar</span>
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-2xl">
            Taptaze malzemeler, ustalıkla hazırlanan lezzetler ve restoranımızın eşsiz atmosferinden kareler.
          </p>
        </div>

        {/* Gallery Bento Grid - Ultra Premium Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[240px] xl:auto-rows-[280px] grid-flow-row-dense">
          {images.map((item, index) => {
            // Elegant Bento Grid Pattern
            const pattern = [
              "col-span-2 row-span-2", // Large feature
              "col-span-1 row-span-1", // Small
              "col-span-1 row-span-1", // Small
              "col-span-1 row-span-2", // Tall
              "col-span-1 row-span-1", // Small
              "col-span-2 row-span-1", // Wide
              "col-span-1 row-span-1", // Small
              "col-span-1 row-span-2", // Tall
              "col-span-1 row-span-1", // Small
              "col-span-1 row-span-1", // Small
            ];
            const spanClass = pattern[index % pattern.length];

            return (
              <div
                key={item.id}
                className={`group relative p-1 sm:p-1.5 rounded-[1.5rem] sm:rounded-[2rem] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 hover:bg-white/10 cursor-pointer transition-all duration-700 ease-out hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(var(--primary),0.2)] ${spanClass}`}
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <div className="relative w-full h-full rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden bg-[#1A1A1A]">
                  <Image
                    src={item.imageUrl}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                      <span className="text-xs sm:text-sm font-medium tracking-wide">Büyüt</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/90 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-50 group"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          <div 
            className="relative w-full max-w-6xl aspect-video sm:aspect-auto sm:h-[85vh] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 animate-in zoom-in-95 duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blurred background behind image to prevent harsh edges */}
            <div 
              className="absolute inset-0 scale-110 blur-2xl opacity-50"
              style={{ backgroundImage: `url(${selectedImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
            />
            <Image
              src={selectedImage}
              alt="Expanded Gallery Image"
              fill
              className="object-contain relative z-10"
            />
          </div>
        </div>
      )}
    </section>
  );
}
