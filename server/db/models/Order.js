const Sequelize = require("sequelize");
const db = require("../db");
const { ENUM, STRING, UUID, UUIDV4 } = Sequelize;

const Order = db.define("order", {
  id: {
    type: UUID,
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
  },

  status: {
    type: ENUM(["cart", "order"]),
    allowNull: false,
    defaultValue: "cart",
  },

  firstName: {
    type: STRING,
  },

  lastName: {
    type: STRING,
  },

  address1: {
    type: STRING,
  },

  address2: {
    type: STRING,
  },

  city: {
    type: STRING,
  },

  state: {
    type: STRING,
  },

  zip: {
    type: STRING,
  },

  country: {
    type: STRING,
  },

  cardName: {
    type: STRING,
  },

  cardNumber: {
    type: STRING,
  },

  expDate: {
    type: STRING,
  },

  cvv: {
    type: STRING,
  },
});

module.exports = Order;
