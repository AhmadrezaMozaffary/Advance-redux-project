import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.changed = false;
    },
    addItemToCart(state, action) {
      // Get new item
      const newItem = action.payload;

      // Check and updating items
      const existingItem = state.items.find((item) => item.id === newItem.id);

      //Update the quantity
      state.totalQuantity++;

      state.changed = true;

      if (!existingItem) {
        state.items.push({
          name: newItem.title,
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      //Update the quantity
      state.totalQuantity--;

      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      }

      existingItem.quantity--;
      existingItem.totalPrice -= existingItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
