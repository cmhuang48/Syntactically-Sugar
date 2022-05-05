import React from "react";
import { connect } from "react-redux";

import { createLineItem, updateLineItem } from "../store";

class Cake extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      tiers: 1,
      size: 9,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { auth, cake, order, lineItem, createLineItem, updateLineItem } =
      this.props;
    const { quantity, tiers, size } = this.state;
    if (auth.username) {
      if (lineItem) {
        const updatedLineItem = {
          id: lineItem.id,
          quantity: lineItem.quantity * 1 + quantity * 1,
          productId: cake.id,
          orderId: order.id,
          tiers: tiers,
          size: size,
        };
        updateLineItem(updatedLineItem);
      } else {
        const newLineItem = {
          quantity: quantity * 1,
          productId: cake.id,
          orderId: order.id,
          tiers: tiers * 1,
          size: size * 1,
        };
        createLineItem(newLineItem);
      }
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem("cart"));
      let existingLineItem = existingCart.find(
        (obj) => obj.productId === cake.id
      );
      const idx = existingCart.indexOf(existingLineItem);
      if (existingLineItem) {
        existingLineItem.quantity =
          existingLineItem.quantity * 1 + quantity * 1;
        existingCart[idx] = existingLineItem;
      } else {
        existingLineItem = { productId: cake.id, quantity: quantity * 1 };
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
    const { cake, auth, lineItemToCheckOut } = this.props;
    const { quantity, tiers, size } = this.state;
    const { onChange, onSubmit } = this;

    if (!cake) return null;

    return (
      <>
        <div className="cake-details">
          <img src={cake.image} />
          <div className="cake-add-to-cart">
            <h1>{cake.name} cake</h1>
            <p>Price: ${cake.price}</p>
            <p>
              In Stock: {cake.quantityInStock - lineItemToCheckOut?.quantity}
            </p>
            <form onSubmit={onSubmit}>
              <p>Tiers:</p>
              <select value={tiers} name="tiers" onChange={onChange}>
                <option value="">Select Number of Tiers</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <p>Size:</p>
              <select value={size} name="size" onChange={onChange}>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
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
  const cake = products.find((product) => product.id === id * 1);
  const order = orders.find((order) => order.status === "cart");
  const orderInOrder = orders.find((order) => order.status === "order");
  const lineItem = lineItems.find(
    (lineItem) =>
      lineItem.productId === cake?.id && lineItem.orderId === order?.id
  );
  const lineItemToCheckOut = lineItems.find(
    (lineItem) =>
      lineItem.productId === cake?.id && lineItem.orderId === orderInOrder?.id
  );
  return {
    auth,
    cake,
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

export default connect(mapState, mapDispatch)(Cake);
