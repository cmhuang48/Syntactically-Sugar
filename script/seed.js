'use strict'

const {db, models: { User, Product, LineItem, Order } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)

  // Creating Cakes
  const cakes = await Promise.all([
    Product.create({ category: 'cake', name: 'chocolate' }),
    Product.create({ category: 'cake', name: 'red velvet' })
  ])

  console.log(`seeded ${cakes.length} cakes`)

  // Creating Cupcakes
  const cupcakes = await Promise.all([
    Product.create({ category: 'cupcake', name: 'chocolate' }),
    Product.create({ category: 'cupcake', name: 'red velvet' })
  ])

  console.log(`seeded ${cupcakes.length} cupcakes`)

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ status: 'cart', userId: 1 }),
    Order.create({ status: 'order', userId: 2 })
  ])

  console.log(`seeded ${orders.length} orders`)

  // Creating Line Items
  const lineItems = await Promise.all([
    LineItem.create({ quantity: 1, productId: cakes[0].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, productId: cakes[1].id, orderId : orders[1].id }),
    LineItem.create({ quantity: 2, productId: cupcakes[0].id, orderId : orders[0].id })
  ])
  
  console.log(`seeded ${lineItems.length} line items`)

  console.log(`seeded successfully`)
  
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    cakes,
    cupcakes, 
    orders,
    lineItems
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
