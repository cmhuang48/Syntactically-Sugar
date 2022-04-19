const Sequelize = require('sequelize')
const db = require('../db')
const { ENUM, STRING, INTEGER } = Sequelize

const Product = db.define('product', {
  category: {
    type: ENUM(['cake', 'cupcake'])
  },
  
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

const test = ()=>console.log(Object.values(Product.tableAttributes.name.type)[0])

test()


module.exports = Product;