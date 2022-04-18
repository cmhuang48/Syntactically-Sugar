import React from 'react';
import { connect } from 'react-redux';

const Cupcake = ({ cupcake }) => {
  if(!cupcake) return null;
  
  return (
    <div>
      <h1>{cupcake.name} cupcake</h1>
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