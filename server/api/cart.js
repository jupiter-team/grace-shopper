const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.productId)
    await orderItem.update(req.body)
    res.send(res.session.cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.productId)
    await orderItem.update(req.body)
    res.send(res.session.cart)
  } catch (err) {
    next(err)
  }
})
