import React from 'react';
import { connect } from 'react-redux';

const Cake = ({ cake }) => {
  if(!cake) return null;
  
  return (
    <div className='cake-details'>
		
	  		<img src={cake.image}/>
		
	  <div className='cake-add-to-cart'>
		<h1>{cake.name} cake</h1>
		<p>Price: ${cake.price}</p>
		<p>Quantity: <input type='number' min='1' max='10' /></p>
		<button>Add to Cart</button>
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

export default connect(mapState)(Cake);