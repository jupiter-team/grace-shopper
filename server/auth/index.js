const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models/')
module.exports = router

const makeOrder = async (user, req, next) => {
  try {
    const [openOrder] = await Order.findOrCreate({
      where: {userId: user.id, status: 'open'}
    })
    let orderItems = await OrderItem.findAll({
      where: {orderId: openOrder.id},
      include: Product
    })
    let destructuredOrderItems = orderItems.map(item => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        description: item.product.description,
        image: item.product.image,
        status: item.product.status
      },
      quantity: item.quantity,
      orderId: item.orderId
    }))
    if (req.session.cart && req.session.cart.orderItems) {
      destructuredOrderItems = [
        ...destructuredOrderItems,
        req.session.cart.orderItems
      ]
    }
    req.session.cart = {
      userId: user.id,
      orderId: openOrder.id,
      status: openOrder.status,
      orderItems: [...destructuredOrderItems]
    }
    console.log(req.session.cart)
  } catch (error) {
    next(err)
  }
}

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
      makeOrder(user, req, next)
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
    makeOrder(user, req, next)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
