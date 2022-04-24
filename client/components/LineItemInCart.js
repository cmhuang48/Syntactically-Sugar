import React from 'react';
import { connect } from 'react-redux';
import auth from '../store/auth';
import { updateLineItem, deleteLineItem } from '../store/lineItems';

class LineItemInCart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      totalQuantity: this.props.lineItem.quantity ? this.props.lineItem.quantity : 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  // componentDidUpdate (prevProps) {
  //   if (prevProps.lineItem !== this.props.lineItem) {
  //     this.setState({lineItem:this.props.lineItem})
  //   }
  // }

  onSubmit (ev) {
    ev.preventDefault();
    const { auth, updateLineItem, lineItem } = this.props;
    const { totalQuantity } = this.state;
    if (auth.username) {
      updateLineItem(lineItem.id, null, lineItem.productId, lineItem.orderId, totalQuantity);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'))
      existingCart[lineItem.productId = totalQuantity]
      window.localStorage.setItem('cart', JSON.stringify(existingCart))
      window.location.reload()
    }
  }

  onClick(){
    let existingCart = JSON.parse(window.localStorage.getItem('cart'));
    delete existingCart[this.props.lineItem.productId]
    window.localStorage.setItem('cart', JSON.stringify(existingCart));
    window.location.reload()
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    // console.log(window.localStorage);
    const { products, lineItem, deleteLineItem } = this.props;
    const { totalQuantity } = this.state;
    const { onChange, onSubmit, onClick } = this;

    const product = products.find(product => product?.id === lineItem.productId*1)
    // console.log(product)
    if(!product) return null

    if (auth.username) {  
      return (
        <li key={product.id}>
          {product.name} {product.category} ({lineItem.quantity})
          <form onSubmit={onSubmit}>
            <p>Quantity: <input name='totalQuantity' value={totalQuantity} type='number' min='1' max='10' onChange={onChange} /></p>
            <button>Update</button>
          </form>
          <button onClick={() => deleteLineItem(lineItem)}>Remove Item</button>
        </li>
      )
      } else {
        return (
          <li key={product.id}>
            {product.name} {product.category} ({lineItem.quantity})
            <form onSubmit={onSubmit}>
              <p>Quantity: <input name='totalQuantity' value={totalQuantity} type='number' min='1' max='10' onChange={onChange} /></p>
              <button>Update</button>
            </form>
            <button onClick={ onClick }>Remove Item</button>
          </li>
        )
      }
  }
};

const mapState = ({ auth, products }) => ({ auth, products });

const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (id, quantity, productId, orderId, totalQuantity) => {
      dispatch(updateLineItem(id, quantity, productId, orderId, totalQuantity));
    },
    deleteLineItem: (lineItem) => {
      dispatch(deleteLineItem(lineItem));
    }
  };
};

export default connect(mapState, mapDispatch)(LineItemInCart);