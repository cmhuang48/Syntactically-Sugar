import React from 'react';
import { connect } from 'react-redux';
import { createProduct, createLineItem } from '../store';

class CreateCake extends React.Component {
  constructor () {
    super();
    this.state = {
      category: 'cake',
      name: 'Custom',
      tiers: '', 
      flavor: '', 
      frosting: '',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { auth, createProduct } = this.props;
    const { category, name, tiers, flavor, frosting, message } = this.state;
    const newProduct = { category, name, tiers, flavor, frosting, message };
    if (auth.username) {
      // creates new product and new lineItem
      createProduct(newProduct);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      const newLineItem = { quantity: 1, newProduct };
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
    const { tiers, flavor, frosting, message } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form onSubmit={onSubmit}>
        <select name='tiers' value={tiers} onChange={onChange}>
          <option value=''>Select Number of Tiers</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <select name='flavor' value={flavor} onChange={onChange}>
          <option value=''>Select Flavor</option>
          <option value='vanilla'>Vanilla</option>
          <option value='chocolate'>Chocolate</option>
          <option value='strawberry'>Strawberry</option>
        </select>
        <select name='frosting' value={frosting} onChange={onChange}>
          <option value=''>Select Frosting</option>
          <option value='vanilla'>Vanilla</option>
          <option value='chocolate'>Chocolate</option>
          <option value='strawberry'>Strawberry</option>
        </select>
        <input name='message' value={message} placeholder='Enter Message' onChange={onChange} />
        <button disabled={!tiers || !flavor || !frosting}>Add Custom Cake Order</button>
      </form>
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

export default connect(mapState, mapDispatch)(CreateCake);