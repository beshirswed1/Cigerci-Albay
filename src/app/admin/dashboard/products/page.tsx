"use client";

import { useEffect, useState } from "react";
import {
  getMenuItems,
  getCategories,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/lib/firestore";
import type { MenuItem, Category } from "@/lib/firestore";
import Image from "next/image";
import { toast } from "sonner";
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  Save,
  UtensilsCrossed,
  AlertTriangle,
} from "lucide-react";

const emptyForm = {
  name: "",
  price: "",
  categoryId: "",
  category: "",
  imageUrl: "",
  description: "",
};

export default function ProductsPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [menuItems, cats] = await Promise.all([getMenuItems(), getCategories()]);
    setItems(menuItems);
    setCategories(cats);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.categoryId) {
      toast.error("Lütfen zorunlu alanları doldurun.");
      return;
    }
    setSaving(true);
    try {
      const selectedCat = categories.find((c) => c.id === form.categoryId);
      const data = {
        name: form.name.trim(),
        price: parseFloat(form.price),
        categoryId: form.categoryId,
        category: selectedCat?.name || "",
        imageUrl: form.imageUrl.trim(),
        description: form.description.trim(),
        isVisible: true,
      };

      if (editId) {
        await updateMenuItem(editId, data);
        toast.success("Ürün güncellendi!");
      } else {
        await addMenuItem(data);
        toast.success("Ürün eklendi!");
      }
      resetForm();
      await load();
    } catch {
      toast.error("İşlem başarısız.");
    }
    setSaving(false);
  };

  const handleToggleVisibility = async (item: MenuItem) => {
    await updateMenuItem(item.id, { isVisible: !item.isVisible });
    toast.success(item.isVisible ? "Ürün gizlendi" : "Ürün gösterildi");
    await load();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      setDeleteConfirm(null);
      toast.success("Ürün silindi!");
      await load();
    } catch {
      toast.error("Silinemedi.");
    }
  };

  const startEdit = (item: MenuItem) => {
    setForm({
      name: item.name,
      price: item.price.toString(),
      categoryId: item.categoryId,
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description,
    });
    setEditId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Ürünler
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Menü ürünlerini yönetin
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
          {showForm ? "Kapat" : "Ürün Ekle"}
        </button>
      </div>

      {/* ─── Form ───────────────────────────────── */}
      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-card/50 border border-border/50 animate-fade-in-down space-y-4">
          <h3 className="font-semibold text-foreground mb-4">
            {editId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                Ürün Adı *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ör: katmer"
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                Fiyat (₺) *
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                Kategori *
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              >
                <option value="">Kategori seçin...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                Görsel URL
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Açıklama
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Ürün açıklaması..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
            />
          </div>

          {/* Image Preview */}
          {form.imageUrl && (
            <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-border/50">
              <Image
                src={form.imageUrl}
                alt="Önizleme"
                fill
                className="object-cover"
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
              {editId ? "Güncelle" : "Kaydet"}
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

      {/* ─── Products List ──────────────────────── */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <UtensilsCrossed className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Henüz ürün yok</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl border transition-all group ${item.isVisible
                  ? "bg-card/50 border-border/50 hover:border-border"
                  : "bg-card/20 border-border/30 opacity-60"
                }`}
            >
              {/* Image */}
              <div className="relative w-full sm:w-20 h-32 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-secondary/30">
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
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                  {!item.isVisible && (
                    <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      Gizli
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-md bg-secondary/50 text-xs">
                    {item.category}
                  </span>
                  <span className="font-medium text-primary">₺{item.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleToggleVisibility(item)}
                  className={`p-2 rounded-lg transition-all ${item.isVisible
                      ? "text-muted-foreground hover:text-amber-400 hover:bg-amber-400/5"
                      : "text-muted-foreground hover:text-emerald-400 hover:bg-emerald-400/5"
                    }`}
                  title={item.isVisible ? "Gizle" : "Göster"}
                >
                  {item.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                {deleteConfirm === item.id ? (
                  <div className="flex items-center gap-1 animate-fade-in">
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 rounded-lg bg-destructive/10 text-destructive text-xs hover:bg-destructive/20 transition-all"
                    >
                      Sil
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-2 py-1 rounded-lg text-muted-foreground text-xs hover:bg-secondary/50 transition-all"
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
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
