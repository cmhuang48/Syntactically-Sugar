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
    User.create({ username: 'chanelle', password: '123', isAdmin: true, firstName: 'Chanelle', lastName: 'Huang', address1: '6525 W Sack Dr #306', city: 'Glendale', zip: '85308', state: 'Arkansas', country: 'U.S.A', cardName: 'Chanelle Huang', cardNumber: '5118900128185237', expDate: '7/24'}),
    User.create({ username: 'jiayu', password: '123', isAdmin: true, firstName: 'Jiayu', lastName: 'Zhang', address1: '6525 W Sack Dr #306', city: 'Glendale', zip: '85308', state: 'Arkansas', country: 'U.S.A', cardName: 'Jiayu Zhang', cardNumber: '5118900128185237', expDate: '7/24' }),
    User.create({ username: 'lauren', password: '123', isAdmin: true, firstName: 'Lauren', lastName: 'Cagnetta', address1: '6525 W Sack Dr #306', city: 'Glendale', zip: '85308', state: 'Arkansas', country: 'U.S.A', cardName: 'Lauren Cagnetta', cardNumber: '5118900128185237', expDate: '7/24' }),
    User.create({ username: 'sava', password: '123', isAdmin: true, firstName: 'Sava', lastName: 'Lin', address1: '6525 W Sack Dr #306', city: 'Glendale', zip: '85308', state: 'Arkansas', country: 'U.S.A', cardName: 'Sava Lin', cardNumber: '5118900128185237', expDate: '7/24'  }),
    User.create({ username: 'cody', password: '123', firstName: 'Cody', lastName: 'Cody', address1: '6525 W Sack Dr #306', city: 'Glendale', zip: '85308', state: 'Arkansas', country: 'U.S.A', cardName: 'Cody Cody', cardNumber: '5118900128185237', expDate: '7/24'  }),
    User.create({ username: 'murphy', password: '123', firstName: 'Murphy', lastName: 'Murphy', address1: '6525 W Sack Dr #306', city: 'Glendale', zip: '85308', state: 'Arkansas', country: 'U.S.A', cardName: 'Murphy Murphy', cardNumber: '5118900128185237', expDate: '7/24'  })
  ])

  console.log(`seeded ${users.length} users`)

  // Creating Cakes
  const cakes = await Promise.all([
    Product.create({ category: 'cake', name: 'Vanilla', price: 45.00, quantityInStock: 5, size: 9, image: 'https://static.onecms.io/wp-content/uploads/sites/19/2018/09/11/mrtrending_0905180427-2000.jpg' }),
    Product.create({ category: 'cake', name: 'Chocolate', price: 60.00, quantityInStock: 5, size: 12, image: 'https://64.media.tumblr.com/51947a2c282a410467a6efc04ec12e57/1c878b7e68f0b85f-cd/s540x810/78bcdc3929891608eefbc76b5f5fcff4666d3ab3.jpg' }),
    Product.create({ category: 'cake', name: 'Strawberry', price: 40.00, quantityInStock: 5, size: 9, image: "https://64.media.tumblr.com/c2756ccbc61bc7eebd8cce937f8fe8c6/1c878b7e68f0b85f-ae/s540x810/2f1ef9193485874ec945ded8b9e0290804481305.jpg" }),
    Product.create({ category: 'cake', name: 'Red Velvet', price: 50.00, quantityInStock: 10, size: 9, image: 'https://www.simplyrecipes.com/thmb/fWHkQtywilGAJCP_FFsyg7AOTRA=/3047x4570/filters:fill(auto,1)/Simply-Recipes-Red-Velvet-Cake-Lead-3-11190d90cd18461f9d0fa7b5e115b43d.jpg' }),
    Product.create({ category: 'cake', name: 'Rainbow', price: 60.00, quantityInStock: 10, size: 12, image: "https://www.sugarhero.com/wp-content/uploads/2019/03/rainbow-cake-3.jpg" }),
    Product.create({ category: 'cake', name: 'Funfetti', price: 50.00, quantityInStock: 3, size: 12, image: "https://www.onceuponachef.com/images/2020/09/Sprinkle-Funfetti-Cake-scaled.jpg" }),
    Product.create({ category: 'cake', name: 'Matcha', price: 50.00, quantityInStock: 6, size: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5tsrULea7UgME7rJ_1DCFVJYcqta52S3eA&usqp=CAU" }),
    Product.create({ category: 'cake', name: 'Tiramisu', price: 50.00, quantityInStock: 5, size: 12, image: "https://bakingamoment.com/wp-content/uploads/2017/06/IMG_3437-tiramisu-cake-square.jpg" }),
    Product.create({ category: 'cake', name: 'Pistachio', price: 50.00, quantityInStock: 8, size: 9, image: "https://64.media.tumblr.com/7794f3fb58dd75f9febca38751654e41/1c878b7e68f0b85f-35/s1280x1920/00da43f04aa76b16b405c75e1052f2c04a3dc8bb.jpg" }),
    Product.create({ category: 'cake', name: 'Seasonal: Lemon', price: 50.00, quantityInStock: 7, size: 12, image: "https://i.pinimg.com/736x/6c/f0/36/6cf036a90c176977997d9134d78d8087.jpg" }),
    Product.create({ category: 'cake', name: 'Carrot', price: 50.00, quantityInStock: 7, size: 12, image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco/k%2Farchive%2Fefb05f7945e573b58f04e5f6ed30fe5a2d687f7c" }),
    Product.create({ category: 'cake', name: 'Boston Creme', price: 40.00, quantityInStock: 7, size: 12, image: "https://www.bakefromscratch.com/wp-content/uploads/2017/06/BostonCreme954MBS.jpg" }),
    Product.create({ category: 'cake', name: 'Chocolate Chip', price: 50.00, quantityInStock: 7, size: 12, image: "https://www.ambitiouskitchen.com/wp-content/uploads/2020/01/Grain-Free-Peanut-Butter-Banana-Cake-5-1.jpg" }),
    Product.create({ category: 'cake', name: 'Chocolate Peanut Butter', price: 50.00, quantityInStock: 7, size: 12, image: "https://tastesbetterfromscratch.com/wp-content/uploads/2016/03/Chocolate-Peanut-Butter-Cake-21.jpg" }),
    Product.create({ category: 'cake', name: 'Cherry', price: 50.00, quantityInStock: 7, size: 12, image: "https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/01/cherry-chip-layer-cake-3.jpg" }),
    Product.create({ category: 'cake', name: 'Coconut', price: 50.00, quantityInStock: 7, size: 12, image: "https://i0.wp.com/www.mythreeseasons.com/wp-content/uploads/2019/04/Coconut-Layer-Cake-2-800x1200.jpg?resize=800%2C1200" }),
    Product.create({ category: 'cake', name: 'Coffee', price: 50.00, quantityInStock: 7, size: 12, image: "https://www.seasonsandsuppers.ca/wp-content/uploads/2017/03/berry-crumb-cake-4-3.jpg" }),
    Product.create({ category: 'cake', name: 'Cranberry', price: 50.00, quantityInStock: 7, size: 12, image: "https://www.savingdessert.com/wp-content/uploads/2020/12/Cranberry-Christmas-Cake-7-500x500.jpg" })
  ])

  console.log(`seeded ${cakes.length} cakes`)

  // Creating Cupcakes
  const cupcakes = await Promise.all([
    Product.create({ category: 'cupcake', name: 'Vanilla', price: 20, quantityInStock:10, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' }),
    Product.create({ category: 'cupcake', name: 'Chocolate', price: 20, quantityInStock: 10, image: 'https://images.unsplash.com/photo-1567022405855-fc2ce6befe33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80' }),
    Product.create({ category: 'cupcake', name: 'Strawberry', price: 20, quantityInStock: 10, image: 'https://static.toiimg.com/thumb/55599531.cms?imgsize=92701&width=800&height=800' }),
    Product.create({ category: 'cupcake', name: 'Red Velvet', price: 20, quantityInStock: 10, image: 'https://www.yourcupofcake.com/wp-content/uploads/2013/01/Red-Velvet-Cupcakes.jpg' }),
    Product.create({ category: 'cupcake', name: 'Rainbow', price: 20, quantityInStock: 10, image: "https://64.media.tumblr.com/ebad3e769425d9afee3e769526f614fe/d439913b40336189-a0/s1280x1920/97ce1e01353a2de19e3ecc18202ae8a739167e33.pnj" }),
    Product.create({ category: 'cupcake', name: 'Funfetti', price: 20, quantityInStock: 10, image: 'https://www.crazyforcrust.com/wp-content/uploads/2019/05/Easy-Funfetti-Cupcakes-3.jpg' }),
    Product.create({ category: 'cupcake', name: 'Pumpkin', price: 20, quantityInStock: 10, image: 'https://www.dinneratthezoo.com/wp-content/uploads/2019/09/pumpkin-cupcakes-1.jpg' }),
    Product.create({ category: 'cupcake', name: 'Oreo', price: 20, quantityInStock: 10, image: 'http://thedeliciousplate.com/wp-content/uploads/2020/07/IMG_6149.jpg' }),
    Product.create({ category: 'cupcake', name: 'Caramel', price: 20, quantityInStock: 10, image: 'https://thecakeblog.com/wp-content/uploads/2017/10/caramel-mocha-cupcakes-5.jpg' }),
    Product.create({ category: 'cupcake', name: 'Matcha', price: 20, quantityInStock: 10, image: 'https://i0.wp.com/kindlycoconut.com/wp-content/uploads/2021/08/Matcha-Cupcakes-recipe.jpg?fit=1000%2C1001&ssl=1' }),
    Product.create({ category: 'cupcake', name: 'Tiramisu', price: 20, quantityInStock: 10, image: 'https://rufflesandrainboots.com/wp-content/uploads/2020/03/make-tiramisu-cupcakes-for-a-baby-shower.jpg' }),
    Product.create({ category: 'cupcake', name: 'Pistachio', price: 20, quantityInStock: 10, image: 'https://i2.wp.com/www.twosisterscrafting.com/wp-content/uploads/2019/06/pistachio-cupcakes-with-pistachio-whipped-cream-frosting-main.jpg' }),
    Product.create({ category: 'cupcake', name: 'Seasonal: Lemon', price: 20, quantityInStock: 10, image: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/the-best-lemon-cupcakes-5.jpg' }),
    Product.create ({ category: 'cupcake', name: 'Boston Creme', price: 20, quantityInStock: 10, image: 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/cm/15/09/54ef8a57440e0_-_boston-cream-cupcakes-recipe-lg.jpg' }),
    Product.create({ category: 'cupcake', name: 'Carrot', price: 20, quantityInStock: 10, image: 'https://www.justataste.com/wp-content/uploads/2016/03/moist-carrot-cupcakes-cream-cheese-frosting-1-447x500.jpg' }),
    Product.create({ category: 'cupcake', name: 'Chocolate Peanut Butter', price: 20, quantityInStock: 10, image: 'https://www.thebakingfairy.net/wp-content/uploads/2019/08/choc_pb_cupcakes03.jpg' }),
    Product.create({ category: 'cupcake', name: 'Peanut Butter', price: 20, quantityInStock: 10, image: 'https://www.lifeloveandsugar.com/wp-content/uploads/2021/08/Peanut-Butter-Cupcakes4.jpg' }),
    Product.create({ category: 'cupcake', name: 'Purple Velvet', price: 20, quantityInStock: 10, image: 'https://i.pinimg.com/originals/a7/89/0a/a7890ab3f984ef28889f1f0c6fe0f534.jpg' }),
    Product.create({ category: 'cupcake', name: 'Strawberry Cheesecake', price: 20, quantityInStock: 10, image: 'https://blueskyeating.com/wp-content/uploads/2020/08/strawberry-cheesecake-cupcakes-720x900-1.jpg' }),
    Product.create({ category: 'cupcake', name: 'Banana Bread', price: 20, quantityInStock: 10, image: 'https://therecipecritic.com/wp-content/uploads/2021/08/bananacupcakes.jpg' }),
    Product.create({ category: 'cupcake', name: 'Coffee', price: 20, quantityInStock: 10, image: 'https://cdn.cupcakeproject.com/wp-content/uploads/2007/08/Coffee-Cupcakes-19.jpg' })
  ])

  console.log(`seeded ${cupcakes.length} cupcakes`)

  // Creating Orders
  const orders = await Promise.all(
    users.map(async (user) => {
      return await Order.create({ status: 'cart', userId: user.id})
    })
  )

  console.log(`seeded ${orders.length} orders`)

  // Creating Line Items
  const lineItems = await Promise.all([
    LineItem.create({ quantity: 1, productId: cakes[0].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, productId: cakes[1].id, orderId : orders[1].id }),
    LineItem.create({ quantity: 2, productId: cupcakes[0].id, orderId : orders[0].id }),
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
