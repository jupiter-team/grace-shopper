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

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
