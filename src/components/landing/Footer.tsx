"use client";

import Link from "next/link";
import Image from "next/image";
import { RESTAURANT } from "@/constants/restaurant-data";
import logo from "../../../public/logo.png";
import { Heart, ArrowUp, Settings, LucideCheckCircle2, LucideMoveRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }
  return phone;
}

const socialIcons: Record<string, typeof faInstagram> = {
  instagram: faInstagram,
  facebook: faFacebook,
  twitter: faTwitter,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-20 pb-8 bg-card/30 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src={logo} alt={RESTAURANT.name} width={50} height={50} className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold text-foreground">
                {RESTAURANT.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {RESTAURANT.shortDescription}
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {Object.entries(RESTAURANT.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <FontAwesomeIcon icon={socialIcons[platform]} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {RESTAURANT.theme.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">İletişim</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                  {formatPhone(RESTAURANT.phone)}
                </a>
              </li>
              {Boolean((RESTAURANT as any).email) && (
                <li>
                  <a href={`mailto:${(RESTAURANT as any).email}`} className="hover:text-primary transition-colors">
                    {(RESTAURANT as any).email}
                  </a>
                </li>
              )}
              <li>{RESTAURANT.address}</li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Çalışma Saatleri</h4>
            <ul className="space-y-3">
              {RESTAURANT.workingHours.map((wh, i) => (
                <li key={i} className="text-sm">
                  <span className="text-muted-foreground">{wh.days}</span>
                  <br />
                  <span className="text-primary font-medium">{wh.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-6 mt-16 flex flex-col xl:flex-row items-center justify-between gap-6">
          
          <div className="flex-1 hidden xl:block" /> {/* Spacer for centering symmetry */}

          {/* Developer Credit */}
          <div className="flex items-center justify-center flex-[2] w-full">
            <p className="text-sm text-muted-foreground text-center leading-relaxed flex items-center justify-center gap-2.5 flex-wrap">
              <span className="opacity-80">Bu proje tamamen profesyonel geliştirici</span>
              <a
                href="https://beshir.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full hover:bg-primary/20 transition-all duration-300 tracking-wide border border-primary/20 group hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                Beshir
                <LucideCheckCircle2 className="w-4 h-4 text-emerald-500 drop-shadow-sm" />
                <LucideMoveRight className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <span className="opacity-80">tarafından yapılmıştır.</span>
            </p>
          </div>

          {/* Admin & Scroll Controls */}
          <div className="flex items-center justify-center xl:justify-end gap-4 flex-1">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <Settings className="w-3 h-3" />
              Yönetim
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              title="Yukarı çık"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
