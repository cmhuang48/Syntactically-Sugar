import React from 'react';
import { connect } from 'react-redux';

const Cupcake = ({ cupcake }) => {
  if(!cupcake) return null;
  
  return (
    <div className='cake-details'>
      <img src={cupcake.image}/>
      <div className='cake-add-to-cart'>
        <h1>{cupcake.name} cupcake</h1>
        <p>Price: ${cupcake.price}</p>
        <p>Quantity: <input type='number' min='1' max='10'/></p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

const mapState = ({ products }, { match: { params: { id } } })=>{
  const cupcake = products.find(product => product.id === id*1);
  return {
    cupcake
  };
};

export default connect(mapState)(Cupcake);