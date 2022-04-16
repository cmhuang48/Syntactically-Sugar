import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateCake from './CreateCake';

const Cakes = ({ cakes }) => {
  return (
    <div>
      <h1>Cakes</h1>
      <ul>
        {cakes.map(cake => {
          return <li key={cake.id}><Link to = {`/cakes/${cake.id}`}>{cake.name}</Link></li>
        })}
        <li key='custom'><CreateCake /></li>
      </ul>
    </div>
  );
};

const mapState = ({ cakes }) => ({ cakes });

export default connect(mapState)(Cakes);