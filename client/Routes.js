import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import Home from './components/Home'
import { me, loadProducts, loadLineItems, loadOrders, loadUsers } from './store'
import Cakes from './components/Cakes'
import Cake from './components/Cake'
import CreateCake from './components/CreateCake'
import Cupcakes from './components/Cupcakes'
import Cupcake from './components/Cupcake'
import CreateCupcake from './components/CreateCupcake'
import Orders from './components/Orders'
import Cart from './components/Cart'
import Checkout from './components/Checkout/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import UserProfile from './components/UserProfile'
import UpdateProduct from './components/UpdateProduct'
import DashBoard from './components/DashBoard'
import CreateNewProduct from './components/CreateNewProduct'
import AllUsers from './components/AllUsers'
import AllProducts from './components/AllProducts'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadProducts()
    this.props.loadLineItems()
    this.props.loadOrders()
    this.props.loadUsers()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/cakes" component={Cakes} />
            <Route exact path="/cakes/custom" component={CreateCake} />
            <Route path="/cakes/:id" component={Cake} />
            <Route exact path='/cakes/:id/edit' component={UpdateProduct}/>
            <Route exact path="/cupcakes" component={Cupcakes} />
            <Route exact path='/cupcakes/custom' component={CreateCupcake} />
            <Route path="/cupcakes/:id" component={Cupcake} />
            <Route exact path='/cupcakes/:id/edit' component={UpdateProduct}/>
            <Route path="/orders" component={Orders} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/confirmation" component={OrderConfirmation} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/createNewProduct" component={CreateNewProduct} />
            <Route path="/allUsers" component={AllUsers}/>
            <Route path="/allProducts" component={AllProducts}/>
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
			      <Route exact path="/cakes" component={Cakes} />
            <Route exact path='/cakes/custom' component={CreateCake} />
            <Route path="/cakes/:id" component={Cake}/>
            <Route exact path="/cupcakes" component={Cupcakes} />
            <Route exact path='/cupcakes/custom' component={CreateCupcake} />
            <Route path="/cupcakes/:id" component={Cupcake} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/confirmation" component={OrderConfirmation} />
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
    loadUsers() {
      dispatch(loadUsers())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
