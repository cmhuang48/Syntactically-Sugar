import axios from 'axios';

// ACTION TYPES
const CHECKOUT = 'CHECKOUT';
const CREATE_CUSTOM = 'CREATE_CUSTOM';

// THUNK CREATORS
export const checkout = (cart, userInfo) => {
  window.localStorage.setItem('cart', '[]')
  console.log('here')
  return async (dispatch) => {
    console.log('here2')
    const newOrder = (await axios.post('/api/orders', { status: 'order' })).data
    console.log('hi',newOrder)
    for (let obj in cart) {
      console.log(obj)
      if (obj.newProduct) {
        const newProduct = (await axios.post('/api/products', obj.newProduct));
        await axios.post('/api/lineItems', { quantity: obj.quantity, productId: newProduct.id, orderId: newOrder.id }).data;
      } else {
        await axios.post('/api/lineItems', { quantity: obj.quantity, productId: obj.productId, orderId: newOrder.id }).data;
      }
    }
    const message = `Thank you for shopping at Syntactically Sugar! Your order number is ${newOrder.id}. We will send you an update when your order has shipped.`
    userInfo = { ...userInfo, orderId: newOrder.id, message }
    await axios.post('/api/email', userInfo)
    dispatch({
      type: CHECKOUT,
      newOrder
    })
  }
}

export const createCustom = (cart, cartId) => {
  window.localStorage.setItem('cart', '[]')
  return async (dispatch) => {
    const newLineItems = [];
    for (let obj in cart) {
      const newProduct = (await axios.post('/api/products', obj.newProduct));
      newLineItems.push((await axios.post('/api/lineItems', { quantity: obj.quantity, productId: newProduct.productId, orderId: cartId })).data);
    }
    dispatch({
      type: CREATE_CUSTOM,
      newLineItems
    })
  }
}

// REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case CHECKOUT:
      return action.newOrder
    case CREATE_CUSTOM: 
      return action.newLineItems
    default:
      return state
  }
}