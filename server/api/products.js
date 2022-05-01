const router = require('express').Router()
const { models: { Product, User }} = require('../db')
module.exports = router
const { Op } = require('sequelize');

// get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.ne]: 'Custom'
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// get a product
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Product.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

// create a new product
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

// delete a product
router.delete('/:id', async(req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async(req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    const updated = await product.update(req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
})