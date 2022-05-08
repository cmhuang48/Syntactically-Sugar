import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { loadLineItems, logout } from "../store";
import Cart from './Cart'

document.addEventListener('click', e=>{
    const isDropdownButton = e.target.matches('[data-dropdown-button]')
    if(!isDropdownButton && e.target.closest('[data-dropdown]') != null) return
    let currentDropdown
    if(isDropdownButton){
      currentDropdown = e.target.closest('[data-dropdown]')
      currentDropdown.classList.toggle('active')
    }
    document.querySelectorAll('[data-dropdown].active').forEach(dropdown =>{
      if(dropdown === currentDropdown) return
      dropdown.classList.remove('active')
    })
})

const open = (ev) => {
  if (ev.target.className === "dropdown") {
    const subNav = document.querySelector(".subNav");
    if (subNav.style.display === "none") {
      subNav.style.display = "block";
    } else {
      subNav.style.display = "none";
    }
  }
};

const Navbar = ({ handleClick, isLoggedIn, username, auth }) => (
  <div>
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
          <div className = 'dropdown' data-dropdown>
            <button className = 'link' data-dropdown-button>
              Products
            </button>
            <div className = 'dropdown-menu'>
              <Link to="/cakes">Cakes</Link>
              <Link to="/cupcakes">Cupcakes</Link>
              <Link to="/custom">Customize!</Link>
            </div>
          </div>
          {/* <Link to="/cakes">Cakes</Link>
          <Link to="/cupcakes">Cupcakes</Link>
          <Link to="/custom">Customize!</Link> */}
          <Link to="/orders">Orders</Link>
          <div className = 'dropdown' data-dropdown>
            <button className = 'link' data-dropdown-button>
              Cart
            </button>
            <div className = 'dropdown-menu'>
              <Link to="/cart">Go to Cart!</Link>
              <Cart/>
            </div>
          </div>
          <Link to="/profile" className="dropdown" onClick={open}>
            {username[0].toUpperCase() + username.slice(1)}'s Profile
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart"><ShoppingCartIcon /></Link>
        </div>
      ) : (
        <div className="navbar">
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/cakes">Cakes</Link>
          <Link to="/cupcakes">Cupcakes</Link>
          <Link to="/custom">Customize!</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart"><ShoppingCartIcon /></Link>
        </div>
      )}
    </nav>
    <hr />
    <nav className="subNav">
      {auth.isAdmin ? (
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      ) : (
        ""
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
  return {
    isLoggedIn: !!state.auth.id,
    username,
    auth,
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