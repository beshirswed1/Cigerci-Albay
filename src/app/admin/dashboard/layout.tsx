"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { subscribeToSettings } from "@/lib/firestore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { RESTAURANT } from "@/constants/restaurant-data";
import {
  LayoutDashboard,
  FolderOpen,
  Package,
  ClipboardList,
  LogOut,
  ChefHat,
  Menu,
  X,
  Loader2,
} from "lucide-react";

const allNavItems = [
  { label: "Panel", href: "/admin/dashboard", icon: LayoutDashboard, alwaysVisible: true },
  { label: "Kategoriler", href: "/admin/dashboard/categories", icon: FolderOpen, alwaysVisible: true },
  { label: "Ürünler", href: "/admin/dashboard/products", icon: Package, alwaysVisible: true },
  { label: "Siparişler", href: "/admin/dashboard/orders", icon: ClipboardList, alwaysVisible: false },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderingEnabled, setOrderingEnabled] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin");
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const unsub = subscribeToSettings((settings) => {
      setOrderingEnabled(settings.orderingEnabled);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  // Filter nav items based on ordering status
  const navItems = allNavItems.filter(
    (item) => item.alwaysVisible || orderingEnabled
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* ─── Sidebar ──────────────────────────────── */}
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card/30 border-r border-border/30 p-5 fixed h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif font-bold text-foreground text-sm">
              {RESTAURANT.name}
            </div>
            <div className="text-xs text-muted-foreground">Yönetim</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground/60 hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/60 hover:text-destructive hover:bg-destructive/5 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </button>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-strong border-b border-border/30">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif font-bold text-foreground text-sm">{RESTAURANT.name} Yönetim</span>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-foreground/60 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden animate-fade-in"
          />
          <aside className="fixed left-0 top-0 h-full w-72 bg-background border-r border-border/30 z-50 p-5 animate-slide-in-left lg:hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div className="font-serif font-bold text-foreground text-sm">
                  {RESTAURANT.name}
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl text-foreground/60 hover:text-foreground transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-foreground/60 hover:text-foreground hover:bg-secondary/50"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
