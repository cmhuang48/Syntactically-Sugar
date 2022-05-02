import React from 'react';
import { connect } from 'react-redux';

class CustomCake extends React.Component {
  constructor () {
    super();
    this.state = {
      category: 'cake',
      name: 'Custom',
      size: '',
      tiers: '', 
      flavor: '', 
      frosting: '',
      message: '',
      price: 100,
      image: 'https://i.pinimg.com/originals/69/f6/86/69f686402cc4ea8d90857d12574d45cd.jpg'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { category, name, size, tiers, flavor, frosting, message, price, image } = this.state;
    const newProduct = { category, name, size, tiers, flavor, frosting, message, price, image };
    const newLineItem = { quantity: 1, newProduct };
    const existingCart = JSON.parse(window.localStorage.getItem('cart'));
    existingCart.push(newLineItem);
    window.localStorage.setItem('cart', JSON.stringify(existingCart));
    window.alert('Added to cart!');
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  
  render () {
    const { size, tiers, flavor, frosting, message } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className = "custom-cake">
        <h1 className="font-effect-shadow-multiple">Create Your Own Cake</h1>
      <form onSubmit={onSubmit}>
        <select name='size' value={size} onChange={onChange}>
          <option value=''>Select Size</option>
          <option value='9'>9 inch</option>
          <option value='12'>12 inch</option>
        </select>
        <br />
        <select name='tiers' value={tiers} onChange={onChange}>
          <option value=''>Select Number of Tiers</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <br />
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
        <button disabled={!size || !tiers || !flavor || !frosting}>Add Custom Cake Order</button>
      </form>
      </div>
    );
  } 
};

const mapState = ({ orders }) => {
  const order = orders.find(order => order.status === 'cart');
  return {
    order
  };
};

export default connect(mapState)(CustomCake);