const router = require('express').Router()
const { models: { Order, User }} = require('../db')
module.exports = router

// get all orders
router.get('/', async (req, res, next) => {
  try {
		const user = await User.findByToken(req.headers.authorization) 
		const orders = await Order.findAll({
			where: {
				userId: user.id
			}
		})
		res.json(orders)
  } catch (err) {
    next(err)
  }
})

// get order details
router.get('/:id', async(req, res, next) => {
	try {
		res.json(await Order.findByPk(req.params.id))
	} catch (err) {
		next(err)
	}
})

// create a new order
router.post('/', async(req, res, next) => {
	try {
		const order = await Order.create(req.body)
		res.status(201).json(order)
	} catch (err) {
		next(err)
	}
})

// update an order 
router.put('/:id', async(req, res, next) => {
	try {
		const order = await Order.findByPk(req.body.id)
		if (order.status === 'cart') {
			await order.update({ ...req.body, status: 'order' });
			await Order.create({ userId: order.userId })
		}
		res.json(order)
	} catch (err) {
		next(err)
	}
})