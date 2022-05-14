import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import LineItemInCart from "./LineItemInCart";
import { toast, ToastContainer } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css"

import {updateOrder, stripeCheckout, createCustom} from '../store'

const Cart = ({ auth, associatedLineItems, products, updateOrder, createCustom, myCart }) => {
  let cart;
  const existingCart = JSON.parse(window.localStorage.getItem("cart"));

  if (auth.username) {
    if (!associatedLineItems.length && !existingCart.length)
      return <div style={{textAlign:'center', fontSize:'32px', marginTop:'100px'}}>Empty Cart</div>;
    cart = [...associatedLineItems, ...existingCart];
  } else {
    if (!existingCart.length) return <div style={{textAlign:'center', fontSize:'32px', marginTop:'100px'}}>Empty Cart</div>;
    cart = existingCart;
  }
  
  async function handleToken(token) {
    const response = await axios.post(
      "http://localhost:8080/api/stripe/checkout",
      { token, total}
    );
    if (response.status === 200) {
      toast("Success! Check email for details", { type: "success" });
      const existingCart = JSON.parse(window.localStorage.getItem("cart"));
    if (auth.username) {
      if (existingCart) {
        // creates custom products and new lineItems
        createCustom(existingCart, myCart.id);
      }
      updateOrder({
        id: myCart.id,
        userId: auth.id
      });
    } else {
      // creates new user, new order, and new lineItems
      stripeCheckout(existingCart);
    }
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  let total = 0;
  if (!products.length) return null;

  return (
    <div>
      <h1 className="font-effect-shadow-multiple">Cart</h1>
      <div className="cartBox">
        <table>
          <tbody>
            <tr>
              <th style={{ width: "150px" }}></th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th></th>
              <th style={{ width: "50px" }}>Price</th>
            </tr>
            {cart.map((lineItem, idx) => {
              const product = lineItem.newProduct
                ? lineItem.newProduct
                : products.find(
                    (product) => product.id === lineItem.productId * 1
                  );
              if (product)
                total += Number((product.price * lineItem.quantity).toFixed(2));
              return <LineItemInCart lineItem={lineItem} product={product} key={lineItem.id || idx}/>;
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link to="/checkout">
        <button className="cartCheckout">Continue To Checkout</button>
      </Link>
      <br/>
      <ToastContainer/>
      <StripeCheckout
        label="Pay with Stripe"
        style={{right: 0}}
        stripeKey="pk_test_51KwnUeGncdLk4YDTnQMc9RITFQq9l626PjwlLJ0Bg7rQyqOakEBSGsPy0RRDxigHDR2rLk3f83jifU6TGZuQeXnl00uW8UvyPQ"
        token={handleToken}
        amount={total * 100}
        billingAddress
        shippingAddress
      />
    </div>
  );
};

const mapState = ({ auth, orders, lineItems, products }) => {
  const cart = orders.find((order) => order.status === "cart");
  const associatedLineItems = lineItems.filter(
    (lineItem) => lineItem.orderId === cart?.id
  );
  return {
    auth,
    associatedLineItems,
    products,
    myCart:cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    stripeCheckout: (cart) => {
      dispatch(stripeCheckout(cart));
    },
    createCustom: (cart, id) => {
      dispatch(createCustom(cart, id));
    },
    updateOrder:(order)=>{
      dispatch(updateOrder(order))
    },
  }
};

export default connect(mapState, mapDispatch)(Cart);
