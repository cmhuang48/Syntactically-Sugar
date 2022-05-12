import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { logout, loadLineItems } from '../store';

const LandingPage = ({ auth, handleClick }) =>{
  return (
    <div className='banner'>
      <div className='landingnavbar'>
        <ul>
          {auth.username ? (
            <li>
              <a href="#" onClick={handleClick}>Logout</a>
            </li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
      <div className='content'>
        <div className = 'shoplinkscontainer'>
        <Link to="/home"><img src="/../images/transparentlogo.png" className='logo'/></Link>
        <br/>
          <Link to="/cakes" className='shoplinks'>Shop Cakes</Link>
          <Link to="/cupcakes" className='shoplinks'>Shop Cupcakes</Link>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ auth })=> ({ auth });

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(logout());
      dispatch(loadLineItems());
    },
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
