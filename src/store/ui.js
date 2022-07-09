import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: null,
    notificationIsShown: false,
  },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    changeNotifVisibality(state) {
      state.notificationIsShown = !state.notificationIsShown;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
