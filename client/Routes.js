import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Cakes from "./components/Cakes";
import Cake from "./components/Cake";
import Cupcakes from "./components/Cupcakes";
import Cupcake from "./components/Cupcake";
import CustomProducts from "./components/CustomProducts";
import CustomCake from "./components/CustomCake";
import CustomCupcake from "./components/CustomCupcake";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout/Checkout";
import UserProfile from "./components/UserProfile";
import DashBoard from "./components/DashBoard";
import UpdateProduct from "./components/UpdateProduct";
import Navbar from './components/Navbar'
import Copyright from "./components/Copyright";
import LandingPage from "./components/LandingPage";

import {
  me,
  loadProducts,
  loadLineItems,
  loadOrders,
  loadUsers,
} from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadProducts();
    this.props.loadLineItems();
    this.props.loadOrders();
    this.props.loadUsers();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route>
                <Navbar/>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route exact path="/cakes" component={Cakes} />
                  <Route path="/cakes/sort/:sort" component={Cakes} />
                  <Route path="/cakes/:id" component={Cake} />
                  <Route exact path="/cupcakes" component={Cupcakes} />
                  <Route path="/cupcakes/sort/:sort" component={Cupcakes} />
                  <Route path="/cupcakes/:id" component={Cupcake} />
                  <Route exact path="/custom" component={CustomProducts} />
                  <Route exact path="/custom/cakes" component={CustomCake} />
                  <Route exact path="/custom/cupcakes" component={CustomCupcake} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/profile" component={UserProfile} />
                  <Route exact path="/dashboard" component={DashBoard} />
                  <Route path="/dashboard/sort/:sort" component={DashBoard} />
                  <Route exact path="/products/:id/edit" component={UpdateProduct} />
                  <Redirect to="/home"/>
                </Switch>
                <Copyright/>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route>
              <Navbar/>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route exact path="/cakes" component={Cakes} />
                  <Route path="/cakes/sort/:sort" component={Cakes} />
                  <Route path="/cakes/:id" component={Cake} />
                  <Route exact path="/cupcakes" component={Cupcakes} />
                  <Route path="/cupcakes/sort/:sort" component={Cupcakes} />
                  <Route path="/cupcakes/:id" component={Cupcake} />
                  <Route exact path="/custom" component={CustomProducts} />
                  <Route exact path="/custom/cakes" component={CustomCake} />
                  <Route exact path="/custom/cupcakes" component={CustomCupcake} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Redirect to="/home"/>
                </Switch>
                <Copyright/>
            </Route>
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    state,
    // Being 'logged in' for our purposes will be defined as having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadProducts() {
      dispatch(loadProducts());
    },
    loadLineItems() {
      dispatch(loadLineItems());
    },
    loadOrders() {
      dispatch(loadOrders());
    },
    loadUsers() {
      dispatch(loadUsers());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
