const router = require('express').Router()
const { models: { Order, User }} = require('../db')

module.exports = router

//get all orders
router.get('/', async (req, res, next) => {
  try {
			const user = await User.findByToken(req.headers.authorization) // loggedIn
			const orders = await Order.findAll({
				where: {userId : user.dataValues.id}
			})
		res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get order details
router.get('/:id', async(req, res, next) => {
	try {
		if(!req.user.isAdmin) { 
			res.sendStatus(401)
			throw 'Only admin can edit'
		}
		res.json(await Order.findByPk(req.params.id))
	} catch (error) {
		next(error)
	}
})

//create an order
router.post('/', async(req, res, next) => {
	try {
		const order = await Order.create(req.body)
		res.status(201).json(order)
	} catch (error) {
		next(error)
	}
})

//update order 
router.put('/:id', async(req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.id)
		const updated = await Order.update(order)
		res.json(updated)
	} catch (error) {
		next(error)
	}
})
