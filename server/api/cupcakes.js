const router = require('express').Router()
const { models: { Cupcake }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cupcakes = await Cupcake.findAll()
    res.json(cupcakes)
  } catch (err) {
    next(err)
  }
})