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

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Cupcake.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Cupcake.create(req.body))
  } catch (err) {
    next(err)
  }
})