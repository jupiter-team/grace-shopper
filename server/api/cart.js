const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

router.put('/:productId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.update(req.params.orderItemId)
  } catch (err) {
    next(err)
  }
})
