const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('Session from within api/cart:', req.session)
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
router.post('/item/:orderId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.create(req.body)
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.put('/item/:orderId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.body.orderItemId)
    orderItem.quantity++
    const updatedOrderItem = await orderItem.update(orderItem)
    res.json(updatedOrderItem)
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

router.post('/order/:userId', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    res.json(order)
  } catch (err) {
    next(err)
  }
})
