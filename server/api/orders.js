const router = require('express').Router()

const { models: { Order, User }} = require('../db')

module.exports = router

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

router.post('/', async(req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		if(!user) { 
			res.send('Please login or sign up to place orders')
		}
		//without customized cake
		const { quantity, price, name, userId  } = req.body
		const order = await Order.create({quantity, price, name, userId})
		res.json(order)
	} catch (error) {
		next(error)
	}
})