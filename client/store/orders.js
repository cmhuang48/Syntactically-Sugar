import axios from 'axios'

// ACTION TYPES
const LOAD_ORDERS = 'LOAD_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'

// THUNK CREATORS
export const loadOrders = () => {
  return async (dispatch) => {
    const orders = (await axios.get('/api/orders')).data
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
    default:
      return state
  }
}