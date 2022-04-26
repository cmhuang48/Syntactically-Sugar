import React from 'react';
import { connect } from 'react-redux';
import { loadLineItems, updateLineItem, deleteLineItem } from '../store';

class LineItemInCart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      totalQuantity: this.props.lineItem.quantity ? this.props.lineItem.quantity : 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { auth, loadLineItems, updateLineItem, lineItem } = this.props;
    const { totalQuantity } = this.state;
    if (auth.username) {
      const updatedItem = { id: lineItem.id, totalQuantity: totalQuantity, productId: lineItem.productId, orderId: lineItem.orderId };
      updateLineItem(updatedItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      let existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = totalQuantity*1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      loadLineItems();
    }
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onClick () {
    const { auth, loadLineItems, deleteLineItem, lineItem } = this.props;
    if (auth.username) {
      deleteLineItem(lineItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      existingCart = existingCart.filter(obj => obj.productId !== lineItem.productId);
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      loadLineItems();
    }
  }

  render () {
    const { products, lineItem, auth } = this.props;
    const { totalQuantity } = this.state;
    const { onChange, onSubmit, onClick } = this;

    const product = products.find(product => product?.id === lineItem.productId*1);
    if(!product) return null;

    if (auth.username) {  
      return (
        <li key={product.id}>
          {product.name} {product.category} ({lineItem.quantity})
          <form onSubmit={onSubmit}>
            <p>Quantity: <input name='totalQuantity' value={totalQuantity} type='number' min='1' max='10' onChange={onChange} /></p>
            <button>Update</button>
          </form>
          <button onClick={onClick}>Remove Item</button>
        </li>
      )
    } 
    
    else {
      return (
        <li key={product.id}>
          {product.name} {product.category} ({lineItem.quantity})
          <form onSubmit={onSubmit}>
            <p>Quantity: <input name='totalQuantity' value={totalQuantity} type='number' min='1' max='10' onChange={onChange} /></p>
            <button>Update</button>
          </form>
          <button onClick={onClick}>Remove Item</button>
        </li>
      )
    }
  }
};

const mapState = ({ auth, products }) => ({ auth, products });

const mapDispatch = (dispatch) => {
  return {
    loadLineItems: ()=>{
      dispatch(loadLineItems());
    },
    updateLineItem: (lineItem) => {
      dispatch(updateLineItem(lineItem));
    },
    deleteLineItem: (lineItem) => {
      dispatch(deleteLineItem(lineItem));
    }
  };
};

export default connect(mapState, mapDispatch)(LineItemInCart);