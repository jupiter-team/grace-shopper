const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

router.put('/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.productId)
    await orderItem.update(req.body)
    res.send(res.session.cart)
  } catch (err) {
    next(err)
  }
})
router.put('/:orderItemId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.orderItemId)
    await orderItem.update(req.body)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
router.put('/:orderItemId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.params.orderItemId)
    await orderItem.update(req.body)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
