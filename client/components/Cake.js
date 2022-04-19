import React from 'react';
import { connect } from 'react-redux';
import { createLineItem } from '../store/lineItems';

const Cake = ({ cake, createLineItem }) => {
  if(!cake) return null;
  
  return (
    <div className='cake-details'>
		
	  		<img src={cake.image}/>
		
	  <div className='cake-add-to-cart'>
		<h1>{cake.name} cake</h1>
		<p>Price: ${cake.price}</p>
		<p>Quantity: <input type='number' min='1' max='10' /></p>
		<button onClick={() => createLineItem(1)}>Add to Cart</button>
	  </div>
    </div>
  );
};

const mapState = ({ products }, { match: { params: { id } } })=>{
  const cake = products.find(product => product.id === id*1);
  return {
    cake
  };
};

const mapDispatch = (dispatch) => {
  return {
    createLineItem: (quantity) => {
      dispatch(createLineItem(quantity));
    }
  };
};

export default connect(mapState, mapDispatch)(Cake);