import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import products from './products'
import orders from './orders'
import lineItems from './lineItems'
import orderTotal from './orderTotal'

const reducer = combineReducers({ auth, products, orders, lineItems, orderTotal })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './products'
export * from './orders'
export * from './lineItems'
export * from './cart'
export * from './orderTotal'