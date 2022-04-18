import React from 'react';
import { connect } from 'react-redux';

const Order = (props) => {
  const { products, orders, lineItems } = props;

  if(!orders.length) return null;
  console.log("products", products);
  console.log("lineItems", lineItems);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order =>{
          return(
            <li>
              <div>
                <h2>{order.id}</h2>
                <ul>{lineItems.map(lineItem=>{
                  return(
                    <li>{lineItem.productId} {lineItem.quantity}</li>
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