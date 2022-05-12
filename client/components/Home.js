import React from "react";
import { connect } from "react-redux";
import {OurFavorites} from './Carousel.js'

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, products} = props;

  if (username) {
    return (
      <>
        <div className = 'welcomebanner'>
        <h3 className="font-effect-shadow-multiple">
          Welcome, {username[0].toUpperCase() + username.slice(1)}!
        </h3>
        <OurFavorites products={products}/>
        <div className = 'homeimgcontainer'>
          <img
            src="https://64.media.tumblr.com/253352d1d269deb475da054150d11385/d439913b40336189-ce/s1280x1920/402e16c5e579e2a7acda2a24a258d764825dc228.pnj"
            className="homepic"
          />
          <img
            src="https://64.media.tumblr.com/c2e3dd474e8c09d82a47acf6274e4bd0/23030b2c9b9bec6c-26/s1280x1920/ed9a57e3a40b967eb6bdb7a9eeda20bc46998b95.pnj"
            className="aboutUs"
          />
        </div>
      </div>
      </>
    );
  } else {
    return (
      <>
      <OurFavorites products={products}/>
        <div className = 'welcomebanner'>
        <img
          src="https://64.media.tumblr.com/253352d1d269deb475da054150d11385/d439913b40336189-ce/s1280x1920/402e16c5e579e2a7acda2a24a258d764825dc228.pnj"
          className="homepic"
        />
        <img
          src="https://64.media.tumblr.com/c2e3dd474e8c09d82a47acf6274e4bd0/23030b2c9b9bec6c-26/s1280x1920/ed9a57e3a40b967eb6bdb7a9eeda20bc46998b95.pnj"
          className="aboutUs"
        />
      </div>
      </>
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
