import React from "react";
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';

const Orders = ({ completedOrders, lineItems, products, users }) => {
  if (!completedOrders.length) return <div>No Orders</div>;

  const [page, setPage] = React.useState(1);
  const amountPerPage = 5;
  const indexOfLastOrder = page * amountPerPage;
  const indexOfFirstOrder = indexOfLastOrder - amountPerPage;
  const currentOrders = completedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  return (
    <>
      <Pagination className='pagination' count={Math.ceil(products.length / amountPerPage)} onChange={(ev, page) => setPage(page)} />
      <div className="orders">
        <h1 className="font-effect-shadow-multiple">Completed Orders</h1>
        <ul>
          {currentOrders.map((order) => {
            const associatedLineItems = lineItems.filter(
              (lineItem) => lineItem.orderId === order.id
            );
            
            let total = 0;
            
            return (
              <li key={order.id} className="ordersList">
                <div className ='orderulcontainer'>
                  <h2 className= 'ordersul'>Order ID: {order.id}</h2>
                  <h2>Order made by: Customer {users.find(user=> user.id === order.userId).username}</h2>
                  <ul className='ordersul'>
                    {associatedLineItems.map((lineItem) => {
                      const product = products.find(
                        (product) => product.id === lineItem.productId
                      );
                      if(product){
                        total+= product.price*1 * lineItem.quantity
                        return (
                          <li key={lineItem.id} style={{display:'inline-block', padding:'20px'}}>
                            <img src = {product.image} style={{height:'100px', width:'100px', border:"1px solid black"}}/> 
                            <div>{product.name} {product.category} ({lineItem.quantity})</div>
                            <div>Price: ${(product.price * lineItem.quantity).toFixed(2)}</div>
                          </li>
                      );
                      }
                    })}
                  </ul>
                  <div>Total Price: ${total.toFixed(2)} </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Pagination className='pagination' count={Math.ceil(products.length / amountPerPage)} onChange={(ev, page) => setPage(page)} />
    </>
  );
};

const mapState = ({ orders, lineItems, products, users}) => {
  let completedOrders = orders.filter((order) => order.status === "order");
  return {
    completedOrders,
    lineItems,
    products,
    users,
  };
};

export default connect(mapState)(Orders);