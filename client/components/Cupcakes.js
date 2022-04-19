import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Cupcakes = ({ cupcakes }) => {
  return (
    <div>
      <h1>Cupcakes</h1>
	  <li key='custom'><CreateProduct category='cupcake' /></li>
      <ul className='cakeContainer'>
        {cupcakes.map(cupcake => {
          return ( 
				<Link to = {`/cupcakes/${cupcake.id}`}>
					<li key={cupcake.id}>
						<img className='cakeImage' src={cupcake.image}/>
						<span className='product-title'>{cupcake.name}</span>
					</li>
				</Link>
			)
        })}
        
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