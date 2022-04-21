import React from 'react';
import { connect } from 'react-redux';

const Orders = ({ orders, lineItems, products }) => {
  if(!orders.length) return <div>No Orders</div> 
  
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => {
          const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === order.id)
          return (
            <li key = {order.id}>
              <div>
                <h2>Order ID: {order.id}</h2>
                <ul>
                  {associatedLineItems.map(lineItem => {
                    console.log(lineItem)
                    const product = products.find(product => product.id === lineItem.productId)
                    return (
                      <li key={lineItem.id}>
                        {product.name} {product.category} ({lineItem.quantity})
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