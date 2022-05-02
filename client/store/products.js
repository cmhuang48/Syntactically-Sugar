import axios from 'axios'

// ACTION TYPES
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

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

export const createProduct = (product, history) => {
  return async (dispatch) => {
    const newProduct = (await axios.post('/api/products', product)).data
    dispatch({
      type: CREATE_PRODUCT,
      product: newProduct
    })
    history.go('/products')
  }
}

export const deleteProduct = (id, history) => {
   return async (dispatch) => { 
    const product = (await axios.delete(`/api/products/${id}`)).data
    dispatch({
      type: DELETE_PRODUCT,
      product
    })
    history.go('/products')
   }
}

export const updateProduct = (product, history) => {
  return async dispatch => {
    const response = await axios.put(`/api/products/${product.id}`, product)
    dispatch({type: UPDATE_PRODUCT, product: response.data});
    history.go(`/products/${product.id}`)
  }
} 

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case UPDATE_PRODUCT:
      return state.map(product => product.id !== action.product.id ? product : action.product)
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}