import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';
import { createLineItem } from '../store/lineItems';
import { createOrder } from '../store/orders';
import auth from '../store/auth';

class Cart extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    let existingCart = JSON.parse(window.localStorage.getItem('cart'));
    if(!auth.username && Object.keys(existingCart).length){
      for (const productId in existingCart) {
        const myItem = this.props.lineItems.find(item => item.productId === productId)
        if(myItem) this.props.updateLineItem(existingCart[productId], productId, null)
        else this.props.createLineItem(existingCart[productId], productId, null);
      }
    }
  }

  render(){
    const { auth, orders, lineItems, createLineItem, createOrder } = this.props
    if (auth.username) {
      const cart = orders.find(order => order.status === 'cart')
      if(!cart) return <div>Empty Cart</div>
    
      const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === cart.id)
    
      if(!associatedLineItems.length) return <div>Empty Cart</div> 
    
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
          <button>Checkout</button>
        </div>
      );
    }

    else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));

      if(!Object.keys(existingCart).length) return <div>Empty Cart</div>

      const associatedLineItems = lineItems.filter(lineItem => !lineItem.orderId)

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
          <button>Checkout</button>
        </div>
      );
    }
  }
}

  
  

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    createLineItem: (quantity, productId, orderId) => {
      dispatch(createLineItem(quantity, productId, orderId))
    },
    createOrder: (status) => {
      dispatch(createOrder(status))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart);