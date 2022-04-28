import axios from 'axios'

// ACTION TYPES
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

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
    const newlineItem = (await axios.post('/api/lineItems', { quantity: 1, productId: newProduct.id })).data
    dispatch({
      type: CREATE_PRODUCT,
      product: newProduct
    })
  }
}

export const deleteProduct = (product) => {
   return async (dispatch) => { 
    await axios.delete(`/api/products/${product.id}`, product).data;
    dispatch({
      type: DELETE_PRODUCT,
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
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}