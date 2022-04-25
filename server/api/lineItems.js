const router = require('express').Router()
const { models: { LineItem, User, Order }} = require('../db')
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
    res.json(await LineItem.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
   res.status(201).json(await LineItem.create(req.body))
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {localStorage} = req.body
    if(localStorage){
      const user = await User.findByToken(req.headers.authorization)
      const order = await Order.findOne({
        where: {
          status:'cart',
          userId: user.id
        }
      })
      const lineItems = await LineItem.findAll({
        where: {
          orderId: order.id
        }
      })

      for(let key in localStorage){
        let change = false
        for(let i = 0; i < lineItems.length; i++){
          const item = lineItems[i]
          if(key*1 === item.productId) {
            item.quantity += localStorage[key] * 1
            change = true
          }
        }
        if(!change){
          const newItem = await LineItem.create({quantity:localStorage[key], orderId:order.id, productId:key})
          lineItems.push(newItem)
        }
      }

      res.json(lineItems)

    }else{
      const lineItem = await LineItem.findOne({
        where: {
          productId: req.body.productId,
          orderId: req.body.orderId
        }
      })
      if(req.body.totalQuantity) res.json(await lineItem.update({ quantity: req.body.totalQuantity*1 }))
      else{
        let updatedQuantity = lineItem.quantity *1 + req.body.quantity*1
        res.json(await lineItem.update({ quantity: updatedQuantity }))
      }
    }
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