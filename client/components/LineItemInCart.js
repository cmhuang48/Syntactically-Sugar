import React from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem } from '../store/lineItems';

class LineItemInCart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      totalQuantity: this.props.lineItem.quantity ? this.props.lineItem.quantity : 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { updateLineItem, lineItem } = this.props;
    const { totalQuantity } = this.state;
    updateLineItem(lineItem.id, null, lineItem.productId, lineItem.orderId, totalQuantity);
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { products, lineItem, deleteLineItem } = this.props;
    const { totalQuantity } = this.state;
    const { onChange, onSubmit } = this;

    const product = products.find(product => product.id === lineItem.productId)
    
    return (
      <li key={product.id}>
        {product.name} {product.category} ({lineItem.quantity})
        <form onSubmit={onSubmit}>
          <p>Quantity: <input name='totalQuantity' value={totalQuantity} type='number' min='1' max='10' onChange={onChange} /></p>
          <button>Update</button>
        </form>
        <button onClick={() => deleteLineItem(lineItem)}>Remove Item</button>
      </li>
    )
  }
};

const mapState = ({ products }) => ({ products });

const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (id, quantity, productId, orderId, totalQuantity) => {
      dispatch(updateLineItem(id, quantity, productId, orderId, totalQuantity));
    },
    deleteLineItem: (lineItem) => {
      dispatch(deleteLineItem(lineItem));
    }
  };
};

export default connect(mapState, mapDispatch)(LineItemInCart);