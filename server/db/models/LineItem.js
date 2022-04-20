const Sequelize = require('sequelize')
const db = require('../db')
const { INTEGER } = Sequelize

const LineItem = db.define('lineItem', {
  quantity: {
    type: INTEGER,
    defaultValue: 1
  }
});

module.exports = LineItem;