import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CustomProducts = () => {
  return (
    <div className="cakeContainer">
      <Link to="/custom/cakes">
        <div className="cakeBox">
          <img
            className="cakeImage"
            src="https://i.pinimg.com/originals/69/f6/86/69f686402cc4ea8d90857d12574d45cd.jpg"
          />
          <span className="product-title">Create A Custom Cake</span>
        </div>
      </Link>
      <Link to="/custom/cupcakes">
        <div className="cakeBox">
          <img
            className="cakeImage"
            src="https://images.creativemarket.com/0.1.0/ps/6337536/600/400/m2/fpnw/wm1/kyrxpus5cf11setgoakkc6bivngrm3dloqq5gotlosfroaknkr53xy8upaor8jtd-.jpg?1556962719&s=474ee12c8a3486dfbce8736c4a5cf584&fmt=webp"
          />
          <span className="product-title">Create A Custom Cupcake</span>
        </div>
      </Link>
    </div>
  );
};

export default connect()(CustomProducts);