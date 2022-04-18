import axios from 'axios'

// ACTION TYPES
const LOAD_LINEITEMS = 'LOAD_LINEITEMS'
const CREATE_LINEITEM = 'CREATE_LINEITEM'

// THUNK CREATORS
export const loadLineItems = () => {
  return async (dispatch) => {
    const lineItems = (await axios.get('/api/lineitems')).data
    dispatch({
      type: LOAD_LINEITEMS,
      lineItems
    })
  }
}

export const createLineItem = (status) => {
  return async (dispatch) => {
    const lineItem = (await axios.post('/api/lineitems', { quantity })).data
    dispatch({
      type: CREATE_LINEITEM,
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
    default:
      return state
  }
}