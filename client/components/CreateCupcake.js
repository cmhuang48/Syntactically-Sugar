import React from 'react';
import { connect } from 'react-redux';
import { createCupcake } from '../store/cupcakes.js';

class CreateCupcake extends React.Component {
  constructor () {
    super();
    this.state = {
      category: 'cupcake',
      name: 'custom',
      flavor: '', 
      frosting: '',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit (ev) {
    ev.preventDefault();
    const { category, name, flavor, frosting, message } = this.state;
    this.props.createCupcake(category, name, flavor, frosting, message);
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    createCupcake: (category, name, flavor, frosting, message) => {
      dispatch(createCupcake(category, name, flavor, frosting, message))
    }
  };
};

export default connect(null, mapDispatch)(CreateCupcake);