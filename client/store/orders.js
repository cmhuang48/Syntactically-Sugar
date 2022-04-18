import axios from 'axios'

// ACTION TYPES
const LOAD_ORDERS = 'LOAD_ORDERS'
const TOKEN = 'token'

// THUNK CREATORS
export const loadOrders = () => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    const orders = (await axios.get('/api/orders', {
      headers: {
        authorization: token
      }
    })).data
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
      return [...action.orders]
    case 'RESET_ORDERS':
      return []
    default:
      return state
  }
}