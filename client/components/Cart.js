import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';
import { createLineItem } from '../store/lineItems';
import { createOrder } from '../store/orders';

class Cart extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { auth, orders, lineItems } = this.props
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
                <LineItemInCart lineItem={lineItem} key={lineItem.id}/>
              )
            })}
          </ul>
          <button>Checkout</button>
        </div>
      );
    }

    else {
      let existingCart = this.props.lineItems[0]? this.props.lineItems[0]: {};

      if(!Object.keys(existingCart).length) return <div>Empty Cart</div>

      const associatedLineItems = [];
      for (let productId in existingCart) {
        associatedLineItems.push({'productId': productId, 'quantity': existingCart[productId]})
      }

      return (
        <div>
          <h1>Cart</h1>
          <ul>
            {associatedLineItems.map(lineItem => {
              return (
                <LineItemInCart lineItem={lineItem} key={lineItem.productId}/>
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