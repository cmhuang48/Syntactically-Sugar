const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

// get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'firstName', 'lastName', 'address1', 'address2', 'city', 'state', 'zip', 'country', 'isAdmin', 'cardName', 'cardNumber']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get user details
router.get('/:id', async(req, res, next) => {
  try {
    res.json(await User.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

// create a new user
router.post('/', async(req, res, next) => {
	try {
		const user = await User.create(req.body)
		res.status(201).json(user)
	} catch (err) {
		next(err)
	}
})

// update a user
router.put('/:id', async(req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id)
		res.json(await user.update(req.body))
	} catch (err) {
		next(err)
	}
})

// delete a user
router.delete('/:id', async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.sendStatus(204)
  } catch(err) {
    next(err)
  }
})