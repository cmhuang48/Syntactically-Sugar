import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Cakes = ({ cakes }) => {
  return (
    <div>
      <h1 class = "font-effect-shadow-multiple">Cakes</h1>
      <ul className='cakeContainer'>
        {cakes.map(cake => {
          return (
            <li key={cake.id}>
              <Link to={`/cakes/${cake.id}`}>
                <div className='cakeBox'>
                  <img className='cakeImage' src={cake.image} />
                  <span className='product-title'>{cake.name}</span>
                </div>
              </Link>
            </li>
          )
        })}
        <li>
          <Link to='/cakes/custom'>
            <div className='cakeBox'>
              <img className='cakeImage' src='https://i.pinimg.com/originals/69/f6/86/69f686402cc4ea8d90857d12574d45cd.jpg' />
              <span className='product-title'>Create A Custom Cake</span>
            </div>
          </Link>
        </li>
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