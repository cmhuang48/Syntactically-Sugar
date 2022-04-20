import axios from 'axios'

// ACTION TYPES
const LOAD_LINEITEMS = 'LOAD_LINEITEMS'
const CREATE_LINEITEM = 'CREATE_LINEITEM'
const UPDATE_LINEITEM = 'UPDATE_LINEITEM'
const DESTROY_LINEITEM = 'DESTROY_LINEITEM'

// THUNK CREATORS
export const loadLineItems = () => {
  return async (dispatch) => {
    const lineItems = (await axios.get('/api/lineItems')).data
    dispatch({
      type: LOAD_LINEITEMS,
      lineItems
    })
  }
}

export const createLineItem = (quantity, productId, orderId) => {
  return async (dispatch) => {
    console.log(quantity, productId, orderId)
    const lineItem = (await axios.post('/api/lineItems', { quantity, productId, orderId })).data
    dispatch({
      type: CREATE_LINEITEM,
      lineItem
    })
  }
}

export const updateLineItem = (id, quantity, productId, orderId) => {
  return async (dispatch) => {
    const lineItem = (await axios.put(`/api/lineItems/${id}`, { quantity, productId, orderId })).data
    dispatch({
      type: UPDATE_LINEITEM,
      lineItem
    })
  }
}

export const deleteLineItem = (lineItem) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${lineItem.id}`);
    dispatch({
      type: DESTROY_LINEITEM,
      lineItem
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_LINEITEMS:
      return action.lineItems
    case CREATE_LINEITEM:
      return [...state, action.lineItem]
    case UPDATE_LINEITEM:
      return state.map(lineItem => lineItem.id !== action.lineItem.id ? lineItem : action.lineItem)
    case DESTROY_LINEITEM:
      return state.filter(lineItem => lineItem.id !== action.lineItem.id)
    default:
      return state
  }
}