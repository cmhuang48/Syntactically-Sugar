const router = require("express").Router();
const cors = require("cors");
const express = require('express')
const uuid = require("uuid").v4;
const stripe = require("stripe")(
  "sk_test_51KwnUeGncdLk4YDTWSKiOvmjkAwiaoHDSAyD7LdUdkEzT3dKFgdlocooR1zt0CIDmZSulwev26xHfGXcsyyDfp2O00vkosWJZF"
);

router.use(express.urlencoded({ extended: true }));
router.use(cors());

router.post("/checkout", async (req, res) => {
  let error;
  let status;
  try {
  const {token, total} = req.body
    const idempotencyKey = uuid();
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create(
      {
        amount: total*100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
    const coupon = await stripe.coupons.create({percent_off: 20, duration: 'once'});
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        discounts: [{
          coupon: 'promo_1KwoUvGncdLk4YDTZpGroDpD',
        }],
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
    });
    console.log("Charge:", {coupon})
    //console.log("Charge:", { charge });
    status = "success";
  } catch (err) {
    console.log(err);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports = router;
