const router = require('express').Router()
const {Product, OrderItem} = require('../db/models')
module.exports = router

router.get('/all', async (req, res, next) => {
  try {
    const products = await Product.findAll()

    res.json(products)
  } catch (err) {
    next(err)
  }
})

// router.put('/:productId', async (req, res, next) => {
//   try {
//     const orderItem = await OrderItem.findById()
//   } catch (err) {
//     next(err)
//   }
// })
