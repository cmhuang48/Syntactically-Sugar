import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Cupcakes = ({ cupcakes }) => {
  return (
    <div>
      <h1>Cupcakes</h1>
      <ul>
        {cupcakes.map(cupcake => {
          return <li key={cupcake.id}><Link to = {`/cupcakes/${cupcake.id}`}>{cupcake.name}</Link></li>
        })}
        <li key='custom'><CreateProduct category='cupcake' /></li>
      </ul>
    </div>
  );
};

const mapState = ({ products }) => {
  const cupcakes = products.filter(product => product.category === 'cupcake');
  return {
    cupcakes
  };
};

export default connect(mapState)(Cupcakes);