const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.post('/item/:productId', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const quantity = req.body.quantity
    if (req.user) {
      const orderId = req.session.cart.orderId
      const product = await Product.findById(productId)
      const orderItem = await OrderItem.create({productId, quantity, orderId})
      req.session.cart.orderItems.push({
        product,
        quantity,
        orderId
      })
      res.json(orderItem)
    } else {
      const product = await Product.findById(productId)
      const newOrderItem = {orderId: null, productId, quantity, product}
      if (!req.session.cart) {
        req.session.cart = {orderItems: [newOrderItem]}
      } else {
        req.session.cart.orderItems.push(newOrderItem)
      }
      res.json(newOrderItem)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/item/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      console.log(
        'REQ.BODY.ISEXISTITEM.PRODUCT.ID ===>',
        req.body.isExistItem.product.id
      )

      const orderItem = await OrderItem.findOne({
        where: {
          productId: req.body.isExistItem.product.id
        }
      })
      orderItem.dataValues.quantity += req.body.quantity
      // HERE!!
      req.session.cart.orderItems = []
        .concat(req.session.cart.orderItems)
        .filter(oItem => oItem.id !== orderItem.id)
      const updated = await orderItem.update(orderItem)
      res.json(updated)
    } else {
      const existedOrderItem = req.session.cart.orderItems.find(
        orderItem => orderItem.productId === req.body.isExistItem.productId
      )
      existedOrderItem.quantity += req.body.quantity
      res.json(existedOrderItem)
    }
  } catch (error) {
    next(error)
  }
})

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

router.post('/item/:orderId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.create(req.body)
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.put('/item/:orderId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findById(req.body.orderItemId)
    orderItem.quantity++
    const updatedOrderItem = await orderItem.update(orderItem)
    res.json(updatedOrderItem)
  } catch (err) {
    next(err)
  }
})

router.put('/submit', async (req, res, next) => {
  try {
    const OrderToSubmit = await Order.findById(req.session.cart.orderId)
    const submittedOrder = await OrderToSubmit.update({status: 'processing'})
    const newOrder = await Order.create({status: 'open', userId: req.user.id})
    req.session.cart = {
      orderId: newOrder.id,
      userId: newOrder.userId,
      status: newOrder.status,
      orderItems: []
    }
    res.json(req.session.cart)
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
