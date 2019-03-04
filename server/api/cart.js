const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = {
        orderItems: []
      }
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
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
router.put('/checkout', async (req, res, next) => {
  try {
    const submittedOrder = await Order.findById(req.session.cart.id)
    await submittedOrder.update({status: 'processing'})
    res.send(submittedOrder)
  } catch (err) {
    next(err)
  }
})
