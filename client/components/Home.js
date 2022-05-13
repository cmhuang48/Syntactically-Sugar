import React from "react";
import { connect } from "react-redux";
import {OurFavorites} from './Carousel.js'
import Testimonials from "./Testimonials.js";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, products} = props;

  if (username) {
    return (
        <div>
          <h3 className="font-effect-shadow-multiple">
            Welcome, {username[0].toUpperCase() + username.slice(1)}!
          </h3>
          <img src="/../images/summerprod.png" className="welcomepic" />
          <div className= "font-effect-shadow-multiple" style={{fontFamily:"beth ellen", fontSize:'32px', textAlign:'center', marginTop:"32px"}}>Some of your past favorites:</div>
          <OurFavorites products={products}/>
          <Testimonials/>
          <div className="font-effect-shadow-multiple" style={{fontFamily:"beth ellen", fontSize:'32px', textAlign:'center', marginTop:"32px"}}>About Us:</div>
          <img src="/../images/aboutus.jpg"/>
      </div>
    );
  } else {
    return (
      <div>
       <img src="/../images/pride.png"/>
       <div className= "font-effect-shadow-multiple" style={{fontFamily:"beth ellen", fontSize:'32px', textAlign:'center', marginTop:"32px"}}>Try some of our favorites:</div>
        <OurFavorites products={products}/>
        <Testimonials/>
        <div className="font-effect-shadow-multiple" style={{fontFamily:"beth ellen", fontSize:'32px', textAlign:'center', marginTop:"32px"}}>About Us:</div>
        <img src="/../images/aboutus.jpg"/>
      </div>
    );
  }
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    products: state.products
  };
};

export default connect(mapState)(Home);
