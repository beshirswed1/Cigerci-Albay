import { createSlice, createAsyncThunk, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { getCategories, getMenuItems } from "@/lib/firestore";
import type { Category, MenuItem } from "@/lib/firestore";

interface MenuState {
  categories: Category[];
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
  searchQuery: string;
}

const initialState: MenuState = {
  categories: [],
  menuItems: [],
  loading: false,
  error: null,
  selectedCategory: null,
  searchQuery: "",
};

export const fetchCategories = createAsyncThunk("menu/fetchCategories", async () => {
  return await getCategories();
});

export const fetchMenuItems = createAsyncThunk("menu/fetchMenuItems", async () => {
  return await getMenuItems();
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setMenuItems(state, action: PayloadAction<MenuItem[]>) {
      state.menuItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "Kategoriler yüklenemedi";
        state.loading = false;
      })
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.menuItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.error = action.error.message || "Menü öğeleri yüklenemedi";
        state.loading = false;
      });
  },
});

// Selectors (memoized)
const selectMenuItems = (state: { menu: MenuState }) => state.menu.menuItems;
const selectSelectedCategory = (state: { menu: MenuState }) => state.menu.selectedCategory;
const selectSearchQuery = (state: { menu: MenuState }) => state.menu.searchQuery;

export const selectFilteredMenuItems = createSelector(
  [selectMenuItems, selectSelectedCategory, selectSearchQuery],
  (menuItems, selectedCategory, searchQuery) => {
    let items = menuItems.filter((item) => item.isVisible);

    if (selectedCategory) {
      items = items.filter((item) => item.categoryId === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    return items;
  }
);

export const {
  setSelectedCategory,
  setSearchQuery,
  setCategories,
  setMenuItems,
} = menuSlice.actions;

export default menuSlice.reducer;
