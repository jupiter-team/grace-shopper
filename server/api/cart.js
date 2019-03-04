const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
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
