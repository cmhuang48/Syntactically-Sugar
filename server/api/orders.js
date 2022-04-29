const router = require('express').Router()
const { models: { Order, User }} = require('../db')
module.exports = router

// get all orders
router.get('/', async (req, res, next) => {
  try {
		const user = await User.findByToken(req.headers.authorization) 
		const orders = await Order.findAll({
			where: {
				userId : user.dataValues.id
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
		console.log('body', req.body)
		const order = await Order.findByPk(req.body.id *1)
		console.log('order', order)
		if (order.status === 'cart') {
			console.log('here')
			await order.update({ status: 'order', ...req.body });
			await Order.create({ userId: order.userId })
		}
		console.log('updated', order)
		res.json(order)
	} catch (err) {
		next(err)
	}
})