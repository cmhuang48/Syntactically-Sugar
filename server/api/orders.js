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