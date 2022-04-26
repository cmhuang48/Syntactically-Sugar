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

export const createProduct = (category, name, tiers, flavor, frosting, message, price, quantityInStock, image) => {
  return async (dispatch) => {
    const product = (await axios.post('/api/products', { category, name, tiers, flavor, frosting, message, price, quantityInStock, image })).data
    dispatch({
      type: CREATE_PRODUCT,
      product
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