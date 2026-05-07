"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md w-full p-8 sm:p-10 rounded-3xl bg-card/40 border border-border/50 backdrop-blur-md relative overflow-hidden shadow-2xl shadow-black/5">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 relative z-10">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="text-3xl font-bold text-foreground mb-3 font-serif relative z-10">
          Eyvah! Bir Sorun Oluştu
        </h2>
        <p className="text-muted-foreground mb-8 relative z-10 text-sm sm:text-base leading-relaxed">
          İşleminizi gerçekleştirirken beklenmeyen bir hata meydana geldi. Teknik ekibimiz bilgilendirildi, lütfen tekrar deneyin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <RefreshCcw className="w-4 h-4" />
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border/50 text-foreground hover:bg-secondary/30 transition-all font-medium"
          >
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
