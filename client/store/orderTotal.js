import axios from 'axios'

const LOAD_TOTAL = 'LOAD_TOTAL'

export const loadTotal = () => {
  const token = window.localStorage.getItem('token')
  const localStorage = JSON.parse(window.localStorage.getItem('cart'))
  
  if (token) {
    window.localStorage.setItem('cart', '[]')
    return async (dispatch) => {
      let orderTotal
      if (!localStorage.length) {
        const lineItems = (await axios.get('/api/lineItems')).data 
        const removeExistingLineItem = lineItems.filter(ele => (ele.id !== 2 && ele.id !==3 && ele.id!== 1))
        const productPrice = {'1': 45, '2': 60, '3': 40, '4': 50, '5': 60, '6': 50, '7': 20, '8': 20, '9': 20, '10': 20, '11': 20, '12': 20}
        const lineItemId = removeExistingLineItem.map(lineItem => lineItem.productId) 
        const lineItemQuantity = removeExistingLineItem.map(lineItem => lineItem.quantity) 
        const existingItemPrice = lineItemId.map(ele => productPrice[ele])
        orderTotal = lineItemQuantity.reduce((acc, next ,i) => {return acc + next*existingItemPrice[i]},0)
console.log('store', orderTotal)
      } else {
        lineItems = (await axios.put('/api/lineItems/1', { localStorage: localStorage }, {
          headers: {
            authorization: token
          }
        })).data
      }
      dispatch({
        type: LOAD_TOTAL,
        orderTotal
      })
    }
  } else {
    return async (dispatch) => {
      dispatch({
        type: LOAD_TOTAL,
		orderTotal
      })
    }
  }
}


export default function(state = [], action) {
  switch (action.type) {
    case LOAD_TOTAL: 
      return action.orderTotal
    default:
      return state
  }
}