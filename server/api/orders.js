const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

//For logged in users
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, {include: OrderItem})
    res.json(order)
  } catch (error) {
    next(error)
  }
})
