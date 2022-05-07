require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY
const router = require("express").Router();
const cors = require("cors");
const express = require('express')
const uuid = require("uuid").v4;
const stripe = require("stripe")(SECRET_KEY);


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
    status = "success";
  } catch (err) {
    console.log(err);
    status = "failure";
  }
  res.json({ error, status });
});


module.exports = router;
