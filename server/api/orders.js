const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
module.exports = router

//For logged in users
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, {
      include: [{model: OrderItem, include: [Product]}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
  } catch (err) {
    next(err)
  }
})
