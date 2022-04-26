const Sequelize = require('sequelize')
const db = require('../db')
const { ENUM } = Sequelize

const Order = db.define('order', {
  status: {
    type: ENUM(['cart', 'order']),
    allowNull: false,
    defaultValue: 'cart'
  }
});

module.exports = Order;