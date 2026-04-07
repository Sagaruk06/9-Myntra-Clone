import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {

    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    
    signup: (state, action) => {
      // fake DB (store registered user)
      localStorage.setItem("registeredUser", JSON.stringify(action.payload));
    },

    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

    
      localStorage.removeItem("user");
    },

    
    loadUser: (state) => {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (savedUser) {
        state.user = savedUser;
        state.isAuthenticated = true;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;