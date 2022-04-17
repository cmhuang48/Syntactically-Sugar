import React from 'react';
import { connect } from 'react-redux';

const Order = (props) => {
  const {cakes, cupcakes, orders, lineItems} = props
  if(!orders.length) return null
  console.log("cakes", cakes)
  console.log("lineItems", lineItems)

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order =>{
          return(
            <li>
              <div>
                <h2>{order.id}</h2>
                <ul>{lineItems.map(item=>{
                  return(
                    <li>{cakes.find(cake=>item.cakeId === cake.id)} {item.quantity}</li>
                  )
                })}</ul>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

const mapState = (state) => state

export default connect(mapState)(Order);