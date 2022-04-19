const router = require('express').Router()
const { models: { LineItem }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll()
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await LineItem.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await LineItem.create(req.body))
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.id)
    res.send(await lineItem.update(req.body))
  }
  catch(err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.id)
    await lineItem.destroy()
    res.sendStatus(204)
  }
  catch(err) {
    next(err)
  }
})