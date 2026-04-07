import {configureStore} from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import bagSlice from "./bagSlice";
import wishlistSlice from "./wishlistSlice";
import authSlice from "./authSlice";
const myntraStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    bag: bagSlice.reducer,
    wishlist:wishlistSlice.reducer,
     auth: authSlice.reducer,
  }
});

export default myntraStore;