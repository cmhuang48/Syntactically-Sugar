const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')
const {INTEGER, STRING, ENUM} = Sequelize

const Cake = db.define('cake', {
  //CHOCOLATE_CAKE, RED_VELVET
  name: {
    type: STRING
  },

  tiers:{
    type:INTEGER,
  },

  flavor:{
    type:STRING
  },

  frosting:{
    type:ENUM(['chocolate', 'vanilla', 'strawberry'])
  },

  message: {
    type: STRING
  }

})

const Cupcake = db.define('cupcake', {
  name: {
    type: STRING
  },

  flavor:{
    type:STRING
  },

  frosting:{
    type:ENUM(['chocolate', 'vanilla', 'strawberry'])
  },

  message: {
    type: STRING
  }
})

module.exports = {
  Cake, 
  Cupcake
}