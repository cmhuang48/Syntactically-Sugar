import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import cakes from './cakes'
import cupcakes from './cupcakes'
import orders from './orders'
import lineItems from './lineItems'

const reducer = combineReducers({ auth, cakes, cupcakes, orders, lineItems })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './cakes'
export * from './cupcakes'
export * from './orders'
export * from './lineItems'
