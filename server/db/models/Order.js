const Sequelize = require('sequelize')
const db = require('../db')
const { ENUM, STRING } = Sequelize

const Order = db.define('order', {
  status: {
    type: ENUM(['cart', 'order']),
    allowNull: false,
    defaultValue: 'cart'
  },

  firstName: {
    type: STRING
  },

  lastName: {
    type: STRING
  },

  address1: {
    type: STRING
  },

  address2: {
    type: STRING
  },

  city: {
    type: STRING
  },

  state: {
    type: STRING
  },

  zip: {
    type: STRING
  },

  country: {
    type: STRING
  },

  cardName: {
    type: STRING
  },

  cardNumber: {
    type: STRING
  },

  expDate: {
    type: STRING
  },

  cvv: {
    type: STRING
  }
});

module.exports = Order;