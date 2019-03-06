const router = require('express').Router()
const {Guest} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const guest = Guest.create({
      name: req.body.guestInfo.name,
      address: req.body.guestInfo.address,
      email: req.body.guestInfo.email,
      orders: [
        {
          orderItems: req.session.cart.orderItems,
          status: processing
        }
      ]
    })
    res.send(guest)
  } catch (err) {
    next(err)
  }
})
