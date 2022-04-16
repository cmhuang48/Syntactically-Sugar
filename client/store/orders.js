import axios from 'axios'

// ACTION TYPES
const LOAD_ORDERS = 'LOAD_ORDERS'

// THUNK CREATORS
export const loadOrders = () => {
  return async (dispatch) => {
    const orders = (await axios.get('/api/orders')).data
    console.log(orders)
    dispatch({
      type: LOAD_ORDERS,
      orders
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders
    default:
      return state
  }
}