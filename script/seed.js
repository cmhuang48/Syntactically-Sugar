'use strict'

const {db, models: { User, Cake, Cupcake, LineItem, Order } } = require('../server/db')

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

  const cakes = await Promise.all([
    Cake.create({ name: 'chocolate' }),
    Cake.create({ name: 'red velvet' })
  ])

  console.log(`seeded ${cakes.length} cakes`)

  const cupcakes = await Promise.all([
    Cupcake.create({ name: 'chocolate' }),
    Cupcake.create({ name: 'red velvet' })
  ])

  console.log(`seeded ${cupcakes.length} cupcakes`)

  const order = await Order.create({ status: 'incomplete order' })

  console.log('seeded order')

<<<<<<< HEAD
  const lineItem = await LineItem.create({ cakeId: cupcakes[0].id })

=======
  const lineItem = LineItem.create({ cakeId: cupcakes[0].id })
  
>>>>>>> c38c88d4dac8ffb4194a548de844c945eeddb175
  console.log('seeded line item')

  cakes[0].lineItemId = lineItem.id
  lineItem.orderId = order.id

  await cakes[0].save()
  await lineItem.save()

  console.log(`seeded successfully`)
  
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    cakes: {
      chocolate: cakes[0],
      red_velvet: cakes[1]
    },
    cupcakes: {
      chocolate: cupcakes[0],
      red_velvet: cupcakes[1]
    }
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
