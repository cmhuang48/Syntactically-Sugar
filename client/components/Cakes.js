import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Cakes = ({ cakes }) => {
  return (
    <div>
      <h1>Cakes</h1>
      <ul>
        {cakes.map(cake => {
          return <li key={cake.id}><Link to = {`/cakes/${cake.id}`}>{cake.name}</Link></li>
        })}
        <li key='custom'><CreateProduct category='cake' /></li>
      </ul>
    </div>
  );
};

const mapState = ({ products }) => {
  const cakes = products.filter(product => product.category === 'cake');
  return {
    cakes
  };
};

export default connect(mapState)(Cakes);