import React from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem } from '../store/lineItems';

class LineItemInCart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { updateLineItem, lineItem } = this.props;
    const { quantity } = this.state;
    updateLineItem(lineItem.id, quantity, lineItem.productId, lineItem.orderId);
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { product, lineItem, deleteLineItem } = this.props;
    const { quantity } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <li key={product.id}>
        {product.name} {product.category} ({lineItem.quantity})
        <form onSubmit={onSubmit}>
          <p>Quantity: <input name='quantity' value={quantity} type='number' min='1' max='10' onChange={onChange} /></p>
          <button>Update</button>
        </form>
        <button onClick={() => deleteLineItem(lineItem)}></button>
      </li>
    )
  }
};

const mapState = ({ products }) => {
  const lineItem = this.props;
  console.log(lineItem);
  const product = products.find(product => product.id === lineItem.productId);
  console.log(product)
  return {
    product
  }
};

const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (id, quantity, productId, orderId) => {
      dispatch(updateLineItem(id, quantity, productId, orderId));
    },
    deleteLineItem: (lineItem) => {
      dispatch(deleteLineItem(lineItem));
    }
  };
};

export default connect(mapState, mapDispatch)(LineItemInCart);