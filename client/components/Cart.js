import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';
import { auth, updateOrder, createOrder, createLineItem, totalAmount, loadLineItems } from '../store';

class Cart extends React.Component {
  constructor () {
    super();
    this.state ={
      orderTotal: 0,
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { auth, cart, updateOrder, createOrder, createLineItem } = this.props;
    if (auth.username) {
      const token = window.localStorage.getItem('token'); // How to get userId?
      updateOrder({ id: cart.id, status: 'order', userId: token });
    } else {
      const id = Math.floor(Math.random());
      createOrder({ id, status: 'order' });
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      for (const lineItem of existingCart) {
        createLineItem({ ...lineItem, orderId: id });
      }
    }
    window.alert('Successfully checked out!');
  }


  render () {
    const { auth, cart, associatedLineItems} = this.props;
    const { onClick } = this;
    if (auth.username) {
      if(!associatedLineItems.length) return <div>Empty Cart</div>;

      return (
        <div style={{marginBottom: '100%'}}>
          <h1>Cart</h1>
            <div className='cartBox'>
              <table>
                <tbody>
                   <tr>
                  <th style={{width: "150px"}}>Product Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th></th>
                  <th></th>
                  <th style={{width: "50px"}}>Price</th>
                </tr>
              {associatedLineItems.map(lineItem => {
                return (
                  <LineItemInCart lineItem={lineItem} key={lineItem.id} />
                )
              })}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td>$</td>
                </tr>
                </tbody>
              </table>
          </div>
          <button className='cartCheckout' onClick={onClick}>Continue to Checkout</button>
        </div>
      );
    }

    else {
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      if(!existingCart.length) return <div>Empty Cart</div>;

      return (
        <div style={{marginBottom: '100%'}}>
          <h1>Cart</h1>
          <div className='cartBox'>
            <table>
              <tbody>
                <tr>
                  <th style={{width: "150px"}}>Product Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th></th>
                  <th></th>
                  <th style={{width: "50px"}}>Price</th>
                </tr>
                {existingCart.map(lineItem => {
                  return (
                    <LineItemInCart lineItem={lineItem} key={lineItem.productId} />
                  )
                })}
               <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td>$</td>
              </tr>
            </tbody>
            </table>
          </div>
          <button className='cartCheckout' onClick={onClick}>Continue to Checkout</button>
        </div>
      );
    }
  }
};

const mapState = ({ auth, orders, lineItems}) => {
  const cart = orders.find(order => order.status === 'cart');
  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === cart?.id);
  return {
    auth,
    cart,
    associatedLineItems
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (order) => {
      dispatch(updateOrder(order));
    },
    createOrder: (order) => {
      dispatch(createOrder(order));
    },
    createLineItem: (lineItem) => {
      dispatch(createLineItem(lineItem));
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);