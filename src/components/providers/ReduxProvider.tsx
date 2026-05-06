"use client";

import { Provider } from "react-redux";
import { store, RootState } from "@/store/store";
import { useEffect } from "react";
import { setCartState } from "@/store/cartSlice";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Restore cart state from localStorage when the app loads
    const savedCart = localStorage.getItem("cartState");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        store.dispatch(setCartState(parsed));
      } catch (e) {
        console.error("Failed to parse cart state", e);
      }
    }

    // 2. Subscribe to store changes to continuously save the cart to localStorage
    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as RootState;
      // Extract only properties we want to persist
      const stateToSave = {
        items: state.cart.items,
        tableNumber: state.cart.tableNumber,
        notes: state.cart.notes,
      };
      localStorage.setItem("cartState", JSON.stringify(stateToSave));
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
