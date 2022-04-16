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

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Cake.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Cake.create(req.body))
  } catch (err) {
    next(err)
  }
})