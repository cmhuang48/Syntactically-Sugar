import axios from 'axios'

// ACTION TYPES
const LOAD_ORDERS = 'LOAD_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const RESET_ORDER = 'RESET_ORDER'
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
    dispatch({
      type: LOAD_ORDERS,
      orders
    })
  }
}

export const createOrder = (status) => {
  return async (dispatch) => {
    const order = (await axios.post('/api/orders', { status })).data
    dispatch({
      type: CREATE_ORDER,
      order
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders
    case CREATE_ORDER:
      return [...state, action.order]
    case RESET_ORDER:
      return []
    default:
      return state
  }
}