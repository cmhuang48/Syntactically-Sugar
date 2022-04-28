import React from 'react';
import { connect } from 'react-redux';
import { loadLineItems, updateLineItem, deleteLineItem } from '../store';

const LineItemInCart = ({ lineItem, auth, products, loadLineItems, updateLineItem, deleteLineItem }) => {
  const destroy = () => {
    if (auth.username) {
      deleteLineItem(lineItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      existingCart = existingCart.filter(obj => obj.productId !== lineItem.productId);
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      loadLineItems();
    }
  };

  const increase = () => {
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
      loadLineItems();
    }
  };

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
        <td>{currentQuantity}</td>
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
      <tr>
      </tr>
      <tr>
      </tr>
    </>
  );
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