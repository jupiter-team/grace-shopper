const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models/')
module.exports = router

// const makeOrder = async (user, req) => {
//   const [openOrder] = await Order.findOrCreate({
//     where: {userId: user.id, status: 'open'}
//   })
//   let orderItems = await OrderItem.findAll({
//     where: {orderId: openOrder.id},
//     include: Product
//   })
//   let destructuredOrderItems = orderItems.map(item => ({
//     product: {
//       id: item.product.id,
//       name: item.product.name,
//       price: item.product.price,
//       description: item.product.description,
//       image: item.product.image,
//       status: item.product.status
//     },
//     quantity: item.quantity,
//     orderId: item.orderId
//   }))
//   // if (req.session.cart.orderItems.length) {
//   //   destructuredOrderItems = [
//   //     ...destructuredOrderItems,
//   //     ... req.session.cart.orderItems
//   //   ]
//   // }
//   req.session.cart = {
//     userId: user.id,
//     orderId: openOrder.id,
//     status: openOrder.status,
//     orderItems: [...destructuredOrderItems]
//   }
//   console.log('Session:', req.session)
//   // console.log('Session cart from login:', req.session.cart)
// }

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
      const [openOrder] = await Order.findOrCreate({
        where: {userId: user.id, status: 'open'}
      })
      let orderItems = await OrderItem.findAll({
        where: {orderId: openOrder.id},
        include: Product
      })
      await req.login(user, err => (err ? next(err) : res.json(user)))
      console.log('Session right after login', req.session)
      console.log('Req.user right after login', req.user.id)
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
      req.session.cart = {
        userId: user.id,
        orderId: openOrder.id,
        status: openOrder.status,
        orderItems: [...destructuredOrderItems]
      }
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
    // makeOrder(user, req)
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
