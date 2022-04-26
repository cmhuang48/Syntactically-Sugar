import React from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem } from '../store';
import {loadLineItems} from '../store'

class LineItemInCart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      totalQuantity: this.props.lineItem.quantity ? this.props.lineItem.quantity : 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { auth, updateLineItem, lineItem } = this.props;
    const { totalQuantity } = this.state;
    if (auth.username) {
      const updatedItem = {id:lineItem.id, productId:lineItem.productId, orderId:lineItem.orderId, totalQuantity:totalQuantity}
      updateLineItem(updatedItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'))
      existingCart[lineItem.productId] = totalQuantity;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      updateLineItem(existingCart)
    }
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onClick () {
    const { auth } = this.props 
    if (auth.username) {

    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      delete existingCart[this.props.lineItem.productId]
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      this.props.loadLineItems()
    }
  }

  render () {
    const { products, lineItem, deleteLineItem, auth } = this.props;
    const { totalQuantity } = this.state;
    const { onChange, onSubmit, onClick } = this;

    const product = products.find(product => product?.id === lineItem.productId*1)
    if(!product) return null

    if (auth.username) {  
      return (
        <li key={product.id}>
          {product.name} {product.category} ({lineItem.quantity})
          <form onSubmit={onSubmit}>
            <p>Quantity: <input name='totalQuantity' value={totalQuantity} type='number' min='1' max='10' onChange={onChange} /></p>
            <button>Update</button>
          </form>
          <button onClick={() => {deleteLineItem(lineItem)}}>Remove Item</button>
        </li>
      )
      } else {
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
    updateLineItem: (item) => {
      dispatch(updateLineItem(item));
    },
    deleteLineItem: (lineItem) => {
      dispatch(deleteLineItem(lineItem));
    },
    loadLineItems: ()=>{
      dispatch(loadLineItems())
    }
  };
};

export default connect(mapState, mapDispatch)(LineItemInCart);