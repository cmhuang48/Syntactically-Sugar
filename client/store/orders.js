import axios from "axios";

// ACTION TYPES
const LOAD_ORDERS = "LOAD_ORDERS";
const CREATE_ORDER = "CREATE_ORDER";
const UPDATE_ORDER = "UPDATE_ORDER";

// THUNK CREATORS
export const loadOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const orders = (
        await axios.get("/api/orders", {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({
        type: LOAD_ORDERS,
        orders,
      });
    }
  };
};

// export const createOrder = (order) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     if (token) {
//       const newOrder = (await axios.post("/api/orders", order)).data;
//       dispatch({
//         type: CREATE_ORDER,
//         order: newOrder,
//       });
//     }
//   };
// };

export const updateOrder = (order) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const updatedOrder = (await axios.put(`/api/orders/${order.id}`, order))
        .data;
      if (order.email) {
        const message = `Thank you for shopping at Syntactically Sugar! Your order number is ${order.id}. We will send you an update when your order has shipped.`;
        order = { ...order, orderId: order.id, message };
        await axios.post("/api/email", order);
      }
      dispatch({
        type: UPDATE_ORDER,
        order: updatedOrder,
      });
      if (updatedOrder.status === "order") dispatch(loadOrders());
    }
  };
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders;
    // case CREATE_ORDER:
    //   return [...state, action.order];
    case UPDATE_ORDER:
      return state.map((order) =>
        order.id !== action.order.id ? order : action.order
      );
    default:
      return state;
  }
}
