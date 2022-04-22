import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';

const Cart = ({ orders, lineItems }) => {
  const cart = orders.find(order => order.status === 'cart')
  if(!cart) return <div>Empty Cart</div> 

  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === cart.id)

  if(!associatedLineItems.length) return <div>Empty Cart</div> 

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {associatedLineItems.map(lineItem => {
          return (
            <LineItemInCart lineItem={lineItem} key={lineItem.id} />
          )
        })}
      </ul>
      <button>Checkout</button>
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Cart);