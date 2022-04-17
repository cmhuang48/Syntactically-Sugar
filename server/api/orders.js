const router = require('express').Router()
const { models: { Order, LineItem }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {LineItem}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})