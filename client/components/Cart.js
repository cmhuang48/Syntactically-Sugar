import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ orders, lineItems, products }) => {
  const cart = orders.find(order => order.status === 'cart')
  if(!cart) return <div>Empty Cart</div> 

  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId !== cart.id)

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {associatedLineItems.map(lineItem => {
          const product = products.find(product => product.id === lineItem.productId)
          return (
            <li key={lineItem.id}>
              {product.name} {product.category} ({lineItem.quantity})
            </li>
          )
        })}
      </ul>
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Cart);