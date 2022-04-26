import React from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store/products'

class CreateCake extends React.Component {
  constructor () {
    super();
    this.state = {
      name: 'custom',
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
    const { category } = this.props;
    const { name, tiers, flavor, frosting, message } = this.state;
    if (category === 'cake') {
      this.props.createProduct(category, name, tiers, flavor, frosting, message);
    } 
    else if (category === 'cupcake') {
      this.props.createProduct(category, name, null, flavor, frosting, message);
    }
  }
  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render () {
    const { category } = this.props;
    const { tiers, flavor, frosting, message } = this.state;
    const { onChange, onSubmit } = this;
    if (category === 'cake') {
      return (
        <form onSubmit={onSubmit}>
          <select name='tiers' value={tiers} onChange={onChange}>
            <option value=''>Select Number of Tiers</option>
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
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
          <button disabled={!tiers || !flavor || !frosting}>Add Custom Order</button>
        </form>
      );
    } 
    else if (category === 'cupcake') {
      return (
        <form onSubmit={onSubmit}>
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
          <button disabled={!flavor || !frosting}>Add Custom Order</button>
        </form>
      );
    }
  };
};

const mapDispatch = (dispatch) => {
  return {
    createProduct: (category, name, tiers, flavor, frosting, message) => {
      dispatch(createProduct(category, name, tiers, flavor, frosting, message))
    }
  };
};

export default connect(null, mapDispatch)(CreateCake);