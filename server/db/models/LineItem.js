const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, STRING } = Sequelize;

const LineItem = db.define("lineItem", {
  quantity: {
    type: INTEGER,
    defaultValue: 1,
  },
  tiers: {
    type: INTEGER,
  },
  size: {
    type: INTEGER,
  },
});

module.exports = LineItem;
