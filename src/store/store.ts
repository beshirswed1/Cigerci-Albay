import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import menuReducer from "./menuSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "orders/setOrders",
          "orders/addOrder",
          "menu/setCategories",
          "menu/setMenuItems",
        ],
        ignoredPaths: [
          "orders.orders",
          "menu.categories",
          "menu.menuItems",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
