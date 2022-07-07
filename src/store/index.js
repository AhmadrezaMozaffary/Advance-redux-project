import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import uiSlice from "./ui";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
