import axios from 'axios'

// ACTION TYPES
const LOAD_ORDERS = 'LOAD_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const TOKEN = 'token'

// THUNK CREATORS
export const loadOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN)
    if(token){
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
}

export const createOrder = (status, userId) => {
  return async (dispatch) => {
    const order = (await axios.post('/api/orders', { status, userId })).data
    dispatch({
      type: CREATE_ORDER,
      order
    })
  }
}

// submit order (status 'cart' => 'order')
export const updateOrder = (id, status, userId) => {
  return async (dispatch) => {
    const order = (await axios.put(`/api/orders/${id}`, { status, userId })).data;
    dispatch({
      type: UPDATE_ORDER,
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
    case UPDATE_ORDER:
      return state.map(order => order.id !== action.order.id ? order : action.order)
    default:
      return state
  }
}