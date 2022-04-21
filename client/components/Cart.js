import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';

const Cart = ({ orders, lineItems }) => {
  const cart = orders.find(order => order.status === 'cart')
  console.log(cart)
  if(!cart) return <div>Empty Cart</div> 

  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === cart.id)
  console.log(associatedLineItems)

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {associatedLineItems.map(lineItem => {
          <LineItemInCart lineItem={lineItem} />
        })}
      </ul>
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Cart);