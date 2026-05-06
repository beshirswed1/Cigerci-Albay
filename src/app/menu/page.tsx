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
      {/* ─── Navbar ───────────────────────────────── */}
      <nav className="sticky top-0 z-40 glass-strong border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt={RESTAURANT.name} width={40} height={40} className="w-10 h-10 object-contain" />
              <span className="font-serif text-lg font-bold text-foreground hidden sm:block">
                {RESTAURANT.name}
              </span>
            </div>
          </div>

          <h1 className="font-serif text-xl font-bold text-foreground">Menü</h1>

          {/* Cart Button - only show when ordering is enabled */}
          {orderingEnabled ? (
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2.5 rounded-xl text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </nav>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ─── Page Title ───────────────────────── */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-3">
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
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-4 mb-10 justify-start sm:justify-center">
          <button
            onClick={() => dispatch(setSelectedCategory(null))}
            className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${!selectedCategory
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-card/60 text-foreground/60 border border-border/50 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
              }`}
          >
            Tümü
          </button>
          {categories.map((cat: { id: string; name: string }) => (
            <button
              key={cat.id}
              onClick={() => dispatch(setSelectedCategory(cat.id))}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${selectedCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-card/60 text-foreground/60 border border-border/50 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-card/50 border border-border/50 hover:border-primary/20 overflow-hidden transition-all duration-500 card-hover"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <UtensilsCrossed className="w-12 h-12 text-muted-foreground/20" />
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 rounded-xl glass text-xs font-semibold text-foreground/90">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-base mb-1.5 line-clamp-1">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold gradient-text">
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
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
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
        )}
      </div>

      {/* ─── Cart Sidebar (only when ordering enabled) ───── */}
      {orderingEnabled && isCartOpen && <CartSidebar />}
    </div>
  );
}
