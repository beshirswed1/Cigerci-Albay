"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectTableNumber,
  selectNotes,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  setTableNumber,
  setNotes,
  closeCart,
  clearCart,
} from "@/store/cartSlice";
import { createOrder } from "@/lib/firestore";
import Image from "next/image";
import { toast } from "sonner";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Send,
  Eraser,
  UtensilsCrossed,
  Hash,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

export default function CartSidebar() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const tableNumber = useSelector(selectTableNumber);
  const notes = useSelector(selectNotes);
  const [sending, setSending] = useState(false);

  const handleSendOrder = async () => {
    if (items.length === 0) {
      toast.error("Sepetiniz boş!");
      return;
    }
    if (!tableNumber.trim()) {
      toast.error("Lütfen masa numarasını girin.");
      return;
    }

    setSending(true);
    try {
      await createOrder({
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        tableNumber: tableNumber.trim(),
        notes: notes.trim(),
        totalPrice: total,
      });
      toast.success("Siparişiniz başarıyla gönderildi! 🎉");
      dispatch(clearCart());
      dispatch(closeCart());
    } catch (error) {
      toast.error("Sipariş gönderilemedi. Lütfen tekrar deneyin.");
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => dispatch(closeCart())}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background border-l border-border/30 z-50 flex flex-col animate-slide-in-right shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/30">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Sepetim</h2>
            <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
              {items.length}
            </span>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 rounded-xl text-foreground/60 hover:text-foreground hover:bg-secondary transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <UtensilsCrossed className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground">Sepetiniz boş</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Menüden ürün ekleyin
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-2xl bg-card/50 border border-border/30 hover:border-border/50 transition-all"
              >
                {/* Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-secondary/30">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-muted-foreground/20" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm text-primary font-medium mt-0.5">
                    ₺{(item.price).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center text-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-all"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium text-foreground w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center text-foreground/60 hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/30 p-5 space-y-4">
            {/* Table Number */}
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Masa Numarası"
                value={tableNumber}
                onChange={(e) => dispatch(setTableNumber(e.target.value))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Notes */}
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <textarea
                placeholder="Notunuz (isteğe bağlı)"
                value={notes}
                onChange={(e) => dispatch(setNotes(e.target.value))}
                rows={2}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-3 border-t border-border/30">
              <span className="text-foreground/70 font-medium">Toplam</span>
              <span className="text-2xl font-bold gradient-text">₺{total.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border/50 text-foreground/60 text-sm font-medium hover:border-destructive/30 hover:text-destructive transition-all"
              >
                <Eraser className="w-4 h-4" />
                Temizle
              </button>
              <button
                onClick={handleSendOrder}
                disabled={sending}
                className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Siparişi Gönder
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
