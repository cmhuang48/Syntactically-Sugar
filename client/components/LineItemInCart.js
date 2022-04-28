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
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      let existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = totalQuantity*1 + 1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      updateLineItem(existingCart)
    }
  }

  onClick(){
    const { auth } = this.props 
    if(auth.username){

    if(totalQuantity === 1) { this.destroy() }

    this.setState({totalQuantity: totalQuantity*1 - 1});
    
    if (auth.username) {
      const updatedItem = { id: lineItem.id, totalQuantity: totalQuantity, productId: lineItem.productId, orderId: lineItem.orderId };
      updateLineItem(updatedItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      let existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = totalQuantity*1 - 1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      this.props.loadLineItems()
    }
  }

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

    return (
      <>
        <tr key={product.id}>
          <td className='cartImage'><a href={`/cakes/${product.id}`}><img src={product.image}/></a></td>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>{totalQuantity}</td>
          <td>
            <button className='increaseBtn' onClick={decrease}>-</button>
            {totalQuantity}
            <button className='decreaseBtn' onClick={increase}>+</button>
          </td>
          <td>
            <button className='deleteBtn' onClick={destroy}>Remove Item</button>
          </td>
          <td>${product.price * totalQuantity}</td>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
      </>
    );
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