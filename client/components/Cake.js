import React from "react";
import { connect } from "react-redux";
import { createLineItem, updateLineItem } from "../store";

class Cake extends React.Component {
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
    const { auth, cake, order, lineItem, createLineItem, updateLineItem } =
      this.props;
    const { quantity } = this.state;
    if (auth.username) {
      if (lineItem) {
        const updatedLineItem = {
          id: lineItem.id,
          quantity: lineItem.quantity * 1 + quantity * 1,
          productId: cake.id,
          orderId: order.id,
        };
        updateLineItem(updatedLineItem);
      } else {
        const newLineItem = {
          quantity: quantity * 1,
          productId: cake.id,
          orderId: order.id,
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
    const { cake } = this.props;
    const { quantity } = this.state;
    const { onChange, onSubmit } = this;
    if (!cake) return null;

    return (
      <>
        <div className="cake-details">
          <img src={cake.image} />
          <div className="cake-add-to-cart">
            <h1>{cake.name} cake</h1>
            <p>In Stock</p>
            <p>Price: ${cake.price}</p>
            <form onSubmit={onSubmit}>
              <p>
                Quantity: {}
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
  const lineItem = lineItems.find(
    (lineItem) =>
      lineItem.productId === cake.id && lineItem.orderId === order?.id
  );
  return {
    auth,
    cake,
    order,
    lineItem,
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
