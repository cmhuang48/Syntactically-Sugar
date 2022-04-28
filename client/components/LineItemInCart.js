import React from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem } from '../store';
import {loadLineItems} from '../store'

<<<<<<< HEAD
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
=======
const LineItemInCart = ({ lineItem, auth, products, loadLineItems, updateLineItem, deleteLineItem }) => {
  const destroy = () => {
    if (auth.username) {
      deleteLineItem(lineItem);
>>>>>>> ad00cea7b00bfbcf0074942898f399c1a492aee6
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      existingCart = existingCart.filter(obj => obj.productId !== lineItem.productId);
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      updateLineItem(existingCart)
    }
  }

<<<<<<< HEAD
  onClick(){
    const { auth } = this.props 
    if(auth.username){

    if(totalQuantity === 1) { this.destroy() }

    this.setState({totalQuantity: totalQuantity*1 - 1});
    
=======
  const increase = () => {
>>>>>>> ad00cea7b00bfbcf0074942898f399c1a492aee6
    if (auth.username) {
      const updatedItem = { id: lineItem.id, quantity: lineItem.quantity*1+1, productId: lineItem.productId, orderId: lineItem.orderId };
      updateLineItem(updatedItem);
    } else {
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      const existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = existingLineItem.quantity*1+1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      this.props.loadLineItems()
    }
  }

<<<<<<< HEAD
  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { products, lineItem } = this.props;
    const { totalQuantity } = this.state;
    const { onChange, onSubmit, onClick } = this;

    const product = products.find(product => product?.id === lineItem.productId*1)
    if(!product) return null
=======
  const decrease = () => {
    if (lineItem.quantity === 1) { 
      destroy();
    }
    else if (auth.username) {
      const updatedItem = { id: lineItem.id, quantity: lineItem.quantity*1-1, productId: lineItem.productId, orderId: lineItem.orderId };
      updateLineItem(updatedItem);
    } else {
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      const existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = existingLineItem.quantity*1-1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      loadLineItems();
    }
  };

  const product = products.find(product => product?.id === lineItem.productId*1);
  if(!product) return null;
>>>>>>> ad00cea7b00bfbcf0074942898f399c1a492aee6

  let currentQuantity;
  if (auth.username) {
    currentQuantity = lineItem.quantity;
  } else {
    const existingCart = JSON.parse(window.localStorage.getItem('cart'));
    const existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
    currentQuantity = existingLineItem.quantity;
  }

  return (
    <>
      <tr key={product.id}>
        <td className='cartImage'><a href={`/cakes/${product.id}`}><img src={product.image}/></a></td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>
          <button className='increaseBtn' onClick={decrease}>-</button>
          {currentQuantity}
          <button className='decreaseBtn' onClick={increase}>+</button>
        </td>
        <td>
          <button className='deleteBtn' onClick={destroy}>Remove Item</button>
        </td>
        <td>${product.price * currentQuantity}</td>
      </tr>
    </>
  );
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