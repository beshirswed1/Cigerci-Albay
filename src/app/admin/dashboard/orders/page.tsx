"use client";

import { useEffect, useState } from "react";
import { subscribeToOrders, updateOrderStatus, deleteOrder } from "@/lib/firestore";
import type { Order } from "@/lib/firestore";
import { toast } from "sonner";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ChevronUp,
  Hash,
  MessageSquare,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToOrders((data) => {
      setOrders(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = orders.filter((o) => o.status === activeTab);

  const handleComplete = async (id: string) => {
    try {
      await updateOrderStatus(id, "completed");
      toast.success("Sipariş tamamlandı!");
    } catch {
      toast.error("İşlem başarısız.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      setDeleteConfirm(null);
      toast.success("Sipariş silindi!");
    } catch {
      toast.error("Silinemedi.");
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="w-6 h-6 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Siparişler
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Gelen siparişleri gerçek zamanlı takip edin
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "pending"
              ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
              : "bg-card/50 text-foreground/60 border border-border/50 hover:border-border"
            }`}
        >
          <Clock className="w-4 h-4" />
          Bekleyen
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "completed"
              ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
              : "bg-card/50 text-foreground/60 border border-border/50 hover:border-border"
            }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Tamamlanan
          <span className="px-2 py-0.5 rounded-full bg-secondary/50 text-muted-foreground text-xs">
            {completedCount}
          </span>
        </button>
      </div>

      {/* Orders */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">
            {activeTab === "pending" ? "Bekleyen sipariş yok" : "Tamamlanan sipariş yok"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className={`rounded-2xl border transition-all overflow-hidden ${order.status === "pending"
                  ? "bg-card/50 border-amber-400/20"
                  : "bg-card/30 border-border/50"
                }`}
            >
              {/* Order Header */}
              <div
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-secondary/30 transition-all border-b border-transparent hover:border-border/10"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Table Badge */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold shadow-sm ${order.status === "pending"
                        ? "bg-amber-400/10 text-amber-500 border border-amber-400/20"
                        : "bg-emerald-400/10 text-emerald-500 border border-emerald-400/20"
                      }`}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wider opacity-80 mb-0.5 leading-none font-semibold">Masa</span>
                    <span className="text-xl leading-none">{order.tableNumber}</span>
                  </div>
                  
                  {/* Order Info */}
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-foreground text-sm sm:text-base">
                      {order.items.length} Ürün Siparişi
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 mt-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTime(order.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Price */}
                  <div className="flex flex-col items-end">
                    <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground/70 mb-1 font-semibold hidden sm:block">Toplam Tutar</span>
                    <span className="font-extrabold text-base sm:text-lg text-primary leading-none">
                      ₺{Number(order.totalPrice).toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Chevron Toggle */}
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border/50 group-hover:bg-primary/10 transition-colors">
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-4 h-4 text-foreground/70" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-foreground/70" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Detail */}
              {expandedOrder === order.id && (
                <div className="border-t border-border/30 p-4 animate-fade-in space-y-4">
                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2 px-3 rounded-lg bg-secondary/20"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <span className="text-sm text-foreground">{item.name}</span>
                        </div>
                        <span className="text-sm text-primary font-medium">
                          ₺{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/20">
                      <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/70">{order.notes}</p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between items-center py-3 border-t border-border/30">
                    <span className="text-foreground/70 font-medium">Toplam</span>
                    <span className="text-xl font-bold gradient-text">
                      ₺{order.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleComplete(order.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Tamamla
                      </button>
                    )}

                    {deleteConfirm === order.id ? (
                      <div className="flex items-center gap-2 animate-fade-in">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition-all"
                        >
                          Sil
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-4 py-2 rounded-xl text-muted-foreground text-sm hover:bg-secondary/50 transition-all"
                        >
                          İptal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(order.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-muted-foreground text-sm hover:text-destructive hover:bg-destructive/5 transition-all border border-border/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
