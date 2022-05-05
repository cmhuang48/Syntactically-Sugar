import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { createLineItem, updateLineItem } from "../store";

class Cupcake extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { auth, cupcake, order, lineItem, createLineItem, updateLineItem } =
      this.props;
    const { quantity } = this.state;
    if (auth.username) {
      if (lineItem) {
        const updatedItem = {
          id: lineItem.id,
          quantity: lineItem.quantity * 1 + quantity * 1,
          productId: cupcake.id,
          orderId: order.id,
        };
        updateLineItem(updatedItem);
      } else {
        const newItem = {
          quantity: quantity * 1,
          productId: cupcake.id,
          orderId: order.id,
        };
        createLineItem(newItem);
      }
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem("cart"));
      let existingLineItem = existingCart.find(
        (obj) => obj.productId === cupcake.id
      );
      const idx = existingCart.indexOf(existingLineItem);
      if (existingLineItem) {
        existingLineItem.quantity =
          existingLineItem.quantity * 1 + quantity * 1;
        existingCart[idx] = existingLineItem;
      } else {
        existingLineItem = { productId: cupcake.id, quantity: quantity * 1 };
        existingCart.push(existingLineItem);
      }
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
    }
    window.alert("Added to cart!");
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { cupcake, auth, lineItemToCheckOut } = this.props;
    const { quantity } = this.state;
    const { onChange, onSubmit } = this;

    if (!cupcake) return null;

    return (
      <>
        <div className="cake-details">
          <img src={cupcake.image} />
          <div className="cake-add-to-cart">
            <h1>{cupcake.name} cupcake</h1>
            <p>Price: ${cupcake.price}</p>
            <p>
              In Stock: {cupcake.quantityInStock - lineItemToCheckOut?.quantity}
            </p>
            <form onSubmit={onSubmit}>
              <p>
                Quantity:{" "}
                <input
                  name="quantity"
                  value={quantity}
                  type="number"
                  min="1"
                  max="10"
                  onChange={onChange}
                />
              </p>
              <button>Add to Cart</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapState = (
  { auth, products, orders, lineItems },
  {
    match: {
      params: { id },
    },
  }
) => {
  const cupcake = products.find((product) => product.id === id * 1);
  const order = orders.find((order) => order.status === "cart");
  const orderInOrder = orders.find((order) => order.status === "order");

  const lineItem = lineItems.find(
    (lineItem) =>
      lineItem.productId === cupcake?.id && lineItem.orderId === order?.id
  );
  const lineItemToCheckOut = lineItems.find(
    (lineItem) =>
      lineItem.productId === cupcake?.id && lineItem.orderId === orderInOrder?.id
  );

  return {
    auth,
    cupcake,
    order,
    lineItem,
    lineItemToCheckOut,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createLineItem: (lineItem) => {
      dispatch(createLineItem(lineItem));
    },
    updateLineItem: (lineItem) => {
      dispatch(updateLineItem(lineItem));
    },
  };
};

export default connect(mapState, mapDispatch)(Cupcake);
