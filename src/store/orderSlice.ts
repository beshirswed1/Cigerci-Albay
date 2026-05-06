import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/lib/firestore";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const selectPendingOrders = (state: { orders: OrderState }) =>
  state.orders.orders.filter((o) => o.status === "pending");

export const selectCompletedOrders = (state: { orders: OrderState }) =>
  state.orders.orders.filter((o) => o.status === "completed");

export const { setOrders, setLoading, setError } = orderSlice.actions;

export default orderSlice.reducer;
