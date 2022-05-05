const router = require("express").Router();
const secretKey = require('../../secret')
const stripe = require('stripe')(secretKey)


router.post('/checkout', async(req, res) => {
	const {token, currency, price} = req.body
	let {status} = await stripe.charges.create({
		amount: price,
		currency: 'usd',
		source: token
	})
	res.status(200).json({status})

	if (!{status}) throw new Error("charge unsuccessful");
})


module.exports = router;