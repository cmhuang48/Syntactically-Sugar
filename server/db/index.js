//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Cake = require('./models/Cake')
const Cupcake = require('./models/Cupcake')
const LineItem = require('./models/LineItem')
const Order = require('./models/Order')


LineItem.belongsTo(Order)
Order.hasMany(LineItem) 
Order.belongsTo(User)
User.hasMany(Order)
Cake.belongsTo(LineItem)
Cupcake.belongsTo(LineItem)

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Cake, 
    Cupcake,
    LineItem,
    Order
  },
}
