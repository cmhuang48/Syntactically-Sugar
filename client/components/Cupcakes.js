import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Cupcakes = ({ cupcakes }) => {
  return (
    <div>
      <h1>Cupcakes</h1>
      <ul>
        {cupcakes.map(cupcake => {
          return <li key={cupcake.id}><Link to = {`/cupcakes/${cupcake.id}`}>{cupcake.name}</Link></li>
        })}
      </ul>
    </div>
  );
};

const mapState = ({ cupcakes }) => ({ cupcakes });

export default connect(mapState)(Cupcakes);