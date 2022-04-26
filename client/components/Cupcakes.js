import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Cupcakes = ({ cupcakes }) => {
  return (
    <div>
      <h1>Cupcakes</h1>
      <ul className='cakeContainer'>
        {cupcakes.map(cupcake => {
          return ( 
            <li key={cupcake.id}>
              <Link to={`/cupcakes/${cupcake.id}`}>
                <div className='cakeBox'>
                  <img className='cakeImage' src={cupcake.image} />
                  <span className='product-title'>{cupcake.name}</span>
                </div>
              </Link>
            </li>
          )
        })}
        <li>
          <Link to={'/cupcakes/cupcake/custom'}>
            <div className='cakeBox'>
                <img className='cakeImage' src='https://images.creativemarket.com/0.1.0/ps/6337536/600/400/m2/fpnw/wm1/kyrxpus5cf11setgoakkc6bivngrm3dloqq5gotlosfroaknkr53xy8upaor8jtd-.jpg?1556962719&s=474ee12c8a3486dfbce8736c4a5cf584&fmt=webp' />
                <span className='product-title'>Create A Custom Cupcake</span>
            </div>
          </Link>
        </li>
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