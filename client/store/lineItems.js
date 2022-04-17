import axios from 'axios'

// ACTION TYPES
const LOAD_LINEITEMS = 'LOAD_LINEITEMS'

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

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_LINEITEMS:
      return action.lineItems
    default:
      return state
  }
}