import React from "react";
import { connect } from "react-redux";

const Orders = ({ completedOrders, lineItems, products }) => {
  if (!completedOrders.length) return <div>No Orders</div>;

  return (
    <div className="orders">
      <h1 className="font-effect-shadow-multiple">My Orders</h1>
      <ul >
        {completedOrders.map((order) => {
          const associatedLineItems = lineItems.filter(
            (lineItem) => lineItem.orderId === order.id
          );
          
          let total=0
          return (
            <li key={order.id} className="ordersList">
              <div className ='orderulcontainer'>
                <h2 className= 'ordersul'>Order ID: {order.id}</h2>
                <ul className='ordersul'>
                  {associatedLineItems.map((lineItem) => {
                    const product = products.find(
                      (product) => product.id === lineItem.productId
                    );
                    if(product){
                      total+= product.price*1 * lineItem.quantity
                      return (
                        <li key={lineItem.id} style={{display:'inline-block', padding:'20px'}}>
                          <img src = {product.image} style={{height:'100px', width:'100px'}}/> 
                          <div>{product.name} {product.category} ({lineItem.quantity})</div>
                          <div>Price: ${(product.price * lineItem.quantity).toFixed(2)}</div>
                        </li>
                    );
                    }
                  })}
                </ul>
                <div>Total price: ${total.toFixed(2)} </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapState = ({ orders, lineItems, products }) => {
  const completedOrders = orders.filter((order) => order.status === "order");
  return {
    completedOrders,
    lineItems,
    products,
  };
};

export default connect(mapState)(Orders);
