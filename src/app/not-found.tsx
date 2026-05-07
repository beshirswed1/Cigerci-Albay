import Link from "next/link";
import { Search, Home, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-card/40 border border-border/50 backdrop-blur-md relative overflow-hidden shadow-2xl shadow-black/5">
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 relative z-10">
          <Search className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/50 mb-4 relative z-10 font-serif">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-serif relative z-10">
          Sayfa Bulunamadı
        </h2>
        <p className="text-muted-foreground mb-10 relative z-10 text-base leading-relaxed">
          Aradığınız menü veya sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak ulaşılamıyor olabilir. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border/50 text-foreground hover:bg-secondary/30 hover:border-primary/30 transition-all font-medium"
          >
            <Map className="w-4 h-4 text-primary" />
            Menüye Göz At
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
