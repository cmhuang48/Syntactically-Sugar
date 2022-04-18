const Sequelize = require('sequelize')
const db = require('../db')
const { INTEGER } = Sequelize

const LineItem = db.define('line item', {
  quantity: {
    type: INTEGER,
    defaultValue: 0
  }
});

module.exports = LineItem;