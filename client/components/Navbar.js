import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import MenuListComposition from './Menu'

import { loadLineItems, logout } from "../store";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 2,
    backgroundColor: '#f58d72',
    color: '#fff',
    padding: '0',
  },
  '& .MuiSvgIcon-root': {
    color: '#f58d72'
  }
}));

const Navbar = ({ handleClick, isLoggedIn, username, auth, associatedLineItems }) => (
  <div style={{backgroundColor: '#fff4ee'}}>
    <Link to="/home">
      <img
        src="https://64.media.tumblr.com/0247842009fe11e7313136833fde624d/23030b2c9b9bec6c-36/s1280x1920/2e54ad5f5b0299d2f0b5a8e27412d636d9d4089b.pnj"
        className="headerpic"
      />
    </Link>
    <nav>
      {isLoggedIn ? (
        <div className="navbar">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <MenuListComposition title={'Products'} menuList={["Cakes", "Cupcakes", "Customize!"]}/>
          <Link to="/orders">Orders</Link>
          <MenuListComposition title={
            <StyledBadge badgeContent={[...associatedLineItems, ...JSON.parse(window.localStorage.getItem("cart"))].reduce((accum, ele) => accum + ele.quantity, 0)}>
              <ShoppingCartIcon style={{color:'#8c5041'}}/>
            </StyledBadge>} 
          />
          <Link to="/profile">{username[0].toUpperCase() + username.slice(1)}'s Profile</Link>
          {auth.isAdmin ? <Link to="/dashboard">Dashboard</Link> : null }
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navbar" style={{backgroundColor: '#fff4ee'}}>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <MenuListComposition title={'Products'} menuList={["Cakes", "Cupcakes", "Customize!"]}/>
          <MenuListComposition title={
            <StyledBadge badgeContent={JSON.parse(window.localStorage.getItem("cart")).reduce((accum, ele) => accum + ele.quantity, 0)}>
              <ShoppingCartIcon style={{color:'#8c5041'}}/>
            </StyledBadge>} 
          />
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  const username = state.auth.username;
  const auth = state.auth;
  const orders = state.orders;
  const lineItems = state.lineItems
  const cart = orders.find((order) => order.status === "cart");
  const associatedLineItems = lineItems.filter(
    (lineItem) => lineItem.orderId === cart?.id
  );
  return {
    isLoggedIn: !!state.auth.id,
    username,
    auth,
    associatedLineItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout()), dispatch(loadLineItems());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
