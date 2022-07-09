import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      // Get new item
      const newItem = action.payload;

      // Check and updating items
      const existingItem = state.items.find((item) => item.id === newItem.id);

      //Update the quantity
      state.totalQuantity++;

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

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      }

      existingItem.quantity--;
      existingItem.totalPrice -= existingItem.price;
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    // Showing the Notification component
    dispatch(uiActions.changeNotifVisibality());

    // Change content of Notification component to Sending
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data! ",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://react-http-42477-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!res.ok) throw new Error("Something went wrong!");
    };

    try {
      await sendRequest();

      // Change content of Notification component to Success
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Send cart data successfuly!",
        })
      );
    } catch (error) {
      // Change content of Notification component to Error
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed! ",
        })
      );
    }

    // Delete the Notification component from UI after 2s
    setTimeout(() => {
      dispatch(uiActions.changeNotifVisibality());
    }, 2000);
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
