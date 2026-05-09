"use client";

import { useEffect, useState } from "react";
import {
  subscribeToGallery,
  addGalleryImage,
  deleteGalleryImage,
  GalleryItem
} from "@/lib/firestore";
import { toast } from "sonner";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Loader2,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToGallery((galleryItems) => {
      setItems(galleryItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setImageUrl("");
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!imageUrl.trim()) {
      toast.error("Lütfen geçerli bir görsel URL'si girin.");
      return;
    }
    setSaving(true);
    try {
      await addGalleryImage(imageUrl.trim());
      toast.success("Görsel başarıyla eklendi!");
      resetForm();
    } catch {
      toast.error("İşlem başarısız.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryImage(id);
      setDeleteConfirm(null);
      toast.success("Görsel silindi!");
    } catch {
      toast.error("Silinemedi.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-6 h-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Galeri
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Restoran fotoğraflarını yönetin
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Kapat" : "Görsel Ekle"}
        </button>
      </div>

      {/* ─── Form ───────────────────────────────── */}
      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-card/50 border border-border/50 animate-in fade-in slide-in-from-top-4 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">
            Yeni Görsel Ekle
          </h3>

          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Görsel URL *
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-border/50">
              <img
                src={imageUrl}
                alt="Önizleme"
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Geçersiz+URL';
                }}
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Kaydet
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 rounded-xl border border-border/50 text-foreground/60 text-sm hover:border-border transition-all"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* ─── Gallery List ──────────────────────── */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Henüz görsel yok</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-border/50 bg-secondary/30"
            >
              <Image
                src={item.imageUrl}
                alt="Galeri Görseli"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              
              {/* Overlay with Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                {deleteConfirm === item.id ? (
                  <div className="flex flex-col items-center gap-2 animate-in zoom-in-95">
                    <AlertTriangle className="w-6 h-6 text-destructive mb-1" />
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-all"
                    >
                      Evet, Sil
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-all"
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="p-3 rounded-full bg-destructive text-destructive-foreground hover:scale-110 shadow-lg shadow-destructive/20 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
