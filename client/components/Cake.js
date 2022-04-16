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

const mapState = ({ cakes }, { match: { params: { id } } })=>{
  const cake = cakes.find(cake => cake.id === id*1);
  return {
    cake
  };
};

export default connect(mapState)(Cake);