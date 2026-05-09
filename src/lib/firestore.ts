import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ─────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  order?: number;
  createdAt?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId: string;
  description: string;
  imageUrl: string;
  isVisible: boolean;
  createdAt?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  tableNumber: string;
  notes: string;
  totalPrice: number;
  status: "pending" | "completed";
  createdAt?: Timestamp;
}

export interface RestaurantSettings {
  orderingEnabled: boolean;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  createdAt?: string;
}

// ─── Categories ────────────────────────────────────
const categoriesRef = collection(db, "categories");

export async function getCategories(): Promise<Category[]> {
  const q = query(categoriesRef, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    } as Category;
  });
}

export async function addCategory(name: string, order: number = 0): Promise<string> {
  const docRef = await addDoc(categoriesRef, {
    name,
    order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  const ref = doc(db, "categories", id);
  await updateDoc(ref, data);
}

export async function deleteCategory(id: string): Promise<void> {
  const ref = doc(db, "categories", id);
  await deleteDoc(ref);
}

// ─── Menu Items ────────────────────────────────────
const menuItemsRef = collection(db, "menuItems");

export async function getMenuItems(): Promise<MenuItem[]> {
  const q = query(menuItemsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    } as MenuItem;
  });
}

export async function addMenuItem(item: Omit<MenuItem, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(menuItemsRef, {
    ...item,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateMenuItem(id: string, data: Partial<MenuItem>): Promise<void> {
  const ref = doc(db, "menuItems", id);
  await updateDoc(ref, data);
}

export async function deleteMenuItem(id: string): Promise<void> {
  const ref = doc(db, "menuItems", id);
  await deleteDoc(ref);
}

// ─── Orders ────────────────────────────────────────
const ordersRef = collection(db, "orders");

export async function createOrder(order: Omit<Order, "id" | "createdAt" | "status">): Promise<string> {
  const docRef = await addDoc(ordersRef, {
    ...order,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateOrderStatus(id: string, status: "pending" | "completed"): Promise<void> {
  const ref = doc(db, "orders", id);
  await updateDoc(ref, { status });
}

export async function deleteOrder(id: string): Promise<void> {
  const ref = doc(db, "orders", id);
  await deleteDoc(ref);
}

export function subscribeToOrders(
  callback: (orders: Order[]) => void,
  statusFilter?: "pending" | "completed"
) {
  let q;
  if (statusFilter) {
    q = query(ordersRef, where("status", "==", statusFilter), orderBy("createdAt", "desc"));
  } else {
    q = query(ordersRef, orderBy("createdAt", "desc"));
  }

  return onSnapshot(q, (snap) => {
    const orders = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt || null,
      } as Order;
    });
    callback(orders);
  });
}

// ─── Restaurant Settings ───────────────────────────
const settingsDocRef = doc(db, "settings", "restaurant");

export async function getRestaurantSettings(): Promise<RestaurantSettings> {
  const snap = await getDoc(settingsDocRef);
  if (snap.exists()) {
    return snap.data() as RestaurantSettings;
  }
  return { orderingEnabled: true };
}

export async function setOrderingEnabled(enabled: boolean): Promise<void> {
  await setDoc(settingsDocRef, { orderingEnabled: enabled }, { merge: true });
}

export function subscribeToSettings(callback: (settings: RestaurantSettings) => void) {
  return onSnapshot(
    settingsDocRef,
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as RestaurantSettings);
      } else {
        callback({ orderingEnabled: true });
      }
    },
    () => {
      // On permission error or network issue, default to ordering enabled
      callback({ orderingEnabled: true });
    }
  );
}

// ─── Gallery ───────────────────────────────────────
const galleryRef = collection(db, "gallery");

export async function addGalleryImage(imageUrl: string): Promise<string> {
  const docRef = await addDoc(galleryRef, {
    imageUrl,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const ref = doc(db, "gallery", id);
  await deleteDoc(ref);
}

export function subscribeToGallery(callback: (items: GalleryItem[]) => void) {
  return onSnapshot(galleryRef, (snap) => {
    const items = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
      } as GalleryItem;
    });
    
    // Client-side sort to avoid index requirement
    items.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    
    callback(items);
  });
}
