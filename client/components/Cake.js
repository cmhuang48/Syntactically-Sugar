import React from 'react';
import { connect } from 'react-redux';

const Cake = ({ cake }) => {
  if(!cake) return null;
  
  return (
    <div>
      <h1>{cake.name} cake</h1>
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