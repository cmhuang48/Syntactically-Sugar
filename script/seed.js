"use strict";

const {
  db,
  models: { User, Product, LineItem, Order },
} = require("../server/db");
const faker = require('faker');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Admins
  const admins = await Promise.all([
    User.create({
      username: "chanelle",
      password: "123",
      isAdmin: true,
      firstName: "Chanelle",
      lastName: "Huang",
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCodeByState(),
      state: faker.address.stateAbbr(),
      country: faker.address.countryCode(),
      cardName: 'Chanelle Huang',
      cardNumber: faker.finance.creditCardNumber(),
      expDate: `${Math.floor(Math.random()*(12-1)+1)}/${Math.floor(Math.random()*(30-22)+22)}`,
    }),
    User.create({
      username: "jiayu",
      password: "123",
      isAdmin: true,
      firstName: "Jiayu",
      lastName: "Zhang",
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCodeByState(),
      state: faker.address.stateAbbr(),
      country: faker.address.countryCode(),
      cardName: 'Jiayu Zhang',
      cardNumber: faker.finance.creditCardNumber(),
      expDate: `${Math.floor(Math.random()*(12-1)+1)}/${Math.floor(Math.random()*(30-22)+22)}`,
    }),
    User.create({
      username: "lauren",
      password: "123",
      isAdmin: true,
      firstName: "Lauren",
      lastName: "Cagnetta",
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCodeByState(),
      state: faker.address.stateAbbr(),
      country: faker.address.countryCode(),
      cardName: 'Lauren Cagnetta',
      cardNumber: faker.finance.creditCardNumber(),
      expDate: `${Math.floor(Math.random()*(12-1)+1)}/${Math.floor(Math.random()*(30-22)+22)}`,
    }),
    User.create({
      username: "sava",
      password: "123",
      isAdmin: true,
      firstName: "Sava",
      lastName: "Lin",
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCodeByState(),
      state: faker.address.stateAbbr(),
      country: faker.address.countryCode(),
      cardName: 'Sava Lin',
      cardNumber: faker.finance.creditCardNumber(),
      expDate: `${Math.floor(Math.random()*(12-1)+1)}/${Math.floor(Math.random()*(30-22)+22)}`,
    }),
  ]);
  console.log(`seeded ${admins.length} admins`);

  // Creating Users
  const cody = {
    username: "cody",
    password: "123",
    firstName: "Cody",
    lastName: faker.name.lastName(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    zip: faker.address.zipCodeByState(),
    state: faker.address.stateAbbr(),
    country: faker.address.countryCode(),
    cardName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    cardNumber: faker.finance.creditCardNumber(),
    expDate: `${Math.floor(Math.random()*(12-1)+1)}/${Math.floor(Math.random()*(30-22)+22)}`,
  }

  const users = [cody, ...Array(100).map(user => ({
    username: faker.internet.userName(),
    password: "123",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    zip: faker.address.zipCodeByState(),
    state: faker.address.stateAbbr(),
    country: faker.address.countryCode(),
    cardName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    cardNumber: faker.finance.creditCardNumber(),
    expDate: `${Math.floor(Math.random()*(12-1)+1)}/${Math.floor(Math.random()*(30-22)+22)}`,
  }))];

  const createdUsers = await Promise.all(
    users.map(async (user) => {
      return await User.create(user);
    })
  );

  console.log(`seeded ${users.length} users`);

  // Creating Cakes
  const cakes = await Promise.all([
    Product.create({
      category: "cake",
      name: "Vanilla",
      price: 45.0,
      quantityInStock: 5,
      image:
        "https://static.onecms.io/wp-content/uploads/sites/19/2018/09/11/mrtrending_0905180427-2000.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Chocolate",
      price: 60.0,
      quantityInStock: 5,
      image:
        "https://64.media.tumblr.com/51947a2c282a410467a6efc04ec12e57/1c878b7e68f0b85f-cd/s540x810/78bcdc3929891608eefbc76b5f5fcff4666d3ab3.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Strawberry",
      price: 40.0,
      quantityInStock: 5,
      image:
        "https://64.media.tumblr.com/c2756ccbc61bc7eebd8cce937f8fe8c6/1c878b7e68f0b85f-ae/s540x810/2f1ef9193485874ec945ded8b9e0290804481305.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Red Velvet",
      price: 50.0,
      quantityInStock: 10,
      image:
        "https://www.simplyrecipes.com/thmb/fWHkQtywilGAJCP_FFsyg7AOTRA=/3047x4570/filters:fill(auto,1)/Simply-Recipes-Red-Velvet-Cake-Lead-3-11190d90cd18461f9d0fa7b5e115b43d.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Rainbow",
      price: 60.0,
      quantityInStock: 10,
      image:
        "https://www.sugarhero.com/wp-content/uploads/2019/03/rainbow-cake-3.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Funfetti",
      price: 50.0,
      quantityInStock: 3,
      image:
        "https://www.onceuponachef.com/images/2020/09/Sprinkle-Funfetti-Cake-scaled.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Matcha",
      price: 50.0,
      quantityInStock: 6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5tsrULea7UgME7rJ_1DCFVJYcqta52S3eA&usqp=CAU",
    }),
    Product.create({
      category: "cake",
      name: "Tiramisu",
      price: 50.0,
      quantityInStock: 5,
      image:
        "https://bakingamoment.com/wp-content/uploads/2017/06/IMG_3437-tiramisu-cake-square.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Pistachio",
      price: 50.0,
      quantityInStock: 8,
      image:
        "https://64.media.tumblr.com/7794f3fb58dd75f9febca38751654e41/1c878b7e68f0b85f-35/s1280x1920/00da43f04aa76b16b405c75e1052f2c04a3dc8bb.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Seasonal: Lemon",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://i.pinimg.com/736x/6c/f0/36/6cf036a90c176977997d9134d78d8087.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Carrot",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco/k%2Farchive%2Fefb05f7945e573b58f04e5f6ed30fe5a2d687f7c",
    }),
    Product.create({
      category: "cake",
      name: "Boston Creme",
      price: 40.0,
      quantityInStock: 7,
      image:
        "https://www.bakefromscratch.com/wp-content/uploads/2017/06/BostonCreme954MBS.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Chocolate Chip",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://www.ambitiouskitchen.com/wp-content/uploads/2020/01/Grain-Free-Peanut-Butter-Banana-Cake-5-1.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Chocolate Peanut Butter",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://tastesbetterfromscratch.com/wp-content/uploads/2016/03/Chocolate-Peanut-Butter-Cake-21.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Cherry",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://i2.wp.com/completelydelicious.com/wp-content/uploads/2020/01/cherry-chip-layer-cake-3.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Coconut",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://i0.wp.com/www.mythreeseasons.com/wp-content/uploads/2019/04/Coconut-Layer-Cake-2-800x1200.jpg?resize=800%2C1200",
    }),
    Product.create({
      category: "cake",
      name: "Coffee",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://www.seasonsandsuppers.ca/wp-content/uploads/2017/03/berry-crumb-cake-4-3.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Cranberry",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://www.savingdessert.com/wp-content/uploads/2020/12/Cranberry-Christmas-Cake-7-500x500.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Gluten-free Persian",
      price: 50.0,
      quantityInStock: 7,
      image:
        "http://img.taste.com.au/9nTHFPeD/taste/2016/11/top-50-cakes-image-12-66330-1.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Black Forrest",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Black_Forest_gateau.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Hummingbird",
      price: 50.0,
      quantityInStock: 7,
      image:
        "http://img.taste.com.au/E-7EMn0o/taste/2016/11/top-50-cakes-image-16-66335-1.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Tres Leches",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://gypsyplate.com/wp-content/uploads/2021/06/Berry-Tres-Leches-Cake-Recipe-5.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Coconut",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://gypsyplate.com/wp-content/uploads/2021/06/Coconut-Cake-Reshoot_10.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Mango",
      price: 50.0,
      quantityInStock: 7,
      image:
      "https://gypsyplate.com/wp-content/uploads/2021/06/Mango-Cake-Recipe-7-1024x1536-1.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Raspberry Tiramisu",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://gypsyplate.com/wp-content/uploads/2021/06/Raspberry-Tiramisu-Cake-Recipe.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Lemon Mousse",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://gypsyplate.com/wp-content/uploads/2021/06/Lemon-Mousse-Cake-2.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Irish Whiskey",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://gypsyplate.com/wp-content/uploads/2021/06/TheLittleEpicurean-st-patricks-day-stout-chocolate-cake.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Golden Key Caramel",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://gypsyplate.com/wp-content/uploads/2021/06/Golden-Key-Caramel-Cake-Recipe-2.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Glazed Brown Sugar Bunt",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://www.aheadofthyme.com/wp-content/uploads/2018/11/glazed-brown-sugar-bundt-cake-8.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Chocolate and Vanilla",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://img.huffingtonpost.com/asset/62155245360000396024f6a9.jpeg?cache=QCUvQjVgZC&ops=scalefit_960_noupscale&format=webp",
    }),
    Product.create({
      category: "cake",
      name: "Three Layer Pineapple Upside Down Cheesecake",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://img.huffingtonpost.com/asset/5b9eb2da250000330036f741.jpeg?ops=scalefit_960_noupscale&format=webp",
    }),
    Product.create({
      category: "cake",
      name: "Vanilla Caramel Latte",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://img.huffingtonpost.com/asset/5b9eb2de250000360036f743.png?ops=scalefit_960_noupscale&format=webp",
    }),
    Product.create({
      category: "cake",
      name: "Ultimate Chocolate Chip Cookie Layer",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://www.lifeloveandsugar.com/wp-content/uploads/2015/02/The_Ultimate_Chocolate_Chip_Cookie_Cake6.jpg",
    }),
    Product.create({
      category: "cake",
      name: "Chocolate Peanut Butter Cup Pretzel",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://img.huffingtonpost.com/asset/5b9eb2e22000004e00fe770d.png?ops=scalefit_960_noupscale&format=webp",
    }),
    Product.create({
      category: "cake",
      name: "Cereal Supreme",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://img.huffingtonpost.com/asset/5b9eb2e42100003100c607b4.jpeg?ops=scalefit_960_noupscale&format=webp",
    }),
    Product.create({
      category: "cake",
      name: "Maltesers",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://img.taste.com.au/pGPVBBO5/w354-h236-cfill-q80/taste/2016/11/amazing-maltesers-cake-74777-1.jpeg",
    }),
    Product.create({
      category: "cake",
      name: "German Chocolate",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_1392,h_1740/k%2FPhoto%2FRecipes%2F2020-02-How-To-German-Chocolate-Cake%2FHT-German-Chocolate-Cake_051",
    }),
    Product.create({
      category: "cake",
      name: "Banana Pudding",
      price: 50.0,
      quantityInStock: 7,
      image:
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_1392,h_1740/k%2FPhoto%2FRecipes%2F2019-12-banana-pudding-cake%2F2019230IMG_0004-Edit-411",
    }),


  ]);

  console.log(`seeded ${cakes.length} cakes`);

  // Creating Cupcakes
  const cupcakes = await Promise.all([
    Product.create({
      category: "cupcake",
      name: "Vanilla",
      price: 20,
      quantityInStock: 10,
      image:
        "https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    }),
    Product.create({
      category: "cupcake",
      name: "Chocolate",
      price: 20,
      quantityInStock: 10,
      image:
        "https://images.unsplash.com/photo-1567022405855-fc2ce6befe33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    }),
    Product.create({
      category: "cupcake",
      name: "Strawberry",
      price: 20,
      quantityInStock: 10,
      image:
        "https://static.toiimg.com/thumb/55599531.cms?imgsize=92701&width=800&height=800",
    }),
    Product.create({
      category: "cupcake",
      name: "Red Velvet",
      price: 20,
      quantityInStock: 10,
      image:
        "https://www.yourcupofcake.com/wp-content/uploads/2013/01/Red-Velvet-Cupcakes.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Rainbow",
      price: 20,
      quantityInStock: 10,
      image:
        "https://64.media.tumblr.com/ebad3e769425d9afee3e769526f614fe/d439913b40336189-a0/s1280x1920/97ce1e01353a2de19e3ecc18202ae8a739167e33.pnj",
    }),
    Product.create({
      category: "cupcake",
      name: "Funfetti",
      price: 20,
      quantityInStock: 10,
      image:
        "https://www.crazyforcrust.com/wp-content/uploads/2019/05/Easy-Funfetti-Cupcakes-3.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Pumpkin",
      price: 20,
      quantityInStock: 10,
      image:
        "https://www.dinneratthezoo.com/wp-content/uploads/2019/09/pumpkin-cupcakes-1.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Oreo",
      price: 20,
      quantityInStock: 10,
      image:
        "http://thedeliciousplate.com/wp-content/uploads/2020/07/IMG_6149.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Caramel",
      price: 20,
      quantityInStock: 10,
      image:
        "https://thecakeblog.com/wp-content/uploads/2017/10/caramel-mocha-cupcakes-5.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Matcha",
      price: 20,
      quantityInStock: 10,
      image:
        "https://i0.wp.com/kindlycoconut.com/wp-content/uploads/2021/08/Matcha-Cupcakes-recipe.jpg?fit=1000%2C1001&ssl=1",
    }),
    Product.create({
      category: "cupcake",
      name: "Tiramisu",
      price: 20,
      quantityInStock: 10,
      image:
        "https://rufflesandrainboots.com/wp-content/uploads/2020/03/make-tiramisu-cupcakes-for-a-baby-shower.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Pistachio",
      price: 20,
      quantityInStock: 10,
      image:
        "https://i2.wp.com/www.twosisterscrafting.com/wp-content/uploads/2019/06/pistachio-cupcakes-with-pistachio-whipped-cream-frosting-main.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Seasonal: Lemon",
      price: 20,
      quantityInStock: 10,
      image:
        "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/the-best-lemon-cupcakes-5.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Boston Creme",
      price: 20,
      quantityInStock: 10,
      image:
        "https://hips.hearstapps.com/wdy.h-cdn.co/assets/cm/15/09/54ef8a57440e0_-_boston-cream-cupcakes-recipe-lg.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Carrot",
      price: 20,
      quantityInStock: 10,
      image:
        "https://www.justataste.com/wp-content/uploads/2016/03/moist-carrot-cupcakes-cream-cheese-frosting-1-447x500.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Chocolate Peanut Butter",
      price: 20,
      quantityInStock: 10,
      image:
        "https://www.thebakingfairy.net/wp-content/uploads/2019/08/choc_pb_cupcakes03.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Peanut Butter",
      price: 20,
      quantityInStock: 10,
      image:
        "https://www.lifeloveandsugar.com/wp-content/uploads/2021/08/Peanut-Butter-Cupcakes4.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Purple Velvet",
      price: 20,
      quantityInStock: 10,
      image:
        "https://i.pinimg.com/originals/a7/89/0a/a7890ab3f984ef28889f1f0c6fe0f534.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Strawberry Cheesecake",
      price: 20,
      quantityInStock: 10,
      image:
        "https://blueskyeating.com/wp-content/uploads/2020/08/strawberry-cheesecake-cupcakes-720x900-1.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Banana Bread",
      price: 20,
      quantityInStock: 10,
      image:
        "https://therecipecritic.com/wp-content/uploads/2021/08/bananacupcakes.jpg",
    }),
    Product.create({
      category: "cupcake",
      name: "Coffee",
      price: 20,
      quantityInStock: 10,
      image:
        "https://cdn.cupcakeproject.com/wp-content/uploads/2007/08/Coffee-Cupcakes-19.jpg",
    }),
  ]);

  console.log(`seeded ${cupcakes.length} cupcakes`);

  // Creating Carts
  const carts = await Promise.all(
    [...createdUsers, ...admins].map(async (user) => {
      return await Order.create({ status: "cart", userId: user.id });
    })
  );


  console.log(`seeded ${carts.length} carts`);

  // Creating Orders
  const orders = await Promise.all(
    [...createdUsers, ...admins].map(async (user) => {
      return await Order.create({ status: 'order', userId: user.id });
    })   
  );
    
  console.log(`seeded ${orders.length} orders`);

  // Creating Line Items
  const lineItems = await Promise.all(
    [...orders].map(async (order) => {
      await LineItem.create({
        quantity: Math.floor(Math.random()*(10-1)+1),
        productId: cakes[Math.floor(Math.random()*(18-1)+1)].id,
        orderId: order.id,
      })
      return await LineItem.create({
        quantity: Math.floor(Math.random()*(10-1)+1),
        productId: cupcakes[Math.floor(Math.random()*(21-1)+1)].id,
        orderId: order.id,
      });
    })
  );

  console.log(`seeded ${lineItems.length} line items`);

  console.log(`seeded successfully`);

  return {
    admins,
    users,
    cakes,
    cupcakes,
    orders,
    lineItems,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
