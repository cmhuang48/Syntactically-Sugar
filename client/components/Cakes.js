import React from 'react';
import { connect } from 'react-redux';

const Cakes = () => {
  return (
    <div>
      <h1>Cakes</h1>
      <ul>
        {cakes.map(cake => {
          <li></li>
        })}
      </ul>
    </div>
  )
}

export default connect(state => state)(Cakes);