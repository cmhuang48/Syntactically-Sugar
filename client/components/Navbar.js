import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadLineItems, logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
      <img src="https://64.media.tumblr.com/b55b9c1b10e916e71d8707885cafa7ff/35499bb7ee39e5a9-a6/s1280x1920/46444ca3af7cb09553c43d43bb57d41414e970e7.pnj" alt="logo" />
    <nav>
      {isLoggedIn ? (
        <div >
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/cakes">Cakes</Link>
          <Link to="/cupcakes">Cupcakes</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
		      <Link to="/cakes">Cakes</Link>
          <Link to="/cupcakes">Cupcakes</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout()),
      dispatch(loadLineItems())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
