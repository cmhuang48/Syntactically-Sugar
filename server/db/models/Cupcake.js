const Sequelize = require('sequelize')
const db = require('../db')
const { INTEGER, STRING, ENUM } = Sequelize

const Cupcake = db.define('cupcake', {
  name: {
    type: ENUM(['vanilla', 'chocolate', 'red velvet', 'custom'])
  },

  flavor:{
    type: ENUM(['vanilla', 'chocolate', 'strawberry'])
  },

  frosting:{
    type: ENUM(['vanilla', 'chocolate', 'strawberry'])
  },

  message: {
    type: STRING
  },

  price: {
    type: INTEGER
  }
});

module.exports = Cupcake;