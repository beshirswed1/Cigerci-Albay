"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { RESTAURANT } from "@/constants/restaurant-data";
import { Menu, X, Share2, Globe, Check } from "lucide-react";
import logo from "../../../public/logo.png";

const LANGUAGES = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("tr");
  const langRef = useRef<HTMLDivElement>(null);

  // Load Google Translate script (hidden)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Define callback for Google Translate
    (window as any).googleTranslateElementInit = () => {
      try {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "tr",
            includedLanguages: "tr,en,ar,de,fr,es,ru,zh-CN,ja,ko",
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_hidden"
        );
      } catch (e) {
        // silent
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Detect current language from cookie
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }

    // Remove hash from URL that Google Translate adds
    const removeHash = () => {
      if (window.location.hash === "#" || window.location.hash === "") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    window.addEventListener("hashchange", removeHash);
    removeHash();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", removeHash);
    };
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  const selectLanguage = useCallback((langCode: string) => {
    setCurrentLang(langCode);
    setIsLangOpen(false);

    // Trigger Google Translate via the hidden select element
    const frame = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (frame) {
      frame.value = langCode;
      frame.dispatchEvent(new Event("change"));
    } else {
      // Fallback: set cookie and reload
      const domain = window.location.hostname;
      document.cookie = `googtrans=/tr/${langCode};path=/;domain=${domain}`;
      document.cookie = `googtrans=/tr/${langCode};path=/`;
      window.location.reload();
    }

    // Clean up the hash after translation
    setTimeout(() => {
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }, 500);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: RESTAURANT.name,
      text: RESTAURANT.slogan,
      url: window.location.href.replace(/#$/, ""),
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href.replace(/#$/, ""));
        alert("Link kopyalandı!");
      }
    } catch {
      // user cancelled
    }
  };

  const currentLangData = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Language dropdown component (reused in desktop & mobile)
  const LanguageDropdown = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? "" : "py-1"} space-y-0.5`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            selectLanguage(lang.code);
            if (isMobile) setIsMobileOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
            currentLang === lang.code
              ? "bg-primary/15 text-primary font-medium"
              : "text-foreground/70 hover:text-foreground hover:bg-white/5"
          }`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="flex-1 text-left">{lang.label}</span>
          {currentLang === lang.code && (
            <Check className="w-3.5 h-3.5 text-primary" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_hidden" className="!hidden" />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong py-3 shadow-2xl shadow-black/30"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image src={logo} alt={RESTAURANT.name} width={50} height={50} className="w-12 h-12 object-contain" />
            <span className="font-serif text-xl font-bold text-foreground tracking-wide">
              {RESTAURANT.name}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {RESTAURANT.theme.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Custom Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-base leading-none">{currentLangData.flag}</span>
              </button>

              <div
                className={`absolute right-0 mt-2 w-52 glass-strong rounded-xl shadow-2xl shadow-black/50 p-1.5 z-50 transition-all duration-300 origin-top-right ${
                  isLangOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
                }`}
              >
                <LanguageDropdown />
              </div>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all"
              title="Paylaş"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Menu CTA */}
            <Link
              href="/menu"
              className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              Menü
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden glass-strong mt-2 mx-4 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300 origin-top transform ${
            isMobileOpen ? "opacity-100 scale-100 visible max-h-[600px]" : "opacity-0 scale-95 invisible max-h-0"
          }`}
        >
          <div className="p-4 space-y-1">
            {RESTAURANT.theme.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="pt-3 border-t border-border/50 mt-3 space-y-2">
              <p className="px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Dil Seçin
              </p>
              <div className="px-2 max-h-48 overflow-y-auto scrollbar-hide">
                <LanguageDropdown isMobile />
              </div>
            </div>

            <div className="pt-3 border-t border-border/50 mt-3">
              <div className="flex gap-2 px-4">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-foreground/70 border border-border hover:border-primary/30 hover:text-primary transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Paylaş
                </button>
                <Link
                  href="/menu"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 flex items-center justify-center px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
                >
                  Menü
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
