const Sequelize = require('sequelize')
const db = require('../db')
const { UUID, UUIDV4, INTEGER, STRING, ENUM } = Sequelize

const Order = db.define('order', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  status: {
    type: ENUM(['completed order', 'incomplete order']),
    allowNull: false,
    defaultValue: 'incomplete order'
  }
})

module.exports = Order;