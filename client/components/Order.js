import React from 'react';
import { connect } from 'react-redux';

const Order = (state) => {
  return (
    <div>
      <h1>Order</h1>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

const mapState = (state) => (state);

export default connect(mapState)(Order);