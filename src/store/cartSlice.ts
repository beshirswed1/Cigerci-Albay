import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  tableNumber: string;
  notes: string;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  tableNumber: "",
  notes: "",
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    setTableNumber(state, action: PayloadAction<string>) {
      state.tableNumber = action.payload;
    },
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    clearCart(state) {
      state.items = [];
      state.tableNumber = "";
      state.notes = "";
    },
    setCartState(state, action: PayloadAction<{ items: CartItem[]; tableNumber?: string; notes?: string }>) {
      if (action.payload.items) state.items = action.payload.items;
      if (action.payload.tableNumber !== undefined) state.tableNumber = action.payload.tableNumber;
      if (action.payload.notes !== undefined) state.notes = action.payload.notes;
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectTableNumber = (state: { cart: CartState }) => state.cart.tableNumber;
export const selectNotes = (state: { cart: CartState }) => state.cart.notes;

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setTableNumber,
  setNotes,
  toggleCart,
  openCart,
  closeCart,
  clearCart,
  setCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
