import React from 'react';
import { connect } from 'react-redux';

const Order = (props) => {
  const {cakes, cupcakes, orders, lineItems} = props
  if(!orders.length) return <div>No Orders</div>
  console.log('cakes', cakes)
  console.log('cupcakes', cupcakes)
  console.log('lineItems', lineItems)
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order =>{
          return(
            <li key = {order.id}>
              <div>
                <h2>Order ID: {order.id}</h2>
                <ul>{lineItems.map(item=>{
                  return(
                    <li key = {item.id}>{cakes.find(cake=>item.id === cake.lineItemId)?.name} ({item.quantity})</li>
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

export default connect(mapState)(Order);