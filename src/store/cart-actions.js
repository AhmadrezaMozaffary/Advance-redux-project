import { cartActions } from "./cart";
import { uiActions } from "./ui";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://react-http-42477-default-rtdb.firebaseio.com/cart.json"
      );

      if (!res.ok) throw new Error("Something went wrong!");

      return await res.json();
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      // Change content of Notification component to Error
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed! ",
        })
      );
    }
  };
};

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
  };
};
