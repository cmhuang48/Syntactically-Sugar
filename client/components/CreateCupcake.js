import React from 'react';
import { connect } from 'react-redux';
import { createProduct, createLineItem } from '../store';

class CreateCupcake extends React.Component {
  constructor () {
    super();
    this.state = {
      category: 'cupcake',
      name: 'Custom',
      flavor: '', 
      frosting: '',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { auth, order, createProduct, createLineItem } = this.props;
    const { category, name, flavor, frosting, message } = this.state;
    if (auth.username) {
      const id = Math.floor(Math.random()); // How to set UUID?
      const newProduct = { id, category, name, flavor, frosting, message };
      createProduct(newProduct);
      const newLineItem = { quantity: 1, productId: id, orderId: order.id };
      createLineItem(newLineItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      const id = Math.floor(Math.random()); // How to set UUID?
      const newLineItem = { quantity: 1, productId: id };
      existingCart.push(newLineItem);
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
    }
    window.alert('Added to cart!');
  }
  
  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { flavor, frosting, message } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className = "custom-cupcake">
        <h1 className="font-effect-shadow-multiple">Create Your Own Cupcake</h1>
      <form onSubmit={onSubmit}>
        <select name='flavor' value={flavor} onChange={onChange}>
          <option value=''>Select Flavor</option>
          <option value='vanilla'>Vanilla</option>
          <option value='chocolate'>Chocolate</option>
          <option value='strawberry'>Strawberry</option>
        </select>
        <br />
        <select name='frosting' value={frosting} onChange={onChange}>
          <option value=''>Select Frosting</option>
          <option value='vanilla'>Vanilla</option>
          <option value='chocolate'>Chocolate</option>
          <option value='strawberry'>Strawberry</option>
        </select>
        < br />
        <input name='message' value={message} placeholder='Enter Message' onChange={onChange} />
        < br />
        <button disabled={!flavor || !frosting}>Add Custom Cupcake Order</button>
      </form>
      </div>
    );
  }
};

const mapState = ({ auth, orders }) => {
  const order = orders.find(order => order.status === 'cart');
  return {
    auth, 
    order
  };
};

const mapDispatch = (dispatch) => {
  return {
    createProduct: (product) => {
      dispatch(createProduct(product));
    },
    createLineItem: (lineItem) => {
      dispatch(createLineItem(lineItem));
    }
  };
};

export default connect(mapState, mapDispatch)(CreateCupcake);