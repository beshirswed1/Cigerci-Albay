"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { fetchCategories, fetchMenuItems, setSelectedCategory, setSearchQuery, selectFilteredMenuItems } from "@/store/menuSlice";
import { addToCart, selectCartItemCount, toggleCart, selectIsCartOpen } from "@/store/cartSlice";
import { subscribeToSettings } from "@/lib/firestore";
import Link from "next/link";
import Image from "next/image";
import { RESTAURANT } from "@/constants/restaurant-data";
import CartSidebar from "@/components/menu/CartSidebar";
import Navbar from "@/components/landing/Navbar";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Plus,
  Loader2,
  UtensilsCrossed,
  X,
} from "lucide-react";

export default function MenuPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, selectedCategory, searchQuery } = useSelector(
    (state: RootState) => state.menu
  );
  const filteredItems = useSelector(selectFilteredMenuItems);
  const cartItemCount = useSelector(selectCartItemCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const [orderingEnabled, setOrderingEnabled] = useState(true);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenuItems());

    const unsub = subscribeToSettings((settings) => {
      setOrderingEnabled(settings.orderingEnabled);
      setSettingsLoading(false);
    });
    return () => unsub();
  }, [dispatch]);

  const handleAddToCart = (item: { id: string; name: string; price: number; imageUrl?: string }) => {
    if (!orderingEnabled) return;
    dispatch(addToCart(item));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 lg:pt-32">
        {/* ─── Page Title ───────────────────────── */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Menümüz
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Geleneksel lezzetlerimizi keşfedin
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
        </div>

        {/* ─── Search Bar ────────────────────────── */}
        <div className="relative mb-6 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Menüde ara..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-base"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(""))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ─── Category Tabs ─────────────────────── */}
        <div className="flex flex-wrap gap-2 sm:gap-3 pb-2 mb-8 justify-center">
          <button
            onClick={() => dispatch(setSelectedCategory(null))}
            className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-sm font-semibold transition-all duration-300 flex-grow-0 ${!selectedCategory
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
              : "bg-card/60 text-foreground/60 border border-border/50 hover:border-primary/30 hover:text-primary hover:bg-primary/5 hover:scale-105"
              }`}
          >
            Tümü
          </button>
          {categories.map((cat: { id: string; name: string }) => (
            <button
              key={cat.id}
              onClick={() => dispatch(setSelectedCategory(cat.id))}
              className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-sm font-semibold transition-all duration-300 flex-grow-0 ${selectedCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                : "bg-card/60 text-foreground/60 border border-border/50 hover:border-primary/30 hover:text-primary hover:bg-primary/5 hover:scale-105"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ─── Results Count ─────────────────────── */}
        {!loading && filteredItems.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">{filteredItems.length}</span> ürün bulundu
              {selectedCategory && categories.length > 0 && (
                <span> — {categories.find((c: { id: string; name: string }) => c.id === selectedCategory)?.name}</span>
              )}
            </p>
          </div>
        )}

        {/* ─── Products Grid ─────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground text-sm">Menü yükleniyor...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-3xl bg-muted-foreground/5 flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold text-foreground/60 mb-2">
              Ürün bulunamadı
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Farklı bir kategori veya arama terimi deneyin.
            </p>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {(() => {
              const groups = !selectedCategory 
                ? categories.map((cat: { id: string; name: string }) => ({
                    id: cat.id,
                    name: cat.name,
                    items: filteredItems.filter((item) => item.category === cat.name)
                  })).filter((g: { items: any[] }) => g.items.length > 0)
                : [{
                    id: selectedCategory,
                    name: categories.find((c: { id: string; name: string }) => c.id === selectedCategory)?.name || "",
                    items: filteredItems
                  }];

              return groups.map((group) => (
                <div key={group.id} className="space-y-4 sm:space-y-6">
                  {!selectedCategory && (
                    <div className="flex items-center gap-4 px-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">{group.name}</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-border/80 to-transparent"></div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="group rounded-3xl bg-card/50 border border-border/50 hover:border-primary/20 overflow-hidden transition-all duration-500 card-hover flex flex-col"
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30 shrink-0">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center p-4">
                              <Image
                                src="/favicon.ico"
                                alt={item.name}
                                fill
                                className="object-contain opacity-50 group-hover:scale-110 transition-transform duration-700 p-8"
                              />
                            </div>
                          )}
                          {/* Category Badge */}
                          {selectedCategory && (
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1.5 rounded-xl glass text-xs font-semibold text-foreground/90">
                                {item.category}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-3 sm:p-5 flex flex-col flex-1">
                          <h3 className="font-bold text-foreground text-sm sm:text-base mb-1 line-clamp-1">{item.name}</h3>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <span className="text-base sm:text-xl font-bold gradient-text">
                              ₺{item.price.toFixed(2)}
                            </span>
                            {orderingEnabled && (
                              <button
                                onClick={() =>
                                  handleAddToCart({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    imageUrl: item.imageUrl,
                                  })
                                }
                                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-primary/10 text-primary rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn shrink-0"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Ekle</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        )}
      </div>

      {/* ─── Cart Sidebar (only when ordering enabled) ───── */}
      {orderingEnabled && isCartOpen && <CartSidebar />}
    </div>
  );
}
