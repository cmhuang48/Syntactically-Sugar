import React from "react";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import Box from "@material-ui/core/Box";

import { createLineItem, updateLineItem } from "../store";

class Cupcake extends React.Component {
  constructor () {
    super();
    this.state = {
      quantity: 1,
      alert: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate () {
    if(this.state.alert) setTimeout(()=>this.setState({ alert: false }), 2000);
  }

  componentWillUnmount () {
    this.setState({ alert: false });
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { auth, cupcake, order, lineItem, createLineItem, updateLineItem } = this.props;
    const { quantity } = this.state;
    if (auth.username) {
      if (lineItem) {
        const updatedLineItem = {
          id: lineItem.id,
          quantity: lineItem.quantity * 1 + quantity * 1,
          productId: cupcake.id,
          orderId: order.id,
        };
        updateLineItem(updatedLineItem);
      } else {
        const newLineItem = {
          quantity: quantity * 1,
          productId: cupcake.id,
          orderId: order.id,
        };
        createLineItem(newLineItem);
      }
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem("cart"));
      let existingLineItem = existingCart.find((obj) => obj.productId === cupcake.id);
      const idx = existingCart.indexOf(existingLineItem);
      if (existingLineItem) {
        existingLineItem.quantity = existingLineItem.quantity * 1 + quantity * 1;
        existingCart[idx] = existingLineItem;
      } else {
        existingLineItem = { productId: cupcake.id, quantity: quantity * 1 };
        existingCart.push(existingLineItem);
      }
      window.localStorage.setItem("cart", JSON.stringify(existingCart));
    }
    this.setState({ alert: true });
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { cupcake } = this.props;
    const { quantity, alert } = this.state;
    const { onChange, onSubmit } = this;

    if (!cupcake) return null;

    return (
      <div className="cake-details" >
        <img src={cupcake.image} style={{height:'650px', width:'650px', border:"1px solid black"}}/>
        <div className="cake-add-to-cart">
          <h1 >{cupcake.name} Cupcake</h1>
          <p style={{textAlign:'center'}}>Price: ${cupcake.price}</p>
          <p style={{textAlign:'center'}}>In Stock: {cupcake.quantityInStock}</p>
          <form onSubmit={onSubmit} style={{textAlign:'center'}}>
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
            <button className="submitButton">Add to Cart</button>
          </form>
          {alert ?
          <Box sx={{ width: '100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10px' }} spacing={2}>
            <Alert severity="success">Added to cart!</Alert>
          </Box> :
          null}
        </div>
      </div>
    );
  }
};

const mapState = ({ auth, products, orders, lineItems }, { match: { params: { id } } }) => {
  const cupcake = products.find((product) => product.id === id * 1);
  const order = orders.find((order) => order.status === "cart");
  const lineItem = lineItems.find((lineItem) => lineItem.productId === cupcake?.id && lineItem.orderId === order?.id);
  return {
    auth,
    cupcake,
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

export default connect(mapState, mapDispatch)(Cupcake);
