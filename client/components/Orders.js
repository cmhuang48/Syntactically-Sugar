import React from 'react';
import { connect } from 'react-redux';

const Orders = ({ complete, lineItems, products }) => {
  if(!complete.length) return <div>No Orders</div> 
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {complete.map(order => {
          const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === order.id)
          return (
            <li key = {order.id}>
              <div>
                <h2>Order ID: {order.id}</h2>
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
            </li>
          )
        })}
      </ul>
    </div>
  );
};

const mapState = ({orders, lineItems, products}) => {
  const complete = orders.filter(order => order.status === "order")
  return{
    complete,
    lineItems,
    products
  }
};

export default connect(mapState)(Orders);