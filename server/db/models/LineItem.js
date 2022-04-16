const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER, STRING, ENUM} = Sequelize

const LineItem = db.define('line item', {
  productName: {
    type: STRING
  },

  quantity: {
    type: INTEGER
  }
})

module.exports = LineItem;