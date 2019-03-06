const router = require('express').Router()
const {Guest, Order, OrderItem} = require('../db/models')
const {Product} = require('../db/models')
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

    orderItemsForBulkCreate = req.session.cart.orderItems.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity
    }))
    orderItems = await OrderItem.bulkCreate(orderItemsForBulkCreate)
    req.session.cart = {orderItems: []}
    res.send(req.session.cart)
  } catch (err) {
    next(err)
  }
})
