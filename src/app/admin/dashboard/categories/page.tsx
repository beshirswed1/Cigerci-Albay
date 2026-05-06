"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/firestore";
import type { Category } from "@/lib/firestore";
import { toast } from "sonner";
import {
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const cats = await getCategories();
    setCategories(cats);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      await addCategory(newName.trim(), categories.length);
      setNewName("");
      toast.success("Kategori eklendi!");
      await load();
    } catch {
      toast.error("Kategori eklenemedi.");
    }
    setAdding(false);
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await updateCategory(id, { name: editName.trim() });
      setEditId(null);
      toast.success("Kategori güncellendi!");
      await load();
    } catch {
      toast.error("Güncellenemedi.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setDeleteConfirm(null);
      toast.success("Kategori silindi!");
      await load();
    } catch {
      toast.error("Silinemedi.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderOpen className="w-6 h-6 text-primary" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Kategoriler
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Menü kategorilerini yönetin
        </p>
      </div>

      {/* Add Category */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Yeni kategori adı..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1 px-4 py-3 rounded-xl bg-card/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <button
          onClick={handleAdd}
          disabled={adding || !newName.trim()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {adding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Ekle
        </button>
      </div>

      {/* Categories List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpen className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Henüz kategori yok</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-border transition-all group"
            >
              {editId === cat.id ? (
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUpdate(cat.id)}
                    autoFocus
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="p-2 rounded-lg text-muted-foreground hover:bg-secondary/50 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-foreground font-medium">{cat.name}</span>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {deleteConfirm === cat.id ? (
                      <div className="flex items-center gap-2 animate-fade-in">
                        <span className="text-xs text-destructive flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Emin misiniz?
                        </span>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-all"
                        >
                          Sil
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 rounded-lg text-muted-foreground text-xs hover:bg-secondary/50 transition-all"
                        >
                          İptal
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditId(cat.id);
                            setEditName(cat.name);
                          }}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(cat.id)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
