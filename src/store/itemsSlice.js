import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",

  initialState: {
    allItems: [],
    filteredItems: [],
    category: "all",
  },

  reducers: {
    addInitialItems: (state, action) => {
      state.allItems = action.payload;
      state.filteredItems = action.payload;
    },

    filterByCategory: (state, action) => {
      state.category = action.payload;

      if (action.payload === "all") {
        state.filteredItems = state.allItems;
      } else {
        state.filteredItems = state.allItems.filter(
          (item) => item.category === action.payload
        );
      }
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;