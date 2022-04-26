import axios from 'axios'

// ACTION TYPES
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

// THUNK CREATORS
export const loadProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get('/api/products')).data
    dispatch({
      type: LOAD_PRODUCTS,
      products
    })
  }
}

export const createProduct = (product) => {
  return async (dispatch) => {
    const newProduct = (await axios.post('/api/products', product)).data
    dispatch({
      type: CREATE_PRODUCT,
      product: newProduct
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}