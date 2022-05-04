const Sequelize = require('sequelize')
const db = require('../db')
const { ENUM, STRING, INTEGER } = Sequelize

const Product = db.define('product', {
  category: {
    type: ENUM(['cake', 'cupcake'])
  },
  
  name: {
    type: STRING
  },
  
  size: {
    type: INTEGER,
    defaultValue: 9
  },

  tiers: {
    type: ENUM(['1', '2', '3'])
  },

  flavor: {
    type: STRING
  },

  frosting: {
    type: STRING
  },

  message: {
    type: STRING
  },

  price: {
    type: INTEGER
  },

  quantityInStock: {
    type: INTEGER
  },
  
  image: {
    type: STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
  },

  size: {
    type: ENUM(['9', '12'])
  }
});

module.exports = Product;