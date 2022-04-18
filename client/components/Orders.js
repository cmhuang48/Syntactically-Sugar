import React from 'react';
import { connect } from 'react-redux';

const Orders = ({ orders, lineItems, products }) => {
  if(!orders.length) return <div>No Orders</div>
  console.log('lineItems', lineItems)
  console.log('products', products)
  
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => {
          return (
            <li key = {order.id}>
              <div>
                <h2>Order ID: {order.id}</h2>
                <ul>{lineItems.map(lineItem => {
                  return (
                    <li key={lineItem.id}>
                      {products.find(product => product.id === lineItem.productId).category} ({lineItem.quantity})
                    </li>
                  )
                })}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

const mapState = (state) => state;

export default connect(mapState)(Orders);