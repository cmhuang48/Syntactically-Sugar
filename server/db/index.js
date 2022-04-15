//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Cake = require('./models/Cake')
const Cupcake = require('./models/Cupcake')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Cake, 
    Cupcake
  },
}
