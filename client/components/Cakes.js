import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Cakes = ({ cakes }) => {
  return (
    <div>
      <h1>Cakes</h1>
	  <li key='custom'><CreateProduct category='cake' /></li>
      <ul className='cakeContainer'>
        {cakes.map(cake => {
          return(
			<Link to = {`/cakes/${cake.id}`}>
				<div className='cakeBox'>
					<img className='cakeImage' src={cake.image}/>
					<li key={cake.id}>
						<span className='product-title'>{cake.name}</span>
					</li>
				</div>
			</Link>
		)})}
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