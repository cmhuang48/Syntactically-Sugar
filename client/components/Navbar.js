import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import MiniCart from "./MiniCart";

import { loadLineItems, logout } from "../store";

document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

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
          <div className="dropdown" data-dropdown>
            <button className="link" data-dropdown-button>
              Products
            </button>
            <div className="dropdown-menu">
              <Link to="/cakes">Cakes</Link>
              <Link to="/cupcakes">Cupcakes</Link>
              <Link to="/custom">Customize!</Link>
            </div>
          </div>
          <Link to="/orders">Orders</Link>
          <div className="dropdown" data-dropdown>
            {associatedLineItems.length ?
              <IconButton aria-label="cart" className="link">
                <StyledBadge badgeContent={associatedLineItems.reduce((accum, ele) => accum + ele.quantity, 0)}>
                  <ShoppingCartIcon data-dropdown-button />
                </StyledBadge>
              </IconButton>
            : 
              <ShoppingCartIcon data-dropdown-button />
            }
            <div className="dropdown-menu">
              <div style={{ padding: "10px 15px" }}>
                <MiniCart />
                <Link id="action" to="/cart">
                  Go to Cart!
                </Link>
              </div>
            </div>
          </div>
          <Link to="/profile" className="dropdown" onClick={open}>
            {username[0].toUpperCase() + username.slice(1)}'s Profile
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navbar">
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <div className="dropdown" data-dropdown>
            <button className="link" data-dropdown-button>
              Products
            </button>
            <div className="dropdown-menu">
              <Link to="/cakes">Cakes</Link>
              <Link to="/cupcakes">Cupcakes</Link>
              <Link to="/custom">Customize!</Link>
            </div>
          </div>
          <div className="dropdown" data-dropdown>
            {JSON.parse(window.localStorage.getItem("cart")).length ?
              <IconButton aria-label="cart" className="link">
                <StyledBadge badgeContent={JSON.parse(window.localStorage.getItem("cart")).reduce((accum, ele) => accum + ele.quantity, 0)}>
                  <ShoppingCartIcon data-dropdown-button />
                </StyledBadge>
              </IconButton>
            : 
              <ShoppingCartIcon data-dropdown-button />
            }
            <div className="dropdown-menu">
              <MiniCart />
              <Link to="/cart">Go to Cart!</Link>
            </div>
          </div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
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
    associatedLineItems
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
