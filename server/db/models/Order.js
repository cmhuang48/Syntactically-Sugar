const Sequelize = require('sequelize')
const db = require('../db')
const { UUID, UUIDV4, ENUM } = Sequelize

const Order = db.define('order', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  status: {
    type: ENUM(['cart', 'order']),
    allowNull: false,
    defaultValue: 'cart'
  }
});

module.exports = Order;