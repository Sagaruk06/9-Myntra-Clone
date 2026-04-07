import { createSlice } from "@reduxjs/toolkit";

// ✅ Load from localStorage
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadFromLocalStorage(),

  reducers: {
    toggleWishlist: (state, action) => {
      const itemId = Number(action.payload);

      let newState;

      if (state.includes(itemId)) {
        newState = state.filter((id) => id !== itemId);
      } else {
        newState = [...state, itemId];
      }

      // ✅ Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(newState));

      return newState;
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;
