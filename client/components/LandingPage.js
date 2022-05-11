import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {logout, loadLineItems} from '../store';

const LandingPage = ({auth, handleClick}) =>{
  return (
    <div className='banner'>
      <div className='landingnavbar'>
        <Link to="/home"><img src="/../images/logo.jpeg" className='logo'/></Link>
        <ul>
          {auth.username?
          <li><a href="#" onClick={handleClick}>
          Logout</a></li>
          :
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>}
        </ul>
      </div>
      <div className='content'>
        <h1><Link to="/home">SYNTACTICALLY SUGAR</Link></h1>
        <p><Link to="/home">Send some sugar!</Link></p>
        <div className = 'shoplinkscontainer'>
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
      dispatch(logout()), 
      dispatch(loadLineItems());
    },
  };
};

export default connect(mapState, mapDispatch)(LandingPage);
