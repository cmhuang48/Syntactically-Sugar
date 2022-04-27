import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';
import { auth, updateOrder, createOrder, createLineItem } from '../store';

class Cart extends React.Component {
  constructor () {
    super();
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
    const { auth, cart, associatedLineItems } = this.props;
    const { onClick } = this;

    console.log('cart', cart)
    console.log(associatedLineItems)

    if (auth.username) {
      if(!associatedLineItems.length) return <div>Empty Cart</div>;

      return (
        <div>
          <h1>Cart</h1>
          <ul>
            {associatedLineItems.map(lineItem => {
              return (
                <LineItemInCart lineItem={lineItem} key={lineItem.id} />
              )
            })}
          </ul>
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

const mapState = ({ auth, orders, lineItems }) => {
  const cart = orders.find(order => order.status === 'cart');
  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId = cart.id);
  console.log('state', cart)
  console.log('items', associatedLineItems);
  return {
    auth,
    cart,
    associatedLineItems
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadLineItems: ()  => {
      dispatch(loadLineItems());
    },
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