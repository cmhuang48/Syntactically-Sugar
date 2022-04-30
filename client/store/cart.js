import axios from 'axios';

// ACTION TYPES
const LOAD_CART = 'LOAD_CART'

// THUNK CREATORS
export const checkout = (cart) => {
  window.localStorage.setItem('cart', '[]')
  return async (dispatch) => {
    const newOrder = (await axios.post('/api/orders', { status: 'order' })).data
    const newLineItems = [];
    for (let obj in cart) {
      if (obj.newProduct) {
        const newProduct = (await axios.post('/api/products', obj.newProduct));
        newLineItems.push((await axios.post('/api/lineItems', { quantity: obj.quantity, productId: newProduct.productId, orderId: newOrder.id })).data);
      } else {
        newLineItems.push((await axios.post('/api/lineItems', { quantity: obj.quantity, productId: obj.productId, orderId: newOrder.id })).data);
      }
    }
    dispatch({
      type: LOAD_CART,
      newOrder
    })
  }
}

// REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.newOrder
    default:
      return state
  }
}