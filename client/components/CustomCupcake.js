import React from 'react';
import { connect } from 'react-redux';

class CustomCupcake extends React.Component {
  constructor () {
    super();
    this.state = {
      category: 'cupcake',
      name: 'Custom',
      flavor: '', 
      frosting: '',
      message: '',
      price: 12,
      image: 'https://images.creativemarket.com/0.1.0/ps/6337536/600/400/m2/fpnw/wm1/kyrxpus5cf11setgoakkc6bivngrm3dloqq5gotlosfroaknkr53xy8upaor8jtd-.jpg?1556962719&s=474ee12c8a3486dfbce8736c4a5cf584&fmt=webp'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { category, name, flavor, frosting, message, price, image } = this.state;
    const newProduct = { category, name, flavor, frosting, message, price, image };
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
    const { flavor, frosting, message } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className = "custom-cupcake">
      <div className = "row">
      <div className = "column1">
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
      <div className = "examples"> 
      <h1 className = "font-effect-shadow-multiple">Some of our past work:</h1> 
        <img className = "photoex" src="https://myincrediblerecipes.com/wp-content/uploads/2022/02/Pink-Velvet-Funetti-Cupcakes-25.jpg" alt="custom cake" />
        <img className = "photoex" src="https://www.cookingclassy.com/wp-content/uploads/2016/01/chocolate_cupcakes_raspberry_buttercream6...jpg" alt="custom cake" />
      </div>
      </div>
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

export default connect(mapState)(CustomCupcake);