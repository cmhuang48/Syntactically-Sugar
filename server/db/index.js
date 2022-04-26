//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const LineItem = require('./models/LineItem')
const Product = require('./models/Product')

//associations could go here!
Order.belongsTo(User)
User.hasMany(Order)
LineItem.belongsTo(Order)
Order.hasMany(LineItem) 
LineItem.belongsTo(Product)
Product.hasMany(LineItem)

module.exports = {
  db,
  models: {
    User,
    Order,
    LineItem,
    Product
  },
}