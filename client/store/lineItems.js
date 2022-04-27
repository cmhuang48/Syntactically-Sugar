import axios from 'axios'

// ACTION TYPES
const LOAD_LINEITEMS = 'LOAD_LINEITEMS'
const CREATE_LINEITEM = 'CREATE_LINEITEM'
const UPDATE_LINEITEM = 'UPDATE_LINEITEM'
const DESTROY_LINEITEM = 'DESTROY_LINEITEM'
const LOAD_LOCAL_LINEITEMS = 'LOAD_LOCAL_LINEITEMS'


// THUNK CREATORS
export const loadLineItems = () => {
  const token = window.localStorage.getItem('token')
  const localStorage = JSON.parse(window.localStorage.getItem('cart'))

  if (token) {
    window.localStorage.setItem('cart', '[]')
    return async (dispatch) => {
      let lineItems
      if (!localStorage.length) {
        lineItems = (await axios.get('/api/lineItems')).data
      } else {
        lineItems = (await axios.put('/api/lineItems/1', { localStorage: localStorage }, {
          headers: {
            authorization: token
          }
        })).data
      }
      dispatch({
        type: LOAD_LINEITEMS,
        lineItems
      })
    }
  } else {
    return async (dispatch) => {
      dispatch({
        type: LOAD_LOCAL_LINEITEMS,
        localStorage
      })
    }
  }
}

export const createLineItem = (lineItem) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    return async (dispatch) => {
      const newLineItem = (await axios.post('/api/lineItems', lineItem)).data
      dispatch({
        type: CREATE_LINEITEM,
        lineItem: newLineItem
      })
    }
  } else {
    return async (dispatch) => {
      dispatch({
        type: CREATE_LINEITEM,
        lineItem
      })
    }
  }
}

export const updateLineItem = (lineItem) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    return async (dispatch) => {
      const updatedLineItem = (await axios.put(`/api/lineItems/${lineItem.id}`, lineItem)).data
      dispatch({
        type: UPDATE_LINEITEM,
        lineItem: updatedLineItem
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: UPDATE_LINEITEM,
        lineItem
      })
    }
  }
}

export const deleteLineItem = (lineItem) => {
  return async (dispatch) => {
    await axios.delete(`/api/lineItems/${lineItem.id}`)
    dispatch({
      type: DESTROY_LINEITEM,
      lineItem
    })
  }
}

const totalAmount = (orderTotal = 0) => {

}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_LINEITEMS:
      return action.lineItems
    case CREATE_LINEITEM:
      if (action.lineItem.id) {
        return [...state, action.lineItem]
      } else { 
        return [action.lineItem]
      }
    case UPDATE_LINEITEM:
      if (action.lineItem.id) {
        return state.map(lineItem => lineItem.id === action.lineItem.id ? action.lineItem : lineItem)
      } else {
        return [action.lineItem]
      }
    case DESTROY_LINEITEM:
      return state.filter(lineItem => lineItem.id !== action.lineItem.id)
    case LOAD_LOCAL_LINEITEMS:
      return [action.localStorage]
    default:
      return state
  }
}