import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LineItemInCart from "./LineItemInCart";

const Cart = ({ auth, associatedLineItems, products }) => {
  let cart;
  const existingCart = JSON.parse(window.localStorage.getItem("cart"));

  if (auth.username) {
    if (!associatedLineItems.length && !existingCart.length)
      return <div>Empty Cart</div>;
    cart = [...associatedLineItems, ...existingCart];
  } else {
    if (!existingCart.length) return <div>Empty Cart</div>;
    cart = existingCart;
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
            {cart.map((lineItem) => {
              const product = lineItem.newProduct
                ? lineItem.newProduct
                : products.find(
                    (product) => product.id === lineItem.productId * 1
                  );
              if (product)
                total += Number((product.price * lineItem.quantity).toFixed(2));

              return <LineItemInCart lineItem={lineItem} product={product} key = {lineItem.id}/>;
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
  };
};

export default connect(mapState)(Cart);
