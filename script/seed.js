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
    User.create({ username: 'chanelle', password: '123', isAdmin: true }),
    User.create({ username: 'jiayu', password: '123', isAdmin: true }),
    User.create({ username: 'lauren', password: '123', isAdmin: true }),
    User.create({ username: 'savannah', password: '123', isAdmin: true }),
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' })
  ])

  console.log(`seeded ${users.length} users`)

  // Creating Cakes
  const cakes = await Promise.all([
    Product.create({ category: 'cake', name: 'Vanilla', price: 45.00, image: 'https://cdn.pixabay.com/photo/2020/04/20/16/59/cake-5069043_1280.jpg' }),
    Product.create({ category: 'cake', name: 'Chocolate', price: 60.00, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1578&q=80' }),
    Product.create({ category: 'cake', name: 'Strawberry', price: 40.00, image: "https://tatyanaseverydayfood.com/wp-content/uploads/2014/04/Strawberries-and-Cream-Cake-869x1024.jpg" }),
    Product.create({ category: 'cake', name: 'Red Velvet', price: 50.00, image: 'https://www.simplyrecipes.com/thmb/fWHkQtywilGAJCP_FFsyg7AOTRA=/3047x4570/filters:fill(auto,1)/Simply-Recipes-Red-Velvet-Cake-Lead-3-11190d90cd18461f9d0fa7b5e115b43d.jpg' }),
    Product.create({ category: 'cake', name: 'Rainbow', price: 60.00, image: "https://www.sugarhero.com/wp-content/uploads/2019/03/rainbow-cake-3.jpg" }),
    Product.create({ category: 'cake', name: 'Funfetti', price: 50.00, image: "https://www.onceuponachef.com/images/2020/09/Sprinkle-Funfetti-Cake-scaled.jpg" })
  ])

  console.log(`seeded ${cakes.length} cakes`)

  // Creating Cupcakes
  const cupcakes = await Promise.all([
    Product.create({ category: 'cupcake', name: 'Vanilla', price: 20, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' }),
    Product.create({ category: 'cupcake', name: 'Chocolate', price: 20, image: 'https://images.unsplash.com/photo-1567022405855-fc2ce6befe33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80' }),
    Product.create({ category: 'cupcake', name: 'Strawberry', price: 20, image: 'https://static.toiimg.com/thumb/55599531.cms?imgsize=92701&width=800&height=800' }),
    Product.create({ category: 'cupcake', name: 'Red Velvet', price: 20, image: 'https://ofbatteranddough.com/wp-content/uploads/2017/02/Red-velvet-cupcakes-cream-cheese-buttercream-12.jpg' }),
    Product.create({ category: 'cupcake', name: 'Rainbow', price: 20, image: "https://64.media.tumblr.com/ebad3e769425d9afee3e769526f614fe/d439913b40336189-a0/s1280x1920/97ce1e01353a2de19e3ecc18202ae8a739167e33.pnj" }),
    Product.create({ category: 'cupcake', name: 'Funfetti', price: 20, image: 'https://www.crazyforcrust.com/wp-content/uploads/2019/05/Easy-Funfetti-Cupcakes-3.jpg' })
  ])

  console.log(`seeded ${cupcakes.length} cupcakes`)

  // Creating Orders
  const orders = await Promise.all(
    users.map(async (user) => {
      return await Order.create({ status: 'cart', userId: user.id})
    })
  )

  // Create Order Example
  const orderExample = await Order.create({status: 'cart', userId: 5})

  console.log(`seeded ${orders.length} orders`)

  // Creating Line Items
  const lineItems = await Promise.all([
    LineItem.create({ quantity: 1, productId: cakes[0].id, orderId: orderExample.id }),
    LineItem.create({ quantity: 2, productId: cakes[1].id, orderId : orderExample.id }),
    LineItem.create({ quantity: 2, productId: cupcakes[0].id, orderId : orderExample.id })
  ])
  
  console.log(`seeded ${lineItems.length} line items`)

  console.log(`seeded successfully`)
  
  return {
    users: {
      cody: users[3],
      murphy: users[6]
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
