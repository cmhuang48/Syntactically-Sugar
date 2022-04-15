const router = require('express').Router()
const { models: { Cake }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cakes = await Cake.findAll()
    res.json(cakes)
  } catch (err) {
    next(err)
  }
})