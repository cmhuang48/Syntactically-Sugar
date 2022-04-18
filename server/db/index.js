//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const LineItem = require('./models/LineItem')
const Order = require('./models/Order')

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
    Product,
    LineItem,
    Order
  },
}
