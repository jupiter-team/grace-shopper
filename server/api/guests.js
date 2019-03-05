const router = require('express').Router()
const {Guest, Order, OrderItem} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const guest = await Guest.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email
    })
    const order = await Order.create({
      guestId: guest.id,
      status: 'processing'
    })

    orderItems = await OrderItems.bulkCreate(req.session.cart.orderItems, {
      default: {orderId: order.id}
    })
    req.session.cart = {orderItems: []}
    res.send(req.session.cart)
  } catch (err) {
    next(err)
  }
})
