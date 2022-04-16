const Sequelize = require('sequelize')
const db = require('../db')
const { INTEGER, STRING, ENUM } = Sequelize

const Cake = db.define('cake', {
  name: {
    type: ENUM(['vanilla', 'chocolate', 'red velvet', 'custom'])
  },

  tiers: {
    type: ENUM(['1', '2', '3'])
  },

  flavor: {
    type: ENUM(['vanilla', 'chocolate', 'strawberry'])
  },

  frosting: {
    type: ENUM(['vanilla', 'chocolate', 'strawberry'])
  },

  message: {
    type: STRING
  },

  price: {
    type: INTEGER
  }
});

module.exports = Cake;