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
router.put('/submit', async (req, res, next) => {
  try {
    const OrderToSubmit = await Order.findById(req.session.cart.orderId)
    const submittedOrder = await OrderToSubmit.update({status: 'processing'})
    const newOrder = await Order.create({status: 'open', userId: req.user.id})
    req.session.cart = {
      orderId: newOrder.id,
      userId: newOrder.userId,
      status: newOrder.status,
      orderItems: []
    }
    res.json(req.session.cart)
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
