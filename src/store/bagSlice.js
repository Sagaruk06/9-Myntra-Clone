import { createSlice } from "@reduxjs/toolkit";

const initialBag = JSON.parse(localStorage.getItem("bag")) || [];

const bagSlice = createSlice({
  name: "bag",
  initialState: initialBag,

  reducers: {
    addToBag: (state, action) => {
      const itemId = action.payload;

      const existingItem = state.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ id: itemId, quantity: 1 });
      }

    
      localStorage.setItem("bag", JSON.stringify(state));
    },

    removeFromBag: (state, action) => {
      const itemId = action.payload;

      const existingItem = state.find((item) => item.id === itemId);

      if (!existingItem) return;

      let updatedState;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        updatedState = state;
      } else {
        updatedState = state.filter((item) => item.id !== itemId);
      }

      
      localStorage.setItem("bag", JSON.stringify(updatedState));

      return updatedState;
    },

    clearBag: () => {
      localStorage.removeItem("bag");
      return [];
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;