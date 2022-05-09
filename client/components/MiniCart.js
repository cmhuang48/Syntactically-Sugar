import React from "react";
import { connect } from "react-redux";

import MiniLineItemInCart from "./MiniLineItemInCart";

import { loadLineItems } from "../store";

const MiniCart = ({ auth, associatedLineItems, products }) => {
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
    <div className="cartBox">
      <table>
        <tbody>
          <tr>
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

            return <MiniLineItemInCart lineItem={lineItem} product={product} key={lineItem.id}/>;
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Total:</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
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

const mapDispatch = (dispatch) => {
  return {
    loadLineItems: () => {
      dispatch(loadLineItems());
    },
  };
};

export default connect(mapState, mapDispatch)(MiniCart);
