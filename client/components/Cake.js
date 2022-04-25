import React from 'react';
import { connect } from 'react-redux';
import { createLineItem, updateLineItem } from '../store/lineItems';

class Cake extends React.Component {
  constructor () {
    super();
    this.state = {
      quantity: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { auth, cake, order, lineItem, createLineItem, updateLineItem } = this.props;
    const { quantity } = this.state;
    if (auth.username) {
      if (!lineItem) {
        const newItem = {quantity:quantity, productId: cake.id, orderId: order.id}
        createLineItem(newItem);
      } else {
        const updatedItem = {id:lineItem.id, quantity:quantity, productId:cake.id, orderId: order.id}
        updateLineItem(updatedItem);
      }
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      if (existingCart[cake.id]) {
        existingCart[cake.id] = existingCart[cake.id]*1 + quantity*1;
        updateLineItem(existingCart)
      } else {
        existingCart[cake.id] = quantity;
        createLineItem(existingCart)
      }
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
    }
    window.alert('Added to cart!');
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { cake } = this.props;
    const { quantity } = this.state;
    const { onChange, onSubmit } = this;
    if(!cake) return null;

    return (
      <div className='cake-details'>
        <img src={cake.image}/>
        <div className='cake-add-to-cart'>
          <h1>{cake.name} cake</h1>
          <p>Price: ${cake.price}</p>
          <form onSubmit={onSubmit}>
            <p>Quantity: <input name='quantity' value={quantity} type='number' min='1' max='10' onChange={onChange} /></p>
            <button>Add to Cart</button>
          </form>
        </div>
      </div>
    );
  }
};

const mapState = ({ auth, products, orders, lineItems }, { match: { params: { id } } }) => {
  const cake = products.find(product => product.id === id*1);
  const order = orders.find(order => order.status === 'cart');
  const lineItem = lineItems.find(lineItem => lineItem.productId === cake.id && lineItem.orderId === order?.id);
  return {
    auth,
    cake,
    order,
    lineItem
  };
};

const mapDispatch = (dispatch) => {
  return {
    createLineItem: (item) => {
      dispatch(createLineItem(item));
    },
    updateLineItem: (item) => {
      dispatch(updateLineItem(item));
    }
  };
};

export default connect(mapState, mapDispatch)(Cake);