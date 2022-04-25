import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import Home from './components/Home'
import {me, loadProducts, loadOrders, loadLineItems, loadLocalOrders} from './store'
import Cakes from './components/Cakes'
import Cake from './components/Cake'
import Cupcakes from './components/Cupcakes'
import Cupcake from './components/Cupcake'
import Orders from './components/Orders'
import Cart from './components/Cart'
import auth from './store/auth'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadProducts()
    window.localStorage.getItem('token')? this.props.loadOrders(): this.props.loadLocalOrders()
    this.props.loadLineItems()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/cakes" component={Cakes} />
            <Route path="/cakes/:id" component={Cake}/>
            <Route exact path="/cupcakes" component={Cupcakes} />
            <Route path="/cupcakes/:id" component={Cupcake} />
            <Route path="/orders" component={Orders} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
			      <Route exact path="/cakes" component={Cakes} />
            <Route path="/cakes/:id" component={Cake}/>
            <Route exact path="/cupcakes" component={Cupcakes} />
            <Route path="/cupcakes/:id" component={Cupcake} />
            <Route path="/orders" component={Orders} />
            <Route path="/cart" component={Cart} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    state,
    // Being 'logged in' for our purposes will be defined as having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadProducts() {
      dispatch(loadProducts())
    },
    loadLineItems() {
      dispatch(loadLineItems())
    },
    loadOrders() {
      dispatch(loadOrders())
    },
    loadLocalOrders(){
      dispatch(loadLocalOrders())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
