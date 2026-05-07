import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground z-50">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse-glow pointer-events-none" />
        
        <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center bg-card/50 backdrop-blur-sm relative z-10 shadow-xl shadow-primary/5">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
      <h2 className="mt-8 text-xl font-medium text-foreground tracking-wide font-serif">
        Yükleniyor...
      </h2>
      <p className="text-muted-foreground mt-2 text-sm max-w-xs text-center">
        Lütfen bekleyin, en lezzetli anlar hazırlanıyor.
      </p>
    </div>
  );
}
