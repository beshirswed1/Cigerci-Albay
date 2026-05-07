"use client";

import { useEffect, useState } from "react";
import { getCategories, getMenuItems, subscribeToOrders, subscribeToSettings, setOrderingEnabled } from "@/lib/firestore";
import type { Order } from "@/lib/firestore";
import { Package, FolderOpen, Clock, CheckCircle2, TrendingUp, ShoppingCart, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [orderingEnabled, setOrderingEnabledState] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      const [cats, items] = await Promise.all([getCategories(), getMenuItems()]);
      setStats((prev) => ({
        ...prev,
        categories: cats.length,
        products: items.length,
      }));
    };
    loadStats();

    const unsubOrders = subscribeToOrders((orders: Order[]) => {
      setStats((prev) => ({
        ...prev,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        completedOrders: orders.filter((o) => o.status === "completed").length,
      }));
    });

    const unsubSettings = subscribeToSettings((settings) => {
      setOrderingEnabledState(settings.orderingEnabled);
    });

    return () => {
      unsubOrders();
      unsubSettings();
    };
  }, []);

  const handleToggleOrdering = async () => {
    setToggling(true);
    try {
      await setOrderingEnabled(!orderingEnabled);
      toast.success(
        !orderingEnabled
          ? "Sipariş sistemi açıldı! Müşteriler artık sipariş verebilir."
          : "Sipariş sistemi kapatıldı! Menü sadece görüntüleme modunda."
      );
    } catch {
      toast.error("Ayar güncellenemedi. Tekrar deneyin.");
    } finally {
      setToggling(false);
    }
  };

  const cards = [
    {
      label: "Kategoriler",
      value: stats.categories,
      icon: FolderOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Ürünler",
      value: stats.products,
      icon: Package,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Bekleyen Siparişler",
      value: stats.pendingOrders,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Tamamlanan",
      value: stats.completedOrders,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Genel Bakış
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Restoranınızın anlık durumu
        </p>
      </div>

      {/* ─── Ordering Toggle Card ────────────────── */}
      <div className={`mb-8 p-6 rounded-2xl border-2 transition-all duration-500 ${
        orderingEnabled
          ? "bg-emerald-500/5 border-emerald-500/30"
          : "bg-amber-500/5 border-amber-500/30"
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              orderingEnabled ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
            }`}>
              {orderingEnabled ? <ShoppingCart className="w-7 h-7" /> : <ShoppingBag className="w-7 h-7" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Sipariş Sistemi
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {orderingEnabled
                  ? "Aktif — Müşteriler sipariş verebilir, sepet ve masa sistemi çalışıyor."
                  : "Kapalı — Menü sadece görüntüleme modunda, sipariş ve sepet devre dışı."
                }
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleOrdering}
            disabled={toggling}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center ${
              orderingEnabled
                ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20"
                : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20"
            }`}
          >
            {toggling ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : orderingEnabled ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                Kapat
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Aç
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-border transition-all card-hover"
          >
            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center ${card.color} mb-4`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {card.value}
            </div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
