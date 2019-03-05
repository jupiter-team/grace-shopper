const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.post('/item/:productId', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const quantity = req.body.quantity
    console.log('SESSION ===>', req.session)
    if (req.session.passport.user) {
      const orderId = req.session.cart.orderId
      const orderItem = await OrderItem.create({productId, quantity, orderId})
      req.session.cart.orderItems.push(orderItem)
      res.json(orderItem)
    } else {
      const newOrderItem = [{orderId: null, productId, quantity}]
      if (!req.session.cart) {
        req.session.cart.orderItems = [newOrderItem]
      } else {
        req.session.cart.orderItems.push(newOrderItem)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.put('/item/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.body.orderItemId)
    // console.log("ORDERITEM QUANTITY ===>", orderItem.quantity)
    orderItem.quantity++
    const updatedOrderItem = await orderItem.update(orderItem)
    res.json(updatedOrderItem)
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
